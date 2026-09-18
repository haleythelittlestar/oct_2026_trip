TRIP.registerLocation({
  id: 'con-son-chi-linh',
  status: 'live',
  tieBreak: 2,

  name: 'Côn Sơn – Kiếp Bạc + các hồ Chí Linh',
  region: { vi: 'Hải Phòng (Chí Linh)', en: 'Hải Phòng (Chí Linh)' },
  tagline: {
    vi: 'Di sản thế giới UNESCO. Trong thành phố mình. Mà chắc chưa ai trong nhóm từng tới.',
    en: 'A UNESCO World Heritage site. In your own city. That none of you have been to.'
  },
  summary: {
    vi: 'Sau khi Hải Dương sáp nhập vào Hải Phòng năm 2025, vùng đồi Chí Linh nằm ngay ' +
        'trong thành phố mình, cách khoảng 65 km. Rừng thông, suối, các khu đền chùa và ' +
        'những hồ nước phẳng lặng. Tháng 7 năm 2025, quần thể Yên Tử – Vĩnh Nghiêm – Côn ' +
        'Sơn, Kiếp Bạc được UNESCO công nhận là Di sản Thế giới thứ 9 của Việt Nam — nên nơi ' +
        'này từ chỗ đi chơi cuối tuần thành di sản thế giới mà không hề xa thêm một mét nào.',
    en: 'After the 2025 merger of Hải Dương into Hải Phòng, the Chí Linh hills sit inside ' +
        'your own city, about 65 km up the road. Pine forest, mountain streams, temple ' +
        'complexes and still reservoirs. In July 2025 the Yên Tử – Vĩnh Nghiêm – Côn Sơn, ' +
        'Kiếp Bạc complex became Vietnam\u2019s 9th UNESCO World Heritage site, so this went ' +
        'from local weekend spot to World Heritage without getting any further away.'
  },

  theme: {
    gradient: ['#8aab90', '#4e7568', '#24382f'],
    motif: 'temple'
  },

  badges: [
    { tone: 'good', text: { vi: 'Gần như không thể đi sai ở đâu',
                            en: 'Almost impossible to get wrong' } },
    { tone: 'good', text: { vi: 'Rẻ nhất danh sách, không đối thủ',
                            en: 'Cheapest by a mile' } },
    { tone: 'good', text: { vi: 'Bão cũng không huỷ được chuyến này',
                            en: 'A typhoon cannot cancel this one' } },
    { tone: 'info', text: { vi: 'Không "wow" bằng biển hay núi, nói trước cho khỏi thất vọng',
                            en: 'Less "wow" than sea or mountains, so you know going in' } }
  ],

  facts: {
    distanceKm: 65,
    driveTime: '~1,5 h',
    cost: { min: 800000, max: 1500000, nights: 1 },
    activityLevel: 'Light',
    weatherRisk: 'Low',
    bestLength: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
    vibe: { vi: 'Rừng thông, di sản, hồ lặng', en: 'Pine forest, heritage, still water' }
  },

  scores: {
    scenery: 6,
    proximity: 10,
    access: 10,
    safety: 9,
    activities: 5,
    local: 6,
    value: 10
  },

  sections: [
    {
      type: 'prose',
      title: { vi: 'Vì sao chọn nơi này', en: 'Why this one' },
      body: [
        { vi: 'Đây là lựa chọn an toàn thông minh. Gần như không có rủi ro đi lại, gần như ' +
              'không có rủi ro thời tiết, chi phí nhỏ, đường ngắn — mà vẫn có rừng, nước, ' +
              'tầm nhìn và một cảm giác về nơi chốn thật sự.',
          en: 'This is the smart safe choice. Almost no logistics risk, almost no weather ' +
              'risk, a tiny budget and a short drive — and it still delivers forest, water, ' +
              'views and a real sense of place.' },
        { vi: 'Nếu cả nhóm còn do dự, hoặc đang lo lắng theo dõi dự báo, thì cứ chọn cái này. ' +
              'Nó cũng là lựa chọn sống sót qua bão: trong đất liền, trên cao, và không có ' +
              'thứ gì bị huỷ vì lệnh cấm biển.',
          en: 'If the group is unsure, indecisive, or watching the forecast nervously, this ' +
              'is the yes. It is also the option that survives a storm: inland, on high ' +
              'ground, with nothing that can be cancelled by a sea ban.' }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Thông, bậc đá và một cái hồ', en: 'Pines, steps and a lake' },
          blocks: [
            { when: { vi: 'Sau bữa sáng', en: 'After breakfast' },
              what: { vi: 'Rời Hải Phòng, tới vào giữa buổi sáng.',
                      en: 'Leave Hải Phòng, arrive mid-morning.' } },
            { when: { vi: 'Cuối buổi sáng', en: 'Late morning' },
              what: { vi: 'Chùa Côn Sơn (Thiên Tư Phúc) và đền thờ Nguyễn Trãi dưới chân núi ' +
                          'Ngũ Nhạc. Cây cổ thụ, bậc đá, thung lũng Thanh Hư.',
                      en: 'Chùa Côn Sơn (Thiên Tư Phúc) and the Nguyễn Trãi temple at the foot ' +
                          'of Ngũ Nhạc mountain. Old trees, stone steps, the Thanh Hư valley.' } },
            { when: { vi: 'Buổi trưa', en: 'Midday' },
              what: { vi: 'Leo lên Bàn Cờ Tiên — khoảng 600 bậc qua rừng thông, 45–60 phút. ' +
                          'Ăn trưa mang theo ở trên đỉnh.',
                      en: 'Climb to Bàn Cờ Tiên — about 600 steps through pines, 45–60 min up. ' +
                          'Picnic lunch at the top.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Hồ Bến Tắm hoặc hồ Thanh Long. Chỉ tắm nếu có khu được quản lý; ' +
                          'không thì cứ nằm chơi bên nước.',
                      en: 'Hồ Bến Tắm or hồ Thanh Long. Swim only if there is a managed area; ' +
                          'otherwise just laze by the water.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Cắm trại ven hồ hoặc ở homestay. Nướng, đốt lửa, hát hò.',
                      en: 'Camp lakeside or take a homestay. BBQ, fire, music.' } }
          ]
        },
        {
          label: { vi: 'Ngày 2', en: 'Day 2' },
          title: { vi: 'Sáu con sông, rồi về', en: 'Six rivers, then home' },
          blocks: [
            { when: { vi: 'Buổi sáng', en: 'Morning' },
              what: { vi: 'Đền Kiếp Bạc thờ Trần Hưng Đạo, nhìn ra Lục Đầu Giang nơi sáu con ' +
                          'sông gặp nhau.',
                      en: 'Đền Kiếp Bạc, dedicated to Trần Hưng Đạo, looking out over Lục Đầu ' +
                          'Giang where six rivers meet.' } },
            { when: { vi: 'Buổi trưa', en: 'Midday' },
              what: { vi: 'Ghé Kinh Môn xem bia Ma Nhai động Kính Chủ và đền Cao An Phụ — cả ' +
                          'hai đều thuộc cùng quần thể di sản.',
                      en: 'Detour to Kinh Môn for the Ma Nhai Kính Chủ cave inscriptions and ' +
                          'đền Cao An Phụ — both part of the same heritage complex.' } },
            { when: { vi: 'Chiều muộn', en: 'Late afternoon' },
              what: { vi: 'Về nhà.', en: 'Home.' } }
          ]
        }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Nếu muốn kéo thành 3 ngày', en: 'Stretching it to three days' },
      intro: { vi: 'Một cách gọn để thêm một đêm mà không phải đi thêm nhiều:',
               en: 'One clean way to add a night without adding much driving:' },
      items: [
        { vi: 'Thêm Yên Tử (Uông Bí, Quảng Ninh) làm điểm dừng thứ hai — cách Hải Phòng ' +
              'khoảng 60 km và thuộc cùng quần thể UNESCO.',
          en: 'Add Yên Tử (Uông Bí, Quảng Ninh) as a second base — about 60 km from Hải Phòng ' +
              'and part of the same UNESCO complex.' },
        { vi: 'Cáp treo lên, chùa Đồng trên đỉnh, và làng di sản Trúc Lâm dưới chân núi.',
          en: 'Cable car up, the Đồng pagoda at the summit, and the Trúc Lâm heritage village ' +
              'at the foot.' },
        { vi: 'Như vậy là hai điểm di sản, hai đợt leo ngắn và một cái hồ, tất cả trong vòng ' +
              '80 km quanh nhà.',
          en: 'That gives you two heritage sites, two short climbs and a lake, all inside ' +
              '80 km of home.' }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Ở & ăn', en: 'Stay & eat' },
      items: [
        { term: { vi: 'Ở', en: 'Stay' },
          text: { vi: 'Homestay và khách sạn nhỏ quanh Chí Linh và Sao Đỏ, khoảng 200–400k ' +
                      'một phòng. Cắm trại ở các hồ.',
                  en: 'Homestays and small hotels around Chí Linh and Sao Đỏ, roughly ' +
                      '200–400k a room. Camping at the lakes.' } },
        { term: { vi: 'Ăn', en: 'Eat' },
          text: { vi: 'Quán ăn địa phương trong phố; mang đồ theo cho bữa picnic và tiệc nướng ' +
                      'ven hồ.',
                  en: 'Simple local restaurants in town; bring your own food for the picnic ' +
                      'and the lakeside BBQ.' } }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Van share' }, value: '250–400k' },
        { label: { vi: 'Phòng hoặc cắm trại', en: 'Room or camping' }, value: '150–300k' },
        { label: { vi: 'Ăn, mỗi ngày', en: 'Food, per day' }, value: '200–350k' },
        { label: { vi: 'Vé đền chùa', en: 'Temple entry' },
          value: { vi: 'Nhỏ hoặc miễn phí', en: 'Small or free' } },
        { label: { vi: 'Tổng, 2 ngày / 1 đêm', en: 'Total, 2 days / 1 night' },
          value: '0,8–1,5 tr' }
      ],
      note: { vi: 'Số áng chừng cho năm 2026, tính theo đầu người (VND). Rẻ nhất trong danh sách.',
              en: 'Rough 2026 figures per person in VND. By far the cheapest option here.' }
    },
    {
      type: 'callout',
      title: { vi: 'Lưu ý an toàn', en: 'Safety notes' },
      tone: 'warn',
      body: [
        { vi: 'Bậc đá rất trơn khi mưa — mang giày tử tế, không mang xăng-đan.',
          en: 'Stone steps get slippery in rain — proper shoes, not sandals.' },
        { vi: 'Không tắm ở hồ không có người quản lý. Cùng một nguyên tắc như hồ Đồng Đò: ' +
              'bờ dốc hụt chân, nước lạnh phân tầng, không ai trông.',
          en: 'Do not swim in unmanaged reservoirs. Same rule as hồ Đồng Đò: steep hidden ' +
              'drop-offs, cold layers, nobody watching.' },
        { vi: 'Ở đền chùa: che vai và đầu gối, nói nhẹ nhàng.',
          en: 'Temple sites: covered shoulders and knees, quiet voices.' }
      ]
    },
    {
      type: 'callout',
      title: { vi: 'Điểm trừ', en: 'The catch' },
      tone: 'info',
      body: [
        { vi: 'Đẹp nhưng không hùng vĩ. Không có núi đá vôi nhô lên từ biển, không có tầm ' +
              'nhìn từ sống núi — chỉ có rừng, đền chùa và mặt nước lặng.',
          en: 'It is beautiful but not dramatic. There are no karst towers rising out of the ' +
              'sea and no ridgeline views — it is forest, temples and still water.' },
        { vi: 'Nó cũng ít hoạt động: hai ngày là đúng độ, và ngày thứ ba thì cần thêm Yên Tử ' +
              'mới đáng.',
          en: 'It is also thin on activities: two days is the right length, and a third day ' +
              'would need the Yên Tử extension to be worth it.' }
      ]
    }
  ],

  reviews: {
    verdict: {
      vi: 'Gần như không có bài đánh giá du lịch độc lập nào bằng tiếng Anh — phần lớn tư ' +
          'liệu là báo trong nước viết về lễ hội và hành hương. Bản thân điều đó cũng là ' +
          'một thông tin.',
      en: 'There is almost no independent English-language traveller commentary — most of ' +
          'the coverage is domestic press about festivals and pilgrimage. That absence is ' +
          'itself informative.'
    },
    praise: [
      { vi: 'Được UNESCO công nhận tháng 7/2025 trong quần thể Yên Tử – Vĩnh Nghiêm – Côn ' +
            'Sơn, Kiếp Bạc, gồm 20 hợp phần, là di sản thế giới thứ 9 của Việt Nam.',
        en: 'UNESCO-listed in July 2025 as part of the 20-component Yên Tử – Vĩnh Nghiêm – ' +
            'Côn Sơn, Kiếp Bạc complex, Vietnam\u2019s 9th World Heritage site.' },
      { vi: 'Hơn 320.000 khách trong một mùa lễ hội — nơi này được người Việt yêu mến, chỉ ' +
            'là chưa lên radar khách quốc tế.',
        en: 'Over 320,000 visitors in a single festival season — this place is well loved ' +
            'domestically, just off the international radar.' },
      { vi: 'Báo chí nhắc tới rừng thông, suối bạc và cảm giác tĩnh lặng, cùng với sáu con ' +
            'sông gặp nhau ở Lục Đầu Giang.',
        en: 'Coverage highlights the pine forest, silver streams and a sense of stillness, ' +
            'plus the six rivers meeting at Lục Đầu Giang.' }
    ],
    gripes: [
      { vi: 'Rất đông vào mùa lễ hội (khoảng tháng 1–3 và tháng 8 âm lịch). Đầu tháng 10 thì ' +
            'ngoài mùa, nên đây là điểm cộng cho chuyến này.',
        en: 'Extremely busy during festival season (roughly lunar months 1–3 and 8). Early ' +
            'October falls outside that, which works in this trip\u2019s favour.' },
      { vi: 'Đây là điểm di sản tâm linh, không phải điểm phiêu lưu. Ai muốn cảnh choáng ngợp ' +
            'sẽ thấy nó nhẹ nhàng quá.',
        en: 'It is a spiritual heritage site, not an adventure destination. Anyone after ' +
            'dramatic landscape will find it gentle.' },
      { vi: 'Vì ít bài viết độc lập nên khó biết trước chất lượng dịch vụ. Nên gọi trước.',
        en: 'With so little independent writing, service quality is hard to judge in advance. ' +
            'Phone ahead.' }
    ],
    sources: [
      { label: 'UNESCO — Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc inscription',
        url: 'https://www.unesco.org/en/articles/yen-tu-vinh-nghiem-con-son-kiep-bac-officially-inscribed-world-heritage-list' },
      { label: 'vietnam.vn — Côn Sơn – Kiếp Bạc, awakening the heritage potential',
        url: 'https://www.vietnam.vn/es/con-son-kiep-bac-danh-thuc-tiem-nang-di-san' },
      { label: 'Heritage Vietnam Airlines — where waters and mountains meet',
        url: 'https://heritagevietnamairlines.com/en/where-waters-and-mountains-meet' }
    ]
  },

  photoQuery: 'con-son-chi-linh',
  heroPhoto: 0,
  excludePhotos: []
});
