//event handler that keeps track of contant downloads
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // function summNumbers(a, b) {
  //   return a + b;
  // }

  // const summNumbers2 = function (a, b) {
  //   return a + b;
  // };

  // const summNumbers3 = (a, b) => {
  //   return a + b;
  // };

  // console.log(summNumbers(2, 3));

  // setTimeout(function () {
  //   console.log('Hi!');
  // }, 3000);

  // function animate() {
  //   console.log('Hi!');
  // }
  // setTimeout(animate, 3000);
  // setInterval(animate, 3000);

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');
  const sendButton = document.querySelector('#send');
  const modalDialog = document.querySelector('.modal-dialog');
  const modalTitle = document.querySelector('.modal-title');

  //question and answer object
  const questions = [
    {
      question: 'Какого цвета бургер?',
      answers: [
        {
          title: 'Стандарт',
          url: './image/burger.png',
        },
        {
          title: 'Черный',
          url: './image/burgerBlack.png',
        },
      ],
      type: 'radio',
    },
    {
      question: 'Из какого мяса котлета?',
      answers: [
        {
          title: 'Курица',
          url: './image/chickenMeat.png',
        },
        {
          title: 'Говядина',
          url: './image/beefMeat.png',
        },
        {
          title: 'Свинина',
          url: './image/porkMeat.png',
        },
      ],
      type: 'radio',
    },
    {
      question: 'Дополнительные ингредиенты?',
      answers: [
        {
          title: 'Помидор',
          url: './image/tomato.png',
        },
        {
          title: 'Огурец',
          url: './image/cucumber.png',
        },
        {
          title: 'Салат',
          url: './image/salad.png',
        },
        {
          title: 'Лук',
          url: './image/onion.png',
        },
      ],
      type: 'checkbox',
    },
    {
      question: 'Добавить соус?',
      answers: [
        {
          title: 'Чесночный',
          url: './image/sauce1.png',
        },
        {
          title: 'Томатный',
          url: './image/sauce2.png',
        },
        {
          title: 'Горчичный',
          url: './image/sauce3.png',
        },
      ],
      type: 'radio',
    },
  ];

  let clientWidth = document.documentElement.clientWidth;
  let count = -100;

  //modal window display condition
  if (clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }
  modalDialog.style.top = count + '%';

  //pop-up animation of modal window
  const animateModal = () => {
    modalDialog.style.top = count + '%';
    count += 3;

    if (count < 0) {
      requestAnimationFrame(animateModal);
    } else {
      count = -100;
    }
  };

  //test start function
  const playTest = () => {
    const finalAnswers = [];
    const obj = {};
    //question number variable
    let numberQuestion = 0;
    modalTitle.classList.remove('d-none');
    //rendering answers function
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add(
          'answers-item',
          'd-flex',
          'justify-content-center'
        );
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.appendChild(answerItem);
      });
    };

    //rendering questions function + launch rendering answers function
    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';
      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);
        prevButton.style.visibility = 'visible';
        nextButton.style.visibility = 'visible';
        nextButton.disabled = true;
        sendButton.classList.add('d-none');
      }
    };

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const inputs = [...formAnswers.elements].filter(
        (input) => input.checked || input.id === 'numberPhone'
      );
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value;
        }
      });
      // finalAnswers.push(obj);
    };

    const checkNumber = () => {
      switch (numberQuestion) {
        case 0:
          prevButton.style.visibility = 'hidden';
          break;
        case questions.length:
          nextButton.style.visibility = 'hidden';
          prevButton.style.visibility = 'hidden';
          sendButton.classList.remove('d-none');
          questionTitle.textContent = '';
          modalTitle.classList.add('d-none');
          formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Введите свой номер телефона</label>
            <input type="phone" class="form-control" id="numberPhone">
          </div>
          `;

          const numberPhone = document.getElementById('numberPhone');
          numberPhone.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^0-9+-]/, '');
          });
          break;
        case questions.length + 1:
          formAnswers.textContent = 'Спасибо за пройденный тест!';
          sendButton.classList.add('d-none');

          for (let key in obj) {
            let newObj = {};
            newObj[key] = obj[key];
            finalAnswers.push(newObj);
          }

          setTimeout(() => {
            modalBlock.classList.remove('d-block');
          }, 2000);
          break;
      }
    };

    checkNumber();

    //event handlers for the next and prev buttons
    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      checkNumber();
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
      checkNumber();
    };

    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      checkNumber();
    };
  };

  // console.log(btnOpenModal);
  // console.dir(btnOpenModal);

  // btnOpenModal.onclick = function () {
  //   console.log('firstClick');
  // };

  //event handler to track changes in window width and display/hide the burger menu
  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  //modal window open/close event handler
  burgerBtn.addEventListener('click', () => {
    requestAnimationFrame(animateModal);
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    playTest();
  });

  btnOpenModal.addEventListener('click', () => {
    requestAnimationFrame(animateModal);
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    playTest();
  });

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  });

  document.addEventListener('click', function (event) {
    if (
      !event.target.closest('.modal-dialog') &&
      !event.target.closest('.openModalButton') &&
      !event.target.closest('.burger')
    ) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  });

  formAnswers.addEventListener('click', function (event) {
    if (event.target.closest('input')) {
      nextButton.disabled = false;
    }
  });
});
///////////////////////////////////////////////////
