import * as React from 'react';
import { Modal, TextField, Button, Typography, Box } from '@mui/material';

export default function Register({
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
}) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [isVisible, setIsVisible] = React.useState(false);

    const handleSaveProfile = () => {
        // Save the profile details
        // You can use this function to save the name, email, and address/region in your app's state or backend

        // After saving the profile, close the modal
        handleCloseModal();
    };


        return (
            <div>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Profile</Typography>
                    <Typography>Welcome to the Currency Transaction App!</Typography>
                    <Typography>Please set up your profile:</Typography>

                    <Button variant="contained" onClick={() => setIsVisible(true)}>
                        Set Profile
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
