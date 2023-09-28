import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Progress from "./Progress";
import WordsPage from "./Words";
import TrackingPage from "./Tracking";

type RootStackParamList = {
	"Word Collection Screen": undefined;
	"Dynamic Progress Animation": undefined;
	"Progress Tracking Screen": undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const Main = () => (
	<NavigationContainer>
		<Drawer.Navigator>
			<Drawer.Screen name="Word Collection Screen" component={WordsPage} />
			<Drawer.Screen name="Dynamic Progress Animation" component={Progress} />
			<Drawer.Screen name="Progress Tracking Screen" component={TrackingPage} />
		</Drawer.Navigator>
	</NavigationContainer>
);

export default Main;
