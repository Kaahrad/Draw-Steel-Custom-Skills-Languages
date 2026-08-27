# Draw-Steel-Custom-Skills-Languages
Module for my custom skills and languages for homebrew in Draw Steel system for FoundryVTT

Done with Claude.AI


# Custom Skills & Languages (Draw Steel)

A Foundry VTT module for the **Draw Steel** game system. It loads the full
official list of skills and languages, in the same shape the system itself
uses, in one file that's meant to be edited. As shipped it changes nothing
— you customize it by editing `scripts/custom-skills-languages.mjs` and
publishing your own version.

This guide covers two things: hosting/publishing the module on GitHub so it
installs and updates like any other Foundry module, and how to actually
change the skills and languages.

## Hosting it on GitHub

The goal is two permanent URLs:

- **`manifest`** — always points at the *latest* release's `module.json`.
- **`download`** — inside that `module.json`, points at *that specific
  release's* zip file.

GitHub makes the "always latest" part easy: a URL like
`.../releases/latest/download/<filename>` automatically redirects to the
matching asset on whichever release is currently marked "Latest." This is
the same pattern the Draw Steel system itself uses for its own releases.

### One-time setup

1. **Create a public GitHub repository**, e.g.
   `draw-steel-custom-skills-languages`.
2. **Push this folder's contents to the repo root** — `module.json`,
   `scripts/`, `.github/`, and `README.md` should sit directly in the repo,
   not nested inside another folder.
3. **Edit `module.json`** and replace `YOUR-GITHUB-USERNAME` in the `url`,
   `manifest`, `bugs`, and `readme` fields with your actual GitHub
   username/repo name. Leave `download` alone for now.
4. Commit and push:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-GITHUB-USERNAME/draw-steel-custom-skills-languages.git
   git push -u origin main
   ```

### Publishing a release (automated — recommended)

This module includes `.github/workflows/release.yml`. Once your repo is
pushed, publishing a new version is just:

```
git add module.json     # after bumping "version" in module.json
git commit -m "Bump version to 1.0.1"
git tag v1.0.1
git push origin main --tags
```

Pushing the tag triggers the workflow, which rewrites `download` in
`module.json` to point at that tag's zip, zips the module, and publishes
both as a GitHub Release automatically — no manual zipping or uploading.

### Publishing a release (manual alternative)

If you'd rather not use GitHub Actions:

1. Bump `"version"` in `module.json` (e.g. `"1.0.1"`).
2. Update `"download"` in `module.json` to point at the zip you're about to
   upload for *this* version:
   ```
   "download": "https://github.com/Kaahrad/draw-steel-custom-skills-languages/releases/download/v1.0.1/module.zip"
   ```
3. Zip the module's contents — `module.json`, `scripts/`, `README.md` —
   with those files at the **root of the zip** (no wrapping folder):
   ```
   zip -r module.zip module.json scripts README.md
   ```
4. Commit and tag:
   ```
   git add module.json
   git commit -m "Bump version to 1.0.1"
   git tag v1.0.1
   git push origin main --tags
   ```
5. On GitHub, go to **Releases → Draft a new release**, pick the `v1.0.1`
   tag, and upload two files as release assets: `module.json` (the updated
   one) and `module.zip`. Publish the release.

### Installing it in Foundry

Once at least one release is published, install it like any other module:
in Foundry's setup screen, go to **Add-on Modules → Install Module**, and
paste:
```
https://github.com/YOUR-GITHUB-USERNAME/draw-steel-custom-skills-languages/releases/latest/download/module.json
```
Foundry will also detect and offer updates automatically whenever you
publish a new release.

## How to change the skills and languages

Everything lives in `scripts/custom-skills-languages.mjs`. On Foundry's
`init` hook, it builds three plain JavaScript objects — `skillGroups`,
`skillList`, and `languages` — pre-filled with every official Draw Steel
skill/language, then assigns them onto the system's live configuration:

```js
ds.CONFIG.skills.groups = skillGroups;
ds.CONFIG.skills.list = skillList;
ds.CONFIG.languages = languages;
```

`ds.CONFIG` (also available as `CONFIG.DRAW_STEEL`) is the Draw Steel
system's global settings object. Everywhere in the system that shows a
skill or language dropdown — character sheets, career/culture/ancestry
advancements, etc. — reads from this object, so changing it here changes
it everywhere. This works reliably because Foundry always finishes loading
a game **system's** scripts before it loads any **module's** scripts, so by
the time this module's `init` hook fires, `ds.CONFIG` already exists and is
safe to overwrite.

Near the bottom of the file there's a clearly marked section:

```js
/* >>> YOUR CUSTOMIZATIONS GO HERE <<< */
```

Everything under it is commented-out sample code. Uncomment whichever
lines you need and edit them, or just edit the main `skillGroups`,
`skillList`, and `languages` objects near the top of the file directly —
deleting a line has the same effect as a `delete` statement below.

**Remove a skill:**
```js
delete skillList.flirt;
```

**Rename a skill (the label is just display text, the key doesn't change):**
```js
skillList.intimidate.label = "Threaten";
```

**Move a skill to a different group:**
```js
skillList.handleAnimals.group = "exploration";
```

**Add a new skill to an existing group:**
```js
skillList.appraise = { label: "Appraise", group: "intrigue" };
```

**Add a whole new skill group:**
```js
skillGroups.technology = { label: "Technology" };
skillList.hacking = { label: "Hacking", group: "technology" };
```

**Remove an entire group and every skill in it:**
```js
delete skillGroups.crafting;
for (const [key, skill] of Object.entries(skillList)) {
  if (skill.group === "crafting") delete skillList[key];
}
```

**Remove a language:**
```js
delete languages.mindspeech;
```

**Add a homebrew language:**
```js
languages.dwarvish = { label: "Dwarvish" };
```

**Rename a language:**
```js
languages.axiomatic.label = "Celestial";
```

### Rules for keys

- Keys (the left-hand side, e.g. `alchemy`, `technology`, `dwarvish`) must
  be unique, contain no spaces, and are conventionally written in
  `camelCase`.
- Every entry in `skillList` needs a `group` value that matches a key in
  `skillGroups`. If you delete a group, either delete or reassign every
  skill that pointed to it, or the sheet will show a blank category.
- `label` is just the text shown to players — change it freely.

### Optional: proper localization

The labels above are plain text, which is simplest for a single-language
table. If you want your homebrew skills/languages to support Foundry's
localization system (multiple languages for your UI), use an i18n key as
the label instead and add the translation to a `lang/en.json` file in this
module, e.g.:

```js
skillList.hacking = { label: "MYMODULE.Skills.Hacking", group: "technology" };
```

```json
// lang/en.json
{ "MYMODULE": { "Skills": { "Hacking": "Hacking" } } }
```

Then register the language file in `module.json`:
```json
"languages": [{ "lang": "en", "name": "English", "path": "lang/en.json" }]
```
Plain text labels (no `lang/en.json` needed) work perfectly fine too —
Foundry just displays them as-is.

## Important caveats

- **This only affects the dropdown/selection lists**, not characters who
  already have a skill or language recorded. If you remove a skill that a
  hero already has, that hero keeps it; it just won't be offered as a
  choice for anyone else going forward. This matches how the official
  system itself treats homebrew additions.
- **Load order with other modules:** if another active module also
  rewrites `ds.CONFIG.skills` or `ds.CONFIG.languages`, whichever one runs
  last on the `init` hook wins. If you run into a conflict, check the other
  module's load order relative to this one in **Manage Modules**.
- **Keep this in sync with the system version you use.** The lists in this
  module reflect the official Draw Steel skills/languages as of system
  version ~0.10–0.11. If a future system update adds official content you
  want, add it to the lists here the same way you'd add any homebrew entry.
