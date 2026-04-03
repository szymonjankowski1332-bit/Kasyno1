let currentBet = 1;
alert("APP DZIAŁA");

let users = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = null;

/* LOGIN */
function login(){
let nick=document.getElementById("nick").value;

if(!nick) return;

currentUser=nick;

if(!users[currentUser]){
users[currentUser]=10; // startowe 10 zł
}

localStorage.setItem("users",JSON.stringify(users));

show("lobby");
updateBalance();
}

/* NAVIGATION */
function show(name){
document.querySelectorAll(".screen").forEach(s=>s.style.display="none");

let el=document.getElementById(name);
if(el) el.style.display="block";
}

/* OPEN GAME */
function openGame(game){
show("gameScreen");

if(game==="roulette") loadRoulette();
if(game==="slots") loadSlots();
if(game==="aviator") loadAviator();
if(game==="mines") loadMines();
if(game==="blackjack") loadBlackjack();
}

/* BALANCE */
function updateBalance(){
let el=document.getElementById("bal");

if(el && currentUser){
el.innerText = users[currentUser];
localStorage.setItem("users",JSON.stringify(users));
}
}

/* ADMIN — NAPRAWIONY */
window.openAdmin = function(){
let pass=prompt("Hasło:");

if(pass==="admin123"){
show("admin");
}else{
alert("Złe hasło");
}
};

window.addMoney = function(){
let u=document.getElementById("targetUser").value;
let a=parseInt(document.getElementById("amount").value);

if(!u || isNaN(a)) return;

if(!users[u]) users[u]=0;

users[u]+=a;

document.getElementById("adminMsg").innerText =
"Dodano "+a+" zł dla "+u;

localStorage.setItem("users",JSON.stringify(users));
updateBalance();
};

/* FAKE FEED */
let fakeNames=["Kuba","Mati","Oskar","Bartek","Kacper","Adam"];

setInterval(()=>{
let feed=document.getElementById("feed");
if(!feed) return;

let name=fakeNames[Math.floor(Math.random()*fakeNames.length)];
let win=Math.floor(Math.random()*500+50);

let p=document.createElement("p");
p.innerText = name+" wygrał "+win+" zł 🎉";

feed.prepend(p);

if(feed.children.length>5){
feed.removeChild(feed.lastChild);
}

},3000);
function renderBets(){
return `
<div class="bets">
<button onclick="setBet(1)">1 zł</button>
<button onclick="setBet(5)">5 zł</button>
<button onclick="setBet(10)">10 zł</button>
<button onclick="setBet(50)">50 zł</button>
<button onclick="setBet(100)">100 zł</button>
<button onclick="setBet(500)">500 zł</button>
<button onclick="setBet(1000)">1000 zł</button>
</div>

<p>Bet: <b id="betValue">${currentBet}</b> zł</p>
`;
}

function setBet(val){
currentBet = val;
document.getElementById("betValue").innerText = val;
}
