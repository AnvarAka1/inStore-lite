import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/auth";

export default initialState => {
	const reducers = combineReducers({
		auth: authReducer
	});

	const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

	// if reducers were changed, reload with initial state
	if (module.hot) {
		module.hot.accept("./reducers/auth.js", () => {
			const createNextReducer = require("./reducers/auth").default;
			store.replaceReducer(createNextReducer(initialState));
		});
	}
	return store;
};
