// Select the form and form fields using correct selectors
const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const mobileNumber = document.getElementById('mobileNumber');
const text = document.getElementById('text');

// Event listener for form submission
form.addEventListener('submit', e => {
    e.preventDefault();  // Prevent default submission
    if (validateInputs()) {
        form.submit();   // Submit the form if validation passes
    }
});

// Function to set error message
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

// Function to set success state
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

// Function to validate email format
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Function to validate mobile number format
const isValidMobile = mobileNumber => {
    return /^[0-9]{10}$/.test(String(mobileNumber));
};

// Function to validate inputs and return a boolean indicating form validity
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const mobileNumberValue = mobileNumber.value.trim();
    const textValue = text.value.trim();

    let isValid = true;

    if (usernameValue === '') {
        setError(username, '*Username is required');
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, '*Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, '*Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (mobileNumberValue === '') {
        setError(mobileNumber, '*Mobile number is required');
        isValid = false;
    } else if (!isValidMobile(mobileNumberValue)) {
        setError(mobileNumber, '*Enter a valid 10-digit mobile number');
        isValid = false;
    } else {
        setSuccess(mobileNumber);
    }

    if (textValue === '') {
        setError(text, '*Text is required');
        isValid = false;
    } else {
        setSuccess(text);
    }

    return isValid; // Return true if all inputs are valid, otherwise false
};
