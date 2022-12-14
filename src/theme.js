import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const darkTheme = createTheme({
    components: {
        MuiListItemButton: {
            defaultProps: {
                disableTouchRipple: true,
            },
        },
    },
    palette: {
        mode: 'dark',
        background: {
            default: "#202124"
        },
        drawer: {
            light: "#41331C"
        },
        searchBar: {
            light: "rgba(241,243,244,.24)",
        },
        text: {
            default: "#f1f3f4",
        },
        border: {
            default: "#5f6368",
            shadow: "0 1px 2px 0 rgb(0 0 0 / 60%), 0 2px 6px 2px rgb(0 0 0 / 30%)"
        },
        icon: {
            light: "#8d8d8d"
        },
        custom: {
            border: "#fff",
            iconColor: "#fff",
            iconOpacity: "0.75",
            dialogText: "#e8eaed",
        },
        noteBg: {
            default: "",
            red: "#5C2B29",
            orange: "#614A19",
            yellow: "#635D18",
            green: "#345920",
            cyan: "#16504B",
            lightblue: "#2D555E",
            darkblue: "#1E3A5F",
            purple: "#42275E",
            pink: "#5B2245",
            brown: "#442F19",
            grey: "#3C3F43"
        }
    }
});

const lightTheme = createTheme({
    components: {
        MuiListItemButton: {
            defaultProps: {
                disableTouchRipple: true,
            },
        },
    },
    palette: {
        mode: 'light',
        background: {
            default: "hsl(0, 0%, 100%)"
        },
        drawer: {
            light: "#feefc3"
        },
        searchBar: {
            light: "#f1f3f4",
        },
        text: {
            default: "#000000a3",
        },
        border: {
            default: "#e0e0e0",
            shadow: "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)"
        },
        icon: {
            light: "#dddddd"
        },
        custom: {
            border: "#000",
            iconOpacity: "0.75",
            iconColor: "#202124",
            dialogText: "#202124",
        },
        noteBg: {
            default: "",
            red: "#F28B82",
            orange: "#FBBC04",
            yellow: "#FFF475",
            green: "#CCFF90",
            cyan: "#A7FFEB",
            lightblue: "#CBF0F8",
            darkblue: "#AECBFA",
            purple: "#D7AEFB",
            pink: "#FDCFE8",
            brown: "#E6C9A8",
            grey: "#E8EAED"
        }
    }
});

export const light = responsiveFontSizes(lightTheme);
export const dark = responsiveFontSizes(darkTheme);
