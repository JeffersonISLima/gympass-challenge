import axios from "axios";
import FormField from "../FormField";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Commits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: [],
      controlView: false,
    };
    this.callApiGetCommits = this.callApiGetCommits.bind(this);
  }
  
  callApiGetCommits() {
    const nameRepository = this.props.location.pathname.slice(9, 40);
    axios.get(`https://api.github.com/repos/JeffersonISLima/${ nameRepository }/commits`)
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
    const regExp = new RegExp(value, 'gi');
    const commitFind = [...this.state.commits].filter((commit) => {
      if (commit.commit.message.match(regExp)) {
        return commit;
      }
      return null;
    });
    this.setState({
      controlView: true,
      commitsFiltered: commitFind,
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

        <form className="search-box">
          <div>
            <FormField className="search-txt" type="search" placeholder="Encontre um commit" name="search" onChange={this.handleChange} />
          </div>
        </form>

        <section>
          <h1>Repositório: {this.props.location.pathname.slice(9, 50)}</h1>

          <h1>
            Data de criação:
            {
              this.props.location.search.slice(0, 12).split("-").reverse().join("-").replace(/[?=]/g, "")
            }
          </h1>

          {
            this.state.controlView
            ? this.state.commitsFiltered.map((commitFiltered, idx) => {
              return (
                <div key={idx}>
                  <h4>Commit: {commitFiltered.commit.message}</h4>
                  <h4>
                    Data:
                    {commitFiltered.commit.author.date.slice(0, 10).split("-").reverse().join("-")}
                  </h4>
                  <br />
                </div>
              )
            })
            : this.state.commits.map((commit, idx) => {
            return (
              <div key={idx}>
                <h4>Commit: {commit.commit.message}</h4>
                <h4>
                  Data:
                  {commit.commit.author.date.slice(0, 10).split("-").reverse().join("-")}
                </h4>
                <br />
              </div>
            )
          })
          
          }
        </section>
      </>
    );
  }
}

export default Commits;
