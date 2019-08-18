import axios from "axios";
import { Link } from "react-router-dom";
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
        <figure>
          <img src={this.state.avatar} alt="" />
        </figure>
        {this.state.getAllReposUser.map(repository => {
          return (
            <Link to={`/commits/${repository.id}`}>
              <div key={repository.id}>
                <h2>{repository.name}</h2>;
              </div>
            </Link>
          );
        })}
      </>
    );
  }
}

export default Home;
