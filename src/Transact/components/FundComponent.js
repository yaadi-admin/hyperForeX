import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';

export default function FundComponent({ isVisible, setIsVisible, wallet }) {
  const [currency, setCurrency] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [value, setValue] = React.useState('');
  const [rate, setRate] = React.useState('');


  React.useEffect(() => {
    getExchangeRate();
  }, []);

  const getExchangeRate = async () => {
    fetch("http://3.89.88.181:8964/currencyList")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setRate(data.data[1].exchangeRateToUSD)
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const fundBalance = () => {
    console.log(wallet?.email);
    fetch('http://3.89.88.181:8964/depositMoney', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: wallet?.email,
        depositTo: email,
        currency: currency,
        amount: value.toString(),
      }),
    })
      .then((response) => {
        console.log(response)
        setIsVisible(0);
      })
  };

  return (
    <Card sx={{ maxWidth: 500, marginBottom: 2 }}>
      <CardActions>
        <Button onClick={() => setIsVisible(0)}>Cancel</Button>
      </CardActions>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
          padding: '0 20px',
        }}
      >
        <TextField
          id="standard-basic-top"
          label="Currency"
          variant="standard"
          fullWidth
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
        <TextField
          id="standard-basic-bottom"
          label="User"
          variant="standard"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="standard-basic-bottom"
          label="Value"
          variant="standard"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Typography
          sx={{ marginTop: '2.5%', marginBottom: '2%', color: '#757575', fontWeight: 'bold' }}
          component="h5"
          variant="h7"
          color="text.primary"
        >
          Exchange Rate: {rate}
        </Typography>
      </Box>

      <CardActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
        <Button onClick={fundBalance} fullWidth variant="contained" sx={{ backgroundColor: '#2196f3', color: 'white' }}>
          Send
        </Button>
      </CardActions>
    </Card>
  );
}
