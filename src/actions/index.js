import { 
	UPDATE_SEARCH,
	FETCH_LIBRARY,
	CHANGE_PAGE,
	CHANGE_FOCUS,
	FETCH_CODE_LIBRARY,
	CLICK_COLLECTION_ITEM,
	CHANGE_INPUT,
	SAVE_NEW_CODE_OBJECT,
	UPDATE_EXISTING_CODE_OBJECT,
	DELETE_CODE_OBJECT
} from './types';

import axios from 'axios';

// JSON SERVER VARIABLES
const port = 3004;
const codeEditorURL = `http://localhost:${port}/code`;

///////////////////////////////////////////////////////////////////////////////////////////////////
// JavaScript Helper

export function updateSearch(text) {
	return {
		type: UPDATE_SEARCH,
		payload: text
	}
}


export function fetchLibrary()  {
	const rand = Math.floor(Math.random()*1000000)
	// const url = `https://raw.githubusercontent.com/coolinmc6/react-playground/master/library.json?${rand}`;
	const url = `http://localhost:3004/code`
	const request = axios.get(url);

	return {
		type: FETCH_LIBRARY,
		payload: request
	}
}

export function changePage(id) {
	return {
		type: CHANGE_PAGE,
		payload: id
	}
}

export function changeFocus(bool) {
	return {
		type: CHANGE_FOCUS,
		payload: bool
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////
// Code Editor

export function fetchCodeLibrary()  {
	const rand = Math.floor(Math.random()*1000000)
	const url = `http://localhost:3004/code`
	const request = axios.get(url);

	return {
		type: FETCH_CODE_LIBRARY,
		payload: request
	}
}

export function changeCodeObject(id) {

	return {
		type: CLICK_COLLECTION_ITEM,
		payload: id
	}
}

export function changeInputValue(prop, value) {
	return {
		type: CHANGE_INPUT,
		payload: value,
		prop: prop
	}
}

export function saveNewCodeObject(code_obj) {

	const request = axios.post(codeEditorURL, code_obj)
		.then(function(res) {
			console.log("SUCCESS")
		})
		.catch(function(res) {
			console.log("FAIL: ", res);
		})

	return {
		type: SAVE_NEW_CODE_OBJECT,
		payload: code_obj
	}
}

export function updateCodeObject(code_obj) {
	const url = `${codeEditorURL}/${code_obj.id}`
	const request = axios.put(url, code_obj)
		.then(function(res) {
			// console.log(res)
		})
		.catch(function(res) {
			console.log("FAIL:", res)
		});

	return {
		type: UPDATE_EXISTING_CODE_OBJECT,
		payload: code_obj
	}
}

export function deleteCodeObject(id) {
	const url = `${codeEditorURL}/${id}`

	const request = axios.delete(url, id)
		.then(function(res) {
			// console.log(res)
		})
		.catch(function(res) {
			console.log("FAIL:", res)
		});
	return {
		type: DELETE_CODE_OBJECT,
		payload: id
	}
}