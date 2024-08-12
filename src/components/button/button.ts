class UIKitButton extends HTMLElement {
  static observedAttributes = ["text"];
  private text: string | null = "";
  private buttonId: string | null = "";
  private type: string | null = "";
  // private _internals: ElementInternals;
  // static formAssociated = true;

  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
    // this._internals = this.attachInternals();
  }

  connectedCallback() {
    /**
     * It is called each time when the custom element is appended to the DOM
     */

    this.text = this.getAttribute("text");
    this.buttonId = this.getAttribute("id");
    this.type = this.getAttribute("type") ?? "submit";

    this.render();

    // const button = this.shadowRoot?.querySelector(
    //   `button#${this.buttonId}`
    // ) as HTMLButtonElement;
    // this._internals.form?.requestSubmit(button!);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {}

  render() {
    this.innerHTML = `
        <button id="${this.buttonId}" type="${this.type}">${this.text}</button>
        `;

    // this.shadowRoot!.innerHTML = `
    //     <button id="${this.buttonId}" type="${this.type}">${this.text}</button>
    //     `;
  }
}

export default UIKitButton;
