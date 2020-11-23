import React, { Component } from "react";
import axios from "axios";
import "./App.css";



class App extends Component {
  state = {
    titles: [],
    name: '',
    id: ''
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/posts`).then((res) => {
      this.setState({ titles: res.data });
    });
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const title = {
      name: this.state.name
    };

    axios.post(`http://localhost:3000/posts`, { title })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  handleChanges = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmited = event => {
    event.preventDefault();

    axios.delete(`http://localhost:3000/posts${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todo Axios</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
        <form onSubmit={this.handleSubmited}>
          <label>
            Person ID:
            <input type="text" name="id" onChange={this.handleChanges} />
          </label>
          <button type="submit">Delete</button>
        </form>
        {this.state.titles.map((el) => (
          <div key={el.id}>{el.title}</div>
        ))}
      </div>
    );
  }
}

export default App;
