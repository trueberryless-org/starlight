import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

import starlightLinksValidator from "starlight-links-validator";

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
                baseUrl: "https://github.com/trueberryless-org/mutanuq/tree/main/starlight/",
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
            },
            sidebar: [
                {
                    label: "Informationstechnologie",
                    collapsed: false,
                    translations: {
                        en: "Information Technology",
                    },
                    autogenerate: { directory: "information_technology" },
                },
                {
                    label: "Projektmanagement",
                    collapsed: false,
                    translations: {
                        en: "Project Management",
                    },
                    autogenerate: { directory: "project_management" },
                },
                {
                    label: "Sprachen",
                    collapsed: false,
                    translations: {
                        en: "Languages",
                    },
                    autogenerate: { directory: "languages" },
                },
                {
                    label: "Wirtschaft und Recht",
                    collapsed: false,
                    translations: {
                        en: "Economy and Law",
                    },
                    autogenerate: { directory: "economy_and_law" },
                },
            ],
            components: {
                Pagination: "./src/components/CustomPagination.astro",
            },
        }),
        starlightLinksValidator(),
    ],
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeMathjax],
    },
    redirects: {
        "/": "/de/",
    },
});
