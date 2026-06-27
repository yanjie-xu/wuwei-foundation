/**
 * Wuwei Foundation donation settings.
 *
 * To activate online donations:
 * 1. Paste the live payment link URLs below.
 * 2. Change enabled to true.
 * 3. Set payment links to redirect successful donors to:
 *    https://YOUR-DOMAIN/donation-thank-you.html
 *
 * The oneTime and monthly links may use Stripe or another hosted payment provider.
 * Supported methods, including WeChat Pay and Alipay, should be enabled within those two hosted payment options where available.
 */
window.WUWEI_DONATION_CONFIG = {
  enabled: false,
  oneTime: "",
  monthly: ""
};
