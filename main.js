'use strict';

/* Подгружаем всех пользователей */
dataUsergeneration();
function dataUsergeneration() {
    /* Создаём прототип конструкцию */
    var usersConstructor = {
        constructor : function (img, lastName, firstName, gender, age, city, description) {
            this.img = img;
            this.lastName = lastName;
            this.firstName = firstName;
            this.gender = gender;
            this.age = age;
            this.city = city;
            this.description = description;
            return this;
        },
        renderUsers: function () {
            console.log('Создали пользователя ', this);
        }
    },
    user_1, user_2, user_3; // пользователи
    
    user_1 = Object.create(usersConstructor).constructor(
        'user.png', // имя картинки
        'Дима',
        'Воробушек',
        'м',
        50, // Возрост
        'Рязань',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.'
    );
    user_2 = Object.create(usersConstructor).constructor(
        'vova.jpg', // имя картинки
        'Вова',
        'Бегунов',
        'м',
        25, // Возрост
        'Лорен',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.'
    );
    user_3 = Object.create(usersConstructor).constructor(
        'katya.jpg', // имя картинки
        'Катя',
        'Клер',
        'ж',
        65, // Возрост
        'Сызрань',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.'
    );

    user_1.renderUsers();
    user_2.renderUsers();
    user_3.renderUsers();
    
    var postDataUsersArr = [user_1, user_2, user_3];

    createInformationBlock(postDataUsersArr);
}

/* Выведем список всех пользователей */
function createInformationBlock(users) {
    var listPage = document.getElementsByClassName('list-page')[0],
        title = document.createElement('div');

    title.className = 'title';
    title.innerText = 'Пользователи';
    listPage.appendChild(title);

    users.forEach(function (i) {
        var createNewBlock = document.createElement('div'),
            imageUser = document.createElement('div'),
            imformationAboutUser = document.createElement('div'),
            editData = document.createElement('div'),
            imgUser = document.createElement('img'),
            lastName = document.createElement('div'),
            firstName = document.createElement('div'),
            gender = document.createElement('div'),
            age = document.createElement('div'),
            city = document.createElement('div'),
            description = document.createElement('div');

        /* Классы */
        imformationAboutUser.className = 'information-about-user';
        editData.className = 'edit-data';
        imageUser.className = 'image-user';
        createNewBlock.className = 'create-new-block'; // задаём класс обёртке
        lastName.className = 'specific-description';
        firstName.className = 'specific-description';
        gender.className = 'specific-description';
        age.className = 'specific-description';
        city.className = 'specific-description';
        description.className = 'specific-description';

        /* Содержимое текста */
        lastName.innerHTML = '<span>Имя</span><input type="text" value="'+ i.lastName +'" placeholder="'+ i.lastName +'">';
        firstName.innerHTML = '<span>Фамилия</span><input type="text" value="'+ i.firstName +'" placeholder="'+ i.firstName +'">';
        gender.innerHTML = '<span>Пол</span><input type="text" value="'+ i.gender +'" placeholder="'+ i.gender +'">';
        age.innerHTML = '<span>Возрост</span><input type="text" value="'+ i.age +'" placeholder="'+ i.age +'">';
        city.innerHTML = '<span>Город</span><input type="text" value="'+ i.city +'" placeholder="'+ i.city +'">';
        description.innerHTML = '<span>Описание:</span><textarea name="" id="">'+ i.description +'</textarea>';
        //---------------------------------
        editData.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
        
        /* Добавляем атрибуты */
        imgUser.setAttribute('src', './'+ i.img);

        imageUser.appendChild(imgUser);
        imformationAboutUser.append(lastName, firstName, gender, age, city, description);
        createNewBlock.append(imageUser, imformationAboutUser, editData);
        listPage.appendChild(createNewBlock);
    });
}