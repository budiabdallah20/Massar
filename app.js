/* ═══════════════════════════════════════════════
   مَسَار — MASAR v10.0.0
   Complete Application Logic
   ═══════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════ */
const CONFIG = {
  city: 'Suez',
  country: 'Egypt',
  latitude: 29.9737,
  longitude: 32.5263,
  prayerMethod: 5,
  sportsApiKey: '3',
  birthday: { month: 10, day: 24, year: 2006 },
  autoApproveHours: 2,
  storageKey: 'masar_v10_state',
  chatKey: 'masar_v10_chat',
  lovedKey: 'masar_v10_loved',
  badgesKey: 'masar_v10_badges',
};

/* ═══════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════ */
const VERSES = [
  { text:'﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾', ref:'سورة طه · ١١٤', wisdom:'«الوقتُ كالسيفِ إن لم تقطعهُ قطعك»' },
  { text:'﴿ وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ ﴾', ref:'سورة النجم · ٣٩', wisdom:'«المؤمنُ القويُّ خيرٌ من المؤمنِ الضعيف»' },
  { text:'﴿ وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ ﴾', ref:'سورة النجم · ٤٠', wisdom:'«أحبُّ الأعمالِ إلى اللهِ ما داومَ عليهِ صاحبه»' },
  { text:'﴿ وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ فِي إِمَامٍ مُّبِينٍ ﴾', ref:'سورة يس · ١٢', wisdom:'«قيّدوا العلمَ بالكتابة»' },
  { text:'﴿ وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ﴾', ref:'سورة العصر · ١-٢', wisdom:'«نعمتان مغبون فيهما: الصحة والفراغ»' },
  { text:'﴿ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا ﴾', ref:'سورة النساء · ١٠٣', wisdom:'«الوقت أنفس ما تملك»' },
  { text:'﴿ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ ﴾', ref:'سورة هود · ٨٨', wisdom:'«نظّم حياتك — تسعد أيامك»' },
  { text:'﴿ وَفِي ذَٰلِكَ فَلْيَتَنَافَسِ الْمُتَنَافِسُونَ ﴾', ref:'سورة المطففين · ٢٦', wisdom:'«مَن جَدَّ وَجَد»' },
];

const QUOTES = [
  '«اِعمل بجد في صمت، وخلّي نجاحك هو اللي يتكلم»',
  '«النجاح مش صدفة، ده نتيجة تعب مستمر»',
  '«كل يوم بتحاول فيه، بتقرب خطوة من حلمك»',
  '«مفيش مستحيل على اللي بيثق في ربنا وبيشتغل»',
  '«الطريق الطويل بيبدأ بخطوة»',
  '«افشل تتعلم، متعلمش تفشل»',
  '«اللي بيحلم بالنجاح لازم يصحى بدري عشان يحققه»',
  '«قوّي نفسك قبل ما الحياة تقوّيك»',
];

const AFFIRMATIONS = [
  'أنا قادر أوصل لأي حاجة أحطها في دماغي ✨',
  'أنا أستحق النجاح والسعادة 🌟',
  'كل يوم بمر، بعلم حاجة جديدة 💡',
  'أنا قوي، وأقدر أتحدى أي صعوبة 💪',
  'أنا شاكر لكل حاجة عندي 🙏',
  'ثقي في نفسك، إنت أحسن مما تتصور 🌈',
  'الصبر مفتاح الفرج، وأنا صبور 🗝️',
];

const DAILY_TIPS = [
  'قسم مهامك الكبيرة لمهام صغيرة',
  'خد بريك 5 دقايق كل 25 دقيقة تركيز',
  'اكتب أهم 3 مهام لازم تخلصها النهاردة',
  'المذاكرة في الصباح الباكر أفضل من السهر',
  'اشرب ماء كتير — دماغك محتاج 2 لتر يومياً',
  'ابتعد عن الموبايل أول ساعة من الصحيان',
  'راجع مهامك قبل النوم بـ10 دقايق',
  'خصص وقت للرياضة — العقل السليم في الجسم السليم',
  'قول "لأ" للمهام اللي مش أولوية',
  'خلي مكان مذاكرتك منظم',
  'طريقة "2 دقيقة" — لو حاجة أقل من دقيقتين اعملها فوراً',
  'اكتب 3 حاجات إنت ممتن ليها كل يوم',
  'نم 7-8 ساعات — دماغك محتاج يريح',
  'خصص يوم في الأسبوع للراحة الكاملة',
  'اسمع موسيقى هادية أثناء المذاكرة',
];

const CHALLENGES = [
  { text: 'خلّص 3 مهام قبل الظهر', reward: 50 },
  { text: 'اعمل جلسة بومودورو كاملة', reward: 30 },
  { text: 'اشرب 8 أكواب ماء', reward: 40 },
  { text: 'صلّي الخمس فروض في وقتهم', reward: 100 },
  { text: 'اقرأ 20 صفحة من أي كتاب', reward: 60 },
  { text: 'سبح 100 تسبيحة', reward: 35 },
  { text: 'اكتب يومية كاملة', reward: 45 },
];

const PRAYER_NAMES = [
  { id:'fajr', ar:'الفجر', icon:'fa-cloud-moon' },
  { id:'dhuhr', ar:'الظهر', icon:'fa-sun' },
  { id:'asr', ar:'العصر', icon:'fa-cloud-sun' },
  { id:'maghrib', ar:'المغرب', icon:'fa-cloud-moon' },
  { id:'isha', ar:'العشاء', icon:'fa-moon' },
];

const LECTURES = [
  { day:'mon', dayAr:'الاثنين', items:[
    { id:'mon_1', time:'10:30', name:'هندسة تحليلية', nameEn:'Analytical Geometry', teacher:'د/ أحمد سيد', hall:'قاعة 2', type:'lecture' },
    { id:'mon_2', time:'12:30', name:'نظم تصميم', nameEn:'Systems Design', teacher:'أ.د/ محمد رمضان', hall:'معمل 1', type:'lecture' },
  ]},
  { day:'tue', dayAr:'الثلاثاء', items:[
    { id:'tue_1', time:'08:30', name:'معدلات تفاضلية', nameEn:'Differential Equations', teacher:'أ.د/ محمد رمضان', hall:'مدرج A', type:'lecture' },
    { id:'tue_2', time:'10:30', name:'مكانيكا', nameEn:'Mechanics', teacher:'د/ وليد سيد', hall:'مدرج A', type:'lecture' },
    { id:'tue_3', time:'12:30', name:'سكشن معدلات', nameEn:'Diff. Section', teacher:'مجموعة B', hall:'قاعة 3', type:'section' },
    { id:'tue_4', time:'14:30', name:'منطق رياضي', nameEn:'Math Logic', teacher:'د/ طارق إمام', hall:'قاعة 1', type:'lecture' },
  ]},
  { day:'wed', dayAr:'الأربعاء', items:[
    { id:'wed_1', time:'10:30', name:'سكشن تحليل عددي', nameEn:'Numerical Section', teacher:'مجموعة B', hall:'قاعة 2', type:'section' },
    { id:'wed_2', time:'12:30', name:'تحليل عددي', nameEn:'Numerical Analysis', teacher:'د/ سامح فؤاد', hall:'مدرج B', type:'lecture' },
  ]},
  { day:'thu', dayAr:'الخميس', items:[
    { id:'thu_1', time:'08:30', name:'سكشن هندسة تحليلية', nameEn:'Geometry Section', teacher:'م.م/ أسماء', hall:'قاعة 2', type:'section' },
    { id:'thu_2', time:'12:30', name:'نظرية الرواسم', nameEn:'Number Theory', teacher:'أ.م.د/ محمد رمضان', hall:'قاعة 1', type:'lecture' },
    { id:'thu_3', time:'14:30', name:'تحليل وتصميم نظم', nameEn:'Systems Design', teacher:'—', hall:'معمل', type:'lecture' },
  ]},
];

const BADGES = [
  { id:'first_task', emoji:'🌱', name:'البداية', desc:'أول مهمة', check:s => s.tasks.filter(t=>t.done).length >= 1 },
  { id:'task_5', emoji:'⭐', name:'مجتهد', desc:'5 مهام', check:s => s.tasks.filter(t=>t.done).length >= 5 },
  { id:'task_20', emoji:'💪', name:'محترف', desc:'20 مهمة', check:s => s.tasks.filter(t=>t.done).length >= 20 },
  { id:'task_50', emoji:'🏆', name:'أسطورة', desc:'50 مهمة', check:s => s.tasks.filter(t=>t.done).length >= 50 },
  { id:'streak_3', emoji:'🔥', name:'مستمر', desc:'Streak 3 أيام', check:() => calculateStreak() >= 3 },
  { id:'streak_7', emoji:'💎', name:'ثابت', desc:'Streak 7 أيام', check:() => calculateStreak() >= 7 },
  { id:'streak_30', emoji:'👑', name:'ملك الانضباط', desc:'Streak 30', check:() => calculateStreak() >= 30 },
  { id:'note_5', emoji:'📝', name:'كاتب', desc:'5 ملاحظات', check:s => s.notes.length >= 5 },
  { id:'note_20', emoji:'📚', name:'مؤلف', desc:'20 ملاحظة', check:s => s.notes.length >= 20 },
  { id:'loved_3', emoji:'💕', name:'محبوب', desc:'3 أحباب', check:() => lovedOnes.length >= 3 },
  { id:'fofa_chat', emoji:'🤖', name:'صديق فوفا', desc:'10 رسائل', check:() => chatLog.length >= 10 },
  { id:'lecture_10', emoji:'🎓', name:'محاضر', desc:'10 حضورات', check:s => Object.values(s.lectureAttendance || {}).reduce((a,b) => a+b, 0) >= 10 },
  { id:'moment_5', emoji:'📸', name:'مصور', desc:'5 ذكريات', check:s => (s.moments||[]).length >= 5 },
  { id:'mood_7', emoji:'😊', name:'واعي', desc:'7 أيام مزاج', check:s => Object.keys(s.moods||{}).length >= 7 },
  { id:'prayer_5', emoji:'🕌', name:'مصلي', desc:'5 فروض في يوم', check:s => {
      const today = todayISO();
      const p = s.prayerLog?.[today] || {};
      return Object.values(p).filter(Boolean).length >= 5;
  }},
  { id:'tasbeeh_100', emoji:'📿', name:'ذاكر', desc:'100 تسبيحة', check:s => (s.tasbeehTotal||0) >= 100 },
  { id:'tasbeeh_1000', emoji:'🌟', name:'تقي', desc:'1000 تسبيحة', check:s => (s.tasbeehTotal||0) >= 1000 },
  { id:'pomodoro_5', emoji:'🍅', name:'مركز', desc:'5 جلسات', check:s => {
      const today = todayISO();
      return (s.pomoSessions?.[today] || 0) >= 5;
  }},
  { id:'water_8', emoji:'💧', name:'مروي', desc:'8 أكواب', check:s => {
      const today = todayISO();
      return (s.waterLog?.[today] || 0) >= 8;
  }},
  { id:'goal_achieve', emoji:'🎯', name:'محقق', desc:'هدف محقق', check:s => (s.goals||[]).some(g => g.current >= g.target) },
  { id:'book_done', emoji:'📖', name:'قارئ', desc:'كتاب مكتمل', check:s => (s.books||[]).some(b => b.current >= b.pages) },
  { id:'habit_7', emoji:'🔁', name:'منتظم', desc:'عادة 7 أيام', check:s => (s.habits||[]).some(h => Object.keys(h.log||{}).length >= 7) },
  { id:'journal_10', emoji:'📔', name:'مفكر', desc:'10 مذكرات', check:s => (s.journal||[]).length >= 10 },
];

const LEVELS = [
  { lv:1, xp:0, name:'مبتدئ' }, { lv:2, xp:100, name:'متعلم' },
  { lv:3, xp:300, name:'مجتهد' }, { lv:4, xp:600, name:'متقدم' },
  { lv:5, xp:1000, name:'محترف' }, { lv:6, xp:1500, name:'خبير' },
  { lv:7, xp:2200, name:'ماهر' }, { lv:8, xp:3000, name:'أسطورة' },
  { lv:9, xp:4000, name:'بطل' }, { lv:10, xp:5000, name:'ملك' },
];

/* ═══════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════ */
let state = {
  tasks: [], notes: [], appointments: [], moods: {}, moments: [],
  expenses: [], goals: [], habits: [], books: [], flashcards: [],
  journal: [], vision: [], medicines: [], weights: [], places: [],
  lectureAttendance: {}, prayerLog: {},
  tasbeeh: { count:0, target:33, dhikr:'سُبْحَانَ اللَّهِ' }, tasbeehTotal:0,
  waterLog: {}, sleepLog: {}, exerciseLog: {}, stepsLog: {},
  breathLog: {}, pomoConfig:{ focus:25, break:5 },
  pomoSessions:{}, pomoMinutes:{},
  xp:0, coins:0, completedChallenges:[],
  currentChallenge:null,
  taskFilter:'all', taskView:'list', currentLeague:'4328',
  prayers:null, nextPrayerData:null,
  theme:'dark', currentVerse:0, currentQuote:0, currentAffirmation:0,
  notificationsEnabled:false, focusMode:false, voiceEnabled:true,
  prayerAlertsEnabled:true, lectureAlertsEnabled:true,
  visualEffects:true, bgEnabled:true, aosEnabled:true, pinEnabled:false,
  pin:null, profilePhoto:null, profileName:'محمد عبد الله', profileBio:'Full Stack Dev',
  selectedLectureDay:null,
  pomoState:{ running:false, mode:'focus', remaining:25*60, total:25*60, interval:null },
  breathState:{ running:false, phase:'inhale', count:0, interval:null },
};

let lovedOnes = [];
let chatLog = [];
let isRecording = false;
let recognition = null;
let notificationTimers = [];
let autoApproveInterval = null;
let lectureTasksGeneratedForDate = null;
let charts = {};
let mainMap = null;
let mapMarkers = [];
let bgScene = null;

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatDateAr(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const days = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

function formatTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':');
  let hour = parseInt(h);
  const ampm = hour >= 12 ? 'م' : 'ص';
  hour = hour % 12 || 12;
  return `${hour}:${m} ${ampm}`;
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function showToast(msg, icon = 'fa-check-circle') {
  const t = $('toast');
  if (!t) return;
  const iconEl = t.querySelector('i');
  if (iconEl) iconEl.className = `fa-solid ${icon}`;
  const textEl = $('toastText');
  if (textEl) textEl.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

function showLoader(text = 'جاري التحميل...') {
  const s = $('loadingScreen');
  const t = $('loaderText');
  if (t) t.textContent = text;
  if (s) s.classList.remove('hide');
}
function hideLoader() {
  const s = $('loadingScreen');
  if (s) s.classList.add('hide');
}

function launchConfetti(count = 40) {
  const colors = ['#f97316','#fbbf24','#ec4899','#8b5cf6','#06b6d4','#16a34a','#dc2626'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    piece.style.animationDelay = (Math.random() * 0.3) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

function vibrate(pattern = 30) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

/* ═══════════════════════════════════════════
   STORAGE
   ═══════════════════════════════════════════ */
function saveState() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
  } catch (e) { console.error('Save failed:', e); }
}

function loadState() {
  try {
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (saved) {
      const p = JSON.parse(saved);
      Object.keys(p).forEach(k => {
        if (k in state) state[k] = p[k];
      });
    }
    const l = localStorage.getItem(CONFIG.lovedKey);
    if (l) lovedOnes = JSON.parse(l);
    const c = localStorage.getItem(CONFIG.chatKey);
    if (c) {
      try { chatLog = JSON.parse(decodeURIComponent(escape(atob(c)))); } catch(e) {}
    }
  } catch (e) { console.error('Load failed:', e); }
}

function saveLoved() {
  try { localStorage.setItem(CONFIG.lovedKey, JSON.stringify(lovedOnes)); } catch(e) {}
}

function saveChat() {
  try {
    const trimmed = chatLog.slice(-30);
    localStorage.setItem(CONFIG.chatKey, btoa(unescape(encodeURIComponent(JSON.stringify(trimmed)))));
  } catch(e) {}
}

/* ═══════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  state.theme = theme;
  $$('.theme-swatch').forEach(s => s.classList.toggle('active', s.dataset.theme === theme));
  const colors = { dark:'#0a0a0a', light:'#f5f5f5', ocean:'#041e2e', gold:'#1a1208', purple:'#0f0520', rose:'#1a0810' };
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', colors[theme] || '#0a0a0a');
  const icon = document.querySelector('#themeToggle i');
  if (icon) icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  saveState();
}

function toggleTheme() {
  const themes = ['dark','light','ocean','purple','rose','gold'];
  const idx = themes.indexOf(state.theme);
  const next = themes[(idx+1) % themes.length];
  applyTheme(next);
  showToast(`تم تغيير الثيم 🎨`);
}

function toggleVisualEffects() {
  state.visualEffects = !state.visualEffects;
  document.body.classList.toggle('no-fx', !state.visualEffects);
  const btn = $('visualEffectsToggle');
  if (btn) btn.textContent = state.visualEffects ? 'مفعّل' : 'مقفول';
  saveState();
}

function toggleBackground() {
  state.bgEnabled = !state.bgEnabled;
  document.body.classList.toggle('no-bg', !state.bgEnabled);
  const btn = $('bgToggle');
  if (btn) btn.textContent = state.bgEnabled ? 'مفعّلة' : 'مقفولة';
  saveState();
}

function toggleAOS() {
  state.aosEnabled = !state.aosEnabled;
  const btn = $('aosToggle');
  if (btn) btn.textContent = state.aosEnabled ? 'مفعّلة' : 'مقفولة';
  saveState();
}

function toggleVoice() {
  state.voiceEnabled = !state.voiceEnabled;
  const btn = $('voiceToggle');
  if (btn) btn.textContent = state.voiceEnabled ? 'مفعّل' : 'مقفول';
  saveState();
}

function toggleFocusMode() {
  state.focusMode = !state.focusMode;
  document.body.classList.toggle('focus-mode', state.focusMode);
  const btn = $('focusToggle');
  if (btn) btn.classList.toggle('active', state.focusMode);
  showToast(state.focusMode ? '🎯 وضع التركيز مفتوح' : '✨ رجعنا للوضع العادي');
  saveState();
}

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */
function switchTab(tab) {
  $$('.tab-content').forEach(el => el.classList.remove('active'));
  $$('.nav-tab').forEach(el => el.classList.remove('active'));
  const target = $(`tab-${tab}`);
  if (target) target.classList.add('active');
  const btn = document.querySelector(`.nav-tab[data-tab="${tab}"]`);
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (tab === 'dashboard') setTimeout(renderCharts, 100);
  if (tab === 'map') setTimeout(initMap, 200);
}

function closeModal(id) {
  const el = $(id);
  if (el) el.classList.remove('open');
}

/* ═══════════════════════════════════════════
   CLOCK & BIRTHDAY
   ═══════════════════════════════════════════ */
function updateLiveClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  const clockEl = $('liveClock');
  if (clockEl) clockEl.textContent = `${hh}:${mm}:${ss}`;
  const days = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const dateEl = $('liveDate');
  if (dateEl) dateEl.textContent = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
  updateQuickInfo();
}

function updateQuickInfo() {
  const now = new Date();
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('qiDate', now.toLocaleDateString('ar-EG'));
  set('qiTime', now.toLocaleTimeString('ar-EG', {hour:'2-digit', minute:'2-digit'}));
  const start = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now - start) / 86400000) + 1;
  set('qiDayOfYear', dayOfYear);
  const end = new Date(now.getFullYear(), 11, 31);
  const daysLeft = Math.floor((end - now) / 86400000);
  set('qiDaysLeft', daysLeft);
  set('qiWeekLeft', Math.floor(daysLeft / 7));
  set('qiWeek', `الأسبوع ${Math.ceil(dayOfYear / 7)}`);
}

function updateBirthday() {
  const now = new Date();
  const cy = now.getFullYear();
  let next = new Date(cy, CONFIG.birthday.month - 1, CONFIG.birthday.day);
  if (next < now) next = new Date(cy + 1, CONFIG.birthday.month - 1, CONFIG.birthday.day);
  const diff = next - now;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('bdayDays', d);
  set('bdayHours', String(h).padStart(2,'0'));
  set('bdayMins', String(m).padStart(2,'0'));
  set('bdaySecs', String(s).padStart(2,'0'));
}

/* ═══════════════════════════════════════════
   VERSE / QUOTE / TIP / AFFIRMATION
   ═══════════════════════════════════════════ */
function renderVerse() {
  const v = VERSES[state.currentVerse % VERSES.length];
  const vt = $('verseText'), vr = $('verseRef'), wt = $('wisdomText');
  if (vt) vt.textContent = v.text;
  if (vr) vr.textContent = v.ref;
  if (wt) wt.textContent = v.wisdom;
}
function refreshVerse() {
  state.currentVerse = (state.currentVerse + 1) % VERSES.length;
  renderVerse(); saveState();
  showToast('آية جديدة ✨', 'fa-book-quran');
}

function renderQuote() {
  const q = QUOTES[state.currentQuote % QUOTES.length];
  const el = $('quoteText');
  if (el) el.textContent = q;
}
function newQuote() {
  state.currentQuote = (state.currentQuote + 1) % QUOTES.length;
  renderQuote(); saveState();
}

function renderAffirmation() {
  const a = AFFIRMATIONS[state.currentAffirmation % AFFIRMATIONS.length];
  const el = $('affirmationText');
  if (el) el.textContent = a;
}
function newAffirmation() {
  state.currentAffirmation = (state.currentAffirmation + 1) % AFFIRMATIONS.length;
  renderAffirmation(); saveState();
}

function renderDailyTip() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(),0,0)) / 86400000);
  const tip = DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  const el = $('tipText');
  if (el) el.textContent = tip;
}

function renderHero() {
  const now = new Date();
  const h = now.getHours();
  let greeting = 'صباح الخير يا بطل ☀️';
  if (h >= 12 && h < 17) greeting = 'نهارك سعيد 🌤️';
  else if (h >= 17 && h < 21) greeting = 'مساء الخير يا نجم 🌙';
  else if (h >= 21 || h < 5) greeting = 'سهرة سعيدة يا مبدع ✨';
  const g = $('heroGreeting');
  if (g) g.textContent = greeting;
  const nameEl = document.querySelector('.hero-name');
  if (nameEl) nameEl.textContent = state.profileName;
}

/* ═══════════════════════════════════════════
   XP / LEVELS / COINS
   ═══════════════════════════════════════════ */
function getLevelInfo(xp) {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.xp) level = l;
    else break;
  }
  const nextLvl = LEVELS.find(l => l.lv === level.lv + 1);
  const currentXP = xp - level.xp;
  const neededXP = nextLvl ? nextLvl.xp - level.xp : 1;
  const percent = nextLvl ? Math.min(100, Math.round((currentXP / neededXP) * 100)) : 100;
  return { level, nextLvl, percent, currentXP, neededXP };
}

function addXP(amount, reason = '') {
  state.xp += amount;
  const info = getLevelInfo(state.xp);
  const prevLevel = getLevelInfo(state.xp - amount);
  if (info.level.lv > prevLevel.level.lv) {
    launchConfetti(60);
    showToast(`🎉 وصلت للمستوى ${info.level.lv} — ${info.level.name}!`, 'fa-trophy');
    sendInAppNotification('🏆 مستوى جديد!', `المستوى ${info.level.lv}: ${info.level.name}`);
  }
  if (reason) console.log(`+${amount} XP — ${reason}`);
  renderXP();
  saveState();
}

function addCoins(amount) {
  state.coins += amount;
  renderXP();
  saveState();
}

function renderXP() {
  const info = getLevelInfo(state.xp);
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('xpLevel', `Lv.${info.level.lv}`);
  set('xpLevelBig', `Lv.${info.level.lv}`);
  set('xpName', info.level.name);
  set('xpTotal', state.xp);
  set('coinsCount', state.coins);
  set('coinsBig', state.coins);
  set('profileRole', `${state.profileBio} · Level ${info.level.lv}`);
  const fill = $('xpFill');
  if (fill) fill.style.width = info.percent + '%';
  const fillBig = $('xpFillBig');
  if (fillBig) fillBig.style.width = info.percent + '%';
}

/* ═══════════════════════════════════════════
   NOTIFICATIONS
   ═══════════════════════════════════════════ */
function sendInAppNotification(title, body) {
  if (state.focusMode) return;
  const banner = document.createElement('div');
  banner.className = 'notif-banner';
  banner.innerHTML = `<i class="fa-solid fa-bell"></i><div><strong>${escapeHtml(title)}</strong><div style="font-size:2.7mm;opacity:.9;margin-top:.5mm;">${escapeHtml(body)}</div></div>`;
  document.body.appendChild(banner);
  setTimeout(() => banner.classList.add('show'), 50);
  setTimeout(() => {
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 500);
  }, 4000);
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification(title, { body, icon:'logo.png', dir:'rtl', lang:'ar' }); } catch(e) {}
  }
}

async function enableNotifications() {
  if (!('Notification' in window)) {
    showToast('المتصفح مش بيدعم الإشعارات', 'fa-exclamation-circle');
    return;
  }
  if (Notification.permission === 'granted') {
    state.notificationsEnabled = true;
    saveState();
    showToast('الإشعارات مفعّلة ✅');
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    state.notificationsEnabled = true;
    saveState();
    showToast('تم تفعيل الإشعارات 🔔');
    sendInAppNotification('✅ الإشعارات اتفتحت', 'هينبهك بكل حاجة مهمة');
    scheduleSmartNotifications();
  } else {
    showToast('محتاج تسمح للإشعارات', 'fa-exclamation-circle');
  }
}

function togglePrayerAlerts() {
  state.prayerAlertsEnabled = !state.prayerAlertsEnabled;
  const btn = $('prayerAlertBtn');
  if (btn) btn.textContent = state.prayerAlertsEnabled ? 'تفعيل' : 'مقفول';
  saveState();
  showToast(state.prayerAlertsEnabled ? 'تنبيهات الصلاة مفعّلة ✅' : 'تنبيهات الصلاة مقفولة');
}

function toggleLectureAlerts() {
  state.lectureAlertsEnabled = !state.lectureAlertsEnabled;
  const btn = $('lectureAlertBtn');
  if (btn) btn.textContent = state.lectureAlertsEnabled ? 'تفعيل' : 'مقفول';
  saveState();
  showToast(state.lectureAlertsEnabled ? 'تنبيهات المحاضرات مفعّلة ✅' : 'تنبيهات المحاضرات مقفولة');
}

function scheduleSmartNotifications() {
  if (!state.notificationsEnabled) return;
  notificationTimers.forEach(t => clearTimeout(t));
  notificationTimers = [];
  if (state.prayers && state.prayerAlertsEnabled) {
    state.prayers.forEach(p => {
      const [h, m] = p.time.split(':').map(Number);
      const now = new Date();
      const pt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
      const diff = pt - now;
      if (diff > 0 && diff < 24 * 3600 * 1000) {
        if (diff - 15 * 60 * 1000 > 0) {
          notificationTimers.push(setTimeout(() => {
            sendInAppNotification(`🕌 صلاة ${p.name}`, `فاضل 15 دقيقة على صلاة ${p.name}`);
          }, diff - 15 * 60 * 1000));
        }
        notificationTimers.push(setTimeout(() => {
          sendInAppNotification(`🕌 حان وقت صلاة ${p.name}`, 'الله أكبر — قوم صلّي 🤲');
        }, diff));
      }
    });
  }
}

/* ═══════════════════════════════════════════
   PRAYER TIMES + TRACKER
   ═══════════════════════════════════════════ */
async function fetchPrayerTimes() {
  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${CONFIG.city}&country=${CONFIG.country}&method=${CONFIG.prayerMethod}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code !== 200) throw new Error('API error');
    const t = data.data.timings;
    state.prayers = [
      { name:'الفجر', time:t.Fajr.substring(0,5) },
      { name:'الظهر', time:t.Dhuhr.substring(0,5) },
      { name:'العصر', time:t.Asr.substring(0,5) },
      { name:'المغرب', time:t.Maghrib.substring(0,5) },
      { name:'العشاء', time:t.Isha.substring(0,5) },
    ];
    renderPrayers();
    updateNextPrayer();
    renderPrayerTracker();
    if (state.notificationsEnabled) scheduleSmartNotifications();
  } catch(e) {
    console.error('Prayer fetch failed:', e);
    const grid = $('prayerGrid');
    if (grid) grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:5mm;color:var(--muted);"><i class="fa-solid fa-wifi" style="font-size:8mm;opacity:.4;"></i><p style="margin-top:2mm;">محتاج نت</p></div>`;
  }
}

function renderPrayers() {
  const grid = $('prayerGrid');
  if (!grid || !state.prayers) return;
  const now = new Date();
  const cm = now.getHours() * 60 + now.getMinutes();
  let ni = -1;
  for (let i = 0; i < state.prayers.length; i++) {
    const [h, m] = state.prayers[i].time.split(':').map(Number);
    if (h * 60 + m > cm) { ni = i; break; }
  }
  if (ni === -1) ni = 0;
  grid.innerHTML = state.prayers.map((p, i) => `
    <div class="prayer-item ${i === ni ? 'next' : ''}">
      <div class="prayer-name">${p.name}</div>
      <div class="prayer-time">${formatTime(p.time)}</div>
    </div>`).join('');
}

function updateNextPrayer() {
  if (!state.prayers) return;
  const now = new Date();
  const cs = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
  let next = null;
  for (const p of state.prayers) {
    const [h, m] = p.time.split(':').map(Number);
    const ps = h*3600 + m*60;
    if (ps > cs) { next = { ...p, secondsUntil: ps - cs }; break; }
  }
  if (!next) {
    const f = state.prayers[0];
    const [h, m] = f.time.split(':').map(Number);
    next = { ...f, secondsUntil: (24*3600 - cs) + (h*3600 + m*60) };
  }
  state.nextPrayerData = next;
  const h = Math.floor(next.secondsUntil / 3600);
  const m = Math.floor((next.secondsUntil % 3600) / 60);
  const s = next.secondsUntil % 60;
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('prayerH', String(h).padStart(2,'0'));
  set('prayerM', String(m).padStart(2,'0'));
  set('prayerS', String(s).padStart(2,'0'));
  set('prayerName', next.name);
  const full = $('nextPrayerName');
  if (full) full.textContent = `صلاة ${next.name} الساعة ${formatTime(next.time)}`;
}

function renderPrayerTracker() {
  const grid = $('prayerCheckGrid');
  if (!grid || !state.prayers) return;
  const today = todayISO();
  const log = state.prayerLog[today] || {};
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();

  grid.innerHTML = PRAYER_NAMES.map(p => {
    const prayed = !!log[p.id];
    const prayerTime = state.prayers.find(x => x.name === p.ar)?.time;
    let timeMin = null;
    if (prayerTime) {
      const [h, m] = prayerTime.split(':').map(Number);
      timeMin = h*60 + m;
    }
    const isMissed = !prayed && timeMin !== null && nowMin > timeMin + 30;
    const cls = ['prayer-check'];
    if (prayed) cls.push('prayed');
    else if (isMissed) cls.push('missed');
    return `
      <div class="${cls.join(' ')}" onclick="togglePrayer('${p.id}')">
        <i class="fa-solid ${p.icon} pc-icon"></i>
        <div class="pc-name">${p.ar}</div>
        <div class="pc-time">${prayerTime ? formatTime(prayerTime) : '—'}</div>
      </div>`;
  }).join('');

  const prayedCount = Object.values(log).filter(Boolean).length;
  const counterEl = $('prayerCountHome');
  if (counterEl) counterEl.textContent = `${prayedCount}/5`;

  const alert = $('prayerAlert');
  const alertText = $('prayerAlertText');
  if (alert && alertText) {
    const missed = PRAYER_NAMES.filter(p => {
      const isPrayed = !!log[p.id];
      const pt = state.prayers.find(x => x.name === p.ar)?.time;
      if (!pt) return false;
      const [h, m] = pt.split(':').map(Number);
      return !isPrayed && nowMin > h*60 + m + 30;
    });
    if (missed.length > 0) {
      alert.style.display = 'flex';
      alertText.textContent = `فاضل ${missed.length} صلاة: ${missed.map(p => p.ar).join('، ')}`;
    } else alert.style.display = 'none';
  }
}

function togglePrayer(prayerId) {
  const today = todayISO();
  if (!state.prayerLog[today]) state.prayerLog[today] = {};
  const was = state.prayerLog[today][prayerId] === true;
  state.prayerLog[today][prayerId] = !was;
  saveState();
  renderPrayerTracker();
  renderStats();
  const prayer = PRAYER_NAMES.find(p => p.id === prayerId);
  if (!was) {
    launchConfetti(15); vibrate(50);
    showToast(`✅ صليت ${prayer.ar} — تقبل الله 🤲`);
    addXP(10, 'صلاة');
    addCoins(2);
    const all = PRAYER_NAMES.every(p => state.prayerLog[today][p.id]);
    if (all) {
      setTimeout(() => {
        launchConfetti(60);
        sendInAppNotification('🎉 ما شاء الله!', 'صليت الخمس فروض النهاردة');
        addXP(50, 'خمس فروض');
      }, 500);
    }
  } else showToast(`تم إلغاء ${prayer.ar}`, 'fa-undo');
  checkAchievements();
}

/* ═══════════════════════════════════════════
   TASBEEH
   ═══════════════════════════════════════════ */
function renderTasbeeh() {
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('tasbeehCounter', state.tasbeeh.count);
  set('tasbeehTarget', `الهدف: ${state.tasbeeh.target}`);
  set('tasbeehDhikr', state.tasbeeh.dhikr);
  set('tasbeehTotalToday', state.tasbeehTotal);
  $$('.tasbeeh-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.dhikr === state.tasbeeh.dhikr);
  });
}

function tasbeehTap() {
  state.tasbeeh.count++;
  state.tasbeehTotal++;
  saveState();
  const counter = $('tasbeehCounter');
  if (counter) {
    counter.textContent = state.tasbeeh.count;
    counter.classList.remove('bump');
    void counter.offsetWidth;
    counter.classList.add('bump');
  }
  vibrate(15);
  if (state.tasbeeh.count === state.tasbeeh.target) {
    launchConfetti(30);
    showToast(`🎉 أكملت ${state.tasbeeh.target}!`, 'fa-star');
    addXP(20, 'تسبيح كامل');
    addCoins(5);
    vibrate([100, 50, 100]);
  }
  checkAchievements();
}

function resetTasbeeh() {
  if (!confirm('تصفير العداد الحالي؟')) return;
  state.tasbeeh.count = 0;
  saveState();
  renderTasbeeh();
  showToast('تم التصفير', 'fa-rotate-left');
}

function setTasbeehDhikr(el) {
  state.tasbeeh.dhikr = el.dataset.dhikr;
  state.tasbeeh.target = parseInt(el.dataset.target);
  state.tasbeeh.count = 0;
  saveState();
  renderTasbeeh();
  showToast(`تم: ${state.tasbeeh.dhikr}`);
}

/* ═══════════════════════════════════════════
   LECTURES (Attendance System)
   ═══════════════════════════════════════════ */
function getTodayDayKey() {
  const dayIdx = new Date().getDay();
  return { 1:'mon', 2:'tue', 3:'wed', 4:'thu' }[dayIdx] || null;
}

function renderLectures() {
  const wrap = $('lecturesWrap');
  const daysEl = $('lectureDays');
  if (!wrap) return;

  const today = getTodayDayKey();
  const selectedDay = state.selectedLectureDay || today || 'mon';

  // Render day chips
  if (daysEl) {
    daysEl.innerHTML = LECTURES.map(d => `
      <button class="day-chip ${d.day === selectedDay ? 'active' : ''} ${d.day === today ? 'today' : ''}" data-day="${d.day}">${d.dayAr}</button>
    `).join('');
    daysEl.querySelectorAll('.day-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        state.selectedLectureDay = chip.dataset.day;
        renderLectures();
      });
    });
  }

  // Today + Total counts
  const todayLectures = today ? (LECTURES.find(d => d.day === today)?.items || []) : [];
  const todayAttended = todayLectures.filter(l => state.lectureAttendance[`${l.id}_${todayISO()}`]).length;
  const totalAttended = Object.values(state.lectureAttendance).reduce((a, b) => a + b, 0);
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('lecTotalToday', todayAttended);
  set('lecTotalAll', totalAttended);

  // Render lectures for selected day
  const dayData = LECTURES.find(d => d.day === selectedDay);
  if (!dayData) { wrap.innerHTML = ''; return; }

  wrap.innerHTML = dayData.items.map(lec => {
    const isToday = selectedDay === today;
    const attendKey = `${lec.id}_${todayISO()}`;
    const attended = !!state.lectureAttendance[attendKey];
    const totalForLecture = Object.keys(state.lectureAttendance).filter(k => k.startsWith(lec.id + '_')).length;

    let cls = ['lecture-card'];
    if (!isToday) cls.push('locked');
    else if (attended) cls.push('attended');
    else cls.push('unlocked');

    return `
      <div class="${cls.join(' ')}">
        <div class="lec-head">
          <div>
            <div class="lec-time ltr">${lec.time}</div>
            <div class="lec-time-sub">${formatTime(lec.time)}</div>
          </div>
          <span class="lec-type ${lec.type}">${lec.type === 'section' ? 'سكشن' : 'محاضرة'}</span>
        </div>
        <div class="lec-name">${escapeHtml(lec.name)}</div>
        <div class="lec-name-en">${escapeHtml(lec.nameEn)}</div>
        <div class="lec-meta">
          <span><i class="fa-solid fa-user-tie"></i> ${escapeHtml(lec.teacher)}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(lec.hall)}</span>
        </div>
        <div class="lec-stats">
          <div class="lec-stat">
            <div class="lec-stat-val ltr">${attended ? 1 : 0}</div>
            <div class="lec-stat-lbl">النهاردة</div>
          </div>
          <div class="lec-stat">
            <div class="lec-stat-val ltr">${totalForLecture}</div>
            <div class="lec-stat-lbl">إجمالي المادة</div>
          </div>
          <div class="lec-stat">
            <div class="lec-stat-val ltr">${isToday ? '✓' : '🔒'}</div>
            <div class="lec-stat-lbl">${isToday ? 'متاح' : 'مقفول'}</div>
          </div>
        </div>
        <button class="lec-attend-btn ${attended ? 'active' : ''}" onclick="toggleLectureAttend('${lec.id}', '${selectedDay}')">
          <i class="fa-solid ${attended ? 'fa-check-circle' : 'fa-circle'}"></i>
          ${attended ? 'حضرت ✓' : (isToday ? 'اضغط لتسجيل الحضور' : 'مقفول — مفيش محاضرة النهاردة')}
        </button>
      </div>`;
  }).join('');
}

function toggleLectureAttend(lecId, dayKey) {
  const today = getTodayDayKey();
  if (dayKey !== today) {
    showToast('🔒 المحاضرة دي مش النهاردة', 'fa-lock');
    return;
  }
  const key = `${lecId}_${todayISO()}`;
  const was = !!state.lectureAttendance[key];
  if (was) {
    delete state.lectureAttendance[key];
    showToast('تم إلغاء الحضور', 'fa-undo');
  } else {
    state.lectureAttendance[key] = true;
    launchConfetti(25); vibrate(80);
    showToast('✅ تم تسجيل حضورك!', 'fa-graduation-cap');
    addXP(15, 'حضور محاضرة');
    addCoins(3);
    sendInAppNotification('🎓 حضور محاضرة', 'تم التسجيل — برافو!');
  }
  saveState();
  renderLectures();
  renderStats();
  checkAchievements();
}

/* ═══════════════════════════════════════════
   TASKS
   ═══════════════════════════════════════════ */
function getStatus(task) {
  if (task.approved) return 'approved';
  if (task.done) return 'done';
  if (!task.date) return 'upcoming';
  const today = todayISO();
  if (task.date < today) return 'overdue';
  if (task.date === today) return 'today';
  return 'upcoming';
}

function renderTasks() {
  const map = { dailyTasksList:'daily', assignmentsList:'assignment', examsList:'exam', workTasksList:'work' };
  Object.entries(map).forEach(([id, type]) => {
    const el = $(id);
    if (!el) return;
    let tasks = state.tasks.filter(t => t.type === type);
    const today = todayISO();
    if (state.taskFilter === 'today') tasks = tasks.filter(t => t.date === today && !t.done && !t.approved);
    else if (state.taskFilter === 'done') tasks = tasks.filter(t => t.done || t.approved);
    const pri = { overdue:0, today:1, upcoming:2, done:3, approved:4 };
    tasks.sort((a, b) => pri[getStatus(a)] - pri[getStatus(b)]);

    if (tasks.length === 0) {
      el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-clipboard-check"></i><p>مفيش مهام هنا</p></div>`;
      return;
    }
    const pl = { high:'عالية', med:'متوسطة', low:'منخفضة' };
    el.innerHTML = tasks.map(t => renderTaskCard(t, pl)).join('');
  });

  renderTodayPreview();
  renderQuickStats();
  renderStats();
  renderWeeklyProgress();
  renderKanban();
}

function renderTaskCard(t, pl) {
  const s = getStatus(t);
  let deadlineBadge = '';
  if (t.deadlineDate && t.deadlineTime && !t.approved) {
    const dl = new Date(`${t.deadlineDate}T${t.deadlineTime}:00`);
    const h = Math.round((dl - new Date()) / 3600000);
    if (h > 0) deadlineBadge = `<span class="badge badge-deadline"><i class="fa-solid fa-hourglass-half"></i> فاضل ${h}س</span>`;
    else if (h > -CONFIG.autoApproveHours) deadlineBadge = `<span class="badge badge-deadline">انتهى</span>`;
  }
  return `
    <div class="task-item ${s}">
      <div class="task-check" onclick="toggleTask('${t.id}')">${t.done || t.approved ? '<i class="fa-solid fa-check" style="font-size:3.5mm"></i>' : ''}</div>
      <div class="task-body">
        <div class="task-title">${escapeHtml(t.title)}</div>
        ${t.desc ? `<div class="task-desc">${escapeHtml(t.desc)}</div>` : ''}
        <div class="task-meta">
          ${t.date ? `<span><i class="fa-solid fa-calendar"></i> ${formatDateAr(t.date)}</span>` : ''}
          <span class="badge badge-${t.priority === 'high' ? 'high' : t.priority === 'low' ? 'low' : 'med'}">${pl[t.priority] || 'متوسطة'}</span>
          ${t.approved ? '<span class="badge badge-approved"><i class="fa-solid fa-check-double"></i> معتمد</span>' : ''}
          ${deadlineBadge}
          ${s === 'overdue' && !t.approved ? '<span style="color:#fca5a5"><i class="fa-solid fa-triangle-exclamation"></i> متأخرة</span>' : ''}
          ${s === 'today' ? '<span style="color:#fcd34d"><i class="fa-solid fa-clock"></i> النهاردة</span>' : ''}
        </div>
      </div>
      <div class="task-actions">
        ${!t.approved ? `<button class="task-approve" onclick="openApproveModal('${t.id}')" title="موافقة"><i class="fa-solid fa-check-double"></i></button>` : ''}
        <button class="task-delete" onclick="deleteTask('${t.id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
}

function renderKanban() {
  const el = $('dailyTasksKanban');
  if (!el || state.taskView !== 'kanban') return;
  const tasks = state.tasks.filter(t => t.type === 'daily');
  const cols = {
    today: { title:'اليوم', tasks: tasks.filter(t => getStatus(t) === 'today') },
    upcoming: { title:'قادم', tasks: tasks.filter(t => getStatus(t) === 'upcoming') },
    done: { title:'تم', tasks: tasks.filter(t => t.done || t.approved) },
  };
  el.innerHTML = Object.entries(cols).map(([key, col]) => `
    <div class="kanban-col">
      <div class="kanban-col-head">
        <div class="kanban-col-title">${col.title}</div>
        <span class="kanban-count">${col.tasks.length}</span>
      </div>
      ${col.tasks.length === 0 ? `<div style="text-align:center;color:var(--muted);font-size:2.6mm;padding:3mm">مفيش</div>` :
        col.tasks.map(t => `
          <div class="kanban-item">
            <div class="kanban-item-title">${escapeHtml(t.title)}</div>
            <div style="font-size:2.3mm;color:var(--muted);font-weight:600">${t.date ? formatDateAr(t.date) : ''}</div>
          </div>`).join('')
      }
    </div>`).join('');
}

function renderTodayPreview() {
  const el = $('todayTasksPreview');
  if (!el) return;
  const today = todayISO();
  const tasks = state.tasks.filter(t => t.date === today && !t.done && !t.approved).slice(0, 4);
  if (tasks.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-clipboard-check"></i><p>مفيش مهام النهاردة</p></div>`;
    return;
  }
  el.innerHTML = tasks.map(t => `
    <div class="task-item today">
      <div class="task-check" onclick="toggleTask('${t.id}')"></div>
      <div class="task-body"><div class="task-title">${escapeHtml(t.title)}</div></div>
    </div>`).join('');
}

function renderQuickStats() {
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('qsTasks', state.tasks.length);
  set('qsNotes', state.notes.length);
  set('qsStreak', calculateStreak());
  set('homeStatTasks', state.tasks.length);
  const today = todayISO();
  set('homeStatLectures', Object.keys(state.lectureAttendance).filter(k => k.endsWith(`_${today}`)).length);
  set('homeStatTasbeeh', state.tasbeehTotal);
  set('homeStatStreak', calculateStreak());
}

function calculateStreak() {
  const byDay = {};
  state.tasks.filter(t => (t.done || t.approved) && t.completedAt).forEach(t => {
    const d = new Date(t.completedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    byDay[key] = (byDay[key] || 0) + 1;
  });
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (byDay[key]) { streak++; d.setDate(d.getDate() - 1); } else break;
  }
  return streak;
}

function openTaskModal(type = 'daily') {
  const modal = $('taskModal');
  if (!modal) return;
  $('taskModalTitle').textContent = 'مهمة جديدة';
  $('taskEditId').value = '';
  $('taskTitle').value = '';
  $('taskDesc').value = '';
  $('taskDate').value = todayISO();
  $('taskDeadlineDate').value = '';
  $('taskDeadlineTime').value = '';
  $$('#priorityPills .priority-pill').forEach(p => p.classList.toggle('active', p.dataset.p === 'med'));
  $$('#typePills .type-pill').forEach(p => p.classList.toggle('active', p.dataset.t === type));
  modal.classList.add('open');
  setTimeout(() => $('taskTitle')?.focus(), 200);
}

function saveTask() {
  const id = $('taskEditId').value;
  const title = $('taskTitle').value.trim();
  const desc = $('taskDesc').value.trim();
  const date = $('taskDate').value;
  const deadlineDate = $('taskDeadlineDate').value;
  const deadlineTime = $('taskDeadlineTime').value;
  const type = document.querySelector('#typePills .type-pill.active')?.dataset.t || 'daily';
  const priority = document.querySelector('#priorityPills .priority-pill.active')?.dataset.p || 'med';

  if (!title) { showToast('اكتب اسم المهمة', 'fa-exclamation-circle'); return; }

  if (id) {
    const idx = state.tasks.findIndex(t => t.id === id);
    if (idx !== -1) state.tasks[idx] = { ...state.tasks[idx], title, desc, date, deadlineDate, deadlineTime, priority, type };
  } else {
    state.tasks.push({
      id: genId(), title, desc, date, deadlineDate, deadlineTime,
      priority, type, done:false, approved:false, createdAt: Date.now(),
    });
    addXP(5, 'إضافة مهمة');
  }
  saveState();
  renderTasks();
  closeModal('taskModal');
  showToast(id ? 'تم التعديل ✓' : 'تمت الإضافة ✓');
  checkAchievements();
}

function toggleTask(id) {
  const t = state.tasks.find(x => x.id === id);
  if (!t) return;
  const wasDone = t.done;
  t.done = !t.done;
  if (t.done) {
    t.completedAt = Date.now();
    launchConfetti(15); vibrate(50);
    showToast('برافو! 🎉', 'fa-award');
    addXP(20, 'إكمال مهمة');
    addCoins(5);
    sendInAppNotification('✅ مهمة مكتملة', `خلصت: ${t.title}`);
  } else {
    delete t.completedAt;
  }
  saveState();
  renderTasks();
  checkAchievements();
}

function deleteTask(id) {
  if (!confirm('تحذف المهمة؟')) return;
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveState();
  renderTasks();
  showToast('تم الحذف', 'fa-trash');
}

function clearCompletedTasks() {
  if (!confirm('حذف كل المهام المكتملة؟')) return;
  state.tasks = state.tasks.filter(t => !t.done && !t.approved);
  saveState();
  renderTasks();
  showToast('تم الحذف', 'fa-broom');
}

function openApproveModal(id) {
  const t = state.tasks.find(x => x.id === id);
  if (!t) return;
  $('approveTaskId').value = id;
  $('approveTaskTitle').textContent = t.title;
  $('approveModal').classList.add('open');
}

function approveTask() {
  const id = $('approveTaskId').value;
  const t = state.tasks.find(x => x.id === id);
  if (!t) return;
  t.done = true;
  t.approved = true;
  t.completedAt = Date.now();
  t.approvedAt = Date.now();
  if (t.isLecture && t.lectureId) {
    state.lectureAttendance[`${t.lectureId}_${todayISO()}`] = true;
  }
  saveState();
  closeModal('approveModal');
  renderTasks();
  renderLectures();
  launchConfetti(25);
  showToast('✅ تم الاعتماد', 'fa-check-double');
  addXP(25, 'اعتماد');
  checkAchievements();
}

function checkAutoApproveDeadlines() {
  const now = new Date();
  let changed = false;
  state.tasks.forEach(t => {
    if (t.approved || !t.deadlineDate || !t.deadlineTime) return;
    const dl = new Date(`${t.deadlineDate}T${t.deadlineTime}:00`);
    if ((now - dl) / 3600000 >= CONFIG.autoApproveHours) {
      t.approved = true;
      t.done = true;
      t.autoApproved = true;
      t.completedAt = Date.now();
      changed = true;
    }
  });
  if (changed) {
    saveState();
    renderTasks();
    sendInAppNotification('⏰ اعتماد تلقائي', 'فيه مهام خلص ديدلاينها وتم اعتمادها');
  }
}

/* ═══════════════════════════════════════════
   NOTES
   ═══════════════════════════════════════════ */
function renderNotes(search = '') {
  const list = $('notesList');
  if (!list) return;
  let notes = [...state.notes];
  if (search) {
    const q = search.toLowerCase();
    notes = notes.filter(n => (n.title||'').toLowerCase().includes(q) || (n.body||'').toLowerCase().includes(q));
  }
  notes.sort((a, b) => (b.pinned?1:0) - (a.pinned?1:0) || b.createdAt - a.createdAt);
  if (notes.length === 0) {
    list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-pen-fancy"></i><p>مفيش ملاحظات</p></div>`;
    return;
  }
  list.innerHTML = notes.map(n => `
    <div class="note-card ${n.pinned ? 'pinned' : ''}">
      <div class="note-title">
        ${n.pinned ? '<i class="fa-solid fa-thumbtack" style="color:var(--gold);font-size:3mm"></i>' : ''}
        ${escapeHtml(n.title)}
      </div>
      ${n.body ? `<div class="note-body">${escapeHtml(n.body)}</div>` : ''}
      <div class="note-footer">
        <span>${formatDateAr(new Date(n.createdAt).toISOString().split('T')[0])}</span>
        <div class="note-actions">
          <button onclick="togglePinNote('${n.id}')"><i class="fa-solid fa-thumbtack"></i></button>
          <button onclick="openNoteModal('${n.id}')"><i class="fa-solid fa-pen"></i></button>
          <button onclick="deleteNote('${n.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>`).join('');
}

function openNoteModal(id) {
  const modal = $('noteModal');
  if (!modal) return;
  if (id) {
    const n = state.notes.find(x => x.id === id);
    if (!n) return;
    $('noteModalTitle').textContent = 'تعديل';
    $('noteEditId').value = n.id;
    $('noteTitle').value = n.title;
    $('noteBody').value = n.body || '';
  } else {
    $('noteModalTitle').textContent = 'ملاحظة جديدة';
    $('noteEditId').value = '';
    $('noteTitle').value = '';
    $('noteBody').value = '';
  }
  modal.classList.add('open');
}

function saveNote() {
  const id = $('noteEditId').value;
  const title = $('noteTitle').value.trim();
  const body = $('noteBody').value.trim();
  if (!title) { showToast('اكتب عنوان الملاحظة', 'fa-exclamation-circle'); return; }
  if (id) {
    const idx = state.notes.findIndex(n => n.id === id);
    if (idx !== -1) state.notes[idx] = { ...state.notes[idx], title, body };
  } else {
    state.notes.push({ id: genId(), title, body, pinned:false, createdAt: Date.now() });
    addXP(3, 'ملاحظة');
  }
  saveState();
  renderNotes();
  renderQuickStats();
  closeModal('noteModal');
  showToast('تم الحفظ ✓');
  checkAchievements();
}

function deleteNote(id) {
  if (!confirm('تحذف الملاحظة؟')) return;
  state.notes = state.notes.filter(n => n.id !== id);
  saveState();
  renderNotes();
  renderQuickStats();
  showToast('تم الحذف', 'fa-trash');
}

function togglePinNote(id) {
  const n = state.notes.find(x => x.id === id);
  if (!n) return;
  n.pinned = !n.pinned;
  saveState();
  renderNotes();
  showToast(n.pinned ? 'تم التثبيت 📌' : 'تم إلغاء التثبيت');
}

/* ═══════════════════════════════════════════
   APPOINTMENTS
   ═══════════════════════════════════════════ */
function renderAppointments() {
  const el = $('appointmentsList');
  if (!el) return;
  const today = todayISO();
  let apts = [...state.appointments].filter(a => a.date >= today);
  apts.sort((a, b) => (a.date + (a.time||'')).localeCompare(b.date + (b.time||'')));
  if (apts.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-calendar"></i><p>مفيش مواعيد قادمة</p></div>`;
    return;
  }
  el.innerHTML = apts.map(a => `
    <div class="task-item" style="border-right-color:var(--purple);">
      <div class="task-body">
        <div class="task-title">${escapeHtml(a.title)}</div>
        <div class="task-meta">
          <span><i class="fa-solid fa-calendar"></i> ${formatDateAr(a.date)}</span>
          ${a.time ? `<span><i class="fa-solid fa-clock"></i> ${formatTime(a.time)}</span>` : ''}
          ${a.location ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(a.location)}</span>` : ''}
        </div>
      </div>
      <button class="task-delete" onclick="deleteApt('${a.id}')"><i class="fa-solid fa-trash"></i></button>
    </div>`).join('');
}

function openAptModal() {
  const modal = $('aptModal');
  if (!modal) return;
  $('aptTitle').value = '';
  $('aptDate').value = todayISO();
  $('aptTime').value = '20:00';
  $('aptLocation').value = '';
  modal.classList.add('open');
}

function saveApt() {
  const title = $('aptTitle').value.trim();
  const date = $('aptDate').value;
  const time = $('aptTime').value;
  const location = $('aptLocation').value.trim();
  if (!title || !date) { showToast('اكتب العنوان والتاريخ', 'fa-exclamation-circle'); return; }
  state.appointments.push({ id: genId(), title, date, time, location, createdAt: Date.now() });
  saveState();
  renderAppointments();
  closeModal('aptModal');
  showToast('تم الحفظ ✓');
  sendInAppNotification('📅 موعد جديد', `${title} — ${formatDateAr(date)}`);
}

function deleteApt(id) {
  if (!confirm('تحذف الموعد؟')) return;
  state.appointments = state.appointments.filter(a => a.id !== id);
  saveState();
  renderAppointments();
  showToast('تم الحذف', 'fa-trash');
}

/* ═══════════════════════════════════════════
   STATS & WEEKLY
   ═══════════════════════════════════════════ */
function renderStats() {
  const done = state.tasks.filter(t => t.done || t.approved).length;
  const overdue = state.tasks.filter(t => !t.done && !t.approved && getStatus(t) === 'overdue').length;
  const total = state.tasks.length;
  const rate = total > 0 ? Math.round((done / total) * 100) : 0;
  const streak = calculateStreak();
  const today = todayISO();
  const prayed = Object.values(state.prayerLog[today] || {}).filter(Boolean).length;
  const todayLectures = Object.keys(state.lectureAttendance).filter(k => k.endsWith(`_${today}`)).length;

  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('statDone', done);
  set('statOverdue', overdue);
  set('statRate', rate + '%');
  set('statTotal', total);
  set('statNotes', state.notes.length);
  set('statStreak', streak);
  set('statTasbeeh', state.tasbeehTotal);
  set('statPrayed', prayed);
  set('statLectures', todayLectures);
  set('statPomo', state.pomoSessions[today] || 0);
  set('dashTotalTasks', total);
  set('dashRate', rate + '%');
  set('dashStreak', streak);
  set('dashLectures', todayLectures);
}

function renderWeeklyProgress() {
  const now = new Date();
  const ws = new Date(now);
  ws.setDate(now.getDate() - now.getDay());
  ws.setHours(0,0,0,0);
  const weekTasks = state.tasks.filter(t => {
    if (!t.date) return false;
    const d = new Date(t.date);
    return d >= ws && d <= now;
  });
  const done = weekTasks.filter(t => t.done || t.approved).length;
  const total = weekTasks.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const bar = $('weeklyBar');
  if (bar) bar.style.width = percent + '%';
  const pct = $('weeklyPercent');
  if (pct) pct.textContent = percent + '%';
  const dEl = $('weeklyDone');
  if (dEl) dEl.textContent = `${done} مهام`;
  const tEl = $('weeklyTotal');
  if (tEl) tEl.textContent = `من ${total}`;
}

/* ═══════════════════════════════════════════
   MOOD
   ═══════════════════════════════════════════ */
function renderMood() {
  const today = todayISO();
  const current = state.moods[today];
  $$('.mood-btn').forEach(b => b.classList.toggle('active', b.dataset.mood === current));
  const hist = $('moodHistory');
  if (!hist) return;
  const emojiMap = { amazing:'🤩', good:'😊', ok:'😐', tired:'😴', sad:'😢' };
  const entries = Object.entries(state.moods).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 14);
  if (entries.length === 0) { hist.innerHTML = ''; return; }
  hist.innerHTML = entries.map(([date, mood]) => {
    const d = new Date(date);
    return `<div class="mood-history-item">
      <div class="emoji">${emojiMap[mood] || '?'}</div>
      <div class="date">${d.getDate()}/${d.getMonth()+1}</div>
    </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════
   LOVED ONES (Grid V2)
   ═══════════════════════════════════════════ */
function renderLoved() {
  const el = $('lovedList');
  if (!el) return;
  if (lovedOnes.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-heart"></i><p>مفيش أحباب مضافين</p></div>`;
    updateMemStats();
    return;
  }
  el.innerHTML = lovedOnes.map(p => `
    <div class="loved-card-v2">
      <button class="delete" onclick="deleteLoved('${p.id}')"><i class="fa-solid fa-xmark"></i></button>
      <div class="avatar-wrap">
        ${p.photo ? `<img class="avatar" src="${p.photo}" alt="">` : `<div class="avatar"><i class="fa-solid fa-user"></i></div>`}
      </div>
      <div class="name">${escapeHtml(p.name)}</div>
      <div class="desc">${escapeHtml(p.desc || 'من أحبابي 💕')}</div>
      ${p.phone ? `
        <div class="actions">
          <a class="wa" href="https://wa.me/${p.phone.replace(/[^0-9]/g, '')}" target="_blank"><i class="fa-brands fa-whatsapp"></i> واتس</a>
          <a class="call" href="tel:${p.phone}"><i class="fa-solid fa-phone"></i> اتصال</a>
        </div>` : ''}
    </div>`).join('');
  updateMemStats();
}

function updateMemStats() {
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('memStatLoved', lovedOnes.length);
  set('memStatMemories', (state.moments || []).length);
  set('memStatPhotos', 6);
}

function openLovedModal() {
  const modal = $('lovedModal');
  if (!modal) return;
  $('lovedName').value = '';
  $('lovedDesc').value = '';
  $('lovedPhone').value = '';
  $('lovedRelation').value = 'friend';
  const prev = $('lovedPhotoPreview');
  prev.style.display = 'none';
  prev.src = '';
  $('lovedPhotoPlaceholder').style.display = 'flex';
  modal.classList.add('open');
}

function saveLoved() {
  const name = $('lovedName').value.trim();
  const desc = $('lovedDesc').value.trim();
  const phone = $('lovedPhone').value.trim();
  const relation = $('lovedRelation').value;
  const photo = $('lovedPhotoPreview').src;
  if (!name) { showToast('اكتب الاسم', 'fa-exclamation-circle'); return; }
  lovedOnes.push({
    id: genId(), name, desc, phone, relation,
    photo: photo && photo.startsWith('data:') ? photo : null,
    createdAt: Date.now(),
  });
  saveLoved();
  renderLoved();
  closeModal('lovedModal');
  showToast('تمت الإضافة ✓');
  launchConfetti(15);
  addXP(10, 'إضافة حبيب');
  checkAchievements();
}

function deleteLoved(id) {
  if (!confirm('تحذف الشخص ده؟')) return;
  lovedOnes = lovedOnes.filter(p => p.id !== id);
  saveLoved();
  renderLoved();
  showToast('تم الحذف', 'fa-trash');
}

/* ═══════════════════════════════════════════
   MOMENTS
   ═══════════════════════════════════════════ */
function renderMoments() {
  const el = $('momentsList');
  if (!el) return;
  if (!state.moments || state.moments.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-star"></i><p>مفيش لحظات</p></div>`;
    updateMemStats();
    return;
  }
  state.moments.sort((a, b) => (b.date||'').localeCompare(a.date||''));
  el.innerHTML = state.moments.map(m => `
    <div class="loved-card">
      <button class="loved-delete" onclick="deleteMoment('${m.id}')"><i class="fa-solid fa-xmark"></i></button>
      ${m.photo ? `<img class="loved-avatar" src="${m.photo}" alt="">` : `<div class="loved-avatar"><i class="fa-solid fa-star"></i></div>`}
      <div class="loved-info">
        <div class="loved-name">${escapeHtml(m.title)}</div>
        <div class="loved-desc">${escapeHtml(m.desc || '')}</div>
        <div style="font-size:2.5mm;color:var(--muted-2);font-weight:700;margin-top:1mm">
          <i class="fa-solid fa-calendar"></i> ${formatDateAr(m.date)}
        </div>
      </div>
    </div>`).join('');
  updateMemStats();
}

function openMomentModal() {
  const modal = $('momentModal');
  if (!modal) return;
  $('momentTitle').value = '';
  $('momentDesc').value = '';
  $('momentDate').value = todayISO();
  $('momentPhotoPreview').style.display = 'none';
  $('momentPhotoPreview').src = '';
  $('momentPhotoPlaceholder').style.display = 'flex';
  modal.classList.add('open');
}

function saveMoment() {
  const title = $('momentTitle').value.trim();
  const desc = $('momentDesc').value.trim();
  const date = $('momentDate').value;
  const photo = $('momentPhotoPreview').src;
  if (!title) { showToast('اكتب العنوان', 'fa-exclamation-circle'); return; }
  state.moments.push({
    id: genId(), title, desc, date,
    photo: photo && photo.startsWith('data:') ? photo : null,
    createdAt: Date.now(),
  });
  saveState();
  renderMoments();
  closeModal('momentModal');
  showToast('تمت الإضافة ✓');
  addXP(10, 'ذكرى');
  checkAchievements();
}

function deleteMoment(id) {
  if (!confirm('تحذف الذكرى؟')) return;
  state.moments = state.moments.filter(m => m.id !== id);
  saveState();
  renderMoments();
  showToast('تم الحذف', 'fa-trash');
}

/* ═══════════════════════════════════════════
   JOURNAL
   ═══════════════════════════════════════════ */
function renderJournal() {
  const el = $('journalList');
  if (!el) return;
  if (state.journal.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-book"></i><p>مفيش مذكرات</p></div>`;
    return;
  }
  const sorted = [...state.journal].sort((a, b) => b.date.localeCompare(a.date));
  el.innerHTML = sorted.map(j => `
    <div class="journal-card">
      <div class="journal-head">
        <div class="journal-title">${escapeHtml(j.title)}</div>
        <div class="journal-date">${formatDateAr(j.date)}</div>
      </div>
      <div class="journal-body">${escapeHtml(j.body)}</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span class="journal-mood">${j.mood} ${j.moodText || ''}</span>
        <button class="task-delete" onclick="deleteJournal('${j.id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`).join('');
}

function openJournalModal() {
  const modal = $('journalModal');
  if (!modal) return;
  $('journalDate').value = todayISO();
  $('journalTitle').value = '';
  $('journalBody').value = '';
  $('journalMood').value = '😊';
  modal.classList.add('open');
}

function saveJournal() {
  const date = $('journalDate').value;
  const title = $('journalTitle').value.trim();
  const body = $('journalBody').value.trim();
  const mood = $('journalMood').value;
  if (!title || !body) { showToast('اكتب العنوان والمحتوى', 'fa-exclamation-circle'); return; }
  state.journal.push({ id: genId(), date, title, body, mood, createdAt: Date.now() });
  saveState();
  renderJournal();
  closeModal('journalModal');
  showToast('تم الحفظ ✓');
  addXP(15, 'يومية');
  checkAchievements();
}

function deleteJournal(id) {
  if (!confirm('تحذف اليومية؟')) return;
  state.journal = state.journal.filter(j => j.id !== id);
  saveState();
  renderJournal();
  showToast('تم الحذف', 'fa-trash');
}

/* ═══════════════════════════════════════════
   VISION BOARD
   ═══════════════════════════════════════════ */
function renderVision() {
  const el = $('visionGrid');
  if (!el) return;
  if (state.vision.length === 0) {
    el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fa-solid fa-image"></i><p>أضف صور أحلامك</p></div>`;
    return;
  }
  el.innerHTML = state.vision.map(v => `
    <div class="vision-item">
      <button class="vision-delete" onclick="deleteVision('${v.id}')"><i class="fa-solid fa-xmark"></i></button>
      ${v.photo ? `<img src="${v.photo}" alt="">` : ''}
      <div class="vision-label">${escapeHtml(v.title)}</div>
    </div>`).join('');
}

function openVisionModal() {
  const modal = $('visionModal');
  if (!modal) return;
  $('visionTitle').value = '';
  modal._photo = null;
  modal.classList.add('open');
}

function saveVision() {
  const title = $('visionTitle').value.trim();
  const modal = $('visionModal');
  if (!title) { showToast('اكتب العنوان', 'fa-exclamation-circle'); return; }
  state.vision.push({ id: genId(), title, photo: modal._photo, createdAt: Date.now() });
  saveState();
  renderVision();
  closeModal('visionModal');
  showToast('تمت الإضافة ✓');
}

function deleteVision(id) {
  if (!confirm('تحذف الصورة؟')) return;
  state.vision = state.vision.filter(v => v.id !== id);
  saveState();
  renderVision();
}

/* ═══════════════════════════════════════════
   HABITS
   ═══════════════════════════════════════════ */
function renderHabits() {
  const el = $('habitsList');
  if (!el) return;
  if (state.habits.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-repeat"></i><p>مفيش عادات لسه</p></div>`;
    return;
  }
  const today = todayISO();
  el.innerHTML = state.habits.map(h => {
    const checked = h.log?.[today];
    const streak = calculateHabitStreak(h);
    return `
      <div class="habit-card">
        <div class="habit-icon">${h.icon}</div>
        <div class="habit-info">
          <div class="habit-name">${escapeHtml(h.title)}</div>
          <div class="habit-streak">🔥 <span>${streak}</span> يوم متواصل</div>
        </div>
        <button class="habit-check ${checked ? 'checked' : ''}" onclick="toggleHabit('${h.id}')">
          <i class="fa-solid ${checked ? 'fa-check' : 'fa-circle'}"></i>
        </button>
      </div>`;
  }).join('');
}

function calculateHabitStreak(h) {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (h.log?.[key]) { streak++; d.setDate(d.getDate() - 1); } else break;
  }
  return streak;
}

function toggleHabit(id) {
  const h = state.habits.find(x => x.id === id);
  if (!h) return;
  if (!h.log) h.log = {};
  const today = todayISO();
  h.log[today] = !h.log[today];
  if (h.log[today]) {
    vibrate(30);
    showToast('✅ عادة مكتملة!', 'fa-check');
    addXP(5, 'عادة');
  }
  saveState();
  renderHabits();
  checkAchievements();
}

function openHabitModal() {
  const modal = $('habitModal');
  if (!modal) return;
  $('habitTitle').value = '';
  $('habitIcon').value = '📚';
  modal.classList.add('open');
}

function saveHabit() {
  const title = $('habitTitle').value.trim();
  const icon = $('habitIcon').value;
  if (!title) { showToast('اكتب الاسم', 'fa-exclamation-circle'); return; }
  state.habits.push({ id: genId(), title, icon, log:{}, createdAt: Date.now() });
  saveState();
  renderHabits();
  closeModal('habitModal');
  showToast('تمت الإضافة ✓');
}

/* ═══════════════════════════════════════════
   BOOKS
   ═══════════════════════════════════════════ */
function renderBooks() {
  const el = $('booksList');
  if (!el) return;
  if (state.books.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-book"></i><p>مفيش كتب</p></div>`;
    return;
  }
  el.innerHTML = state.books.map(b => {
    const percent = Math.min(100, Math.round((b.current / b.pages) * 100));
    return `
      <div class="book-card">
        <div class="book-title">${escapeHtml(b.title)}</div>
        <div class="book-author">${escapeHtml(b.author || '')}</div>
        <div class="book-progress">
          <div class="book-fill" style="width:${percent}%"></div>
        </div>
        <div class="book-meta">
          <span class="ltr">${b.current} / ${b.pages} صفحة</span>
          <span class="ltr">${percent}%</span>
        </div>
        <div class="book-actions">
          <button onclick="bumpBook('${b.id}', 10)">+10</button>
          <button onclick="bumpBook('${b.id}', -10)">-10</button>
          <button onclick="deleteBook('${b.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
  }).join('');
}

function openBookModal() {
  const modal = $('bookModal');
  if (!modal) return;
  $('bookTitle').value = '';
  $('bookAuthor').value = '';
  $('bookPages').value = '';
  modal.classList.add('open');
}

function saveBook() {
  const title = $('bookTitle').value.trim();
  const author = $('bookAuthor').value.trim();
  const pages = parseInt($('bookPages').value);
  if (!title || !pages) { showToast('اكتب الاسم والعدد', 'fa-exclamation-circle'); return; }
  state.books.push({ id: genId(), title, author, pages, current:0, createdAt: Date.now() });
  saveState();
  renderBooks();
  closeModal('bookModal');
  showToast('تمت الإضافة ✓');
}

function bumpBook(id, delta) {
  const b = state.books.find(x => x.id === id);
  if (!b) return;
  b.current = Math.max(0, Math.min(b.pages, b.current + delta));
  if (b.current >= b.pages) {
    launchConfetti(40);
    sendInAppNotification('📖 كتاب مكتمل!', `خلّصت: ${b.title}`);
  }
  saveState();
  renderBooks();
  checkAchievements();
}

function deleteBook(id) {
  if (!confirm('تحذف الكتاب؟')) return;
  state.books = state.books.filter(b => b.id !== id);
  saveState();
  renderBooks();
}

/* ═══════════════════════════════════════════
   FLASHCARDS
   ═══════════════════════════════════════════ */
function renderFlashcards() {
  const el = $('flashcardsList');
  if (!el) return;
  if (state.flashcards.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-layer-group"></i><p>مفيش بطاقات</p></div>`;
    return;
  }
  el.innerHTML = state.flashcards.map(f => `
    <div class="flashcard-v2" onclick="viewFlashcard('${f.id}')">
      <div class="fc-q">${escapeHtml(f.question)}</div>
      <div class="fc-a">${escapeHtml(f.answer)}</div>
    </div>`).join('');
}

function openFlashcardModal() {
  const modal = $('flashcardModal');
  if (!modal) return;
  $('fcQuestion').value = '';
  $('fcAnswer').value = '';
  modal.classList.add('open');
}

function saveFlashcard() {
  const question = $('fcQuestion').value.trim();
  const answer = $('fcAnswer').value.trim();
  if (!question || !answer) { showToast('اكتب السؤال والإجابة', 'fa-exclamation-circle'); return; }
  state.flashcards.push({ id: genId(), question, answer, createdAt: Date.now() });
  saveState();
  renderFlashcards();
  closeModal('flashcardModal');
  showToast('تمت الإضافة ✓');
}

function viewFlashcard(id) {
  const f = state.flashcards.find(x => x.id === id);
  if (!f) return;
  const el = $('fcViewerContent');
  el.innerHTML = `
    <div class="fc-card-big" onclick="this.classList.toggle('flipped'); this.querySelector('.fc-text').textContent = this.classList.contains('flipped') ? '${escapeHtml(f.answer)}' : '${escapeHtml(f.question)}'">
      <div class="fc-text">${escapeHtml(f.question)}</div>
      <div style="font-size:2.6mm;color:var(--muted)">اضغط للقلب</div>
    </div>
    <button class="btn" style="background:rgba(220,38,38,.15);color:#fca5a5;margin-top:4mm" onclick="deleteFlashcard('${f.id}')">
      <i class="fa-solid fa-trash"></i> حذف
    </button>`;
  $('flashcardViewModal').classList.add('open');
}

function deleteFlashcard(id) {
  if (!confirm('تحذف البطاقة؟')) return;
  state.flashcards = state.flashcards.filter(f => f.id !== id);
  saveState();
  renderFlashcards();
  closeModal('flashcardViewModal');
}

/* ═══════════════════════════════════════════
   EXPENSES
   ═══════════════════════════════════════════ */
function renderExpenses() {
  const list = $('expensesList');
  if (!list) return;
  const today = todayISO();
  const thisMonth = today.substring(0, 7);
  const todayTotal = state.expenses.filter(e => e.date === today).reduce((s, e) => s + Number(e.amount||0), 0);
  const monthTotal = state.expenses.filter(e => e.date.startsWith(thisMonth)).reduce((s, e) => s + Number(e.amount||0), 0);
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('expenseTotalToday', todayTotal.toFixed(0));
  set('expenseTotalMonth', monthTotal.toFixed(0));

  const recent = [...state.expenses].sort((a, b) => b.createdAt - a.createdAt).slice(0, 20);
  if (recent.length === 0) {
    list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-coins"></i><p>مفيش مصاريف</p></div>`;
    return;
  }
  const icons = { food:'🍔', transport:'🚗', study:'📚', entertainment:'🎬', other:'📦' };
  list.innerHTML = recent.map(e => `
    <div class="task-item">
      <div class="task-body">
        <div class="task-title">${icons[e.category] || '📦'} ${escapeHtml(e.title)}</div>
        <div class="task-meta">
          <span>${formatDateAr(e.date)}</span>
          <span class="badge badge-high">${e.amount} ج.م</span>
        </div>
      </div>
      <button class="task-delete" onclick="deleteExpense('${e.id}')"><i class="fa-solid fa-trash"></i></button>
    </div>`).join('');
}

function openExpenseModal() {
  const modal = $('expenseModal');
  if (!modal) return;
  $('expenseTitle').value = '';
  $('expenseAmount').value = '';
  $('expenseCategory').value = 'food';
  modal.classList.add('open');
}

function saveExpense() {
  const title = $('expenseTitle').value.trim();
  const amount = Number($('expenseAmount').value);
  const category = $('expenseCategory').value;
  if (!title || !amount) { showToast('اكتب العنوان والمبلغ', 'fa-exclamation-circle'); return; }
  state.expenses.push({ id: genId(), title, amount, category, date: todayISO(), createdAt: Date.now() });
  saveState();
  renderExpenses();
  closeModal('expenseModal');
  showToast('تم الحفظ ✓');
}

function deleteExpense(id) {
  if (!confirm('تحذف المصروف؟')) return;
  state.expenses = state.expenses.filter(e => e.id !== id);
  saveState();
  renderExpenses();
}

/* ═══════════════════════════════════════════
   GOALS
   ═══════════════════════════════════════════ */
function renderGoals() {
  const list = $('goalsList');
  if (!list) return;
  if (state.goals.length === 0) {
    list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-bullseye"></i><p>مفيش أهداف</p></div>`;
    return;
  }
  const icons = { study:'📚', fitness:'💪', reading:'📖', personal:'⭐' };
  list.innerHTML = state.goals.map(g => {
    const percent = Math.min(100, Math.round((g.current / g.target) * 100));
    const achieved = g.current >= g.target;
    return `
      <div class="card" style="border-color:${achieved ? 'var(--green)' : 'var(--line)'}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5mm">
          <div style="font-size:3.4mm;font-weight:800">${icons[g.category] || '🎯'} ${escapeHtml(g.title)}</div>
          <button class="task-delete" onclick="deleteGoal('${g.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${percent}%;${achieved ? 'background:var(--green)' : ''}"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:2mm;font-size:2.6mm;color:var(--muted);font-weight:700">
          <span class="ltr">${g.current} / ${g.target}</span>
          <span class="ltr">${percent}%</span>
        </div>
        <div style="display:flex;gap:2mm;margin-top:3mm">
          <button class="section-action" onclick="incrementGoal('${g.id}')" style="flex:1;justify-content:center"><i class="fa-solid fa-plus"></i> زيادة</button>
          <button class="section-action" onclick="resetGoal('${g.id}')" style="flex:1;justify-content:center"><i class="fa-solid fa-rotate-left"></i> صفر</button>
        </div>
      </div>`;
  }).join('');
}

function openGoalModal() {
  const modal = $('goalModal');
  if (!modal) return;
  $('goalTitle').value = '';
  $('goalTarget').value = '100';
  $('goalCategory').value = 'study';
  modal.classList.add('open');
}

function saveGoal() {
  const title = $('goalTitle').value.trim();
  const target = Number($('goalTarget').value);
  const category = $('goalCategory').value;
  if (!title || !target) { showToast('اكتب الهدف', 'fa-exclamation-circle'); return; }
  state.goals.push({ id: genId(), title, target, current:0, category, createdAt: Date.now() });
  saveState();
  renderGoals();
  closeModal('goalModal');
  showToast('تم الحفظ ✓');
}

function incrementGoal(id) {
  const g = state.goals.find(x => x.id === id);
  if (!g) return;
  g.current = Math.min(g.target, g.current + 1);
  if (g.current >= g.target) {
    launchConfetti(40);
    sendInAppNotification('🎯 هدف محقق!', g.title);
    addXP(50, 'هدف');
    addCoins(20);
  }
  saveState();
  renderGoals();
  checkAchievements();
}

function resetGoal(id) {
  const g = state.goals.find(x => x.id === id);
  if (!g) return;
  g.current = 0;
  saveState();
  renderGoals();
}

function deleteGoal(id) {
  if (!confirm('تحذف الهدف؟')) return;
  state.goals = state.goals.filter(g => g.id !== id);
  saveState();
  renderGoals();
}

/* ═══════════════════════════════════════════
   POMODORO
   ═══════════════════════════════════════════ */
function renderPomodoro() {
  const ps = state.pomoState;
  const timer = $('pomodoroTimer');
  const mode = $('pomodoroMode');
  const bar = $('pomodoroBar');
  if (timer) {
    const m = Math.floor(ps.remaining / 60);
    const s = ps.remaining % 60;
    timer.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  if (mode) mode.textContent = ps.mode === 'focus' ? '🎯 وضع التركيز' : '☕ وقت الراحة';
  if (bar) {
    const pct = ps.total > 0 ? ((ps.total - ps.remaining) / ps.total) * 100 : 0;
    bar.style.width = pct + '%';
  }
  const today = todayISO();
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('pomoSessionsToday', state.pomoSessions[today] || 0);
  set('pomoMinutesToday', state.pomoMinutes[today] || 0);
  set('pomoStreak', calculatePomoStreak());
  const btn = $('pomodoroStart');
  if (btn) {
    const icon = btn.querySelector('i');
    if (icon) icon.className = ps.running ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  }
}

function calculatePomoStreak() {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if ((state.pomoSessions[key] || 0) > 0) { streak++; d.setDate(d.getDate() - 1); } else break;
  }
  return streak;
}

function pomodoroStart() {
  const ps = state.pomoState;
  if (ps.running) {
    clearInterval(ps.interval);
    ps.running = false;
  } else {
    if (ps.remaining <= 0) {
      ps.total = ps.mode === 'focus' ? state.pomoConfig.focus * 60 : state.pomoConfig.break * 60;
      ps.remaining = ps.total;
    }
    ps.running = true;
    ps.interval = setInterval(() => {
      ps.remaining--;
      if (ps.remaining <= 0) {
        clearInterval(ps.interval);
        ps.running = false;
        pomodoroComplete();
      }
      renderPomodoro();
    }, 1000);
  }
  renderPomodoro();
}

function pomodoroComplete() {
  const ps = state.pomoState;
  const today = todayISO();
  if (ps.mode === 'focus') {
    state.pomoSessions[today] = (state.pomoSessions[today] || 0) + 1;
    state.pomoMinutes[today] = (state.pomoMinutes[today] || 0) + state.pomoConfig.focus;
    saveState();
    launchConfetti(40); vibrate([200,100,200]);
    showToast('🎉 خلصت جلسة تركيز!', 'fa-check-circle');
    sendInAppNotification('🍅 جلسة كاملة', `${state.pomoConfig.focus} دقيقة تركيز`);
    addXP(30, 'بومودورو');
    addCoins(10);
    ps.mode = 'break';
    ps.total = state.pomoConfig.break * 60;
    ps.remaining = ps.total;
  } else {
    showToast('☕ خلص وقت الراحة', 'fa-mug-hot');
    ps.mode = 'focus';
    ps.total = state.pomoConfig.focus * 60;
    ps.remaining = ps.total;
  }
  renderPomodoro();
  renderStats();
  checkAchievements();
}

function pomodoroReset() {
  const ps = state.pomoState;
  clearInterval(ps.interval);
  ps.running = false;
  ps.mode = 'focus';
  ps.total = state.pomoConfig.focus * 60;
  ps.remaining = ps.total;
  renderPomodoro();
}

function pomodoroSkip() {
  const ps = state.pomoState;
  clearInterval(ps.interval);
  ps.running = false;
  ps.remaining = 0;
  pomodoroComplete();
}

/* ═══════════════════════════════════════════
   WATER / SLEEP / EXERCISE
   ═══════════════════════════════════════════ */
function renderWater() {
  const today = todayISO();
  const count = state.waterLog[today] || 0;
  const container = $('waterGlasses');
  const countEl = $('waterCount');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const glass = document.createElement('div');
    glass.className = 'water-glass' + (i < count ? ' filled' : '');
    container.appendChild(glass);
  }
  if (countEl) countEl.textContent = count;
}

function addWaterGlass() {
  const today = todayISO();
  if (!state.waterLog[today]) state.waterLog[today] = 0;
  if (state.waterLog[today] >= 8) {
    showToast('شربت 8 أكواب كفاية! 💧', 'fa-check');
    return;
  }
  state.waterLog[today]++;
  vibrate(30);
  saveState();
  renderWater();
  const count = state.waterLog[today];
  if (count === 8) {
    launchConfetti(30);
    sendInAppNotification('💧 برافو!', 'شربت 8 أكواب النهاردة');
    addXP(15, 'ماء كامل');
  } else {
    showToast(`كوب ${count} من 8 💧`);
    addXP(2, 'كوب ماء');
  }
  checkAchievements();
}

/* ═══════════════════════════════════════════
   BREATHING
   ═══════════════════════════════════════════ */
function startBreathing() {
  const bs = state.breathState;
  if (bs.running) {
    clearInterval(bs.interval);
    bs.running = false;
    bs.phase = 'inhale';
    const circle = $('breathingCircle');
    if (circle) circle.className = 'breathing-circle';
    const txt = $('breathingText');
    if (txt) txt.textContent = 'اضغط ابدأ';
    const btn = $('breathStartBtn');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> ابدأ التمرين';
    return;
  }
  bs.running = true;
  bs.phase = 'inhale';
  bs.count = 0;
  const btn = $('breathStartBtn');
  if (btn) btn.innerHTML = '<i class="fa-solid fa-stop"></i> إيقاف';
  doBreathingPhase();
  bs.interval = setInterval(doBreathingPhase, 4000);
}

function doBreathingPhase() {
  const bs = state.breathState;
  const circle = $('breathingCircle');
  const txt = $('breathingText');
  if (!circle || !txt) return;
  if (bs.phase === 'inhale') {
    circle.className = 'breathing-circle inhale';
    txt.textContent = 'شهيق... 🫁';
    bs.phase = 'hold';
  } else if (bs.phase === 'hold') {
    txt.textContent = 'احبس... ✋';
    bs.phase = 'exhale';
  } else {
    circle.className = 'breathing-circle exhale';
    txt.textContent = 'زفير... 😮‍💨';
    bs.phase = 'inhale';
    bs.count++;
    const today = todayISO();
    if (!state.breathLog[today]) state.breathLog[today] = { sessions:0, minutes:0 };
    if (bs.count === 5) {
      state.breathLog[today].sessions++;
      state.breathLog[today].minutes += 2;
      bs.count = 0;
      saveState();
      addXP(10, 'تنفس');
    }
  }
}

/* ═══════════════════════════════════════════
   MEDICINES / WEIGHT
   ═══════════════════════════════════════════ */
function renderMedicines() {
  const el = $('medicinesList');
  if (!el) return;
  if (state.medicines.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-pills"></i><p>مفيش أدوية</p></div>`;
    return;
  }
  el.innerHTML = state.medicines.map(m => `
    <div class="task-item">
      <div class="task-body">
        <div class="task-title">💊 ${escapeHtml(m.name)}</div>
        <div class="task-meta">
          <span>${escapeHtml(m.dose || '')}</span>
          <span class="badge badge-med">${m.times}× يوميًا</span>
        </div>
      </div>
      <button class="task-delete" onclick="deleteMedicine('${m.id}')"><i class="fa-solid fa-trash"></i></button>
    </div>`).join('');
}

function openMedicineModal() {
  const modal = $('medicineModal');
  if (!modal) return;
  $('medicineName').value = '';
  $('medicineDose').value = '';
  $('medicineTimes').value = '1';
  modal.classList.add('open');
}

function saveMedicine() {
  const name = $('medicineName').value.trim();
  const dose = $('medicineDose').value.trim();
  const times = parseInt($('medicineTimes').value);
  if (!name) { showToast('اكتب الاسم', 'fa-exclamation-circle'); return; }
  state.medicines.push({ id: genId(), name, dose, times, createdAt: Date.now() });
  saveState();
  renderMedicines();
  closeModal('medicineModal');
  showToast('تمت الإضافة ✓');
}

function deleteMedicine(id) {
  if (!confirm('تحذف الدواء؟')) return;
  state.medicines = state.medicines.filter(m => m.id !== id);
  saveState();
  renderMedicines();
}

function renderWeights() {
  const el = $('weightList');
  if (!el) return;
  if (state.weights.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-weight-scale"></i><p>مفيش سجلات</p></div>`;
    renderWeightChart();
    return;
  }
  const sorted = [...state.weights].sort((a, b) => b.date.localeCompare(a.date));
  el.innerHTML = sorted.slice(0, 10).map(w => `
    <div class="task-item" style="border-right-color:var(--cyan)">
      <div class="task-body">
        <div class="task-title ltr">${w.value} kg</div>
        <div class="task-meta"><span>${formatDateAr(w.date)}</span></div>
      </div>
      <button class="task-delete" onclick="deleteWeight('${w.id}')"><i class="fa-solid fa-trash"></i></button>
    </div>`).join('');
  renderWeightChart();
}

function renderWeightChart() {
  const canvas = $('weightChart');
  if (!canvas || typeof Chart === 'undefined') return;
  const sorted = [...state.weights].sort((a, b) => a.date.localeCompare(b.date));
  if (charts.weight) charts.weight.destroy();
  charts.weight = new Chart(canvas, {
    type: 'line',
    data: {
      labels: sorted.map(w => w.date.substring(5)),
      datasets: [{
        label: 'الوزن (kg)',
        data: sorted.map(w => w.value),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6,182,212,.15)',
        fill: true, tension: .4,
        pointRadius: 4, pointBackgroundColor: '#06b6d4',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#a3a3a3' } },
        x: { grid: { display: false }, ticks: { color: '#a3a3a3' } }
      }
    }
  });
}

function openWeightModal() {
  const modal = $('weightModal');
  if (!modal) return;
  $('weightValue').value = '';
  $('weightDate').value = todayISO();
  modal.classList.add('open');
}

function saveWeight() {
  const value = parseFloat($('weightValue').value);
  const date = $('weightDate').value;
  if (!value) { showToast('اكتب الوزن', 'fa-exclamation-circle'); return; }
  state.weights.push({ id: genId(), value, date, createdAt: Date.now() });
  saveState();
  renderWeights();
  closeModal('weightModal');
  showToast('تم التسجيل ✓');
}

function deleteWeight(id) {
  state.weights = state.weights.filter(w => w.id !== id);
  saveState();
  renderWeights();
}

/* ═══════════════════════════════════════════
   MAP (Leaflet)
   ═══════════════════════════════════════════ */
function initMap() {
  if (mainMap || typeof L === 'undefined') return;
  const el = $('mainMap');
  if (!el) return;
  mainMap = L.map('mainMap').setView([CONFIG.latitude, CONFIG.longitude], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19,
  }).addTo(mainMap);
  renderMapMarkers();
  renderPlaces();
}

function renderMapMarkers() {
  if (!mainMap) return;
  mapMarkers.forEach(m => mainMap.removeLayer(m));
  mapMarkers = [];
  const icons = {
    home: L.divIcon({ html:'<div style="font-size:24px">🏠</div>', className:'', iconSize:[30,30] }),
    uni: L.divIcon({ html:'<div style="font-size:24px">🎓</div>', className:'', iconSize:[30,30] }),
    fav: L.divIcon({ html:'<div style="font-size:24px">⭐</div>', className:'', iconSize:[30,30] }),
    loved: L.divIcon({ html:'<div style="font-size:24px">💕</div>', className:'', iconSize:[30,30] }),
  };
  state.places.forEach(p => {
    const m = L.marker([p.lat, p.lng], { icon: icons[p.category] || icons.fav })
      .addTo(mainMap)
      .bindPopup(`<b>${escapeHtml(p.name)}</b><br>${p.category}`);
    mapMarkers.push(m);
  });
}

function renderPlaces() {
  const el = $('placesList');
  if (!el) return;
  if (state.places.length === 0) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-map-pin"></i><p>مفيش أماكن محفوظة</p></div>`;
    return;
  }
  el.innerHTML = state.places.map(p => `
    <div class="task-item">
      <div class="task-body">
        <div class="task-title">📍 ${escapeHtml(p.name)}</div>
        <div class="task-meta">
          <span class="ltr">${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</span>
          <span class="badge badge-med">${p.category}</span>
        </div>
      </div>
      <button class="task-delete" onclick="deletePlace('${p.id}')"><i class="fa-solid fa-trash"></i></button>
    </div>`).join('');
}

function openPlaceModal() {
  const modal = $('placeModal');
  if (!modal) return;
  $('placeName').value = '';
  $('placeCategory').value = 'fav';
  $('placeLat').value = CONFIG.latitude;
  $('placeLng').value = CONFIG.longitude;
  modal.classList.add('open');
}

function savePlace() {
  const name = $('placeName').value.trim();
  const category = $('placeCategory').value;
  const lat = parseFloat($('placeLat').value);
  const lng = parseFloat($('placeLng').value);
  if (!name || !lat || !lng) { showToast('املأ البيانات', 'fa-exclamation-circle'); return; }
  state.places.push({ id: genId(), name, category, lat, lng, createdAt: Date.now() });
  saveState();
  renderMapMarkers();
  renderPlaces();
  closeModal('placeModal');
  showToast('تمت الإضافة ✓');
}

function useCurrentLocation() {
  if (!navigator.geolocation) { showToast('مش مدعوم', 'fa-exclamation-circle'); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    $('placeLat').value = pos.coords.latitude.toFixed(6);
    $('placeLng').value = pos.coords.longitude.toFixed(6);
    showToast('تم تحديد موقعك ✓', 'fa-location-dot');
  }, () => showToast('محتاج تسمح بالموقع', 'fa-exclamation-circle'));
}

function deletePlace(id) {
  if (!confirm('تحذف المكان؟')) return;
  state.places = state.places.filter(p => p.id !== id);
  saveState();
  renderMapMarkers();
  renderPlaces();
}

/* ═══════════════════════════════════════════
   CHARTS (Dashboard)
   ═══════════════════════════════════════════ */
function renderCharts() {
  if (typeof Chart === 'undefined') return;
  renderTasksChart();
  renderDoughnutChart();
  renderMoodChart();
  renderPomoChart();
}

function renderTasksChart() {
  const canvas = $('tasksChart');
  if (!canvas) return;
  const labels = [];
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const done = state.tasks.filter(t => {
      if (!t.completedAt) return false;
      const cd = new Date(t.completedAt);
      const ck = `${cd.getFullYear()}-${String(cd.getMonth()+1).padStart(2,'0')}-${String(cd.getDate()).padStart(2,'0')}`;
      return ck === key;
    }).length;
    labels.push(['أحد','إثنين','ثلاثا','أربعا','خميس','جمعة','سبت'][d.getDay()]);
    data.push(done);
  }
  if (charts.tasks) charts.tasks.destroy();
  charts.tasks = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'مهام مكتملة',
        data,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,.15)',
        fill: true, tension: .4,
        pointRadius: 5, pointBackgroundColor: '#f97316',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#a3a3a3', stepSize: 1 } },
        x: { grid: { display: false }, ticks: { color: '#a3a3a3' } }
      }
    }
  });
}

function renderDoughnutChart() {
  const canvas = $('doughnutChart');
  if (!canvas) return;
  const types = { daily:'يومية', assignment:'واجبات', exam:'امتحانات', work:'عمل' };
  const counts = Object.keys(types).map(k => state.tasks.filter(t => t.type === k).length);
  if (charts.doughnut) charts.doughnut.destroy();
  charts.doughnut = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: Object.values(types),
      datasets: [{
        data: counts,
        backgroundColor: ['#16a34a','#3b82f6','#dc2626','#8b5cf6'],
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#a3a3a3', font: { family: 'Cairo', size: 12 } } }
      }
    }
  });
}

function renderMoodChart() {
  const canvas = $('moodChart');
  if (!canvas) return;
  const emojiVal = { amazing:5, good:4, ok:3, tired:2, sad:1 };
  const labels = [];
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (state.moods[key]) {
      labels.push(key.substring(5));
      data.push(emojiVal[state.moods[key]] || 3);
    }
  }
  if (charts.mood) charts.mood.destroy();
  if (labels.length === 0) return;
  charts.mood = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'المزاج',
        data,
        backgroundColor: data.map(v => v >= 4 ? '#16a34a' : v >= 3 ? '#eab308' : '#dc2626'),
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 5, grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#a3a3a3' } },
        x: { grid: { display: false }, ticks: { color: '#a3a3a3', font: { size: 9 } } }
      }
    }
  });
}

function renderPomoChart() {
  const canvas = $('pomoChart');
  if (!canvas) return;
  const labels = [];
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    labels.push(['أحد','إثنين','ثلاثا','أربعا','خميس','جمعة','سبت'][d.getDay()]);
    data.push(state.pomoSessions[key] || 0);
  }
  if (charts.pomo) charts.pomo.destroy();
  charts.pomo = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'جلسات',
        data,
        backgroundColor: '#8b5cf6',
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#a3a3a3', stepSize: 1 } },
        x: { grid: { display: false }, ticks: { color: '#a3a3a3' } }
      }
    }
  });
}

/* ═══════════════════════════════════════════
   WEATHER
   ═══════════════════════════════════════════ */
async function fetchWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${CONFIG.latitude}&longitude=${CONFIG.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Africa/Cairo&forecast_days=3`;
    const res = await fetch(url);
    const data = await res.json();
    const c = data.current, daily = data.daily;
    const info = getWeatherInfo(c.weather_code);
    let forecast = '';
    if (daily?.time) {
      const days = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
      for (let i = 1; i < Math.min(3, daily.time.length); i++) {
        const d = new Date(daily.time[i]);
        forecast += `<div style="display:flex;justify-content:space-between;align-items:center;padding:1.5mm 0;border-top:1px dashed var(--line);font-size:2.8mm;font-weight:600">
          <span style="color:var(--muted)">${days[d.getDay()]}</span>
          <span class="ltr" style="color:var(--accent-light);font-weight:800">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</span>
        </div>`;
      }
    }
    const wrap = $('weatherWrap');
    if (wrap) wrap.innerHTML = `
      <div class="weather-icon">${info.emoji}</div>
      <div class="weather-info">
        <div class="weather-temp ltr">${Math.round(c.temperature_2m)}°</div>
        <div class="weather-desc">${info.label} · feels ${Math.round(c.apparent_temperature)}°</div>
        <div class="weather-meta">
          <span><i class="fa-solid fa-droplet"></i> ${c.relative_humidity_2m}%</span>
          <span><i class="fa-solid fa-wind"></i> ${Math.round(c.wind_speed_10m)} كم/س</span>
        </div>
        <div style="margin-top:2mm">${forecast}</div>
      </div>`;
  } catch (e) { console.error('Weather:', e); }
}

function getWeatherInfo(code) {
  const map = {
    0:{ emoji:'☀️', label:'صحو' }, 1:{ emoji:'🌤️', label:'صافٍ جزئياً' },
    2:{ emoji:'⛅', label:'غائم جزئياً' }, 3:{ emoji:'☁️', label:'غائم' },
    45:{ emoji:'🌫️', label:'ضباب' }, 48:{ emoji:'🌫️', label:'ضباب متجمد' },
    51:{ emoji:'🌦️', label:'رشّ خفيف' }, 61:{ emoji:'🌧️', label:'مطر' },
    71:{ emoji:'🌨️', label:'ثلج' }, 80:{ emoji:'🌧️', label:'زخات' },
    95:{ emoji:'⛈️', label:'عاصفة' },
  };
  return map[code] || { emoji:'🌡️', label:'طقس' };
}

/* ═══════════════════════════════════════════
   MATCHES
   ═══════════════════════════════════════════ */
async function fetchMatches(leagueId) {
  const list = $('matchesList');
  if (!list) return;
  list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-spinner fa-spin"></i><p>جاري التحميل...</p></div>`;
  try {
    const url = `https://www.thesportsdb.com/api/v1/json/${CONFIG.sportsApiKey}/eventsnextleague.php?id=${leagueId}`;
    const res = await fetch(url);
    const data = await res.json();
    const events = data.events || [];
    if (events.length === 0) {
      list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-futbol"></i><p>مفيش ماتشات قادمة</p></div>`;
      return;
    }
    list.innerHTML = events.slice(0, 20).map(renderMatchCard).join('');
  } catch (e) {
    list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-wifi"></i><p>محتاج نت</p></div>`;
  }
}

function renderMatchCard(m) {
  const date = m.dateEvent || '';
  const time = m.strTime ? m.strTime.substring(0,5) : '';
  const home = m.strHomeTeam || '', away = m.strAwayTeam || '';
  const hLogo = m.strHomeTeamBadge || '', aLogo = m.strAwayTeamBadge || '';
  const hScore = m.intHomeScore, aScore = m.intAwayScore;
  const status = m.strStatus || 'Not Started';
  const isLive = status === 'Live' || status === '1H' || status === '2H' || status === 'HT';
  const isFin = hScore !== null && hScore !== undefined;
  const cc = isLive ? 'live' : (isFin ? 'finished' : '');
  const sc = isLive ? 'status-live' : (isFin ? 'status-finished' : 'status-scheduled');
  const st = isLive ? 'مباشر 🔴' : (isFin ? 'انتهى' : 'قادم');
  const score = isFin
    ? `<span>${hScore}</span> <span style="font-size:3mm;color:var(--muted)">-</span> <span>${aScore}</span>`
    : `<span class="vs">VS</span>`;
  return `
    <div class="match-card ${cc}">
      <div class="match-top">
        <span class="match-league"><i class="fa-solid fa-trophy" style="color:var(--gold)"></i> ${escapeHtml(m.strLeague || '')}</span>
        <span class="match-status ${sc}">${st}</span>
      </div>
      <div class="match-top" style="margin-bottom:2mm">
        <span style="color:var(--muted);font-size:2.5mm">📅 ${date}${time ? ' · ' + time : ''}</span>
      </div>
      <div class="match-body">
        <div class="team">
          <img class="team-logo" src="${hLogo}" alt="" onerror="this.style.display='none'">
          <div class="team-name">${escapeHtml(home)}</div>
        </div>
        <div class="match-score ltr">${score}</div>
        <div class="team">
          <img class="team-logo" src="${aLogo}" alt="" onerror="this.style.display='none'">
          <div class="team-name">${escapeHtml(away)}</div>
        </div>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════
   FOFA AI
   ═══════════════════════════════════════════ */
const FOFA = {
  get apiKey() { return (window.MASAR_CONFIG?.GROQ_API_KEY) || ''; },
  get model() { return (window.MASAR_CONFIG?.GROQ_MODEL) || 'llama-3.3-70b-versatile'; },
  get endpoint() { return (window.MASAR_CONFIG?.GROQ_ENDPOINT) || 'https://api.groq.com/openai/v1/chat/completions'; },
};

const FOFA_SYSTEM = `اسمك "فوفا"، بنت مصرية دمها خفيف جداً ومضحكة.
بتتكلمي بالعامية المصرية. ردودك قصيرة (2-3 جمل).
بتستخدمي إيموجيز 😄🤣🔥.

🎯 لو المستخدم طلب أمر، ردّي بـ JSON:
- "أضف [اسم]" → {"action":"create_loved","name":"[الاسم]"}
- "احذف [اسم]" → {"action":"delete_loved","name":"[الاسم]"}
- "أضف مهمة [اسم]" → {"action":"create_task","title":"[اسم]","priority":"med"}
- "خلصت [مهمة]" → {"action":"approve_task","title":"[اسم]"}
- "سجل تسبيح" → {"action":"tasbeeh"}
- "صليت [صلاة]" → {"action":"mark_prayer","prayer":"[fajr/dhuhr/asr/maghrib/isha]"}

غير كده ردّي بنص عادي.`;

function renderChat() {
  const el = $('chatLog');
  if (!el) return;
  if (chatLog.length === 0) {
    el.innerHTML = `<div style="text-align:center;padding:6mm 2mm;color:var(--muted-2);font-size:2.9mm;font-weight:600">
      ابدأ الكلام مع فوفا 🎙️<br>
      <span style="font-size:2.5mm;opacity:.7">جرب: "أضف يوسف" أو "صليت المغرب"</span>
    </div>`;
    return;
  }
  el.innerHTML = chatLog.map(m => `<div class="chat-msg ${m.role}">${escapeHtml(m.text)}</div>`).join('');
  el.scrollTop = el.scrollHeight;
}

function buildFofaContext() {
  const now = new Date();
  const parts = [`الوقت: ${now.toLocaleTimeString('ar-EG')} - ${now.toLocaleDateString('ar-EG')}`];
  if (state.nextPrayerData) {
    const p = state.nextPrayerData;
    const hrs = Math.floor(p.secondsUntil / 3600);
    const mins = Math.floor((p.secondsUntil % 3600) / 60);
    parts.push(`الصلاة القادمة: ${p.name} ${formatTime(p.time)} (فاضل ${hrs}س ${mins}د)`);
  }
  if (state.prayers) parts.push('مواقيت: ' + state.prayers.map(p => `${p.name}:${p.time}`).join(' | '));
  const today = todayISO();
  const log = state.prayerLog[today] || {};
  parts.push(`الصلوات: ${Object.values(log).filter(Boolean).length}/5`);
  const todayTasks = state.tasks.filter(t => t.date === today && !t.done && !t.approved);
  if (todayTasks.length) parts.push('مهام النهاردة: ' + todayTasks.map(t => t.title).join(', '));
  const todayDay = ['sun','mon','tue','wed','thu','fri','sat'][now.getDay()];
  const todayLec = LECTURES.find(d => d.day === todayDay);
  if (todayLec) parts.push('محاضرات النهاردة: ' + todayLec.items.map(i => `${i.name} ${i.time}`).join(' | '));
  const attendedToday = Object.keys(state.lectureAttendance).filter(k => k.endsWith(`_${today}`)).length;
  parts.push(`حضرت النهاردة: ${attendedToday} محاضرة`);
  parts.push(`إجمالي تسبيحات: ${state.tasbeehTotal}`);
  parts.push(`الأحباب: ${lovedOnes.length}`);
  parts.push(`XP: ${state.xp} - Level ${getLevelInfo(state.xp).level.lv}`);
  return parts.join('\n');
}

async function askFofa(userMessage) {
  const key = FOFA.apiKey;
  if (!key || key.includes('حط')) {
    return 'معلش يا نجم، محتاج تحط مفتاح Groq في config.js 😅';
  }
  const ctx = buildFofaContext();
  const messages = [
    { role:'system', content:FOFA_SYSTEM },
    { role:'system', content:`[سياق التطبيق]\n${ctx}` },
    { role:'user', content:userMessage },
  ];
  try {
    const res = await fetch(FOFA.endpoint, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${key}` },
      body: JSON.stringify({
        model: FOFA.model, messages,
        temperature: 0.9, max_tokens: 400, top_p: 0.95, stream: false,
      }),
    });
    if (!res.ok) {
      if (res.status === 401) return 'مفتاح Groq غلط 😅';
      if (res.status === 429) return 'كتير طلبات دلوقتي، استنى دقيقة 😅';
      return 'في مشكلة، جرب تاني 😅';
    }
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || 'معلش مش فاهمة 😅';
  } catch (e) {
    return 'شكلك مقطوع من النت 😂';
  }
}

function tryParseAction(text) {
  if (!text) return null;
  const match = text.match(/\{[^{}]*"action"[^{}]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch(e) { return null; }
}

async function executeAction(action) {
  if (!action) return null;
  if (action.action === 'create_loved') {
    const name = action.name;
    if (!name) return null;
    lovedOnes.push({ id:genId(), name, desc:'', phone:'', photo:null, createdAt:Date.now() });
    saveLoved(); renderLoved(); checkAchievements();
    sendInAppNotification('💕 أضفت حبيب', name);
    return `تمام! أضفت ${name} 💕`;
  }
  if (action.action === 'delete_loved') {
    const found = lovedOnes.find(p => p.name.includes(action.name));
    if (!found) return `مفيش حد اسمه ${action.name} 🤔`;
    if (confirm(`تحذف ${found.name}؟`)) {
      lovedOnes = lovedOnes.filter(p => p.id !== found.id);
      saveLoved(); renderLoved();
      return `خلاص، شيلت ${found.name}`;
    }
    return 'تمام';
  }
  if (action.action === 'create_task') {
    state.tasks.push({
      id:genId(), title:action.title, date:todayISO(),
      priority:action.priority || 'med', type:'daily',
      done:false, approved:false, createdAt:Date.now(),
    });
    saveState(); renderTasks(); checkAchievements();
    sendInAppNotification('✅ مهمة جديدة', action.title);
    return `تمام! ضفت مهمة "${action.title}" ✅`;
  }
  if (action.action === 'approve_task') {
    const found = state.tasks.find(t => t.title.includes(action.title) && !t.done);
    if (!found) return `مفيش مهمة "${action.title}" 🤔`;
    found.done = true; found.approved = true; found.completedAt = Date.now();
    saveState(); renderTasks(); launchConfetti(15);
    return `تم! اعتمدت "${found.title}" ✅`;
  }
  if (action.action === 'tasbeeh') {
    tasbeehTap();
    return `تم! العداد وصل ${state.tasbeeh.count} 📿`;
  }
  if (action.action === 'mark_prayer') {
    const today = todayISO();
    if (!state.prayerLog[today]) state.prayerLog[today] = {};
    state.prayerLog[today][action.prayer] = true;
    saveState(); renderPrayerTracker();
    const p = PRAYER_NAMES.find(x => x.id === action.prayer);
    return `تمام! سجلت ${p?.ar || action.prayer} 🤲`;
  }
  return null;
}

async function handleVoiceInput(text) {
  if (!text || !text.trim()) return;
  chatLog.push({ role:'user', text, at:Date.now() });
  saveChat(); renderChat();
  const statusEl = $('fofaStatus');
  const avatarEl = $('fofaAvatar');
  const hintEl = $('voiceHint');
  if (statusEl) statusEl.textContent = '🤔 بتفكر...';
  if (avatarEl) avatarEl.classList.add('listening');
  if (hintEl) hintEl.textContent = 'فوفا بتفكر...';

  const reply = await askFofa(text);
  const action = tryParseAction(reply);
  let finalText = reply;
  if (action) {
    const result = await executeAction(action);
    if (result) finalText = result;
  }
  chatLog.push({ role:'fofa', text:finalText, at:Date.now() });
  saveChat(); renderChat();
  speak(finalText);
  if (statusEl) statusEl.textContent = 'جاهزة للدردشة';
  if (avatarEl) avatarEl.classList.remove('listening');
  if (hintEl) hintEl.textContent = 'دوس واتكلم مع فوفا';
  checkAchievements();
}

function speak(text) {
  if (!state.voiceEnabled) return;
  if (!('speechSynthesis' in window)) return;
  const clean = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/\{[^}]*\}/g, '').trim();
  if (!clean) return;
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = 'ar-EG'; u.rate = 1.05; u.pitch = 1.15;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function initSpeech() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR();
  r.lang = 'ar-EG'; r.continuous = false; r.interimResults = false;
  r.onresult = e => handleVoiceInput(e.results[0][0].transcript);
  r.onerror = e => { stopRecording(); if (e.error === 'not-allowed') showToast('محتاج تسمح للمايك', 'fa-microphone-slash'); };
  r.onend = () => stopRecording();
  return r;
}

function startRecording() {
  if (!recognition) recognition = initSpeech();
  if (!recognition) { showToast('المتصفح مش بيدعم', 'fa-exclamation-circle'); return; }
  try {
    recognition.start();
    isRecording = true;
    $('voiceBtn')?.classList.add('recording');
    $('fofaAvatar')?.classList.add('listening');
    const s = $('fofaStatus'); if (s) s.textContent = '🎙️ بتسمعك...';
    const h = $('voiceHint'); if (h) h.textContent = 'اتكلم براحتك...';
  } catch (e) {}
}

function stopRecording() {
  isRecording = false;
  $('voiceBtn')?.classList.remove('recording');
  $('fofaAvatar')?.classList.remove('listening');
  const s = $('fofaStatus'); if (s) s.textContent = 'جاهزة للدردشة';
  const h = $('voiceHint'); if (h) h.textContent = 'دوس واتكلم مع فوفا';
}

async function sendFofaText() {
  const input = $('fofaInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  await handleVoiceInput(text);
}

function fofaQuick(text) { handleVoiceInput(text); }

function clearChatLog() {
  if (!confirm('تمسح المحادثة؟')) return;
  chatLog = [];
  saveChat(); renderChat();
  showToast('تم المسح', 'fa-trash');
}

/* ═══════════════════════════════════════════
   ACHIEVEMENTS
   ═══════════════════════════════════════════ */
function checkAchievements() {
  const unlocked = JSON.parse(localStorage.getItem(CONFIG.badgesKey) || '[]');
  let newUnlock = null;
  BADGES.forEach(b => {
    if (!unlocked.includes(b.id) && b.check(state)) {
      unlocked.push(b.id);
      newUnlock = b;
    }
  });
  localStorage.setItem(CONFIG.badgesKey, JSON.stringify(unlocked));
  if (newUnlock) {
    launchConfetti(30);
    showToast(`🏆 فتحت شارة: ${newUnlock.name}!`, 'fa-trophy');
    addXP(50, 'شارة');
    addCoins(25);
    if (state.notificationsEnabled) sendInAppNotification('🏆 شارة جديدة!', newUnlock.name);
  }
  renderBadges();
}

function renderBadges() {
  const grid = $('badgesGrid');
  if (!grid) return;
  const unlocked = JSON.parse(localStorage.getItem(CONFIG.badgesKey) || '[]');
  grid.innerHTML = BADGES.map(b => `
    <div class="badge-card ${unlocked.includes(b.id) ? 'unlocked' : 'locked'}">
      <span class="badge-emoji">${b.emoji}</span>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════
   CHALLENGES / LEADERBOARD
   ═══════════════════════════════════════════ */
function renderChallenge() {
  const today = todayISO();
  const idx = new Date().getDate() % CHALLENGES.length;
  const ch = CHALLENGES[idx];
  const done = state.completedChallenges.includes(today);
  const textEl = $('challengeText');
  const rewardEl = $('challengeReward');
  const btn = $('challengeBtn');
  if (textEl) textEl.textContent = ch.text;
  if (rewardEl) rewardEl.textContent = ch.reward;
  if (btn) {
    btn.classList.toggle('done', done);
    btn.innerHTML = done ? '<i class="fa-solid fa-check"></i> خلصته ✓' : '<i class="fa-solid fa-check"></i> خلصته';
  }
}

function completeChallenge() {
  const today = todayISO();
  if (state.completedChallenges.includes(today)) return;
  state.completedChallenges.push(today);
  const idx = new Date().getDate() % CHALLENGES.length;
  const ch = CHALLENGES[idx];
  addCoins(ch.reward);
  addXP(ch.reward);
  launchConfetti(50);
  showToast(`🎉 +${ch.reward} عملة!`, 'fa-coins');
  sendInAppNotification('🎯 تحدي مكتمل!', `+${ch.reward} عملة`);
  saveState();
  renderChallenge();
}

function renderLeaderboard() {
  const el = $('leaderboardCard');
  if (!el) return;
  const users = [
    { name:'إنت', xp:state.xp },
    { name:'أحمد م.', xp:1250 },
    { name:'محمود س.', xp:980 },
    { name:'سارة ع.', xp:760 },
    { name:'يوسف ح.', xp:520 },
  ].sort((a, b) => b.xp - a.xp);
  el.innerHTML = users.map((u, i) => `
    <div class="leaderboard-row ${i < 3 ? `top-${i+1}` : ''}">
      <div class="leaderboard-rank">${i+1}</div>
      <div class="leaderboard-name">${u.name}</div>
      <div class="leaderboard-score ltr">${u.xp} XP</div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════
   SEARCH
   ═══════════════════════════════════════════ */
function openSearch() {
  const box = $('searchBox');
  if (!box) return;
  box.classList.add('open');
  setTimeout(() => $('searchInput')?.focus(), 100);
}

function closeSearch() {
  const box = $('searchBox');
  if (!box) return;
  box.classList.remove('open');
  $('searchInput').value = '';
  $('searchResults').innerHTML = '';
}

function quickSearch(q) {
  $('searchInput').value = q;
  performSearch(q);
}

function performSearch(query) {
  const results = $('searchResults');
  if (!results) return;
  if (!query.trim()) { results.innerHTML = ''; return; }
  const q = query.toLowerCase();
  const items = [];
  state.tasks.forEach(t => {
    if (t.title.toLowerCase().includes(q))
      items.push({ type:'مهمة', icon:'fa-list-check', title:t.title, sub:formatDateAr(t.date), action:() => { switchTab('tasks'); closeSearch(); } });
  });
  state.notes.forEach(n => {
    if (n.title.toLowerCase().includes(q) || (n.body||'').toLowerCase().includes(q))
      items.push({ type:'ملاحظة', icon:'fa-pen-fancy', title:n.title, sub:(n.body||'').substring(0,50), action:() => { switchTab('notes'); closeSearch(); } });
  });
  state.appointments.forEach(a => {
    if (a.title.toLowerCase().includes(q))
      items.push({ type:'موعد', icon:'fa-calendar', title:a.title, sub:formatDateAr(a.date), action:() => { switchTab('appointments'); closeSearch(); } });
  });
  lovedOnes.forEach(p => {
    if (p.name.toLowerCase().includes(q))
      items.push({ type:'حبيب', icon:'fa-heart', title:p.name, sub:p.desc, action:() => { switchTab('memories'); closeSearch(); } });
  });
  LECTURES.forEach(day => day.items.forEach(it => {
    if (it.name.toLowerCase().includes(q) || it.teacher.toLowerCase().includes(q))
      items.push({ type:'محاضرة', icon:'fa-book', title:it.name, sub:`${day.dayAr} · ${it.time} · ${it.hall}`, action:() => { switchTab('lectures'); closeSearch(); } });
  }));
  state.expenses.forEach(e => {
    if (e.title.toLowerCase().includes(q))
      items.push({ type:'مصروف', icon:'fa-coins', title:e.title, sub:`${e.amount} ج.م`, action:() => { switchTab('study'); closeSearch(); } });
  });
  state.books.forEach(b => {
    if (b.title.toLowerCase().includes(q))
      items.push({ type:'كتاب', icon:'fa-book', title:b.title, sub:b.author, action:() => { switchTab('study'); closeSearch(); } });
  });

  if (items.length === 0) {
    results.innerHTML = `<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><p>مفيش نتائج</p></div>`;
    return;
  }
  results.innerHTML = items.slice(0, 20).map((it, i) => `
    <div class="search-result-item" data-i="${i}">
      <i class="fa-solid ${it.icon}"></i>
      <div style="flex:1;min-width:0">
        <div class="title">${escapeHtml(it.title)}</div>
        <div class="sub">${escapeHtml(it.sub || '')}</div>
      </div>
      <span class="type">${it.type}</span>
    </div>`).join('');
  results.querySelectorAll('.search-result-item').forEach((el, i) => {
    el.addEventListener('click', () => items[i].action());
  });
}

/* ═══════════════════════════════════════════
   TOOLS
   ═══════════════════════════════════════════ */
function openQRGenerator() {
  const text = prompt('اكتب الحاجة اللي عايز تعملها QR:', 'https://github.com/budiabdallah20');
  if (!text) return;
  const container = $('qrCanvas');
  if (!container) return;
  container.innerHTML = '';
  if (typeof QRCode !== 'undefined') {
    new QRCode(container, { text, width: 200, height: 200, colorDark:'#000', colorLight:'#fff' });
  } else {
    container.innerHTML = `<p style="color:#000">مكتبة QR مش محمّلة</p>`;
  }
  $('qrLabel').textContent = text;
  $('qrModal').classList.add('open');
}

function downloadQR() {
  const canvas = $('qrCanvas').querySelector('canvas');
  if (!canvas) return;
  const a = document.createElement('a');
  a.href = canvas.toDataURL();
  a.download = `qr-${Date.now()}.png`;
  a.click();
}

function openPasswordGenerator() {
  const length = parseInt(prompt('طول الباسورد (8-32):', '16')) || 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let pass = '';
  for (let i = 0; i < length; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  navigator.clipboard.writeText(pass).then(() => {
    showToast('تم النسخ! 📋', 'fa-clipboard-check');
    alert(`باسورد جديد:\n\n${pass}\n\n(تم نسخه تلقائياً)`);
  }).catch(() => {
    alert(`باسورد جديد:\n\n${pass}`);
  });
}

function openUnitConverter() {
  const value = parseFloat(prompt('اكتب القيمة:', '100'));
  if (isNaN(value)) return;
  const type = prompt('نوع التحويل:\n1- كم إلى ميل\n2- كجم إلى باوند\n3- سيليزيوس إلى فهرنهايت\n4- متر إلى قدم', '1');
  let result = '';
  switch (type) {
    case '1': result = `${value} كم = ${(value * 0.621371).toFixed(2)} ميل`; break;
    case '2': result = `${value} كجم = ${(value * 2.20462).toFixed(2)} باوند`; break;
    case '3': result = `${value}°C = ${((value * 9/5) + 32).toFixed(1)}°F`; break;
    case '4': result = `${value} م = ${(value * 3.28084).toFixed(2)} قدم`; break;
    default: result = 'تحويل غير معروف';
  }
  alert(result);
}

function openRandomPicker() {
  const items = prompt('اكتب العناصر مفصولة بفاصلة:', 'أحمد، محمد، يوسف، سارة');
  if (!items) return;
  const arr = items.split(',').map(s => s.trim()).filter(Boolean);
  if (arr.length === 0) return;
  const picked = arr[Math.floor(Math.random() * arr.length)];
  launchConfetti(30);
  alert(`🎲 النتيجة:\n\n${picked}`);
}

function openCalculator() {
  const expr = prompt('اكتب العملية الحسابية:', '25 * 4 + 10');
  if (!expr) return;
  try {
    const result = Function('"use strict"; return (' + expr + ')')();
    alert(`النتيجة: ${result}`);
  } catch (e) {
    alert('عملية غير صحيحة');
  }
}

function openStopwatch() {
  const sw = prompt('ساعة إيقاف:\nاكتب عدد الثواني:', '60');
  const secs = parseInt(sw);
  if (isNaN(secs) || secs <= 0) return;
  showToast(`⏱️ Timer ${secs} ثانية`);
  setTimeout(() => {
    launchConfetti(40);
    sendInAppNotification('⏰ خلص الوقت!', `${secs} ثانية خلصوا`);
  }, secs * 1000);
}

function openTextTools() {
  const text = prompt('الصق النص:', '');
  if (!text) return;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const lines = text.split('\n').length;
  alert(`📝 إحصائيات النص:\n\n• الكلمات: ${words}\n• الحروف: ${chars}\n• بدون مسافات: ${charsNoSpace}\n• الأسطر: ${lines}`);
}

function openColorPicker() {
  const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  const r = parseInt(hex.substring(1,3), 16);
  const g = parseInt(hex.substring(3,5), 16);
  const b = parseInt(hex.substring(5,7), 16);
  alert(`🎨 لون عشوائي:\n\nHEX: ${hex}\nRGB: rgb(${r}, ${g}, ${b})`);
  navigator.clipboard.writeText(hex).then(() => showToast('تم نسخ HEX', 'fa-copy'));
}

/* ═══════════════════════════════════════════
   DATA MANAGEMENT
   ═══════════════════════════════════════════ */
function exportData() {
  const data = JSON.stringify({ ...state, lovedOnes }, null, 2);
  const blob = new Blob([data], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `masar-v10-backup-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('تم التصدير ✓', 'fa-download');
}

function exportCSV() {
  const rows = [['النوع','العنوان','التاريخ','الحالة']];
  state.tasks.forEach(t => rows.push(['مهمة', t.title, t.date || '', t.done ? 'مكتملة' : 'قيد التنفيذ']));
  state.notes.forEach(n => rows.push(['ملاحظة', n.title, new Date(n.createdAt).toISOString().split('T')[0], '']));
  state.expenses.forEach(e => rows.push(['مصروف', e.title, e.date, e.amount + ' ج.م']));
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type:'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `masar-data-${todayISO()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('تم تصدير CSV ✓', 'fa-file-csv');
}

function setupImportFileInput() {
  const input = $('importFile');
  if (!input) return;
  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result);
        Object.keys(data).forEach(k => {
          if (k === 'lovedOnes') { lovedOnes = data[k]; saveLoved(); }
          else if (k in state) state[k] = data[k];
        });
        saveState();
        renderAll();
        showToast('تم الاستيراد ✓');
      } catch (e) { showToast('ملف غير صالح', 'fa-exclamation-circle'); }
    };
    reader.readAsText(file);
  });
}

function clearAllData() {
  if (!confirm('متأكد؟ هيتحذف كل حاجة!')) return;
  if (!confirm('آخر تأكيد!')) return;
  localStorage.clear();
  location.reload();
}

/* ═══════════════════════════════════════════
   PIN LOCK
   ═══════════════════════════════════════════ */
let pinBuffer = '';

function togglePinLock() {
  if (state.pinEnabled) {
    state.pinEnabled = false;
    state.pin = null;
    const btn = $('pinLockBtn');
    if (btn) btn.textContent = 'تفعيل';
    showToast('تم إلغاء القفل');
  } else {
    const pin = prompt('اكتب PIN من 4 أرقام:');
    if (!pin || !/^\d{4}$/.test(pin)) { showToast('PIN غير صالح', 'fa-exclamation-circle'); return; }
    state.pin = pin;
    state.pinEnabled = true;
    const btn = $('pinLockBtn');
    if (btn) btn.textContent = 'مقفول';
    showToast('تم تفعيل القفل 🔒');
  }
  saveState();
}

function openPinPad() {
  const modal = $('pinModal');
  if (!modal) return;
  pinBuffer = '';
  updatePinDisplay();
  const pad = $('pinPad');
  if (pad) {
    const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];
    pad.innerHTML = keys.map(k => k ? `<button class="pin-key" onclick="pinKey('${k}')">${k}</button>` : '<div></div>').join('');
  }
  modal.classList.add('open');
}

function pinKey(k) {
  if (k === '⌫') pinBuffer = pinBuffer.slice(0, -1);
  else if (pinBuffer.length < 4) pinBuffer += k;
  updatePinDisplay();
  if (pinBuffer.length === 4) {
    if (pinBuffer === state.pin) {
      closeModal('pinModal');
      showToast('أهلاً بيك 👋');
    } else {
      showToast('PIN غلط', 'fa-exclamation-circle');
      pinBuffer = '';
      updatePinDisplay();
    }
  }
}

function updatePinDisplay() {
  const el = $('pinDisplay');
  if (!el) return;
  el.innerHTML = Array.from({ length:4 }, (_, i) =>
    `<div class="pin-dot ${i < pinBuffer.length ? 'filled' : ''}"></div>`
  ).join('');
}

function enableBiometric() {
  if (!window.PublicKeyCredential) {
    showToast('متصفحك مش بيدعم البصمة', 'fa-exclamation-circle');
    return;
  }
  showToast('البصمة مش مدعمة كامل — استخدم PIN');
}

/* ═══════════════════════════════════════════
   PWA
   ═══════════════════════════════════════════ */
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
});

function installPWA() {
  if (!deferredPrompt) {
    showToast('التطبيق مثبت بالفعل أو غير مدعوم', 'fa-info-circle');
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') showToast('تم التثبيت 🎉');
    deferredPrompt = null;
  });
}

function showChangelog() {
  alert(`🎉 MASAR v10.0.0\n\n` +
    `✨ مميزات جديدة:\n` +
    `• Dashboard تفاعلي بـ 4 charts\n` +
    `• خريطة الأماكن (Leaflet)\n` +
    `• نظام XP + Levels + Coins\n` +
    `• 22 شارة إنجاز\n` +
    `• Mood Tracker + Journal\n` +
    `• Habits + Books + Flashcards\n` +
    `• Breathing Exercise\n` +
    `• 8 أدوات سريعة\n` +
    `• PIN Lock\n` +
    `• PWA Install\n` +
    `• QR Generator\n\n` +
    `صُمّم بحب بواسطة محمد عبد الله 💙`);
}

function checkConnection() {
  const el = $('connectionStatus');
  if (!el) return;
  const online = navigator.onLine;
  el.textContent = online ? 'Online' : 'Offline';
  el.style.color = online ? 'var(--green)' : 'var(--red)';
}

function checkScreenInfo() {
  const el = $('screenInfo');
  if (!el) return;
  const dpr = window.devicePixelRatio || 1;
  el.textContent = `${window.screen.width}×${window.screen.height} @${dpr}x`;
}

/* ═══════════════════════════════════════════
   BACKGROUND EFFECTS
   ═══════════════════════════════════════════ */
function initBackground() {
  if (typeof THREE === 'undefined' || !state.bgEnabled) return;
  const canvas = $('bgCanvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const particlesGeo = new THREE.BufferGeometry();
  const count = 400;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMat = new THREE.PointsMaterial({
    color: 0xf97316,
    size: 0.08,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);
  camera.position.z = 5;

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
    camera.position.x += (mx * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-my * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();
  bgScene = scene;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function initParticles() {
  if (typeof tsParticles === 'undefined' || !state.bgEnabled) return;
  const el = $('particlesLayer');
  if (!el) return;
  tsParticles.load('particlesLayer', {
    fpsLimit: 60,
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      color: { value: ['#f97316','#eab308','#ec4899','#8b5cf6'] },
      shape: { type: 'circle' },
      opacity: { value: 0.3, random: true },
      size: { value: 2, random: true },
      move: {
        enable: true, speed: 0.8, direction: 'none',
        random: true, straight: false, outModes: 'bounce',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.3 } },
        push: { quantity: 3 },
      },
    },
    detectRetina: true,
  });
}

function initCursorGlow() {
  const glow = $('cursorGlow');
  if (!glow) return;
  document.addEventListener('mousemove', e => {
    document.body.classList.add('using-mouse');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => {
    glow.style.transform = 'translate(-50%, -50%) scale(1.3)';
  });
  document.addEventListener('mouseup', () => {
    glow.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

/* ═══════════════════════════════════════════
   CAROUSEL / SWIPER
   ═══════════════════════════════════════════ */
function setupCarousel() {
  const track = $('pcTrack');
  const dots = $('pcDots');
  if (!track || !dots) return;
  const slides = track.querySelectorAll('.pc-slide');
  dots.innerHTML = Array.from(slides).map((_, i) =>
    `<div class="pc-dot ${i === 0 ? 'active' : ''}" data-i="${i}"></div>`
  ).join('');
  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    dots.querySelectorAll('.pc-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  });
  dots.querySelectorAll('.pc-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const i = parseInt(dot.dataset.i);
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════
   EVENT LISTENERS
   ═══════════════════════════════════════════ */
function setupEventListeners() {
  // Nav tabs
  $$('.nav-tab').forEach(el => {
    el.addEventListener('click', () => switchTab(el.dataset.tab));
  });

  // Sub tabs
  $$('.sub-tab').forEach(el => {
    el.addEventListener('click', () => {
      const parent = el.closest('.sub-tabs');
      if (!parent) return;
      parent.querySelectorAll('.sub-tab').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      const subContents = [];
      let sib = parent.nextElementSibling;
      while (sib) {
        if (sib.classList?.contains('sub-content')) subContents.push(sib);
        if (sib.classList?.contains('sub-tabs')) break;
        sib = sib.nextElementSibling;
      }
      subContents.forEach(x => x.classList.remove('active'));
      const subEl = $(`sub-${el.dataset.sub}`);
      if (subEl) subEl.classList.add('active');
    });
  });

  // League tabs
  $$('#leagueTabs .league-tab').forEach(el => {
    el.addEventListener('click', () => {
      $$('#leagueTabs .league-tab').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      state.currentLeague = el.dataset.league;
      fetchMatches(state.currentLeague);
    });
  });

  // Priority pills
  $$('#priorityPills .priority-pill').forEach(el => {
    el.addEventListener('click', () => {
      $$('#priorityPills .priority-pill').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
    });
  });

  // Type pills
  $$('#typePills .type-pill').forEach(el => {
    el.addEventListener('click', () => {
      $$('#typePills .type-pill').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
    });
  });

  // Filter pills
  $$('.filter-pill').forEach(el => {
    el.addEventListener('click', () => {
      const parent = el.parentElement;
      parent.querySelectorAll('.filter-pill').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      state.taskFilter = el.dataset.filter;
      renderTasks();
    });
  });

  // View toggle
  $$('.view-btn').forEach(el => {
    el.addEventListener('click', () => {
      $$('.view-btn').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      state.taskView = el.dataset.view;
      const list = $('dailyTasksList');
      const kanban = $('dailyTasksKanban');
      if (list) list.style.display = state.taskView === 'list' ? 'block' : 'none';
      if (kanban) kanban.style.display = state.taskView === 'kanban' ? 'grid' : 'none';
      renderKanban();
    });
  });

  // Note filters
  $$('.note-filter').forEach(el => {
    el.addEventListener('click', () => {
      $$('.note-filter').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      renderNotes();
    });
  });

  // Map filters
  $$('.map-filter').forEach(el => {
    el.addEventListener('click', () => {
      $$('.map-filter').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      if (el.dataset.cat === 'all') renderMapMarkers();
      else {
        if (!mainMap) return;
        mapMarkers.forEach(m => mainMap.removeLayer(m));
        mapMarkers = [];
        const icons = {
          home: L.divIcon({ html:'<div style="font-size:24px">🏠</div>', className:'', iconSize:[30,30] }),
          uni: L.divIcon({ html:'<div style="font-size:24px">🎓</div>', className:'', iconSize:[30,30] }),
          fav: L.divIcon({ html:'<div style="font-size:24px">⭐</div>', className:'', iconSize:[30,30] }),
          loved: L.divIcon({ html:'<div style="font-size:24px">💕</div>', className:'', iconSize:[30,30] }),
        };
        state.places.filter(p => p.category === el.dataset.cat).forEach(p => {
          const m = L.marker([p.lat, p.lng], { icon: icons[p.category] || icons.fav })
            .addTo(mainMap).bindPopup(`<b>${escapeHtml(p.name)}</b>`);
          mapMarkers.push(m);
        });
      }
    });
  });

  // Modal backdrop close
  $$('.modal').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });

  // Theme swatches
  $$('.theme-swatch').forEach(el => {
    el.addEventListener('click', () => {
      applyTheme(el.dataset.theme);
      showToast('تم تغيير الثيم 🎨');
    });
  });

  // Buttons
  $('themeToggle')?.addEventListener('click', toggleTheme);
  $('focusToggle')?.addEventListener('click', toggleFocusMode);
  $('searchBtn')?.addEventListener('click', openSearch);
  $('breathBtn')?.addEventListener('click', () => {
    $('breathFullModal')?.classList.add('open');
  });
  $('quickAdd')?.addEventListener('click', () => openTaskModal('daily'));
  $('fabSearch')?.addEventListener('click', openSearch);
  $('fabQR')?.addEventListener('click', openQRGenerator);
  $('qrProfileBtn')?.addEventListener('click', () => {
    const text = `MASAR Profile\n${state.profileName}\n${state.profileBio}`;
    const container = $('qrCanvas');
    if (!container) return;
    container.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      new QRCode(container, { text, width:200, height:200 });
    }
    $('qrLabel').textContent = state.profileName;
    $('qrModal').classList.add('open');
  });

  // Search
  $('searchInput')?.addEventListener('input', e => performSearch(e.target.value));
  $('searchBox')?.addEventListener('click', e => {
    if (e.target.id === 'searchBox') closeSearch();
  });

  // Voice
  $('voiceBtn')?.addEventListener('click', () => {
    if (isRecording) { recognition?.stop(); stopRecording(); }
    else startRecording();
  });

  // Fofa input
  $('fofaInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendFofaText();
  });

  // Tasbeeh
  $('tasbeehBtn')?.addEventListener('click', tasbeehTap);
  $$('.tasbeeh-chip').forEach(chip => {
    chip.addEventListener('click', () => setTasbeehDhikr(chip));
  });

  // Pomodoro
  $('pomodoroStart')?.addEventListener('click', pomodoroStart);
  $('pomodoroReset')?.addEventListener('click', pomodoroReset);
  $('pomodoroSkip')?.addEventListener('click', pomodoroSkip);
  $('pomoFocusSlider')?.addEventListener('input', e => {
    state.pomoConfig.focus = parseInt(e.target.value);
    const l = $('pomoFocusLabel'); if (l) l.textContent = e.target.value;
    if (!state.pomoState.running && state.pomoState.mode === 'focus') {
      state.pomoState.total = state.pomoConfig.focus * 60;
      state.pomoState.remaining = state.pomoState.total;
      renderPomodoro();
    }
    saveState();
  });
  $('pomoBreakSlider')?.addEventListener('input', e => {
    state.pomoConfig.break = parseInt(e.target.value);
    const l = $('pomoBreakLabel'); if (l) l.textContent = e.target.value;
    saveState();
  });

  // Water
  // (already bound via onclick in HTML)

  // Sleep / Exercise
  $('sleepHours')?.addEventListener('change', e => {
    state.sleepLog[todayISO()] = parseFloat(e.target.value) || 0;
    saveState();
    showToast('تم حفظ النوم 😴');
  });
  $('exerciseMinutes')?.addEventListener('change', e => {
    state.exerciseLog[todayISO()] = parseFloat(e.target.value) || 0;
    saveState();
    showToast('تم حفظ الرياضة 🏃');
    addXP(10, 'رياضة');
  });

  // Notes search
  $('notesSearch')?.addEventListener('input', e => renderNotes(e.target.value));
  $('tasksSearchInput')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const items = $$('#dailyTasksList .task-item');
    items.forEach(it => {
      const title = it.querySelector('.task-title')?.textContent.toLowerCase() || '';
      it.style.display = title.includes(q) ? '' : 'none';
    });
  });

  // Mood buttons
  $$('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const today = todayISO();
      state.moods[today] = btn.dataset.mood;
      saveState();
      renderMood();
      launchConfetti(15);
      showToast('تم تسجيل مزاجك 😊', 'fa-heart');
      addXP(5, 'مزاج');
      checkAchievements();
    });
  });

  // Photo upload inputs
  $('lovedPhoto')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const p = $('lovedPhotoPreview');
      p.src = evt.target.result;
      p.style.display = 'block';
      $('lovedPhotoPlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  $('momentPhoto')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const p = $('momentPhotoPreview');
      p.src = evt.target.result;
      p.style.display = 'block';
      $('momentPhotoPlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  $('visionPhoto')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const modal = $('visionModal');
      if (modal) modal._photo = evt.target.result;
      showToast('تم اختيار الصورة ✓', 'fa-check');
    };
    reader.readAsDataURL(file);
  });

  $('profilePhotoInput')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      state.profilePhoto = evt.target.result;
      const preview = $('profilePhotoPreview');
      if (preview) preview.src = evt.target.result;
      const avatar = $('profileAvatar');
      if (avatar) avatar.innerHTML = `<img src="${evt.target.result}" alt="">`;
      saveState();
      showToast('تم تحديث الصورة ✓');
    };
    reader.readAsDataURL(file);
  });

  // Settings inputs
  $('settingName')?.addEventListener('change', e => {
    state.profileName = e.target.value;
    const el = document.querySelector('.hero-name');
    if (el) el.textContent = e.target.value;
    saveState();
  });
  $('settingBio')?.addEventListener('change', e => {
    state.profileBio = e.target.value;
    renderXP();
    saveState();
  });

  // Breathing fullscreen
  // (button onclick in HTML)

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.ctrlKey && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.ctrlKey && e.key === 'n') { e.preventDefault(); openTaskModal('daily'); }
    if (e.ctrlKey && e.key === 'p') { e.preventDefault(); switchTab('study'); setTimeout(pomodoroStart, 200); }
    if (e.key === 'Escape') {
      $$('.modal.open').forEach(m => m.classList.remove('open'));
      closeSearch();
    }
  });

  // Connection
  window.addEventListener('online', checkConnection);
  window.addEventListener('offline', checkConnection);

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(e => console.log('SW:', e));
  }

  // Visibility
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      updateLiveClock();
      updateBirthday();
      renderWeeklyProgress();
      checkAutoApproveDeadlines();
    }
  });
}

/* ═══════════════════════════════════════════
   FULL BREATHING (Modal)
   ═══════════════════════════════════════════ */
let fullBreathState = { running: false, phase: 'inhale', interval: null, cycles: 0 };

function startFullBreathing() {
  const fs = fullBreathState;
  const circle = $('breathFullCircle');
  const text = $('breathFullText');
  const btn = $('breathFullStart');
  if (fs.running) {
    clearInterval(fs.interval);
    fs.running = false;
    if (circle) circle.style.transform = 'scale(1)';
    if (text) text.textContent = 'اضغط ابدأ';
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> ابدأ';
    return;
  }
  fs.running = true;
  fs.phase = 'inhale';
  fs.cycles = 0;
  if (btn) btn.innerHTML = '<i class="fa-solid fa-stop"></i> إيقاف';
  doFullBreath();
  fs.interval = setInterval(doFullBreath, 4000);
}

function doFullBreath() {
  const fs = fullBreathState;
  const circle = $('breathFullCircle');
  const text = $('breathFullText');
  if (!circle || !text) return;
  if (fs.phase === 'inhale') {
    circle.style.transform = 'scale(1.3)';
    text.textContent = 'شهيق 🫁';
    fs.phase = 'hold';
  } else if (fs.phase === 'hold') {
    text.textContent = 'احبس ✋';
    fs.phase = 'exhale';
  } else {
    circle.style.transform = 'scale(0.85)';
    text.textContent = 'زفير 😮‍💨';
    fs.phase = 'inhale';
    fs.cycles++;
    if (fs.cycles === 3) {
      const today = todayISO();
      if (!state.breathLog[today]) state.breathLog[today] = { sessions:0, minutes:0 };
      state.breathLog[today].sessions++;
      state.breathLog[today].minutes += 2;
      fs.cycles = 0;
      saveState();
      addXP(15, 'تنفس');
    }
  }
}

/* ═══════════════════════════════════════════
   RENDER ALL
   ═══════════════════════════════════════════ */
function renderAll() {
  renderVerse();
  renderQuote();
  renderAffirmation();
  renderDailyTip();
  renderHero();
  renderXP();
  renderTasks();
  renderNotes();
  renderAppointments();
  renderLectures();
  renderStats();
  renderMood();
  renderLoved();
  renderMoments();
  renderJournal();
  renderVision();
  renderHabits();
  renderBooks();
  renderFlashcards();
  renderExpenses();
  renderGoals();
  renderWater();
  renderMedicines();
  renderWeights();
  renderChat();
  renderBadges();
  renderChallenge();
  renderLeaderboard();
  renderWeeklyProgress();
  renderPomodoro();
  renderPrayerTracker();
  renderTasbeeh();
  updateMemStats();
  updateQuickInfo();
}

/* ═══════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════ */
function init() {
  showLoader('جاري التحميل...');
  const fill = $('loaderFill');
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 15;
    if (fill) fill.style.width = Math.min(100, progress) + '%';
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => hideLoader(), 400);
    }
  }, 100);

  loadState();
  applyTheme(state.theme);
  document.body.classList.toggle('no-bg', !state.bgEnabled);
  document.body.classList.toggle('no-fx', !state.visualEffects);
  if (state.focusMode) {
    document.body.classList.add('focus-mode');
    $('focusToggle')?.classList.add('active');
  }

  if (state.profilePhoto) {
    const avatar = $('profileAvatar');
    if (avatar) avatar.innerHTML = `<img src="${state.profilePhoto}" alt="">`;
    const preview = $('profilePhotoPreview');
    if (preview) preview.src = state.profilePhoto;
  }
  if ($('settingName')) $('settingName').value = state.profileName;
  if ($('settingBio')) $('settingBio').value = state.profileBio;

  renderAll();
  setupCarousel();
  setupEventListeners();
  setupImportFileInput();
  checkConnection();
  checkScreenInfo();
  renderWeightChart();

  // Background
  setTimeout(() => {
    if (state.bgEnabled && state.visualEffects) {
      initBackground();
      initParticles();
      initCursorGlow();
    }
  }, 800);

  // AOS
  if (typeof AOS !== 'undefined' && state.aosEnabled) {
    AOS.init({ duration: 600, once: true, offset: 50 });
  }

  // Clocks
  updateLiveClock();
  updateBirthday();
  setInterval(() => {
    updateLiveClock();
    updateBirthday();
    updateNextPrayer();
  }, 1000);

  // Fetch data
  fetchPrayerTimes();
  fetchWeather();
  fetchMatches(state.currentLeague);
  setInterval(fetchPrayerTimes, 5 * 60 * 1000);
  setInterval(fetchWeather, 15 * 60 * 1000);
  setInterval(renderWeeklyProgress, 30000);
  setInterval(renderPrayerTracker, 60000);
  setInterval(checkAutoApproveDeadlines, 60000);
  setTimeout(checkAutoApproveDeadlines, 5000);

  // Load sleep/exercise values
  const today = todayISO();
  if ($('sleepHours')) $('sleepHours').value = state.sleepLog[today] || '';
  if ($('exerciseMinutes')) $('exerciseMinutes').value = state.exerciseLog[today] || '';

  // Enable notifications
  if (state.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
    scheduleSmartNotifications();
  }

  setTimeout(checkAchievements, 1500);

  // Welcome
  setTimeout(() => {
    if (!localStorage.getItem('masar_v10_welcomed')) {
      sendInAppNotification('🎉 أهلاً بيك في مسار v10!', 'كل حاجة جاهزة — جرب فوفا 🤖');
      localStorage.setItem('masar_v10_welcomed', '1');
      addXP(10, 'ترحيب');
    }
  }, 3000);

  console.log('✨ MASAR v10.0.0 loaded successfully');
}

/* ═══════════════════════════════════════════
   EXPOSE GLOBALLY
   ═══════════════════════════════════════════ */
Object.assign(window, {
  switchTab, closeModal, refreshVerse, newQuote, newAffirmation,
  fetchPrayerTimes, fetchMatches, togglePrayer, tasbeehTap, resetTasbeeh,
  setTasbeehDhikr, toggleLectureAttend,
  openTaskModal, saveTask, toggleTask, deleteTask, clearCompletedTasks,
  openApproveModal, approveTask,
  openNoteModal, saveNote, deleteNote, togglePinNote,
  openAptModal, saveApt, deleteApt,
  openLovedModal, saveLoved, deleteLoved,
  openMomentModal, saveMoment, deleteMoment,
  openJournalModal, saveJournal, deleteJournal,
  openVisionModal, saveVision, deleteVision,
  openHabitModal, saveHabit, toggleHabit,
  openBookModal, saveBook, bumpBook, deleteBook,
  openFlashcardModal, saveFlashcard, viewFlashcard, deleteFlashcard,
  openExpenseModal, saveExpense, deleteExpense,
  openGoalModal, saveGoal, incrementGoal, resetGoal, deleteGoal,
  openMedicineModal, saveMedicine, deleteMedicine,
  openWeightModal, saveWeight, deleteWeight,
  openPlaceModal, savePlace, deletePlace, useCurrentLocation,
  addWaterGlass,
  pomodoroStart, pomodoroReset, pomodoroSkip,
  sendFofaText, fofaQuick, clearChatLog,
  openSearch, closeSearch, quickSearch,
  exportData, exportCSV, clearAllData,
  enableNotifications, sendInAppNotification,
  togglePrayerAlerts, toggleLectureAlerts,
  toggleVisualEffects, toggleBackground, toggleAOS, toggleVoice,
  openQRGenerator, downloadQR, openPasswordGenerator, openUnitConverter,
  openRandomPicker, openCalculator, openStopwatch, openTextTools, openColorPicker,
  togglePinLock, openPinPad, pinKey, enableBiometric,
  installPWA, showChangelog,
  startBreathing, startFullBreathing,
  completeChallenge,
});

/* ═══════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}