function loadBlackjack(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>🃏 Blackjack</h2>

<div>Saldo: <span id="bal"></span> zł</div>

${renderBets()}

<p>Dealer: <span id="dealer"></span></p>
<p>Ty: <span id="player"></span></p>

<p id="bjResult"></p>

<button onclick="startBJ()">Start</button>
<button onclick="hit()">Hit</button>
<button onclick="stand()">Stand</button>
<button onclick="show('lobby')">⬅️</button>
`;

updateBalance();
}

let deck=[], player=[], dealer=[], bjRunning=false;

function startBJ(){

if(users[currentUser] < currentBet){
alert("Brak kasy");
return;
}

users[currentUser]-=currentBet;
updateBalance();

deck=[];
player=[];
dealer=[];
bjRunning=true;

/* TALIA */
let suits=["♠","♥","♦","♣"];
let values=[2,3,4,5,6,7,8,9,10,"J","Q","K","A"];

for(let s of suits){
for(let v of values){
deck.push({v,s});
}
}

/* SHUFFLE */
deck.sort(()=>Math.random()-0.5);

/* ROZDANIE */
player.push(draw(), draw());
dealer.push(draw(), draw());

updateBJ();
}

function draw(){
return deck.pop();
}

function value(hand){
let sum=0;
let aces=0;

for(let c of hand){
if(typeof c.v==="number") sum+=c.v;
else if(c.v==="A"){sum+=11; aces++;}
else sum+=10;
}

while(sum>21 && aces){
sum-=10;
aces--;
}

return sum;
}

function updateBJ(){
document.getElementById("player").innerText=
player.map(c=>c.v+c.s).join(" ")+" ("+value(player)+")";

document.getElementById("dealer").innerText=
dealer.map(c=>c.v+c.s).join(" ")+" ("+value(dealer)+")";
}

function hit(){
if(!bjRunning) return;

player.push(draw());
updateBJ();

if(value(player)>21){
endBJ("PRZEGRANA ❌");
}
}

function stand(){
if(!bjRunning) return;

/* DEALER GRA */
while(value(dealer)<17){
dealer.push(draw());
}

updateBJ();

let p=value(player);
let d=value(dealer);

if(d>21 || p>d){
users[currentUser]+=currentBet*2;
endBJ("WYGRANA 💰");
}
else if(p===d){
users[currentUser]+=currentBet;
endBJ("REMIS");
}
else{
endBJ("PRZEGRANA ❌");
}

updateBalance();
}

function endBJ(text){
document.getElementById("bjResult").innerText=text;
bjRunning=false;
}
