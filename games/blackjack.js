function loadBlackjack(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>🃏 Blackjack PRO</h2>

<div>Saldo: <span id="bal"></span> zł</div>

${renderBets()}

<div>
<h3>Twoje karty:</h3>
<div id="playerCards"></div>
<p id="playerSum"></p>
</div>

<div>
<h3>Krupier:</h3>
<div id="dealerCards"></div>
<p id="dealerSum"></p>
</div>

<button onclick="startBJ()">Start</button>
<button onclick="hit()">Dobierz</button>
<button onclick="stand()">Stop</button>
<button onclick="show('lobby')">⬅️</button>

<p id="bjMsg"></p>
`;

updateBalance();
}

/* TALIA */
let deck=[];
let player=[], dealer=[];
let playingBJ=false;

/* TWORZENIE TALII */
function createDeck(){
let suits=["♠","♥","♦","♣"];
let values=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

deck=[];

suits.forEach(s=>{
values.forEach(v=>{
deck.push({v:v, s:s});
});
});

/* tasowanie */
deck.sort(()=>Math.random()-0.5);
}

/* WARTOŚĆ KARTY */
function getValue(card){
if(card.v==="A") return 11;
if(["K","Q","J"].includes(card.v)) return 10;
return parseInt(card.v);
}

/* LICZENIE SUMY */
function getSum(hand){
let sum=0;
let aces=0;

hand.forEach(c=>{
sum+=getValue(c);
if(c.v==="A") aces++;
});

/* A jako 1 jeśli przekracza 21 */
while(sum>21 && aces>0){
sum-=10;
aces--;
}

return sum;
}

/* RENDER */
function renderBJ(hideDealer=false){
let pDiv=document.getElementById("playerCards");
let dDiv=document.getElementById("dealerCards");

pDiv.innerHTML="";
dDiv.innerHTML="";

/* gracz */
player.forEach(c=>{
pDiv.innerHTML+=`<span class="card">${c.v}${c.s}</span>`;
});

/* krupier */
dealer.forEach((c,i)=>{
if(i===0 && hideDealer){
dDiv.innerHTML+=`<span class="card">❓</span>`;
}else{
dDiv.innerHTML+=`<span class="card">${c.v}${c.s}</span>`;
}
});

/* sumy */
document.getElementById("playerSum").innerText="Suma: "+getSum(player);

if(hideDealer){
document.getElementById("dealerSum").innerText="Suma: ?";
}else{
document.getElementById("dealerSum").innerText="Suma: "+getSum(dealer);
}
}

/* START */
function startBJ(){
if(users[currentUser] < currentBet) return;

users[currentUser]-=currentBet;

createDeck();

player=[deck.pop(), deck.pop()];
dealer=[deck.pop(), deck.pop()];

playingBJ=true;

renderBJ(true);
updateBalance();
}

/* DOBIERZ */
function hit(){
if(!playingBJ) return;

player.push(deck.pop());

let sum=getSum(player);

if(sum>21){
renderBJ();
document.getElementById("bjMsg").innerText="💥 PRZEGRANA";
playingBJ=false;
}else{
renderBJ(true);
}
}

/* STOP */
function stand(){
playingBJ=false;

/* krupier dobiera */
while(getSum(dealer)<17){
dealer.push(deck.pop());
}

renderBJ();

/* wynik */
let p=getSum(player);
let d=getSum(dealer);

let msg="";

if(d>21 || p>d){
users[currentUser]+=currentBet*2;
msg="🏆 WYGRANA";
}else if(p===d){
users[currentUser]+=currentBet;
msg="🤝 REMIS";
}else{
msg="❌ PRZEGRANA";
}

document.getElementById("bjMsg").innerText=msg;

updateBalance();
}
