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
import { TypeEditUser, TypeSaveUser } from '../../services/types';
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





export default function DraggableDialogEditUser(props: any) {
  const [open, setOpen] = React.useState(false);
  const [senha, setSenha] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [id, setId] = React.useState('');
  const [permission, setPermission] = React.useState('');


  React.useEffect(() => {
    if (props.user) {
      setId(props.user.id);
      setEmail(props.user.email);
      setPermission(props.user.permission);

      setNome(props.user.nome);
      console.log(props.user.permission);
    }
  }, [props.user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function editUser() {

    const editUsuario: TypeEditUser = {
      nome: nome,
      email: email,
      permission: permission
    }

    service.editusers(editUsuario, token!, id)
      .then((response) => {
        console.log('Usuário editado com sucesso!', 'success');
        props.handleClose();
        props.added(true);
        console.log("Load Again chamado")
      })
      .catch((error) => {
        console.log('Erro ao editar usuário!', 'error');
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
          Editar usuário
        </DialogTitle>
        <Grid sx={{ mx: 3 }}>
          <Grid sx={{justifyContent:'space-around'}}>
            <TextField sx={{marginRight:'40px'}} value={nome} onChange={(n) => setNome(n.target.value)} id="outlined-basic" label="Nome" variant="outlined" />
            <TextField value={email} onChange={(n) => setEmail(n.target.value)} id="outlined-basic" label="Email" variant="outlined" />
          </Grid>
          <FormControl style={{ width: '100%', marginTop: '25px' }}>
            <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
            <Select
              value={permission}
              label="Permissão"
              onChange={e => setPermission(e.target.value)}
            >
              <MenuItem value={'ADMIN'}>Admin</MenuItem>
              <MenuItem value={'CAIXA'}>Caixa</MenuItem>
            </Select>
          </FormControl>


        </Grid>

        <DialogActions style={{ marginRight: '20px' }}>
          <Button autoFocus onClick={props.handleClose}>
            Fechar
          </Button>
          <Button onClick={editUser}>Salvar</Button>
        </DialogActions>


      </Dialog>
    </div>
  );
}