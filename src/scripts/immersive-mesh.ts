const host = document.querySelector<HTMLElement>('[data-immersive-mesh]');
const canvas = host?.querySelector<HTMLCanvasElement>('[data-immersive-canvas]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (host && canvas && !reduceMotion.matches) {
  void initialiseMesh(host, canvas).catch(() => {
    host.classList.remove('is-ready');
  });
}

async function initialiseMesh(host: HTMLElement, canvas: HTMLCanvasElement) {
  const { Renderer, Geometry, Program, Mesh } = await import('ogl');
  if (!host.isConnected || reduceMotion.matches) return;

  const mobileScene = window.matchMedia('(max-width: 768px)').matches;
  const dprLimit = mobileScene ? 1 : 1.5;

  const renderer = new Renderer({ canvas, alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, dprLimit) });
  const gl = renderer.gl;
  gl.clearColor(0.031, 0.067, 0.149, 1);

  const geometry = new Geometry(gl, {
    position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
  });

  const program = new Program(gl, {
    vertex: `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,
    fragment: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uPointer;
      uniform vec2 uFrameScale;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
      }

      float flow(vec2 p, float t) {
        float value = 0.0;
        mat2 turn = mat2(.82, -.57, .57, .82);
        for (int i = 0; i < ${mobileScene ? 3 : 4}; i++) {
          value += noise(p + vec2(t * .11, -t * .07)) / exp2(float(i) + 1.0);
          p = turn * p * 2.03 + 1.7;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv;
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
        p *= uFrameScale;
        float t = uTime * .16;
        vec2 pointer = (uPointer - .5) * vec2(.16, .1);

        p.x += p.y * .31;
        float field = flow(p * 1.12 + pointer, t);
        float fine = flow(p * 2.15 - pointer * .6 + 3.4, -t * .72);
        float surface = field * .78 + fine * .22;

        float ribbonAxis = p.y + .28 * sin(p.x * 1.55 + t) + .13 * sin(p.x * 3.7 - t * .7);
        float volume = exp(-abs(ribbonAxis - (surface - .48) * 1.25) * 2.15);
        float fold = pow(clamp(1.0 - abs(fract(surface * 5.2 + ribbonAxis * .72) - .5) * 2.0, 0.0, 1.0), 9.0);
        float edge = smoothstep(.18, .94, volume) * fold;

        vec3 midnight = vec3(.031, .067, .149);
        vec3 deepBlue = vec3(.055, .16, .48);
        vec3 electric = vec3(.141, .341, 1.0);
        vec3 cyan = vec3(.133, .827, .933);
        vec3 color = midnight;
        color += deepBlue * volume * .48;
        color += electric * pow(volume, 3.0) * (.34 + surface * .52);
        color += mix(electric, cyan, smoothstep(.42, .76, surface)) * edge * 1.35;

        float highlight = pow(max(0.0, 1.0 - abs(ribbonAxis + .12 - surface * .42) * 5.5), 16.0);
        color += mix(cyan, vec3(1.0), .45) * highlight * .72;
        float halo = exp(-length(p - vec2(.56 + pointer.x, .16 + pointer.y)) * 1.8);
        color += electric * halo * .14;

        float leftGuard = smoothstep(-1.25, .05, p.x);
        color = mix(midnight, color, .3 + .7 * leftGuard);
        color *= .96 + hash(gl_FragCoord.xy + uTime) * .04;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: [1, 1] },
      uPointer: { value: [.68, .38] },
      uFrameScale: { value: [1, 1] },
    },
  });

  const mesh = new Mesh(gl, { geometry, program });
  const mobileOrigin = mobileScene ? { x: .58, y: .48 } : { x: .68, y: .38 };
  const pointer = { ...mobileOrigin };
  const target = { ...mobileOrigin };
  let raf = 0;
  let inViewport = false;
  let disposed = false;
  let start = performance.now();

  const resize = () => {
    const bounds = host.getBoundingClientRect();
    const width = Math.max(1, bounds.width);
    const height = Math.max(1, bounds.height);
    renderer.dpr = Math.min(window.devicePixelRatio, dprLimit);
    renderer.setSize(width, height);
    program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    program.uniforms.uFrameScale.value = mobileScene
      ? (width <= 480 ? [.92, .52] : [.98, .76])
      : [1, 1];
  };

  const render = (now: number) => {
    raf = 0;
    if (!inViewport || document.hidden || disposed) return;
    if (mobileScene) {
      const elapsed = (now - start) / 1000;
      target.x = mobileOrigin.x + Math.sin(elapsed * .18) * .045;
      target.y = mobileOrigin.y + Math.cos(elapsed * .14) * .03;
    }
    pointer.x += (target.x - pointer.x) * .025;
    pointer.y += (target.y - pointer.y) * .025;
    program.uniforms.uPointer.value = [pointer.x, pointer.y];
    program.uniforms.uTime.value = (now - start) / 1000;
    renderer.render({ scene: mesh });
    raf = requestAnimationFrame(render);
  };

  const updateRendering = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    if (inViewport && !document.hidden && !disposed) raf = requestAnimationFrame(render);
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    target.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    target.y = 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
  };

  const visibility = new IntersectionObserver(([entry]) => {
    inViewport = entry.isIntersecting;
    updateRendering();
  }, { rootMargin: '80px' });

  const resizeObserver = new ResizeObserver(resize);
  const onVisibilityChange = updateRendering;

  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    visibility.disconnect();
    resizeObserver.disconnect();
    if (!mobileScene) host.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    Object.values(geometry.attributes).forEach((attribute) => {
      if (attribute.buffer) gl.deleteBuffer(attribute.buffer);
    });
    gl.deleteProgram(program.program);
    host.classList.remove('is-ready');
  };

  resizeObserver.observe(host);
  visibility.observe(host);
  if (!mobileScene) host.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  resize();
  renderer.render({ scene: mesh });
  host.classList.add('is-ready');
}
