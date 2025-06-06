// TypedJS
document.addEventListener("DOMContentLoaded", function() {
  if (window.Typed) {
    new Typed(".auto-type", {
      strings: ["","McKinsey Consultant", "Automobile Engineer", "Occasional Poet", "Avid Blogger"],
      typeSpeed: 100,
      backSpeed: 30,
      loop: true
    });
  }

  // Modal logic
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  var canvasBtn = document.getElementById("test");
  if(canvasBtn) {
    canvasBtn.style.cursor = "pointer";
    canvasBtn.addEventListener("click", function() {
      modal.style.display = "inline-block";
    });
    canvasBtn.addEventListener("keypress", function(e) {
      if(e.key === "Enter" || e.key === " ") {
        modal.style.display = "inline-block";
      }
    });
  }
  span.onclick = function() { modal.style.display = "none"; }
  window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }

  // Slideshow
  var slideIndex = 0;
  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", ""); }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    if(slides.length > 0){
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
    }
    setTimeout(showSlides, 2000);
  }
  showSlides();

  // Responsive: Hide/show canvas and slideshow based on width
  function handleResponsiveElements() {
    var w = window.innerWidth;
    var slideshow = document.querySelector('.slideshow-responsive');
    var canvasWrapper = document.querySelector('.canvas-wrapper');
    var rightColumn = document.querySelector('.right-column');
    var rightCanvasRow = document.querySelector('.right-canvas-row');
    if (w <= 768) {
      if(slideshow) slideshow.style.display = 'none';
      if(canvasWrapper) canvasWrapper.style.display = 'none';
      if(rightColumn) rightColumn.style.display = 'none';
      if(rightCanvasRow) rightCanvasRow.style.display = 'none';
    } else {
      if(slideshow) slideshow.style.display = '';
      if(canvasWrapper) canvasWrapper.style.display = '';
      if(rightColumn) rightColumn.style.display = '';
      if(rightCanvasRow) rightCanvasRow.style.display = '';
    }
    // Move icon-bar above waves on very small screens
    var iconBar = document.getElementById("main-icon-bar");
    if(w <= 480) {
      iconBar.classList.add("icon-bar-horizontal");
    } else {
      iconBar.classList.remove("icon-bar-horizontal");
    }
  }
  window.addEventListener('resize', handleResponsiveElements);
  window.addEventListener('DOMContentLoaded', handleResponsiveElements);

  // particles.js config
  if(window.particlesJS) {
    particlesJS(
      "particles-js",{
        "particles":{
          "number":{
            "value":80,
            "density":{"enable":true,"value_area":800}
          },
          "color":{"value":"#ffffff"},
          "shape":{
            "type":"circle","stroke":{"width":0,"color":"#000000"},
            "polygon":{"nb_sides":5},
            "image":{"src":"img/github.svg","width":100,"height":100}
          },
          "opacity":{"value":0.4,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},
          "size":{"value":3,"random":true,"anim":{"enable":false,"speed":40.00000000000001,"size_min":0.1,"sync":false}},
          "line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},
          "move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}
        },
        "interactivity":{
          "detect_on":"canvas",
          "events":{
            "onhover":{"enable":true,"mode":"repulse"},
            "onclick":{"enable":true,"mode":"push"},
            "resize":true
          },
          "modes":{
            "grab":{"distance":400,"line_linked":{"opacity":1}},
            "bubble":{"distance":400,"size":40.00000000000001,"duration":2,"opacity":8,"speed":3},
            "repulse":{"distance":200,"duration":0.4},
            "push":{"particles_nb":4},
            "remove":{"particles_nb":2}
          }
        },
        "retina_detect":true
      }
    );
  }
});