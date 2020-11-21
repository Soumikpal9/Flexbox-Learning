let isUpdate = false
let empPayrollObj = {}

window.addEventListener('DOMContentLoaded', (event) => {

    const salary = document.querySelector('#salary')
    const output = document.querySelector('.salary-output')
    if(salary){
      salary.addEventListener('input', function(){
        output.textContent = salary.value
      })
    }
    
    const name = document.querySelector("#name")
    const textError = document.querySelector(".text-error")
    if(name){
      name.addEventListener('input', function(){
        if(name.value.length == 0){
          textError.textContent = ""
          return
        }
        try{
          (new EmployeePayrollData()).name = name.value
          textError.textContent = ""
        }catch(e){
          textError.textContent = e
        }
      })
    }
    
    const startDate = document.querySelector("#startDate")
    const day = document.querySelector("#day")
    const month = document.querySelector("#month")
    const year = document.querySelector("#year")
    const dateError = document.querySelector(".date-error")
    if(startDate){
        startDate.addEventListener("input", function(){
            try{
            new EmployeePayrollData().startDate = new Date( Date.UTC(year.value, month.value - 1, day.value))
             dateError.textContent = ""
           }catch(e){
             dateError.textContent = e
           }
         })
    }

    checkForUpdate()
})
    
const save = (event) => {
  event.preventDefault()
  event.stopPropagation()
    try{
      setEmployeePayrollObject()
      createAndUpdateStorage()
      resetForm()
      window.location.replace(site_properties.home_page)  
    }catch(e){
        return
    }
}
    
function createAndUpdateStorage(){
    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"))
    if(employeeList) {
      let employee = employeeList.find(emp => emp._id == empPayrollObj._id)
      if(!employee) employeeList.push(saveData())
      else {
        const index = employeeList.map(emp => emp._id).indexOf(employee._id)
        employeeList.splice(index, 1, createEmpData(employee._id))
      }
    } 
    else employeeList = [saveData()]
    
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeList))
    alert(employeeList.toString())
}

const createEmpData = (id) => {
  let employee = new EmployeePayrollData()
  if(!id) employee.id = createNewId()
  else employee.id = id
  setEmpPayrollData(employee)
  return employee
}

const setEmpPayrollData = (employee) => {
  try{
    employee.name = employeePayrollObj._name
  }catch(e){
    setTextValue(".text-error", e)
    throw e
  }
  employee.picture = employeePayrollObj._picture
  employee.gender = employeePayrollObj._gender
  employee.department = employeePayrollObj._department
  employee.salary = employeePayrollObj._salary
  employee.note = employeePayrollObj._note
  try{
    employee.startDate = new Date(Date.parse(employeePayrollObj._startDate))
  }catch(e){
    setTextValue(".date-error", e)
    throw e
  }
  alert(employee.toString())
}

const createNewId = () => {
  let empId = localStorage.getItem("EmployeeID")
  empId = !empId ? 1 : (parseInt(empId) + 1).toString()
  localStorage.setItem("EmployeeID", empId)
  return empId
}
    
const getSelectedValues = (property) => {
    let allItems = document.querySelectorAll(property)
    let setItems = []
    allItems.forEach(item => {
    if(item.checked) setItems.push(item.value)
    })
    return setItems
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id)
  element.textContent = value
}
    
function saveData(){
    let employee = new EmployeePayrollData()
    employee.name= document.getElementById("name").value
    employee.picture = document.querySelector('input[name = profile]:checked').value
    employee.gender = document.querySelector('input[name = gender]:checked').value
    employee.department =getSelectedValues('[name=department]')
    employee.salary = document.getElementById("salary").value
    var day = document.getElementById("day").value
    var month = document.getElementById("month").value
    var year = document.getElementById("year").value
    employee.notes = document.getElementById("notes").value
    employee.startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    
    return employee
}
    
const setValue = (id, value) => {
    const element = document.querySelector(id)
    element.value = value
}
    
const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue)
    allItems.forEach(item => {
    item.checked = false
    })
}

const setForm = () => {
     setValue('#name', empPayrollObj._name)
     setSelectedValues('[name=profile]', empPayrollObj._picture)
     setSelectedValues('[name=gender]', empPayrollObj._gender)
     setSelectedValues('[name=department]', empPayrollObj._department)
     setValue('#salary', empPayrollObj._salary)
     let date = stringifyDate(empPayrollObj._startDate).split(" ")
     setValue('#day', date[0])
     setValue('#month', date[1])
     setValue('#year', date[2])
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelector(propertyValue)
  allItems.forEach(item => {
    if(Array.isArray(value)) {
      if(value.includes(item.value)) {
        item.checked = true
      }
    }
    else if(item.value == value){
      item.checked = true
    }
  })
}
    
const resetForm = () => {
    setValue("#name", "")
    unsetSelectedValues("[name=profile]")
    unsetSelectedValues("[name=gender]")
    unsetSelectedValues("[name=department]")
    setValue("#salary", "")
    setValue("#notes", "")
    setValue("#day","1")
    setValue("#month","January")
    setValue("#year", "2020")
}

const checkForUpdate = () => {
  const empPayrollJSON = localStorage.getItem('editEmp')
  isUpdate = empPayrollJSON ? true : false
  if(!isUpdate) return
  empPayrollObj = JSON.parse(empPayrollJSON)
  setForm()
}

const setEmployeePayrollObject = () => {
  empPayrollObj._name = getInputValueById('#name')
  empPayrollObj._picture = getSelectedValues('[name=profile]').pop()
  empPayrollObj._gender = getSelectedValues('[name=gender]').pop()
  empPayrollObj._department = getSelectedValues('[name=department]').pop()
  empPayrollObj._salary = getInputValueById('#salary')
  empPayrollObj._note = getInputValueById('#notes')
  let date = getInputValueById('#day') + " "+ getInputValueById('#month') + " "+ getInputValueById('#year')
  empPayrollObj._startDate = date
}