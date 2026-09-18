/* i18n.js — two languages, Vietnamese by default.

   The audience is the group in Hải Phòng, so Vietnamese leads. English stays
   available behind a toggle so the person maintaining this can proof-read.

   THE CONTRACT
   ------------
   A translatable value in a data file is either
     - a plain string, when both languages use it unchanged (place names,
       "1.8–3.0 tr", "65 km"), or
     - { vi: '…', en: '…' }

   T(value) resolves it. Arrays are mapped element-wise, so a paragraph list
   stays aligned 1:1 across languages — which makes a missing translation
   obvious instead of silently shifting the text.

   Anything the *site itself* says (button labels, table headers, aria text)
   lives in STRINGS below rather than in the data files. */
(function (TRIP) {
  'use strict';

  var LANGS = ['vi', 'en'];
  var DEFAULT_LANG = 'vi';
  var STORE_KEY = 'trip.lang';

  var current = DEFAULT_LANG;

  /* ---- UI chrome -------------------------------------------------------
     Tone: the audience is a group of friends in their twenties, so the voice
     is dry and a bit cheeky. Two places stay completely straight, on purpose:
     anything inside a warn/danger callout, and aria-label text. A joke in a
     drowning warning is a bad joke, and a screen-reader label is not a stage. */
  var STRINGS = {
    brandByline:    { vi: 'Haley the Little Star · Ban Du Lịch',
                      en: 'Haley the Little Star · Travel Desk' },
    skipToContent:  { vi: 'Bỏ qua, tới nội dung',        en: 'Skip to content' },
    allOptions:     { vi: 'Xem hết',                     en: 'All options' },
    compareAll:     { vi: 'Bắt đầu tranh luận',          en: 'Start the argument' },
    loading:        { vi: 'Đang tải, bình tĩnh…',        en: 'Loading, hold on…' },
    optionsCount:   { vi: 'chỗ · đã xếp hạng sẵn để đỡ phải cãi nhau',
                      en: 'places · pre-ranked so you argue less' },

    rank:           { vi: 'Hạng',                        en: 'Rank' },
    rankOf:         { vi: 'Hạng %1 / %2',                en: 'Rank %1 of %2' },
    seeDetail:      { vi: 'Xem thử',                     en: 'Take a look' },
    outOf10:        { vi: 'trên 10',                     en: 'out of 10' },
    weightWord:     { vi: 'trọng số',                    en: 'weight' },
    scoreAria:      { vi: '%1, hạng %2, %3 trên 10 điểm',
                      en: '%1, ranked %2, score %3 out of 10' },

    /* quick facts */
    factFrom:       { vi: 'Từ Hải Phòng',                en: 'From Hải Phòng' },
    factDrive:      { vi: 'Di chuyển',                   en: 'Drive' },
    factPerPerson:  { vi: 'Mỗi người',                   en: 'Per person' },
    factEffort:     { vi: 'Mức độ',                      en: 'Effort' },
    factWeather:    { vi: 'Rủi ro thời tiết',            en: 'Weather risk' },
    factBestAs:     { vi: 'Nên đi',                      en: 'Best as' },
    nights:         { vi: 'đêm',                         en: 'N' },
    perPersonShort: { vi: '/người',                      en: '/person' },
    driveShort:     { vi: 'di chuyển',                   en: 'drive' },

    /* enumerated values that arrive from data */
    Low:            { vi: 'Thấp',                        en: 'Low' },
    Medium:         { vi: 'Trung bình',                  en: 'Medium' },
    High:           { vi: 'Cao',                         en: 'High' },
    Light:          { vi: 'Nhẹ',                         en: 'Light' },
    Hard:           { vi: 'Nặng',                        en: 'Hard' },

    /* score breakdown */
    whyScore:       { vi: 'Vì sao được %1 điểm',         en: 'Why it scores %1' },
    scoreNote:      { vi: 'Toàn bộ số này là ý kiến cá nhân, không phải khoa học. Tổng ' +
                          'điểm là trung bình có trọng số, nên điểm thấp ở tiêu chí quan ' +
                          'trọng sẽ bị trừ nặng hơn. Không đồng ý thì kéo thanh trượt ở ' +
                          'trang chủ, đừng kéo nhau.',
                      en: 'All of these numbers are opinion, not science. The total is a ' +
                          'weighted average, so a low score on a criterion that matters costs ' +
                          'more. Disagree? Drag the sliders on the home page instead of ' +
                          'dragging each other.' },
    howWeights:     { vi: 'Ai quyết mấy con số này',     en: 'Who decided these numbers' },

    /* reviews — synthesised from published sources, never invented */
    reviewsTitle:   { vi: 'Người ta nói gì về nơi này',  en: 'What people say' },
    reviewsPraise:  { vi: 'Được khen',                   en: 'Consistently praised' },
    reviewsGripes:  { vi: 'Bị phàn nàn',                 en: 'Recurring complaints' },
    reviewsSources: { vi: 'Đọc ở đâu ra (%1 nguồn)',     en: 'Where this came from (%1 sources)' },
    reviewsNote:    { vi: 'Đây là phần tổng hợp từ các bài viết du lịch và ghi chép của người ' +
                          'đã đi, không phải điểm đánh giá lấy về từ Google hay TripAdvisor. ' +
                          'Không có số sao ở đây vì bịa ra số sao thì còn tệ hơn là không có. ' +
                          'Nguồn ở dưới, ai muốn kiểm tra thì bấm vào.',
                      en: 'This is a synthesis of travel writing and traveller accounts, not ' +
                          'ratings pulled from Google or TripAdvisor. There are no star scores ' +
                          'because inventing them would be worse than having none. Sources are ' +
                          'below if you want to check the reading.' },

    /* sections */
    detailHeading:  { vi: 'Chi tiết',                    en: 'Detail' },
    photos:         { vi: 'Ảnh (không phải ảnh của mình)',
                      en: 'Photos (not ours)' },
    usefulLinks:    { vi: 'Link có ích',                 en: 'Useful links' },
    more:           { vi: 'Xem thêm',                    en: 'More' },

    /* gallery */
    enlarge:        { vi: 'Xem ảnh lớn: %1',             en: 'Enlarge: %1' },
    closePhoto:     { vi: 'Đóng ảnh',                    en: 'Close photo' },
    photoOf:        { vi: 'ảnh %1',                      en: 'photograph %1' },
    source:         { vi: 'nguồn',                       en: 'source' },
    ownPhoto:       { vi: 'Ảnh của nhóm',                en: 'Our own photo' },
    photoCredits:   { vi: 'Nguồn ảnh (%1)',              en: 'Photo credits (%1)' },
    galleryNote:    { vi: 'Ảnh lấy từ Wikimedia Commons, dùng lại theo giấy phép của từng ' +
                          'ảnh — ghi công là điều kiện bắt buộc của giấy phép đó. Đi về rồi ' +
                          'thay bằng ảnh của mình cho oai.',
                      en: 'Photographs from Wikimedia Commons, reused under their stated ' +
                          'licences — crediting the author is a condition of those licences. ' +
                          'Replace them with your own once you have been.' },
    noPhoto:        { vi: 'Cả internet không có nổi một tấm ảnh miễn phí bản quyền của chỗ ' +
                          'này, nên phần hình trên là tranh vẽ. Nói cách khác: nơi này chưa ' +
                          'bị ai làm cho nổi tiếng. Đó có thể là điểm cộng.',
                      en: 'The internet does not contain one freely-licensed photo of this ' +
                          'place, so the artwork above is an illustration. Which is another way ' +
                          'of saying nobody has ruined it yet. Possibly a selling point.' },

    /* pager */
    otherDestinations: { vi: 'Các điểm đến khác',        en: 'Other destinations' },
    prevRank:       { vi: 'Trước · hạng %1',             en: 'Previous · rank %1' },
    nextRank:       { vi: 'Sau · hạng %1',               en: 'Next · rank %1' },

    /* compare */
    compareTitle:   { vi: 'Thấy xếp hạng này sai? Tự xếp lại đi',
                      en: 'Think this ranking is wrong? Fix it yourself' },
    compareHint:    { vi: 'Thứ tự phụ thuộc vào việc bạn coi trọng cái gì. Kéo thanh trượt ' +
                          'và xem chỗ bạn thích có thắng nổi không. Cảnh báo: thường là không.',
                      en: 'The order depends on what you care about. Drag the sliders and see ' +
                          'whether your favourite actually wins. Spoiler: usually not.' },
    weightsTotal:   { vi: 'Tổng trọng số %1%',           en: 'Weights total %1%' },
    weightsOff:     { vi: ' — nên điểm giờ không còn trên thang 0–10 nữa, nhưng bạn cứ tự nhiên',
                      en: ' — so the scores are off the 0–10 scale now, but you do you' },
    resetWeights:   { vi: 'Thôi, trả về như cũ',         en: 'Fine, put it back' },
    matrixCaption:  { vi: 'Điểm từng tiêu chí và tổng có trọng số của mỗi điểm đến',
                      en: 'Criterion scores and weighted total for each destination' },
    destination:    { vi: 'Điểm đến',                    en: 'Destination' },
    scoreCol:       { vi: 'Điểm',                        en: 'Score' },

    /* footer */
    footerEstimates: { vi: 'Mọi con số ở đây đều là ước tính.',
                       en: 'Every number here is an estimate.' },
    footerBody:     { vi: ' Khoảng cách, thời gian và chi phí là con số áng chừng cho năm ' +
                          '2026 — hỏi lại trước khi đặt, đừng mang trang này ra tranh luận ' +
                          'với chủ nhà nghỉ. Điểm số là ý kiến cá nhân.',
                      en: ' Distances, times and costs are rough 2026 figures — check before ' +
                          'you book, and please do not argue with a guesthouse owner using ' +
                          'this page as evidence. The scores are opinions.' },
    footerAsOf:     { vi: 'Thông tin thời tiết và an toàn thu thập ngày %1.',
                      en: 'Weather and safety notes gathered %1.' },
    footerWeather:  { vi: 'Thời tiết và lũ lụt thay đổi liên tục — hãy xem ',
                      en: 'Weather and flood conditions change — check ' },
    footerWeather2: { vi: ' trước chuyến đi.',           en: ' before the trip.' },
    backToAll:      { vi: '← Về danh sách',              en: '← Back to all options' },
    weatherWord:    { vi: 'Thời tiết',                   en: 'Weather' },
    estimatesShort: { vi: 'Chỉ là ước tính.',            en: 'Estimates only.' },
    estimatesBody:  { vi: ' Hãy xác nhận lại khoảng cách, thời gian và giá trước khi đặt.',
                      en: ' Re-confirm distances, times and prices before booking.' },

    /* not found */
    notFoundTitle:  { vi: 'Chỗ này không tồn tại',       en: 'This place does not exist' },
    notFoundWithId: { vi: 'Không có gì khớp với "%1". Hoặc nó đã bị đổi tên, hoặc vẫn đang ' +
                          'là bản nháp, hoặc bạn vừa tự gõ link.',
                      en: 'Nothing matches "%1". Either it was renamed, or it is still a ' +
                          'draft, or you just typed the link yourself.' },
    notFoundNoId:   { vi: 'Link này không chỉ tới đâu cả.',
                      en: 'This link points nowhere in particular.' },
    seeAllOptions:  { vi: 'Về xem mấy chỗ có thật',      en: 'Go see the real ones' },

    /* empty / error states */
    noneYet:        { vi: 'Chưa có điểm đến nào được công bố. Thêm một thư mục trong ' +
                          'locations/ và khai báo id trong locations/registry.js.',
                      en: 'No destinations are published yet. Add one in locations/ and ' +
                          'register its id in locations/registry.js.' },
    loadFailed:     { vi: 'Không tải được dữ liệu chuyến đi. ',
                      en: 'Could not load the destinations. ' },
    loadFailedTail: { vi: 'Chi tiết có trong console của trình duyệt.',
                      en: 'The browser console has the detail.' },

    /* controls — aria-labels stay plain, they are read aloud */
    toLight:        { vi: 'Chuyển sang nền sáng',        en: 'Switch to light theme' },
    toDark:         { vi: 'Chuyển sang nền tối',         en: 'Switch to dark theme' },
    switchLang:     { vi: 'Đổi sang tiếng Anh',          en: 'Switch to Vietnamese' },
    langLabel:      { vi: 'EN',                          en: 'VI' }
  };

  /* ---- resolution ------------------------------------------------------ */

  function isBundle(v) {
    return v && typeof v === 'object' && !Array.isArray(v) &&
           (typeof v.vi === 'string' || typeof v.en === 'string');
  }

  /**
   * Resolve a translatable value for the active language.
   * Plain strings pass straight through. Arrays map element-wise.
   */
  function T(value, lang) {
    var L = lang || current;
    if (value === null || value === undefined) return value;
    if (typeof value === 'string' || typeof value === 'number') return value;
    if (Array.isArray(value)) {
      return value.map(function (v) { return T(v, L); });
    }
    if (isBundle(value)) {
      var out = value[L];
      if (typeof out === 'string') return out;
      // Fall back to the other language rather than rendering "undefined",
      // and say so in the console so the gap gets filled.
      var other = L === 'vi' ? 'en' : 'vi';
      if (typeof value[other] === 'string') {
        if (window.console && console.warn) {
          console.warn('[trip/i18n] missing "' + L + '" for: ' +
                       String(value[other]).slice(0, 60));
        }
        return value[other];
      }
      return '';
    }
    return value;
  }

  /** UI string by key, with %1 %2 … substitution. */
  function S(key) {
    var entry = STRINGS[key];
    if (!entry) {
      if (window.console && console.warn) console.warn('[trip/i18n] no UI string "' + key + '"');
      return key;
    }
    var out = T(entry);
    for (var i = 1; i < arguments.length; i++) {
      out = out.split('%' + i).join(String(arguments[i]));
    }
    return out;
  }

  /** Translate an enumerated data value like 'High' or 'Light'; pass through if unknown. */
  function E(value) {
    if (!value) return value;
    return STRINGS[value] ? T(STRINGS[value]) : value;
  }

  function lang() { return current; }

  function set(next) {
    if (LANGS.indexOf(next) === -1) return current;
    current = next;
    document.documentElement.setAttribute('lang', current);
    try { window.localStorage.setItem(STORE_KEY, current); } catch (e) { /* memory only */ }
    return current;
  }

  function init() {
    var saved = null;
    try { saved = window.localStorage.getItem(STORE_KEY); } catch (e) { saved = null; }

    /* Vietnamese always wins on a first visit. The browser's own language is
       deliberately ignored: the audience is one group of friends in Hải Phòng,
       and several of them will be on phones set to English. Sniffing
       navigator.language would have shown those people the wrong version. */
    current = (saved && LANGS.indexOf(saved) !== -1) ? saved : DEFAULT_LANG;

    document.documentElement.setAttribute('lang', current);
    return current;
  }

  TRIP.i18n = {
    T: T, S: S, E: E,
    lang: lang, set: set, init: init,
    langs: LANGS, strings: STRINGS
  };
})(window.TRIP = window.TRIP || {});
