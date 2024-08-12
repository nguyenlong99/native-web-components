import EventHandler from "../../utils/EventHandler";

class UIKitList extends HTMLElement {
  private images: Array<any> | null = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    EventHandler.subscribeToEvent("list-images", this);
  }

  connectedCallback() {
    this.render();
  }

  handleEvent(event: any, data: any) {
    this.images = [];
    this.images!.push(...data);
    this.render();
  }

  render() {
    const listItem = this.images?.map((item) => {
      return `
        <li>
          ${item.id}
          <img src="${item.previewURL}"/> 
        </li>
      `;
    });

    this.shadowRoot!.innerHTML = `
      <ul>
        ${listItem}
      </ul>
    `;
  }
}

export default UIKitList;
