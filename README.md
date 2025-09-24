# Nutt House Site (v5)
Single-site static build. Deploy to Cloudflare Pages or any static host.

## Structure
- Public: index, slushies, 3d, kids
- Private (protect with Cloudflare Access): portal, homework, admin
- Rotating backgrounds in /assets/<section>/BG-1..6.jpg
- Slushies gallery: /assets/slushies/gallery/

## Config
Edit /config/public.json for emails, assets, Kids Zone items, shop settings, social links.

## After Deploy (Step-by-step)
1) Protect /portal.html, /homework.html, /admin.html with Cloudflare Access.
2) Point plex.nutt-house.au and immich.nutt-house.au to your tunnel and protect with Access.
3) Replace background images per folder, add slushies gallery images.
4) Edit /products.json and use /admin.html to manage it (export JSON and commit).
5) Later: add Cloudflare Worker for AusPost quotes, payments, Discord pings, and auto emails.
