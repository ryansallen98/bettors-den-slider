export function createNav(element) {
    const nav = document.createElement("div");
    nav.classList.add("bd-carousel__nav");

    // Append Nav to the DOM
    element.appendChild(nav);

    return nav;
}

export function disableNav(dots, boolean) {
    dots.forEach((dot) => {
        dot.disabled = boolean;
    });
}

export function createDot(slide, index, slideWidth) {
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

    return dot;
}

export function updateNav(currentDot, targetDot, autoplayTimer) {
    currentDot.classList.remove("active");
    targetDot.classList.add("active");

    const oldTimer = currentDot.querySelector(".bd-carousel__nav-dot-timer");
    oldTimer.style.animation = ``;

    const newTimer = targetDot.querySelector(".bd-carousel__nav-dot-timer");
    newTimer.style.animation = `timerAnimation ${autoplayTimer}ms linear forwards`;
};