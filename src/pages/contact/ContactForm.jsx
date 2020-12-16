import React from "react";
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';

function ContactForm() {
  return (
    <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validate={values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
  >
    {({ submitForm, isSubmitting }) => (
      <Form>
        <Box margin={1}>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
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
}

export default ContactForm



// export default class ContactForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.submitForm = this.submitForm.bind(this);
//     this.state = {
//       status: ""
//     };
//   }

//   render() {
//     const { status } = this.state;
//     return (

//       <form
//         onSubmit={this.submitForm}
//         action="https://formspree.io/f/mbjpzkgb"
//         method="POST"
//       >
//         <label>Email:</label>
//         <input type="email" name="email" />
//         <label>Message:</label>
//         <input type="text" name="message" />
//         {status === "SUCCESS" ? <p>Thanks!</p> : 
//         <ButtonGroup>
//           <Button variant="contained" color="secondary" size="small"
//             startIcon={<SaveIcon/>}
//             style={{
//               margin: '3rem',
//               fontSize: 24
//             }}
//             >Submit
//           </Button>
//         </ButtonGroup>
//         }
//         {status === "ERROR" && <p>Ooops! There was an error.</p>}
//       </form>
//     );
//   }

//   submitForm(ev) {
//     ev.preventDefault();
//     const form = ev.target;
//     const data = new FormData(form);
//     const xhr = new XMLHttpRequest();
//     xhr.open(form.method, form.action);
//     xhr.setRequestHeader("Accept", "application/json");
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState !== XMLHttpRequest.DONE) return;
//       if (xhr.status === 200) {
//         form.reset();
//         this.setState({ status: "SUCCESS" });
//       } else {
//         this.setState({ status: "ERROR" });
//       }
//     };
//     xhr.send(data);
//   }
// }