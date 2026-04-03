let users=JSON.parse(localStorage.getItem("users")||"{}");
let u="";
let bets={};

/* LOGIN */
function login(){
u=document.getElementById("nick").value;
if(!users[u]) users[u]=1000;
show("lobby");
update();
}

/* UI */
function show(id){
document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function back(){show("lobby");}
function update(){
document.getElementById("bal").innerText=users[u];
localStorage.setItem("users",JSON.stringify(users));
}

/* ROULETTE */
let table=document.getElementById("table");

for(let i=0;i<=36;i++){
let d=document.createElement("div");
d.innerText=i;
d.className="cell "+(i==0?"green":(i%2?"red":"black"));
d.onclick=()=>bet(i);
table.appendChild(d);
}

function bet(n){
if(users[u]<10)return alert("Brak kasy");
users[u]-=10;
bets[n]=(bets[n]||0)+10;
update();
}

function spin(){
let win=Math.floor(Math.random()*37);
let result=document.getElementById("result");

result.innerText="Wynik: "+win;

if(bets[win]){
let winAmount=bets[win]*35;
users[u]+=winAmount;
result.innerText+=" WYGRANA "+winAmount+" zł";
}

bets={};
update();
}

/* SLOT */
function spinSlot(){
if(users[u]<50)return;
users[u]-=50;

let s=["🍒","🍋","💎","7️⃣"];
let r=[s[Math.random()*4|0],s[Math.random()*4|0],s[Math.random()*4|0]];

document.getElementById("slot").innerText=r.join(" ");

if(r[0]==r[1]&&r[1]==r[2]) users[u]+=300;

update();
}
