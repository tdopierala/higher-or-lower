export interface Game {
	id?: number;
	date: Date;
	deckId: string;
	rounds: number;
	points: number;
	finished: boolean;
}
