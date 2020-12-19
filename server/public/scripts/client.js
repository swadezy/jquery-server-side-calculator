console.log('js loaded');

let operator = ''

$(onReady);

function onReady() {
    console.log('jq loaded');
    $('#plusBtn').on('click', setPlus)
    $('#minusBtn').on('click', setMinus)
    $('#timesBtn').on('click', setTimes)
    $('#divBtn').on('click', setDiv)
    $('#equalsBtn').on('click', calcAnswer)
    $('#clearBtn').on('click', clearInputs)
}

function setPlus() {
    console.log('clicked plus');
    operator = 'plus';
    unhighlight();
    $('#plusBtn').addClass('red')
}

function setMinus() {
    console.log('clicked minus');
    operator = 'minus';
    unhighlight();
    $('#minusBtn').addClass('red')
}

function setTimes() {
    console.log('clicked times');
    operator = 'times';
    unhighlight();
    $('#timesBtn').addClass('red')
}

function setDiv() {
    console.log('clicked div');
    operator = 'div';
    unhighlight();
    $('#divBtn').addClass('red')
}

function calcAnswer() {
    //this sends to server
    console.log('clicked equals');

}

function clearInputs() {
    console.log('clicked clear');
    operator = '';
    $('#inputOne').val('');
    $('#inputOne').val('');
    unhighlight();
}

function unhighlight() {
    $('#plusBtn').removeClass('red');
    $('#minusBtn').removeClass('red');
    $('#timesBtn').removeClass('red');
    $('#divBtn').removeClass('red');
}