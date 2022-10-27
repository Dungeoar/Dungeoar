const image = document.querySelector(".image-continer");

document.addEventListener("keydown", (e) => {
  const key = e.keyCode;
  const cs = getComputedStyle(image);

  const change = 10;
  const regex = /[\d\.]*/;

  const left = cs.left;
  const top = cs.top;
  const leftNumber = left.match(regex);
  const topNumber = top.match(regex);

  // LEFT key pressed
  if (key === 37) {
    image.style.left = `${parseFloat(leftNumber[0]) - change}px`;
  }
  // TOP key pressed
  if (key === 38) {
    image.style.top = `${parseFloat(topNumber[0]) - change}px`;
  }
  // RIGHT key pressed
  if (key === 39) {
    image.style.left = `${parseFloat(leftNumber[0]) + change}px`;
  }
  // DOWN key pressed
  if (key === 40) {
    image.style.top = `${parseFloat(topNumber[0]) + change}px`;
  }
});
