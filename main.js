import $ from "jquery";

import { gsap } from "gsap";
import Lenis from '@studio-freight/lenis'

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { rainbowCursor } from "cursor-effects";
import SplitType from 'split-type'
import imagesLoaded from "imagesloaded";




const body = document.body;
let IMAGES;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase)

function lenis(){
const lenis = new Lenis({
  duration: 1.2,
  easing: (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  // https://www.desmos.com/calculator/brs54l4xou 
  direction: 'vertical',
  // vertical, horizontal 
  gestureDirection: 'vertical',
  // vertical, horizontal, both 
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

//get scroll value 
lenis.on('scroll', ({scroll, limit, velocity, direction, progress})=>{
  
}
)

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

}


function navHideandShow(){

  document.addEventListener("DOMContentLoaded", function() {
    let prevScrollPos = window.pageYOffset;
    let scrolledDistance = 0;
    const header = document.querySelector(".navbar");
    const headerSpacer = document.querySelector(".header_spacer");
    const originalSpacerHeight = getComputedStyle(headerSpacer).height;
    window.addEventListener("scroll", function() {
      const currentScrollPos = window.pageYOffset;
      const windowWidth = window.innerWidth;
      scrolledDistance += Math.abs(currentScrollPos - prevScrollPos);
      if (scrolledDistance > 200) {
        if (prevScrollPos > currentScrollPos) {
          // Затримка зміни видимості на 0.3 секунди
          setTimeout(function() {
            header.style.transform = "translateY(0)";
            headerSpacer.style.height = windowWidth < 767 ? "1rem" : "1.25rem";
          }, 300);
        } else {
          // Затримка зміни видимості на 0.3 секунди
          setTimeout(function() {
            header.style.transform = "translateY(-100%)";
            headerSpacer.style.height = originalSpacerHeight;
          }, 300);
        }
        // Скидаємо відстань прокрутки після затримки
        scrolledDistance = 0;
      }
      prevScrollPos = currentScrollPos;
    });
  });

}

navHideandShow();

function customEase(){


  let customEase =
  "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
let counter = {
  value: 0
};
let loaderDuration = 2;

// If not a first time visit in this tab
if (sessionStorage.getItem("visited") !== null) {
  loaderDuration = 2;
  counter = {
    value: 75
  };
}
sessionStorage.setItem("visited", "true");

function updateLoaderText() {
  let progress = Math.round(counter.value);
  $(".loader_number").text(progress);
}
function endLoaderAnimation() {
  $(".trigger").click();
}

let tl = gsap.timeline({
  onComplete: endLoaderAnimation
});
tl.to(counter, {
  value: 100,
  onUpdate: updateLoaderText,
  duration: loaderDuration,
  ease: CustomEase.create("custom", customEase)
});
tl.to(
  ".loader_progress",
  {
    width: "100%",
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
  },
  0
);

}
// customEase()




function textRevel(){
  gsap.registerPlugin(ScrollTrigger);

  const splitTypes = document.querySelectorAll('.reveal-type');
  splitTypes.forEach((char,i)=>{
      const text = new SplitType(char,{
          types: ['chars', 'words']
      });
      gsap.from(text.chars, {
          scrollTrigger: {
              trigger: char,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
              markers: false
          },
          opacity: 0.2,
          stagger: 0.1,
      })
  }
  );
}


function textStagger(){
  const letterWrapClass = 'letter-wrap';
  const letterWrapElements = document.getElementsByClassName(letterWrapClass);
  
  [...letterWrapElements].forEach(el => {
    letterWrap(el, letterWrapClass);
    letterAnimation(el, letterWrapClass);
  });
  
  
  
  function letterWrap(el, cls) {
    const words = el.textContent.split(' ');
    const letters = [];
    
    cls = cls || 'letter-wrap'
    
    words.forEach(word => {
      let html = '';
      for (var letter in word) {
        html += `
          <span class="${cls}__char">
            <span class="${cls}__char-inner" data-letter="${word[letter]}">
              ${word[letter]}
            </span>
          </span>
        `;
      };
      
      let wrappedWords = `<span class="${cls}__word">${html}</span>`;
      letters.push(wrappedWords);
    });
    
    return el.innerHTML = letters.join(' ');
  }
  
  function letterAnimation(el, cls) {
    const tl = gsap.timeline({ paused: true });
    const characters = el.querySelectorAll(`.${cls}__char-inner`);
    const duration = el.hasAttribute('data-duration') ? el.dataset.duration : 0.3;
    const stagger = el.hasAttribute('data-stagger') ? el.dataset.stagger : 0.03;
    
    el.animation = tl.staggerTo(characters, duration, {
      y: '-100%',
      ease: "Power4.easeOut"
    }, stagger);
        
    el.addEventListener('mouseenter', (event) => event.currentTarget.animation.play());
    el.addEventListener('mouseout', (event) => el.animation.reverse());
  }
}



function navOpenClose(){

  let ham= document.querySelector('.header_menu-wrap')
let menu= document.querySelector('.nav-side-wrap')

let navWhiteWap= document.querySelector('.nav-white-wrap')

const links = menu.querySelectorAll('.menu-link ');
gsap.set(navWhiteWap, {  scale: 0});

var tl = gsap.timeline({ paused: true });

tl.to(menu, {

	opacity: 1,
	// height: '60vh', // change this to 100vh for full-height menu
  display:'flex',
 duration:0,

})
tl.to('.nav-white-wrap',{
 
	opacity: 1,
	// height: '60vh', // change this to 100vh for full-height menu
  duration:0.5,
  y:4,
  scale:1

})


tl.reverse();

ham.addEventListener('click', () => {

	tl.reversed(!tl.reversed());
});

}

navOpenClose();


// Preload images
const preloadImages = new Promise((resolve, reject) => {
  imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
});

const preloadEverything = [ preloadImages];

let isLoaded = false;
let isLoadingAnimationEnd = false;

const entranceAnimation = () => {
  const tl = gsap.timeline();
  tl.to(".loading-image", {
    y: -100,
    duration: 1,
    ease: "power2.inOut"
  })
    .to(
      ".loading",
      {
        yPercent: -100,
        duration: 1.25,
        ease: "power4.inOut"
      },
      0
    )
    .to(
      ".image",
      {
        duration: 1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out"
      },
      0.6
    );
};

const loadingAnimation = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      isLoadingAnimationEnd = true;
      if (isLoaded) entranceAnimation();
    }
  }).from(".loading", {
      yPercent: 100,
      ease: "power3.inOut",
      duration: 1
    })
    .from(
      ".loading-image",
      {
        y: 80,
        duration: 1,
        ease: "power2.out"
      },
      0.5
    );
};

// And then..
Promise.all(preloadEverything).then(() => {
  // Remove the loader
  
  isLoaded = true;
  if (isLoadingAnimationEnd) entranceAnimation();

  lenis();
  textRevel();
  textStagger();
  loadingAnimation()
});

