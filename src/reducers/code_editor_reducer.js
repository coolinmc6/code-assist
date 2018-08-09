import {
	FETCH_CODE_LIBRARY,
	CLICK_COLLECTION_ITEM,
	CHANGE_INPUT,
	SAVE_NEW_CODE_OBJECT,
	UPDATE_EXISTING_CODE_OBJECT,
	DELETE_CODE_OBJECT
} from '../actions/types';

const defaultJSNotes = {
	library: [],		// the library => all my code
	id: 'new',				// current ID
	term: '',			// the term input field
	definition: '',		// the definition text area
	languages: [],		// the languages the code is relevant for
	snippets: []		// the code snippets
};

export default function(state = defaultJSNotes, action) {
	switch(action.type) {
		case FETCH_CODE_LIBRARY:
			// console.log(action.payload.data)
			return {
				...state, 
				library: [...action.payload.data]
			}
		case CLICK_COLLECTION_ITEM:
			return {
				...state,
				id: action.payload
			}
		case CHANGE_INPUT:
			let prop = action.prop
			return {
				...state,
				prop: action.value
			}
		case SAVE_NEW_CODE_OBJECT:

			return {
				...state,
				library: [...state.library, action.payload]
			}
		case UPDATE_EXISTING_CODE_OBJECT:
			const updatedIndex = state.library.findIndex(item => item.id === action.payload.id)
			return {
				...state, 
				library: [
					...state.library.slice(0,updatedIndex),
					action.payload,
					...state.library.slice(updatedIndex+1)
				]
			}
		case DELETE_CODE_OBJECT:
			const removeIndex = state.library.findIndex(item => item.id === action.payload)
			return {
				...state, 
				library: [
					...state.library.slice(0, removeIndex),
					...state.library.slice(removeIndex+1)
				]
			}
		default:
			return state;
	}
}