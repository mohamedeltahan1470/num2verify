import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const ButtonRoot = styled(MuiButton)(({ theme, darkerOnDarkMode }) => ({
  borderRadius: 12,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: theme.typography.h1.fontFamily,
  padding: theme.spacing(2, 4),
  fontSize: theme.typography.pxToRem(14),
  backgroundColor: theme.palette.mode === 'dark' && darkerOnDarkMode &&
   theme.palette.primary.dark ,
  boxShadow: 'none',
  '&:active, &:focus': {
    boxShadow: 'none',
  },
  variants: [
    {
      props: {
        size: 'small',
      },
      style: {
        padding: theme.spacing(1, 3),
        fontSize: theme.typography.pxToRem(13),
      },
    },
    {
      props: {
        size: 'large',
      },
      style: {
        padding: theme.spacing(2, 5),
        fontSize: theme.typography.pxToRem(16),
      },
    },
  ],
}));

function Button(props) {
  return <ButtonRoot {...props} />;
}

export default Button;
