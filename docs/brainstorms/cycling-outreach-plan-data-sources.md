# External Grounding Digest — Buildable Data Sources for Pro Cycling Web Tools

**Research value:** Confirms a viable, mostly-free static-build data stack for both tools, and isolates the one hard blocker (redistributable stage-route geometry for 2005–2019) plus one timing trap (2026 weather forecasts only exist ~16 days out) that must shape plan sequencing. Findings are current as of July 2026; `procyclingstats` 0.2.8 shipped March 2026 (actively maintained).

---

## Q1 — PCS / FirstCycling scrapers, maintenance, ToS; commercial path

**`procyclingstats` (PyPI, `themm1/procyclingstats`)** — actively maintained: v0.2.8, released **1 Mar 2026**, 331 commits, 1 open issue. Pure-Python HTML scraper of procyclingstats.com. Scraping classes and what they expose:
- **`Stage`** — the workhorse: main results table, **GC / points / KOM / youth / team classifications**, distance (km), **elevation gain**, **profile score p0–p5**, date, start/finish towns, stage type (ITT/TTT/RR), temperature, start time, and the **listed climbs** with rider placements/points.
- **`RaceStartlist`** — startlist: rider_name, rider_number, nationality, team_name, rider_url, team_url.
- **`Race` / `RaceClimbs`** — race-level climb catalog.
- **`Rider` / `RiderResults`** — rider bio + results (incl. a "final N km" table useful for climb splits).
- `Team`, `Ranking`, `RaceCombativeRiders`.
- Coverage/depth is not documented but PCS itself holds results deep past 2005; the limiter is scrape volume, not history.

**Reliability & ToS caveats:** maintainer explicitly warns HTML parsing "is difficult to make reliable" — expect intermittent breakage when PCS changes markup. procyclingstats.com publishes **no public API and no scraping-permission ToS**; scraping is tolerated but not licensed. Treat as: cache aggressively, throttle (~1 req/s, backoff), pin the scraper version, and **do all scraping at build time** — never at request time in the deployed site.

**Alternatives:** `baronet2/FirstCyclingAPI` (unofficial firstcycling.com wrapper, returns pandas DataFrames — races, riders, rankings) and `r-huijts/firstcycling-mcp` (MCP server over the same). Good cross-check / fallback source. Older one-off scrapers exist (`josselingirault`, `smckinley`) but are stale.
**Commercial "production path" (mention only):** Sportradar and Stats Perform/Gracenote license official cycling feeds — reliable, structured, but paid/contracted and overkill for a portfolio build.

## Q2 — Ready-made open datasets

- **`thomascamminady/LeTourDataSet` (GitHub) — best backbone, MIT-licensed.** Six CSVs: `TDF_Riders_History`, `TDF_Stages_History`, `TDF_All_Rankings_History` (men, **1903–2024**) + women equivalents (**2022–2025**). Auto-updated annually from letour.fr; stage-by-stage rankings incl. GC and stage winners. MIT = clean redistribution. Caveat: derived from letour.fr, some entries flagged as possibly incorrect → validate against PCS.
- **Kaggle** — several, mostly to ~2023, **licenses vary/unclear** (verify each before shipping): `mexwell/le-tour-de-france-data-set`, `ralle360/historic-tour-de-france-dataset`, `pablomonleon/tour-de-france-historic-stages-data`, `jessemostipak/tour-de-france-winners`. Useful for enrichment, weaker for licensing.

## Q3 — Stage route geometry (GPX/GeoJSON/elevation) — the risky one

- **2026 stages:** `cyclingstage.com/tour-de-france-2026-gpx` — **all 21 stages, free GPX**, standard format. No stated license/redistribution terms (treat as personal-use; do not re-host raw files — regenerate/simplify geometry). Intervals.icu and Escape/Domestique have per-stage profiles for cross-check.
- **Historical 2005–2025 — no clean redistributable source:**
  - `cyclingstage.com/tour-de-france-archive` covers **2014–2024 but GPX only for 2020+**; 2014–2019 = results/profiles only, **no GPX**.
  - `la-flamme-rouge.eu` — community route editor, ~**2001–2024**, per-track Garmin GPX export. Community-traced, **no explicit license** → provenance/quality varies.
  - **Implication:** full line geometry for **2005–2019 is not cleanly available**. Options: (a) accept **profile-only** for older years (distance + elevation gain + PCS climb list — no map polyline); (b) reconstruct routes from town-to-town + cols via OSM/Overpass routing (labor-heavy, approximate); (c) OSM/`OpenStreetMap` + `Overpass` for named cols only.
- **Elevation (when you have a polyline but no ele tags):** sample against a DEM — `Open-Elevation` (free, self-hostable), **Open-Meteo Elevation API** (free, CC BY), or Mapbox Terrain-RGB (needs token, has commercial terms). SRTM/Copernicus DEM if self-hosting.

## Q4 — Climb catalogs + climb-time archives for W/kg

- **Structured climb metadata:** best source is **PCS `RaceClimbs`/`Stage` climb list** (name, length, avg gradient, altitude, category) — already in the scraper, so no extra dependency. Consumer apps **climbfinder.com, PJAMM (pjammcycling.com), myCols** are rich but **view-only — no public API / bulk download**; scraping them is fragile and against spirit. Wikipedia col articles are a decent free-text fallback for marquee climbs (Galibier, Tourmalet, Ventoux, Alpe d'Huez).
- **Climb-time archives (for VAM→W/kg):** the softest, least-reusable data. `ammattipyoraily` (Finnish), `climbing-records.com`, velofacts spreadsheets, and Lanterne Rouge W/kg write-ups are **view-only tables / spreadsheets / video-embedded numbers — no license, no API**. Realistic path: **manually transcribe a curated set** of famous-climb times for the marquee climbs you feature, cite the source, and mark as estimates — do not attempt a bulk automated pull.

## Q5 — Weather

- **Open-Meteo Historical Weather API** — **ERA5 reanalysis from 1940** (ERA5-Land from 1950, 9 km), **hourly**: temperature, relative humidity, dew point, apparent temp, wind speed/direction/gusts (10 m/100 m), precipitation/rain/snow, pressure, cloud, radiation. **Fully covers 2005–2025.** **CC BY 4.0 — free incl. commercial, with attribution.** Free tier: no key, **10k calls/day**, requests >10 variables or >2 weeks count as multiple calls. Ideal for historical stage-day weather at build time.
- **Open-Meteo Forecast API (for 2026, tool B)** — **max horizon ~16 days** (`forecast_days=16`). **This is a hard timing constraint:** a static build produced weeks/months before a 2026 stage **cannot contain a real forecast**. Handle via: (i) rebuild/refresh within ~7–16 days of each stage, (ii) fetch forecast **client-side at view time**, or (iii) show **ERA5 climatology / historical-analogue weather** as a placeholder until inside the window.
- **Alternatives:** `Meteostat` (station-based, Python lib, historical) for point-station cross-check; NOAA/NCEI for US-adjacent needs. Open-Meteo is the primary; keep Meteostat as fallback.

## Q6 — Physics: estimated climbing power

- **Rule-of-thumb (fast, transparent, good for a UI):** relative power `W/kg ≈ VAM (m/h) / (200 + 10 × gradient%)`, equivalently `W/kg = VAM / ((2 + grade%/10) × 100)` (Ferrari/CycleCoach). VAM = metres climbed ÷ hours. Cheap to compute from climb length + gradient + time.
- **Full power-balance model (citable, defensible):** **Martin et al. (1998), "Validation of a Mathematical Model for Road Cycling Power," *J. Applied Biomechanics* 14(3)** — `P = P_gravity + P_rolling + P_aero + P_kinetic + P_bearing`, i.e. `P ≈ g·m·(sinθ + Crr·cosθ)·v + ½·ρ·CdA·v³` (+ small KE/bearing/drivetrain terms). Standard analyst assumptions: total mass = rider + **~8 kg** bike/kit; **Crr ≈ 0.004–0.005**; **CdA ≈ 0.3–0.4** (climbing posture, minor on steep grades); air density ρ by altitude; **drivetrain loss ~2–3%**.
- **Error bands (state them in the UI):** unknown CdA, wind, exact mass, drafting and imprecise timing mean estimates carry **≈ ±0.2–0.3 W/kg / ±5–10%** — the convention used by Lanterne Rouge / GCN. VAM method additionally biases high on steeper gradients and is distorted by hairpins/false-flats. Always label outputs "estimated."

---

## Planning implications (recommended stack + risks)

1. **Backbone (tool A):** `LeTourDataSet` (MIT) for stage winners + GC + rankings 2005–2024; **enrich/validate** with `procyclingstats` `Stage` for classifications, climb lists, distance/elevation/profile-score.
2. **Startlists + climbs (both tools):** `procyclingstats` `RaceStartlist` + `RaceClimbs`; keep `FirstCyclingAPI` as a fallback/cross-check.
3. **Weather:** Open-Meteo Historical (ERA5, CC BY, attribution) at build time for A — zero cost, full 2005+ coverage.
4. **Route geometry:** cyclingstage GPX for **2026** (regenerate, don't re-host); accept **profile-only** for **2005–2019** where GPX is missing.
5. **Physics:** ship the VAM rule-of-thumb for interactivity, cite Martin et al. 1998 as the rigorous basis, and **always render an error band**.
6. **Do ALL scraping/fetching at build time** into a static JSON/Parquet dataset — never call PCS or forecast APIs from the deployed runtime.
7. **Riskiest dependency:** redistributable **historical stage-route geometry (2005–2019)** — there is no clean-licensed source. Decide scope here first; it gates the whole "Atlas map" feature.
8. **Second risk:** PCS is an **unlicensed HTML scraper** prone to breakage — pin version, cache raw HTML, add schema-validation on parse, and design so a scrape failure degrades gracefully.
9. **Timing trap (tool B):** **16-day forecast horizon** — a precomputed 2026 build needs a refresh-near-race or client-side-fetch strategy; validate this before committing to "live forecast" copy.
10. **Validate first during implementation:** (a) can PCS `Stage` be scraped for a 2005 stage without breakage; (b) does `LeTourDataSet` join cleanly to PCS on stage/rider keys; (c) one end-to-end climb → VAM → W/kg calc against a known published estimate (e.g. an Alpe d'Huez record) to confirm the model is within the expected band.
11. **Licensing to honor at ship:** Open-Meteo attribution (CC BY 4.0); MIT notice for LeTourDataSet; do **not** re-host third-party GPX or scraped consumer-app climb pages verbatim.

---

## Sources

- [procyclingstats · PyPI](https://pypi.org/project/procyclingstats/) — package page, current version.
- [procyclingstats API docs (Read the Docs)](https://procyclingstats.readthedocs.io/en/stable/api.html) — scraping classes + fields (Stage, RaceStartlist, RaceClimbs…).
- [themm1/procyclingstats (GitHub)](https://github.com/themm1/procyclingstats) — maintenance status (v0.2.8, Mar 2026), reliability caveats.
- [baronet2/FirstCyclingAPI (GitHub)](https://github.com/baronet2/FirstCyclingAPI) — unofficial FirstCycling Python wrapper (fallback source).
- [r-huijts/firstcycling-mcp (GitHub)](https://github.com/r-huijts/firstcycling-mcp) — FirstCycling MCP server.
- [thomascamminady/LeTourDataSet (GitHub)](https://github.com/thomascamminady/LeTourDataSet) — MIT CSVs, men 1903–2024 / women 2022–2025, stage + rankings history.
- [Kaggle: Le Tour de France Data Set](https://www.kaggle.com/datasets/mexwell/le-tour-de-france-data-set) / [Historic TdF](https://www.kaggle.com/datasets/ralle360/historic-tour-de-france-dataset) — enrichment sets, verify licenses.
- [cyclingstage.com — 2026 GPX](https://www.cyclingstage.com/tour-de-france-2026-gpx/) — free GPX, all 21 stages, no stated license.
- [cyclingstage.com — TdF archive](https://www.cyclingstage.com/tour-de-france-archive/) — 2014–2024; GPX only 2020+.
- [la-flamme-rouge.eu](https://www.la-flamme-rouge.eu/) — community route editor, ~2001–2024, GPX export, no explicit license.
- [climbfinder.com](https://climbfinder.com/en) / [PJAMM Cycling](https://pjammcycling.com/) / [myCols](https://mycols.app/en) — rich climb catalogs, view-only (no API/bulk download).
- [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api) — ERA5 from 1940, hourly, CC BY 4.0.
- [Open-Meteo Forecast API / features](https://open-meteo.com/en/features) — 16-day horizon, 10k calls/day free tier.
- [CycleCoach — VAM & W/kg estimates](https://www.cyclecoach.com/blog/2018/5/31/vam-and-wkg-estimates) — VAM→W/kg rule-of-thumb formula.
- [Roadman Cycling — W/kg reality check](https://roadmancycling.com/blog/science-of-climbing-tour-de-france-speeds-wkg) — top-climber W/kg context (qualitative).
- Martin, J.C. et al. (1998), "Validation of a Mathematical Model for Road Cycling Power," *J. Applied Biomechanics* 14(3):276–291 — citable full power-balance model.
