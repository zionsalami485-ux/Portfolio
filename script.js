console.log("Hello from your portfolio JavaScript file!");
alert("Welcome to my portfolio!");

const button = document.getElementById("toggleTheme");

button.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
