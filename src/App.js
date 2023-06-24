import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import Profile from './User/profileView';
import Transact from './Transact/transactView';
import Transactions from './History/historyView';
import Register from './Register/registerView';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        HyperFore X
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Account',
    price: '0',
    description: [
      '10 users included',
      '2 GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Transact',
    subheader: 'Send, Fund, Exchange',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Transactions',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

const defaultTheme = createTheme();

export default function Pricing() {
  const [isShowSend, setIsShowSend] = React.useState(0);
  const [isShowFund, setIsShowFund] = React.useState(1);
  const [isShowExchange, setIsShowExchange] = React.useState(2);
  const walletID = React.useState(null);
  const [isRegisterVisible, setRegisterVisible] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [wallet, setWallet] = React.useState(null);

  // const balances = [
  //   { currency: 'USD', amount: 1000 },
  //   { currency: 'CAD', amount: 800 },
  //   { currency: 'CNY', amount: 5000 },
  // ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const connectWallet = async () => {
    const url = `http://3.89.88.181:8964/balance?userID=CAAdmin@org1.example.com`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.data)
        setWallet({
          defaultImage: 'https://img.icons8.com/office/80/minecraft-main-character.png',
          name: 'Admin',
          email: 'CAAdmin@org1.example',
          address: 'canada',
          ...json.data});
      });
  };

  const disConnectWallet = (data) => {
    localStorage.setItem('wallet', data);
    setWallet(null);
  };

  if (wallet === null){
    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              HyperFore X
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Features
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Enterprise
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Support
              </Link>
            </nav>
              <Button onClick={() => connectWallet(wallet)} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Connect Wallet
              </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
          <Grid container spacing={2} alignItems="flex-end">
            {<Register handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setWallet={setWallet} />}

          </Grid>
        </Container>
        {/* Footer */}
        <Container
          maxWidth="md"
          component="footer"
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6],
          }}
        >
          <Copyright sx={{ mt: 3 }} />
        </Container>
        {/* End footer */}
      </ThemeProvider>
    );
  }
  else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              HyperFore X
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Features
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Enterprise
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Support
              </Link>
            </nav>
            <Button onClick={() => disConnectWallet(wallet)} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Connected
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
          <Grid container spacing={2} alignItems="flex-end">
            
            {tiers.map((tier, index) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>

                    {index === 0 &&
                      <Profile wallet={wallet} />
                    }

                    {index === 1 &&
                      <Transact isVisible={isShowSend} setIsVisible={setIsShowSend} wallet={wallet} />
                    }

                    {index === 2 &&
                      <Transactions wallet={wallet} />
                    }

                  </CardContent>
                </Card>
              </Grid>
            ))}

          </Grid>
        </Container>
        {/* Footer */}
        <Container
          maxWidth="md"
          component="footer"
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6],
          }}
        >
          {/* <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
          {/* {Register()} */}
          <Copyright sx={{ mt: 3 }} />
        </Container>
        {/* End footer */}
      </ThemeProvider>
    );
  }

  
}