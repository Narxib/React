import {type Middleware, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";

const syncWithDatabase: Middleware = store =>next=>action=>{
	const {type,payload} = action
	console.log({type,payload})
	console.log(store.getState())
	next(action)
}

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;