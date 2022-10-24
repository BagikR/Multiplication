//шукаємо та записуємо в змінні всі необхідні елементи сторінки
let textResult = document.querySelector('.result');
let nextBtn = document.querySelector('input[value="Старт!"]');
let closeBtn = document.querySelector('input[value="Завершити!"]');
let task = document.querySelector('span');
let numInput = document.querySelector('input[type="number"]');
let chkBtn = document.querySelector('input[value="Перевірити"]');
let chkText = document.querySelector('.check');

//Виводимо приклад, рахуємо кліки та записуємо в змінну результат
chkBtn.disabled = true;
numInput.disabled = true;
let clickCount = 0;
function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  let a = 0;
  let b = 0;
  let res;
nextBtn.addEventListener('click', function(){
    numInput.disabled = false;
    a = randomInt(2, 10);
    b = randomInt(1, 10);
    task.innerHTML = `${a} * ${b} = `;
    res = a*b;
    clickCount++;
    nextBtn.value = 'Наступне завдання!';
    nextBtn.disabled = true;
    chkBtn.disabled = false; 
    chkText.innerHTML = '';
    closeBtn.style.display = 'none';
    numInput.value = '';
})

//Перевіряємо введену відповідь, рахуємо правильні відповіді, виводимо результат перевірки та виводимо загальний результат
let countTrue = 0;
let resPercent;
chkBtn.onclick = () =>{
    if (+(numInput.value) === +(res)){
        chkText.innerHTML = `<span style="color: rgb(41, 214, 41)">Вірна відповідь</span>`;
        countTrue++;
    }
    else {
        chkText.innerHTML = `<span style="color: red">Помилка. Правильна відповідь "${res}".</span>`
    }
    chkBtn.disabled = true;
    nextBtn.disabled = false;
    numInput.disabled = true;
    resPercent = parseInt((countTrue / clickCount) * 100);
    textResult.innerHTML = `Загальний рахунок ${resPercent}% (${countTrue} правильних відповідей з ${clickCount})`;
    closeBtn.style.display = 'inline';
}

//Вішаємо на ентер значення кнопки перевірки
numInput.addEventListener('keydown', (e)=>{
    if (e.keyCode === 13){
        e.preventDefault();
        chkBtn.click();
    }
})

//Завершення тестування. Блокуємо всі інпути та виводимо остаточний результат. Пропонуємо перезавантажити сторінку або зачекати 5 секунд до перезавнтаження
closeBtn.onclick = function(){
    textResult.innerHTML = `Ваш остаточний результат: ${resPercent}% (${countTrue} правильних відповідей з ${clickCount})!!!<br>
    <span style="color: green">Перезавантажте сторінку або зачекайте 5 секунд, сторінка перезавнтажиться самостійно.</span>`;
    textResult.style.color = 'red';
    textResult.style.fontWeight = 'bold';
    chkBtn.disabled = true;
    closeBtn.disabled = true;
    nextBtn.disabled = true;
    chkText.innerHTML = '';
    setTimeout(() => {
        location.reload()
    }, 5000);
}
