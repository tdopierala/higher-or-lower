import { Card } from './card.model';

export interface Score {
	gameId: string;
	round: number;
	cards: Card[];
	bet: string;
	result: boolean;
}
