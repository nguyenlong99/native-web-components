class UIKitInput extends HTMLElement {
  private type: string | null = "";
  private elementId: string | null = "";
  private name: string | null = "";
  private required: string | null = "";
  private minlength: string | null = "";
  private maxlength: string | null = "";
  private placeholder: string | null = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.type = this.getAttribute("type");
    this.elementId = this.getAttribute("id");
    this.name = this.getAttribute("name");
    this.required = this.getAttribute("required");
    this.minlength = this.getAttribute("minlength");
    this.maxlength = this.getAttribute("maxlength");
    this.placeholder = this.getAttribute("placeholder");
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
			<style>
			</style>
			<input 
				type="${this.type}"
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
