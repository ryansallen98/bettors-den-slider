export default function createNav(element) {
    const nav = document.createElement("div");
    nav.classList.add("bd-carousel__nav");

    // Append Nav to the DOM
    element.appendChild(nav);
    
    return nav;
}