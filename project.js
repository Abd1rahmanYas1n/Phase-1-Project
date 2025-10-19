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
