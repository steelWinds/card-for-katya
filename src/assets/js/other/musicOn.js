let musicOn = ({
    path = null,
    types = null
}) => {
    let audio = new Audio();

    types.forEach((typeItem) => {
        if (audio.canPlayType(`audio/${typeItem}`) === 'maybe'
            || audio.canPlayType(`audio/${typeItem}`) === 'probably') {
            audio.src = `${path}.${typeItem}`;
        }
    });

    audio.addEventListener('canplaythrough', (event) => {
        let target = event.currentTarget;

        target.play();
    });
};

export { musicOn };
