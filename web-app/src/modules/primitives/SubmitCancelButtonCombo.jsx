import * as React from 'react';
import { Box, Button } from '@mui/material';


export default function SubmitCancelButtonCombo({isSubmitting, editable, setEditable, handleSubmit, handleCancel, }){
    return(

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>

          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{
              width: '35%',
              paddingY: 1.5,
              backgroundColor: editable ? 'primary.main' : 'primary.main',
              ':hover': {
                backgroundColor: editable ? 'primary.dark' : 'primary.dark',
              },
              color: "White"
            }}
            onClick={editable ? handleSubmit : () => setEditable(!editable)}
          >
            {isSubmitting ? '.. in progress' : editable ? 'Save' : 'Edit'}
          </Button>

          {editable && (
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                width: '35%',
                paddingY: 1.5,
                ml: 2,
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          
        </Box>

    )

}