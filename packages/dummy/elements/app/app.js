import { html, Element } from '../../../lib/dist/index.js';
import '../button/button.js';

class AppElement extends Element {
  state = {
    name: 'Mike',
    count: 0,
  };

  onClick() {
    this.state.name = 'duspko';
    this.state.count++;
  }

  render() {
    return html`
      <p>hello ${this.state.name}</p>
      <div>
        <div>${this.state.count}</div>
      </div>
      <div>
        <button @onClick="${this.onClick}">Click me</button>
      </div>
      <button-element name="${this.state.name}" name1="elo"></button-element>
      ${[1, 2, 3].map(
        () =>
          `<button-element name="${this.state.name}" name1="elo"></button-element>`,
      )}
    `;
  }
}

customElements.define('app-element', AppElement);
