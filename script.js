document.getElementById('guestFormMobile').addEventListener('submit', sendData);
document.getElementById('guestFormTablet').addEventListener('submit', sendData);
document.getElementById('guestFormDesktop').addEventListener('submit', sendData);

function sendData(e) {   
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('#submit-btn');
    const originalText = submitButton.value;
    submitButton.disabled = true;
    submitButton.value = 'Отправка...';
    
    const formData = new FormData(this);

    fetch('https://script.google.com/macros/s/AKfycbzlaG12cptYJFQz3gdjzU4kno9dFnngk-BZQnqeCH8kVGhXKDFjNDpsj2eQbLS-gaNc/exec', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('Спасибо! Ваш ответ записан.');
            this.reset();
        } else {
            alert('Ошибка: ' + data.error);
        }
    })
    .catch(error => {
        alert('Ошибка, попробуйте позже.');
        console.error(error);
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.value = originalText;
    });
};