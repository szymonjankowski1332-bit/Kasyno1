function loadBlackjack(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>🃏 Blackjack</h2>

<div>Saldo: <span id="bal"></span> zł</div>

${renderBets()}

<p>Twoje: <span id="player"></span></p>
<p>Krupier: <span id="dealer"></span></p>

<button onclick="startBJ()">Start</button>
<button onclick="hit()">Dobierz</button>
<button onclick="stand()">Stop</button>
<button onclick="show('lobby')">⬅️</button>

<p id="bjMsg"></p>
`;

updateBalance();
}

let player=[], dealer=[], playingBJ=false;

function card(){
return Math.floor(Math.random()*10)+1;
}

function sum(arr){
return arr.reduce((a,b)=>a+b,0);
}

function startBJ(){
if(users[currentUser] < currentBet) return;

users[currentUser]-=currentBet;

player=[card(),card()];
dealer=[card()];

playingBJ=true;

renderBJ();
updateBalance();
}

function renderBJ(){
document.getElementById("player").innerText=player.join(",")+" ("+sum(player)+")";
document.getElementById("dealer").innerText=dealer.join(",")+" ("+sum(dealer)+")";
}

function hit(){
if(!playingBJ) return;

player.push(card());

if(sum(player)>21){
document.getElementById("bjMsg").innerText="PRZEGRANA";
playingBJ=false;
}else{
renderBJ();
}
}

function stand(){
while(sum(dealer)<17){
dealer.push(card());
}

renderBJ();

let p=sum(player), d=sum(dealer);

if(d>21 || p>d){
users[currentUser]+=currentBet*2;
document.getElementById("bjMsg").innerText="WYGRANA";
}else{
document.getElementById("bjMsg").innerText="PRZEGRANA";
}

playingBJ=false;
updateBalance();
}
