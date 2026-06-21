
const pageIsZh = document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith('zh');
const SITE_COPY = {
  applicationDownloadTitle: pageIsZh ? '无畏基金会 - 资助申请' : 'WUWEI FOUNDATION - FUNDING APPLICATION',
  applicationDownloadFilename: pageIsZh ? '无畏基金会_资助申请.txt' : 'Wuwei_Foundation_Funding_Application.txt',
  applicationDownloaded: pageIsZh ? '资助申请草稿已下载。' : 'Your application draft has been downloaded.',
  applicationEmailSubject: pageIsZh ? '资助申请 - 无畏基金会' : 'Funding Application - Wuwei Foundation',
  applicationEmailReady: pageIsZh ? '申请邮件已准备好，请确认后发送。' : 'Your email application is ready to send.',
  donationAvailableSoon: pageIsZh ? '即将开放' : 'Available soon',
  donationOpen: pageIsZh ? '安全捐赠已开放' : 'Secure donations are open',
  donationPending: pageIsZh ? '捐赠支付正在准备中' : 'Donation payments preparing'
};

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const applicationForm = document.querySelector('#grant-application');
if (applicationForm) {
  const status = document.querySelector('#form-status');
  const collect = () => {
    const data = new FormData(applicationForm);
    return [...data.entries()].map(([key, value]) => `${key}: ${value}`).join('\n\n');
  };

  document.querySelector('#download-application')?.addEventListener('click', () => {
    const text = `${SITE_COPY.applicationDownloadTitle}

${collect()}
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = SITE_COPY.applicationDownloadFilename;
    a.click();
    URL.revokeObjectURL(url);
    if (status) status.textContent = SITE_COPY.applicationDownloaded;
  });

  applicationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(SITE_COPY.applicationEmailSubject);
    const body = encodeURIComponent(collect());
    window.location.href = `mailto:info@wuwei-institute.com?subject=${subject}&body=${body}`;
    if (status) status.textContent = SITE_COPY.applicationEmailReady;
  });
}

// Donation payment link activation layer.
const donationConfig = window.WUWEI_DONATION_CONFIG;
const donationLinks = document.querySelectorAll('[data-donation-link]');
const donationStatus = document.querySelector('[data-donation-status]');

if (donationLinks.length) {
  const validPaymentLink = (value) => {
    if (typeof value !== 'string' || !value.trim()) return false;
    try {
      const url = new URL(value);
      return url.protocol === 'https:';
    } catch (error) {
      return false;
    }
  };

  let activeLinkCount = 0;

  donationLinks.forEach((link) => {
    const kind = link.dataset.donationLink;
    const url = donationConfig?.[kind];
    const linkReady = Boolean(donationConfig?.enabled && validPaymentLink(url));
    if (linkReady) {
      activeLinkCount += 1;
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = link.dataset.activeLabel || (pageIsZh ? '安全捐赠' : 'Donate securely');
      link.classList.remove('is-disabled');
      link.removeAttribute('aria-disabled');
    } else {
      link.href = '#donate';
      link.textContent = SITE_COPY.donationAvailableSoon;
      link.classList.add('is-disabled');
      link.setAttribute('aria-disabled', 'true');
      link.addEventListener('click', (event) => event.preventDefault());
    }
  });

  if (donationStatus) {
    const ready = activeLinkCount > 0;
    donationStatus.textContent = ready ? SITE_COPY.donationOpen : SITE_COPY.donationPending;
    donationStatus.classList.toggle('is-live', ready);
  }
}
