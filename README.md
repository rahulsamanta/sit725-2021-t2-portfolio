# sit725-2021-t2-portfolio
The highlight of this portfolio project is a socket-based chatroom app which can be used for both public and private conversations. The user has the ability to enter a chatroom name to start the chat. They can then share the chatroom name with a buddy for them to join as well.

For single user testing in local machine, open the same link i.e. `http://127.0.0.1:5000/` in two different browsers.

Update: Added Dockerfile

This boilerplate is sourced from [Alessio Bonti's boilerplate of a NodeJS project](https://github.com/alexbonti/deakin-crowds).

It comprises of jQuery for advanced manipulations
Materialize CSS for the UI interface
Socket IO for real time comunications

Drop the .env file given during submission in the project root directory.

Open a terminal in root directory and run

    npm i

After installing the dependencies, run the server using

    npm start

If instead, you get something like the following, someone is already
using the default port of 5000, change it to some other value like 8080 in the `.env` file:

    Server running at http://127.0.0.1:5000/

    events.js:72
        throw er; // Unhandled 'error' event
                  ^
    Error: listen EADDRINUSE
        at errnoException (net.js:901:11)
        at Server._listen2 (net.js:1039:14)
        at listen (net.js:1061:10)
        at Server.listen (net.js:1127:5)
        ...

Once the server is running, test it by visiting the following URL in your
browser:

    http://localhost:5000/

Next, test it by visiting the following URL in your
browser:

    http://localhost:5000/test

When you visit the above url the content will assert Express is working!

    Express is working!

Run this app from a Docker container. Install Docker in your local system following the guidelines [here](https://docs.docker.com/get-started/).

Once docker is installed and running, open terminal in the application's root directory
and build the app using the command

    docker build -t rahulsamanta:portfolio .

Verify that the image has been created from the above step by running
    
    docker images

Run the image using command

    docker run -d -p 5000:5000 rahulsamanta:portfolio

Verify that the Docker image has started running successfully, check for the image *rahulsamanta:portfolio*
by running command

    docker ps


Files in this repository
--------------------------------------------------------------------------------

`server.js`

The server written with node.js.  This server was adapted from the
*[example provided in the node docs](http://nodejs.org/api/synopsis.html)*.

---

`.gitignore`

List of file patterns that should **NOT** be stored in git.  If you aren't using
git, you don't need this file.  And the contents are personal preference.

See the npm google groups topic
*['node_modules in git' from FAQ](https://groups.google.com/forum/#!topic/npm-/8SRXhD6uMmk)*
for discussion.

---

`LICENSE`

The open source license for this sample; in this case, it's licensed under
[MIT License](https://opensource.org/licenses/MIT).

---

`package.json`

Standard package.json file for node packages.  You will need this file for two
reasons:

* identify your node package dependencies during `npm install`
* identify to Bluemix that this directory contains a node.js application

See the npm doc
*[package.json](https://npmjs.org/doc/json.html)*
for more information.

---

`README.md`

This file!
