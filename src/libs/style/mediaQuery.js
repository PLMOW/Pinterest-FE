const SIZES = Object.freeze({
  MOBILES: '555px',
  MOBILEM: '760px',
  TABLET: '900px',
  LAPTOP: '1124px',
  LAPTOPL: '1440px',
  DESKTOP: '1700px',
});

const DEVICES = Object.freeze({
  MOBILES: `(min-width: ${SIZES.MOBILES})`,
  MOBILEM: `(min-width: ${SIZES.MOBILEM})`,
  MOBILEL: `(min-width: ${SIZES.MOBILEL})`,
  TABLET: `(min-width: ${SIZES.TABLET})`,
  LAPTOP: `(min-width: ${SIZES.LAPTOP})`,
  LAPTOPL: `(min-width: ${SIZES.LAPTOPL})`,
  DESKTOP: `(min-width: ${SIZES.DESKTOP})`,
});

export default DEVICES;
