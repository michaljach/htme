# HTME

Fast, native, minimal, scalable, native Web Components framework.

- zero dependency
- under 2kb
- no bundling needed
- no package managment and dependency needed (no npm)
- true to the browser

#### Demo

[![Edit sleepy-cache-gusu8w](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/sleepy-cache-gusu8w?fontsize=14&hidenavigation=1&theme=dark)

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
import {
  html,
  Element,
} from 'https://cdn.jsdelivr.net/npm/htme@0.1.3/dist/index.js';

class AppElement extends Element {
  render() {
    return html`<p>Hello World!</p>`;
  }
}

customElements.define('app-element', AppElement);
```

## Stateful Element example

`element.js`

```js
import {
  html,
  Element,
} from 'https://cdn.jsdelivr.net/npm/htme@0.1.3/dist/index.js';

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

## Composing Elements example

`avatar.js`

```js
import {
  html,
  Element,
} from 'https://cdn.jsdelivr.net/npm/htme@0.1.3/dist/index.js';

class AvatarElement extends Element {
  render() {
    return html`<img src="avatar.png" />`;
  }
}

customElements.define('avatar-element', AvatarElement);
```

`user.js`

```js
import {
  html,
  Element,
} from 'https://cdn.jsdelivr.net/npm/htme@0.1.3/dist/index.js';

class UserElement extends Element {
  render() {
    return html`
      <div>
        <avatar-element></avatar-element>
        <p>Hello Michael !</p>
      </div>
    `;
  }
}

customElements.define('user-element', UserElement);
```

## API

### Element Lifecycle

| Method        | Params  | Description                                   |
| ------------- | ------- | --------------------------------------------- |
| `constructor` | none    | Standard Web Component constructor.           |
| `render`      | `props` | Fired on initial and every element render.    |
| `didRender`   | none    | Fired after element is added to DOM tree.     |
| `didUpdate`   | `props` | Fired each time props or state are updated.   |
| `didDestroy`  | none    | Fired after element is removed from DOM tree. |

### Element Events

Example:

```
<button @onClick="${this.onClick}">Button</button>
```

**Events:**

| Event       | Params       | Description                                                      |
| ----------- | ------------ | ---------------------------------------------------------------- |
| `@onClick`  | `MouseEvent` | Event fired on mouse press. Used for example on buttons.         |
| `@onChange` | `Event`      | Event fired on key press. Used for example on inputs, dropdowns. |

## Development

Project under active development. Contributions are welcome. Monorepo built using NX.

## License

See `LICENSE` file.
