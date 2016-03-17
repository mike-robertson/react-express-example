# React/Express starter project with build pipeline

This is a simple seed project for a react project with a simple node/express backend, based off of the react tutorial, but written in es2015 syntax.

## Initial setup

**Clone the project**
git clone http://EUID@stash.kroger.com/scm/~mr96763/thor-react-seed.git

**Run npm install**
cd thor-react-seed
npm install

**Install livereload chrome extension**
https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en

In order to enable live reload, you need to click the symbol. If there is a black filled circle in the middle, it is running.

## Commands

**Run the code**

* gulp build
This builds the code into the /public/build directory

* npm run start-dev
This runs a nodemon of the server (live reloading on the server) as well as the live reloading/rebuilding for the front end.

* npm start
This simply runs the node server

## Notes
This will be updated with more stuff such as gulp tasks to bundle/publish to npm
