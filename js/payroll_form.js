const salary = document.querySelector('#salary')
            const output = document.querySelector('.salary-output')
            output.textContent = salary.value
            salary.addEventListener('input', function(){
                output.textContent = salary.value
})

const text = document.querySelector("#name")
const textError = document.querySelector(".text-error")
const nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$")
text.addEventListener("input", function () {
    if (nameRegex.test(text.value)) textError.textContent = ""
    else textError.textContent = "Name is Incorrect"
});

const createEmpPayroll = () => {
    let employee = new EmployeePayrollData()
    employee.name= document.getElementById("name").value
    employee.picture = document.querySelector('input[name = profile]:checked').value
    employee.gender = document.querySelector('input[name = gender]:checked').value
    employee.department =document.querySelector('input[name = department]:checked').value
    employee.salary = document.getElementById("salary").value
    var day = document.getElementById("day").value
    var month = document.getElementById("month").value
    var year = document.getElementById("year").value
    employee.note = document.getElementById("notes").value
    employee.startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
              
    alert("Thank you. Your data is saved" + employee.toString())
    return employee
}

function createAndUpdateStorage(empPayrollData){
    let empPayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"))
    if(empPayrollList != undefined){
        empPayrollList.push(empPayrollData)
    }
    else{
        empPayrollList = [empPayrollData]
    }
    alert(empPayrollList.toString())
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList))
}

const save = () => {
    try{
        let empPayrollData = createEmpPayroll()
        createAndUpdateStorage(empPayrollData)
    }
    catch(e){
        return
    }
}

