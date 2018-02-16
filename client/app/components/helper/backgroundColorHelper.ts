interface ISetClassName {
  setClassName: void;
}

export default function setBackgroundHelper(): ISetClassName {
  const mainElement = document.querySelector('body');

  return {
    setClassName: mainElement.classList.add('default-background'),
  };
}
