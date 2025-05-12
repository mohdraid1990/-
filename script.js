// Управление модальным окном
const modal = document.getElementById('contact-modal');
const modalToggles = document.querySelectorAll('[data-modal-toggle="contact-modal"]');
const modalClose = modal.querySelector('.modal-close');
const modalForm = modal.querySelector('.modal-form');
const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

// Функция открытия модального окна
function openModal(packageValue = '') {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Блокировка прокрутки фона
  const packageSelect = modal.querySelector('#modal-package');
  if (packageValue) {
    packageSelect.value = packageValue; // Предвыбор пакета
  }
  firstFocusableElement.focus(); // Фокус на первом элементе
}

// Функция закрытия модального окна
function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Восстановление прокрутки
  modalForm.reset(); // Сброс формы
}

// Обработчики событий для кнопок открытия модального окна
modalToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    const packageValue = e.target.dataset.package || '';
    openModal(packageValue);
  });
});

// Обработчик закрытия модального окна
modalClose.addEventListener('click', closeModal);

// Закрытие по клику на фон
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Закрытие по клавише Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

// Ловушка фокуса внутри модального окна
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && modal.classList.contains('is-open')) {
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } else { // Tab
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }
});

// Заглушка для отправки формы (для демонстрации)
modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Форма отправлена! (Это заглушка)');
  closeModal();
});