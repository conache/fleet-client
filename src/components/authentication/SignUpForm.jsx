import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { signUp } from "../../ducks/user";
import { Formik, Form } from 'formik';

class SignUpForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      signupCompleted: false,
    };
  }

  componentDidUpdate() {
    if (this.state.signupCompleted) {
      this.props.history.push("/login");
    }
  }

  render() {

    return <Grid container direction="column" justify="center" alignItems="center"
      style={{ marginTop: '15%' }}>
      <Paper elevation={3}>
        <Formik initialValues={{ name: "", company: "", email: "", password: "" }} onSubmit={(values) => this.handleSignUpSubmit(values)} >
          {props => {
            const { handleChange } = props;
            return <Form>
              <h2>Sign up</h2>
              <TextField type="text" name="name" label="Name" fullWidth margin="normal" onChange={handleChange} />
              <TextField type="text" name="company" label="Company" fullWidth margin="normal" onChange={handleChange} />
              <TextField type="email" name="email" label="Email" fullWidth margin="normal" onChange={handleChange} />
              <TextField name="password" type="password" label="Password" fullWidth margin="normal" onChange={handleChange} />
              <Button type="submit" variant="contained" color="primary">Sign Up</Button>
            </Form>
          }}
        </Formik>
      </Paper>
    </Grid>
  }

  handleSignUpSubmit(userData) {
    const {signUp} = this.props;

    signUp(userData).then(() => {
      this.setState({signupCompleted: true});
    });
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUpForm);