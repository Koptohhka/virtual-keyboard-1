(() => {
    //код начинается здеся

    const textInput = document.getElementById('input');
    const keyBoardContainer = document.getElementById('keyboard-container');

    let upperCaseFlag = false;

    function renderKeyboard(classes, data, targetElement) {
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
    renderKeyboard(window.data.CELL_CLASS, window.data.KEYS[0]);

    function toChangeCaseFlag() {
        if (!upperCaseFlag) {
            upperCaseFlag = true;
        } else {
            upperCaseFlag = false;
        }
    }

    function toChangeCase() {
        if (!upperCaseFlag) {
            renderKeyboard(window.data.CELL_CLASS, window.data.KEYS[1]);
        } else {
            renderKeyboard(window.data.CELL_CLASS, window.data.KEYS[0]);
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

    document.addEventListener('mousedown', function (evt) {
        //console.log(evt.target.id);

        if (evt.target.id === 'CapsLock') {
            toChangeCase();
            toChangeCaseFlag();
            //toAddBorder(evt.target.id); //актив манипуляции
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
        toAddBorder(evt.target.id);
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

            console.log(evt);
            toAddBorder(evt.key);
        }
    });
















    /*document.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('keyboard__cell')) {
            evt.target.classList.add('keyboard__cell--active');
        }
    });*/
})()