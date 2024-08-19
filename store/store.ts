import { combineReducers, createStore, Reducer } from 'redux';
import userReducer from '@/reducers/userReducer';
import { Task } from '@/types';


// Define the shape of your current data state
interface DataState {
	tasks: Task[];
	modalOpen: boolean
}


// Define the shape of your root state
interface RootState {
	currentData: DataState;
}

export const rootReducer = combineReducers({
	currentData: userReducer
})

export const store = createStore(rootReducer);

// Export the RootState type
export type { RootState };