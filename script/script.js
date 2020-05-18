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
  const modalDialog = document.querySelector('.modal-dialog');
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

  if (clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }
  modalDialog.style.top = count + '%';

  const animateModal = () => {
    modalDialog.style.top = count + '%';
    count += 3;

    if (count < 0) {
      requestAnimationFrame(animateModal);
    } else {
      count = -100;
    }
  };

  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  const playTest = () => {
    let numberQuestion = 0;
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add(
          'answers-item',
          'd-flex',
          'justify-content-center'
        );
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.appendChild(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';
      questionTitle.textContent = `${questions[indexQuestion].question}`;
      renderAnswers(indexQuestion);
    };

    renderQuestions(numberQuestion);

    const checkNumber = () => {
      if (numberQuestion === 0) {
        prevButton.style.visibility = 'hidden';
      } else {
        prevButton.style.visibility = 'visible';
      }

      if (numberQuestion === questions.length - 1) {
        nextButton.style.visibility = 'hidden';
      } else {
        nextButton.style.visibility = 'visible';
      }
    };

    checkNumber();

    nextButton.onclick = () => {
      numberQuestion++;
      renderQuestions(numberQuestion);
      checkNumber();
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
      checkNumber();
    };
  };

  // console.log(btnOpenModal);
  // console.dir(btnOpenModal);

  // btnOpenModal.onclick = function () {
  //   console.log('firstClick');
  // };

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
});
