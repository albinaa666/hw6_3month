

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

const scrollCheck = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
        openModal();
        window.removeEventListener("scroll", scrollCheck);
    }
};

window.addEventListener("scroll", scrollCheck);
