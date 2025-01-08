import React from 'react'
import { RecentGithubProjects } from './RecentGithubProjects.js'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: 'javascript',
      label: 'JavaScript'
    }
    this.setQuery = this.setQuery.bind(this)
  }

  setQuery(e) {
    e.preventDefault()
    const label = e.currentTarget.text
    this.setState({ label, query: label.toLowerCase() })
  }

  render() {
    return <div>
      <nav>
        <a href="#" onClick={this.setQuery}>JavaScript</a>
        {' '}
        <a href="#" onClick={this.setQuery}>Node.js</a>
        {' '}
        <a href="#" onClick={this.setQuery}>React</a>
      </nav>
      <h1>Recently updated {this.state.label} projects</h1>

      <RecentGithubProjects query={this.state.query} />
    </div>
  }
}