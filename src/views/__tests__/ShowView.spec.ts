import { h } from "vue";
import { describe, it, expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({ components, directives });

vi.mock("vue-router", () => ({
  createRouter: vi.fn(),
  createWebHistory: vi.fn(),
  useRoute: vi.fn(() => {
    return {
      params: {
        id: 1,
      },
    };
  }),
}));

import ShowView from "../ShowView.vue";

const mockShow1 = {
  id: 1,
  name: "mock-show-1",
  genres: ["mock-genre-1"],
  language: "mock-language-1",
  summary: "mock-summary-1",
  rating: {
    average: 3,
  },
  image: {
    medium:
      "https://static.tvmaze.com/uploads/images/medium_portrait/1/2527.jpg",
    original:
      "https://static.tvmaze.com/uploads/images/original_untouched/1/2527.jpg",
  },
  officialSite: "mock-official-site-1",
};

const mockShow2 = {
  id: 2,
  name: "mock-show-2",
  genres: ["mock-genre-2"],
  language: "mock-language-2",
  summary: "mock-summary-2",
  rating: {
    average: 4,
  },
  image: {
    medium: "mock-image-medium-2",
    original: "mock-image-original-2",
  },
};

describe("Tv Show view", () => {
  it("renders text properly", async () => {
    global.fetch = vi.fn().mockResolvedValue({ json: () => mockShow2 });

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(ShowView),
      },
      global: {
        plugins: [vuetify],
      },
    });

    await flushPromises();

    const tvShowCard = wrapper.find('[data-testid="tv-show-2"]');
    expect(tvShowCard.exists()).toBe(true);
    expect(
      wrapper
        .find('[data-testid="tv-show-2-img"]')
        .element.getAttribute("aria-label")
    ).toEqual(mockShow2.image.original);
    expect(
      wrapper.find('[data-testid="tv-show-2-img-placeholder"]').text()
    ).toEqual(mockShow2.name);
    expect(wrapper.find('[data-testid="tv-show-2-name"]').text()).toEqual(
      mockShow2.name
    );
    expect(wrapper.find('[data-testid="tv-show-2-language"]').text()).toContain(
      mockShow2.language
    );
    expect(wrapper.find('[data-testid="tv-show-2-genre"]').text()).toContain(
      mockShow2.genres.join(", ")
    );
    expect(wrapper.find('[data-testid="tv-show-2-summary"]').text()).toContain(
      mockShow2.summary
    );
    expect(
      wrapper
        .find('[data-testid="tv-show-2-action"]')
        .element.getAttribute("disabled")
    ).not.toBeNull();
  });

  it("renders alt tags properly", async () => {
    global.fetch = vi.fn().mockResolvedValue({ json: () => mockShow1 });

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(ShowView),
      },
      global: {
        plugins: [vuetify],
      },
    });

    await flushPromises();

    const tvShowCard = wrapper.find('[data-testid="tv-show-1"]');
    expect(tvShowCard.exists()).toBe(true);
    expect(
      wrapper
        .find('[data-testid="tv-show-1-img"]')
        .element.getAttribute("aria-label")
    ).toEqual(mockShow1.image.original);
    expect(
      wrapper
        .find('[data-testid="tv-show-1-img-placeholder"]')
        .element.getAttribute("alt")
    ).toEqual(mockShow1.name);
    expect(
      wrapper.find('[data-testid="tv-show-1-name"]').element.getAttribute("alt")
    ).toEqual(mockShow1.name);
    expect(
      wrapper
        .find('[data-testid="tv-show-1-rating"]')
        .element.getAttribute("alt")
    ).toEqual("2");
    expect(
      wrapper
        .find('[data-testid="tv-show-1-language"]')
        .element.getAttribute("alt")
    ).toEqual(mockShow1.language);
    expect(
      wrapper
        .find('[data-testid="tv-show-1-genre"]')
        .element.getAttribute("alt")
    ).toEqual(mockShow1.genres.join(", "));
    expect(
      wrapper
        .find('[data-testid="tv-show-1-summary"]')
        .element.getAttribute("alt")
    ).toEqual(mockShow1.summary);
    expect(
      wrapper
        .find('[data-testid="tv-show-1-action"]')
        .element.getAttribute("alt")
    ).toEqual(mockShow1.officialSite);
    expect(
      wrapper
        .find('[data-testid="tv-show-1-action"]')
        .element.getAttribute("disabled")
    ).toBeNull();
  });

  it("does not render show if response is not defined", async () => {
    global.fetch = vi.fn().mockResolvedValue({ json: () => {} });

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(ShowView),
      },
      global: {
        plugins: [vuetify],
      },
    });

    await flushPromises();

    const tvShowCard = wrapper.find('[data-testid="tv-show-2"]');
    expect(tvShowCard.exists()).toBe(false);
  });

  // TODO: test loading indicator
});
