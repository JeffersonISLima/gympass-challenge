import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      userName: "",
      getAllReposUser: []
    };
    this.callApiGetInformationsAboutProfile = this.callApiGetInformationsAboutProfile.bind(this);
  }

  callApiGetInformationsAboutProfile() {
    axios.get("https://api.github.com/users/jeffersonISlima/repos")
      .then(responseAllRepos => {
        axios.get("https://api.github.com/users/jeffersonISlima")
          .then(responseAvatar => {
            this.setState({
              avatar: responseAvatar.data.avatar_url,
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
    this.callApiGetInformationsAboutProfile();
  }

  render() {
    return (
      <>
        <figure>
          <img src={this.state.avatar} alt="Foto do Perfil" />
        </figure>
        <h2>{this.state.userName}</h2>

        {
          this.state.getAllReposUser.map(repository => {
          return (
              <Link
                key={repository.id}
                to={`/commits/${repository.name}?=${repository.created_at}`}
              >
                <div>
                  <h2>{repository.name}</h2>
                </div>
              </Link>
            );
          })
        }
      </>
    );
  }
}

export default Home;
