# Kings Draft

### Objective 

This is a personal project to work with React.js and Firebase, to demonstrate
and practice creating a full stack application with minimal infrastructure.

The usual commands:
```
npm install
npm start
```

### Abstract 

I belong to a small group of people (known as shareholders) that contribute
varying amounts of money to a pool of four LA Kings season tickets.
Therefore, we needed a way to  fairly distribute the games across all members.

### Rules

1. With 41 regular season home games, there are 82 pairs of tickets.
2. Prior to the draft, the seat owners (majority shareholders) each take their choice pair, leaving 80 pairs for the draft.
3. At draft time, each shareholder draws one letter per share. The draft uses a serpentine method with 3rd round reversal, starting with Round 1 Share A.
4. When it is a person's turn to pick, they can select any available game. They make their selection, then the selection proceeds to the next person in order. They will make their next pick whenever their name appears in the selection list again.
5. If a person wants all 4 seats (2 pairs) for a particular game, they make their selection from any game that currently has 4 seats available. They forfeit their next pick when their name appears in the selection list again.

### MVP
1. Login should be retricted to shareholders.
2. Games should be shown in their picked order.
3. Shareholders should be able to select any available game they want.
4. Shareholders should be able to select either a single pair or both pairs.
5. Shareholders should only be able to select games when it is their turn.