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

const pageLanguage = document.documentElement.lang || document.body.dataset.lang || 'en';
const isChinese = pageLanguage.toLowerCase().startsWith('zh');

const applicationForm = document.querySelector('#grant-application');
if (applicationForm) {
  const status = document.querySelector('#form-status');
  const collect = () => {
    const data = new FormData(applicationForm);
    return [...data.entries()].map(([key, value]) => `${key}: ${value}`).join('\n\n');
  };

  document.querySelector('#download-application')?.addEventListener('click', () => {
    const text = `WU WEI FOUNDATION - FUNDING APPLICATION\n\n${collect()}\n`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Wu_Wei_Foundation_Funding_Application.txt';
    a.click();
    URL.revokeObjectURL(url);
    status.textContent = isChinese ? '申请草稿已下载。' : 'Your application draft has been downloaded.';
  });

  applicationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const subject = encodeURIComponent('Funding Application - Wu Wei Foundation');
    const body = encodeURIComponent(collect());
    window.location.href = `mailto:info@wuwei-institute.com?subject=${subject}&body=${body}`;
    status.textContent = isChinese ? '申请邮件已准备好，请在邮箱中确认并发送。' : 'Your email application is ready to send.';
  });
}
