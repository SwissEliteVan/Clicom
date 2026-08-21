import { gsap, ScrollTrigger } from './motion/core';
import { bindAstroMotionCleanup } from './motion/lifecycle';
import { motion } from './motion/tokens';

const section = document.querySelector<HTMLElement>('[data-expertise-section]');
if (section) initialiseExpertise(section);

function initialiseExpertise(root: HTMLElement) {
  const context = gsap.context(() => {
    const media = gsap.matchMedia();
    const removers: Array<() => void> = [];
    const listen = (element:HTMLElement,type:string,handler:EventListener) => { element.addEventListener(type,handler); removers.push(()=>element.removeEventListener(type,handler)); };

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const build = root.querySelector<HTMLElement>('[data-expertise-media="build"]');
      const visibility = root.querySelector<HTMLElement>('[data-expertise-media="visibility"]');
      const acquisition = root.querySelector<HTMLElement>('[data-expertise-media="acquisition"]');
      const automation = root.querySelector<HTMLElement>('[data-expertise-media="automation"]');

      if (build) {
        const grid = gsap.utils.toArray<SVGLineElement>('[data-build-grid] line',build), route=build.querySelector('[data-build-route]'), signal=build.querySelector('[data-build-signal]');
        const blocks=gsap.utils.toArray<HTMLElement>('[data-build-block]',build), rules=gsap.utils.toArray<HTMLElement>('[data-build-block="copy"] i, [data-build-block="copy"] b',build), button=build.querySelector('[data-build-button]'), pulse=gsap.utils.toArray<HTMLElement>('.expertise-build__pulse i',build);
        const timeline=gsap.timeline({paused:true}).fromTo(grid,{strokeDashoffset:1},{strokeDashoffset:0,stagger:.025,duration:.5,ease:'power1.out'}).to(blocks[0],{clipPath:'inset(0 0% 0 0)',duration:.42,ease:motion.ease.standard},.22).to(rules,{scaleX:1,stagger:.07,duration:.28},.32).to(button,{opacity:1,scale:1,duration:.25,ease:'back.out(1.4)'},.62).to(route,{strokeDashoffset:0,duration:.6,ease:'power1.inOut'},.66).to(signal,{x:460,y:-105,duration:motion.duration.reveal,ease:'power2.inOut'},.7).to(button,{scale:1.05,duration:.12,yoyo:true,repeat:1},1.25).to(pulse,{scaleX:1,stagger:.1,duration:.3},1.2);
        ScrollTrigger.create({trigger:build,start:'top 76%',once:true,onEnter:()=>timeline.play()});
        if(matchMedia('(pointer:fine)').matches){const moveX=gsap.quickTo(signal,'x',{duration:motion.duration.standard}),moveY=gsap.quickTo(signal,'y',{duration:motion.duration.standard});listen(build,'pointermove',((event:PointerEvent)=>{const box=build.getBoundingClientRect();moveX(440+(event.clientX-box.left-box.width/2)*.025);moveY(-100+(event.clientY-box.top-box.height/2)*.025)}) as EventListener);listen(build,'pointerleave',(()=>{moveX(460);moveY(-105)}) as EventListener)}
      }

      if (visibility) {
        const fragments=gsap.utils.toArray<HTMLElement>('[data-visibility-fragment]',visibility), lines=gsap.utils.toArray<SVGPathElement>('[data-visibility-lines] path',visibility), core=visibility.querySelector('.expertise-visibility__core');
        const relevant=fragments.filter((_,index)=>index%4===0||index%7===0);
        const timeline=gsap.timeline({paused:true}).from(fragments,{scale:.45,opacity:0,stagger:{each:.018,from:'random'},duration:motion.duration.standard}).to(lines,{strokeDashoffset:0,stagger:.025,duration:.5},.18).to(relevant,{x:index=>(index%2?-1:1)*(35+index*3),y:index=>(index%3-1)*24,color:'rgba(247,249,252,.72)',duration:motion.duration.reveal,ease:'power2.inOut'},.35).to(core,{scale:1,duration:.55,ease:'back.out(1.4)'},.55);
        ScrollTrigger.create({trigger:visibility,start:'top 76%',once:true,onEnter:()=>timeline.play()});
        if(matchMedia('(pointer:fine)').matches)listen(visibility,'pointermove',((event:PointerEvent)=>{const box=visibility.getBoundingClientRect(),x=(event.clientX-box.left)/box.width,y=(event.clientY-box.top)/box.height;lines.forEach((line,index)=>gsap.to(line,{strokeOpacity:Math.abs((index%4)/4-x)<.24&&Math.abs(Math.floor(index/4)/3-y)<.34?.9:.34,duration:.2}))}) as EventListener);
      }

      if (acquisition) {
        const incoming=gsap.utils.toArray<SVGPathElement>('[data-acquisition-incoming] path',acquisition), outgoing=gsap.utils.toArray<SVGPathElement>('[data-acquisition-outgoing] path',acquisition), dots=gsap.utils.toArray<SVGCircleElement>('[data-acquisition-dots] circle',acquisition), quality=gsap.utils.toArray<HTMLElement>('.expertise-acquisition__quality i',acquisition);
        const timeline=gsap.timeline({paused:true}).to(incoming,{strokeDashoffset:0,stagger:.045,duration:.42,ease:'power2.in'}).fromTo(dots,{x:-35,opacity:0},{x:0,opacity:1,stagger:{each:.025,from:'random'},duration:.28},.08).to(dots.filter((_,index)=>index%3!==0),{opacity:.08,scale:.4,duration:.25},.46).to(outgoing,{strokeDashoffset:0,stagger:.08,duration:.4,ease:motion.ease.reveal},.52).to(quality,{opacity:1,scale:1.22,stagger:.1,duration:.18,ease:'back.out(1.4)'},.7).to(quality,{scale:1,duration:.16},.92);
        ScrollTrigger.create({trigger:acquisition,start:'top 76%',once:true,onEnter:()=>timeline.play()});
        if(matchMedia('(pointer:fine)').matches)listen(acquisition,'pointerenter',(()=>gsap.fromTo(outgoing,{strokeDashoffset:1,strokeWidth:1},{strokeDashoffset:0,strokeWidth:3,stagger:.08,duration:.55,ease:motion.ease.reveal})) as EventListener);
      }

      if (automation) {
        const paths=gsap.utils.toArray<SVGPathElement>('[data-machine-path]',automation), locks=gsap.utils.toArray<SVGGElement>('[data-machine-lock]',automation), actions=gsap.utils.toArray<HTMLElement>('[data-machine-action]',automation), signal=automation.querySelector('[data-machine-signal]');
        const sequence=()=>{actions.forEach(action=>action.classList.remove('is-active'));return gsap.timeline().to(paths,{strokeDashoffset:0,stagger:.11,duration:.34,ease:'power1.inOut'}).from(locks,{scale:.6,transformOrigin:'center',stagger:.18,duration:.28,ease:'back.out(1.4)'},.18).to(signal,{opacity:1,x:245,duration:.48,ease:'power2.inOut'},.12).to(signal,{x:500,duration:.52,ease:'power2.inOut'},.58).to(actions,{opacity:1,stagger:.11,duration:.12,onStart(){actions.forEach((action,index)=>gsap.delayedCall(index*.11,()=>action.classList.add('is-active')))}},.62).to(signal,{opacity:0,duration:.12},1.08)};
        const timeline=sequence().pause(0);ScrollTrigger.create({trigger:automation,start:'top 76%',once:true,onEnter:()=>timeline.play()});if(matchMedia('(pointer:fine)').matches)listen(automation,'pointerenter',(()=>{if(!gsap.isTweening(signal)){gsap.set(paths,{strokeDashoffset:1});gsap.set(signal,{x:0});sequence()}}) as EventListener);
      }
      return()=>removers.splice(0).forEach(remove=>remove());
    });

    media.add('(prefers-reduced-motion: reduce)',()=>gsap.set('[data-expertise-media] *',{clearProps:'all'}));
    return()=>{removers.splice(0).forEach(remove=>remove());media.revert()};
  },root);
  bindAstroMotionCleanup(root, context);
}
