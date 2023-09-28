'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Elements
const tipBtns = document.querySelectorAll('.btn--tip');
const btnReset = document.querySelector('.btn--reset');

const labelErrorBill = document.querySelector('.label__error--bill');
const labelErrorPeople = document.querySelector('.label__error--ppl');

const inputWrapperBill = document.querySelector('.input__wrapper--bill');
const inputWrapperPeople = document.querySelector('.input__wrapper--ppl');

const inputBill = document.querySelector('.input--bill');
const inputPeople = document.querySelector('.input--ppl');
const inputCustom = document.querySelector('.input--custom');

const amountTip = document.querySelector('.amount__value--tip');
const amountTotal = document.querySelector('.amount__value--total');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Functions and Variables
let bill, tip, ppl;

const validateData = function () {
  // Checking if all required data have been inputed
  if (bill === '' || tip === '' || ppl === '') {
    if (bill === '') clearError('bill');
    if (tip === '') clearError('tip');
    if (ppl === '') clearError('ppl');
    disableSectionResult();
  } else if (bill === '0' || tip === '0' || ppl === '0') {
    if (bill === '0') addError('bill');
    if (tip === '0') addError('tip');
    if (ppl === '0') addError('ppl');
    disableSectionResult();
  } else {
    clearError('all');
    calcDisplayAmounts(Number(bill), Number(tip), Number(ppl));
    btnReset.classList.add('reset__enabled');
  }
};

const init = function () {
  // Setting variables to original values
  bill = '';
  tip = '';
  ppl = '';

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

const addError = function (label) {
  // Checking which element to add ERROR state to
  if (label === 'bill') {
    labelErrorBill.style.opacity = '1';
    inputWrapperBill.classList.add('error');
  }
  if (label === 'tip') {
    inputCustom.classList.add('error');
  }
  if (label === 'ppl') {
    labelErrorPeople.style.opacity = '1';
    inputWrapperPeople.classList.add('error');
  }
};

const clearError = function (label) {
  // Checking which element to remove ERROR state from
  if (label === 'all') {
    labelErrorBill.style.opacity = '0';
    inputWrapperBill.classList.remove('error');
    inputCustom.classList.remove('error');
    labelErrorPeople.style.opacity = '0';
    inputWrapperPeople.classList.remove('error');
  }
  if (label === 'bill') {
    labelErrorBill.style.opacity = '0';
    inputWrapperBill.classList.remove('error');
  }
  if (label === 'tip') {
    inputCustom.classList.remove('error');
  }
  if (label === 'ppl') {
    labelErrorPeople.style.opacity = '0';
    inputWrapperPeople.classList.remove('error');
  }
};

const disableSectionResult = function () {
  // Setting only result section to default state
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
  bill = inputBill.value;
  validateData();
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
      tip = '';
      validateData();
    } else if (inputCustom.value === '') {
      tipBtns.forEach(btn => btn.classList.remove('tip__selected'));
      btn.classList.remove('tip__hovered');
      btn.classList.add('tip__selected');
      tip = btn.value;
      validateData();
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
  tip = inputCustom.value;
  validateData();
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
  ppl = inputPeople.value;
  validateData();
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
