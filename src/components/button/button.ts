class UIKitButton extends HTMLElement {
  static observedAttributes = ["text"];
  private text: string | null = "";
  private buttonId: string | null = "";
  private type: string | null = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    /**
     * It is called each time when the custom element is appended to the DOM
     */

    this.text = this.getAttribute("text");
    this.buttonId = this.getAttribute("id");
    this.type = this.getAttribute("type") ?? "submit";

    // if (typeof callback === "function") {
    //   this.shadowRoot
    //     .querySelector(`#${this.buttonId}`)
    //     .addEventListener("click", callback);
    // }
    this.render();
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {}

  render() {
    this.shadowRoot!.innerHTML = `
        <button id="${this.buttonId}" type="${this.type}" form="form-search-image">${this.text}</button>
        `;
  }
}

export default UIKitButton;
