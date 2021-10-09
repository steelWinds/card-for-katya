/* eslint-disable no-param-reassign */
import anime from 'animejs/lib/anime.es.js';
import Typed from 'typed.js';
import ScrollReveal from 'scrollreveal';

import { countCallLimit } from './other/countCallLimit.js';
import { removeSelectors } from './other/removeSelectors.js';
import { musicOn } from './other/musicOn.js';

let boxes = document.querySelectorAll('.box');
let container = document.querySelector('.container');
let contentCard = document.querySelector('.contentCard');
let contentCardTitle = document.querySelector('.contentCard__title');
let contentCardTitleTyped = document.querySelector('.contentCard__typedTitle');
let contentCardBtn = document.querySelector('.contentCard__btn');
let playerWrapper = document.querySelector('.player__wrapper');
let player = document.querySelector('.player');
let gallary = document.querySelector('.gallary');
let gallaryItems = document.querySelectorAll('.gallary__item');

let easingCollection = [
    'easeInExpo',
    'easeInCirc',
    'easeOutQuart',
    'easeOutQuint',
    'easeOutSine',
    'easeOutExpo',
    'easeOutCirc',
    'easeOutBack',
    'easeInBounce',
    'easeInOutQuad',
    'easeInOutCubic',
    'easeInOutQuart',
    'easeInOutQuint',
    'easeOutInBack'
];

let gridAnimation = (mainTarget) => {
    container.classList.add('container_columnMode');

    mainTarget.classList.remove('dsNone');
    mainTarget.style.transform = 'translateX(-20px)';

    anime({
        targets: mainTarget,
        translateX: 0,
        opacity: 1,
        duration: 600,
        easing: 'easeInOutQuad',
        complete() {
            ScrollReveal().reveal(gallaryItems, {
                reset: true,
                scale: 0.9,
                rotate: {
                    x: 50
                },
                duration: 600,
                delay: 100
            });
        }
    });
};

let musicOnAnimation = (btn) => {
    btn.classList.add('contentCard_btnActive');
    btn.style.transform = 'translateY(20px)';

    anime({
        targets: btn,
        translateY: 0,
        opacity: 1,
        duration: 600,
        easing: 'easeInOutQuad',
        complete() {
            btn.focus();
        }
    });

    btn.addEventListener('click', () => {
        musicOn({
            path: './assets/audio/music',
            types: [
                'ogg'
            ]
        });

        anime({
            targets: contentCard,
            translateX: 20,
            opacity: 0,
            duration: 600,
            easing: 'easeInOutQuad',
            complete() {
                contentCard.remove();

                playerWrapper.style.transform = 'translateX(20px)';

                anime({
                    targets: [playerWrapper, player],
                    begin() {
                        playerWrapper.classList.add('player_active');
                    },
                    translateX: 0,
                    opacity: 1,
                    delay: 1000,
                    duration: 600,
                    easing: 'easeInOutQuad',
                    complete() {
                        anime({
                            targets: playerWrapper,
                            begin() {
                                player.classList.add('player_shadows');
                            },
                            scale: 0.7,
                            top: 0,
                            delay: 2000,
                            duration: 600,
                            easing: 'easeInOutQuad',
                            complete() {
                                gridAnimation(gallary);
                            }
                        });
                    }
                });
            }
        });
    }, {
        once: true
    });
};

let typeTitleAnimation = () => {
    container.classList.add('container_active');

    removeSelectors('.box');

    contentCard.style.display = 'flex';

    anime({
        target: contentCard,
        begin: () => {
            contentCard.style.display = 'flex';

            // eslint-disable-next-line no-new
            new Typed(
                '.contentCard__typedTitle',
                {
                    strings: ['Hello, my sweet', 'I love you, Katya', 'This card i made special for you'],
                    typeSpeed: 100,
                    backSpeed: 50,
                    backDelay: 2000,
                    onComplete: () => {
                        anime({
                            targets: contentCardTitle,
                            translateY: 20,
                            opacity: 0,
                            delay: 600,
                            duration: 600,
                            easing: 'easeInOutQuad',
                            complete: () => {
                                contentCardTitleTyped.remove();
                                contentCardTitle.style.transform = 'translateY(-20px)';
                                contentCardTitle.textContent = 'Please, click by button, for on music';

                                anime({
                                    targets: contentCardTitle,
                                    translateY: 0,
                                    opacity: 1,
                                    delay: 200,
                                    duration: 600,
                                    easing: 'easeInOutQuad',
                                    complete: () => {
                                        musicOnAnimation(contentCardBtn);
                                    }
                                });
                            }
                        });
                    }
                }
            );
        }
    });
};

typeTitleAnimation = countCallLimit(1, typeTitleAnimation);

let animationsByEasing = (easing) => {
    anime({
        targets: boxes,
        height: '100%',
        delay: 1000,
        duration: () => {
            return 10 * anime.random(200, 400);
        },
        easing: easing,
        complete: () => {
            setTimeout(() => {
                typeTitleAnimation();
            }, 600);
        }
    });
};

easingCollection.forEach((easing) => {
    animationsByEasing(easing);
});
