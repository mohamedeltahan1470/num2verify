import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';

export default function FormFields({ fields, errors, isSubmitting, control, rules}) {
  return (
    <>
      {fields.map((field) => {
        {const value = field.value? {value: field.value}: {};
        console.log(field)
        return(
        <AddNeighborFields
          key={field.name}
          field={field}
          errors={errors}
          isSubmitting={isSubmitting}
          control={control}
        >
          <Controller
            name={field.name}
            control={control}
            rules={rules}
            render={({ field: controllerField }) =>
              /password/i.test(field.name) ? (
                <PasswordField
                {...controllerField}
                  label={field.label}
                  name={field.name}
                  errors={errors}
                  isSubmitting={isSubmitting || field.disabled}
                {...value}
                />
              ) : (
                <TextField
                  autoComplete={field.name}
                  {...controllerField}
                  disabled={isSubmitting || field.disabled}
                  margin="normal"
                  fullWidth
                  label={field.label}
                  required
                  error={!!errors[field.name]}
                  helperText={errors[field.name] ? errors[field.name] : ''}
                />
              )
            }
          />
        </AddNeighborFields>
      )}})}
    </>
  );
}

export function PasswordField({ label, name, errors, isSubmitting, value, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePassword = !/^\*+$/.test(value) &&
        <InputAdornment position="end">
          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>

  return (
    <TextField
      {...props}
      disabled={isSubmitting}
      fullWidth
      label={label}
      value = {value}
      type={showPassword ? 'text' : 'password'}
      margin="normal"
      required
      error={!!errors[name]}
      helperText={errors[name] ? errors[name] : ''}
      InputProps={{
        endAdornment: (
          togglePassword
        ),
      }}
    />
  );
}

function AddNeighborFields({ children, field, errors, isSubmitting, control }) {
  return field.neighborFields ? (
    <Box display="flex" {...field.neighborFieldsContainerProps}>
      {children}
      {field.neighborFields.map((neighborField, index) => (
        neighborField.type === 'formField' ? (
          <FormFields
            key={neighborField.name}
            fields={[{ name: neighborField.name, label: neighborField.label }]}
            errors={errors}
            isSubmitting={isSubmitting}
            control={control}
          />
        ) : (
          <React.Fragment key={index}>{neighborField}</React.Fragment>
        )
      ))}
    </Box>
  ) : (
    children
  );
}
