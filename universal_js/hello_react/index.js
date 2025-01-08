import react from 'react';
import ReactDom from 'react-dom';

class Hello extends react.Component {
  render() {
    return <h1>Hello {this.props.name || 'World'}</h1>
  }
}

ReactDom.render(
  <Hello name='React' />,
  document.getElementsByTagName('body')[0]
)