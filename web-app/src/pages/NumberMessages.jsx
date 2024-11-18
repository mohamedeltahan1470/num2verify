import * as React from 'react';
import { Container, Typography, Box, IconButton, CircularProgress, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context';
import { DataGrid, GridNoRowsOverlay } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles'; 
const CustomNoRowsOverlay = () => (
  <div style={{ padding: 20, textAlign: 'center' }}>
      No messages yet.
  </div>
);

export default function CountryNumbers() {
    const { numberid } = useParams();
    const [number, setNumber] = React.useState();
    const [messages, setMessages] = React.useState([]);
    const [currentPageLoading, setCurrentPageLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { handleGetNumberMessages, handlegetUserNumbers } = useAuth();
    const cardStartRef = React.useRef(null);
    const theme = useTheme();

    const integerId = /^[+-]?\d+$/.test(numberid);
    const checkedNumberId = integerId ? parseInt(numberid) : numberid;

    const loadMessages = async () => {
        setCurrentPageLoading(true);
        const result = await handleGetNumberMessages(checkedNumberId);
        if (result.success) {
            setMessages(result.content);
        } else {
            setError(result.errorMessage);
        }
        console.log(result);
        setCurrentPageLoading(false);
    };

    React.useEffect(() => {
        const getNumber = async () => {
            const result = await handlegetUserNumbers();
            if (result.success) {
                const number = result.content.find(num => num.id === checkedNumberId)?.number;
                setNumber(number);
            } else {
                setError(result.errorMessage);
            }
        };
        getNumber();
        loadMessages();
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCopy = () => {
        if (number) {
            navigator.clipboard.writeText(number)
                .then(() => console.log('Number copied to clipboard'))
                .catch(err => console.error('Failed to copy: ', err));
        }
    };

    const handleRefresh = () => {
        loadMessages();
    };

    const columns = [
        { field: 'message_sender', headerName: 'Sender', flex: 1, headerAlign: 'center' },
        { field: 'message_content', headerName: 'Message', flex: 2, headerAlign: 'center' },
        { field: 'message_date', headerName: 'Date', type: 'string', flex: 1, headerAlign: 'center' }
    ];

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {number && (
                <Box sx={{ display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h2" sx={{ mt: 10, mb: 5, textAlign: 'center' }}>
                        {number}
                    </Typography>

                    <Tooltip title="Copy" placement="bottom">
                        <IconButton onClick={handleCopy} sx={{ color: 'link.primary', position: 'absolute', mt: 10, mb: 5, right: -75, width: '65px', height: '65px' }}>
                            <ContentCopyIcon sx={{ width: '35px', height: '35px' }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Refresh" placement="bottom">
                        <IconButton onClick={handleRefresh} sx={{ color: 'link.primary', position: 'absolute', mt: 10, mb: 5, right: -150, width: '65px', height: '65px' }}>
                            <RefreshIcon sx={{ width: '35px', height: '35px' }} />
                        </IconButton>
                    </Tooltip>

                </Box>
            )}
            <br ref={cardStartRef}></br>
            {error && <Box>{error}</Box>}
            <Box sx={{ height: 400, width: '65%', mb: 10 }}>
                {currentPageLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress sx= {{color: 'link.primary'}}/>
                    </Box>
                ) : (
                    <DataGrid
                        rows={messages}
                        columns={columns}
                        getRowId={(row) => row.message_sender + row.message_date}
                        slots={{
                            noRowsOverlay: CustomNoRowsOverlay,
                        }}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10, 20, 40]}
                        disableRowSelectionOnClick
                        sx={{
                            bgcolor: 'background.secondary',
                            boxShadow: theme.palette.mode === 'dark' 
                                ? '0px 4px 20px rgba(0, 23, 173, 0.3)' 
                                : '0px 4px 20px rgba(25, 118, 210, 0.3)',
                        }}
                    />
                )}
            </Box>
        </Container>
    );
}
