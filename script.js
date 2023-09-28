'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Elements
const tipBtns = document.querySelectorAll('.btn--tip');
const btnReset = document.querySelector('.btn--reset');

const labelErrorBill = document.querySelector('.label__error--bill');
const labelErrorPeople = document.querySelector('.label__error--ppl');

const labelWrapperBill = document.querySelector('.label__wrapper--bill');
const labelWrapperPeople = document.querySelector('.label__wrapper--ppl');

const inputWrapperBill = document.querySelector('.input__wrapper--bill');
const inputWrapperPeople = document.querySelector('.input__wrapper--ppl');

const inputBill = document.querySelector('.input--bill');
const inputPeople = document.querySelector('.input--ppl');
const inputCustom = document.querySelector('.input--custom');

const amountTip = document.querySelector('.amount__value--tip');
const amountTotal = document.querySelector('.amount__value--total');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Global variables and functions
let billStr, tipStr, pplStr;

const init = function () {
  // Setting global variables to original values
  billStr = '';
  tipStr = '';
  pplStr = '';

  // Setting DOM elements to default states
  tipBtns.forEach(btn => btn.classList.remove('tip__selected'));
  btnReset.classList.remove('reset__enabled');
  btnReset.classList.remove('reset__hovered');
  inputBill.value = '';
  inputPeople.value = '';
  inputCustom.value = '';
  amountTip.textContent = '$0.00';
  amountTotal.textContent = '$0.00';
};

const validateData = function (billStr, tipStr, pplStr) {
  // Converting string to number
  const bill = Number(billStr);
  const tip = Number(tipStr);
  const ppl = Number(pplStr);

  // Checking if any input field is empty
  if (billStr === '' || tipStr === '' || pplStr === '') {
    if (billStr === '') {
      removeErrorMsg('billInput');
      clearError('billInput');
    }
    if (tipStr === '') clearError('tipInput');
    if (pplStr === '') {
      removeErrorMsg('pplInput');
      clearError('pplInput');
    }
    disableSectionResult();
  }

  // Checking if any input field is set to zero
  if (
    billStr !== '' &&
    tipStr !== '' &&
    pplStr !== '' &&
    (billStr === '0' || tipStr === '0' || pplStr === '0')
  ) {
    if (billStr === '0') {
      insertErrorMsg(`Can't be zero`, 'billInput');
      addError('billInput');
    }
    if (tipStr === '0') addError('tipInput');
    if (pplStr === '0') {
      insertErrorMsg(`Can't be zero`, 'pplInput');
      addError('pplInput');
    }
    disableSectionResult();
  }

  // Checking if any input field is set to a negative value
  if (bill < 0 || tip < 0 || ppl < 0) {
    if (bill < 0) {
      insertErrorMsg(`Can't be negative`, 'billInput');
      addError('billInput');
    }
    if (tip < 0) addError('tipInput');
    if (ppl < 0) {
      insertErrorMsg(`Can't be negative`, 'pplInput');
      addError('pplInput');
    }
  }

  // Checking if any input field is set to an accepted value
  if (bill > 0 || tip > 0 || ppl > 0) {
    if (bill > 0) {
      removeErrorMsg('billInput');
      clearError('billInput');
    }
    if (tip > 0) clearError('tipInput');
    if (ppl > 0) {
      removeErrorMsg('pplInput');
      clearError('pplInput');
    }
  }

  // Checking if right conditions are met
  if (bill > 0 && tip > 0 && ppl > 0) {
    calcDisplayAmounts(bill, tip, ppl);
    btnReset.classList.add('reset__enabled');
  }
};

const insertErrorMsg = function (msg, element) {
  if (element === 'billInput') {
    labelWrapperBill.innerHTML = '';
    const html = `
    <p class="label">Bill</p>
    <p class="label__error label__error--bill">${msg}</p>
      `;
    labelWrapperBill.insertAdjacentHTML('afterbegin', html);
  }

  if (element === 'pplInput') {
    labelWrapperPeople.innerHTML = '';
    const html = `
    <p class="label">Number of People</p>
    <p class="label__error label__error--ppl">${msg}</p>
      `;
    labelWrapperPeople.insertAdjacentHTML('afterbegin', html);
  }
};

const removeErrorMsg = function (element) {
  if (element === 'billInput') {
    labelWrapperBill.innerHTML = '';
    const html = `
    <p class="label">Bill</p>
      `;
    labelWrapperBill.insertAdjacentHTML('afterbegin', html);
  }

  if (element === 'pplInput') {
    labelWrapperPeople.innerHTML = '';
    const html = `
    <p class="label">Number of People</p>
      `;
    labelWrapperPeople.insertAdjacentHTML('afterbegin', html);
  }
};

const addError = function (element) {
  // Checking which element to add ERROR state to
  if (element === 'billInput') inputWrapperBill.classList.add('error');
  if (element === 'tipInput') inputCustom.classList.add('error');
  if (element === 'pplInput') inputWrapperPeople.classList.add('error');
};

const clearError = function (element) {
  // Checking which element to remove ERROR state from
  if (element === 'billInput') inputWrapperBill.classList.remove('error');
  if (element === 'tipInput') inputCustom.classList.remove('error');
  if (element === 'pplInput') inputWrapperPeople.classList.remove('error');
};

const disableSectionResult = function () {
  // Setting result section to default state
  btnReset.classList.remove('reset__enabled');
  amountTip.textContent = '$0.00';
  amountTotal.textContent = '$0.00';
};

const calcDisplayAmounts = function (bill, tip, ppl) {
  // Calculating amounts
  const tipAmountPerPerson = ((tip / 100) * bill) / ppl;
  const totalAmountPerPerson = ((tip / 100) * bill + bill) / ppl;

  // Rounding off amounts to 2 decimal points and displaying amounts
  amountTip.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
  amountTotal.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
};

init();

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Event listeners for BILL INPUT
inputBill.addEventListener('input', function () {
  billStr = inputBill.value;
  validateData(billStr, tipStr, pplStr);
});

inputBill.addEventListener('mouseover', function () {
  if (!inputBill.classList.contains('error'))
    inputWrapperBill.classList.add('input__wrapper__hovered');
});

inputBill.addEventListener('mouseout', function () {
  inputWrapperBill.classList.remove('input__wrapper__hovered');
});

inputBill.addEventListener('focus', function () {
  if (!inputBill.classList.contains('error'))
    inputWrapperBill.classList.add('input__wrapper__focused');
});

inputBill.addEventListener('blur', function () {
  inputWrapperBill.classList.remove('input__wrapper__focused');
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Event listeners for TIP BUTTONS
tipBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.classList.contains('tip__selected')) {
      btn.classList.remove('tip__selected');
      tipStr = '';
      validateData(billStr, tipStr, pplStr);
    } else if (inputCustom.value === '') {
      tipBtns.forEach(btn => btn.classList.remove('tip__selected'));
      btn.classList.remove('tip__hovered');
      btn.classList.add('tip__selected');
      tipStr = btn.value;
      validateData(billStr, tipStr, pplStr);
    }
  });

  btn.addEventListener('mouseover', function () {
    if (!btn.classList.contains('tip__selected'))
      btn.classList.add('tip__hovered');
  });

  btn.addEventListener('mouseout', function () {
    btn.classList.remove('tip__hovered');
  });
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Event listeners for CUSTOM TIP INPUT
inputCustom.addEventListener('input', function () {
  tipBtns.forEach(btn => btn.classList.remove('tip__selected'));
  tipStr = inputCustom.value;
  validateData(billStr, tipStr, pplStr);
});

inputCustom.addEventListener('mouseover', function () {
  if (!inputCustom.classList.contains('error'))
    inputCustom.classList.add('input--custom__hovered');
});

inputCustom.addEventListener('mouseout', function () {
  inputCustom.classList.remove('input--custom__hovered');
});

inputCustom.addEventListener('focus', function () {
  if (!inputCustom.classList.contains('error'))
    inputCustom.classList.add('input--custom__focused');
});

inputCustom.addEventListener('blur', function () {
  inputCustom.classList.remove('input--custom__focused');
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Event listeners for NO. OF PEOPLE INPUT
inputPeople.addEventListener('input', function () {
  pplStr = inputPeople.value;
  validateData(billStr, tipStr, pplStr);
});

inputPeople.addEventListener('mouseover', function () {
  if (!inputPeople.classList.contains('error'))
    inputWrapperPeople.classList.add('input__wrapper__hovered');
});

inputPeople.addEventListener('mouseout', function () {
  inputWrapperPeople.classList.remove('input__wrapper__hovered');
});

inputPeople.addEventListener('focus', function () {
  if (!inputPeople.classList.contains('error'))
    inputWrapperPeople.classList.add('input__wrapper__focused');
});

inputPeople.addEventListener('blur', function () {
  inputWrapperPeople.classList.remove('input__wrapper__focused');
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Event listeners for RESET BUTTON
btnReset.addEventListener('click', function () {
  if (btnReset.classList.contains('reset__enabled')) init();
});

btnReset.addEventListener('mouseover', function () {
  if (btnReset.classList.contains('reset__enabled'))
    btnReset.classList.add('reset__hovered');
});

btnReset.addEventListener('mouseout', function () {
  btnReset.classList.remove('reset__hovered');
});
