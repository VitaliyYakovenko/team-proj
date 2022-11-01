(() => {
  const { openModalBtn, closeModalBtn, modal, body, form } = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    body: document.querySelector('body'),
    form: document.querySelector('.js-form'),
  };

  openModalBtn.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', toggleModal);
  form.addEventListener('submit', submitForm);

  function toggleModal(e) {
    e.preventDefault();
    modal.classList.toggle('js-hidden');

    !modal.classList.contains('js-hidden')
      ? (body.style.overflow = 'hidden')
      : (body.style.overflow = 'auto');
  }

  function submitForm(e) {
    e.preventDefault();
    console.clear();

    const pattern = {
      name: /^[a-zA-zs]{3,25}$/,
      phone:
        /^\+?([0-9]{2})[ ]?[\(-. ]?([0]{1}[0-9]{2})[\)-. ]?[ ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/,
      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    };

    let valuesCount = 0;

    new FormData(e.currentTarget).forEach((value, name) => {
      const inputParent = form.elements[name].parentElement,
        submitBtn = form.lastElementChild,
        countryCode = '+38';

      if (value && name === 'phone' && value.slice(0, 3) !== countryCode) {
        value = countryCode + value;
      }

      const isValid = pattern[name].test(value);

      if (!isValid || !value) {
        inputParent.classList.add('error');
        submitBtn.classList.add('error');
        valuesCount++;

        console.clear();
        return;
      }

      inputParent.classList.remove('error');
      submitBtn.classList.remove('error');

      console.log(`${name}: ${value}`);
    });

    form.classList.toggle('required', valuesCount === 3);
    valuesCount === 0 && e.currentTarget.reset();
  }
})();
