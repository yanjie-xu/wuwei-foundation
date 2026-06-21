# Wuwei Foundation Website

Static website prepared for GitHub Pages.

## Publish with GitHub Pages

1. Create a new public GitHub repository, for example `wuwei-foundation`.
2. Upload all files and folders from this package to the repository root.
3. Open the repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then click **Save**.
6. GitHub will publish the site at:
   `https://YOUR-USERNAME.github.io/wuwei-foundation/`

For a root-level address such as `https://YOUR-USERNAME.github.io/`, name the repository exactly `YOUR-USERNAME.github.io`.


## Stripe donations (prepared, not yet active)

The donation interface is already built and remains in a safe “Available soon” state.

When the Stripe account is ready:

1. Create one live **one-time donation** Payment Link.
2. Create one live **monthly donation** Payment Link.
3. In Stripe, enable collection of the donor’s email address and payment receipts.
4. Set each Payment Link’s post-payment redirect to:
   `https://YOUR-DOMAIN/donation-thank-you.html`
5. Open `assets/donation-config.js`, paste the two URLs, and change `enabled` to `true`.

No other website code needs to be edited.

The thank-you page includes a branded certificate of appreciation that donors can download as a PNG or print/save as PDF. It is intentionally labelled as an acknowledgement rather than an official tax receipt.
