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
    $('#plusBtn').addClass('highlight')
}

function setMinus() {
    console.log('clicked minus');
    operator = '-';
    unhighlight();
    $('#minusBtn').addClass('highlight')
}

function setTimes() {
    console.log('clicked times');
    operator = '*';
    unhighlight();
    $('#timesBtn').addClass('highlight')
}

function setDiv() {
    console.log('clicked div');
    operator = '/';
    unhighlight();
    $('#divBtn').addClass('highlight')
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
        $('#domResult').empty()
        $('#domResult').addClass('red')
        $('#domResult').append('Please complete both inputs and select an operator')
    }
}

function historyAppend() {
    $('#historyList').empty();
    $.ajax({
        url: '/calc',
        type: 'GET'
    }).then(function (calcHistory) {
        console.log('history is', calcHistory)
        $('#domResult').empty()
        $('#domResult').removeClass('red')
        $('#domResult').append(calcHistory[0].result)
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
    $('#plusBtn').removeClass('highlight');
    $('#minusBtn').removeClass('highlight');
    $('#timesBtn').removeClass('highlight');
    $('#divBtn').removeClass('highlight');
}