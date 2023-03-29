const form = document.querySelector("form");
const colorsSection = document.querySelector("#colors");
const colorContainers = colorsSection.children;

// first fetch to setup the page
fetch(
    `https://www.thecolorapi.com/scheme?hex=fb7495&mode=analogic&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      // used a for loop to connect the data array and the
      // divs array
      for (let i = 0; i < colorContainers.length; i++) {
        // colored divs
        colorContainers[i].children[0].style.backgroundColor =
          data.colors[i].hex.value;

        colorContainers[i].children[0].setAttribute(
          "data-value",
          data.colors[i].hex.value
        );
        // color value divs
        colorContainers[i].children[1].textContent = data.colors[i].hex.value;

        colorContainers[i].children[1].setAttribute(
          "data-value",
          data.colors[i].hex.value
        );
      }
    });


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const colorData = {
    seedcolor: formData.get("seedcolor").slice(1),
    scheme: formData.get("scheme").toLowerCase(),
  };
  const { seedcolor, scheme } = colorData;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedcolor}&mode=${scheme}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      // used a for loop to connect the data array and the
      // divs array
      for (let i = 0; i < colorContainers.length; i++) {
        // colored divs
        colorContainers[i].children[0].style.backgroundColor =
          data.colors[i].hex.value;

        colorContainers[i].children[0].setAttribute(
          "data-value",
          data.colors[i].hex.value
        );
        // color value divs
        colorContainers[i].children[1].textContent = data.colors[i].hex.value;

        colorContainers[i].children[1].setAttribute(
          "data-value",
          data.colors[i].hex.value
        );
      }
    });
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.value) {
    navigator.clipboard.writeText(e.target.dataset.value)
      .then( () => {
        alert(`${e.target.dataset.value} has been copied to the clipboard.`);
    })
  }
});
