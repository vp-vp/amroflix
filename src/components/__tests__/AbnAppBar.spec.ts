import { h } from "vue";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

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

import AbnAppBar from "../AbnAppBar.vue";

describe("ABN App Bar", () => {
  it("renders properly", () => {
    const mockRoute = {
      name: "tv",
    };

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnAppBar),
      },
      global: {
        plugins: [vuetify],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.find('[data-testid="app-bar-nav-title"]').html()).toContain(
      "AMROFLIX"
    );
  });

  it("renders active home tab", () => {
    const mockRoute = {
      name: "home",
    };

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnAppBar),
      },
      global: {
        plugins: [vuetify],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.find('[data-testid="app-bar-nav-tv"]').html()).not.toContain(
      "v-btn--variant-outlined"
    );
    expect(wrapper.find('[data-testid="app-bar-nav-home"]').html()).toContain(
      "v-btn--variant-outlined"
    );
    expect(
      wrapper.find('[data-testid="app-bar-nav-movies"]').html()
    ).not.toContain("v-btn--variant-outlined");
  });

  it("renders active tv tab", () => {
    const mockRoute = {
      name: "tv",
    };

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnAppBar),
      },
      global: {
        plugins: [vuetify],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.find('[data-testid="app-bar-nav-tv"]').html()).toContain(
      "v-btn--variant-outlined"
    );
    expect(
      wrapper.find('[data-testid="app-bar-nav-home"]').html()
    ).not.toContain("v-btn--variant-outlined");
    expect(
      wrapper.find('[data-testid="app-bar-nav-movies"]').html()
    ).not.toContain("v-btn--variant-outlined");
  });

  it("renders active movies tab", () => {
    const mockRoute = {
      name: "movies",
    };

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnAppBar),
      },
      global: {
        plugins: [vuetify],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.find('[data-testid="app-bar-nav-tv"]').html()).not.toContain(
      "v-btn--variant-outlined"
    );
    expect(
      wrapper.find('[data-testid="app-bar-nav-home"]').html()
    ).not.toContain("v-btn--variant-outlined");
    expect(wrapper.find('[data-testid="app-bar-nav-movies"]').html()).toContain(
      "v-btn--variant-outlined"
    );
  });

  it("router push is called once", () => {
    const mockRoute = {
      name: "movies",
    };

    const wrapper = mount(components.VApp, {
      slots: {
        default: h(AbnAppBar),
      },
      global: {
        plugins: [vuetify],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    const navBarTitleEl = wrapper.get('[data-testid="app-bar-nav-title"]');
    navBarTitleEl.trigger("click");

    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toBeCalledWith("/");
  });
});
