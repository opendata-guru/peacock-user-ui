/* eslint-disable no-mixed-operators */
import anime from 'animejs';

const animations = {
  methods: {
    fade(targets) {
      anime({
        targets,
        delay(t, i) {
          return i * 100;
        },
        easing: 'easeInQuart',
        opacity: {
          value: [0, 1],
          duration: 500,
        },
      });
    },
    swingDown(targets) {
      anime({
        origin: '50% 0',
        targets,
        duration: 1500,
        elasticity: 400,
        delay(t, i) {
          return i * 150;
        },
        opacity: {
          value: [0, 1],
          duration: 200,
          easing: 'linear',
        },
        rotateX: [-90, 0],
      });
    },
    pointExpansion(targets) {
      anime({
        targets,
        duration(t, i) {
          return 600 + i * 75;
        },
        easing: 'easeOutExpo',
        delay(t, i) {
          return i * 50;
        },
        opacity: {
          value: [0, 1],
          easing: 'linear',
        },
        scale: [0, 1],
      });
    },
    randomSideEnter(targets) {
      anime({
        targets,
        duration: 900,
        elasticity: 500,
        delay(t, i) {
          return i * 15;
        },
        opacity: {
          value: [0, 1],
          duration: 300,
          easing: 'linear',
        },
        translateX() {
          return [anime.random(0, 1) === 0 ? 100 : -100, 0];
        },
        translateY() {
          return [anime.random(0, 1) === 0 ? 100 : -100, 0];
        },
      });
    },
  },
};

export default animations;
