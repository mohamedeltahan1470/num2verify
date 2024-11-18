import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, CardContent, Typography, Box, Paper, Skeleton } from '@mui/material';
import CountryCard from './CountryCard';
import UserNumberCard from './NumberCard';
import CountryNumberCard from './CountryNumberCard';

export default function DataCardcontainer({ currentPageloading, cardArray, type, states , handlers, children }) {
    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={3}
            justifyContent="center"
            sx={{ width:1, mb: 10, mt: 4, bgcolor: 'inherit'}}
        >
            {currentPageloading ? (
            <CardloadingSkeleton type = {type}/>
            ) : (
                cardArray && cardArray.length > 0 ? (
                    cardArray.map((card) => {
                        console.log(type)

                        if (type === 'UserNumberCard') {
                            return <UserNumberCard key = {card.id}  numberObj={card} handleOpenDialog={handlers[0]} />;
                        }
                        if (type === 'CountryCard') {
                            return <CountryCard key = {card.id}  country={card} />;
                        }
                        if (type === 'CountryNumberCard') {
                            return <CountryNumberCard key = {card.id} numberObj={card} claimStatus= {states[0]} handleSubmit={handlers[0]} />;
                        }
                        return null;
                    })
                ) : (
                    <Typography variant="h6">No data available</Typography>
                )
            )}
            {children}
        </Box>
    );
}


function CardloadingSkeleton({type}){
    let skeleton = null;
    let numCards = 5;
    let mdCardSize = '16%';

    if (type === 'CountryCard') {
        skeleton = 
        <>
            <Skeleton variant="rounded" width={50} height={30} sx={{ mb: 1 }}/>
            <Skeleton width="80%" height={20}/>
            <Skeleton width="60%" height={20} sx={{ mt: 1.5 }}/>
        </>
        numCards = 8
    }

    if (type === 'CountryNumberCard') {
        skeleton =
        <>
            <Skeleton variant="text" width={100} height={35} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width={70} height={40} />
        </>
        mdCardSize = '25%'
    }

    if (type === 'UserNumberCard') {
        skeleton =
        <>
            <Skeleton variant="rounded" width={50} height={30} sx={{ my: 1 }}/>
            <Skeleton variant="text" width={100} height={35} sx={{ mb: 2 }} />
            <Skeleton variant="text" width={70} height={35} sx={{ mb: 2 }} />
        </>
    }

    return(
        [...Array(numCards)].map((_, index) => (
            <Paper
                key={index}
                elevation={3}
                sx={{ width: { xs: '43%', sm: '25%', md: mdCardSize }, display: 'flex', justifyContent: 'center', bgcolor: 'background.secondary' }}
            >
                <CardContent>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    {skeleton}
                    </Box>
                </CardContent>
            </Paper>
        ))

    )
}

