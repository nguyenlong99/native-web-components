class Custom11 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
    			<div>
    				<label for="email">E-Mail</label>
    				<input type="text" name="email" id="email" value="johanna@matuzo.at">
    			</div>`;

    this.innerHTML = `
     <div>
      <label for="email">E-Mail</label>
      <input type="text" name="email" id="email" value="johanna@matuzo.at">
     </div>`;
  }

  connectedCallback() {
    const form = document.querySelector("#test-form") as HTMLFormElement;
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(e);
      const data = new FormData(form!);
      let textResult = "";
      for (let nv of data.entries()) {
        textResult += `  ${nv[0]}: ${nv[1]}`;
      }
      const paragraph = document.createElement("p");
      paragraph.textContent = textResult;
      this.shadowRoot!.appendChild(paragraph);
    });
  }
}
export default Custom11;
