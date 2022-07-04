import deckofcardsapi, { DeckOfCards } from './modules/deckofcardsapi';
import localdb, { LocalStorage } from './modules/localstorage';

import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
	foo: string;
	deckOfCards: DeckOfCards;
	localStore: LocalStorage;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: { foo: 'foo' } as State,
	modules: {
		deckofcardsapi,
		localdb,
	},
});
