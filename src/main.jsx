
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ShieldCheck, Home, Building2, LockKeyhole, UserRound, Search, Radar,
  ArrowRight, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Wallet,
  FileCheck2, Gauge, Sparkles, SlidersHorizontal, Send, RefreshCcw, KeyRound
} from 'lucide-react';
import './styles.css';

const defaultProfiles = [
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
    situation: 'Alleen kopend'
  },
  {
    id: 'bkr',
    name: 'BKR-review',
    short: 'KA',
    label: 'Review nodig',
    income: 62000,
    partnerIncome: 0,
    cash: 12000,
    studyDebt: 0,
    loans: 15000,
    leaseMonthly: 0,
    bkr: 'serious',
    docs: 34,
    bonus: 0,
    situation: 'Alleen kopend'
  },
  {
    id: 'high',
    name: 'Hoog inkomen',
    short: 'LV',
    label: 'Topkandidaat',
    income: 115000,
    partnerIncome: 82000,
    cash: 180000,
    studyDebt: 0,
    loans: 0,
    leaseMonthly: 0,
    bkr: 'none',
    docs: 94,
    bonus: 12000,
    situation: 'Samen kopend'
  }
];

const homes = [
  {
    id: 'h1',
    title: 'Appartement Hilversum',
    city: 'Hilversum',
    price: 285000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    agent: 'Gooi Wonen Makelaars',
    rooms: 3,
    energy: 'B'
  },
  {
    id: 'h2',
    title: 'Starterswoning Amersfoort',
    city: 'Amersfoort',
    price: 335000,
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80',
    agent: 'De Regio Makelaar',
    rooms: 4,
    energy: 'C'
  },
  {
    id: 'h3',
    title: 'Nieuwbouw Baarn',
    city: 'Baarn',
    price: 515000,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
    agent: 'Buitenplaats Makelaars',
    rooms: 5,
    energy: 'A++'
  },
  {
    id: 'h4',
    title: 'Gezinswoning Eemnes',
    city: 'Eemnes',
    price: 675000,
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80',
    agent: 'Eemnes & Co',
    rooms: 5,
    energy: 'A'
  },
  {
    id: 'h5',
    title: 'Hoekwoning Bussum',
    city: 'Bussum',
    price: 725000,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    agent: 'Gooi Wonen Makelaars',
    rooms: 6,
    energy: 'B'
  },
  {
    id: 'h6',
    title: 'Vrijstaand Laren',
    city: 'Laren',
    price: 925000,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    agent: 'Laren Luxury Living',
    rooms: 7,
    energy: 'A'
  }
];

function euro(n) {
  if (!n || n <= 0) return 'Review';
  return '€ ' + Math.round(n).toLocaleString('nl-NL');
}
function shortEuro(n) {
  if (!n || n <= 0) return 'Review';
  return '€ ' + Math.round(n / 1000) + 'k';
}

function calculateProfile(profile) {
  const income = Number(profile.income || 0) + Number(profile.partnerIncome || 0);
  const base = income * 4.45;
  const cashEffect = Math.min(Number(profile.cash || 0), 250000) * 0.82;
  const bonusEffect = Number(profile.bonus || 0) * 2.4;
  const debtPenalty =
    Number(profile.studyDebt || 0) * 0.55 +
    Number(profile.loans || 0) * 1.15 +
    Number(profile.leaseMonthly || 0) * 180;
  const bkrPenalty = profile.bkr === 'serious' ? 999999 : profile.bkr === 'minor' ? 65000 : 0;
  const docsPenalty = profile.docs < 45 ? 60000 : profile.docs < 70 ? 25000 : 0;
  const budget = Math.max(0, base + cashEffect + bonusEffect - debtPenalty - bkrPenalty - docsPenalty);

  let score = 48;
  score += income > 140000 ? 23 : income > 90000 ? 17 : income > 55000 ? 8 : -8;
  score += profile.cash > 100000 ? 16 : profile.cash > 50000 ? 11 : profile.cash > 15000 ? 5 : -6;
  score += profile.docs > 85 ? 8 : profile.docs > 65 ? 3 : -8;
  score -= profile.studyDebt > 30000 ? 9 : profile.studyDebt > 0 ? 4 : 0;
  score -= profile.loans > 10000 ? 7 : 0;
  score -= profile.leaseMonthly > 0 ? 8 : 0;
  score -= profile.bkr === 'serious' ? 45 : profile.bkr === 'minor' ? 16 : 0;
  score = Math.max(0, Math.min(98, Math.round(score)));

  const level = score >= 76 && budget > 0 ? 'green' : score >= 48 && budget > 0 ? 'yellow' : 'red';
  const status = level === 'green' ? 'Verified Buyer' : level === 'yellow' ? 'Verified under conditions' : 'Review required';

  return { income, budget, score, level, status };
}

function matchHome(profile, home) {
  const p = calculateProfile(profile);
  if (p.budget <= 0) {
    return {
      level: 'red',
      score: 12,
      label: 'Review nodig',
      gap: home.price,
      verdict: 'Eerst financiële review nodig voordat ATLAS een woningmatch toont.'
    };
  }
  const gap = home.price - p.budget;
  let score = Math.round(100 - Math.max(0, gap / home.price) * 130);
  if (gap <= 0) score = Math.min(98, 86 + Math.round((Math.abs(gap) / home.price) * 12));
  score = Math.max(8, Math.min(98, score));

  const level = score >= 82 ? 'green' : score >= 62 ? 'yellow' : 'red';
  const label = level === 'green' ? 'Past bij profiel' : level === 'yellow' ? 'Onder voorwaarden' : 'Niet realistisch';
  const verdict = level === 'green'
    ? 'Deze woning past binnen de huidige ATLAS-bandbreedte.'
    : level === 'yellow'
      ? 'Deze woning is mogelijk haalbaar, maar vraagt om voorwaarden of optimalisatie.'
      : 'Deze woning ligt buiten de huidige ATLAS-bandbreedte. ATLAS toont wat er nodig is om dichterbij te komen.';

  return { level, score, label, gap: Math.max(0, gap), verdict };
}

function improvementPlan(profile, home) {
  const current = calculateProfile(profile);
  const match = matchHome(profile, home);
  const items = [];

  if (profile.leaseMonthly > 0) {
    const impact = profile.leaseMonthly * 180;
    items.push({
      title: 'Private lease beëindigen',
      impact,
      detail: `Kan indicatief ${shortEuro(impact)} extra ruimte geven.`,
      type: 'lease'
    });
  }
  if (profile.studyDebt > 0) {
    const payoff = Math.min(profile.studyDebt, 15000);
    const impact = Math.round(payoff * 0.55);
    items.push({
      title: `€${payoff.toLocaleString('nl-NL')} studieschuld aflossen`,
      impact,
      detail: `Verlaagt verplichtingen en verbetert je ATLAS-score.`,
      type: 'study'
    });
  }
  if (profile.cash < 75000) {
    const extraCash = 15000;
    const impact = Math.round(extraCash * 0.82);
    items.push({
      title: '€15.000 extra eigen middelen',
      impact,
      detail: 'Kan via sparen, schenking of verkoop eigen bezit.',
      type: 'cash'
    });
  }
  if (profile.partnerIncome === 0) {
    const impact = Math.round(45000 * 4.45);
    items.push({
      title: 'Samen kopen met partner',
      impact,
      detail: 'Voorbeeld: partnerinkomen van €45.000 meenemen.',
      type: 'partner'
    });
  }
  if (profile.docs < 85) {
    const impact = profile.docs < 45 ? 60000 : 25000;
    items.push({
      title: 'Documenten compleet maken',
      impact,
      detail: 'Loonstrook, werkgeversverklaring, bankoverzicht en ID klaarzetten.',
      type: 'docs'
    });
  }
  if (profile.bkr === 'serious') {
    items.unshift({
      title: 'BKR-review oplossen',
      impact: 0,
      detail: 'Geen extra ruimte totdat dit inhoudelijk is beoordeeld of hersteld.',
      type: 'bkr',
      blocker: true
    });
  }

  const topItems = items.slice(0, 3);
  const potential = current.budget + topItems.reduce((sum, item) => sum + (item.blocker ? 0 : item.impact), 0);
  return { current: current.budget, target: home.price, gap: match.gap, items: topItems, potential };
}

function Badge({ level, children }) {
  return <span className={`badge ${level}`}>{children}</span>;
}

function Nav({ page, setPage }) {
  const items = [
    ['home', Sparkles, 'Start'],
    ['intake', UserRound, 'Nieuwe koper'],
    ['identity', ShieldCheck, 'Identity'],
    ['radar', Radar, 'Match Radar'],
    ['agent', Building2, 'Makelaar'],
    ['funda', LockKeyhole, 'Funda-laag'],
    ['studio', SlidersHorizontal, 'Simulatie']
  ];
  return <aside className="sidebar">
    <div className="brand">
      <div className="brandmark">A</div>
      <div><div className="logo">ATLAS</div><div className="tagline">Prime 0.7</div></div>
    </div>
    <nav>
      {items.map(([id, Icon, label]) => (
        <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}>
          <Icon size={18}/><span>{label}</span>
        </button>
      ))}
    </nav>
    <div className="side-card">
      <b>ATLAS Match Radar</b>
      <p>Niet alleen “kan wel/niet”, maar: wat moet er gebeuren om dichterbij te komen?</p>
    </div>
  </aside>;
}

function ProfileTabs({ profiles, activeId, setActiveId }) {
  return <div className="profile-tabs">
    {profiles.map(profile => {
      const r = calculateProfile(profile);
      return <button key={profile.id} className={activeId === profile.id ? 'active' : ''} onClick={() => setActiveId(profile.id)}>
        <span className="avatar">{profile.short}</span>
        <span><b>{profile.name}</b><small>{profile.label}</small></span>
        <Badge level={r.level}>{shortEuro(r.budget)}</Badge>
      </button>;
    })}
  </div>;
}

function App() {
  const [page, setPage] = useState('home');
  const [profiles, setProfiles] = useState(defaultProfiles);
  const [activeId, setActiveId] = useState('erik');
  const [selectedHomeId, setSelectedHomeId] = useState('h4');
  const [leads, setLeads] = useState([]);
  const activeProfile = profiles.find(p => p.id === activeId) || profiles[0];
  const activeHome = homes.find(h => h.id === selectedHomeId) || homes[0];
  const profileResult = useMemo(() => calculateProfile(activeProfile), [activeProfile]);
  const selectedMatch = useMemo(() => matchHome(activeProfile, activeHome), [activeProfile, activeHome]);
  const plan = useMemo(() => improvementPlan(activeProfile, activeHome), [activeProfile, activeHome]);

  function updateProfile(field, value) {
    setProfiles(items => items.map(p => p.id === activeId ? {
      ...p,
      [field]: ['income','partnerIncome','cash','studyDebt','loans','leaseMonthly','bonus','docs'].includes(field) ? Number(value || 0) : value
    } : p));
  }

  function createBuyer(data) {
    const id = 'custom-' + Date.now();
    const newProfile = {
      id,
      short: data.name.split(' ').map(x => x[0]).join('').slice(0,2).toUpperCase() || 'NK',
      label: 'Nieuw aangemaakt',
      situation: data.partnerIncome > 0 ? 'Samen kopend' : 'Alleen kopend',
      ...data
    };
    setProfiles(items => [newProfile, ...items]);
    setActiveId(id);
    setPage('identity');
  }

  function shareWithAgent(home) {
    const m = matchHome(activeProfile, home);
    setLeads(items => [{
      id: Date.now(),
      buyer: activeProfile.name,
      avatar: activeProfile.short,
      home: home.title,
      city: home.city,
      price: home.price,
      agent: home.agent,
      status: profileResult.status,
      level: profileResult.level,
      match: m.label,
      matchLevel: m.level,
      score: m.score,
      budget: profileResult.budget
    }, ...items]);
    setPage('agent');
  }

  return <div className="app">
    <Nav page={page} setPage={setPage}/>
    <main>
      <ProfileTabs profiles={profiles} activeId={activeId} setActiveId={setActiveId}/>
      {page === 'home' && <HomePage setPage={setPage} profile={activeProfile} result={profileResult}/>}
      {page === 'intake' && <IntakePage createBuyer={createBuyer}/>}
      {page === 'identity' && <IdentityPage profile={activeProfile} result={profileResult} setPage={setPage}/>}
      {page === 'radar' && <RadarPage profile={activeProfile} result={profileResult} homes={homes} selectedHome={activeHome} setSelectedHomeId={setSelectedHomeId} match={selectedMatch} plan={plan} shareWithAgent={shareWithAgent}/>}
      {page === 'agent' && <AgentPage leads={leads}/>}
      {page === 'funda' && <FundaPage setPage={setPage}/>}
      {page === 'studio' && <StudioPage profile={activeProfile} result={profileResult} updateProfile={updateProfile}/>}
    </main>
  </div>;
}

function HomePage({ setPage, profile, result }) {
  return <section className="hero">
    <div className="hero-copy">
      <Badge level="green">A Trusted Financial Identity for Homebuyers</Badge>
      <h1>Weten welke woning haalbaar is, vóór je verliefd wordt.</h1>
      <p>ATLAS is stap één in het koopproces. Maak een financieel profiel, zie je woningmatch en kom sterker binnen bij de makelaar. De hypotheekadviseur doet daarna de officiële final check.</p>
      <div className="flow">
        <div><span>1</span><b>ATLAS-profiel</b><small>Richting en bandbreedte</small></div>
        <div><span>2</span><b>Match Radar</b><small>Welke woningen passen?</small></div>
        <div><span>3</span><b>Makelaar</b><small>Gerichter contact</small></div>
        <div><span>4</span><b>Adviseur</b><small>Definitieve check</small></div>
      </div>
      <div className="actions">
        <button onClick={() => setPage('intake')}>Nieuwe koper starten <ArrowRight size={17}/></button>
        <button className="secondary" onClick={() => setPage('radar')}>Open Match Radar</button>
      </div>
    </div>
    <div className="identity-card">
      <div className="card-head">
        <span className="avatar large">{profile.short}</span>
        <div>
          <div className="eyebrow">Actieve Financial Identity</div>
          <h2>{profile.name}</h2>
        </div>
      </div>
      <Badge level={result.level}>{result.status}</Badge>
      <div className="giant">{shortEuro(result.budget)}</div>
      <div className="eyebrow">ATLAS-bandbreedte</div>
      <div className="scorebar"><span style={{width: `${result.score}%`}} /></div>
      <p>Score {result.score}/100. Dit is geen hypotheekadvies, maar een realtime zoek- en matchlaag vóór het officiële traject.</p>
    </div>
  </section>;
}

function IntakePage({ createBuyer }) {
  const [form, setForm] = useState({
    name: 'Nieuwe koper',
    income: 52000,
    partnerIncome: 0,
    cash: 25000,
    studyDebt: 0,
    loans: 0,
    leaseMonthly: 0,
    bkr: 'none',
    docs: 65,
    bonus: 0
  });
  const result = calculateProfile(form);
  function set(field, value) {
    setForm(f => ({...f, [field]: ['income','partnerIncome','cash','studyDebt','loans','leaseMonthly','docs','bonus'].includes(field) ? Number(value || 0) : value}));
  }
  return <section>
    <div className="page-head">
      <div>
        <span className="eyebrow">Nieuwe koper</span>
        <h2>Maak vanaf nul een ATLAS-profiel.</h2>
        <p>De koper krijgt direct richting: wat lijkt haalbaar, welke risico’s spelen mee en welke woningen passen beter?</p>
      </div>
      <Badge level={result.level}>{result.status}</Badge>
    </div>
    <div className="two">
      <div className="panel form">
        {[
          ['name','Naam','text'],
          ['income','Bruto jaarinkomen koper','number'],
          ['partnerIncome','Bruto jaarinkomen partner','number'],
          ['cash','Eigen middelen','number'],
          ['bonus','Jaarlijkse bonus','number'],
          ['studyDebt','Studieschuld','number'],
          ['loans','Overige leningen','number'],
          ['leaseMonthly','Private lease per maand','number']
        ].map(([id,label,type]) => <label key={id}>{label}<input type={type} value={form[id]} onChange={e => set(id, e.target.value)}/></label>)}
        <label>BKR-signaal<select value={form.bkr} onChange={e => set('bkr', e.target.value)}><option value="none">Geen</option><option value="minor">Licht/herstelbaar</option><option value="serious">Serieus</option></select></label>
        <label>Documentstatus ({form.docs}%)<input type="range" min="0" max="100" value={form.docs} onChange={e => set('docs', e.target.value)}/></label>
        <button onClick={() => createBuyer(form)}>Maak ATLAS Identity</button>
      </div>
      <div className="panel sticky">
        <h3>Live Financial Identity</h3>
        <Badge level={result.level}>{result.status}</Badge>
        <div className="big-number">{shortEuro(result.budget)}</div>
        <div className="scorebar light"><span style={{width: `${result.score}%`}} /></div>
        <p>Score {result.score}/100. Deze indicatie helpt bij zoeken en prioriteren, maar vervangt de hypotheekadviseur niet.</p>
        <div className="mini-checks">
          <div><Wallet/> <span>Eigen middelen</span><b>{euro(form.cash)}</b></div>
          <div><FileCheck2/> <span>Documentstatus</span><b>{form.docs}%</b></div>
          <div><Gauge/> <span>Kooprichting</span><b>{shortEuro(result.budget)}</b></div>
        </div>
      </div>
    </div>
  </section>;
}

function IdentityPage({ profile, result, setPage }) {
  const items = [
    ['Huishoudinkomen', euro(result.income), result.income > 90000 ? 'green' : result.income > 55000 ? 'yellow' : 'red'],
    ['Eigen middelen', euro(profile.cash), profile.cash > 50000 ? 'green' : profile.cash > 15000 ? 'yellow' : 'red'],
    ['Documentstatus', profile.docs + '%', profile.docs > 85 ? 'green' : profile.docs > 60 ? 'yellow' : 'red'],
    ['BKR-signaal', profile.bkr === 'none' ? 'Geen' : profile.bkr === 'minor' ? 'Licht' : 'Review nodig', profile.bkr === 'none' ? 'green' : profile.bkr === 'minor' ? 'yellow' : 'red']
  ];
  return <section>
    <div className="page-head">
      <div>
        <span className="eyebrow">ATLAS Identity</span>
        <h2>{profile.name}</h2>
        <p>Dit profiel is bedoeld om doelgericht te zoeken en gecontroleerd te delen met een makelaar.</p>
      </div>
      <button onClick={() => setPage('radar')}>Open Match Radar</button>
    </div>
    <div className="metric-grid">
      <Metric label="Status" value={result.status}/>
      <Metric label="Score" value={`${result.score}/100`}/>
      <Metric label="Bandbreedte" value={shortEuro(result.budget)}/>
      <Metric label="Final check" value="Adviseur"/>
    </div>
    <div className="panel">
      <h3>Wat deelt de koper met de makelaar?</h3>
      <div className="factor-grid">
        {items.map(([label,value,level]) => <div className="factor" key={label}><span>{label}</span><Badge level={level}>{value}</Badge></div>)}
      </div>
    </div>
  </section>;
}

function Metric({ label, value }) {
  return <div className="metric-card"><div className="eyebrow">{label}</div><div>{value}</div></div>;
}

function RadarPage({ homes, selectedHome, setSelectedHomeId, match, plan, profile, result, shareWithAgent }) {
  return <section>
    <div className="page-head">
      <div>
        <span className="eyebrow">ATLAS Match Radar</span>
        <h2>Niet alleen óf het past, maar hoe je dichterbij komt.</h2>
        <p>Dit is de functie die ATLAS nuttiger maakt dan “alleen even naar een hypotheekadviseur”: realtime zoeken, vergelijken en optimaliseren per woning.</p>
      </div>
      <Badge level={match.level}>{match.label}</Badge>
    </div>
    <div className="radar-layout">
      <div className="home-list">
        {homes.map(home => {
          const m = matchHome(profile, home);
          return <button key={home.id} className={home.id === selectedHome.id ? 'home-card active' : 'home-card'} onClick={() => setSelectedHomeId(home.id)}>
            <img src={home.image} alt="woning"/>
            <div>
              <Badge level={m.level}>{m.score}% match</Badge>
              <h3>{home.title}</h3>
              <p>{home.city} · {euro(home.price)}</p>
            </div>
          </button>;
        })}
      </div>
      <div className="radar-panel">
        <img src={selectedHome.image} alt="woning" className="hero-home"/>
        <div className="radar-score">
          <div>
            <div className="eyebrow">ATLAS Match Score</div>
            <div className={`score ${match.level}`}>{match.score}%</div>
          </div>
          <Badge level={match.level}>{match.label}</Badge>
        </div>
        <h2>{selectedHome.title}</h2>
        <p>{selectedHome.city} · {euro(selectedHome.price)} · {selectedHome.rooms} kamers · label {selectedHome.energy}</p>
        <p>{match.verdict}</p>

        <div className="gap-card">
          <div><span>Huidige bandbreedte</span><b>{shortEuro(plan.current)}</b></div>
          <div><span>Woningprijs</span><b>{shortEuro(plan.target)}</b></div>
          <div><span>Verschil</span><b>{plan.gap <= 0 ? 'Binnen bereik' : shortEuro(plan.gap)}</b></div>
        </div>

        <h3>Hoe maak je deze woning haalbaarder?</h3>
        <div className="plan">
          {plan.items.length === 0 && <p>Deze woning past al goed binnen het huidige profiel. Volgende stap: makelaar benaderen en final check bij hypotheekadviseur.</p>}
          {plan.items.map(item => <div className={item.blocker ? 'plan-item blocker' : 'plan-item'} key={item.title}>
            <div>
              <b>{item.title}</b>
              <p>{item.detail}</p>
            </div>
            <span>{item.blocker ? 'Blokker' : '+' + shortEuro(item.impact)}</span>
          </div>)}
        </div>

        <div className="potential">
          <TrendingUp/>
          <div>
            <span>Potentiële bandbreedte na acties</span>
            <b>{shortEuro(plan.potential)}</b>
          </div>
        </div>

        <div className="actions">
          <button onClick={() => shareWithAgent(selectedHome)}><Send size={17}/> Deel ATLAS-status met makelaar</button>
          <button className="secondary">Plan final check adviseur</button>
        </div>
      </div>
    </div>
  </section>;
}

function AgentPage({ leads }) {
  return <section>
    <div className="page-head">
      <div>
        <span className="eyebrow">Makelaar</span>
        <h2>Serieuze kopers komen beter binnen.</h2>
        <p>De makelaar ziet geen volledige privégegevens, maar wel of iemand financieel voorbereid is.</p>
      </div>
    </div>
    <div className="metric-grid">
      <Metric label="Leads" value={leads.length}/>
      <Metric label="Verified" value={leads.filter(l => l.level === 'green').length}/>
      <Metric label="Review" value={leads.filter(l => l.level === 'red').length}/>
      <Metric label="Topmatch" value={leads.filter(l => l.matchLevel === 'green').length}/>
    </div>
    <div className="panel">
      {leads.length === 0 ? <div className="empty"><Building2/><h3>Nog geen gedeelde interesses</h3><p>Ga naar Match Radar en deel een ATLAS-status met de makelaar.</p></div> :
        leads.map(lead => <div className="lead" key={lead.id}>
          <span className="avatar">{lead.avatar}</span>
          <div><b>{lead.buyer}</b><small>{lead.home} · {lead.city}</small></div>
          <Badge level={lead.level}>{lead.status}</Badge>
          <Badge level={lead.matchLevel}>{lead.match}</Badge>
          <b>{lead.score}%</b>
        </div>)
      }
    </div>
  </section>;
}

function FundaPage({ setPage }) {
  return <section>
    <div className="page-head">
      <div>
        <span className="eyebrow">Funda-laag</span>
        <h2>ATLAS vervangt Funda niet. ATLAS maakt Funda persoonlijker.</h2>
        <p>De koper logt in met ATLAS en ziet direct welke woningen bij zijn financiële identiteit passen.</p>
      </div>
      <button onClick={() => setPage('radar')}>Simuleer woningmatch</button>
    </div>
    <div className="two">
      <div className="panel">
        <h3>Wat ziet de koper?</h3>
        <div className="step-list">
          <div><span>1</span><b>ATLAS-profiel aanmaken</b><p>Eerste indicatie van kooprichting.</p></div>
          <div><span>2</span><b>Woningen doelgericht bekijken</b><p>Past, onder voorwaarden of niet realistisch.</p></div>
          <div><span>3</span><b>Makelaar contacteren</b><p>Met een sterker en serieuzer profiel.</p></div>
          <div><span>4</span><b>Hypotheekadviseur final check</b><p>Definitieve toetsing blijft professioneel en officieel.</p></div>
        </div>
      </div>
      <div className="browser">
        <div className="browser-top"><b>funda</b><button>Inloggen met ATLAS</button></div>
        <div className="browser-row"><span>Gezinswoning Eemnes</span><Badge level="green">Past bij profiel</Badge></div>
        <div className="browser-row"><span>Hoekwoning Bussum</span><Badge level="yellow">Onder voorwaarden</Badge></div>
        <div className="browser-row"><span>Villa Blaricum</span><Badge level="red">Niet realistisch</Badge></div>
      </div>
    </div>
  </section>;
}

function StudioPage({ profile, updateProfile, result }) {
  const fields = [
    ['income','Bruto jaarinkomen koper'],
    ['partnerIncome','Partnerinkomen'],
    ['cash','Eigen middelen'],
    ['bonus','Jaarlijkse bonus'],
    ['studyDebt','Studieschuld'],
    ['loans','Overige leningen'],
    ['leaseMonthly','Private lease p/m']
  ];
  return <section>
    <div className="page-head">
      <div>
        <span className="eyebrow">Simulatie</span>
        <h2>Laat live zien wat factoren doen.</h2>
        <p>Dit is nuttig in gesprekken met makelaars: je ziet direct waarom het ene profiel sterker is dan het andere.</p>
      </div>
      <Badge level={result.level}>{result.status}</Badge>
    </div>
    <div className="two">
      <div className="panel form">
        {fields.map(([id,label]) => <label key={id}>{label}<input type="number" value={profile[id]} onChange={e => updateProfile(id, e.target.value)}/></label>)}
        <label>Documentstatus ({profile.docs}%)<input type="range" min="0" max="100" value={profile.docs} onChange={e => updateProfile('docs', e.target.value)}/></label>
        <label>BKR<select value={profile.bkr} onChange={e => updateProfile('bkr', e.target.value)}><option value="none">Geen</option><option value="minor">Licht</option><option value="serious">Serieus</option></select></label>
      </div>
      <div className="panel sticky">
        <h3>Live resultaat</h3>
        <div className="big-number">{shortEuro(result.budget)}</div>
        <div className="scorebar light"><span style={{width: `${result.score}%`}} /></div>
        <p>Score {result.score}/100. Status: {result.status}.</p>
      </div>
    </div>
  </section>;
}

createRoot(document.getElementById('root')).render(<App />);
