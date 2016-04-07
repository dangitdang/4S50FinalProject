Relevant Vis:
http://shoutkey.com/dream
http://op.gg

Conceptual questions:
1. What is your concept and why are you interested in this data?
      I want to explore the idea of a counter champion in the game League of Legends. I'm really interested to see if there are truth to picking a champion to counter your opponent in the game. A lot of these “counter picks” are self reported by players and I want to see if this is supported by actual gameplay. I'm a fan of the game and thus really interested in the outcome of this project.

2. What questions do you have about your data?
      - Can the data tell me about picking order of player?
      - Does counter picking actually happen?
      - Does the skill level of players matter?
      - What happens during the different phases of the game?

3. What audience(s) do you want to communicate your answer to?
      My audience are players and fans of the game.

4. What are 2-3 hypothetical answers you might find as you explore?
       - Counter picking champions has a bigger effect on higher level tier players
       - Players actively “counter pick” opponents to ensure an advantage in the game.

5. What types of context do you see this final form living in?
        + Interactive desktop/mobile


Technical questions:
1. What is your data?
Matches information from the game League of Legends
2. What is the file size?
10 * 17MB files
3. What is the file format?
JSON
4. What is the file shape?
It's a json array of match objects. The match objects follows a spec on the API site.

5. What will you look for?
I will looking for the winrate between two champions if one is considered as a counter to the other. The timeline of the match of the total gold of the two champions we're interested in.

6. What is in the data that can help you find what you're looking for? Is it implicit or explicit?
It's implicit. I'll be looking at which team win. The match contains a timeline that has information such as total gold earn at that time.

7. In what ways do you need to manipulate the data to use it in code?
I'll just parse the data that I need. I will keep a data structure of the matches seen and the relevant information.
