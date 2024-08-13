# Explanation

## Definition

- *Shadow* DOM allows hidden DOM trees to be attached to elements in the regular DOM tree — this shadow DOM tree starts with a shadow root, underneath which you can attach any element, in the same way as the normal DOM.

![Untitled](Explanation%20ce60dee767f84713a0907b9006e5ef4f/Untitled.png)

- There are some bits of shadow DOM terminology to be aware of:
    - **Shadow host**: The regular DOM node that the shadow DOM is attached to.
    - **Shadow root**: The root node of the shadow tree.
    - **Shadow tree**: The DOM tree inside the shadow DOM.
    - **Shadow boundary**: the place where the shadow DOM ends, and the regular DOM begins.

## Relationship between Shadow DOM and custom elements:

**Without** the encapsulation provided by shadow DOM, [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) would be impossibly fragile. It would be too easy for a page to accidentally break a custom element's behavior or layout by running some page JavaScript or CSS. As a custom element developer, you'd never know whether the selectors applicable inside your custom element conflicted with those that applied in a page that chose to use your custom element.

Custom elements are implemented as a class which extends either the base [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) or a built-in HTML element such as [`HTMLParagraphElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement). Typically, **the custom element itself is a shadow host**, and the element creates multiple elements under that root, to provide the internal implementation of the element.

## Lifecycle

Once your custom element is registered, the browser will call certain methods of your class when code in the page interacts with your custom element in certain ways. By providing an implementation of these methods, which the specification calls *lifecycle callbacks*, you can run code in response to these events.

Custom element lifecycle callbacks include:

- `connectedCallback()`: called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
- `disconnectedCallback()`: called each time the element is removed from the document.
- `adoptedCallback()`: called each time the element is moved to a new document.
- `attributeChangedCallback()`: called when attributes are changed, added, removed, or replaced. See [Responding to attribute changes](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes) for more details about this callback.

```jsx
// Create a class for the element
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("my-custom-element", MyCustomElement);
```

## Worth noticeable class/interface in web components:

### **CSSStyleSheet**

- The **`CSSStyleSheet`** interface represents a single [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) stylesheet, and lets you inspect and modify the list of rules contained in the stylesheet. It inherits properties and methods from its parent, [`StyleSheet`](https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet).
- Using CSSStyleSheet to style inside shadow DOM.
    - Ref: [Using shadow DOM - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#constructable_stylesheets)

### **CustomStateSet**

- The **`CustomStateSet`** interface of the [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) stores a list of states for an [autonomous custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#types_of_custom_element), and allows states to be added and removed from the set.
- The interface can be used to expose the internal states of a custom element, allowing them to be used in CSS selectors by code that uses the element.
- Built in HTML elements can have different *states*, such as "enabled" and "disabled, "checked" and "unchecked", "initial", "loading" and "ready". Some of these states are public and can be set or queried using properties/attributes, while others are effectively internal, and cannot be directly set. Whether external or internal, element states can generally be selected and styled using [CSS pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) as selectors.
- The `CustomStateSet` allows developers to add and delete states for autonomous custom elements (but not elements derived from built-in elements). These states can then be used as custom state pseudo-class selectors in a similar way to the pseudo-classes for built-in elements.
- Ref: [CustomStateSet - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet)

###