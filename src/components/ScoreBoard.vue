<template>
	<div class="game-score-board">
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>Date</th>
					<th>Deck Id</th>
					<th>Rounds</th>
					<th>Points</th>
					<th>isFinished</th>
				</tr>
			</thead>
			<tbody v-for="(game, index) in allGames" :key="game">
				<tr>
					<td>{{ index + 1 }}</td>
					<td>{{ new Date(game.date).toDateString() }}</td>
					<td>{{ game.deckId }}</td>
					<td>{{ game.rounds }}</td>
					<td>{{ game.points.toPrecision(2) }}</td>
					<td>{{ game.finished }}</td>
				</tr>
				<!-- <tr>
					<td colspan="6">
						<table class="table table-sm table-borderless">
							<tr v-for="score in $store.getters.allScoresById(game.deckId)" :key="score">
								<td>{{ score.round }}</td>
								<td>{{ score.cards[0].code }} / {{ score.cards[1].code }}</td>
								<td>{{ score.bet }}</td>
								<td>{{ score.result }}</td>
							</tr>
						</table>
					</td>
				</tr> -->
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
// import { Score } from '@/shared/interfaces/score.model';
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
	name: 'ScoreBoard',

	/* 	data() {
		return {
			
		},
	}, */

	computed: {
		...mapGetters(['allGames', 'allScores']),

		/* gameScores(deckId: string) {
			return this.$store.getters.allScoresById(deckId);
		}, */
	},

	methods: {
		...mapActions(['loadGames']),
	},

	mounted() {
		this.loadGames();
		// console.log(this.allGames);
	},
});
</script>

<style scoped lang="scss">
h1 {
	font-size: 2rem;
}
</style>
