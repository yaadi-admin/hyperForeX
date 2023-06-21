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
import { TextField, MenuItem, Select } from '@mui/material';

const currencies = [
  { label: 'USDT', value: 'USDT' },
  { label: 'CAD', value: 'CAD' },
];

export default function ExchangeComponent({ isVisible, setIsVisible }) {
  const [usdtValue, setUsdtValue] = React.useState('');
  const [usdtCurrency, setUsdtCurrency] = React.useState('USDT');
  const [cadValue, setCadValue] = React.useState('');
  const [cadCurrency, setCadCurrency] = React.useState('CAD');

  const handleSwap = () => {
    setUsdtValue(cadValue);
    setCadValue(usdtValue);
    setUsdtCurrency(cadCurrency);
    setCadCurrency(usdtCurrency);
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
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.value} value={currency.value}>
                {currency.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button sx={{ alignSelf: 'center', my: 1 }} onClick={handleSwap}>
          <SwapHorizIcon />
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
          Exchange Rate: 1 USDT = 1.2 CAD
        </Typography>
      </Box>

      <CardActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
        <Button fullWidth variant="contained" sx={{ backgroundColor: '#2196f3', color: 'white' }}>
          Send
        </Button>
      </CardActions>
    </Card>
  );
}
