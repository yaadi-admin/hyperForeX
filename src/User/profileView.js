import * as React from 'react';
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
import TextField from '@mui/material/TextField';

export default function Profile() {
  const [editing, setEditing] = React.useState(false);
  const [email, setEmail] = React.useState('example@example.com');
  const [address, setAddress] = React.useState('Canada'); // Dummy web3 address
  const [webAddress, setWebAddress] = React.useState('0xABCDE'); // Dummy web3 address

  const renderFundBalance = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          mb: 2,
        }}
      >
        <Button
          style={{ marginTop: 5 }}
          fullWidth
          variant="contained"
          sx={{ backgroundColor: '#2196f3', color: 'white' }}
        >
          Fund Balance
        </Button>
      </Box>
    );
  };

  const handleUpdateProfile = () => {
    // Perform update logic here
    setEditing(false);
  };

  const handleCancelUpdate = () => {
    // Cancel update and revert to previous values
    setEditing(false);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography component="h2" variant="h6" color="text.primary">
          ID#
        </Typography>
        <Typography component="h2" variant="h6" color="text.primary">
                  {webAddress}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#f2f2f2',
            marginBottom: '10px',
          }}
        >
          {/* Placeholder for profile image */}
        </div>
        {!editing ? (
          <>
            <Typography
              variant="body1"
              color="text.primary"
              gutterBottom
              sx={{ marginTop: 5 }}
            >
              {email}
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              {address}
            </Typography>
          </>
        ) : (
          <>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </>
        )}
        {!editing ? (
          <Button
            onClick={() => setEditing(true)}
            style={{ marginTop: 5 }}
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#2196f3', color: 'white' }}
          >
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              onClick={handleUpdateProfile}
              style={{ marginTop: 5 }}
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#2196f3', color: 'white', marginRight: 1 }}
            >
              Update
            </Button>
            <Button
              onClick={handleCancelUpdate}
              style={{ marginTop: 5 }}
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#f44336', color: 'white', marginLeft: 1 }}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
    </div>
  );
}
