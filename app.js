const ATTS=[["Velocidad",["rapid","veloz","velocidad","sprint","corro mucho"]],["Resistencia",["resistencia","aguant","fisico","pulmon","incansable"]],["Regate",["regate","dribl","uno contra uno","1 contra 1","habilidad"]],["Pase",["pase","pasar","asistencia","vision","organiz"]],["Disparo",["gol","disparo","remate","tiro","chut","marcar goles"]],["Defensa",["defend","defensa","marcaje","robar","entrada","recuper"]],["Juego aéreo",["cabeza","cabece","aereo","altura","alto","salto"]],["Reflejos",["portero","parar","reflejos","atajar","guantes","porteria"]]];
const POS=[
{n:"Portero",v:[35,45,20,45,10,30,70,95],d:"Reflejos, colocación y valentía bajo palos. Eres el último muro y el primer pasador de tu equipo.",m:[5,0]},
{n:"Defensa central",v:[45,60,30,55,20,95,90,25],d:"Fuerte en el duelo, dominas el juego aéreo y lees bien el peligro antes de que llegue.",m:[3,5]},
{n:"Lateral",v:[85,90,60,65,35,70,45,25],d:"Recorres la banda de área a área: defiendes, subes y centras sin perder fuelle.",m:[2,3]},
{n:"Pivote",v:[50,90,50,80,35,85,65,25],d:"Recuperas balones y empiezas el juego. Tu equipo se ordena a partir de ti.",m:[1,3]},
{n:"Mediocentro",v:[60,90,70,90,60,60,50,25],d:"Motor del equipo: conectas defensa y ataque con pase, llegada y mucho recorrido.",m:[1,2]},
{n:"Mediapunta",v:[65,60,90,90,75,30,40,25],d:"Creativo entre líneas: ves el pase que nadie ve y te atreves con el último regate.",m:[1,3]},
{n:"Extremo",v:[95,75,95,70,70,25,35,25],d:"Velocidad y regate en banda para desbordar, centrar o cerrar hacia el remate.",m:[1,2]},
{n:"Delantero centro",v:[75,65,70,55,95,25,80,25],d:"Olfato de gol, remate en el área y fuerza para ganar duelos de espaldas.",m:[1,4]}];
const MAT=["Balón de fútbol","Conos","Escalera de coordinación","Vallas","Ropa deportiva","Portería"];
const ENTR={"Portero":"Portería, balón y ropa deportiva (guantes).","Defensa central":"Conos y vallas para saltos y cambios de dirección.","Lateral":"Escalera de coordinación y conos para ritmo y pies rápidos.","Pivote":"Balón y conos para pase corto bajo presión.","Mediocentro":"Balón y conos para pase y conducción.","Mediapunta":"Balón y conos para regate y control orientado.","Extremo":"Conos y escalera de coordinación para desborde y velocidad.","Delantero centro":"Portería y balón para remate, y vallas para potencia de salto."};
const $=s=>document.querySelector(s);
const norm=t=>t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
// Sliders
$("#atts").innerHTML=ATTS.map((a,i)=>`<div class="att"><label for="a${i}">${a[0]}<output id="o${i}">50</output></label><input type="range" id="a${i}" min="0" max="100" value="50"></div>`).join("");
ATTS.forEach((a,i)=>$("#a"+i).addEventListener("input",e=>$("#o"+i).textContent=e.target.value));
// Navegación
function ir(p){document.querySelectorAll(".pant").forEach(x=>x.classList.toggle("on",x.id==="p-"+p));document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.p===p));$("main").scrollTop=0}
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>ir(b.dataset.p));
// Vídeo
$("#btn-subir").onclick=()=>$("#file").click();
$("#file").onchange=e=>{const f=e.target.files[0];if(!f)return;const v=$("#vid");v.src=URL.createObjectURL(f);v.style.display="block";$("#btn-subir").style.display="none";$("#vnota").textContent="«"+f.name+"» cargado. El vídeo es tu referencia; el resultado usa tu texto y tus cualidades."};
// Material
const hechos=new Set();
function pintaMat(){$("#mat").innerHTML=MAT.map((m,i)=>`<li class="${hechos.has(i)?"hecho":""}" data-i="${i}" role="checkbox" aria-checked="${hechos.has(i)}" tabindex="0"><span class="n">0${i+1}</span><span class="t">${m.toUpperCase()}</span><span class="chk">✓</span></li>`).join("");
 $("#prog").textContent=hechos.size===MAT.length?"Tienes todo el material. ¡A entrenar!":`Tienes ${hechos.size} de ${MAT.length} elementos.`}
$("#mat").addEventListener("click",e=>{const li=e.target.closest("li");if(!li)return;const i=+li.dataset.i;hechos.has(i)?hechos.delete(i):hechos.add(i);pintaMat()});
$("#mat").addEventListener("keydown",e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();e.target.click()}});
pintaMat();
// Campo de fútbol
const COORD={"Portero":[150,388],"Defensa central":[150,335],"Lateral":[48,300],"Pivote":[150,275],"Mediocentro":[100,215],"Mediapunta":[150,155],"Extremo":[248,110],"Delantero centro":[150,60]};
function campo(top){
 const ln='fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="2"';
 const pts=POS.map(p=>{const [x,y]=COORD[p.n],on=p.n===top,ly=on?(y>370?y-26:y+34):y+17;
  const txt=`<text x="${x}" y="${ly}" text-anchor="middle" font-family="Outfit,sans-serif" font-size="${on?13:9}" font-weight="${on?800:600}" fill="#fff" fill-opacity="${on?1:.8}" ${on?'stroke="#1a0a3d" stroke-width="3" paint-order="stroke"':''}>${p.n}</text>`;
  return on?`<g class="mk"><circle class="pulso" cx="${x}" cy="${y}" r="20" fill="#c86be6" fill-opacity=".6"/><circle cx="${x}" cy="${y}" r="13" fill="#5b1cff" stroke="#fff" stroke-width="3"/><circle cx="${x}" cy="${y}" r="4" fill="#fff"/>${txt}</g>`
   :`<circle cx="${x}" cy="${y}" r="6" fill="#fff" fill-opacity=".5"/>${txt}`}).join("");
 return `<h2>Tu lugar en el campo</h2><svg class="campo" viewBox="0 0 300 420" role="img" aria-label="Campo de fútbol con tu posición ideal: ${top}">
 <rect width="300" height="420" rx="10" fill="#2e9b4f"/><rect y="0" width="300" height="70" fill="#2a9048"/><rect y="140" width="300" height="70" fill="#2a9048"/><rect y="280" width="300" height="70" fill="#2a9048"/>
 <rect x="12" y="12" width="276" height="396" ${ln}/><line x1="12" y1="210" x2="288" y2="210" ${ln}/><circle cx="150" cy="210" r="36" ${ln}/><circle cx="150" cy="210" r="2.5" fill="#fff"/>
 <rect x="80" y="12" width="140" height="60" ${ln}/><rect x="115" y="12" width="70" height="24" ${ln}/><rect x="80" y="348" width="140" height="60" ${ln}/><rect x="115" y="384" width="70" height="24" ${ln}/>
 <rect x="130" y="4" width="40" height="8" ${ln}/><rect x="130" y="408" width="40" height="8" ${ln}/>${pts}</svg>`}
// Cálculo
$("#btn-calc").onclick=()=>{
 const t=norm($("#dotes").value);
 const vals=ATTS.map((a,i)=>{let v=+$("#a"+i).value;if(a[1].some(k=>t.includes(k)))v=Math.min(100,v+15);return v});
 const r=POS.map(p=>{const err=Math.sqrt(p.v.reduce((s,x,i)=>s+(vals[i]-x)**2,0)/vals.length);return{p,s:Math.max(0,Math.round(100-err*1.15))}}).sort((a,b)=>b.s-a.s);
 const top=r[0];
 $("#res").innerHTML=`<div class="res-top"><small>Tu posición ideal</small><div class="pos">${top.p.n}</div><div class="pct">${top.s}% de compatibilidad</div><p>${top.p.d}</p></div>
 ${campo(top.p.n)}<h2>Otras posiciones</h2>${r.slice(1,5).map(x=>`<div class="rank"><div class="f"><span>${x.p.n}</span><span>${x.s}%</span></div><div class="barra"><i style="width:${x.s}%"></i></div></div>`).join("")}
 <div class="caja" style="margin-top:16px"><h3>Entrena con</h3><p class="entr">${ENTR[top.p.n]}</p></div>
 <button class="btn" onclick="ir('material')">Revisar mi material</button>`;
 ir("res");
};
