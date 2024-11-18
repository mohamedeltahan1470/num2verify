import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../modules/primitives/Typography';
import AppForm from '../modules/primitives/AppForm';
import TextField from '@mui/material/TextField';
import SubmitButton from '../modules/primitives/SubmitButton';
import { useAuth } from '../context';
import { useForm, Controller } from 'react-hook-form';
import { validate } from '../utilities/FormValidate';
import FormFields from '../modules/primitives/FormFields';
import SubmitError from '../modules/primitives/SubmitError';

export default function SignUp() {
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();
  
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: ''
    },
    mode: 'onBlur',
    resolver: async (values) => {
      const validationErrors = validate(values, ['email', 'password', 'confirm_password']);
      console.log(validationErrors)

      return { values: Object.keys(validationErrors).length ? {} : values, errors: validationErrors };
    }
  });

  const onSubmit = async (data) => {
    clearErrors();
    const result = await handleSignUp(data);
    if (result.success) {
      navigate('/activate');
    } else {
      setError('submit', {
        type: 'manual',
        message: result.errorMessage
      });
    }Typography
  };

  return (
      <AppForm>

          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link component={RouterLink} to="/signin" underline="always">
              Already have an account?
            </Link>
          </Typography>

        <Box
          sx={{ mt: 6 }}
        >

          <FormFields
            fields={[
              { name: 'email', label: 'Email' },
              { name: 'password', label: 'Password' },
              { name: 'confirm_password', label: 'Confirm Password' },
              { name: 'first_name', label: 'First name' , neighborFields: [{type: 'formField', name: 'last_name', label: 'Last name' }],
                neighborFieldsContainerProps: { flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 } },
            ]}
            errors={errors}
            isSubmitting={isSubmitting}
            control={control}
          />

          <SubmitError errors={errors} />

          <SubmitButton isSubmitting={isSubmitting} handleSubmit= {handleSubmit(onSubmit)} buttonName = {'Sign Up'}/>

        </Box>
      </AppForm>
  );
}
