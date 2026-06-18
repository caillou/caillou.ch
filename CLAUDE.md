# caillou.ch

A personal blog of short, TIL-style posts.

The notes below describe **my writing style**. When I ask you to review a post,
check it against these. Apply them when you draft a post for me too.

## Voice and mechanics

- First person, past tense. Open with the concrete problem I hit, not a
  definition. "I found `download` in some code...", "I was building...", "A test
  kept failing on CI...".
- Short sentences. No em dashes. Break long clauses into periods. Em dashes read
  as AI-generated text, so keep them out of my prose. (A verbatim quote may keep
  them, because they are the source's words, not mine.)
- "What I learned" voice, not "here is what I teach you." Write from my own
  discovery, not as instruction aimed at the reader. Keep second-person "you /
  your" out of the prose, and be wary of "we / our" because it drifts into
  tutorial-speak. Prefer first-person singular ("I", "my"), or rephrase
  impersonally when a pronoun would feel forced.
- Body prose uses normal capitalization (capital I, sentences start with a
  capital). Inline code identifiers use backticks: `download`,
  `Content-Disposition`.
- American English, not British: `color` over `colour`, `-ize` over `-ise`,
  `P.S.` with periods over `PS`.

## Post shape (TIL)

- The reveal is "Turns out X exists." Link to the official source: MDN, the
  project's own docs, a GitHub release or bug.
- Show the naive/before code, then the after. Comments inside the code fence
  explain the flag or the interesting line.
- When a point rests on a primary source (a man page entry, a source comment, a
  config file, command output), I show it verbatim in a code fence rather than
  paraphrasing it in prose. I copy the exact text from the real source so the
  fence is faithful (e.g. `$ man open`, `cat .gitattributes`). The one thing I
  normalize is the shell prompt: write it as `$ `, not my own prompt character
  (`❯`), so the fence reads as a generic shell.
- Keep it around 60 lines. One idea per post. Link out for the surrounding
  concepts instead of explaining them.
- End on a practical note: a gotcha, a "back off if X", or the version something
  shipped in. A short first-person reflection is also fine.
- An optional deep dive or tangent goes under a `## down the rabbit hole`
  heading, after a brief "that's the practical bit" transition. Narrate it as a
  first-person research trail (what I noticed, what I dug up). Short posts are
  otherwise headingless, so this heading is the one deliberate structural break.

## Frontmatter

```
title: "lowercase, names the tool and what it does"
date: YYYY-MM-DD
description: "the problem. the punchline. two short sentences."
tags: ["til", "<domain>", "<specific>"]
```

- `title` and `description` start with a lowercase letter, unless the first word
  is a proper noun (iTerm, TanStack, PowerShell keep their caps). Descriptions
  lowercase their sentence starts too.
- No backticks or other markdown in `title` or `description`. They are rendered
  as plain text (no markdown parsing) and also feed `<title>`, OpenGraph, and
  the RSS feed, all of which must be plain text. Backticks would show up
  literally. Inline-code backticks are for the body only.
- `tags` drill down from general to specific, usually three:
  `["til", "react", "tanstack-query"]`, `["til", "html", "anchor"]`. The
  sequence is a narrowing, so the third tag sits inside the second.

## Conventions

- Link a person to their Mastodon (e.g. John Siracusa, Brady Eidson).
- Posts live in `src/content/blog/YYYY-MM-DD-slug.mdx`.
- Verify version numbers, release dates, and API claims against real sources
  before stating them. Do not guess.

## Before finishing

- `pnpm run format` (prettier), then `pnpm run build` (runs `astro check`).
  Resolve anything they flag before calling it done.

## Git

- I am the sole author. Do not add a `Co-Authored-By` trailer to commits.
- Commit messages are lowercase and imperative: "add anchor download attribute
  post", "format blog posts with prettier".
