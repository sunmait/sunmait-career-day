const setBackgroundHelper = (): void => {
  const mainElement = document.querySelector('body');

  return mainElement.classList.add('default-background');
}

export default setBackgroundHelper;
