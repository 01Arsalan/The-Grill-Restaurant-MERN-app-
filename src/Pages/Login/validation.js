import * as Yup from 'yup';

export const validationSchema = Yup.object({
    fullName: Yup.string()
        .min(2, 'Full Name must be at least 2 characters')
        .required('Full Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    address: Yup.string()
        .min(10, 'Address must be at least 10 characters')
        .required('Address is required'),
    gender: Yup.string()
        .oneOf(['male', 'female'], 'Gender is required')
        .required('Gender is required'),
    dateOfBirth: Yup.date()
        .required('Date of Birth is required')
});


//for bootstrap validation effects
export const formValidation = () => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
};