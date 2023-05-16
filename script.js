const track = document.querySelector(".carousel-image-wrapper");
let currentIndex = 0;
const images = Array.from(track.children);
const previousButton = document.querySelector(".carousel-button.previous");
const nextButton = document.querySelector(".carousel-button.next");
const carouselNav = document.querySelector(".carousel-nav");
const dots = Array.from(carouselNav.children);

// const imageSize = images[0].getBoundingClientRect();
// const imageWidth = imageSize.width;
const imageWidth = images[0].getBoundingClientRect().width;

const setImgPosition = (image, index) => {
  image.style.left = imageWidth * index + "px";
};
images.forEach(setImgPosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

previousButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = carouselNav.querySelector(".current-slide");
  let prevSlide;
  let prevDot;
  if (currentIndex == 0) {
    currentIndex = images.length - 1;
    console.log(`The current index is ${currentIndex}`);
    prevDot = dots[currentIndex];
    prevSlide = images[currentIndex];
  } else {
    currentIndex--;
    console.log(`The current index is ${currentIndex}`);
    prevSlide = currentSlide.previousElementSibling;
    prevDot = currentDot.previousElementSibling;
  }
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
});
nextButton.addEventListener("click", (e) => {
  moveToNextSlide();
});

function moveToNextSlide() {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = carouselNav.querySelector(".current-slide");
  let nextSlide;
  let nextDot;
  if (currentIndex == images.length - 1) {
    document.getElementById("imageCarousel").style.transitionDuration = "0ms";

    currentIndex = 0;
    console.log(`The current index is ${currentIndex}`);
    nextDot = dots[currentIndex];
    nextSlide = images[currentIndex];
  } else {
    currentIndex++;
    document.getElementById("imageCarousel").style.transitionDuration =
      "1000ms";

    console.log(`The current index is ${currentIndex}`);

    nextSlide = currentSlide.nextElementSibling;
    nextDot = currentDot.nextElementSibling;
  }
  console.log(`The next slide is ${nextSlide}`);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
}
// Start the slideshow
const slideshow = setInterval(moveToNextSlide, 3000);

carouselNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = carouselNav.querySelector(".current-slide");
  currentIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = images[currentIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});
