# Source of truth

> **Staged replacement, not the current production deployment**

- Intended domain: `shop.stargateedu.co.kr`
- Role: STARGATE EDU commerce, course, and publication site
- Current live source: `DongsooJung/stargate-shop-redirect` (GitHub Pages from `main`)
- This repository: `DongsooJung/stargateedu-shop`, prepared for a future migration
- Live response checked against the current source on 2026-10-16

## Editing policy

1. Apply current production storefront changes in `DongsooJung/stargate-shop-redirect`.
2. Keep this repository's storefront as a staged replacement until the custom domain and GitHub Pages source are explicitly migrated.
3. Do not overwrite either repository's `main` from `DongsooJung/DongsooJung` snapshots or `mirror/*` branches.
4. Keep credentials and payment secret keys out of committed files.
5. When the migration occurs, update this file, `DongsooJung/DongsooJung/DOMAIN_SOURCES.md`, and the Notion GitHub dashboard in the same change window.

The `CNAME` file in this repository prepares the intended domain; it does not establish the current live deployment source.
