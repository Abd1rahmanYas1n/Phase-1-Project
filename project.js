const PROVIDERS = [
  { id:1, name:"JusticeAid Kenya", county:"Nairobi", areas:["Employment","Consumer"], langs:["English","Swahili"], costBand:"aid", lat:-1.2864, lon:36.8172 },
  { id:2, name:"Mombasa Legal Clinic", county:"Mombasa", areas:["Family","Landlord/Tenant"], langs:["English","Swahili"], costBand:"aid", lat:-4.0435, lon:39.6682 },
  { id:3, name:"Kisumu Community Law Centre", county:"Kisumu", areas:["Property","Family"], langs:["English","Swahili"], costBand:"low", lat:-0.0917, lon:34.7679 },
  { id:4, name:"Nakuru Rights Desk", county:"Nakuru", areas:["Consumer","Employment"], langs:["English"], costBand:"low", lat:-0.3031, lon:36.0800 },
  { id:5, name:"Kiambu Pro Bono Network", county:"Kiambu", areas:["Criminal","Landlord/Tenant"], langs:["English","Swahili"], costBand:"aid", lat:-1.1714, lon:36.8356 },
  { id:6, name:"Nairobi Family Law Group", county:"Nairobi", areas:["Family"], langs:["English","Swahili"], costBand:"mid", lat:-1.29, lon:36.82 }
];

/*Utilities */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function haversine(lat1, lon1, lat2, lon2){
  const toRad = d => d * Math.PI/180;
  const R = 6371;
  const dLat = toRad(lat2-lat1), dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}

async function geocode(place){
  if(!place) return null;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}&limit=1`;
  const res = await fetch(url,{headers:{"Accept":"application/json"}});
  if(!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if(!data.length) return null;
  return {lat:parseFloat(data[0].lat),lon:parseFloat(data[0].lon),display:data[0].display_name};
}

/*Rules Engine */
function scoreUrgency(flags){
  let score = 0;
  if(flags.has("notice")) score+=2;
  if(flags.has("deadline")) score+=3;
  if(flags.has("risk")) score+=5;
  const band = score>=6?"High":score>=3?"Medium":"Low";
  return {score,band};
}
function eligibleForAid(incomeBand){return incomeBand==="low";}

/*Renderers*/
function renderProviders(list,mount){
  mount.innerHTML="";
  list.forEach(p=>{
    const div=document.createElement("div");
    div.className="provider";
    div.innerHTML=`
      <div style="flex:1">
        <strong>${p.name}</strong>
        <div class="muted">${p.county} • Areas: ${p.areas.join(", ")} • Langs: ${p.langs.join(", ")}</div>
        <div class="badges">
          <span class="badge">Cost: ${p.costBand}</span>
          ${p._distanceKm?`<span class="badge">~${p._distanceKm.toFixed(1)} km</span>`:""}
        </div>
      </div>
      <div><a class="inline" href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}" target="_blank">Map ↗</a></div>
    `;
    mount.appendChild(div);
  });
  if(!list.length) mount.innerHTML=`<p class="muted">No providers match your filters.</p>`;
}

/*Event Handlers*/
function filterProviders(){
  const q=$("#search").value.trim().toLowerCase();
  const county=$("#countyFilter").value;
  const cost=$("#costFilter").value;
  let list=[...PROVIDERS];
  if(q) list=list.filter(p=>p.name.toLowerCase().includes(q)||p.areas.join(" ").toLowerCase().includes(q));
  if(county) list=list.filter(p=>p.county===county);
  if(cost) list=list.filter(p=>p.costBand===cost);
  renderProviders(list,$("#providerList"));
}

function rankProvidersByFit(category,coords){
  return PROVIDERS.map(p=>{
    let score=p.areas.includes(category)?10:0;
    if(coords){
      const d=haversine(coords.lat,coords.lon,p.lat,p.lon);
      p._distanceKm=d;
      score+=Math.max(0,10-Math.min(d/5,10));
    }
    return {...p,_score:score};
  }).sort((a,b)=>b._score-a._score);
}
