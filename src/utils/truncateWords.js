// utils/truncateWords.js
export const truncateWords = (html, wordLimit = 10, suffix = '') => {
  if (!html) return '';

  // Remove tags if needed for plain text truncation
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';

  const words = text.trim().split(/\s+/).slice(0, wordLimit).join(' ');
  return `${words}${suffix}`;
};
