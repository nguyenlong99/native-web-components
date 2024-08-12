import "../index.css";
import UIKitButton from "./button/button";
import UIKitInput from "./input/input";
import UIKitForm from "./form/form";
import Custom11 from "./test/test";
import MyInput from "./my-input/my-input";
import EventHandler from "../utils/EventHandler";
import UIKitList from "./list/list";

customElements.define("uikit-button", UIKitButton);
customElements.define("uikit-input", UIKitInput);
customElements.define("uikit-form", UIKitForm);
customElements.define("uikit-list", UIKitList);
customElements.define("cus-tom11", Custom11);
customElements.define("my-input", MyInput);

function handleFormSubmit(formData: any) {
  fetch(
    `https://pixabay.com/api/?key=45330144-79655dc881a87484a9145611d&q=${formData.search}`
  )
    .then((res) => res.json())
    .then((data) => {
      EventHandler.triggerEvent("list-images", data.hits.slice(0, 5));
    });
}

// Set the callback function for the web component
document.addEventListener("DOMContentLoaded", () => {
  const uikitForm = document.querySelector("uikit-form") as UIKitForm;
  if (!uikitForm) {
    return;
  }
  uikitForm.submitCallback = handleFormSubmit;
});
