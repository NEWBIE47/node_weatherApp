const weatherForm = document.querySelector("form");
const errorPara = document.querySelector("#errorPara");
const messagePara = document.querySelector("#messagePara");
const locationField = document.querySelector("#location");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  errorPara.textContent = "";
  messagePara.textContent = "Loading...";

  const url = `http://localhost:3000/weather?search=${encodeURIComponent(
    locationField.value.trimEnd()
  )}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (
          (errorPara.textContent = data.error), (messagePara.textContent = "")
        );
      }
      messagePara.textContent = data.message;
    });
  });
});
