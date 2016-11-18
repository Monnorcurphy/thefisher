### Functionality & MVP

Users will be able to:

- [X] Fish (Throw a hook, hit a fish)
- [X] Move the character (left and right)
- [X] Restart the game

In addition, this project will include:

- [X] A production Readme

### Wireframes

This app will consist of a single screen with the game (a small island, the fisher, the fishing rod vector), directions, and nav links to the Github, add my LinkedIn.  Game controls will be holding down the mouse to select how far a lure should be thrown. The farther a lure is thrown, the deeper it will go as well. On the left, three clickable shapes will be used to purchase lures.

<img src="http://res.cloudinary.com/dqiuefax1/image/upload/v1479104374/Screen_Shot_2016-11-13_at_10.18.43_PM_a4xxp0.png">

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and jquery for overall structure and game logic,
- Easel.js with `HTML5 Canvas` for rendering,
- Webpack to bundle and serve up the various scripts.

### Implementation Timeline

**Day 1**: Setup all modules, refresh on javascript/jquery, learn the basics of Easel.js.  Goals:

- Learn enough Easel.js to render an object to the Canvas element

**Day 2**: Dedicate this day to learning the `Easel.js` API. Goals:

- Render the ocean, fish, and fisher

**Day 3**: Create the fish logic backend.  Handle the different fish/lure types along with their rule following logic.  Incorporate the backend logic into frontend rendering.  Goals:

- Fisher can throw hooks, hooks hit fish, when a hook hits a fish they both vanish.

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals:

- Create controls throwing the lure via the fishing rod vector
- Nice design

### Bonus features
Possible bonuses include:

- [ ] An ability to change music
- [ ] More advanced lures, larger fish
- [ ] A more story driven beginning and end
- [ ] Have fishes of different commonalities (rare fish are only attracted to lures at shorter distances)
