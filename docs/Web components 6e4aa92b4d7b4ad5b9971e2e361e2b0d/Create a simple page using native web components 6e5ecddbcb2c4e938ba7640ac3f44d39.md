# Create a simple page using native web components

### Notes:

- **Can’t use both light DOM and shadow DOM in the same web component**
    - If we use shadow dom in web component, we have to use it for that whole custom component, because we can’t use light DOM and shadow DOM in the same custom component
        
        ```jsx
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
        
          
        }
        export default Custom11;
        ```
        
        - This will not display the light DOM on browser with this.innerHTML although it still shows the elements when you inspect it.
        - It only show the shadow DOM with its component inside through the variable this.shadowRoot.innerHTML
        
        ![Untitled](Create%20a%20simple%20page%20using%20native%20web%20components%206e5ecddbcb2c4e938ba7640ac3f44d39/Untitled.png)
        
- **Hide undefined elements**
    - Custom Elements that have not been [upgraded](https://developers.google.com/web/fundamentals/web-components/customelements#upgrades) and don't have styles attached can still be rendered by the browser but they likely do not look how they are supposed to. To avoid a *flash of un-styled content* (FOUC), visually hide Custom Elements that are not yet defined:
    
    ```jsx
    :not(:defined) {
        visibility: hidden;
    }
    ```
    

### Pros:

- **Style encapsulation**
    - The style inside a web component only affects its component and the global styles also couldn’t affect the inner style of web component, but this leads to a negative effect I have mentioned below “[**Missing global styles**](Create%20a%20simple%20page%20using%20native%20web%20components%206e5ecddbcb2c4e938ba7640ac3f44d39.md)”
- **DOM encapsulation**
    - Components inside the shadow DOM are encapsulated from the light DOM; you can’t access elements inside the shadow DOM from outside using `document.querySelector` or any other methods for getting elements from the document.
- **Slot**
    - Have more control over slotted content regarding its position in the DOM.
    
    ```jsx
    
    <cus-tom4>
      <p slot="content">That's my content!</p>
      <h3 slot="heading">That's my heading</h3>
      <p slot="content">That's even more content!</p>
    </cus-tom4>
    ```
    
    ```jsx
    class Custom4 extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({mode: 'open'});
    
        this.shadowRoot.innerHTML = `
          <slot name="heading"></slot>
          <p>Other content</p>
          <slot name="content"></slot>
        `
      }
    }
    
    customElements.define('cus-tom4', Custom4);
    ```
    
    I messed up the order of the content in light DOM. As long as JavaScript works, it doesn't matter because you can define the order of how slots are rendered. You can also add other elements in between or pass content multiple times into a single slot.
    
    ![Untitled](Create%20a%20simple%20page%20using%20native%20web%20components%206e5ecddbcb2c4e938ba7640ac3f44d39/Untitled%201.png)
    

### Cons:

- **Hard to handle submit form action along with shadow DOM**
    - Hard to handle submit form action because every web component like form, button, input are encapsulated in its shadow dom. For example, in the following form, only the input field in light DOM is associated with the form.
        
        ```jsx
        <form>
          <p>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="johanna">
          </p>
        
          <cus-tom11></cus-tom11>
        
          <button>Send</button>
        </form>
        ```
        
        ```jsx
        class Custom11 extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({mode: 'open'});
        
            this.shadowRoot.innerHTML = `
             <p>
              <label for="email">E-Mail</label>
              <input type="text" name="email" id="email" value="johanna@matuzo.at">
             </p>`
          }
        }
        
        customElements.define('cus-tom11', Custom11);
        
        const form = document.querySelector('form')
        form.addEventListener('submit', e => {
          e.preventDefault()
          const data = new FormData(form);
          for (let nv of data.entries()) {
            alert(`  ${ nv[0] }: ${ nv[1] }`);
          }
        })
        ```
        
        ![Untitled](Create%20a%20simple%20page%20using%20native%20web%20components%206e5ecddbcb2c4e938ba7640ac3f44d39/Untitled%202.png)
        
        - Work around for this issue is using the [ElementInternals API](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals). The **`ElementInternals`** interface of the [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) gives web developers a way to allow custom elements to fully participate in HTML forms. It provides utilities for working with these elements in the same way you would work with any standard HTML form element, and also exposes the [Accessibility Object Model](https://wicg.github.io/aom/explainer.html) to the element.
    
- **Broken references when clicking label doesn’t focus the input field**
    - You can't reference an element in light DOM from shadow DOM or vice versa. That means that things like anchor links or aria references don't work.
    - The for-id relation, the aria-labelledby reference, and the anchor link in the following example don't work.
    
    ```jsx
    <p>
      <a href="#name" id="skip">Jump to name</a>
    </p>
    
    <label for="name">Name:</label>
    <cus-tom10></cus-tom10>
    ```
    
    ```jsx
    class Custom10 extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({mode: 'open'});
    
        this.shadowRoot.innerHTML = `
          <input type="text" id="name">
          <h2 aria-labelledby="skip">Test</h2>
        `
      }
    }
    
    customElements.define('cus-tom10', Custom10);
    ```
    
    ![Untitled](Create%20a%20simple%20page%20using%20native%20web%20components%206e5ecddbcb2c4e938ba7640ac3f44d39/Untitled%203.png)
    
    - When you click on link “Jump to name” or click on label “Name:”, it will not automatically focus on input
    
    <aside>
    💡 Solution: add `delegatesFocus: true` to attachShadow init object. This will allow the input to be focused when the label is clicked like with native input elements. Example below:
    
    </aside>
    
    ```
     class Custom10 extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({mode: 'open', **delegatesFocus: true**});
    		
        this.shadowRoot.innerHTML = `
          <input type="text" id="name">
          <h2 aria-labelledby="skip">Test</h2>
        `
      }
    }
    
    customElements.define('cus-tom10', Custom10);
    ```
    
- **Broken references when hitting Enter doesn’t trigger submit function**
    
    ```jsx
    render() {
        this.shadowRoot!.innerHTML = `
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
    ```
    
    `button` tag inside `uikit-button` in example above won’t trigger the submit function of form whenever Enter is pressed
    
- **Missing global styles**
    - If you have certain styles can be applied everywhere, you have repeat it in shadow DOM of every component you want to apply, because global styles will not apply for shadow DOM element.
    
    ```css
    //index.css
    
    button {
      margin-top: 8px;
      background-color: yellow;
    }
    ```
    
    ```html
    //index.html
    
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dev Card Web Component</title>
        <link rel="stylesheet" href="./index.css" />
      </head>
      <body>
        <uikit-button></uikit-button>
        <button>Second submit button</button>
      </body>
    </html>
    ```
    
    ```jsx
    class UIKitButton extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
    
      connectedCallback() {
        this.render();
      }
    
      render() {
        this.shadowRoot!.innerHTML = `
            <button id="${this.buttonId}" type="${this.type}">${this.text}</button>
            `;
      }
    }
    
    export default UIKitButton;
    
    customElements.define("uikit-button", UIKitButton);
    ```
    
    - The styling in `index.css` file only apply for `button` tag in `index.html`, it doesn’t have any effect on `button`  inside `uikit-button` web component.
    - If you want the styling for `button`, you have replicate the css value in `index.css` to style tag of `uikit-button` web component
    
    ```jsx
    render() {
        this.shadowRoot!.innerHTML = `
            <style>
              button {
                margin-top: 8px;
                background-color: yellow;
              }
            </style>
            <button id="${this.buttonId}" type="${this.type}">${this.text}</button>
            `;
      }
    ```
    
- **Manually call render() method to re-render the web component when making any changes**
    
    ```jsx
    class UIKitList extends HTMLElement {
      private images: Array<any> | null = [];
    
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // subscribe to the custom event then get data from it
        EventHandler.subscribeToEvent("list-images", this);
      }
    
      connectedCallback() {
        this.render();
      }
    
      handleEvent(event: any, data: any) {
        this.images = [];
        this.images!.push(...data);
        // we have to manually call this.render() to re-render the component when the   data changes. 
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
    ```
    
- 
- **…**
- **…**
- **…**