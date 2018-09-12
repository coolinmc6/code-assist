![alt text][logo]

[logo]: https://github.com/coolinmc6/code-assist/blob/master/src/artwork/Code-Assist.png "Code Assist Logo"

Code Assist is a React app that allows anyone to create their own repository of useful snippets that can be easily searched by snippet name or tag. It was built using [Create React App](https://github.com/facebook/create-react-app) and [JSON Server](https://github.com/typicode/json-server). Check out a live version [here](https://coolinmc6.github.io/code-assist/). To create your **OWN** Code Assist with your **OWN** snippets, follow the getting started instructions below:

## Getting Started

```sh
# install JSON Server => from https://github.com/typicode/json-server (link above)
npm install -g json-server

# clone this repo
git clone https://github.com/coolinmc6/code-assist.git

# change to code-assist directory
cd code-assist/

# install dependencies
npm install

# start dev server
npm run start

# start json-server (in separate terminal window)
json-server library.json -p 3004
```

And now you are all set! Code Assist comes with a small library of snippets that you can use right away! To try it out, simply go to [http://localhost:3000/code-assist/](http://localhost:3001/code-assist/) and start typing a concept or subject you'd like to learn more about.

## Using Code Assist

### Adding, Editing and Deleting Snippets
- The **Code Editor** page is where you can add, edit, and delete snippets.

#### Add a Snippet
- To add a new snippet, you can simply go to the Code Editor page and start typing! The page opens with a blank form that you can start filling out.
- There are five fields: 
	+ *Term*: the name of the concept, function, etc. for the snippet
	+ *Description*: a written description of what the snippet is and is used for. Be as verbose or brief as you wish!
	+ *Language*: **Code Assist** currently supports five languages: CSS, HTML, JavaScript, PHP, and Python (but I will be adding more!)
	+ *Code Snippets*: the code that you want to save. **Note**: I have found that it works best to write working code in a Code Editor or CodePen and then copy and paste it into this box.
	+ *Tags*: the tags by which you want to find this snippet, separated by commas. For example, if you wanted you had a Bubble Sort algorithm and you wanted the following tags: "sorting", "algorithm", "bubble sort", you simply type the following (no quotes): "sorting, algorith, bubble sort"
- when you are finished, simply click "Save Snippet"
- You will now be able to find that snippet by its "name" or *Term* in the list on the right hand side.
- **Note**: to save this snippet to your library *permanently* and not just in Redux state (which goes away when you refresh the page), you **MUST** have JSON-Server running.

#### Editing a Snippet
- Click on the snippet that you wish to edit from the list on the right part of the screen. This will populate the form and allow you to change any field you want.
- When you are finished, click "Update Snippet" to save the edits to your `library.json` file
- To cancel an edit, click "Cancel"

#### Deleting a Snippet
- Like editing a snippet, click on the snippet that you wish to delete from the list on the right.
- Click the red "DELETE" button underneath the list of tags to permanently delete that snippet

### Routing
- Code Assist uses [React Router](https://reacttraining.com/react-router/) for routing. 
- There are only two pages: the **Code Assist** main page with the working application and the **Code Editor** that allows you to edit your snippets. Here are their routes:

|Page|Route|
|:---:|:---|
|**Code Assist**|http://localhost:3000/code-assist/|
|**Code Editor**|http://localhost:3000/code-assist/code-editor| 

- Each route has the */code-assist/* preface so that you can deploy the app to GH-Pages and actually gain access to your snippets on the web. For more information on how deploy a create-react-app to GH-Pages, take a look at the [create-react-app README](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages).

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

