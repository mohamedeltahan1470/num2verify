import React from 'react';
import { Typography, Box, Badge, Paper } from '@mui/material';
import GlowyShadow from '../primitives/GlowyShadow';


const SlidingCard = ({ Badgestep, image, title, body, children }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const cardRef = React.useRef(null);
    const windowHeight = window.innerHeight;
  
    const handleScroll = () => {
      if (cardRef.current) {
        const cardTop = cardRef.current.getBoundingClientRect().top;
        const cardBottom = cardRef.current.getBoundingClientRect().bottom;
  
        if (cardTop < windowHeight * 0.7 && cardBottom > windowHeight * 0.7) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };
  
    React.useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
        <Box sx={{display:'flex', justifyContent:'center', mt: 4, mb: 4, height: '900px' }}>
            <GlowyShadow noGlowOnHover={true}>

                <Paper
                ref={cardRef}
                sx={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    top: windowHeight * 0.25,
                    display: 'flex',
                    position: 'sticky',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40%',
                    width: {sm:'100%',md:'80%'},
                    padding: '1.5em',
                    bgcolor: 'background.secondary',
                }}
                >

                {image ? (
                    <Box
                    component="img"
                    src={image}
                    sx={{ flexShrink: 0, minWidth: '50px', width: '15%', height: 'auto', marginRight: '1em' }}
                    />
                ) : (
                    ""
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'start', alignItems:'center', width: '100%' }}>

                    <CardBadge Badgestep={Badgestep}>

                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb:'35px', textAlign:'center' }}>{title}</Typography>

                    </CardBadge>

                    <Typography variant="h5" sx={{ mb: children ? '35px' : '0', textAlign: 'center' }}>
                        {body}
                    </Typography>

                    {children}
                </Box>

                </Paper>
            </GlowyShadow>

        </Box>
    );
  };
  
  function CardBadge({ Badgestep, children }) {
    return (
      <>
        {Badgestep ? (
          <Badge
            badgeContent={Badgestep}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            color="primary"
            sx={{    '.MuiBadge-standard': {
              width: 50,
              height: 50,
              borderRadius: '50%',
              fontSize: '32px',
              fontWeight: '900px',
              minWidth: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: '50%',
              mt: '-45px',
            },}}
          >
            {children}
          </Badge>
        ) : (
          children
        )}
      </>
    );
  }

  export default SlidingCard;