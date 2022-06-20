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
import DraggableDialogEditUser from '../dialogedituser';
import service from '../../services/service';



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
  users: TypeUser[],
  added: () => void
}

function createData(
  nome: string,
  email: string,
  permissao: string
) {
  return { nome, email, permissao };
}




export default function Tableusers(props: any) {
  const [usuarios, setUsuarios] = React.useState<TypeUser[]>([]);
  const [added, setAdded] = React.useState<Boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [userEdit, setUserEdit] = React.useState<TypeUser>();
  let token = localStorage.getItem('@token');




  useEffect(() => {
    setUsuarios(props.users);
  }, [props]);

  function handleEditUser(item: any) {
    setUserEdit(item);
    setOpen(true);
  }

  function handleDeleteUser(item: any) {
    service.deleteuser(item, token!)
      .then((response) => {
          console.log(response);
          props.added(true);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleClose = () => {
    setOpen(false);
  };

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
          {usuarios.map((item) => (
            <StyledTableRow key={item.nome}>
              <StyledTableCell component="th" scope="row">
                {item.nome}
              </StyledTableCell>
              <StyledTableCell align="right">{item.email}</StyledTableCell>
              <StyledTableCell align="center">{item.permission}</StyledTableCell>
              <StyledTableCell sx={{ justifyContent: 'center', display: 'flex' }}>
                <Button onClick={() => handleEditUser(item)} sx={{ background: 'black', marginRight: '5px' }} variant="contained"   >
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDeleteUser(item)} sx={{ background: 'red' }} variant="contained"  >
                  <ClearIcon />
                </Button>
              </StyledTableCell>

            </StyledTableRow>

          ))}
        </TableBody>
      </Table>
      <DraggableDialogEditUser user={userEdit} added={props.added} open={open} handleClose={handleClose} />

    </TableContainer>
  );
}
