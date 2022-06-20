import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import MiniDrawer from '../../components/drawer'
import '../../styles/global.css'
import KeyIcon from '@mui/icons-material/Key';
import DraggableDialogSenha from '../../components/dialogsenha';

const Senhas = () => {
    const [open, setOpen] = React.useState(false);
    const [added, setAdded] = React.useState(false);
    const [senhaRetirada, setSenhaRetirada] = React.useState('');


    function handleClose() {
        console.log("fechado")
        setOpen(false);
    }

    function handleClickOpen() {
        console.log("open")
        setOpen(true);
    };


    return (
        <MiniDrawer title="Retirar Senha">

            <Box sx={{ height: '100vh', width: '100vw', background: '#eee', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>

                <Grid container spacing={6} columns={24} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={18}>
                        <Paper sx={{ height: '60vh', borderRadius: '30px' }}>
                            <Grid sx={{ display: 'flex', height: '100%', justifyContent: 'center' }} columns={20}>
                                <Grid sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }} xs={10}>
                                    <Typography sx={{ fontSize: '35px' }}>Retire aqui sua senha</Typography>
                                    <Button
                                        onClick={handleClickOpen}

                                        sx={{ marginTop: '35px', width: '300px', height: '190px' }}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<KeyIcon sx={{ width: '120px', height: '80px' }} />}>

                                    </Button>
                                </Grid>




                                <Grid sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }} xs={10}>
                                    <Typography sx={{ fontSize: '35px' }}>Senha retirada:</Typography>

                                    <Paper
                                        sx={{ marginTop: '35px', width: '300px', height: '190px', background: 'black', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
                                    >


                                        <Typography sx={{ color: 'white', fontSize: '45px' }}>{senhaRetirada}</Typography>


                                    </Paper>




                                </Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                <DraggableDialogSenha setSenhaRetirada={setSenhaRetirada} added={added} open={open} handleClose={handleClose} />

            </Box>
        </MiniDrawer>
    )
}

export default Senhas