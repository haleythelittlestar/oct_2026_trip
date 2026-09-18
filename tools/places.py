"""Per-location search configuration for fetch_photos.py.

Adding a location:
  1. add an entry here keyed by the location id
  2. run:  python tools/fetch_photos.py --only <id>

Fields
  spots     [(label, lat, lon, radius_m)]  geographic search centres
  cats      ["search phrase"]              phrases used to *discover* real
                                           Commons category names — we search
                                           for categories rather than guessing
                                           their exact titles, because guessing
                                           mostly returns "MISSING"
  keywords  ["phrase"]                     full-text search, lowest precision
  require   ["term", ...]                  a candidate must match at least one
                                           of these in its title or categories.
                                           This is the filter that stops the
                                           pipeline returning Chicago skylines.
"""

# Terms rejected everywhere. Every one of these was observed in real results:
# geosearch around Côn Sơn returned ISS photographs of Earth, and around
# hồ Đồng Đò returned VietJet aircraft landing at Nội Bài.
GLOBAL_DENY = [
    "iss0", "iss modules", "view of earth", "earth observation",
    "airbus", "boeing", "a320", "a321", "a350", "atr 72", "aircraft",
    "airplane", "airliner", "airport", "vietjet", "bamboo airways",
    "vn-a", "cockpit", "runway",
    "chicago", "skyline",
    "logo", "flag of", "coat of arms", "emblem", "seal of",
    "map of", "locator", "diagram", "chart", "graph",
    # Wikipedia infobox maps leak in as "lead images" — Thác Khe Vằn's article
    # returns Vietnam_relief_location_map.jpg, which is a map, not a waterfall.
    "location map", "location_map", "relief location", "relief_location",
    "topographic map", "blank map", "administrative divisions",
    "stamp", "banknote", "coin", "postcard of",
    "portrait of", "gravestone", "tombstone",
    "screenshot", "poster", "book cover", "qr code",
    # Taxonomy and journal plates. Nature reserves are heavily photographed by
    # biologists, so a search for "Hữu Liên" surfaced a frog from a species
    # description before it surfaced any landscape.
    "10.3897", "10.11646", "zookeys", "sp. nov", "holotype", "paratype",
    "figs.", "fig. ", "plate ",
]

PLACES = {
    "cat-ba": {
        "spots": [
            ("Cát Bà town", 20.7280, 107.0480, 6000),
            ("Lan Hạ bay", 20.7800, 107.0600, 8000),
            ("Cát Bà national park", 20.7900, 106.9900, 6000),
        ],
        "cats": ["Lan Ha Bay", "Cat Ba", "Cat Ba National Park", "Cát Bà"],
        "keywords": ["Lan Ha Bay", "Cat Ba Island landscape", "Cat Ba National Park"],
        # Wikipedia lead images: (lang, article title). An article's lead image is
        # editorially chosen as the best single photo of its subject, so it needs
        # no relevance filtering — it is precise by construction. These get a
        # large scoring bonus so they land first and become the hero.
        "wiki": [("vi", "Vịnh Lan Hạ"), ("en", "Cát Bà Island"),
                 ("vi", "Vườn quốc gia Cát Bà")],
        "require": ["lan ha", "lan ha bay", "cat ba", "cát bà", "cat hai", "cát hải",
                    "viet hai", "việt hải", "ha long", "hạ long", "bai tu long"],
    },

    "con-son-chi-linh": {
        "spots": [
            ("Côn Sơn", 21.1130, 106.3720, 6000),
            ("Kiếp Bạc", 21.1250, 106.4120, 5000),
        ],
        "cats": ["Kiep Bac", "Con Son pagoda", "Chi Linh", "Yen Tu"],
        "keywords": ["Kiep Bac temple", "Con Son pagoda Hai Duong",
                     "Nguyen Trai temple Con Son"],
        "wiki": [("vi", "Đền Kiếp Bạc"), ("vi", "Chùa Côn Sơn")],
        "require": ["con son", "côn sơn", "kiep bac", "kiếp bạc", "chi linh", "chí linh",
                    "nguyen trai", "nguyễn trãi", "luc dau", "lục đầu", "kinh mon",
                    "kinh môn", "an phu", "an phụ"],
    },

    "binh-lieu": {
        "spots": [
            ("Bình Liêu town", 21.5400, 107.4000, 9000),
            ("Border markers", 21.6050, 107.4400, 9000),
        ],
        "cats": ["Binh Lieu", "Bình Liêu"],
        "keywords": ["Binh Lieu Quang Ninh", "Binh Lieu terraced fields",
                     "Khe Van waterfall"],
        "wiki": [("en", "Bình Liêu district"), ("vi", "Thác Khe Vằn")],
        # Commons has essentially nothing here; require-terms keep the noise out
        # rather than letting Bạc Liêu and Hòa Bình results through on token match.
        "require": ["binh lieu", "bình liêu", "khe van", "khe vằn", "huc dong",
                    "húc động", "luc hon", "lục hồn", "cao ba lanh"],
    },

    "ninh-binh": {
        "spots": [
            ("Tràng An", 20.2500, 105.9100, 7000),
            ("Hang Múa / Tam Cốc", 20.2340, 105.9370, 6000),
            ("Cúc Phương", 20.2470, 105.6300, 8000),
        ],
        "cats": ["Trang An", "Tam Coc", "Cuc Phuong National Park", "Hang Mua",
                 "Bai Dinh"],
        "keywords": ["Trang An Landscape Complex", "Tam Coc Ninh Binh",
                     "Hang Mua viewpoint"],
        "wiki": [("vi", "Hang Múa"), ("vi", "Vườn quốc gia Cúc Phương"),
                 ("en", "Tràng An Scenic Landscape Complex")],
        "require": ["trang an", "tràng an", "tam coc", "tam cốc", "hang mua",
                    "hang múa", "ninh binh", "ninh bình", "cuc phuong",
                    "cúc phương", "bai dinh", "bái đính", "van long", "vân long",
                    "bich dong", "bích động"],
    },

    "quan-lan": {
        "spots": [
            ("Quan Lạn", 20.8930, 107.5040, 9000),
            ("Bái Tử Long", 20.9800, 107.4200, 9000),
            ("Vân Đồn / Cái Rồng", 21.0600, 107.4200, 8000),
        ],
        "cats": ["Bai Tu Long Bay", "Quan Lan", "Van Don"],
        "keywords": ["Bai Tu Long Bay", "Quan Lan island beach", "Van Don Quang Ninh"],
        "wiki": [("vi", "Vân Đồn"), ("vi", "Quan Lạn"), ("vi", "Vịnh Bái Tử Long")],
        "require": ["quan lan", "quan lạn", "bai tu long", "bái tử long",
                    "van don", "vân đồn", "minh chau", "minh châu",
                    "ngoc vung", "ngọc vừng", "cai chien", "cái chiên"],
    },

    "tam-dao": {
        "spots": [
            ("Tam Đảo town", 21.4590, 105.6440, 6000),
            ("Tây Thiên", 21.5100, 105.5900, 6000),
        ],
        "cats": ["Tam Dao", "Tam Dao National Park", "Tay Thien", "Tam Đảo"],
        "keywords": ["Tam Dao Vinh Phuc", "Tay Thien pagoda", "Thac Bac Tam Dao"],
        "wiki": [("vi", "Vườn quốc gia Tam Đảo"), ("vi", "Tam Đảo"), ("vi", "Tây Thiên")],
        "require": ["tam dao", "tam đảo", "tay thien", "tây thiên",
                    "thac bac", "thác bạc", "vinh phuc", "vĩnh phúc",
                    "dai lai", "đại lải"],
    },

    "dong-lam": {
        "spots": [
            ("Đồng Lâm steppe", 21.6200, 106.3400, 7000),
            ("Hữu Liên commune", 21.6170, 106.3520, 7000),
            ("Hữu Lũng town", 21.5100, 106.3450, 8000),
        ],
        "cats": ["Huu Lung", "Huu Lien", "Dong Lam Lang Son"],
        "keywords": ["Dong Lam Huu Lien", "Huu Lung Lang Son karst",
                     "Huu Lien nature reserve"],
        # Both Vietnamese articles carry the same tall portrait image, which the
        # landscape filter rejects. Kept here so a future edit picks it up if the
        # article's lead image changes.
        "wiki": [("vi", "Hữu Liên"), ("vi", "Hữu Lũng")],
        # "lang son" alone is deliberately excluded: it would let photographs of
        # Lạng Sơn city and the border gate through the relevance filter.
        "require": ["dong lam", "đồng lâm", "huu lien", "hữu liên",
                    "huu lung", "hữu lũng", "bac mo", "bắc mỏ", "lang ben"],
    },

    "ho-dong-do": {
        "spots": [
            ("Đồng Đò, Minh Trí", 21.2650, 105.7850, 7000),
            ("Núi Sóc / đền Sóc", 21.2470, 105.8380, 5000),
        ],
        "cats": ["Soc Son", "Sóc Sơn", "Den Soc"],
        "keywords": ["Dong Do lake Soc Son", "Soc Son Hanoi landscape",
                     "Den Soc temple"],
        "wiki": [("vi", "Đền Sóc"), ("vi", "Sóc Sơn")],
        # Geosearch here is dominated by aircraft on approach to Nội Bài, which
        # is ~8 km away. These terms are the only thing keeping them out.
        "require": ["dong do", "đồng đò", "minh tri", "minh trí", "minh tan",
                    "minh tân", "soc son", "sóc sơn", "den soc", "đền sóc",
                    "den giong", "đền gióng", "nui soc", "núi sóc"],
    },
}
