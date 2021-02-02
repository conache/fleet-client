import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import {login} from "../../reducers/user.reducer";
import { Formik, Form } from 'formik';
import Logo from '../shared/Logo';

class LoginForm extends React.Component {
  render() {
    const {login} = this.props;

    return <Grid container direction="column" justify="center" alignItems="center"
      style={{ marginTop: '15%' }}>
      <Paper elevation={3} style={{maxWidth: "400px",}}>
        <div className="side-nav-container">
          <Logo />
        </div>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={login} >
          {props => {
            const { handleChange } = props;
            return <Form style={{padding: "24px", textAlign: "center",}}>
              <TextField type="email" name="email" label="Email" fullWidth margin="normal"
                onChange={handleChange} />
              <TextField name="password" type="password" label="Password" fullWidth margin="normal"
                onChange={handleChange} />
              <Button type="submit" variant="contained" color="primary" style={{width: "100%", marginTop: "36px",}}>Login</Button>
            </Form>
          }}
        </Formik>
      </Paper>
    </Grid>
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginForm);