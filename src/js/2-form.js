const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  const parsed = JSON.parse(saved);
  form.elements.email.value = parsed.email || '';
  form.elements.message.value = parsed.message || '';
  formData.email = parsed.email || '';
  formData.message = parsed.message || '';
}

form.addEventListener('input', e => {
  const { name, value } = e.target;
  if (!name) return;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Будь ласка, заповніть усі поля');
    return;
  }

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
});
