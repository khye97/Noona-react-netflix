const responsive = {
  desktopLarge: {
    breakpoint: { max: 3000, min: 1440 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1024 },
    items: 4,
    //partialVisibilityGutter : 100
  },
  laptop: {
    breakpoint: { max: 1024, min: 768},
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 480 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  }
};

export default responsive;