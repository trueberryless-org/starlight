import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import starlightImageZoom from "starlight-image-zoom";
import starlightViewModes from "starlight-view-modes";
import starlightLinksValidator from "starlight-links-validator";
import starlightSidebarTopicsDropdown from "starlight-sidebar-topics-dropdown";

// https://astro.build/config
// https://starlight.astro.build/reference/configuration/
export default defineConfig({
  site: "https://mutanuq.trueberryless.org",
  integrations: [
    starlight({
      title: "Mutanuq",
      logo: {
        light: "./src/assets/light-logo.png",
        dark: "./src/assets/dark-logo.png",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/trueberryless-org/mutanuq",
        patreon: "https://www.patreon.com/trueberryless",
      },
      editLink: {
        baseUrl:
          "https://github.com/trueberryless-org/mutanuq/tree/main/starlight/",
      },
      lastUpdated: true,
      defaultLocale: "de",
      locales: {
        de: {
          label: "Deutsch",
        },
        en: {
          label: "English",
        },
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      expressiveCode: {},
      customCss: [
        "./src/styles/custom.css",
        "./src/styles/landing.css",
        "./src/styles/print.css",
        "@fontsource-variable/jetbrains-mono/wght.css",
      ],
      components: {
        DownloadFile: "./src/components/DownloadFile.astro",
        Pagination: "./src/components/CustomPagination.astro",
      },
      plugins: [
        starlightImageZoom(),
        starlightLinksValidator(),
        starlightViewModes(),
        starlightSidebarTopicsDropdown([
          {
            label: {
              de: "Überblick",
              en: "Overview",
            },
            icon: "magnifier",
            link: "/overview/",
            items: [
              {
                label: "Überblick",
                translations: {
                  en: "Overview",
                },
                items: ["overview"],
              },
            ],
          },
          {
            label: {
              de: "Softwareentwicklung",
              en: "Software Development",
            },
            icon: "rocket",
            link: "/software-development/",
            items: [
              {
                label: "Softwareentwicklung",
                translations: {
                  en: "Software Development",
                },
                items: [
                  "software-development/object-oriented-programming",
                  "software-development/software-metrics",
                ],
              },
              {
                label: "Design Patterns",
                translations: {
                  en: "Design Patterns",
                },
                collapsed: true,
                items: [
                  {
                    label: "Behavioral Design Patterns",
                    translations: {
                      en: "Behavioral Design Patterns",
                    },
                    items: [
                      "software-development/design-patterns/behavioral-design-patterns/command",
                      "software-development/design-patterns/behavioral-design-patterns/strategy",
                    ],
                  },
                  {
                    label: "Structural Design Patterns",
                    translations: {
                      en: "Structural Design Patterns",
                    },
                    items: [
                      "software-development/design-patterns/structural-design-patterns/adapter",
                      "software-development/design-patterns/structural-design-patterns/decorator",
                    ],
                  },
                  {
                    label: "Creational Design Patterns",
                    translations: {
                      en: "Creational Design Patterns",
                    },
                    items: [
                      "software-development/design-patterns/creational-design-patterns/singleton",
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: "Dezentrale Systeme",
            translations: {
              en: "Decentralized Systems",
            },
            link: "/decentralised-systems/",
            items: ["information_technology/decentralised_systems"],
          },
        ]),
      ],
      credits: true,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },
  redirects: {
    "/": "/de/",
  },
});
