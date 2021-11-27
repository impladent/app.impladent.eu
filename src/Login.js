import { LinearProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import logo from '../public/logo.svg';
import Copyright from './Copyright';

export default function Login({ onToken }) {
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Impladent
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" component="main" sx={{ height: 'calc(100vh - 124px)', marginTop: 2 }}>
                <Box p={3} pt={10} pb={10} textAlign="center">
                    <img src={logo} alt="logo" style="width: 300px; height: 82px"/>
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
                                        label="Hasło"
                                        name="password"
                                        required
                                        margin="normal"
                                    />
                                </Box>
                                <Box m={3}>
                                    <Button
                                        size="large"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Wyślij
                                    </Button>
                                </Box>
                                <Box m={3}>{isSubmitting && <LinearProgress/>}</Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <Copyright/>
            </Container>
        </React.Fragment>
    )
}