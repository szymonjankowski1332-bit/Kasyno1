function loadRoulette(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
${renderBets()}
<h2>🎡 Ruletka ULTRA</h2>

<div>Saldo: <span id="bal"></span> zł</div>

<div id="wheelBox">
  <div id="wheel"></div>
  <div id="ball">⚪</div>
</div>

<div id="table"></div>

<div id="extraBets"></div>

<p>Zakład: <span id="betVal">0</span> zł</p>
<p id="result"></p>

<button onclick="spinRoulette()">SPIN</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
createTable();
createExtraBets();
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

d.onclick=()=>placeBet(i,d);

table.appendChild(d);
}
}

/* EXTRA BETS */
function createExtraBets(){
let el=document.getElementById("extraBets");

el.innerHTML=`
<div class="betBtn" onclick="placeSpecial('red')">Czerwone</div>
<div class="betBtn" onclick="placeSpecial('black')">Czarne</div>
<div class="betBtn" onclick="placeSpecial('even')">Parzyste</div>
<div class="betBtn" onclick="placeSpecial('odd')">Nieparzyste</div>
<div class="betBtn" onclick="placeSpecial('low')">1-18</div>
<div class="betBtn" onclick="placeSpecial('high')">19-36</div>
`;
}

/* PLACE BET */
function placeBet(num,el){
let bet=1;

if(users[currentUser] < bet) return;

users[currentUser]-=bet;
totalBet+=bet;

bets[num]=(bets[num]||0)+bet;

el.style.outline="2px solid gold";

updateBalance();
updateBet();
}

/* SPECIAL BET */
function placeSpecial(type){
let bet=1;

if(users[currentUser] < bet) return;

users[currentUser]-=bet;
totalBet+=bet;

bets[type]=(bets[type]||0)+bet;

updateBalance();
updateBet();
}

function updateBet(){
document.getElementById("betVal").innerText=totalBet;
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

/* KOŁO */
let rotation=1440 + Math.random()*360;
wheel.style.transition="transform 4s ease-out";
wheel.style.transform="rotate("+rotation+"deg)";

/* KULKA REAL */
ball.style.transition="transform 4s linear";
ball.style.transform="rotate("+(-rotation*2)+"deg)";

/* WYNIK */
setTimeout(()=>{

let text="Wynik: "+win;
let payout=0;

/* NUMER */
if(bets[win]){
payout+=bets[win]*35;
}

/* KOLORY */
if(win!==0){
if(win%2 && bets["red"]) payout+=bets["red"]*2;
if(win%2==0 && bets["black"]) payout+=bets["black"]*2;

/* PARZYSTE */
if(win%2==0 && bets["even"]) payout+=bets["even"]*2;
if(win%2==1 && bets["odd"]) payout+=bets["odd"]*2;

/* ZAKRES */
if(win<=18 && bets["low"]) payout+=bets["low"]*2;
if(win>=19 && bets["high"]) payout+=bets["high"]*2;
}

if(payout>0){
users[currentUser]+=payout;
text+=" WYGRANA "+payout+" zł";
}

document.getElementById("result").innerText=text;

bets={};
totalBet=0;

updateBalance();
createTable();

},4000);
};
