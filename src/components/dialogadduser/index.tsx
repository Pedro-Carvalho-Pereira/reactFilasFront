import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Alert, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { TypeSaveUser } from '../../services/types';
import service from '../../services/service';
let token = localStorage.getItem('@token');

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialogAddUser(props: any) {
  const [open, setOpen] = React.useState(false);
  const [senha, setSenha] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const [permission, setPermission] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addUser() {

    if (nome != '' && email != '' && permission != '' && senha != '') {

      const saveUsuario: TypeSaveUser = {
        nome: nome,
        email: email,
        permission: permission,
        senha: senha
      }

      service.saveusers(saveUsuario, token!)
        .then((response) => {
          console.log('Usuário salvo com sucesso!', 'success');
          props.handleClose();
          props.added(true);
          setNome('');
          setEmail('');
          setSenha('');
          setPermission('');
          console.log("Load Again chamado")
        })
        .catch((error) => {
          console.log('Erro ao salvar usuário!', 'error');
        })

    } else{
      setShowAlert(true);
    }
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Adicionar usuário
        </DialogTitle>

        <Grid sx={{ mx: 3 }}>
          <Grid sx={{ justifyContent: 'space-around' }}>
            <TextField style={{ width: '100%' }} value={nome} onChange={(n) => setNome(n.target.value)} id="outlined-basic" label="Nome" variant="outlined" />
            <TextField style={{ width: '100%', marginLeft: '26px' }} value={email} onChange={(n) => setEmail(n.target.value)} id="outlined-basic" label="Email" variant="outlined" />
          </Grid>
        </Grid>

        <Grid sx={{ mx: 3 }}>
          <Grid sx={{ justifyContent: 'space-around' }}>

            <FormControl style={{ width: '100%', marginTop: '25px' }}>
              <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
              <Select
                value={permission}
                label="Permissão"
                onChange={e => setPermission(e.target.value)}
              >
                <MenuItem value={'CAIXA'}>Caixa</MenuItem>
                <MenuItem value={'ADMIN'}>Admin</MenuItem>
              </Select>
            </FormControl>

            <TextField style={{ width: '100%', marginTop: '25px', marginLeft: '25px' }} value={senha} onChange={(n) => setSenha(n.target.value)} id="outlined-basic" label="Senha" variant="outlined" />

          </Grid>
        </Grid>

        <Grid sx={{ flexDirection: 'row', display: 'flex', padding: '12px', justifyContent:'end' }}>

          { showAlert === true ?

            <Alert variant="outlined" severity="warning" onClose={() => {setShowAlert(false) }}>Favor preencher os campos</Alert>
          : ''}

          <DialogActions style={{ marginRight: '20px' }}>
            <Button autoFocus onClick={props.handleClose}>
              Fechar
            </Button>
            <Button onClick={addUser}>Salvar</Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}