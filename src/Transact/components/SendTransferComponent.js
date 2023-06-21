import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

export default function SendTransferComponent({ isVisible, setIsVisible }) {
  const [showValue, setShowValue] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState({});

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

  return (
    <Card sx={{ maxWidth: 500, marginBottom: 2 }}>
      <CardHeader
        title={showValue ? 'Send Transfer' : 'Select Recipient'}
        subheader={showValue ? 'Enter Amount and Exchange Rate' : ''}
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
              label="Value"
              variant="standard"
            />
            <Typography
              style={{ marginTop: '2.5%' }}
              component="h5"
              variant="h7"
              color="text.primary"
            >
              Exchange Rate
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
            <Typography
              style={{ marginTop: '10%' }}
              component="h5"
              variant="h7"
              color="text.primary"
            >
              OR
            </Typography>
            <TextField
              id="standard-basic"
              label="Entity Identification Number"
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
          <Button onClick={handleSendClick} fullWidth variant="outlined">
            Send
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
