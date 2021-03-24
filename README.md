# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Aiden Vehemente**

Time spent: **4** hours spent in total

Link to project: https://codepath-prework-aidenvehemente.glitch.me/

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [ ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [ ] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Player is able to pick how many buttons are in the game (from 3-6) by use of multiple start buttons

## Video Walkthrough

Here's a walkthrough of implemented user stories:
!![](https://i.imgur.com/JvEQo04.gif)

![](https://i.imgur.com/SSSTbAl.gif)

![](https://i.imgur.com/qkjxQDN.gif)

![](https://i.imgur.com/1mxH6um.gif)

![](https://i.imgur.com/XK5mBVN.gif)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

  * StackOverflow - used to find how to get length of an array in JavaScript, example of a timer not related to the Date class
  
  * JavaScript Documentation (MDN Webdocs at developer.mozilla.org) - used to read Math.random documentation
  
  * w3schools.com - to look up CSS color names, and how to implement a timer
  
2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

I think that the biggest challenge I faced in creating this submission was the implementation of the timer feature.
The first thing I did was go read the documentation for setInterval and clearInterval, as was suggested in the instructions.
I then searched for some examples of how to implement a timer, understanding that setInterval is used to call a function after every period (in ms) specified.
However, initially I could only find examples of timers involving Dates, which was not helpful for my goal of creating a countdown.
After doing more searching, I discovered I could use setInterval to call a function every second, and to get it to act like a timer I could introduce a global variable to track the seconds left,
and each time setInterval could call a function every second to decrement the seconds left variable.
After my initial attempt at implementation, I tested it out by playing the game, but I realized the timer wasn't resetting correctly. I realized I had to introduce a way to stop the timer using 
clearInterval, so I added a function to stop and reset the seconds left to 10 that would be called whenever a player finishes their guess or the secondsLeft variable hits 0.
I then realized that the timer was starting too soon, as it would start as the clue was being played and not give the player any time to input the answer, so using the given code from earlier in the project in playClueSequence as a model ,I utilized a setTimeout call in PlayClueSequence to delay the starting of the timer to a time equal to the delay from playing all of the buttons in the clue.
Finally, the timer was working as expected, until playing around with the page revealed to me a bug - if the player stops the game by pressing the stop button, the timer continues running even though there is no game in progress. So I fixed this by adding a call to stopTimer in the stopGame function.
While this fixed the bug if the player waits to press the stop button until after the clue is finished, it still occurred if the player pressed stop while the clue was in progress, as the timer had not yet been started due to the setTimeout call delaying until after the clue finished, so it would start after the stopGame function was called and not be stopped.
I fixed this by adding a condition to the decrement function that ensured that the timer would only tick if a game was in progress.
Overall, I overcame this tough implementation by methodically coding each step, utilizing outside resources and examples, and testing many cases.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

After this submission, I am definitely more curious on how to use JavaScript for more complex websites. 
I think that this project introduced me to the basics of JavaScript, HTML, and CSS pretty well, so I want to delve deeper into more features of the languages.
When I was brainstorming other features to add, I thought of utilizing text boxes for user input to specify how many boxes, but I didn't know how to. I think that with more exposure to
the language of web development, the better control I'll have when building projects. Some specific features I want to know more about are handling user input, password storage for logins,
using web databases (I already have some experience with writing SQL but not actually deploying it on web servers), and mobile page development.
I also am curious to learn more about JSON and API calls, as I was exposed a little bit to it at a hackathon before.


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I were to have more time to work on this project, the first thing I would do is more testing and fixing potential bugs. 
A bug that I noticed and did not have the time to fix was the fact that there is no restriction as to when the player can press the buttons,
which means that a player could cheat by simply pressing the buttons right after the clue plays them. Additionally, there were some edge cases with the timer I did not get a chance to 
further test or fix. The second thing I would do is reorganize the code and delegate more tasks to separate functions to make the code easier to understand and edit later. For example, when I added the new feature
of choosing how many game buttons, I simply added a parameter and a for loop to the startGame function to remove unnecessary buttons. However, if someone wanted to add even more buttons it would be easier to edit and understand if the number of game buttons was handled by a separate function. 
Even though I think I commented my code pretty well, I think that by adding more functions to handle different tasks instead of one function handling a bunch of tasks makes it easier for teammates to read, review, and edit my code.
Finally, I would work on more of the optional features and some more features I had ideas for. Some ideas I had were the ability to toggle whether you want to have the timer, a difficulty setting for the speed of the clues, and choosing how many lives to play with (along with a life counter on screen).


## License

    Copyright Aiden Vehemente

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

