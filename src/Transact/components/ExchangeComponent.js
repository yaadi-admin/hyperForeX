import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Select,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';

export default function ExchangeComponent({ isVisible, setIsVisible, wallet }) {
  const currencies = [
    { label: 'USD', value: 'USD', exchangeRateToUSD: 1 },
    { label: 'CAD', value: 'CAD', exchangeRateToUSD: 0.8 },
    // Add more currencies with their respective exchange rates
  ];

  const [usdtValue, setUsdtValue] = React.useState('');
  const [usdtCurrency, setUsdtCurrency] = React.useState(currencies[0].value);
  const [cadValue, setCadValue] = React.useState('');
  const [cadCurrency, setCadCurrency] = React.useState(currencies[1].value);
  const [rate, setRate] = React.useState('');

  const handleSwap = () => {
    if (usdtCurrency !== cadCurrency) {
      setUsdtValue(cadValue);
      setUsdtCurrency(cadCurrency);
      setCadCurrency(usdtCurrency);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  useEffect(() => {
    if (usdtCurrency !== cadCurrency && usdtValue !== '') {
      const exchangeRate = currencies.find((currency) => currency.value === cadCurrency).exchangeRateToUSD;
      const convertedCadValue = parseFloat(usdtValue) / exchangeRate;
      setCadValue(convertedCadValue.toFixed(2));
    }
  }, [usdtValue, usdtCurrency, cadCurrency]);

  const getExchangeRate = async () => {
    fetch("http://3.89.88.181:8964/currencyList")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setRate(data.data[1].exchangeRateToUSD);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const exchangeCurrency = () => {
    console.log(wallet?.email);
    fetch('http://3.89.88.181:8964/depositMoney', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: wallet?.email,
        currencyFrom: usdtCurrency,
        currencyTo: cadCurrency,
        amountFrom: usdtValue.toString(),
        amountTo: cadValue.toString(),
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <TextField
            id="standard-basic-top"
            label="Value"
            variant="standard"
            value={usdtValue}
            onChange={(e) => setUsdtValue(e.target.value)}
          />
          <Select
            value={usdtCurrency}
            onChange={(e) => setUsdtCurrency(e.target.value)}
            disabled
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.value} value={currency.value}>
                {currency.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button sx={{ alignSelf: 'center', my: 1 }} onClick={handleSwap}>
          Swap
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <TextField
            id="standard-basic-bottom"
            label="Value"
            variant="standard"
            value={cadValue}
            onChange={(e) => setCadValue(e.target.value)}
          />
          <Select
            value={cadCurrency}
            onChange={(e) => setCadCurrency(e.target.value)}
            disabled
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.value} value={currency.value}>
                {currency.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
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
        <Button onClick={exchangeCurrency} fullWidth variant="contained" sx={{ backgroundColor: '#2196f3', color: 'white' }}>
          Send
        </Button>
      </CardActions>
    </Card>
  );
}
