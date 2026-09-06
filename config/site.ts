export const SITE_CONFIG = {
  name: "FootyPedia",
  brand: {
    firstWord: "FOOTY",
    secondWord: "PEDIA",
    tagline: "FOOTBALL HUB",
  },
  description:
    "Database pemain sepak bola dunia: profil, statistik, klub, dan karier lengkap. Didukung TheSportsDB API.",
  footerDescription:
    "Database pemain sepak bola terlengkap dari seluruh dunia. Jelajahi profil, statistik, dan karier pemain favorit Anda.",
  dataSource: {
    name: "TheSportsDB",
    url: "https://www.thesportsdb.com",
    label: "Data powered by",
    updateNote: "Data diperbarui secara real-time dari berbagai liga dunia.",
  },
  stats: {
    playersCount: "250K+ Pemain",
    teamsCount: "20K+ Klub",
    leaguesCount: "150+ Liga",
  },
} as const;
