export {};

const host = document.querySelector<HTMLElement>('[data-ai-field]');
const canvas = host?.querySelector<HTMLCanvasElement>('[data-ai-canvas]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (host && canvas && innerWidth > 768 && !reduced) void init(host, canvas).catch(() => host.classList.remove('is-ready'));

async function init(host: HTMLElement, canvas: HTMLCanvasElement) {
  const { Renderer, Geometry, Program, Mesh } = await import('ogl');
  const renderer = new Renderer({ canvas, antialias: false, dpr: Math.min(devicePixelRatio, 1.35) });
  const gl = renderer.gl;
  const geometry = new Geometry(gl, { position: { size: 2, data: new Float32Array([-1,-1,3,-1,-1,3]) } });
  const program = new Program(gl, {
    vertex: `attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`,
    fragment: `precision highp float;uniform vec2 uResolution,uPointer;uniform float uTime;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}void main(){vec2 p=(gl_FragCoord.xy-.5*uResolution)/min(uResolution.x,uResolution.y);p.x+=p.y*.22;float t=uTime*.11;vec3 c=vec3(.031,.067,.149);float f=sin(p.x*4.-p.y*2.+t)+sin(p.x*8.+p.y*3.-t*.7)*.35;for(int i=0;i<11;i++){float q=float(i);vec2 n=vec2(fract(h(vec2(q,3.))*1.8+t*.025)-.5,h(vec2(q,7.))-.5);n.x*=2.4;float d=length(p-n-(uPointer-.5)*.06);c+=mix(vec3(.141,.341,1.),vec3(.133,.827,.933),fract(q*.37))*.003/(d*d+.012);}c+=mix(vec3(.141,.341,1.),vec3(.133,.827,.933),p.x*.35+.5)*pow(max(0.,1.-abs(f)*.42),12.)*.42;gl_FragColor=vec4(c,1.);}`,
    uniforms: { uResolution: { value: [1,1] }, uPointer: { value: [.65,.42] }, uTime: { value: 0 } },
  });
  const mesh = new Mesh(gl, { geometry, program });
  let raf = 0, inViewport = false, disposed = false;
  const target = { x: .65, y: .42 }, pointer = { ...target };
  const resize = () => { renderer.setSize(host.clientWidth, host.clientHeight); program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height]; };
  const shouldRender = () => inViewport && document.visibilityState === 'visible' && !disposed;
  const draw = (now: number) => { if (!shouldRender()) return; pointer.x += (target.x-pointer.x)*.025; pointer.y += (target.y-pointer.y)*.025; program.uniforms.uPointer.value=[pointer.x,pointer.y]; program.uniforms.uTime.value=now/1000; renderer.render({scene:mesh}); raf=requestAnimationFrame(draw); };
  const syncRendering = () => { cancelAnimationFrame(raf); if (shouldRender()) raf=requestAnimationFrame(draw); };
  const move = (event: PointerEvent) => { const rect=host.getBoundingClientRect(); target.x=(event.clientX-rect.left)/rect.width; target.y=1-(event.clientY-rect.top)/rect.height; };
  const io = new IntersectionObserver(([entry]) => { inViewport=entry.isIntersecting; syncRendering(); }, { rootMargin: '80px' });
  const ro = new ResizeObserver(resize);
  const onVisibilityChange = () => syncRendering();
  const cleanup = () => { disposed=true; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); host.removeEventListener('pointermove',move); document.removeEventListener('visibilitychange',onVisibilityChange); Object.values(geometry.attributes).forEach(attribute=>attribute.buffer&&gl.deleteBuffer(attribute.buffer)); gl.deleteProgram(program.program); };
  ro.observe(host); io.observe(host); host.addEventListener('pointermove',move,{passive:true}); document.addEventListener('visibilitychange',onVisibilityChange); document.addEventListener('astro:before-swap',cleanup,{once:true}); resize(); renderer.render({scene:mesh}); host.classList.add('is-ready');
}
