function loadAviator(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>✈️ Aviator REAL</h2>

<div>Saldo: <span id="bal"></span> zł</div>

<canvas id="chart" width="300" height="150"></canvas>

<p>x<span id="multi">1.00</span></p>

<button onclick="startAviator()">Start</button>
<button onclick="cashout()">Cashout</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
}

let ctx, m=1, running=false, crashPoint=0;

function startAviator(){
if(users[currentUser] < 50) return;

users[currentUser]-=50;
updateBalance();

let canvas=document.getElementById("chart");
ctx=canvas.getContext("2d");

m=1;
running=true;
crashPoint = 1 + Math.random()*5;

ctx.clearRect(0,0,300,150);

let x=0;

let game=setInterval(()=>{

ctx.lineWidth=2;
ctx.strokeStyle="lime";

ctx.beginPath();
ctx.moveTo(x,150-(m*20));
x+=3;
m+=0.03;
ctx.lineTo(x,150-(m*20));
ctx.stroke();

document.getElementById("multi").innerText=m.toFixed(2);

if(m >= crashPoint){
running=false;
clearInterval(game);

document.getElementById("multi").innerText="CRASH 💥";
}

},50);
}

function cashout(){
if(!running) return;

let win = 50 * m;
users[currentUser]+=Math.floor(win);

running=false;

document.getElementById("multi").innerText="WYPŁATA 💰";

updateBalance();
}
