const form = document.querySelector("form");
const colorsSection = document.querySelector("#colors");
const colorContainers = colorsSection.children;
const modeBtn = document.querySelector("#mode");
const html = document.querySelector("html");
const modeIcon = document.querySelector("i");
const getSchemeBtn = document.querySelector("#get-scheme");

// first fetch to setup the page
fetch(`https://www.thecolorapi.com/scheme?hex=fb7495&mode=monochrome&count=5`)
  .then((res) => res.json())
  .then((data) => {
    // used a for loop to connect the data array and the
    // divs array
    for (let i = 0; i < colorContainers.length; i++) {
      // colored divs
      colorContainers[i].children[0].style.cssText = `
        background-color: ${data.colors[i].hex.value};
        opacity: 100;
        `;

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
  // disable scheme btn
  getSchemeBtn.classList.toggle("active:scale-95");
  getSchemeBtn.disabled = true;
  getSchemeBtn.innerHTML = `
  <i class="fa-solid fa-spinner fa-lg animate-spin"></i>
  <p>Loading</p>
  `;
  e.preventDefault();
  const formData = new FormData(form);
  const colorData = {
    seedcolor: formData.get("seedcolor").slice(1),
    scheme: formData.get("scheme").toLowerCase(),
  };
  const { seedcolor, scheme } = colorData;
  // gives transition effect on new colors
  for (let i = 0; i < colorContainers.length; i++) {
    colorContainers[i].children[0].style.cssText = `
    opacity: 0;
    transition: .2s ease;
    `;
  }

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedcolor}&mode=${scheme}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      // used a for loop to connect the data array and the
      // divs array

      for (let i = 0; i < colorContainers.length; i++) {
        // colored divs
        colorContainers[i].children[0].style.cssText = `
        background-color: ${data.colors[i].hex.value};
        opacity: 100;
        `;

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
        // enable get scheme button
        getSchemeBtn.classList.toggle("active:scale-95");
        getSchemeBtn.disabled = false;
        getSchemeBtn.innerHTML = `
        Get color scheme
        `;
      }
    });
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.value) {
    navigator.clipboard.writeText(e.target.dataset.value).then(() => {
      alert(`${e.target.dataset.value} has been copied to the clipboard.`);
    });
  }
});

modeBtn.addEventListener("click", () => {
  if (html.classList.contains("dark")) {
    localStorage.setItem("mode", "light");
    modeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("mode", "dark");
    modeIcon.classList.replace("fa-sun", "fa-moon");
  }
  html.classList.toggle("dark");
});

function setMode() {
  if (localStorage.getItem("mode") === "light") {
    html.classList.remove("dark");
  } else {
    html.classList.add("dark");
    modeIcon.classList.replace("fa-sun", "fa-moon");
  }
}

// check light/dark mode
setMode();
