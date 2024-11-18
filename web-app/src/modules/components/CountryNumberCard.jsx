import * as React from 'react';
import { Typography, Paper, CardContent, Box, IconButton, Tooltip, Button, Alert } from '@mui/material';
import countryData from 'country-telephone-data';   
import CardPaper from '../primitives/CardPaper';

export default function CountryNumberCard({numberObj, claimStatus, handleSubmit}) {
    const [number, setnumber] = React.useState(numberObj)
    const [country, setCountry] = React.useState(() => {
        const phoneNumber = number.number;
        const matchedCountry = countryData.allCountries.find(country => phoneNumber.startsWith(country.dialCode));
        const country = matchedCountry? {
            "name": matchedCountry.name.split(" ")[0],
            "country_code": '+' + matchedCountry.dialCode,
            "country_name_code": (matchedCountry.iso2).toUpperCase(),
        } : null
        return country;
    })

        const numberClaimStatus = claimStatus[number.id]?.status || 'idle';

    return (
        
            <CardPaper
                key={number.id}
            >
                <CardContent>
                    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1, mb: 2 }}
                        >
                            {number.number}
                        </Typography>
                        {numberClaimStatus === 'claimed' && (
                            <Alert severity="success">Number claimed!</Alert>
                        )}
                        {numberClaimStatus === 'error' && (
                            <Alert severity="error">{claimStatus[number.id]?.message}</Alert>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSubmit(number.id)}
                            disabled={numberClaimStatus !== 'idle'}
                        >
                            {numberClaimStatus === 'claiming' ? 'Claiming...' :
                                numberClaimStatus === 'claimed' ? 'Claimed' : 'Claim'}
                        </Button>
                    </Box>
                </CardContent>
            </CardPaper>
    )
}