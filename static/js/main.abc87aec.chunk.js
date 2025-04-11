(this["webpackJsonpgithub-profile"]=this["webpackJsonpgithub-profile"]||[]).push([[0],{10:function(e,t,a){e.exports=a(19)},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var o=a(0),r=a.n(o),n=a(6),i=a.n(n),l=(a(18),a(1));const s=l.d.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${e=>e.$scrolled?e.theme.background:"transparent"};
  backdrop-filter: ${e=>e.$scrolled?"blur(10px)":"none"};
  box-shadow: ${e=>e.$scrolled?"0 2px 10px rgba(0, 0, 0, 0.1)":"none"};
  color: ${e=>e.$scrolled?e.theme.text:"white"};
  padding: 15px 0;
  transition: all 0.3s ease;
  z-index: 1000;
`,d=l.d.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,c=l.d.div`
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
`,m=l.d.nav`
  display: flex;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${e=>e.$isOpen?"0":"-100%"};
    width: 70%;
    height: 100vh;
    background-color: ${e=>e.theme.secondaryBackground};
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 80px;
    transition: all 0.3s ease;
    box-shadow: ${e=>e.$isOpen?"-5px 0 15px rgba(0, 0, 0, 0.1)":"none"};
  }
`,p=l.d.a`
  margin: 0 15px;
  text-decoration: none;
  color: ${e=>e.$scrolled?e.theme.text:"white"};
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background-color: ${e=>e.theme.accent};
    left: 0;
    bottom: -5px;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${e=>e.theme.accent};
    
    &:after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    margin: 20px 30px;
    font-size: 1.2rem;
  }
`,g=l.d.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`,h=l.d.div`
  width: 25px;
  height: 3px;
  background-color: ${e=>e.$scrolled?e.theme.text:"white"};
  position: relative;
  transition: all 0.3s ease;
  transform: ${e=>e.$isOpen?"rotate(45deg)":"none"};
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: ${e=>e.$scrolled?e.theme.text:"white"};
    transition: all 0.3s ease;
  }
  
  &:before {
    transform: ${e=>e.$isOpen?"rotate(90deg) translate(0, 0)":"translateY(-8px)"};
  }
  
  &:after {
    transform: ${e=>e.$isOpen?"rotate(90deg) translate(0, 0)":"translateY(8px)"};
    opacity: ${e=>e.$isOpen?0:1};
  }
`;var x=()=>{const[e,t]=Object(o.useState)(!1),[a,n]=Object(o.useState)(!1);Object(o.useEffect)(()=>{const e=()=>{const e=window.scrollY;t(e>50)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}},[]);const i=e=>{document.querySelector(e).scrollIntoView({behavior:"smooth"}),n(!1)};return r.a.createElement(s,{$scrolled:e},r.a.createElement(d,null,r.a.createElement(c,{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})}},"lel190"),r.a.createElement(g,{onClick:()=>n(!a)},r.a.createElement(h,{$isOpen:a,$scrolled:e})),r.a.createElement(m,{$isOpen:a},r.a.createElement(p,{href:"#about",$scrolled:e,onClick:e=>{e.preventDefault(),i("#about")}},"About"),r.a.createElement(p,{href:"#projects",$scrolled:e,onClick:e=>{e.preventDefault(),i("#projects")}},"Projects"),r.a.createElement(p,{href:"#skills",$scrolled:e,onClick:e=>{e.preventDefault(),i("#skills")}},"Skills"),r.a.createElement(p,{href:"https://github.com/le-lel190",target:"_blank",rel:"noopener noreferrer",$scrolled:e},"GitHub"))))};const u=l.e`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,f=l.d.section`
  padding: 100px 0;
  border-bottom: 1px solid ${e=>e.theme.border};
  position: relative;
  overflow: hidden;
`,b=l.d.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    width: 70%;
    height: 3px;
    background-color: ${e=>e.theme.accent};
    left: 0;
    bottom: -5px;
  }
`,w=l.d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,y=l.d.div`
  animation: ${u} 0.8s forwards;
`,$=l.d.div`
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${u} 0.8s forwards;
  animation-delay: 0.2s;
  opacity: 0;
  position: relative;
  
  .main-image {
    width: 100%;
    height: auto;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  @media (max-width: 768px) {
    margin-top: 30px;
    animation-delay: 0s;
  }
`,E=l.d.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${e=>e.theme.secondaryText};
`,v=l.d.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  animation: ${u} 0.8s forwards;
  animation-delay: ${e=>e.$delay||"0s"};
  opacity: 0;
  
  .icon {
    margin-right: 15px;
    font-size: 1.5rem;
    color: ${e=>e.theme.accent};
  }
  
  .text {
    font-size: 1.1rem;
  }
`,k=l.d.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 12px 25px;
  background-color: ${e=>e.theme.accent};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${u} 0.8s forwards;
  animation-delay: 0.6s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background-color: ${e=>e.theme.accent};
  }
`,z=l.d.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: ${e=>e.theme.accent};
  opacity: 0.05;
  z-index: -1;
  top: -150px;
  right: -150px;
`;var j=()=>r.a.createElement(f,{id:"about"},r.a.createElement(z,null),r.a.createElement(b,null,"About Me"),r.a.createElement(w,null,r.a.createElement(y,null,r.a.createElement(E,null,"Hello! I'm Anson (lel190), a passionate Computer Science student at CUHK with a keen interest in different frontend frameworks and creating beautiful user experiences. I am also interested in reverse engineering and memory hacking even though I am just a beginner."),r.a.createElement(v,{$delay:"0.2s"},r.a.createElement("div",{className:"icon"},r.a.createElement("span",{role:"img","aria-label":"Books"},"\ud83d\udcda")),r.a.createElement("div",{className:"text"},"Currently studying Computer Science at CUHK")),r.a.createElement(v,{$delay:"0.3s"},r.a.createElement("div",{className:"icon"},r.a.createElement("span",{role:"img","aria-label":"Growing plant"},"\ud83c\udf31")),r.a.createElement("div",{className:"text"},"Exploring different frontend frameworks")),r.a.createElement(v,{$delay:"0.4s"},r.a.createElement("div",{className:"icon"},r.a.createElement("span",{role:"img","aria-label":"Computer"},"\ud83d\udcbb")),r.a.createElement("div",{className:"text"},"Learning backend development with Node.js and Express.js")),r.a.createElement(v,{$delay:"0.5s"},r.a.createElement("div",{className:"icon"},r.a.createElement("span",{role:"img","aria-label":"Lock"},"\ud83d\udd12")),r.a.createElement("div",{className:"text"},"Interested in cybersecurity and ethical hacking")),r.a.createElement(k,{href:"https://linktr.ee/lel190",target:"_blank",rel:"noopener noreferrer"},"Contact Me")),r.a.createElement($,null,r.a.createElement("img",{className:"main-image",src:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",alt:"Coding workspace"}))));const C=l.d.section`
  padding: 60px 0;
  border-bottom: 1px solid #e9ecef;
`,S=l.d.h2`
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  ${e=>e.$constructionTitle&&l.c`
    &:after {
      content: "🚧";
      font-size: 0.8em;
      position: absolute;
      top: -10px;
      right: -30px;
      animation: jackhammer 0.5s infinite;
    }
  `}
`,N=l.d.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,P=l.e`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
`,Y=l.e`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`,O=l.e`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
`,H=l.d.div`
  background-color: ${e=>e.theme.secondaryBackground};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    
    .dust-particles .particle {
      animation-play-state: running;
    }
  }
  
  ${e=>e.$inProgress&&l.c`
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: repeating-linear-gradient(
        -45deg,
        rgba(255, 204, 0, 0.1),
        rgba(255, 204, 0, 0.1) 10px,
        rgba(0, 0, 0, 0.05) 10px,
        rgba(0, 0, 0, 0.05) 20px
      );
      z-index: 0;
      animation: ${P} 3s linear infinite;
      pointer-events: none;
    }
  `}
`,I=l.d.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 3;
  pointer-events: none;
`,M=l.d.div`
  position: absolute;
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  background-color: rgba(255, 204, 0, 0.3);
  border-radius: 50%;
  bottom: 0;
  left: ${e=>e.$left}%;
  animation: ${O} ${e=>e.$duration}s linear infinite;
  animation-delay: ${e=>e.$delay}s;
  animation-play-state: paused;
`,A=l.d.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff9800;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  animation: ${Y} 2s ease-in-out infinite;
  display: flex;
  align-items: center;
`,B=l.d.div`
  position: relative;
  z-index: 1;
`,L=l.d.h3`
  margin-bottom: 0.5rem;
  color: ${e=>e.theme.text};
`,T=l.d.p`
  margin-bottom: 1rem;
  color: ${e=>e.theme.text};
`,D=l.d.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
`,G=l.d.span`
  background-color: ${e=>e.theme.border};
  color: ${e=>e.theme.text};
  font-size: 0.8rem;
  padding: 3px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
`,R=l.d.a`
  display: inline-block;
  background-color: ${e=>e.theme.accent};
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`,U=l.d.div`
  height: 6px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 3px;
  margin: 15px 0;
  overflow: hidden;
`,X=l.d.div`
  height: 100%;
  width: ${e=>e.$progress}%;
  background-color: #4caf50;
  border-radius: 3px;
`,J=l.d.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
  z-index: 10;
  
  ${H}:hover & {
    opacity: 1;
  }
`,K=l.d.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`,V=l.d.div`
  font-size: 0.9rem;
  opacity: 0.8;
`,_=[{id:1,title:"Secret...",description:"Secret...",tags:["React","Node.js"],link:"#",inProgress:!0,progress:35,dustParticles:(e=>{const t=[];for(let a=0;a<e;a++)t.push({id:a,size:5*Math.random()+2,left:100*Math.random(),duration:3*Math.random()+2,delay:2*Math.random()});return t})(15),comingSoon:!0,estimatedCompletion:"To Be Available",icon:"hammer"}];var q=()=>r.a.createElement(C,{id:"projects",className:"under-construction"},r.a.createElement(S,null,"Projects"),r.a.createElement(N,null,_.map(e=>r.a.createElement(H,{key:e.id,$inProgress:e.inProgress,className:e.inProgress?"in-progress":""},e.inProgress&&r.a.createElement(A,null,r.a.createElement("span",{className:"construction-icon "+e.icon},"hammer"===e.icon?"\ud83d\udd28":"\ud83d\udd27"),"IN PROGRESS"),e.comingSoon&&r.a.createElement(J,null,r.a.createElement(K,null,"Coming Soon"),r.a.createElement(V,null,"Estimated completion: ",e.estimatedCompletion)),r.a.createElement(B,null,r.a.createElement(L,null,e.title),r.a.createElement(T,null,e.description),e.inProgress&&r.a.createElement(U,null,r.a.createElement(X,{$progress:e.progress})),r.a.createElement(D,null,e.tags.map((e,t)=>r.a.createElement(G,{key:t},e))),r.a.createElement(R,{href:e.link},e.inProgress?"Preview":"View Project")),e.inProgress&&r.a.createElement(I,{className:"dust-particles"},e.dustParticles.map(e=>r.a.createElement(M,{key:e.id,className:"particle",$size:e.size,$left:e.left,$duration:e.duration,$delay:e.delay})))))));const W=l.d.section`
  padding: 60px 0;
  border-bottom: 1px solid ${e=>e.theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`,F=l.d.h2`
  margin-bottom: 1.5rem;
  color: ${e=>e.theme.text};
`,Q=l.d.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Z=l.d.div`
  background-color: ${e=>e.theme.secondaryBackground};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,ee=l.d.h3`
  margin-bottom: 0.5rem;
  color: ${e=>e.theme.text};
`,te=l.d.ul`
  list-style-position: inside;
  margin-top: 10px;
`,ae=l.d.li`
  margin-bottom: 5px;
  color: ${e=>e.theme.text};
`,oe=[{category:"Languages",skills:["Python","C/C++","Java","R","SQL"]},{category:"Web Development",skills:["React","Node.js","Express.js","JavaScript","HTML/CSS"]},{category:"Other",skills:["Git","Linux","Docker"]}];var re=()=>r.a.createElement(W,{id:"skills"},r.a.createElement(F,null,"Skills"),r.a.createElement(Q,null,oe.map((e,t)=>r.a.createElement(Z,{key:t},r.a.createElement(ee,null,e.category),r.a.createElement(te,null,e.skills.map((e,t)=>r.a.createElement(ae,{key:t},e)))))));const ne=l.d.footer`
  background-color: ${e=>e.theme.secondaryBackground};
  color: ${e=>e.theme.text};
  padding: 50px 0 20px;
`,ie=l.d.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`,le=l.d.div`
  margin-bottom: 30px;
`,se=l.d.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
`,de=l.d.p`
  color: ${e=>e.theme.secondaryText};
  margin-bottom: 20px;
  line-height: 1.6;
`,ce=l.d.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`,me=l.d.a`
  color: ${e=>e.theme.secondaryText};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${e=>e.theme.accent};
    transform: translateY(-3px);
  }
`,pe=l.d.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: ${e=>e.theme.accent};
    left: 0;
    bottom: -8px;
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`,ge=l.d.a`
  display: block;
  color: ${e=>e.theme.secondaryText};
  margin-bottom: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${e=>e.theme.accent};
    transform: translateX(5px);
    
    @media (max-width: 768px) {
      transform: none;
    }
  }
`,he=l.d.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid ${e=>e.theme.border};
  color: ${e=>e.theme.secondaryText};
  font-size: 0.9rem;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;var xe=()=>r.a.createElement(ne,null,r.a.createElement(ie,null,r.a.createElement(le,null,r.a.createElement(se,null,"lel190 - Anson"),r.a.createElement(de,null,"A computer science student at CUHK exploring different frontend frameworks, and am interested in reverse engineering and memory hacking."),r.a.createElement(ce,null,r.a.createElement(me,{href:"https://github.com/le-lel190",target:"_blank",rel:"noopener noreferrer","aria-label":"GitHub"},r.a.createElement("i",{className:"fab fa-github"})),r.a.createElement(me,{href:"https://www.linkedin.com/in/le-anson-cheung/",target:"_blank",rel:"noopener noreferrer","aria-label":"LinkedIn"},r.a.createElement("i",{className:"fab fa-linkedin"})))),r.a.createElement(le,null,r.a.createElement(pe,null,"Links"),r.a.createElement(ge,{href:"#about"},"About"),r.a.createElement(ge,{href:"#projects"},"Projects"),r.a.createElement(ge,{href:"#skills"},"Skills")),r.a.createElement(le,null,r.a.createElement(pe,null,"Contact"),r.a.createElement(ge,{href:"https://linktr.ee/lel190"},"Linktree"),r.a.createElement(ge,{href:"https://github.com/le-lel190"},"GitHub"))),r.a.createElement(he,null));const ue=l.e`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,fe=l.e`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`,be=l.d.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`,we=l.d.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  filter: brightness(0.6);
`,ye=l.d.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    ${e=>e.theme.background} 100%
  );
`,$e=l.d.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  animation: ${ue} 1s ease-out;
`,Ee=l.d.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 20px;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${ue} 1s ease-out;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,ve=l.d.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  color: white;
  font-weight: 700;
`,ke=l.d.p`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`,ze=l.d.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`,je=l.d.a`
  padding: 12px 25px;
  background: ${e=>e.$primary?e.theme.accent:"transparent"};
  color: white;
  border: ${e=>e.$primary?"none":"2px solid white"};
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fe} 0.8s ease-out forwards;
  animation-delay: ${e=>e.$delay||"0s"};
  opacity: 0;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background: ${e=>e.$primary?e.theme.accent:"rgba(255, 255, 255, 0.1)"};
  }
`,Ce=l.d.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 15px;
  cursor: pointer;
  animation: ${ue} 1s ease-out 1.5s forwards;
  opacity: 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
    animation: scrollAnimation 1.5s infinite;
  }
  
  @keyframes scrollAnimation {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(15px);
    }
  }
`;var Se=()=>{const[e,t]=Object(o.useState)(!1),a=()=>{window.scrollTo({top:window.innerHeight,behavior:"smooth"})};return r.a.createElement(be,null,r.a.createElement(we,{autoPlay:!0,muted:!0,loop:!0,onLoadedData:()=>t(!0),style:{opacity:e?.2:0}},r.a.createElement("source",{src:"https://assets.codepen.io/3364143/7btrrd.mp4",type:"video/mp4"}),"Your browser does not support the video tag."),r.a.createElement(ye,null),r.a.createElement($e,null,r.a.createElement(Ee,null,r.a.createElement("img",{src:"/le-lel190/images/avatar.jpg",alt:"Anson's avatar"})),r.a.createElement(ve,null,"Hi, I'm Anson ",r.a.createElement("span",{role:"img","aria-label":"Waving hand"},"\ud83d\udc4b")),r.a.createElement(ke,null,"Currently pursuing a Bachelor's degree in Computer Science at CUHK. I am currently interested in frontend development and exploring CI/CD tools."),r.a.createElement(ze,null,r.a.createElement(je,{href:"#about",$primary:!0,$delay:"0.3s",onClick:a},"About Me"),r.a.createElement(je,{href:"#projects",$delay:"0.5s",onClick:e=>{e.preventDefault(),document.querySelector("#projects").scrollIntoView({behavior:"smooth"})}},"See My Projects"))),r.a.createElement(Ce,{onClick:a}))};const Ne=l.b`
  body {
    margin: 0;
    padding: 0;
    background-color: ${e=>e.theme.background};
    color: ${e=>e.theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${e=>e.theme.accent};
    color: ${e=>e.theme.background};
  }
`,Pe={background:"#ffffff",secondaryBackground:"#f8f9fa",text:"#212529",secondaryText:"#6c757d",accent:"#0d6efd",border:"#e9ecef"},Ye={background:"#121212",secondaryBackground:"#1e1e1e",text:"#ffffff",secondaryText:"#e0e0e0",accent:"#0d6efd",border:"#343a40"},Oe=l.d.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`,He=l.d.main`
  flex: 1;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`,Ie=l.d.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${e=>e.theme.accent};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;var Me=function(){const[e,t]=Object(o.useState)(Ye);return r.a.createElement(l.a,{theme:e},r.a.createElement(Ne,null),r.a.createElement(Oe,null,r.a.createElement(Se,null),r.a.createElement(x,null),r.a.createElement(He,null,r.a.createElement(j,null),r.a.createElement(q,null),r.a.createElement(re,null)),r.a.createElement(xe,null),r.a.createElement(Ie,{onClick:()=>{t(e===Pe?Ye:Pe)},"aria-label":e===Pe?"Switch to dark mode":"Switch to light mode"},e===Pe?r.a.createElement("span",{role:"img","aria-hidden":"true"},"\ud83c\udf19"):r.a.createElement("span",{role:"img","aria-hidden":"true"},"\u2600\ufe0f"))))};i.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Me,null)))}},[[10,1,2]]]);
//# sourceMappingURL=main.abc87aec.chunk.js.map