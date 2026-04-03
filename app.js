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
