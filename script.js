document.addEventListener("DOMContentLoaded", function () {
  let isBlack = true;

  function switchColor() {
    document.body.style.backgroundColor = isBlack ? "white" : "black";
    isBlack = !isBlack;
    requestAnimationFrame(switchColor);
  }

  switchColor();
});
