## Harmony (Fullstack)

Harmony is a fullstack application that allows users to send and view messages in the real time.

You can visit it [here](https://harmony-45tv.onrender.com), however, because of the nature of express-session, you will need to allow cross-site cookies in your browser to log in.

## Demonstration

Click on the image below to view this demonstration of the app being used on localhost through two different google accounts.

[![Watch the video](https://img.youtube.com/vi/5FtekUkGkUc/maxresdefault.jpg)](https://youtu.be/5FtekUkGkUc)

## Installation and Setup

Clone or download this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

- You will need to run `npm install` in each directory individually

To start the Node server:

- `cd backend` if you havent already
- run `nodemon dist/server.js` or `node dist/server.js`
- connect to the server through `http://localhost:4000`

- run `tsc --w` if you wish to make changes in the src file

To start the React page

- `cd frontend`
- run `npm start`
- visit the page at `http://localhost:3000`

## Testing

Frontend:

The frontend is tested with Cypress.

- run `npm start` to start a local instance of the React page on `localhost:3000`
- `npm run cypress:open` to open the cypress terminal
- select the `main.cy.ts` file

- `jest` or `npm test` to run the Jest unit testing

Backend:

The backend is tested with Jest and Supertest

- run `node dist/__tests__/server.js` (or use nodemon) to start an instance of the test server on `localhost:4000`
- run `npm test` or `jest dist/*filepath*`

## Reflection

This was a project built with the goal of using technologies learned up to this point and to familiarize myself
with new technologies like Websockets.

I wanted to build a real-time React Harmonylication that allows users to sign in using their google accounts and chat in a few different rooms.
The project was designed with scaling in mind, and new rooms can be created and used in the application easily.

One of the main challenges I ran into was implementing `Socket.io`. I spent some time going through various resources to find the optimal way to
both add to the `MongoDb` database AND sync the server without overlapping data. Creating a way to disconnect users from a room when they leave
took a bit of tinkering and a few trials with different methods but ultimately a simple system was used.

At the end of the day the technologies implemented in this project are:

Frontend: React, Bootstrap, Typescript, and React-Router v6.
Backend: Node, MongoDb, Express, Passport-Google-Oauth2, Socket.io, Typescipt and PassportJWT.

I used `create-react-app --template typescript` boilerplate to minimize setup time so I could spend more time focusing on building the backend.
Bootstrap with a Bootswatch theme was used for simplicity.
