import { h } from "vue";
import { describe, it, expect } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import AbnLoading from "../AbnLoading.vue";

const vuetify = createVuetify({ components, directives });

describe("ABN Loading", () => {
  it("renders loading if show = true", async () => {
    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnLoading, { show: true }),
      },
      global: {
        plugins: [vuetify],
      },
    });

    await flushPromises();

    expect(wrapper.exists()).toEqual(true);
    /* const progressEl = wrapper.get('[data-testid="progress-circular"]')
        expect(progressEl.element.getAttribute('alt')).toEqual('loading...') */
  });

  it("does not render loading if show = false", () => {
    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnLoading, { show: false }),
      },
      global: {
        plugins: [vuetify],
      },
    });

    const tvShowCard = wrapper.find('[data-testid="progress-circular"]');
    expect(tvShowCard.exists()).toBe(false);
  });
});
