window.onload = function() {

    let display = document.querySelector('.calculator_display')
    let keys = document.querySelector('.calculator_keys')

    let stack = [0]
    let settings = {
        int: '',
        fract: '',
        dot: '',
        sign: '',
        operation: '',
        stack_operation: ''
    }

    keys.addEventListener('click', function(event) {
        let keyPressed = event.target
        let key = keyPressed.getAttribute('data-action')
        keyProcess(key)
    })


    function keyProcess(key) {
        if (key >= 0 && key <= 9) {
            numberPressed(key)
        } else if (key == 'dot') {
            numberPressed(key)
        } else if (key == 'enter') {
            console.log('enter  pressed')
            stackOperationPressed(key)
        } else if (key == 'add' || key == 'subtract' || key == 'multiply' || key == 'divide' || key == 'percent') {
            console.log('operation key pressed')
            operationPressed(key)
        } else if (key == 'clear') {
            clearPressed()
        } else if (key == 'reset') {
            resetPressed()
        }
    }


    //=================== keys pressed 
    function numberPressed(num) {
        if (settings.operation != '') {
            stack.unshift(0)
            clearDisplay()
        }
        if (settings.stack_operation != '') {
            clearDisplay()
        }

        console.log('key ' + num + ' pressed')
        if (settings.dot == '') {
            if (num == 'dot') {
                if (settings.int == '') {
                    settings.int = '0'
                }
                settings.dot = '.'
            } else {
                settings.int = settings.int + num
            }

        } else {
            if (num != 'dot') {
                settings.fract = settings.fract + num
            }
        }

        buildNumber()
        settings.operation = ''
        settings.stack_operation = ''
    }

    function stackOperationPressed(operation) {
        settings.operation = ''
        settings.stack_operation = operation
        let dispVal = stack[0]

        //process stack operations
        if (operation = 'enter') {
            stack.unshift(dispVal)
        }
    }

    function operationPressed(operation) {
        settings.operation = operation
        settings.stack_operation = ''
        let x, y, result
        if (stack.length < 2) {
            return
        }
        x = stack[0]
        y = stack[1]
        stack.splice(0, 2)
        switch (operation) {
            case 'add':
                result = x + y
                break
            case 'subtract':
                result = y - x
                break
            case 'multiply':
                result = x * y
                break
            case 'divide':
                if (x == 0) {
                    result = 'division by zero'
                } else {
                    result = y / x
                }
                break
            case 'percent':
                result = y / 100 * x
                break
        }

        stack.unshift(result)
        displayValue(result)
    }

    function clearPressed() {
        clearDisplay()
    }

    function resetPressed() {
        reset()
    }
    //===================

    function buildNumber() {

        let numString = settings.sign + settings.int + settings.dot + settings.fract
        displayValue(numString)
        stack[0] = parseFloat(numString)
        displayValue(numString)
    }


    function clearDisplay() {
        stack[0] = 0
        settings.int = ''
        settings.fract = ''
        settings.dot = ''
        settings.operation = ''
        settings.sign = ''
        displayValue(0)
    }

    function reset() {
        clearDisplay()
        stack.splice(0, stack.length)
    }

    function displayValue(val) {
        display.textContent = val

    }

}