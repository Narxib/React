import { addNewUser, deleteUserById, User, UserId } from "../store/users/slice";
import { useAppDispatch } from "./store";
import { toast } from "sonner";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const addUser = ({name,email,github}:User) =>{
		dispatch(addNewUser({name,email,github}))
		toast.success('User created')
	}
	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};
	return { addUser,removeUser };
};