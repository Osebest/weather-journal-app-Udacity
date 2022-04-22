setTimeout(() =>{
  document.querySelector("body").style.opacity = '1';
},100);

/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const zip = document.getElementById('zip');
const apiKey = '&appid=e4eabc8d7631ab8086c4f4181078f805';
const feelings = document.getElementById('feelings');
const feeling = document.getElementById('feeling');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
let newDate = d.toDateString();


//Adding event lisener to the generate button, to perform task
generate.addEventListener('click', performTask);

function performTask(event){
  event.preventDefault();
  getWeather(baseUrl, zip.value, apiKey)
  //After weather data is gotten, the data is sorted
    .then(function(data){
      content(data)
      //After sorting, data is posted to server
      .then((contents)=>{
        postData('/add', contents);
        //Updating the userinterface
        updateUI();
      })
    })
};

// Function select which data will be posted
let content = async(data)=>{
  try{
    //Whenever the user inputs a wrong zip or no zip at all
    if(data.message){
      const contents = {
        date:newDate, 
        temp:data.message, 
        feeling:feelings.value
      }
      return contents
    }else{
      const contents = {
        date:newDate, 
        temp:data.list[0].main.temp+'&#176', 
        feeling:feelings.value
      }
      return contents;
    }
  }catch(error){
    console.log("error", error);
  }
}

//Getting weather data using async JS
const getWeather = async (baseUrl, zip, apiKey) => {
  const res = await fetch(baseUrl+zip+apiKey)
  try {
    const data = await res.json();
    return data;
  }catch(error){
    console.log("error", error);
  }
}

//Function for Posting data
const postData = async (url = '', contents = {}) => {
  console.log(contents);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contents)
  });

  try {
      const newData = await response.json();
      return newData;
  }catch(error){
    console.log("error", error);
  }
}

//Updating the interface with the data inputed
const updateUI = async () => {
  const update = await fetch('/all');
  try {
    const updates = await update.json();
    date.innerHTML = `Date: ${updates[0].date}`;
    temp.innerHTML = `Temperature: ${updates[0].temp}`;
    feeling.innerHTML = `I feel: ${updates[0].feeling}`;
  }catch(error){
    console.log("error", error);
  }
}