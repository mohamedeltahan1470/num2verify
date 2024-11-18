import * as React from 'react';
import { Typography, Paper, CardContent, Box, IconButton, Tooltip } from '@mui/material';
import countryData from 'country-telephone-data';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CardPaper from '../primitives/CardPaper';

export default function UserNumberCard({ numberObj, handleOpenDialog }) {
    const [number, setnumber] = React.useState(numberObj);
    const [country, setCountry] = React.useState(() => {
        const phoneNumber = number.number;
        const matchedCountry = countryData.allCountries.find(country => number.country_name_code
            ? number.country_name_code.toLowerCase() === country.iso2
            : phoneNumber.startsWith(country.dialCode)
                ? phoneNumber.startsWith(country.dialCode)
                : phoneNumber.startsWith(`+${country.dialCode}`));
        console.log(matchedCountry);
        const country = matchedCountry
            ? {
                  name: matchedCountry.name.split('(')[0],
                  country_code: '+' + matchedCountry.dialCode,
                  country_name_code: matchedCountry.iso2.toUpperCase(),
              }
            : null;
        return country;
    });
    const [deleteButtonVisible, setDeleteButtonVisible] = React.useState(false);

    const handleMouseEnter = () => {
        setDeleteButtonVisible(true);
    };

    const handleMouseLeave = () => {
        setDeleteButtonVisible(false);
    };

    return (
        <CardPaper
            key={number.id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                to={`/numbermessages/${number.id}`}
                style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}
            >
                <CardContent>
                    <Box
                        display="flex"
                        sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Box
                            component="img"
                            src={`https://flagcdn.com/w320/${country.country_name_code.toLowerCase()}.png`}
                            alt={`${country.name} flag`}
                            sx={{ maxWidth: '50px', minWidth: '20px', maxHeight: '30px', my: '10px', borderRadius: '3px', boxShadow: 3 }}
                        />
                        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {country.name}
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        sx={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mr: 1 }}>
                            {country.country_name_code}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {country.country_code}
                        </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1, mt: 2 }}>
                        {number.number}
                    </Typography>

                    <Tooltip title="Delete number" placement="top">
                        <IconButton
                            onClick={(event) => {
                                event.preventDefault();
                                handleOpenDialog(number.id);
                            }}
                            className="delete-button"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                color: 'red',
                                visibility: deleteButtonVisible ? 'visible' : 'hidden',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </CardContent>
            </Link>
        </CardPaper>
    );
}
