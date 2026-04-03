function loadRoulette(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>🎡 Ruletka</h2>

<div>Saldo: <span id="bal"></span> zł</div>

<div id="wheel-container">
  <div id="wheel"></div>
  <div id="ball"></div>
</div>

<div id="numbers"></div>

<div id="table" class="grid"></div>

<p id="result"></p>

<button onclick="spin()">SPIN</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
createTable();
initDrag();
drawNumbers();
}

/* RESZTA FUNKCJI MUSI BYĆ TEŻ */

let bets={};

/* TABLE */
function createTable(){
let table=document.getElementById("table");
table.innerHTML="";

for(let i=0;i<=36;i++){
let d=document.createElement("div");
d.innerText=i;
d.className="cell "+(i==0?"green":(i%2?"red":"black"));

d.dataset.number=i;

d.addEventListener("dragover",(e)=>e.preventDefault());

d.addEventListener("drop",(e)=>{
let value=parseInt(e.dataTransfer.getData("chip"));

if(users[currentUser] < value) return;

users[currentUser]-=value;
bets[i]=(bets[i]||0)+value;

addChipVisual(d,value);

updateBalance();
});

table.appendChild(d);
}
}

/* DRAG */
function initDrag(){
document.querySelectorAll(".chip").forEach(chip=>{
chip.addEventListener("dragstart",(e)=>{
e.dataTransfer.setData("chip",chip.dataset.value);
});
});
}

/* VISUAL CHIP */
function addChipVisual(cell,value){
let c=document.createElement("div");
c.className="chip-on";
c.innerText=value;

cell.appendChild(c);
}

/* SPIN */
function spin(){
let win=Math.floor(Math.random()*37);

let wheel=document.getElementById("wheel");
let ball=document.getElementById("ball");

/* obrót koła */
let rotation=Math.random()*360 + 1440;
wheel.style.transform="rotate("+rotation+"deg)";

/* kulka (odwrotnie) */
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
updateBalance();
createTable();

},4000);
}

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
<div id="numbers"></div>
function drawNumbers(){
let nums=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];

let container=document.getElementById("numbers");
container.innerHTML="";

nums.forEach(n=>{
let d=document.createElement("span");
d.innerText=n+" ";
container.appendChild(d);
});
}
drawNumbers();
