import React, { useState } from 'react';
// import { Button } from 'shards-react';
import { Button, Form, FormGroup, FormInput } from 'shards-react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
    username: string;
    password: string;
    email: string;
};

const Shards = () => {
    const { handleSubmit, control } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <>
            <p>some random text</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <label htmlFor="#username">Username</label>
                    <Controller
                        control={control}
                        as={FormInput}
                        name="username"
                        id="#username"
                        placeholder="Username"
                        defaultValue={''}
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="#password">Password</label>
                    <Controller
                        name="password"
                        defaultValue={''}
                        type="password"
                        id="#password"
                        placeholder="Password"
                        control={control}
                        as={FormInput}
                    />
                </FormGroup>
                <Button pill theme="dark" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default Shards;
