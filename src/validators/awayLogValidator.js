import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.associate === undefined || data.associate === null || isNaN(data.associate) || data.associate === "") {
        errors.associate = 'This field is required';
    }
    if (data.startDate === undefined || data.startDate === null || isNaN(data.startDate) || data.startDate === "") {
        errors.startDate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
