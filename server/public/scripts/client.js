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
    unSelect();
    $('#operatorOutput').addClass('alert alert-secondary');
    operator = '+';
    $('#operatorOutput').append(operator);
}
function setMinus() {
    console.log('clicked minus');
    unSelect();
    $('#operatorOutput').addClass('alert alert-secondary');
    operator = '-';
    $('#operatorOutput').append(operator);
}
function setTimes() {
    console.log('clicked times');
    unSelect();
    $('#operatorOutput').addClass('alert alert-secondary');
    operator = '*';
    $('#operatorOutput').append(operator);
}
function setDiv() {
    console.log('clicked div');
    unSelect();
    $('#operatorOutput').addClass('alert alert-secondary');
    operator = '/';
    $('#operatorOutput').append(operator);
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
        $('#domError').empty();
        $('#domError').addClass('alert alert-danger');
        $('#domError').append('Please complete both inputs and select an operator');
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
        $('#domError').empty();
        $('#domError').removeClass('alert alert-danger');
        $('#domResult').empty();
        if (calcHistory.length > 0) {
            $('#domResult').append(calcHistory[0].result);
            for (calc of calcHistory) {
                $('#historyList').append(`<li>${calc.integerOne} ${calc.operator} ${calc.integerTwo} = ${calc.result}</li>`);
            };
        };
    });
}

// this clears the inputs, operator, and most recent result / error
function clearInputs() {
    console.log('clicked clear');
    operator = '';
    $('#domError').empty();
    $('#domError').removeClass('alert alert-danger');
    $('#inputOne').val('');
    $('#inputTwo').val('');
    unSelect();
}

// this removes highlighting from all operators
function unSelect() {
    operator = '';
    $('#operatorOutput').removeClass('alert alert-secondary')
    $('#operatorOutput').empty();
}