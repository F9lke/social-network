const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNewsInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.information = !isEmpty(data.information) ? data.information : '';


    if (!Validator.isLength(data.title, { min: 5, max: 30 })) {
        errors.title = 'title must be between 5 and 30 characters';
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (!Validator.isLength(data.information, { min: 10, max: 300 })) {
        errors.information = 'Information must be between 10 and 300 characters';
    }
    if (Validator.isEmpty(data.information)) {
        errors.information = 'Text field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}