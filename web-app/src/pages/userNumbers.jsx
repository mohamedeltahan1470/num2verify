import * as React from 'react';
import { Container, Typography, Paper, CardContent, Box, Skeleton, Button, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAuth } from '../context';
import DataCardcontainer from '../modules/components/DataCardContainer';
import PageTitle from '../modules/primitives/PageTitle';

export default function UserNumbers() {
    const [numbers, setNumbers] = React.useState([]);
    const [currentPageloading, setCurrentPageloading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedNumberId, setSelectedNumberId] = React.useState(null);

    const { handlegetUserNumbers, handleDeleteNumber } = useAuth();

    React.useEffect(() => {
        async function loadData() {
            const result = await handlegetUserNumbers();
            if (result.success) {
                setNumbers(result.content);
            } else {
                setError(result.errorMessage);
            }
            setCurrentPageloading(false);
        }
        loadData();
    }, []);

    const handleOpenDialog = (numberId) => {
        setSelectedNumberId(numberId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = async () => {
        if (selectedNumberId) {
            await handleDeleteNumber(selectedNumberId);
            const result = await handlegetUserNumbers();
            if (result.success) {
                setNumbers(result.content);
            }
            setOpenDialog(false);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>

            <PageTitle sx={{ mt: 10, textAlign: 'center' }}>
                My Numbers
            </PageTitle>

            <DataCardcontainer currentPageloading={currentPageloading}
            cardArray={numbers}
            type ={'UserNumberCard'} 
            handlers={[handleOpenDialog]}/>

            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                sx={{ '& .MuiDialog-paper': { bgcolor: 'background.secondary', p: '10px'} }}
            >
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this number?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="text.primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="text.primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>


        </Container>
    );
}
