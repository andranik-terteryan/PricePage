const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.app-header__navigation')
const body = document.body
const header = document.querySelector('.app-header')
const tariffCards = document.querySelectorAll('.tarifs-card')
const windowElement = window;
const currencyElement = document.querySelectorAll('.tariffs-card__currency');
const durationElements = document.querySelectorAll('.tariffs-card__duration');
const amountElemnts = document.querySelectorAll('.tariffs-card__amount');
const content = document.querySelector('.hero-section')
let currentCurrency = "$";
let currentDuration = "Month";

const handleScroll = () => header.classList.toggle('sticky', document.documentElement.scrollTop !== 0);
const showCards = () => tariffCards.forEach(item => item.classList.add('show'));
const daysInThisMonth = () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

const toggleClass = () => {
    hamburger.classList.toggle('open');
    navigation.classList.toggle('show')
    body.classList.toggle('hidden')
    content.classList.toggle('hide')
};

const changeCurrency = () => {
    if (currentCurrency === "$") {
        currentCurrency = "₽";
        updatePrices(80, 'currency');
    } else if (currentCurrency === "₽") {
        currentCurrency = "€";
        updatePrices(0.9, 'currency');
    } else {
        currentCurrency = "$";
        updatePrices(1, 'currency');
    }
    if (currentDuration === "Day") {
        currentDuration = "Month"
        changeDuration()
    }
    currencyElement.forEach(item => {
        item.textContent = currentCurrency;
    });
}

const changeDuration = () => {
    if (currentDuration === "Month") {
        currentDuration = "Day";
        if (currentCurrency === "$") {
            updatePrices(1, 'duration');
        } else if (currentCurrency === "₽") {
            updatePrices(80, 'duration');
        } else {
            updatePrices(0.9, 'duration');
        }
    } else {
        currentDuration = "Month";
        if (currentCurrency === "$") {
            updatePrices(1, 'currency');
        } else if (currentCurrency === "₽") {
            updatePrices(80, 'currency');
        } else {
            updatePrices(0.9, 'currency');
        }
    }
    durationElements.forEach(element => {
        element.textContent = `/${currentDuration}`;
    });
}


const updatePrices = (exchangeRate, mode = null) => {
    const prices = [30, 276, 420];

    prices.forEach((price, index) => {
        const tariffElement = document.getElementsByClassName('tarifs-card')[index];
        const priceElement = tariffElement.querySelector('.tariffs-card__amount');
        let convertedPrice;

        if (mode === 'duration') {
            convertedPrice = Math.round(price * exchangeRate / daysInThisMonth());
        } else {
            convertedPrice = Math.round(price * exchangeRate);
        }
        priceElement.textContent = convertedPrice;
    });
}

currencyElement.forEach(item => {
    item.addEventListener('click', changeCurrency);
});

durationElements.forEach(element => {
    element.addEventListener('click', changeDuration);
});

window.addEventListener('load', showCards);
hamburger.addEventListener('click', toggleClass);
windowElement.addEventListener('scroll', handleScroll);

