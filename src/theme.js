import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import { red, amber, grey } from "@mui/material/colors";

// A custom theme for this app
// const lightwTheme = createTheme({
//     type: "light",
//     palette: {
//         primary: {
//             main: "#FFF"
//         },
//         secondary: {
//             main: amber[500],
//             light: "#feefc3"
//         },
//         error: {
//             main: red.A400
//         },
//         background: {
//             default: "#FFF",
//             highlight: "#F1F3F4"
//         }
//     },
//     typography: {
//         overline: {
//             fontWeight: 500,
//             fontSize: "0.7rem"
//         }
//     },
//     shape: {
//         borderRadius: "0.5rem"
//     },
//     zIndex: {
//         appBar: 1200,
//         drawer: 1100
//     },
//     mixins: {
//         drawer: {
//             minWidth: 280
//         }
//     },
//     custom: {
//         palette: {
//             iconColor: "#5f6368",
//             itemBorderColor: "#DDDDDD",
//             iconHighlight: grey[900],
//             notesCheckbox: grey[700],
//             profilePopColor: "#FFF",
//             noteBackground: {
//                 default: "#0000",
//                 red: "#F28B82",
//                 orange: "#FBBC04",
//                 yellow: "#FFF475",
//                 green: "#CCFF90",
//                 cyan: "#A7FFEB",
//                 lightblue: "#CBF0F8",
//                 darkblue: "#AECBFA",
//                 purple: "#D7AEFB",
//                 pink: "#FDCFE8",
//                 brown: "#E6C9A8",
//                 grey: "#E8EAED"
//             },
//             noteColorCheck: "#0007",
//             labelBackground: "#0002"
//         }
//     }
// });

// const darkwTheme = createTheme({
//     type: "dark",
//     palette: {
//         primary: {
//             main: "#202124"
//         },
//         secondary1: {
//             main: amber[500],
//             light: "#41331C"
//         },
//         error: {
//             main: red.A400
//         },
//         background: {
//             default: "#202124",
//             highlight: "#535456"
//         },
//         text: {
//             primary: "#E8EAED",
//             secondary: "#FFFFFFDE"
//         }
//     },
//     typography: {
//         overline: {
//             fontWeight: 500,
//             fontSize: "0.7rem"
//         }
//     },
//     shape: {
//         borderRadius: "0.5rem"
//     },
//     zIndex: {
//         appBar: 1200,
//         drawer: 1100
//     },
//     mixins: {
//         drawer: {
//             minWidth: 280
//         }
//     },
//     
// });



const darkTheme = createTheme({
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
        }
    },
    custom: {
        palette: {
            iconColor: "#949596",
            itemBorderColor: "#5F6368",
            profilePopColor: "#2D2E30",
            noteBackground: {
                default: "#0000",
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
    }
});

const lightTheme = createTheme({
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
        }
    },
    custom: {
        palette: {
            iconColor: "#5f6368",
            itemBorderColor: "#DDDDDD",
            profilePopColor: "#FFF",
            noteBackground: {
                default: "#0000",
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
    }
});

export const light = responsiveFontSizes(lightTheme);
export const dark = responsiveFontSizes(darkTheme);
