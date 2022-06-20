import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../styles/global.css'
import { TypeUser } from '../../services/types';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material'
import { useEffect } from 'react';



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

export type typePropsTable = {
  users: TypeUser[]
}

function createData(
  nome: string,
  email: string,
  permissao: string
) {
  return { nome, email, permissao };
}




export default function Tableusers(props: typePropsTable) {
  const [usuarios, setUsuarios] = React.useState<TypeUser[]>([]);

  useEffect(() => {
    setUsuarios(props.users);
  }, [props]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="center">Permissão</StyledTableCell>
            <StyledTableCell align="center">Ações</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((row) => (
            <StyledTableRow key={row.nome}>
              <StyledTableCell component="th" scope="row">
                {row.nome}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.permission}</StyledTableCell>
              <StyledTableCell sx={{ justifyContent: 'center',display:'flex' }}>
                <Button sx={{ background: 'black', marginRight:'5px' }}  variant="contained"  >
                  <EditIcon />
                </Button>
                <Button sx={{ background: 'red' }}  variant="contained"  >
                  <ClearIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
