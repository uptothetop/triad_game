# The Triad
Web vesrion of triad logic game (or also known as Set)

## Rules
Playfield is a table with 3x4 cards on it.

Each card has 4 attributes:

- Type of figure (triangle, square or circle)
- Number of figures (1..3)
- Color of figures (red, blue or green)
- Type of filling (striped, empty or solid)

Player should find and match all the "Triads" - e.g. group of three cards, where each attribute should be different or the same for all the cards.

## Tech Stack
Pure Javascript, using Canvas API + native imports.
For prod there will be a simple WebPack config

## Running
This is a pure client-side HTML5 App, use any http web server to serve it and just run `index.html`
