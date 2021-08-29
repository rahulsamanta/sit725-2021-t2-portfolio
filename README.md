# sit725-2021-t2-prac5
Tasks related to SIT725 Practicals

Update: Added MVC structure

This boilerplate is sourced from [Alessio Bonti's boilerplate of a NodeJS project](https://github.com/alexbonti/deakin-crowds).

It comprises of jQuery for advanced manipulations
Materialize for the UI interface
Socket IO for real time comunications

After installing, run the server using

    npm start

If instead, you get something like the following, someone is already
using the default port of 5000:

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
