document.addEventListener('DOMContentLoaded', function() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];

    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const loginClose = loginModal.querySelector('.close');
    const registerClose = registerModal.querySelector('.close');

    const userTableBody = document.getElementById('userTableBody');
    const loggedInTableBody = document.getElementById('loggedInTableBody');

    // Открытие и закрытие модальных окон
    loginBtn.onclick = function() {
        loginModal.style.display = 'block';
    }

    registerBtn.onclick = function() {
        registerModal.style.display = 'block';
    }

    loginClose.onclick = function() {
        loginModal.style.display = 'none';
    }

    registerClose.onclick = function() {
        registerModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        } else if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    }

    // Функции для обновления списков пользователей
    function updateUserList() {
        userTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            const loginCell = document.createElement('td');
            loginCell.textContent = user.username;
            const passwordCell = document.createElement('td');
            passwordCell.textContent = user.password;
            row.appendChild(loginCell);
            row.appendChild(passwordCell);
            userTableBody.appendChild(row);
        });
    }

    function updateLoggedInList() {
        loggedInTableBody.innerHTML = '';
        loggedInUsers.forEach(user => {
            const row = document.createElement('tr');
            const loginCell = document.createElement('td');
            loginCell.textContent = user.username;
            const passwordCell = document.createElement('td');
            passwordCell.textContent = user.password;
            row.appendChild(loginCell);
            row.appendChild(passwordCell);
            loggedInTableBody.appendChild(row);
        });
    }

    function saveUsersToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));
    }

    updateUserList();
    updateLoggedInList();

    // Обработка логина
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            loggedInUsers.push({ username, password });
            alert('Вход успешен');
            updateLoggedInList();
            saveUsersToLocalStorage();
            loginModal.style.display = 'none';
        } else {
            alert('Неверные учетные данные');
        }
    });

    // Обработка регистрации
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const repeatPassword = document.getElementById('repeatPassword').value;

        if (password !== repeatPassword) {
            alert('Пароли не совпадают');
            return;
        }

        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Пользователь с таким именем уже существует');
        } else {
            users.push({ username, password });
            alert('Регистрация успешна');
            updateUserList();
            saveUsersToLocalStorage();
            registerModal.style.display = 'none';
        }
    });

    // Удаление всех пользователей
    deleteBtn.onclick = function() {
        users = [];
        loggedInUsers = [];
        alert('Все пользователи удалены');
        updateUserList();
        updateLoggedInList();
        saveUsersToLocalStorage();
    }
});