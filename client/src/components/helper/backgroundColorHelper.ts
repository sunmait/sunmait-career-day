const setBackgroundHelper = (): void => {
  const mainElement = document.querySelector('body');

  if (mainElement) {
    mainElement.classList.add('default-background');
  }
};

export default setBackgroundHelper;
