document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content-preload");
  const minDisplayTime = 1000; 
  setTimeout(() => {
    preloader.style.opacity = "0"; 
    setTimeout(() => {
        preloader.style.display = "none";
        content.style.display = "block";
    }, 0); 
  }, minDisplayTime);
});