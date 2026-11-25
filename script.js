// 1. Navigasi Tab Utama
const navTabs = document.querySelectorAll('.nav-tab');
const tabPanels = document.querySelectorAll('.tab-panel');

navTabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    navTabs.forEach((t) => t.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));

    btn.classList.add('active');
    const targetPanel = document.getElementById(`tab-${target}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// 2. Data Pemindai Organ (Sumber Alodokter)
const ORGAN_DATA = [
  {
    id: 'brain',
    name: 'Otak & Saraf Pusat',
    cleanTitle: 'Kognisi Tajam & Kreativitas Puncak',
    cleanDesc: 'Otak bersih memiliki neuroplastisitas optimal untuk fokus belajar, berkarya, dan menikmati kebahagiaan alami.',
    cleanList: [
      'Daya ingat tajam & konsentrasi tinggi',
      'Dopamin alami seimbang saat berolahraga dan berkarya',
      'Kualitas tidur nyenyak fase REM'
    ],
    drugTitle: 'Pembajakan Dopamin & Kerusakan Kognitif',
    drugDesc: 'Narkoba membanjiri otak dengan dopamin buatan hingga 10x lipat alami, memicu kecanduan dan penurunan memori.',
    drugList: [
      'Kematian sel neuron korteks prefrontal',
      'Penurunan drastis daya ingat (brain fog akut)',
      'Halusinasi auditorik dan visual'
    ],
    quote: 'Menurut Alodokter, penyalahgunaan narkoba dapat merusak jaringan otak, memicu hilang ingatan, hingga kerusakan permanen sistem kognitif.'
  },
  {
    id: 'heart',
    name: 'Jantung & Pembuluh Darah',
    cleanTitle: 'Kebugaran Atletis & Sirkulasi Prima',
    cleanDesc: 'Jantung sehat memompa oksigen secara efisien sehingga stamina terjaga sepanjang hari.',
    cleanList: [
      'Detak jantung istirahat ideal 60–100 bpm',
      'Tekanan darah stabil 120/80 mmHg',
      'Daya tahan fisik dan olahraga optimal'
    ],
    drugTitle: 'Aritmia & Ancaman Gagal Jantung',
    drugDesc: 'Zat stimulan memaksa otot jantung berdetak tak normal dan memicu lonjakan tekanan darah mendadak.',
    drugList: [
      'Detak jantung tak beraturan (aritmia parah)',
      'Hipertensi maligna & risiko stroke',
      'Risiko henti jantung mendadak'
    ],
    quote: 'Alodokter mencatat bahwa stimulan dan depresan berdampak langsung pada ritme denyut jantung dan ancaman serangan jantung di usia muda.'
  },
  {
    id: 'liver',
    name: 'Hati & Ginjal',
    cleanTitle: 'Detoksifikasi Alami & Metabolisme Kuat',
    cleanDesc: 'Hati dan ginjal menyaring nutrisi secara bersih serta menjaga kulit tetap segar alami.',
    cleanList: [
      'Fungsi filtrasi ginjal normal 100%',
      'Enzim hati dalam batas sehat',
      'Metabolisme energi lancar'
    ],
    drugTitle: 'Gagal Ginjal Akut & Kerusakan Hati',
    drugDesc: 'Penumpukan racun kimia sintetik memaksa hati dan ginjal bekerja ekstrem hingga berisiko gagal organ.',
    drugList: [
      'Kerusakan sel hati (hepatotoksisitas)',
      'Gagal ginjal akut akibat dehidrasi berat',
      'Penurunan drastis imunitas tubuh'
    ],
    quote: 'Berdasarkan tinjauan medis Alodokter, racun narkoba membebani filtrasi ginjal dan memicu peradangan hati kronis.'
  }
];

let selectedOrganIndex = 0;
let isCleanMode = true;

const organTabsEl = document.getElementById('organTabs');
const organDetailEl = document.getElementById('organDetail');
const modeCleanBtn = document.getElementById('modeCleanBtn');
const modeDrugBtn = document.getElementById('modeDrugBtn');

function renderOrganScanner() {
  organTabsEl.innerHTML = ORGAN_DATA.map(
    (item, idx) =>
      `<button class="organ-btn ${idx === selectedOrganIndex ? 'active' : ''}" data-idx="${idx}">${item.name}</button>`
  ).join('');

  organTabsEl.querySelectorAll('.organ-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedOrganIndex = Number(btn.dataset.idx);
      renderOrganScanner();
    });
  });

  const organ = ORGAN_DATA[selectedOrganIndex];
  const title = isCleanMode ? organ.cleanTitle : organ.drugTitle;
  const desc = isCleanMode ? organ.cleanDesc : organ.drugDesc;
  const list = isCleanMode ? organ.cleanList : organ.drugList;

  organDetailEl.innerHTML = `
    <h3>${title}</h3>
    <p>${desc}</p>
    <ul class="bullet-list">
      ${list.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    <div class="quote-box">${organ.quote}</div>
  `;
}

modeCleanBtn.addEventListener('click', () => {
  isCleanMode = true;
  modeCleanBtn.classList.add('active');
  modeDrugBtn.classList.remove('active');
  renderOrganScanner();
});

modeDrugBtn.addEventListener('click', () => {
  isCleanMode = false;
  modeDrugBtn.classList.add('active');
  modeCleanBtn.classList.remove('active');
  renderOrganScanner();
});

renderOrganScanner();

// 3. Golongan Zat (Alodokter)
const DRUG_CATEGORIES = [
  {
    name: 'Golongan Stimulan',
    examples: 'Sabu, Kokain, Ekstasi',
    desc: 'Memaksa sistem saraf bekerja ekstra cepat hingga memicu gagal jantung, paranoia, dan kerusakan neuron permanen.'
  },
  {
    name: 'Golongan Depresan',
    examples: 'Heroin (Putaw), Morfin, Benzodiazepin ilegal',
    desc: 'Menekan sistem saraf dan pusat pernapasan, berisiko henti napas saat tidur (overdosis fatal).'
  },
  {
    name: 'Golongan Halusinogen',
    examples: 'LSD, Jamur Ajaib, Kanabis Sintetis',
    desc: 'Mengacaukan persepsi realitas, memicu panik ekstrem, serta risiko psikosis jangka panjang.'
  }
];

document.getElementById('drugGrid').innerHTML = DRUG_CATEGORIES.map(
  (cat) => `
    <div class="info-box">
      <h3>${cat.name}</h3>
      <p><strong>Contoh:</strong> ${cat.examples}</p>
      <p>${cat.desc}</p>
    </div>
  `
).join('');

// 4. Kuis Mitos vs Fakta
const QUIZ_DATA = [
  {
    statement: 'Mencoba narkoba satu kali saja tidak akan membuat ketagihan.',
    isFact: false,
    explanation: 'MITOS BESAR! Pemakaian pertama langsung membajak dopamin otak dan memicu siklus ketergantungan klinis.'
  },
  {
    statement: 'Pecandu yang melapor sukarela ke IPWL tidak dipenjara, melainkan direhabilitasi medis gratis.',
    isFact: true,
    explanation: 'FAKTA! Dijamin oleh UU No. 35 Tahun 2009 dan layanan rehabilitasi resmi BNN / Kemenkes RI.'
  },
  {
    statement: 'Narkoba membantu meningkatkan kreativitas dan fokus belajar.',
    isFact: false,
    explanation: 'MITOS! Data klinis Alodokter menunjukkan narkoba justru merusak daya ingat dan konsentrasi.'
  },
  {
    statement: 'Berhenti dari kecanduan berat sebaiknya diawasi dokter untuk mencegah sakau fatal.',
    isFact: true,
    explanation: 'FAKTA! Fase detoksifikasi memerlukan pengawasan medis agar tubuh stabil dengan aman.'
  },
  {
    statement: 'Gaya hidup bebas narkoba menjaga kesehatan organ vital dan mental tetap tangguh.',
    isFact: true,
    explanation: 'FAKTA! Pikiran jernih dan fisik bugar adalah modal utama meraih prestasi nyata.'
  }
];

let quizIndex = 0;
let answered = false;
const quizBox = document.getElementById('quizBox');
const quizProgress = document.getElementById('quizProgress');

function renderQuiz() {
  const q = QUIZ_DATA[quizIndex];
  quizProgress.textContent = `Soal ${quizIndex + 1} / ${QUIZ_DATA.length}`;

  quizBox.innerHTML = `
    <p class="quiz-statement">"${q.statement}"</p>
    <div class="quiz-actions">
      <button class="btn btn-light btn-sm hover-lift" onclick="answerQuiz(true)">FAKTA</button>
      <button class="btn btn-dark btn-sm hover-invert" onclick="answerQuiz(false)">MITOS</button>
    </div>
    <div id="quizFeedback"></div>
  `;
}

window.answerQuiz = function (userPickFact) {
  if (answered) return;
  answered = true;

  const q = QUIZ_DATA[quizIndex];
  const isCorrect = userPickFact === q.isFact;

  document.getElementById('quizFeedback').innerHTML = `
    <div class="quiz-feedback">
      <strong>${isCorrect ? 'Jawaban Tepat!' : 'Kurang Tepat.'}</strong>
      <p style="margin-top:6px; color:#d4d4d4;">${q.explanation}</p>
      <button class="btn btn-light btn-sm hover-lift" style="margin-top:12px;" onclick="nextQuiz()">
        ${quizIndex < QUIZ_DATA.length - 1 ? 'Soal Berikutnya →' : 'Ulangi Kuis ↺'}
      </button>
    </div>
  `;
};

window.nextQuiz = function () {
  answered = false;
  quizIndex = quizIndex < QUIZ_DATA.length - 1 ? quizIndex + 1 : 0;
  renderQuiz();
};

renderQuiz();
