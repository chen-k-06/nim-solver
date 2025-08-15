Nim is a solved combinatorial game where players gradually remove objects from piles or "heaps" until none remain. The player who takes the final objects, such that there are no more objects the next player could take, wins. Learn more about Nim here: https://en.wikipedia.org/wiki/Nim

---

In each game of Nim, given n piles with non-zero amounts of stones in them, one player can win always if both players play optimally. This is determined by XOR-ing the number of stones in each pile; if the result is zero, the second player wins. Otherwise, the first player does. 

For example, let's look at the game 1 2 1 (3 piles of stones, two of which contain 1 stone and the third of which contains 2). Players can only remove stones from one pile at a time, but can remove any number of stones from that pile. In this case, the first player can take the pile of 2, turning the game into 1 1. 1 1 is a second player game, because the first player is forced to take one pile and the second player will take the remaining pile. But remember- the first player in the original, 1 2 1 game, is the *second* player in the 1 1 game. So 1 2 1 is a second player game. 

<img width="1464" height="644" alt="image" src="https://github.com/user-attachments/assets/6c3fcbc3-4e55-4ee7-be3b-78621c3bd27e" />

---
Try the solver (and beat all your friends at nim!) here: https://chen-k-06.github.io/nim-solver/
