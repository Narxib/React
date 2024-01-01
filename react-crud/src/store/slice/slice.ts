import { createSlice } from "@reduxjs/toolkit";

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserwithId extends User {
	id: string;
}

const initialState: UserwithId[] = [
	{
		id: "1",
		name: "Brian",
		email: "brianzaragoza25@gmail.com",
		github: "Narxib",
	},
	{
		id: "2",
		name: "Brenda",
		email: "brenda@gmail.com",
		github: "@Brenda",
	},
	{
		id: "3",
		name: "Kevin",
		email: "kevin@gmail.com",
		github: "@Kevin",
	},
];

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

export default usersSlice.reducer;