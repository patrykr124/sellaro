import fs from "fs/promises";
import path from "path";

export function normalize(s = "") {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function scoreProduct(p, tokens) {
  const hay = `${p.name} ${p.description}`;
  const nHay = normalize(hay);
  let score = 0;
  for (const t of tokens) {
    if (!t) continue;
    // +2 za trafienie w nazwie, +1 za trafienie w opisie
    if (normalize(p.name).includes(t)) score += 2;
    if (nHay.includes(t)) score += 1;
  }
  return score;
}

export function safeJsonParse(maybeJson, fallback = null) {
  if (!maybeJson || typeof maybeJson !== "string") return fallback;
  const m = maybeJson.match(/\{[\s\S]*\}$/);
  try {
    return JSON.parse(m ? m[0] : maybeJson);
  } catch {
    return fallback;
  }
}

export async function getRecommendedProducts(userQuery) {
  try {
    const productsPath = path.join(
      process.cwd(),
      "src",
      "data",
      "products.json"
    );
    const productsData = await fs.readFile(productsPath, "utf8");
    const products = JSON.parse(productsData);

    const tokens = normalize(userQuery)
      .split(/[\s,.;]+/)
      .filter((w) => w.length >= 2);

    const withScores = products.map((p) => ({
      p,
      s: scoreProduct(p, tokens),
    }));

    return withScores
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 4)
      .map((x) => x.p);
  } catch (error) {
    console.error("Error getting recommended products:", error);
    return [];
  }
}
