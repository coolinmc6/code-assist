import { combineReducers } from 'redux';
import CodeAssistReducer from './code_assist_reducer';
import CodeReducer from './code_editor_reducer'

const rootReducer = combineReducers({	
	code_blocks: CodeAssistReducer,
	my_code: CodeReducer
});	
	
export default rootReducer;