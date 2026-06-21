
const certificateForm = document.querySelector('#certificate-form');
const certificateStatus = document.querySelector('#certificate-status');
const dateInput = document.querySelector('#donation-date');
const certificateIsZh = document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith('zh');
const CERT_COPY = certificateIsZh ? {
  defaultName: '我们的支持者',
  defaultAmount: '谨致谢意',
  datePlaceholder: '—',
  overline: '无畏基金会 · Wuwei Foundation',
  foundationEn: 'WUWEI FOUNDATION',
  foundationCn: '无畏基金会',
  title: '感谢证书',
  subtitle: '谨以衷心谢意致赠',
  message1: '感谢您以慈悲行动，滋养生命、重燃希望，',
  message2: '助长无畏成长。',
  contribution: '捐赠金额',
  date: '日期',
  reference: '支付编号',
  signoffSmall: '慈悲化为行动',
  downloadName: '无畏基金会_感谢证书.png',
  downloaded: '感谢证书已下载。'
} : {
  defaultName: 'Our Valued Supporter',
  defaultAmount: 'With gratitude',
  datePlaceholder: '—',
  overline: 'Wuwei Foundation · 无畏基金会',
  foundationEn: 'WUWEI FOUNDATION',
  foundationCn: '无畏基金会',
  title: 'Certificate of Appreciation',
  subtitle: 'Presented with heartfelt gratitude to',
  message1: 'for helping nurture life, restore hope, and grow courage',
  message2: 'through compassionate action.',
  contribution: 'CONTRIBUTION',
  date: 'DATE',
  reference: 'Reference',
  signoffSmall: 'Compassion in Action',
  downloadName: 'Wuwei_Foundation_Certificate_of_Appreciation.png',
  downloaded: 'Your certificate has been downloaded.'
};

const formatCertificateDate = (value) => {
  if (!value) return CERT_COPY.datePlaceholder;
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat(certificateIsZh ? 'zh-CN' : 'en', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(date);
};

if (dateInput && !dateInput.value) {
  dateInput.value = new Date().toISOString().slice(0, 10);
}

const getCertificateData = () => {
  const formData = new FormData(certificateForm);
  return {
    name: String(formData.get('donorName') || '').trim() || CERT_COPY.defaultName,
    amount: String(formData.get('amount') || '').trim() || CERT_COPY.defaultAmount,
    date: formatCertificateDate(String(formData.get('date') || '')),
    reference: String(formData.get('reference') || '').trim()
  };
};

const updatePreview = () => {
  if (!certificateForm) return;
  const data = getCertificateData();
  document.querySelector('[data-certificate-name]').textContent = data.name;
  document.querySelector('[data-certificate-amount]').textContent = data.amount;
  document.querySelector('[data-certificate-date]').textContent = data.date;
  const referenceRow = document.querySelector('.certificate-reference-row');
  const referenceValue = document.querySelector('[data-certificate-reference]');
  if (referenceRow && referenceValue) {
    referenceRow.hidden = !data.reference;
    referenceValue.textContent = data.reference;
  }
};

certificateForm?.addEventListener('input', updatePreview);
updatePreview();

document.querySelector('#print-certificate')?.addEventListener('click', () => {
  updatePreview();
  window.print();
});

certificateForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  updatePreview();
  const data = getCertificateData();
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1131;
  const ctx = canvas.getContext('2d');
  const forest = '#0a5a3d';
  const deep = '#063d2d';
  const gold = '#d7a52e';
  const ink = '#15342b';
  const sans = 'Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
  const serif = 'Georgia, "Songti SC", "STSong", "Noto Serif CJK SC", serif';

  ctx.fillStyle = '#fffdfa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = forest;
  ctx.lineWidth = 18;
  ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);
  ctx.strokeStyle = gold;
  ctx.lineWidth = 3;
  ctx.strokeRect(58, 58, canvas.width - 116, canvas.height - 116);

  const logo = new Image();
  logo.src = 'assets/wuwei-foundation-logo.png';
  try {
    await logo.decode();
    const logoHeight = 150;
    const logoWidth = logo.naturalWidth / logo.naturalHeight * logoHeight;
    ctx.drawImage(logo, (canvas.width - logoWidth) / 2, 78, logoWidth, logoHeight);
  } catch (error) {}

  ctx.textAlign = 'center';
  ctx.fillStyle = forest;
  ctx.font = `700 24px ${sans}`;
  ctx.fillText(CERT_COPY.foundationEn, canvas.width / 2, 265);
  ctx.fillStyle = deep;
  ctx.font = `600 22px ${sans}`;
  ctx.fillText(CERT_COPY.foundationCn, canvas.width / 2, 298);

  ctx.fillStyle = deep;
  ctx.font = `700 58px ${serif}`;
  ctx.fillText(CERT_COPY.title, canvas.width / 2, 392);

  ctx.fillStyle = '#60756d';
  ctx.font = `28px ${sans}`;
  ctx.fillText(CERT_COPY.subtitle, canvas.width / 2, 456);

  ctx.fillStyle = gold;
  ctx.font = `700 50px ${serif}`;
  const safeName = data.name.length > 42 ? `${data.name.slice(0, 39)}…` : data.name;
  ctx.fillText(safeName, canvas.width / 2, 532);

  ctx.fillStyle = ink;
  ctx.font = `27px ${serif}`;
  ctx.fillText(CERT_COPY.message1, canvas.width / 2, 606);
  ctx.fillText(CERT_COPY.message2, canvas.width / 2, 646);

  ctx.strokeStyle = '#dfe8e3';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(270, 706);
  ctx.lineTo(1330, 706);
  ctx.stroke();

  ctx.fillStyle = '#60756d';
  ctx.font = `700 20px ${sans}`;
  ctx.fillText(CERT_COPY.contribution, 520, 768);
  ctx.fillText(CERT_COPY.date, 1080, 768);
  ctx.fillStyle = ink;
  ctx.font = `29px ${serif}`;
  ctx.fillText(data.amount, 520, 814);
  ctx.fillText(data.date, 1080, 814);

  if (data.reference) {
    ctx.fillStyle = '#60756d';
    ctx.font = `18px ${sans}`;
    const safeReference = data.reference.length > 66 ? `${data.reference.slice(0, 63)}…` : data.reference;
    ctx.fillText(`${CERT_COPY.reference}: ${safeReference}`, canvas.width / 2, 868);
  }

  ctx.strokeStyle = forest;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(580, 944);
  ctx.lineTo(1020, 944);
  ctx.stroke();
  ctx.fillStyle = deep;
  ctx.font = `700 25px ${sans}`;
  ctx.fillText('Wuwei Foundation · 无畏基金会', canvas.width / 2, 985);
  ctx.fillStyle = '#60756d';
  ctx.font = `18px ${sans}`;
  ctx.fillText(CERT_COPY.signoffSmall, canvas.width / 2, 1018);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = CERT_COPY.downloadName;
    link.click();
    URL.revokeObjectURL(url);
    if (certificateStatus) certificateStatus.textContent = CERT_COPY.downloaded;
  }, 'image/png');
});
