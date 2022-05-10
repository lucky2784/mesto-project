// переменыые к popup
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
const buttonClose = document.querySelector('.popup__close-icon');
const buttonCloseAdd = popupAdd.querySelector('.popup__close-icon');
const buttonCloseZoom = popupZoom.querySelector('.popup__close-icon');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const popupCards = document.querySelector('.popup__cards');
const popupCardTitle = document.querySelector('.popup__card-title');
const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#about');

const newName = popupAdd.querySelector('#Newname');
const newAbout = popupAdd.querySelector('#Newabout');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__activity');
const formElement = popupEdit.querySelector('.popup__form');
const popupFormAdd = popupAdd.querySelector('.popup__form-add');

//функция открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);

});

buttonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
});

//закрытие попапа , клик
buttonClose.addEventListener('click', function () {
  closePopup(popupEdit);
});

buttonCloseAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

buttonCloseZoom.addEventListener('click', function () {
  closePopup(popupZoom);
});

//функция редактирования профиля
function editProfileInfo(evt) {
  evt.preventDefault(); //отмена стандартного события
  profileAbout.textContent = aboutInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupEdit);
}

//создание информации редактирования
formElement.addEventListener('submit', editProfileInfo);

//добавление кода из массива
const initialCards = [{
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },


];

const cardsContainer = document.querySelector('.photo');
const photoTemplate = document.querySelector('#photo-template').content;

//добавляем функцию  активного лайка
function likeActive(evt) {
  evt.target.classList.toggle('button__heart_active');
}

// работа с темплейт
const createPlaceCard = function (items) {
  const elementsCard = photoTemplate.querySelector('.photo__cards').cloneNode(true);
  const photoImage = elementsCard.querySelector('.photo__image');
  photoImage.src = items.link;
  photoImage.alt = items.name;
  elementsCard.querySelector('.photo__name').textContent = items.name;

  elementsCard.querySelector('.button__heart').addEventListener('click', likeActive);

  elementsCard.querySelector('.button__delete').addEventListener('click', function () {
    elementsCard.remove();
  });

  //раскрытие карточки (клик)
  photoImage.addEventListener ('click', function (){
    popupCards.src = items.link;
    popupCards.alt = items.name;
    popupCardTitle.textContent = items.name;
    openPopup (popupZoom);
  });

  return elementsCard;
};


//функция создания и добавления новой карточки в начале
const newAddCard = function(items){
  cardsContainer.prepend(createPlaceCard(items));
}
// пишем функцию кнопки "Создать" для новой карточки
const addCard = function(evt) {
  evt.preventDefault();
  const items = {};
  items.link = newAbout.value;
  items.name = newName.value;
  newAddCard(items);
  closePopup(popupAdd);
  popupFormAdd.reset();
}

popupFormAdd.addEventListener('submit', addCard);

const cardsList = initialCards.map (function(items) {
  return createPlaceCard(items);
});
cardsContainer.append(...cardsList);



