//Template literal ES6 feature
const createInnerHtml = {
    const headerHtml ="<th>Image</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";

    const innerHtml = `${headerHtml}
    <tr>
        <td>
            <img src="../assets/profile4.jpg" class="profile" alt="">
        </td>
        <td>Soumik Pal</td>
        <td>Male</td>
        <td>
            <div class="dept-label">Engineer</div>
            <div class="dept-label">Finance</div>
        </td>
        <td>400000</td>
        <td>1 Nov 2020</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../assets/delete_icon.png">
            <img id="1" onclick="update(this)" alt="edit" src="../assets/edit_icon.png">
        </td>
    </tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}

window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});