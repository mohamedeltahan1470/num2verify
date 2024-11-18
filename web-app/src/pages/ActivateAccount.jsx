import * as React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '../modules/primitives/Button';
import Link from '@mui/material/Link';
import Typography from '../modules/primitives/Typography';
import SubmitButton from '../modules/primitives/SubmitButton';
import AppForm from '../modules/primitives/AppForm';
import { useAuth } from '../context';
import { useForm } from 'react-hook-form';
import FormFields from '../modules/primitives/FormFields';
import SubmitError from '../modules/primitives/SubmitError';

const validate = (values) => {
  const errors = {};
  return errors;
};

export default function ActivateAccount() {
  const [resentMessage, setResentMessage] = React.useState(false);
  const [activationEmail, setActivationEmail] = React.useState(null);
  const [activated, setActivated] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    console.log(location)
    if (location.state?.email && !activationEmail) {
      console.log("flag")
      setActivationEmail(location.state.email);
    }

  }, []);

  const { tempNewSignupData, handleSendActivation, handleResendActivation } = useAuth();
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
      const validationErrors = validate(values);
      return { values: Object.keys(validationErrors).length ? {} : values, errors: validationErrors };
    }
  });

  const onSubmit = async (data) => {
    clearErrors();
    if (!activationEmail && !tempNewSignupData) {
      const result = await handleResendActivation(data.email);
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
      const payload = activationEmail ? { ...data, email: activationEmail } : { ...data, email: tempNewSignupData.user_details.email };
      console.log(payload)
      const result = await handleSendActivation(payload);
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
    const email = activationEmail ? activationEmail : tempNewSignupData.user_details.email;
    setResentMessage(false);
    const result = await handleResendActivation(email);
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
          {activated? "Account Activated": activationEmail || tempNewSignupData  ? 'Enter Activation Code': 'Enter Activation Email'}
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


        {(!activationEmail && !tempNewSignupData && !activated) && (
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
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address',
                }
              }}
            />

            <SubmitError errors={errors} />

            <SubmitButton isSubmitting={isSubmitting} handleSubmit= {handleSubmit(onSubmit)} buttonName = {'Get Code'}/>

          </Box>
        )}

        {((activationEmail || tempNewSignupData) && !activated) && (
          <React.Fragment>
            <Typography variant="body2" align="center">
              {'We sent an activation code to your email.'}
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
                  { name: 'activationCode', label: 'Activation Code' },
                ]}
                errors={errors}
                isSubmitting={isSubmitting}
                control={control}
                rules={{
                  required: 'Code is required',
                }}
              />
              

              <SubmitError errors={errors} />


              <SubmitButton isSubmitting={isSubmitting} handleSubmit= {handleSubmit(onSubmit)} buttonName = {'Activate'}/>

            </Box>
          </React.Fragment>
        )}

      </AppForm>
    </React.Fragment>
  );
}
