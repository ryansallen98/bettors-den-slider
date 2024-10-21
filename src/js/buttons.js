export default function createButton(type) {
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
    return button
}
