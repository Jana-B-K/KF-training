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