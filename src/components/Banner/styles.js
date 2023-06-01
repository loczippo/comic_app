import {
    StyleSheet, Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
    cardView: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: width,
        height: 200,
    },
    dotView: {
        flexDirection: "row",
        justifyContent: "center",
    },
});