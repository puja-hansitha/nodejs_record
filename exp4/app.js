const API_KEY = "17a7e1cc3e0a9e0f9304bd814e97e23a";
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const messageBox = document.getElementById("message");
let weatherChart = null;

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    messageBox.textContent = "Please type a city name first.";
    return;
  }
  messageBox.textContent = "Loading...";
  getWeatherData(city); // call our async function below
});

async function getWeatherData(city) {
  try {
    const url =
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod !== "200") {
      messageBox.textContent = "City not found. Please check the spelling.";
      return;
    }
    messageBox.textContent = "";
    const times = data.list.map((entry) => entry.dt_txt.slice(5, 16));
    const temps = data.list.map((entry) => entry.main.temp);
    drawGraph(times, temps, city);
  } catch (error) {
    console.log("Something went wrong:", error);
    messageBox.textContent = "Something went wrong. Check your internet or API key.";
  }
}

function drawGraph(labels, temperatures, city) {
  const ctx = document.getElementById("weatherChart").getContext("2d");
  if (weatherChart !== null) {
    weatherChart.destroy();
  }
  weatherChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `Temperature in ${city} (°C)`,
          data: temperatures,
          borderColor: "blue",
          fill: false,
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Date / Time" } },
        y: { title: { display: true, text: "Temperature (°C)" } },
      },
    },
  });
}
