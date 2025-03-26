import { it, fc } from "@fast-check/jest";
import { Participant } from ".";
import { Drawer } from "./drawer";

const participantGenerator = fc.uniqueArray(
	fc.string({ minLength: 1, unit: "grapheme" }),
	{
		maxLength: 10,
	},
);

const allDatesPossibleSorted = (participants: Participant[]) => {
	const dates = [];
	for (let i = 0; i < participants.length; i++) {
		for (let j = i + 1; j < participants.length; j++) {
			const date = [participants[i], participants[j]];
			date.sort();
			dates.push([participants[i], participants[j]]);
		}
	}

	return dates;
};

describe("Drawer", () => {
	it.prop([participantGenerator])(
		"Must use the shortest amount of weeks possible",
		(participants: Participant[]) => {
			const drawer = new Drawer(participants);

			const amountParticipants = participants.length;
			const amountCoffeeDates =
				(amountParticipants * (amountParticipants - 1)) / 2;
			const fewestWeeksPossible =
				amountParticipants <= 1
					? 0
					: amountCoffeeDates / Math.floor(amountParticipants / 2);

			let weeks = 0;
			while (drawer.draw_week().length > 0) {
				weeks++;
			}

			expect(weeks).toBe(fewestWeeksPossible);
		},
	);

	it.prop([participantGenerator])(
		"Must use all coffee dates",
		(participants: Participant[]) => {
			const drawer = new Drawer(participants);

			const amountParticipants = participants.length;
			const amountCoffeeDates =
				(amountParticipants * (amountParticipants - 1)) / 2;

			const coffeeDates = [];
			let drawnCoffeeDates;
			do {
				drawnCoffeeDates = drawer.draw_week();
				coffeeDates.push(...drawnCoffeeDates);
			} while (drawnCoffeeDates.length > 0);

			expect(coffeeDates).toHaveLength(amountCoffeeDates);

			const drawnSortedSet = new Set(coffeeDates.map((date) => date.sort()));
			const expectedSortedSet = new Set(allDatesPossibleSorted(participants));

			expect(drawnSortedSet).toEqual(expectedSortedSet);
		},
	);

	it.prop([participantGenerator])(
		"Must never use the same date twice",
		(participants: Participant[]) => {
			const drawer = new Drawer(participants);

			const coffeeDates = [];
			let drawnCoffeeDates;
			do {
				drawnCoffeeDates = drawer.draw_week();
				coffeeDates.push(...drawnCoffeeDates);
			} while (drawnCoffeeDates.length > 0);

			const drawnSortedSet = new Set(coffeeDates.map((date) => date.sort()));
			expect(drawnSortedSet.size).toEqual(coffeeDates.length);
		},
	);

	it.prop([participantGenerator])(
		"A draw must never use the same participant twice in a week",
		(participants: Participant[]) => {
			const drawer = new Drawer(participants);

			let drawnCoffeeDates;
			do {
				drawnCoffeeDates = drawer.draw_week();
				const participantsInWeek = drawnCoffeeDates.flat();
				expect(new Set(participantsInWeek).size).toEqual(
					participantsInWeek.length,
				);
			} while (drawnCoffeeDates.length > 0);
		},
	);
});
