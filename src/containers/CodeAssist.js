import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSearch, fetchLibrary, changePage, changeFocus } from '../actions/index';
import { languageIdentifier, prismLanguage } from '../helpers/Helpers'

import '../css/prism.css';

import Prism from 'prismjs';


class JSHelper extends Component {
	componentDidMount() {
		this.props.fetchLibrary();
	}

	createMarkup(html) {
	  return {__html: html};
	  // const code = "const data = { data: ['1,2,3,4,5] }";
	  // const html = Prism.highlight(code, Prism.languages.javascript);
	  // <div dangerouslySetInnerHTML={this.createMarkup(html)} />
	}



	renderCode(codeBlock) {
		let language = codeBlock.language ? languageIdentifier(codeBlock.language) : 'javascript';
		let prism = prismLanguage(language);
		return codeBlock.snipCode.map((line) => {
			let text = line == "" ? " " : line;
			const html = Prism.highlight(text, Prism.languages[prism]);
			return (
				<div key={Math.floor(Math.random()*10000000)}
					dangerouslySetInnerHTML={this.createMarkup(html)}></div>
			);
		})
	}

	renderTags(tags) {

		return tags.map(tag => {
			return(
				<div className="chip" key={Math.floor(Math.random()*10000)}>{tag}</div>
			) 
		})
	}

	renderExamples(codeBlock) {
		let language = prismLanguage(languageIdentifier(codeBlock.language));
		console.log(language)
		return (
			<div key={Math.floor(Math.random()*10000000)} className="code-block">
				<pre><code className={`language-${language}`}>
					{this.renderCode(codeBlock)}
				</code></pre>
			</div>
		)
		
	}


	//=============================================================================================
	// Renders All Search Results
	//
	//  

	renderAllSearch() {
		if(this.props.code_blocks.search === '') {
			return <div>Enter a programming function, concept, or keyword above</div>
		} 
		else if(!this.props.code_blocks.focus) {
			return;
		}
		return (
			<div>
				<h6 className="search-header">Concepts and Methods</h6>
				<div>{this.renderSearch()}</div>
				<h6 className="search-header">Tags and Descriptors</h6>
				<div>{this.renderKeywords()}</div>
			</div>
		)
	}

	//=============================================================================================
	// Renders Concept search results: TOP LEVEL item
	renderSearch() {
		if(this.props.code_blocks.search === '') {
			return <div>Enter a search term above</div>
		} else if(this.props.code_blocks.list.length === 0) {
			return <div>0 Results</div>
		}
		// else if(!this.props.code_blocks.focus) {
		// 	return;
		// }
		return this.props.code_blocks.list.map((item) =>  {
			const regex = new RegExp(this.props.code_blocks.search, 'gi');
			const language = 'cm-' + languageIdentifier(item.language);
			const langSpan = `<span class="list-lang ${language}">${item.language}</span>`;
			const final = item.term.replace(regex, `<span class="special">${this.props.code_blocks.search}</span>`) + langSpan;

			const rand = Math.floor(Math.random()*1000000)
			return (
				<div dangerouslySetInnerHTML={{__html: final}} 
					className="search-result" key={item.id} 
					onClick={() => this.props.changePage(item.id)}>
				</div>
			)
		});
	}

	//=============================================================================================
	// Renders Keyword & Tag search results: tags
	// I need to change this => you are narrowing down a list of tags and then within those tags
	// there could be a number of items that have that tag. How do I list multiple items for each tag?
	renderKeywords() {
		if(this.props.code_blocks.search === '') {
			return;
		} else if(this.props.code_blocks.keywords.length === 0) {
			return <div>0 Results</div>
		} 
		// else if(!this.props.code_blocks.focus) {
		// 	return;
		// }
		return this.props.code_blocks.keywords.map(item => {
			const regex = new RegExp(this.props.code_blocks.search, 'gi');
			const language = 'cm-' + languageIdentifier(item.language);
			const langSpan = `<span class="list-lang ${language}">${item.language}</span>`;

			const final = item.tag.replace(regex, `<span class="special">${this.props.code_blocks.search}</span>`) + langSpan;

			const rand = Math.floor(Math.random()*1000000)
			return (
				<div className="search-result" key={rand} 
					onClick={() => this.props.changePage(item.id)}
					dangerouslySetInnerHTML={{__html: final}}></div>
			)
		})
	}


	// Renders the term or concept, definition, and code examples
	renderPage() {
		if(this.props.code_blocks.page.length > 0) {
			const item = this.props.code_blocks.page[0]
			const languageTag = languageIdentifier(item.language);
			const langClass = `big-tag list-lang cm-${languageTag}`;
			return (
				<div className="concept-page" key={item.id}>
					<span className="close" onClick={() => this.props.changePage(0)}>&times;</span>
					<h4>{item.term}</h4>
					<p className="term-definition">{item.description}</p>
					
					<div className="code-examples">
						<span className={langClass}>{item.language}</span>
						<div className="code-tags">{this.renderTags(item.snipTags)}</div>
						{this.renderExamples(item)}
					</div>
				</div>
			)	
		}
	}

	setDelay(fn, val) {
		setTimeout(fn(val), 250);
	}



	render() {
		return (
			<div className="js-helper-main">
				
				<div className="container">
					<input type="text" className="search" placeholder="Programming concept or function" 
						value={this.props.code_blocks.search}
						onChange={(e) => this.props.updateSearch(e.target.value)}
						// onFocus={() => this.props.changeFocus(true)}
						onFocus={() => setTimeout(() => this.props.changeFocus(true), 50)}
						// onBlur={() => this.props.changeFocus(false)}
						 onBlur={() =>  setTimeout(() => this.props.changeFocus(false), 150)} />
					<div className="results">
						{this.renderAllSearch()}
					</div>
					<div>
						{this.renderPage()}
					</div>	
				</div>
			</div>
		);
	}

}


function mapStateToProps(state) {
	return {
		code_blocks: state.code_blocks
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ updateSearch, fetchLibrary, changePage, changeFocus }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(JSHelper);