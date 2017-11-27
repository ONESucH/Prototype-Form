'use strict';
/* Счетчик для Id в Local Storage */
var counter = 0;

/* Подгружаем всех пользователей */
dataUsergeneration();

function dataUsergeneration() {
    //localStorage.clear();  // чистим Local Storage чтобы небыло конфликтов с ID
    /* Создаём прототип конструкцию */
    var usersConstructor = {
            constructor: function (img, lastName, firstName, gender, age, city, description) {
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
                console.log('Создали пользователей ', this);
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

    // Отправляем на сохранение в Local Storage 
    // !Warning - Записываем по одному объекту т.к. устанавливаем ID для каждого JSON Файла
    createJsonFiles(user_1);
    createJsonFiles(user_2);
    createJsonFiles(user_3);
    
    // отправляем блоки на создание формы
    createInformationBlock([user_1, user_2, user_3]);
}

/* Выведем список всех пользователей */
function createInformationBlock(users) {
    var listPage = document.getElementsByClassName('list-page')[0],
        title = document.createElement('div'),
        idBlock = 0;

    title.className = 'title';
    title.innerText = 'Пользователи';
    listPage.appendChild(title);

    users.forEach(function (item, i) { // item - объект пользователя
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

        idBlock = i;

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
        lastName.innerHTML = '<span>Имя</span><input onchange="changeValue(this);" type="text" value="' + item.lastName + '" placeholder="' + item.lastName + '" disabled>';
        firstName.innerHTML = '<span>Фамилия</span><input onchange="changeValue(this);" type="text" value="' + item.firstName + '" placeholder="' + item.firstName + '" disabled>';
        gender.innerHTML = '<span>Пол</span><input onchange="changeValue(this);" type="text" value="' + item.gender + '" placeholder="' + item.gender + '" disabled>';
        age.innerHTML = '<span>Возрост</span><input onchange="changeValue(this);" type="text" value="' + item.age + '" placeholder="' + item.age + '" disabled>';
        city.innerHTML = '<span>Город</span><input onchange="changeValue(this);" type="text" value="' + item.city + '" placeholder="' + item.city + '" disabled>';
        description.innerHTML = '<span>Описание:</span><textarea onchange="changeValue(this);" disabled>' + item.description + '</textarea>';
        /* Добавляем иконку */
        editData.innerHTML = '<i class="fa fa-pencil" id="' + idBlock + '" aria-hidden="true" onclick="editDataUser(event);"></i>';

        /* Добавляем атрибуты */
        imgUser.setAttribute('src', './' + item.img);
        createNewBlock.setAttribute('id', idBlock);

        imageUser.appendChild(imgUser);
        imformationAboutUser.append(lastName, firstName, gender, age, city, description);
        createNewBlock.append(imageUser, imformationAboutUser, editData);
        listPage.appendChild(createNewBlock);
    });
}

/* Записываем в Local Storage изменённия по id */
function changeValue(event) {
    console.log('value', event);
    console.log('value', event.value);

    var a = localStorage.getItem('0'); // названия ключа
    
    var test = JSON.parse(localStorage.getItem(a));

    console.log('test', test);
    
    
}

/* Cостояние нажатия */
var statusEdit = false;

/* Отслеживаем номер блока по ID, ловим click */
function editDataUser(data) {
    if (!data) return false;
    var newIdActive = data.toElement.id,
        blockSearchById = document.getElementById(newIdActive),
        inputInParentalBlock = blockSearchById.getElementsByTagName('input'),
        iTagInParentalBlock = blockSearchById.getElementsByClassName('fa fa-pencil')[0], // иконка
        textareaInParentalBlock = blockSearchById.getElementsByTagName('textarea')[0],
        replaceIcon = blockSearchById.getElementsByClassName('fa-floppy-o')[0]; // иконка(изменённая)

    console.warn('Чтобы внести изменения в другие блоки - нужно сохранить активные');

    /* Стелим за состояние нажатия */
    if (!statusEdit) {
        iTagInParentalBlock.classList.replace('fa-pencil', 'fa-floppy-o'); // меняем классы
        textareaInParentalBlock.removeAttribute('disabled'); // Один атрибут, поэтому в цикл не добавляем
        textareaInParentalBlock.className = 'active';

        for (var letterActive = 0; letterActive < inputInParentalBlock.length; letterActive++) {
            inputInParentalBlock[letterActive].className = 'active'; // задаём класс тегу
            inputInParentalBlock[letterActive].removeAttribute('disabled'); // находим внутри основного блока все input[disable] и удаляем их
        }

        statusEdit = true;

    } else if (replaceIcon) {
        console.log('Save');
        replaceIcon.classList.replace('fa-floppy-o', 'fa-pencil'); // меняем классы
        textareaInParentalBlock.classList.remove('active'); // Один атрибут, поэтому в цикл не добавляем
        textareaInParentalBlock.setAttribute('disabled', 'disabled'); // находим внутри основного блока все input[disable] и удаляем их

        /* При сохранении ищем изменения и записываем их JSON, удаляем классы, дезакривируем. */
        for (var letter = 0; letter < inputInParentalBlock.length; letter++) {
            inputInParentalBlock[letter].removeAttribute('class');
            inputInParentalBlock[letter].setAttribute('disabled', 'disabled'); // находим внутри основного блока все input[disable] и удаляем их
        }

        statusEdit = false;

    }

}

/* Соберём изменённые данные, запишем в LocalStorage */
function createJsonFiles(Obj) {
    /* JSON Formating */
    var jsonObj = JSON.stringify(Obj),
        eventObj;

    /* запишем в Local Storage */
    localStorage.setItem(String(counter), jsonObj);

    /* парсим JSON по ключу */
    eventObj = JSON.parse(localStorage.getItem(String(counter)));

    counter++;

    return eventObj;
}