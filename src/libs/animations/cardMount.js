import gsap from 'gsap';
import GSAP from 'constants/gsap';

const cardMount = () => {
  gsap.fromTo(
    GSAP.CARD.CARD_GSAP_REF,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      overwrite: true,
      duration: 0.15,
      stagger: {
        each: 0,
        from: 'random',
        amount: 1,
      },
    }
  );
};

export default cardMount;
