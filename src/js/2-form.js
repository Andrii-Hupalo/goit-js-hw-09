const formData = { email: '', message: '' };
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
if (!form) {
  console.error('Form .feedback-form not found in DOM');
} else {
  function onInput(event) {
    const target = event.target;
    if (!target.name) return;
    if (target.name !== 'email' && target.name !== 'message') return;

    formData[target.name] = target.value;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (err) {
      console.error('LocalStorage error:', err);
    }
  }

  function restoreFormData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        for (const key of ['email', 'message']) {
          if (parsed[key] !== undefined && form.elements[key]) {
            form.elements[key].value = parsed[key];
            formData[key] = parsed[key];
          }
        }
      }
    } catch (err) {
      console.error('Error parsing saved form data:', err);
    }
  }
  function onSubmit(event) {
    event.preventDefault();
    if (formData.email.trim() === '' || formData.message.trim() === '') {
      alert('Fill please all fields');
      return;
    }
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData.email = '';
    formData.message = '';
  }
  form.addEventListener('input', onInput);
  window.addEventListener('DOMContentLoaded', restoreFormData);
  form.addEventListener('submit', onSubmit);
}

const textarea = document.querySelector('textarea');

textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
});
