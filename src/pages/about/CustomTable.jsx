import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {findWidth} from '../../components/Charts/utils'
import {generateTableData} from '../../api'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor:'rgb(11, 6, 28)',
    color: theme.palette.common.white,
    borderColor: '#fff',
    padding: 5
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor:' rgba(202, 195, 240, 0.6)',
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    width: findWidth,
  },
});

export default function CustomTables({data}) {
  const classes = useStyles();
  const rows = generateTableData(data)

  return (
    <TableContainer style={{marginTop: 15, marginBottom: 10}}component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"><h6 style={headerStyle}>Category</h6></StyledTableCell>
            <StyledTableCell align="center"><h6>Source</h6></StyledTableCell>
            <StyledTableCell align="center"><h6>Last Updated</h6></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row"align="left">
                <div style={keyStyle}>{row.title}</div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <a href={`${row.details}`}
                  target="_blank"
                  rel="noopener noreferrer">
                    {row.source}
                </a>
                </StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const headerStyle = {
  margin: 0
}

const keyStyle = {
  marginLeft: '1rem'
}