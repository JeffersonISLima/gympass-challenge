import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Commits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: []
    };
    this.callApiGetCommits = this.callApiGetCommits.bind(this);
  }
  
  callApiGetCommits() {
    const nameRepository = this.props.location.pathname.slice(9, 50);
    axios.get(`https://api.github.com/repos/JeffersonISLima/${ nameRepository }/commits`)
      .then(responseCommits => {
        this.setState({
          commits: responseCommits.data
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  componentDidMount() {
    this.callApiGetCommits();
  }

  render() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <section>
          <h1>Repositório: {this.props.location.pathname.slice(9, 50)}</h1>

          <h1>
            Data de criação:
            {
              this.props.location.search.slice(0, 12).split("-").reverse().join("-").replace(/[?=]/g, "")
            }
          </h1>

          {
            this.state.commits.map((commit, idx) => {
            return (
              <div key={idx}>
                <h4>Commit: {commit.commit.message}</h4>
                <h4>
                  Data:
                  {commit.commit.author.date.slice(0, 10).split("-").reverse().join("-")}
                </h4>
                <br />
              </div>
            );
            })
          }
        </section>
      </>
    );
  }
}

export default Commits;
