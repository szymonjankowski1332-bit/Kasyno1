function loadRoulette(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>🎡 Ruletka</h2>

<div>Saldo: <span id="bal"></span> zł</div>

<div id="wheelBox">
  <div id="wheel"></div>
  <div id="ball">⚪</div>
</div>

<div id="table"></div>

<p>Zakład: <span id="betVal">0</span> zł</p>
<p id="result"></p>

<button onclick="spinRoulette()">SPIN</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
createTable();
}

/* BET */
let bets={};
let totalBet=0;

/* TABLE */
function createTable(){
let table=document.getElementById("table");
table.innerHTML="";

for(let i=0;i<=36;i++){
let d=document.createElement("div");

d.innerText=i;
d.className="cell "+(i==0?"green":(i%2?"red":"black"));

d.onclick=()=>{
let bet=1;

if(users[currentUser] < bet) return;

users[currentUser]-=bet;
totalBet+=bet;

bets[i]=(bets[i]||0)+bet;

d.style.outline="2px solid gold";

document.getElementById("betVal").innerText=totalBet;

updateBalance();
};

table.appendChild(d);
}
}

/* SPIN */
window.spinRoulette = function(){

if(totalBet===0){
alert("Postaw coś!");
return;
}

let win=Math.floor(Math.random()*37);

let wheel=document.getElementById("wheel");
let ball=document.getElementById("ball");

let rotation=1440 + Math.random()*360;

wheel.style.transition="transform 4s ease-out";
wheel.style.transform="rotate("+rotation+"deg)";

ball.style.transition="transform 4s ease-out";
ball.style.transform="rotate("+(-rotation + win*9.7)+"deg)";

setTimeout(()=>{

let text="Wynik: "+win;

if(bets[win]){
let winAmount=bets[win]*35;
users[currentUser]+=winAmount;
text+=" WYGRANA "+winAmount+" zł";
}

document.getElementById("result").innerText=text;

bets={};
totalBet=0;

updateBalance();
createTable();

},4000);
};
