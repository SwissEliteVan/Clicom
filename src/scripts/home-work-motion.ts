import { gsap } from './motion/core';
import { bindAstroMotionCleanup } from './motion/lifecycle';
import { motion } from './motion/tokens';

const section=document.querySelector<HTMLElement>('[data-work-section]');
if(section) initialiseWork(section);

function initialiseWork(root:HTMLElement){
  const context=gsap.context(()=>{
    const media=gsap.matchMedia();
    const removers:Array<()=>void>=[];
    const listen=(element:HTMLElement,type:string,handler:EventListener)=>{element.addEventListener(type,handler);removers.push(()=>element.removeEventListener(type,handler))};

    media.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)',()=>{
      const primary=root.querySelector<HTMLElement>('[data-work-project="primary"]')!;
      const secondary=root.querySelector<HTMLElement>('[data-work-project="secondary"]')!;
      const primaryFrame=primary.querySelector<HTMLElement>('[data-work-frame]')!;
      const secondaryFrame=secondary.querySelector<HTMLElement>('[data-work-frame]')!;
      const primaryMain=primary.querySelector<HTMLElement>('[data-work-depth="main"]')!;
      const primaryFront=gsap.utils.toArray<HTMLElement>('[data-work-depth="front"]',primary);
      const secondaryMain=secondary.querySelector<HTMLElement>('[data-work-depth="main"]')!;
      const secondaryFront=gsap.utils.toArray<HTMLElement>('[data-work-depth="front"]',secondary);

      gsap.timeline({scrollTrigger:{trigger:primary,start:'top 72%',once:true}})
        .to(primaryFrame,{clipPath:'inset(0 0% 0 0 round 42px)',duration:1.05,ease:'power3.inOut'})
        .fromTo(primaryMain.querySelector('img'),{scale:1.16},{scale:1.08,duration:1.15,ease:'power3.out'},0)
        .from(primary.querySelector('.work-scene__title-mask h3'),{yPercent:110,duration:.7,ease:'power3.out'},.42)
        .to(primary.querySelector('.work-scene__fragment'),{opacity:1,duration:.4},.68)
        .to(primary.querySelector('.work-scene__device'),{opacity:1,y:0,duration:.65,ease:'power3.out'},.72);

      gsap.timeline({scrollTrigger:{trigger:primary,start:'top bottom',end:'bottom top',scrub:motion.scrub.deliberate}})
        .to(primaryMain,{yPercent:5,ease:'none'},0).to(primaryFront,{yPercent:-8,ease:'none'},0).to(primaryMain.querySelector('img'),{yPercent:-4,ease:'none'},0);

      gsap.timeline({scrollTrigger:{trigger:'.work-transition',start:'top 78%',end:'bottom 35%',scrub:motion.scrub.standard}})
        .to('[data-work-transition-line]',{scaleX:1,ease:'none'},0)
        .to(primaryFrame,{scale:.965,ease:'none'},0)
        .fromTo(secondary.querySelector('.work-scene__title-mask h3'),{yPercent:110},{yPercent:0,ease:'none'},.32);

      gsap.timeline({scrollTrigger:{trigger:secondary,start:'top 76%',once:true}})
        .to(secondaryFrame,{clipPath:'inset(0 0 0% 0 round 36px)',duration:1,ease:'power3.inOut'})
        .fromTo(secondaryMain.querySelector('img'),{scale:1.16},{scale:1.08,duration:1.1,ease:'power3.out'},0)
        .to(secondary.querySelector('.work-scene__vertical-label'),{opacity:1,duration:.4},.58)
        .to(secondary.querySelector('.work-scene__vertical-detail'),{opacity:1,x:0,duration:.65,ease:'power3.out'},.62);

      gsap.timeline({scrollTrigger:{trigger:secondary,start:'top bottom',end:'bottom top',scrub:motion.scrub.deliberate}})
        .to(secondaryMain,{yPercent:4,ease:'none'},0).to(secondaryFront,{yPercent:-7,ease:'none'},0).to(secondaryMain.querySelector('img'),{yPercent:-5,ease:'none'},0);

      [primaryFrame,secondaryFrame].forEach(frame=>{const inner=frame.querySelector<HTMLElement>('[data-work-depth="main"]'),front=frame.querySelector<HTMLElement>('[data-work-depth="front"]'),reflection=frame.querySelector<HTMLElement>('[data-work-reflection]');if(!inner)return;const moveX=gsap.quickTo(inner,'x',{duration:.7,ease:'power3.out'}),moveY=gsap.quickTo(inner,'y',{duration:.7,ease:'power3.out'}),frontX=front?gsap.quickTo(front,'x',{duration:.7,ease:'power3.out'}):null,frontY=front?gsap.quickTo(front,'y',{duration:.7,ease:'power3.out'}):null;listen(frame,'pointermove',((event:PointerEvent)=>{const box=frame.getBoundingClientRect(),x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;moveX(x*10);moveY(y*8);frontX?.(x*-14);frontY?.(y*-10);if(reflection)gsap.to(reflection,{left:`${35+x*65}%`,opacity:.42,duration:.28})}) as EventListener);listen(frame,'pointerleave',(()=>{moveX(0);moveY(0);frontX?.(0);frontY?.(0);if(reflection)gsap.to(reflection,{opacity:0,duration:.25})}) as EventListener)});
      return()=>removers.splice(0).forEach(remove=>remove());
    });

    media.add('(max-width: 960px) and (prefers-reduced-motion: no-preference)',()=>{
      gsap.utils.toArray<HTMLElement>('[data-work-project]',root).forEach(project=>{const frame=project.querySelector<HTMLElement>('[data-work-frame]');if(!frame)return;gsap.timeline({scrollTrigger:{trigger:project,start:'top 78%',once:true}}).to(frame,{clipPath:'inset(0 0 0% 0 round 22px)',duration:.85,ease:'power3.inOut'}).fromTo(frame.querySelector('[data-work-depth="main"] img'),{scale:1.12},{scale:1,duration:.9,ease:'power2.out'},0).from(project.querySelector('.work-scene__title-mask h3'),{yPercent:105,duration:.55,ease:'power3.out'},.28).to(project.querySelectorAll('[data-work-depth="front"], .work-scene__vertical-label, .work-scene__fragment'),{opacity:1,x:0,y:0,stagger:.1,duration:.4},.42)});
    });
    media.add('(prefers-reduced-motion: reduce)',()=>gsap.set('[data-work-project] *',{clearProps:'all'}));
    return()=>{removers.splice(0).forEach(remove=>remove());media.revert()};
  },root);
  bindAstroMotionCleanup(root, context);
}
