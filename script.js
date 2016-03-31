var inputStorage = [''];
var storageIndex = 0;
//document ready function
$(document).ready(function () {
    $('.num').click(function () {
        console.log('this is ', this);
        storeNum($(this).text());
    });
    $('.ops').click(function () {
        console.log('ops button pressed');
        storeOps($(this).text());
        //doMath();
    });
    $('.equal').click(function () {
        console.log('equals was clicked');
        var temp = inputStorage.length;
        for (var i = 0; i < temp; i++) {
            console.log("input storage at: " + i + "index : " + storageIndex, inputStorage);
            doMath();
        }
        //doMath();
    });
    //clear everything!
    $('.clear_all').click(function () {
        inputStorage = [''];
        storageIndex = 0;
        updateDisplay();
    });
    //clear conditionally!
    $('.clear').click(function () {
        smartClear();
        console.log('inputStorage is :', inputStorage);
    });
});

//get number from button clicked and store in inputStorage array
function storeNum(buttonVal) {
    if (!isNaN(inputStorage[storageIndex])) {
        console.log('store number buttonVal: ', buttonVal);
        inputStorage[storageIndex] += buttonVal;
        console.log('input storage: ', inputStorage);
    }
    else {
        storageIndex++;
        inputStorage[storageIndex] = '';
        inputStorage[storageIndex] = buttonVal;

        console.log('input storage: ', inputStorage);
    }
    updateDisplay();
}

//get operator from button clicked and store in inputStorage array
function storeOps(buttonVal) {
    //console.log('store ops buttonVal: ', buttonVal);
    if (isNaN(inputStorage[storageIndex])) {
        console.log('storage index is: ' + storageIndex);
        console.log('hit the IF!!');
        inputStorage[storageIndex] = '';
        inputStorage[storageIndex] = buttonVal;
    }

    else {
        console.log('hit the else!!!');
        storageIndex++;
        inputStorage[storageIndex] = buttonVal;
    }
    console.log('storage input is: ', inputStorage);
    updateDisplay();
}

var result;

function updateDisplay() {
    var output = '';
    for (var i = 0; i < inputStorage.length; i++) {
        output += inputStorage[i];
    }
    $('#display').text(output);
}

//this will define and sort the operator and number variables
function doMath() {
    var num1, num2, op;
    for (var i = 0; i < inputStorage.length; i++) {
        console.log('value is: ' + parseInt(inputStorage[i]));
        if (isNaN(inputStorage[i])) {
            op = inputStorage[i];
            console.log(op);
        }
        else if (!isNaN(inputStorage[i]) && num1 == undefined) {
            num1 = parseFloat(inputStorage[i]);
            console.log(typeof num1);
        }
        else if (!isNaN(inputStorage[i]) && num2 == undefined) {
            num2 = parseFloat(inputStorage[i]);
            console.log(typeof num2);
        }
    }
    if (num1 != undefined && num2 == 0 && op == '/') {
        $('#display').text('Error');
        inputStorage = [''];
        storageIndex = 0;
        return;
    }
    else if (num1 != undefined && num2 != undefined && op != undefined) {
        var result = calculate(num1, num2, op);
        console.log('result is: ', result);
        //$('#display').text(result);
        inputStorage.unshift(result);
        inputStorage.splice(1, 3);
        //updateDisplay();
        storageIndex = 0;
        $('#display').text(result);
        //updateDisplay();
    }
}

//this will find the operator and do the correct operation
function calculate(num1, num2, op) {
    //result;
    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    }
    return result;
}

//clear 'C' button
function smartClear() {
    //var a = inputStorage.length;
    if (inputStorage.length <= 1) {
        //clear everything in storage array
        console.log('clearing one or all condition reached');
        inputStorage = [''];
        //storageIndex = 0;
        updateDisplay();
    }
    else if (inputStorage[inputStorage.length - 1] == '') {
        //erase last two items in storage array
        console.log('clearing last two items condition reached');
        inputStorage.splice(inputStorage.length - 2, (inputStorage.length - 1));
        storageIndex = 0;
        updateDisplay();
    }
    else {
        //replace last item in storage array with ''
        console.log('replace last item with empty string condition reached');
        inputStorage[inputStorage.length - 1] = '';
        updateDisplay();
    }
}