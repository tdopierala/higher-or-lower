import { Game } from '@/shared/interfaces/game.model';
import { Score } from '@/shared/interfaces/score.model';
import { store } from '..';

export interface LocalStorage {
	games: Game[];
	score: Score[];
	lastGameIndex: number;
}

export default {
	state: {
		games: [] as Game[],
		score: [] as Score[],
		lastGameIndex: -1 as number,
	},
	getters: {
		lastGame: (state: LocalStorage): Game => state.games[state.games.length - 1],
		allGames: (state: LocalStorage): Game[] => state.games,
		countGames: (state: LocalStorage): number => state.games.length,
		isLastGameFinished: (state: LocalStorage): boolean => state.games[state.games.length - 1].finished,
		allScores: (state: LocalStorage): Score[] => state.score,
		allScoresById: (state: LocalStorage) => (id: string) => {
			return state.score.filter(score => score.gameId === id).reverse();
		},
	},
	mutations: {
		setGames: (state: LocalStorage, games: Game[]) => {
			state.games = games;
			store.commit('setLastGameIndex', games.length);
		},
		setLastGameIndex: (state: LocalStorage, index: number) => {
			state.lastGameIndex = index;
		},
		initNewGame: (state: LocalStorage, game: Game) => {
			state.games.push(game);
		},
		initUpdateGame: (state: LocalStorage, game: Game) => {
			console.log('updateGame()', game);
			let idx: number = state.games.findIndex(g => g.deckId === game.deckId);

			if (idx >= 0) {
				state.games[idx].points = game.points;
				state.games[idx].rounds = game.rounds;
				state.games[idx].finished = game.finished;
			} else {
				idx = state.games.push(game);
			}

			state.lastGameIndex = idx;
			store.dispatch('saveGames');
		},
		setScores: (state: LocalStorage, scores: Score[]) => {
			state.score = scores;
		},
		initScore: (state: LocalStorage, score: Score) => {
			state.score.push(score);
			store.dispatch('saveScores');
		},
	},
	actions: {
		async loadGames() {
			console.log('loading games...');

			const scores = await localStorage.getItem('scores');
			store.commit('setScores', scores !== null ? JSON.parse(scores) : []);

			const games = await localStorage.getItem('games');
			store.commit('setGames', games !== null ? JSON.parse(games) : []);

			/* if (localStorage.getItem('games')) {
				const games_json = await localStorage.getItem('games');
				const games = games_json !== null ? JSON.parse(games_json) : [];

				store.commit('setLastGameIndex', games.length);
				store.commit('setGames', games);
			} else {
				store.commit('setGames', [
					{
						id: 0,
						date: Date.now(),
						deckId: '',
						rounds: 0,
						points: 0,
						finished: true,
					},
				]);

				store.dispatch('saveGames');
			} */
		},
		saveGames() {
			localStorage.setItem('games', JSON.stringify(store.getters.allGames));
		},
		saveScores() {
			localStorage.setItem('scores', JSON.stringify(store.getters.allScores));
		},
	},
};
