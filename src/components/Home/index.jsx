import "./Home.css";
import axios from "axios";
import gitHub from "./image/git.png";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import repository from "./image/folder.jpeg";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      userName: "",
      followers: "",
      following: "",
      publicRepos: "",
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
              userName: responseAvatar.data.login,
              avatar: responseAvatar.data.avatar_url,
              getAllReposUser: responseAllRepos.data,
              followers: responseAvatar.data.followers,
              following: responseAvatar.data.following,
              publicRepos: responseAvatar.data.public_repos
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
    const imagesHomePage = {
      gitHub: <img src={gitHub} alt="Logotipo GitHub" />,
      avatar: <img src={this.state.avatar} alt="Foto do Perfil" />,
      repository: <img height="80em;" src={repository} alt="Repositório com cor amarela" />
    };

    return (
      <>
        <main className="main-container">
          <section className="container-avatar__following-followers">
            <div className="avatar-container">
              <figure>{imagesHomePage.avatar}</figure>
              <a href="https://github.com/JeffersonISLima">
                <figure className="nameUser-gitHub-image">
                  <h2>{this.state.userName}</h2>
                  <span> {imagesHomePage.gitHub}</span>
                </figure>
              </a>
            </div>

            <div className="section-following-followers">
              <span>
                <div>
                  <h2>Seguindo</h2>
                  <h3>{this.state.following}</h3>
                </div>
                <div>
                  <h2>Seguidores</h2>
                  <h3>{this.state.followers}</h3>
                </div>
              </span>

              <div className="section-number-of-repositories">
                <h2> Quantidade de repositórios públicos</h2>
                <div>
                  {imagesHomePage.repository}
                  <h3>{this.state.publicRepos}</h3>
                </div>
              </div>
            </div>
          </section>

          <h1 className="title-repos">LISTA DE REPOSITÓRIOS PÚBLICOS</h1>

          {this.state.getAllReposUser.map(repository => {
            return (
              <Link
                key={repository.id}
                to={`/commits/${repository.name}?=${repository.created_at}`}
              >
                <section className="name-resoritories-container">
                  <h2>{repository.followers}</h2>
                  <h2>{repository.name}</h2>
                </section>
              </Link>
            );
          })}
        </main>
      </>
    );
  }
}

export default Home;
