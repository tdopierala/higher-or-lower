import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import GameBoard from '@/components/GameBoard.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: GameBoard,
	},
	{
		path: '/score',
		name: 'score',
		component: () => ScoreBoard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
