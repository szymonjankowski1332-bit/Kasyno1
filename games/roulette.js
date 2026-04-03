function loadRoulette(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>🎡 Ruletka PRO</h2>

<div>
Saldo: <span id="bal"></span> zł
</div>

<div style="margin:10px;">
Wybierz żeton:
<button onclick="setChip(10)">10</button>
<button onclick="setChip(50)">50</button>
<button onclick="setChip(100)">100</button>
</div>

<div id="wheel"></div>

<div id="table" class="grid"></div>

<p id="result"></p>

<button onclick="spin()">SPIN</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
createTable();
}

let currentChip=10;
let bets={};

function setChip(v){
currentChip=v;
}

function createTable(){
let table=document.getElementById("table");
table.innerHTML="";

for(let i=0;i<=36;i++){
let d=document.createElement("div");
d.innerText=i;
d.className="cell "+(i==0?"green":(i%2?"red":"black"));

d.onclick=()=>{
if(users[currentUser] < currentChip) return;

users[currentUser]-=currentChip;
bets[i]=(bets[i]||0)+currentChip;

d.style.boxShadow="0 0 10px gold";
updateBalance();
};

table.appendChild(d);
}
}

function spin(){
let win=Math.floor(Math.random()*37);

let wheel=document.getElementById("wheel");
wheel.style.transform="rotate("+(Math.random()*720+720)+"deg)";

setTimeout(()=>{
let text="Wynik: "+win;

if(bets[win]){
let winAmount=bets[win]*35;
users[currentUser]+=winAmount;
text+=" WYGRANA "+winAmount+" zł";
}

document.getElementById("result").innerText=text;
bets={};
updateBalance();
createTable();

},3000);
}
