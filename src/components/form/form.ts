class UIKitForm extends HTMLElement {
  private form: HTMLFormElement | undefined | null;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["required", "value"];
  }

  connectedCallback() {
    this.render();
    this.form = this.shadowRoot?.querySelector("#form-search-image");
    if (!this.form) {
      return;
    }
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
    this._submitCallback = callback;
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    // Get the callback function from the attribute or property
    // const submitCallback = (this as any).submitCallback;
    console.log("event: ", event);
    if (typeof this._submitCallback !== "function") {
      return;
    }

    const formData = new FormData(this.form!);
    const data = Object.fromEntries(formData.entries());
    this._submitCallback(data);
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
					<label for="search">Search: </label>
					<uikit-input
						type="text"
						id="search"
						name="search"
						required
            value=""
						minlength="4"
						maxlength="12"
						placeholder="input to search"
					></uikit-input>
				</div>
        <uikit-button id="submit-button" type="submit" text="Submit button">
        </uikit-button>
      </form>
    `;
  }
}

export default UIKitForm;
