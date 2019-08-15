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


console.log(mainButton);
console.log(select);
console.log(visitorName);
console.log(target);
console.log(nextVisit);
console.log(illnessList);
console.log(lastVisit);
console.log(weighClient);
console.log(ageClient);
console.log(comment);
console.log(modalButton);
console.log(modalCrossButton);

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
document.querySelector('.board-container').addEventListener('change', (e)=>{
    checkVisits(visits);
});
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

// const newVisit = new Visit('Therapist','22.08','Татьяна Фетисова','плановый осмотр');
// console.log(newVisit);
// const newVisitDentist = new VisitToDentist('Dentist','10.08','Vasya','plomba','9.07');
// const newVisitCardiologist = new VisitToCardiologist('cardiologist','12/09','serio Karelli','heart','100/60', '2', 'none');
// console.log(newVisitDentist);
// newVisitDentist.addVisit();
// newVisitCardiologist.addVisit();
