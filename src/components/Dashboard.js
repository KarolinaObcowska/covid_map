import React, { useState } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'

const theme = createTheme({
  palette: {
    primary: { main: '#264653' },
    secondary: { main: '#DADADA' },
  },
})

const Dashboard = ({ data }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F29C1E',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.secondary.main,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  return (
    <ThemeProvider theme={theme}>
      <TableContainer  component={Paper}>
        <Table
          stickyHeader
          aria-label="simple table"
        >
          <TableHead style={{ fontSize: 12 }}>
            <TableRow>
              <StyledTableCell>COUNTRY</StyledTableCell>
              <StyledTableCell>CONFIRMED</StyledTableCell>
              <StyledTableCell>DEATHS</StyledTableCell>
              <StyledTableCell>RECOVERED</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((el, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {el.name}
                  </StyledTableCell>
                  <StyledTableCell>
                    {el.latest_data.confirmed} ({el.today.confirmed})
                  </StyledTableCell>
                  <StyledTableCell>
                    {el.latest_data.deaths} ({el.today.deaths})
                  </StyledTableCell>
                  <StyledTableCell>{el.latest_data.recovered}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  )
}

export default Dashboard
