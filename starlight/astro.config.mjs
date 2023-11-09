import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

import expressiveCode from "astro-expressive-code";
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
            tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
            customCss: ["./src/styles/custom.css", "./src/styles/landing.css"],
            components: {
                DownloadFile: "./src/components/DownloadFile.astro",
            },
            sidebar: [
                {
                    label: "Softwareentwicklung",
                    collapsed: true,
                    translations: {
                        en: "Software Development",
                    },
                    items: [
                        {
                            label: "Design Patterns",
                            collapsed: false,
                            translations: {
                                en: "Design Patterns",
                            },
                            items: [
                                {
                                    label: "Creational Design Patterns",
                                    translations: {
                                        en: "Creational Design Patterns",
                                    },
                                    autogenerate: {
                                        directory:
                                            "software_development/design_patterns/creational_design_patterns",
                                    },
                                },
                                {
                                    label: "Structural Design Patterns",
                                    translations: {
                                        en: "Structural Design Patterns",
                                    },
                                    autogenerate: {
                                        directory:
                                            "software_development/design_patterns/structural_design_patterns",
                                    },
                                },
                                {
                                    label: "Behavioral Design Patterns",
                                    translations: {
                                        en: "Behavioral Design Patterns",
                                    },
                                    autogenerate: {
                                        directory:
                                            "software_development/design_patterns/behavioral_design_patterns",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Informationssysteme",
                    collapsed: true,
                    translations: {
                        en: "Information systems",
                    },
                    items: [
                        {
                            label: "Relationale Datenbanken",
                            translations: {
                                en: "Relational Databases",
                            },
                            autogenerate: { directory: "information_systems/relational_databases" },
                        },
                    ],
                },
                {
                    label: "Dezentrale Systeme",
                    collapsed: true,
                    translations: {
                        en: "Decentralised Systems",
                    },
                    autogenerate: { directory: "decentralised_systems" },
                },
                {
                    label: "Eingebettete Programmierung",
                    collapsed: true,
                    translations: {
                        en: "Embedded Programming",
                    },
                    autogenerate: { directory: "embedded_programming" },
                },
                {
                    label: "Projektmanagement",
                    collapsed: true,
                    translations: {
                        en: "Project Manangement",
                    },
                    autogenerate: { directory: "project_management" },
                },
                {
                    label: "Sprachen",
                    collapsed: true,
                    translations: {
                        en: "Languages",
                    },
                    items: [
                        {
                            label: "Textsorten",
                            translations: {
                                en: "Text Types",
                            },
                            autogenerate: { directory: "languages/text_types" },
                        },
                    ],
                },
            ],
        }),
        expressiveCode(),
        starlightLinksValidator(),
    ],
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeMathjax],
    },
});
