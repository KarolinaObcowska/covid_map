import React from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const Footer = () => {
    return (
        <footer style={{marginTop: '15px', backgroundColor: '#264653', color: 'white'}}>
        <Box
          px={{ xs: 1, sm: 3 }}
          py={{ xs: 1, sm: 3 }}
        >
          <Container maxWidth="lg">
            <Box textAlign="center">
              COVID-19 &reg; {new Date().getFullYear()}
            </Box>
          </Container>
        </Box>
      </footer>
    )
}

export default Footer
