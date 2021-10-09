let removeSelectors = (selector) => {
    let elements = Array.from(document.querySelectorAll(selector));

    elements.forEach((element) => {
        element.remove();
    });
};

export { removeSelectors };
