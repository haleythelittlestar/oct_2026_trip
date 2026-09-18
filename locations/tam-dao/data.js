TRIP.registerLocation({
  id: 'tam-dao',
  status: 'live',
  tieBreak: 6,

  name: 'Tam Đảo',
  region: { vi: 'Phú Thọ (trước là Vĩnh Phúc)', en: 'Phú Thọ (formerly Vĩnh Phúc)' },
  tagline: {
    vi: 'Lạnh, mù sương, và có khả năng không thấy gì ngoài sương.',
    en: 'Cold, misty, and possibly nothing but mist.'
  },
  summary: {
    vi: 'Một phố nghỉ mát từ thời Pháp ở độ cao khoảng 900 m, nay thuộc tỉnh Phú Thọ sau khi ' +
        'Vĩnh Phúc, Hòa Bình và Phú Thọ sáp nhập năm 2025. Không khí mát, sương mù, và những ' +
        'ngày trời quang thì được ngắm mây dưới chân. Cách khoảng 190–200 km, tức là đúng ngay ' +
        'mép của giới hạn khoảng cách.',
    en: 'A French-era hill station at around 900 m, now in Phú Thọ province after Vĩnh Phúc, ' +
        'Hòa Bình and Phú Thọ merged in 2025. Cool air, mist, and cloud-below-you views on a ' +
        'good day. About 190–200 km out, which puts it right at the edge of the distance limit.'
  },

  theme: {
    gradient: ['#a0a9bd', '#5d6a82', '#2a303c'],
    motif: 'mountain'
  },

  badges: [
    { tone: 'good', text: { vi: 'Lạnh thật, mặc áo len được — sau mùa hè Hải Phòng thì quý',
                            en: 'Cold enough for a jumper, which after a Hải Phòng summer counts' } },
    { tone: 'warn', text: { vi: 'Có thể mù đặc suốt cả chuyến, không thấy gì',
                            en: 'Can be socked in the whole weekend, view included' } },
    { tone: 'warn', text: { vi: 'Bê tông nhiều hơn bản địa',
                            en: 'More concrete than character' } },
    { tone: 'info', text: { vi: '3,5 h lái xe để tới một phố nghỉ dưỡng',
                            en: '3.5 h of driving to reach a resort town' } }
  ],

  facts: {
    distanceKm: 195,
    driveTime: '3–3,5 h',
    cost: { min: 1200000, max: 2200000, nights: 1 },
    activityLevel: 'Light',
    weatherRisk: 'Medium',
    bestLength: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
    vibe: { vi: 'Phố núi, sương, khí lạnh', en: 'Hill town, mist, cool air' }
  },

  scores: {
    scenery: 7,
    proximity: 4,
    access: 6,
    safety: 6,
    activities: 6,
    local: 4,
    value: 6
  },

  sections: [
    {
      type: 'prose',
      title: { vi: 'Vì sao chọn — và vì sao xếp thấp', en: 'Why this one — and why it ranks low' },
      body: [
        { vi: 'Chọn nơi này nếu cả nhóm muốn trời lạnh và không khí phố núi. Sau một mùa hè Hải ' +
              'Phòng thì việc ngồi ngoài trời mặc áo len ăn đồ nướng trong sương mù có sức hấp ' +
              'dẫn thật, và những vườn su su trên sườn núi cũng rất đẹp.',
          en: 'Pick this if what the group wants is cold weather and mountain-town atmosphere. ' +
              'After a Hải Phòng summer, sitting outside in a jumper eating grilled skewers in ' +
              'the mist has genuine appeal, and the su su (chayote) gardens on the slopes are ' +
              'lovely.' },
        { vi: 'Nhưng nó xây dựng dày đặc, có thể mù sương suốt cả một kỳ nghỉ, và đường đi thì ' +
              'dài nhất so với thứ nhận lại. Nó chỉ được 4 điểm chất bản địa vì gần như không ' +
              'có: đây là một phố nghỉ dưỡng, không phải nơi người ta đang sống cuộc đời của họ.',
          en: 'But it is heavily developed, it can be fogged in for an entire weekend, and the ' +
              'driving is the longest on the list relative to what you get. It scores 4 on ' +
              'local character because there is very little of it: this is a resort town, not ' +
              'a place where people are getting on with their lives.' }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Lên núi', en: 'Up the mountain' },
          blocks: [
            { when: '07:00',
              what: { vi: 'Rời Hải Phòng. Đường dài; nên tính sẵn một điểm dừng tử tế.',
                      en: 'Leave Hải Phòng. Long drive; plan a proper stop.' } },
            { when: { vi: 'Cuối buổi sáng', en: 'Late morning' },
              what: { vi: 'Không bắt buộc: hồ Đại Lải trên đường, nghỉ một tiếng bên hồ.',
                      en: 'Optional: hồ Đại Lải on the way, for a lakeside hour.' } },
            { when: { vi: 'Đầu giờ chiều', en: 'Early afternoon' },
              what: { vi: 'Lên đèo vào Tam Đảo. Nhận phòng.',
                      en: 'Up the switchbacks into Tam Đảo. Check in.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Bậc thang Thác Bạc, và nhà thờ đá.',
                      en: 'Thác Bạc (Silver Waterfall) steps, and the stone church.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Chợ đêm. Đồ nướng, chim cút, và món gì đó nóng.',
                      en: 'Night market. Grilled skewers, chim cút, and something hot.' } }
          ]
        },
        {
          label: { vi: 'Ngày 2', en: 'Day 2' },
          title: { vi: 'Leo một đợt, rồi xuống', en: 'A climb, then down' },
          blocks: [
            { when: { vi: 'Buổi sáng', en: 'Morning' },
              what: { vi: 'Leo tháp truyền hình — khoảng 1.400 bậc. Đây là bài tập tim mạch của ' +
                          'cả nhóm cho năm nay. Hoặc chùa Tây Thiên và cáp treo nếu muốn nhẹ hơn.',
                      en: 'The TV tower climb — around 1,400 steps. This is your cardio for ' +
                          'the year. Or Tây Thiên pagoda and cable car for something ' +
                          'gentler.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Về nhà.', en: 'Drive home.' } }
          ]
        }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Thật ra ở đó có gì', en: 'What is actually there' },
      items: [
        { vi: 'Thác Bạc — đi tới bằng một cầu thang đá dài.',
          en: 'Thác Bạc — the Silver Waterfall, reached by a long stone stairway.' },
        { vi: 'Tây Thiên — khu chùa có cáp treo, ở sườn bên kia của khối núi.',
          en: 'Tây Thiên — pagoda complex with a cable car, on the other side of the massif.' },
        { vi: 'Bậc thang tháp truyền hình — mệt nhưng tầm nhìn đẹp nhất khi trời quang.',
          en: 'The TV tower steps — brutal but the best view when it is clear.' },
        { vi: 'Nhà thờ đá — thứ được chụp ảnh nhiều nhất trong phố.',
          en: 'The stone church — the most photographed thing in town.' },
        { vi: 'Vườn su su — những giàn su su bậc thang phủ khắp sườn núi.',
          en: 'Su su gardens — terraced chayote trellises covering the slopes.' },
        { vi: 'Hồ Đại Lải — điểm dừng bên hồ tiện đường lên hoặc về.',
          en: 'Hồ Đại Lải — a good lakeside stop on the way up or back.' }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Van share' }, value: '450–700k' },
        { label: { vi: 'Phòng', en: 'Room' }, value: '300–700k' },
        { label: { vi: 'Ăn, mỗi ngày', en: 'Food, per day' }, value: '250–450k' },
        { label: { vi: 'Cáp treo, nếu đi', en: 'Cable car, if used' }, value: '~250k' },
        { label: { vi: 'Tổng, 2 ngày / 1 đêm', en: 'Total, 2 days / 1 night' },
          value: '1,2–2,2 tr' }
      ],
      note: { vi: 'Số áng chừng cho năm 2026, tính theo đầu người (VND). Tiền xe chiếm phần lớn ' +
                  'so với các nơi khác.',
              en: 'Rough 2026 figures per person in VND. Transport-heavy relative to the rest.' }
    },
    {
      type: 'callout',
      title: { vi: 'Lưu ý an toàn', en: 'Safety notes' },
      tone: 'warn',
      body: [
        { vi: 'Đoạn cuối lên núi là đường đèo dốc nhiều khúc gấp. Chỉ đi ban ngày, tài xế phải ' +
              'có kinh nghiệm, và không đi xe máy trên đoạn đó.',
          en: 'The final ascent is a steep switchback road. Daylight only, a competent driver, ' +
              'and no motorbikes on that section.' },
        { vi: 'Khi sương mù dày, tầm nhìn trên các lối đi giảm rất nhanh và bậc đá trơn thật sự. ' +
              'Cầu thang lên thác là chỗ nguy hiểm nhất.',
          en: 'In persistent mist, visibility on the walkways drops fast and the stone steps get ' +
              'genuinely slick. The waterfall stairway is the main hazard.' },
        { vi: 'Với lượng mưa tháng 9 năm 2026, hãy kiểm tra tình trạng đường trước khi chốt — ' +
              'đoạn lên núi dễ sạt lở.',
          en: 'Given the September 2026 rainfall, check road conditions before committing — the ' +
              'approach is landslide-prone.' }
      ]
    }
  ],

  reviews: {
    verdict: {
      vi: 'Ai tới vì khí lạnh thì hài lòng. Ai tới vì cảnh thì tuỳ hôm — và tuỳ bạn leo ' +
          'cao tới đâu.',
      en: 'People who come for the cool air are happy. People who come for the view get ' +
          'whatever the day gives them — and it depends how far up you go.'
    },
    praise: [
      { vi: 'Nhiệt độ quanh năm khoảng 18–25°C, mát hơn Hà Nội chừng 4–5°C. Đó là lý do ' +
            'chính và nó thật.',
        en: 'Around 18–25°C year-round, some 4–5°C cooler than Hà Nội. That is the main draw ' +
            'and it delivers.' },
      { vi: 'Rừng và thác đi tự do được, không cần tour — khá được dân đi bụi thích.',
        en: 'Forest and waterfalls can be explored independently, no tour needed, which ' +
            'backpackers rate.' },
      { vi: 'Sương tràn qua thung lũng khi ngồi quán cà phê là hình ảnh được kể lại nhiều nhất.',
        en: 'Fog rolling across the valley while you sit in a café is the image that comes ' +
            'up most.' },
      { vi: 'Rất gần Hà Nội, nên hợp làm một hai đêm thêm vào lịch trình.',
        en: 'Close enough to Hà Nội to work as a one- or two-night add-on.' }
    ],
    gripes: [
      { vi: 'Báo Việt Nam nhận xét thẳng: càng lên cao càng thất vọng, vì hàng chục căn nhà ' +
            'và lô đất bị bỏ hoang. Phần trung tâm thì ổn, phần trên thì trống trải và lạnh lẽo.',
        en: 'Vietnamese press puts it bluntly: the higher you go, the more disappointing it ' +
            'gets, because of dozens of abandoned houses and empty plots. The centre is fine; ' +
            'above it feels desolate.' },
      { vi: 'Luôn đông vào mùa hè, chủ yếu là khách Hà Nội. Cuối tuần thì đông hơn nữa.',
        en: 'Always crowded in summer, mostly with Hanoians. Weekends more so.' },
      { vi: 'Sương mù dày có thể xoá sạch tầm nhìn cả kỳ nghỉ. Không ai bảo đảm được điều này.',
        en: 'Heavy fog can erase the view for an entire weekend. Nobody can promise otherwise.' },
      { vi: 'Đây là phố nghỉ dưỡng, không phải nơi có nếp sống bản địa để quan sát.',
        en: 'It is a resort town, not a place with local life to observe.' }
    ],
    sources: [
      { label: 'vietnam.vn — on reviving tourism at Tam Đảo (notes the abandoned buildings)',
        url: 'https://thongtin.vietnam.vn/fr/khoi-phuc-suc-song-cho-du-lich-tam-dao' },
      { label: 'VnExpress — Tam Đảo travel guide',
        url: 'https://e.vnexpress.net/news/travel-guide/a-weekend-escape-at-french-influenced-summer-retreat-4537556.html' },
      { label: 'Take Your Backpack — Tam Đảo National Park guide',
        url: 'https://www.takeyourbackpack.com/backpacking-in-vietnam/visit-tam-dao-national-park/' },
      { label: 'For 91 Days — a trip to Tam Đảo',
        url: 'https://hanoi.for91days.com/tam-dao/' }
    ]
  },

  photoQuery: 'tam-dao',
  heroPhoto: 0,
  excludePhotos: []
});
