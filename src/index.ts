import assert from "node:assert";

export type Participant = string;
export type CoffeeDate = [Participant, Participant];
export type Week = CoffeeDate[];

export abstract class AbstractDrawer {
	public constructor(protected readonly participants: Participant[]) {
		assert(
			new Set(participants).size === participants.length,
			"Participants must be unique",
		);
	}

	abstract draw_week(): Week;
}
