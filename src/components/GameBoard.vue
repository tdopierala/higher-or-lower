<template>
	<section class="game-board">
		<div class="game-score">
			<div class="game-score-element">Rounds: {{ rounds }} / {{ MAX_ROUNDS }}</div>
			<div class="game-score-element">Points: {{ points.toPrecision(1) }}</div>
			<!-- <div class="game-score-element">
				Last bet:
				<span v-if="betResult">correct! :)</span>
				<span v-if="!betResult">wrong! :(</span>
			</div> -->
		</div>

		<div class="game-card">
			<div class="game-card-body">
				<!-- v-if="loading" -->
				<div class="loading-spinner" v-if="loading">
					<it-loading color="#fff"></it-loading>
				</div>
				<img :src="currCard.image" :alt="currCard.code" v-if="currCard" @load="onImgLoad" />
			</div>
			<div class="game-card-footer">
				<it-button type="success" size="big" @click="checkNextCard('higher')" :disabled="gameOver || loading">higher</it-button>
				<it-button type="danger" size="big" @click="checkNextCard('lower')" :disabled="gameOver || loading">lower</it-button>
			</div>
		</div>

		<div class="game-results" v-if="currentScores">
			<table class="table">
				<tbody>
					<tr v-for="score in currentScores" :key="score">
						<td>{{ score.round }}</td>
						<td>{{ score.cards[0].code }} / {{ score.cards[1].code }}</td>
						<td>{{ score.bet }}</td>
						<td>{{ score.result }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<it-modal v-model="confirmModal" class="game-prompt-modal">
		<template #header>
			<h3>Load previous game?</h3>
		</template>
		<template #body>The previous game has not been completed. Do you want to upload it?</template>
		<template #actions>
			<it-button type="danger" @click="loadNewGame(), (confirmModal = false)">No</it-button>
			<it-button type="success" @click="loadUnfinishedGame(), (confirmModal = false)">Yes</it-button>
		</template>
	</it-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Card } from '@/shared/interfaces/card.model';

// import { Modal } from 'bootstrap-vue-3';

export default defineComponent({
	name: 'GameBoard',

	data() {
		return {
			confirmModal: false as boolean,
			loading: false as boolean,

			currCard: null as Card | null,
			prevCard: null as Card | null,

			currentBet: '' as string,
			betResult: null as boolean | null,
			diff: '' as string,

			MAX_ROUNDS: 30 as const,
			POINTS_INCREASE: 0.1 as const,

			rounds: 0 as number,
			points: 0 as number,

			gameOver: false as boolean,
		};
	},

	computed: {
		...mapGetters(['currentCard', 'currentDeckId', 'isLastGameFinished', 'countGames', 'lastGame', 'allGames', 'allScoresById']),

		currentScores() {
			// return this.allScoresById(this.currentDeckId);
			return this.$store.getters.allScoresById(this.$store.getters.currentDeckId);
		},
	},

	methods: {
		...mapActions(['getNewDecks', 'loadCard', 'loadGames']),
		...mapMutations({ updateGame: 'initUpdateGame', setNewDeckId: 'setNewDeckId', saveScore: 'initScore' }),

		checkNextCard(bet: string) {
			this.currentBet = bet;
			this.loading = true;
			this.loadCard();
		},

		loadNewGame() {
			console.log('loadNewGame()');

			this.getNewDecks().then(() => {
				this.updateGame({
					date: Date.now(),
					deckId: this.currentDeckId,
					rounds: this.rounds,
					points: this.points,
					finished: false,
				});
			});
		},

		loadUnfinishedGame() {
			this.setNewDeckId(this.lastGame.deckId);
			this.rounds = this.lastGame.rounds;
			this.points = this.lastGame.points;
			this.gameOver = this.lastGame.finished;

			this.loadCard();
		},

		onImgLoad() {
			console.log('onImgLoad()');

			this.loading = false;

			const values = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
			const suits = ['C', 'D', 'H', 'S'];

			if (this.prevCard !== null) {
				const previuos = {
					value: values.indexOf(this.prevCard.code.substring(0, 1)),
					suit: suits.indexOf(this.prevCard.code.substring(1, 2)),
				};

				const current = {
					value: values.indexOf(this.currentCard.code.substring(0, 1)),
					suit: suits.indexOf(this.currentCard.code.substring(1, 2)),
				};

				if (current.value > previuos.value) this.diff = 'higher';
				else if (current.value < previuos.value) this.diff = 'lower';
				else if (current.suit > previuos.suit) this.diff = 'higher';
				else if (current.suit < previuos.suit) this.diff = 'lower';
				else this.diff = 'equal';

				if (this.diff === this.currentBet) {
					this.betResult = true;
					this.points += this.POINTS_INCREASE;
				} else {
					this.betResult = false;
				}

				this.rounds++;
				this.gameOver = this.rounds >= this.MAX_ROUNDS;

				this.updateGame({
					deckId: this.currentDeckId,
					rounds: this.rounds,
					points: this.points,
					finished: this.rounds >= this.MAX_ROUNDS,
				});

				this.saveScore({
					gameId: this.currentDeckId,
					round: this.rounds,
					cards: [this.prevCard, this.currentCard],
					bet: this.currentBet,
					result: this.betResult,
				});
			}
		},
	},

	watch: {
		currentCard(newCard: Card) {
			this.prevCard = this.currCard;
			this.currCard = newCard;
		},
	},

	mounted() {
		this.loading = true;

		this.loadGames().then(() => {
			if (this.lastGame && !this.lastGame.finished) {
				this.confirmModal = true;
			} else {
				this.loadNewGame();
			}
		});
	},
});
</script>

<style scoped lang="scss">
.game-score {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin: 10px 0;

	.game-score-element {
		margin: 5px;
		padding: 10px;
		background-color: #cccccc;
	}
}
.game-card {
	width: 246px;
	margin: 0 auto;

	.game-card-body {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px;

		.loading-spinner {
			/* box-sizing: border-box; */
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			margin: 0 auto;
			/* padding: 10px 0; */
			text-align: center;

			background-color: #000;
			opacity: 0.5;
		}
	}

	.game-card-footer {
		display: flex;
		justify-content: center;
		margin: 10px;

		button {
			margin: 0 10px;
		}
	}
}
</style>
