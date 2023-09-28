import { StyleSheet, View, ScrollView } from "react-native";
import { DraxProvider } from "react-native-drax";
import Button from "../components/Button";
import WordWrapper from "../components/WordWrapper";
import { DRAG_AREA_TEXT } from "app/utils/constants";
import { wordsSlice } from "app/store/reducers/WordSlice";
import { useAppDispatch, useAppSelector } from "app/hooks/redux";
import DragArea from "app/components/DragArea";

const WordsPage = () => {
	const { words, stagedText, showWarning, isValid, warningMessage, buttonBGColor } = useAppSelector(
		state => state.wordReducer,
	);
	const { checkWords } = wordsSlice.actions;
	const dispatch = useAppDispatch();

	return (
		<ScrollView>
			<DraxProvider>
				<View style={styles.palette}>
					{words.map((item, index) => (
						<WordWrapper name={item} key={index} active={!!stagedText.find(el => el === item)} />
					))}
				</View>
				<DragArea stagedText={stagedText} title={DRAG_AREA_TEXT} />
				<View style={styles.buttonWrapper}>
					<Button
						title="Check"
						onPress={() => dispatch(checkWords())}
						backgroundColor={buttonBGColor}
						showWarning={showWarning}
						warningMessage={warningMessage}
						isValid={isValid}
					/>
				</View>
			</DraxProvider>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	palette: {
		marginTop: 10,
		paddingHorizontal: 50,
		justifyContent: "space-between",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	buttonWrapper: { marginBottom: 20 },
});

export default WordsPage;
