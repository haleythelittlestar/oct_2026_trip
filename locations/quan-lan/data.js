TRIP.registerLocation({
  id: 'quan-lan',
  status: 'live',
  tieBreak: 5,

  name: 'Quan Lạn / đảo Vân Đồn',
  region: 'Quảng Ninh',
  tagline: {
    vi: 'Bãi biển vắng tanh, hải sản rẻ, và một khả năng nhỏ là mắc kẹt ngoài đảo.',
    en: 'Empty beaches, cheap seafood, and a small chance of being stuck on an island.'
  },
  summary: {
    vi: 'Những hòn đảo yên tĩnh ngoài Vân Đồn với bãi biển dài vắng người, rừng phi lao chắn ' +
        'gió và nhịp sống làng chài. Quan Lạn là lựa chọn kinh điển; Cái Chiên và Ngọc Vừng ' +
        'còn vắng hơn nữa. Đầu tháng 10 thì khách hè đã về hết và nước biển thường vẫn còn đủ ' +
        'ấm để tắm.',
    en: 'Quiet islands off Vân Đồn with long empty beaches, casuarina windbreaks and a ' +
        'fishing-village rhythm. Quan Lạn is the classic pick; Cái Chiên and Ngọc Vừng are ' +
        'quieter still. In early October the summer crowds are gone and the sea is usually ' +
        'still warm enough to swim.'
  },

  theme: {
    gradient: ['#8fb6c6', '#4e7c91', '#213743'],
    motif: 'island'
  },

  badges: [
    { tone: 'good',   text: { vi: 'Tháng 10 là vắng thật, không phải "vắng" kiểu quảng cáo',
                              en: 'Actually empty in October, not brochure-empty' } },
    { tone: 'danger', text: { vi: 'Rủi ro thời tiết cao nhất danh sách',
                              en: 'Highest weather exposure of anything here' } },
    { tone: 'warn',   text: { vi: 'Cấm biển là kẹt lại. Không phải bất tiện — là kẹt.',
                              en: 'A sea ban does not delay you, it keeps you' } },
    { tone: 'info',   text: { vi: 'Chỉ có một kiểu chơi: nằm dài. Ai thích thì tuyệt.',
                              en: 'One activity: lying down. Great, if that is the goal.' } }
  ],

  facts: {
    distanceKm: 120,
    driveTime: { vi: '2 h + 45 phút tàu', en: '2 h + 45 min boat' },
    cost: { min: 1500000, max: 2500000, nights: 2 },
    activityLevel: 'Light',
    weatherRisk: 'High',
    bestLength: { vi: '3 ngày / 2 đêm', en: '3 days / 2 nights' },
    vibe: { vi: 'Bãi vắng, làng chài', en: 'Empty beach, fishing village' }
  },

  scores: {
    scenery: 8,
    proximity: 6,
    access: 6,
    safety: 4,
    activities: 5,
    local: 8,
    value: 7
  },

  sections: [
    {
      type: 'prose',
      title: { vi: 'Vì sao chọn — và khi nào thì không', en: 'Why this one — and when not to' },
      body: [
        { vi: 'Hoàn hảo nếu điều cả nhóm thật sự mơ tới là một bãi biển vắng, chẳng phải làm ' +
              'gì, và hải sản mua ngay từ thuyền. Đầu tháng 10 có thể là tuần đẹp nhất trong ' +
              'năm cho việc đó: nước còn ấm, khách hè đã về, giá đã hạ.',
          en: 'Perfect if what you actually want is an empty beach, nothing to do, and ' +
              'seafood straight off the boats. Early October is arguably the best week of the ' +
              'year for it: the water is still warm, the summer crowds have gone, and prices ' +
              'have dropped.' },
        { vi: 'Sai nếu họ muốn nhiều hoạt động đa dạng — đây là nơi chỉ có một kiểu chơi. Và ' +
              'rủi ro nếu thời tiết trở, đó là lý do nó chỉ được 4 điểm an toàn. Chỉ chọn nơi ' +
              'này khi đã thống nhất sẵn một phương án dự phòng chắc chắn.',
          en: 'Wrong if they want activity variety — this is a one-idea place. And risky if ' +
              'the weather turns, which is why it scores 4 on safety. Only pick this with a ' +
              'solid backup already agreed.' }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Cách đi', en: 'Getting there' },
      items: [
        { term: { vi: 'Đường bộ', en: 'Drive' },
          text: { vi: 'Xe tới cảng Cái Rồng ở Vân Đồn — khoảng 120 km, tầm 2 h.',
                  en: 'Van to Cái Rồng port in Vân Đồn — about 120 km, roughly 2 h.' } },
        { term: { vi: 'Tàu', en: 'Boat' },
          text: { vi: 'Tàu cao tốc qua đảo, 45–60 phút. Khoảng 150–200k một người mỗi lượt.',
                  en: 'Speedboat across, 45–60 min. Roughly 150–200k per person each way.' } },
        { term: { vi: 'Trên đảo', en: 'On the island' },
          text: { vi: 'Xe điện (tuk-tuk) hoặc thuê xe đạp. Về cơ bản chỉ có một con đường, nên ' +
                      'không thể đi lạc.',
                  en: 'Electric buggy (xe tuk-tuk) or rented bicycle. There is essentially one ' +
                      'road, which makes navigation simple.' } }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '3 ngày / 2 đêm', en: '3 days / 2 nights' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Tới nơi, và không làm gì', en: 'Get there, do nothing' },
          blocks: [
            { when: '07:00',
              what: { vi: 'Rời Hải Phòng đi Cái Rồng.',
                      en: 'Leave Hải Phòng for Cái Rồng.' } },
            { when: { vi: 'Cuối buổi sáng', en: 'Late morning' },
              what: { vi: 'Tàu qua đảo, nhận phòng.', en: 'Boat across, check in.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Bãi Sơn Hào. Tắm, nằm dài, đọc sách.',
                      en: 'Bãi Sơn Hào. Swim, lie down, read.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Hải sản mua ngay từ thuyền rồi nướng.',
                      en: 'Seafood bought off the boats and grilled.' } }
          ]
        },
        {
          label: { vi: 'Ngày 2', en: 'Day 2' },
          title: { vi: 'Vòng quanh đảo, thật chậm', en: 'The island, slowly' },
          blocks: [
            { when: { vi: 'Lúc bình minh', en: 'Sunrise' },
              what: { vi: 'Đáng để dậy sớm — các bãi hướng đông chính là lý do người ta tới đây.',
                      en: 'Worth getting up for — the east-facing beaches are the reason people ' +
                          'come.' } },
            { when: { vi: 'Buổi sáng', en: 'Morning' },
              what: { vi: 'Đạp xe theo đường đảo ra bãi Minh Châu.',
                      en: 'Cycle the island road to Bãi Minh Châu.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Đình Quan Lạn — một trong những ngôi đình cổ còn lại lâu đời nhất vùng.',
                      en: 'Đình Quan Lạn — one of the oldest surviving communal houses in the ' +
                          'region.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Lại hải sản. Sá sùng là đặc sản ở đây.',
                      en: 'More seafood. Sá sùng is the local speciality.' } }
          ]
        },
        {
          label: { vi: 'Ngày 3', en: 'Day 3' },
          title: { vi: 'Về', en: 'Back' },
          blocks: [
            { when: { vi: 'Buổi sáng', en: 'Morning' },
              what: { vi: 'Tắm lần cuối, rồi lên tàu về.',
                      en: 'Last swim, then the boat back.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Đi xe từ Cái Rồng về nhà.',
                      en: 'Drive home from Cái Rồng.' } }
          ]
        }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Van share' }, value: '400–600k' },
        { label: { vi: 'Tàu, hai chiều', en: 'Boat, return' }, value: '300–400k' },
        { label: { vi: 'Phòng, mỗi đêm', en: 'Rooms, per night' }, value: '300–600k' },
        { label: { vi: 'Ăn, mỗi ngày', en: 'Food, per day' }, value: '300–400k' },
        { label: { vi: 'Tổng, 3 ngày / 2 đêm', en: 'Total, 3 days / 2 nights' },
          value: '1,5–2,5 tr' }
      ],
      note: { vi: 'Số áng chừng cho năm 2026, tính theo đầu người (VND).',
              en: 'Rough 2026 figures per person in VND.' }
    },
    {
      type: 'callout',
      title: { vi: 'Lưu ý an toàn — quan trọng nhất trong danh sách',
               en: 'Safety notes — the most important on this list' },
      tone: 'danger',
      body: [
        { vi: 'Đây là nơi chịu rủi ro thời tiết cao nhất. Lệnh cấm biển không làm bạn bất tiện, ' +
              'nó giữ bạn lại. Tháng 8 năm 2026, bão số 4 đã đóng tuyến Đồng Bài – Cái Viềng và ' +
              'khiến hơn 1.700 người kẹt ở Cát Bà; cơ chế y như vậy áp dụng ở đây, với chặng ' +
              'tàu còn dài hơn.',
          en: 'This carries the highest weather exposure of any option here. A sea ban does not ' +
              'inconvenience you, it strands you. In August 2026 typhoon no. 4 closed the ' +
              'Đồng Bài – Cái Viềng crossing and left over 1,700 people stuck on Cát Bà; the ' +
              'same mechanism applies here with a longer crossing.' },
        { vi: 'Chỉ tắm trong khu có cắm cờ. Đây là bãi biển hở với dòng chảy thật và không có ' +
              'cứu hộ ngoài mùa cao điểm.',
          en: 'Swim only within flagged areas. These are open-sea beaches with real currents ' +
              'and no lifeguards outside peak season.' },
        { vi: 'Y tế trên đảo chỉ ở mức cơ bản. Ai có bệnh nền thì nên cân nhắc kỹ, và cả nhóm ' +
              'phải mang túi sơ cứu tử tế.',
          en: 'Medical facilities on the island are basic. Anyone with a condition should think ' +
              'carefully, and the group should carry a proper first-aid kit.' },
        { vi: 'Đừng đặt gì không hoàn tiền, và xem dự báo trước 4–5 ngày với tâm thế sẵn sàng ' +
              'chuyển sang một điểm trong đất liền.',
          en: 'Book nothing non-refundable, and check the forecast four to five days out with a ' +
              'firm willingness to switch to an inland option.' }
      ]
    }
  ],

  reviews: {
    verdict: {
      vi: 'Được khen đúng một điều, và khen rất đều: yên tĩnh. Mọi thứ khác là hệ quả của ' +
          'chính điều đó.',
      en: 'Praised for exactly one thing, and praised consistently: quiet. Everything else ' +
          'follows from that.'
    },
    praise: [
      { vi: 'Được gọi đi gọi lại là "phiên bản ít phát triển, ít du lịch hơn của Cát Bà".',
        en: 'Described again and again as the less developed, less touristy alternative to ' +
            'Cát Bà.' },
      { vi: 'Bãi Minh Châu: 1,5–2 km cát trắng mịn, sau lưng là rừng phi lao, nước nông và trong.',
        en: 'Bãi Minh Châu: 1.5–2 km of fine white sand backed by pine forest, with shallow ' +
            'clear water.' },
      { vi: 'Cộng đồng trên đảo vẫn giữ được nếp sống riêng dù có khách — điều này được nhắc ' +
            'tới như một điểm cộng thật.',
        en: 'The island community has kept much of its own way of life despite visitors, ' +
            'which reviewers single out as genuine.' },
      { vi: 'Hải sản: mực, cá chim, cá thu, tôm — rẻ và tươi.',
        en: 'Seafood — squid, butterfish, mackerel, prawns — cheap and fresh.' }
    ],
    gripes: [
      { vi: 'Đảo nhiều cát, ít rừng hơn mấy đảo bên cạnh như Bản Sen. Đừng mong rừng rậm.',
        en: 'The island is sandy with little forest compared with neighbours like Bản Sen. ' +
            'Do not expect jungle.' },
      { vi: 'Dịch vụ tập trung gần cảng và trung tâm. Ra xa là hết quán, hết cửa hàng.',
        en: 'Services cluster near the port and centre. Go further and the shops and ' +
            'restaurants run out.' },
      { vi: 'Phụ thuộc hoàn toàn vào tàu. Đây là điểm yếu lớn nhất và không cách nào tránh.',
        en: 'Entirely boat-dependent. That is the single biggest weakness and there is no ' +
            'way around it.' },
      { vi: 'Nếu bạn không thích nằm dài cả ngày thì sẽ thấy chán vào ngày thứ hai.',
        en: 'If lying still all day is not your thing, day two will drag.' }
    ],
    sources: [
      { label: 'Wikivoyage — Quan Lạn',
        url: 'https://en.m.wikivoyage.org/wiki/Quan_Lan' },
      { label: 'Origin Vietnam — Quan Lạn island guide',
        url: 'https://www.originvietnam.com/destinations/quan-lan-island/' },
      { label: 'Bhaya Cruises — Minh Châu beach guide',
        url: 'https://bhayacruises.com/blog/minh-chau-beach/' },
      { label: 'North Vietnam — Quan Lạn travel guide',
        url: 'https://north-vietnam.com/quan-lan-island-quang-ninh/' }
    ]
  },

  photoQuery: 'quan-lan',
  heroPhoto: 0,
  excludePhotos: []
});
