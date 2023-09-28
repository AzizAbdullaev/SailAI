import {
	TEXT_PLACEHOLDER,
	TRUE_SENTENCE,
	SUCCESS_BUTTON_TEXT,
	ERROR_BUTTON_TEXT,
	MAIN_COLOR,
	GREEN_COLOR,
	RED_COLOR,
} from "app/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	words: string[];
	isValid: boolean;
	showWarning: boolean;
	stagedText: string[];
	warningMessage: string;
	buttonBGColor: string;
}

const initialState: UserState = {
	words: TEXT_PLACEHOLDER,
	isValid: false,
	showWarning: false,
	stagedText: [],
	warningMessage: ERROR_BUTTON_TEXT,
	buttonBGColor: MAIN_COLOR,
};

export const wordsSlice = createSlice({
	name: "words",
	initialState,
	reducers: {
		checkWords(state) {
			const checkWords = TRUE_SENTENCE === state.stagedText.join(" ").toString();
			state.isValid = !!checkWords;
			state.warningMessage = !!checkWords ? SUCCESS_BUTTON_TEXT : ERROR_BUTTON_TEXT;
			state.showWarning = true;
			state.buttonBGColor = !!checkWords ? GREEN_COLOR : RED_COLOR;
		},
		setStagedText(state, action) {
			state.stagedText = action.payload;
		},
		clearStage(state) {
			state.stagedText = [];
			state.showWarning = false;
			state.buttonBGColor = MAIN_COLOR;
		},
	},
});
export default wordsSlice.reducer;
