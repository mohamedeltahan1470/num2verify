export const validate = (values, requiredFields) => {
    const errors = {};
  
    requiredFields.forEach((field) => {
      if (field in values && !values[field]) {
        errors[field] = 'This field is required';
      }
    });
  
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is not valid';
    }
  
    if (values.password) {
      if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      if (!/[a-zA-Z]/.test(values.password)) {
        errors.password = 'Password must contain at least one letter';
      }
    }
  
    if (values.password && values.confirm_password && values.password !== values.confirm_password) {
      errors.confirm_password = "Passwords don't match";
    }
  
    if (values.new_password) {
      if (values.new_password.length < 8) {
        errors.new_password = 'Password must be at least 8 characters long';
      }
      if (!/[a-zA-Z]/.test(values.new_password)) {
        errors.new_password = 'Password must contain at least one letter';
      }
    }
  
    if (values.new_password && values.confirm_new_password && values.new_password !== values.confirm_new_password) {
      errors.confirm_new_password = "Passwords don't match";
    }
  
  
    return errors;
  };