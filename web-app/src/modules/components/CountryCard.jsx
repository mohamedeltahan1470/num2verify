import * as React from 'react';
import { Typography, Paper, CardContent, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import CardPaper from '../primitives/CardPaper';

export default function CountryCard({ country }) {

    return (
        <CardPaper
            key = {country.id}
        >
            <Link to={`/CountryNumbers/${country.id}`} style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
                <CardContent>
                    <Box
                        display="flex"
                        sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
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

                    <Typography variant="body1" sx={{ textAlign: 'center', mt: 1, color: 'text.secondary' }}>
                        {country.amount} {country.amount==1? 'Number' : 'Numbers'}
                    </Typography>

                </CardContent>
            </Link>
        </CardPaper>
    );
}
