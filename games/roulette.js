function loadRoulette(){
let el=document.getElementById("gameScreen");

el.innerHTML=`
<h2>Ruletka</h2>
<div id="wheel"></div>
<button onclick="spinRoulette()">SPIN</button>
<button onclick="show('lobby')">⬅️</button>
<p id="result"></p>
`;

window.spinRoulette=function(){
let win=Math.floor(Math.random()*37);
document.getElementById("result").innerText="Wynik: "+win;
};
}
