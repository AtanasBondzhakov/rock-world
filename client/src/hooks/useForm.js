import { useState } from "react";

export default function useForm(initialValues, submitHandler) {
    const [formValues, setFormValues] = useState(initialValues);

    const onChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await submitHandler(formValues);

        setFormValues(initialValues);
    }

    return {
        formValues,
        onChange,
        onSubmit
    };
}