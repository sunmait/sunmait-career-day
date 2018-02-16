interface ISetClassNameProps {
  setClassName: void;
}

export default function setBackgroundHelper(): ISetClassNameProps {
  const mainElement = document.querySelector('body');

  return {
    setClassName: mainElement.classList.add('default-background'),
  };
}
