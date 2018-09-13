import {
	ENV,
	UPDATE_SEARCH, 
	FETCH_LIBRARY,
	CHANGE_PAGE,
	CHANGE_FOCUS
} from '../actions/types';

const defaultJSNotes = {
	focus: false,
	keywords: [],
	library: [],
	list: [],
	page: [],
	search: '',
	uniqueTags: []
};


export default function(state = defaultJSNotes, action) {
	switch(action.type) {
		case FETCH_LIBRARY:
			let temp = [];
			if(ENV == 'dev') {
				temp = [...action.payload.data];
			} else {
				temp = [...action.payload.data["code"]];
			}

			// let uniqueTags = [...temp.map(o => o.snipRawTags)].sort((a,b) => a - b)
			let uniqueTags = temp.reduce((acc, val) => acc.concat(val.snipTags), []).sort();
			
			return {
				...state,
				// library: [...action.payload.data["code"]]
				library: [...temp], 
				uniqueTags: [...uniqueTags]
			}
			
		case UPDATE_SEARCH:
			// if search term is blank, return empty array (otherwise it returns everything)
			if(action.payload === '') {
				return {
					...state, 
					keywords: [],
					list: [],
					search: ''
				};
			} else {
				const keywords = [];
				const list = [];
				state.library.map(parent => {
					if(parent.term.toLowerCase().includes(action.payload.toLowerCase())) {
						let obj2 = {id: parent.id, term: parent.term, language: parent.language}
						list.push(obj2);
					}
					return parent.snipTags.map(tag => {
						if(tag.toLowerCase().includes(action.payload.toLowerCase())) {
							var obj = {id: parent.id, tag: tag, language: parent.language}
							keywords.push(obj)		
						}
					});
				});
				
				const obj = {
					...state,
					keywords: keywords.slice(0,5),
					// list: state.library.filter(obj => obj.term.toLowerCase().includes(action.payload.toLowerCase()) && obj.term.toLowerCase() !== "template").slice(0,5), 
					list: list.slice(0,5),
					search: action.payload 
				}
				return obj;	
			}
		case CHANGE_PAGE:
			if(action.payload === 0) {
				return {
					...state,
					page: []
				}
			} else {
				return {
					...state,
					page: state.library.filter(obj => obj.id === action.payload)
				}
			}
		case CHANGE_FOCUS:
			if (action.payload === true) {
				return {
					...state,
					focus: true
				}
			} else {
				return {
					...state, 
					focus: false
				}
			}
		default:
			return state;
	}
};
