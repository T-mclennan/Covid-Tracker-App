import React from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'


export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (

      <form
        onSubmit={this.submitForm}
        action="https://formspree.io/f/mbjpzkgb"
        method="POST"
      >
        <label>Email:</label>
        <input type="email" name="email" />
        <label>Message:</label>
        <input type="text" name="message" />
        {status === "SUCCESS" ? <p>Thanks!</p> : 
        <ButtonGroup>
          <Button variant="contained" color="secondary" size="small"
            startIcon={<SaveIcon/>}
            style={{
              margin: '3rem',
              fontSize: 24
            }}
            >Submit
          </Button>
        </ButtonGroup>
        }
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}