import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor:'rgb(11, 6, 28)',
    color: theme.palette.common.white,
    borderColor: 'white'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(category, source, date) {
  return { category, source, date };
}

const rows = [
  createData('Hospital Data', 'www.soda.com', '03/21/1985'),
  createData('Hospital Data', 'www.soda.com', '03/21/1985'),
  createData('Hospital Data', 'www.soda.com', '03/21/1985'),
  createData('Hospital Data', 'www.soda.com', '03/21/1985'),
  createData('Hospital Data', 'www.soda.com', '03/21/1985'),
  createData('Hospital Data', 'www.soda.com', '03/21/1985'),
  createData('Hospital Data', 'www.soda.com', '03/21/1985'),

];

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    // maxWidth: 900
  },
});

export default function CustomTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="center">Data Source</StyledTableCell>
            <StyledTableCell align="left">Last Updated</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.category}>
              <StyledTableCell component="th" scope="row">
                {row.category}
              </StyledTableCell>
              <StyledTableCell align="right">{row.source}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
