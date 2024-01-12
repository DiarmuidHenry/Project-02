![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)


Theory behind the structure:

Rock Paper Scissors give each player 3 options. The opponent also has 3 options. Each option loses against 1, wins against 1 and draws against 1 (itself).

Rock Paper Scissors Lizard Spock works from a similar principal, but there are 5 choices. This leads to each choice losing against 2, winning against 2, and of course drawing against 1 (itself).

This can easily be generalised to a game with 2n+1 choices, where each choice loses against n, wins against n, and draws with 1 (itself).

By ordering these 2n+1 items in a certain way, we can assure that each choice beats the following n choices and loses to the proceding n choices. Here, we work modulo n. For example, if we have 9 choices (named 0-8 for simplicity), then choice 7 would lose to 3, 4, 5 and 6, whilst it would win against 8, 0, 1 and 2.

Using this theory, we can quickly relabel our choices, and simplify the problem into a general game of 2n+1 choices. This means that we can add superficial names/labels to a large number of choices and use them as our return, since all of the workings are done with our newly constructed sets.



Bugs/fixes:

- Borders not disappearing after next one clcked. Add a style class remover to fix.
- After game was reset, scores wenr up by more than 1 point. This is due to multiple eventListners eeing attached to each image/button. By removing all, then adding 1, fths fixed the problem.