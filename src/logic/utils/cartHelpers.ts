export const getCartCount = (count: number | undefined): string => {
  let displayText = '';
  if (count) {
    if (count <= 100) {
      displayText = `${count}`;
    } else {
      displayText = '100+';
    }
  }

  return displayText;
};
