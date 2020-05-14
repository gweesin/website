import { moduleActionContext } from "..";
import {
  GameDay,
  GameLength, MmrDistribution,
  OveralStatisticState,
  PlayedHeroByMode,
  PlayersPerDay,
  PopularGameHour,
  StatsPerMapAndRace, StatsPerWinrate,
  WinLoss
} from "./types";
import { RootState } from "../typings";
import { ActionContext } from "vuex";

const mod = {
  namespaced: true,
  state: {
    loadingGamesPerDayStats: true,
    loadingMapAndRaceStats: true,
    loadingPlayersPerDayStats: true,
    gamesPerDay: [] as GameDay[],
    playersPerDay: [] as GameDay[],
    statsPerMapAndRace: [] as StatsPerWinrate[],
    gameLengths: [] as GameLength[],
    popularGameHours: [] as PopularGameHour[],
    playedHeroes: [] as PlayedHeroByMode[],
    heroWinrate: {} as WinLoss,
    mmrDistribution: {} as MmrDistribution
  } as OveralStatisticState,
  actions: {
    async loadGamesPerDayStatistics(
        context: ActionContext<OveralStatisticState, RootState>
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_LOADING_GAMES_PER_DAY(true);

      const games = await rootGetters.statisticService.retrieveGamesPerDay();

      commit.SET_GAMES_PER_DAY(games);
      commit.SET_LOADING_GAMES_PER_DAY(false);
    },
    async loadPlayersPerDayStatistics(
        context: ActionContext<OveralStatisticState, RootState>
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_LOADING_PLAYERS_PER_DAY(true);

      const games = await rootGetters.statisticService.retrievePlayersPerDay();

      function mapToGameDay(r: PlayersPerDay): GameDay {
        return { date: r.date, gamesPlayed: r.distinctPlayers } as GameDay
      }

      const playersPerDay = games.map(r => mapToGameDay(r));
      commit.SET_PLAYERS_PER_DAY(playersPerDay);
      commit.SET_LOADING_PLAYERS_PER_DAY(false);
    },
    async loadMapAndRaceStatistics(
        context: ActionContext<OveralStatisticState, RootState>
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_LOADING_MAP_AND_RACE_STATS(true);

      const stats = await rootGetters.statisticService.retrieveMapAndRaceStats();

      commit.SET_MAP_AND_RACE_STATS(stats);
      commit.SET_LOADING_MAP_AND_RACE_STATS(false);
    },
    async loadGameLengthStatistics(
        context: ActionContext<OveralStatisticState, RootState>
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const stats = await rootGetters.statisticService.retrieveGameTimes();

      commit.SET_GAME_LENGTH_STATS(stats);
    },
    async loadPlayedHeroes(
        context: ActionContext<OveralStatisticState, RootState>
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const stats = await rootGetters.statisticService.retrievePlayedHeroes();

      commit.SET_PLAYED_HEROES(stats);
    },
    async loadpopularGameHours(
        context: ActionContext<OveralStatisticState, RootState>
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const stats = await rootGetters.statisticService.retrievePopularGameHours();

      commit.SET_POPULAR_GAME_HOURS(stats);
    },
    async loadHeroWinrates(
        context: ActionContext<OveralStatisticState, RootState>,
        heroSelectOptions: { first: string, second: string, third: string, opFirst: string, opSecond: string, opThird: string }
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const stats = await rootGetters.statisticService.retrieveHeroWinrates(
        heroSelectOptions.first,
        heroSelectOptions.second,
        heroSelectOptions.third,
        heroSelectOptions.opFirst,
        heroSelectOptions.opSecond,
        heroSelectOptions.opThird
      );

      commit.SET_HERO_WINRATES(stats);
    },
    async loadMmrDistribution(
        context: ActionContext<OveralStatisticState, RootState>,
        season: number
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const stats = await rootGetters.statisticService.retrieveMmrDistribution(season);

      commit.SET_MMR_DISTRIBUTION(stats);
    }
  },
  mutations: {
    SET_LOADING_GAMES_PER_DAY(state: OveralStatisticState, loading: boolean) {
      state.loadingGamesPerDayStats = loading;
    },
    SET_GAMES_PER_DAY(state: OveralStatisticState, games: GameDay[]) {
      state.gamesPerDay = games;
    },
    SET_LOADING_PLAYERS_PER_DAY(state: OveralStatisticState, loading: boolean) {
      state.loadingPlayersPerDayStats = loading;
    },
    SET_PLAYERS_PER_DAY(state: OveralStatisticState, games: GameDay[]) {
      state.playersPerDay = games;
    },
    SET_LOADING_MAP_AND_RACE_STATS(state: OveralStatisticState, loading: boolean) {
      state.loadingMapAndRaceStats = loading;
    },
    SET_MAP_AND_RACE_STATS(state: OveralStatisticState, stats: StatsPerWinrate[]) {
      state.statsPerMapAndRace = stats
    },
    SET_GAME_LENGTH_STATS(state: OveralStatisticState, stats: GameLength[]) {
      state.gameLengths = stats
    },
    SET_POPULAR_GAME_HOURS(state: OveralStatisticState, stats: PopularGameHour[]) {
      state.popularGameHours = stats
    },
    SET_PLAYED_HEROES(state: OveralStatisticState, playedHeroes: PlayedHeroByMode[]) {
      state.playedHeroes = playedHeroes
    },
    SET_HERO_WINRATES(state: OveralStatisticState, winLoss: WinLoss) {
      state.heroWinrate = winLoss
    },
    SET_MMR_DISTRIBUTION(state: OveralStatisticState, mmrDistribution: MmrDistribution) {
      state.mmrDistribution = mmrDistribution
    }
  }
} as const;

export default mod;
