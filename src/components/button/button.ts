class UIKitButton extends HTMLElement {
  static observedAttributes = ["text"];
  private text: string | null = "";
  private buttonId: string | null = "";
  private type: string | null = "";
  private form: string | null = "";
  // private _internals: ElementInternals;
  // static formAssociated = true;

  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
    // this._internals = this.attachInternals();
  }

  connectedCallback() {
    this.text = this.getAttribute("text");
    this.buttonId = this.getAttribute("id");
    this.form = this.getAttribute("form");
    this.type = this.getAttribute("type") ?? "submit";

    this.render();

    const button = this.shadowRoot?.querySelector(
      `button#${this.buttonId}`
    ) as HTMLButtonElement;
    // button.setAttribute("form", "form-search-image");
    // button.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   // this._internals.form?.requestSubmit(button!);
    //   this._internals.form!.submit();
    // });
    // this._internals.form?.requestSubmit(button!);
  }

  render() {
    this.innerHTML = `
        <button id="${this.buttonId}" type="${this.type}">${this.text}</button>
        `;

    // this.shadowRoot!.innerHTML = `
    //     <button id="${this.buttonId}" type="${this.type}" form="${this.form}">${this.text}</button>
    //     `;
  }
}

export default UIKitButton;
