function loadSlots(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>🎰 Sloty ULTRA</h2>

<div>Saldo: <span id="bal"></span> zł</div>

<div class="slot-machine">
  <div class="reel"><div class="strip" id="s1"></div></div>
  <div class="reel"><div class="strip" id="s2"></div></div>
  <div class="reel"><div class="strip" id="s3"></div></div>
</div>

<p id="slotResult"></p>

<button onclick="spinSlots()">SPIN</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
initSlots();
}

let symbols=["🍒","🍋","💎","7️⃣","⭐"];

function initSlots(){
["s1","s2","s3"].forEach(id=>{
let el=document.getElementById(id);
el.innerHTML="";

for(let i=0;i<30;i++){
let d=document.createElement("div");
d.innerText=symbols[Math.random()*symbols.length|0];
d.className="symbol";
el.appendChild(d);
}
});
}

/* SPIN */
function spinSlots(){
if(users[currentUser] < 50) return;

users[currentUser]-=50;
updateBalance();

spinReel("s1",0);
spinReel("s2",300);
spinReel("s3",600);
}

function spinReel(id,delay){
let reel=document.getElementById(id);

setTimeout(()=>{
let pos=0;
let speed=25;

let anim=setInterval(()=>{
pos+=speed;
reel.style.transform="translateY(-"+pos+"px)";
speed*=0.97;

if(speed<2){
clearInterval(anim);

/* wynik końcowy */
let finalSymbols=[
symbols[Math.random()*symbols.length|0],
symbols[Math.random()*symbols.length|0],
symbols[Math.random()*symbols.length|0]
];

document.getElementById("s1").innerHTML='<div class="symbol">'+finalSymbols[0]+'</div>';
document.getElementById("s2").innerHTML='<div class="symbol">'+finalSymbols[1]+'</div>';
document.getElementById("s3").innerHTML='<div class="symbol">'+finalSymbols[2]+'</div>';

checkWin(finalSymbols);
}

},30);

},delay);
}

/* WIN */
function checkWin(r){
if(r[0]==r[1] && r[1]==r[2]){
let win=500;
users[currentUser]+=win;
document.getElementById("slotResult").innerText="🔥 JACKPOT +"+win+" zł";
}else{
document.getElementById("slotResult").innerText="Brak wygranej";
}

updateBalance();
}
