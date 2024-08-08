import styles from "./form.module.css";

class UIKitForm extends HTMLElement {
  private form: HTMLFormElement | undefined | null;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  static get observedAttributes() {
    return ["required", "value"];
  }

  private _attrs = {};

  connectedCallback() {
    this.render();
    this.form = this.shadowRoot?.querySelector("#form-search-image");
    if (!this.form) {
      return;
    }
    console.log("this.form: ", this.form);
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  disconnectedCallback() {
    if (!this.form) {
      return;
    }
    this.form.removeEventListener("submit", this.handleSubmit.bind(this));
  }

  private _submitCallback: ((data: Record<string, any>) => void) | null = null;

  get submitCallback() {
    return this._submitCallback;
  }

  set submitCallback(callback: ((data: Record<string, any>) => void) | null) {
    console.log("set submitcallback", callback);
    this._submitCallback = callback;
  }

  handleSubmit(event: Event) {
    console.log("handleSubmit");
    event.preventDefault();

    // Get the callback function from the attribute or property
    // const submitCallback = (this as any).submitCallback;
    console.log("typeof this._submitCallback: ", typeof this._submitCallback);
    if (typeof this._submitCallback === "function") {
      const formData = new FormData(this.form!);
      const data = Object.fromEntries(formData.entries());
      this._submitCallback(data);
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        form {
          margin-top: 24px;
        }
        .form-input {
          display: flex;
          flex-direction: row;
          gap: 12px;
          margin-bottom: 12px;
        }
      </style>
      <form id="form-search-image">
				<div class="form-input">
					<label for="input-name">Search: </label>
					<uikit-input
						type="text"
						id="input-name"
						name="input-name"
						required
						minlength="4"
						maxlength="12"
						placeholder="input to search"
					></uikit-input>
				</div>
        
        <button id="submit-button" type="submit">Submit button</button>
      </form>
    `;
  }
}

export default UIKitForm;
