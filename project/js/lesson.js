// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click',() => {
    if (regExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'OK'
        phoneSpan.style.color = 'green'
    }
    else {
        phoneSpan.innerHTML = 'NOT OK'
        phoneSpan.style.color = 'red'
    }
})

// TAB SLIDER

const tabs = {
    contentBlocks: document.querySelectorAll('.tab_content_block'),
    items: document.querySelectorAll('.tab_content_item'),
    parent: document.querySelector('.tab_content_items'),
    currentIndex: 0,

    hideAll: () => {
        tabs.contentBlocks.forEach((block) => (block.style.display = 'none'));
        tabs.items.forEach((item) => item.classList.remove('tab_content_item_active'));
    },

    show: (index = 0) => {
        tabs.contentBlocks[index].style.display = 'block';
        tabs.items[index].classList.add('tab_content_item_active');
    },

    handleItemClick: (event) => {
        const clickedItem = event.target;
        if (clickedItem.classList.contains('tab_content_item')) {
            tabs.hideAll();
            tabs.show(Array.from(tabs.items).indexOf(clickedItem));
        }
    },

    changeTab: () => {
        tabs.currentIndex = (tabs.currentIndex + 1) % tabs.items.length;
        tabs.hideAll();
        tabs.show(tabs.currentIndex);
    },

    init: () => {
        tabs.hideAll();
        tabs.show();
        tabs.parent.addEventListener('click', tabs.handleItemClick);
        setInterval(tabs.changeTab, 3000); // Изменил на 3 секунды
    },
};

tabs.init();

const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('#btn-get');
const modalClose = document.querySelector('.modal_close');

const toggleModal = (show) => {
    modal.style.display = show ? 'block' : 'none';
    document.body.style.overflow = show ? 'hidden' : '';
};

const openModal = () => {
    toggleModal(true);
};

const closeModal = () => {
    toggleModal(false);
};

setTimeout(openModal, 10000);

modalBtn.onclick = openModal;
modalClose.onclick = closeModal;
modal.onclick = (event) => (event.target === modal) && closeModal;

let modalShown = false;

const scrollCheck = () => {
    if (!modalShown && window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
        openModal();
        modalShown = true;
        window.removeEventListener('scroll', scrollCheck);
    }
};

window.addEventListener('scroll', scrollCheck);

// Currency Converter

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement, type) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('content-type', 'application/json');
        request.send();

        request.onload = () => {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                switch (type) {
                    case 'som':
                        targetElement.value = (element.value / data.usd).toFixed(2);
                        eurInput.value = (element.value / data.eur).toFixed(2);
                        if (element.value === '') {
                            usdInput.value = '';
                            eurInput.value = '';
                        }
                        break;
                    case 'usd':
                        targetElement.value = (element.value * data.usd).toFixed(2);
                        eurInput.value = (element.value * data.usd / data.eur).toFixed(2);
                        if (element.value === '') {
                            somInput.value = '';
                            eurInput.value = '';
                        }
                        break;
                    case 'eur':
                        targetElement.value = (element.value * data.eur).toFixed(2);
                        usdInput.value = (element.value * data.eur / data.usd).toFixed(2);
                        if (element.value === '') {
                            somInput.value = '';
                            usdInput.value = '';
                        }
                        break;
                    default:
                        break;
                }
            } else {
                console.error(`Failed to load converter data. Status: ${request.status}`);
            }
        };

        request.onerror = () => {
            console.error('Error occurred while making the request.');
        };
    };
};

converter(somInput, usdInput, 'som');
converter(usdInput, somInput, 'usd');
converter(eurInput, somInput, 'eur');

// Functionality for the PREV and NEXT buttons

const cards = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

let count = 1;

function loadCardData(cardNumber) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`)
        .then(response => response.json())
        .then(data => {
            cards.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `;
        });
}

function updateCard(direction) {
    count += direction;
    if (count > 200) {
        count = 1;
    } else if (count < 1) {
        count = 200;
    }
    loadCardData(count);
}

loadCardData(count);

btnNext.addEventListener('click', () => updateCard(1));
btnPrev.addEventListener('click', () => updateCard(-1));

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data));
