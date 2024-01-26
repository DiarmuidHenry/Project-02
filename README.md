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
  - [Theory](#theory)
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

The game was originally created by a software enginerr named Sam Kass in 1998, who [outlined the rules
on his website](http://www.samkass.com/theories/RPSSL.html). It gained popularity on an episode of
The Big Bang Theory entitled - quite appropriately - "The Lizard-Spock Expansion". Sheldon Cooper (played by Jim PArsons)
rightfully explains that is in an expansion on the classic Rock Paper Scissors, often used to settle minor disoputes:

"Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors."

The game quickly gained popularity online, with a plethora of blogs, articles and merchandise being created based on
this expansion of the well-known game.

### Theory

Instead of their being only 3 possible results non-draw results (Rock v Paper, Paper v Scissors, Scissors v Rock), the addition of the 2 extra choices - Lizard, Spock - increas this number to 20. In mathematicalt terms, it increases from 3C2 to 5C2. We can start by analysing the original 3-choice game.

Rock Paper Scissors give each player 3 options. The opponent also has 3 options. Each option loses against 1, wins against 1 and draws against 1 (itself).

Rock Paper Scissors Lizard Spock works from a similar principal, but there are 5 choices. This leads to each choice losing against 2, winning against 2, and of course drawing against 1 (itself).

This can easily be generalised to a game with 2n+1 choices, where each choice loses against n, wins against n, and draws with 1 (itself). Here for the game to be non-trivial, we must have that n > 0.

By ordering these 2n+1 items in a certain way, we can assure that each choice beats the following n choices and loses to the proceding n choices. Here, we work modulo n. For example, if we have 9 choices (named 0-8 for simplicity when recalling items by index), then choice 7 would lose to 3, 4, 5 and 6, whilst it would win against 8, 0, 1 and 2.

Using this theory, we can quickly relabel our choices, and simplify the problem into a general game of 2n+1 choices. This means that we can add superficial names/labels to a large number of choices and use them as our return, since all of the workings are done with our newly constructed sets.

By using this approach, this code can easily be adapted to a game with 7, 9, 11, 101 choices, with a similar structure. The only changes would need to be the creation of the `choices` array, and the images in the assets/images folder.


## Aim

### Website Objective

### Key Features

## Potential User

### User Goals

### User Testimonial

## Design \& Development



### Wireframes

#### Desktop \& Tablet

#### Mobile

### Colour Schemes

### Icons/Navigation

### Features


## Technology \& Resources

## Deployment

## Issues/Bugs

### Resolved

- Borders not disappearing after next one clcked. Add a style class remover to fix.
- After game was reset, scores wenr up by more than 1 point. This iws due to multiple eventListners eeing attached to each image/button. I added a variable (listenerCheck) that checked if they had been added. That sorted the problem.
- When adding media queries, I was having problem with specificity. I found out that this was because my approach to it was to add styles directly into the HTML from javascript. This meant it could not be overwritten, as "style =" has the highest specificity. I tried first to fix this by altering the way I changed the display property: I simply created style classes called "display flex", "display block" and "display none" in the CSS, and added this style class to the object. However, this didn't work, as I had more speficit changes to the display based on id in other places in the code. I finally solved it by altering my changeDisplayById function to include the media query in itself. This way, I avoided having to use !important, I didn't have to do a large restructure of the CSS styling. I also introduced the gridOrFlex function to accomodate for the specific time that the game-area grid should be a grid, not flex.

### Unresolved


## Testing \& Validation

### Functional Testing of Website

#### Welcome/Start Page

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


