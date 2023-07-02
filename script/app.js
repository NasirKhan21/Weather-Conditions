const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img")


const updateUI = (data) =>{
    //  const cityDets = data.cityDets;
    //  const weather = data.weather;

    //destructure

    const {cityDets,weather} = data;

    details.innerHTML = `
      <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>`;
    
    //updating the icon
    const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src",iconSrc);


    //updating the day or night image
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = "images/day.svg";
    }else{
        timeSrc = "images/night.svg";
    }
    
    time.setAttribute("src",timeSrc);
    
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
      }
};

const updateCity = async (cityName)=>{
    // console.log(cityName);
     const cityDets = await getCity(cityName);

     const weather = await getWeather(cityDets.Key);
     
     //returning objects
     return { cityDets,weather};
};

cityForm.addEventListener("submit",e=>{
    e.preventDefault();

    const cityName = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(cityName)
    .then(data=>{ updateUI(data) })
    .catch(err=>{console.log(err);})


    //local storage
    localStorage.setItem("city",cityName);
});

if(localStorage.getItem("city")){
   updateCity(localStorage.getItem("city"))
   .then(data=>updateUI(data))
   .catch(err=>console.log(err))
}