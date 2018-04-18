import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';
import '../styles/shared-styles.js';
import './component-sprite.js';

class ComponentJumbo extends PolymerElement {static get template() {return html`

    <style include="shared-styles">
    :host {
        display: block;
        font-size: 14px;
        height: 280px;
        margin-left:32px;
        margin-top:100px;
        color: #FFFFFF;
    }
    .welcome-to {
        font-weight: 50;
        font-size: 17px;
    }
    .swarmcity-eos {
        font-weight: 700;
        font-size: 60px;
        margin-bottom:20px;
    }
    .intro{
        font-weight: 600;
        font-size: 21px;
    }
    .strap{
        font-weight: 500;
        font-size: 14px;
        color: #E9EDFF;
    }
    .swarmcity-eos span {
        font-weight: 100;
    }
    </style>

    <div class="welcome-to">Welcome to</div>
    <div class="swarmcity-eos">SwarmCity<span>-EOS</span></div>
    <div class="intro">The EOS Platform for creating Human Service Marketplaces</div>
    <div class="strap">Communicate and transact value without third party interference.</div>

`;}

    static get is() {
        return 'component-jumbo';
    }
} customElements.define('component-jumbo', ComponentJumbo);
