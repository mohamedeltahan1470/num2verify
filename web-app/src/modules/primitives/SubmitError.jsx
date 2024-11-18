import * as React from 'react';
import { Typography } from '@mui/material';

export default function SubmitError({errors}){
    return (
        <>
            {errors.submit && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center'}}>
              {errors.submit.message}
            </Typography>
            )} 
        </>

    )
}