import React, {useState} from 'react';
import {Formik, Form } from 'formik';
import axios from 'axios'
import {
  Button,
  LinearProgress,
} from '@material-ui/core';
import CustomInput from './CustomInput'
import Box from '@material-ui/core/Box';
import FormResult from './FormResult';


const ContactForm = () => {

  const [serverState, setServerState] = useState(undefined);
  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
  };

  return (serverState ? 
    <FormResult status={serverState.ok} msg={serverState.msg}/>
    : <Formik
    initialValues={{
      name: '',
      email: '',
      message: '',
    }}

    validate={(values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Please enter an email';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }

      if (!values.name) {
        errors.name = 'Please enter a name';
      }

      if (!values.message) {
        errors.message = 'Please enter a message';
      }
      return errors;
    }}
    onSubmit={(values, {setSubmitting}) => {
      axios({
        method: "POST",
        url: "https://formspree.io/f/mbjpzkgb",
        data: values
      })
        .then(response => {
          setSubmitting(false);
          handleServerResponse(true, "Thank you for the feedback.");
        })
        .catch(error => {
          setSubmitting(false);
          handleServerResponse(false, error.response.data.error);
        });
    }}
  >
    {({submitForm, isSubmitting, touched, errors}) => (
        <Form >
          <Box margin={2}>
            <CustomInput type="text" name="name" label="Name"/>
          </Box>
          
          <Box margin={2}>
            <CustomInput type="email" name="email" label="Email"/>
          </Box>

          <Box margin={2}>
            <CustomInput type="text" name="message" label="Message" multiline rows={4}/>
          </Box>

          {isSubmitting && <LinearProgress />}
          <Box margin={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Box>
        </Form>
    )}
  </Formik>
  )
};

export default ContactForm;