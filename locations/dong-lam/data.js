TRIP.registerLocation({
  id: 'dong-lam',
  status: 'live',
  tieBreak: 8,               // registered eighth; only matters on an exact tie

  name: 'Thảo nguyên Đồng Lâm – Hữu Liên',
  region: { vi: 'Hữu Lũng, Lạng Sơn', en: 'Hữu Lũng, Lạng Sơn' },
  tagline: {
    vi: 'Thảo nguyên, ngựa thả rông, vách đá để leo. Chắc chưa ai trong nhóm nghe tên.',
    en: 'A steppe, free-roaming horses, cliffs to climb. None of you have heard of it.'
  },
  summary: {
    vi: 'Một thảo nguyên khoảng 100 ha ở xã Hữu Liên, lọt giữa các khối núi đá vôi. Mùa khô ' +
        'thì là đồng cỏ với ngựa, trâu và dê thả rông; mùa nước thì ngập thành hồ xanh, đi bè ' +
        'tre và kayak được — dân địa phương gọi là "Hạ Long vùng đông bắc". Có nhà sàn để ở, ' +
        'và tình cờ đây cũng là điểm leo núi đá lớn nhất Việt Nam. Khoảng 185 km, và gần như ' +
        'không ai trong nhóm mình từng tới.',
    en: 'A 100-hectare steppe in Hữu Liên commune, sitting inside a ring of limestone karst. ' +
        'In the dry months it is grassland with horses, buffalo and goats grazing loose; in the ' +
        'wet months it floods into a blue lake you can cross on a bamboo raft or a kayak — ' +
        'locals call it the "Hạ Long Bay of the north-east". There are stilt houses to sleep in, ' +
        'and it happens to be Vietnam\u2019s biggest rock-climbing area. About 185 km out, and ' +
        'almost certainly new to everyone in the group.'
  },

  theme: {
    gradient: ['#9cb489', '#57806f', '#293c36'],
    motif: 'lake'
  },

  badges: [
    { tone: 'good', text: { vi: 'Không ai từng tới, nên không ai có ý kiến sẵn',
                            en: 'Nobody has been, so nobody has an opinion yet' } },
    { tone: 'good', text: { vi: 'Nhiều thứ để làm hơn hẳn Đồng Đò, mà vẫn rẻ như thế',
                            en: 'Far more to do than Đồng Đò, at about the same price' } },
    { tone: 'info', text: { vi: 'Đầu tháng 10 là lúc giao mùa — có thể là hồ, có thể là đồng cỏ',
                            en: 'Early Oct is the changeover — could be lake, could be meadow' } },
    { tone: 'warn', text: { vi: 'Muốn ra vách đá leo thì phải có xe máy',
                            en: 'Reaching the climbing crags needs a motorbike' } }
  ],

  facts: {
    distanceKm: 185,
    driveTime: '3–3,5 h',
    cost: { min: 900000, max: 1600000, nights: 1 },
    activityLevel: 'Medium',
    weatherRisk: 'Medium',
    bestLength: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
    vibe: { vi: 'Thảo nguyên, núi đá, nhà sàn', en: 'Steppe, karst, stilt houses' }
  },

  scores: {
    scenery: 9,
    proximity: 5,
    access: 7,
    safety: 7,
    activities: 8,
    local: 9,
    value: 9
  },

  sections: [
    {
      type: 'prose',
      title: { vi: 'Vì sao lại thêm chỗ này vào', en: 'Why this one got added' },
      body: [
        { vi: 'Vì nó lấp đúng cái khoảng trống mà bảy chỗ kia để lại. Muốn cắm trại và không ' +
              'phải suy nghĩ thì có Đồng Đò, nhưng Đồng Đò hết việc sau nửa ngày. Muốn thiên ' +
              'nhiên với bản làng thật thì có Bình Liêu, nhưng Bình Liêu xa 220 km. Đồng Lâm ' +
              'nằm đúng giữa: gần hơn Bình Liêu, nhiều thứ làm hơn Đồng Đò, và rẻ gần bằng.',
          en: 'Because it fills the gap the other seven leave open. If you want to camp and not ' +
              'think, there is Đồng Đò — but Đồng Đò runs out of ideas by lunchtime. If you want ' +
              'real nature and real villages, there is Bình Liêu — but that is 220 km away. ' +
              'Đồng Lâm lands in between: closer than Bình Liêu, more to do than Đồng Đò, and ' +
              'almost as cheap.' },
        { vi: 'Nó cũng là chỗ duy nhất trong danh sách có một hoạt động mà không nơi nào khác ' +
              'có: leo núi đá thật, với dây và móc sẵn. Không bắt buộc phải leo — nhưng nếu ' +
              'trong nhóm có ai thích thử cái gì mới, đây là nơi.',
          en: 'It is also the only place on the list with an activity nowhere else has: real ' +
              'bolted rock climbing. Nobody has to climb — but if anyone in the group wants to ' +
              'try something new, this is where.' }
      ]
    },
    {
      type: 'callout',
      title: { vi: 'Hồ hay đồng cỏ? Tháng 10 là xổ số', en: 'Lake or meadow? October is a coin flip' },
      tone: 'info',
      body: [
        { vi: 'Thảo nguyên này ngập theo mùa, và các nguồn không thống nhất: có bài ghi mùa ' +
              'nước từ tháng 4 đến tháng 9, bài khác ghi từ tháng 7 đến tháng 10. Nghĩa là đầu ' +
              'tháng 10 rơi đúng chỗ giao mùa.',
          en: 'The steppe floods seasonally, and the sources disagree: one puts the flood season ' +
              'at April to September, another at July to October. Which means early October ' +
              'lands exactly on the changeover.' },
        { vi: 'Tin tốt: cả hai phiên bản đều đẹp. Có nước thì đi bè tre, kayak, câu cá, núi đá ' +
              'in bóng xuống mặt hồ. Cạn nước thì là đồng cỏ rộng với ngựa và trâu thả rông, đi ' +
              'bộ và chụp ảnh thoải mái. Chỉ cần gọi cho homestay trước một tuần để biết mình ' +
              'sẽ gặp phiên bản nào, rồi mang đồ cho đúng.',
          en: 'The good news is that both versions are worth going for. With water: bamboo rafts, ' +
              'kayaking, fishing, karst reflected in the surface. Without: open grassland with ' +
              'horses and buffalo wandering loose, easy walking, and better photographs. Just ' +
              'ring a homestay a week ahead to find out which one you are getting, and pack ' +
              'accordingly.' }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Ra thảo nguyên', en: 'Out to the steppe' },
          blocks: [
            { when: '07:00',
              what: { vi: 'Rời Hải Phòng. Cao tốc gần như cả đường: Hà Nội – Hải Phòng, rồi ' +
                          'vành đai, rồi cao tốc Hà Nội – Bắc Giang, rồi QL1A lên Hữu Lũng.',
                      en: 'Leave Hải Phòng. Expressway almost the whole way: Hà Nội – Hải Phòng, ' +
                          'the ring road, then the Hà Nội – Bắc Giang expressway and QL1A north.' } },
            { when: { vi: 'Khoảng 10:30', en: 'Around 10:30' },
              what: { vi: 'Tới xã Hữu Liên. Nhận nhà sàn ở làng Bên, cách thảo nguyên chừng 2 km.',
                      en: 'Arrive Hữu Liên. Check into a stilt house in Làng Bên, about 2 km from ' +
                          'the meadow.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Ra Đồng Lâm. Nếu có nước: bè tre hoặc kayak. Nếu cạn: đi bộ dọc ' +
                          'thảo nguyên 1,5 km giữa hai dãy núi đá, gặp ngựa và trâu trên đường.',
                      en: 'Head to Đồng Lâm. If it is flooded: bamboo raft or kayak. If it is ' +
                          'dry: walk the 1.5 km of meadow between the karst walls, and meet the ' +
                          'horses and buffalo on the way.' } },
            { when: { vi: 'Hoàng hôn', en: 'Sunset' },
              what: { vi: 'Đây là lúc đáng ở lại. Ánh sáng đổ xuống giữa các khối núi đá.',
                      en: 'This is the hour worth staying out for. The light comes in sideways ' +
                          'between the karst.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Ăn ở nhà sàn. Cắm trại ngay trên thảo nguyên cũng được nếu homestay ' +
                          'cho thuê lều.',
                      en: 'Dinner in the stilt house. You can also camp out on the meadow if the ' +
                          'homestay rents tents.' } }
          ]
        },
        {
          label: { vi: 'Ngày 2', en: 'Day 2' },
          title: { vi: 'Chọn một việc, rồi về', en: 'Pick one thing, then home' },
          blocks: [
            { when: { vi: 'Sáng sớm', en: 'Early morning' },
              what: { vi: 'Sương trên thảo nguyên. Dậy sớm một lần thôi, đáng.',
                      en: 'Mist across the steppe. Worth setting one alarm for.' } },
            { when: { vi: 'Buổi sáng', en: 'Morning' },
              what: { vi: 'Chọn một: leo núi đá ở một trong các vách gần đó, hoặc đi hang trong ' +
                          'khu bảo tồn Hữu Liên, hoặc đạp xe quanh làng.',
                      en: 'Choose one: rock climbing at one of the nearby crags, a cave in the ' +
                          'Hữu Liên reserve, or a cycle around the villages.' } },
            { when: { vi: 'Sau trưa', en: 'After lunch' },
              what: { vi: 'Về nhà. Tới Hải Phòng vào cuối buổi chiều.',
                      en: 'Drive back. Hải Phòng by late afternoon.' } }
          ]
        }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Chuyện leo núi đá', en: 'About the climbing' },
      intro: { vi: 'Phần này nghe hơi bất ngờ nhưng là thật, và là điểm mạnh riêng của nơi này:',
               en: 'This part sounds unlikely but is real, and it is what makes this place ' +
                   'different from everything else on the list:' },
      items: [
        { vi: 'Hữu Lũng có khoảng 110 tuyến leo đã bắt móc sẵn, do VietClimb khai phá — bao gồm ' +
              'tuyến dài nhất Việt Nam ở 105 m. Chiều cao trung bình tầm 30 m.',
          en: 'Hữu Lũng has around 110 bolted routes, put up by VietClimb — including the ' +
              'longest route in Vietnam at 105 m. Average height is about 30 m.' },
        { vi: 'Người mới hoàn toàn vẫn leo được, nhưng phải đi cùng người biết việc và thuê đồ. ' +
              'VietClimb ở Hà Nội cho thuê và hướng dẫn. Đừng tự mò.',
          en: 'Complete beginners can climb, but only with someone who knows what they are ' +
              'doing and with hired gear. VietClimb in Hà Nội handles both. Do not improvise ' +
              'this one.' },
        { vi: 'Các vách nằm cách đường chính chừng nửa tiếng, và thực tế là phải đi xe máy mới ' +
              'tới được. Thuê xe máy ở làng.',
          en: 'The crags are about half an hour off the main road, and realistically need a ' +
              'motorbike. Rent one in the village.' },
        { vi: 'Có phí vào vách trả trực tiếp cho chủ đất, khoảng 20–25 nghìn một người. Mang ' +
              'sẵn tiền lẻ đúng.',
          en: 'There is an access fee paid directly to the landowner at the crag, around ' +
              '20–25k per person. Bring the exact change.' },
        { vi: 'Không leo thì vẫn ổn — đi bộ ra ngắm người khác leo cũng là một buổi sáng vui.',
          en: 'Not climbing is fine too — walking out to watch other people climb is a perfectly ' +
              'good morning.' }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Ở & ăn', en: 'Stay & eat' },
      items: [
        { term: { vi: 'Ở', en: 'Stay' },
          text: { vi: 'Nhà sàn homestay ở làng Bên và quanh xã Hữu Liên, khoảng 150–350k một ' +
                      'người kèm ăn. Đây là du lịch cộng đồng, không phải khách sạn — gọi điện ' +
                      'hoặc nhắn Facebook để đặt, và hỏi luôn xem thảo nguyên đang ngập hay cạn.',
                  en: 'Stilt-house homestays in Làng Bên and around Hữu Liên, roughly 150–350k ' +
                      'per person with meals. This is community tourism, not hotels — book by ' +
                      'phone or Facebook, and ask at the same time whether the steppe is flooded ' +
                      'or dry.' } },
        { term: { vi: 'Ăn', en: 'Eat' },
          text: { vi: 'Cơm nhà sàn: gà đồi, cá suối, rau rừng, rượu ngô. Không có nhà hàng nào ' +
                      'đáng gọi là nhà hàng, và đó là điểm cộng.',
                  en: 'Whatever the homestay cooks: hill chicken, stream fish, foraged greens, ' +
                      'corn wine. There is no restaurant worth the name, which is part of the ' +
                      'appeal.' } }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Van share' }, value: '400–650k' },
        { label: { vi: 'Nhà sàn + ăn', en: 'Stilt house + meals' }, value: '150–350k' },
        { label: { vi: 'Bè tre hoặc kayak', en: 'Bamboo raft or kayak' }, value: '50–150k' },
        { label: { vi: 'Phí vào vách đá', en: 'Crag access fee' }, value: '20–25k' },
        { label: { vi: 'Thuê đồ leo (nếu leo)', en: 'Climbing gear, if climbing' },
          value: '300–600k' },
        { label: { vi: 'Tổng, 2 ngày / 1 đêm', en: 'Total, 2 days / 1 night' },
          value: '0,9–1,6 tr' }
      ],
      note: { vi: 'Số áng chừng cho năm 2026, tính theo đầu người (VND). Không leo núi thì rơi ' +
                  'về phía đầu dưới.',
              en: 'Rough 2026 figures per person in VND. Skip the climbing and it lands at the ' +
                  'bottom of that range.' }
    },
    {
      type: 'callout',
      title: { vi: 'Lưu ý an toàn', en: 'Safety notes' },
      tone: 'warn',
      body: [
        { vi: 'Nếu thảo nguyên đang ngập: mặc áo phao trên bè tre và kayak. Đây là nước ngập ' +
              'theo mùa trên nền đồng cỏ, độ sâu không đều và không có cứu hộ.',
          en: 'If the steppe is flooded: life jackets on rafts and kayaks. This is seasonal ' +
              'floodwater over a meadow — the depth is uneven and there is no lifeguard.' },
        { vi: 'Không leo núi đá mà không có người có kinh nghiệm và đồ đúng chuẩn. Đây là leo ' +
              'ngoài trời trên vách thật, không phải tường trong phòng tập.',
          en: 'Do not climb without an experienced person and proper gear. These are real ' +
              'outdoor cliffs, not a gym wall.' },
        { vi: 'Đoạn đường cuối vào xã và ra vách đá là đường nông thôn, hẹp và có thể xấu sau ' +
              'mưa. Đi ban ngày.',
          en: 'The last stretch into the commune and out to the crags is rural road — narrow, ' +
              'and rough after rain. Daylight only.' },
        { vi: 'Y tế gần nhất ở thị trấn Hữu Lũng, không phải trong xã. Mang túi sơ cứu.',
          en: 'The nearest medical help is in Hữu Lũng town, not in the commune. Bring a ' +
              'first-aid kit.' },
        { vi: 'Đây là đất canh tác của người dân. Đừng làm hỏng cây cối, hoa màu, và đóng cổng ' +
              'sau khi đi qua.',
          en: 'This is farmland people work. Do not damage trees or crops, and close gates ' +
              'behind you.' }
      ]
    },
    {
      type: 'callout',
      title: { vi: 'Điểm trừ', en: 'The catch' },
      tone: 'info',
      body: [
        { vi: '185 km là thật, và đường cuối không phải cao tốc. Nếu cả nhóm không muốn ngồi ' +
              'xe 3 tiếng rưỡi thì Chí Linh vẫn là câu trả lời.',
          en: '185 km is 185 km, and the last part is not expressway. If the group will not sit ' +
              'in a van for three and a half hours, Chí Linh is still the answer.' },
        { vi: 'Và vì nó chưa được khai thác du lịch nhiều, đừng mong có dịch vụ. Không quán cà ' +
              'phê để trú mưa, không ATM, sóng điện thoại chỗ được chỗ không. Đó vừa là điểm ' +
              'trừ vừa là toàn bộ lý do đi.',
          en: 'And because it is barely developed, do not expect services. No café to shelter in ' +
              'when it rains, no ATM, patchy phone signal. That is both the drawback and the ' +
              'entire reason to go.' }
      ]
    }
  ],

  reviews: {
    verdict: {
      vi: 'Bài viết nào về nơi này cũng dùng chữ "chưa được biết tới". Đó vừa là lời khen ' +
          'vừa là cảnh báo.',
      en: 'Every write-up about this place uses some form of the word "undiscovered". That ' +
          'is both the recommendation and the warning.'
    },
    praise: [
      { vi: 'Được gọi là "thảo nguyên ẩn" và "Hạ Long vùng đông bắc". Núi đá vôi cao vây ' +
            'quanh đồng cỏ xanh mênh mông.',
        en: 'Called a "hidden steppe" and the "Hạ Long Bay of the north-east". Tall karst ' +
            'ringing a wide green meadow.' },
      { vi: 'Ngựa, trâu và dê thả rông trên thảo nguyên vào mùa cạn — đây là chi tiết được ' +
            'nhắc tới nhiều nhất.',
        en: 'Horses, buffalo and goats grazing loose across the steppe in the dry season — ' +
            'the detail that comes up most.' },
      { vi: 'Mùa nước thì thành sân chơi: bè tre, kayak, câu cá.',
        en: 'In the flooded months it becomes a playground: bamboo rafts, kayaks, fishing.' },
      { vi: 'Khí hậu được mô tả là lý tưởng cho đi bộ, cưỡi ngựa và cắm trại dưới trời sao.',
        en: 'The climate is described as ideal for hiking, horse riding and camping under ' +
            'a clear sky.' },
      { vi: 'Hữu Lũng có khoảng 110 tuyến leo đã bắt móc, kể cả tuyến dài nhất Việt Nam 105 m.',
        en: 'Hữu Lũng has around 110 bolted climbing routes, including the longest in ' +
            'Vietnam at 105 m.' }
    ],
    gripes: [
      { vi: 'Các nguồn không thống nhất về mùa nước — có nơi ghi tháng 4–9, nơi khác tháng ' +
            '7–10. Nghĩa là đầu tháng 10 là xổ số. Phải gọi hỏi trước.',
        en: 'Sources disagree on the flood season — one says April–September, another ' +
            'July–October. Early October is therefore a gamble. Phone ahead.' },
      { vi: 'Ra tới vách đá thì cần xe máy, và đi mất nửa tiếng từ đường chính.',
        en: 'Reaching the crags needs a motorbike, half an hour off the main road.' },
      { vi: 'Có phí vào vách trả trực tiếp cho chủ đất, và phải mang đúng tiền lẻ.',
        en: 'There is a crag access fee paid directly to the landowner, and you need exact ' +
            'change.' },
      { vi: 'Wikimedia Commons không có nổi một tấm ảnh phong cảnh nào của nơi này. Đó là ' +
            'thước đo khá chính xác cho mức độ "chưa được biết tới".',
        en: 'Wikimedia Commons contains not one landscape photograph of the place. That is a ' +
            'fairly precise measure of how undiscovered it is.' }
    ],
    sources: [
      { label: 'Heritage Vietnam Airlines — Discover the Đồng Lâm steppe',
        url: 'https://heritagevietnamairlines.com/en/discover-the-dong-lam-steppe/' },
      { label: 'VnExpress — Hữu Liên, where the grass is greener',
        url: 'https://e.vnexpress.net/photo/places/huu-lien-where-the-grass-is-greener-on-this-side-4125234.html' },
      { label: 'Nhân Dân — Hữu Liên as an ecotourism option',
        url: 'https://en.nhandan.vn/huu-lien-village-an-attractive-ecotourism-option-in-lang-son-province-post104383.html' },
      { label: 'vietnam.travel — 5 incredible crags in Hữu Lũng',
        url: 'https://vietnam.travel/things-to-do/rock-climbing-huu-lung' },
      { label: 'UKClimbing — Hữu Lũng crag logbook and access notes',
        url: 'https://www.ukclimbing.com/logbook/crags/huu_lung-24433/' }
    ]
  },

  photoQuery: 'dong-lam',
  heroPhoto: 0,

  /* Wikimedia Commons has no landscape photograph of this place at all. The two
     files the tool retrieved were a frog from a species description (the paper
     mentions Hữu Liên Nature Reserve) and a colonial-era railway photograph
     from Bắc Lệ. Both are excluded here rather than deleted, because
     excludePhotos survives a re-run of the tool while deleting the files would
     not. The result is the SVG illustration, which is the correct answer. */
  excludePhotos: ['p-d7b75a4d08.jpg', 'p-1473f41fa8.jpg']
});
