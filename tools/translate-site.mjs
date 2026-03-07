#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const VIEWS_PATH = path.join(ROOT, "views-zones.json");
const SCRIPT_PATH = path.join(ROOT, "script.js");
const CACHE_PATH = path.join(ROOT, ".translation-cache.json");

const SOURCE_LANGUAGE = "fr";

const LOCALE_BY_LANG = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
  de: "de-DE",
  ru: "ru-RU",
};

const DEEPL_LANG_BY_CODE = {
  en: "EN-US",
  es: "ES",
  de: "DE",
  ru: "RU",
};

const LIBRE_LANG_BY_CODE = {
  en: "en",
  es: "es",
  de: "de",
  ru: "ru",
};

const MYMEMORY_LANG_BY_CODE = {
  en: "en",
  es: "es",
  de: "de",
  ru: "ru",
};

const HELP = `\ntranslate-site.mjs\n\nUsage:\n  node tools/translate-site.mjs [--provider deepl|libre|mymemory] [--dry-run]\n\nProviders:\n  deepl (recommended): set DEEPL_API_KEY\n  libre: set LIBRETRANSLATE_URL (optional) and LIBRETRANSLATE_API_KEY (optional)\n  mymemory: free public provider (no key)\n\nEnvironment variables:\n  DEEPL_API_KEY\n  LIBRETRANSLATE_URL (default: https://libretranslate.com/translate)\n  LIBRETRANSLATE_API_KEY\n\nWhat it updates:\n  - views-zones.json translations for all supported languages (except fr)\n  - staticI18n inside script.js for the same languages\n\nNotes:\n  - Source language is always fr\n  - URLs, mails, and technical separators are preserved\n`; 

function parseArgs(argv) {
  const args = {
    provider: null,
    dryRun: false,
    help: false,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") {
      args.help = true;
      continue;
    }

    if (token === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    if (token === "--provider") {
      args.provider = argv[i + 1] || null;
      i += 1;
      continue;
    }
  }

  return args;
}

function detectProvider(cliProvider) {
  if (cliProvider) {
    return cliProvider.toLowerCase();
  }
  return process.env.DEEPL_API_KEY ? "deepl" : "mymemory";
}

async function readJson(filePath, fallback = null) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (fallback !== null) {
      return fallback;
    }
    throw error;
  }
}

async function writeJson(filePath, value) {
  const data = `${JSON.stringify(value, null, 2)}\n`;
  await fs.writeFile(filePath, data, "utf8");
}

function isLikelyAsciiBorder(text) {
  return /^[\s+\-|_]+$/.test(text);
}

function isUrlOrMail(text) {
  return /^https?:\/\//i.test(text) || /^mailto:/i.test(text);
}

function isTechnicalToken(text) {
  if (!text || !text.trim()) {
    return true;
  }

  if (isLikelyAsciiBorder(text)) {
    return true;
  }

  if (isUrlOrMail(text)) {
    return true;
  }

  return false;
}

function normalizeWhitespaceAround(original, translated) {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return `${leading}${translated.trim()}${trailing}`;
}

function normalizeLabelToken(text) {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase()
    .replace(/ /g, "_");
}

function getCacheKey(provider, targetLanguage, text) {
  return `${provider}::${targetLanguage}::${text}`;
}

function createTranslator({ provider, cache }) {
  async function requestDeepL(texts, targetLanguage) {
    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
      throw new Error("DEEPL_API_KEY is missing.");
    }

    const deeplTarget = DEEPL_LANG_BY_CODE[targetLanguage];
    if (!deeplTarget) {
      throw new Error(`Unsupported language for DeepL: ${targetLanguage}`);
    }

    const params = new URLSearchParams();
    params.set("source_lang", "FR");
    params.set("target_lang", deeplTarget);
    for (const text of texts) {
      params.append("text", text);
    }

    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`DeepL error ${response.status}: ${body}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.translations) || data.translations.length !== texts.length) {
      throw new Error("DeepL response is invalid.");
    }

    return data.translations.map((item) => item.text || "");
  }

  async function requestLibre(texts, targetLanguage) {
    const libreTarget = LIBRE_LANG_BY_CODE[targetLanguage];
    if (!libreTarget) {
      throw new Error(`Unsupported language for LibreTranslate: ${targetLanguage}`);
    }

    const endpoint = process.env.LIBRETRANSLATE_URL || "https://libretranslate.com/translate";
    const apiKey = process.env.LIBRETRANSLATE_API_KEY || "";

    const out = [];
    for (const text of texts) {
      const payload = {
        q: text,
        source: "fr",
        target: libreTarget,
        format: "text",
      };

      if (apiKey) {
        payload.api_key = apiKey;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`LibreTranslate error ${response.status}: ${body}`);
      }

      const data = await response.json();
      out.push(data.translatedText || "");
    }

    return out;
  }

  async function requestMyMemory(texts, targetLanguage) {
    const target = MYMEMORY_LANG_BY_CODE[targetLanguage];
    if (!target) {
      throw new Error(`Unsupported language for MyMemory: ${targetLanguage}`);
    }

    const out = [];

    for (const text of texts) {
      const params = new URLSearchParams();
      params.set("q", text);
      params.set("langpair", `fr|${target}`);

      const url = `https://api.mymemory.translated.net/get?${params.toString()}`;
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`MyMemory error ${response.status}: ${body}`);
      }

      const data = await response.json();
      const translated = data?.responseData?.translatedText;
      out.push(typeof translated === "string" && translated.length > 0 ? translated : text);
    }

    return out;
  }

  async function request(texts, targetLanguage) {
    if (provider === "deepl") {
      return requestDeepL(texts, targetLanguage);
    }

    if (provider === "libre") {
      return requestLibre(texts, targetLanguage);
    }

    if (provider === "mymemory") {
      return requestMyMemory(texts, targetLanguage);
    }

    throw new Error(`Unknown provider: ${provider}`);
  }

  async function translateBatch(rawTexts, targetLanguage) {
    const texts = rawTexts.map((text) => String(text));
    const results = new Array(texts.length).fill("");

    const missing = [];
    for (let i = 0; i < texts.length; i += 1) {
      const key = getCacheKey(provider, targetLanguage, texts[i]);
      if (cache[key]) {
        results[i] = cache[key];
      } else {
        missing.push({ index: i, text: texts[i], key });
      }
    }

    if (missing.length > 0) {
      const chunkSize = 40;
      for (let i = 0; i < missing.length; i += chunkSize) {
        const chunk = missing.slice(i, i + chunkSize);
        const translated = await request(
          chunk.map((item) => item.text),
          targetLanguage
        );

        for (let j = 0; j < chunk.length; j += 1) {
          const item = chunk[j];
          const translatedText = translated[j] || item.text;
          cache[item.key] = translatedText;
          results[item.index] = translatedText;
        }
      }
    }

    return results;
  }

  async function translateText(text, targetLanguage) {
    if (isTechnicalToken(text)) {
      return text;
    }

    const [translated] = await translateBatch([text], targetLanguage);
    return translated;
  }

  return {
    translateText,
    translateBatch,
  };
}

async function translateLabel(label, targetLanguage, translator) {
  const match = label.match(/^\[\s*(.*?)\s*\]$/);
  if (!match) {
    return translator.translateText(label, targetLanguage);
  }

  const core = match[1].replace(/_/g, " ");
  const translated = await translator.translateText(core, targetLanguage);
  return `[ ${normalizeLabelToken(translated)} ]`;
}

async function translateAsciiLine(line, targetLanguage, translator) {
  if (isLikelyAsciiBorder(line)) {
    return line;
  }

  const firstPipe = line.indexOf("|");
  const lastPipe = line.lastIndexOf("|");

  if (firstPipe === -1 || lastPipe === -1 || firstPipe === lastPipe) {
    return translator.translateText(line, targetLanguage);
  }

  const before = line.slice(0, firstPipe + 1);
  const middle = line.slice(firstPipe + 1, lastPipe);
  const after = line.slice(lastPipe);

  if (!middle.trim()) {
    return line;
  }

  const translatedCore = await translator.translateText(middle.trim(), targetLanguage);

  const leading = middle.match(/^\s*/)?.[0] || "";
  const width = middle.length;
  let rebuilt = `${leading}${translatedCore}`;

  if (rebuilt.length > width) {
    rebuilt = rebuilt.slice(0, width);
  }

  rebuilt = rebuilt.padEnd(width, " ");
  return `${before}${rebuilt}${after}`;
}

async function translateMetaLine(line, targetLanguage, translator) {
  const trimmed = line.trimStart();
  if (!trimmed.startsWith(">")) {
    return translator.translateText(line, targetLanguage);
  }

  const index = line.indexOf(">");
  const prefix = line.slice(0, index + 1);
  const body = line.slice(index + 1);
  const translated = await translator.translateText(body.trim(), targetLanguage);
  return normalizeWhitespaceAround(body, `${prefix} ${translated}`);
}

async function translateCategory(category, targetLanguage, translator) {
  const translatedTitle = await translator.translateText(category.title || "", targetLanguage);
  const translatedSubtitle = await translator.translateText(category.subtitle || "", targetLanguage);

  const sourceAscii = Array.isArray(category.textZone?.asciiLines) ? category.textZone.asciiLines : [];
  const sourceMeta = Array.isArray(category.textZone?.metaLines) ? category.textZone.metaLines : [];

  const asciiLines = [];
  for (const line of sourceAscii) {
    asciiLines.push(await translateAsciiLine(String(line), targetLanguage, translator));
  }

  const metaLines = [];
  for (const line of sourceMeta) {
    metaLines.push(await translateMetaLine(String(line), targetLanguage, translator));
  }

  const actions = [];
  for (const action of Array.isArray(category.actions) ? category.actions : []) {
    const next = { ...action };
    if (typeof action.label === "string") {
      next.label = await translateLabel(action.label, targetLanguage, translator);
    }
    actions.push(next);
  }

  return {
    title: translatedTitle,
    subtitle: translatedSubtitle,
    textZone: {
      asciiLines,
      metaLines,
      asciiText: asciiLines.join("\n"),
      metaText: metaLines.join("\n"),
    },
    actions,
  };
}

function extractStaticI18n(scriptContent) {
  const startToken = "const staticI18n = ";

  const start = scriptContent.indexOf(startToken);
  if (start === -1) {
    throw new Error("Unable to find staticI18n in script.js");
  }

  const firstBrace = scriptContent.indexOf("{", start);
  if (firstBrace === -1) {
    throw new Error("Unable to extract staticI18n block from script.js");
  }

  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  let escaped = false;
  let endBrace = -1;

  for (let i = firstBrace; i < scriptContent.length; i += 1) {
    const char = scriptContent[i];
    const next = scriptContent[i + 1] || "";

    if (inLineComment) {
      if (char === "\n") {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === "*" && next === "/") {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }

    if (inSingle) {
      if (!escaped && char === "\\") {
        escaped = true;
        continue;
      }

      if (!escaped && char === "'") {
        inSingle = false;
      }

      escaped = false;
      continue;
    }

    if (inDouble) {
      if (!escaped && char === "\\") {
        escaped = true;
        continue;
      }

      if (!escaped && char === '"') {
        inDouble = false;
      }

      escaped = false;
      continue;
    }

    if (inTemplate) {
      if (!escaped && char === "\\") {
        escaped = true;
        continue;
      }

      if (!escaped && char === "`") {
        inTemplate = false;
      }

      escaped = false;
      continue;
    }

    if (char === "/" && next === "/") {
      inLineComment = true;
      i += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      inBlockComment = true;
      i += 1;
      continue;
    }

    if (char === "'") {
      inSingle = true;
      continue;
    }

    if (char === '"') {
      inDouble = true;
      continue;
    }

    if (char === "`") {
      inTemplate = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        endBrace = i;
        break;
      }
    }
  }

  if (endBrace === -1) {
    throw new Error("Unable to locate end of staticI18n object.");
  }

  const end = endBrace + 1;
  const objectLiteral = scriptContent.slice(firstBrace, end);
  const objectValue = Function(`"use strict"; return (${objectLiteral});`)();

  return {
    start,
    firstBrace,
    end,
    objectLiteral,
    objectValue,
  };
}

function isIdentifier(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
}

function jsString(value) {
  return JSON.stringify(value);
}

function toJsLiteral(value, indent = 0) {
  const gap = "  ".repeat(indent);
  const nextGap = "  ".repeat(indent + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    const items = value.map((item) => `${nextGap}${toJsLiteral(item, indent + 1)}`);
    return `[\n${items.join(",\n")}\n${gap}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return "{}";
    }

    const lines = entries.map(([key, entryValue]) => {
      const safeKey = isIdentifier(key) ? key : jsString(key);
      return `${nextGap}${safeKey}: ${toJsLiteral(entryValue, indent + 1)}`;
    });

    return `{\n${lines.join(",\n")}\n${gap}}`;
  }

  if (typeof value === "string") {
    return jsString(value);
  }

  return String(value);
}

function shouldSkipValue(pathParts, text) {
  const lastKey = pathParts[pathParts.length - 1] || "";

  if (lastKey === "locale" || lastKey === "htmlLang") {
    return true;
  }

  if (lastKey === "title" && pathParts.includes("windows")) {
    return true;
  }

  if (lastKey === "label" && pathParts.includes("windows")) {
    return true;
  }

  if (lastKey === "href" || lastKey === "view") {
    return true;
  }

  if (isTechnicalToken(text)) {
    return true;
  }

  return false;
}

async function translatePackValue(value, targetLanguage, translator, pathParts = []) {
  if (Array.isArray(value)) {
    const out = [];
    for (let i = 0; i < value.length; i += 1) {
      out.push(await translatePackValue(value[i], targetLanguage, translator, [...pathParts, String(i)]));
    }
    return out;
  }

  if (value && typeof value === "object") {
    const out = {};
    for (const [key, entryValue] of Object.entries(value)) {
      out[key] = await translatePackValue(entryValue, targetLanguage, translator, [...pathParts, key]);
    }
    return out;
  }

  if (typeof value !== "string") {
    return value;
  }

  if (shouldSkipValue(pathParts, value)) {
    return value;
  }

  const inShellTips = pathParts.includes("shellTips");
  if (inShellTips) {
    const parts = value.split("#");
    if (parts.length === 2) {
      const cmd = parts[0];
      const comment = parts[1];
      const translated = await translator.translateText(comment.trim(), targetLanguage);
      return `${cmd}# ${translated}`;
    }
  }

  const maybeLabel = value.match(/^\[\s*(.*?)\s*\]$/);
  if (maybeLabel) {
    return translateLabel(value, targetLanguage, translator);
  }

  return translator.translateText(value, targetLanguage);
}

async function translateStaticI18n(staticI18n, languages, translator) {
  const out = { ...staticI18n };
  const sourcePack = staticI18n[SOURCE_LANGUAGE];

  for (const language of languages) {
    const translated = await translatePackValue(sourcePack, language, translator, ["staticI18n", SOURCE_LANGUAGE]);
    translated.locale = LOCALE_BY_LANG[language] || translated.locale || sourcePack.locale;
    translated.htmlLang = language;
    out[language] = translated;
  }

  return out;
}

async function translateViewsConfig(config, languages, translator) {
  const out = structuredClone(config);

  for (const category of out.categories) {
    if (!category || typeof category !== "object") {
      continue;
    }

    const sourceCategory = {
      title: category.title || "",
      subtitle: category.subtitle || "",
      textZone: {
        asciiLines: Array.isArray(category.textZone?.asciiLines) ? category.textZone.asciiLines : [],
        metaLines: Array.isArray(category.textZone?.metaLines) ? category.textZone.metaLines : [],
      },
      actions: Array.isArray(category.actions) ? category.actions : [],
    };

    if (!category.translations || typeof category.translations !== "object") {
      category.translations = {};
    }

    for (const language of languages) {
      category.translations[language] = await translateCategory(sourceCategory, language, translator);
    }
  }

  return out;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(HELP);
    return;
  }

  const provider = detectProvider(args.provider);
  if (!provider || !["deepl", "libre", "mymemory"].includes(provider)) {
    throw new Error("Provider must be deepl, libre, or mymemory.");
  }

  const views = await readJson(VIEWS_PATH);
  if (!views || !Array.isArray(views.supportedLanguages)) {
    throw new Error("views-zones.json is invalid: supportedLanguages is missing.");
  }

  const targetLanguages = views.supportedLanguages.filter((lang) => lang !== SOURCE_LANGUAGE);
  if (targetLanguages.length === 0) {
    throw new Error("No target language found in supportedLanguages.");
  }

  const cache = await readJson(CACHE_PATH, {});
  const translator = createTranslator({ provider, cache });

  const scriptContent = await fs.readFile(SCRIPT_PATH, "utf8");
  const extracted = extractStaticI18n(scriptContent);

  console.log(`Provider: ${provider}`);
  console.log(`Languages: ${targetLanguages.join(", ")}`);
  console.log("Translating views-zones.json...");
  const nextViews = await translateViewsConfig(views, targetLanguages, translator);

  console.log("Translating staticI18n in script.js...");
  const nextStatic = await translateStaticI18n(extracted.objectValue, targetLanguages, translator);
  const nextLiteral = toJsLiteral(nextStatic, 0);

  const nextScript =
    `${scriptContent.slice(0, extracted.firstBrace)}${nextLiteral}` +
    scriptContent.slice(extracted.end);

  if (args.dryRun) {
    console.log("Dry run complete. No files written.");
    return;
  }

  await writeJson(VIEWS_PATH, nextViews);
  await fs.writeFile(SCRIPT_PATH, nextScript, "utf8");
  await writeJson(CACHE_PATH, cache);

  console.log("Done. Files updated:");
  console.log(`- ${path.relative(ROOT, VIEWS_PATH)}`);
  console.log(`- ${path.relative(ROOT, SCRIPT_PATH)}`);
  console.log(`- ${path.relative(ROOT, CACHE_PATH)}`);
}

main().catch((error) => {
  console.error("Translation script failed:");
  console.error(error.message || error);
  process.exitCode = 1;
});
