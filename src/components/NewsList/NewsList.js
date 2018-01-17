import React, { Component } from 'react';

export default class NewsList extends Component {
  render() {
    return (
      <div>
        <h2>List of news</h2>
        <button>Mark red</button>
        {this.props.viewer.news.edges.map(({ node }, i) => (
          <div key={i}>
            {i + 1}. {node.name} <button>Delete</button>
          </div>
        ))}
        <br />
        <div>
          // Your code goes here
          <input type="text" />
          <button>Add News</button>
        </div>
      </div>
    )
  }
}