import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';
import '../styles/shared-styles.js';
import './component-sprite.js';

class ComponentHeader extends PolymerElement { static get template() { return html`

    <style include="shared-styles">
    :host {
        display: block;
        border-top: 10px solid rgba(0, 0, 0, 1);
        font-size: 14px;
    }

    .drawer-list {
        margin: 0 20px;
        display: flex;
        flex-wrap: nowrap;
    }

    .drawer-list a {
        color: rgba(255, 255, 255, 1);
        display: block;
        padding: 0 16px;
        text-decoration: none;
        line-height: 64px;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
    }

    .drawer-list a.iron-selected {
        background-color: rgba(62, 113, 205, 1);
    }

    .drawer-list a:hover {
        background-color: rgba(35, 61, 143, 1);
    }

    .navigation {
        background-color: rgba(31, 31, 31, 1);
    }
    .spacer {
        flex: 1
    }
    .lighter {
        background-color: rgba(64, 64, 64, 1);
        width: 160px;
        text-align: center;
        line-height: 36px;
        margin-top: 14px;
        cursor: pointer;
        font-weight: 700;
        transition: background-color 0.5s ease;
    }
    .lighter:hover {
        background-color: rgba(87, 87, 87, 1);
    }
    .button{
        width: 110px;
        text-align: center;
        line-height: 36px;
        margin-top: 14px;
        cursor: pointer;
        font-weight: 700;
    }

    component-sprite {
        margin: 20px;
    }
    

    </style>

<div class="navigation">
    <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">

        <component-sprite
            icon="logo-invert">
        </component-sprite>

        <a name="welcome" href="[[rootPath]]welcome">Marketplaces</a>
        <a name="view2" href="[[rootPath]]view2">Hives</a>
        <a name="view3" href="[[rootPath]]view3">Philosophy</a>
        <a name="view3" href="[[rootPath]]view3">Tech</a>
        <a name="view3" href="[[rootPath]]view3">Support</a>
        <div class="spacer"></div>
        <div class="area"><div class="button" on-click="_logIn">Log In</div></div>
        <div class="area"><div class="lighter" on-click="_join">Join Swarm City</div></div>
    </iron-selector>
</div>

`;} 

static get is() { 
    return 'component-header'; 
}

_join(){
    this.dispatchEvent(new CustomEvent('overlay', {bubbles: true, composed: true, detail: {action: 'join'}}));
}
_logIn(){
    this.dispatchEvent(new CustomEvent('overlay', {bubbles: true, composed: true, detail: {action: 'login'}}));
}

} customElements.define('component-header', ComponentHeader);
