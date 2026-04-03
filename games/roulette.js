function loadRoulette(){
let el = document.getElementById("gameScreen");

el.innerHTML = `
<h2>🎡 Ruletka</h2>

<div>Saldo: <span id="bal"></span> zł</div>

<!-- ŻETONY -->
<div id="chips">
<div class="chip" draggable="true" data-value="10">10</div>
<div class="chip" draggable="true" data-value="50">50</div>
<div class="chip" draggable="true" data-value="100">100</div>
</div>

<!-- KOŁO -->
<div id="wheel" style="width:150px;height:150px;border:5px solid gold;border-radius:50%;margin:20px auto;"></div>

<!-- STÓŁ -->
<div id="table" class="grid"></div>

<p id="result"></p>

<button onclick="spin()">SPIN</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
createTable();
initDrag();
}

let bets = {};

/* 🎯 STÓŁ */
function createTable(){
let table = document.getElementById("table");
table.innerHTML = "";

for(let i=0;i<=36;i++){
let d = document.createElement("div");
d.innerText = i;

d.style.display="inline-block";
d.style.width="40px";
d.style.height="40px";
d.style.margin="2px";
d.style.lineHeight="40px";
d.style.textAlign="center";
d.style.border="1px solid white";

d.style.background = i==0 ? "green" : (i%2 ? "red" : "black");
d.style.color = "white";

d.dataset.number = i;

/* DROP */
d.addEventListener("dragover",(e)=>e.preventDefault());

d.addEventListener("drop",(e)=>{
let value = parseInt(e.dataTransfer.getData("chip"));

if(users[currentUser] < value) return;

users[currentUser] -= value;
bets[i] = (bets[i]||0) + value;

/* wizual */
d.innerText = i + "\n(" + bets[i] + ")";

updateBalance();
});

table.appendChild(d);
}
}

/* 🪙 DRAG */
function initDrag(){
document.querySelectorAll(".chip").forEach(chip=>{
chip.addEventListener("dragstart",(e)=>{
e.dataTransfer.setData("chip",chip.dataset.value);
});
});
}

/* 🎡 SPIN */
function spin(){
let win = Math.floor(Math.random()*37);

let wheel = document.getElementById("wheel");

/* animacja */
wheel.style.transition="transform 2s";
wheel.style.transform="rotate("+(Math.random()*720+720)+"deg)";

setTimeout(()=>{

let text = "Wynik: " + win;

if(bets[win]){
let winAmount = bets[win]*35;
users[currentUser] += winAmount;
text += " WYGRANA " + winAmount + " zł";
}

document.getElementById("result").innerText = text;

bets = {};
updateBalance();
createTable();

},2000);
}
