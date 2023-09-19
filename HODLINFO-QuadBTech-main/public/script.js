const clockId = document.getElementById("clock");
console.log("josh mama")
let clock = 60;

let timer = setInterval(()=>{
    if(clock == 0){
        clock = 60;
    }else{
        clock -= 1;
    }
    clockId.innerText = clock

}, 1000)