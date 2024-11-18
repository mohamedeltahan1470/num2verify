import * as React from 'react';
import { useTheme } from '@mui/material';

export default function GlowyShadow({ children, noGlowOnHover }) {
    const theme = useTheme();

    const boxShadowSx = {
        boxShadow: theme.palette.mode === 'dark' 
            ? '0px 4px 20px rgba(0, 23, 173, 0.3)' 
            : '0px 4px 20px rgba(25, 118, 210, 0.3)',
        ...(!noGlowOnHover && {
            ':hover': {
                boxShadow: theme.palette.mode === 'dark' 
                    ? '0px 4px 20px rgba(0, 23, 173, 0.9)' 
                    : '0px 4px 20px rgba(25, 118, 210, 0.9)',
            }
        })
    };

    return React.cloneElement(children, {
        sx: {
            ...boxShadowSx,
            ...children.props.sx
        }
    });
}
