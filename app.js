const email = document.getElementById('email');
const name = document.getElementById('name');
const message = document.getElementById('message');
const form = document.getElementById('contactForm');

document.querySelector('.mobile-menu-icon').addEventListener('click', e => {
    document.querySelector('.mobile-nav').classList.toggle('hide');
});

name.addEventListener('focusout', validateName);
message.addEventListener('focusout', validateMessage);
email.addEventListener('focusout', validateEmail);

form.addEventListener('submit', (e) => {
    validateMessage();
    validateEmail();
    validateName();

    e.preventDefault();
})

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////  VALIDATOR FUNCTIONS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Validates email
 * @param {} email 
 */
function validateEmail() {
    // check if empty
    if (checkIfEmpty(email)) return;

    if (checkEmail(email)) return;
    return true;
}

/**
 * Validates the name field
 */
function validateName() {
    // check if empty
    if (checkIfEmpty(name)) return;

    // check if it hass only letters
    if (!checkIfOnlyLetters(name)) return;

    // check min xcters
    if (checkLength(name, 3, 50)) return;

    return true;
}

function validateMessage() {
    if (checkIfEmpty(message)) return;

    return true;
}

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////  UTILITY FUNCTIONS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Check if input has only alphabets
 */
function checkIfOnlyLetters(field) {
    const pattern = /^[a-zA-Z ]+$/;

    if (pattern.test(field.value)) {
        // passes the test
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
    }
}

/**
 * Check if a field value is empty
 *
 */
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        // set field invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        // set field valid
        setValid(field);
        return false;
    }
}

/**
 * Check if value is empty
 */
function isEmpty(value) {
    if (value === '') {
        return true;
    }

    return false;
}

/**
 * Check if the field value is btn min and max xcters
 * @param {*} field
 * @param {*} min
 * @param {*} max
 */
function checkLength(field, min, max) {
    if (field.value.length < min) {
        setInvalid(field, `${field.name} must not be less than ${min} characters`);
        return false;
    }

    if (field.value.length > max) {
        setInvalid(field, `${field.name} must not exceed ${max} characters`);
        return false;
    }
}

/**
 * Checks if its a valid email
 */
function checkEmail(field) {
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

    if (pattern.test(field.value.trim())) {
        // passes the test
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must a valid email`);
    }
}
/**
 * Sets a field as invalid and shows the helper text
 * @param {} field
 * @param {*} message
 */
function setInvalid(field, message) {
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.classList.add('error');
}

/**
 * Set a field as valid and removes the error class
 * @param {*} field
 */
function setValid(field) {
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    field.nextElementSibling.classList.remove('error');
}
