import React from 'react';
import Logo from "../shared/Logo";
import MainIcon from "./MainIcon";
import GitHubIcon from '@material-ui/icons/GitHub';


class LandingPage extends React.Component {
  handleLoginButtonClick() {
    this.props.history.push("/login")
  }

  handleSignUpButtonClick() {
    this.props.history.push("/signup")
  }

  render() {
    return <React.Fragment>
      <div className="showcase">
        <div key="toolbar" className="showcase-toolbar">
          <Logo />
          <a className="gh-link" href="https://github.com/unibuc-cs/river"><GitHubIcon /></a>
        </div>
        <div key="content" className="showcase-content">
          <div className="showcase-content-text-container">
            <div className="primary-text">
              <div>Fuzz test your binaries </div>
              <div>using AI</div>
            </div>
            <div className="secodary-text">
              <div>River is the first open-source platform that offers a concolic execution engine with reinforcement learning capabilities.</div>
              <div style={{marginTop: "6px"}}>For faster, better and cheaper automated testing processes.</div>
            </div>
            <div className="buttons-containers">
              <div className="landing-button primary" onClick={() => this.handleLoginButtonClick()}>Login</div>
              <div className="landing-button secondary" onClick={() => this.handleSignUpButtonClick()}>Sign up</div>
            </div>
          </div>
          <MainIcon className="showcase-content-icon" />
        </div>
          <div className="background-vector">
          <svg width="1980" height="520" viewBox="0 0 1870 506" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M291 420C213.5 440.5 194.5 401.5 0 506H1899V0C1828 84.6667 1661.4 242.5 1563 196.5C1440 139 1338 108.5 1114.5 239.5C891 370.5 668 252 504 280.5C340 309 368.5 399.5 291 420Z" fill="#F3B49B" fill-opacity="0.71"/>
          </svg>
        </div>
      </div>
    </React.Fragment>
  }
}

export default LandingPage;