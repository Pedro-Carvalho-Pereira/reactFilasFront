import { Box, Button, Container, Grid, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MiniDrawer from '../../components/drawer'
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Add, DeleteForever } from '@mui/icons-material';
import service from '../../services/service';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { SenhaTela, TypeUser, TypeUserCaixa } from '../../services/types';
import "./caixa.css"

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
}));


const StyledButton = styled(Button)`
  background-color: grey;
  color: #fff;
  padding: 6px 12px;
  &:hover {
    background-color: #a9a9a9;
  }
  &:focus {
    background-color: green;
  }
`;

const StyledButtonSol = styled(Button)`
  background-color: grey;
  color: #fff;
  padding: 6px 12px;
  &:hover {
    background-color: #a9a9a9;
  }
`;


const StyledButtonEnd = styled(Button)`
  background-color: grey;
  color: #fff;
  padding: 6px 12px;
  &:hover {
    background-color: #281114;
  }
`;





const Caixa = () => {
    const [emExpediente, setEmExpediente] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [caixas, setCaixas] = useState<TypeUserCaixa[]>([]);
    const [usuarioAtendimento, setUsuarioAtendimento] = useState<SenhaTela>();

    const [caixasOriginal, setCaixasOriginal] = useState<TypeUserCaixa[]>([]);

    const [senhas, setSenhas] = useState<SenhaTela[]>([]);
    const [senhasOriginal, setSenhasOriginal] = useState<SenhaTela[]>([]);
    let token = localStorage.getItem('@token');
    let userId = localStorage.getItem('@userId');



    useEffect(() => {

        service.listarum(userId!, token!)
            .then((response) => {
                console.log(response.data);
                setUserName(response.data.nome);
                setEmExpediente(response.data.emExpediente);
            })
            .catch((error) => {
                console.log(error);
            })




    }, []);

    function trocarExpediente() {

        service.trocarExpediente(userId!, token!)
            .then((response) => {
                console.log(response.data);
                setEmExpediente(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    function solicitarAtendimento() {

        service.trocarExpediente(userId!, token!)
            .then((response) => {
                console.log(response.data);
                setEmExpediente(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    

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
        <MiniDrawer title="Caixa">

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        display: 'flex',
                        alignItems: 'start',
                    }}
                >
                    <Container className='containerMaxWidth'>










                        {emExpediente === false ?
                            <Grid sx={{ justifyContent: 'space-between' }} mt={4} mb={6} container spacing={2}>

                                <Grid sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }} item xs={12}>

                                    <Item sx={{ background: 'black', width: '100%', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                        <Typography sx={{ fontSize: '36px', textAlign: 'center', color: 'white' }}>Bem vindo {userName}</Typography>

                                        <StyledButton onClick={trocarExpediente} sx={{ backgroundColor: 'white' }}>
                                            <Typography sx={{ fontSize: '36px', textAlign: 'center', color: 'black' }}>Iniciar expediente</Typography>
                                        </StyledButton>
                                    </Item>


                                </Grid>
                            </Grid>

                            :
                            <>
                                <Grid sx={{ justifyContent: 'space-between' }} mt={4} mb={6} container spacing={2}>

                                    <Grid sx={{ justifyContent: 'center', display: 'flex' }} item xs={6}>
                                        <Item sx={{ background: 'black', width: '100%', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                                            <StyledButtonSol onClick={trocarExpediente} sx={{ backgroundColor: 'white' }}>
                                                <Typography onClick={solicitarAtendimento} sx={{ fontSize: '36px', borderRadius:'30px', textAlign: 'center', color: 'black' }}>solicitar atendimento</Typography>
                                            </StyledButtonSol>
                                        </Item>

                                    </Grid>


                                    <Grid sx={{ justifyContent: 'center', display: 'flex' }} item xs={6}>
                                        <Item sx={{ background: 'red', width: '100%', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                                            <StyledButtonEnd onClick={trocarExpediente} sx={{ backgroundColor: 'black' }}>
                                                <Typography sx={{ fontSize: '36px', borderRadius:'30px', textAlign: 'center', color: 'white' }}>encerrar expediente</Typography>
                                            </StyledButtonEnd>
                                        </Item>

                                    </Grid>
                                </Grid>

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
                                            <StyledTableRow >
                                                <StyledTableCell sx={{ fontSize: '24px!important' }} align="center" component="th" scope="row">
                                                    {usuarioAtendimento?.nome}
                                                </StyledTableCell>
                                                <StyledTableCell sx={{ fontSize: '24px!important' }} align="center"> {usuarioAtendimento?.numeroSenha}</StyledTableCell>
                                                <StyledTableCell sx={{ fontSize: '24px!important' }} align="center">{usuarioAtendimento?.preferencial}</StyledTableCell>
                                            </StyledTableRow>

                                        </TableBody>


                                    </Table>


                                </TableContainer>

                            </>
                        }



                    </Container>
                </Box>
            </Box>






        </MiniDrawer >
    )
}

export default Caixa