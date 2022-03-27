import { Alert, Button, FormControl, Grid, LinearProgress, MenuItem } from '@mui/material';
import { addDays, differenceInBusinessDays, isAfter, isBefore } from 'date-fns';
import { Field, Form, Formik } from 'formik';
import { Select, TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { getLeaveTypes, onMutationError, submitLeave } from '../../src/ApiQueries';
import { AppLayout } from '../../src/layouts/AppLayout';
import { format } from 'date-fns'

export default function Leaves() {

    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, data: leaveTypes = [] } = useQuery(['leaveTypes'], getLeaveTypes)
    const { mutate } = useMutation(submitLeave, {
        onSuccess: (data, values) => {
            enqueueSnackbar('Wniosek złożony!', { variant: 'success' });
        },
        onSettled: (data, errorm, values) => {
            values.resetForm();
        },
        onError: (error, reponse) => onMutationError(enqueueSnackbar, error)
    });

    return (
        <AppLayout isLoading={isLoading} title="Urlopy" subtitle={`Wniosek urlopowy`}>
            <Formik isInitialValid={false} initialValues={{
                from: new Date(),
                to: addDays(new Date(), 1),
                type: 'VACATION',
                deputy: '',
                comment: ''
            }}
                    validate={values => {
                        const errors = {};
                        if (!values.deputy) {
                            errors.deputy = true;
                        }
                        if (!values.deputy.length) {
                            errors.deputy = 'wprowadź zastępstwo'
                        }
                        if (differenceInBusinessDays(values.to, values.from) === 0) {
                            errors.noDays = true;
                        }
                        if (isBefore(values.to, values.from)) {
                            errors.to = 'data zakończenia urlopu nie może być przed jego rozpoczęciem';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        const DATE_FORMAT = 'yyyy-MM-dd';
                        const from = format(values.from, DATE_FORMAT);
                        const to = format(values.to, DATE_FORMAT);
                        return mutate({ values: {...values, from, to}, resetForm });
                    }}
            >
                {({ submitForm, isSubmitting, values, setFieldValue, setFieldTouched, isValid }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <Field
                                        name="type"
                                        component={Select}
                                        label="Rodzaj urlopu"
                                        required
                                    >
                                        {leaveTypes.map(it => <MenuItem key={it.id} value={it.id}>{it.name}</MenuItem>)}
                                    </Field>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="from"
                                    component={DatePicker}
                                    autoOk
                                    inputVariant="outlined"
                                    textField={{ fullWidth: true }}
                                    label="Data rozpoczęcia urlopu"
                                    required
                                    minDate={new Date()}
                                    onChange={(value) => {
                                        setFieldValue('from', value)
                                        if (isAfter(value, values.to)) setFieldValue('to', addDays(value, 1));
                                        setFieldTouched('to', false, false);
                                    }}
                                    format="DD-MM-yyyy"
                                    cancelLabel="Anuluj"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="to"
                                    component={DatePicker}
                                    autoOk
                                    inputVariant="outlined"
                                    textField={{ fullWidth: true }}
                                    label="Data zakończenia urlopu"
                                    required
                                    minDate={addDays(values.from, 1)}
                                    format="DD-MM-yyyy"
                                    cancelLabel="Anuluj"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    name="deputy"
                                    type="text"
                                    component={TextField}
                                    fullWidth
                                    label="Osoba zastępująca"
                                    placeholder="Imię Nazwisko"
                                    variant="outlined"
                                    margin="none"
                                    required
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    name="comment"
                                    type="text"
                                    component={TextField}
                                    fullWidth
                                    label="Komentarz"
                                    variant="outlined"
                                    margin="none"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Alert
                                    severity={differenceInBusinessDays(values.to, values.from) === 0 ? 'error' : 'info'}>Wybrana
                                    liczba dni na
                                    urlopie: <strong>{differenceInBusinessDays(values.to, values.from)}</strong>
                                </Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit"
                                        size="large"
                                        disabled={isSubmitting || !isValid}
                                        onClick={submitForm}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                >Wyślij</Button>
                            </Grid>
                            {isSubmitting && <LinearProgress/>}
                        </Grid>
                    </Form>
                )}
            </Formik>
        </AppLayout>
    );
}
