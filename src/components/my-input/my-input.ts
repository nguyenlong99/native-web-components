class MyInput extends HTMLElement {
  static formAssociated = true;
  static get observedAttributes() {
    return ["required", "value"];
  }

  private $input: HTMLInputElement | undefined | null;
  private value: string | null = "";
  private _attrs: Record<string, any> = {};
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    }).innerHTML = `<input type="text" />`;
    this.$input = this.shadowRoot!.querySelector("input");
    this.setProps();
    this._internals.setFormValue(this.value);
    this._internals.setValidity(
      this.$input!.validity,
      this.$input!.validationMessage,
      this.$input!
    );
    this.$input!.addEventListener("input", () => this.handleInput());
  }

  attributeChangedCallback(name: any, prev: any, next: any) {
    this._attrs[name] = next;
    this.setProps();
    this._internals.setValidity(
      this.$input!.validity,
      this.$input!.validationMessage,
      this.$input!
    );
  }

  public checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  public reportValidity(): void {
    this._internals.reportValidity();
  }

  public get validity(): ValidityState {
    return this._internals.validity;
  }

  public get validationMessage(): string {
    return this._internals.validationMessage;
  }

  private setProps() {
    // prevent any errors in case the input isn't set
    if (!this.$input) {
      return;
    }

    // loop over the properties and apply them to the input
    for (let prop in this._attrs) {
      switch (prop) {
        case "value":
          this.$input.value = this._attrs[prop];
          break;
        case "required":
          const required = this._attrs[prop];
          this.$input.toggleAttribute(
            "required",
            required === "true" || required === ""
          );
          break;
      }
    }
  }

  private handleInput() {
    this._internals.setValidity(
      this.$input!.validity,
      this.$input!.validationMessage,
      this.$input!
    );
    this._internals.setFormValue(this.value);
  }
}
export default MyInput;
