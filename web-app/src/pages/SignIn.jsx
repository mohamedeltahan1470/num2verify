import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../modules/primitives/Typography';
import TextField from '@mui/material/TextField';
import SubmitButton from '../modules/primitives/SubmitButton';
import AppForm from '../modules/primitives/AppForm';
import { useAuth } from '../context';
import { useForm, Controller } from 'react-hook-form';
import { validate } from '../utilities/FormValidate';
import FormFields from '../modules/primitives/FormFields';
import SubmitError from '../modules/primitives/SubmitError';

export default function SignIn() {
  const { handleLogin, handleResendActivation } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: async (values) => {
      const validationErrors = validate(values, ['email', 'password']);
      return { values: Object.keys(validationErrors).length ? {} : values, errors: validationErrors };
    }
  });
  
  const onSubmit = async (data) => {
    clearErrors();
    const result = await handleLogin(data);
    if (result.success){
      navigate('/');
    } else {
      setError('submit', {
        type: 'manual',
        message: result.errorMessage
      });
      if (result.errorMessage === "Activation needed") {
        handleResendActivation(data.email);
        navigate('/activate', {
          state: { email: data.email }
        });
      }
    }
  };

  return (
      <AppForm>

          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link component={RouterLink} to="/signup" underline="always">
              Sign Up here
            </Link>
          </Typography>

        <Box
          sx={{ mt: 6 }}
        >

          <FormFields 
            fields={[
              { name: 'email', label: 'Email' },
              { name: 'password', label: 'Password' }
            ]}
            errors={errors}
            isSubmitting={isSubmitting}
            control={control}
          />
          
          <SubmitError errors={errors} />

          <SubmitButton isSubmitting={isSubmitting} handleSubmit= {handleSubmit(onSubmit)} buttonName = {'Sign In'}/>

        </Box>

        <Typography align="center">
          <Link component={RouterLink} to="/forgotpassword">
            Forgot password?
          </Link>
        </Typography>

      </AppForm>
  );
}
