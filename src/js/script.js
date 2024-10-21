import { createButton, disableButtons } from '@/js/buttons';
import { createNav, disableNav, updateNav } from '@/js/navigation';
import { setSlide, moveToSlide } from '@/js/slides';

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
        const nav = createNav(carousel);

        // Set initial variables
        const direction = this.direction === 'left' ? true : false;
        const autoplay = this.autoplay;
        const speed = this.speed;
        const autoplayTimer = this.autoplayTimer;
        let slideWidth = slides[0].getBoundingClientRect().width;

        // Update slide width on window resize
        window.addEventListener("resize", () => {
            slideWidth = slides[0].getBoundingClientRect().width;
        });

        // Set slides positions and nav
        slides.forEach((slide, index) => setSlide(nav, slide, index, slideWidth));

        // Set initial slide and nav
        prevButton.classList.add("hidden"); // Hide first arrow on load
        const dots = Array.from(nav.children); // Set dots arrays

        // Event listener for next button click
        nextButton.addEventListener("click", (e) => {
            const currentSlide = track.querySelector(".active");
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = nav.querySelector(".active");
            const nextDot = currentDot.nextElementSibling;

            if (nextSlide) {
                moveToSlide({ currentSlide, targetSlide: nextSlide, isRight: direction, nextButton, prevButton, dots, slideWidth, speed });
                updateNav(currentDot, nextDot, autoplayTimer);
            }
        });

        // Event listener for previous button click
        prevButton.addEventListener("click", (e) => {
            const currentSlide = track.querySelector(".active");
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = nav.querySelector(".active");
            const prevDot = currentDot.previousElementSibling;

            if (prevSlide) {
                moveToSlide({ currentSlide, targetSlide: prevSlide, isRight: direction, nextButton, prevButton, dots, slideWidth, speed });
                updateNav(currentDot, prevDot, autoplayTimer);
            }
        });

        // When dot is clicked
        nav.addEventListener("click", (e) => {
            const targetDot = e.target.closest("button");

            if (!targetDot) return;

            const currentSlide = track.querySelector(".active");
            const currentDot = nav.querySelector(".active");
            const currentSlideIndex = slides.findIndex((slide) => slide === currentSlide);
            const targetIndex = dots.findIndex((dot) => dot === targetDot);
            const targetSlide = slides[targetIndex];

            if (targetIndex > currentSlideIndex) {
                moveToSlide({ currentSlide, targetSlide, isRight: direction, nextButton, prevButton, dots, slideWidth, speed });
            } else if (targetIndex < currentSlideIndex) {
                moveToSlide({ currentSlide, targetSlide, isRight: direction, nextButton, prevButton, dots, slideWidth, speed });
            }

            updateNav(currentDot, targetDot, autoplayTimer);
        });

        // If there's only one slide don't show navigation or autoplay
        if (slides.length <= 1) {
            nextButton.classList.add('hidden');
            prevButton.classList.add('hidden');
            nav.classList.add('hidden');
        } else {
            const currentDot = nav.querySelector(".active");
            const timer = currentDot.querySelector(".bd-carousel__nav-dot-timer");
            timer.style.animation = `timerAnimation ${autoplayTimer}ms linear forwards`;

            function startAutoplay() {
                return setInterval(() => {
                    const currentSlide = track.querySelector(".active");
                    const nextSlide = currentSlide.nextElementSibling || slides[0];
                    const currentDot = nav.querySelector(".active");
                    const nextDot = currentDot.nextElementSibling || dots[0];

                    moveToSlide({ currentSlide, targetSlide: nextSlide, isRight: direction, nextButton, prevButton, dots, slideWidth, speed });
                    updateNav(currentDot, nextDot, autoplayTimer);
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

// Initialize the carousel
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.bd-carousel').forEach((carousel) => {
        new BdCarousel(carousel);
    });
});
