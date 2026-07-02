
import React,{useMemo,useState}from"react";
import{createRoot}from"react-dom/client";
import{Home,HousePlus,Bot,Share2,Compass,FileText,ShieldCheck,Send,UploadCloud,UserRound,Plus,Trash2,LockKeyhole,CheckCircle2,AlertTriangle,Users,MapPin,ChevronRight,Search,Eye,Clock3,ExternalLink,Landmark,Navigation,MapPinned,ShieldAlert,TrendingUp,Building2,SlidersHorizontal,Sparkles,BriefcaseBusiness,WalletCards,BarChart3,Info,Euro,HeartHandshake}from"lucide-react";
import"./styles.css";

const addressBook=[
 {address:"Roodzwenk 50, Eemnes",city:"Eemnes",postcode:"3755 LG",homeValue:610000,woz:574000,lat:"52.2547",lng:"5.2641",energyLabel:"A",homeTypeCurrent:"Hoekwoning",buildYear:1998,homeImage:"https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80"},
 {address:"Roodzwenk 52, Eemnes",city:"Eemnes",postcode:"3755 LG",homeValue:618000,woz:580000,lat:"52.2549",lng:"5.2643",energyLabel:"A",homeTypeCurrent:"Gezinswoning",buildYear:1998,homeImage:"https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80"},
 {address:"Laarderweg 23, Eemnes",city:"Eemnes",postcode:"3755 AK",homeValue:642000,woz:596000,lat:"52.2534",lng:"5.2658",energyLabel:"B",homeTypeCurrent:"Tussenwoning",buildYear:1986,homeImage:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"},
 {address:"Kerkstraat 24, Baarn",city:"Baarn",postcode:"3741 AK",homeValue:742000,woz:684000,lat:"52.2113",lng:"5.2868",energyLabel:"A",homeTypeCurrent:"Vrijstaand",buildYear:1978,homeImage:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"},
 {address:"Brinklaan 88, Bussum",city:"Bussum",postcode:"1404 GL",homeValue:715000,woz:661000,lat:"52.2732",lng:"5.1625",energyLabel:"B",homeTypeCurrent:"Hoekwoning",buildYear:1932,homeImage:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"}
];

const listings=[
 {id:"baarn",title:"Nieuwbouw Baarn",city:"Baarn",price:515000,monthly:2260,baseMatch:94,baseChance:91,label:"A++",rooms:5,plot:"132 m²",img:"https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80",why:["Past ruim binnen bandbreedte","Lage energielasten","Sterke financieringskans"]},
 {id:"eemnes",title:"Gezinswoning Eemnes",city:"Eemnes",price:675000,monthly:2920,baseMatch:87,baseChance:83,label:"A",rooms:5,plot:"178 m²",img:"https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1600&q=80",why:["Overwaarde helpt sterk","Goede gezinsmatch","Overbrugging controleren"]},
 {id:"bussum",title:"Hoekwoning Bussum",city:"Bussum",price:725000,monthly:3180,baseMatch:76,baseChance:74,label:"B",rooms:6,plot:"201 m²",img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",why:["Financieel mogelijk onder voorwaarden","Lease verlaagt score","Werkgeversverklaring ontbreekt"]},
 {id:"laren",title:"Vrijstaand Laren",city:"Laren",price:925000,monthly:4050,baseMatch:48,baseChance:41,label:"A",rooms:7,plot:"421 m²",img:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",why:["Buiten huidige bandbreedte","Hoge maandlast","Meer eigen geld nodig"]}
];

const profiles={
 doorstromer:{
  label:"Doorstromer met woning",
  buyer:{type:"doorstromer",firstName:"Erik",lastName:"van Slooten",birthDate:"1982-04-12",nationality:"Nederlands",maritalStatus:"Gehuwd",maritalProperty:"Beperkte gemeenschap",partner:true,partnerName:"Partner",partnerBirthDate:"1984-08-10",children:true,childCount:2,childAges:"9, 11",coParenting:false,alimony:false,childcare:0,workStatus:"Vast contract",employer:"La Fourchette",role:"Chef-kok",income:72800,partnerIncome:57600,holidayPay:true,thirteenthMonth:true,bonus:3000,extraIncomeOpen:false,extraIncomeType:"Overuren",extraIncome:0,probation:false,pensionAge:67,pensionIncome:0,partnerPension:0,pensionDrop:"Onbekend",cash:85000,investments:12000,crypto:0,studyDebt:0,loans:25000,creditcard:0,leaseMonthly:550,bkr:"Positieve registratie",address:"Laarderweg 23, Eemnes",city:"Eemnes",postcode:"3755 AK",lat:"52.2534",lng:"5.2658",homeValue:642000,woz:596000,mortgageLeft:418000,sellingCosts:21000,saleStatus:"Nog niet verkocht",mortgageMonthly:1780,rate:3.8,energyLabel:"B",homeTypeCurrent:"Tussenwoning",buildYear:1986,homeImage:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",places:"Eemnes, Baarn, Bussum, Laren, Hilversum",radius:20,homeType:"Hoekwoning / gezinswoning",rooms:5,garden:true,garage:false,energy:"A of beter",minPrice:450000,maxPrice:750000,moveInReady:true,adviceGoal:"Aankoop nieuwe woning",maxMonthly:3000,currentMonthly:1780,leftOverMonthly:1500,riskProfile:"Zekerheid belangrijk",ratePreference:"Langere rentezekerheid",repaymentPreference:"Gelijkblijvende lasten",deathScenario:"Maandlast moet betaalbaar blijven",unemploymentScenario:"Buffer tijdelijk gebruiken",disabilityScenario:"Aanvulling op inkomen nodig",futurePlans:"Groter wonen met gezin, regio Eemnes/Baarn/Bussum",expectedIncome:"Stabiel"}
 },
 starter:{
  label:"Starter",
  buyer:{type:"starter",firstName:"Starter",lastName:"Demo",birthDate:"1992-01-01",nationality:"Nederlands",maritalStatus:"Alleenstaand",maritalProperty:"Niet van toepassing",partner:false,partnerName:"",partnerBirthDate:"",children:false,childCount:0,childAges:"",coParenting:false,alimony:false,childcare:0,workStatus:"Vast contract",employer:"",role:"",income:48000,partnerIncome:0,holidayPay:true,thirteenthMonth:false,bonus:0,extraIncomeOpen:false,extraIncomeType:"Tweede baan",extraIncome:0,probation:false,pensionAge:67,pensionIncome:0,partnerPension:0,pensionDrop:"Onbekend",cash:22000,investments:0,crypto:0,studyDebt:0,loans:0,creditcard:0,leaseMonthly:0,bkr:"Onbekend",address:"",city:"",postcode:"",lat:"",lng:"",homeValue:0,woz:0,mortgageLeft:0,sellingCosts:0,saleStatus:"Geen huidige woning",mortgageMonthly:0,rate:0,energyLabel:"",homeTypeCurrent:"",buildYear:"",homeImage:"",places:"Baarn, Hilversum, Amersfoort",radius:20,homeType:"Appartement",rooms:3,garden:false,garage:false,energy:"Geen voorkeur",minPrice:280000,maxPrice:450000,moveInReady:true,adviceGoal:"Aankoop eerste woning",maxMonthly:1800,currentMonthly:950,leftOverMonthly:800,riskProfile:"Zekerheid belangrijk",ratePreference:"Langere rentezekerheid",repaymentPreference:"Gelijkblijvende lasten",deathScenario:"Nog onbekend",unemploymentScenario:"Buffer tijdelijk gebruiken",disabilityScenario:"Aanvulling op inkomen nodig",futurePlans:"Eerste woning kopen",expectedIncome:"Stijgend"}
 },
 zzp:{
  label:"Ondernemer / ZZP",
  buyer:{type:"zzp",firstName:"ZZP",lastName:"Demo",birthDate:"1987-03-04",nationality:"Nederlands",maritalStatus:"Samenwonend",maritalProperty:"Niet van toepassing",partner:true,partnerName:"Partner",partnerBirthDate:"1988-05-01",children:false,childCount:0,childAges:"",coParenting:false,alimony:false,childcare:0,workStatus:"ZZP",employer:"Eigen onderneming",role:"Zelfstandig ondernemer",income:84000,partnerIncome:41000,holidayPay:false,thirteenthMonth:false,bonus:0,extraIncomeOpen:false,extraIncomeType:"Commissie",extraIncome:0,probation:false,pensionAge:67,pensionIncome:0,partnerPension:0,pensionDrop:"Onbekend",cash:65000,investments:25000,crypto:0,studyDebt:0,loans:0,creditcard:0,leaseMonthly:0,bkr:"Onbekend",address:"",city:"",postcode:"",lat:"",lng:"",homeValue:0,woz:0,mortgageLeft:0,sellingCosts:0,saleStatus:"Geen huidige woning",mortgageMonthly:0,rate:0,energyLabel:"",homeTypeCurrent:"",buildYear:"",homeImage:"",places:"Laren, Bussum, Hilversum",radius:25,homeType:"Hoekwoning / gezinswoning",rooms:4,garden:true,garage:false,energy:"B of beter",minPrice:500000,maxPrice:800000,moveInReady:true,adviceGoal:"Aankoop nieuwe woning",maxMonthly:3200,currentMonthly:1400,leftOverMonthly:2200,riskProfile:"Balans tussen zekerheid en flexibiliteit",ratePreference:"Langere rentezekerheid",repaymentPreference:"Gelijkblijvende lasten",deathScenario:"Maandlast moet betaalbaar blijven",unemploymentScenario:"Buffer tijdelijk gebruiken",disabilityScenario:"Buffer tijdelijk gebruiken",futurePlans:"Ruimer wonen en bedrijf verder uitbouwen",expectedIncome:"Mogelijk stijgend"}
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
 if(buyer.type==="doorstromer" && buyer.saleStatus!=="Geen huidige woning"){
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
function adjustListing(h,s,b){
 const placeBoost=(b.places||"").toLowerCase().includes(h.city.toLowerCase())?5:-3;
 const priceFit=h.price<=s.budget?8:-10;
 const wishFit=(b.homeType||"").toLowerCase().includes("hoek")&&h.title.toLowerCase().includes("hoek")?4:0;
 return{...h,match:clamp(h.baseMatch+(s.atlas-84)*.22+placeBoost+priceFit+wishFit),confidence:clamp(h.baseChance+(s.confidence-84)*.18+priceFit)}
}

function Badge({value,children}){return <span className={"badge "+level(value)}>{children}</span>}
function Bar({value}){return <div className="bar"><span className={level(value)} style={{width:clamp(value)+"%"}}/></div>}
function Header({kicker,title,text}){return <div className="header"><span>{kicker}</span><h2>{title}</h2><p>{text}</p></div>}
function Field({label,value,onChange,type="text",prefix,readOnly=false}){return <label className="field"><span>{label}</span><div>{prefix&&<small>{prefix}</small>}<input type={type} value={value} readOnly={readOnly} onChange={e=>onChange(type==="number"?Number(e.target.value):e.target.value)}/></div></label>}
function Choice({label,value,onChange,options,columns=2,small=false}){return <div className={small?"choiceWrap small":"choiceWrap"}><span>{label}</span><div className="choices" style={{gridTemplateColumns:`repeat(${columns},1fr)`}}>{options.map(o=><button key={o} className={value===o?"choice active":"choice"} onClick={()=>onChange(o)}>{value===o&&<CheckCircle2 size={16}/>}<b>{o}</b></button>)}</div></div>}
function Toggle({label,checked,onChange}){return <button className={checked?"toggle on":"toggle"} onClick={()=>onChange(!checked)}><span>{checked?<CheckCircle2 size={17}/>:<span className="dot"/>}</span>{label}</button>}



function routeForBuyer(buyer){
 const base=[
  {key:"profile-0",label:"Persoonlijk",page:"profile",wizard:0},
  {key:"profile-1",label:"Gezin",page:"profile",wizard:1},
  {key:"profile-2",label:"Werk & inkomen",page:"profile",wizard:2},
  {key:"profile-3",label:"Financiën",page:"profile",wizard:3},
  {key:"profile-4",label:"Woonwensen",page:"profile",wizard:4},
  {key:"profile-5",label:"Resultaat intake",page:"profile",wizard:5}
 ];
 if(buyer?.type!=="starter"){
  base.push({key:"home",label:"Mijn woning",page:"home"});
 }
 return base.concat([
  {key:"documents",label:"Document Vault",page:"documents"},
  {key:"advice",label:"Adviesprofiel",page:"advice"},
  {key:"market",label:"Marktinzicht",page:"market"},
  {key:"matches",label:"Woningmatches",page:"matches"},
  {key:"share",label:"ATLAS Paspoort",page:"share"}
 ]);
}
function getStepIndex(page,wizard,buyer){
 const steps=routeForBuyer(buyer);
 if(page==="profile"){
  return Math.max(0,Math.min(5,wizard));
 }
 const idx=steps.findIndex(s=>s.page===page);
 return idx>=0?idx:0;
}
function stepTitle(page,wizard,buyer){
 const steps=routeForBuyer(buyer);
 return steps[getStepIndex(page,wizard,buyer)]?.label||"ATLAS Kooproute";
}
function JourneyFlow({page,wizard,setPage,setWizard,s,buyer}){
 const steps=routeForBuyer(buyer);
 const idx=getStepIndex(page,wizard,buyer);
 const progress=Math.round(((idx+1)/steps.length)*100);
 return <div className="journeyFlow"><div className="journeyHead"><div><span>ATLAS Kooproute</span><b>Stap {idx+1} van {steps.length} — {steps[idx].label}</b></div><em>{progress}% naar biedklaar</em></div><div className="flowBar"><i style={{width:progress+"%"}}/></div><div className="flowDots">{steps.map((st,i)=><button key={st.key} title={st.label} onClick={()=>{setPage(st.page); if(st.page==="profile")setWizard(st.wizard)}} className={i<idx?"done":i===idx?"active":""}>{i<idx?"✓":i+1}<span>{st.label}</span></button>)}</div></div>
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
 return null;
}
function getGlobalNext(page,wizard,s,buyer){
 const steps=routeForBuyer(buyer);
 if(page==="profile"&&wizard<5){
  return {title:"Stap compleet",text:`Je bent bij stap ${wizard+1} van ${steps.length}. Ga door naar ${steps[wizard+1].label}.`,primary:`Ga naar ${steps[wizard+1].label}`,page:"profile",wizard:wizard+1};
 }
 if(page==="profile"&&wizard===5){
  if(s.docs<80)return {title:"Documentstatus is nog laag",text:"Rond eerst je Document Vault af voordat ATLAS je kooppositie betrouwbaar kan maken.",primary:"Ga naar Documenten",page:"documents"};
  if(buyer.type!=="starter"&&s.homeReliability<75)return {title:"Controleer je huidige woning",text:"Je hebt een doorstromersroute. Bevestig eerst je woningwaarde en overwaarde.",primary:"Check mijn woning",page:"home",secondary:"Bekijk Marktinzicht",secondaryPage:"market"};
  return {title:"Intake compleet",text:"Je gegevens staan klaar. Bekijk nu waar je op basis van je profiel de meeste koopkans hebt.",primary:"Bekijk Marktinzicht",page:"market"};
 }
 if(page==="home")return s.homeReliability<80&&buyer.type==="doorstromer"?{title:"Maak je woningwaarde betrouwbaarder",text:"Upload taxatie, energielabel en hypotheekoverzicht voor een sterkere overwaarde-score.",primary:"Ga naar Documenten",page:"documents"}:{title:"Woningcheck afgerond",text:"Gebruik deze woningdata nu om je documentstatus en koopkans te versterken.",primary:"Ga naar Documenten",page:"documents"};
 if(page==="documents")return s.docs<80?{title:"Rond ontbrekende documenten af",text:"Upload de openstaande documenten of start de AI-check.",primary:"Upload ontbrekende documenten",page:"documents"}:s.advice<80?{title:"Documenten compleet",text:"Vul nu je adviesprofiel aan zodat ATLAS niet alleen kan berekenen, maar ook kan beoordelen wat verstandig is.",primary:"Ga naar Adviesprofiel",page:"advice"}:{title:"Documenten compleet",text:"Bekijk nu waar je op basis van je profiel de meeste koopkans hebt.",primary:"Bekijk Marktinzicht",page:"market"};
 if(page==="advice")return s.docs<80?{title:"Adviesprofiel klaar",text:"Je risicoprofiel is bekend. Rond nu je documenten af.",primary:"Ga naar Documenten",page:"documents"}:{title:"Adviesprofiel klaar",text:"ATLAS weet nu beter wat voor jou belangrijk is. Bekijk je persoonlijke marktpositie.",primary:"Bekijk Marktinzicht",page:"market"};
 if(page==="market")return {title:"Marktinzicht bekeken",text:"Je ziet nu waar je meer kans maakt. Bekijk de woningen die ATLAS als kansrijk ziet.",primary:"Bekijk Woningmatches",page:"matches"};
 if(page==="matches")return {title:"Kies een kansrijke woning",text:"Gebruik de matchscore en koopkans om je ATLAS Paspoort makelaar-ready te maken.",primary:"Maak ATLAS Paspoort",page:"share"};
 if(page==="coach")return {title:"Coachadvies gebruiken",text:"Zet het advies om in actie via documenten, marktinzicht of woningmatches.",primary:"Bekijk Marktinzicht",page:"market",secondary:"Ga naar Documenten",secondaryPage:"documents"};
 if(page==="share")return {title:"Paspoort klaar voor makelaar",text:"Deel alleen vertrouwen, score en status. Geen BSN of ruwe documenten.",primary:"Deel met makelaar",page:"share"};
 return {title:"Ga verder in je kooproute",text:"ATLAS leidt je stap voor stap naar een biedklaar profiel.",primary:"Volgende stap",page:"profile",wizard:0};
}


function App(){
 const [buyer,setBuyer]=useState(profiles.doorstromer.buyer);
 const [docs,setDocs]=useState(docRules(profiles.doorstromer.buyer));
 const [page,setPage]=useState("cockpit");
 const [wizard,setWizard]=useState(0);
 const [profileMenu,setProfileMenu]=useState(false);
 const [homeId,setHomeId]=useState("baarn");
 const docsForBuyer=useMemo(()=>mergeDocs(docs,buyer),[docs,buyer]);
 const s=useMemo(()=>calcScore(buyer,docsForBuyer),[buyer,docsForBuyer]);
 const selected=adjustListing(listings.find(h=>h.id===homeId),s,buyer);
 function update(k,v){setBuyer(prev=>({...prev,[k]:v}))}
 function updateBuyer(next){setBuyer(next);setDocs(prev=>mergeDocs(prev,next))}
 function start(kind){const next=profiles[kind].buyer;setBuyer(next);setDocs(docRules(next));setProfileMenu(false);setPage("profile");setWizard(0)}
 const journeyBase=[["Persoonlijk",s.personal,"profile"],["Gezin",s.family,"profile"],["Werk",buyer.income?96:35,"profile"],["Financiën",s.financial,"profile"],["Documenten",s.docs,"documents"],["Adviesprofiel",s.advice,"advice"],["Marktinzicht",82,"market"],["Woningen",91,"matches"],["Paspoort",68,"share"]];
 const journey=buyer.type==="starter"?journeyBase:[["Persoonlijk",s.personal,"profile"],["Gezin",s.family,"profile"],["Werk",buyer.income?96:35,"profile"],["Eigen woning",s.home,"home"],["Financiën",s.financial,"profile"],["Documenten",s.docs,"documents"],["Adviesprofiel",s.advice,"advice"],["Marktinzicht",82,"market"],["Woningen",91,"matches"],["Paspoort",68,"share"]];
 const navItems=[["cockpit",Compass,"Cockpit"],["profile",UserRound,"Gegevens"],["home",HousePlus,"Mijn woning"],["documents",UploadCloud,"Documenten"],["advice",ShieldAlert,"Adviesprofiel"],["market",BarChart3,"Marktinzicht"],["matches",Home,"Matches"],["coach",Bot,"Koopcoach"],["share",Share2,"Delen"]].filter(([id])=>buyer.type!=="starter"||id!=="home");
 const next=getGlobalNext(page,wizard,s,buyer);
 const goNext=()=>{setPage(next.page); if(next.page==="profile"&&typeof next.wizard==="number")setWizard(next.wizard)};
 const goSecondary=()=>{if(next.secondaryPage){setPage(next.secondaryPage);}}
 return <div className="app"><aside><div className="brand"><div className="mark">A</div><div><b>ATLAS</b><span>NEXT 2.7</span></div></div><button className="newUser" onClick={()=>setProfileMenu(!profileMenu)}><Plus/> Nieuwe koper</button>{profileMenu&&<div className="newBox"><b>Start nieuw profiel</b>{Object.entries(profiles).map(([id,p])=><button key={id} onClick={()=>start(id)}>{p.label}</button>)}</div>}<div className="journey">{journey.map(([name,sc,target],i)=><button key={name} onClick={()=>{setPage(target); if(target==="profile"){const map={Persoonlijk:0,Gezin:1,Werk:2,Financiën:3};setWizard(map[name]??0)}}} className={page===target?"routebtn active":"routebtn"}><span className={sc>=80?"done":sc>=60?"busy":"todo"}>{sc>=80?"✓":i+1}</span><div><b>{name}</b><small>{sc}%</small></div></button>)}</div><nav>{navItems.map(([id,Icon,label])=><button key={id} onClick={()=>setPage(id)} className={page===id?"on":""}><Icon/> {label}</button>)}</nav></aside><main><JourneyFlow page={page} wizard={wizard} setPage={setPage} setWizard={setWizard} s={s} buyer={buyer}/>{page==="cockpit"&&<Cockpit s={s} setPage={setPage} selected={selected} buyer={buyer}/>} {page==="profile"&&<Profile buyer={buyer} update={update} s={s} wizard={wizard} setWizard={setWizard} next={next} goNext={goNext} goSecondary={goSecondary}/>} {page==="home"&&<MyHome buyer={buyer} updateBuyer={updateBuyer} s={s} docs={docsForBuyer} setDocs={setDocs} next={next} goNext={goNext}/>} {page==="documents"&&<Documents docs={docsForBuyer} setDocs={setDocs} s={s} buyer={buyer} next={next} goNext={goNext}/>} {page==="advice"&&<Advice buyer={buyer} update={update} s={s} next={next} goNext={goNext}/>} {page==="market"&&<Market buyer={buyer} s={s} setPage={setPage} next={next} goNext={goNext}/>} {page==="matches"&&<Matches homes={listings.map(h=>adjustListing(h,s,buyer))} homeId={homeId} setHomeId={setHomeId} selected={selected} s={s} next={next} goNext={goNext}/>} {page==="coach"&&<Coach buyer={buyer} s={s} selected={selected} setPage={setPage} next={next} goNext={goNext}/>} {page==="share"&&<Share buyer={buyer} s={s} selected={selected} next={next} goNext={goNext}/>}</main></div>
}

function Cockpit({s,setPage,selected,buyer}){return <section><div className="atlasHero"><div><span className="kicker">ATLAS Confidence Engine</span><h1>De koopkans-laag bovenop woningzoeken.</h1><p className="lead">Funda toont het aanbod. ATLAS laat zien waar jij realistisch, verstandig en makelaar-ready kunt kopen.</p><div className="heroSearch"><Search/><input placeholder="Check koopkans op plaats, buurt, postcode of woning"/><button onClick={()=>setPage("market")}>Start kooproute</button></div><div className="heroModes"><span>Kopen</span><span>Doorstromen</span><span>Starter</span><span>Nieuwbouw</span></div></div><div className="scoreOrb"><span>{buyer.firstName} is koopklaar</span><strong>{s.atlas}</strong><Bar value={s.atlas}/><small>Confidence: {s.confidence}%</small></div></div><div className="today"><Action title="Dynamische Document Vault" points={`${s.docs}% compleet`} text="Starter, doorstromer en ZZP krijgen automatisch andere documenten." icon={<FileText/>}/><Action title="Marktinzicht" points="Nieuw" text="Zie waar je in jouw regio de meeste koopkans hebt." icon={<BarChart3/>}/><Action title="Beste match vandaag" points={`${selected.match}% match`} text={`${selected.title} in ${selected.city}`} icon={<Home/>}/></div></section>}
function Action({title,points,text,icon}){return <article className="card">{icon}<Badge value={80}>{points}</Badge><h3>{title}</h3><p>{text}</p></article>}

function Profile({buyer,update,s,wizard,setWizard,next,goNext,goSecondary}){
 const tabs=["Persoonlijk","Gezin","Werk","Financiën","Woonwensen","Resultaat"];
 const showPension=s.age>=50||buyer.workStatus.includes("Pensioen")||buyer.workStatus.includes("Bijna");
 const strongPension=s.age>=57||buyer.workStatus.includes("Pensioen")||buyer.workStatus.includes("Bijna");
 return <section><Header kicker="Gegevens Wizard" title="Maak je ATLAS-profiel compleet." text="Professionele keuzevelden. Minder standaard browserbalkjes."/><div className="wizardTabs">{tabs.map((t,i)=><button key={t} onClick={()=>setWizard(i)} className={wizard===i?"active":""}>{i+1}. {t}</button>)}</div><div className="wizardGrid"><div className="panel formPanel">{wizard===0&&<><h3>Persoonlijke gegevens</h3><LifeNotice buyer={buyer}/><div className="two"><Field label="Voornaam" value={buyer.firstName} onChange={v=>update("firstName",v)}/><Field label="Achternaam" value={buyer.lastName} onChange={v=>update("lastName",v)}/></div><div className="two"><Field label="Geboortedatum" value={buyer.birthDate} onChange={v=>update("birthDate",v)}/><Field label="Leeftijd automatisch" value={s.age?`${s.age} jaar`:"Onbekend"} readOnly onChange={()=>{}}/></div>{showPension&&<div className={strongPension?"notice strong":"notice"}><Landmark/><div><b>{strongPension?"Pensioencheck actief":"Pensioen later relevant"}</b><p>ATLAS toont pensioen alleen wanneer leeftijd of werkstatus daar aanleiding toe geeft.</p></div></div>}<Choice label="Burgerlijke staat" value={buyer.maritalStatus} onChange={v=>update("maritalStatus",v)} options={["Alleenstaand","Gehuwd","Geregistreerd partnerschap","Samenwonend","Gescheiden","Weduwe/weduwnaar"]}/><Choice label="Vermogensregeling" value={buyer.maritalProperty} onChange={v=>update("maritalProperty",v)} options={["Niet van toepassing","Gemeenschap van goederen","Beperkte gemeenschap","Huwelijkse voorwaarden"]} columns={2}/><Field label="Nationaliteit" value={buyer.nationality} onChange={v=>update("nationality",v)}/></>}
 {wizard===1&&<><h3>Gezinssituatie</h3><div className="toggleGrid"><Toggle label="Partner aanwezig" checked={buyer.partner} onChange={v=>update("partner",v)}/><Toggle label="Kinderen" checked={buyer.children} onChange={v=>update("children",v)}/><Toggle label="Co-ouderschap" checked={buyer.coParenting} onChange={v=>update("coParenting",v)}/><Toggle label="Alimentatie" checked={buyer.alimony} onChange={v=>update("alimony",v)}/></div>{buyer.partner&&<div className="two"><Field label="Naam partner" value={buyer.partnerName} onChange={v=>update("partnerName",v)}/><Field label="Geboortedatum partner" value={buyer.partnerBirthDate} onChange={v=>update("partnerBirthDate",v)}/></div>}{buyer.children&&<div className="two"><Field label="Aantal kinderen" type="number" value={buyer.childCount} onChange={v=>update("childCount",v)}/><Field label="Leeftijden kinderen" value={buyer.childAges} onChange={v=>update("childAges",v)}/></div>}<Field label="Kinderopvang p/m" prefix="€" type="number" value={buyer.childcare} onChange={v=>update("childcare",v)}/></>}
 {wizard===2&&<><h3>Werk, inkomen & pensioen</h3><Choice label="Werkstatus" value={buyer.workStatus} onChange={v=>update("workStatus",v)} options={["Vast contract","Tijdelijk contract","ZZP","DGA / eigen bedrijf","Bijna met pensioen","Pensioen","Uitzend / oproep","Anders"]}/><div className="two"><Field label="Werkgever" value={buyer.employer} onChange={v=>update("employer",v)}/><Field label="Functie" value={buyer.role} onChange={v=>update("role",v)}/></div><div className="two"><Field label="Bruto jaarinkomen" prefix="€" type="number" value={buyer.income} onChange={v=>update("income",v)}/><Field label="Partnerinkomen" prefix="€" type="number" value={buyer.partnerIncome} onChange={v=>update("partnerIncome",v)}/></div><div className="toggleGrid"><Toggle label="Vakantiegeld" checked={buyer.holidayPay} onChange={v=>update("holidayPay",v)}/><Toggle label="13e maand" checked={buyer.thirteenthMonth} onChange={v=>update("thirteenthMonth",v)}/><Toggle label="Proeftijd" checked={buyer.probation} onChange={v=>update("probation",v)}/></div><Field label="Bonus p/j" prefix="€" type="number" value={buyer.bonus} onChange={v=>update("bonus",v)}/><button className="soft addLine" onClick={()=>update("extraIncomeOpen",!buyer.extraIncomeOpen)}><Plus size={16}/> Extra inkomen toevoegen</button>{buyer.extraIncomeOpen&&<div className="extraBox"><Choice label="Type extra inkomen" value={buyer.extraIncomeType} onChange={v=>update("extraIncomeType",v)} options={["Overuren","Onregelmatigheidstoeslag","Commissie","Tweede baan","ZZP naast loondienst"]} columns={2}/><Field label={`${buyer.extraIncomeType} p/j`} prefix="€" type="number" value={buyer.extraIncome} onChange={v=>update("extraIncome",v)}/></div>}{showPension&&<div className="pensionBox"><h3>Pensioencheck</h3><div className="two"><Field label="Pensioenleeftijd" type="number" value={buyer.pensionAge} onChange={v=>update("pensionAge",v)}/><Field label="Verwacht pensioeninkomen p/j" prefix="€" type="number" value={buyer.pensionIncome} onChange={v=>update("pensionIncome",v)}/></div><div className="two"><Field label="Partnerpensioen p/j" prefix="€" type="number" value={buyer.partnerPension} onChange={v=>update("partnerPension",v)}/><Choice label="Daalt inkomen na pensioen?" value={buyer.pensionDrop} onChange={v=>update("pensionDrop",v)} options={["Ja","Nee","Onbekend"]} columns={3} small/></div></div>}</>}
 {wizard===3&&<><h3>Financiële situatie</h3><div className="two"><Field label="Spaargeld" prefix="€" type="number" value={buyer.cash} onChange={v=>update("cash",v)}/><Field label="Beleggingen" prefix="€" type="number" value={buyer.investments} onChange={v=>update("investments",v)}/></div><div className="two"><Field label="Crypto" prefix="€" type="number" value={buyer.crypto} onChange={v=>update("crypto",v)}/><Field label="Studieschuld" prefix="€" type="number" value={buyer.studyDebt} onChange={v=>update("studyDebt",v)}/></div><div className="two"><Field label="Persoonlijke lening" prefix="€" type="number" value={buyer.loans} onChange={v=>update("loans",v)}/><Field label="Private lease p/m" prefix="€" type="number" value={buyer.leaseMonthly} onChange={v=>update("leaseMonthly",v)}/></div><Field label="Creditcard schuld" prefix="€" type="number" value={buyer.creditcard} onChange={v=>update("creditcard",v)}/><Choice label="BKR-status" value={buyer.bkr} onChange={v=>update("bkr",v)} options={["Onbekend","Geen negatieve registratie","Positieve registratie","Negatieve registratie"]}/><a className="bkrBtn" href="https://www.bkr.nl/inloggen" target="_blank" rel="noreferrer"><ExternalLink size={17}/> Check BKR registratie</a><p className="small">Officiële controle buiten ATLAS. ATLAS bewaart alleen de status die jij invult of uploadt.</p></>}
 {wizard===4&&<Woonwensen buyer={buyer} update={update} s={s}/>}
 {wizard===5&&<><h3>Resultaat intake</h3><div className="resultCards"><Metric label="ATLAS Score" value={s.atlas}/><Metric label="Koopruimte" value={short(s.budget)}/>{buyer.type!=="starter"&&<Metric label="Overwaarde" value={euro(s.equity)}/>}<Metric label="Documentstatus" value={s.docs+"%"}/></div><p>Volgende stap: rond de dynamische documenten af en bekijk je marktinzicht.</p></>}
 <div className="wizardActions"><button className="secondary" disabled={wizard===0} onClick={()=>setWizard(Math.max(0,wizard-1))}>Terug</button>{wizard<5&&<button onClick={()=>setWizard(Math.min(tabs.length-1,wizard+1))}>Ga naar {tabs[Math.min(tabs.length-1,wizard+1)]}<ChevronRight size={16}/></button>}</div><NextStep title={next.title} text={next.text} primary={next.primary} secondary={next.secondary} onPrimary={goNext} onSecondary={goSecondary}/></div><LivePanel s={s} buyer={buyer}/></div></section>
}

function Woonwensen({buyer,update,s}){
 const realistic=listings.filter(h=>h.price<=s.budget).length*42+57;
 const strong=listings.filter(h=>h.price<=s.budget&&buyer.places.toLowerCase().includes(h.city.toLowerCase())).length*13+11;
 return <div><h3>Woonwensen</h3><div className="fundaSearch"><Search/><input value={buyer.places} onChange={e=>update("places",e.target.value)} placeholder="Plaats, buurt of postcode zoeken"/></div><div className="placeChips">{buyer.places.split(",").map(p=>p.trim()).filter(Boolean).map(p=><span key={p}>{p}</span>)}</div><div className="filterGrid"><Field label="Prijs van" prefix="€" type="number" value={buyer.minPrice} onChange={v=>update("minPrice",v)}/><Field label="Prijs tot" prefix="€" type="number" value={buyer.maxPrice} onChange={v=>update("maxPrice",v)}/><Field label="Zoekstraal km" type="number" value={buyer.radius} onChange={v=>update("radius",v)}/><Field label="Kamers minimaal" type="number" value={buyer.rooms} onChange={v=>update("rooms",v)}/></div><Choice label="Woningtype" value={buyer.homeType} onChange={v=>update("homeType",v)} options={["Appartement","Tussenwoning","Hoekwoning / gezinswoning","Twee-onder-een-kap","Vrijstaand","Nieuwbouw"]}/><Choice label="Energielabel" value={buyer.energy} onChange={v=>update("energy",v)} options={["Geen voorkeur","A of beter","B of beter","C of beter"]} columns={4} small/><div className="toggleGrid"><Toggle label="Tuin" checked={buyer.garden} onChange={v=>update("garden",v)}/><Toggle label="Garage" checked={buyer.garage} onChange={v=>update("garage",v)}/><Toggle label="Instapklaar" checked={buyer.moveInReady} onChange={v=>update("moveInReady",v)}/></div><div className="findBox"><b>ATLAS vindt nu</b><div><span>248</span> woningen</div><div><span>{realistic}</span> realistisch haalbaar</div><div><span>{strong}</span> sterke matches</div></div></div>
}

function LivePanel({s,buyer}){return <aside className="livePanel"><h3>Live effect</h3><strong>{s.atlas}</strong><Badge value={s.atlas}>{s.atlas>=82?"Koopklaar":"Bijna koopklaar"}</Badge><Bar value={s.atlas}/><Metric label="Indicatieve bandbreedte" value={short(s.budget)}/><Metric label="Confidence" value={s.confidence+"%"}/>{buyer?.type!=="starter"&&<Metric label="Betrouwbaarheid woningwaarde" value={s.homeReliability+"%"}/>}<Metric label="Documentstatus" value={s.docs+"%"}/><div className="tip"><Bot size={18}/> {buyer?.type==="starter"?"Starterroute actief: geen overwaarde-route. Focus op inkomen, documenten en koopkans.":"Nog nodig: documenten, BKR-check en marktfit."}</div></aside>}

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
 return <section><Header kicker="Document Vault" title="Dynamische checklist per koper." text="Starter, doorstromer, pensioen en ZZP krijgen automatisch andere documenten."/><div className="vaultTop"><div><h3>Je documentstatus is {s.docs}% compleet.</h3><p>{buyer.type==="starter"?"Starterprofiel: geen huidige woning documenten.":buyer.type==="doorstromer"?"Doorstromerprofiel: huidige woning documenten actief.":"ZZP-profiel: jaarstukken en IB-aangiftes actief."}</p><p>Nog {missing.length} documenten tot een sterker ATLAS Paspoort.</p><Bar value={s.docs}/></div></div><div className="docGrid">{docs.map(d=><div className="doc" key={d.id}><div className={"statusIcon "+(d.status==="verified"?"ok":d.status==="review"?"wait":"miss")}>{d.status==="verified"?<CheckCircle2/>:d.status==="review"?<Clock3/>:<AlertTriangle/>}</div><div><b>{d.name}</b><small>{d.type} · {d.required?`${d.uploaded||0} van ${d.required} geüpload`:d.status==="verified"?"Geverifieerd":d.status==="review"?"AI controle bezig":"Ontbreekt"}</small><Bar value={d.progress}/></div><Badge value={d.progress}>{d.progress}%</Badge>{d.status==="verified"?<button className="soft"><Eye size={16}/> Bekijk</button>:<button onClick={()=>upload(d.id)}><UploadCloud size={16}/> Upload</button>}{d.status==="missing"&&<button className="soft" onClick={()=>review(d.id)}>AI check</button>}<button className="iconbtn light" onClick={()=>remove(d.id)}><Trash2 size={17}/></button></div>)}</div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Advice({buyer,update,s,next,goNext}){return <section><Header kicker="Adviesprofiel & Risico Engine" title="Niet alleen kunnen kopen, maar verstandig kopen." text="Gebaseerd op de klantprofielvragen uit het hypotheekgesprek."/><div className="adviceGrid"><div className="panel"><h3>Koopdoel & maandlast</h3><Choice label="Aanleiding advies" value={buyer.adviceGoal} onChange={v=>update("adviceGoal",v)} options={["Aankoop eerste woning","Aankoop nieuwe woning","Verbouwing","Herfinanciering","Lagere maandlasten","Einde rentevaste periode","Einde relatie","Anders"]}/><Field label="Gewenste maximale maandlast" prefix="€" type="number" value={buyer.maxMonthly} onChange={v=>update("maxMonthly",v)}/><Field label="Huidige woonlast p/m" prefix="€" type="number" value={buyer.currentMonthly} onChange={v=>update("currentMonthly",v)}/><Field label="Over per maand" prefix="€" type="number" value={buyer.leftOverMonthly} onChange={v=>update("leftOverMonthly",v)}/></div><div className="panel"><h3>Toekomst & zekerheid</h3><Field label="Toekomstverwachtingen" value={buyer.futurePlans} onChange={v=>update("futurePlans",v)}/><Field label="Verwacht inkomen toekomst" value={buyer.expectedIncome} onChange={v=>update("expectedIncome",v)}/><Choice label="Rentevoorkeur" value={buyer.ratePreference} onChange={v=>update("ratePreference",v)} options={["Langere rentezekerheid","Korte rentevastperiode","Lage maandlast belangrijkst","Stabiele maandlast hele looptijd"]}/><Choice label="Risicohouding" value={buyer.riskProfile} onChange={v=>update("riskProfile",v)} options={["Zekerheid belangrijk","Balans tussen zekerheid en flexibiliteit","Lage maandlast belangrijker","Bereid meer risico te nemen"]}/></div><div className="panel"><h3>Risico’s</h3><Choice label="Bij overlijden" value={buyer.deathScenario} onChange={v=>update("deathScenario",v)} options={["Maandlast moet betaalbaar blijven","Woning mag verkocht worden","Hypotheek deels aflossen","Nog onbekend"]}/><Choice label="Bij werkloosheid" value={buyer.unemploymentScenario} onChange={v=>update("unemploymentScenario",v)} options={["Buffer tijdelijk gebruiken","Partner kan meer werken","Aanvulling nodig","Risico accepteren"]}/><Choice label="Bij arbeidsongeschiktheid" value={buyer.disabilityScenario} onChange={v=>update("disabilityScenario",v)} options={["Aanvulling op inkomen nodig","Buffer tijdelijk gebruiken","Partner kan meer werken","Risico accepteren"]}/><div className="riskScore"><ShieldAlert/><div><span>Adviesprofiel</span><strong>{s.advice}%</strong><Bar value={s.advice}/></div></div></div></div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>}

function Market({buyer,s,setPage,next,goNext}){
 const rows=[
  {place:"Baarn",homes:64,realistic:33,top:12,pressure:"Gemiddeld",tip:"Beste balans tussen prijs en kans"},
  {place:"Eemnes",homes:38,realistic:21,top:8,pressure:"Hoog",tip:"Sterk qua gezin, beperkt aanbod"},
  {place:"Bussum",homes:71,realistic:25,top:7,pressure:"Hoog",tip:"Goede reistijd, meer concurrentie"},
  {place:"Laren",homes:42,realistic:8,top:2,pressure:"Zeer hoog",tip:"Alleen selectief bieden"},
  {place:"Hilversum",homes:93,realistic:47,top:14,pressure:"Gemiddeld",tip:"Veel alternatieven"}
 ];
 return <section><Header kicker="ATLAS Marktinzicht" title="Waar maak je echt kans?" text="Persoonlijke marktlaag bovenop woningzoeken: aanbod, haalbaarheid en alternatieven."/><div className="marketHero"><div><h3>In jouw zoekgebied</h3><div className="marketNums"><Metric label="Actieve woningen" value="308"/><Metric label="Haalbaar binnen bandbreedte" value="134"/><Metric label="Sterke matches" value="43"/><Metric label="Topkansen" value="14"/></div></div><div className="insightCard"><Sparkles/><b>ATLAS advies</b><p>Baarn en Hilversum geven nu de beste combinatie van koopkans en maandlast. Laren is minder logisch binnen je huidige bandbreedte.</p><button onClick={()=>setPage("matches")}>Bekijk matches</button></div></div><div className="marketTable">{rows.map(r=><div className="marketRow" key={r.place}><b>{r.place}</b><span>{r.homes} woningen</span><span>{r.realistic} haalbaar</span><span>{r.top} topkansen</span><Badge value={r.pressure==="Gemiddeld"?82:r.pressure==="Hoog"?67:45}>{r.pressure}</Badge><p>{r.tip}</p></div>)}</div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Matches({homes,homeId,setHomeId,selected,s,next,goNext}){return <section><Header kicker="Woning Match" title="Funda toont huizen. ATLAS toont welke huizen slim zijn." text="Matches reageren op woonwensen, bandbreedte en ATLAS Confidence."/><div className="matchGrid"><div className="cards">{homes.map(h=><button key={h.id} className={homeId===h.id?"matchCard active":"matchCard"} onClick={()=>setHomeId(h.id)}><img src={h.img}/><div><Badge value={h.match}>{h.match}% match</Badge><h3>{h.title}</h3><p>{h.city} · {euro(h.price)}</p></div></button>)}</div><div className="propertyDetail"><img src={selected.img}/><div className="propertyBody"><Badge value={selected.match}>{selected.match}% ATLAS Match</Badge><h2>{selected.title}</h2><p><MapPin/> {selected.city} · {selected.rooms} kamers · {selected.plot} · label {selected.label}</p><div className="meters"><Metric label="Prijs" value={euro(selected.price)}/><Metric label="Jouw bandbreedte" value={short(s.budget)}/><Metric label="Koopkans" value={`${selected.confidence}%`}/><Metric label="Maandlast" value={euro(selected.monthly)}/></div><div className="why"><h3>Waarom deze score?</h3>{selected.why.map(w=><p key={w}>✓ {w}</p>)}</div></div></div></div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>}

function Coach({s,selected,setPage,next,goNext}){
 const[messages,setMessages]=useState([{from:"atlas",text:"Waar wil je hulp bij? Kies een vraag of typ zelf iets."}]);
 const[input,setInput]=useState("");
 const answers={"Kan ik deze woning kopen?":`${selected.title} heeft nu ${selected.confidence}% koopkans. Je bandbreedte is ${short(s.budget)}.`, "Wat moet ik nu doen?":"Rond je dynamische Document Vault af, check BKR en bekijk Marktinzicht voor betere alternatieven.", "Waarom is mijn score zo?":`Je ATLAS Score is ${s.atlas}. Documentstatus ${s.docs}%, woningwaarde betrouwbaarheid ${s.homeReliability}% en adviesprofiel ${s.advice}% bepalen nu vooral je score.`, "Waar maak ik meer kans?":"Baarn en Hilversum geven nu de beste combinatie van haalbaarheid en aanbod. Bekijk Marktinzicht.", "Welke documenten ontbreken?":"De ontbrekende documenten hangen af van je type koper. Starter krijgt geen huidige-woning-documenten; doorstromer wel."};
 function ask(q){setMessages(m=>[...m,{from:"user",text:q},{from:"atlas",text:answers[q]||"Ik zou eerst je documenten, woningwaarde en marktfit afronden."}])}
 function send(){if(!input.trim())return;ask(input);setInput("")}
 return <section><Header kicker="ATLAS Koopcoach" title="Je persoonlijke koopcoach." text="Guided chat op basis van profiel, documenten, woningwaarde, adviesprofiel en marktinzicht."/><div className="chatShell"><div className="quick">{Object.keys(answers).map(q=><button key={q} onClick={()=>ask(q)}>{q}</button>)}</div><div className="chatBox">{messages.map((m,i)=><div key={i} className={"msg "+m.from}>{m.from==="atlas"&&<Bot size={18}/>}<p>{m.text}</p></div>)}</div><div className="chatActions"><button className="secondary" onClick={()=>setPage("documents")}>Ga naar documenten</button><button className="secondary" onClick={()=>setPage("market")}>Ga naar marktinzicht</button><button className="secondary" onClick={()=>setPage("matches")}>Bekijk matches</button></div><div className="chatInput"><input placeholder="Typ je vraag aan ATLAS..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/><button onClick={send}><Send size={17}/> Verstuur</button></div></div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>
}

function Share({buyer,s,selected,next,goNext}){return <section><Header kicker="Deel mijn ATLAS" title="Live paspoort voor de makelaar." text="Geen BSN. Geen loonstroken. Wel vertrouwen."/><div className="shareGrid"><div className="livePassport"><LockKeyhole/><h2>ATLAS Passport</h2><p>{buyer.firstName} {buyer.lastName}</p><strong>{s.confidence}</strong><Badge value={s.confidence}>Confidence</Badge></div><div className="shareFacts"><Fact icon={<ShieldCheck/>} label="Identiteit" value="Geverifieerd"/><Fact icon={<FileText/>} label="Documenten" value={`${s.docs}% compleet`}/><Fact icon={<HousePlus/>} label="Overwaarde" value={euro(s.equity)}/><Fact icon={<ShieldAlert/>} label="Adviesprofiel" value={`${s.advice}% compleet`}/><Fact icon={<Home/>} label="Woning" value={selected.title}/><Fact icon={<Send/>} label="Advies" value="Plan bezichtiging"/></div></div><NextStep title={next.title} text={next.text} primary={next.primary} onPrimary={goNext}/></section>}
function Metric({label,value}){return <div className="metric"><span>{label}</span><b>{value}</b></div>}
function Fact({icon,label,value}){return <div className="fact">{icon}<span>{label}</span><b>{value}</b></div>}

createRoot(document.getElementById("root")).render(<App/>);
