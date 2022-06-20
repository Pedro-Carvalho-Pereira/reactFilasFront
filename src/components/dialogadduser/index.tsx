import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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
  const [nome, setNome] = React.useState('');
  const [permission, setPermission] = React.useState('');




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addUser() {

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
        console.log("Load Again chamado")
      })
      .catch((error) => {
        console.log('Erro ao salvar usuário!', 'error');
      })
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
          <TextField style={{ width: '48%' }} value={nome} onChange={(n) => setNome(n.target.value)} id="outlined-basic" label="Nome" variant="outlined" />
          <TextField style={{ width: '48%', marginLeft: '26px' }} value={email} onChange={(n) => setEmail(n.target.value)} id="outlined-basic" label="Email" variant="outlined" />
          <TextField style={{ width: '48%', marginTop: '25px' }} value={senha} onChange={(n) => setSenha(n.target.value)} id="outlined-basic" label="Senha" variant="outlined" />

          <FormControl style={{ width: '48%', marginTop: '25px', marginLeft: '26px' }}>
            <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
            <Select
              value={permission}
              label="Permissão"
              onChange={e => setPermission(e.target.value)}
            >
              <MenuItem value={'CAIXA'}>Admin</MenuItem>
              <MenuItem value={'ADMIN'}>Caixa</MenuItem>
            </Select>
          </FormControl>


          <Grid sx={{ mx: 3 }}>
          </Grid>
        </Grid>

        <DialogActions style={{ marginRight: '20px' }}>
          <Button autoFocus onClick={props.handleClose}>
            Fechar
          </Button>
          <Button onClick={addUser}>Salvar</Button>
        </DialogActions>


      </Dialog>
    </div>
  );
}