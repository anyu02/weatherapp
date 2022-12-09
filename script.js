const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const infoTxt = inputPart.querySelector(".info-txt");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");
const weatherPart = wrapper.querySelector(".weather-part");
const wIcon = weatherPart.querySelector("img");
const arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    // if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6fa1a22b932fa560f41ca6a68c8c978b`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){ // if user entered city name isn't valid
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        //getting required properties value from the whole weather information
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            wIcon.src = "icons/01d@2x.png";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/11d@2x.png";
        }else if(id >= 300 && id <= 321){
            wIcon.src = "icons/09d@2x.png";
        }else if(id >= 500 && id <= 504){
            wIcon.src = "icons/10d@2x.png";
        }else if(id == 511){
            wIcon.src = "icons/13d@2x.png";
        }else if(id >= 520 && id <= 531){
            wIcon.src = "icons/09d@2x.png";
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/13d@2x.png";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/50d@2x.png";
        }else if(id == 801){
            wIcon.src = "icons/02d@2x.png";
        }else if(id == 802){
            wIcon.src = "icons/03d@2x.png";
        }else if(id >= 803 && id <= 804){
            wIcon.src = "icons/04d@2x.png";
        }    
            
        
        //passing a particular weather info to a particular element
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
