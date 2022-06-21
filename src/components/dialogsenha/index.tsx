import './senha.css'

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
import { SenhaPreferencial, TypeEditUser, TypeSaveUser } from '../../services/types';
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





export default function DraggableDialogSenha(props: any) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [preferencial, setPreferencial] = React.useState('');






  function retirarSenha() {

    const data: SenhaPreferencial = {
      preferencial: preferencial,
      nome: nome,
    }

    service.retirarSenha(data, token!)
      .then((response: any) => {
        console.log(response.data.mensagem);
        props.setSenhaRetirada(response.data.mensagem);
        props.handleClose();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div >
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Retirar senha
        </DialogTitle>
        <Grid sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>

          <Grid sx={{justifyContent:'center', display:'flex'}}>
            <TextField sx={{width:'90%'}} value={nome} onChange={(n) => setNome(n.target.value)} id="outlined-basic" label="Nome" variant="outlined" />
          </Grid>

          <Grid sx={{justifyContent:'center', display:'flex'}}>
          <FormControl style={{ width: '90%', marginTop: '17px', marginBottom: '17px' }}>
            <InputLabel id="demo-simple-select-label">Preferencial</InputLabel>
            <Select
              value={preferencial}
              label="Permissão"
              onChange={e => setPreferencial(e.target.value)}
            >
              <MenuItem value={'Sim'}>Sim</MenuItem>
              <MenuItem value={'Não'}>Não</MenuItem>
            </Select>
          </FormControl>
          </Grid>


        </Grid>

        <DialogActions style={{ marginRight: '20px' }}>
          <Button autoFocus onClick={props.handleClose}>
            Cancelar
          </Button>
          <Button onClick={retirarSenha}>Retirar senha</Button>
        </DialogActions>


      </Dialog>
    </div>
  );
}