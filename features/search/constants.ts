export const POPULAR_SEARCHES = {
  player: [
    "Cristiano Ronaldo",
    "Lionel Messi",
    "Neymar",
    "Erling Haaland",
    "Kylian Mbappe",
    "Jude Bellingham",
  ],
  team: [
    "Real Madrid",
    "Manchester United",
    "Barcelona",
    "Bayern Munich",
    "Liverpool",
    "Paris Saint Germain",
  ],
} as const;

export type SearchType = keyof typeof POPULAR_SEARCHES;
