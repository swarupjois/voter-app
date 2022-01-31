import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import bjpLogo from '../assets/bjp.png';
import congressLogo from '../assets/congress.png';
import electionLogo from '../assets/electionLogo.png'
import './ResultTable.css';

const ResultTable = (props) => {
  return (
    <TableContainer style={{ margin: '20px' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead className='tableHeader'>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Party</TableCell>
            <TableCell>Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          <TableRow
            key='bjp'
          >
            <TableCell component="th" scope="row">
              <img src={bjpLogo} width='50px' />
            </TableCell>
            <TableCell component="th" scope="row">
              BJP
            </TableCell>
            <TableCell>{props.data['bjp']}</TableCell>
          </TableRow>

          <TableRow
            key='congress'
          >
            <TableCell component="th" scope="row">
              <img src={congressLogo} width='50px' />
            </TableCell>
            <TableCell component="th" scope="row">
              CONGRESS
            </TableCell>
            <TableCell>{props.data['congress']}</TableCell>
          </TableRow>

          <TableRow
            key='totalVotes'
          >
            <TableCell component="th" scope="row">
              <img src={electionLogo} width='50px' />
            </TableCell>
            <TableCell component="th" scope="row">
              TOTAL VOTES
            </TableCell>
            <TableCell>{props.data['totalVotes']}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultTable;