// Implemented/managed Dark and Light Theme
import {DefaultTheme } from "@react-navigation/native";
const LightTheme = {
    ...DefaultTheme,
    Colors:{
        ...DefaultTheme.colors,
        backgroundColor: '#f5f5f5',
        borderColor: '#ccc',
        background:"#fff",
        titleColor:"#333",
        profileBackground:"#f8f8f8",
        placeholderTextColor:"#333"
    }
};

const DarkTheme = {
    ...DefaultTheme,
    Colors:{
        ...DefaultTheme.colors,
        backgroundColor: '#f5f5f5',
        borderColor: '#ccc',
        background:"#fff",
        titleColor:"#333",
        profileBackground:"#f8f8f8",
        placeholderTextColor:"#333"
    }
}

export { LightTheme, DarkTheme };