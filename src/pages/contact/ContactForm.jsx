import * as React from 'react';
import {Formik, Form, Field} from 'formik';
import {
  Button,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import {
  TextField,
  TextFieldProps,
} from 'formik-material-ui';
import CustomInput from './CustomInput'
import Box from '@material-ui/core/Box';


const ContactForm = () => {

  // const classes = useStyles();
  return <Formik
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
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
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
};

export default ContactForm;

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