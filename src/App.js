import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import 'fontsource-roboto'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Articles from './components/Articles'
import Footer from './components/Footer'

const theme = createTheme({
  palette: {
    primary: { main: '#264653' },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Layout />
      <Articles />
      <Footer />
    </ThemeProvider>
  )
}

export default App
