# Word-Guess-Game

A hangman-style game built in javascript.

## Gameplay

The computer will randomly select a word from an array and underscores will fill in to tell the user how many 
letters that word contains.

Type `a` through `z` to guess which letters are in the word. 

On a correct guess the letter will populate the space that it occupies in the corresponding word in the array.

On any guess the letter will be added to a used letters list so that the user may not guess the same letter twice.

On an incorrect guess the user will lose one guess, until they reach 0 guesses and the game will restart.

The user starts with `10 guesses`.