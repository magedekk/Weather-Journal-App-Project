/* Global Variables */
const apikey = "7ae97b3a201ce8b7b0a4dee0e41ace63";
const basicURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Add click event when user click on generate button
generateBtn.addEventListener("click",generateData);
function generateData() {
 // console.log("generate btn clicked");
 if(!zipInput.value || !feelingsInput.value){
   alert("Please enter a valid zip code and what are you feeling");
   return;
 }else {
  getWeatherData(basicURL, zipInput.value, apikey)
  .then(data => postDataToServer("/addData", {
    date: newDate,
    temp: data.main.temp,
    feelings: feelingsInput.value,
  })
  ).then(() => updateUI())
  }
}
// Get the temperature 
async function getWeatherData(basicURL, zipCode, apiKey){
  const response = await fetch (basicURL + zipCode + "&appid=" + apiKey + "&units=metric");
  try {
    const data = await response.json();
    return data;
  } catch (error){
    console.log(error);
  }
}
// Post request to the server 
async function postDataToServer(url = "", data={}){
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);    
  }
}

// Update UI
async function updateUI(){
  const response = await fetch ("/getData")
  try {
    const data = await response.json()
    //console.log(data);
    document.getElementById("date").innerHTML= data.date;
    document.getElementById("temp").innerHTML= data.temp;
    document.getElementById("content").innerHTML= data.feelings;
  } catch (error) {
    console.error(error);
  }
}