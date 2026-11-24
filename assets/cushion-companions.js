// The inner cushion that fits the chosen cover, and the design's other type,
// under the variant picker. OVS addition (Loop 2); see blocks/cushion-companions.liquid.
//
// When the shopper picks another variant, Horizon fetches the page rendered for
// it and hands it on with the product-select event; this takes the same block
// from that page, as variant-artist.js does, so the suggestion follows the
// chosen size and contents.
import { StandardEvents } from '@shopify/events';

const SCOPE = '[id*="ProductInformation-"], [id*="QuickAdd-"]';

class CushionCompanions extends HTMLElement {
  connectedCallback() {
    this.scope = this.closest(SCOPE);
    this.scope?.addEventListener(StandardEvents.productSelect, this.#onProductSelect);
  }

  disconnectedCallback() {
    this.scope?.removeEventListener(StandardEvents.productSelect, this.#onProductSelect);
  }

  #onProductSelect = (event) => {
    event.promise
      ?.then(({ detail } = {}) => {
        if (!detail?.html) return;
        if (detail.productId && detail.productId !== this.dataset.productId && !detail.newProduct) return;
        const fresh = detail.html.querySelector(`cushion-companions[data-block-id="${this.dataset.blockId}"]`);
        if (!fresh) return;
        if (detail.newProduct) this.dataset.productId = fresh.dataset.productId;
        if (fresh.innerHTML !== this.innerHTML) this.innerHTML = fresh.innerHTML;
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') console.warn('[cushion-companions]', error);
      });
  };
}

if (!customElements.get('cushion-companions')) customElements.define('cushion-companions', CushionCompanions);
