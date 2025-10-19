const PROVIDERS = [
  { id:1, name:"JusticeAid Kenya", county:"Nairobi", areas:["Employment","Consumer"], langs:["English","Swahili"], costBand:"aid", lat:-1.2864, lon:36.8172 },
  { id:2, name:"Mombasa Legal Clinic", county:"Mombasa", areas:["Family","Landlord/Tenant"], langs:["English","Swahili"], costBand:"aid", lat:-4.0435, lon:39.6682 },
  { id:3, name:"Kisumu Community Law Centre", county:"Kisumu", areas:["Property","Family"], langs:["English","Swahili"], costBand:"low", lat:-0.0917, lon:34.7679 },
  { id:4, name:"Nakuru Rights Desk", county:"Nakuru", areas:["Consumer","Employment"], langs:["English"], costBand:"low", lat:-0.3031, lon:36.0800 },
  { id:5, name:"Kiambu Pro Bono Network", county:"Kiambu", areas:["Criminal","Landlord/Tenant"], langs:["English","Swahili"], costBand:"aid", lat:-1.1714, lon:36.8356 },
  { id:6, name:"Nairobi Family Law Group", county:"Nairobi", areas:["Family"], langs:["English","Swahili"], costBand:"mid", lat:-1.29, lon:36.82 }
];

/*
 * Utilities
 */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));