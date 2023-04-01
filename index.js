
document.addEventListener('DOMContentLoaded', () => {
    const birthDateElem = document.getElementById('birth-date');
    const birthMonthElem = document.getElementById('birth-month');
    const birthYearElem = document.getElementById('birth-year');
    const form = document.getElementById('form');

    function handleInputEvent(inputElem,minVal ,maxVal, errorMsg) {
        inputElem.addEventListener('input', (e) => {
            inputElem.parentElement.classList.remove('error');
            inputElem.parentElement.classList.remove('empty');
            inputElem.nextElementSibling.innerHTML = '';

            const inputVal = e.target.value;
            if (inputVal < minVal || inputVal > maxVal) {
                inputElem.parentElement.classList.add('error');
                inputElem.nextElementSibling.innerHTML = errorMsg;
            }
        });
    }

    if (birthYearElem) {
        handleInputEvent(birthYearElem,1990 ,new Date().getFullYear(), 'must be in the past');
    }
    if (birthMonthElem) {
        handleInputEvent(birthMonthElem,1 ,12, 'must be a valid month');
    }
    if (birthDateElem) {
        handleInputEvent(birthDateElem,1 ,31, 'must be a valid date');
    }
    let date = [];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (birthDateElem.parentElement.classList.contains('error') || birthMonthElem.parentElement.classList.contains('error') || birthYearElem.parentElement.classList.contains('error')) {
            alert('Please fix the errors in the form');
        }
        const elems = [birthYearElem, birthMonthElem, birthDateElem];
        elems.forEach((elem) => {
            if (!elem.value) {
                elem.nextElementSibling.innerHTML = 'This field is required';
                elem.parentElement.classList.add('empty');
            }
            else {
                date.push(elem.value);
            }
            console.log(date)
        })
        if (date.length === 3) {
            calculateAge(date);
            date = []
        }
    }

    function calculateAge(date) {
        const birthDate = new Date(date[0], date[1] - 1, date[2]);
        const currDate = new Date();
        let d1 = birthDate.getDate();
        let m1 = birthDate.getMonth();
        let y1 = birthDate.getFullYear();

        let d2 = currDate.getDate();
        let m2 = currDate.getMonth();
        let y2 = currDate.getFullYear();

        if (d1> d2) {
            d2 += new Date(y2, m2, 0).getDate();
            m2--;
        }
        if (m1 > m2) {
            m2 += 12;
            y2--;
        }
        const day = d2 - d1;
        const month = m2 - m1;
        const year = y2 - y1;

        document.querySelector('.r-years').innerHTML = year;
        document.querySelector('.r-months').innerHTML = month;
        document.querySelector('.r-days').innerHTML = day;
    }

    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

});
