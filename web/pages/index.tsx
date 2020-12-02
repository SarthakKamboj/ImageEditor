import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { Button } from 'shards-react';
import TextInput from '../components/WrapperComponents/Button/TextInput/TextInput';
import styles from '../styles/sass/index.module.scss';

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

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '380px',
                }}
            >
                <TextField
                    id="filled-basic"
                    label="Username"
                    variant="filled"
                />
                <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    type="email"
                />
                <TextField
                    id="filled-basic"
                    label="Password"
                    type="password"
                    variant="filled"
                />
                <Button
                    type="submit"
                    style={{ borderRadius: '50px', width: '200px' }}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default Index;
