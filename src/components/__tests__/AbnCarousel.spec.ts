import { h } from "vue";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import type { IShow } from "@/types";

const vuetify = createVuetify({ components, directives });

const mockPush = vi.fn();
vi.mock("@/router", () => {
  return {
    default: { push: mockPush },
  };
});
vi.mock("vue-router", () => ({
  createRouter: vi.fn(),
  createWebHistory: vi.fn(),
}));

import AbnCarousel from "../AbnCarousel.vue";

function getShowsList() {
  return [
    {
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
    },
    {
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
      officialSite: "mock-official-site-2",
    },
  ];
}

describe("ABN Carousel", () => {
  it("renders carousel", () => {
    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnCarousel, { showsList: getShowsList() }),
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.findAll('[data-testid^="carousel-card"]').length).toEqual(8);
  });

  it("renders 0 elements in carousel", () => {
    const showsList: Array<IShow> = [];
    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnCarousel, { showsList }),
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.findAll('[data-testid^="carousel-card"]').length).toEqual(0);
  });

  it("renders carousel card correctly", () => {
    const showsList = getShowsList();
    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnCarousel, { showsList }),
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.find('[data-testid="carousel-card-1"]')).not.toBeNull();
    expect(
      wrapper.find('[data-testid="carousel-card-1-subtitle"]').element.innerHTML
    ).toEqual(showsList[0].name);
    expect(
      wrapper
        .find('[data-testid="carousel-card-1-img"]')
        .element.getAttribute("aria-label")
    ).toEqual(showsList[0].image.medium);
    expect(
      wrapper.find('[data-testid="carousel-card-1-img-placeholder"]').element
        .innerHTML
    ).toEqual(showsList[0].name);
  });

  it("renders carousel card image placeholder", () => {
    const showsList = getShowsList();
    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnCarousel, { showsList }),
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.find('[data-testid="carousel-card-2"]')).not.toBeNull();
    expect(
      wrapper.find('[data-testid="carousel-card-2-subtitle"]').element.innerHTML
    ).toEqual(showsList[1].name);
    expect(
      wrapper
        .find('[data-testid="carousel-card-2-img"]')
        .element.getAttribute("aria-label")
    ).toEqual(showsList[1].image.medium);
    expect(
      wrapper.find('[data-testid="carousel-card-2-img-placeholder"]').element
        .innerHTML
    ).toEqual(showsList[1].name);
  });

  it("router push is called once", () => {
    const showsList = getShowsList();
    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnCarousel, { showsList }),
      },
      global: {
        plugins: [vuetify],
      },
    });

    const navBarTitleEl = wrapper.get('[data-testid="carousel-card-1"]');
    navBarTitleEl.trigger("click");

    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toBeCalledWith({
      name: "show",
      params: {
        id: 1,
      },
    });
  });
});
