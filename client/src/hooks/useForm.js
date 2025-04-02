import { useCallback, useState } from "react";

export default function useForm(initialValues, submitHandler, validationSchema) {
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const onChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const updateFormValues = useCallback( (newValues) => {
        setFormValues(prevValues => ({ ...prevValues, ...newValues }));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema?.validate(formValues, { abortEarly: false });
            await submitHandler(formValues);

            setFormErrors({});
            setFormValues(initialValues);
        } catch (err) {
            const validationErrors = {};

            err?.inner?.forEach(error => {
                validationErrors[error.path] = error.message;
            });

            setFormErrors(validationErrors);
        }
    };

    return {
        formValues,
        formErrors,
        onChange,
        onSubmit,
        updateFormValues
    }
}