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

export default function SendTransferComponent({ isVisible, setIsVisible }) {
    const [showValue, setShowValue] = React.useState(false);

    if (showValue) {
        return (
            <div>
                <CardActions>
                    <Button onClick={() => {
                        setShowValue(false);
                    }
                    }>
                        Back
                    </Button>
                    <Button onClick={() => {
                        setIsVisible(0);
                        setShowValue(false);
                    }
                    }>
                        Cancel
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
                    <TextField id="standard-basic" label="Value" variant="standard" />
                    <Typography style={{ marginTop: '2.5%' }} component="h5" variant="h7" color="text.primary">
                        Exchange Rate
                    </Typography>
                </Box>

                <CardActions>
                    <Button fullWidth variant={'outlined'}>
                        Send
                    </Button>
                </CardActions>
            </div>
        );
    }
    else {
        return (
            <div>
                <CardActions>
                    <Button onClick={() => setIsVisible(0)} >
                        Cancel
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
                    <TextField id="standard-basic" label="Email" variant="standard" />
                    <Typography style={{ marginTop: '10%' }} component="h5" variant="h7" color="text.primary">
                        OR
                    </Typography>
                    <TextField id="standard-basic" label="Entity Identification Number" variant="standard" />
                </Box>

                <CardActions>
                    <Button onClick={() => setShowValue(true)} fullWidth variant={'outlined'}>
                        Continue
                    </Button>
                </CardActions>
            </div>
        );
    }


}