console.log('js loaded');

$(onReady);

// click listeners and appends history from server on ready (gives warning in console if no history present on load)
function onReady() {
    console.log('jq loaded');
    let operator = '';
    $('#plusBtn').on('click', setPlus);
    $('#minusBtn').on('click', setMinus);
    $('#timesBtn').on('click', setTimes);
    $('#divBtn').on('click', setDiv);
    $('#equalsBtn').on('click', calcAnswer);
    $('#clearBtn').on('click', clearInputs);
    historyAppend();
}

// these functions set the operator to be sent along with the inputs
function setPlus() {
    console.log('clicked plus');
    operator = '+';
    unhighlight();
    $('#plusBtn').addClass('highlight');
}
function setMinus() {
    console.log('clicked minus');
    operator = '-';
    unhighlight();
    $('#minusBtn').addClass('highlight');
}
function setTimes() {
    console.log('clicked times');
    operator = '*';
    unhighlight();
    $('#timesBtn').addClass('highlight');
}
function setDiv() {
    console.log('clicked div');
    operator = '/';
    unhighlight();
    $('#divBtn').addClass('highlight');
}

// this checks the input fields and operator for completion and sends them to server
function calcAnswer() {
    console.log('clicked equals');
    if ($('#inputOne').val() != '' && $('#inputTwo').val() != '' && operator != '') {
        let objectToSend = {
            integerOne: Number($('#inputOne').val()),
            operator: operator,
            integerTwo: Number($('#inputTwo').val())
        }
        clearInputs();
        console.log('sending', objectToSend);
        $.ajax({
            url: '/calc',
            type: 'POST',
            data: objectToSend
        }).then(function () {
            historyAppend();
        });
    }
    else {
        console.log('please complete all fields and select an operator');
        $('#domResult').empty();
        $('#domResult').addClass('red');
        $('#domResult').append('Please complete both inputs and select an operator');
    };
}

// this receives the calc history from server and appends it to the DOM
function historyAppend() {
    $('#historyList').empty();
    $.ajax({
        url: '/calc',
        type: 'GET'
    }).then(function (calcHistory) {
        console.log('history is', calcHistory);
        $('#domResult').empty();
        $('#domResult').removeClass('red');
        $('#domResult').append(calcHistory[0].result);
        for (calc of calcHistory) {
            $('#historyList').append(`<li>${calc.integerOne} ${calc.operator} ${calc.integerTwo} = ${calc.result}</li>`);
        };
    });
}

// this clears the inputs, operator, and most recent result / error
function clearInputs() {
    console.log('clicked clear');
    operator = '';
    $('#domResult').empty();
    $('#inputOne').val('');
    $('#inputTwo').val('');
    unhighlight();
}

// this removes highlighting from all operators
function unhighlight() {
    $('#plusBtn').removeClass('highlight');
    $('#minusBtn').removeClass('highlight');
    $('#timesBtn').removeClass('highlight');
    $('#divBtn').removeClass('highlight');
}