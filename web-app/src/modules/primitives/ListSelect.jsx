import * as React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


export default function ListSelect({value, handler}){
    return(
        
        <FormControl sx={{ mb: 3, minWidth: 120 }}>
            <InputLabel id="items-per-page-label">Items per page</InputLabel>
            <Select
                labelId="items-per-page-label"
                value={value}
                label="Items per page"
                onChange={handler}
            >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={48}>48</MenuItem>
            </Select>
        </FormControl>
        
    )

}
