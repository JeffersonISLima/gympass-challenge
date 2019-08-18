import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Commits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: '',
    };
  }

  callApi(){
    axios.get()
    .get((responseCommits) => {
      this.setState({

      });
    })
    .catch((err) => {
      throw new Error(err);
    });
  }
  
  componentDidMount(){

  }

  render() {
    console.log(this.props);
    
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Commits;
