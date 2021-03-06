import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useSnackbar } from 'notistack';
import React from 'react';
import logo from '../public/logo.svg';
import Copyright from './components/Copyright';

export default function Login({ onToken }) {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'column'
            }}>
                <Box p={3} pt={5} pb={5} textAlign="center">
                    <img src={logo.src} alt="logo" style={{ width: '300px', height: '82px' }}/>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                    <Formik initialValues={{ username: '', password: '' }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = 'Required';
                                }
                                if (!values.password) {
                                    errors.password = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/login`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                    },
                                    body: `username=${encodeURIComponent(values.username)}&password=${encodeURIComponent(values.password)}`
                                })
                                    .then(response => response.json())
                                    .then(json => onToken(json.token))
                                    .catch(reason => {
                                        enqueueSnackbar('Logowanie nieudane.', { variant: 'error' });
                                    })
                                    .then(() => setSubmitting(false))
                            }}
                    >
                        {({ submitForm, isSubmitting }) => (
                            <Form style={{ width: '100%' }}>
                                <Box mx={3}>
                                    <Field
                                        fullWidth
                                        component={TextField}
                                        name="username"
                                        type="text"
                                        label="Login"
                                        margin="normal"
                                        required
                                        autoFocus
                                    />
                                </Box>
                                <Box mx={3}>
                                    <Field
                                        fullWidth
                                        component={TextField}
                                        type="password"
                                        label="Has??o"
                                        name="password"
                                        required
                                        margin="normal"
                                    />
                                </Box>
                                <Box m={3}>
                                    <Button
                                        type="submit"
                                        size="large"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Wy??lij
                                    </Button>
                                </Box>
                                <Box p={3}>{isSubmitting && <LinearProgress/>}</Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <Copyright/>
            </Container>
        </React.Fragment>
    )
}