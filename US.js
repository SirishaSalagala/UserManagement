document.addEventListener("DOMContentLoaded", () => {
    const userTable = document.querySelector("#userTable tbody");
    const userFormModal = document.getElementById("userFormModal");
    const userForm = document.getElementById("userForm");
    const addUserBtn = document.getElementById("addUserBtn");
    const closeModalBtn = document.querySelector(".close");
    const formTitle = document.getElementById("formTitle");

    let users = []; 
    let editUserId = null;

    const renderTable = () => {
        userTable.innerHTML = ""; 
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.department}</td>
                <td>
                    <button class="edit-btn" data-id="${index}">Edit</button>
                    <button class="delete-btn" data-id="${index}">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    };

    const openModal = (isEdit = false) => {
        userForm.reset();
        userFormModal.style.display = "block";
        formTitle.textContent = isEdit ? "Edit User" : "Add User";
    };

    const closeModal = () => {
        userFormModal.style.display = "none";
        editUserId = null;
    };

    const saveUser = (event) => {
        event.preventDefault();

        const user = {
            firstName: userForm.firstName.value,
            lastName: userForm.lastName.value,
            email: userForm.email.value,
            department: userForm.department.value,
        };

        if (editUserId !== null) {
            users[editUserId] = user; 
        } else {
            users.push(user); 
        }

        renderTable();
        closeModal();
    };

    const handleEdit = (id) => {
        const user = users[id];
        userForm.firstName.value = user.firstName;
        userForm.lastName.value = user.lastName;
        userForm.email.value = user.email;
        userForm.department.value = user.department;
        editUserId = id;
        openModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            users.splice(id, 1); // Remove user from array
            renderTable();
        }
    };

    userTable.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const id = event.target.dataset.id;
            handleEdit(id);
        } else if (event.target.classList.contains("delete-btn")) {
            const id = event.target.dataset.id;
            handleDelete(id);
        }
    });

    addUserBtn.addEventListener("click", () => openModal());

    closeModalBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (event) => {
        if (event.target === userFormModal) {
            closeModal();
        }
    });

    userForm.addEventListener("submit", saveUser);

    // Initial render
    renderTable();
});