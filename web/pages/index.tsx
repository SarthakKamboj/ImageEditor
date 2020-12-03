import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
    username: string;
    password: string;
    email: string;
}

const Index = () => {
    const { handleSubmit, register, errors } = useForm<FormData>();

    const onSubmit = (formData: FormData) => {
        console.log(formData);
    };

    return <div></div>;
};

export default Index;
