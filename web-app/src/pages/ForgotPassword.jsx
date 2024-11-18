import * as React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '../modules/primitives/Button';
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

export default function ActivateAccount() {
  const [resentMessage, setResentMessage] = React.useState(false);
  const [activationEmail, setActivationEmail] = React.useState(null);
  const [activated, setActivated] = React.useState(false);

  const { handleForgottenPassword, handleGetForgottenPasswordCode } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
    resolver: async (values) => {
      const validationErrors = validate(values, ['email', 'password_reset_code' , 'new_password', 'confirm_new_password']);
      return { values: Object.keys(validationErrors).length ? {} : values, errors: validationErrors };
    }
  });

  const onSubmit = async (data) => {
    clearErrors();
    if (!activationEmail) {
      const result = await handleGetForgottenPasswordCode(data.email);
      if (result.success) {
        setActivationEmail(data.email);
      } else {
        setError('submit', {
          type: 'manual',
          message: result.errorMessage
        });
      }
    } else {
      console.log(activationEmail)
      const payload = { ...data, email: activationEmail };
      console.log(payload)
      const result = await handleForgottenPassword(payload);
      if (result.success) {
        setActivated(true)
        setActivationEmail(null)
      } else {
        setError('submit', {
          type: 'manual',
          message: result.errorMessage
        });
      }
    }
  };

  const handleResendCode = async () => {
    const email = activationEmail;
    setResentMessage(false);
    const result = await handleGetForgottenPasswordCode(email);
    if (result.success) {
      setResentMessage(true);
    } else {
      setError('submit', {
        type: 'manual',
        message: result.errorMessage
      });
    }
  };

  return (
    <React.Fragment>
      <AppForm>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          {activated? "Password Reset Susccessfully": activationEmail ? 'Enter New Password': 'Enter Your Email'}
        </Typography>
        {activated && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
          </Box>
        )}


        {(!activationEmail && !activated) && (
          <Box
            sx={{ mt: 6 }}
          >

          <FormFields 
            fields={[
              { name: 'email', label: 'Email' },
            ]}
            errors={errors}
            isSubmitting={isSubmitting}
            control={control}
          />

          <SubmitError errors={errors} />


          <SubmitButton isSubmitting={isSubmitting} handleSubmit= {handleSubmit(onSubmit)} buttonName = {'Get Code'}/>

          </Box>
        )}

        {(activationEmail && !activated) && (
          <React.Fragment>
            <Typography variant="body2" align="center">
              {'We sent a password reset code to your email.'}
              <Link
                component="button"
                onClick={handleResendCode}
                underline="always"
                sx={{ cursor: 'pointer' }}
              >
                Resend
              </Link>
            </Typography>
            {resentMessage && (
              <Typography color="primary" align="center" sx={{ mt: 2 }}>
                Code was sent!
              </Typography>
            )}

            <Box
              sx={{ mt: 6 }}
            >

              <FormFields 
                fields={[
                  { name: 'password_reset_code', label: 'Reset Code' },
                  { name: 'new_password', label: 'New Password' },
                  { name: 'confirm_new_password', label: 'Confirm New Password' }

                ]}
                errors={errors}
                isSubmitting={isSubmitting}
                control={control}
              />

              <SubmitButton isSubmitting={isSubmitting} handleSubmit= {handleSubmit(onSubmit)} buttonName = {'Confirm'}/>

            </Box>
          </React.Fragment>
        )}

      </AppForm>
    </React.Fragment>
  );
}
