# everything-leads-to-philosophy
React Web application that highlights a surprising fact: almost every wikipedia article leads to the philosophy wiki page.

> Clicking on the first link in the main text of a Wikipedia article, and then repeating the process for subsequent articles, would usually lead to the Philosophy article. As of February 2016, 97% of all articles in Wikipedia eventually led to the article Philosophy.  
https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy

![](pictures/demo_gif.gif)

## Usage

### React app
You’ll need to have Node >= 8.10 on your machine.
On the root directory of philosophy, execute either the below commands to install all the project dependencies.

`npm install`

Runs the app in development mode. Open http://localhost:3000 to view it in the browser.

`npm start`

### Service
On another terminal, move to the service folder. Use a python 3 environnment and run the Flask app.

`python -m flask run`
