import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { TASKS_PLACEHOLDER } from "app/utils/constants";

const Tracking = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{TASKS_PLACEHOLDER.map((item, index) => (
					<View key={index} style={styles.wrapper}>
						<Text style={styles.title}>{item.name}</Text>
						<Text style={styles.status}>{item.progress} to complete</Text>

						<View style={styles.progressWrapper}>
							<View style={[styles.progress, { width: `${item.progress}%` }]}></View>
						</View>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 10,
	},
	title: {
		fontSize: 24,
		color: "#136dfd",
	},
	status: {
		fontSize: 20,
		color: "#136dfd",
		marginTop: 5,
		fontWeight: "900",
	},
	wrapper: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 15,
		backgroundColor: "#fff",
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 5,
	},
	progress: {
		width: "90%",
		left: 0,
		position: "absolute",
		height: 20,
		backgroundColor: "#136dfd",
		borderRadius: 50,
	},
	progressWrapper: {
		height: 20,
		borderRadius: 50,
		backgroundColor: "#a0c5ff",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
});

export default Tracking;
