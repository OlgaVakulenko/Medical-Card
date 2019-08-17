/**
 * Created on 14.08.2019.
 */


const mainButton = document.querySelector('.create-visit');//главная кнопка "Создать визит"
const select = document.querySelector('.select');// Выбор врача
const visitorName = document.getElementById('fullname-input');//ФИО пациента
const target = document.getElementById('target-input');//Цель визита
const nextVisit = document.getElementById('next-visit-input');//Дата следующего визита
const illnessList = document.getElementById('illness-input');//Список перенесенных заболеваний
const lastVisit = document.getElementById('last-visit-input');//Дата последнего визита
const weighClient = document.getElementById('weight-input');//Индекс массы тела
const ageClient = document.getElementById('age-input');//Возраст пациента
const comment = document.getElementById('comment-input');//Комментарии
const modalButton = document.querySelector('.btn-modal');//Кнопка "Создать визит" на модальном окне
const modalCrossButton = document.querySelector('.cross'); //кнопка-крестик на модальном окне
const pressureValue = document.getElementById('pressure-input'); //давление
const modalWindow = document.querySelector('.modal'); //Модальное окно
const inputFields = document.querySelectorAll('form>input'); //Инпуты


// console.log(mainButton);
// console.log(select);
// console.log(visitorName);
// console.log(target);
// console.log(nextVisit);
// console.log(illnessList);
// console.log(lastVisit);
// console.log(weighClient);
// console.log(ageClient);
// console.log(comment);
// console.log(modalButton);
// console.log(modalCrossButton);
// console.log(pressureValue);

let visits = [];

function addVisit(visitObj) {
    visits.push(visitObj);
    console.log(visits);
}

function removeVisit() {
    // myArray.findIndex(x => x.id === '45');
}

function checkVisits(visits) {
    const noVisitsText = document.querySelector('.no-visit');
    if (visits.length === 0) {
        noVisitsText.classList.add('active');
    } else {
        noVisitsText.classList.remove('active');
    }
}

window.onload = checkVisits(visits);


class Visit {
    constructor(doctor, visitDate, fullName, visitTarget, visitID, comments) {
        this._doctor = doctor;
        this._visitDate = visitDate;
        this._fullname = fullName;
        this._visitTarget = visitTarget;
        this._visitId = visitID;
        this._comments = comments;
        this._newCard = document.createElement('div');
        this._showMoreButton = document.createElement('button');
        this._p = document.createElement('p');
        this._span = document.createElement('span');
    }

    createNewCard() {
        this._p.className = 'name-of-field';

        let  nameField = this._p.cloneNode(),
             doctorField = this._p.cloneNode(),
             visitField = this._p.cloneNode();

        this._newCard.setAttribute('data-visitId', this._visitId);
        this._newCard.className = 'visiting-card';
        this._showMoreButton.className = 'show-more ';
        this._span.className = 'close';
        this._span.innerHTML = '<i class="fas fa-times"></i>';
        this._showMoreButton.innerText = "Показать больше";


        // nameField.insertAdjacentHTML('afterbegin', `ФИО:&nbsp${this._fullname}`);
        nameField.innerHTML = `ФИО:&nbsp${this._fullname}`;
        doctorField.innerHTML = `Врач:&nbsp${this._doctor}`;
        visitField.innerHTML = `Дата визита:&nbsp${this._visitDate}`;

        this._newCard.appendChild(this._span);
        this._newCard.appendChild(nameField);
        this._newCard.appendChild(doctorField);
        this._newCard.appendChild(visitField);
        this._newCard.appendChild(this._showMoreButton);
        return this._newCard;
    }
}

class VisitToCardiologist extends Visit {
    constructor(doctor, visitDate, fullName, visitTarget, visitID, pressure, weightIndex, age, illnesses, comments) {
        super(doctor, visitDate, fullName, visitTarget, visitID, comments);
        this._pressure = pressure;
        this._weightIndex = weightIndex;
        this._age = age;
        this._illnesses = illnesses;


    }
  showMore() {
      this._showMoreButton.addEventListener('click', () => {
          this._showMoreButton.style.display = 'none';
         let  targetField = this._p.cloneNode(),
              pressureField = this._p.cloneNode(),
              weightField = this._p.cloneNode(),
              illnessesField = this._p.cloneNode(),
              ageField = this._p.cloneNode(),
              comments = this._p.cloneNode();

          targetField.innerHTML = `Цель визита:&nbsp${this._visitTarget}`;
          pressureField.innerHTML = `Давление:&nbsp${this._pressure}`;
          weightField.innerHTML = `Вес:&nbsp${this._weightIndex}`;
          illnessesField.innerHTML = `Болезни:&nbsp${this._illnesses}`;
          ageField.innerHTML = `Возраст:&nbsp${this._age}`;
          comments.innerHTML = `Комментарии:&nbsp${this._comments}`;

          this._newCard.insertBefore(ageField, this._showMoreButton);
          this._newCard.insertBefore(illnessesField, this._showMoreButton);
          this._newCard.insertBefore(weightField, this._showMoreButton);
          this._newCard.insertBefore(pressureField, this._showMoreButton);
          this._newCard.insertBefore(targetField, this._showMoreButton);
          this._newCard.insertBefore(comments, this._showMoreButton);

      })
  }

}

class VisitToDentist extends Visit {
    constructor(doctor, visitDate, fullName, visitTarget, visitID, lastVisitDate, comments) {
        super(doctor, visitDate, fullName, visitTarget, visitID, comments);
        this._lastVisitDate = lastVisitDate;
    }

    showMore() {
        this._showMoreButton.addEventListener('click', () => {
            this._showMoreButton.style.display = 'none';
            let targetField = this._p.cloneNode(),
                lastVisitDateField = this._p.cloneNode(),
                comments = this._p.cloneNode();

            targetField.innerHTML = `Цель визита:&nbsp${this._visitTarget}`;
            lastVisitDateField.innerHTML = `Дата последнего визита:&nbsp${this._lastVisitDate}`;
            comments.innerHTML = `Комментарии:&nbsp${this._comments}`;
            this._newCard.insertBefore(lastVisitDateField, this._showMoreButton);
            this._newCard.insertBefore(targetField, this._showMoreButton);
            this._newCard.insertBefore(comments, this._showMoreButton);
        })
    }
}
class VisitToTherapist extends Visit {
    constructor(doctor, visitDate, fullName, visitTarget, visitID, age, comments) {
        super(doctor, visitDate, fullName, visitTarget, visitID, comments);
        this._age = age;
    }
    showMore() {
        this._showMoreButton.addEventListener('click', () => {
            this._showMoreButton.style.display = 'none';
            let targetField = this._p.cloneNode(),
                ageField = this._p.cloneNode(),
                comments = this._p.cloneNode();

            targetField.innerHTML = `Цель визита:&nbsp${this._visitTarget}`;
            ageField.innerHTML = `Возраст:&nbsp${this._age}`;
            comments.innerHTML = `Комментарии:&nbsp${this._comments}`;
            this._newCard.insertBefore(ageField, this._showMoreButton);
            this._newCard.insertBefore(targetField, this._showMoreButton);
            this._newCard.insertBefore(comments, this._showMoreButton);
        })
    }
}

mainButton.addEventListener('click', function () {
    modalWindow.classList.add('active');
});
select.addEventListener('change', function () {
    inputFields.forEach(function (element) {
        element.style.display = 'none';
    });
    switch (select.selectedIndex) {
        case(0):
            target.style.display = 'block';
            pressureValue.style.display = 'block';
            weighClient.style.display = 'block';
            illnessList.style.display = 'block';
            ageClient.style.display = 'block';
            visitorName.style.display = 'block';
            nextVisit.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = 'inline-block';
            break;
        case(1):
            target.style.display = 'block';
            lastVisit.style.display = 'block';
            visitorName.style.display = 'block';
            nextVisit.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = ' inline-block';
            break;
        case(2):
            visitorName.style.display = 'block';
            nextVisit.style.display = 'block';
            ageClient.style.display = 'block';
            target.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = 'inline-block';
            break;
    }
});

modalCrossButton.addEventListener('click', function () {
    modalWindow.classList.remove('active')
});

modalButton.addEventListener('click', function (e) {
    e.preventDefault();
    let selectIndex = select.selectedIndex,
        doctor = select.options[selectIndex].value,
        visitDate = nextVisit.value,
        visitTarget = target.value,
        fullName = visitorName.value,
        illnesses = illnessList.value,
        lastVisitDate = lastVisit.value,
        age = ageClient.value,
        weightIndex = weighClient.value,
        pressure = pressureValue.value,
        commentText = comment.value,
        visitID = Date.now(),
        board = document.querySelector('.board-container'),
        newVisit,
        newCard;

    switch (selectIndex) {
        case(0):
            newVisit = new VisitToCardiologist(doctor, visitDate, fullName, visitTarget, visitID, pressure, weightIndex, age, illnesses, commentText);
            newCard = newVisit.createNewCard();
            board.appendChild(newCard);
            newVisit.showMore();

            break;
        case(1):
            newVisit = new VisitToDentist(doctor, visitDate, fullName, visitTarget, visitID, lastVisitDate);
            newCard = newVisit.createNewCard();
            board.appendChild(newCard);
            newVisit.showMore();
            break;
        case(2):
            newVisit = new VisitToTherapist(doctor, visitDate, fullName, visitTarget, visitID, age);
            newCard = newVisit.createNewCard();
            board.appendChild(newCard);
            newVisit.showMore();
            break;


    }
    addVisit(newVisit);
    console.log(newVisit);
    checkVisits(visits);
    modalWindow.classList.remove('active');
});


// const newVisit = new Visit('Therapist','22.08','Татьяна Фетисова','плановый осмотр');
// console.log(newVisit);
// const newVisitDentist = new VisitToDentist('Dentist','10.08','Vasya','plomba','9.07');
// const newVisitCardiologist = new VisitToCardiologist('cardiologist','12/09','serio Karelli','heart','100/60', '2', 'none');
// console.log(newVisitDentist);
// newVisitDentist.addVisit();
// newVisitCardiologist.addVisit();
