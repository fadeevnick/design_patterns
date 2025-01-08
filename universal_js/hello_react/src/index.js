import React from 'react';
import ReactDom from 'react-dom';

class Hello extends React.Component {
  render() {
    return <h1>Hello {this.props.name || 'World'}</h1>
  }
}

ReactDom.render(
  <Hello name='React' />,
  document.getElementsByTagName('body')[0]
)

// import react from 'react'
// import ReactDOM from 'react-dom'

// const h = react.createElement

// class Hello extends react.Component {
//   render() {

//     return h('h1', null, [
//       'Hello ',
//       this.props.name || 'World'
//     ])
//   }
// }

// ReactDOM.render(
//   h(Hello, { name: 'React' }),
//   document.getElementsByTagName('body')[0]
// )
