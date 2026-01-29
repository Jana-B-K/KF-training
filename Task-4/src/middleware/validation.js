export const createValidationSchema = {
  username: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Username is required'
    },
    trim: true
  },

  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Invalid email format'
    },
    trim: true
  },

  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters'
    }
  },

  role: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Role is required'
    }
  }
};
