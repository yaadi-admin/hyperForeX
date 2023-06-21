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

export default function FundComponent({ isVisible, setIsVisible }) {
  const [ethValue, setEthValue] = React.useState('');
  const [cadValue, setCadValue] = React.useState('');

  const handleSwap = () => {
    setEthValue(cadValue);
    setCadValue(ethValue);
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
          label="Value ETH"
          variant="standard"
          fullWidth
          value={ethValue}
          onChange={(e) => setEthValue(e.target.value)}
        />
        <Button sx={{ alignSelf: 'center', my: 1 }} onClick={handleSwap}>
          <SwapHorizIcon />
        </Button>
        <TextField
          id="standard-basic-bottom"
          label="Value CAD"
          variant="standard"
          fullWidth
          value={cadValue}
          onChange={(e) => setCadValue(e.target.value)}
        />
        <Typography
          sx={{ marginTop: '2.5%', marginBottom: '2%', color: '#757575', fontWeight: 'bold' }}
          component="h5"
          variant="h7"
          color="text.primary"
        >
          Exchange Rate: 1 ETH = 200 CAD
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
