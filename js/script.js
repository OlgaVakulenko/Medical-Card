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
const inputFields = document.querySelectorAll('.field-for-doctors'); //Инпуты
const labelForNextVisit = document.getElementById('label-for-next-visit'); //Лейбл для следующего визита
const labelForLastVisit = document.getElementById('label-for-last-visit'); // Лейбл для последнего визита

let dragStatus = false;
let shiftX;
let shiftY;

let visits=[];
function addVisit(visitObj){
    visits.push(visitObj);
    console.log(visits);
}

function checkVisits(visits) {
    console.log('function check visits apllied');
    const noVisitsText = document.querySelector('.no-visit');
    if(visits.length===0){
        noVisitsText.classList.add('active');
    }else{
        noVisitsText.classList.remove('active');
    }
}

function pushVisitsToLocalStorage(visits) {
    if(visits.length>0){
        let localStorageVisits = JSON.stringify(visits);
        alert(localStorageVisits);
        localStorage.setItem('localVisits',localStorageVisits);
    }else{
        localStorage.clear();
    }
}
window.onload = checkVisits(visits);
window.onload = function(){
    checkLocalStorage();
};
// window.ondragstart = (e) => {
//     e.preventDefault()
// };

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
        this._board = document.querySelector('.board-container');
    }
    get visitId(){
        return this._visitId;
    }
    createNewCard() {
        this._p.className = 'name-of-field';

        let  nameField = this._p.cloneNode(),
             doctorField = this._p.cloneNode(),
             visitField = this._p.cloneNode();

        this._newCard.setAttribute('data-visitId', this._visitId);
        this._newCard.setAttribute('draggable', 'true');
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

    dragManager(){
        let card = this._newCard;
        let board = this._board;
        let dragSrcEl = null;

        console.log(card);
        function getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
        function moveAt(e) {
            card.style.left = e.pageX - shiftX + 'px';
            card.style.top = e.pageY - shiftY + 'px';
        }
        function handleDragStart(e) {
            // this.style.opacity = '0.4';
            dragSrcEl = this;

            e.dataTransfer.effectAllowed = 'move';
            let coords = getCoords(card);
                let shiftX = e.pageX - coords.left;
                let shiftY = e.pageY - coords.top;

                card.style.position = 'absolute';
                document.body.appendChild(card);
                moveAt(e);

                card.style.zIndex = '10';


                    // const cardContainerSize = document.querySelector('.board-container').getBoundingClientRect();
                    // const cardSize = card.getBoundingClientRect();
                    //
                    //     if(cardContainerSize.top <= cardSize.top){
                    //         card.style.left = e.pageX - shiftX + 'px';
                    //         card.style.top = e.pageY - shiftY + 'px';
                    //     }
                    //     else{
                    //         card.style.top = cardContainerSize.top  + 'px';
                    //     }
                    //
                    // if(cardContainerSize.bottom <= cardSize.bottom){
                    //     card.style.top = e.pageY - shiftY + 'px';
                    // }
                    // else{
                    //     card.style.bottom = cardContainerSize.bottom  + 'px';
                    // }
                }
            // e.dataTransfer.setData('text/html', this.innerHTML);

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

            return false;
        }
        function handleDrop(e) {
            // this / e.target is current target element.

            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }
            if (dragSrcEl !== this) {
                // Set the source column's HTML to the HTML of the column we dropped on.
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
            }
            this.style.opacity = '1';

            // See the section on the DataTransfer object.

            return false;
        }


        card.addEventListener('dragstart', handleDragStart, false);
        board.addEventListener('dragover', handleDragOver, false);
        card.addEventListener('drop', handleDrop, false);





        // card.onmousedown = function(e) {
        //
        //     let coords = getCoords(card);
        //     let shiftX = e.pageX - coords.left;
        //     let shiftY = e.pageY - coords.top;
        //
        //     card.style.position = 'absolute';
        //     document.body.appendChild(card);
        //     moveAt(e);
        //
        //     card.style.zIndex = '10';
        //
        //     function moveAt(e) {
        //         card.style.left = e.pageX - shiftX + 'px';
        //         card.style.top = e.pageY - shiftY + 'px';
        //         // const cardContainerSize = document.querySelector('.board-container').getBoundingClientRect();
        //         // const cardSize = card.getBoundingClientRect();
        //         //
        //         //     if(cardContainerSize.top <= cardSize.top){
        //         //         card.style.left = e.pageX - shiftX + 'px';
        //         //         card.style.top = e.pageY - shiftY + 'px';
        //         //     }
        //         //     else{
        //         //         card.style.top = cardContainerSize.top  + 'px';
        //         //     }
        //         //
        //         // if(cardContainerSize.bottom <= cardSize.bottom){
        //         //     card.style.top = e.pageY - shiftY + 'px';
        //         // }
        //         // else{
        //         //     card.style.bottom = cardContainerSize.bottom  + 'px';
        //         // }
        //     }
        //
        //     document.onmousemove = function(e) {
        //         moveAt(e);
        //     };
        //
        //     card.onmouseup = function() {
        //         document.onmousemove = null;
        //         card.onmouseup = null;
        //     };
        //
        // };
        //
        // card.ondragstart = function() {
        //
        //     return false;
        // };
        //
        // function getCoords(elem) {
        //     let box = elem.getBoundingClientRect();
        //     return {
        //         top: box.top + pageYOffset,
        //         left: box.left + pageXOffset
        //     };
        // }
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
function checkLocalStorage() {

    let localStorageVisits = localStorage.getItem('localVisits');
    if (localStorageVisits === null) {
        console.log('No saved Visits on Local Storage');
    } else {
        let parsedVisits = JSON.parse(localStorageVisits);
        console.log('Visits in local storage: ', parsedVisits);
        parsedVisits.forEach(function (savedVisit) {
            let restoredCard;
            switch (savedVisit._doctor) {
                case("кардиолог"):
                    savedVisit = new VisitToCardiologist(savedVisit._doctor, savedVisit._visitDate, savedVisit._fullname, savedVisit._visitTarget, savedVisit._visitId, savedVisit._pressure, savedVisit._weightIndex, savedVisit._age, savedVisit._illnesses, savedVisit._comments);
                    restoredCard = savedVisit.createNewCard();
                    document.querySelector('.board-container').appendChild(restoredCard);
                    savedVisit.showMore();

                    break;
                case("стоматолог"):
                    savedVisit = new VisitToDentist(savedVisit._doctor, savedVisit._visitDate, savedVisit._fullname, savedVisit._visitTarget, savedVisit._visitId, savedVisit._lastVisitDate);
                    restoredCard = savedVisit.createNewCard();
                    document.querySelector('.board-container').appendChild(restoredCard);
                    savedVisit.showMore();
                    break;
                case("терапевт"):
                    savedVisit = new VisitToTherapist(savedVisit._doctor, savedVisit._visitDate, savedVisit._fullname, savedVisit._visitTarget, savedVisit._visitId, savedVisit._age);
                    restoredCard = savedVisit.createNewCard();
                    document.querySelector('.board-container').appendChild(restoredCard);
                    savedVisit.showMore();
                    break;
            }
            savedVisit.dragManager();
            addVisit(savedVisit);
            console.log(savedVisit);
            const closeCards = document.querySelectorAll('.close');
            closeCards.forEach((closeCard)=>
                closeCard.onclick = function(e){
                    removeVisit(e)
                }
            );
            checkVisits(visits);
        });
    }
}
function fieldsReset() {
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
            labelForNextVisit.style.display = 'block';
            nextVisit.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = 'inline-block';
            break;
        case(1):
            target.style.display = 'block';
            labelForLastVisit.style.display = 'block';
            lastVisit.style.display = 'block';
            visitorName.style.display = 'block';
            labelForNextVisit.style.display = 'block';
            nextVisit.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = ' inline-block';
            break;
        case(2):
            visitorName.style.display = 'block';
            labelForNextVisit.style.display = 'block';
            nextVisit.style.display = 'block';
            ageClient.style.display = 'block';
            target.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = 'inline-block';
            break;
    }
}
mainButton.addEventListener('click',function () {
    modalWindow.classList.add('active');
    fieldsReset();
});
select.addEventListener('change',function () {
    fieldsReset();
});
modalCrossButton.addEventListener ('click',function () {
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
            newVisit = new VisitToDentist(doctor, visitDate, fullName, visitTarget, visitID, lastVisitDate, commentText);
            newCard = newVisit.createNewCard();
            board.appendChild(newCard);
            newVisit.showMore();
            break;
        case(2):
            newVisit = new VisitToTherapist(doctor, visitDate, fullName, visitTarget, visitID, age, commentText);
            newCard = newVisit.createNewCard();
            board.appendChild(newCard);
            newVisit.showMore();
            break;
    }

    addVisit(newVisit);

    console.log(newVisit);
    const closeCards = document.querySelectorAll('.close');
    console.log('closeCard',closeCards);
    closeCards.forEach((closeCard)=>
        closeCard.onclick = function(e){
            console.log('closeCard onclick applied');
        removeVisit(e)
    }
    );
    checkVisits(visits);
    modalWindow.reset();
    modalWindow.classList.remove('active');
    newVisit.dragManager();
});
function removeVisit(e) {
    console.log('function remove Visit applied');
    let visitingCardID = e.target.parentNode.parentNode.dataset.visitid;
    console.log('card ID to remove: ', visitingCardID);
    let visitObjToRemove= document.querySelector(`.visiting-card[data-visitid="${visitingCardID}"]`);
    console.log('card in DOM to remove ', visitObjToRemove);
    let removeIndex = visits.findIndex((e)=>{
        return e.visitId === +visitingCardID;

    });
    console.log('index in array to remove',removeIndex);
    visits.splice(removeIndex, 1);
    console.log('visits Array after Remove Visits func',visits);
    checkVisits(visits);
    visitObjToRemove.remove();
}
window.addEventListener('beforeunload',()=>{
    pushVisitsToLocalStorage(visits);
});

