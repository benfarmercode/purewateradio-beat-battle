import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Colors } from '@/constants/Colors';

interface TextFontProps {
    text: string;
    fontSize?: 'sm' | 'med' | 'smed' | 'large' | 'xl' | '2xl'; // restrict fontSize to specific options
    color?: string | null,
}

const TextFont: React.FC<TextFontProps> = ({ text, fontSize, color = null }) => {

    const { height, width } = useWindowDimensions();

    let fontSizeStyle: number;

    if (width < 768) {
        switch (fontSize) {
            case 'sm':
                fontSizeStyle = 12;  // small size
                break;
            case 'med':
                fontSizeStyle = 20;  // medium size
                break;
            case 'large':
                fontSizeStyle = 32;  // large size
                break;
            case 'xl':
                fontSizeStyle = 80;  // extra-large size
                break;
            case '2xl':
                fontSizeStyle = 150;  // extra-large size
                break;
            default:
                fontSizeStyle = 16;  // default to medium if none is passed
        }
    }
    else {
        switch (fontSize) {
            case 'sm':
                fontSizeStyle = 16;  // small size
                break;
            case 'med':
                fontSizeStyle = 32;  // medium size
                break;
            case 'large':
                fontSizeStyle = 64;  // large size
                break;
            case 'xl':
                fontSizeStyle = 128;  // extra-large size
                break;
            case '2xl':
                fontSizeStyle = 220;  // extra-large size
                break;
            default:
                fontSizeStyle = 16;  // default to medium if none is passed
        }
    }

    // const darkBlue = '#272E72';
    // const red = '#D8322C';
    // const yellow = '#EFBD50';
    // const gray = '#F5F4F1';
    // const blue = '#396F84';

    // let textColor = ''

    // switch (color) {
    //     case 'black':
    //         textColor = Colors.black;
    //         break;
    //     case 'white':
    //         textColor = Colors.white;
    //         break;
    //     case 'darkBlue':
    //         textColor = Colors.darkBlue;
    //         break;
    //     case 'red':
    //         textColor = Colors.red;
    //         break;
    //     default:
    //         textColor = Colors.red;
    //         break;
    // }
    color = color ? color : Colors.white;

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontFamily: 'BNRoute22', fontSize: fontSizeStyle, textAlign: 'center', color: color }]}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper:{
        flexShrink: 1,
    },
    textStyle: {
        wordWrap: 'wrap',
        flexWrap: 'wrap',
    },
})

export default TextFont;
