import { Typography } from "@mui/material";

export default function PageTitle({ children, sx, ...props }) {
    return (
        <Typography {...props} variant="h2" sx={{ ...sx, mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            {children}
        </Typography>
    );
}
