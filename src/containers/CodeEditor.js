import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCodeLibrary, 
		changeInputValue, 
		saveNewCodeObject, 
		updateCodeObject, 
		deleteCodeObject } from '../actions/index';
import { generateID, languageIdentifier } from '../helpers/Helpers'

// import CodeObject from '../components/CodeObject';

import '../css/prism.css';
import '../css/materialize.css';

import Prism from 'prismjs';

/*
ToDo's

- Render the code as the person is typing it



*/

class CodeEditor extends Component {

	constructor() {
		super()
		this.state = {
			existing: false,
			newCodeObject: {
				id: generateID(),
				term: '',
				description: '', 
				language: '',
				snipRawCode: '', 
				snipRawTags: '',
				snipTags: [],
				snipCode: []
			},
			existingCodeObject: {
				term: '',
				description: '', 
				language: '', 
				snipRawCode: '', 
				snipRawTags: '',
				snipTags: [],
				snipCode: []
			}
		}
	}

	componentDidMount() {
		this.props.fetchCodeLibrary();
	}

	createMarkup(html) {
	  return {__html: html};
	  // const code = "const data = { data: ['1,2,3,4,5] }";
	  // const html = Prism.highlight(code, Prism.languages.javascript);
	  // <div dangerouslySetInnerHTML={this.createMarkup(html)} />

	}

	renderTags() {
		let tags;
		if(this.state.existing) {
			tags = this.state.existingCodeObject.snipTags;
		} else {
			tags = this.state.newCodeObject.snipTags;
		}

		if(!tags) {
			return <div></div>;
		}
		return tags.map(tag => {
			let random = generateID();
			return (
				<span className="cm-tag" key={`${tag}-${random}`}>{tag}</span>
			);
		})
	}

	// Render the Code block
	renderCode() {
		let codeArray, languageStyle;
		if(this.state.existing) {
			codeArray = this.state.existingCodeObject.snipCode;
			languageStyle = this.state.existingCodeObject.language ? this.state.existingCodeObject.language : 'JavaScript';
		} else {
			codeArray = this.state.newCodeObject.snipCode;
			languageStyle = this.state.newCodeObject.language  ? this.state.newCodeObject.language : 'JavaScript';
		}
		if(!codeArray) {
			return <div>No code...</div>
		}

		// console.log(languageStyle.toLowerCase());

		let langClass = `language-${languageStyle.toLowerCase()}`;
		let prismProp;
		switch(languageStyle) {
			case 'CSS':
			case 'css':
				prismProp = 'css';
				langClass = "language-css"
				break;
			case 'HTML':
			case 'html':
				prismProp = 'html';
				langClass = "language-html"
				break;
			case 'JavaScript':
			case 'Javascript':
			case 'javaScript':
				prismProp = "javascript";
				langClass = "language-javascript";
				break;
			case 'PHP':
			case 'php':
			case 'Php':
				prismProp = 'clike';
				langClass = "language-php";
				break;
			case 'Python':
				prismProp = 'clike';
				langClass = "language-python";
				break;

			default:
				prismProp = 'javascript';
				langClass = 'language-javascript';
				break;
		}

		 
		// let langClass = "language-javascript";
		return (

			<pre>
				<code className={`${langClass}`}>
					{codeArray.map((line) => {
						// const html = Prism.highlight(line, Prism.languages.javascript);
						const html = Prism.highlight(line, Prism.languages[prismProp]);
						return (

							<div key={Math.floor(Math.random()*10000000000)}
								dangerouslySetInnerHTML={this.createMarkup(html)}></div>
						);
					})}
				</code>
			</pre>
		)
	}

	saveCodeObject() {

		this.props.saveNewCodeObject(this.state.newCodeObject)
		this.setState({
			...this.state, 
			newCodeObject: {
				id: generateID(),
				term: '',
				description: '', 
				language: '',
				snipRawCode: '',
				snipRawTags: '', 
				snipTags: [],
				snipCode: []
			}
		})	
	}

	updateCodeObject() {
		this.props.updateCodeObject(this.state.existingCodeObject)
		this.setState({
			...this.state,
			existing: false,
			existingCodeObject: {
				id: 0,
				term: '',
				description: '', 
				language: '',
				snipRawCode: '',
				snipRawTags: '', 
				snipTags: [],
				snipCode: []
			}
		})
	}

	deleteCodeObject(id) {

		if(window.confirm("Are you sure you want to delete this item?")){
			this.props.deleteCodeObject(id)
			this.setState({
				...this.state,
				existing: false,
				existingCodeObject: {
					id: 0,
					term: '',
					description: '', 
					language: '',
					snipRawCode: '',
					snipRawTags: '', 
					snipTags: [],
					snipCode: []
				}
			})
		} 

	}

	loadExistingCodeObject(id) {
		let code_obj = this.props.my_code.library.filter(obj => obj.id === id)[0];
		if(code_obj.hasOwnProperty('snippets')) {
			this.setState({
				...this.state,
				existing: true,
				existingCodeObject: {
					id: code_obj.id,
					term: code_obj.term,
					description: code_obj.definition,
					language: '',
					snipRawCode: code_obj.snippets[0].code.join('\n'),
					snipRawTags: code_obj.snippets[0].tags.join(', '),
					snipCode: code_obj.snippets.code,
					snipTags: code_obj.snippets.tags
				}
			})	
		} else {
			this.setState({
				...this.state,
				existing: true,
				existingCodeObject: {
					id: code_obj.id,
					term: code_obj.term,
					description: code_obj.description,
					language: code_obj.language,
					snipRawCode: code_obj.snipRawCode,
					snipRawTags: code_obj.snipRawTags,
					snipCode: code_obj.snipCode ? code_obj.snipCode : [],
					snipTags: code_obj.snipTags ? code_obj.snipTags : []
				}
			})
		}
	}

	// preventTab(e) {
	// 	// e.keyCode == 9 && e.preventDefault()
	// 	if(e.keyCode == 9) {
	// 		e.preventDefault()
	// 	}
	// 	console.log(e);
	// 	let self = e.target;
	// 	let val = self.value;
	// 	let start = self.selectionStart;
	// 	let end = self.selectionEnd;

	// 	let textValue = val.substring(0, start) + '\t' + val.substring(end);
	// 	self.selectionStart = self.selectionEnd = start + 1
	// 	console.log(textValue);
	// 	if(this.state.existing) {
	// 		this.setState({
	// 			...this.state, 
	// 			existingCodeObject: {
	// 				...this.state.existingCodeObject,
	// 				snipRawCode: textValue
	// 			}
	// 		})
	// 	}
	// }

	renderCodeInputs() {
		if(!this.state.existing) {
			let existing = false;
			return (
				<div className="row">
					<h5>Create New Code Snippet</h5>
					<div className="input-field col s6">
			        	<input type="text"
			        			onChange={(e) => this.changeInput('newCodeObject', existing, "term", e.target.value)}
			        			value={this.state.newCodeObject.term}
			        			/>
			        	<label htmlFor="term">Term</label>
			        </div>
			        <br />
	        		<div className="input-field col s9">
	                	<textarea className="materialize-textarea" type="text"
	                				onChange={(e) => this.changeInput('newCodeObject', existing, "description", e.target.value)}
	                				value={this.state.newCodeObject.description}
	                	></textarea>
	                	<label htmlFor="term">Description</label>
	                </div>
	                <br />
    				<div className="input-field col s6">
			        	<input type="text"
			        			onChange={(e) => this.changeInput('newCodeObject', existing, "language", e.target.value)}
			        			value={this.state.newCodeObject.language}
			        			/>
			        	<label htmlFor="language">Language</label>
			        </div>
			        <br />
			        <div className="input-field col s9">
	                	<textarea className="materialize-textarea" type="text"
	                				onChange={(e) => this.changeInput('newCodeObject', existing, "snippet", e.target.value)}
	                				value={this.state.newCodeObject.snipRawCode}
	                				onKeyDown={(e) => e.keyCode == 9 && e.preventDefault()}
	                	></textarea>
	                	<label htmlFor="term">Code Snippets</label>
	                </div>
	                <div className="input-field col s6">
			        	<input type="text"
			        			onChange={(e) => this.changeInput('newCodeObject', existing, "tags", e.target.value)}
			        			value={this.state.newCodeObject.snipRawTags}
			        			/>
			        	<label htmlFor="term">Tags</label>
			        </div>
	                <div className="col s12">
	                <a className="waves-effect waves-light btn"
	                	onClick={() => this.saveCodeObject()}
	                	>Save Snippet
	                </a>
	                </div>
				</div>

			)	
		} else {
			let existing = true;
			return (
				<div className="row">
					<h5>Create New Code Snippet</h5>
					<div className="input-field col s6">
			        	<input type="text"
			        			onChange={(e) => this.changeInput('existingCodeObject', existing, "term", e.target.value)}
			        			value={this.state.existingCodeObject.term}
			        			/>
			        	<label className="active" htmlFor="term">Term</label>
			        </div>
			        <br />
	        		<div className="input-field col s9">
	                	<textarea className="materialize-textarea" type="text"
	                				onChange={(e) => this.changeInput('existingCodeObject', existing, "description", e.target.value)}
	                				value={this.state.existingCodeObject.description}
	                	></textarea>
	                	<label className="active" htmlFor="term">Description</label>
	                </div>
	                <br />
    				<div className="input-field col s6">
			        	<input type="text"
			        			onChange={(e) => this.changeInput('existingCodeObject', existing, "language", e.target.value)}
			        			value={this.state.existingCodeObject.language}
			        			/>
			        	<label className="active" htmlFor="language">Language</label>
			        </div>
			        <br />
			        <div className="input-field col s9">
	                	<textarea className="materialize-textarea" type="text"
	                				onChange={(e) => this.changeInput('existingCodeObject', existing, "snippet", e.target.value)}
	                				value={this.state.existingCodeObject.snipRawCode}
	                				onKeyDown={(e) => e.keyCode == 9 && e.preventDefault()}
	                	></textarea>
	                	<label className="active" htmlFor="term">Code Snippets</label>
	                </div>
	                <div className="input-field col s6">
			        	<input type="text"
			        			onChange={(e) => this.changeInput('existingCodeObject', existing, "tags", e.target.value)}
			        			value={this.state.existingCodeObject.snipRawTags}
			        			/>
			        	<label className="active" htmlFor="term">Tags</label>
			        </div>
	                <div className="col s12">
	                <a className="waves-effect waves-light btn"
	                	onClick={() => this.updateCodeObject()}
	                	>Update Snippet
	                </a>
	                <a className="waves-effect waves-light btn orange  cancel"
	                	onClick={() => {this.setState({existing: false})}}>Cancel</a>
	                <a className="waves-effect waves-light btn red lighten-1  cancel"
	                	onClick={() => this.deleteCodeObject(this.state.existingCodeObject.id)}>Delete</a>
	                </div>
				</div>

			)
		}
		
	}


	changeInput(codeType, existing, property, value) {
		let info = {
			...this.state[codeType]
		}
		if(property != 'snippet' && property != 'tags') {
			info[property] = value;
		} else if(property == 'snippet') {
			// let array = value.split('\n')
			// info['snipCode'] = array;
			info['snipRawCode'] = value;
		} else if(property == 'tags') {
			// let array = value.split(', ');
			// info['snipTags'] = array;
			info['snipRawTags'] = value;
		}

		info['snipCode'] = info['snipRawCode'] ? [...info['snipRawCode'].split('\n')] : [];
		info['snipTags'] = info['snipRawTags'] ? [...info['snipRawTags'].split(',')] : [];

		let fakeState = {...this.state};
		fakeState[codeType] = info;

		this.setState({
			...fakeState
		});
	}

	// Show list of code concepts in the collections list and sorts by alphabetical order
	renderCodeList() {
		if(this.props.my_code) {
			let sorted = this.props.my_code.library.sort((a,b) => a.term.toLowerCase() > b.term.toLowerCase() ? 1 : b.term.toLowerCase() > a.term.toLowerCase() ? -1 : 0)
			// this.props.my_code.library
			return sorted.map(obj => {
				let language = languageIdentifier(obj.language);

				
				return (
					<li className="collection-item" 
						key={obj.id} 
						onClick={() => this.loadExistingCodeObject(obj.id)}>{obj.term} 
						<span className={`list-lang cm-${language}`}>{language}</span>
					</li>
				)
			})	
		}
		
	}

	render() {
		return (
			<div className="js-helper-main">
				<h1>Code Editor!</h1>
				<div className="row">
					<div className="main-editor col s8">
						{this.renderCodeInputs()}
					</div>
					<div className="main-collection col s4">
						<ul className="collection">
							{this.renderCodeList()}
						</ul>
					</div>
				</div>
				<div className="row finished-code">
					
					<div className="col s12">
						<h5>Code Snippet</h5>
						<div><strong>Tags: </strong>{this.renderTags()}</div>
					</div>
					<div className="col s12">
						<strong>Code:</strong>	
					</div>
					
					<div className="main-code-block col s9">
						{this.renderCode()}
					</div>
				</div>
			</div>
		);
	}

}


function mapStateToProps(state) {
	return {
		my_code: state.my_code
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCodeLibrary, 
		changeInputValue, 
		saveNewCodeObject,
		updateCodeObject,
		deleteCodeObject
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);