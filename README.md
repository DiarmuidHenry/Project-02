# Rock Paper Scissors Lizard Spock Website - PP2<!-- omit from toc -->

This project is a website where users can play the game Rock Paper Scissors Lizard Spock.

The game is clear, easy to understand for those who are familiar or unfamiliar with 
the game and its history/structure.

Pictures, unambiguous instructions and clear text make it easy to navigate and play, 
while emotive messages, coloured results and changing images invoke emotive responses from user/s as they play.

![Homepage on all devices](./documents/readme-images/all-screens.webp)

[Deployed Website](https://diarmuidhenry.github.io/Project-02/)


## Table of Contents<!-- omit from toc -->
- [Introduction](#introduction)
  - [History](#history)
  - [Game Theory](#game-theory)
- [Aim](#aim)
  - [Website Objective](#website-objective)
  - [Key Features](#key-features)
- [Potential Users](#potential-users)
  - [User Goals](#user-goals)
  - [User Testimonials](#user-testimonials)
- [Design \& Development](#design--development)
  - [Wireframes](#wireframes)
    - [Desktop \& Tablet](#desktop)
    - [Mobile](#mobile)
  - [Colour Scheme](#colour-scheme)
  - [Icons/Links/Navigation](#iconslinksnavigation)
  - [Features](#features)
- [Technology \& Resources](#technology--resources)
- [Deployment](#deployment)
- [Issues/Bugs](#issuesbugs)
  - [Resolved](#resolved)
  - [Unresolved](#unresolved)
- [Testing \& Validation](#testing--validation)
  - [Functional Testing of Website](#functional-testing-of-website)
    - [Welcome Page](#header--navbar---mobile)
    - [Player v Computer (PvC)](#header--navbar---tablet--desktop)
    - [Player v Player (PvP)](#footer)
  - [PageSpeed Insights Tests](#pagespeed-insights-tests)
    - [Homepage](#homepage-pagespeed)
    - [Error404 Page](#bookings-pagespeed)
  - [HTML Code Validation](#html-code-validation)
    - [Homepage](#homepage-validation)
    - [Error404 Page](#bookings-validation)
  - [CSS Code Validation](#css-validation)
- [Future Improvements/Development](#future-improvementsdevelopment)

## Introduction

### History

The game was originally created by a software engineer named Sam Kass in 1998, who [outlined the rules
on his website](http://www.samkass.com/theories/RPSSL.html). It gained popularity on an episode of
The Big Bang Theory entitled - quite appropriately - "The Lizard-Spock Expansion". Sheldon Cooper (played by Jim PArsons)
rightfully explains that is in an expansion on the classic Rock Paper Scissors, often used to settle minor disoputes:

"Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors."

The game quickly gained popularity online, with a plethora of blogs, articles and merchandise being created based on
this expansion of the well-known game.

### Game Theory

Instead of there being only 3 possible non-draw results (Rock v Paper, Paper v Scissors, Scissors v Rock and vice versa for each pair), the addition of the 2 extra choices - Lizard, Spock - increases this number to 10. In mathematicalt terms, it increases from $\binom{3}{2} = \frac{3*2}{2*1} = 3$ to $\binom{5}{2} = \frac{5*4}{2*1} = 10$.

We can start by analysing the original 3-choice game.

Rock Paper Scissors give each player 3 options. The opponent also has 3 options. Each option loses against 1, wins against 1 and draws against 1 (itself).

Rock Paper Scissors Lizard Spock works from a similar principal, but there are 5 choices. This leads to each choice losing against 2, winning against 2, and of course drawing against 1 (itself).

This can easily be generalised to a game with $2n+1$ choices, where each choice loses against $n$, wins against $n$, and draws with 1 (itself). Here for the game to be non-trivial, we must have that $n > 0$.

By ordering these $2n+1$ items in a certain way, we can assure that each choice beats the following $n$ choices and loses to the proceding $n$ choices. Here, we work modulo $n$. For example, if we have 9 choices (named 0-8 for simplicity when recalling items by index), then choice 7 would lose to 3, 4, 5 and 6, whilst it would win against 8, 0, 1 and 2.

Using this theory, we can quickly relabel our choices, and simplify the problem into a general game of $2n+1$ choices. This means that we can add superficial names/labels to a large number of choices and use them as our return, since all of the workings are done with our newly constructed sets.

By using this approach, this code can easily be adapted to a game with 7, 9, 11, 101 choices, with a similar structure. The only changes would need to be the creation of the `choices` array, and more images (with the correct labelling) in the assets/images folder.

## Aim

### Website Objective

- To createa a website where a user/users can easily play Rock Paper Scissors Lizard Spock online. The page should be clear, uncluttered, uncomplicated, and there should be no doubt as to what the purpose of the page is. Instructions should be available for those who need them, and the flow of the game should be prompted clearly and obviously to the user/s.

Simple, clear icons and a straightforward colour scheme will help the user to focus on the game and will avoid distractions during gameplay.

### Key Features

- The *Home* page will include an *Instructions* dropdown text box, instructing those who are unfamiliar with the game on how the game works, as well as the website.

- There will be a *Play against the computer* option where a user can play against a computer whose choices are randomly generated.

- -There will also be a *Play against a friend* option, where 2 users - using the same device - can play against each other, without being able to see what the other person has chosen.

## Potential Users

The website would of interest to anyone who has seen/heard of the game through the Big Bang Theory episode. It will also be of interest for anyone who is with a friend, looking for a simple 2 palyer game that can be fairly played on a single device.

### User Goals

- **Entertainment**: The primary goal of users engaging with the Rock Paper Scissors Lizard Spock game is to have a fun and entertaining experience.

- **Skill Development**: Users may aim to enhance their strategic thinking and decision making skills by playing the game regularly.

- **Friendly Competition**: Engage in friendly competition with friends, family, or even against the computer, fostering a sense of camaraderie and sportsmanship.

- **Learn the Game Rules**: Understand and learn the rules of the extended Rock Paper Scissors Lizard Spock game, with clear explanations provided in the *Instructions* section.

- **Accessible Gameplay**: Experience a user-friendly interface that ensures smooth gameplay, making it enjoyable for users of all ages and skill levels.

### User Testimonials

__Emily, Casual Gamer__ \
"I stumbled upon this Rock Paper Scissors Lizard Spock game whilst looking for a quick and fun way to unwind. The gameplay is intuitive, and I love the clear use of icon images. Highly recommended!"

__Alex, Strategy Enthusiast__ \
"As a strategy game enthusiast, I appreciate the depth this extended version of Rock Paper Scissors brings. The inclusion of Lizard and Spock adds a layer of complexity that keeps me engaged. The user interface is clean, and the multiplayer option lets me test my skills against others. A great choice for those who enjoy a mix of strategy and classic gaming."

## Design \& Development

### 5 Planes of UX

#### Strategy

Create a simple, engaging Rock Paper Scissors Lizard Spock game site, includinging single and multiplayer experiences with user-friendly accessibility.

#### Scope

Include a Player v Player, as well as a Player v Computer part to the game. Use clear images to help show the user results, as well as to guide them through the process of the game.

#### Structure

A *Home* page where user/s can either choose to read instructions, or they can choose to start a game. Once they choose which game to start, they are guided through each round by messages and icons appearing on screen determined by their choice and either their friend's choice or the computer's choice, depending on the game. Once the game has been won/lost, the user returns to the *Home* screen, where the results is clearly shown and they can start another game.

#### Skeleton

A simple title and 3 buttons(*Instructions*, *Play against the computer* and *Play against a friend*) appear when the pages loads. As gameplay commences, icons clealy representing the 5 choices appear for the user/s to choose from. All choices chosen are clearly shown, and results are clearly displayed for each round, as well as an overall score.

See [Wireframes](#wireframes) below.

#### Surface

A simple, two toned colour scheme is used throughout, to avoid distracting the user's focus from the game area. All clickable buttons and icons will highlight when hovered over, in order to show where the user can and cannot click. Icons will show frames to represent results: green symbolising a win, red symbolising a loss and grey symbolising a draw.

### Wireframes

#### Desktop \& Tablet

#### Mobile

### Features

## Technology \& Resources

- **IDE :** [CodeAnywhere](https://app.codeanywhere.com/) and [Visual Studio Code](https://code.visualstudio.com/).
- **Languages :** HTML for basic page structure. CSS for styling. JavaScript for interactivity and execution of gameplay. Markdown for this readme.
- **Template :** The [CodeInstitute template](https://github.com/Code-Institute-Org/ci-full-template) was used in order to install all the relevant tools for the code to function.
- [Github](https://github.com/) was used to host the project. I used `git commit` regularly to create versions of the project at regular intervals. This meant that I could be more precise if I needed to `git reset`.
- [Balsamiq](https://balsamiq.com/) was used to create wireframes for mobile, table and desktop.
- [FlatIcon](https://www.flaticon.com/) was used to find royalty-free icons that I could safely use without worry of copyright infringement.
- [Markdown Guide](https://www.markdownguide.org/cheat-sheet/) was used to help create the readme.
- [Favicon.io](https://favicon.io/favicon-generator/) was used to find the page's favicon.
- [WAVE](https://wave.webaim.org/) and [PageSpeed Insights](https://pagespeed.web.dev/) testing tools were used to locate minor issues and check both accessibility and performance. 

## Deployment

Once the basic design of the website was finished, I deployed it to GitHub Pages. [The history of all deployed version of the site can be found here](https://github.com/DiarmuidHenry/Project-02/deployments).

### How to Deploy to GitHub Pages

1. Log in to github.com.
2. Select *Project-02* in my list of repositories.
3. Click Settings > Pages.
4. Under *Source*, select *Deploy from a branch*.
5. Under *Branch*, select *main* and */root*, then click *Save*.
6. Wait a couple of minutes for the site to deploy, then navigate back to the repository.
7. Click *Deployments*, which now should have appeared on the main repository page.
8. Under *Active Deployments*, click the link https://diarmuidhenry.github.io/Project-02/. (The deployed page will open in the current tab).

### How to Clone Repository

1. Go to the [GitHub repository](https://github.com/DiarmuidHenry/Project-02/).
2. Click the green *Code* drop-down button.
3. Click *HTTPS* and copy the URL.
4. Open your IDE, and open a terminal.
5. Type `git clone url`, replacing `url` with the URL copied in step 3.

## Issues/Bugs

### Resolved

- Borders not disappearing after next one clcked. Add a style class remover to fix.
- After game was reset, scores wenr up by more than 1 point. This iws due to multiple eventListners eeing attached to each image/button. I added a variable (listenerCheck) that checked if they had been added. That sorted the problem.
- When adding media queries, I was having problem with specificity. I found out that this was because my approach to it was to add styles directly into the HTML from javascript. This meant it could not be overwritten, as "style =" has the highest specificity. I tried first to fix this by altering the way I changed the display property: I simply created style classes called "display flex", "display block" and "display none" in the CSS, and added this style class to the object. However, this didn't work, as I had more speficit changes to the display based on id in other places in the code. I finally solved it by altering my changeDisplayById function to include the media query in itself. This way, I avoided having to use !important, I didn't have to do a large restructure of the CSS styling. I also introduced the gridOrFlex function to accomodate for the specific time that the game-area grid should be a grid, not flex.

### Unresolved

- The overall styling of the page. Although this is not technically a bug, it is something that I feel can be improved on. However, for the purpose of this project, I feel that the time investment necessary to make the page look and feel as clean and comfortable as I would like would not give a significant difference to the overall feel (and grade) of the website.

## Testing \& Validation

### Functional Testing of Website

#### Home/Start Page

#### Player v Computer (PvC)

#### Player v Player (PvP)

### PageSpeed Insight Tests

#### Homepage

#### Error404 page

### HTML Code Validation

#### Homepage

#### Error404 page

### CSS Code Validation

## Future Improvements/Development

- Extend the game so that players can upload their own icon images, or even just give names to their own custom choices. This could lead to a game where, for example, all 11 members of a football team could be choices, meaninf the players in the team could play as themself, against the others in the team. Due to the setup of the JavaScript code \(See [Game Theory](#game-theory) above\), this would be quite straightforward.

- Improve on the styling and look of the page to make it look more professional.

- Include animation on the chosen icons, not just changing frame styles.

## Acknowledgements

- Luke Buchanan: my mentor, for giving clear, constructive feedback during the entire process.
- The Slack community, for the plethora of questions that have been previously asked and answered.
- Tutor Assistance, for helping solve the problems that I just couldn't get my head around.


