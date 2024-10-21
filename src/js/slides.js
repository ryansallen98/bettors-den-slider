import { disableButtons } from "./buttons";
import { createDot, disableNav } from "./navigation";

export function setSlide(nav, slide, index, slideWidth) {
    const dot = createDot(slide, index, slideWidth);
    nav.appendChild(dot);
};

export function moveToSlide({ currentSlide, targetSlide, isRight, nextButton, prevButton, dots, slideWidth, speed }) {
    disableButtons([nextButton, prevButton], true);
    disableNav(dots, true);

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
        disableButtons([nextButton, prevButton], false);
        disableNav(dots, false);
    }, speed);
};