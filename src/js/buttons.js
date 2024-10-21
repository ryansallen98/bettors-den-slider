export function createButton(element, type) {
    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.classList.add("bi");
    if (type === 'next') {
        button.classList.add("bd-carousel__btn--next");
        icon.classList.add("bi-arrow-right-short");
    } else if (type === 'prev') {
        button.classList.add("bd-carousel__btn--prev");
        icon.classList.add("bi-arrow-left-short");
    }
    button.appendChild(icon);

    // Append Button to the DOM
    element.appendChild(button);

    return button
}

export function disableButtons(buttons, boolean) {
    buttons.forEach((button) => {
        button.disabled = boolean;
    });
}