import '@vaadin/button';
import '@vaadin/notification';
import { Notification } from '@vaadin/notification';
import '@vaadin/text-field';
import * as HomeEndpoint from 'Frontend/generated/HomeEndpoint';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';

@customElement('home-view')
export class HomeView extends View {
  name = '';

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
  }

  render() {
    return html`
      <vaadin-text-field label="Your name" @value-changed=${this.nameChanged}></vaadin-text-field>
      <vaadin-button @click=${this.sayHello}>Say hello</vaadin-button>
    `;
  }

  nameChanged(e: CustomEvent) {
    this.name = e.detail.value;
  }

  async sayHello() {
    const serverResponse = await HomeEndpoint.sayHello(this.name);
    Notification.show(serverResponse);
  }
}
