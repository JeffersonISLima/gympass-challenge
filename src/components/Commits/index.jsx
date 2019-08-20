import "./Commits.css";
import axios from "axios";
import FormField from "../FormField";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Commits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: [],
      controlView: false
    };
    this.callApiGetCommits = this.callApiGetCommits.bind(this);
  }

  callApiGetCommits() {
    const nameRepository = this.props.location.pathname.slice(9, 40);
    axios.get(`${process.env.REACT_APP_API_URL_REPOS}/${nameRepository}/commits`)
      .then(responseCommits => {
        this.setState({
          commits: responseCommits.data.slice(0, 20)
        });
      })
      .catch(err => {
        throw new Error(err);
      });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { target: { value } } = event;

    const regExp = new RegExp(value, "gi");
    const commitFind = [...this.state.commits].filter(commit => {
      if (commit.commit.message.match(regExp)) {
        return commit;
      }
      return null;
    });
    this.setState({
      controlView: true,
      commitsFiltered: commitFind
    });
  }

  componentDidMount() {
    this.callApiGetCommits();
  }

  render() {
    return (
      <>
        <header className="row">
          <div className="column-btn">
            <Link to="/">
              <i className="fas fa-angle-double-left" />
              <h4 className="behavior-inline">Home</h4>
            </Link>
          </div>

          <div className="column-aux-first" />

          <div className="column-middle">
            <form className="fom-field">
              <div>
                <FormField
                  className="search-txt"
                  type="search"
                  placeholder="Encontre um commit"
                  name="search"
                  onChange={this.handleChange}
                />
              </div>
            </form>
          </div>

          <div className="column-aux-second" />
        </header>

        <section>
          <h1 className=" title-txt">
            Repositório: {this.props.location.pathname.slice(9, 50)}
          </h1>

          <h1 className=" title-txt">
            Data de criação:{" "}
            {
              this.props.location.search
              .slice(0, 12)
              .split("-")
              .reverse()
              .join("-")
              .replace(/[?=]/g, "")
            }
          </h1>
        </section>

        <section className="containenr-cards">
          {
            this.state.controlView
            ? this.state.commitsFiltered
                .reverse()
                .map((commitFiltered, idx) => {
                  return (
                    <div key={idx}>
                      <div className="flip-card">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <h1>Commit número {idx + 1}: </h1>
                            <br />
                            <h4>Mensagem</h4>
                            <p>{commitFiltered.commit.message}</p>

                            <h3 className="date-commit">
                              Ver data{" "}
                              <i className="fas fa-angle-double-right" />
                            </h3>
                          </div>
                          <div className="flip-card-back">
                            <h4>
                              Data do commit{" "}
                              {
                                commitFiltered.commit.author.date
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")
                              }
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            : this.state.commits.reverse().map((commit, idx) => {
                return (
                  <div key={idx}>
                    <div className="flip-card">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          <h1>Commit número {idx + 1}:</h1>
                          <br />
                          <h4>Mensagem</h4>
                          <p>{commit.commit.message}</p>

                          <h3 className="date-commit">
                            Ver data <i className="fas fa-angle-double-right" />
                          </h3>
                        </div>

                        <div className="flip-card-back">
                          <h4>
                            Data do commit{" "}
                            {
                              commit.commit.author.date
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("-")
                            }
                          </h4>
                        </div>
                      </div>
                    </div>

                    <br />
                  </div>
                );
              })}
        </section>
      </>
    );
  }
}

export default Commits;
