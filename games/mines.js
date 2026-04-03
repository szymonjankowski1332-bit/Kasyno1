function loadMines(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>💣 Mines</h2>

<div>Saldo: <span id="bal"></span> zł</div>

${renderBets()}

<div>
Miny:
<select id="mineCount">
<option>3</option>
<option>5</option>
<option>10</option>
<option>15</option>
</select>
</div>

<div id="minesGrid"></div>

<p id="minesInfo"></p>

<button onclick="startMines()">Start</button>
<button onclick="cashoutMines()">Cashout</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
}

let mines = [];
let revealed = [];
let minesRunning = false;
let minesMultiplier = 1;
let minesBet = 0;

function startMines(){

let count = parseInt(document.getElementById("mineCount").value);

if(users[currentUser] < currentBet){
alert("Brak kasy");
return;
}

users[currentUser]-=currentBet;
minesBet = currentBet;

updateBalance();

mines = [];
revealed = [];
minesRunning = true;
minesMultiplier = 1;

/* LOSOWANIE MIN */
while(mines.length < count){
let r = Math.floor(Math.random()*25);
if(!mines.includes(r)) mines.push(r);
}

drawMinesGrid();
}

function drawMinesGrid(){
let grid=document.getElementById("minesGrid");
grid.innerHTML="";

for(let i=0;i<25;i++){
let d=document.createElement("div");
d.className="mineCell";
d.innerText="❓";

d.onclick=()=>clickMine(i,d);

grid.appendChild(d);
}
}

function clickMine(i,el){

if(!minesRunning || revealed.includes(i)) return;

revealed.push(i);

if(mines.includes(i)){
el.innerText="💣";
document.getElementById("minesInfo").innerText="PRZEGRANA ❌";
minesRunning=false;
return;
}

/* SAFE */
el.innerText="💎";

minesMultiplier += 0.3;

document.getElementById("minesInfo").innerText=
"Multiplier x"+minesMultiplier.toFixed(2);
}

function cashoutMines(){

if(!minesRunning) return;

let win = Math.floor(minesBet * minesMultiplier);

users[currentUser]+=win;

updateBalance();

document.getElementById("minesInfo").innerText=
"WYGRANA "+win+" zł 💰";

minesRunning=false;
}
