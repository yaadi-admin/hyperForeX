import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

export default function SendTransferComponent({ isVisible, setIsVisible, wallet }) {
  const [showValue, setShowValue] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [value, setValue] = React.useState('');
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [currencies, setCurrencyList] = React.useState([]);

  const handleBackClick = () => {
    setShowValue(false);
  };

  const handleCancelClick = () => {
    setIsVisible(0);
    setShowValue(false);
  };

  const handleContinueClick = () => {
    setShowValue(true);
  };

  const handleSendClick = () => {
    // Handle send logic
  };

  React.useEffect(() => {
    getExchangeRate();
  }, []);

  const getExchangeRate = async () => {
    fetch("http://3.89.88.181:8964/currencyList")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCurrencyList(data?.data)
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
      // .then((json) => {
      //   // console.log(json)
        
      // });
  };

  const transfer = () => {
    console.log(wallet?.email);
    fetch('http://3.89.88.181:8964/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: wallet?.email,
        transferTo: email,
        currency: selectedCurrency,
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
      <CardHeader
        title={showValue ? 'Enter Amount' : 'Select Recipient'}
        subheader={showValue ? `Sending to ${email}` : ''}
      />
      <CardContent>
        {showValue ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <TextField
              id="standard-basic"
              label="Currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="standard"
            />
            <Typography
              style={{ marginTop: '2.5%' }}
              component="h5"
              variant="h7"
              color="text.primary"
            >
              Exchange Rate {currencies[1]?.exchangeRateToUSD}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <TextField
              id="standard-basic"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
            />
          </Box>
        )}
      </CardContent>
      <CardActions>
        {showValue ? (
          <>
            <Button onClick={handleBackClick}>Back</Button>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </>
        ) : (
            <>
            <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleContinueClick}>Continue</Button>
          </>
        )}
      </CardActions>
      {showValue && (
        <CardActions>
          <Button onClick={transfer} fullWidth variant="outlined">
            Send
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
