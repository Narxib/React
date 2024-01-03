import "./App.css";
import ListofUsers from "./components/ListofUsers";
import { CreateNewUser } from "./components/CreateNewUser";

function App() {
	return (
		<>
			<h1>Project</h1>
			 <ListofUsers />
			 <CreateNewUser/>
		</>
	);
}

export default App;
