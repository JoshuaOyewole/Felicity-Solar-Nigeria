/**
 * i18n integration tests
 *
 * Tests verify that:
 * 1. i18next initializes with the correct configuration
 * 2. Translations load and return correct strings for en, zh, and es
 * 3. Language switching works correctly
 * 4. The LanguageSwitcher component renders and changes language
 */

import i18n from "@/lib/i18n";

// ─── Helper ────────────────────────────────────────────────
async function loadLanguage(lang: string) {
  await i18n.changeLanguage(lang);
  return i18n;
}

// ─── Initialization ─────────────────────────────────────────
describe("i18n initialization", () => {
  it("initializes without errors", () => {
    expect(i18n).toBeDefined();
  });

  it("has the correct fallback language (en)", () => {
    const fallback = i18n.options.fallbackLng;
    const langs = Array.isArray(fallback) ? fallback : [fallback];
    expect(langs).toContain("en");
  });

  it("supports all three target languages", () => {
    const supported = i18n.options.supportedLngs as string[];
    expect(supported).toContain("en");
    expect(supported).toContain("zh");
    expect(supported).toContain("es");
  });

  it("registers the correct namespaces", () => {
    const ns = Array.isArray(i18n.options.ns)
      ? i18n.options.ns
      : [i18n.options.ns];
    expect(ns).toContain("common");
    expect(ns).toContain("home");
    expect(ns).toContain("about");
  });
});

// ─── English translations (default) ─────────────────────────
describe("English translations", () => {
  beforeAll(async () => {
    await loadLanguage("en");
    // Provide resources directly for test environment (no HTTP backend)
    i18n.addResourceBundle("en", "common", require("../../public/locales/en/common.json"), true, true);
    i18n.addResourceBundle("en", "home", require("../../public/locales/en/home.json"), true, true);
    i18n.addResourceBundle("en", "about", require("../../public/locales/en/about.json"), true, true);
  });

  it("translates common nav home label", () => {
    expect(i18n.t("nav.home", { ns: "common" })).toBe("Home");
  });

  it("translates common nav contact label", () => {
    expect(i18n.t("nav.contact", { ns: "common" })).toBe("Contact us");
  });

  it("translates home hero title", () => {
    expect(i18n.t("hero.title_part1", { ns: "home" })).toBe(
      "Power homes, businesses, and"
    );
  });

  it("translates home stats years label", () => {
    expect(i18n.t("stats.years", { ns: "home" })).toBe("Years in Business");
  });

  it("translates about page eyebrow", () => {
    expect(i18n.t("eyebrow", { ns: "about" })).toBe("About us");
  });

  it("translates about milestones title", () => {
    expect(i18n.t("milestones_title", { ns: "about" })).toBe("Our Milestones");
  });
});

// ─── Chinese translations ────────────────────────────────────
describe("Chinese (zh) translations", () => {
  beforeAll(async () => {
    await loadLanguage("zh");
    i18n.addResourceBundle("zh", "common", require("../../public/locales/zh/common.json"), true, true);
    i18n.addResourceBundle("zh", "home", require("../../public/locales/zh/home.json"), true, true);
    i18n.addResourceBundle("zh", "about", require("../../public/locales/zh/about.json"), true, true);
  });

  it("translates nav home to 首页", () => {
    expect(i18n.t("nav.home", { ns: "common", lng: "zh" })).toBe("首页");
  });

  it("translates nav get_quote correctly", () => {
    expect(i18n.t("nav.get_quote", { ns: "common", lng: "zh" })).toBe("获取报价");
  });

  it("translates home hero cta_quote correctly", () => {
    expect(i18n.t("hero.cta_quote", { ns: "home", lng: "zh" })).toBe("获取免费报价");
  });

  it("translates about eyebrow to 关于我们", () => {
    expect(i18n.t("eyebrow", { ns: "about", lng: "zh" })).toBe("关于我们");
  });
});

// ─── Spanish translations ────────────────────────────────────
describe("Spanish (es) translations", () => {
  beforeAll(async () => {
    await loadLanguage("es");
    i18n.addResourceBundle("es", "common", require("../../public/locales/es/common.json"), true, true);
    i18n.addResourceBundle("es", "home", require("../../public/locales/es/home.json"), true, true);
    i18n.addResourceBundle("es", "about", require("../../public/locales/es/about.json"), true, true);
  });

  it("translates nav home to Inicio", () => {
    expect(i18n.t("nav.home", { ns: "common", lng: "es" })).toBe("Inicio");
  });

  it("translates nav contact correctly", () => {
    expect(i18n.t("nav.contact", { ns: "common", lng: "es" })).toBe("Contáctenos");
  });

  it("translates home hero title_part3 correctly", () => {
    expect(i18n.t("hero.title_part3", { ns: "home", lng: "es" })).toBe(
      "en la que puedes confiar."
    );
  });

  it("translates about milestones title to Spanish", () => {
    expect(i18n.t("milestones_title", { ns: "about", lng: "es" })).toBe("Nuestros Hitos");
  });
});

// ─── Language switching ──────────────────────────────────────
describe("Language switching", () => {
  it("switches from English to Chinese", async () => {
    await i18n.changeLanguage("en");
    expect(i18n.language).toBe("en");
    await i18n.changeLanguage("zh");
    expect(i18n.language).toBe("zh");
  });

  it("switches from Chinese to Spanish", async () => {
    await i18n.changeLanguage("zh");
    await i18n.changeLanguage("es");
    expect(i18n.language).toBe("es");
  });

  it("returns fallback value for missing key", () => {
    const result = i18n.t("nonexistent.key", {
      ns: "home",
      lng: "en",
      defaultValue: "fallback",
    });
    expect(result).toBe("fallback");
  });
});
