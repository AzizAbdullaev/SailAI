import { StyleSheet, View, Text, ViewStyle, TouchableOpacity } from "react-native";
import { DraxView, DraxViewDragStatus, DraxSnapbackTargetPreset } from "react-native-drax";
import { useAppDispatch } from "app/hooks/redux";
import { wordsSlice } from "app/store/reducers/WordSlice";

interface ClearButtonProps {
	onPress(): void;
}

interface DragAreaProps {
	title: string;
	stagedText: string[];
}

const ClearButton = ({ onPress }: ClearButtonProps) => (
	<View style={styles.overlay}>
		<TouchableOpacity onPress={onPress}>
			<View style={styles.trashButton}>
				<Text style={styles.buttonText}>X</Text>
			</View>
		</TouchableOpacity>
	</View>
);

const DragArea = ({ stagedText, title }: DragAreaProps) => {
	const { setStagedText, clearStage } = wordsSlice.actions;
	const dispatch = useAppDispatch();
	return (
		<DraxView
			dragPayload={{ text: stagedText.join(" ") }}
			draggable={false}
			style={styles.stagingLayout}
			renderContent={({ viewState }) => {
				const receivingDrag = viewState?.receivingDrag;
				const incomingText = receivingDrag?.payload?.text;

				return (
					<View style={[styles.centeredContent, styles.stagingZone]}>
						<Text style={styles.incomingText}>{incomingText || "-"}</Text>
						{stagedText.length > 0 ? (
							<Text style={styles.received}>{stagedText.join(" ")}</Text>
						) : (
							<Text style={styles.instruction}>{title}</Text>
						)}
						{stagedText.length > 0 && <ClearButton onPress={() => dispatch(clearStage())} />}
					</View>
				);
			}}
			renderHoverContent={({ viewState }) => {
				const combinedStyles: ViewStyle[] = [styles.centeredContent, styles.textBlock];
				if (viewState.grabOffset) {
					combinedStyles.push({
						marginLeft: viewState.grabOffset.x - 40,
						marginTop: viewState.grabOffset.y - 30,
					});
				}
				if (viewState.dragStatus === DraxViewDragStatus.Dragging) {
					combinedStyles.push(styles.hoverDragging);
				}
				return (
					<View style={combinedStyles}>
						<Text style={styles.stagedCount}>{stagedText.length}</Text>
					</View>
				);
			}}
			onReceiveDragDrop={event => {
				const { text } = event.dragged.payload ?? {
					text: "?",
				};

				dispatch(setStagedText([...stagedText, text]));
				return DraxSnapbackTargetPreset.None;
			}}
			longPressDelay={200}
		/>
	);
};

const styles = StyleSheet.create({
	centeredContent: {
		justifyContent: "center",
		alignItems: "center",
	},
	textBlock: {
		width: 80,
		height: 60,
		borderRadius: 10,
		margin: 8,
		backgroundColor: "#e3e3e3",
	},
	hoverDragging: {
		borderColor: "#8eb6f7",
		backgroundColor: "#fff",
		borderWidth: 2,
	},
	stagingLayout: {
		margin: 8,
	},
	stagingZone: {
		height: 350,
		borderRadius: 10,
		backgroundColor: "#D2D4D6",
	},
	incomingText: {
		marginTop: 10,
		fontSize: 24,
	},
	received: {
		marginTop: 10,
		fontSize: 18,
	},
	instruction: {
		marginTop: 10,
		fontSize: 12,
		fontStyle: "italic",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	trashButton: {
		width: 30,
		height: 30,
		backgroundColor: "#ff6a6a",
		borderRadius: 15,
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontWeight: "900",
		color: "#fff",
	},
	stagedCount: {
		fontSize: 18,
	},
});

export default DragArea;
