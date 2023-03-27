import { html, Element } from '../../../htme/dist/index.js';

class ButtonElement extends Element {
  onClick() {
    console.log('elozak');
  }

  render(props) {
    return html`
      <button @onClick="${this.onClick}">
        <div>${props.name}</div>
      </button>
      ${[1, 2, 3].map((item) => `<span>${item}</span>`)}
    `;
  }
}

customElements.define('button-element', ButtonElement);
