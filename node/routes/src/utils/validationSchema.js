export const createValidationSchema = {
  username: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Username is required"
    },
    isString: {
      errorMessage: "Username must be a string"
    },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: "Username must be between 3 and 50 characters"
    },
    trim: true
  },

  age: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Age is required"
    },
    isInt: {
      options: { min: 18, max: 120 },
      errorMessage: "Age must be between 18 and 120"
    },
    toInt: true
  },

  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Password is required"
    },
    isString: {
      errorMessage: "Password must be a string"
    },
    isLength: {
      options: { min: 4, max: 50 },
      errorMessage: "Password must be between 4 and 50 characters"
    }
  }
};


export const filterValidationSchema = {
    key: {
        optional: true,
        isString: {
            errorMessage: "This key must be string"
        },
        notEmpty: {
            errorMessage: "Key must not be empty"
        },
        isLength: {
            options: { min: 3, max: 10},
            errorMessage: "This key must be between 3-10 character"
        },
        in: ['query']
    },
    value: {
        optional: true,
        isString: {
            errorMessage: "This value must be string"
        },
        notEmpty: {
            errorMessage: "value must not be empty"
        },
        in: ['query']
    }
}

export const createProductValidationSchema = {
    name:{
        in: ['body'],
        notEmpty: {
            errorMessage: "Product name should not empty"
        },
        isString: {
            errorMessage: 'Product name should be a string'
        },
        isLength: {
            options: { min: 3},
            errorMessage: 'Product name should be above 3 character'
        }
    },
    price: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Price should not empty"
        },
        isFloat: {
            options: { min: 1000},
            errorMessage: "Price must be above 1000"
        },
        toFloat: true
    }
}

export const productFilterValidationSchema = {
    filter:{
        in: ['query'],
        notEmpty: {
            errorMessage: "Filter should not empty"
        },
        isString: {
            errorMessage: 'Filter should be a string'
        },
        isLength: {
            options: { min: 3},
            errorMessage: 'Filter should be above 3 character'
        }
    },
    value: {
        in: ['query'],
        notEmpty: {
            errorMessage: "Value should not empty"
        },
        isString: {
            errorMessage: "Value must be a string"
        }
    }
}