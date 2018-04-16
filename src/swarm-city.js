import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';

import './pages/terminal/page-welcome.js';
import './pages/terminal/page-view2.js';
import './pages/terminal/page-view3.js';
import './pages/page-view404.js';

import './components/component-header.js';
import './components/component-overlay.js';

import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
setPassiveTouchGestures(true);
setRootPath(Polymer.rootPath);

class SwarmCity extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        --app-primary-color: #F3D879;
        --app-secondary-color: black;
        display: block;
      }

      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }

      app-header {
        color: #fff;
        background-color: var(--app-primary-color);
      }

      app-header paper-icon-button {
        --paper-icon-button-ink-color: white;
      }

    </style>

    <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
    <component-overlay></component-overlay>
    <app-header-layout>  

      <app-header slot="header" fixed condenses effects="waterfall">
        <component-header></component-header>
      </app-header>

      <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="view404" role="main">
        <page-welcome name="welcome"></page-welcome>
        <page-view2 name="view2"></page-view2>
        <page-view3 name="view3"></page-view3>
        <page-view404 name="view404"></page-view404>
      </iron-pages>
      
    </app-header-layout>

`;
  }

  static get is() { return 'swarm-city'; }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: Object
    };
  }


  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page) {
    this.page = page || 'view1';
  }

  _pageChanged(page) {
    let loaded;
    switch(page) {
      case 'view1':
        loaded = import('./pages/terminal/page-welcome.js');
        break;
      case 'view2':
        loaded = import('./pages/terminal/page-view2.js');
        break;
      case 'view3':
        loaded = import('./pages/terminal/page-view3.js');
        break;
      case 'view404':
        loaded = import('./pages/page-view404.js');
        break;
      default:
        loaded = Promise.reject();
    }

    loaded.then(
      _ => {},
      _ => { this._showPage404.bind(this) }
    );
  }

  _showPage404() {
    this.page = 'view404';
  }
}

customElements.define('swarm-city', SwarmCity);
