import { Box, Menu, Toolbar, Container, Grid, Button, Select, MenuItem, TextField, Paper } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react';
import MiniDrawer from '../../components/drawer'
import { Add, DeleteForever } from '@mui/icons-material';
import { TypeUser } from '../../services/types';
import '../../styles/global.css'
import Tableusers from '../../components/tableusers';
import service from '../../services/service';
import DraggableDialogAddUser from '../../components/dialogadduser';

const MainPage = () => {
    const [campo, setCampo] = useState('');
    const [list, setList] = useState<TypeUser[]>([]);
    const [search, setSearch] = useState('');
    const [added, setAdded] = useState<Boolean>(false);
    const [dataOriginal, setDataOriginal] = useState<TypeUser[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = React.useState(false);
    let token = localStorage.getItem('@token');

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        loadUsers();
        setAdded(false);
      }, [added]);

    const handleClose = () => {
        setOpen(false);
    };

    function getSearch() {
        if (search === '') {
            setList(dataOriginal);
        } else {
            if (campo === 'nome') {
                setList(dataOriginal.filter((item) => (item.nome.toUpperCase().indexOf(search.toUpperCase()) > -1)));
            } else {
                setList(dataOriginal.filter((item) => (item.email.toUpperCase().indexOf(search.toUpperCase()) > -1)));
            }
        }
    }

    function loadUsers() {
        service.getUsers(token!)
            .then((response) => {
                setList(response.data);
                setDataOriginal(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function clearFilter() {
        setCampo('');
        setSearch('');
        getSearch();
    }

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        getSearch();
    }, [search]);


    return (
        <MiniDrawer title="Cadastrar usuários">

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
                        <Grid container columnSpacing={1} sx={{ alignItems: 'center', justifyContent: 'center', my: 3 }}>
                            <Grid item lg={2} sx={{ my: 3 }} >
                                <Button sx={{ background: 'black' }} variant="contained" startIcon={<Add />} fullWidth onClick={handleClickOpen}>
                                    usuário
                                </Button>
                            </Grid>

                            <Grid item lg={2} sx={{ my: 3 }} >
                                <Select
                                    sx={{ height: 40, alignItems: 'center', display: 'flex' }}
                                    value={campo}
                                    displayEmpty
                                    fullWidth
                                    onChange={e => setCampo(e.target.value)}
                                >
                                    <MenuItem disabled value=''>Filtrar...</MenuItem>
                                    <MenuItem value='name'>Nome</MenuItem>
                                    <MenuItem value='email'>Email</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item lg={2} sx={{ my: 3 }} >
                                <TextField
                                    fullWidth
                                    label="Buscar..."
                                    type="text"
                                    size='small'
                                    value={search}
                                    onChange={(n) => setSearch(n.target.value)}
                                />
                            </Grid>

                            <Grid item lg={2} sx={{ my: 3 }} >
                                <Button sx={{ background: 'black' }} variant="contained" startIcon={<DeleteForever />} fullWidth onClick={() => clearFilter()}>
                                    limpar
                                </Button>
                            </Grid>

                        </Grid>
                        <Tableusers added={setAdded} users={list} />

                    </Container>
                </Box>
            </Box>

            <DraggableDialogAddUser added={setAdded} open={open} handleClose={handleClose} />


        </MiniDrawer>

    )
}

export default MainPage