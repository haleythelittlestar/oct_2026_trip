TRIP.registerLocation({
  id: 'ninh-binh',
  status: 'live',
  tieBreak: 4,

  name: 'Ninh Bình — Tràng An, Hang Múa, Cúc Phương',
  region: 'Ninh Bình',
  tagline: {
    vi: 'Cảnh 10/10. An toàn 3/10. Vì nó đang ngập.',
    en: 'Scenery 10/10. Safety 3/10. Because it is currently underwater.'
  },
  summary: {
    vi: 'Núi đá vôi nhô lên từ sông và ruộng lúa, mà chỉ cách khoảng 140 km. Đi thuyền nan ' +
        'trong Tràng An, leo bậc thang ngắm cảnh ở Hang Múa, Bái Đính, Tam Cốc, và vườn quốc ' +
        'gia Cúc Phương với trung tâm cứu hộ linh trưởng và những cây cổ thụ. Nó xếp hạng tư ' +
        'dù cảnh đẹp tuyệt đối, và lý do hoàn toàn nằm ở thời điểm.',
    en: 'Karst towers rising out of rivers and rice fields, at only about 140 km. Rowboat ' +
        'trips through Tràng An, the Hang Múa viewpoint stairway, Bái Đính, Tam Cốc, and ' +
        'Cúc Phương National Park with its primate rescue centre and ancient trees. It ranks ' +
        'fourth despite perfect scenery, and the reason is entirely about timing.'
  },

  theme: {
    gradient: ['#8bb3a6', '#4c7a76', '#23383d'],
    motif: 'karst'
  },

  badges: [
    { tone: 'good',   text: { vi: 'Cảnh đẹp nhất, không phải bàn',
                              en: 'Best scenery here, no debate' } },
    { tone: 'danger', text: { vi: 'Đang ngập tới 17/9/2026 — nhiều điểm đã tạm dừng',
                              en: 'Flooding as of 17 Sep 2026 — sites suspended' } },
    { tone: 'warn',   text: { vi: 'Cái làm nó đẹp cũng là cái làm nó ngập',
                              en: 'The thing that makes it beautiful is the thing that floods' } },
    { tone: 'info',   text: { vi: 'Ảnh lúa vàng bạn thấy trên mạng là tháng 5, không phải tháng 10',
                              en: 'Those golden rice photos you have seen are May, not October' } }
  ],

  facts: {
    distanceKm: 140,
    driveTime: '2–2,5 h',
    cost: { min: 1200000, max: 2000000, nights: 1 },
    activityLevel: 'Light',
    weatherRisk: 'High',
    bestLength: { vi: '2 ngày / 1 đêm', en: '2 days / 1 night' },
    vibe: { vi: 'Núi đá, sông, ruộng lúa', en: 'Karst, rivers, rice fields' }
  },

  scores: {
    scenery: 10,
    proximity: 7,
    access: 8,
    safety: 3,
    activities: 8,
    local: 6,
    value: 7
  },

  sections: [
    {
      type: 'callout',
      title: { vi: 'Kiểm tra cái này trước mọi thứ khác', en: 'Check this before anything else' },
      tone: 'danger',
      body: [
        { vi: 'Ninh Bình đang ngập lúc những ghi chú này được viết. Tới ngày 17/9/2026, mực ' +
              'nước sông Hoàng Long đạt đỉnh 4,42 m tại Bến Đế — trên báo động 3 là 0,42 m — ' +
              'hàng nghìn nhà bị ngập, và Sở Du lịch tỉnh đã tạm dừng hoặc điều chỉnh hoạt ' +
              'động ở một số điểm.',
          en: 'Ninh Bình was flooding when these notes were written. As of 17 September 2026 ' +
              'the Hoàng Long river peaked at 4.42 m at Bến Đế — 0.42 m above alarm level 3 — ' +
              'thousands of homes were under water, and the provincial tourism department ' +
              'suspended or adjusted operations at several sites.' },
        { vi: 'Toàn bộ cái hay của vùng này nằm ở sông thấp và ruộng lúa, mà đó đúng là thứ dễ ' +
              'ngập nhất. Hai tuần có thể là đủ để nước rút. Hãy kiểm tra tình trạng từng điểm ' +
              'với Sở Du lịch Ninh Bình trước khi đặt bất cứ thứ gì.',
          en: 'The whole appeal of the area is low-lying rivers and rice fields, which is ' +
              'exactly what floods. Two weeks may well be enough for it to clear. Verify the ' +
              'site-by-site status with the Ninh Bình tourism department before booking ' +
              'anything at all.' }
      ]
    },
    {
      type: 'prose',
      title: { vi: 'Vì sao vẫn nên xem qua', en: 'Why it still deserves a look' },
      body: [
        { vi: 'Bỏ chuyện ngập sang một bên thì đây là cảnh quan đẹp nhất trong tầm đi dễ từ ' +
              'Hải Phòng, hơn hẳn các nơi khác. Nó được 10 điểm cảnh quan, và trong một năm ' +
              'bình thường thì đầu tháng 10 là thời điểm tốt để đi.',
          en: 'Set the flooding aside and this is the best landscape within easy reach of Hải ' +
              'Phòng by a clear margin. It scores a perfect 10 on scenery, and in a normal ' +
              'year early October is a fine time to go.' },
        { vi: 'Lý do nó xếp thứ tư thay vì thứ nhất là điểm an toàn 3. Đó là lúc mô hình chấm ' +
              'điểm nói thật: điểm 10 ở tiêu chí nặng nhất cũng không cứu được một nơi mà bạn ' +
              'có thể không đi lại được.',
          en: 'The reason it lands fourth rather than first is a safety score of 3. That is ' +
              'the model being honest: a 10 on the heaviest-weighted criterion cannot rescue a ' +
              'place you might not be able to walk around.' }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '2 ngày / 1 đêm, nếu thời tiết cho phép',
               en: '2 days / 1 night, if conditions allow' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Thuyền và bậc thang', en: 'Boats and the stairway' },
          blocks: [
            { when: '07:30',
              what: { vi: 'Rời Hải Phòng.', en: 'Leave Hải Phòng.' } },
            { when: { vi: 'Cuối buổi sáng', en: 'Late morning' },
              what: { vi: 'Tràng An — tuyến thuyền nan qua các hang và giữa những khối núi đá. ' +
                          'Hai đến ba tiếng trên nước.',
                      en: 'Tràng An — the rowboat circuit through caves and between karst ' +
                          'towers. Two to three hours on the water.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Hang Múa — khoảng 500 bậc lên điểm ngắm Tam Cốc. Đúng bức ảnh kinh ' +
                          'điển của vùng này.',
                      en: 'Hang Múa — about 500 steps to the viewpoint over Tam Cốc. The ' +
                          'classic photograph of the region.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Homestay khu Tam Cốc. Thịt dê và cơm cháy.',
                      en: 'Homestay in the Tam Cốc area. Goat and cơm cháy.' } }
          ]
        },
        {
          label: { vi: 'Ngày 2', en: 'Day 2' },
          title: { vi: 'Rừng già', en: 'Old forest' },
          blocks: [
            { when: { vi: 'Buổi sáng', en: 'Morning' },
              what: { vi: 'Vườn quốc gia Cúc Phương — trung tâm cứu hộ linh trưởng, cây nghìn ' +
                          'năm, một tuyến đi bộ trong rừng dễ đi.',
                      en: 'Cúc Phương National Park — the primate rescue centre, the ' +
                          'thousand-year trees, an easy forest trail.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Về nhà.', en: 'Drive home.' } }
          ]
        }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Những chỗ khác gần đó', en: 'Other things nearby' },
      items: [
        { vi: 'Bái Đính — khu chùa hiện đại rất lớn; ấn tượng về quy mô, nhưng gây tranh luận ' +
              'về chất.',
          en: 'Bái Đính — vast modern temple complex; impressive in scale, divisive in character.' },
        { vi: 'Khu bảo tồn Vân Long — đi thuyền yên tĩnh hơn, và có thể gặp voọc trên vách đá ' +
              'nếu may.',
          en: 'Vân Long nature reserve — quieter boat trips, and langurs on the cliffs if you ' +
              'are lucky.' },
        { vi: 'Chính Tam Cốc, phiên bản nhẹ nhàng hơn của tuyến Tràng An.',
          en: 'Tam Cốc itself, which is the gentler sibling of the Tràng An circuit.' }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Van share' }, value: '350–550k' },
        { label: { vi: 'Homestay', en: 'Homestay' }, value: '250–500k' },
        { label: { vi: 'Thuyền Tràng An', en: 'Tràng An boat' }, value: '~250k' },
        { label: { vi: 'Vé Hang Múa', en: 'Hang Múa entry' }, value: '~100k' },
        { label: { vi: 'Vé Cúc Phương', en: 'Cúc Phương entry' }, value: '~60k' },
        { label: { vi: 'Tổng, 2 ngày / 1 đêm', en: 'Total, 2 days / 1 night' },
          value: '1,2–2,0 tr' }
      ],
      note: { vi: 'Số áng chừng cho năm 2026, tính theo đầu người (VND).',
              en: 'Rough 2026 figures per person in VND.' }
    },
    {
      type: 'callout',
      title: { vi: 'Đặt kỳ vọng cho đúng', en: 'Expectations, set properly' },
      tone: 'info',
      body: [
        { vi: 'Những bức ảnh lúa chín vàng nổi tiếng của Tam Cốc được chụp vào cuối tháng 5 ' +
              'và đầu tháng 6, không phải tháng 10. Đừng để cả nhóm kỳ vọng theo mấy ảnh đó.',
          en: 'The famous golden-rice photographs of Tam Cốc are taken in late May and early ' +
              'June, not October. Do not set your expectations on those images.' },
        { vi: 'Tháng 10 thì bạn sẽ được ruộng xanh, nước cao và ánh sáng rất đẹp — vẫn đẹp, ' +
              'chỉ là khác với ảnh bưu thiếp.',
          en: 'In October you would get green fields, high water and dramatic light — still ' +
              'beautiful, just different from what is on the postcards.' }
      ]
    },
    {
      type: 'callout',
      title: { vi: 'Lưu ý an toàn', en: 'Safety notes' },
      tone: 'warn',
      body: [
        { vi: 'Rủi ro ngập là chuyện lớn nhất. Tránh lưu vực sông Hoàng Long và sông Đáy cho ' +
              'tới khi tình hình rõ ràng đã ổn.',
          en: 'Flood risk is the headline. Avoid the Hoàng Long and Đáy river basins until the ' +
              'situation has clearly resolved.' },
        { vi: 'Bậc thang Hang Múa dốc, không đều và trơn khi ướt. Không phù hợp với ai chân ' +
              'không vững.',
          en: 'Hang Múa\u2019s steps are steep, uneven and slippery when wet. Not for anyone ' +
              'unsteady.' },
        { vi: 'Thuyền nan: mặc áo phao, và thống nhất trước chuyện tiền bồi dưỡng với người lái ' +
              'thuyền để tránh câu chuyện khó xử giữa sông.',
          en: 'Rowboats: life jackets on, and agree the tip expectation with the boat operator ' +
              'up front to avoid an awkward conversation mid-river.' }
      ]
    }
  ],

  reviews: {
    verdict: {
      vi: 'Cảnh thì vượt kỳ vọng, còn phần tổ chức thì không. Gần như mọi lời phàn nàn ' +
          'đều là biến thể của "đáng lẽ nên lên kế hoạch kỹ hơn".',
      en: 'The scenery over-delivers and the logistics under-deliver. Nearly every ' +
          'complaint is a variation on "we should have planned it better".'
    },
    praise: [
      { vi: 'Chuyến thuyền Tràng An liên tục được gọi là một trong những trải nghiệm hay ' +
            'nhất cả chuyến Việt Nam, không chỉ của Ninh Bình.',
        en: 'The Tràng An boat ride is repeatedly named one of the best experiences of an ' +
            'entire Vietnam trip, not just of Ninh Bình.' },
      { vi: 'Được cùng kiểu núi đá vôi như Hạ Long nhưng dọc theo sông và ruộng lúa, không ' +
            'cần ngủ du thuyền, không cảnh chen chúc ở cảng.',
        en: 'You get the same karst as Hạ Long but along rivers and rice paddies, with no ' +
            'overnight cruise and no harbour crowds.' },
      { vi: 'Đi nhiều tuyến hang khác nhau nên thuyền tản ra — có lúc cảm giác như chỉ có mình.',
        en: 'The multiple cave routes spread the boats out, so there are stretches where ' +
            'you seem to have it to yourself.' }
    ],
    gripes: [
      { vi: 'Không phải thiên đường vắng vẻ như trong ảnh. Bến thuyền đông, và ngồi thuyền ' +
            'lâu dưới nắng thì mệt.',
        en: 'It is not the empty paradise the photographs suggest. The pier gets busy, and ' +
            'the ride feels long in the heat.' },
      { vi: 'Người lái thuyền thường mong có tiền bồi dưỡng. Thống nhất trước cho khỏi ngại.',
        en: 'Boat operators generally expect a tip. Agree it beforehand and skip the awkwardness.' },
      { vi: 'Các điểm cách nhau xa hơn tưởng, nên nhiều người kể là cứ chạy vội giữa những ' +
            'thứ na ná nhau thay vì thực sự thưởng thức.',
        en: 'The attractions are further apart than they look, so people report rushing ' +
            'between similar things instead of enjoying any of them.' },
      { vi: 'Có người thấy phần xây dựng ở Hang Múa hơi "làm cho có" và kém tự nhiên, dù ' +
            'tầm nhìn thì vẫn đẹp.',
        en: 'Some find the built structures at Hang Múa a little tacky and inauthentic, ' +
            'even while rating the view.' },
      { vi: 'Bị phàn nàn khá nhiều về mấy người trông xe đòi tiền kiểu ép.',
        en: 'Pushy parking attendants are a recurring irritation.' }
    ],
    sources: [
      { label: 'Kampa Tour — 10 tips to avoid the crowds at Tràng An',
        url: 'https://kampatour.com/trang-an-vietnam' },
      { label: 'The Manduls — what is worth it and what to skip',
        url: 'https://themanduls.com/blog/ninh-binh/' },
      { label: 'Jungle Boss — honest review of Ninh Bình',
        url: 'https://junglebosstours.com/explorer/tourism-blog/ninh-binh' },
      { label: 'My Favourite Escapes — is Ninh Bình worth visiting?',
        url: 'https://myfavouriteescapes.com/is-ninh-binh-worth-visiting/' }
    ]
  },

  photoQuery: 'ninh-binh',
  heroPhoto: 0,
  excludePhotos: []
});
