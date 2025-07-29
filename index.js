const form = document.getElementById("form");
const selectMode = document.getElementById("select-mode");
const colorInput = document.getElementById("color-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  render();
});

const render = () => {
  const divs = [
    document.getElementById("color-div-1"),
    document.getElementById("color-div-2"),
    document.getElementById("color-div-3"),
    document.getElementById("color-div-4"),
    document.getElementById("color-div-5"),
    document.getElementById("color-div-6"),
  ];

  const hexes = [
    document.getElementById("color-hex-1"),
    document.getElementById("color-hex-2"),
    document.getElementById("color-hex-3"),
    document.getElementById("color-hex-4"),
    document.getElementById("color-hex-5"),
    document.getElementById("color-hex-6"),
  ];

  const colors = [colorInput.value];

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorInput.value.substring(
      1
    )}&mode=${selectMode.value}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < 5; i++) {
        colors.push(data.colors[i].hex.value);
      }

      colors.forEach((hex, i) => {
        divs[i].style.backgroundColor = hex;
        hexes[i].textContent = hex;

        divs[i].setAttribute("data-color", hex);
        hexes[i].setAttribute("data-color", hex);
      });

      [...divs, ...hexes].forEach((el) => {
        el.style.cursor = "pointer";
        el.title = "Click to copy";

        el.addEventListener("click", () => {
          const hex = el.getAttribute("data-color");
          navigator.clipboard.writeText(hex);
        });
      });
    });
};

render();
