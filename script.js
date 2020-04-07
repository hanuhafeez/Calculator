class Calculator{
    constructor(prevOperTextElt, curOperTextElt)
    {
        this.prevOperTextElt = prevOperTextElt;
        this.curOperTextElt = curOperTextElt;
        this.clear();
    }

    clear(){
         this.currentOperand = '';
         this.previousOperand = '';
         this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
      if(number === '.' && this.currentOperand.includes('.'))  return 
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand == '') return
        if(this.previousOperand != '')
        {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(cur)) return
        switch(this.operation){
            case '+' : computation = prev + cur
                       break
            case '-' : computation = prev - cur
                       break
            case '÷' : computation = prev / cur
                       break
            case '*' : computation = prev * cur
                       break
            
            default :
                    return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        // const floatNumber = parseFloat(number)
        // if(isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')

        const stringNumber = number.toString()
        const intDigit = parseFloat(stringNumber.split('.')[0])
        const decDigit = stringNumber.split('.')[1]
        let intDisplay
        if(isNaN(intDigit)){
            intDisplay = ''
        }
        else{
            intDisplay = intDigit.toLocaleString('en', {maximumFractionDigits : 0})
        }
        if(decDigit != null){
            return `${intDisplay}.${decDigit}`
        }
        else{
            return intDisplay
        }
    }

    updateDisplay(){
        this.curOperTextElt.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null)
        {
        this.prevOperTextElt.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.prevOperTextElt.innerText = ''
        }
    }




}

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const allclearButton = document.querySelector(".allclear");
const prevOperTextElt = document.querySelector("#previous-operand");
const curOperTextElt = document.querySelector("#current-operand");

const calculator = new Calculator(prevOperTextElt, curOperTextElt)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})