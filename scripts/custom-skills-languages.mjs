/**
 * Custom Skills & Languages for the Draw Steel Foundry VTT system.
 *
 * WHAT THIS FILE DOES
 * --------------------
 * On startup, it replaces the system's internal skill and language lists
 * (`ds.CONFIG.skills.groups`, `ds.CONFIG.skills.list`, and `ds.CONFIG.languages`)
 * with the copies defined below. As shipped, those copies are identical to the
 * official Draw Steel lists, so installing this module changes nothing by itself.
 *
 * To customize your table's skills and languages, edit the objects below,
 * or use the EXAMPLES section near the bottom as a template. See README.md
 * in this module's folder for a full walkthrough.
 *
 * WHY "init"?
 * -----------
 * The Draw Steel system builds `ds.CONFIG` during its own "init" hook, and
 * Foundry always finishes loading a game system's scripts before it loads
 * any module's scripts. That means by the time this module's "init" hook
 * runs, `ds.CONFIG` already exists and is safe to overwrite.
 */

Hooks.once("init", () => {
  // Only do anything if the active game is actually running Draw Steel.
  if (game.system.id !== "draw-steel") return;

  if (!globalThis.ds?.CONFIG) {
    console.error(
      "Custom Skills & Languages | ds.CONFIG was not found. Is the Draw Steel system active and up to date?",
    );
    return;
  }

  /* ============================================================ */
  /*  1. SKILL GROUPS                                              */
  /*  The categories skills are sorted into on the character sheet. */
  /* ============================================================ */
  const skillGroups = {
    crafting: { label: "Crafting" },
    exploration: { label: "Exploration" },
    interpersonal: { label: "Interpersonal" },
    intrigue: { label: "Intrigue" },
    lore: { label: "Lore" },
  };

  /* ============================================================ */
  /*  2. SKILL LIST                                                */
  /*  Every skill, and which group (above) it belongs to.          */
  /*  The "group" value must match a key in skillGroups.           */
  /* ============================================================ */
  const skillList = {
    // -- Crafting --
    alchemy: { label: "Alchemy", group: "crafting" },
    architecture: { label: "Architecture", group: "crafting" },
    blacksmithing: { label: "Blacksmithing", group: "crafting" },
    carpentry: { label: "Carpentry", group: "crafting" },
    cooking: { label: "Cooking", group: "crafting" },
    fletching: { label: "Fletching", group: "crafting" },
    forgery: { label: "Forgery", group: "crafting" },
    jewelry: { label: "Jewelry", group: "crafting" },
    mechanics: { label: "Mechanics", group: "crafting" },
    tailoring: { label: "Tailoring", group: "crafting" },

    // -- Exploration --
    climb: { label: "Climb", group: "exploration" },
    drive: { label: "Drive", group: "exploration" },
    endurance: { label: "Endurance", group: "exploration" },
    gymnastics: { label: "Gymnastics", group: "exploration" },
    heal: { label: "Heal", group: "exploration" },
    jump: { label: "Jump", group: "exploration" },
    lift: { label: "Lift", group: "exploration" },
    navigate: { label: "Navigate", group: "exploration" },
    ride: { label: "Ride", group: "exploration" },
    swim: { label: "Swim", group: "exploration" },

    // -- Interpersonal --
    brag: { label: "Brag", group: "interpersonal" },
    empathize: { label: "Empathize", group: "interpersonal" },
    flirt: { label: "Flirt", group: "interpersonal" },
    gamble: { label: "Gamble", group: "interpersonal" },
    handleAnimals: { label: "Handle Animals", group: "interpersonal" },
    interrogate: { label: "Interrogate", group: "interpersonal" },
    intimidate: { label: "Intimidate", group: "interpersonal" },
    lead: { label: "Lead", group: "interpersonal" },
    lie: { label: "Lie", group: "interpersonal" },
    music: { label: "Music", group: "interpersonal" },
    perform: { label: "Perform", group: "interpersonal" },
    persuade: { label: "Persuade", group: "interpersonal" },
    readPerson: { label: "Read Person", group: "interpersonal" },

    // -- Intrigue --
    alertness: { label: "Alertness", group: "intrigue" },
    concealObject: { label: "Conceal Object", group: "intrigue" },
    disguise: { label: "Disguise", group: "intrigue" },
    eavesdrop: { label: "Eavesdrop", group: "intrigue" },
    escapeArtist: { label: "Escape Artist", group: "intrigue" },
    hide: { label: "Hide", group: "intrigue" },
    pickLock: { label: "Pick Lock", group: "intrigue" },
    pickPocket: { label: "Pick Pocket", group: "intrigue" },
    sabotage: { label: "Sabotage", group: "intrigue" },
    search: { label: "Search", group: "intrigue" },
    sneak: { label: "Sneak", group: "intrigue" },
    track: { label: "Track", group: "intrigue" },

    // -- Lore --
    culture: { label: "Culture", group: "lore" },
    criminalUnderworld: { label: "Criminal Underworld", group: "lore" },
    history: { label: "History", group: "lore" },
    magic: { label: "Magic", group: "lore" },
    monsters: { label: "Monsters", group: "lore" },
    nature: { label: "Nature", group: "lore" },
    psionics: { label: "Psionics", group: "lore" },
    religion: { label: "Religion", group: "lore" },
    rumors: { label: "Rumors", group: "lore" },
    society: { label: "Society", group: "lore" },
    strategy: { label: "Strategy", group: "lore" },
    timescape: { label: "Timescape", group: "lore" },
  };

  /* ============================================================ */
  /*  3. LANGUAGES                                                 */
  /* ============================================================ */
  const languages = {
    // -- Ancestry languages --
    anjali: { label: "Anjali" },
    axiomatic: { label: "Axiomatic" },
    caelian: { label: "Caelian" },
    filliaric: { label: "Filliaric" },
    highKuric: { label: "High Kuric" },
    hyrallic: { label: "Hyrallic" },
    illyvric: { label: "Illyvric" },
    kalliak: { label: "Kalliak" },
    kethaic: { label: "Kethaic" },
    khelt: { label: "Khelt" },
    khoursirian: { label: "Khoursirian" },
    lowKuric: { label: "Low Kuric" },
    mindspeech: { label: "Mindspeech" },
    protoCtholl: { label: "Proto-Ctholl" },
    szetch: { label: "Szetch" },
    theFirstLanguage: { label: "The First Language" },
    tholl: { label: "Tholl" },
    urollialic: { label: "Urollialic" },
    variac: { label: "Variac" },
    vastariax: { label: "Vastariax" },
    vhoric: { label: "Vhoric" },
    voll: { label: "Voll" },
    yllyric: { label: "Yllyric" },
    zahariax: { label: "Zahariax" },
    zaliac: { label: "Zaliac" },

    // -- Human languages (Khoursirian is already listed above) --
    higaran: { label: "Higaran" },
    khemharic: { label: "Khemharic" },
    oaxuatl: { label: "Oaxuatl" },
    phaedran: { label: "Phaedran" },
    riojan: { label: "Riojan" },
    uvalic: { label: "Uvalic" },
    vaniric: { label: "Vaniric" },
    vasloria: { label: "Vasloria" },

    // -- Dead languages --
    highRhyvian: { label: "High Rhyvian" },
    khamish: { label: "Khamish" },
    kheltivari: { label: "Kheltivari" },
    lowRhivian: { label: "Low Rhivian" },
    oldVariac: { label: "Old Variac" },
    phorialtic: { label: "Phorialtic" },
    rallarian: { label: "Rallarian" },
    ullorvic: { label: "Ullorvic" },
  };

  /* ================================================================== */
  /*  >>> YOUR CUSTOMIZATIONS GO HERE <<<                                */
  /*  Everything below is commented out. Uncomment and edit whatever    */
  /*  you want to change. Full explanations are in this module's        */
  /*  README.md.                                                        */
  /* ================================================================== */

  // --- Remove a skill entirely ---
  // delete skillList.flirt;

  // --- Rename a skill's display label (key stays the same) ---
  // skillList.intimidate.label = "Threaten";

  // --- Move a skill into a different existing group ---
  // skillList.handleAnimals.group = "exploration";

  // --- Add a brand new skill to an existing group ---
  // skillList.appraise = { label: "Appraise", group: "intrigue" };

  // --- Add a whole new skill group, then add a skill into it ---
  // skillGroups.technology = { label: "Technology" };
  // skillList.hacking = { label: "Hacking", group: "technology" };

  // --- Remove an entire skill group AND every skill in it ---
  // delete skillGroups.crafting;
  // for (const [key, skill] of Object.entries(skillList)) {
  //   if (skill.group === "crafting") delete skillList[key];
  // }

  // --- Remove a language ---
  // delete languages.mindspeech;

  // --- Add a homebrew language ---
  // languages.dwarvish = { label: "Dwarvish" };

  // --- Rename a language ---
  // languages.axiomatic.label = "Celestial";

  /* ================================================================== */
  /*  Apply everything above to the live system configuration.          */
  /*  Leave this part alone unless you know what you're doing.          */
  /* ================================================================== */

  ds.CONFIG.skills.groups = skillGroups;
  ds.CONFIG.skills.list = skillList;
  ds.CONFIG.languages = languages;

  console.log("Custom Skills & Languages | Skills and languages configured.");
});
