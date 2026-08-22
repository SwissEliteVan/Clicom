import { gsap, ScrollTrigger } from './motion/core';
import { bindAstroMotionCleanup } from './motion/lifecycle';
import { motion } from './motion/tokens';

const section = document.querySelector<HTMLElement>('[data-system-story]');
if (section) initialiseSystem(section);

function initialiseSystem(root: HTMLElement) {
  const context = gsap.context(() => {
    const media = gsap.matchMedia();
    const steps = gsap.utils.toArray<HTMLElement>('[data-system-step]', root);
    const words = gsap.utils.toArray<HTMLElement>('[data-system-word]', root);
    const status = root.querySelector<HTMLElement>('[data-system-status]');
    const presence = gsap.utils.toArray<SVGPathElement>('[data-presence-path]', root);
    const acquisition = root.querySelector<SVGGElement>('[data-system-layer="acquisition"]');
    const acquisitionPaths = gsap.utils.toArray<SVGPathElement>('[data-acquisition-path]', root);
    const distribution = root.querySelector<SVGGElement>('[data-system-layer="distribution"]');
    const distributionPaths = gsap.utils.toArray<SVGPathElement>('[data-distribution-path]', root);
    const control = root.querySelector<SVGGElement>('[data-system-layer="control"]');
    const controlPaths = gsap.utils.toArray<SVGPathElement>('[data-system-layer="control"] path', root);
    const core = root.querySelector<SVGGElement>('[data-system-core]');
    const labels = gsap.utils.toArray<HTMLElement>('[data-system-label]', root);

    const activate = (index: number) => {
      steps.forEach((step,i) => { step.classList.toggle('is-active', i === index); step.classList.toggle('is-past', i < index); });
      if (status) status.textContent = `${String(index + 1).padStart(2,'0')} / ${steps[index]?.querySelector('small')?.textContent || ''}`;
    };

    media.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(presence, { strokeDashoffset: 1 });
      gsap.set([...acquisitionPaths,...distributionPaths,...controlPaths], { strokeDashoffset: 1 });
      gsap.set(words, { opacity: 0, scale: .94 });
      gsap.set(labels, { opacity: 0, y: 8 });
      gsap.set('[data-system-word="0"]', { opacity: 1, scale: 1 });
      gsap.set('[data-system-label="presence"], [data-system-label="visible"]', { opacity: 1, y: 0 });

      const timeline = gsap.timeline({
        defaults:{ ease: motion.ease.linear },
        scrollTrigger:{ trigger:steps[0], endTrigger:steps[steps.length-1], start:'top 58%', end:'bottom 44%', scrub:motion.scrub.smooth, invalidateOnRefresh:true,
          onUpdate:self => activate(Math.min(3,Math.floor(self.progress * 3.99))) }
      });
      timeline
        .to(presence,{strokeDashoffset:0,duration:.14},0)
        .fromTo(core,{scale:.72,transformOrigin:'center'},{scale:1,duration:.14},0)
        .to('[data-system-depth="back"]',{yPercent:-3,duration:1},0)
        .to(acquisition,{opacity:1,duration:.08},.18)
        .to(acquisitionPaths,{strokeDashoffset:0,stagger:.012,duration:.15},.18)
        .to(presence,{scaleX:1.08,transformOrigin:'right center',duration:.2},.2)
        .to(words[0],{opacity:0,scale:1.05,duration:.05},.22)
        .to(words[1],{opacity:1,scale:1,duration:.08},.24)
        .to('[data-system-label="presence"]',{x:28,duration:.18},.2)
        .to(distribution,{opacity:1,duration:.06},.44)
        .to(distributionPaths,{strokeDashoffset:0,stagger:.018,duration:.17},.45)
        .to(acquisitionPaths,{scaleY:.72,transformOrigin:'right center',duration:.18},.46)
        .to(core,{scale:.9,duration:.15},.46)
        .to('[data-system-label="received"]',{opacity:1,y:0,duration:.08},.48)
        .to(words[1],{opacity:0,scale:1.05,duration:.05},.48)
        .to(words[2],{opacity:1,scale:1,duration:.08},.5)
        .to(control,{opacity:1,duration:.08},.7)
        .to(controlPaths,{strokeDashoffset:0,stagger:.02,duration:.16},.7)
        .to(control,{rotation:42,transformOrigin:'center',duration:.28},.7)
        .to(distributionPaths,{scaleX:.94,transformOrigin:'left center',duration:.18},.72)
        .to(core,{scale:1.08,duration:.16},.74)
        .to('[data-system-label="measured"], [data-system-label="protected"]',{opacity:1,y:0,stagger:.03,duration:.08},.76)
        .to(words[2],{opacity:0,scale:1.05,duration:.05},.76)
        .to(words[3],{opacity:1,scale:1,duration:.09},.78)
        .to('[data-system-depth="front"]',{yPercent:3,duration:1},0);

      const pulse = gsap.timeline({repeat:-1,paused:true}).to(core,{scale:1.035,duration:1.6,ease:'sine.inOut'}).to(core,{scale:1,duration:1.6,ease:'sine.inOut'});
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting ? pulse.play() : pulse.pause(),{rootMargin:'80px'});
      observer.observe(root);
      return () => { observer.disconnect(); pulse.kill(); timeline.kill(); };
    });

    media.add('(max-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(presence,{strokeDashoffset:0}); gsap.set(acquisition,{opacity:.55}); gsap.set(distribution,{opacity:.55}); gsap.set(control,{opacity:.5});
      steps.forEach((step,index) => ScrollTrigger.create({trigger:step,start:'top 72%',onEnter:()=>activate(index),onEnterBack:()=>activate(index)}));
      gsap.from('.home-system-stage-v2__mini i',{scale:0,opacity:0,stagger:.07,duration:.35,ease:'back.out(1.4)',scrollTrigger:{trigger:'.home-system-story__steps',start:'top 75%',once:true}});
    });

    media.add('(prefers-reduced-motion: reduce)', () => { activate(3); gsap.set([...presence,...acquisitionPaths,...distributionPaths,...controlPaths],{strokeDashoffset:0}); });
    return () => media.revert();
  },root);

  bindAstroMotionCleanup(root, context);
}
