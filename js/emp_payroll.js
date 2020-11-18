class EmpPayrollData {
    constructor(...params){
        this.name = params[0]
        this.picture = params[1]
        this.gender = params[2]
        this.department = params[3]
        this.salary = params[4]
        this.startDate = params[5]
        this.note = params[6]
    }

    get name(){
        return this.name
    }
    set name(name){
        let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$")
        if(nameRegex.test(name))    this.name = name
        else throw "Name is Incorrect!"
    }

    get picture(){
        return this.picture
    }
    set picture(picture){
        this.picture = picture
    }

    get gender(){
        return this.gender
    }
    set gender(gender){
        this.gender = gender
    }

    get department(){
        return this.department
    }
    set department(department){
        this.department = department
    }

    get salary(){
        return this.salary
    }
    set salary(salary){
        this.salary = salary
    }

    get startDate(){
        return this.startDate
    }
    set startDate(startDate){
        this.startDate = startDate
    }

    get note(){
        return this.note
    }
    set note(note){
        this.note = note
    }

    toString(){
        const options ={ year : "numeric", month : "long", day : "numeric"};
        const empDate = this.startDate === undefined ? "undefined" :
                       this.startDate.toLocaleDateString("en-US", options);
       return "name = "+ this.name + " gender = "+ this.gender +" department = "+ this.department + " salary = "+ this.salary;
    }
}