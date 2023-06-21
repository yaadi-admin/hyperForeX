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
import { TextField } from '@mui/material';
import SendTransferComponent from './components/SendTransferComponent';
import FundComponent from './components/FundComponent';
import ExchangeComponent from './components/ExchangeComponent';

export default function Transact({isVisible, setIsVisible}) {

    if (isVisible === 0) {
    return (
        <div>
            <CardActions>
                <Button fullWidth >
                    ID#
                </Button>
                <Button fullWidth >

                </Button>
                <Button fullWidth >

                </Button>
                
            </CardActions>

            <Box
                sx={{
                    // display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                }}
            >
                <Button onClick={() => setIsVisible(1) } style={{ marginTop: 5, }} fullWidth variant={'contained'}>
                    Send
                </Button>
                <Button onClick={() => setIsVisible(2)} style={{ marginTop: 5, }} fullWidth variant={'contained'}>
                    Fund Balance
                </Button>
                <Button onClick={() => setIsVisible(3)} style={{ marginTop: 5, }} fullWidth variant={'contained'}>
                    Currency Exchange
                </Button>
            </Box>

            <CardActions>
                <Button fullWidth variant={'outlined'}>

                </Button>
                <Button fullWidth variant={'outlined'}>

                </Button>
            </CardActions>
        </div>
    );

}

    if (isVisible === 1) {
        return (
            <SendTransferComponent isVisible={isVisible} setIsVisible={setIsVisible} />
        );

    }

    if (isVisible === 2) {
        return (
            <FundComponent isVisible={isVisible} setIsVisible={setIsVisible} />
        );

    }

    if (isVisible === 3) {
        return (
            <ExchangeComponent isVisible={isVisible} setIsVisible={setIsVisible} />
        );

    }

}