WUWEI FOUNDATION WEBSITE
========================

Files
-----
index.html             Main website
apply.html             Funding application page
transparency.html      ANBI and governance information
assets/                Logo, icons, CSS and JavaScript
documents/             Policy Plan 2026-2029 PDF

Preview locally
---------------
1. Open a terminal in this folder.
2. Run: python3 -m http.server 8000
3. Visit: http://localhost:8000

Deployment
----------
Upload the complete folder to your web host. The site is static and does not
require a database or server-side framework.

Before publication
------------------
Replace all bracketed placeholders, including:
- KVK number
- RSIN number
- Correspondence address
- Full legal names of all Board members
- Board approval date and policy review date in the PDF

Keep the ANBI status labelled as "application pending" until an official
decision has been received. Add bank or online payment information only after
those accounts are active.

The application form prepares an email or a downloadable text draft. It does
not send data to a server or store submissions.


2026 update:
- Favicon and app icons now use assets/wuwei_square.png.
- The home hero and mission sections now feature the founder's original artworks from the assets folder.
- The symbolic logo remains in the dedicated Our Symbol section.


Donation payment activation
--------------------------
The donation buttons are already prepared but disabled.
When payment accounts are ready, edit assets/donation-config.js:
- paste the one-time Payment Link
- paste the monthly Payment Link
- add WeChat Pay and Alipay payment links or QR-code landing page links when available
- enable supported options such as Visa, Mastercard, American Express, PayPal, iDEAL, WeChat Pay and Alipay
- change enabled from false to true

Set payment links to redirect successful donors to:
https://YOUR-DOMAIN/donation-thank-you.html

The thank-you page lets donors create a branded acknowledgement certificate.
This certificate is not an official tax receipt.
