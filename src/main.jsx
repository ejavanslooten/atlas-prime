
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ShieldCheck, Home, Building2, LockKeyhole, UserRound, Radar, ArrowRight,
  TrendingUp, Wallet, FileCheck2, Gauge, Sparkles, SlidersHorizontal, Send,
  KeyRound, BadgeCheck, AlertTriangle, CheckCircle2, ClipboardCheck, Target,
  Eye, Unlock, Clock3, MailCheck, Landmark, ScanSearch, FileText
} from 'lucide-react';
import './styles.css';

const starterProfiles = [
  {
    id: 'erik',
    name: 'Erik-profiel',
    short: 'EV',
    label: 'Sterk profiel met verplichtingen',
    income: 72800,
    partnerIncome: 57600,
    cash: 85000,
    studyDebt: 0,
    loans: 25000,
    leaseMonthly: 550,
    bkr: 'none',
    docs: 82,
    bonus: 3000,
    adviseurCheck: 65,
    proofOfFunds: 82,
    responseSpeed: 78,
    situation: 'Samen kopend'
  },
  {
    id: 'starter',
    name: 'Starter met studieschuld',
    short: 'SV',
    label: 'Onder voorwaarden',
    income: 52000,
    partnerIncome: 0,
    cash: 18000,
    studyDebt: 38000,
    loans: 0,
    leaseMonthly: 0,
    bkr: 'none',
    docs: 58,
    bonus: 0,
    adviseurCheck: 20,
    proofOfFunds: 45,
    responseSpeed: 62,
    situation: 'Alleen kopend'
  },
  {
    id: 'high',
    name: 'Hoog inkomen',
    short: 'LV',
    label: 'Biedklaar',
    income: 115000,
    partnerIncome: 82000,
    cash: 180000,
    studyDebt: 0,
    loans: 0,
    leaseMonthly: 0,
    bkr: 'none',
    docs: 94,
    bonus: 12000,
    adviseurCheck: 88,
    proofOfFunds: 96,
    responseSpeed: 91,
    situation: 'Samen kopend'
  }
];

const homes = [
  { id:'h1', title:'Appartement Hilversum', city:'Hilversum', price:285000, agent:'Gooi Wonen Makelaars', rooms:3, energy:'B', image:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80' },
  { id:'h2', title:'Starterswoning Amersfoort', city:'Amersfoort', price:335000, agent:'De Regio Makelaar', rooms:4, energy:'C', image:'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1400&q=80' },
  { id:'h3', title:'Nieuwbouw Baarn', city:'Baarn', price:515000, agent:'Buitenplaats Makelaars', rooms:5, energy:'A++', image:'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=80' },
  { id:'h4', title:'Gezinswoning Eemnes', city:'Eemnes', price:675000, agent:'Eemnes & Co', rooms:5, energy:'A', image:'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1400&q=80' },
  { id:'h5', title:'Hoekwoning Bussum', city:'Bussum', price:725000, agent:'Gooi Wonen Makelaars', rooms:6, energy:'B', image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80' },
  { id:'h6', title:'Vrijstaand Laren', city:'Laren', price:925000, agent:'Laren Luxury Living', rooms:7, energy:'A', image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80' }
];

function euro(n){ if(!n || n<=0) return 'Review'; return '€ ' + Math.round(n).toLocaleString('nl-NL'); }
function shortEuro(n){ if(!n || n<=0) return 'Review'; return '€ ' + Math.round(n/1000) + 'k'; }

function calcProfile(p){
  const income = Number(p.income||0)+Number(p.partnerIncome||0);
  const base = income*4.45;
  const cashEffect = Math.min(Number(p.cash||0),250000)*0.82;
  const bonusEffect = Number(p.bonus||0)*2.4;
  const debtPenalty = Number(p.studyDebt||0)*0.55 + Number(p.loans||0)*1.15 + Number(p.leaseMonthly||0)*180;
  const docsPenalty = p.docs < 45 ? 60000 : p.docs < 70 ? 25000 : 0;
  const budget = Math.max(0, base + cashEffect + bonusEffect - debtPenalty - docsPenalty);

  let score = 48;
  score += income > 140000 ? 23 : income > 90000 ? 17 : income > 55000 ? 8 : -8;
  score += p.cash > 100000 ? 16 : p.cash > 50000 ? 11 : p.cash > 15000 ? 5 : -6;
  score += p.docs > 85 ? 8 : p.docs > 65 ? 3 : -8;
  score -= p.studyDebt > 30000 ? 9 : p.studyDebt > 0 ? 4 : 0;
  score -= p.loans > 10000 ? 7 : 0;
  score -= p.leaseMonthly > 0 ? 8 : 0;
  score = Math.max(0, Math.min(98, Math.round(score)));
  const level = score >= 76 && budget > 0 ? 'green' : score >= 48 && budget > 0 ? 'yellow' : 'red';
  const status = level === 'green' ? 'Verified Buyer' : level === 'yellow' ? 'Verified under conditions' : 'Review required';
  return {income,budget,score,level,status};
}

function matchHome(profile, home){
  const p = calcProfile(profile);
  const gap = Math.max(0, home.price - p.budget);
  let score = p.budget <= 0 ? 8 : Math.round(100 - Math.max(0, gap/home.price)*130);
  if(gap <= 0) score = Math.min(98, 86 + Math.round((Math.abs(home.price-p.budget)/home.price)*12));
  score = Math.max(8, Math.min(98, score));
  const level = score >= 82 ? 'green' : score >= 62 ? 'yellow' : 'red';
  const label = level === 'green' ? 'Past bij profiel' : level === 'yellow' ? 'Onder voorwaarden' : 'Niet realistisch';
  return {score,level,label,gap};
}

function readinessPassport(profile, home){
  const profileCalc = calcProfile(profile);
  const match = matchHome(profile, home);
  const financial = match.score;
  const docs = Number(profile.docs || 0);
  const proof = Number(profile.proofOfFunds || 0);
  const adviser = Number(profile.adviseurCheck || 0);
  const speed = Number(profile.responseSpeed || 0);

  const total = Math.round(financial*0.35 + docs*0.22 + proof*0.18 + adviser*0.15 + speed*0.10);
  const level = total >= 82 ? 'green' : total >= 62 ? 'yellow' : 'red';
  const label = level === 'green' ? 'Biedklaar' : level === 'yellow' ? 'Bijna biedklaar' : 'Nog niet biedklaar';

  const blockers = [];
  if(match.level === 'red') blockers.push('Woning ligt buiten huidige ATLAS-bandbreedte');
  if(profile.docs < 75) blockers.push('Documenten zijn nog niet compleet genoeg');
  if(profile.proofOfFunds < 70) blockers.push('Eigen middelen nog onvoldoende onderbouwd');
  if(profile.adviseurCheck < 60) blockers.push('Nog geen recente adviseurcheck');
  if(profile.leaseMonthly > 0) blockers.push('Private lease verlaagt koopruimte');

  const nextBest = blockers[0] || 'ATLAS-status delen met makelaar en final check plannen';

  return {total,level,label,financial,docs,proof,adviser,speed,blockers,nextBest,profileCalc,match};
}

function improvementPlan(profile, home){
  const current = calcProfile(profile);
  const match = matchHome(profile, home);
  const items = [];
  if(profile.leaseMonthly > 0) items.push({title:'Private lease beëindigen', impact:profile.leaseMonthly*180, detail:'Verlaagt maandverplichting en vergroot indicatieve koopruimte.'});
  if(profile.studyDebt > 0){ const payoff=Math.min(profile.studyDebt,15000); items.push({title:`${euro(payoff)} studieschuld aflossen`, impact:Math.round(payoff*0.55), detail:'Verbetert je financiële ruimte en risico-inschatting.'});}
  if(profile.cash < 75000) items.push({title:'€15.000 extra eigen middelen', impact:12300, detail:'Bijvoorbeeld via sparen, schenking of verkoop eigen bezit.'});
  if(profile.partnerIncome === 0) items.push({title:'Samen kopen met partner', impact:200250, detail:'Voorbeeld op basis van €45.000 extra inkomen.'});
  if(profile.docs < 85) items.push({title:'Documenten compleet maken', impact:profile.docs < 45 ? 60000 : 25000, detail:'Loonstrook, werkgeversverklaring, bankoverzicht en ID klaarzetten.'});
  const top = items.slice(0,3);
  return {current:current.budget,target:home.price,gap:match.gap,items:top,potential:current.budget+top.reduce((s,i)=>s+i.impact,0)};
}

function Badge({level,children}){return <span className={`badge ${level}`}>{children}</span>;}
function Progress({value, level='green'}){return <div className="progress"><span className={level} style={{width:`${Math.max(0,Math.min(100,value))}%`}}/></div>;}

function App(){
  const [page,setPage] = useState('home');
  const [profiles,setProfiles] = useState(starterProfiles);
  const [activeId,setActiveId] = useState('erik');
  const [homeId,setHomeId] = useState('h4');
  const [leads,setLeads] = useState([]);
  const profile = profiles.find(p=>p.id===activeId) || profiles[0];
  const home = homes.find(h=>h.id===homeId) || homes[0];
  const result = useMemo(()=>calcProfile(profile),[profile]);
  const pass = useMemo(()=>readinessPassport(profile,home),[profile,home]);
  const plan = useMemo(()=>improvementPlan(profile,home),[profile,home]);

  function updateProfile(field,value){
    const numeric = ['income','partnerIncome','cash','studyDebt','loans','leaseMonthly','bonus','docs','adviseurCheck','proofOfFunds','responseSpeed'].includes(field);
    setProfiles(items => items.map(p => p.id===activeId ? {...p,[field]: numeric ? Number(value||0) : value} : p));
  }

  function createBuyer(data){
    const id = 'custom-' + Date.now();
    const newProfile = {...data,id,short:(data.name||'NK').split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(),label:'Nieuw profiel',situation:data.partnerIncome>0?'Samen kopend':'Alleen kopend'};
    setProfiles(items=>[newProfile,...items]);
    setActiveId(id);
    setPage('passport');
  }

  function shareLead(){
    const lead = {
      id: Date.now(),
      buyer: profile.name,
      short: profile.short,
      home: home.title,
      city: home.city,
      agent: home.agent,
      price: home.price,
      readiness: pass.total,
      readinessLevel: pass.level,
      match: pass.match.label,
      matchLevel: pass.match.level,
      status: result.status,
      budget: result.budget,
      nextBest: pass.nextBest
    };
    setLeads(l=>[lead,...l]);
    setPage('agent');
  }

  return <div className="app">
    <Sidebar page={page} setPage={setPage}/>
    <main>
      <ProfileStrip profiles={profiles} activeId={activeId} setActiveId={setActiveId}/>
      {page==='home' && <HomePage setPage={setPage} profile={profile} result={result} pass={pass}/>}
      {page==='intake' && <IntakePage createBuyer={createBuyer}/>}
      {page==='passport' && <PassportPage profile={profile} home={home} result={result} pass={pass} setPage={setPage}/>}
      {page==='radar' && <RadarPage profile={profile} home={home} homes={homes} setHomeId={setHomeId} pass={pass} plan={plan} shareLead={shareLead}/>}
      {page==='agent' && <AgentPage leads={leads} setPage={setPage}/>}
      {page==='funda' && <FundaLayer setPage={setPage}/>}
      {page==='studio' && <StudioPage profile={profile} result={result} pass={pass} updateProfile={updateProfile}/>}
    </main>
  </div>
}

function Sidebar({page,setPage}){
  const items = [
    ['home',Sparkles,'Start'],
    ['intake',UserRound,'Nieuwe koper'],
    ['passport',ClipboardCheck,'Biedklaar Paspoort'],
    ['radar',Radar,'Match Radar'],
    ['agent',Building2,'Makelaar'],
    ['funda',LockKeyhole,'Funda-laag'],
    ['studio',SlidersHorizontal,'Simulatie']
  ];
  return <aside className="sidebar">
    <div className="brand"><div className="brandmark">A</div><div><div className="logo">ATLAS</div><div className="tagline">Prime 0.8</div></div></div>
    <nav>{items.map(([id,Icon,label])=><button key={id} onClick={()=>setPage(id)} className={page===id?'active':''}><Icon size={18}/>{label}</button>)}</nav>
    <div className="side-card"><b>Volgende fase</b><p>Van woningmatch naar biedklaarheid: is deze koper klaar om serieus contact op te nemen?</p></div>
  </aside>
}

function ProfileStrip({profiles,activeId,setActiveId}){
  return <div className="profile-strip">{profiles.map(p=>{const r=calcProfile(p);return <button key={p.id} className={p.id===activeId?'active':''} onClick={()=>setActiveId(p.id)}><span className="avatar">{p.short}</span><span><b>{p.name}</b><small>{p.label}</small></span><Badge level={r.level}>{shortEuro(r.budget)}</Badge></button>})}</div>
}

function HomePage({setPage,profile,result,pass}){
  return <section className="hero">
    <div className="hero-copy">
      <Badge level="green">A Trusted Financial Identity for Homebuyers</Badge>
      <h1>Niet alleen weten wat je kunt kopen. Weten of je biedklaar bent.</h1>
      <p>ATLAS wordt de eerste stap vóór Funda-reactie, bezichtiging en hypotheekadvies. De koper ziet zijn match, de makelaar ziet of iemand serieus voorbereid is.</p>
      <div className="actions"><button onClick={()=>setPage('passport')}>Open Biedklaar Paspoort <ArrowRight size={17}/></button><button className="secondary" onClick={()=>setPage('radar')}>Bekijk Match Radar</button></div>
      <div className="value-grid">
        <div><Target/><b>Doelgericht zoeken</b><small>Geen valse hoop op woningen buiten bereik.</small></div>
        <div><BadgeCheck/><b>Sterker bij makelaar</b><small>Laat zien dat je voorbereid bent.</small></div>
        <div><Landmark/><b>Adviseur blijft final check</b><small>ATLAS versnelt, adviseur bevestigt.</small></div>
      </div>
    </div>
    <div className="dark-card">
      <div className="card-head"><span className="avatar large">{profile.short}</span><div><div className="eyebrow">Actieve koper</div><h2>{profile.name}</h2></div></div>
      <div className="split">
        <div><div className="giant">{pass.total}%</div><div className="eyebrow">Biedklaar score</div></div>
        <Badge level={pass.level}>{pass.label}</Badge>
      </div>
      <Progress value={pass.total} level={pass.level}/>
      <p>Bandbreedte {shortEuro(result.budget)} · status {result.status}. ATLAS geeft realtime richting vóór het officiële hypotheektraject.</p>
    </div>
  </section>
}

function IntakePage({createBuyer}){
  const [form,setForm] = useState({name:'Nieuwe koper',income:52000,partnerIncome:0,cash:25000,bonus:0,studyDebt:0,loans:0,leaseMonthly:0,docs:62,adviseurCheck:20,proofOfFunds:45,responseSpeed:60});
  const r=calcProfile(form);
  function set(field,value){setForm(f=>({...f,[field]:field==='name'?value:Number(value||0)}))}
  return <section>
    <Header eyebrow="Nieuwe koper" title="Maak een profiel dat meteen laat zien of iemand biedklaar is." text="Niet alleen inkomen invullen, maar ook documentstatus, bewijs eigen middelen en adviseurcheck."/>
    <div className="two">
      <div className="panel form">
        {[
          ['name','Naam','text'],['income','Bruto jaarinkomen koper','number'],['partnerIncome','Bruto jaarinkomen partner','number'],['cash','Eigen middelen','number'],['bonus','Jaarlijkse bonus','number'],['studyDebt','Studieschuld','number'],['loans','Overige leningen','number'],['leaseMonthly','Private lease per maand','number']
        ].map(([id,label,type])=><label key={id}>{label}<input type={type} value={form[id]} onChange={e=>set(id,e.target.value)}/></label>)}
        <Range label="Documenten compleet" value={form.docs} setValue={v=>set('docs',v)}/>
        <Range label="Adviseurcheck" value={form.adviseurCheck} setValue={v=>set('adviseurCheck',v)}/>
        <Range label="Eigen middelen onderbouwd" value={form.proofOfFunds} setValue={v=>set('proofOfFunds',v)}/>
        <Range label="Reactiesnelheid" value={form.responseSpeed} setValue={v=>set('responseSpeed',v)}/>
        <button onClick={()=>createBuyer(form)}>Maak ATLAS-profiel</button>
      </div>
      <div className="panel sticky">
        <h3>Live indicatie</h3>
        <div className="big-number">{shortEuro(r.budget)}</div>
        <Progress value={r.score} level={r.level}/>
        <p>Financial Identity score {r.score}/100. Hierna kan ATLAS per woning de biedklaarheid bepalen.</p>
      </div>
    </div>
  </section>
}

function PassportPage({profile,home,result,pass,setPage}){
  const rows = [
    ['Financiële match',pass.financial,pass.match.level,ScanSearch],
    ['Documenten compleet',pass.docs,pass.docs>=80?'green':pass.docs>=60?'yellow':'red',FileCheck2],
    ['Eigen middelen bewijs',pass.proof,pass.proof>=80?'green':pass.proof>=60?'yellow':'red',Wallet],
    ['Adviseurcheck',pass.adviser,pass.adviser>=80?'green':pass.adviser>=60?'yellow':'red',Landmark],
    ['Reactiesnelheid',pass.speed,pass.speed>=80?'green':pass.speed>=60?'yellow':'red',Clock3],
  ];
  return <section>
    <Header eyebrow="ATLAS Biedklaar Paspoort" title="Dit is het serieuze koperbewijs richting makelaar." text="De koper deelt geen volledig financieel dossier, maar een compacte status: match, documenten, onderbouwing en volgende stap."/>
    <div className="passport-layout">
      <div className="passport-card">
        <div className="passport-top"><span className="avatar large">{profile.short}</span><div><div className="eyebrow">ATLAS Passport</div><h2>{profile.name}</h2><p>{profile.situation}</p></div></div>
        <div className="passport-score"><div>{pass.total}%</div><Badge level={pass.level}>{pass.label}</Badge></div>
        <Progress value={pass.total} level={pass.level}/>
        <div className="passport-meta">
          <span>Bandbreedte <b>{shortEuro(result.budget)}</b></span>
          <span>Woning <b>{shortEuro(home.price)}</b></span>
          <span>Match <b>{pass.match.label}</b></span>
        </div>
      </div>
      <div className="panel">
        <h3>Waarom is dit handig?</h3>
        <p>Een hypotheekadviseur geeft de officiële check. ATLAS helpt daarvóór: tijdens het zoeken, reageren en selecteren. De koper weet wat slim is. De makelaar ziet wie serieus is.</p>
        <div className="passport-factors">{rows.map(([label,value,level,Icon])=><div key={label} className="factor"><Icon size={20}/><span>{label}</span><b>{value}%</b><Progress value={value} level={level}/></div>)}</div>
        <h3>Volgende beste stap</h3>
        <div className="next-step"><AlertTriangle/><span>{pass.nextBest}</span></div>
        <div className="actions"><button onClick={()=>setPage('radar')}>Bekijk woningmatch</button><button className="secondary" onClick={()=>setPage('agent')}>Naar makelaar</button></div>
      </div>
    </div>
  </section>
}

function RadarPage({profile,home,homes,setHomeId,pass,plan,shareLead}){
  return <section>
    <Header eyebrow="ATLAS Match Radar" title="Per woning zien wat past, wat schuurt en wat je kunt verbeteren." text="Dit is de realtime laag die je niet krijgt door alleen één keer met een hypotheekadviseur te praten."/>
    <div className="radar-layout">
      <div className="home-list">{homes.map(h=>{const p=readinessPassport(profile,h);return <button key={h.id} className={h.id===home.id?'home active':'home'} onClick={()=>setHomeId(h.id)}><img src={h.image}/><div><Badge level={p.level}>{p.total}% biedklaar</Badge><h3>{h.title}</h3><p>{h.city} · {euro(h.price)}</p></div></button>})}</div>
      <div className="panel radar-panel">
        <img src={home.image} className="hero-img"/>
        <div className="radar-head"><div><div className="eyebrow">Biedklaar voor deze woning</div><div className={`score ${pass.level}`}>{pass.total}%</div></div><Badge level={pass.level}>{pass.label}</Badge></div>
        <h2>{home.title}</h2><p>{home.city} · {euro(home.price)} · {home.rooms} kamers · energielabel {home.energy}</p>
        <div className="gap"><div><span>Jouw bandbreedte</span><b>{shortEuro(plan.current)}</b></div><div><span>Vraagprijs</span><b>{shortEuro(plan.target)}</b></div><div><span>Verschil</span><b>{plan.gap<=0?'Binnen bereik':shortEuro(plan.gap)}</b></div></div>
        <h3>Wat maakt deze woning haalbaarder?</h3>
        <div className="plan">{plan.items.length ? plan.items.map(item=><div className="plan-item" key={item.title}><div><b>{item.title}</b><p>{item.detail}</p></div><span>+{shortEuro(item.impact)}</span></div>) : <p>Deze woning past goed. Volgende stap: ATLAS-status delen met makelaar.</p>}</div>
        <div className="potential"><TrendingUp/><div><span>Potentiële bandbreedte na acties</span><b>{shortEuro(plan.potential)}</b></div></div>
        <div className="actions"><button onClick={shareLead}><Send size={17}/> Deel paspoort met makelaar</button><button className="secondary">Plan final check adviseur</button></div>
      </div>
    </div>
  </section>
}

function AgentPage({leads,setPage}){
  return <section>
    <Header eyebrow="Makelaar" title="Van losse lead naar gekwalificeerde koper." text="De makelaar krijgt geen volledig privé-dossier, maar een duidelijke inschatting: wie is biedklaar, wie vraagt review en wie is niet realistisch?"/>
    <div className="metric-grid"><Metric label="Leads" value={leads.length}/><Metric label="Biedklaar" value={leads.filter(l=>l.readinessLevel==='green').length}/><Metric label="Onder voorwaarden" value={leads.filter(l=>l.readinessLevel==='yellow').length}/><Metric label="Review" value={leads.filter(l=>l.readinessLevel==='red').length}/></div>
    <div className="panel">{leads.length===0?<div className="empty"><Building2/><h3>Nog geen gedeelde paspoorten</h3><p>Ga naar Match Radar en deel een paspoort met een makelaar.</p><button onClick={()=>setPage('radar')}>Open Match Radar</button></div>:leads.map(l=><div className="lead" key={l.id}><span className="avatar">{l.short}</span><div><b>{l.buyer}</b><small>{l.home} · {l.agent}</small></div><Badge level={l.readinessLevel}>{l.readiness}% biedklaar</Badge><Badge level={l.matchLevel}>{l.match}</Badge><span>{shortEuro(l.budget)}</span></div>)}</div>
  </section>
}

function FundaLayer({setPage}){
  return <section>
    <Header eyebrow="Funda-laag" title="Funda blijft zoeken. ATLAS maakt zoeken persoonlijk en haalbaar." text="De koper logt in met ATLAS en ziet bij elke woning: past dit bij mijn financiële identiteit en ben ik biedklaar genoeg om te reageren?"/>
    <div className="two">
      <div className="panel">
        <h3>De koperreis</h3>
        <div className="step-list">
          <div><span>1</span><b>ATLAS-profiel</b><p>Financiële richting en bandbreedte.</p></div>
          <div><span>2</span><b>Match Radar</b><p>Per woning zien waarom hij wel of niet past.</p></div>
          <div><span>3</span><b>Biedklaar Paspoort</b><p>Serieuze status delen met makelaar.</p></div>
          <div><span>4</span><b>Final check</b><p>Hypotheekadviseur of bank bevestigt officieel.</p></div>
        </div>
        <button onClick={()=>setPage('passport')}>Bekijk paspoort</button>
      </div>
      <div className="browser">
        <div className="browser-top"><b>funda</b><button>Inloggen met ATLAS</button></div>
        <div className="browser-row"><span>Gezinswoning Eemnes</span><Badge level="yellow">78% biedklaar</Badge></div>
        <div className="browser-row"><span>Nieuwbouw Baarn</span><Badge level="green">91% biedklaar</Badge></div>
        <div className="browser-row"><span>Vrijstaand Laren</span><Badge level="red">42% biedklaar</Badge></div>
      </div>
    </div>
  </section>
}

function StudioPage({profile,result,pass,updateProfile}){
  return <section>
    <Header eyebrow="Simulatie" title="Laat live zien wat de koper sterker maakt." text="Hier zie je direct welke factoren de bandbreedte en biedklaarheid beïnvloeden."/>
    <div className="two">
      <div className="panel form">
        {[
          ['income','Bruto jaarinkomen koper'],['partnerIncome','Partnerinkomen'],['cash','Eigen middelen'],['bonus','Jaarlijkse bonus'],['studyDebt','Studieschuld'],['loans','Overige leningen'],['leaseMonthly','Private lease p/m']
        ].map(([id,label])=><label key={id}>{label}<input type="number" value={profile[id]} onChange={e=>updateProfile(id,e.target.value)}/></label>)}
        <Range label="Documentstatus" value={profile.docs} setValue={v=>updateProfile('docs',v)}/>
        <Range label="Adviseurcheck" value={profile.adviseurCheck} setValue={v=>updateProfile('adviseurCheck',v)}/>
        <Range label="Eigen middelen bewijs" value={profile.proofOfFunds} setValue={v=>updateProfile('proofOfFunds',v)}/>
      </div>
      <div className="panel sticky">
        <h3>Live resultaat</h3>
        <div className="big-number">{shortEuro(result.budget)}</div><Progress value={result.score} level={result.level}/><p>Financial score {result.score}/100</p>
        <div className="big-number">{pass.total}%</div><Progress value={pass.total} level={pass.level}/><p>Biedklaarheid voor geselecteerde woning.</p>
      </div>
    </div>
  </section>
}

function Header({eyebrow,title,text}){return <div className="page-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div></div>}
function Metric({label,value}){return <div className="metric"><span>{label}</span><b>{value}</b></div>}
function Range({label,value,setValue}){return <label>{label} ({value}%)<input type="range" min="0" max="100" value={value} onChange={e=>setValue(e.target.value)}/></label>}

createRoot(document.getElementById('root')).render(<App/>);
