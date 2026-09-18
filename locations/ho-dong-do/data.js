TRIP.registerLocation({
  id: 'ho-dong-do',
  status: 'live',
  tieBreak: 7,

  name: 'Hồ Đồng Đò',
  region: { vi: 'Sóc Sơn, Hà Nội', en: 'Sóc Sơn, Hà Nội' },
  tagline: {
    vi: 'Ý tưởng ban đầu của nhóm mình. Xin lỗi nhé — nó xếp cuối, và đây là lý do.',
    en: 'Your original idea. Sorry — it came last, and here is why.'
  },
  summary: {
    vi: 'Một hồ chứa ở thôn Minh Tân, xã Minh Trí trong vùng đồi Sóc Sơn, cách trung tâm Hà Nội ' +
        'khoảng 40–45 km về phía bắc, bao quanh là rừng thông. Nó đã thành một trong những điểm ' +
        'cắm trại cuối tuần được yêu thích nhất của Hà Nội. Đây là ý tưởng ban đầu của cả nhóm, ' +
        'và nó thoải mái nằm trong mốc 200 km — nhưng nó xếp cuối, và lý do thì đáng đọc.',
    en: 'A reservoir at thôn Minh Tân, xã Minh Trí in the Sóc Sơn hills, about 40–45 km north ' +
        'of central Hà Nội, ringed by pine forest. It has become one of Hà Nội\u2019s most popular ' +
        'weekend camping spots. This was your original idea, and it clears the 200 km ' +
        'rule comfortably — but it ranks last, and the reasons are worth reading.'
  },

  theme: {
    gradient: ['#94b0a3', '#52736a', '#25332f'],
    motif: 'lake'
  },

  badges: [
    { tone: 'good',   text: { vi: 'Rẻ nhất, và không ai phải đi bộ đâu cả',
                              en: 'Cheapest, and nobody has to walk anywhere' } },
    { tone: 'warn',   text: { vi: 'Hết việc để chơi sau nửa ngày. Nghĩa là ngày 2 hơi dài.',
                              en: 'Out of things to do by lunchtime on day one' } },
    { tone: 'danger', text: { vi: 'Hồ không có cứu hộ. Không tắm. Cái này nói thật.',
                              en: 'No lifeguards. Do not swim. This part is not a joke.' } },
    { tone: 'info',   text: { vi: '150 km mỗi chiều cho thứ mà Chí Linh có, gần hơn một nửa',
                              en: '150 km each way for something Chí Linh has at half the distance' } }
  ],

  facts: {
    distanceKm: 150,
    driveTime: '2,5–3 h',
    cost: { min: 600000, max: 1200000, nights: 1 },
    activityLevel: 'Light',
    weatherRisk: 'Medium',
    bestLength: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
    vibe: { vi: 'Cắm trại bên hồ, đồi thông', en: 'Reservoir camping, pine hills' }
  },

  scores: {
    scenery: 6,
    proximity: 6,
    access: 7,
    safety: 6,
    activities: 3,
    local: 4,
    value: 9
  },

  sections: [
    {
      type: 'prose',
      title: { vi: 'Đánh giá thật thà', en: 'The honest assessment' },
      body: [
        { vi: 'Đây thật sự là một chỗ đẹp, và tháng 10 là tháng tốt để đi — khuyến nghị của dân ' +
              'địa phương là khoảng tháng 3 tới tháng 11, trong đó mùa thu được gọi tên riêng là ' +
              'thời điểm đẹp nhất để cắm trại qua đêm.',
          en: 'It is a genuinely pretty spot, and October is a good month for it — the local ' +
              'recommendation runs roughly March to November, with autumn named specifically as ' +
              'the best time for an overnight camp.' },
        { vi: 'Nhưng nó xếp cuối vì một con số: 3 trên 10 cho việc có đủ thứ để làm. Đây là điểm ' +
              'đến của một đêm. Với chuyến hai hoặc ba ngày thì ngày thứ hai và thứ ba không có ' +
              'gì mới.',
          en: 'But it ranks last because of one number: 3 out of 10 for having enough to do. ' +
              'This is a one-night destination. For a two or three day trip, days two and three ' +
              'have nothing new in them.' }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Lý do nên chọn', en: 'The case for it' },
      items: [
        { vi: 'Rẻ nhất danh sách với khoảng cách rõ rệt — tầm 600k–1,2 tr một người cho hai ngày ' +
              'một đêm.',
          en: 'Cheapest option on the list by a clear margin — roughly 600k–1.2 tr per person ' +
              'for two days and one night.' },
        { vi: 'Không có áp lực gì cả. Không ai phải đi bộ đâu hay có mặt đúng giờ ở đâu. Tốt nếu ' +
              'mục tiêu thật của cả nhóm chỉ là ở cùng nhau ngoài trời.',
          en: 'Zero-pressure format. Nobody has to walk anywhere or be anywhere on time. Good if ' +
              'the real goal is simply hanging out together outdoors.' },
        { vi: 'Lên ảnh đẹp — rừng thông và mặt nước lặng chụp rất ăn ảnh.',
          en: 'Photogenic — pine forest and still water photograph beautifully.' },
        { vi: 'Đây là mô hình đã chạy quen, có các đơn vị cắm trại sẵn, nên lều, kayak và đồ ' +
              'nướng đều thuê được tại chỗ.',
          en: 'A proven format with established camping operators, so tents, kayaks and BBQ gear ' +
              'can all be rented on site.' }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Lý do không nên chọn', en: 'The case against it' },
      items: [
        { vi: 'Hết việc để chơi sau khoảng nửa ngày: chèo thuyền, đạp xe một vòng, câu cá, nướng, ' +
              'đốt lửa. Hết thực đơn.',
          en: 'The activity list runs out in about half a day: paddle the lake, cycle the loop, ' +
              'fish, BBQ, campfire. That is the whole menu.' },
        { vi: 'Đi 150 km mỗi chiều cho một cái hồ chứa. Các hồ Chí Linh cho bạn rừng thông, hồ ' +
              'nước, cắm trại *và* một quần thể di sản UNESCO ở khoảng cách chưa tới một nửa.',
          en: '150 km each way for a reservoir. The Chí Linh lakes give you pine forest, lake, ' +
              'camping *and* a UNESCO heritage complex at less than half the distance.' },
        { vi: 'Đây là chỗ đi chơi cuối tuần của người Hà Nội, không phải một điểm đến. Cuối tuần ' +
              'cao điểm thì đông và ồn, rác và loa nhạc đua nhau.',
          en: 'It is Hà Nội\u2019s weekend spot, not a destination. Peak weekends get crowded and ' +
              'noisy, with litter and competing sound systems.' },
        { vi: 'Tiện nghi mỏng — không cứu hộ, nhà vệ sinh hạn chế, không có hỗ trợ y tế đáng tin ' +
              'gần đó. Mọi thứ phụ thuộc vào đồ bạn mang hoặc đơn vị bạn thuê.',
          en: 'Facilities are thin — no lifeguards, limited toilets, no reliable medical support ' +
              'nearby. Everything depends on what you bring or which operator you book.' }
      ]
    },
    {
      type: 'callout',
      title: { vi: 'An toàn — điều duy nhất phải làm cho đúng',
               en: 'Safety — the one thing to get right' },
      tone: 'danger',
      body: [
        { vi: 'Đây là hồ chứa thuỷ lợi không có người quản lý: bờ dốc, chỗ hụt chân đột ngột, ' +
              'nước lạnh phân tầng ở dưới sâu, và không ai trông. Ngay cả các bài hướng dẫn của ' +
              'dân mê cắm trại ở hồ này cũng nói phải mặc áo phao mỗi khi xuống nước.',
          en: 'This is an unmanaged irrigation reservoir: steep banks, sudden drop-offs, cold ' +
              'deeper layers, and no supervision. Even the enthusiast guides for the lake tell ' +
              'you to wear a life jacket whenever you are on the water.' },
        { vi: 'Không tắm. Thuyền thì được, tắm thì không. Nếu ai nhất định muốn thì phải ở khu ' +
              'nước cạn có đánh dấu, và có một người tỉnh táo đứng trên bờ trông.',
          en: 'No swimming. Boats yes, swimming no. If anyone insists, stay in a shallow marked ' +
              'area with someone sober watching from shore.' },
        { vi: 'Áo phao cho từng người trên mỗi chiếc thuyền, kể cả người bơi giỏi. Không uống ' +
              'rượu bia trước hoặc trong lúc ở trên nước — đồ uống chỉ mang ra sau khi thuyền đã ' +
              'cất.',
          en: 'Life jackets for every person on every boat, including strong swimmers. No alcohol ' +
              'before or during anything on the water — drinks come out after the boats are away.' },
        { vi: 'Quây kín bếp lửa, để xa lá thông khô và cỏ khô, và dập hẳn khi xong. Khoá lều và ' +
              'giữ đồ giá trị bên mình: mất cắp nhỏ là chuyện thường bị phàn nàn ở các bãi cắm ' +
              'trại mở đông người. Mang hết rác về.',
          en: 'Contain the campfire, keep it clear of pine needles and dry grass, and put it out ' +
              'fully. Lock tents and keep valuables with you: petty theft is the common complaint ' +
              'at popular open campsites. Pack out all rubbish.' }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '2 ngày / 1 đêm — nên đi giữa tuần',
               en: '2 days / 1 night — go midweek' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Dựng trại và nghỉ', en: 'Set up and settle in' },
          blocks: [
            { when: '08:00',
              what: { vi: 'Rời Hải Phòng. Đường: cao tốc Hà Nội – Hải Phòng, vành đai, cầu Nhật ' +
                          'Tân, rồi Nội Bài / QL2.',
                      en: 'Leave Hải Phòng. Route: Hà Nội – Hải Phòng expressway, ring road, ' +
                          'Nhật Tân bridge, then Nội Bài / QL2.' } },
            { when: { vi: 'Cuối buổi sáng', en: 'Late morning' },
              what: { vi: 'Ngã ba Quang Tiến, đường 35 vào Minh Trí, rồi khoảng 3 km đường làng ' +
                          'nữa là tới bãi cắm.',
                      en: 'Quang Tiến junction, road 35 to Minh Trí, then about 3 km of village ' +
                          'lane to the campsite.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Dựng lều hoặc nhận chỗ ở bãi ven hồ. Chèo kayak. Đạp xe một vòng hồ.',
                      en: 'Pitch tents or check into the lakeside camp. Kayak or paddle. Cycle ' +
                          'the loop road.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Nướng và đốt lửa. Đây mới là mục đích thật của chuyến đi.',
                      en: 'BBQ and campfire. This is the actual point of the trip.' } }
          ]
        },
        {
          label: { vi: 'Ngày 2', en: 'Day 2' },
          title: { vi: 'Sáng chậm, rồi về', en: 'Slow morning, then home' },
          blocks: [
            { when: { vi: 'Buổi sáng', en: 'Morning' },
              what: { vi: 'Sương trên mặt nước là ánh sáng đẹp nhất của cả chuyến. Ăn sáng, thu ' +
                          'dọn, làm sạch bãi.',
                      en: 'Mist on the water is the best light of the trip. Breakfast, pack up, ' +
                          'clean the site.' } },
            { when: { vi: 'Buổi trưa', en: 'Midday' },
              what: { vi: 'Không bắt buộc: ghé đền Sóc (đền Gióng) trên đường ra.',
                      en: 'Optional: đền Sóc (đền Gióng) on the way out.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Về nhà.', en: 'Drive home.' } }
          ]
        }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Van share' }, value: '400–650k' },
        { label: { vi: 'Chỗ cắm hoặc thuê lều', en: 'Camping pitch or tent rental' },
          value: '100–300k' },
        { label: { vi: 'Đồ ăn và than', en: 'Food and charcoal' }, value: '150–300k' },
        { label: { vi: 'Thuê kayak', en: 'Kayak hire' }, value: '50–150k' },
        { label: { vi: 'Tổng, 2 ngày / 1 đêm', en: 'Total, 2 days / 1 night' },
          value: '0,6–1,2 tr' }
      ],
      note: { vi: 'Số áng chừng cho năm 2026, tính theo đầu người (VND). Chuyến rẻ nhất danh sách.',
              en: 'Rough 2026 figures per person in VND. The cheapest trip on the list.' }
    },
    {
      type: 'callout',
      title: { vi: 'Nếu cắm trại mới là mục đích chính',
               en: 'If the camping format is the point' },
      tone: 'info',
      body: [
        { vi: 'Có hai phiên bản tốt hơn của cùng ý tưởng đó. Hồ Đại Lải (Phú Thọ, cách Đồng Đò ' +
              'khoảng 10 km) có các bãi cắm ven hồ được quản lý, có tiện nghi thật và có trò chơi ' +
              'nước, lại ghép được với Tam Đảo thành một chuyến hai điểm dừng đúng nghĩa.',
          en: 'Two better versions of the same idea. Hồ Đại Lải (Phú Thọ, about 10 km from Đồng ' +
              'Đò) has managed lakeside campsites with actual facilities and water sports, and ' +
              'pairs with Tam Đảo for a proper two-base trip.' },
        { vi: 'Hoặc các hồ Chí Linh — hồ Bến Tắm và hồ Thanh Long — cho bạn đúng kiểu cắm trại ' +
              'thông và nước đó ở khoảng cách chưa tới một nửa, lại có di sản thế giới ngay bên ' +
              'cạnh. Nếu cả nhóm muốn cắm trại thì đó là phiên bản nên chọn.',
          en: 'Or the Chí Linh lakes — hồ Bến Tắm and hồ Thanh Long — which give you the same ' +
              'pine-and-water camping at under half the distance, with a World Heritage site ' +
              'next door. If the group wants to camp, that is the version to pick.' },
        { vi: 'Và chọn gì thì cũng vậy: đi từ thứ Hai tới thứ Tư. Giữa tuần đầu tháng 10 sẽ vắng ' +
              'hơn nhiều so với bất kỳ cuối tuần nào.',
          en: 'And whichever you choose: go Monday to Wednesday. Midweek in early October should ' +
              'be far quieter than any weekend.' }
      ]
    }
  ],

  reviews: {
    verdict: {
      vi: 'Đánh giá chia làm hai loại rõ rệt: "đi giữa tuần thì tuyệt" và "cuối tuần thì ' +
          'đừng". Gần như không có ý kiến nào ở giữa.',
      en: 'The reviews split cleanly into "midweek is lovely" and "do not go at the weekend". ' +
          'There is almost nothing in between.'
    },
    praise: [
      { vi: 'Hồ nước xanh, rừng thông bạt ngàn, không khí trong lành — mô tả này xuất hiện ' +
            'trong gần như mọi bài.',
        en: 'Blue water, wide pine forest, clean air — this description appears in nearly ' +
            'every write-up.' },
      { vi: 'Khoảng tháng 3 đến tháng 11 là đẹp nhất, và mùa thu se lạnh được gọi tên riêng ' +
            'là thời điểm tuyệt nhất để cắm trại qua đêm.',
        en: 'March to November is the recommended window, with cool autumn named specifically ' +
            'as the best time for an overnight camp.' },
      { vi: 'Chèo thuyền, kayak, đạp xe quanh hồ, đốt lửa trại, câu cá — thuê được hết tại chỗ.',
        en: 'Boating, kayaking, cycling the loop, campfires, fishing — all rentable on site.' }
    ],
    gripes: [
      { vi: 'Ngay các bài hướng dẫn nhiệt tình nhất cũng phải nhắc: mặc áo phao khi xuống ' +
            'nước, và khoá lều lại vì mất đồ là chuyện có thật.',
        en: 'Even the most enthusiastic guides feel the need to say: wear a life jacket on ' +
            'the water, and lock your tent because theft happens.' },
      { vi: 'Đây là chỗ đi chơi cuối tuần của Hà Nội. Cao điểm thì đông, ồn, rác và loa nhạc ' +
            'đua nhau.',
        en: 'It is Hà Nội\u2019s weekend spot. At peak times: crowded, noisy, littered, with ' +
            'competing sound systems.' },
      { vi: 'Tiện nghi mỏng. Mọi thứ phụ thuộc vào đồ bạn mang hoặc đơn vị bạn thuê.',
        en: 'Facilities are thin. Everything depends on what you bring or who you book.' },
      { vi: 'Không có bài nào tả được việc phải làm gì sau buổi chiều đầu tiên, vì thật ra ' +
            'là không có gì.',
        en: 'No write-up manages to describe what to do after the first afternoon, because ' +
            'there is not anything.' }
    ],
    sources: [
      { label: 'Mê Cắm Trại — detailed Hồ Đồng Đò camping review',
        url: 'https://sites.google.com/view/mecamtrai/dia-diem-cam-trai/cam-trai-ho-dong-do' }
    ]
  },

  photoQuery: 'ho-dong-do',
  heroPhoto: 0,
  excludePhotos: []
});
