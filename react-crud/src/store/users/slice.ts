import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserwithId extends User {
	id: UserId;
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
		github: "Brenda",
	},
	{
		id: "3",
		name: "Kevin",
		email: "kevin@gmail.com",
		github: "Kevin",
	},
];

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
	},
});

export default usersSlice.reducer;
export const { deleteUserById } = usersSlice.actions;