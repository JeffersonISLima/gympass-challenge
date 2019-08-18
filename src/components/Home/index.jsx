import axios from "axios";
import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userGit: []
    };
    this.callApi = this.callApi.bind(this);
  }

  callApi() {
    axios
      .get("https://api.github.com/users/jeffersonISlima/repos")
      .then(response => {
        console.log(response.data.repos_url);
        
        this.setState({
          userGit: response.data.repos_url
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  componentDidMount() {
    this.callApi();
  }

  render() {
    return (
      <>
        {this.state.userGit.map(e => {
          return <h2>{e.repos_url}</h2>;
        })}
      </>
    );
  }
}

export default Home;
