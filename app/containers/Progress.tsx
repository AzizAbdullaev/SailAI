import { useEffect } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedProps,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
import { CIRCUMFERENCE, DURATION, PROGRESSBAR_COLORS, RADIUS } from "app/utils/constants";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const Progress = () => {
	const strokeOffset = useSharedValue(CIRCUMFERENCE);

	const percentage = useDerivedValue(() => {
		const number = ((CIRCUMFERENCE - strokeOffset.value) / CIRCUMFERENCE) * 100;
		return withTiming(number, { duration: DURATION });
	});

	const strokeColor = useDerivedValue(() => {
		return interpolateColor(percentage.value, [0, 50, 100], PROGRESSBAR_COLORS);
	});

	const animatedCircleProps = useAnimatedProps<object>(() => {
		return {
			strokeDashoffset: withTiming(strokeOffset.value, { duration: DURATION }),
			stroke: strokeColor.value,
		};
	});

	const animatedTextProps = useAnimatedProps<object>(() => {
		return {
			text: `${Math.round(percentage.value)} %`,
		};
	});

	useEffect(() => {
		strokeOffset.value = 0;
	}, []);

	return (
		<View style={styles.container}>
			<AnimatedText style={styles.wrapper} animatedProps={animatedTextProps} />
			<Svg height="50%" width="50%" viewBox="0 0 100 100">
				<Circle cx="50" cy="50" r="45" stroke="#E7E7E7" strokeWidth="10" fill="transparent" />
				<AnimatedCircle
					animatedProps={animatedCircleProps}
					cx="50"
					cy="50"
					r="45"
					strokeDasharray={`${RADIUS * Math.PI * 2}`}
					strokeWidth="10"
					fill="transparent"
				/>
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	wrapper: {
		color: "#2776f5",
		fontSize: 24,
		fontWeight: "bold",
		position: "absolute",
	},
});

export default Progress;
