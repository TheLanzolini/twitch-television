# Twitch Television

### Getting Started

`npm install -g yarn`

`yarn install`

`yarn dev`

### TODO
- [ ] Join ROOM with controller, shows controls on socket join
- [ ] Hitting Enter on Same stream shouldnt re-set the channel
- [ ] Add Auth



1. The Display Page Renders in
  a. Checks its own LocalStorage (Have it || Don't have it)
2. Request a ROOM if it doesn't have one, joins the room if it does
  a. Displays message to go to /controller on mobile device if it already has a room
3. Enter ROOM into the phone input
4. Emit message that controller has connected
