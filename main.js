function buildTagName(name) {
    return [...name].map( (x, i) => {
        if( x < 'a') {
            if(i !== 0) {
                return `-${x.toLowerCase()}`;
            }
            return x.toLowerCase();
        }
        return x;
    }).join('');
}

module.exports = (c, shadowRoot) => {

    shadowRoot = shadowRoot === undefined ?  true : shadowRoot;

    const template = document.createElement('template');
    template.innerHTML = c.prototype.template();
    c.prototype.template = null;

    class ShadowRootCustomElement extends c {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        template() {}
    }

    class InlineCustomElement extends c {
        constructor() {
            super();
            this.appendChild(template.content.cloneNode(true));
        }
    }

    if(shadowRoot) {
        customElements.define(buildTagName(c.name), ShadowRootCustomElement);
    }else {
        customElements.define(buildTagName(c.name), InlineCustomElement);
    }
}