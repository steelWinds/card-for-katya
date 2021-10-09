let lazyLoad = ({
    callback = null,
    lastCallback = null
}) => {
    window.addEventListener('scroll', () => {
        let loadElements = document.querySelectorAll('[data-lazy-load]');

        loadElements.forEach((element) => {
            let elCoords = element.getBoundingClientRect();
            let windowHeight = document.documentElement.clientHeight;
            let coords = elCoords.top - (windowHeight + element.clientHeight) / 1.5;

            if (coords <= 0) {
                callback.call(this, element);

                element.removeAttribute('data-lazy-load');
            }
        });

        lastCallback?.call(this);
    });
};

export { lazyLoad };
