# HTME

Fast, native, minimal, scalable, native Web Components framework.

- zero dependency
- under 2kb
- no bundling needed
- no package managment and dependency needed (no npm)
- true to the browser

## Basic usage

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script type="module" src="app.js"></script>
  </head>
  <body>
    <app-element></app-element>
  </body>
</html>
```

`app.js`

```js
import { html, Element } from '';

class AppElement extends Element {
  render() {
    return html` <p>Hello World!</p> `;
  }
}

customElements.define('app-element', AppElement);
```

## Stateful Element example

`element.js`

```js
import { html, Element } from '';

class UserElement extends Element {
  state = {
    user: {
      name: 'Michael',
    },
  };

  onClick() {
    this.state.user.name = 'Andrew';
  }

  render() {
    return html`
      <p>Hello ${this.state.user.name}</p>
      <button @onClick="${this.onClick}">Change name</button>
    `;
  }
}

customElements.define('user-element', UserElement);
```

## API

### Element Lifecycle

- `constructor`
- `didRender`
- `didUpdate`
- `didDestroy`
- `render`

### Element Events

- `@onClick`

## Development

Project under active development. Contributions are welcome. Monorepo built using NX.

## License

See `LICENSE` file.
