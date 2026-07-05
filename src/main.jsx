
import React,{useEffect,useMemo,useRef,useState}from"react";
import{createRoot}from"react-dom/client";
import{Home,HousePlus,Bot,Share2,Compass,FileText,ShieldCheck,Send,UploadCloud,UserRound,Plus,Trash2,LockKeyhole,CheckCircle2,AlertTriangle,Users,MapPin,ChevronRight,Search,Eye,Clock3,ExternalLink,Landmark,Navigation,MapPinned,ShieldAlert,TrendingUp,Building2,SlidersHorizontal,Sparkles,BriefcaseBusiness,WalletCards,BarChart3,Info,Euro,HeartHandshake,PieChart}from"lucide-react";
import"./styles.css";

const addressBook=[
 {address:"Roodzwenk 50, Eemnes",city:"Eemnes",postcode:"3755 LG",homeValue:610000,woz:574000,lat:"52.2547",lng:"5.2641",energyLabel:"A",homeTypeCurrent:"Hoekwoning",buildYear:1998,homeImage:"https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80"},
 {address:"Roodzwenk 52, Eemnes",city:"Eemnes",postcode:"3755 LG",homeValue:618000,woz:580000,lat:"52.2549",lng:"5.2643",energyLabel:"A",homeTypeCurrent:"Gezinswoning",buildYear:1998,homeImage:"https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80"},
 {address:"Laarderweg 23, Eemnes",city:"Eemnes",postcode:"3755 AK",homeValue:642000,woz:596000,lat:"52.2534",lng:"5.2658",energyLabel:"B",homeTypeCurrent:"Tussenwoning",buildYear:1986,homeImage:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"},
 {address:"Kerkstraat 24, Baarn",city:"Baarn",postcode:"3741 AK",homeValue:742000,woz:684000,lat:"52.2113",lng:"5.2868",energyLabel:"A",homeTypeCurrent:"Vrijstaand",buildYear:1978,homeImage:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"},
 {address:"Brinklaan 88, Bussum",city:"Bussum",postcode:"1404 GL",homeValue:715000,woz:661000,lat:"52.2732",lng:"5.1625",energyLabel:"B",homeTypeCurrent:"Hoekwoning",buildYear:1932,homeImage:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"}
];

const listings=[
 {id:"baarn",title:"Nieuwbouw Baarn",city:"Baarn",type:"Nieuwbouw",price:515000,monthly:2260,baseMatch:94,baseChance:91,label:"A++",rooms:5,plot:"132 m²",img:"https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80",why:["Past ruim binnen bandbreedte","Lage energielasten","Sterke financieringskans"]},
 {id:"eemnes",title:"Gezinswoning Eemnes",city:"Eemnes",type:"Hoekwoning / gezinswoning",price:675000,monthly:2920,baseMatch:87,baseChance:83,label:"A",rooms:5,plot:"178 m²",img:"https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1600&q=80",why:["Overwaarde helpt sterk","Goede gezinsmatch","Overbrugging controleren"]},
 {id:"bussum",title:"Hoekwoning Bussum",city:"Bussum",type:"Hoekwoning / gezinswoning",price:725000,monthly:3180,baseMatch:76,baseChance:74,label:"B",rooms:6,plot:"201 m²",img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",why:["Financieel mogelijk onder voorwaarden","Lease verlaagt score","Werkgeversverklaring ontbreekt"]},
 {id:"laren",title:"Vrijstaand Laren",city:"Laren",type:"Vrijstaand",price:925000,monthly:4050,baseMatch:48,baseChance:41,label:"A",rooms:7,plot:"421 m²",img:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",why:["Buiten huidige bandbreedte","Hoge maandlast","Meer eigen geld nodig"]},
 {id:"hilversum-app",title:"Compact appartement Hilversum",city:"Hilversum",type:"Appartement",price:225000,monthly:1180,baseMatch:86,baseChance:82,label:"B",rooms:2,plot:"56 m²",img:"https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",why:["Past binnen rustige maandlast","Lagere prijsklasse","Logisch alternatief bij woonlastendruk"]},
 {id:"bussum-app",title:"Appartement Bussum",city:"Bussum",type:"Appartement",price:238000,monthly:1260,baseMatch:82,baseChance:79,label:"C",rooms:2,plot:"61 m²",img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",why:["Dichter bij huidige kooppositie","Lagere maandlast","Documenten bepalen definitieve haalbaarheid"]}
];

const profiles={
 doorstromer:{
  label:"Nieuwe woonstap",
  buyer:{type:"doorstromer",firstName:"Erik",lastName:"van Slooten",birthDate:"1982-04-12",nationality:"Nederlands",maritalStatus:"Gehuwd",maritalProperty:"Beperkte gemeenschap",partner:true,partnerName:"Partner",partnerBirthDate:"1984-08-10",children:true,childCount:2,childAges:"9, 11",coParenting:false,alimony:false,childcare:0,workStatus:"Vast contract",employer:"La Fourchette",role:"Chef-kok",income:72800,partnerIncome:57600,holidayPay:true,thirteenthMonth:true,bonus:3000,extraIncomeOpen:false,extraIncomeType:"Overuren",extraIncome:0,probation:false,pensionAge:67,pensionIncome:0,partnerPension:0,pensionDrop:"Onbekend",cash:85000,investments:12000,crypto:0,studyDebt:0,loans:25000,creditcard:0,leaseMonthly:550,bkr:"Positieve registratie",address:"Laarderweg 23, Eemnes",city:"Eemnes",postcode:"3755 AK",lat:"52.2534",lng:"5.2658",homeValue:642000,woz:596000,mortgageLeft:418000,sellingCosts:21000,saleStatus:"Nog niet verkocht",mortgageMonthly:1780,rate:3.8,energyLabel:"B",homeTypeCurrent:"Tussenwoning",buildYear:1986,homeImage:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",places:"Eemnes, Baarn, Bussum, Laren, Hilversum",radius:20,homeType:"Hoekwoning / gezinswoning",rooms:5,garden:true,garage:false,energy:"A of beter",minPrice:450000,maxPrice:750000,moveInReady:true,adviceGoal:"Aankoop nieuwe woning",maxMonthly:3000,currentMonthly:1780,leftOverMonthly:1500,riskProfile:"Zekerheid belangrijk",ratePreference:"Langere rentezekerheid",repaymentPreference:"Gelijkblijvende lasten",deathScenario:"Maandlast moet betaalbaar blijven",unemploymentScenario:"Buffer tijdelijk gebruiken",disabilityScenario:"Aanvulling op inkomen nodig",futurePlans:"Groter wonen met gezin, regio Eemnes/Baarn/Bussum",expectedIncome:"Stabiel"}
 },
 starter:{
  label:"Starter",
  buyer:{type:"starter",firstName:"Starter",lastName:"Demo",birthDate:"1992-01-01",nationality:"Nederlands",maritalStatus:"Alleenstaand",maritalProperty:"Niet van toepassing",partner:false,partnerName:"",partnerBirthDate:"",children:false,childCount:0,childAges:"",coParenting:false,alimony:false,childcare:0,workStatus:"Vast contract",employer:"",role:"",income:48000,partnerIncome:0,holidayPay:true,thirteenthMonth:false,bonus:0,extraIncomeOpen:false,extraIncomeType:"Tweede baan",extraIncome:0,probation:false,pensionAge:67,pensionIncome:0,partnerPension:0,pensionDrop:"Onbekend",cash:22000,investments:0,crypto:0,studyDebt:0,loans:0,creditcard:0,leaseMonthly:0,bkr:"Onbekend",address:"",city:"",postcode:"",lat:"",lng:"",homeValue:0,woz:0,mortgageLeft:0,sellingCosts:0,saleStatus:"Geen huidige woning",mortgageMonthly:0,rate:0,energyLabel:"",homeTypeCurrent:"",buildYear:"",homeImage:"",places:"Baarn, Hilversum, Amersfoort",radius:20,homeType:"Appartement",rooms:3,garden:false,garage:false,energy:"Geen voorkeur",minPrice:280000,maxPrice:450000,moveInReady:true,adviceGoal:"Aankoop eerste woning",maxMonthly:1800,currentMonthly:950,leftOverMonthly:800,riskProfile:"Zekerheid belangrijk",ratePreference:"Langere rentezekerheid",repaymentPreference:"Gelijkblijvende lasten",deathScenario:"Nog onbekend",unemploymentScenario:"Buffer tijdelijk gebruiken",disabilityScenario:"Aanvulling op inkomen nodig",futurePlans:"Eerste woning kopen",expectedIncome:"Stijgend"}
 },
 zzp:{
  label:"Ondernemer / ZZP",
  buyer:{type:"zzp",firstName:"ZZP",lastName:"Demo",birthDate:"1987-03-04",nationality:"Nederlands",maritalStatus:"Samenwonend",maritalProperty:"Niet van toepassing",partner:true,partnerName:"Partner",partnerBirthDate:"1988-05-01",children:false,childCount:0,childAges:"",coParenting:false,alimony:false,childcare:0,workStatus:"ZZP",employer:"Eigen onderneming",role:"Zelfstandig ondernemer",income:84000,partnerIncome:41000,holidayPay:false,thirteenthMonth:false,bonus:0,extraIncomeOpen:false,extraIncomeType:"Commissie",extraIncome:0,probation:false,pensionAge:67,pensionIncome:0,partnerPension:0,pensionDrop:"Onbekend",cash:65000,investments:25000,crypto:0,studyDebt:0,loans:0,creditcard:0,leaseMonthly:0,bkr:"Onbekend",address:"",city:"",postcode:"",lat:"",lng:"",homeValue:0,woz:0,mortgageLeft:0,sellingCosts:0,saleStatus:"Geen huidige woning",mortgageMonthly:0,rate:0,energyLabel:"",homeTypeCurrent:"",buildYear:"",homeImage:"",places:"Laren, Bussum, Hilversum",radius:25,homeType:"Hoekwoning / gezinswoning",rooms:4,garden:true,garage:false,energy:"B of beter",minPrice:500000,maxPrice:800000,moveInReady:true,adviceGoal:"Aankoop nieuwe woning",maxMonthly:3200,currentMonthly:1400,leftOverMonthly:2200,riskProfile:"Balans tussen zekerheid en flexibiliteit",ratePreference:"Langere rentezekerheid",repaymentPreference:"Gelijkblijvende lasten",deathScenario:"Maandlast moet betaalbaar blijven",unemploymentScenario:"Buffer tijdelijk gebruiken",disabilityScenario:"Buffer tijdelijk gebruiken",futurePlans:"Ruimer wonen en bedrijf verder uitbouwen",expectedIncome:"Mogelijk stijgend"}
 },
 woonlasten:{
  label:"Rustig financieel overzicht",
  buyer:{type:"woonlasten",firstName:"Rustig",lastName:"Overzicht",birthDate:"1978-06-14",nationality:"Nederlands",maritalStatus:"Alleenstaand",maritalProperty:"Niet van toepassing",partner:false,partnerName:"",partnerBirthDate:"",children:true,childCount:1,childAges:"12",coParenting:false,alimony:false,childcare:0,workStatus:"Vast contract",employer:"",role:"",income:42000,partnerIncome:0,holidayPay:true,thirteenthMonth:false,bonus:0,extraIncomeOpen:false,extraIncomeType:"Tweede baan",extraIncome:0,probation:false,pensionAge:67,pensionIncome:0,partnerPension:0,pensionDrop:"Onbekend",cash:8000,investments:0,crypto:0,studyDebt:0,loans:12000,creditcard:0,leaseMonthly:0,bkr:"Onbekend",address:"Roodzwenk 50, Eemnes",city:"Eemnes",postcode:"3755 LG",lat:"52.2547",lng:"5.2641",homeValue:610000,woz:574000,mortgageLeft:455000,sellingCosts:21000,saleStatus:"Nog niet verkocht",mortgageMonthly:2050,rate:4.2,energyLabel:"A",homeTypeCurrent:"Hoekwoning",buildYear:1998,homeImage:"https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80",places:"Eemnes, Baarn, Hilversum",radius:20,homeType:"Appartement",rooms:3,garden:false,garage:false,energy:"Geen voorkeur",minPrice:300000,maxPrice:525000,moveInReady:true,adviceGoal:"Rustig financieel overzicht",maxMonthly:1600,currentMonthly:2050,leftOverMonthly:250,riskProfile:"Zekerheid belangrijk",ratePreference:"Stabiele maandlast hele looptijd",repaymentPreference:"Gelijkblijvende lasten",deathScenario:"Nog onbekend",unemploymentScenario:"Aanvulling nodig",disabilityScenario:"Aanvulling op inkomen nodig",futurePlans:"Rustig overzicht krijgen en maandlasten beheersbaar maken",expectedIncome:"Onzeker"}
 }
};

function docRules(buyer){
 const docs=[
  ["id","Identiteitsbewijs voor- en achterkant","Identiteit",100],
  ["salary","Laatste 3 salarisstroken","Inkomen",0,3],
  ["salaryBank","Bankafschrift salarisbijschrijving","Inkomen",0],
  ["mortgageBank","Afschrift rekening hypotheekafschrijving","Algemeen",0],
  ["employer","Werkgeversverklaring < 3 maanden","Inkomen",65],
  ["funds","Bewijs eigen middelen","Eigen geld",buyer.cash>0?100:0],
  ["pensionOverview","Mijnpensioenoverzicht.nl uitdraai","Pensioen",0]
 ];
 if((buyer.type==="doorstromer"||buyer.type==="woonlasten") && buyer.saleStatus!=="Geen huidige woning"){
  docs.push(["currentMortgage","Hypotheekoverzicht huidige woning","Eigen woning",100]);
  docs.push(["valuationCurrent","Taxatierapport huidige woning","Eigen woning",0]);
  docs.push(["energyCurrent","Energielabel huidige woning","Eigen woning",0]);
  docs.push(["saleOrder","Verkoopopdracht / verkoopakte huidige woning","Eigen woning",0]);
 }
 if(buyer.selectedNewHome){
  docs.push(["purchaseContract","Getekende koopakte nieuwe woning","Aankoop",0]);
  docs.push(["valuationNew","Taxatierapport nieuwe woning","Aankoop",0]);
  docs.push(["notary","Notarisgegevens","Aankoop",0]);
 }
 const age=ageFromDate(buyer.birthDate);
 if(age>=57 || buyer.workStatus.includes("Pensioen")){
  docs.push(["pensionDecision","Pensioenbeschikking / AOW besluit","Pensioen",0]);
  docs.push(["pensionSpec","Recente pensioenspecificatie","Pensioen",0]);
 }
 if(buyer.workStatus==="ZZP"){
  docs.push(["zzpYears","Jaarstukken afgelopen 3 jaar","ZZP",0,3]);
  docs.push(["zzpIB","IB-aangiftes afgelopen 3 jaar","ZZP",0,3]);
  docs.push(["zzpForecast","Prognose aankomend jaar","ZZP",0]);
 }
 return docs.map(([id,name,type,progress,required])=>({id,name,type,progress,status:progress>=100?"verified":progress>0?"review":"missing",required,uploaded:required?Math.round(progress/100*required):undefined}));
}
function mergeDocs(oldDocs,buyer){
 const base=docRules(buyer);
 return base.map(d=>{
  const old=oldDocs.find(x=>x.id===d.id);
  return old?{...d,...old,name:d.name,type:d.type,required:d.required}:d;
 });
}

function parseDate(v){if(!v)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(v)){const d=new Date(v+"T00:00:00");return isNaN(d)?null:d}const m=String(v).match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);if(m){const d=new Date(`${m[3]}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}T00:00:00`);return isNaN(d)?null:d}return null}
function ageFromDate(v){const d=parseDate(v);if(!d)return 0;const now=new Date();let a=now.getFullYear()-d.getFullYear();const m=now.getMonth()-d.getMonth();if(m<0||(m===0&&now.getDate()<d.getDate()))a--;return a}
function euro(n){return"€ "+Math.round(Number(n)||0).toLocaleString("nl-NL")}
function short(n){return"€ "+Math.round((Number(n)||0)/1000)+"k"}
function clamp(v){return Math.max(0,Math.min(100,Math.round(v)))}
function level(v){return v>=82?"green":v>=62?"yellow":"red"}
function hasCurrentHome(b){return b.saleStatus!=="Geen huidige woning" && !!b.address && (+b.homeValue||0)>0}
function equity(b){return hasCurrentHome(b)?Math.max(0,(+b.homeValue||0)-(+b.mortgageLeft||0)-(+b.sellingCosts||0)):0}
function usable(b){return Math.round(equity(b)*.82)}
function docScore(docs){return docs.length?Math.round(docs.reduce((s,d)=>s+d.progress,0)/docs.length):0}
function hasDoc(docs,id){return docs.find(d=>d.id===id)?.progress>=100}
function budget(b,docs){
 const income=(+b.income||0)+(+b.partnerIncome||0)+(+b.bonus||0)+(+b.extraIncome||0)+(b.thirteenthMonth?((+b.income||0)/12):0);
 const penalty=(+b.leaseMonthly||0)*180+(+b.loans||0)*1.15+(+b.studyDebt||0)*.55+(docScore(docs)<70?25000:0)+(hasCurrentHome(b)&&b.saleStatus==="Nog niet verkocht"?35000:0);
 return Math.max(0,Math.round(income*4.35+(+b.cash||0)*.82+(+b.investments||0)*.55+usable(b)-penalty));
}
function calcScore(b,docs){
 const ds=docScore(docs), bud=budget(b,docs), eq=equity(b), age=ageFromDate(b.birthDate);
 const personal=(b.maritalStatus&&age&&b.nationality?94:58);
 const family=(b.children?78+(b.childCount?10:0):92);
 const financial=clamp(50+(bud>700000?22:bud>550000?13:bud>400000?8:4)-(b.leaseMonthly>0?7:0)-(b.loans>0?5:0)-(b.bkr==="Negatieve registratie"?18:0));
 const homeReliability=!hasCurrentHome(b)?0:clamp((b.address?25:0)+(b.homeValue?20:0)+(hasDoc(docs,"valuationCurrent")?30:0)+(hasDoc(docs,"energyCurrent")?15:0)+(hasDoc(docs,"currentMortgage")?10:0));
 const home=b.type==="starter"?62:(!hasCurrentHome(b)?55:clamp((eq>180000?76:eq>80000?62:35)+homeReliability*.22));
 const pensionRisk=(age>=57||b.workStatus.includes("Pensioen")||b.workStatus.includes("Bijna"))?((+b.pensionIncome||0)>25000?5:-8):0;
 const advice=clamp((b.maxMonthly?20:0)+(b.riskProfile?20:0)+(b.ratePreference?20:0)+(b.deathScenario?20:0)+(b.futurePlans?20:0));
 const confidence=clamp(ds*.32+personal*.13+financial*.17+home*.18+family*.07+advice*.10+pensionRisk);
 const atlas=clamp(financial*.25+ds*.18+home*.18+confidence*.22+family*.07+advice*.10);
 return{atlas,confidence,personal,family,financial,home,homeReliability,docs:ds,budget:bud,equity:eq,usable:usable(b),age,advice}
}
function cleanNumber(v){if(v===""||v===null||v===undefined)return 0;return Number(v)||0}
function homeTypeList(v){return String(v||"").split(",").map(x=>x.trim()).filter(Boolean)}
function typeMatches(b,h){
 const selected=homeTypeList(b.homeType);
 if(!selected.length)return true;
 return selected.some(t=>t===h.type || h.title.toLowerCase().includes(t.toLowerCase().split(" ")[0]));
}
function monthlyComfort(b){
 const preferred=cleanNumber(b.maxMonthly);
 if(preferred>0)return preferred;
 const income=cleanNumber(b.income)+cleanNumber(b.partnerIncome);
 return Math.max(1200,Math.round(income/12*.34));
}
function listingStatus(h,s,b){
 const strict=b.type==="woonlasten";
 const maxBudget=Math.max(1,cleanNumber(s.budget));
 const maxMonthly=monthlyComfort(b);
 const priceOk=h.price<=maxBudget*(strict?.98:1.04);
 const monthlyOk=h.monthly<=maxMonthly*(strict?1.05:1.18);
 if(priceOk&&monthlyOk&&typeMatches(b,h))return "kansrijk";
 const nearPrice=h.price<=maxBudget*(strict?1.08:1.20);
 const nearMonthly=h.monthly<=maxMonthly*(strict?1.12:1.32);
 if(nearPrice&&nearMonthly&&typeMatches(b,h))return "aandacht";
 return "buiten";
}
function statusLabel(status){
 return status==="kansrijk"?"Kansrijk":status==="aandacht"?"Aandacht nodig":"Buiten bereik";
}
function filterListings(homes,b,s,city){
 const byCity=city?homes.filter(h=>h.city===city):homes;
 const visible=byCity.filter(h=>h.status!=="buiten");
 if(b.type==="woonlasten")return byCity.filter(h=>h.status==="kansrijk");
 return visible.length?visible:byCity.filter(h=>h.status==="aandacht");
}
function adjustListing(h,s,b){
 const placeBoost=(b.places||"").toLowerCase().includes(h.city.toLowerCase())?5:-3;
 const priceFit=h.price<=s.budget?8:h.price<=s.budget*1.12?-6:-22;
 const typeFit=typeMatches(b,h)?5:-8;
 const comfortFit=h.monthly<=monthlyComfort(b)?6:-8;
 const status=listingStatus(h,s,b);
 const strictPenalty=b.type==="woonlasten"&&status==="buiten"?-35:0;
 const wishFit=(b.homeType||"").toLowerCase().includes("hoek")&&h.title.toLowerCase().includes("hoek")?4:0;
 const match=clamp(h.baseMatch+(s.atlas-84)*.22+placeBoost+priceFit+typeFit+comfortFit+wishFit+strictPenalty);
 const confidence=clamp(h.baseChance+(s.confidence-84)*.18+priceFit+comfortFit+strictPenalty);
 return{...h,status,statusLabel:statusLabel(status),match,confidence}
}

function Badge({value,children}){return <span className={"badge "+level(value)}>{children}</span>}
function Bar({value}){return <div className="bar"><span className={level(value)} style={{width:clamp(value)+"%"}}/></div>}
function Header({kicker,title,text}){return <div className="header"><span>{kicker}</span><h2>{title}</h2><p>{text}</p></div>}
function Field({label,value,onChange,type="text",prefix,readOnly=false,min=0,placeholder=""}){
 const isNumber=type==="number";
 const display=readOnly?value:(isNumber&&(value===0||value===null||value===undefined)?"":value);
 function change(e){
  if(!isNumber){onChange(e.target.value);return}
  const raw=e.target.value;
  if(raw===""){onChange("");return}
  const cleaned=raw.replace(/[^\d,.-]/g,"").replace(",",".");
  const num=Number(cleaned);
  if(Number.isNaN(num))return;
  onChange(min!==undefined?Math.max(min,num):num);
 }
 return <label className="field"><span>{label}</span><div>{prefix&&<small>{prefix}</small>}<input type={isNumber?"text":type} inputMode={isNumber?"decimal":undefined} value={display} readOnly={readOnly} placeholder={placeholder} onChange={change}/></div></label>
}
function Choice({label,value,onChange,options,columns=2,small=false}){return <div className={small?"choiceWrap small":"choiceWrap"}><span>{label}</span><div className="choices" style={{gridTemplateColumns:`repeat(${columns},1fr)`}}>{options.map(o=><button key={o} className={value===o?"choice active":"choice"} onClick={()=>onChange(o)}>{value===o&&<CheckCircle2 size={16}/>}<b>{o}</b></button>)}</div></div>}
function MultiChoice({label,value,onChange,options,columns=2,small=false,help}){
 const active=homeTypeList(value);
 function toggle(o){
  const next=active.includes(o)?active.filter(x=>x!==o):[...active,o];
  onChange(next.join(", "));
 }
 return <div className={small?"choiceWrap small":"choiceWrap"}><span>{label}</span>{help&&<p className="fieldHelp">{help}</p>}<div className="choices multi" style={{gridTemplateColumns:`repeat(${columns},1fr)`}}>{options.map(o=><button key={o} className={active.includes(o)?"choice active":"choice"} onClick={()=>toggle(o)}>{active.includes(o)&&<CheckCircle2 size={16}/>}<b>{o}</b></button>)}</div></div>
}
function Toggle({label,checked,onChange}){return <button className={checked?"toggle on":"toggle"} onClick={()=>onChange(!checked)}><span>{checked?<CheckCircle2 size={17}/>:<span className="dot"/>}</span>{label}</button>}



function isVerifiedScore(s){return (s?.docs||0)>=80}
function scoreLabel(s){return isVerifiedScore(s)?"ATLAS Score":"Voorlopige kooppositie"}
function confidenceLabel(s){return isVerifiedScore(s)?"Confidence":"Voorlopige confidence"}

function routeForBuyer(buyer){
 const base=[
  {key:"profile-0",label:"Persoonlijk",page:"profile",wizard:0},
  {key:"profile-1",label:householdStepLabel(buyer),page:"profile",wizard:1},
  {key:"profile-2",label:"Werk & inkomen",page:"profile",wizard:2},
  {key:"profile-3",label:"Financiën",page:"profile",wizard:3}
 ];
 if(buyer?.type!=="starter"){
  base.push({key:"home",label:"Mijn woning",page:"home"});
 }
 base.push(
  {key:"documents",label:"Documenten",page:"documents"},
  {key:"profile-4",label:"Woonwensen",page:"profile",wizard:4},
  {key:"profile-5",label:"Resultaat",page:"profile",wizard:5},
  {key:"advice",label:"Adviesprofiel",page:"advice"},
  {key:"market",label:"Marktinzicht",page:"market"},
  {key:"matches",label:"Woningmatches",page:"matches"},
  {key:"share",label:"ATLAS Paspoort",page:"share"},
  {key:"agent",label:"Makelaarview",page:"agent"}
 );
 return base;
}
function getStepIndex(page,wizard,buyer){
 const steps=routeForBuyer(buyer);
 if(page==="profile"){
  const idx=steps.findIndex(s=>s.page==="profile"&&s.wizard===wizard);
  return idx>=0?idx:0;
 }
 const idx=steps.findIndex(s=>s.page===page);
 return idx>=0?idx:0;
}
function stepTitle(page,wizard,buyer){
 const steps=routeForBuyer(buyer);
 return steps[getStepIndex(page,wizard,buyer)]?.label||"ATLAS Kooproute";
}
function routeDisplay(buyer){
 if(buyer?.maritalStatus==="Weduwe/weduwnaar")return {title:"Gevoelige woonroute",text:"Rustig en zorgvuldig verder",kind:"sensitive"};
 if(buyer?.maritalStatus==="Gescheiden")return {title:"Nieuwe start route",text:"Overzicht zonder druk",kind:"sensitive"};
 if(buyer?.type==="starter")return {title:"Starterroute actief",text:"Geen huidige woning of overwaarde",kind:"starter"};
 if(buyer?.type==="zzp")return {title:"Ondernemersroute actief",text:"Extra bewijs voor inkomen",kind:"zzp"};
 if(buyer?.type==="woonlasten")return {title:"Rustig financieel overzicht",text:"Discreet inzicht, zonder oordeel",kind:"sensitive"};
 return {title:"Nieuwe woonstap actief",text:"Eigen woning en overwaarde tellen mee",kind:"move"};
}
function JourneyFlow({page,wizard,setPage,setWizard,s,buyer}){
 const steps=routeForBuyer(buyer);
 const idx=getStepIndex(page,wizard,buyer);
 const progress=Math.round(((idx+1)/steps.length)*100);
 const route=routeDisplay(buyer);
 return <div className="journeyFlow"><div className="journeyTop"><div className={"routeBadge "+route.kind}><b>{route.title}</b><span>{route.text}</span></div><em>{progress}% naar biedklaar</em></div><div className="journeyHead"><div><span>ATLAS Kooproute</span><b>Stap {idx+1} van {steps.length} — {steps[idx]?.label || "Route"}</b></div></div><div className="flowBar"><i style={{width:progress+"%"}}/></div><div className="flowDots">{steps.map((st,i)=><button key={st.key} title={st.label} onClick={()=>{setPage(st.page); if(st.page==="profile")setWizard(st.wizard)}} className={i<idx?"done":i===idx?"active":""}><strong>{i+1}</strong><span>{st.label}</span></button>)}</div></div>
}
function NextStep({title,text,primary,secondary,onPrimary,onSecondary,status="ok"}){
 return <div className={"nextStep "+status}><div><span>Volgende beste actie</span><h3>{title}</h3><p>{text}</p></div><div className="nextActions"><button onClick={onPrimary}>{primary}<ChevronRight size={16}/></button>{secondary&&<button className="secondary" onClick={onSecondary}>{secondary}</button>}</div></div>
}
function LifeNotice({buyer}){
 if(buyer.maritalStatus==="Weduwe/weduwnaar"){
  return <div className="lifeNotice sensitive"><HeartHandshake/><div><b>We begrijpen dat deze stap persoonlijk kan zijn.</b><p>ATLAS helpt je rustig en zorgvuldig overzicht krijgen in je mogelijkheden, je maandlasten en je volgende woonstap. Zonder haast en zonder onnodige druk.</p><span>Deze route houdt extra rekening met inkomen nu en straks, nabestaandenpensioen, maandlastcomfort en gewenste zekerheid.</span></div></div>
 }
 if(buyer.maritalStatus==="Gescheiden"){
  return <div className="lifeNotice sensitive"><HeartHandshake/><div><b>Een nieuwe woonstap na een verandering vraagt om overzicht.</b><p>ATLAS helpt je rustig bepalen wat mogelijk is, welke documenten belangrijk zijn en welke maandlast verantwoord voelt.</p></div></div>
 }
 if(buyer.type==="starter"){
  return <div className="lifeNotice starter"><Sparkles/><div><b>Wat leuk en spannend dat je je eerste woning wilt kopen.</b><p>Een eerste huis kopen voelt vaak groot en onzeker. Geen zorgen: ATLAS helpt je stap voor stap ontdekken wat haalbaar is, wat je nog nodig hebt en waar je écht kans maakt.</p><span>Starterroute actief: geen huidige woning, geen overwaarde en geen verkoopdocumenten.</span></div></div>
 }
 if(buyer.type==="zzp"){
  return <div className="lifeNotice"><BriefcaseBusiness/><div><b>Als ondernemer werkt je hypotheekroute net iets anders.</b><p>ATLAS helpt je inkomen en documenten duidelijk maken, zodat een makelaar sneller vertrouwen krijgt in je kooppositie.</p></div></div>
 }
 if(buyer.type==="woonlasten"){
  return <div className="lifeNotice sensitive"><HeartHandshake/><div><b>We beginnen met overzicht, niet met druk.</b><p>ATLAS helpt je discreet in kaart brengen wat er financieel mogelijk is: maandlast, buffer, woningwaarde en rustige vervolgstappen.</p><span>Je hoeft niets te forceren. Eerst overzicht, daarna pas keuzes.</span></div></div>
 }
 return null;
}
function getGlobalNext(page,wizard,s,buyer){
 const steps=routeForBuyer(buyer);
 const currentIndex=getStepIndex(page,wizard,buyer);
 const nextStep=steps[Math.min(currentIndex+1,steps.length-1)];
 if(page==="profile"&&wizard<3){
  const label=householdStepLabel(buyer);
  const nextLabel=wizard===0?label:wizard===1?"Werk & inkomen":"Financiën";
  return {title:"Stap compleet",text:`De volgende stap past zich aan jouw situatie aan. Ga rustig verder naar ${nextLabel}.`,primary:buyer.maritalStatus==="Weduwe/weduwnaar"&&wizard===0?"Ga rustig verder":`Ga naar ${nextLabel}`,page:"profile",wizard:wizard+1};
 }
 if(page==="profile"&&wizard===3){
  if(buyer.type!=="starter")return {title:"Financiën ingevuld",text:"Bevestig eerst je huidige woning en ga daarna naar documenten. Pas daarna wordt je kooppositie betrouwbaarder.",primary:"Check mijn woning",page:"home"};
  return {title:"Financiën ingevuld",text:"Rond nu eerst je documenten af. ATLAS claimt geen betrouwbare score voordat de onderbouwing er is.",primary:"Ga naar Documenten",page:"documents"};
 }
 if(page==="home")return {title:"Woningcheck afgerond",text:"Gebruik deze woningdata nu om je documentstatus en kooppositie te onderbouwen.",primary:"Ga naar Documenten",page:"documents"};
 if(page==="documents"){
  if(s.docs<80)return {title:"Documenten eerst",text:"Je kooppositie blijft voorlopig totdat de belangrijkste documenten zijn aangeleverd of gecontroleerd.",primary:"Upload ontbrekende documenten",page:"documents"};
  return {title:"Documenten gecontroleerd",text:"Nu kan ATLAS je woonwensen en marktpositie veel betrouwbaarder inschatten.",primary:"Ga naar Woonwensen",page:"profile",wizard:4};
 }
 if(page==="profile"&&wizard===4){
  return {title:isVerifiedScore(s)?"Woonwensen klaar":"Woonwensen voorlopig",text:isVerifiedScore(s)?"Bekijk nu je onderbouwde resultaat.":"Je kunt alvast zoeken, maar documenten bepalen straks de betrouwbaarheid van je score.",primary:"Bekijk Resultaat",page:"profile",wizard:5};
 }
 if(page==="profile"&&wizard===5){
  if(s.docs<80)return {title:"Nog geen definitieve score",text:"Rond eerst je documenten af voordat ATLAS je kooppositie betrouwbaar kan maken.",primary:"Ga naar Documenten",page:"documents"};
  if(s.advice<80)return {title:"Resultaat onderbouwd",text:"Vul nu je adviesprofiel aan zodat ATLAS niet alleen kan berekenen, maar ook kan beoordelen wat verstandig is.",primary:"Ga naar Adviesprofiel",page:"advice"};
  return {title:"Resultaat onderbouwd",text:"Je documenten en profiel geven nu voldoende basis voor marktinzicht.",primary:"Bekijk Marktinzicht",page:"market"};
 }
 if(page==="advice")return s.docs<80?{title:"Adviesprofiel klaar",text:"Je risicoprofiel is bekend. Rond nu je documenten af voordat ATLAS de score betrouwbaar noemt.",primary:"Ga naar Documenten",page:"documents"}:{title:"Adviesprofiel klaar",text:"ATLAS weet nu beter wat voor jou belangrijk is. Bekijk je persoonlijke marktpositie.",primary:"Bekijk Marktinzicht",page:"market"};
 if(page==="market")return {title:"Marktinzicht bekeken",text:"Je ziet nu waar je meer kans maakt. Bekijk de woningen die ATLAS als kansrijk ziet.",primary:"Bekijk Woningmatches",page:"matches"};
 if(page==="matches")return {title:"Kies een kansrijke woning",text:isVerifiedScore(s)?"Gebruik de matchscore en koopkans om je ATLAS Paspoort makelaar-ready te maken.":"Maak eerst je documenten sterker voordat je dit als biedklaar profiel deelt.",primary:isVerifiedScore(s)?"Maak ATLAS Paspoort":"Ga naar Documenten",page:isVerifiedScore(s)?"share":"documents"};
 if(page==="coach")return {title:"Coachadvies gebruiken",text:"Zet het advies om in actie via documenten, marktinzicht of woningmatches.",primary:"Bekijk Marktinzicht",page:"market",secondary:"Ga naar Documenten",secondaryPage:"documents"};
 if(page==="share")return {title:"Bekijk wat de makelaar ziet",text:"Controleer de professionele makelaarsweergave: vertrouwen, status en kooppositie zonder ruwe dossiers.",primary:"Bekijk makelaarsweergave",page:"agent"};
 if(page==="agent")return {title:"Klaar voor een pilotgesprek",text:"Deze view laat zien waarom ATLAS waardevol is voor makelaars: minder onzekerheid, meer voorbereide kopers.",primary:"Terug naar Cockpit",page:"cockpit"};
 return nextStep?{title:"Ga verder in je kooproute",text:"ATLAS leidt je stap voor stap naar een biedklaar profiel.",primary:`Ga naar ${nextStep.label}`,page:nextStep.page,wizard:nextStep.wizard}: {title:"Ga verder",text:"ATLAS begeleidt je naar de volgende stap.",primary:"Volgende stap",page:"profile",wizard:0};
}


function householdStepLabel(buyer){
 if(buyer?.maritalStatus==="Weduwe/weduwnaar")return "Jouw situatie";
 if(buyer?.maritalStatus==="Gescheiden")return "Nieuwe situatie";
 if(buyer?.type==="starter")return "Leefsituatie";
 return "Huishouden";
}
function householdStepText(buyer){
 if(buyer?.maritalStatus==="Weduwe/weduwnaar")return "We houden deze stap rustig en vragen alleen wat nodig is voor jouw overzicht.";
 if(buyer?.maritalStatus==="Gescheiden")return "ATLAS helpt je rustig overzicht krijgen in je nieuwe woonsituatie.";
 if(buyer?.type==="starter")return "We kijken alleen of er mensen of maandlasten zijn die invloed hebben op je eerste woonstap.";
 return "We kijken naar je huishouden voor woonruimte, maandlasten en documenten. Zonder oordeel.";
}
function householdPartnerLabel(buyer){
 if(buyer?.type==="starter")return "Koop je samen met iemand?";
 return "Mede-aanvrager aanwezig";
}

function routeHumanTone(buyer){
 if(buyer.type==="starter")return {title:"Je eerste woning mag spannend voelen.",text:"ATLAS helpt je rustig ontdekken wat haalbaar is, zonder dat je alles al hoeft te weten."};
 if(buyer.type==="zzp")return {title:"Ondernemen past niet altijd in standaard hokjes.",text:"ATLAS helpt jouw inkomen begrijpelijk en betrouwbaar maken voor het woonproces."};
 if(buyer.type==="woonlasten")return {title:"Je hoeft je situatie niet uit te leggen om geholpen te worden.",text:"ATLAS begint met overzicht, discretie en realistische opties. Geen oordeel, geen druk."};
 if(buyer.maritalStatus==="Weduwe/weduwnaar")return {title:"We gaan zorgvuldig met jouw situatie om.",text:"ATLAS stelt geen onnodige vragen en helpt stap voor stap overzicht krijgen."};
 if(buyer.maritalStatus==="Gescheiden")return {title:"Een nieuwe woonsituatie vraagt om rust en duidelijkheid.",text:"ATLAS helpt je keuzes ordenen zonder oordeel of haast."};
 return {title:"Jouw situatie is het vertrekpunt.",text:"ATLAS past vragen, documenten en woningmatches aan op wat voor jou relevant is."};
}

function App(){
 const [buyer,setBuyer]=useState(profiles.doorstromer.buyer);
 const [docs,setDocs]=useState(docRules(profiles.doorstromer.buyer));
 const [page,setPage]=useState("cockpit");
 const [wizard,setWizard]=useState(0);
 const [profileMenu,setProfileMenu]=useState(false);
 const [homeId,setHomeId]=useState("baarn");
 const [marketFilter,setMarketFilter]=useState("");
 const [checkInOpen,setCheckInOpen]=useState(false);
 const [checkInSeen,setCheckInSeen]=useState(false);
 const [assistOpen,setAssistOpen]=useState(false);
 const [mentorOpen,setMentorOpen]=useState(false);
 const docsForBuyer=useMemo(()=>mergeDocs(docs,buyer),[docs,buyer]);
 const s=useMemo(()=>calcScore(buyer,docsForBuyer),[buyer,docsForBuyer]);
 const allHomes=useMemo(()=>listings.map(h=>adjustListing(h,s,buyer)),[s,buyer]);
 const visibleHomes=useMemo(()=>filterListings(allHomes,buyer,s,marketFilter),[allHomes,buyer,s,marketFilter]);
 const selected=visibleHomes.find(h=>h.id===homeId)||visibleHomes[0]||allHomes.find(h=>h.status!=="buiten")||allHomes[0];
 function update(k,v){setBuyer(prev=>({...prev,[k]:v}))}
 function updateBuyer(next){setBuyer(next);setDocs(prev=>mergeDocs(prev,next))}
 function start(kind){const next=profiles[kind].buyer;setBuyer(next);setDocs(docRules(next));setMarketFilter("");setHomeId("baarn");setProfileMenu(false);setPage("profile");setWizard(0)}
 const journeyBase=[["Persoonlijk",s.personal,"profile"],[householdStepLabel(buyer),s.family,"profile"],["Werk",buyer.income?96:35,"profile"],["Financiën",s.financial,"profile"],["Documenten",s.docs,"documents"],["Adviesprofiel",s.advice,"advice"],["Marktinzicht",82,"market"],["Woningen",91,"matches"],["Paspoort",68,"share"]];
 const journey=buyer.type==="starter"?journeyBase:[["Persoonlijk",s.personal,"profile"],[householdStepLabel(buyer),s.family,"profile"],["Werk",buyer.income?96:35,"profile"],["Eigen woning",s.home,"home"],["Financiën",s.financial,"profile"],["Documenten",s.docs,"documents"],["Adviesprofiel",s.advice,"advice"],["Marktinzicht",82,"market"],["Woningen",91,"matches"],["Paspoort",68,"share"]];
 const navItems=[["cockpit",Compass,"Cockpit"],["profile",UserRound,"Gegevens"],["home",HousePlus,"Mijn woning"],["documents",UploadCloud,"Documenten"],["advice",ShieldAlert,"Adviesprofiel"],["market",BarChart3,"Marktinzicht"],["matches",Home,"Matches"],["coach",Bot,"Assistent"],["share",Share2,"Paspoort"],["agent",Building2,"Makelaar"]].filter(([id])=>buyer.type!=="starter"||id!=="home");
 const next=getGlobalNext(page,wizard,s,buyer);
 const proceedTo=(target=next)=>{setPage(target.page); if(target.page==="profile"&&typeof target.wizard==="number")setWizard(target.wizard)};
 const goNext=()=>{if(page==="profile"&&wizard===2&&!checkInSeen){setCheckInOpen(true);setCheckInSeen(true);return;}proceedTo(next)};
 const goSecondary=()=>{if(next.secondaryPage){setPage(next.secondaryPage);}}
 return <div className="app"><aside className="simpleSide"><div className="brand"><div className="mark">A</div><div><b>ATLAS</b><span>NEXT 3.6</span></div></div><div className="conciergeStart future compact"><span className="microLabel">Jouw situatie is het vertrekpunt</span><h3>Hallo {buyer.firstName || "Erik"},<br/>waar wil je duidelijkheid over?</h3><p>Kies wat nu het beste past. ATLAS begeleidt je rustig, discreet en zonder oordeel.</p></div><div className="routeCards compact"><button onClick={()=>start("doorstromer")} className={buyer.type==="doorstromer"?"routeCard active":"routeCard"}><HousePlus size={19}/><span><b>Nieuwe woonstap</b><small>Ik heb al een woning</small></span><ChevronRight size={17}/></button><button onClick={()=>start("starter")} className={buyer.type==="starter"?"routeCard active":"routeCard"}><UserRound size={19}/><span><b>Starter</b><small>Ik wil mijn eerste woning verkennen</small></span><ChevronRight size={17}/></button><button onClick={()=>start("zzp")} className={buyer.type==="zzp"?"routeCard active":"routeCard"}><BriefcaseBusiness size={19}/><span><b>Ondernemer / ZZP</b><small>Mijn inkomen vraagt extra bewijs</small></span><ChevronRight size={17}/></button><button onClick={()=>start("woonlasten")} className={buyer.type==="woonlasten"?"routeCard active sensitive":"routeCard sensitive"}><PieChart size={19}/><span><b>Rustig financieel overzicht</b><small>Discreet inzicht en meer rust</small></span><ChevronRight size={17}/></button></div><div className="sidePrivacy"><LockKeyhole size={17}/><p>Jij houdt regie over je gegevens. ATLAS deelt geen ruwe documenten met een makelaar zonder jouw toestemming.</p></div><button className="sideAssist" onClick={()=>setAssistOpen(true)}><Bot size={18}/><span><b>ATLAS Assistent</b><small>Ik help bij deze stap</small></span></button></aside><main><JourneyFlow page={page} wizard={wizard} setPage={setPage} setWizard={setWizard} s={s} buyer={buyer}/>{page==="cockpit"&&<Cockpit s={s} setPage={setPage} selected={selected} buyer={buyer}/>} {page==="profile"&&<Profile buyer={buyer} update={update} s={s} wizard={wizard} setWizard={setWizard} next={next} goNext={goNext} goSecondary={goSecondary}/>} {page==="home"&&<MyHome buyer={buyer} updateBuyer={updateBuyer} s={s} docs={docsForBuyer} setDocs={setDocs} next={next} goNext={goNext}/>} {page==="documents"&&<Documents docs={docsForBuyer} setDocs={setDocs} s={s} buyer={buyer} next={next} goNext={goNext}/>} {page==="advice"&&<Advice buyer={buyer} update={update} s={s} next={next} goNext={goNext}/>} {page==="market"&&<Market buyer={buyer} s={s} homes={allHomes} setPage={setPage} setHomeId={setHomeId} setMarketFilter={setMarketFilter} next={next} goNext={goNext}/>} {page==="matches"&&<Matches homes={visibleHomes} allHomes={allHomes} marketFilter={marketFilter} setMarketFilter={setMarketFilter} buyer={buyer} homeId={homeId} setHomeId={setHomeId} selected={selected} s={s} next={next} goNext={goNext}/>} {page==="coach"&&<Coach buyer={buyer} s={s} selected={selected} setPage={setPage} next={next} goNext={goNext}/>} {page==="share"&&<Share buyer={buyer} s={s} selected={selected} next={next} goNext={goNext}/>} {page==="agent"&&<AgentView buyer={buyer} s={s} selected={selected} next={next} goNext={goNext}/>}</main><div className="conciergeDock"><button className="mentorPulse" onClick={()=>setMentorOpen(!mentorOpen)}><HeartHandshake size={18}/><span>Begeleiding</span></button><button className="assistantFloat" onClick={()=>setAssistOpen(true)}><Bot size={20}/><span><b>ATLAS Assistent</b><small>Ik loop met je mee</small></span></button></div>{mentorOpen&&<MentorPanel buyer={buyer} page={page} setPage={setPage} onAssist={()=>setAssistOpen(true)} onClose={()=>setMentorOpen(false)}/>}{checkInOpen&&<CheckIn buyer={buyer} onContinue={()=>{setCheckInOpen(false);proceedTo(next)}} onAdjust={()=>{setCheckInOpen(false);setPage("profile");setWizard(Math.max(0,wizard-1))}} onAssist={()=>{setAssistOpen(true)}} onClose={()=>setCheckInOpen(false)}/>} {assistOpen&&<AtlasAssistant buyer={buyer} context={stepTitle(page,wizard,buyer)} onClose={()=>setAssistOpen(false)} onContinue={()=>{setAssistOpen(false);setCheckInOpen(false);proceedTo(next)}}/>}</div>
}

function Cockpit({s,setPage,selected,buyer}){
 const [query,setQuery]=useState("");
 const tone=routeHumanTone(buyer);
 const homeOptions=addressBook.map(a=>({label:a.address,sub:`${a.postcode} · ${a.city}`,type:"Adres",target:"market"}));
 const placeOptions=["Eemnes","Baarn","Bussum","Laren","Hilversum","Amersfoort"].map(p=>({label:p,sub:"Plaats of zoekgebied",type:"Plaats",target:"market"}));
 const listingOptions=listings.map(h=>({label:h.title,sub:`${h.city} · ${euro(h.price)}`,type:"Woning",target:"matches"}));
 const suggestions=query.length>=2?[...placeOptions,...homeOptions,...listingOptions].filter(x=>x.label.toLowerCase().includes(query.toLowerCase())||x.sub.toLowerCase().includes(query.toLowerCase())).slice(0,6):[];
 const selectSuggestion=(x)=>{setQuery(x.label);setPage(x.target)};
 const buttonText=query.length>=2?`Check koopkans in ${query}`:"Start met duidelijke route";
 return <section><div className="atlasHero futureHero"><div><span className="kicker">ATLAS — vijf jaar vooruit</span><h1>Jouw situatie is het vertrekpunt.</h1><p className="lead">ATLAS begeleidt je zonder oordeel naar eerlijke duidelijkheid: wat is haalbaar, wat ontbreekt nog en waar kun je met vertrouwen verder?</p><div className="toneCard"><HeartHandshake/><div><b>{tone.title}</b><span>{tone.text}</span></div></div><div className="heroSearchWrap"><div className="heroSearch"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Zoek plaats, buurt, postcode of woning"/><button onClick={()=>setPage(query.length>=2?"market":"profile")}>{buttonText}</button></div>{suggestions.length>0&&<div className="homeSuggest">{suggestions.map(x=><button key={x.type+x.label} onClick={()=>selectSuggestion(x)}><MapPin size={16}/><div><b>{x.label}</b><span>{x.type} · {x.sub}</span></div></button>)}</div>}</div><div className="heroModes"><span>Oordeelvrij</span><span>Discreet</span><span>Persoonlijk</span><span>Eerlijk haalbaar</span></div></div><div className="serviceOrb"><span>Persoonlijke route</span><strong>{s.atlas}</strong><Bar value={s.atlas}/><small>ATLAS score · Confidence {s.confidence}%</small><p>Niet om je te beoordelen, maar om je volgende stap zorgvuldig te bepalen.</p></div></div><div className="today"><Action title="Oordeelvrije route" points="Nieuw" text="ATLAS past taal, vragen en stappen aan jouw situatie aan." icon={<HeartHandshake/>}/><Action title="Privacy als luxe" points="Veilig" text="Jij bepaalt wat gedeeld wordt. De makelaar ziet geen privé-dossier." icon={<LockKeyhole/>}/><Action title="Eerlijke matches" points={`${selected.match}% match`} text={`${selected.title} in ${selected.city}`} icon={<Home/>}/></div></section>
}
function Action({title,points,text,icon}){return <article className="card">{icon}<Badge value={80}>{points}</Badge><h3>{title}</h3><p>{text}</p></article>}

function MentorPanel({buyer,page,setPage,onAssist,onClose}){
 const tone=routeHumanTone(buyer);
 const suggestions=[
  {label:"Waarom vraagt ATLAS dit?",target:page},
  {label:"Wat ziet de makelaar straks?",target:"share"},
  {label:"Controleer mijn documenten",target:"documents"},
  {label:"Laat alleen realistische woningen zien",target:"matches"}
 ];
 return <div className="mentorPanel"><button className="closeMini panelClose" onClick={onClose}>×</button><span className="microLabel">Persoonlijke begeleiding</span><h3>{tone.title}</h3><p>{tone.text}</p><div className="mentorLine"><ShieldCheck size={17}/><span>Oordeelvrij, discreet en eerlijk over haalbaarheid.</span></div><div className="mentorActions">{suggestions.map(s=><button key={s.label} onClick={()=>setPage(s.target)}>{s.label}<ChevronRight size={15}/></button>)}</div><button className="mentorPrimary" onClick={onAssist}><Bot size={17}/> Vraag de ATLAS Assistent</button></div>
}


function CheckIn({buyer,onContinue,onAdjust,onAssist,onClose}){
 const [why,setWhy]=useState(false);
 const sensitive=buyer.maritalStatus==="Weduwe/weduwnaar"||buyer.maritalStatus==="Gescheiden"||buyer.type==="woonlasten";
 return <div className="modalLayer"><div className="checkCard"><button className="closeMini" onClick={onClose}>×</button><span className="kicker">{sensitive?"Even rustig checken":"Even checken"}</span><h2>{sensitive?"We doen dit stap voor stap.":"Je bent goed bezig."}</h2><p>{sensitive?"Sommige vragen kunnen persoonlijk zijn. ATLAS blijft discreet, oordeelvrij en rustig — maar helpt je wel stap voor stap vooruit.":"Je hoeft niet alles perfect te weten. ATLAS helpt je met een eerste inschatting en maakt later duidelijk wat nog gecontroleerd moet worden."}</p>{why&&<div className="whyBox"><Info/><div><b>Waarom vraagt ATLAS dit?</b><p>Deze informatie helpt om je kooppositie betrouwbaarder te maken. Onzekere antwoorden markeren we als ‘nog te controleren’ en scherpen we later aan met documenten.</p></div></div>}<div className="checkActions"><button onClick={onContinue}>{sensitive?"Ga rustig verder":"Ga door naar de volgende stap"}<ChevronRight size={16}/></button><button className="secondary" onClick={onAssist}>Ik wil verder met extra ondersteuning</button><button className="soft" onClick={()=>setWhy(!why)}>Leg uit waarom dit nodig is</button><button className="soft" onClick={onAdjust}>Ik wil iets aanpassen</button></div></div></div>
}

function AtlasAssistant({buyer,context,onClose,onContinue}){
 const sensitive=buyer.maritalStatus==="Weduwe/weduwnaar"||buyer.maritalStatus==="Gescheiden"||buyer.type==="woonlasten";
 const bodyRef=useRef(null);
 const answers={
  "Ik weet niet wat ik moet invullen":"Dat is prima. Vul in wat je nu het beste weet. ATLAS markeert onzekerheden als ‘nog te controleren’ en helpt je later met documenten aanscherpen.",
  "Waarom is dit nodig?":"Omdat ATLAS jouw kooppositie betrouwbaar wil maken zonder dat een makelaar jouw privé-dossier hoeft te zien. We vragen alleen wat helpt voor overzicht, haalbaarheid en vertrouwen.",
  "Mijn situatie vraagt om discretie":"Dan behandelen we dit extra zorgvuldig. ATLAS stelt geen onnodige vragen en gebruikt rustige taal. Je situatie is niet het probleem; het is het vertrekpunt.",
  "Wat ziet de makelaar?":"De makelaar ziet alleen gecontroleerde status, kooppositie, biedklaarheid en aandachtspunten. Geen BSN, loonstroken, bankafschriften of ruwe documenten.",
  "Wat als iets niet haalbaar is?":"Dan zegt ATLAS dat eerlijk, maar zonder harde afwijzing. Je krijgt te zien wat wél realistisch is en wat nodig zou zijn om dichterbij te komen."
 };
 const [messages,setMessages]=useState([{from:"atlas",text:sensitive?"Ik ben er. We doen dit rustig en discreet. Geen oordeel, geen haast — wel een duidelijke volgende stap.":"Welkom. Ik blijf naast je tijdens deze stap. We houden het persoonlijk, rustig en eerlijk over wat haalbaar is."}]);
 useEffect(()=>{const el=bodyRef.current;if(el)el.scrollTo({top:el.scrollHeight,behavior:"smooth"});},[messages]);
 const add=(q)=>setMessages(m=>[...m,{from:"user",text:q},{from:"atlas",text:answers[q]}]);
 return <div className="modalLayer"><div className="assistantModal concierge refined"><div className="assistantHead"><div><span>ATLAS Assistent</span><h2>Je persoonlijke begeleider</h2><p>Context: {context==="Gezin"?"Leefsituatie":context}</p></div><button className="closeMini" onClick={onClose}>×</button></div><div ref={bodyRef} className="assistantBody refined">{messages.map((m,i)=><div key={i} className={"bubble "+m.from}>{m.text}</div>)}</div><div className="assistChoices refined">{Object.keys(answers).map(q=><button key={q} onClick={()=>add(q)}>{q}</button>)}</div><div className="assistFoot"><button onClick={onContinue}>Dank je, ga rustig verder<ChevronRight size={16}/></button><button className="secondary" onClick={onClose}>Sluit begeleider</button></div></div></div>
}

function AgentView({buyer,s,selected,next,goNext}){
 const ready=s.docs>=80&&s.confidence>=75;
 return <section><Header kicker="Makelaarview" title="Wat ziet de makelaar?" text="Deze weergave is bewust zakelijk en privacy-arm. De makelaar krijgt vertrouwen, geen privé-dossier."/><div className="agentGrid"><div className="agentPassport"><div className="agentHeader"><div><span>ATLAS koperprofiel</span><h2>{buyer.firstName} {buyer.lastName}</h2><p>{routeDisplay(buyer).title}</p></div><Badge value={s.confidence}>{ready?"Biedklaar":"Aandacht nodig"}</Badge></div><div className="agentScore"><strong>{s.confidence}%</strong><div><b>Confidence</b><Bar value={s.confidence}/><p>Gebaseerd op profiel, documenten, woonwensen en kooppositie.</p></div></div><div className="agentFacts"><Fact icon={<ShieldCheck/>} label="Identiteit" value="Geverifieerd"/><Fact icon={<FileText/>} label="Documenten" value={`${s.docs}% compleet`}/><Fact icon={<BarChart3/>} label="Indicatieve bandbreedte" value={short(s.budget)}/><Fact icon={<Home/>} label="Voorkeurswoning" value={selected.title}/></div></div><div className="agentSide"><h3>Waarom waardevol?</h3><p>De makelaar ziet sneller of een koper serieus, voorbereid en realistisch is. Dat bespaart tijd en voorkomt onnodige onzekerheid in het biedproces.</p><div className="privacySplit vertical"><div><b>Makelaar ziet</b><span>Status, koopkans, biedklaarheid, documentpercentages en aandachtspunten.</span></div><div><b>Makelaar ziet niet</b><span>BSN, loonstroken, bankafschriften, ruwe documenten en privé-details.</span></div></div><button onClick={goNext}>Terug naar Cockpit<ChevronRight size={16}/></button></div></div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}


function Profile({buyer,update,s,wizard,setWizard,next,goNext,goSecondary}){
 const tabs=["Persoonlijk",householdStepLabel(buyer),"Werk","Financiën","Woonwensen","Resultaat"];
 const showPension=s.age>=50||buyer.workStatus.includes("Pensioen")||buyer.workStatus.includes("Bijna");
 const strongPension=s.age>=57||buyer.workStatus.includes("Pensioen")||buyer.workStatus.includes("Bijna");
 const sensitiveLife=buyer.maritalStatus==="Weduwe/weduwnaar"||buyer.maritalStatus==="Gescheiden";
 return <section><Header kicker="ATLAS Kooproute" title="Maak je profiel rustig compleet." text="Je hoeft niet in een standaard hokje te passen. ATLAS vraagt alleen wat nodig is, legt uit waarom en scherpt je profiel later aan met documenten."/><div className="acceptanceBanner"><HeartHandshake/><div><b>{routeHumanTone(buyer).title}</b><p>{routeHumanTone(buyer).text}</p><small>Jij houdt regie over je gegevens. De makelaar ziet geen ruwe documenten zonder jouw toestemming.</small></div></div><div className="wizardTabs">{tabs.map((t,i)=><button key={t} onClick={()=>setWizard(i)} className={wizard===i?"active":""}>{i+1}. {t}</button>)}</div><div className="wizardGrid"><div className="panel formPanel">{wizard===0&&<><h3>Persoonlijke gegevens</h3><LifeNotice buyer={buyer}/><div className="two"><Field label="Voornaam" value={buyer.firstName} onChange={v=>update("firstName",v)}/><Field label="Achternaam" value={buyer.lastName} onChange={v=>update("lastName",v)}/></div><div className="two"><Field label="Geboortedatum" value={buyer.birthDate} onChange={v=>update("birthDate",v)}/><Field label="Leeftijd automatisch" value={s.age?`${s.age} jaar`:"Onbekend"} readOnly onChange={()=>{}}/></div>{showPension&&<div className={strongPension?"notice strong":"notice"}><Landmark/><div><b>{strongPension?"Pensioencheck actief":"Pensioen later relevant"}</b><p>ATLAS toont pensioen alleen wanneer leeftijd of werkstatus daar aanleiding toe geeft.</p></div></div>}<Choice label="Burgerlijke staat" value={buyer.maritalStatus} onChange={v=>{update("maritalStatus",v); if(v==="Weduwe/weduwnaar"||v==="Gescheiden"){update("partner",false);update("partnerName","");update("partnerBirthDate","");update("partnerIncome",0);}}} options={["Alleenstaand","Gehuwd","Geregistreerd partnerschap","Samenwonend","Gescheiden","Weduwe/weduwnaar"]}/><Choice label="Vermogensregeling" value={buyer.maritalProperty} onChange={v=>update("maritalProperty",v)} options={["Niet van toepassing","Gemeenschap van goederen","Beperkte gemeenschap","Huwelijkse voorwaarden"]} columns={2}/><Field label="Nationaliteit" value={buyer.nationality} onChange={v=>update("nationality",v)}/></>}
 {wizard===1&&<><h3>{householdStepLabel(buyer)}</h3><p className="stepIntro">{householdStepText(buyer)}</p>{sensitiveLife&&<div className="lifeNotice sensitive compact"><HeartHandshake/><div><b>We passen deze stap aan jouw situatie aan.</b><p>ATLAS vraagt hier niet naar een partner. We kijken alleen naar personen die financieel afhankelijk zijn en wat nodig is voor overzicht.</p></div></div>}<div className="toggleGrid">{!sensitiveLife&&<Toggle label={householdPartnerLabel(buyer)} checked={buyer.partner} onChange={v=>update("partner",v)}/>}<Toggle label={sensitiveLife?"Kinderen of financieel afhankelijk":"Kinderen"} checked={buyer.children} onChange={v=>{update("children",v);update("childCount",v?Math.max(1,cleanNumber(buyer.childCount)):0);if(!v)update("childAges","")}}/><Toggle label="Co-ouderschap" checked={buyer.coParenting} onChange={v=>update("coParenting",v)}/><Toggle label="Alimentatie" checked={buyer.alimony} onChange={v=>update("alimony",v)}/></div>{!sensitiveLife&&buyer.partner&&<div className="two"><Field label="Naam partner" value={buyer.partnerName} onChange={v=>update("partnerName",v)}/><Field label="Geboortedatum partner" value={buyer.partnerBirthDate} onChange={v=>update("partnerBirthDate",v)}/></div>}{buyer.children&&<div className="two"><Field label="Aantal kinderen / afhankelijken" type="number" min={0} value={buyer.childCount} onChange={v=>update("childCount",Math.max(0,cleanNumber(v)))}/><Field label="Leeftijden" value={buyer.childAges} onChange={v=>update("childAges",v)}/></div>}<Field label="Kinderopvang / zorgkosten p/m" prefix="€" type="number" min={0} value={buyer.childcare} onChange={v=>update("childcare",Math.max(0,cleanNumber(v)))}/>{sensitiveLife&&<div className="pensionBox"><h3>Aanvullende zekerheid</h3><p>Alleen invullen als dit relevant is voor jouw situatie.</p><Field label="Nabestaandenpensioen / uitkering p/j" prefix="€" type="number" value={buyer.pensionIncome} onChange={v=>update("pensionIncome",v)}/></div>}</>}
 {wizard===2&&<><h3>Werk, inkomen & pensioen</h3><Choice label="Werkstatus" value={buyer.workStatus} onChange={v=>update("workStatus",v)} options={["Vast contract","Tijdelijk contract","ZZP","DGA / eigen bedrijf","Bijna met pensioen","Pensioen","Uitzend / oproep","Anders"]}/><div className="two"><Field label="Werkgever" value={buyer.employer} onChange={v=>update("employer",v)}/><Field label="Functie" value={buyer.role} onChange={v=>update("role",v)}/></div><div className={sensitiveLife?"one":"two"}><Field label="Bruto jaarinkomen" prefix="€" type="number" value={buyer.income} onChange={v=>update("income",v)}/>{!sensitiveLife&&<Field label="Partnerinkomen" prefix="€" type="number" value={buyer.partnerIncome} onChange={v=>update("partnerIncome",v)}/>}</div><div className="toggleGrid"><Toggle label="Vakantiegeld" checked={buyer.holidayPay} onChange={v=>update("holidayPay",v)}/><Toggle label="13e maand" checked={buyer.thirteenthMonth} onChange={v=>update("thirteenthMonth",v)}/><Toggle label="Proeftijd" checked={buyer.probation} onChange={v=>update("probation",v)}/></div><Field label="Bonus p/j" prefix="€" type="number" value={buyer.bonus} onChange={v=>update("bonus",v)}/><button className="soft addLine" onClick={()=>update("extraIncomeOpen",!buyer.extraIncomeOpen)}><Plus size={16}/> Extra inkomen toevoegen</button>{buyer.extraIncomeOpen&&<div className="extraBox"><Choice label="Type extra inkomen" value={buyer.extraIncomeType} onChange={v=>update("extraIncomeType",v)} options={["Overuren","Onregelmatigheidstoeslag","Commissie","Tweede baan","ZZP naast loondienst"]} columns={2}/><Field label={`${buyer.extraIncomeType} p/j`} prefix="€" type="number" value={buyer.extraIncome} onChange={v=>update("extraIncome",v)}/></div>}{showPension&&<div className="pensionBox"><h3>Pensioencheck</h3><div className="two"><Field label="Pensioenleeftijd" type="number" value={buyer.pensionAge} onChange={v=>update("pensionAge",v)}/><Field label="Verwacht pensioeninkomen p/j" prefix="€" type="number" value={buyer.pensionIncome} onChange={v=>update("pensionIncome",v)}/></div><div className={sensitiveLife?"one":"two"}>{!sensitiveLife&&<Field label="Partnerpensioen p/j" prefix="€" type="number" value={buyer.partnerPension} onChange={v=>update("partnerPension",v)}/>}<Choice label="Daalt inkomen later?" value={buyer.pensionDrop} onChange={v=>update("pensionDrop",v)} options={["Ja","Nee","Onbekend"]} columns={3} small/></div></div>}</>}
 {wizard===3&&<><h3>Financiële situatie</h3><div className="two"><Field label="Spaargeld" prefix="€" type="number" value={buyer.cash} onChange={v=>update("cash",v)}/><Field label="Beleggingen" prefix="€" type="number" value={buyer.investments} onChange={v=>update("investments",v)}/></div><div className="two"><Field label="Crypto" prefix="€" type="number" value={buyer.crypto} onChange={v=>update("crypto",v)}/><Field label="Studieschuld" prefix="€" type="number" value={buyer.studyDebt} onChange={v=>update("studyDebt",v)}/></div><div className="two"><Field label="Persoonlijke lening" prefix="€" type="number" value={buyer.loans} onChange={v=>update("loans",v)}/><Field label="Private lease p/m" prefix="€" type="number" value={buyer.leaseMonthly} onChange={v=>update("leaseMonthly",v)}/></div><Field label="Creditcard schuld" prefix="€" type="number" value={buyer.creditcard} onChange={v=>update("creditcard",v)}/><Choice label="BKR-status" value={buyer.bkr} onChange={v=>update("bkr",v)} options={["Onbekend","Geen negatieve registratie","Positieve registratie","Negatieve registratie"]}/><a className="bkrBtn" href="https://www.bkr.nl/inloggen" target="_blank" rel="noreferrer"><ExternalLink size={17}/> Check BKR registratie</a><p className="small">Officiële controle buiten ATLAS. ATLAS bewaart alleen de status die jij invult of uploadt.</p></>}
 {wizard===4&&<Woonwensen buyer={buyer} update={update} s={s}/>}
 {wizard===5&&<><h3>{isVerifiedScore(s)?"Onderbouwd resultaat":"Voorlopige kooppositie"}</h3><div className={isVerifiedScore(s)?"resultStatus verified":"resultStatus provisional"}><ShieldCheck/><div><b>{isVerifiedScore(s)?"Score onderbouwd met documenten":"Nog geen definitieve ATLAS Score"}</b><p>{isVerifiedScore(s)?"Je documentstatus is voldoende om je kooppositie betrouwbaarder te tonen.":"Documenten beïnvloeden je bandbreedte, confidence en koopkans. ATLAS noemt dit daarom bewust voorlopig."}</p></div></div><div className="resultCards"><Metric label={isVerifiedScore(s)?"ATLAS Score":"Voorlopige positie"} value={s.atlas}/><Metric label="Koopruimte" value={short(s.budget)}/>{buyer.type!=="starter"&&<Metric label="Overwaarde" value={euro(s.equity)}/>}<Metric label="Documentstatus" value={s.docs+"%"}/></div><p>{isVerifiedScore(s)?"Volgende stap: bekijk je marktinzicht en woningmatches.":"Volgende stap: rond eerst je documenten af voordat ATLAS je profiel betrouwbaar noemt."}</p></>}
 <div className="wizardActions"><button className="secondary" disabled={wizard===0} onClick={()=>setWizard(Math.max(0,wizard-1))}>Terug</button>{wizard<5&&<button onClick={()=>setWizard(Math.min(tabs.length-1,wizard+1))}>Ga naar {tabs[Math.min(tabs.length-1,wizard+1)]}<ChevronRight size={16}/></button>}</div><NextStep title={next.title} text={next.text} primary={next.primary} secondary={next.secondary} onPrimary={goNext} onSecondary={goSecondary}/></div><LivePanel s={s} buyer={buyer}/></div></section>
}

function Woonwensen({buyer,update,s}){
 const comfortable=Math.max(0,Math.round(s.budget*.86));
 const max=Math.max(0,Math.round(s.budget));
 const strict=buyer.type==="woonlasten";
 const realistic=listings.map(h=>adjustListing(h,s,buyer)).filter(h=>h.status==="kansrijk").length*26+31;
 const strong=listings.map(h=>adjustListing(h,s,buyer)).filter(h=>h.status==="kansrijk"&&buyer.places.toLowerCase().includes(h.city.toLowerCase())).length*12+7;
 const useAtlasRange=()=>{update("minPrice",Math.max(0,Math.round(comfortable*.72)));update("maxPrice",max)};
 return <div><h3>Woonwensen</h3><div className="rangeCard36"><div className="rangeHeader36"><div><Sparkles/><span>ATLAS-bandbreedte</span></div><button onClick={useAtlasRange}>Gebruik bandbreedte</button></div><div className="rangeContent36"><div className="rangeValue36"><small>Comfortabel zoeken tot</small><strong>{euro(comfortable)}</strong></div><div className="rangeValue36"><small>Indicatieve bovengrens</small><strong>{euro(max)}</strong></div><div className="rangeCopy36"><p>{strict?"Alleen rustige, realistische opties binnen jouw profiel.":"Boven deze grens is vaak extra vermogen, zekerheid of documentcontrole nodig."}</p><em>Indicatief, geen hypotheekadvies.</em></div></div></div><div className="fundaSearch"><Search/><input value={buyer.places} onChange={e=>update("places",e.target.value)} placeholder="Plaats, buurt of postcode zoeken"/></div><div className="placeChips">{buyer.places.split(",").map(p=>p.trim()).filter(Boolean).map(p=><span key={p}>{p}</span>)}</div><div className="filterGrid"><Field label="Prijs van" prefix="€" type="number" min={0} value={buyer.minPrice} onChange={v=>update("minPrice",Math.max(0,cleanNumber(v)))}/><Field label="Prijs tot" prefix="€" type="number" min={0} value={buyer.maxPrice} onChange={v=>update("maxPrice",Math.max(0,cleanNumber(v)))}/><Field label="Zoekstraal km" type="number" min={0} value={buyer.radius} onChange={v=>update("radius",Math.max(0,cleanNumber(v)))}/><Field label="Kamers minimaal" type="number" min={0} value={buyer.rooms} onChange={v=>update("rooms",Math.max(0,cleanNumber(v)))}/></div><MultiChoice label="Welke woningtypes passen bij jou?" help="Meerdere keuzes mogelijk." value={buyer.homeType} onChange={v=>update("homeType",v)} options={["Appartement","Tussenwoning","Hoekwoning / gezinswoning","Twee-onder-een-kap","Vrijstaand","Nieuwbouw"]}/><Choice label="Energielabel" value={buyer.energy} onChange={v=>update("energy",v)} options={["Geen voorkeur","A of beter","B of beter","C of beter"]} columns={4} small/><div className="toggleGrid"><Toggle label="Tuin" checked={buyer.garden} onChange={v=>update("garden",v)}/><Toggle label="Garage" checked={buyer.garage} onChange={v=>update("garage",v)}/><Toggle label="Instapklaar" checked={buyer.moveInReady} onChange={v=>update("moveInReady",v)}/></div><div className="findBox"><b>ATLAS vindt nu</b><div><span>248</span> woningen</div><div><span>{realistic}</span> realistisch haalbaar</div><div><span>{strong}</span> sterke matches</div></div></div>
}

function LivePanel({s,buyer}){
 const verified=isVerifiedScore(s);
 return <aside className={verified?"livePanel verified":"livePanel provisional"}><h3>{verified?"Live effect":"Voorlopige positie"}</h3><strong>{s.atlas}</strong><Badge value={verified?s.atlas:52}>{verified?(s.atlas>=82?"Koopklaar":"Bijna koopklaar"):"Nog te controleren"}</Badge><Bar value={verified?s.atlas:Math.max(18,Math.min(62,s.docs))}/><Metric label={verified?"Indicatieve bandbreedte":"Voorlopige bandbreedte"} value={short(s.budget)}/><Metric label={verified?"Confidence":"Voorlopige confidence"} value={s.confidence+"%"}/>{buyer?.type!=="starter"&&<Metric label="Betrouwbaarheid woningwaarde" value={s.homeReliability+"%"}/>}<Metric label="Documentstatus" value={s.docs+"%"}/><div className="tip"><Bot size={18}/> {verified?"Score is onderbouwd met documenten.":"Documenten beïnvloeden je score, bandbreedte en koopkans. ATLAS noemt dit daarom nog voorlopig."}</div></aside>}

function MyHome({buyer,updateBuyer,s,docs,setDocs,next,goNext}){
 const[query,setQuery]=useState(buyer.address||"");
 const filtered=query.length>=2?addressBook.filter(x=>x.address.toLowerCase().includes(query.toLowerCase())||x.city.toLowerCase().includes(query.toLowerCase())).slice(0,5):[];
 function selectAddress(x){
  const next={...buyer,...x,saleStatus:buyer.saleStatus==="Geen huidige woning"?"Nog niet verkocht":buyer.saleStatus,mortgageLeft:buyer.mortgageLeft||0,sellingCosts:buyer.sellingCosts||21000};
  setQuery(x.address);
  updateBuyer(next);
 }
 function setSaleStatus(v){const next={...buyer,saleStatus:v}; if(v==="Geen huidige woning"){next.homeValue=0;next.woz=0;next.mortgageLeft=0;next.sellingCosts=0;next.address="";next.city="";next.postcode="";next.homeImage="";setQuery("")}updateBuyer(next)}
 const noHome=!hasCurrentHome(buyer);
 return <section><Header kicker="Mijn Woning Engine" title="Vul je huidige woning in." text="Adresselectie vult woningdata direct. Geen huidige woning betekent geen overwaarde."/><div className="homeEngine"><div className="panel"><h3>Adres & status</h3><label className="field"><span>Adres</span><div><input value={query} onChange={e=>{setQuery(e.target.value);updateBuyer({...buyer,address:e.target.value})}} placeholder="Typ bijvoorbeeld Roodzwenk of Kerkstraat"/></div></label>{filtered.length>0&&<div className="suggestions">{filtered.map(x=><button key={x.address} onClick={()=>selectAddress(x)}><MapPin size={16}/><span>{x.address}</span><small>{x.postcode} · {x.homeTypeCurrent} · label {x.energyLabel}</small></button>)}</div>}<Choice label="Verkoopstatus" value={buyer.saleStatus} onChange={setSaleStatus} options={["Geen huidige woning","Nog niet verkocht","Binnenkort te koop","Te koop","Onder bod","Verkocht"]}/><div className="mapDemo">{buyer.homeImage?<img src={buyer.homeImage}/>:<div><Search/><p>Typ adres voor kaart</p></div>}<div className="mapOverlay"><Navigation size={15}/> {buyer.address?`Google Maps demo · ${buyer.address} · ${buyer.postcode}`:"Google Maps demo · nog geen adres"}</div></div></div><div className="panel"><h3>Woningwaarde</h3><Field label="Geschatte woningwaarde" prefix="€" type="number" value={buyer.homeValue} onChange={v=>updateBuyer({...buyer,homeValue:v})}/><Field label="WOZ-waarde" prefix="€" type="number" value={buyer.woz} onChange={v=>updateBuyer({...buyer,woz:v})}/><Field label="Hypotheekrestant" prefix="€" type="number" value={buyer.mortgageLeft} onChange={v=>updateBuyer({...buyer,mortgageLeft:v})}/><Field label="Verkoopkosten" prefix="€" type="number" value={buyer.sellingCosts} onChange={v=>updateBuyer({...buyer,sellingCosts:v})}/></div><div className="valuation"><span>{noHome?"Starter / geen verkoopwoning":"Vrije overwaarde"}</span><strong className="money">{noHome?"€ 0":euro(s.equity)}</strong><small>{noHome?"Geen huidige woning telt mee.":"Verwacht inzetbaar: "+euro(s.usable)}</small><Metric label="Betrouwbaarheid woningwaarde" value={s.homeReliability+"%"}/><Metric label="Koopruimte met verkoop eerst" value={noHome?"Niet van toepassing":short(s.budget+45000)}/></div></div><div className="woningDocs"><h3>Woningdocumenten</h3><p>{buyer.type==="starter"?"Starter: geen huidige-woning-documenten nodig. Document Vault toont alleen relevante starterdocumenten.":"Deze documenten maken de overwaarde en woningwaarde betrouwbaarder."}</p></div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Documents({docs,setDocs,s,buyer,next,goNext}){
 function upload(id){setDocs(prev=>prev.map(d=>{if(d.id!==id)return d;if(d.required){const up=Math.min(d.required,(d.uploaded||0)+1);return{...d,uploaded:up,progress:Math.round(up/d.required*100),status:up===d.required?"verified":"review"}}return{...d,status:"verified",progress:100}}))}
 function review(id){setDocs(prev=>prev.map(d=>d.id===id?{...d,status:"review",progress:d.required?Math.max(d.progress,34):65}:d))}
 function remove(id){setDocs(prev=>prev.filter(d=>d.id!==id))}
 const missing=docs.filter(d=>d.progress<100);
 return <section><Header kicker="Document Vault" title="Veilig bewijs voor je kooppositie." text="ATLAS bepaalt per route welke documenten nodig zijn. De makelaar ziet standaard geen ruwe dossiers, alleen gecontroleerde status."/><div className="vaultTop"><div><h3>Je documentstatus is {s.docs}% compleet.</h3><p>{buyer.type==="starter"?"Starterprofiel: geen huidige woning documenten.":buyer.type==="woonlasten"?"Financiële-ruimte route: woningwaarde, hypotheek en maandlasten extra zorgvuldig in beeld.":buyer.type==="doorstromer"?"Nieuwe-woonstap profiel: huidige woning documenten actief.":"ZZP-profiel: jaarstukken en IB-aangiftes actief."}</p><p>Nog {missing.length} documenten tot een sterker ATLAS Paspoort.</p><Bar value={s.docs}/></div></div><div className="docGrid">{docs.map(d=><div className="doc" key={d.id}><div className={"statusIcon "+(d.status==="verified"?"ok":d.status==="review"?"wait":"miss")}>{d.status==="verified"?<CheckCircle2/>:d.status==="review"?<Clock3/>:<AlertTriangle/>}</div><div><b>{d.name}</b><small>{d.type} · {d.required?`${d.uploaded||0} van ${d.required} geüpload`:d.status==="verified"?"Geverifieerd":d.status==="review"?"AI controle bezig":"Ontbreekt"}</small><Bar value={d.progress}/></div><Badge value={d.progress}>{d.progress}%</Badge>{d.status==="verified"?<button className="soft"><Eye size={16}/> Bekijk</button>:<button onClick={()=>upload(d.id)}><UploadCloud size={16}/> Upload</button>}{d.status==="missing"&&<button className="soft" onClick={()=>review(d.id)}>AI check</button>}<button className="iconbtn light" onClick={()=>remove(d.id)}><Trash2 size={17}/></button></div>)}</div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Advice({buyer,update,s,next,goNext}){
 const [adviceStep,setAdviceStep]=useState(0);
 const steps=["Maandlast","Zekerheid","Risico’s","Samenvatting"];
 const pct=Math.round(((adviceStep+1)/steps.length)*100);
 const goLocalNext=()=>setAdviceStep(Math.min(steps.length-1,adviceStep+1));
 const goLocalBack=()=>setAdviceStep(Math.max(0,adviceStep-1));
 return <section><Header kicker="Adviesprofiel & Risico Engine" title="Wat voelt verstandig voor jou?" text="Rustiger opgebouwd. ATLAS vraagt stap voor stap naar maandlast, zekerheid en risico."/>
 <div className="adviceWizard">
  <div className="adviceStepHead"><div><span>Adviesprofiel</span><b>Stap {adviceStep+1} van {steps.length} — {steps[adviceStep]}</b></div><em>{pct}% compleet</em></div>
  <div className="adviceMiniBar"><i style={{width:pct+"%"}}/></div>
  <div className="adviceTabs">{steps.map((st,i)=><button key={st} onClick={()=>setAdviceStep(i)} className={i===adviceStep?"active":i<adviceStep?"done":""}>{i<adviceStep?"✓":i+1}. {st}</button>)}</div>
  <div className="adviceLayout">
   <div className="panel adviceMain">
    {adviceStep===0&&<><h3>Maandlast & comfort</h3><p>ATLAS kijkt niet alleen naar wat maximaal kan, maar ook naar wat veilig voelt.</p><Choice label="Aanleiding advies" value={buyer.adviceGoal} onChange={v=>update("adviceGoal",v)} options={["Aankoop eerste woning","Aankoop nieuwe woning","Verbouwing","Herfinanciering","Lagere maandlasten","Rustig financieel overzicht","Einde rentevaste periode","Einde relatie","Anders"]}/><div className="two"><Field label="Gewenste maximale maandlast" prefix="€" type="number" value={buyer.maxMonthly} onChange={v=>update("maxMonthly",v)}/><Field label="Huidige woonlast p/m" prefix="€" type="number" value={buyer.currentMonthly} onChange={v=>update("currentMonthly",v)}/></div><Field label="Ruimte over per maand" prefix="€" type="number" value={buyer.leftOverMonthly} onChange={v=>update("leftOverMonthly",v)}/></>}
    {adviceStep===1&&<><h3>Zekerheid & toekomst</h3><p>Hier bepaalt ATLAS wat belangrijker is: zekerheid, flexibiliteit, lage lasten of sneller aflossen.</p><Field label="Toekomstverwachtingen" value={buyer.futurePlans} onChange={v=>update("futurePlans",v)}/><Field label="Verwacht inkomen toekomst" value={buyer.expectedIncome} onChange={v=>update("expectedIncome",v)}/><Choice label="Rentevoorkeur" value={buyer.ratePreference} onChange={v=>update("ratePreference",v)} options={["Langere rentezekerheid","Korte rentevastperiode","Lage maandlast belangrijkst","Stabiele maandlast hele looptijd"]}/><Choice label="Risicohouding" value={buyer.riskProfile} onChange={v=>update("riskProfile",v)} options={["Zekerheid belangrijk","Balans tussen zekerheid en flexibiliteit","Lage maandlast belangrijker","Bereid meer risico te nemen"]}/></>}
    {adviceStep===2&&<><h3>Risico’s rustig doornemen</h3><p>Geen alarmtaal. Alleen helder krijgen wat er moet gebeuren als het leven verandert.</p><Choice label="Bij overlijden" value={buyer.deathScenario} onChange={v=>update("deathScenario",v)} options={["Maandlast moet betaalbaar blijven","Woning mag verkocht worden","Hypotheek deels aflossen","Nog onbekend"]}/><Choice label="Bij werkloosheid" value={buyer.unemploymentScenario} onChange={v=>update("unemploymentScenario",v)} options={["Buffer tijdelijk gebruiken","Partner kan meer werken","Aanvulling nodig","Risico accepteren"]}/><Choice label="Bij arbeidsongeschiktheid" value={buyer.disabilityScenario} onChange={v=>update("disabilityScenario",v)} options={["Aanvulling op inkomen nodig","Buffer tijdelijk gebruiken","Partner kan meer werken","Risico accepteren"]}/></>}
    {adviceStep===3&&<><h3>Samenvatting adviesprofiel</h3><div className="adviceCards"><Metric label="Gewenste maandlast" value={euro(buyer.maxMonthly)}/><Metric label="Risicohouding" value={buyer.riskProfile}/><Metric label="Rentevoorkeur" value={buyer.ratePreference}/><Metric label="Adviesprofiel" value={s.advice+"%"}/></div><div className="calmSummary"><ShieldAlert/><div><b>ATLAS gebruikt dit niet om harder te verkopen.</b><p>Dit profiel helpt bepalen of een woning niet alleen haalbaar is, maar ook past bij jouw gewenste zekerheid en maandlastcomfort.</p></div></div></>}
    <div className="adviceNav"><button className="secondary" disabled={adviceStep===0} onClick={goLocalBack}>Terug</button>{adviceStep<steps.length-1?<button onClick={goLocalNext}>Volgende: {steps[adviceStep+1]}<ChevronRight size={16}/></button>:<button onClick={goNext}>{next.primary}<ChevronRight size={16}/></button>}</div>
   </div>
   <aside className="adviceSide"><span>Live adviesprofiel</span><strong>{s.advice}%</strong><Bar value={s.advice}/><p>{buyer.riskProfile}. Maximale maandlast {euro(buyer.maxMonthly)}. ATLAS gebruikt dit straks bij woningmatches en koopkans.</p></aside>
  </div>
 </div>
 <NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Market({buyer,s,homes,setPage,setHomeId,setMarketFilter,next,goNext}){
 const rows=[
  {place:"Baarn",homes:64,realistic:33,top:12,marketMatch:76,tip:"Beste balans tussen prijs en kans"},
  {place:"Eemnes",homes:38,realistic:21,top:8,marketMatch:84,tip:"Sterk qua gezin, beperkt aanbod"},
  {place:"Bussum",homes:71,realistic:25,top:7,marketMatch:72,tip:"Goede reistijd, meer concurrentie"},
  {place:"Laren",homes:42,realistic:8,top:2,marketMatch:28,tip:"Dure markt; alleen tonen als jouw profiel het draagt"},
  {place:"Hilversum",homes:93,realistic:47,top:14,marketMatch:79,tip:"Veel alternatieven"}
 ];
 function rowStats(place){
  const inPlace=homes.filter(h=>h.city===place);
  const kans=inPlace.filter(h=>h.status==="kansrijk");
  const aandacht=inPlace.filter(h=>h.status==="aandacht");
  return {inPlace,kans,aandacht,hasPersonal:kans.length>0 || (buyer.type!=="woonlasten" && aandacht.length>0)};
 }
 function openPlace(place){
  const st=rowStats(place);
  if(!st.hasPersonal && buyer.type==="woonlasten")return;
  setMarketFilter(place);
  const first=st.kans[0]||st.aandacht[0]||st.inPlace[0];
  if(first)setHomeId(first.id);
  setPage("matches");
 }
 return <section><Header kicker="ATLAS Marktinzicht" title="Waar maak je echt kans?" text="ATLAS toont per gemeente een persoonlijke matchscore. 100% is een perfecte match; lagere scores laten rustig zien waar aandacht, beperking of extra bewijs nodig is."/><div className="marketHero"><div><h3>In jouw zoekgebied</h3><div className="marketNums"><Metric label="Actieve woningen" value="308"/><Metric label="Binnen jouw profiel" value={homes.filter(h=>h.status==="kansrijk").length}/><Metric label="Met aandacht" value={homes.filter(h=>h.status==="aandacht").length}/><Metric label="Buiten bereik" value={homes.filter(h=>h.status==="buiten").length}/></div></div><div className="insightCard"><Sparkles/><b>ATLAS advies</b><p>{buyer.type==="woonlasten"?"We tonen per gemeente alleen woningen die jouw profiel financieel kan dragen. Een lage matchscore betekent: niet pushen, maar rustiger alternatief zoeken.":"Kijk vooral naar gemeenten met een hoge ATLAS Match én genoeg haalbare woningen."}</p><button onClick={()=>setPage("matches")}>Bekijk matches</button></div></div><div className="matchLegend"><span><b>90–100%</b> sterke match</span><span><b>75–89%</b> kansrijk</span><span><b>60–74%</b> aandacht nodig</span><span><b>&lt;60%</b> niet als standaard match</span></div><div className="marketTable">{rows.map(r=>{const st=rowStats(r.place);const personal=st.kans.length;const disabled=!st.hasPersonal&&buyer.type==="woonlasten";const pct=disabled?Math.min(r.marketMatch,29):Math.max(r.marketMatch, personal?78:r.marketMatch);return <div className={disabled?"marketRow disabled":"marketRow"} key={r.place}><b>{r.place}</b><span>{r.homes} woningen</span><span>{personal} ATLAS kans</span><span>{st.aandacht.length} met aandacht</span><span className={pct>=80?"matchPercent strong":pct>=60?"matchPercent mid":"matchPercent low"}>{pct}% match</span><p>{disabled?"Binnen jouw huidige profiel toont ATLAS hier geen schijnkansen. Kies liever een rustiger alternatief.":r.tip}</p><button className="rowAction" disabled={disabled} onClick={()=>openPlace(r.place)}>{disabled?"Geen kansrijke match":"Bekijk woningen"}</button></div>})}</div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Matches({homes,allHomes,marketFilter,setMarketFilter,buyer,homeId,setHomeId,selected,s,next,goNext}){
 const [showOutside,setShowOutside]=useState(false);
 const outside=allHomes.filter(h=>(!marketFilter||h.city===marketFilter)&&h.status==="buiten");
 const title=marketFilter?`Woningmatches in ${marketFilter}`:"Welke woningen passen bij jouw kooppositie?";
 const intro=buyer.type==="woonlasten"?"ATLAS toont hier alleen woningen die financieel realistisch zijn binnen inkomen, vermogen en maandlastcomfort.":"ATLAS combineert woonwensen, bandbreedte, documenten en vertrouwen tot een persoonlijke koopkans.";
 const mainHomes=homes.filter(h=>h.status!=="buiten");
 const current=(selected&&selected.status!=="buiten"?selected:null)||mainHomes[0]||null;
 return <section><Header kicker="Woning Match" title={title} text={intro}/>{marketFilter&&<button className="soft clearFilter" onClick={()=>{setMarketFilter("");setHomeId((allHomes.find(h=>h.status!=="buiten")||allHomes[0]).id)}}>Toon breder zoekgebied</button>}<div className="matchGrid"><div className="cards">{mainHomes.length===0&&<div className="emptyState"><HeartHandshake/><b>Geen kansrijke woningen gevonden</b><p>Binnen je huidige profiel toont ATLAS hier geen schijnkansen. Dat is geen afwijzing; het helpt je juist om tijd, energie en teleurstelling te besparen. Verruim je gebied of vraag de Assistent om rustige alternatieven.</p></div>}{mainHomes.map(h=><button key={h.id} className={homeId===h.id?"matchCard active":"matchCard"} onClick={()=>setHomeId(h.id)}><img src={h.img}/><div><Badge value={h.status==="kansrijk"?86:64}>{h.statusLabel}</Badge><h3>{h.title}</h3><p>{h.city} · {euro(h.price)}</p><small>{h.match}% match · {h.confidence}% koopkans</small></div></button>)}{outside.length>0&&<div className="outsideBox"><button className="soft" onClick={()=>setShowOutside(!showOutside)}>{showOutside?"Verberg":"Toon"} buiten huidige kooppositie ({outside.length})</button>{showOutside&&outside.map(h=><div className="outsideHome" key={h.id}><img src={h.img}/><div><b>{h.title}</b><span>{h.city} · {euro(h.price)}</span><small>Niet passend bij je huidige ATLAS-profiel</small></div></div>)}</div>}</div>{current&&<div className="propertyDetail"><img src={current.img}/><div className="propertyBody"><Badge value={current.status==="kansrijk"?88:current.status==="aandacht"?64:38}>{current.status==="buiten"?"Buiten bereik":current.match+"% ATLAS Match"}</Badge><h2>{current.title}</h2><p><MapPin/> {current.city} · {current.rooms} kamers · {current.plot} · label {current.label}</p><div className="meters"><Metric label="Prijs" value={euro(current.price)}/><Metric label="Jouw bandbreedte" value={short(s.budget)}/><Metric label="Koopkans" value={current.status==="buiten"?"Niet tonen":`${current.confidence}%`}/><Metric label="Maandlast" value={euro(current.monthly)}/></div><div className={current.status==="buiten"?"why warning":"why"}><h3>{current.status==="buiten"?"Waarom niet als match?":"Waarom deze score?"}</h3>{current.status==="buiten"?<><p>✓ Buiten huidige kooppositie</p><p>✓ Maandlast ligt te hoog voor dit profiel</p><p>✓ Alleen zichtbaar als toelichting, niet als kansrijke woning</p></>:current.why.map(w=><p key={w}>✓ {w}</p>)}</div></div></div>}</div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Coach({s,selected,setPage,next,goNext}){
 const[messages,setMessages]=useState([{from:"atlas",text:"Waar wil je hulp bij? Kies een vraag of typ zelf iets."}]);
 const[input,setInput]=useState("");
 const answers={"Kan ik deze woning kopen?":`${selected.title} heeft nu ${selected.confidence}% koopkans. Je bandbreedte is ${short(s.budget)}.`, "Wat moet ik nu doen?":"Rond je dynamische Document Vault af, check BKR en bekijk Marktinzicht voor betere alternatieven.", "Waarom is mijn score zo?":`Je ATLAS Score is ${s.atlas}. Documentstatus ${s.docs}%, woningwaarde betrouwbaarheid ${s.homeReliability}% en adviesprofiel ${s.advice}% bepalen nu vooral je score.`, "Waar maak ik meer kans?":"Baarn en Hilversum geven nu de beste combinatie van haalbaarheid en aanbod. Bekijk Marktinzicht.", "Welke documenten ontbreken?":"De ontbrekende documenten hangen af van je type koper. Starter krijgt geen huidige-woning-documenten; nieuwe woonstap wel."};
 function ask(q){setMessages(m=>[...m,{from:"user",text:q},{from:"atlas",text:answers[q]||"Ik zou eerst je documenten, woningwaarde en marktfit afronden."}])}
 function send(){if(!input.trim())return;ask(input);setInput("")}
 return <section><Header kicker="ATLAS Koopcoach" title="Je persoonlijke koopcoach." text="Guided chat op basis van profiel, documenten, woningwaarde, adviesprofiel en marktinzicht."/><div className="chatShell"><div className="quick">{Object.keys(answers).map(q=><button key={q} onClick={()=>ask(q)}>{q}</button>)}</div><div className="chatBox">{messages.map((m,i)=><div key={i} className={"msg "+m.from}>{m.from==="atlas"&&<Bot size={18}/>}<p>{m.text}</p></div>)}</div><div className="chatActions"><button className="secondary" onClick={()=>setPage("documents")}>Ga naar documenten</button><button className="secondary" onClick={()=>setPage("market")}>Ga naar marktinzicht</button><button className="secondary" onClick={()=>setPage("matches")}>Bekijk matches</button></div><div className="chatInput"><input placeholder="Typ je vraag aan ATLAS..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/><button onClick={send}><Send size={17}/> Verstuur</button></div></div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Share({buyer,s,selected,next,goNext}){return <section><Header kicker="ATLAS Paspoort" title="Deel vertrouwen, niet je privé-dossier." text={isVerifiedScore(s)?"Privacy is geen bijzaak. ATLAS maakt jouw kooppositie deelbaar zonder dat ruwe documenten standaard bij een makelaar terechtkomen.":"Je paspoort blijft voorlopig totdat documenten voldoende zijn gecontroleerd. ATLAS deelt geen schijnzekerheid."}/><div className="trustExperience"><div><LockKeyhole/><h3>Jij houdt regie</h3><p>ATLAS laat vooraf zien wat gedeeld wordt, waarom dit relevant is en wat privé blijft.</p></div><div><ShieldCheck/><h3>De makelaar krijgt zekerheid</h3><p>Status, documentcontrole, kooppositie en biedklaarheid — zonder loonstroken of bankafschriften.</p></div><div><HeartHandshake/><h3>Oordeelvrij</h3><p>Ook bij complexe situaties blijft de taal rustig, discreet en menselijk.</p></div></div><div className="passportHero"><div className="passportCardPro"><div className="passportTop"><LockKeyhole/><span>Gedeeld profiel</span></div><h2>{buyer.firstName} {buyer.lastName}</h2><p>{routeDisplay(buyer).title} · laatst bijgewerkt vandaag</p><strong>{s.confidence}%</strong><Bar value={s.confidence}/><small>ATLAS Confidence</small></div><div className="passportNarrative"><h3>Wat betekent dit voor de makelaar?</h3><p>De koper is stap voor stap voorbereid. ATLAS toont welke onderdelen zijn aangeleverd, gecontroleerd of nog aandacht vragen.</p><div className="privacySplit"><div><b>Wel zichtbaar</b><span>Kooppositie, biedklaarheid, documentstatus, Confidence en aandachtspunten.</span></div><div><b>Niet zichtbaar</b><span>BSN, loonstroken, bankafschriften, ruwe documenten en onnodige inkomensdetails.</span></div></div></div></div><div className="shareGrid refined"><div className="shareFacts"><Fact icon={<ShieldCheck/>} label="Identiteit" value="Geverifieerd"/><Fact icon={<FileText/>} label="Documentstatus" value={`${s.docs}% compleet`}/>{buyer.type!=="starter"&&<Fact icon={<HousePlus/>} label="Overwaarde" value={euro(s.equity)}/>}<Fact icon={<ShieldAlert/>} label="Adviesprofiel" value={`${s.advice}% compleet`}/><Fact icon={<Home/>} label="Woningmatch" value={selected.title}/><Fact icon={<Send/>} label="Status" value={s.docs>=80?"Biedklaar":"Bijna biedklaar"}/></div><div className="humanCopy"><HeartHandshake/><h3>Menselijke uitleg</h3><p>ATLAS gebruikt financiële taal, maar blijft begrijpelijk. Bij gevoelige situaties wordt de route rustiger en worden pijnlijke of onnodige vragen vermeden.</p></div></div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>}

function Metric({label,value}){return <div className="metric"><span>{label}</span><b>{value}</b></div>}
function Fact({icon,label,value}){return <div className="fact">{icon}<span>{label}</span><b>{value}</b></div>}

createRoot(document.getElementById("root")).render(<App/>);
