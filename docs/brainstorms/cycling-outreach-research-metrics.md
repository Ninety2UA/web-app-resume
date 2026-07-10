# Pro Cycling Performance-Data Landscape (UCI WorldTour, 2026)

Research for a premium data/analytics/AI job-outreach site aimed at WorldTeams (first target: Bahrain Victorious).
Confidence flags: [SOLID] well-sourced · [LIKELY] credible but single-source · [UNCERTAIN] estimate/inference.

---

## AREA 1 — PERFORMANCE METRICS IN USE (2020–2026)

**Power fundamentals still core.** FTP, W/kg, normalized power, power curves, W' and critical power remain the base
layer; W/kg on climbs is the headline GC metric. [SOLID] https://lanternerouge.com/2023/02/07/watts-primer/

**Durability is THE hot metric (2023–2026).** Defined as power retained *after* accumulated work, quantified as
"power at N kilojoules" (typically measured at 2,500 / 3,000 / 3,500 kJ; pros race past 5,000 kJ). A <=5% drop in
20-min power fresh-vs-fatigued = "very durable." [SOLID]
https://velo.outsideonline.com/road/road-training/the-new-marker-of-elite-performance-why-durability-is-the-new-must-know-metric-in-pro-cycling/
· https://www.cyclingweekly.com/fitness/3000-kilojoules · 2025 systematic review (intensity drives durability loss):
https://link.springer.com/article/10.1007/s00421-025-05885-0

**Training load** — TSS / CTL / ATL (fitness/fatigue/form) via TrainingPeaks; WKO5 adds mFTP, dFRC, Pmax, TIS. [SOLID]
https://www.trainingpeaks.com/wko5/

**Metabolic profiling** — INSCYD models VO2max, VLamax, FatMax, carb/fat combustion from field tests; used to
individualize fueling & pacing. [SOLID] https://inscyd.com/article/trainingpeaks-vs-inscyd/

**Core body temperature (heat)** — CORE sensor now near-ubiquitous; ~5% power loss per +1 degC core temp; heat
training yields ~2.5% higher haemoglobin mass and ~8% TT gains in studies. Pogacar's team pays out of pocket for it.
[SOLID] https://www.cyclingnews.com/news/majority-of-worldtour-using-temperature-sensors-as-core-announces-partnership-with-10-teams/
· https://www.bikeradar.com/advice/fitness-and-training/core-2-thermal-sensor

**Aerodynamics (CdA)** — On-bike aero sensors (Notio, AeroLab, Aerosensor) estimate CdA in field/velodrome via
pitot-static pressure; validated but noisy vs wind tunnel. [SOLID]
https://www.cyclingweekly.com/news/product-news/are-aerodynamic-drag-measuring-tools-the-tech-of-the-future-448581
· validity study: https://pmc.ncbi.nlm.nih.gov/articles/PMC12661900/

**Nutrition — 120 g carbs/hr** is the defining 2022–2026 shift, credited as the main driver of record Tour speeds
(Pogacar, Vingegaard fuel ~120 g/hr via stackable gels). Experts warn no hard evidence 120 > 90 g/hr for everyone.
[SOLID] https://velo.outsideonline.com/road/road-racing/tour-de-france/tour-de-france-riders-fuel-at-120g-carb-but-should-you/

**Glucose monitoring — BANNED in-competition.** UCI rule 1.3.006bis (10 Jun 2021) bans in-race metabolic sensors
(glucose/lactate); killed Supersapiens' race use. Still legal in *training* (e.g. Bahrain x Ultrahuman M1 CGM). [SOLID]
https://www.bikeradar.com/news/uci-bans-supersapiens · https://www.gdnonline.com/Details/1195699

**Carbon monoxide rebreathing** — 2024 Tour controversy (Visma, UAE, Israel-PT used it for haemoglobin-mass / altitude
testing). UCI moved to ban *repeated* performance use in 2025 for health reasons; single medical-setting hbmass test
still allowed. [SOLID] https://road.cc/content/news/uci-ban-use-carbon-monoxide-pro-cycling-311705

**Ketones** — Legal (WADA won't ban; UCI *recommends against*, MPCC teams pledge not to use). Visma (Ketone-IQ/HVMN),
Soudal (KetoneAid) openly partner. Grey area / "medicalisation" concern. [SOLID]
https://www.cyclingnews.com/news/wada-says-ketones-do-not-meet-criteria-to-be-prohibited/
· https://www.mpcc.fr/en/the-mpcc-appeals-to-the-uci-to-establish-firm-rules-to-stop-the-escalating-medicalisation-of-the-sport/

---

## AREA 2 — PUBLIC DATA AVAILABILITY (the critical question)

**Bottom line: race RESULTS/metadata are abundantly public; race POWER data is NOT.** Teams guard power files as
competitive IP; ASO's Prudhomme has repeatedly called to *ban* power meters ("annihilate the glorious uncertainty").
[SOLID] https://www.cyclingnews.com/features/power-meters-and-computers-at-the-tour-de-france-whos-using-what/

**What IS public:**
- **Results / startlists / rankings / rider bios / stage profiles / climbs** — ProCyclingStats (PCS) and FirstCycling,
  effectively complete back to early 1900s for GC/stage results. [SOLID] https://www.procyclingstats.com/
- **PCS has NO official public API** — access is via community scrapers (`procyclingstats` PyPI, Apify, parse.bot).
  Scraped data explicitly EXCLUDES power. [SOLID] https://procyclingstats.readthedocs.io/en/stable/api.html
- **Live GPS telemetry** (position, speed, gaps, and for consenting Velon teams: power/cadence) exists during broadcast
  via ASO–NTT (ex-Dimension Data, 5-yr deal tracking every rider) and Velon/VelonLive+EY — but it is broadcast-layer,
  **not offered as a bulk historical open dataset**. [SOLID]
  https://www.velon.cc/how-it-works · https://www.tourtrackerprocycling.com/from-a-jersey-pocket-to-the-cloud/
- **Voluntary Strava power** — a *handful* of pros occasionally publish power (Pogacar shared a file Feb 2026 for the
  first time in years; MvdP has shared select rides). Sporadic, self-selected, not systematic. [SOLID]
  https://velo.outsideonline.com/road/road-training/pogacar-shared-power-data/
- **Estimated W/kg from climb times** — analysts (Lanterne Rouge "etalon w/kg" @60kg, ammattipyoraily @65kg,
  velofacts) reverse-engineer power from time+gradient+mass+physics. Best GC climbers ~6.0–6.4 W/kg for 30–40 min;
  VAM 1,700–1,850 m/h on hardest climbs. These are ESTIMATES (±, assumptions on mass/draft/wind). [LIKELY/UNCERTAIN]
  https://roadmancycling.com/blog/science-of-climbing-tour-de-france-speeds-wkg · https://lanternerouge.com/watts/
- **Open historical datasets** — Kaggle has TdF results 1903–2023 + stage GeoJSON routes; GitHub projects (wjsutton).
  GPX/elevation per stage widely available; free historical weather via open-meteo-type APIs. [SOLID]
  https://www.kaggle.com/datasets/mexwell/le-tour-de-france-data-set

**CAN credibly build on public data:** race results & rankings over 100+ yrs; startlists/rosters; stage
routes/elevation/climb catalogs; ESTIMATED climbing W/kg & VAM archives; standings/points trends; weather overlays;
sporadic voluntary Strava power for a few stars.
**CANNOT credibly claim:** true measured "power output by stage/team/cyclist over 20 years." No such public dataset
exists; any 20-yr power product would be *modeled estimates*, must be labeled as such, and is climb-only (flat/TT power
is essentially unrecoverable from public data). [SOLID — synthesis of above]

---

## AREA 3 — SOFTWARE / PLATFORM LANDSCAPE

- **TrainingPeaks** (web, load/planning) + **WKO5** (desktop deep analytics) — de facto standard; teams like
  Alpecin pair TP for fatigue-monitoring with INSCYD for direction-checking. [SOLID]
  https://www.trainingpeaks.com/wko5/ · https://inscyd.com/article/trainingpeaks-vs-inscyd/
- **INSCYD** — metabolic modeling (VO2max/VLamax/carb combustion) from field tests. [SOLID] (as above)
- **Golden Cheetah** (open-source), **Xert** (adaptive/ML-ish "fitness signature"), **Today's Plan**, **Intervals.icu**
  (free, popular) — analysis ecosystem. [LIKELY] https://www.baronbiosys.com/the-future-of-power-meters-in-sport/
- **Aero:** Notio, AeroLab (team-focused, Canadian), Aerosensor/Aerodrome (velodrome). [SOLID] (Area 1 cites)
- **Live/telemetry:** Velon (VelonLive, +EY; SAVE safety dashboard debuted 2025 Tour de Suisse), ASO–NTT tracking.
  [SOLID] https://www.cyclingnews.com/news/velon-and-ey-launch-new-velonlive-data-tracking-system/
- **Team-internal / bespoke:** INEOS (now **Netcompany-INEOS**) built **"Pulse"** data-orchestration/decision platform
  with Netcompany — explicit 2026 signal that decision-support tooling is a competitive frontier. [SOLID]
  https://www.bikeradar.com/news/2026-netcompany-ineos-cycling-team-announcement
- **Wearables:** CORE (temp), Whoop/Oura/Ultrahuman Ring (recovery/HRV/sleep), Ultrahuman M1 CGM (Bahrain, training).
  [SOLID] https://www.gdnonline.com/Details/1195699

**State of the art vs gaps:** rich single-athlete physiology tooling (TP/WKO/INSCYD) is mature; GAPS are in *integration*
(fragmented tools/wearables into one team decision layer — the Pulse thesis), race-tactics simulation, opponent
modeling from public data, and turning scattered wearable streams into actionable, real-time coaching intelligence.

---

## AREA 4 — WHERE AI / DATA / CLOUD IS HEADED

- **Academic ML momentum (2021–2026):** race-outcome ranking (learn-to-rank, gradient boosting), rider/race vector
  embeddings (Bike2Vec), Bayesian dual-skill roster models (VeloRost), LSTM race-time prediction, "predicting the next
  Pogacar" talent ID, injury-risk models. Mostly academic, few productionized. [SOLID]
  https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2021.714107/full
  · https://arxiv.org/pdf/2305.10471 · https://link.springer.com/chapter/10.1007/978-3-032-06167-6_15
- **Anti-doping "power data passport"** — ITA 2-yr pilot (approved Mar 2025, w/ Univ. Kent + UCL), 60 WorldTour riders
  consented (Visma, Picnic, Jayco, Decathlon, Cofidis); possible 2028 launch using power files to *target* testing.
  Rider body (CPA/Hansen) opposes. A live signal that power-data modeling is going institutional. [SOLID]
  https://www.cyclingnews.com/pro-cycling/doping/60-worldtour-riders-consent-to-anti-doping-power-data-passport-study/
  · https://ita.sport/news/the-ita-explores-the-potential-of-power-data-in-cyclings-anti-doping-efforts/
- **Team decision platforms** — Netcompany-INEOS "Pulse" = cloud data orchestration for faster race decisions. [SOLID]
  (cite above)
- **Practical open frontiers** for a data/AI/cloud pro: race-simulation & TT pacing engines; echelon/wind/weather
  prediction; nutrition/durability planning from load data; U23 talent-ID pipelines on public results; unifying
  fragmented wearable + power + weather streams into one cloud decision layer; MLOps/data-engineering rigor (most teams
  lack dedicated data platform engineering). [LIKELY — synthesis]

---

## IMPLICATIONS FOR THE OUTREACH SITE (buildable-on + credible premium concepts)

1. **Do NOT promise "20 years of real power data."** It doesn't exist publicly. Frame any long-horizon power view as
   *modeled estimates* (climb-time W/kg / VAM), clearly labeled — credibility is the whole game with a WorldTeam.
2. **Safest hard-data spine:** PCS/FirstCycling results + Kaggle historical + stage GPX/elevation + climb catalogs +
   free historical weather. All genuinely public and buildable today (via community scrapers — note PCS has no official API).
3. **Credible premium demo concepts:** (a) climbing-performance explorer — estimated W/kg & VAM per climb over decades,
   with honest error bands; (b) a talent-ID / "next breakout rider" model on public results (mirrors real academic
   work); (c) a race-simulation / echelon-risk / TT-pacing prototype using route + weather; (d) a unified team
   "decision layer" concept slide riffing on INEOS's Pulse — the clearest real market gap.
4. **Show fluency in the 2026 zeitgeist:** durability (power-at-kJ), 120 g/hr fueling, CORE heat data, CO-rebreathing &
   glucose-sensor rules, and the ITA power-data passport — naming these signals you understand *their* world, not just
   generic data science.
5. **Bahrain Victorious angle:** they publicly brand as "data-driven development" and already partner with Ultrahuman
   (CGM/ring) — lead with integrating fragmented wearable + power + race data into decision-ready cloud intelligence,
   the acknowledged gap. https://bahraincyclingteam.com/about/
