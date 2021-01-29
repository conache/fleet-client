import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { signUp } from "../../reducers/user.reducer";
import { Formik, Form } from 'formik';

class SignUpForm extends React.Component {
  render() {
    return <Grid container direction="column" justify="center" alignItems="center"
      style={{ marginTop: '15%' }}>
      <Paper elevation={3} style={{maxWidth: "400px",}}>
        <div className="side-nav-container logo">river._</div>
        <Formik initialValues={{ name: "", company: "", email: "", password: "" }} onSubmit={this.props.signUp} >
          {props => {
            const { handleChange } = props;
            return <Form style={{padding: "24px", textAlign: "center",}}>
              <TextField type="text" name="name" label="Name" fullWidth margin="normal" onChange={handleChange} />
              <TextField type="text" name="company" label="Company" fullWidth margin="normal" onChange={handleChange} />
              <TextField type="email" name="email" label="Email" fullWidth margin="normal" onChange={handleChange} />
              <TextField name="password" type="password" label="Password" fullWidth margin="normal" onChange={handleChange} />
              <Button type="submit" variant="contained" color="primary" style={{width: "100%", marginTop: "36px",}}>Sign Up</Button>
            </Form>
          }}
        </Formik>
      </Paper>
    </Grid>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUpForm);