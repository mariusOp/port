let key = "9dd76a86e2c14a90a6a170318241803";
const url = `http://api.weatherapi.com/v1/current.json?key=${key}`;

const root = document.getElementById("root");
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const formSubmit = document.getElementById("form");
let store = {
  city: "London",
  feelslike_c: 0,
  temp_c: 0,
  is_day: 0,
  text: "",
  localtime: "",
  properties: {
    pressure_mb: {},
    wind_kph: {},
    cloud: {},
    humidity: {},
    uv: {},
    vis_km: {},
  },
};
const fetchData = async () => {
  try {
    const query = localStorage.getItem("query") || store.city;
    const result = await fetch(`${url}&q=${query}`);
    const data = await result.json();
    const {
      current: {
        feelslike_c,
        cloud,
        temp_c,
        humidity,
        is_day,
        pressure_mb,
        uv,
        vis_km,
        wind_kph,
        condition: { text },
      },
      location: { localtime },
    } = data;

    store = {
      ...store,
      city: query,
      feelslike_c,
      temp_c,
      is_day,
      text,
      localtime,
      properties: {
        cloud: {
          title: "cloud",
          value: `${cloud}%`,
          icon: "cloud.png",
        },
        humidity: {
          title: "humidity",
          value: `${humidity}%`,
          icon: "humidity.png",
        },
        wind_kph: {
          title: "wind speed",
          value: `${wind_kph} km/h`,
          icon: "wind.png",
        },
        pressure_mb: {
          title: "pressure",
          value: `${pressure_mb} %`,
          icon: "gauge.png",
        },
        uv: {
          title: "uv Index",
          value: `${uv} / 100`,
          icon: "uv-index.png",
        },
        vis_km: {
          title: "visibility",
          value: `${vis_km}km`,
          icon: "visibility.png",
        },
      },
    };
    renderComponent();
    city.addEventListener("click", handleClick);
  } catch (error) {
    console.log(error);
  }
};

const getImage = (description) => {
  switch (description) {
    case "Partly cloudy":
      return "partly.png";
    case "Overcast":
      return "pngegg.png";
    case "Clear":
      return "clear.png";
    case "Sunny":
      return "sunny.png";
    case "Mist":
      return "fog.png";
    case "Cloudy":
      return "cloud.png";
    default:
      return "the.png";
  }
};
const renderProperty = (properties) => {
  return Object.values(properties)
    .map(({ title, value, icon }) => {
      return `<div class="property">
            <div class="property-icon">
              <img src="./img/icons/${icon}" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value">${value}</div>
              <div class="property-info__description">${title}</div>
            </div>
          </div>`;
    })
    .join("");
};
const markup = () => {
  const { city, temp_c, is_day, text, localtime, properties } = store;

  const containerClass = is_day === 1 ? "is-day" : "";
  return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/${getImage(text)}" alt="" />
                <div class="description">${text}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${localtime}</div>
                <div class="city-info__title">${temp_c}°</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperty(properties)}</div>
      </div>`;
};

const handleClick = () => {
  popup.classList.toggle("active");
};
const renderComponent = () => {
  root.innerHTML = markup();
  const close = document.getElementById("close");
  const city = document.getElementById("city");
  city.addEventListener("click", handleClick);
  close.addEventListener("click", handleClick);
};
const handleInput = (e) => {
  store = {
    ...store,
    city: e.target.value,
  };
};
const handleSubmit = (e) => {
  e.preventDefault();
  const value = store.city;
  if (!value) return null;
  localStorage.setItem("query", value);
  fetchData();
  handleClick();
};
formSubmit.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);
fetchData();
