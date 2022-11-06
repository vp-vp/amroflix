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

import TelevisionView from "../TelevisionView.vue";

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

describe("Television view", () => {
  it("renders properly", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue({ json: () => [mockShow1, mockShow2] });

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(TelevisionView),
      },
      global: {
        plugins: [vuetify],
      },
    });

    await flushPromises();

    const tvShowCards = wrapper.findAll('[data-testid^="tv-shows"]');
    expect(tvShowCards.length).toBe(7);

    expect(
      wrapper.find('[data-testid="tv-shows-mock-genre-1"]').text()
    ).toContain(mockShow1.genres.join(", "));

    expect(
      wrapper.find('[data-testid="tv-shows-mock-genre-2"]').text()
    ).toContain(mockShow2.genres.join(", "));
  });

  describe("render list of tv shows which match search string", () => {
    it("lower case", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValue({ json: () => [mockShow1, mockShow2] });

      const wrapper = mount(components.VApp, {
        slots: {
          default: h(TelevisionView),
        },
        global: {
          plugins: [vuetify],
        },
      });

      await flushPromises();

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(true);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(true);

      await wrapper
        .find('[data-testid="tv-shows-search"]')
        .find("input")
        .setValue("m");

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(true);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(true);
    });

    it("upper case", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValue({ json: () => [mockShow1, mockShow2] });

      const wrapper = mount(components.VApp, {
        slots: {
          default: h(TelevisionView),
        },
        global: {
          plugins: [vuetify],
        },
      });

      await flushPromises();

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(true);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(true);

      await wrapper
        .find('[data-testid="tv-shows-search"]')
        .find("input")
        .setValue("M");

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(true);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(true);
    });

    it("show first result", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValue({ json: () => [mockShow1, mockShow2] });

      const wrapper = mount(components.VApp, {
        slots: {
          default: h(TelevisionView),
        },
        global: {
          plugins: [vuetify],
        },
      });

      await flushPromises();

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(true);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(true);

      await wrapper
        .find('[data-testid="tv-shows-search"]')
        .find("input")
        .setValue("1");

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(true);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(false);
    });

    it("show second result", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValue({ json: () => [mockShow1, mockShow2] });

      const wrapper = mount(components.VApp, {
        slots: {
          default: h(TelevisionView),
        },
        global: {
          plugins: [vuetify],
        },
      });

      await flushPromises();

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(true);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(true);

      await wrapper
        .find('[data-testid="tv-shows-search"]')
        .find("input")
        .setValue("2");

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(false);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(true);
    });

    it("show no results", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValue({ json: () => [mockShow1, mockShow2] });

      const wrapper = mount(components.VApp, {
        slots: {
          default: h(TelevisionView),
        },
        global: {
          plugins: [vuetify],
        },
      });

      await flushPromises();

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(true);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(true);

      await wrapper
        .find('[data-testid="tv-shows-search"]')
        .find("input")
        .setValue("not found");

      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-1"]').exists()
      ).toEqual(false);
      expect(
        wrapper.find('[data-testid="tv-shows-mock-genre-2"]').exists()
      ).toEqual(false);
    });
  });

  // TODO: test loading indicator
});
