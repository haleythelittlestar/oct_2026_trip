/* config.js — trip metadata and the scoring model.

   Bilingual strings use { vi, en }. Vietnamese is the default language, since
   the audience is the group in Hải Phòng.

   Weights must sum to 1.0; score.js warns in the console if they don't. */
window.TRIP_CONFIG = {
  /* The nickname this whole thing is for. Shown in the header. */
  owner: {
    name: 'Haley the Little Star',
    tagline: { vi: 'Ban Du Lịch', en: 'Travel Desk' }
  },

  title: {
    vi: 'Mình đi đâu đây?',
    en: 'Where are we going?'
  },
  eyebrow: {
    vi: 'Hải Phòng · tuần đầu tháng 10 năm 2026',
    en: 'Hải Phòng · first week of October 2026'
  },
  subtitle: {
    vi: 'Bảy chỗ đi được trong 2–3 ngày, đã xếp hạng sẵn để nhóm mình đỡ mất ba tối ' +
        'nhắn tin qua lại rồi cuối cùng vẫn đi Đồ Sơn. Bấm vào từng chỗ để xem chi tiết. ' +
        'Không đồng ý thì xuống cuối trang mà tự xếp lại.',
    en: 'Seven places you can actually reach in 2–3 days, pre-ranked so the group chat ' +
        'does not spend three evenings on this and then go to Đồ Sơn anyway. Tap one for ' +
        'the detail. Disagree? Re-rank it yourself at the bottom.'
  },
  tripWindow: '1–7 / 10 / 2026',
  origin: 'Hải Phòng',

  /* The date the weather, flood and safety notes were gathered. Shown on the
     page, because this information has a short shelf life. */
  infoAsOf: '2026-09-18',

  /* Shown in the footer, after the as-of date. This used to live in a
     dismissible banner at the top of the home page; the banner was removed as
     noise, but the fact is worth keeping somewhere — the per-location safety
     callouts cover the specifics, this covers the general case. */
  infoWarning: {
    vi: 'Tháng 10 vẫn nằm trong mùa bão ở vịnh Bắc Bộ.',
    en: 'October is still typhoon season in the Gulf of Tonkin.'
  },

  criteria: [
    { key: 'scenery',    weight: 0.25,
      label: { vi: 'Cảnh quan & thiên nhiên',    en: 'Landscape & nature' },
      short: { vi: 'Cảnh',                       en: 'Scenery' } },
    { key: 'proximity',  weight: 0.15,
      label: { vi: 'Gần Hải Phòng',              en: 'Close to Hải Phòng' },
      short: { vi: 'Khoảng cách',                en: 'Distance' } },
    { key: 'access',     weight: 0.15,
      label: { vi: 'Đi lại dễ dàng',             en: 'Easy logistics' },
      short: { vi: 'Đi lại',                     en: 'Access' } },
    { key: 'safety',     weight: 0.15,
      label: { vi: 'An toàn & dư địa thời tiết', en: 'Safety & weather margin' },
      short: { vi: 'An toàn',                    en: 'Safety' } },
    { key: 'activities', weight: 0.15,
      label: { vi: 'Đủ việc để chơi 2–3 ngày',   en: 'Enough for 2–3 days' },
      short: { vi: 'Hoạt động',                  en: 'Things to do' } },
    { key: 'local',      weight: 0.10,
      label: { vi: 'Chất địa phương',            en: 'Local character' },
      short: { vi: 'Bản địa',                    en: 'Local feel' } },
    { key: 'value',      weight: 0.05,
      label: { vi: 'Xứng với chi phí',           en: 'Value for money' },
      short: { vi: 'Giá trị',                    en: 'Value' } }
  ]
};
