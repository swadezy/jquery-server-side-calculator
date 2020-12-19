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
    operator = '+';
    unhighlight();
    $('#plusBtn').addClass('red')
}

function setMinus() {
    console.log('clicked minus');
    operator = '-';
    unhighlight();
    $('#minusBtn').addClass('red')
}

function setTimes() {
    console.log('clicked times');
    operator = '*';
    unhighlight();
    $('#timesBtn').addClass('red')
}

function setDiv() {
    console.log('clicked div');
    operator = '/';
    unhighlight();
    $('#divBtn').addClass('red')
}

function calcAnswer() {
    //this sends to server
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
        }).then(function (response) {
            // this is where I'll append to history
            console.log(response);
            historyAppend();
        })

    }
    else {
        console.log('please complete all fields and select an operator');

    }
}

function historyAppend() {
    $('#historyList').empty();
    $.ajax({
        url: '/calc',
        type: 'GET'
    }).then(function (calcHistory) {
        console.log('history is', calcHistory)
        for (calc of calcHistory) {
            $('#historyList').append(`
            <li>${calc.integerOne} ${calc.operator} ${calc.integerTwo} = ${calc.result}</li>`
            )
        }
    })
}


function clearInputs() {
    console.log('clicked clear');
    operator = '';
    $('#inputOne').val('');
    $('#inputTwo').val('');
    unhighlight();
}

function unhighlight() {
    $('#plusBtn').removeClass('red');
    $('#minusBtn').removeClass('red');
    $('#timesBtn').removeClass('red');
    $('#divBtn').removeClass('red');
}