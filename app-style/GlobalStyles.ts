import { StyleSheet } from "react-native"
import { Colors } from "@/constants/Colors"

const gray = '#F5F4F1';
const darkBlue = '#272E72';
const yellow = '#EFBD50';
const red = '#D8322C';
const blue = '#396F84';

export default StyleSheet.create({
    container: {
        flex: 1,
        // padding: 0,
        // gap: 5,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    name: {
        fontWeight: 500,
        marginTop: 10,
    },
    inputs: {
        flexDirection: 'row'
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    inputWrapper: {
        justifyContent: 'center',
    },

    adminControl: {
        padding: 20,
        backgroundColor: gray,
        borderColor: darkBlue,
        borderWidth: 5,
        gap: 20,
        // alignItems: 'flex-end',
        height: '100%',
        flex: 1,
    },

    grayBackground: {
        backgroundColor: gray
    },
    darkBlueBackground: {
        backgroundColor: darkBlue
    },
    yellowBackground: {
        backgroundColor: yellow
    },
    redBackground: {
        backgroundColor: red
    },
    blueBackground: {
        backgroundColor: blue
    },
    grayText: {
        color: gray
    },
    darkBlueText: {
        color: darkBlue
    },
    yellowText: {
        color: yellow
    },
    redText: {
        color: red
    },
    blueText: {
        color: blue
    },
    
})