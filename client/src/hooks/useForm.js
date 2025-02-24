import { useState } from "react";

export default function useForm(initialValues, submitHandler, validationSchema) {
    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formValues, { abortEarly: false });
            await submitHandler(formValues);

            setErrors({});
            setFormValues(initialValues);
        } catch (err) {
            const validationErrors = {};
            
            err.inner.forEach(error => {              
                validationErrors[error.path] = error.message;
            });

            setErrors(validationErrors);
        }
    };

    return {
        formValues,
        errors,
        onChange,
        onSubmit
    }
}