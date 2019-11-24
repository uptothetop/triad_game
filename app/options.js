/** JS File that holds game options. */
export const OPTIONS = {
  width: 600,
  height: 600,

  card: {
    aspect: 1 / 3,
    defaultStroke: {
      width: 1,
      color: '#000',
    },
    defaultFill: '#ddd',
    selectedStroke: {
      width: 2,
      color: '#00f',
    },
    selectedFill: '#eee',
  },
  // Card types
  colors: [
    '#f00',
    '#0f0',
    '#00f',
  ],
  types: [
    'triangle',
    'square',
    'circle',
  ],
  fills: [
    'none',
    'filled',
    'pattern',
  ],
};