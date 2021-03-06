import React, { Fragment } from 'react'
import logo from '../icons/virus.png'
import { Typography, AppBar, CssBaseline, Toolbar } from '@material-ui/core'

const Navbar = () => {
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <img src={logo} style={{ width: 40, height: 40 }} alt="virus icon" />
          <Typography variant="h6" color="inherit" noWrap>
            COVID-19 Map
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Navbar
