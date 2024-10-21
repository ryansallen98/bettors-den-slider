import { createButton, disableButtons } from '@/js/buttons';
import { createNav, disableNav } from '@/js/navigation';

class BdCarousel {
    constructor(element) {
        this.element = element;
        this.wrapper = this.element.querySelector('.bd-carousel__wrapper');
        this.currentIndex = 0;

        // Read custom attributes
        this.speed = parseInt(this.element.getAttribute('data-speed')) || 3000; // default to 3000ms
        this.direction = this.element.getAttribute('data-direction') || 'left'; // default direction is left
        this.autoplay = this.element.getAttribute('data-autoplay') === 'true'; // default false
        this.autoplayTimer = parseInt(this.element.getAttribute('data-autoplay-timer')) || 5000; // default to 5000ms

        this.init();
    }

    init() {
        // Create carousel elements
        const carousel = this.element;
        const track = this.wrapper;
        const slides = Array.from(track.children);

        // Create buttons and nav
        const nextButton = createButton(carousel, 'next');
        const prevButton = createButton(carousel, 'prev');
        const dotsNav = createNav(carousel);

        // Set initial variables
        const direction = this.direction;
        const autoplay = this.autoplay;
        const speed = this.speed;
        const autoplayTimer = this.autoplayTimer;
        let slideWidth = slides[0].getBoundingClientRect().width;

        // Disable button clicks
        const buttonsDisabled = (boolean) => {
            nextButton.disabled = boolean;
            prevButton.disabled = boolean;
            dots.forEach((dot) => {
                dot.disabled = boolean;
            });
        };

        // Update slide width on window resize
        window.addEventListener("resize", () => {
            slideWidth = slides[0].getBoundingClientRect().width;
        });


        function setSlide(slide, index) {
            // Create dots
            const dot = document.createElement("button");
            dot.classList.add("bd-carousel__nav-dot");

            const timer = document.createElement("div");
            timer.classList.add("bd-carousel__nav-dot-timer");

            const text = document.createElement("p");
            const slideTitle = slide.querySelector(".wp-block-heading")
            if (slideTitle) {
                text.innerText = slideTitle.innerText;;
            }

            // If it's the first slide, set it as active and position it at 0px
            if (index === 0) {
                slide.classList.add("active");
                dot.classList.add("active");
                slide.style.transform = `translateX(${0}px)`;
            } else {
                slide.style.transform = `translateX(${slideWidth}px)`;
            }

            dot.appendChild(timer);
            dot.appendChild(text);
            dotsNav.appendChild(dot);
        };

        // Set slides positions and nav
        slides.forEach(setSlide);

        prevButton.classList.add("hidden"); // Hide first arrow on load
        const dots = Array.from(dotsNav.children); // Set dots arrays


        function moveToSlide(currentSlide, targetSlide, isRight) {
            buttonsDisabled(true);

            targetSlide.style.transition = `transform ${speed}ms ease`;
            targetSlide.style.transform = `translateX(${0}px)`;
            currentSlide.classList.remove("active");
            targetSlide.classList.add("active");

            // Hide arrows if at end of carousel
            if (!targetSlide.nextElementSibling) {
                nextButton.classList.add("hidden");
                prevButton.classList.remove("hidden");
            } else if (!targetSlide.previousElementSibling) {
                prevButton.classList.add("hidden");
                nextButton.classList.remove("hidden");
            } else {
                nextButton.classList.remove("hidden");
                prevButton.classList.remove("hidden");
            }

            // Transition the current slide out of view after a short delay
            setTimeout(() => {
                targetSlide.style.transition = `transform ${0}ms ease`;
                currentSlide.style.transform = `translateX(${isRight ? "" : "-"
                    }${slideWidth}px)`;
                buttonsDisabled(false);
            }, speed);
        };

        function updateDots(currentDot, targetDot) {
            currentDot.classList.remove("active");
            targetDot.classList.add("active");

            const oldTimer = currentDot.querySelector(".bd-carousel__nav-dot-timer");
            oldTimer.style.animation = ``;

            const newTimer = targetDot.querySelector(".bd-carousel__nav-dot-timer");
            newTimer.style.animation = `timerAnimation ${autoplayTimer}ms linear forwards`;
        };

        // Event listener for next button click
        nextButton.addEventListener("click", (e) => {
            const currentSlide = track.querySelector(".active");
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = dotsNav.querySelector(".active");
            const nextDot = currentDot.nextElementSibling;

            if (nextSlide) {
                moveToSlide(currentSlide, nextSlide, false);
                updateDots(currentDot, nextDot);
            }
        });

        // Event listener for previous button click
        prevButton.addEventListener("click", (e) => {
            const currentSlide = track.querySelector(".active");
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsNav.querySelector(".active");
            const prevDot = currentDot.previousElementSibling;

            if (prevSlide) {
                moveToSlide(currentSlide, prevSlide, true);
                updateDots(currentDot, prevDot);
            }
        });

        // When dot is clicked
        dotsNav.addEventListener("click", (e) => {
            const targetDot = e.target.closest("button");

            if (!targetDot) return;

            const currentSlide = track.querySelector(".active");
            const currentDot = dotsNav.querySelector(".active");
            const currentSlideIndex = slides.findIndex((slide) => slide === currentSlide);
            const targetIndex = dots.findIndex((dot) => dot === targetDot);
            const targetSlide = slides[targetIndex];

            if (targetIndex > currentSlideIndex) {
                moveToSlide(currentSlide, targetSlide, false);
            } else if (targetIndex < currentSlideIndex) {
                moveToSlide(currentSlide, targetSlide, true);
            }

            updateDots(currentDot, targetDot);
        });


        // If there's only one slide don't show navigation or autoplay
        if (slides.length <= 1) {
            nextButton.classList.add('hidden');
            prevButton.classList.add('hidden');
            dotsNav.classList.add('hidden');
        } else {
            const currentDot = dotsNav.querySelector(".active");
            const timer = currentDot.querySelector(".bd-carousel__nav-dot-timer");
            timer.style.animation = `timerAnimation ${autoplayTimer}ms linear forwards`;

            function startAutoplay() {
                return setInterval(() => {
                    const currentSlide = track.querySelector(".active");
                    const nextSlide = currentSlide.nextElementSibling || slides[0];
                    const currentDot = dotsNav.querySelector(".active");
                    const nextDot = currentDot.nextElementSibling || dots[0];

                    moveToSlide(currentSlide, nextSlide, false);
                    updateDots(currentDot, nextDot);
                }, autoplayTimer);
            }
            autoplayInterval = startAutoplay();


            nextButton.addEventListener("click", () => {
                clearInterval(autoplayInterval);
                autoplayInterval = startAutoplay();
            });
            prevButton.addEventListener("click", () => {
                clearInterval(autoplayInterval);
                autoplayInterval = startAutoplay();
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.bd-carousel').forEach((carousel) => {
        new BdCarousel(carousel);
    });
});
