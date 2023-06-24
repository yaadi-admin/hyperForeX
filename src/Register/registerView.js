import * as React from 'react';
import { Modal, TextField, Button, Typography, Box } from '@mui/material';

export default function Register({
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
    setWallet
}) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [isVisible, setIsVisible] = React.useState(false);

    const handleSaveProfile = () => {
        const user = {
            id: 'ioveinvwooalsk',
            email: ' email@gmail.com',
            address: 'Canada',
            balance: '100',
            currency: 'USD'
        };
        const set = localStorage.setItem('wallet', user);
        // Save the profile details
        // You can use this function to save the name, email, and address/region in your app's state or backend

        // After saving the profile, close the modal
        handleCloseModal();
    };

    const connectWallet = async () => {
        const url = `http://3.89.88.181:8964/balance?userID=Alice@org2.example.com.com`;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json.data)
                setWallet({
                    defaultImage: 'https://img.icons8.com/color/48/minecraft-main-character.png',
                    name: 'Admin',
                    email: 'Alice@org2.example.com',
                    address: 'America',
                    ...json.data
                });
            });
    };


        return (
            <div>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">HyperFore X</Typography>
                    <Typography>Welcome to HyperFore X</Typography>
                    <Typography>A cross border currency exchange & transfer platform</Typography>

                    <Button variant="contained" onClick={connectWallet}>
                        Login
                    </Button>

                    <Modal open={isVisible} onClose={() => setIsVisible(false)}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <Typography variant="h6">Set Profile</Typography>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ my: 2 }}
                            />
                            <TextField
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ my: 2 }}
                            />
                            <TextField
                                label="Address/Region"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                sx={{ my: 2 }}
                            />
                            <Button variant="contained" onClick={handleSaveProfile}>
                                Save
                            </Button>
                        </Box>
                    </Modal>
                </Box>
            </div>
        );
}
