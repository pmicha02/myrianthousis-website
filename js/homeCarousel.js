const homeSlides = document.querySelectorAll('.home-hero-image');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (homeSlides.length > 1 && !reduceMotion.matches) {
    let activeSlideIndex = 0;

    window.setInterval(() => {
        const outgoingSlide = homeSlides[activeSlideIndex];
        activeSlideIndex = (activeSlideIndex + 1) % homeSlides.length;
        const incomingSlide = homeSlides[activeSlideIndex];

        outgoingSlide.classList.remove('is-active');
        outgoingSlide.classList.add('is-exiting');
        incomingSlide.classList.add('is-active');

        window.setTimeout(() => {
            outgoingSlide.classList.remove('is-exiting');
        }, 1000);
    }, 6000);
}
