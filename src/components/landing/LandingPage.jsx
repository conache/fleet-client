import React from 'react'
import { Button } from "@material-ui/core"

class LandingPage extends React.Component {
  handleLoginButtonClick() {
    this.props.history.push("/login")
  }

  handleSignUpButtonClick() {
    this.props.history.push("/signup")
  }

  render() {
    return <React.Fragment>
      <div>This is the landing page</div>
      <Button color="primary" onClick={() => this.handleLoginButtonClick()}>Login</Button>
      <Button color="primary" onClick={() => this.handleSignUpButtonClick()}>Sign up</Button>
    </React.Fragment>
  }
}

export default LandingPage;