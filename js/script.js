(() => {
    const KEYBOARD_METHODS = {
        'CapsLock': true,
        'Shift': true,
        'Control': true,
        'fn': true,
        'Tab': function () {
            textInput.value += '      ';
        },
        'Backspace': function () {
            return textInput.value = textInput.value.slice(0, -1);
        },
        'Alt': true,
        'OS': true,
        'Enter': function() {
            return textInput.value = textInput.value + '\n'
        }
    }

    const textInput = document.getElementById('input');
    const keyBoardContainer = document.getElementById('keyboard-container');

    let upperCaseFlag = false;
    let langFlag = true;

    let currentLanguage = window.data.EN_KEYS;
    localStorage['test'] = currentLanguage;
    //console.log(localStorage['test']);
    //let currentLanguage = localStorage.currentLang;

    function renderKeyboard(classes, data) {
        let cellsArray = [];
        //let activeClass = '';

        classes.forEach((it, i) => {
            //if (activeElement === data[i]) {
            activeClass = 'keyboard__cell--active';
            //}

            let cellItem = `<div id="${data[i]}" class="keyboard__cell ${it}">${data[i]}</div>`;
            cellsArray.push(cellItem);
        })

        let keyboard = `<div class="keyboard">${cellsArray.join('')}</div>`;
        keyBoardContainer.innerHTML = keyboard; //инеримХтмл
    }
    renderKeyboard(window.data.CELL_CLASS, currentLanguage[0]);

    function toChangeLangFlag() {
        if (langFlag) {
            langFlag = false;
        } else {
            langFlag = true;
        }
    }

    function toChangeLang() {
        if (langFlag) {
            currentLanguage = window.data.RU_KEYS;
            //localStorage.setItem('currentLang', window.data.RU_KEYS);
        } else {
            currentLanguage = window.data.EN_KEYS;
            //localStorage.setItem('currentLang', window.data.EN_KEYS);
        }
        renderKeyboard(window.data.CELL_CLASS, currentLanguage[0]);
    }

    function toChangeCaseFlag() {
        if (!upperCaseFlag) {
            upperCaseFlag = true;
        } else {
            upperCaseFlag = false;
        }
    }

    function toChangeCase() {
        if (!upperCaseFlag) {
            renderKeyboard(window.data.CELL_CLASS, currentLanguage[1]);
        } else {
            renderKeyboard(window.data.CELL_CLASS, currentLanguage[0]);
        }
    }

    function toAddBorder(id) {
        let targetElement = document.getElementById(id);

        if (targetElement.id !== 'CapsLock') {
            targetElement.classList.add('keyboard__cell--active');

            function toRemoveBorder() {
                targetElement.classList.remove('keyboard__cell--active');
            }

            document.addEventListener('mouseup', toRemoveBorder);
            document.addEventListener('keyup', toRemoveBorder);
        } else {
            if (upperCaseFlag) {
                targetElement.classList.add('keyboard__cell--active');
            } else {
                targetElement.classList.remove('keyboard__cell--active');
            }
        }
    }

    function toAddletter(targetElement) {
        textInput.value += targetElement.textContent;
    }

    document.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains("keyboard__cell")) {
            if (evt.target.id === 'CapsLock') {
                toChangeCase();
                toChangeCaseFlag();
            }

            if (evt.target.id === 'Shift') {
                toChangeCase();
                toChangeCaseFlag();

                function shiftClickFunction() {
                    toChangeCase();
                    toChangeCaseFlag();
                    document.removeEventListener('mouseup', shiftClickFunction);
                }

                document.addEventListener('mouseup', shiftClickFunction);
            }

            if (evt.target.id === 'Context') {
                toChangeLang();
                toChangeLangFlag();
            }

            toAddBorder(evt.target.id);

            if (KEYBOARD_METHODS[evt.target.id] === undefined) {
                toAddletter(evt.target);
            } else if (typeof KEYBOARD_METHODS[evt.target.id] === 'function') {
                KEYBOARD_METHODS[evt.target.id]();
            }
        }
    });

    document.addEventListener('keydown', function (evt) {
        if (evt.repeat !== true) {
            if (evt.keyCode === 20) {
                toChangeCase();
                toChangeCaseFlag();
            }

            if (evt.keyCode === 16) {
                toChangeCase();
                toChangeCaseFlag();

                function shiftEventFunction(evt) {
                    if (evt.keyCode === 16) {
                        toChangeCase();
                        toChangeCaseFlag();
                        document.removeEventListener('keyup', shiftEventFunction);
                    }
                }

                document.addEventListener('keyup', shiftEventFunction);

            }


            if (((evt.key === 'Alt') && evt.ctrlKey) || ((evt.key === 'Control') && evt.altKey)) {
                toChangeLang();
                toChangeLangFlag();
            }

            toAddBorder(evt.key);
        }
        let targetElement = document.getElementById(evt.key);
        console.log(targetElement);
        if (KEYBOARD_METHODS[targetElement.textContent] === undefined) {
            console.log(true);
            toAddletter(targetElement)
        } else {
            KEYBOARD_METHODS[targetElement.textContent]();
            console.log(1);
        }
    });
})()