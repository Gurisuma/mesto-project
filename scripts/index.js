//Переменные

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const popups = [profilePopup, cardPopup, imagePopup];

const openProfButton = document.querySelector('.profile__edit-button');
const openCardButton = document.querySelector('.profile__add-button');
const openImButtons = document.querySelectorAll('.card__image');

const closeButtons = document.querySelectorAll('.popup__close');


const profileFormElement = document.querySelector('[name=edit-profile]');
const profileInfo = document.querySelector('.profile__info');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;


const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const cardFormElement = document.querySelector('[name=new-place]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');


//Анимации

popups.forEach(function (item) {
    item.classList.add('popup_is-animated');
});


//Открытие и закрытие

function openModal(popup) {    
    popup.classList.add('popup_is-opened');
};

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

    cardNameInput.value = '';
    urlInput.value = '';

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;  
};


openProfButton.addEventListener('click', function () {
    openModal(profilePopup);
}); 

openCardButton.addEventListener('click', function () {
    openModal(cardPopup);
}); 


closeButtons.forEach(function (item) {
    item.addEventListener('click', function () {
        popups.forEach(function (item) {
            closeModal(item);
        })
    }); 
});

openImButtons.forEach(function (item) {
    item.addEventListener('click', function () {
        openModal(imagePopup);
    });
});


//Изменение информации профиля

function editProfile (nameValue, jobValue) {
    profileInfo.querySelector('.profile__title').textContent = nameValue;
    profileInfo.querySelector('.profile__description').textContent = jobValue; 

    profileInfo.replaceWith(profileInfo);
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    editProfile(nameInput.value, jobInput.value);

    closeModal(profilePopup);
};
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


//Создание карточек

function createCard() {
    const cardTemplate = document.querySelector('#card-template').content;
    return cardTemplate
}; 


initialCards.forEach(function (element) {
    createCard();
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    
    actions(cardElement);
    placesList.append(cardElement);
});

function addCard (nameValue, linkValue) {
    createCard();
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue; 

    actions(cardElement);
    placesList.prepend(cardElement);
};

function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    addCard(cardNameInput.value, urlInput.value);

    cardNameInput.value = '';
    urlInput.value = '';

    closeModal(cardPopup);
};
cardFormElement.addEventListener('submit', handleCardFormSubmit); 


//Функционал карточек

function actions (i) {
    i.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_is-active'); 
    }); 

    i.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        card = evt.target.parentElement;
        card.remove();
    });

    i.querySelector('.card__image').addEventListener('click', function (evt) {
        openModal(imagePopup);
        openImage = document.querySelector('.popup_type_image');
        neddedInfo = evt.target.parentElement;

        openImage.querySelector('.popup__image').src = neddedInfo.querySelector('.card__image').src;
        openImage.querySelector('.popup__caption').textContent = neddedInfo.querySelector('.card__title').textContent;

    });
};