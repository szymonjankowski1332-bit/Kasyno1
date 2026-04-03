function loadAviator(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>Aviator</h2>
<p>x<span id="m">1.00</span></p>
<button onclick="startAv()">Start</button>
<button onclick="show('lobby')">⬅️</button>
`;

window.startAv=function(){
let m=1;
let i=setInterval(()=>{
m+=0.05;
document.getElementById("m").innerText=m.toFixed(2);

if(Math.random()<0.02){
clearInterval(i);
document.getElementById("m").innerText="CRASH";
}
},100);
};
}
