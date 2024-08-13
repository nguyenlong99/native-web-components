# Reactive Properties in Native Web Components

To achieve reactive properties in native web components, you typically need to:

1. **Define Properties:**
Define properties on the element's class.
2. **Observe Property Changes:**
Use setters and getters to observe and react to property changes.
3. **Trigger Rendering Updates:**
Manually manage rendering updates when properties change.

Here's an example implementation:

```jsx
class MyElement extends HTMLElement {
  constructor() {
    super();
    this._name = "World";
    this.attachShadow({ mode: "open" });
    this.render();
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (this._name !== value) {
      this._name = value;
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `<p>Hello, ${this._name}!</p>`;
  }
}

customElements.define("my-element", MyElement);
```

In this example:

- The property `name` is defined with a getter and setter. The setter checks if the new value differs from the old one and, if so, updates the value and triggers a re-render by calling the `render` method.
- The `render` method updates the component's shadow DOM whenever the property changes.

### Limitations and Considerations

While you can manually implement reactive properties in native web components, it involves more code and manual management:

- **No Automatic Rendering:** You must manually call the render function or update the DOM when a property changes.
- **No Built-In Change Detection:** Unlike some frameworks and libraries, native web components do not provide automatic change detection. You must explicitly define how changes to properties should affect the DOM.
- **Boilerplate Code:** Without helper libraries, you'll often write more boilerplate code for property reflection, change detection, and rendering logic.

In contrast, libraries like **Lit** provide a more declarative and less verbose way to handle reactive properties, abstracting away much of the boilerplate code and providing efficient DOM updates. This can make development faster and the code easier to maintain.

### Change above example from Native web component to Lit

```jsx
import { LitElement, html, css, property } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-element")
class MyElement extends LitElement {
  @property({ type: String }) name: string = "World";

  static styles = css`
    p {
      color: blue;
    }
  `;

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

### Key features with Lit:

1. **Reactive Properties:**
    - The `@property` decorator is used to define reactive properties. In this example, `name` is a reactive property with a default value of `'World'`.
    - Lit automatically handles updates to this property and triggers re-renders when its value changes.
2. **Template Rendering:**
    - The `render` method defines the component's template using the `html` template tag. Lit uses `lit-html` to efficiently update the DOM, only re-rendering parts of the DOM that have changed.
3. **Styles:**
    - The `static styles` property allows you to define CSS for the component, encapsulating styles within the shadow DOM.
4. **Declarative and Simplified:**
    - Lit abstracts away much of the manual work involved in managing updates, making the code more concise and easier to maintain.

### Summary

- In the native web component example, we had to manually define getters and setters, manage the rendering logic, and update the DOM when properties changed.
- With Lit, we simply define the properties with decorators and implement the `render` method. Lit takes care of the rest, including property observation and efficient DOM updates.