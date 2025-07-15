let idx = 0;
const slides = document.querySelectorAll('.slide');
const showSlide = i => {
  slides.forEach((s, j)=> s.style.opacity = j===i ? '1' : '0');
};
setInterval(()=>{
  idx = (idx+1) % slides.length;
  showSlide(idx);
}, 4000);
showSlide(idx);
