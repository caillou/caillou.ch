import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";

// The browser loads IBM Plex Mono via @fontsource woff2, but satori needs ttf,
// hence the committed copies in src/og/fonts/. satori outlines text to <path>,
// so sharp rasterizes the SVG without needing the font installed system-wide.
// Read from the source tree at the project root: Vite bundles this module into
// dist/.prerender/chunks and rewrites `new URL(..., import.meta.url)` to a
// path next to the chunk where the fonts were never copied, so anchor on
// process.cwd() (the project root during `astro build`) instead.
const fontDir = join(process.cwd(), "src/og/fonts");
const regular = readFileSync(join(fontDir, "IBMPlexMono-Regular.ttf"));
const semibold = readFileSync(join(fontDir, "IBMPlexMono-SemiBold.ttf"));
const italic = readFileSync(join(fontDir, "IBMPlexMono-Italic.ttf"));

// brand colors mirror --color-* in src/styles/global.css; the dark terminal-chrome values (termBg/titleBarBg/winTitle) are card-only.
const COLORS = {
  accent: "#ffd866", // the `> ` prompt, the block cursor, the yellow traffic light
  title: "#ffffff",
  description: "#ababab",
  dim: "#757575", // ` — fish`, ` on `, tags, date
  red: "#fc618d", // red traffic light + the footer `#`
  green: "#bef289", // context `~/caillou.ch` dir + green traffic light
  purple: "#a79cff", // the `main` branch
  black: "#000000", // outer frame + titlebar bottom border
  termBg: "#0a0a0a", // terminal background
  termBorder: "#2c2c2c", // terminal frame border
  titleBarBg: "#1c1c1c",
  winTitle: "#e8e8e8", // `caillou.ch` in the titlebar
} as const;

// Title size buckets shrink long titles so they stay on 1-2 lines.
const TITLE_FONT_SIZES = { xl: 68, lg: 60, md: 52, sm: 46 } as const;

// Fixed font sizes for the rest of the chrome.
const FONT_SIZES = {
  titleBar: 22,
  context: 25,
  description: 27,
  tags: 23,
  date: 22,
} as const;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Capitalized full month + day + year, formatted at UTC to avoid the
// off-by-one that local-time parsing of a UTC-midnight date would cause.
function formatDate(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

// The title is the hero: bucket the size down so long titles stay on 1-2 lines.
function titleFontSize(length: number): number {
  if (length <= 20) return TITLE_FONT_SIZES.xl;
  if (length <= 32) return TITLE_FONT_SIZES.lg;
  if (length <= 44) return TITLE_FONT_SIZES.md;
  return TITLE_FONT_SIZES.sm;
}

// Minimal satori vdom node. satori's first param is typed `ReactNode`, which
// resolves to `any` here (react isn't a dependency), so a plain object tree is
// accepted directly. Building it by hand means children are literal strings,
// never parsed as HTML, so a title containing `<a>` is rendered verbatim.
type Style = Record<string, string | number>;
type Node = { type: string; props: { style: Style; children?: Children } };
type Children = string | Node | Array<string | Node>;

function h(type: string, style: Style, children?: Children): Node {
  return { type, props: { style, children } };
}

export interface CardPost {
  title: string;
  description: string;
  date: Date;
  tags: string[];
}

function buildTree(post: CardPost): Node {
  const fontSize = titleFontSize(post.title.length);
  const promptWidth = 1.2 * fontSize; // 2 monospace cells (1ch = 0.6em)

  let description = post.description;
  if (description.length > 180) description = `${description.slice(0, 179)}…`;

  const tags = post.tags.join(" · ");
  const date = formatDate(post.date);

  // Title as word-level flex items so flex-wrap breaks by word and the yellow
  // block cursor glues to the last word (a plain trailing span would drop to
  // its own line once the text fills the row). Each non-final word carries a
  // trailing space (white-space:pre) for the monospace gap.
  const words = post.title.split(" ");
  const titleChildren: Array<string | Node> = words.map((word, i) => {
    if (i < words.length - 1) {
      return h("span", { whiteSpace: "pre" }, `${word} `);
    }
    return h(
      "span",
      { display: "flex", flexDirection: "row", alignItems: "baseline" },
      [word, h("span", { color: COLORS.accent }, "▍")],
    );
  });

  return h(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      background: COLORS.black,
      fontFamily: "IBM Plex Mono",
    },
    h(
      "div",
      {
        width: 1200,
        height: 630,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: COLORS.termBg,
        border: `1px solid ${COLORS.termBorder}`,
        borderRadius: 16,
        overflow: "hidden",
      },
      [
        // title bar: traffic lights + centered window title
        h(
          "div",
          {
            height: 60,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            background: COLORS.titleBarBg,
            borderBottom: `1px solid ${COLORS.black}`,
            position: "relative",
          },
          [
            h(
              "div",
              { display: "flex", flexDirection: "row", alignItems: "center" },
              [
                h(
                  "div",
                  {
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    background: COLORS.red,
                    marginRight: 13,
                  },
                  "",
                ),
                h(
                  "div",
                  {
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    background: COLORS.accent,
                    marginRight: 13,
                  },
                  "",
                ),
                h(
                  "div",
                  {
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    background: COLORS.green,
                  },
                  "",
                ),
              ],
            ),
            h(
              "div",
              {
                position: "absolute",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                color: COLORS.dim,
                fontSize: FONT_SIZES.titleBar,
                fontWeight: 400,
                letterSpacing: "0.02em",
              },
              [
                h(
                  "span",
                  { color: COLORS.winTitle, fontWeight: 600 },
                  "caillou.ch",
                ),
                h("span", { whiteSpace: "pre" }, " — fish"),
              ],
            ),
          ],
        ),
        // body: context line, command line (prompt + title), description
        h(
          "div",
          {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "42px 56px 96px",
          },
          [
            h(
              "div",
              {
                display: "flex",
                flexDirection: "row",
                fontSize: FONT_SIZES.context,
                fontWeight: 400,
                letterSpacing: "0.01em",
                marginBottom: 22,
              },
              [
                h("span", { color: COLORS.green }, "~/caillou.ch"),
                h("span", { color: COLORS.dim, whiteSpace: "pre" }, " on "),
                h("span", { color: COLORS.purple }, "main"),
              ],
            ),
            h(
              "div",
              {
                display: "flex",
                flexDirection: "row",
                fontSize,
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: 22,
              },
              [
                // prompt hangs in a fixed 2ch gutter; wrapped title lines then
                // align under the first title character.
                h(
                  "span",
                  {
                    color: COLORS.accent,
                    whiteSpace: "pre",
                    flexShrink: 0,
                    width: promptWidth,
                  },
                  "> ",
                ),
                h(
                  "div",
                  {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "baseline",
                    flex: 1,
                    color: COLORS.title,
                  },
                  titleChildren,
                ),
              ],
            ),
            h(
              "div",
              {
                display: "flex",
                color: COLORS.description,
                fontSize: FONT_SIZES.description,
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.5,
                maxWidth: 1020,
                overflow: "hidden",
              },
              description,
            ),
          ],
        ),
        // footer: tags (left) + full date (right), pinned to the edge
        h(
          "div",
          {
            position: "absolute",
            left: 56,
            right: 56,
            bottom: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-between",
          },
          [
            h(
              "div",
              {
                display: "flex",
                flexDirection: "row",
                minWidth: 0,
                overflow: "hidden",
                color: COLORS.dim,
                fontSize: FONT_SIZES.tags,
                fontWeight: 400,
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              },
              [
                h("span", { color: COLORS.red, whiteSpace: "pre" }, "# "),
                h(
                  "span",
                  {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                  tags,
                ),
              ],
            ),
            h(
              "div",
              {
                flexShrink: 0,
                color: COLORS.dim,
                fontSize: FONT_SIZES.date,
                fontWeight: 400,
                marginLeft: 28,
              },
              date,
            ),
          ],
        ),
      ],
    ),
  );
}

export async function renderCard(post: CardPost): Promise<Buffer> {
  const svg = await satori(buildTree(post), {
    width: 1200,
    height: 630,
    fonts: [
      { name: "IBM Plex Mono", data: regular, weight: 400, style: "normal" },
      { name: "IBM Plex Mono", data: semibold, weight: 600, style: "normal" },
      { name: "IBM Plex Mono", data: italic, weight: 400, style: "italic" },
    ],
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
