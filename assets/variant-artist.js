// "Design by <artist>" under the variant picker. Art Decoris addition, not
// part of stock Horizon. See blocks/variant-artist.liquid.
//
// When the shopper picks another variant, Horizon fetches the page rendered
// for that variant and hands it on with the product-select event. This takes
// the same block from that page, so the artist follows the selected design.
import { StandardEvents } from '@shopify/events';

const SCOPE = '[id*="ProductInformation-"], [id*="QuickAdd-"]';

class VariantArtist extends HTMLElement {
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

        const fresh = detail.html.querySelector(`variant-artist[data-block-id="${this.dataset.blockId}"]`);
        if (!fresh) return;
        if (detail.newProduct) this.dataset.productId = fresh.dataset.productId;
        if (fresh.innerHTML !== this.innerHTML) this.innerHTML = fresh.innerHTML;
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') console.warn('[variant-artist]', error);
      });
  };
}

if (!customElements.get('variant-artist')) customElements.define('variant-artist', VariantArtist);
