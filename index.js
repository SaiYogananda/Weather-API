
const temperatureField = document.querySelector('.weather1');
const cityField = document.querySelector('.weather2 p');
const emojiField = document.querySelector('.weather3 img');
const weatherField = document.querySelector('.weather3 span');
const dateField = document.querySelector('.weather2 span');
const searchField = document.querySelector('.searchField');
const form = document.querySelector('form');

//Adding Event Listener to the form
form.addEventListener("submit",search);

//Default Location 
let target = "Chicago";

//Function to fetch Data from Weather API
const fetchData = async(target) => {

    try {

        const url = `https://api.weatherapi.com/v1/current.json?key=faad17e852cb4295803194631230506&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();
    
        // Destructuring
        const {
        current : {
            condition:{text,icon},
            temp_c
        },
        location : {name,localtime}

        } = data;

        updateDom(temp_c,name,localtime,icon,text)
        
    } catch (error) {
        alert("Location not found");
        
    }
};


fetchData();

//Function to update the DOM
function updateDom(temperature,city,time,emoji,condition){
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());
    temperatureField.innerText = temperature+"°C";
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`; 
    emojiField.src=emoji;
    weatherField.innerText = condition;

}


// Function to search the location
function search(e){
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
};


// Function to get the name of the Day
function getDayFullName (num){
    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";
            
        default:
            return "dont know";
    }

}
