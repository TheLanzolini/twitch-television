# Twitch Television

### Getting Started

`npm install -g yarn`

`yarn install`

`yarn dev`

### TODO
- [ ] send confirmation events from display to controller (and vice versa)
- [ ] Test the code controller overlay for edge cases
- [ ] Playback State through socket so controls can pause and play and start volume in correct place
- [ ] Hitting Enter on Same stream shouldnt re-set the channel
- [ ] Add Auth (register twitch app)
- [ ] roomcode and socketcode in LS??? wat did i do dat?




1. The Display Page Renders in
  a. Checks its own LocalStorage (Have it || Don't have it)
2. Request a ROOM if it doesn't have one, joins the room if it does
  a. Displays message to go to /controller on mobile device if it already has a room
3. Enter ROOM into the phone input
4. Emit message that controller has connected
