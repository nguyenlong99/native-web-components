class UIKitInput extends HTMLElement {
  private type: string | null = "";
  private elementId: string | null = "";
  private name: string | null = "";
  private required: string | null = "";
  private minlength: string | null = "";
  private maxlength: string | null = "";
  private placeholder: string | null = "";
  private value: string | null = "";
  // static observedAttributes = ["required", "value"];
  static get observedAttributes() {
    return ["required", "value"];
  }
  private $input?: HTMLInputElement;
  static formAssociated = true;
  private _internals: ElementInternals;

  //Now we need to update the input properties when the attributes change using the attributeChangedCallback lifecycle hook, but we will have a timing issue.
  //The attributeChangedCallback method will run before our internal input has had a chance to render and for our query selector to assign it to our $input variable.
  //To get around this, we will create a component variable to capture the attributes and values and we will update our internal input when it is ready.
  private _attrs: Record<string, any> = {};

  constructor() {
    super();

    // option key in attachShadow -> delegatesFocus: true
    // This will allow the input to be focused when the label is clicked like with native input elements.
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    this.type = this.getAttribute("type");
    this.elementId = this.getAttribute("id");
    this.name = this.getAttribute("name");
    this.required = this.getAttribute("required");
    this.minlength = this.getAttribute("minlength");
    this.maxlength = this.getAttribute("maxlength");
    this.placeholder = this.getAttribute("placeholder");
    this.value = this.getAttribute("value");
    this.render();

    this.$input = this.shadowRoot!.querySelector("input")!;
    // this.setProps();
    this._internals.setFormValue(this.$input.value);
    // this._internals.setValidity(
    //   this.$input.validity,
    //   this.$input.validationMessage,
    //   this.$input
    // );
    this.$input.addEventListener("input", () => this.handleInput());
  }

  attributeChangedCallback(name: any, _prev: any, next: any) {
    this._attrs[name] = next;
    // this.setProps();
  }

  public checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  public reportValidity(): any {
    return this._internals.reportValidity();
  }

  public get validity(): ValidityState {
    return this._internals.validity;
  }

  public get validationMessage(): string {
    return this._internals.validationMessage;
  }

  private handleInput() {
    // this._internals.setValidity(
    //   this.$input!.validity,
    //   this.$input!.validationMessage,
    //   this.$input
    // );
    // this._internals.setFormValue(this.value);
    this._internals.setFormValue(this.$input!.value);
  }

  render() {
    this.shadowRoot!.innerHTML = `
			<style>
			</style>
			<input 
				type="${this.type}"
        value="${this.value}"
				id="${this.elementId}"
				name="${this.name}"
				${this.required ? "required" : ""}
				minlength="${this.minlength}"
				maxlength="${this.maxlength}"
				placeholder="${this.placeholder}"
			/>
		`;
  }
}

export default UIKitInput;
