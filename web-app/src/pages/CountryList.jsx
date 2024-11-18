import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, CardContent, Typography, Box, Paper, Skeleton } from '@mui/material';
import { useAuth } from '../context';
import SearchBox from '../modules/components/SearchBox';
import CountryCard from '../modules/components/CountryCard.jsx';
import DataCardcontainer from '../modules/components/DataCardContainer';
import PageTitle from '../modules/primitives/PageTitle.jsx';

export default function CountryList() {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPageloading, setCurrentPageloading] = React.useState(true);

    const {handlegetCountryListOrNumbers } = useAuth();

    React.useEffect(() => {
        async function loadData() {
            const result = await handlegetCountryListOrNumbers();
            if (result.success) {
                setData(result.content);
            } else {
                setError(result.errorMessage);
            }
            setCurrentPageloading(false);
        }
        loadData();
    }, []);

    const filteredCountries = data?.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.country_name_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.country_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
      
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor:'background.default' }}>
            <PageTitle sx={{ mt: 10, textAlign: 'center' }}>
                Available Countries
            </PageTitle>
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <DataCardcontainer currentPageloading={currentPageloading}
            cardArray={filteredCountries}
            type ={'CountryCard'}/>

        </Box>
    );
};
