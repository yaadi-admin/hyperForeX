import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { TextField } from '@mui/material';

import SendTransferComponent from './components/SendTransferComponent';
import FundComponent from './components/FundComponent';
import ExchangeComponent from './components/ExchangeComponent';

export default function Transact({ isVisible, setIsVisible, wallet }) {
  if (isVisible === 0) {
    return (
      <Card sx={{ maxWidth: 500, marginBottom: 2 }}>
        <CardActions>
          {/* <Button>
            HOME/
          </Button> */}
        </CardActions>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Button
            onClick={() => setIsVisible(1)}
            style={{ marginTop: 10 }}
            fullWidth
            variant="contained"
            sx={{
              backgroundImage: 'linear-gradient(to bottom, #64b5f6, #1976d2)',
              color: 'white',
            }}
          >
            Send
          </Button>
          <Button
            onClick={() => setIsVisible(2)}
            style={{ marginTop: 10 }}
            fullWidth
            variant="contained"
            sx={{
              backgroundImage: 'linear-gradient(to bottom, #81c784, #388e3c)',
              color: 'white',
            }}
          >
            Fund Balance
          </Button>
          <Button
            onClick={() => setIsVisible(3)}
            style={{ marginTop: 10 }}
            fullWidth
            variant="contained"
            sx={{
              backgroundImage: 'linear-gradient(to bottom, #ffb74d, #f57c00)',
              color: 'white',
            }}
          >
            Currency Exchange
          </Button>
        </Box>

        <CardActions>
          <Button fullWidth variant="outlined" />
          <Button fullWidth variant="outlined" />
        </CardActions>
      </Card>
    );
  }

  if (isVisible === 1) {
    return <SendTransferComponent wallet={wallet} isVisible={isVisible} setIsVisible={setIsVisible} />;
  }

  if (isVisible === 2) {
    return <FundComponent wallet={wallet} isVisible={isVisible} setIsVisible={setIsVisible} />;
  }

  if (isVisible === 3) {
    return <ExchangeComponent wallet={wallet} isVisible={isVisible} setIsVisible={setIsVisible} />;
  }
}
