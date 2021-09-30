import React from 'react'
import './App.css';
import "fontsource-roboto";
import { createTheme, ThemeProvider} from '@material-ui/core'
import Navbar from './components/Navbar'

const theme = createTheme({
  palette: {
      primary: { main: '#264653'},
      secondary: {main: '#ffe8d6'}
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Navbar />
    </ThemeProvider>
  );
}

export default App;
