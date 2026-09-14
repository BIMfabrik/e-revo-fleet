# E‑Revo Fleet

Visual maintenance, spare-parts inventory and upgrade tracker for three Traxxas 1/16 E‑Revo cars.

## Current prototype

- Blue, red and violet car profiles
- Interactive technical car illustration with Body / Chassis / Top / Bottom / Exploded views
- Clickable major assemblies linked to Traxxas part numbers
- Maintenance issues per car with repair status
- Spare-parts stock and “can fix now” indication
- Batteries, transmitters, chargers and other accessories per car
- Upgrade history per car
- RCPlanet search links and manually recorded CHF prices
- Browser persistence using `localStorage`
- JSON import/export for backup or moving data between devices
- Mobile-responsive GitHub Pages UI

## Data model

The initial catalog is based on the Traxxas 1/16 E‑Revo model 71054‑8 parts list. The app deliberately does not invent live shop prices: RCPlanet prices can be recorded manually until a reliable shop lookup is implemented.

## Persistence

GitHub Pages is static and cannot safely commit changes back to this repository without authentication. Phase 1 therefore stores fleet state in the browser and supports JSON backup/restore. A later backend can synchronize state across devices.

## Next phases

1. Replace the schematic with photos / photogrammetry / a real 3D GLB model of the three cars.
2. Import the complete Traxxas exploded-parts hierarchy and hotspot map.
3. Add reliable RCPlanet product lookup and live CHF prices if the shop exposes a usable endpoint.
4. Add shared authenticated persistence (for example Supabase) while keeping GitHub Pages as the frontend.
