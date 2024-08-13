# Lit vs Native web components

When choosing between **Lit** and **native web components**, the decision revolves around whether to use a lightweight library (Lit) to streamline and enhance the development experience or to rely solely on the native APIs provided by the browser.

### Native Web Components

**Native web components** are built using standard web technologies and consist of three main technologies:

1. **Custom Elements:** Define custom HTML tags and associated behavior.
2. **Shadow DOM:** Encapsulate styles and markup to prevent them from affecting the rest of the document.
3. **HTML Templates:** Define reusable HTML structures.

### Pros:

- **No Dependencies:** Purely uses browser standards, so there's no need to include any external libraries or frameworks.
- **Performance:** Direct use of native APIs can be more performant since there's no library overhead.
- **Interoperability:** Naturally works with any framework or library, as they are part of the web standards.

### Cons:

- **Manual Setup:** You need to manually manage features like property reflection, rendering updates, and state management.
- **Verbose Code:** Without helper libraries, code can become verbose, especially when dealing with reactive updates and complex components.
- **Cross-Browser Issues:** While most modern browsers support web components, there can be slight differences or limitations in implementation, particularly with older browsers.

### Lit

**Lit** is a library that simplifies the development of web components, making it easier and more efficient to work with the web components standards.

### Key Features:

- **Reactive Properties:** Lit provides a simple mechanism to define reactive properties that automatically trigger rendering updates.
- **Efficient Rendering:** Uses `lit-html` for efficient DOM updates, only re-rendering parts of the component that have changed.
- **Small Footprint:** Lit is lightweight, adding minimal overhead compared to native implementations.
- **Templates and Directives:** Simplifies the process of creating templates and handling complex DOM structures.

### Pros:

- **Ease of Use:** Offers a straightforward API and abstractions, making it quicker to develop components.
- **Performance Optimizations:** Lit handles efficient DOM updates, reducing the amount of manual work required.
- **Community and Ecosystem:** Backed by the Polymer Project and Google, providing a strong community and robust tooling.

### Cons:

- **Additional Dependency:** While lightweight, Lit still requires an external library.
- **Learning Curve:** Although small, there is still an additional API to learn beyond the native APIs.

### Conclusion

- **Use Lit** if you want a smoother development experience with efficient rendering, reactive properties, and less boilerplate code. It's a great choice for projects where productivity and maintainability are important, and the additional dependency overhead is acceptable.
- **Use Native Web Components** if you prefer to stick to browser standards without external dependencies, want to have complete control over the implementation, and are comfortable handling more low-level details yourself. This can be ideal for smaller projects or when you want to avoid any library-specific overhead.