import { Card } from '@/shared/interfaces/card.model';
import axios from 'axios';
import { store } from '..';

const deckofcardsapiUrl = 'https://deckofcardsapi.com';

export interface DeckOfCards {
	deckId: string;
	currCard: Card;
}

export default {
	state: {
		deckId: '' as string,
		currCard: null as Card | null,
	},
	getters: {
		currentDeckId: (state: DeckOfCards) => state.deckId,
		currentCard: (state: DeckOfCards) => state.currCard,
	},
	mutations: {
		setNewDeckId: (state: DeckOfCards, deckId: string) => {
			state.deckId = deckId;
		},
		setCurrentCard: (state: DeckOfCards, card: Card) => {
			state.currCard = card;
		},
	},
	actions: {
		async getNewDecks() {
			await axios
				.get(`${deckofcardsapiUrl}/api/deck/new/shuffle/?deck_count=1`)
				.then(response => {
					// console.log(response.data);
					store.commit('setNewDeckId', response.data.deck_id);
					store.dispatch('loadCard');
				})
				.catch(err => console.error(err.message));
		},

		async loadCard() {
			const deckId = store.getters.currentDeckId;
			await axios
				.get(`${deckofcardsapiUrl}/api/deck/${deckId}/draw/?count=1`)
				.then(response => {
					// console.log(response.data);
					store.commit('setCurrentCard', response.data.cards[0]);
				})
				.catch(err => console.error(err.message));
		},
	},
};
