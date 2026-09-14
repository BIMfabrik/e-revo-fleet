# E‑Revo Garage

A visual garage for three Traxxas 1/16 E‑Revo cars: **Blue**, **Red**, and **Violet**.

Live site: https://bimfabrik.github.io/e-revo-fleet/

## Design

The home screen is intentionally sparse: one large vehicle, three car selectors, three visual views, and a few subtle part hotspots. Maintenance, spare stock, upgrades, and batteries/radio gear stay hidden in slide-in drawers until requested.

Product/chassis imagery is loaded from existing public retailer product media and is not committed to this repository. The violet image is a purple 1/16 E‑Revo visual stand-in until a photo of the actual vehicle is supplied.

## ChatGPT-managed fleet data

The actual fleet state is in [`data/fleet.json`](data/fleet.json). This is deliberately simple so changes can be made directly through ChatGPT/GitHub without editing the UI.

Examples:

- `Blue car: front-right axle carrier 7034 is broken.`
- `Add 2 × 7151 driveshaft assemblies to spare stock.`
- `Red car now has aluminum push rods 7118X.`
- `Violet car uses this LiPo battery and this transmitter.`
- `The blue car is fixed; remove the open 7034 issue and consume one spare.`

ChatGPT can update `data/fleet.json`, commit the change, and GitHub Pages will publish the new state.

## Parts reference

All three cars are configured as the older Traxxas 1/16 E‑Revo VXL / 71076‑3 generation with Velineon 380 brushless motor, VXL‑3m ESC, TQi radio and TSM. Part numbers mapped to hotspots use the 71076‑3 parts list. The interface links part numbers to Planet‑RC search and the 71076‑3 parts reference.

## Next deployment

GitHub Pages is only the prototype host. The same static front end can later be deployed on BlackBerg with a small authenticated API/database for persistent edits, stock changes, maintenance history, and live shop-price refreshes.
