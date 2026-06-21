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
 * WeChat Pay and Alipay can be added as payment links or QR-code landing pages.
 */
window.WUWEI_DONATION_CONFIG = {
  enabled: false,
  oneTime: "",
  monthly: "",
  wechatPay: "",
  alipay: ""
};
