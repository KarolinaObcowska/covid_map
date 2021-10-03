import React, {useEffect, useState} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Dashboard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const date = new Date();
    const param = `${date.getDate()-1}-${date.getMonth() + 1}-${date.getFullYear()}`;
    
    const fetchData = async () => {
        const res = await fetch(`https://covid19.mathdro.id/api/daily/${param}`)
        const json = await res.json();
        setData(json);
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    return (
        <div>
<TableContainer component={Paper}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell>Region</StyledTableCell>
            <StyledTableCell align="right">Confirmed</StyledTableCell>
            <StyledTableCell align="right">Deaths</StyledTableCell>
            <StyledTableCell align="right">Revovery</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((el, index) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {el.countryRegion}
              </StyledTableCell>
              <StyledTableCell>{el.provinceState}</StyledTableCell>
              <StyledTableCell align="right">{el.confirmed}</StyledTableCell>
              <StyledTableCell align="right">{el.deaths}</StyledTableCell>
              <StyledTableCell align="right">{el.recovered}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            {/* {data.map((el, index) => (
                <p key={index}>{el.deaths}</p>
            ))} */}
        </div>
    )
}

export default Dashboard
