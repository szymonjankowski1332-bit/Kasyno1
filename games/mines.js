function loadMines(){
let el=document.getElementById("gameScreen");

let grid="";
for(let i=0;i<25;i++){
grid+=`<div class="mine" onclick="clickMine(${i})">?</div>`;
}

el.innerHTML=`
<h2>💣 Mines</h2>

<div>Saldo: <span id="bal"></span> zł</div>

${renderBets()}

<div class="mineGrid">${grid}</div>

<button onclick="startMines()">START</button>
<button onclick="show('lobby')">⬅️</button>

<p id="minesMsg"></p>
`;

updateBalance();
}

let mines=[], revealed=[], playing=false;

function startMines(){
mines=[];
revealed=[];
playing=true;

while(mines.length<3){
let r=Math.floor(Math.random()*25);
if(!mines.includes(r)) mines.push(r);
}

document.querySelectorAll(".mine").forEach(m=>{
m.innerText="?";
m.style.background="#222";
});
}

function clickMine(i){
if(!playing) return;

let el=document.querySelectorAll(".mine")[i];

if(mines.includes(i)){
el.innerText="💥";
document.getElementById("minesMsg").innerText="PRZEGRANA";
playing=false;
return;
}

el.innerText="💎";
revealed.push(i);

let win = currentBet * revealed.length;

document.getElementById("minesMsg").innerText="Wygrana: "+win+" zł";

users[currentUser]+=win;
updateBalance();
}
