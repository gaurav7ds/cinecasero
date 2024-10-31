import Lenis from 'lenis'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const homePageAnimations = () => {
    gsap.set('.hero-video-wrapper', {
        scale: 0,
        yPercent: -40
    })
    gsap.set('.hero-image-show', {
        yPercent: -40
    })
    gsap.set('.hero-image-show img', {
        scale: 0,
    })
    gsap.set('.hero-header', {
        autoAlpha: 0
    })

    let tl = gsap.timeline({
        defaults: {
            ease: "expo",
            duration: 1,
        },
    })

    tl.to('.hero-video-wrapper', {
        scale: 1,
    })
        .to('.hero-image-show img', {
            scale: 1,
            stagger: {
                each: 0.03,
                from: 'center'
            }
        }, '-=.5')
        .to('.hero-image-show', {
            yPercent: 0,
        })
        .to('.hero-video-wrapper', {
            yPercent: 0,
        },'<')
        .to('.hero-header', {
            autoAlpha: 1,
            duration: 1,
            ease: "power2.inOut",
        }, '-=.5')

}

const homePageScroll = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section1',
            start: 'top top',
            end: '+=1500',
            scrub: 2,
            pin: true,
        },
    })

    tl.to('.hero-video-wrapper',{
        clipPath: 'inset(0% 0% round 0px)'
    })
    .to(['.img-left-in','.img-left-out'],{
        xPercent:-200
    },'<')
    .to(['.img-right-in','.img-right-out'],{
        xPercent:200
    },'<')
    .from('.section-text-absolute h2',{
        yPercent: 200
    },'-=.2')
    .to('.section-text-absolute h2',{
        opacity:.8
    },'<')

}

const sectionTwoScroll = () => {
    const tl = gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: '.section2',
            end: '+=1500',
            scrub: 2,
            pin: true,
        }
    })

    tl.to('.reel1',{
        yPercent:-60,
    })
    .to('.reel2',{
        yPercent:60,
    },'<')

}

const parallex = () => {
    const images = gsap.utils.toArray('.section3-imgs img');

    images.forEach(image => {
        gsap.to(image, {
            yPercent: -200,
            ease: 'none',
            scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
            }
        })
    })
}

const sectionFourScroll = () => {
    const tl = gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: '.section-4',
            start: 'top top',
            end: '+=2000',
            scrub: 2,
            pin: true,
        }
    })
    
    tl.to('.section-4-wrapper',{
        clipPath: 'circle(20% at 50% 50%)',
    })
    tl.from('.section-4-text',{
        y: 200,
        autoAlpha: 0
    },'-=.3')
    .to('.section-4-fadein',{
        yPercent: -100,
    },'-=.2')
}



// /**
//  * Smooth scroll
//  */

const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

homePageAnimations()
homePageScroll()

sectionTwoScroll()

parallex()

sectionFourScroll()


const menuBtn = document.querySelector('.hamburger')
let isOpen = false
const header = document.querySelector('.header')


const menuTl = gsap.timeline({
    defaults: {
        ease: "power4.inOut",
        duration: 1
    },
    paused: true,
})

menuTl.to('.fixed-nav',{
    clipPath: 'inset(0% 0%)'
})

menuBtn.addEventListener('click', () => {
    if(!isOpen){
        menuTl.play()
        isOpen = true
        header.classList.add('is-active')
    }else{
        menuTl.reverse()
        isOpen = false
        header.classList.remove('is-active')
    }
})


