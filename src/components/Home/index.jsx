import axios from "axios";
import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      getAllReposUser: []
    };
    this.callApi = this.callApi.bind(this);
  }

  callApi() {
    axios
      .get("https://api.github.com/users/jeffersonISlima/repos")
      .then(responseAllRepos => {
        axios
          .get("https://api.github.com/users/jeffersonISlima")
          .then(respondeAvatar => {
            this.setState({
              avatar: respondeAvatar.data.avatar_url,
              getAllReposUser: responseAllRepos.data
            });
          })
          .catch(err => {
            throw new Error(err);
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
      <img src={this.state.avatar} alt=""/>
        {this.state.getAllReposUser.map(e => {
          return <h2 key={e.id}>{e.name}</h2>;
        })}
      </>
    );
  }
}

export default Home;
