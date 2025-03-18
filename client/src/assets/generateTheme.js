import { indigo, grey, teal } from '@mui/material/colors';

const generateTheme = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: { 
                    main: indigo[600],
                    text: grey[700],
                    teal:teal[500],
                    contrast:grey[400]
                },
                background: {
                    paper: 'rgba(255, 255, 255, 0.9)',
                    bgcolor:grey[100],
                    bgcolor1:'white'

                },
              }
            : {
                primary: { 
                    main: indigo[200],
                    text: grey[300],
                    teal:teal[500]
                },
                background: {
                    paper: 'rgba(0, 0, 0, 0.8)',
                    bgcolor:grey[800],
                    bgcolor1:grey
                },
              }),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 500,
            md: 970,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default generateTheme;
