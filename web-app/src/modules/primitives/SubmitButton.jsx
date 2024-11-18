import * as React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

export default function SubmitButton({isSubmitting, handleSubmit, buttonName, ...others}) {
  return (
    <Button
      sx={{ mt: 3, mb: 2 }}
      disabled = {isSubmitting}
      type="submit"
      variant="contained"
      fullWidth
      onClick = {handleSubmit}
      {...others}
    >
      {isSubmitting ? 'In progress…' : (buttonName || 'Submit')}

    </Button>
  );
}
