type EventHandlers = { [key: string]: EventHandler };
type RenderOutput = {
  nodes: ChildNode[];
  eventHandlers: EventHandlers;
};
type EventHandler = () => void;
type Node = Element | ChildNode | undefined;
type Expression = string | number | string[] | Element[] | (() => void);

export function html(strings: string[], ...values: Expression[]): RenderOutput {
  const eventHandlers: EventHandlers = {};

  function parseExpression(expression: Expression) {
    if (typeof expression === 'function') {
      eventHandlers[expression.name] = expression;
      return expression.name;
    } else if (Array.isArray(expression)) {
      return expression.join('');
    } else {
      return expression;
    }
  }

  const fragment = document.implementation
    .createHTMLDocument()
    .createRange()
    .createContextualFragment(
      strings.reduce(
        (markup, string, index) =>
          `${markup}${parseExpression(values[index - 1])}${string}`,
      ),
    );

  return { eventHandlers, nodes: Array.from(fragment.childNodes) };
}

export class Element extends HTMLElement {
  state: { [key: string]: unknown } = {};
  props: { [key: string]: unknown } = {};

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  render(props: { [key: string]: unknown }): RenderOutput {
    throw Error(`render() method not implemented. props: ${props}`);
  }

  __compareNodes(prev: Node, next: Node, parent: Node) {
    if (
      prev &&
      next &&
      prev instanceof Element &&
      next instanceof HTMLElement &&
      prev.shadowRoot?.childNodes.length
    ) {
      next?.getAttributeNames().forEach((attrName) => {
        const newValue = next.getAttribute(attrName);
        prev.removeAttribute(attrName);
        prev.props[attrName] = newValue;
      });
      const { nodes } = prev.render(prev.props);
      nodes.forEach((node, index) =>
        this.__compareNodes(prev.shadowRoot?.childNodes[index], node, prev),
      );
    } else if (next?.childNodes.length) {
      next.childNodes.forEach((node, index) =>
        this.__compareNodes(prev?.childNodes[index], node, prev),
      );
    }

    if (prev?.nodeValue !== next?.nodeValue) {
      parent?.replaceChild(next as ChildNode, prev as ChildNode);
    }
  }

  __attachEventListeners(nodes: Node[], eventHandlers: EventHandlers) {
    Array.from(nodes).map((element) => {
      if (element && 'getAttribute' in element) {
        const handlerName = element.getAttribute('@onClick');
        element.removeAttribute('@onClick');

        if (handlerName) {
          element.addEventListener(
            'click',
            eventHandlers[handlerName].bind(this),
          );
        }
        this.__attachEventListeners(
          Array.from(element.childNodes),
          eventHandlers,
        );
      }
    });
  }

  connectedCallback() {
    this.state = new Proxy(this.state || {}, {
      set: (target, prop: string, value) => {
        target[prop] = value;
        this.render(this.props).nodes.forEach((node, index) =>
          this.__compareNodes(this.shadowRoot?.childNodes[index], node, this),
        );
        return value;
      },
    });

    this.props = Object.fromEntries(
      this.getAttributeNames().map((attrName) => [
        attrName,
        this.getAttribute(attrName),
      ]),
    );

    this.getAttributeNames().forEach((attrName) =>
      this.removeAttribute(attrName),
    );

    const { nodes, eventHandlers } = this.render(this.props);
    this.__attachEventListeners(nodes, eventHandlers);

    for (const node of nodes) {
      this.shadowRoot?.appendChild(node);
    }
  }
}
