import { defineConfig, presetAttributify, presetIcons, presetWind4 } from "unocss";
import themeConfig from "./src/theme.config";
import extractorSvelte from "@unocss/extractor-svelte";
import { transformerDirectives } from "unocss";

const iconSafeList = themeConfig.nav.flatMap((item) => {
  const icons: string[] = [];
  if (item.icon) {
    icons.push(item.icon);
  }
  if (item.dropbox?.items) {
    item.dropbox.items.forEach((subItem) => {
      if (subItem.icon) {
        icons.push(subItem.icon);
      }
    });
  }
  return icons;
});

if (themeConfig.sidebar?.social) {
  Object.values(themeConfig.sidebar.social).forEach((value) => {
    const iconStr = value.icon;
    if (iconStr) {
      iconSafeList.push(iconStr.startsWith("i-") ? iconStr : `i-ri-${iconStr}`);
    }
  });
}

if (themeConfig.sidebar?.menu) {
  Object.values(themeConfig.sidebar.menu).forEach((value) => {
    const iconStr = value.icon;
    if (iconStr) {
      iconSafeList.push(iconStr.startsWith("i-") ? iconStr : `i-ri-${iconStr}`);
    }
  });
}

export default defineConfig({
  presets: [presetWind4(), presetIcons(), presetAttributify()],
  extractors: [extractorSvelte()],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      // 灰阶：支持 text-grey-4 / border-grey-3 / bg-grey-1 等
      grey: {
        0: "var(--grey-0)",
        1: "var(--grey-1)",
        2: "var(--grey-2)",
        3: "var(--grey-3)",
        4: "var(--grey-4)",
        5: "var(--grey-5)",
        6: "var(--grey-6)",
        7: "var(--grey-7)",
        8: "var(--grey-8)",
        9: "var(--grey-9)",
      },

      // 语义色：支持 text-primary / text-color-link / bg-body-bg-shadow 等
      primary: "var(--primary-color)",
      "color-link": "var(--primary-color)",
      color: "var(--text-color)",
      "text-muted": "var(--text-color-muted)",
      "text-subtle": "var(--text-color-subtle)",
      "header-text": "var(--header-text-color)",
      "body-bg-shadow": "var(--body-bg-shadow)",
      "box-bg-shadow": "var(--box-bg-shadow)",
      "border-muted": "var(--border-color-muted)",

      // 调色盘原子色：支持 text-color-blue / bg-color-red 等
      "color-red": "var(--color-red)",
      "color-pink": "var(--color-pink)",
      "color-orange": "var(--color-orange)",
      "color-yellow": "var(--color-yellow)",
      "color-green": "var(--color-green)",
      "color-aqua": "var(--color-aqua)",
      "color-blue": "var(--color-blue)",
      "color-purple": "var(--color-purple)",
      "color-grey": "var(--color-grey)",
    },
  },
  safelist: [...new Set(iconSafeList)],
});
