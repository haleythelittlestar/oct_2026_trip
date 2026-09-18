TRIP.registerLocation({
  id: 'binh-lieu',
  status: 'live',
  tieBreak: 3,

  name: 'Bình Liêu',
  region: 'Quảng Ninh',
  tagline: {
    vi: 'Đẹp nhất danh sách. Cũng xa nhất. Cuộc đời là vậy.',
    en: 'The most beautiful one. Also the furthest. Life is like that.'
  },
  summary: {
    vi: 'Một huyện miền núi ở cực đông bắc Quảng Ninh, sát biên giới Trung Quốc, thường được ' +
        'gọi là "Sapa thu nhỏ" của vùng đông bắc. Ruộng bậc thang, đường tuần tra trên sống ' +
        'núi, thác nước, và những bản người Tày, Dao, Sán Chỉ vẫn sống theo nhịp riêng của họ. ' +
        'Rất ít khách nước ngoài. Điểm trừ duy nhất là khoảng cách — nó vượt mốc 200 km một chút.',
    en: 'A mountain district in Quảng Ninh\u2019s far north-east, on the Chinese border, often ' +
        'called the "mini Sapa" of the north-east. Terraced fields, ridgeline border trails, ' +
        'waterfalls, and Tày, Dao and Sán Chỉ villages still running on their own rhythm. ' +
        'Very few foreign tourists. The one catch is distance — it sits just over the 200 km line.'
  },

  theme: {
    gradient: ['#a8b487', '#5f7a62', '#2b3729'],
    motif: 'terrace'
  },

  badges: [
    { tone: 'good', text: { vi: 'Ảnh chụp ở đây sẽ thắng cả group chat',
                            en: 'Your photos from here will win the group chat' } },
    { tone: 'warn', text: { vi: '3,5–4 h mỗi chiều. Vượt mốc 200 km rồi.',
                            en: '3.5–4 h each way. Yes, that is over the 200 km rule.' } },
    { tone: 'warn', text: { vi: 'Vùng biên giới — không ai được quên CCCD',
                            en: 'Border zone — nobody forgets their ID' } },
    { tone: 'info', text: { vi: 'Cỏ lau thì đầu tháng 10 vẫn còn hơi sớm',
                            en: 'Early October is a bit early for the famous reeds' } }
  ],

  facts: {
    distanceKm: 220,
    driveTime: '3,5–4 h',
    cost: { min: 1500000, max: 2500000, nights: 2 },
    activityLevel: 'Medium',
    weatherRisk: 'Medium',
    bestLength: { vi: '3 ngày / 2 đêm', en: '3 days / 2 nights' },
    vibe: { vi: 'Bản làng miền núi, đường biên', en: 'Mountain villages, border trails' }
  },

  scores: {
    scenery: 10,
    proximity: 4,
    access: 6,
    safety: 7,
    activities: 7,
    local: 10,
    value: 8
  },

  sections: [
    {
      type: 'prose',
      title: { vi: 'Vì sao chọn nơi này', en: 'Why this one' },
      body: [
        { vi: 'Đây là lựa chọn cho đúng tất cả những gì cả nhóm mô tả về *cảm giác* — cảnh ' +
              'quan, thiên nhiên, nếp sống bản địa, đi bộ nhẹ — ở mức cao nhất của cả vùng ' +
              'đông bắc. Chỉ phải trả thêm một giờ xe mỗi chiều.',
          en: 'This is the option that delivers everything the brief describes about *feel* — ' +
              'landscape, nature, local life, light walking — at its highest quality anywhere ' +
              'in the north-east. It just costs an extra hour of driving each way.' },
        { vi: 'Nói thẳng về khoảng cách: khoảng 210–230 km, 3,5–4 h, tức là vượt mốc 200 km. ' +
              'Nhưng đường thì dễ — Hải Phòng, Hạ Long, cao tốc Vân Đồn, rồi QL18 và đường ' +
              'tỉnh lên núi. Nếu cả nhóm chịu được một ngày di chuyển dài hơn thì đây là nơi ' +
              'đáng giá nhất trong danh sách.',
          en: 'Honest about the distance: roughly 210–230 km, 3.5–4 h, which is over the ' +
              '200 km limit. The drive itself is easy — Hải Phòng, Hạ Long, the Vân Đồn ' +
              'expressway, then QL18 and a provincial road up into the hills. If the group can ' +
              'accept one longer transfer day, this is the most rewarding place on the list.' }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '3 ngày / 2 đêm', en: '3 days / 2 nights' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Đi đường dài, nhưng nhẹ nhàng', en: 'The long transfer, gently' },
          blocks: [
            { when: '06:30',
              what: { vi: 'Rời Hải Phòng sớm. Dừng cà phê ở Hạ Long hoặc Vân Đồn.',
                      en: 'Leave Hải Phòng early. Coffee stop in Hạ Long or Vân Đồn.' } },
            { when: { vi: 'Đầu giờ chiều', en: 'Early afternoon' },
              what: { vi: 'Tới Bình Liêu, nhận phòng homestay.',
                      en: 'Arrive Bình Liêu, check into a homestay.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Đi bộ quanh ruộng gần bản. Không cần gắng sức.',
                      en: 'Walk the paddies around the village. Nothing strenuous.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Ăn ở homestay — cá suối nướng, gà đồi, rượu ngô.',
                      en: 'Homestay dinner — grilled stream fish, gà đồi, rượu ngô.' } }
          ]
        },
        {
          label: { vi: 'Ngày 2', en: 'Day 2' },
          title: { vi: 'Sống núi, và một cái thác', en: 'The ridge, and a waterfall' },
          blocks: [
            { when: { vi: 'Sáng sớm', en: 'Early' },
              what: { vi: 'Sống lưng khủng long — đi bộ trên đường tuần tra biên giới. Chọn một ' +
                          'đoạn giữa các mốc 1300, 1302, 1305 và 1327. Đường bê tông, sống núi ' +
                          'trống, 2–3 h cả đi và về. Không hề kỹ thuật.',
                      en: 'Sống lưng khủng long — the "dinosaur spine" ridge walk along the ' +
                          'border patrol path. Pick one section between markers 1300, 1302, ' +
                          '1305 and 1327. Concrete path, open ridge, 2–3 h return. Not technical.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Thác Khe Vằn — thác ba tầng, đường vào dễ.',
                      en: 'Thác Khe Vằn — a three-tier waterfall, easy walk in.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Về bản. Ngủ sớm.', en: 'Back in the village. Early night.' } }
          ]
        },
        {
          label: { vi: 'Ngày 3', en: 'Day 3' },
          title: { vi: 'Đi chợ, rồi về', en: 'Market, then the drive back' },
          blocks: [
            { when: { vi: 'Sáng sớm', en: 'Early morning' },
              what: { vi: 'Chợ Bình Liêu. Đây là chỗ chuyến đi kiếm được chất bản địa của nó. ' +
                          'Mua đồ địa phương.',
                      en: 'Chợ Bình Liêu — the town market. This is where the trip earns its ' +
                          'local character. Buy produce.' } },
            { when: { vi: 'Buổi trưa', en: 'Midday' },
              what: { vi: 'Bắt đầu về. Có thể dừng Hạ Long ăn trưa và đi bộ ven vịnh để chia ' +
                          'nhỏ đường.',
                      en: 'Start home. Optional stop in Hạ Long for lunch and the bay ' +
                          'promenade to break the drive.' } }
          ]
        }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Còn gì nữa ở đó', en: 'What else is there' },
      items: [
        { vi: 'Cao Ba Lanh — cao nguyên cỏ với hồ trên núi, hoang hơn và ít người tới hơn nhiều.',
          en: 'Cao Ba Lanh — high moorland with mountain lakes, wilder and much less visited.' },
        { vi: 'Đi bộ quanh các bản ở Lục Hồn và Húc Động, qua những triền ruộng lượn.',
          en: 'Village walks around Lục Hồn and Húc Động, through rolling paddy.' },
        { vi: 'Chính những cột mốc biên giới, vốn là điểm nhận diện của vùng và là lý do phần ' +
              'lớn người ta tới đây.',
          en: 'The border markers themselves, which are the local landmark and the reason most ' +
              'people come.' }
      ]
    },
    {
      type: 'callout',
      title: { vi: 'Về thời điểm cỏ lau — đọc trước khi chốt ngày',
               en: 'On the cỏ lau timing — read before choosing dates' },
      tone: 'info',
      body: [
        { vi: 'Mùa cỏ lau nổi tiếng của Bình Liêu là lý do phần lớn người ta đi vào mùa thu. ' +
              'Một bài viết giữa tháng 10 năm 2025 cho biết ở mốc 1297 cỏ lau đã nở trắng tím ' +
              'dọc đường, còn ở mốc 1305 thì mới chỉ bắt đầu.',
          en: 'Bình Liêu\u2019s famous cỏ lau (silver reed grass) season is why most people come ' +
              'in autumn. A mid-October 2025 report described reeds already flowering ' +
              'purple-white along the road at marker 1297, while at marker 1305 they were only ' +
              'just starting.' },
        { vi: 'Vậy nên tuần đầu tháng 10 hơi sớm so với lúc cỏ lau đẹp nhất. Bạn sẽ được sống ' +
              'núi còn xanh và có thể là ruộng chín vàng — đẹp theo một kiểu khác. Nếu cả nhóm ' +
              'muốn đúng những bức ảnh cỏ lau trắng thì nên dịch chuyến đi sang cuối tháng 10 ' +
              'hoặc tháng 11.',
          en: 'So the first week of October is slightly early for peak reeds. You would get ' +
              'green ridges and possibly golden paddy instead — beautiful in a different way. ' +
              'If the group specifically wants the white-reed photographs, push the trip to ' +
              'late October or November.' }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Ở & ăn', en: 'Stay & eat' },
      items: [
        { term: { vi: 'Ở', en: 'Stay' },
          text: { vi: 'Homestay và nhà nghỉ nhỏ, 200–400k một người một đêm kèm ăn. Nhiều chỗ ' +
                      'không có trên các trang đặt phòng — gọi điện hoặc nhắn Facebook, và nên ' +
                      'để tài xế hoặc một bạn nói tiếng Việt xác nhận lại.',
                  en: 'Homestays and small guesthouses, 200–400k per person per night including ' +
                      'meals. Many are not on booking platforms — book by phone or Facebook, ' +
                      'and have the driver or a Vietnamese-speaking group member confirm.' } },
        { term: { vi: 'Ăn', en: 'Eat' },
          text: { vi: 'Ăn ở homestay chính là cái hay. Cá suối nướng, gà đồi, rượu ngô. Chợ thì ' +
                      'tốt cho đồ ăn vặt và nông sản.',
                  en: 'Homestay cooking is the point. Grilled stream fish, hill chicken, corn ' +
                      'wine. The market is good for snacks and produce.' } }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Van share' }, value: '500–800k' },
        { label: { vi: 'Homestay + ăn', en: 'Homestay + meals' }, value: '400–800k' },
        { label: { vi: 'Người dẫn đường hoặc phí', en: 'Local guide or fees' }, value: '100–200k' },
        { label: { vi: 'Tổng, 3 ngày / 2 đêm', en: 'Total, 3 days / 2 nights' },
          value: '1,5–2,5 tr' }
      ],
      note: { vi: 'Số áng chừng cho năm 2026, tính theo đầu người (VND).',
              en: 'Rough 2026 figures per person in VND.' }
    },
    {
      type: 'callout',
      title: { vi: 'Lưu ý an toàn', en: 'Safety notes' },
      tone: 'warn',
      body: [
        { vi: 'Vùng biên giới. Bạn đang đi bộ cách đường biên quốc tế vài mét. Mang CCCD cho ' +
              'tất cả mọi người, đi đúng đường tuần tra, không vượt qua cột mốc, và cư xử lịch ' +
              'sự với bộ đội biên phòng. Đây là chuyện bình thường, không đáng sợ — nhưng không ' +
              'phải chuyện tuỳ ý.',
          en: 'Border zone. You are walking within metres of an international border. Bring ID ' +
              'cards (CCCD) for everyone, stay on the marked patrol path, do not cross markers, ' +
              'and be polite with border guards. This is routine, not frightening — but it is ' +
              'not optional.' },
        { vi: 'Sạt lở sau mưa lớn. Với lượng mưa tháng 9 năm 2026 ở miền Bắc, hãy kiểm tra ' +
              'tình trạng đường tỉnh trước khi chốt.',
          en: 'Landslides after heavy rain. Given the September 2026 rainfall across the north, ' +
              'check the provincial road condition before committing.' },
        { vi: 'Không lái xe đêm trên các đoạn đường núi. Tính giờ để tới nơi trước khi trời tối.',
          en: 'No night driving on the mountain sections. Plan every arrival before dark.' },
        { vi: 'Sống núi hoàn toàn trống trải — không bóng mát, không quán, không nước. Mang mũ ' +
              'và nước.',
          en: 'The ridge is fully exposed — no shade, no shops, no water. Hats and water.' }
      ]
    }
  ],

  reviews: {
    verdict: {
      vi: 'Những người viết du lịch độc lập coi đây là một phát hiện thật sự — nhưng luôn ' +
          'kèm nhắc nhở rằng đây là huyện biên giới, nên hỏi người địa phương trước.',
      en: 'Independent travel writers treat it as a genuine find — always with the caveat ' +
          'that it is a border district, so ask locally first.'
    },
    praise: [
      { vi: 'Vietnam Coracle mô tả đường núi ở đây là "phi thường", và nói Bình Liêu có tiềm ' +
            'năng thành một Hà Giang thu nhỏ cho dân đi đường dài.',
        en: 'Vietnam Coracle calls the mountain roads here extraordinary, and says Bình Liêu ' +
            'has the potential to be a mini Hà Giang for road-trippers.' },
      { vi: '96% dân số huyện là người dân tộc thiểu số, nên cảm giác vùng biên là thật, ' +
            'không phải dàn dựng cho khách.',
        en: 'Ethnic minorities make up 96% of the district\u2019s population, so the frontier ' +
            'character is real rather than staged for visitors.' },
      { vi: 'Núi trọc vươn lên trên những thung lũng xanh, đường men theo sống núi dốc — ' +
            'đây là kiểu cảnh mà tỉnh Quảng Ninh không nổi tiếng vì nó.',
        en: 'Barren mountains above lush valleys, roads along precipitous ridges — a side of ' +
            'Quảng Ninh the province is not known for.' },
      { vi: 'Thác nước và homestay đều được nhắc đến tích cực.',
        en: 'Waterfalls and homestays both get positive mentions.' }
    ],
    gripes: [
      { vi: 'Quan trọng nếu nhóm có ai là người nước ngoài: cho tới rất gần đây, khách nước ' +
            'ngoài cần giấy phép để tới và ngủ qua đêm ở một số khu vực Bình Liêu. Báo cáo ' +
            'tháng 3/2026 nói các hạn chế này đã bỏ, nhưng vài khu vực biên giới có thể vẫn ' +
            'không cho khách nước ngoài vào. Người Việt thì không bị ảnh hưởng.',
        en: 'Matters if anyone in the group is a foreign national: until very recently foreign ' +
            'travellers needed a permit to visit and stay overnight in parts of Bình Liêu. ' +
            'March 2026 reports say those restrictions have been lifted, but some border areas ' +
            'may still be off-limits to foreigners. Vietnamese citizens are unaffected.' },
      { vi: 'Vòng phía bắc là đẹp nhất nhưng sát biên giới nhất, và khách nước ngoài vẫn có ' +
            'khả năng bị công an dừng lại hỏi.',
        en: 'The north loop is the most spectacular but sits closest to the border, and ' +
            'foreign riders can still be stopped by police.' },
      { vi: 'Hạ tầng du lịch gần như không có. Đó là điểm hay, nhưng cũng nghĩa là không có ' +
            'gì dự phòng nếu kế hoạch đổ.',
        en: 'There is almost no tourism infrastructure. That is the appeal, but it also means ' +
            'no fallback if a plan collapses.' }
    ],
    sources: [
      { label: 'Vietnam Coracle — Bình Liêu border loop (updated March 2026)',
        url: 'https://www.vietnamcoracle.com/binh-lieu-border-loop-by-motorbike/' },
      { label: 'Local Vietnam — Bình Liêu, the "mini Sapa" of the north-east',
        url: 'https://localvietnam.com/quang-ninh/travel-guide-binh-lieu-things-to-do/' }
    ]
  },

  photoQuery: 'binh-lieu',
  heroPhoto: 0,
  excludePhotos: []
});
