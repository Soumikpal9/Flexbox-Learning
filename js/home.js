window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml()
})

const getDeptHtml = (deptList) => {
    let deptHtml = ''
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Soumik Pal',
            _gender: 'Male',
            _department: ['Engineer', 'Finance'],
            _salary: '500000',
            _startDate: '1 Nov 2020',
            _note: '',
            _id: new Date().getTime(),
            _picture: '../assets/profile4.jpg'
        },
        {
            _name: 'Sneha Palit',
            _gender: 'Female',
            _department: ['HR', 'Finance'],
            _salary: '500000',
            _startDate: '1 Nov 2020',
            _note: '',
            _id: new Date().getTime(),
            _picture: '../assets/profile3.jpg'
        }
    ]
    return empPayrollListLocal
}

//Template literal ES6 feature
const createInnerHtml = {
    const headerHtml ="<th>Image</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>"
    let empPayrollData = createEmployeePayrollJSON()[0]
    const innerHtml = `${headerHtml}
    <tr>
        <td>
            <img src="${empPayrollData._picture}" class="profile" alt="">
        </td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}{</td>
        <td>${empPayrollData._startDate}</td>
        <td>
            <img name="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/delete_icon.png">
            <img name="${empPayrollData._id}" onclick="update(this)" alt="edit" src="../assets/edit_icon.png">
        </td>
    </tr>
    `
    document.querySelector('#table-display').innerHTML = innerHtml
}