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

export default function Profile() {

    const [editing, setEditing] = React.useState(false);

    const renderFundBalance = () => {
        return (
            <Box
                sx={{
                    // display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                }}
            >
                <Button style={{ marginTop: 5, }} fullWidth variant={'contained'}>
                    
                </Button>
            </Box>
        )
    }


    return (
        <div>
            <CardActions>
                <Typography component="h2" variant="h6" color="text.primary">
                    ID#
                </Typography>
                <Typography component="h2" variant="h6" color="text.primary">
                    Address
                </Typography>
                {/* <Button fullWidth >
                    User ID#
                </Button> */}
                {/* <Button fullWidth >
                    Web3 #
                </Button> */}
            </CardActions>

            <Box
                sx={{
                    // display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                }}
            >
               { (!editing ? <Button onClick={() => setEditing(true)} style={{ marginTop: 5, }} fullWidth variant={'contained'}>
                    balance
                </Button> : renderFundBalance())}
                <Button style={{ marginTop: 5, }} fullWidth variant={'contained'}>
                    Email
                </Button>
                <Button style={{ marginTop: 5, }} fullWidth variant={'contained'}>
                    Address
                </Button>
            </Box>

            <CardActions>
                <Button fullWidth variant={'outlined'}>

                </Button>
                {/* <Button fullWidth variant={'outlined'}>
                    Web3 #
                </Button> */}
            </CardActions>
        </div>
    );

}