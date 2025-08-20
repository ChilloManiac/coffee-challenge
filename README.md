# Coffee date challenge

This is a coding challenge, created from an idea of having biweekly coffee dates with team members. In order to ensure that all get to meet with each other, and that the "dates" are distributed uniformly, i created this coding challenge.

*Disclosure*: I haven't verified my assumptions are 100% correct, but i tried my best :)

## Summary

The `Drawer` should take a list of participants in its constructor. The `Drawer` should have a method `draw_week` that returns the maximum amount of coffee dates possible without having a participant being drawn twice. A date is a pair of participants. If there are an odd number of participants, one person will forego having a date for that week. This participant must then be part of the next weeks rotation. When there are no more unique coffee dates the `draw_week` should return an empty list.

### Example for 3 participants

```txt
Participants: A, B, C,

Week 1:
- [[A, B]]

Week 2:
- [[A, C]]

Week 3:
- [[B, C]]

week 4:
- []
```

### Details

The amount of weeks it takes to have all possible coffee dates is calculated by the following formula:

```txt
coffee_dates = n(n-1)/2
minimum_weeks = coffee_dates / ( floor(n/2) )
```

Where `n` is the amount of participants.

### Acceptance criteria

- The solution must use the shortest amount of weeks possible.
- The solution must be able to handle at least 20 participants
- The solution must be able to handle an odd number of participants.
- The solution must use all unique coffee dates
- The solution must never use the same date twice
- A draw may never include the same participant twice in a week
