![alt text][logo]

[logo]: https://github.com/coolinmc6/code-assist/blob/master/src/artwork/Code-Assist.png "Code Assist Logo"

Code Assist is a React app that allows anyone to create their own repository of useful snippets that can be easily searched by snippet name or tag. It was built using [Create React App](https://github.com/facebook/create-react-app) and [JSON Server](https://github.com/typicode/json-server). To create your **OWN** Code Assist with your **OWN** snippets, follow the getting started instructions below:

## Getting Started

```sh
# install JSON Server => from https://github.com/typicode/json-server (link above)
npm install -g json-server

# clone this repo
git clone https://github.com/coolinmc6/code-assist.git

# change to code-assist director
cd code-assist/

# install dependencies
npm install

# start dev server
npm run start

# start json-server (in separate terminal window)
json-server library.json -p 3004
```

And now you are all set! 



## Developing

```sh
# start dev server
PORT=3001 npm run start

# run json-server
json-server library.json -p 3004

# set node-sass to watch
npm run watch-css
```


## ToDo

- Make responsive and work well on mobile
	+ shrink search bar text
	+ make search results smaller
	+ less padding on code box and smaller text
	+ shrink tag text and give vertical margin
- Fill out definitions for empty JS snippets
- About Page
- show language tag
- Add 50 PHP snippets
- Add 25 CSS snippets
- Add 25 HTML snippets
	+ head tags
	+ accessibility attributes



## How I Built This

```sh
create-react-app code-assist
npm i axios prismjs react-redux redux redux-promise react-router react-router-dom node-sass json-server --save-dev

# run json-server
json-server library.json -p 3004
```

