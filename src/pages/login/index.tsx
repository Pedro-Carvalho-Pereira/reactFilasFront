import { useState } from 'react';
import { CircularProgress, Alert, Typography, AlertTitle, IconButton, Fade, Avatar, Button, CssBaseline, TextField, Paper, Box, Grid } from '@mui/material';
import { CloseOutlined, LockOutlined } from '@mui/icons-material';
import background from '../../assets/images/NicePng_mis-quince-png_3189860.png';
import styled from "styled-components";




import service from '../../services/service';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit() {
    setLoading(true);

    let json = {
      username: email,
      password: password,
    }

    service.login(json)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        localStorage.setItem('@token', response.data.access_token);
        localStorage.setItem('@permission', response.data.permission);
        localStorage.setItem('@userId', response.data.userId);

        if (response.data.permission === 'ADMIN' || 'CAIXA') {
          window.history.replaceState(null, '', "/mainpage");
        }

        window.location.reload();
      }).catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      })

    /* TESTE 
    window.history.replaceState(null, '', "/dashboard");
    window.location.reload();
    */
  };

  function handleKeyDown(e: { keyCode: number; }) {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;

  return (
    <Fade in={true} timeout={1000}>
      <Grid container component="main" sx={{
        height: '100vh', backgroundSize: 'cover',
        backgroundPosition: 'center', backgroundImage: `url(${background})`
      }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={4} component={Paper}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f1dddd'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlined />
            </Avatar>
            <Box component="main">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                autoComplete="email"
                autoFocus

                value={email}
                onChange={(n: any) => setEmail(n.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(n: any) => setPassword(n.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading && <CircularProgress />}
                {!loading && 'Entrar'}
              </Button>

              {error &&
                <Alert
                  severity='error'
                  color='error'
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setError(false);
                      }}
                    >
                      <CloseOutlined fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Erro</AlertTitle>
                  <Typography>Usuário não encontrado!</Typography>
                </Alert>
              }
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </Fade>
  );
}