import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress(): void;
  backgroundColor: string;
  showWarning: boolean | undefined;
  warningMessage: string;
  isValid: boolean | undefined;
}

const Button = ({
  title,
  onPress,
  backgroundColor,
  showWarning,
  warningMessage,
  isValid,
}: ButtonProps) => (
  <>
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.checkButton,
          {
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
    {showWarning && (
      <Text style={isValid ? styles.validText : styles.inValidText}>
        {warningMessage}
      </Text>
    )}
  </>
);

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "900",
    color: "#fff",
  },
  checkButton: {
    backgroundColor: "#3f73d3",
    borderRadius: 15,
    margin: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "900",
  },
  validText: {
    color: "green",
    textAlign: "center",
  },
  inValidText: {
    color: "red",
    textAlign: "center",
  },
});

export default Button;
