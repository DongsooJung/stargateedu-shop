# Source of truth

> **Staged replacement — not the current production deployment**

- Domain planned for migration: `shop.stargateedu.co.kr`
- Role: STARGATE EDU commerce, course, and publication storefront prepared for a future migration
- Repository: `DongsooJung/stargateedu-shop`
- Current deployment state: GitHub Pages is inactive; the custom domain is currently attached to `DongsooJung/stargate-shop-redirect`
- Verified: 2026-09-20

## Editing policy

1. Do not treat a change in this repository as a deployment to `shop.stargateedu.co.kr`.
2. Make production storefront changes in `DongsooJung/stargate-shop-redirect` while the custom domain remains attached there.
3. Keep credentials and payment secret keys out of the repository; use environment variables or deployment-provider secret stores.
4. Before a migration, explicitly configure GitHub Pages and the custom domain for this repository, reconcile the storefront and payment implementation, and validate the live domain after cutover.
5. In the same migration window, update `DongsooJung/DongsooJung/DOMAIN_SOURCES.md`, this declaration, and the Notion GitHub dashboard.

The repository can retain the prepared replacement implementation, but it is not an authorized deployment source until the migration is completed.
