fetch('my-card/my-card.html')
    .then(res => res.text())
    .then(res => define(res))

function define(html) {
    class MyCard extends HTMLElement {
        constructor() {
            super();
            let template = document.createElement('template');
            html = html.trim();
            template.innerHTML = html;
            let templateContent = template.content;
    
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }

        static get observedAttributes() {
            return ['text'];
        }

        attributeChangedCallback(attr, oldVal, newVal) {
            if (attr == 'text') {
                this.shadowRoot.querySelector('.card-title').textContent = newVal;
            }
        }
    }
    
    window.customElements.define('my-card', MyCard);
}