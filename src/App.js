import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import 'fontsource-roboto'
import Navbar from './components/Navbar'
import Maps from './components/Maps'

const theme = createTheme({
  palette: {
    primary: { main: '#264653' },
    secondary: { main: '#ffe8d6' },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Maps />
    </ThemeProvider>
  )
}

export default App
