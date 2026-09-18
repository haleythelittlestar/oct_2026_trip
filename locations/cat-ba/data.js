TRIP.registerLocation({
  id: 'cat-ba',
  status: 'live',
  tieBreak: 1,

  name: 'Cát Bà + Vịnh Lan Hạ',
  region: 'Hải Phòng',
  tagline: {
    vi: 'Người ta bay nửa vòng trái đất để tới đây. Mình thì đi 65 km.',
    en: 'People fly across the planet for this. We drive 65 km.'
  },
  summary: {
    vi: 'Đảo của chính Hải Phòng mình, và là lý do khách Tây bay từ châu lục khác sang. ' +
        'Núi đá vôi, vũng nước kín, một vườn quốc gia có rừng thật chứ không phải công viên, ' +
        'vài bãi biển nhỏ, và hải sản ngon top vùng duyên hải. Cùng hệ thống vịnh được UNESCO ' +
        'công nhận với Hạ Long — chỉ là ít người biết hơn, và gần nhà mình hơn nhiều.',
    en: 'Hải Phòng\u2019s own island, and the reason people get on long-haul flights. Karst ' +
        'towers, hidden lagoons, a national park with actual forest rather than a lawn, a few ' +
        'small beaches, and some of the best seafood on this coast. Same UNESCO-listed bay ' +
        'system as Hạ Long — just less famous, and a great deal closer to home.'
  },

  theme: {
    gradient: ['#7fb3bd', '#4a7d8c', '#22414f'],
    motif: 'karst'
  },

  badges: [
    { tone: 'good', text: { vi: 'Gần nhất trong số những chỗ đáng gọi là "có cảnh"',
                            en: 'Closest thing here that counts as actual scenery' } },
    { tone: 'good', text: { vi: 'Nhiều thứ để làm nhất mà không phải tập gym trước',
                            en: 'Most to do without training for it first' } },
    { tone: 'warn', text: { vi: 'Tháng 10 vẫn có thể cấm biển. Chuyện này có thật.',
                            en: 'October sea bans are a real thing. Not hypothetical.' } },
    { tone: 'info', text: { vi: 'Thị trấn thì đông và hơi "du lịch"',
                            en: 'The town itself is busy and a bit touristy' } }
  ],

  facts: {
    distanceKm: 65,
    driveTime: '1,5–2 h',
    cost: { min: 1800000, max: 3000000, nights: 2 },
    activityLevel: 'Medium',
    weatherRisk: 'High',
    bestLength: { vi: '3 ngày / 2 đêm', en: '3 days / 2 nights' },
    vibe: { vi: 'Đảo, vịnh, hải sản', en: 'Island, bay, seafood' }
  },

  scores: {
    scenery: 9,
    proximity: 9,
    access: 9,
    safety: 5,
    activities: 9,
    local: 5,
    value: 6
  },

  sections: [
    {
      type: 'prose',
      title: { vi: 'Vì sao chọn nơi này', en: 'Why this one' },
      body: [
        { vi: 'Thời gian di chuyển ngắn nhất trong số các điểm có cảnh thật, nhiều hoạt ' +
              'động ngoài trời nhẹ nhất trong cùng một chỗ, và dịch vụ đầy đủ — nên không ' +
              'có việc gì phải tự xoay khi đã tới.',
          en: 'Shortest travel time of any genuine landscape destination on the list, the ' +
              'widest range of light outdoor activities in one place, and fully serviced — ' +
              'so nothing depends on improvising once you arrive.' },
        { vi: 'Nó cũng đủ gần để ai cũng về được mà vẫn cảm thấy mình đã đi đâu đó. Đổi lại, ' +
              'thị trấn Cát Bà đã phát triển và đông: nếu điều cả nhóm thật sự muốn là nếp ' +
              'sống làng quê chưa bị du lịch hoá thì đây là điểm yếu duy nhất của nó, và ' +
              'Bình Liêu mới là câu trả lời.',
          en: 'It is also local enough that everyone can go home afterwards and still say ' +
              'they went somewhere. The trade-off is that Cát Bà town is developed and busy: ' +
              'if what you actually want is untouched village life, this is the ' +
              'weakest option on that one axis, and Bình Liêu is the answer instead.' }
      ]
    },
    {
      type: 'itinerary',
      title: { vi: '3 ngày / 2 đêm', en: '3 days / 2 nights' },
      days: [
        {
          label: { vi: 'Ngày 1', en: 'Day 1' },
          title: { vi: 'Qua đảo, rồi leo lên cao', en: 'Cross over, then get up high' },
          blocks: [
            { when: '07:30',
              what: { vi: 'Rời Hải Phòng. Qua cầu vượt biển Tân Vũ – Lạch Huyện.',
                      en: 'Leave Hải Phòng. Cross the Tân Vũ – Lạch Huyện sea bridge.' } },
            { when: { vi: 'Giữa buổi sáng', en: 'Mid-morning' },
              what: { vi: 'Qua phà, nhận phòng ở thị trấn Cát Bà.',
                      en: 'Ferry across, check in at Cát Bà town.' } },
            { when: { vi: 'Chiều', en: 'Afternoon' },
              what: { vi: 'Vườn quốc gia Cát Bà — tuyến Ngự Lâm / Kim Giao. Khoảng 1–1,5 h ' +
                          'leo qua rừng thật để lên điểm ngắm cảnh.',
                      en: 'Cát Bà National Park — the Ngự Lâm / Kim Giao trail. About 1–1.5 h ' +
                          'up through real forest to a viewpoint.' } },
            { when: { vi: 'Lúc hoàng hôn', en: 'Sunset' },
              what: { vi: 'Pháo đài Thần Công — góc nhìn toàn cảnh đẹp nhất đảo.',
                      en: 'Cannon Fort (pháo đài Thần Công) — the best panorama on the island.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Hải sản ở khu bến cảng.', en: 'Seafood on the harbour front.' } }
          ]
        },
        {
          label: { vi: 'Ngày 2', en: 'Day 2' },
          title: { vi: 'Một ngày trên vịnh — đây là phần hay nhất',
                   en: 'The day on the water — this is the highlight' },
          blocks: [
            { when: { vi: 'Cả ngày', en: 'Full day' },
              what: { vi: 'Tour thuyền vịnh Lan Hạ: chèo kayak qua hang Luồn, hang Sáng, ' +
                          'hang Tối, ghé bè cá, dừng tắm ở một vũng kín, ăn trưa nấu trên thuyền.',
                      en: 'Lan Hạ Bay boat trip: kayaking through Luồn, Sáng and Tối caves, a ' +
                          'floating fish farm, a lagoon swim stop, lunch cooked on board.' } },
            { when: { vi: 'Chiều muộn', en: 'Late afternoon' },
              what: { vi: 'Bãi Cát Cò 1, 2 và 3, nối nhau bằng đường đi men vách đá.',
                      en: 'Cát Cò 1, 2 and 3 beaches, linked by a cliff walkway.' } },
            { when: { vi: 'Buổi tối', en: 'Evening' },
              what: { vi: 'Chợ đêm, mực nướng, bia.', en: 'Night market, grilled squid, beers.' } }
          ]
        },
        {
          label: { vi: 'Ngày 3', en: 'Day 3' },
          title: { vi: 'Một chỗ yên tĩnh, rồi về', en: 'Something quiet, then home' },
          blocks: [
            { when: { vi: 'Buổi sáng', en: 'Morning' },
              what: { vi: 'Đạp xe hoặc đi bộ vào làng Việt Hải — một làng nằm lọt trong thung ' +
                          'lũng giữa vườn quốc gia, và là thứ đậm chất bản địa nhất trên đảo. ' +
                          'Hoặc một buổi sáng chậm ở bãi Tùng Thu.',
                      en: 'Cycle or walk through Việt Hải village — an isolated valley village ' +
                          'inside the park, and the most genuinely local thing on the island. ' +
                          'Or a slow morning at Bãi Tùng Thu.' } },
            { when: { vi: 'Sau bữa trưa', en: 'After lunch' },
              what: { vi: 'Phà về. Tới nhà vào cuối buổi chiều.',
                      en: 'Ferry back. Home by late afternoon.' } }
          ]
        }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Cách đi', en: 'Getting there' },
      intro: { vi: 'Ba cách qua đảo, phù hợp với quy mô nhóm khác nhau.',
               en: 'Three ways across, and they suit different group sizes.' },
      items: [
        { term: { vi: 'Tốt nhất cho nhóm', en: 'Best for a group' },
          text: { vi: 'Thuê xe 16 chỗ có tài xế, qua cầu vượt biển Tân Vũ – Lạch Huyện, rồi ' +
                      'phà Đồng Bài → Cái Viềng. Khoảng 1,5–2 h tính từ cửa nhà, và vẫn giữ ' +
                      'được xe trên đảo.',
                  en: 'Rent a 16-seat van with driver, cross the Tân Vũ – Lạch Huyện sea ' +
                      'bridge, then the Đồng Bài → Cái Viềng ferry. Roughly 1.5–2 h door to ' +
                      'door, and you keep the vehicle on the island.' } },
        { term: { vi: 'Nhanh nhất', en: 'Fastest' },
          text: { vi: 'Tàu cao tốc từ bến Bính đi thẳng ra thị trấn Cát Bà, khoảng 1 h, tầm ' +
                      '250k/người. Vui, nhưng mất xe — sang bên đó phải thuê xe máy hoặc xe ' +
                      'điện.',
                  en: 'Speedboat from Bến Bính straight to Cát Bà town, about 1 h, around ' +
                      '250k per person. Fun, but you lose the vehicle — you would hire ' +
                      'motorbikes or an electric shuttle on the other side.' } },
        { term: { vi: 'Đẹp nhất', en: 'Most scenic' },
          text: { vi: 'Cáp treo Cát Hải – Phù Long vượt qua lạch. Nên đi một chiều chỉ để ngắm.',
                  en: 'The Cát Hải – Phù Long cable car across the channel. Worth doing ' +
                      'one-way just for the view.' } },
        { term: { vi: 'Bản ngắn hơn', en: 'Shorter version' },
          text: { vi: 'Nếu chỉ 2 ngày 1 đêm thì bỏ ngày đầu: tới, pháo đài Thần Công và một ' +
                      'bãi biển, ăn tối, rồi trọn ngày trên thuyền Lan Hạ và về.',
                  en: 'For 2 days / 1 night, drop day one: arrive, Cannon Fort and a beach, ' +
                      'dinner, then the full Lan Hạ boat day and home.' } }
      ]
    },
    {
      type: 'list',
      title: { vi: 'Ở & ăn', en: 'Stay & eat' },
      items: [
        { term: { vi: 'Ở', en: 'Stay' },
          text: { vi: 'Thị trấn Cát Bà có đủ loại — hostel từ khoảng 250k một giường, khách ' +
                      'sạn tử tế 500–900k một phòng, loại hướng biển thì cao hơn. Với nhóm, ' +
                      'nên đặt 3–4 phòng cùng một tầng của khách sạn nhỏ hoặc homestay. Đặt ' +
                      'trước: đầu tháng 10 là mùa thấp điểm nhưng khách vẫn có.',
                  en: 'Cát Bà town has the full range — hostels from about 250k a bed, decent ' +
                      'hotels 500–900k a room, sea-view places above that. For a group, book ' +
                      '3–4 rooms on one floor of a small hotel or homestay. Book ahead: early ' +
                      'October is shoulder season but demand is still real.' } },
        { term: { vi: 'Ăn', en: 'Eat' },
          text: { vi: 'Hải sản khu bến — gọi theo cân và chốt giá trước khi nấu. Bánh đa cua ' +
                      'và bún tôm mang từ Hải Phòng sang. Sam là món đặc sản nếu ai đó muốn thử.',
                  en: 'Harbour-front seafood — order by weight and confirm the price before it ' +
                      'is cooked. Bánh đa cua and bún tôm come over from Hải Phòng. Sam ' +
                      '(horseshoe crab) is the local speciality if anyone is feeling adventurous.' } }
      ]
    },
    {
      type: 'table',
      title: { vi: 'Chi phí', en: 'What it costs' },
      rows: [
        { label: { vi: 'Chia tiền xe', en: 'Van share' }, value: '400–600k' },
        { label: { vi: 'Phòng, mỗi đêm', en: 'Rooms, per night' }, value: '250–450k' },
        { label: { vi: 'Thuyền Lan Hạ cả ngày', en: 'Lan Hạ day boat' }, value: '400–800k' },
        { label: { vi: 'Vé vườn quốc gia', en: 'National park entry' }, value: '~80k' },
        { label: { vi: 'Ăn, mỗi ngày', en: 'Food, per day' }, value: '300–500k' },
        { label: { vi: 'Tổng, 3 ngày / 2 đêm', en: 'Total, 3 days / 2 nights' },
          value: '1,8–3,0 tr' }
      ],
      note: { vi: 'Số áng chừng cho năm 2026, tính theo đầu người (VND). Hãy hỏi lại giá ' +
                  'trước khi đặt.',
              en: 'Rough 2026 figures per person in VND. Re-quote everything before booking.' }
    },
    {
      type: 'callout',
      title: { vi: 'Lưu ý an toàn', en: 'Safety notes' },
      tone: 'warn',
      body: [
        { vi: 'Mặc áo phao khi chèo kayak, lần nào cũng vậy. Vịnh trông êm nhưng nước sâu.',
          en: 'Wear the life jacket on the kayak, every time. The bay looks calm and is deep.' },
        { vi: 'Đường men vách đá giữa các bãi Cát Cò rất trơn sau mưa.',
          en: 'The cliff walkways between the Cát Cò beaches get slippery after rain.' },
        { vi: 'Đường trên đảo nhiều khúc cua khuất và có dê thả rông. Nếu ai thuê xe máy: ' +
              'đội mũ bảo hiểm, và chỉ đi ban ngày.',
          en: 'The island road has blind corners and free-roaming goats. If anyone rents a ' +
              'motorbike: helmets, and daylight only.' },
        { vi: 'Rủi ro thật ở đây là thời tiết, không phải các hoạt động. Tháng 8 năm 2026, ' +
              'bão số 4 khiến Hải Phòng phải cấm biển, dừng cả phà lẫn cáp treo, và hơn ' +
              '1.700 khách bị kẹt trên đảo. Đừng đặt gì không hoàn tiền, và luôn có phương ' +
              'án dự phòng trong đất liền.',
          en: 'The real risk here is weather, not the activities. In August 2026 typhoon ' +
              'no. 4 forced Hải Phòng to ban sea traffic, suspended both the ferry and the ' +
              'cable car, and left over 1,700 tourists stranded on the island. Do not book ' +
              'anything non-refundable, and keep an inland backup ready.' }
      ]
    },
    {
      type: 'callout',
      title: { vi: 'Điểm trừ', en: 'The catch' },
      tone: 'info',
      body: [
        { vi: 'Thị trấn Cát Bà đã phát triển và du lịch hoá. Cảnh thì đẳng cấp thế giới, ' +
              'nhưng phải ra tới làng Việt Hải hoặc lên thuyền mới thấy được nếp sống yên ả.',
          en: 'Cát Bà town is developed and touristy. The scenery is world-class, but you will ' +
              'not find much quiet local life until you get out to Việt Hải village or onto ' +
              'the water.' },
        { vi: 'Và nó chịu rủi ro thời tiết cao nhất trong danh sách, cùng với Quan Lạn. Lệnh ' +
              'cấm biển không chỉ huỷ chuyến thuyền — nó có thể giữ bạn lại trên đảo, hoặc ' +
              'không cho bạn ra đảo.',
          en: 'And it carries the highest weather exposure on the shortlist alongside Quan ' +
              'Lạn. A sea ban does not just cancel the boat trip — it can strand you on the ' +
              'island, or stop you reaching it at all.' }
      ]
    }
  ],

  /* --- what published reviews say ----------------------------------------
     A synthesis of travel journalism and traveller write-ups, not scraped
     ratings. There are deliberately no star scores here: Google Places reviews
     cannot be cached outside a user session under their terms, TripAdvisor's
     content is partner-gated, and inventing numbers would be worse than having
     none. Sources are listed so anyone can check the reading. */
  reviews: {
    verdict: {
      vi: 'Gần như ai cũng khuyên đi, và hầu hết lời phàn nàn là về cái thị trấn, ' +
          'không phải về cái vịnh.',
      en: 'Near-unanimously recommended, and almost every complaint is about the ' +
          'town rather than the bay.'
    },
    praise: [
      { vi: 'Vịnh Lan Hạ được nhắc lại nhiều lần là sạch hơn, vắng hơn và rẻ hơn Hạ Long, ' +
            'với cùng kiểu cảnh núi đá vôi.',
        en: 'Lan Hạ comes up again and again as cleaner, quieter and cheaper than Hạ Long, ' +
            'with the same karst landscape.' },
      { vi: 'Ngày đi thuyền gần như luôn được gọi là phần hay nhất của cả chuyến.',
        en: 'The boat day is almost always named the highlight of the whole trip.' },
      { vi: 'Đi giữa tuần ngoài mùa cao điểm thì có thể chỉ chia cả vịnh với vài chiếc thuyền.',
        en: 'Midweek in shoulder season, reports describe sharing the entire bay with a ' +
            'handful of boats.' },
      { vi: 'Rừng trong vườn quốc gia và chuyện gặp voọc được nhắc tới thường xuyên.',
        en: 'The national park forest and the chance of spotting langur come up often.' }
    ],
    gripes: [
      { vi: 'Trung tâm thị trấn đông vào cao điểm hè. Nhiều người khuyên ở hơi xa trung tâm ' +
            'hoặc đi ngoài mùa.',
        en: 'The town centre gets crowded at peak summer. The common advice is to stay ' +
            'slightly outside it, or travel off-season.' },
      { vi: 'Đánh giá về chuyện "có xứng tiền không" thì trái chiều — tuỳ bạn so với cái gì.',
        en: 'Reviews openly conflict on value for money, depending what you compare it to.' },
      { vi: 'Không dành cho ai muốn du thuyền sang và lịch trình được sắp sẵn hoàn hảo.',
        en: 'Not for anyone wanting a luxury cruise and a perfectly curated itinerary.' },
      { vi: 'Lặn ống thở và lặn bình thì bị coi là "có thì vui", không phải lý do để đi.',
        en: 'Snorkelling and diving are described as a "nice extra" rather than a reason ' +
            'to come.' }
    ],
    sources: [
      { label: 'Uprooted Traveler — Lan Ha Bay vs Ha Long',
        url: 'https://uprootedtraveler.com/lan-ha-bay/' },
      { label: 'Origin Vietnam — Is Cát Bà worth visiting?',
        url: 'https://www.originvietnam.com/is-cat-ba-island-worth-visiting/' },
      { label: 'Take Your Backpack — Cát Bà beach guide',
        url: 'https://www.takeyourbackpack.com/backpacking-in-vietnam/visit-cat-ba-island-beach/' },
      { label: 'Jungle Boss — Cát Bà as a Hạ Long alternative',
        url: 'https://junglebosstours.com/explorer/tourism-blog/cat-ba-island-ha-long-bay-alternative' },
      { label: 'Quang Thang Cát Bà — local review',
        url: 'https://quangthangcatba.com/cat-ba-review' }
    ]
  },

  photoQuery: 'cat-ba',
  heroPhoto: 0,
  excludePhotos: []
});
