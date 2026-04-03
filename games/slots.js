function loadSlots(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>Sloty</h2>
<div id="slot">🍒 🍒 🍒</div>
<button onclick="spinSlot()">SPIN</button>
<button onclick="show('lobby')">⬅️</button>
`;

window.spinSlot=function(){
let s=["🍒","🍋","💎","7️⃣"];
let r=[s[Math.random()*4|0],s[Math.random()*4|0],s[Math.random()*4|0]];
document.getElementById("slot").innerText=r.join(" ");
};
}
