import {useEffect,useRef,useState} from 'react';

const CONFIG={
 version:'0.1.0',size:'120 MB',requirements:'Windows 10/11 (64-bit)',
 downloadUrl:'https://github.com/Surajbnp/lekhpal-releases/releases/download/v0.2/Lekhpal-Setup-v0.2.exe',
 demoUrl:'#screenshots',supportEmail:'support@example.com'
};
const NAV=['Home','Features','Screenshots','Download','Pricing','FAQ'];
const HIGHLIGHTS=[['📦','Inventory Management'],['👥','Customer Management'],['🧾','Billing & Invoicing'],['📊','Reports & Analytics'],['⚡','AI Powered Insights']];
const FEATURES=[
 ['🧾','Billing & GST','Fast POS billing, printable GST invoices, GSTR-1 and GSTR-3B summaries with JSON and CSV export.'],
 ['⏳','Batch & Expiry','FEFO stock selling, expiry alerts, and expired batches blocked automatically.'],
 ['📒','Accounts','Automatic double-entry books, ledger, trial balance and profit & loss.'],
 ['✨','AI Insights','Smart suggestions on sales, stock and receivables. Ask questions in plain language.'],
 ['🔒','Offline & Secure','Your data stays on your computer. Works without internet, with daily auto-backup.'],
 ['🛡️','Roles & Licence','Admin, cashier and accountant roles with a secure, signed licence.']
];
const SHOTS=['Dashboard','Billing (POS)','Batch & Expiry','GST Returns'];
const STEPS=['Download the installer','Run Lekhpal-Setup.exe','Sign in and start billing'];
const FAQ=[
 ['Does Lekhpal work without internet?','Yes. Everything runs on your computer. Internet is only needed for cloud sync, licence renewal and Ask AI.'],
 ['Is my data safe?','Data is stored locally, backed up daily, and you can back up or restore it anytime from Settings.'],
 ['Why does Windows show a SmartScreen warning?','New apps without a paid code-signing certificate can trigger it. Click "More info" then "Run anyway".'],
 ['Can I try it before buying?','Yes. Every install includes a 30-day free trial.'],
 ['Is GST supported?','Yes. GSTR-1 and GSTR-3B style reports are built in, with HSN summary and credit notes.']
];

function useReveal(){const r=useRef(null);useEffect(()=>{const els=r.current.querySelectorAll('.rv');const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});els.forEach(e=>io.observe(e));return()=>io.disconnect()},[]);return r}

const Brand=({size=40})=><a className="brand" href="#home"><img src="/icon.png" width={size} height={size} alt=""/><span>LEKHPAL</span></a>;
const WinLogo=()=><svg className="win" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 3.6l8.4-1.2v8.2H2zM11.5 2.2L22 .7v9.9H11.5zM2 11.6h8.4v8.2L2 18.6zM11.5 11.6H22v9.9l-10.5-1.5z"/></svg>;
const DownloadBtn=({children='Download for Windows',win=true})=><a className="btn" href={CONFIG.downloadUrl}>{win&&<WinLogo/>}{children} <b>⬇</b></a>;

function Mockup(){
 const kpis=[['Total Sales','₹1,24,560','12%'],['Total Purchase','₹78,320','6%'],['Customers','248','5%'],['Products','1,240','3%']];
 const tx=[['INV-001','Rahul Enterprises','₹12,450'],['PUR-023','Sharma Traders','₹8,900'],['INV-002','Amit & Co.','₹6,230'],['PUR-022','Gupta Suppliers','₹15,000']];
 return <div className="laptop"><div className="screen"><aside>{['Dashboard','Sales','Purchase','Inventory','Customers','Suppliers','Accounts','Reports','AI Insights','Settings'].map((n,i)=><i key={n} className={i?'':'on'}>{n}</i>)}</aside>
  <div className="mc"><small>Good Morning,</small><h4>Welcome to Lekhpal</h4>
   <div className="mk">{kpis.map(([k,v,d])=><div key={k}><small>{k}</small><b>{v}</b><em>▲ {d}</em></div>)}</div>
   <div className="mb"><div className="chart"><small>Sales Overview</small><svg viewBox="0 0 200 80" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ff8a2b" stopOpacity=".5"/><stop offset="1" stopColor="#ff8a2b" stopOpacity="0"/></linearGradient></defs><path d="M0 70 L20 58 L40 62 L60 44 L80 50 L100 34 L120 38 L140 24 L160 28 L180 14 L200 8 V80 H0Z" fill="url(#g)"/><path className="ln" d="M0 70 L20 58 L40 62 L60 44 L80 50 L100 34 L120 38 L140 24 L160 28 L180 14 L200 8" fill="none" stroke="#ff8a2b" strokeWidth="2"/></svg></div>
    <div className="tx"><small>Recent Transactions</small>{tx.map(([a,b,c])=><p key={a}><span>{a}<br/><em>{b}</em></span><b>{c}</b></p>)}</div></div></div></div><div className="base"/></div>}

export default function App(){
 const root=useReveal();const [open,setOpen]=useState(null),[menu,setMenu]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(scrollY>20);f();addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
 return <div ref={root}>
  <header className={'nav'+(scrolled?' sc':'')}><div className="wrap bar"><Brand/>
   <nav className={menu?'open':''}>{NAV.map(n=><a key={n} href={'#'+n.toLowerCase()} onClick={()=>setMenu(false)}>{n}</a>)}</nav>
   <DownloadBtn win={false}>Download Now</DownloadBtn><button className="burger" aria-label="Menu" onClick={()=>setMenu(!menu)}>☰</button></div></header>

  <section id="home" className="hero"><div className="wrap hg"><div>
   <span className="chip rv">✨ AI Powered Business Management Tool</span>
   <h1 className="rv">Manage Your Business <em>Smarter</em></h1>
   <p className="lead rv"><b>Lekhpal</b> is a powerful desktop application to manage your business, accounts, inventory, customers and more — with the help of AI.</p>
   <div className="hl rv">{HIGHLIGHTS.map(([i,t])=><div key={t}><span>{i}</span>{t}</div>)}</div>
   <div className="cta rv"><DownloadBtn/><a className="btn ghost" href={CONFIG.demoUrl}>▶ Watch Demo</a></div>
   <small className="meta">{CONFIG.requirements} • v{CONFIG.version} • {CONFIG.size}</small></div>
   <div className="rv"><Mockup/></div></div></section>

  <section id="features" className="sec"><div className="wrap"><h2 className="rv">Everything your business needs</h2><p className="sub rv">One app for billing, stock, GST and accounts. No technical knowledge required.</p>
   <div className="fg">{FEATURES.map(([i,t,d],n)=><div key={t} className="card rv" style={{transitionDelay:n*60+'ms'}}><span className="ic">{i}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

  <section id="screenshots" className="sec alt"><div className="wrap"><h2 className="rv">See it in action</h2><p className="sub rv">Replace these frames with your real screenshots in <code>public/shots</code>.</p>
   <div className="sg">{SHOTS.map((s,n)=><figure key={s} className="shot rv" style={{transitionDelay:n*70+'ms'}}><div className="ph"><Mockup/></div><figcaption>{s}</figcaption></figure>)}</div></div></section>

  <section id="download" className="sec"><div className="wrap dl rv"><div className="dlb"><img src="/icon.png" width="120" height="120" alt=""/><div><h2>Download Lekhpal Today</h2><p className="sub">Start managing your business smarter with AI.</p><DownloadBtn/><small className="meta">{CONFIG.requirements} • v{CONFIG.version} • {CONFIG.size}</small></div></div>
   <ol className="steps">{STEPS.map((s,i)=><li key={s}><b>{i+1}</b>{s}</li>)}</ol>
   <div className="trust"><div>🛡️<b>Safe & Secure</b><small>No malware, 100% safe</small></div><div>☁️<b>Works Offline</b><small>Data stays with you</small></div><div>🔄<b>Regular Updates</b><small>New features often</small></div></div></div></section>

  <section id="pricing" className="sec alt"><div className="wrap"><h2 className="rv">Simple pricing</h2><p className="sub rv">Try free, then pick a licence that fits your shop.</p>
   <div className="pg"><div className="card rv"><h3>Free Trial</h3><div className="price">₹0</div><p>30 days, all features</p><DownloadBtn win={false}>Start Trial</DownloadBtn></div>
    <div className="card pop rv"><span className="chip">Most popular</span><h3>Standard Licence</h3><div className="price">Contact us</div><p>1 PC, yearly renewal, updates and support</p><a className="btn" href={'mailto:'+CONFIG.supportEmail}>Get Licence</a></div></div></div></section>

  <section id="faq" className="sec"><div className="wrap narrow"><h2 className="rv">Frequently asked questions</h2>
   {FAQ.map(([q,a],i)=><div key={q} className={'faq rv'+(open===i?' open':'')}><button onClick={()=>setOpen(open===i?null:i)}>{q}<b>+</b></button><div className="ans"><p>{a}</p></div></div>)}</div></section>

  <footer><div className="wrap fb"><Brand size={34}/><nav>{NAV.map(n=><a key={n} href={'#'+n.toLowerCase()}>{n}</a>)}</nav><span>Made with <i>♥</i> by SRJ</span></div></footer></div>}
