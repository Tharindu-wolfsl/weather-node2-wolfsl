console.log("This is weather Apllication!");


const weatherSearch=document.querySelector('form');
const search=document.querySelector('input');
const msg1=document.querySelector('#msg-1');
const msg2=document.querySelector('#msg-2');
const msg3=document.querySelector('#msg-3');
const error=document.querySelector('#error');


weatherSearch.addEventListener('submit',(event)=>{
    event.preventDefault();
    msg1.textContent="";
    msg2.textContent="";
    msg3.textContent="";
    error.textContent="";

    const location=search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
          if (data.error ) {
            error.textContent=data.error;
          }else{
            msg1.textContent=data.location;
            msg2.textContent=data.weather;
            msg3.textContent=data.temperature;
            console.log(data);
            }
          
        });
      });
      
})


