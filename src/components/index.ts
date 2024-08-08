import "../index.css";
import UIKitButton from "./button/button";
import UIKitInput from "./input/input";
import UIKitForm from "./form/form";

customElements.define("uikit-button", UIKitButton);
customElements.define("uikit-input", UIKitInput);
customElements.define("uikit-form", UIKitForm);

function getHello() {
  console.log("hello world from button clicked");
}

function handleFormSubmit(data: any) {
  console.log("Form Submitted:", data);
  // Add your form submission logic here, such as making an API call
}

// Set the callback function for the web component
document.addEventListener("DOMContentLoaded", () => {
  console.log(document);
  const uikitForm = document.querySelector("uikit-form") as UIKitForm;
  // const formComponent = uikitForm?.shadowRoot!.querySelector(
  //   "#form-search-image"
  // ) as any;
  if (!uikitForm) {
    return;
  }
  uikitForm.submitCallback = handleFormSubmit;
});
