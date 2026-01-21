export const createValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "User name should not be empty"
        },
        isLength: {
            options: { min: 3, max: 8 },
            errorMessage: "Name should be between 3 to 8 characters"
        },
        isString: {
            errorMessage: "Name should be a string"
        }
    },
   age: {
        notEmpty: {
            errorMessage: "Age is required"
        },
        isInt: {
            options: { min: 18, max: 120 },
            errorMessage: "Age must be between 18 and 120"
        },
        toInt: true
    }
}


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
        notEmpty: {
            errorMessage: "Product name should not empty"
        },
        isString: {
            errorMessage: 'product name should be a string'
        },
        isLength: {
            options: { min: 3},
            errorMessage: 'Product name should be above 3 character'
        }
    },
    price: {
        notEmpty: {
            errorMessage: "price should not empty"
        },
        isInt: {
            options: { min: 1000},
            errorMessage: "price must be above 1000"
        },
        toFloat: true,

    }
}

export const productFilterValidationSchema = {
    filter:{
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
        notEmpty: {
            errorMessage: "price should not empty"
        },
        isInt: {
            options: { min: 1000, max: 5000 },
            errorMessage: "price must be between 1000 - 5000"
        },
        toFloat: true,

    }
}