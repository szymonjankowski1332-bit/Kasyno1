let users=JSON.parse(localStorage.getItem("users")||"{}");
let currentUser="";

function login(){
currentUser=document.getElementById("nick").value;
if(!users[currentUser]) users[currentUser]=10;

show("lobby");
updateBalance();
}

function show(id){
document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function updateBalance(){
document.getElementById("bal").innerText=users[currentUser];
localStorage.setItem("users",JSON.stringify(users));
}

function openGame(name){
show("gameScreen");

if(name==="roulette") loadRoulette();
if(name==="slots") loadSlots();
if(name==="aviator") loadAviator();
}
function openAdmin(){
let pass=prompt("Hasło admina:");

if(pass==="admin123"){
show("admin");
}else{
alert("Błędne hasło");
}
}

function addMoney(){
let u=document.getElementById("targetUser").value;
let a=parseInt(document.getElementById("amount").value);

if(!users[u]) users[u]=0;

users[u]+=a;

document.getElementById("adminMsg").innerText="Dodano "+a+" zł dla "+u;

localStorage.setItem("users",JSON.stringify(users));
}
let fakeNames=["Kuba","Mati","Oskar","Bartek","Kacper","Adam"];

setInterval(()=>{
let name=fakeNames[Math.random()*fakeNames.length|0];
let win=(Math.random()*500+50|0);

let msg=`${name} wygrał ${win} zł 🎉`;

let feed=document.getElementById("feed");

if(feed){
let p=document.createElement("p");
p.innerText=msg;

feed.prepend(p);

if(feed.children.length>5){
feed.removeChild(feed.lastChild);
}
}

},3000);
<div id="admin" class="screen">
<h2>👑 Panel Admina</h2>

<input id="targetUser" placeholder="nick gracza">
<input id="amount" placeholder="kwota">

<button onclick="addMoney()">Dodaj kasę</button>
<button onclick="show('lobby')">⬅️</button>

<p id="adminMsg"></p>
</div>
if(name==="roulette") loadRoulette();
