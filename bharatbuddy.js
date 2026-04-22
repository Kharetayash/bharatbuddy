/* ============ BharatBuddy — working prototype ============ */
const KEYS = { profile:'bb.profile', trips:'bb.trips', fav:'bb.favorites' };
const store = {
  get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch(e) { return fb; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
  del(k) { try { localStorage.removeItem(k); } catch(e){} }
};

const destinations = [
  { id:'jaipur', name:'Jaipur', state:'Rajasthan', tag:'Pink City', cat:'heritage', rating:4.8, img:'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800', about:'The Pink City is a UNESCO gem of royal palaces, bustling bazaars, and fiery Rajasthani cuisine. Golden hour at Nahargarh Fort is unmissable.' },
  { id:'goa', name:'Goa', state:'Goa', tag:'Beach vibes', cat:'beach', rating:4.7, img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', about:'Sun-drenched beaches, Portuguese colonial streets, fresh seafood shacks and the friendliest nightlife in India.' },
  { id:'varanasi', name:'Varanasi', state:'Uttar Pradesh', tag:'Spiritual heart', cat:'spiritual', rating:4.9, img:'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800', about:"One of the world's oldest continuously lived-in cities. Sunrise boat rides on the Ganges and the nightly Ganga Aarti are life-changing." },
  { id:'kerala', name:'Kerala Backwaters', state:'Kerala', tag:"God's own country", cat:'beach', rating:4.9, img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', about:'Glide through palm-fringed canals on a traditional houseboat, wake to coconut-curry breakfasts and temple bells.' },
  { id:'manali', name:'Manali', state:'Himachal Pradesh', tag:'Mountain escape', cat:'mountain', rating:4.6, img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', about:'Snowy Himalayan peaks, apple orchards, adventure sports in summer and powder skiing in winter. Backpacker favourite.' },
  { id:'agra', name:'Taj Mahal, Agra', state:'Uttar Pradesh', tag:'Wonder of the world', cat:'heritage', rating:5.0, img:'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800', about:'The eternal monument to love. Sunrise is the quietest and most photogenic time — book a skip-the-line slot.' },
  { id:'andaman', name:'Andaman Islands', state:'Andaman', tag:'Paradise beach', cat:'beach', rating:4.8, img:'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800', about:'Turquoise water, coral reefs, and some of the best diving in Asia. Radhanagar Beach ranks among the world top 10.' },
  { id:'ladakh', name:'Leh & Ladakh', state:'Ladakh', tag:'High desert', cat:'mountain', rating:4.9, img:'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800', about:'Moonscape monasteries, the highest motorable roads and star-soaked nights. Best May to September.' },
  { id:'ranthambore', name:'Ranthambore', state:'Rajasthan', tag:'Tiger country', cat:'wildlife', rating:4.7, img:'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800', about:'One of the best places on Earth to spot a wild Bengal tiger. Jeep safaris at dawn through ancient ruins.' },
  { id:'rishikesh', name:'Rishikesh', state:'Uttarakhand', tag:'Yoga capital', cat:'spiritual', rating:4.7, img:'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800', about:'The yoga and meditation capital of the world, nestled in the Himalayan foothills on the holy Ganges.' },
];

const hotelsByDest = {
  jaipur: [
    { id:'h-samode', name:'Samode Haveli', sub:'Heritage • 5-star', price:7400, rating:4.9, verified:true, img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
    { id:'h-zostel', name:'Zostel Jaipur', sub:'Hostel • Backpacker', price:690, rating:4.6, verified:true, img:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400' },
    { id:'h-pearl', name:'Hotel Pearl Palace', sub:'Boutique • Budget', price:2200, rating:4.7, verified:true, img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400' },
  ],
  goa: [
    { id:'h-taj-goa', name:'Taj Fort Aguada', sub:'Luxury • Beachfront', price:12500, rating:4.9, verified:true, img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
    { id:'h-antares', name:'Antares Beach Resort', sub:'Boutique • Vagator', price:4800, rating:4.7, verified:true, img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400' },
    { id:'h-mustache', name:'The Mustache Hostel', sub:'Backpacker • Anjuna', price:550, rating:4.5, verified:true, img:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400' },
  ],
  default: [
    { id:'h-default1', name:'Trust-Verified Stay', sub:'Boutique • Central', price:3200, rating:4.6, verified:true, img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400' },
    { id:'h-default2', name:'Local Budget Inn', sub:'Clean • Safe • Budget', price:900, rating:4.3, verified:true, img:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400' },
    { id:'h-default3', name:'Heritage Retreat', sub:'Traditional • Family', price:5400, rating:4.8, verified:true, img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
  ]
};
const eatsByDest = {
  jaipur: [
    { id:'e-lmb', name:'Laxmi Mishthan Bhandar (LMB)', sub:'Rajasthani Thali • Veg', price:450, rating:4.8, verified:true, img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
    { id:'e-tapri', name:'Tapri Central', sub:'Chai café • Rooftop view', price:250, rating:4.7, verified:true, img:'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400' },
    { id:'e-handi', name:'Handi Restaurant', sub:'Laal maas • Non-veg', price:800, rating:4.6, verified:true, img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
  ],
  default: [
    { id:'e-default1', name:'Local favorite thali', sub:'Veg • Family-run', price:320, rating:4.6, verified:true, img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
    { id:'e-default2', name:'Street food tour', sub:'3-hour guided • Small group', price:1200, rating:4.9, verified:true, img:'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400' },
    { id:'e-default3', name:'Seaside seafood shack', sub:'Fresh catch • Non-veg', price:650, rating:4.7, verified:true, img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
  ]
};
const travelByDest = {
  default: [
    { id:'t-shatabdi', name:'Shatabdi Express', sub:'Train • AC Chair Car', price:710, rating:4.5, verified:true, img:'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400' },
    { id:'t-ola', name:'Ola Cab (Airport)', sub:'Sedan • 24 km', price:520, rating:4.6, verified:true, img:'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400' },
    { id:'t-tuk', name:'Tuk-Tuk Day Pass', sub:'Auto-rickshaw • 8 hrs', price:900, rating:4.8, verified:true, img:'https://images.unsplash.com/photo-1565359751025-68cbeaec4b13?w=400' },
    { id:'t-royal', name:'Royal Enfield Rental', sub:'Bike • Full day', price:1400, rating:4.9, verified:true, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  ]
};
const copilotTips = {
  jaipur: "Near <b>Hawa Mahal, Jaipur</b>: dress modestly at forts, autos to Amber Fort ≈ <b>₹80</b>. Skip 'free guides' at the gate.",
  goa: "In <b>Goa</b>: beach shacks are the best value, always settle taxi price <i>before</i> boarding. Tipping 10% is standard.",
  varanasi: "<b>Varanasi ghats</b>: take shoes off entering temples. Photography is prohibited at cremation ghats. Morning aarti is free.",
  agra: "<b>Taj Mahal</b>: book sunrise slot online, closed Fridays, no tripods. Passport needed for the foreigner ticket line.",
  default: "Always use <b>pre-paid taxi booths</b> at airports, never unlabelled drivers. Auto meters should always be on."
};

let profile = store.get(KEYS.profile, null);
let trips = store.get(KEYS.trips, []);
let favorites = store.get(KEYS.fav, []);
let currentDest = destinations[0];
let currentTab = 'stay';
let lastVisitedDest = null;

function saveProfile() { store.set(KEYS.profile, profile); }
function saveTrips() { store.set(KEYS.trips, trips); renderTrips(); updateProfileStats(); }
function saveFav() { store.set(KEYS.fav, favorites); updateProfileStats(); refreshHearts(); }
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._to); t._to = setTimeout(() => t.classList.remove('show'), 1800);
}
function rupee(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function uid() { return 'tr_' + Date.now() + '_' + Math.random().toString(36).slice(2,6); }

/* ===== Onboarding ===== */
let obStep = 1;
let obData = { persona:'intl', language:'English' };
function obNext() {
  if (obStep === 1) {
    const name = document.getElementById('obName').value.trim();
    if (!name) { toast('Please enter your name'); return; }
    obData.name = name;
    obData.email = document.getElementById('obEmail').value.trim() || 'traveler@bharatbuddy.app';
  } else if (obStep === 2) {
    obData.currency = document.getElementById('obCurrency').value;
  }
  obStep++;
  document.querySelectorAll('.onboard .step').forEach(s => s.classList.toggle('on', +s.dataset.step === obStep));
}
function obFinish() {
  profile = {
    name: obData.name || 'Traveler',
    email: obData.email || 'traveler@bharatbuddy.app',
    persona: obData.persona || 'intl',
    currency: obData.currency || 'INR',
    language: obData.language || 'English',
    onboardedAt: Date.now()
  };
  saveProfile();
  document.getElementById('onboard').classList.remove('show');
  applyProfile();
  toast('Welcome, ' + profile.name.split(' ')[0] + '!');
}
document.querySelectorAll('#obPersona .choice').forEach(c => c.addEventListener('click', () => {
  document.querySelectorAll('#obPersona .choice').forEach(x => x.classList.remove('on'));
  c.classList.add('on'); obData.persona = c.dataset.v;
}));
document.querySelectorAll('#obLang .choice').forEach(c => c.addEventListener('click', () => {
  document.querySelectorAll('#obLang .choice').forEach(x => x.classList.remove('on'));
  c.classList.add('on'); obData.language = c.dataset.v;
}));

function applyProfile() {
  if (!profile) return;
  const greet = { intl:'Namaste, traveler 🙏', domestic:'Hi there 👋', backpacker:'Hey explorer 🎒', luxury:'Welcome back ✨' }[profile.persona] || 'Namaste 🙏';
  document.getElementById('greetText').textContent = greet;
  document.getElementById('greetName').textContent = profile.name;
  const initials = (profile.name || 'Y').trim().charAt(0).toUpperCase();
  document.getElementById('homeAvatar').textContent = initials;
  document.getElementById('profileAvatar').textContent = initials;
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileEmail').textContent = profile.email;
  document.getElementById('profileLang').textContent = profile.language;
  document.getElementById('statLang').textContent = (profile.language || 'EN').slice(0,2).toUpperCase();
}

/* ===== Render ===== */
function renderHomeDestRow() {
  document.getElementById('homeDestRow').innerHTML = destinations.slice(0,6).map(d => destCard(d)).join('');
}
function renderDestGrid(filter='all') {
  const grid = document.getElementById('destGrid');
  const list = filter==='all' ? destinations : destinations.filter(d => d.cat===filter);
  grid.innerHTML = list.length ? list.map(d => destCard(d)).join('') : '<div class="empty"><div class="big">🏜️</div>No destinations in this category yet.</div>';
}
function destCard(d) {
  const favd = favorites.includes(d.id);
  return `<div class="dest-card" onclick="openDetail('${d.id}')">
    <div class="bg" style="background-image:url('${d.img}');"></div>
    <div class="overlay"></div>
    <div class="badge">⭐ ${d.rating}</div>
    <button class="heart-btn ${favd ? 'fav' : ''}" data-dest="${d.id}" onclick="event.stopPropagation(); toggleFav('${d.id}')">♥</button>
    <div class="meta"><div class="name">${escapeHtml(d.name)}</div><div class="sub">📍 ${escapeHtml(d.state)} • ${escapeHtml(d.tag)}</div></div>
  </div>`;
}
function refreshHearts() {
  document.querySelectorAll('.heart-btn').forEach(h => h.classList.toggle('fav', favorites.includes(h.dataset.dest)));
  if (currentDest) {
    const dh = document.getElementById('detailHeart');
    if (dh) dh.classList.toggle('fav', favorites.includes(currentDest.id));
  }
}
function toggleFav(id) {
  const i = favorites.indexOf(id);
  if (i >= 0) { favorites.splice(i,1); toast('Removed from favorites'); }
  else { favorites.push(id); toast('Saved to favorites ❤'); }
  saveFav();
}
function toggleFavCurrent() { if (currentDest) toggleFav(currentDest.id); }

function openDetail(id) {
  currentDest = destinations.find(d => d.id===id) || destinations[0];
  lastVisitedDest = currentDest.id;
  document.getElementById('detailName').textContent = currentDest.name;
  document.getElementById('detailState').textContent = currentDest.state;
  document.getElementById('detailRating').textContent = currentDest.rating;
  document.getElementById('detailAbout').textContent = currentDest.about;
  document.getElementById('detailHero').style.backgroundImage = `url('${currentDest.img}')`;
  document.getElementById('detailHeart').classList.toggle('fav', favorites.includes(currentDest.id));
  updateCopilotTip();
  setTab('stay');
  go('detail');
}

function setTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.dd-tab').forEach(t => t.classList.toggle('active', t.dataset.tab===tab));
  const content = document.getElementById('tabContent');
  const data = {
    stay: hotelsByDest[currentDest.id] || hotelsByDest.default,
    eat: eatsByDest[currentDest.id] || eatsByDest.default,
    travel: travelByDest[currentDest.id] || travelByDest.default,
  };
  if (tab==='plan') { content.innerHTML = renderPlanTab(); return; }
  const labels = { stay:'per night', eat:'for two', travel:'total' };
  const types = { stay:'hotel', eat:'restaurant', travel:'travel' };
  content.innerHTML = renderList(data[tab], labels[tab], types[tab]);
}
function renderList(items, priceLabel, bookingType) {
  if (!items || !items.length) return '<div class="empty"><div class="big">🔎</div>Nothing here yet.</div>';
  return items.map(i => `<div class="list-card">
    <div class="thumb" style="background-image:url('${i.img}');"></div>
    <div class="info">
      <div class="title">${escapeHtml(i.name)} ${i.verified ? '<span class="ver">✓</span>' : ''}</div>
      <div class="sub">${escapeHtml(i.sub)}</div>
      <div class="meta"><span class="rating">★ ${i.rating}</span><span>Trust Verified</span></div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
      <div class="price">${rupee(i.price)}<small>${priceLabel}</small></div>
      <button class="book" data-book='${JSON.stringify({type:bookingType, item:i, destId: currentDest.id, destName: currentDest.name}).replace(/'/g, "&#39;")}' onclick='bookFromBtn(this)'>Book</button>
    </div>
  </div>`).join('');
}
function renderPlanTab() {
  return `<div style="text-align:center;padding:20px 10px;">
    <div style="font-size:48px;margin-bottom:6px;">✨</div>
    <h3 style="font-size:17px;font-weight:800;margin-bottom:6px;">Plan your ${escapeHtml(currentDest.name)} trip</h3>
    <p style="font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.5;">Trip Genie builds a full itinerary — stay, eat, travel — within your budget.</p>
    <button class="primary-btn" onclick="go('plan')">Launch Trip Genie →</button>
  </div>`;
}

/* ===== Booking ===== */
function bookFromBtn(btn) {
  try { bookItem(JSON.parse(btn.getAttribute('data-book').replace(/&#39;/g,"'"))); } catch(e){ console.error(e); }
}
function bookItem(payload) {
  const { type, item, destId, destName } = payload;
  const booking = {
    id: uid(), type, title: item.name, sub: item.sub,
    destName, destId, price: item.price,
    date: new Date(Date.now() + 3*24*60*60*1000).toISOString().slice(0,10),
    status: 'Confirmed', createdAt: Date.now()
  };
  trips.unshift(booking);
  saveTrips();
  openModalHtml(`<h3>✅ Booking confirmed!</h3>
    <p>We've saved <b>${escapeHtml(item.name)}</b> in <b>${escapeHtml(destName)}</b> to your trips.</p>
    <div style="background:#ECFDF5;border:1px solid #10B98133;border-radius:12px;padding:10px;color:#065f46;font-size:12.5px;line-height:1.5;margin-bottom:12px;">
      ✓ Free cancellation until 24 hrs before<br>✓ Pay at property available<br>✓ Trust-Verified vendor — 100% refund guarantee
    </div>
    <button class="primary-btn" onclick="closeModal(); go('trips')">View my trips →</button>
    <button class="primary-btn ghost" style="margin-top:8px;" onclick="closeModal()">Continue shopping</button>`);
  toast('Booking saved to My Trips');
}

function renderTrips() {
  const list = document.getElementById('tripsList');
  if (!trips.length) {
    list.innerHTML = `<div class="empty"><div class="big">🎫</div>No trips yet.<br><br><button class="primary-btn" onclick="go('explore')">Start exploring</button></div>`;
    return;
  }
  list.innerHTML = trips.map(t => tripCard(t)).join('');
}
function tripCard(t) {
  const gradient = {
    hotel: 'linear-gradient(135deg, var(--indigo), #4F46E5)',
    restaurant: 'linear-gradient(135deg, #E63946, #FF6B35)',
    travel: 'linear-gradient(135deg, #10B981, #059669)',
    itinerary: 'linear-gradient(135deg, var(--saffron), var(--gold))'
  }[t.type] || 'linear-gradient(135deg, var(--indigo), #4F46E5)';
  const typeLabel = { hotel:'Hotel', restaurant:'Restaurant', travel:'Travel', itinerary:'Trip Plan' }[t.type] || 'Booking';
  return `<div class="trip-ticket">
    <div class="tt-header" style="background:${gradient};">
      <span class="tt-type">${typeLabel} • ${escapeHtml(t.destName||'')}</span>
      <span class="tt-status">${escapeHtml(t.status||'Confirmed')}</span>
    </div>
    <div class="tt-body">
      <div class="tt-title">${escapeHtml(t.title)}</div>
      <div class="tt-sub">${escapeHtml(t.sub||'')}</div>
      <div class="tt-row"><div>Date<b>${escapeHtml(t.date||'')}</b></div><div style="text-align:right;">Total<b>${rupee(t.price||0)}</b></div></div>
      <button class="tt-cancel" onclick="cancelTrip('${t.id}')">Cancel booking</button>
    </div>
  </div>`;
}
function cancelTrip(id) {
  trips = trips.filter(t => t.id !== id);
  saveTrips();
  toast('Booking cancelled');
}

/* ===== Search ===== */
function buildSearchIndex() {
  const idx = [];
  destinations.forEach(d => idx.push({ type:'Destination', title:d.name, sub:`${d.state} • ${d.tag}`, img:d.img, go:() => openDetail(d.id), hay:`${d.name} ${d.state} ${d.tag} ${d.cat}`.toLowerCase() }));
  Object.entries(hotelsByDest).forEach(([destId, arr]) => {
    const dest = destinations.find(x => x.id===destId);
    arr.forEach(h => idx.push({ type:'Hotel', title:h.name, sub:`${h.sub} • ${rupee(h.price)}${dest?' • '+dest.name:''}`, img:h.img, go:() => { if (dest) { openDetail(dest.id); setTab('stay'); } else { go('explore'); } }, hay:`${h.name} ${h.sub} hotel stay`.toLowerCase() }));
  });
  Object.entries(eatsByDest).forEach(([destId, arr]) => {
    const dest = destinations.find(x => x.id===destId);
    arr.forEach(e => idx.push({ type:'Restaurant', title:e.name, sub:`${e.sub} • ${rupee(e.price)}${dest?' • '+dest.name:''}`, img:e.img, go:() => { if (dest) { openDetail(dest.id); setTab('eat'); } else { go('explore'); } }, hay:`${e.name} ${e.sub} food eat restaurant`.toLowerCase() }));
  });
  (travelByDest.default||[]).forEach(tr => idx.push({ type:'Travel', title:tr.name, sub:`${tr.sub} • ${rupee(tr.price)}`, img:tr.img, go:() => { openDetail(destinations[0].id); setTab('travel'); }, hay:`${tr.name} ${tr.sub} train taxi travel ride`.toLowerCase() }));
  return idx;
}
const searchIndex = buildSearchIndex();

function runSearch(q) {
  const si = document.getElementById('searchInput'); if (si && si.value !== q) si.value = q;
  const hs = document.getElementById('homeSearch'); if (hs && hs.value !== q) hs.value = q;
  const query = (q||'').toLowerCase().trim();
  const container = document.getElementById('searchResults');
  if (!query) {
    container.innerHTML = `<div class="empty"><div class="big">🔍</div>Try "goa", "taj", "laal maas", "train", or "mountain".</div>`;
    return;
  }
  const matches = searchIndex.filter(x => x.hay.includes(query)).slice(0, 20);
  if (!matches.length) {
    container.innerHTML = `<div class="empty"><div class="big">🤔</div>No results for "<b>${escapeHtml(q)}</b>".</div>`;
    return;
  }
  container.innerHTML = matches.map((m,i) => `<div class="list-card" onclick="searchGo(${i})">
    <div class="thumb" style="background-image:url('${m.img}');"></div>
    <div class="info">
      <div class="title">${escapeHtml(m.title)}</div>
      <div class="sub">${escapeHtml(m.sub)}</div>
      <div class="meta"><span style="background:var(--indigo);color:white;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:800;">${m.type}</span></div>
    </div>
  </div>`).join('');
  window._searchMatches = matches;
}
function searchGo(i) {
  const m = (window._searchMatches||[])[i];
  if (m) m.go();
}

function quickAction(tab) {
  openDetail(lastVisitedDest || destinations[0].id);
  setTab(tab);
}

/* ===== Routing ===== */
function go(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + name);
  if (target) { target.classList.add('active'); target.scrollTop = 0; }
  document.querySelectorAll('.bn').forEach(n => n.classList.toggle('active', n.dataset.go===name));
  const lightHeader = ['home','plan','sos','detail','profile'].includes(name);
  document.getElementById('statusBar').style.color = lightHeader ? 'white' : 'var(--ink)';
  if (name==='search') setTimeout(() => { const s = document.getElementById('searchInput'); if (s) s.focus(); }, 100);
  if (name==='trips') renderTrips();
  if (name==='profile') updateProfileStats();
}
document.querySelectorAll('.bn').forEach(n => n.addEventListener('click', () => go(n.dataset.go)));
document.querySelectorAll('#filterRow .f').forEach(f => {
  f.addEventListener('click', () => {
    document.querySelectorAll('#filterRow .f').forEach(x => x.classList.remove('on'));
    f.classList.add('on');
    renderDestGrid(f.dataset.filter);
  });
});

/* ===== Trip Genie ===== */
document.querySelectorAll('#interestRow .pill').forEach(p => p.addEventListener('click', () => p.classList.toggle('on')));

function runGenie() {
  const budget = Math.max(3000, parseInt((document.getElementById('gBudget').value||'').replace(/\D/g,'')) || 15000);
  const days = Math.max(1, Math.min(14, parseInt(document.getElementById('gDays').value) || 4));
  const interests = [...document.querySelectorAll('#interestRow .pill.on')].map(p => p.dataset.int);
  const catMap = { Food:'heritage', History:'heritage', Beach:'beach', Mountain:'mountain', Spiritual:'spiritual', Wildlife:'wildlife', Nightlife:'beach' };
  const cats = [...new Set(interests.map(i => catMap[i]).filter(Boolean))];
  let picks = destinations.filter(d => cats.includes(d.cat));
  if (picks.length < 2) picks = destinations.slice(0, 3);
  picks = picks.slice(0, Math.min(3, days));
  const stay  = Math.round(budget * 0.42);
  const food  = Math.round(budget * 0.18);
  const travel= Math.round(budget * 0.28);
  const exp   = budget - stay - food - travel;
  const templates = [
    { act:'Sunrise visit', when:'6:30 AM' },
    { act:'Cultural walking tour with verified guide', when:'9:30 AM' },
    { act:'Local thali at Trust-Verified restaurant', when:'1:00 PM' },
    { act:'Heritage / market exploration', when:'3:30 PM' },
    { act:'Sunset viewpoint + chai', when:'6:00 PM' },
    { act:'Dinner with live folk music', when:'8:30 PM' },
  ];
  let html = `<div class="budget-summary">
    <div class="bs-row"><span>🏨 Stay</span><b>${rupee(stay)}</b></div>
    <div class="bs-row"><span>🍛 Food</span><b>${rupee(food)}</b></div>
    <div class="bs-row"><span>🚗 Travel</span><b>${rupee(travel)}</b></div>
    <div class="bs-row"><span>🎟️ Experiences</span><b>${rupee(exp)}</b></div>
    <div class="bs-total"><span>Total estimate</span><span>${rupee(budget)}</span></div>
  </div>`;
  const dailyBudget = Math.round(budget/days);
  for (let day=1; day<=days; day++) {
    const dest = picks[(day-1) % picks.length];
    const subset = templates.slice(0, 4 + (day%2));
    html += `<div class="itin-card">
      <div class="itin-day">
        <div class="num">${day}</div>
        <div><div class="title">Day ${day}</div><div class="loc">📍 ${escapeHtml(dest.name)}, ${escapeHtml(dest.state)}</div></div>
      </div>
      ${subset.map(s => `<div class="itin-step">
        <div class="time">${s.when}</div>
        <div class="act">${s.act}</div>
        <div class="desc">${escapeHtml(dest.tag)} — ${escapeHtml(dest.about.split('.')[0])}.</div>
        <div class="cost">${rupee(Math.round(dailyBudget/subset.length))} budgeted</div>
      </div>`).join('')}
    </div>`;
  }
  const picksNames = picks.map(p => p.name);
  html += `<button class="primary-btn" data-genie='${JSON.stringify({budget, days, names: picksNames}).replace(/'/g, "&#39;")}' onclick='saveGenieFromBtn(this)'>📦 Save this trip to My Trips</button>`;
  html += `<button class="primary-btn ghost" style="margin-top:8px;" onclick="go('trips')">View all my trips</button>`;
  const out = document.getElementById('itinOut');
  out.innerHTML = html;
  out.classList.add('show');
  setTimeout(() => out.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
}
function saveGenieFromBtn(btn) {
  try {
    const { budget, days, names } = JSON.parse(btn.getAttribute('data-genie').replace(/&#39;/g,"'"));
    const booking = {
      id: uid(), type:'itinerary',
      title: `${days}-day AI trip`,
      sub: names.join(' → '),
      destName: names[0] || 'India',
      destId: (destinations.find(d => d.name===names[0])||{}).id || 'multi',
      price: budget,
      date: new Date(Date.now() + 7*24*60*60*1000).toISOString().slice(0,10),
      status: 'Saved', createdAt: Date.now()
    };
    trips.unshift(booking);
    saveTrips();
    toast('Trip saved! ✨');
    setTimeout(() => go('trips'), 600);
  } catch(e) { console.error(e); }
}

/* ===== Co-pilot tip ===== */
function updateCopilotTip() {
  const key = (currentDest && currentDest.id) || lastVisitedDest || 'default';
  document.getElementById('copilotTip').innerHTML = copilotTips[key] || copilotTips.default;
}

/* ===== Profile ===== */
function updateProfileStats() {
  document.getElementById('statTrips').textContent = trips.length;
  document.getElementById('statFav').textContent = favorites.length;
  document.getElementById('bookingCount').textContent = `${trips.length} trip${trips.length===1?'':'s'} saved`;
  document.getElementById('favCount').textContent = `${favorites.length} destination${favorites.length===1?'':'s'}`;
}
function showFavorites() {
  if (!favorites.length) {
    openModalHtml(`<h3>No favorites yet</h3><p>Tap the ♥ on any destination card to save it for later.</p><button class="primary-btn" onclick="closeModal(); go('explore')">Explore destinations</button>`);
    return;
  }
  const items = favorites.map(id => destinations.find(d => d.id===id)).filter(Boolean);
  openModalHtml(`<h3>Your saved destinations</h3>
    ${items.map(d => `<div class="list-card" onclick="closeModal(); openDetail('${d.id}')">
      <div class="thumb" style="background-image:url('${d.img}');"></div>
      <div class="info"><div class="title">${escapeHtml(d.name)}</div><div class="sub">${escapeHtml(d.state)} • ${escapeHtml(d.tag)}</div></div>
      <div class="price">⭐ ${d.rating}</div>
    </div>`).join('')}
    <button class="primary-btn ghost" onclick="closeModal()">Close</button>`);
}

/* ===== Modals ===== */
function openModalHtml(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalBg').classList.add('show');
}
const modals = {
  copilot: () => {
    const key = lastVisitedDest || 'default';
    const tip = copilotTips[key] || copilotTips.default;
    return `<h3>🧭 Cultural Co-pilot</h3>
      <p>${tip}</p>
      <p>Three more things that will make your trip smoother:</p>
      <p>• <b>Dress respectfully</b> — shoulders/knees covered at temples &amp; forts.</p>
      <p>• <b>Tipping</b> — 10% at sit-down restaurants. Round up for auto drivers.</p>
      <p>• <b>Scam heads-up</b> — always use app-booked rides from airports.</p>
      <p style="font-weight:700;color:var(--indigo);">Get tips in:</p>
      <div class="lang-chip-row">${['English','हिन्दी','Français','Deutsch','日本語','Español'].map(l => `<div class="lang-chip ${profile && profile.language===l ? 'on' : ''}" onclick="setLanguage('${l}')">${l}</div>`).join('')}</div>`;
  },
  sosCall: () => `<h3>🚨 Connecting you now…</h3>
    <p>Sharing your location, language (<b>${escapeHtml((profile||{}).language||'English')}</b>), and emergency contact with the nearest verified service.</p>
    <div style="background:#FEF2F2;border:1px solid var(--sos);border-radius:12px;padding:12px;margin-bottom:10px;">
      <div style="font-size:12px;color:var(--muted);font-weight:700;">CONNECTED TO</div>
      <div style="font-size:16px;font-weight:800;margin-top:3px;">Tourist Police HQ</div>
      <div style="font-size:12px;color:var(--muted);margin-top:2px;">0141-2619100 • English support available</div>
    </div>
    <button class="primary-btn sos" onclick="closeModal()">I'm safe now — end call</button>`,
  scam: () => `<h3>⚠️ Report a scam</h3>
    <p>Your report will be verified and posted to the Cultural Co-pilot within 24 hours.</p>
    <div class="field"><label>What happened?</label><textarea id="scamDesc" placeholder="e.g. Overpriced taxi outside New Delhi Railway Station…"></textarea></div>
    <button class="primary-btn sos" onclick="submitScam()">Submit report</button>`,
  langSwitch: () => `<h3>Choose language</h3>
    <p>BharatBuddy will translate tips, emergency calls, and booking confirmations into your chosen language.</p>
    <div class="lang-chip-row">${['English','हिन्दी','Français','Deutsch','日本語','Español'].map(l => `<div class="lang-chip ${profile && profile.language===l ? 'on' : ''}" onclick="setLanguage('${l}')">${l}</div>`).join('')}</div>`,
  logout: () => `<h3>Sign out &amp; clear data?</h3>
    <p>This will wipe your bookings, favorites, and profile from this device. You'll go back to onboarding.</p>
    <button class="primary-btn sos" onclick="wipeAll()">Yes, clear everything</button>
    <button class="primary-btn ghost" style="margin-top:8px;" onclick="closeModal()">Cancel</button>`
};
function openModal(key) { const fn = modals[key]; if (fn) openModalHtml(fn()); }
function closeModal() { document.getElementById('modalBg').classList.remove('show'); }
document.getElementById('modalBg').addEventListener('click', e => { if (e.target.id === 'modalBg') closeModal(); });

function setLanguage(l) {
  if (!profile) profile = { name:'Traveler', email:'traveler@bharatbuddy.app', persona:'intl', currency:'INR', language:'English' };
  profile.language = l;
  saveProfile(); applyProfile();
  toast('Language: ' + l);
  closeModal();
}
function submitScam() {
  const txt = (document.getElementById('scamDesc')||{}).value || '';
  if (txt.trim().length < 5) { toast('Add a few more details'); return; }
  toast('Report submitted. Thank you 🙏');
  closeModal();
}
function wipeAll() {
  store.del(KEYS.profile); store.del(KEYS.trips); store.del(KEYS.fav);
  profile = null; trips = []; favorites = [];
  closeModal();
  document.getElementById('onboard').classList.add('show');
  obStep = 1;
  document.querySelectorAll('.onboard .step').forEach(s => s.classList.toggle('on', +s.dataset.step === 1));
  document.getElementById('obName').value = '';
  document.getElementById('obEmail').value = '';
  renderHomeDestRow(); renderDestGrid('all'); go('home');
  toast('Data cleared');
}

/* ===== PWA install ===== */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('installBtn');
  if (btn) { btn.disabled = false; btn.textContent = '📱 Install BharatBuddy'; }
});
const installBtn = document.getElementById('installBtn');
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
    else { toast('On iPhone: Share → Add to Home Screen'); }
  });
}
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

/* ===== Init ===== */
renderHomeDestRow();
renderDestGrid('all');
updateCopilotTip();
if (!profile) { document.getElementById('onboard').classList.add('show'); }
else { applyProfile(); }
renderTrips();
updateProfileStats();
