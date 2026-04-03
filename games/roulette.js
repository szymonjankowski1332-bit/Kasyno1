function loadRoulette(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>🎡 Ruletka PRO</h2>

<div>Saldo: <span id="bal"></span> zł</div>

<div id="wheelBox">
  <div id="wheel"></div>
  <div id="ball">⚪</div>
</div>

<div id="table"></div>

<p>Twój zakład: <span id="betVal">0</span> zł</p>
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

/* TABLE GRID */
function createTable(){
let table=document.getElementById("table");
table.innerHTML="";

let layout=[
[3,6,9,12,15,18,21,24,27,30,33,36],
[2,5,8,11,14,17,20,23,26,29,32,35],
[1,4,7,10,13,16,19,22,25,28,31,34]
];

layout.forEach(row=>{
let rowDiv=document.createElement("div");

row.forEach(num=>{
let d=document.createElement("div");
d.className="cell "+(num%2?"red":"black");
d.innerText=num;

d.onclick=()=>placeBet(num,d);

rowDiv.appendChild(d);
});

table.appendChild(rowDiv);
});

/* ZERO */
let zero=document.createElement("div");
zero.innerText="0";
zero.className="cell green";

zero.onclick=()=>placeBet(0,zero);

table.prepend(zero);
}

/* PLACE BET */
function placeBet(num,el){
let bet=1;

if(users[currentUser] < bet) return;

users[currentUser]-=bet;
totalBet+=bet;

bets[num]=(bets[num]||0)+bet;

el.style.boxShadow="0 0 10px gold";

document.getElementById("betVal").innerText=totalBet;

updateBalance();
}

/* SPIN */
window.spinRoulette = function(){

if(totalBet===0) return;

let win=Math.floor(Math.random()*37);

let wheel=document.getElementById("wheel");
let ball=document.getElementById("ball");

/* KOŁO */
let rotation=1440 + Math.random()*360;
wheel.style.transition="transform 4s ease-out";
wheel.style.transform="rotate("+rotation+"deg)";

/* KULKA */
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
