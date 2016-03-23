# React/Express starter project with build pipeline

This is a simple seed project for a react project with a simple node/express backend, based off of the react tutorial, but written in es2015 syntax.





## Initial setup

### Clone the project

git clone http://EUID@stash.kroger.com/scm/~mr96763/thor-react-seed.git




### Run npm install

cd thor-react-seed
npm install




### Install livereload chrome extension

https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en

In order to enable live reload, you need to click the symbol. If there is a black filled circle in the middle, it is running.




## Commands

#### gulp build / npm run build
This builds the code into the /lib/ directory and depends on the test task. This build will minify the build.js file as well.

NOTE: This build process will not bundle react and react-dom into the build.js file, as any consuming apps should already have react and react-dom as dependencies somewhere. If you want to test build.js for whatever reason, you will need to import them into index.html
just use:
```
  <script src="https://fb.me/react-0.14.7.js"></script>

  <script src="https://fb.me/react-dom-0.14.7.js"></script>
```


#### npm run dev (or start-dev)
This runs a nodemon of the server (live reloading on the server) as well as the live reloading/rebuilding for the front end.



#### npm start
This simply runs the node server



#### gulp test / npm run test
This runs the unit tests



#### npm run compile
This runs simple babel compilation on the files (/public/scripts) and outputs them into the ./lib folder, in their proper file structure. This is run before publishing so that consumers can use webpack/browserify/etc. to bundle.





## Notes
This will be updated with more stuff such as gulp tasks to bundle/publish to npm



#### Publishing

In order to publish, run the npm publish command. This will put up the relevate files (those not in .npmignore). It will also run several scripts before publishing. Once published, you can consume the package by doing npm install --save in your project, and you can import the component by using es6 syntax

```
import MyComponent from 'my-module-name';
```

In order for npm/browserify/webpack to play nicely, you need to make sure that the 'main' property in your package.json is pointed to your es5 compiled top level component. In this example, it is pointed to lib/components/comment-box as that is the top level component in our main.jsx. This way the bundler will search for that as the entrypoint for dependency bundling.
