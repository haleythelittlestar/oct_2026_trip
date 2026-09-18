/* ===========================================================================
   TEMPLATE — copy this folder to locations/<your-id>/ and edit.

   Then add '<your-id>' to LOCATION_IDS in locations/registry.js. That is the
   only edit needed outside this folder.

   Every field except id, status, name and scores is optional; the renderer
   guards them all, so delete what you don't need rather than leaving it blank.

   ---------------------------------------------------------------------------
   BILINGUAL TEXT

   Any string shown to a reader is either
     - a plain string, when both languages use it unchanged (place names,
       "65 km", "1,8–3,0 tr"), or
     - { vi: '…', en: '…' }

   Vietnamese is the default language, because the audience is the group.
   A missing 'vi' falls back to 'en' and logs a console warning, so gaps are
   visible rather than silent. Run tools/verify_site.py to list them all.
   =========================================================================== */
TRIP.registerLocation({
  /* --- identity ---------------------------------------------------------- */
  id: 'template',          // must match the folder name; used in the URL
  status: 'draft',         // 'live' to publish, 'draft' to hide
  tieBreak: 99,            // lower wins when two scores are equal

  name: 'Template Destination',            // place names usually need no translation
  region: 'Somewhere',
  tagline: {
    vi: 'Một câu khiến người ta muốn bấm vào.',
    en: 'One line that makes someone want to open this.'
  },
  summary: {
    vi: 'Hai ba câu. Nơi này là gì, và vì sao nó có trong danh sách.',
    en: 'Two or three sentences. What the place is, and why it is on the list.'
  },

  /* --- artwork ----------------------------------------------------------- */
  /* Used when there is no photograph, and as the hero tint behind one.
     motif: karst | mountain | lake | temple | island | terrace */
  theme: {
    gradient: ['#0e7490', '#155e75', '#0b2836'],
    motif: 'karst'
  },

  /* --- card badges ------------------------------------------------------- */
  /* tone: good | warn | danger | info */
  badges: [
    { tone: 'good', text: { vi: 'Một điểm cộng', en: 'Something in its favour' } },
    { tone: 'warn', text: { vi: 'Điểm trừ chính', en: 'The main catch' } }
  ],

  /* --- quick facts ------------------------------------------------------- */
  facts: {
    distanceKm: 100,
    driveTime: '2 h',
    cost: { min: 1000000, max: 2000000, nights: 1 },
    /* activityLevel and weatherRisk are translated by i18n.js from these exact
       English keywords — leave them in English. */
    activityLevel: 'Light',              // Light | Medium | Hard
    weatherRisk: 'Low',                  // Low | Medium | High
    bestLength: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
    vibe: { vi: 'Câu ngắn cho dòng tiêu đề', en: 'Short phrase for the hero line' }
  },

  /* --- scores, 0–10 ------------------------------------------------------ */
  /* Keys must match config.js criteria. A missing key counts as 0. */
  scores: {
    scenery: 5, proximity: 5, access: 5, safety: 5,
    activities: 5, local: 5, value: 5
  },

  /* --- content ----------------------------------------------------------- */
  /* Types: prose | list | itinerary | table | callout
     Keep the two languages the same length element-for-element, so a gap is
     obvious instead of quietly shifting the text. */
  sections: [
    {
      type: 'prose',
      title: { vi: 'Vì sao chọn nơi này', en: 'Why this one' },
      body: [
        { vi: 'Đoạn thứ nhất.', en: 'First paragraph.' },
        { vi: 'Đoạn thứ hai.', en: 'Second paragraph.' }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Đi tới và nhận phòng', en: 'Getting there and settling in' },
          blocks: [
            { when: '08:00',
              what: { vi: 'Rời Hải Phòng.', en: 'Leave Hải Phòng.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Một việc gì đó để làm.', en: 'Something to do.' } }
          ]
        }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Cách đi', en: 'Getting there' },
      items: [
        { vi: 'Gạch đầu dòng thường.', en: 'Plain bullet.' },
        { vi: 'Một gạch nữa.', en: 'Another bullet.' }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Ở & ăn', en: 'Stay & eat' },
      items: [
        { term: { vi: 'Ở', en: 'Stay' },
          text: { vi: 'Ở đâu, và khoảng bao nhiêu tiền.',
                  en: 'Where, and roughly what it costs.' } },
        { term: { vi: 'Ăn', en: 'Eat' },
          text: { vi: 'Nơi này nổi tiếng món gì.', en: 'What the place is known for.' } }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Transport share' }, value: '400–600k' },
        { label: { vi: 'Tổng mỗi người', en: 'Total per person' }, value: '1,0–2,0 tr' }
      ],
      note: { vi: 'Số áng chừng cho 2026. Hỏi lại giá trước khi đặt.',
              en: 'Rough 2026 figures. Re-quote before booking.' }
    },
    {
      type: 'callout',
      title: { vi: 'Lưu ý an toàn', en: 'Safety notes' },
      tone: 'warn',
      body: [
        { vi: 'Những rủi ro cụ thể ở đây, và cách xử lý.',
          en: 'The specific risks here, and what to do about them.' }
      ]
    }
  ],

  /* --- photos ------------------------------------------------------------ */
  photoQuery: 'template',   // key into tools/places.py, or omit to skip fetching
  heroPhoto: 0,             // index into the merged photo list, or null for the motif
  excludePhotos: [],        // filenames to drop after curation; survives a re-run

  /* --- your own photos ----------------------------------------------------
     Drop image files into locations/<id>/photos/ and list them here. These are
     shown BEFORE anything the fetch tool found, so the first one becomes the
     hero. They are never touched by --force or --prune-only.

     This is the best source available. The tool can only find what happens to
     be online under a free licence, and for several of these places that is
     nothing at all — a photo you took yourself beats every one of them.

     Leave author/license/sourceUrl off entirely for your own pictures and the
     caption reads "Ảnh của nhóm". Fill them in if the image came from someone
     else and you are entitled to publish it; do not invent a licence. */
  localPhotos: [
    // { file: 'my-sunset.jpg', title: 'Chiều trên hồ' },
    // { file: 'borrowed.jpg',  title: 'Ridge at dawn',
    //   author: 'Someone', license: 'CC BY 4.0',
    //   licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    //   sourceUrl: 'https://example.com/photo' }
  ]
});
