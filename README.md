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


## Donation payments (prepared, not yet active)

The donation interface is already built and remains in a safe “Available soon” state.

When the payment accounts are ready:

1. Create live **one-time donation** and **monthly donation** payment links.
2. Enable available payment methods such as Visa, Mastercard, American Express, PayPal, iDEAL, Apple Pay, Google Pay, WeChat Pay and Alipay where supported by the payment provider.
3. Add WeChat Pay and Alipay QR-code details or links when those accounts are available.
4. Set payment links to redirect successful donors to:
   `https://YOUR-DOMAIN/donation-thank-you.html`
5. Open `assets/donation-config.js`, paste the URLs or payment details, and change `enabled` to `true`.

No other website code needs to be edited.

The thank-you page includes a branded certificate of appreciation that donors can download as a PNG or print/save as PDF. It is intentionally labelled as an acknowledgement rather than an official tax receipt.
