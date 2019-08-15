/**
 * Created on 14.08.2019.
 */
class Visit {
    constructor(doctor,visitDate,fullname,visitTarget){
        this._doctor = doctor;
        this._visitDate = visitDate;
        this._fullname = fullname;
        this._visitTarget = visitTarget;
        this._visits = [];
    }
    addVisit(){
        this._visits.push(this);
        console.log(this._visits);

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

const newVisit = new Visit('Therapist','22.08','Татьяна Фетисова','плановый осмотр');
console.log(newVisit);
const newVisitDentist = new VisitToDentist('Dentist','10.08','Vasya','plomba','9.07');
const newVisitCardiologist = new VisitToCardiologist('cardiologist','12/09','serio Karelli','heart','100/60', '2', 'none');
console.log(newVisitDentist);
newVisitDentist.addVisit();
newVisitCardiologist.addVisit();
