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
const inputFields = document.querySelectorAll('form>input'); //Инпуты

//
// console.log(mainButton);
// console.log(select);
// console.log(visiterName);
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
let visits=[];
function checkVisits(visits) {
    const noVisitsText = document.querySelector('.no-visit');
    if(visits.length===0){
        noVisitsText.classList.add('active');
    }else{
        noVisitsText.classList.remove('active');
    }
}
window.onload = checkVisits(visits);


class Visit {
    constructor(doctor,visitDate,fullname,visitTarget){
        this._doctor = doctor;
        this._visitDate = visitDate;
        this._fullname = fullname;
        this._visitTarget = visitTarget;
           }
    addVisit(){
        visits.push(this);
        console.log(visits);

    }
}
class VisitToCardiologist extends Visit{
    constructor(doctor,visitDate,fullname,visitTarget,preassure, weightIndex,age, illnesses){
        super(doctor,visitDate,fullname,visitTarget);
        this._preassure = preassure;
        this._weightIndex = weightIndex;
        this._age = age;
        this._illnesses = illnesses;
    }

}
class VisitToDentist extends Visit{
    constructor(doctor,visitDate,fullname,visitTarget,lastVisitDate){
        super(doctor,visitDate,fullname,visitTarget);
        this._lastVisitDate = lastVisitDate;
    }
}
class VisitToTherapist extends Visit{
    constructor(doctor,visitDate,fullname,visitTarget,age){
        super(doctor,visitDate,fullname,visitTarget);
        this._age = age;
    }
}
mainButton.addEventListener('click',function () {
    modalWindow.classList.add('active');
});
select.addEventListener('change',function () {
    inputFields.forEach(function (element) {
        element.style.display = 'none';
    });
    switch (select.selectedIndex) {
        case(0):
            target.style.display = 'block';
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
modalCrossButton.addEventListener ('click',function () {
    modalWindow.classList.remove('active')
});

modalButton.addEventListener('click', function (e) {
    e.preventDefault();
    let selectIndex = select.selectedIndex,
        doctor = select.options[selectIndex].value,
        visitDate = nextVisit.value,
        visitTarget = target.value,
        fullname = visitorName.value,
        illnesses = illnessList.value,
        lastVisitDate = lastVisit.value,
        age = ageClient.value,
        weightIndex = weighClient.value,
        pressure = pressureValue.value,
        commentText = comment.value,
        newVisit;
    switch (selectIndex) {
        case(0):
            newVisit = new VisitToCardiologist(doctor,visitDate,fullname,visitTarget, pressure, weightIndex,age, illnesses);
           break;
        case(1):
            newVisit = new VisitToDentist(doctor,visitDate,fullname,visitTarget,lastVisitDate);
            break;
        case(2):
            newVisit = new VisitToTherapist(doctor,visitDate,fullname,visitTarget,age);
          break;


    }
    modalWindow.classList.remove('active');
    newVisit.addVisit();
    console.log(newVisit);
});

mainButton.addEventListener('click',function () {
    modalWindow.classList.add('active');
});
select.addEventListener('change',function () {
    inputFields.forEach(function (element) {
        element.style.display = 'none';
    });
    switch (select.selectedIndex) {
        case(0):
            target.style.display = 'block';
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
modalCrossButton.addEventListener ('click',function () {
    modalWindow.classList.remove('active')
});



// const newVisit = new Visit('Therapist','22.08','Татьяна Фетисова','плановый осмотр');
// console.log(newVisit);
// const newVisitDentist = new VisitToDentist('Dentist','10.08','Vasya','plomba','9.07');
// const newVisitCardiologist = new VisitToCardiologist('cardiologist','12/09','serio Karelli','heart','100/60', '2', 'none');
// console.log(newVisitDentist);
// newVisitDentist.addVisit();
// newVisitCardiologist.addVisit();
