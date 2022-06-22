import { Box, Button, Container, Grid, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MiniDrawer from '../../components/drawer'
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Add, DeleteForever } from '@mui/icons-material';
import service from '../../services/service';
import { SenhaTela, TypeUser, TypeUserCaixa } from '../../services/types';
import "./painel.css"

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: '80%',
  height: '240px',
  background: 'black',
}));




const Painel = () => {
  const [caixas, setCaixas] = useState<TypeUserCaixa[]>([]);
  const [caixasOriginal, setCaixasOriginal] = useState<TypeUserCaixa[]>([]);

  const [senhas, setSenhas] = useState<SenhaTela[]>([]);
  const [senhasOriginal, setSenhasOriginal] = useState<SenhaTela[]>([]);
  let token = localStorage.getItem('@token');

  useEffect(() => {
    loadSenhas();
    loadCaixas();
  }, []);

  function loadSenhas() {
    service.getSenhasEmOrdem(token!)
      .then((response) => {
        console.log(response.data);
        setSenhas(response.data);
        setSenhasOriginal(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function loadCaixas() {
    service.getCaixas(token!)
      .then((response) => {
        console.log(response.data);
        setCaixas(response.data);
        setCaixasOriginal(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <MiniDrawer title="Painel">

      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container className='containerMaxWidth'>


            <Grid sx={{ justifyContent: 'space-between' }} mt={4} mb={6} container spacing={2}>



              {caixas.map((item) => (
                <Grid sx={{ justifyContent: 'center', display: 'flex' }} item xs={4}>
                  <Item sx={{ flexDirection: 'column' }}>

                    <Typography sx={{ color: 'white', fontSize: '33px' }}>Caixa: {item.nome}</Typography>
                    <Typography sx={{ color: 'white', fontSize: '33px', height: '70%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                      { item.senhaAtenderId === '' ? 'Inoperante' : item.senhaAtenderId
                      }
                    </Typography>


                  </Item>

                </Grid>

              ))}







            </Grid>


            <Paper sx={{ backgroundColor: '#eee', justifyContent: 'space-around', marginBottom: '20px', flexDirection: 'row', display: 'flex' }}>
              <Typography sx={{ fontSize: '24px', marginLeft: '30px' }}>Fila de atendimento:</Typography>
              <Typography sx={{ fontSize: '24px', marginLeft: '30px' }}>Tempo médio de atendimento: 20 minutos</Typography>

            </Paper>

            <TableContainer component={Paper}>


              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Nome</StyledTableCell>
                    <StyledTableCell align="center">Senha</StyledTableCell>
                    <StyledTableCell align="center">Preferencial</StyledTableCell>

                  </TableRow>
                </TableHead>

                <TableBody>
                  {senhas.map((item) => (
                    <StyledTableRow key={item.nome}>
                      <StyledTableCell sx={{ fontSize: '24px!important' }} align="center" component="th" scope="row">
                        {item.nome}
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: '24px!important' }} align="center">{item.numeroSenha}</StyledTableCell>
                      <StyledTableCell sx={{ fontSize: '24px!important' }} align="center">{item.preferencial.toUpperCase()}</StyledTableCell>
                    </StyledTableRow>

                  ))}
                </TableBody>


              </Table>


            </TableContainer>
          </Container>
        </Box>
      </Box>






    </MiniDrawer>
  )
}

export default Painel