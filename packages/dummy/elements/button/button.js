import { html, Element } from '../../../lib/dist/index.js';

class ButtonElement extends Element {
  state = {
    user: {
      name: 'Michael',
    },
  };

  didUpdate(props) {}

  onChange(e) {
    this.state.user.name = e.target.value;
  }

  onClick() {
    this.state.user.name = 'Andrew';
  }

  render(props) {
    return html`
      ${this.state.user.name}
      <button @onClick="${this.onClick}">
        <div>${props.name}</div>
      </button>
      <input type="text" @onChange="${this.onChange}" />
      ${[1, 2, 3].map((item) => `<span>${item}</span>`)}
    `;
  }
}

customElements.define('button-element', ButtonElement);
