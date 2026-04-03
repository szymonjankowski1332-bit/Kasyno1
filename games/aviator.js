function loadAviator(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>✈️ Aviator</h2>

<div>Saldo: <span id="bal"></span> zł</div>

<div id="aviatorBox">
  <canvas id="chart" width="600" height="300"></canvas>
  <div id="plane">✈️</div>
</div>

<p>x<span id="multi">1.00</span></p>

<button onclick="startAviator()">Start</button>
<button onclick="cashout()">Cashout</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
}

let ctx, m=1, running=false, crashPoint=0, gameLoop;

/* START */
window.startAviator = function(){

if(running) return;

let bet = 1;

if(users[currentUser] < bet){
alert("Za mało kasy");
return;
}

users[currentUser]-=bet;
updateBalance();

let canvas=document.getElementById("chart");
ctx=canvas.getContext("2d");

let plane=document.getElementById("plane");

/* RESET */
m=1;
running=true;
crashPoint = 1 + Math.random()*5;

ctx.clearRect(0,0,600,300);

let x=0;

/* LOOP */
gameLoop = setInterval(()=>{

ctx.lineWidth=2;
ctx.strokeStyle="lime";

ctx.beginPath();
ctx.moveTo(x,150-(m*20));

x+=3;
m+=0.03;

ctx.lineTo(x,150-(m*20));
ctx.stroke();

/* ✈️ SAMOLOT */
let posY = 300 - (m*40);

/* LIMIT żeby nie znikał */
if(posY < 10) posY = 10;

plane.style.left = x + "px";
plane.style.top = posY + "px";

/* MULTI */
document.getElementById("multi").innerText=m.toFixed(2);

/* CRASH */
if(m >= crashPoint){
running=false;
clearInterval(gameLoop);

document.getElementById("multi").innerText="CRASH 💥";
}

},50);
};

/* CASHOUT */
window.cashout = function(){

if(!running) return;

let win = 1 * m;

users[currentUser]+=Math.floor(win);

running=false;
clearInterval(gameLoop);

document.getElementById("multi").innerText="WYPŁATA 💰";

updateBalance();
};
