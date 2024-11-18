import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Avatar, IconButton, Typography, Paper } from '@mui/material';
import { useAuth } from '../context';
import EditIcon from '@mui/icons-material/Edit';
import { validate } from '../utilities/FormValidate';
import FormFields from '../modules/primitives/FormFields';
import AppForm from '../modules/primitives/AppForm';
import SubmitCancelButtonCombo from '../modules/primitives/SubmitCancelButtonCombo';
import SubmitError from '../modules/primitives/SubmitError';

export function Slot({ children }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
      {children}
    </Box>
  );
}

const filteredUserData = (user, keys) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => keys.includes(key))
  );
};

export default function Profile() {
  const { loading, userData, handleProfileDataUpdate } = useAuth();

  const keys = ['first_name', 'last_name', 'email', 'picture'];
  const [profilePic, setProfilePic] = React.useState(null);
  const [editable, setEditable] = React.useState(false);
  const [editingPassword, setEditingPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: async (values) => {
      const validationKeys = editingPassword ? ['old_password', 'new_password', 'confirm_new_password'] : [];
      const validationErrors = validate(values, validationKeys);
      return { values: Object.keys(validationErrors).length ? {} : values, errors: validationErrors };
    }
  });

  React.useEffect(() => {
    const filteredData = filteredUserData(userData, keys);
    setProfilePic({profilePicURL: filteredData.picture, profilePicFile: null});
    Object.keys(filteredData).forEach((key) => setValue(key, filteredData[key]));
  }, []);
  
  React.useEffect(() => {
    if (!editingPassword) {
      setValue('old_password', '');
      setValue('new_password', '');
      setValue('confirm_new_password', '');
      clearErrors(['old_password', 'new_password', 'confirm_new_password']);
    }
  }, [editingPassword]);

  const onSubmit = async (data) => {
    console.log(data);
    clearErrors();
    
    const submissionData = editingPassword
      ? (({ password, ...rest }) => rest)(data)
      : (({ password, old_password, new_password, confirm_new_password, ...rest }) => rest)(data);

    const result = await handleProfileDataUpdate(submissionData, editingPassword);
    if (result.success) {
      setEditable(false);
      setEditingPassword(false);
    } else {
      setError('submit', {
        type: 'manual',
        message: result.errorMessage
      });
    }
  };

  const handleCancel = () => {
    reset();
    setEditable(false);
    setEditingPassword(false);
    setProfilePic({profilePicURL: userData.picture, profilePicFile: null});
  };

  if (loading) {
    return <div>Loading...</div>;
  }
   const passwordEditToggle = editable && (
    <IconButton onClick={() => { setEditingPassword(!editingPassword); clearErrors(); }} sx={{ width: 50, height: 50, ml: 2 }}>
      <EditIcon />
    </IconButton>
  )
  return (
    <AppForm extraSx={{}}>

      <Typography variant="h2" align="center" sx={{ mb: 4 }}>
        Profile
      </Typography>

      <Box
      sx={{ mt: 6 }}
      >

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src={profilePic?.profilePicURL}
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'grey.300',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </Box>
        </Box>

        <FormFields
          fields={[
            { name: 'email', label: 'Email', disabled: true},
            { name: 'first_name', label: 'First Name', disabled: !editable },
            { name: 'last_name', label: 'Last Name', disabled: !editable }
          ]}
          errors={errors}
          isSubmitting={isSubmitting}
          control={control}
        />

        {!editingPassword ? (

          <FormFields
          fields={[
            { name: 'password', label: 'Password', disabled: true, value: "********", neighborFields: [passwordEditToggle]},
          ]}
          errors={errors}
          isSubmitting={isSubmitting}
          control={control}
          />
        ) : (
          <FormFields
            fields={[
              { name: 'old_password', label: 'Old Password', disabled: !editable, neighborFields: [passwordEditToggle]},
              { name: 'new_password', label: 'New Password', disabled: !editable},
              { name: 'confirm_new_password', label: 'Confirm New Password', disabled: !editable }
            ]}
            errors={errors}
            isSubmitting={isSubmitting}
            control={control}
          />
        )}

        <SubmitError errors={errors} />

        <SubmitCancelButtonCombo 
          isSubmitting={isSubmitting} 
          editable={editable} 
          setEditable={setEditable} 
          handleSubmit={handleSubmit(onSubmit)} 
          handleCancel={handleCancel} 
        />

      </Box>
      
    </AppForm>
  );
}
