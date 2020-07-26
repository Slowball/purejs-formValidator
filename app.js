const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

const prevError = (element, error) => {
    const perent = element.parentElement;
    perent.classList.add('error');
    const small = perent.querySelector('small')
    small.innerText = error;
}

const prevSuccess = (element) => {
    element.parentElement.classList.contains('error') 
    ? element.parentElement.classList.remove('error') || element.parentElement.classList.add('success')
    : element.parentElement.classList.add('success');
}

const checkEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return prevSuccess(email);
    } else {
        return prevError(email, `Email is not valid`)
    }
}

const checkPasswords = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        return prevError(pass2, `Password do not correct`)
    }
}

const checkRequirer = (subArrey) => {
    subArrey.map(el => {
        if (el.value === ''){
            prevError(el, `${getFieldName(el)} is required`);
        } else {
            prevSuccess(el);
        }
    })
}

const checkLength = (el, min, max) => {
    if(el.value.length < min) {
       return prevError(el, `${getFieldName(el)} must be ${min} at least characters`);
    } else if(el.value.length > max) {
        return prevError(el, `${getFieldName(el)} must be less then ${max} characters`);
    } else {
        return prevSuccess(el);
    }
}

const getFieldName = (el) => {
  return el.id.charAt(0).toUpperCase() + el.id.slice(1);
}

form.addEventListener('submit', function(event){
    event.preventDefault();
   
    checkRequirer([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 32);
    checkEmail(email);
    checkPasswords(password, password2);
})