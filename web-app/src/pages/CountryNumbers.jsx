import * as React from 'react';
import { Container, Typography, Paper, CardContent, Box, Skeleton, Button, Alert, Pagination,  Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import DataCardcontainer from '../modules/components/DataCardContainer';
import ListSelect from '../modules/primitives/ListSelect';
import { useAuth } from '../context';
import PageTitle from '../modules/primitives/PageTitle';

export default function CountryNumbers() {
    const { countryid } = useParams();
    const [country, setCountry] = React.useState()
    const [numbers, setNumbers] = React.useState([]);
    const [currentPageloading, setCurrentPageloading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [claimStatus, setClaimStatus] = React.useState({});
    const [pageNum, setPageNum] = React.useState(1)
    const [itemsPerPage, setItemsPerPage] = React.useState(12)
    const [pageCount, setPageCount] = React.useState(1)
    const {handlegetCountryListOrNumbers, handleClaimNumber } = useAuth();
    const cardStartRef = React.useRef(null);

    React.useEffect(() => {
        cardStartRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',     
          });
    }, [pageNum, itemsPerPage]);

    React.useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    React.useEffect(() => {
        setCurrentPageloading(true);
        async function calcPageCountandCountryName() {
            const result_1 = await handlegetCountryListOrNumbers();
            if (result_1.success) {
                const country = result_1.content.filter(country => (country.id).toString() === countryid)[0]
                console.log(country)
                const countryCount = country?.amount
                setCountry(country)
                console.log('FLAAAG')

                setPageCount(Math.floor(countryCount / itemsPerPage) + 1 );
            } else {
                setError(result_1.errorMessage);
            }
        }
        calcPageCountandCountryName();
    }, [itemsPerPage]);


    React.useEffect(() => {
        setCurrentPageloading(true);
        async function loadData() {
            const params = {
                country_id: countryid,
                start: (pageNum-1) * itemsPerPage,
                end: ((pageNum-1) * itemsPerPage) + itemsPerPage
            };
            const result_2 = await handlegetCountryListOrNumbers(params);
            if (result_2.success) {
                setNumbers(result_2.content);
            } else {
                setError(result_2.errorMessage);
            }
            setCurrentPageloading(false);
        }
        loadData();
    }, [pageNum, itemsPerPage]);

    async function handleSubmit(number_id) {
        setClaimStatus(prevState => ({
            ...prevState,
            [number_id]: { status: 'claiming' }
        }));

        const result = await handleClaimNumber(number_id);

        if (result.success) {
            setClaimStatus(prevState => ({
                ...prevState,
                [number_id]: { status: 'claimed' }
            }));
        } else {
            setClaimStatus(prevState => ({
                ...prevState,
                [number_id]: { status: 'error', message: result.errorMessage }
            }));
        }
    }
    function handleChangePage(event, value){
        setPageNum(value);
    }
    function handleItemsPerPageChange(event) {
        setItemsPerPage(event.target.value);
        setPageNum(1);
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems:'center' }}>
            <PageTitle sx={{ mt: 10, textAlign: 'center' }}>
                Country Numbers
            </PageTitle>


            <Box
                display="flex"
                sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
                {country &&
                <>
                    <Box
                        component="img"
                        src={`https://flagcdn.com/w320/${country?.country_name_code.toLowerCase()}.png`}
                        alt={`${country?.name} flag`}
                        sx={{ maxWidth: '1500px', minWidth: '20px', maxHeight: '100px', mb: '10px', borderRadius: '3px', boxShadow: 3 }}
                    />

                    <Typography variant="h4" color="text.secondary" sx={{ textAlign: 'center' }}>
                        {country?.name}
                    </Typography>
                </>
                }
                <br ref={cardStartRef}></br>

            </Box>

            {error && 
                <Box>
                error
                </Box>}
            <DataCardcontainer  currentPageloading={currentPageloading}
            cardArray={numbers}
            states = {[claimStatus]}
            handlers = {[handleSubmit]}
            type ={'CountryNumberCard'}>
                <Box sx={{display: 'flex', flexDirection:'row', justifyContent:'center', width:'100%', mt: '50px'}}>
                    <Pagination count={pageCount} page={pageNum} size="large" onChange={handleChangePage} sx={{display: 'flex',justifyContent:'center'}}/>   
                    <ListSelect  value= {itemsPerPage} handler={handleItemsPerPageChange}  />
                </Box>
            </DataCardcontainer>



        </Container>
    );
}
