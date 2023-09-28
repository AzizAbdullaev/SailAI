import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { setupStore } from "app/store/store";
import { expo as appName } from "./app.json";
import Main from "./app/containers/index";

const store = setupStore();

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

AppRegistry.registerComponent(appName.name, () => App);
