import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox({ searchTerm, setSearchTerm }) {
  return (
    <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
      <TextField
        placeholder="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: { xs: '90%', sm: '50%', md: '45%' },
        }}
        slotProps={{
            input: {
                startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
              sx: {
                bgcolor: 'background.secondary',
              },
            },
          }}
      />
    </Box>
  );
}
