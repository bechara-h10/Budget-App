const budgetInput = document.querySelector('#budget-input')
const productTitleInput = document.querySelector('#product-title-input')
const productCostInput = document.querySelector('#product-cost-input')
const totalBudgetValue = document.querySelector('.total-budget-value')
const expensesValue = document.querySelector('.expenses-value')
const balanceValue = document.querySelector('.balance-value')
const expensesList = document.querySelector('.expenses-list')
const setBudgetBtn = document.querySelector('.budget-container .btn')
const checkAmountBtn = document.querySelector('.expenses-container .btn')
const errorTextBudget = document.querySelector('.budget-container .error-text')
const errorTextExpenses = document.querySelector(
  '.expenses-container .error-text'
)

let expenses = 0
let balance = 0
let budget = 0

setBudgetBtn.addEventListener('click', () => {
  addBudget()
})

checkAmountBtn.addEventListener('click', () => {
  checkAmount(expenses, budget)
})

function addBudget() {
  if (budgetInput.value == '' || budgetInput.value == 0) {
    errorTextBudget.style.display = 'inline-block'
    return
  }
  errorTextBudget.style.display = 'none'
  budget = parseInt(budgetInput.value)
  totalBudgetValue.textContent = budget
  balance = budget
  balanceValue.textContent = balance
  budgetInput.value = ''
}

function checkAmount(expenses, budget) {
  expenses += parseInt(productCostInput.value)
  console.log(expenses)
  if (productTitleInput.value == '' || productCostInput.value == '') {
    errorTextExpenses.textContent = 'Fields cannot be empty'
    errorTextExpenses.style.display = 'inline-block'
    return
  }
  if (expenses > budget) {
    errorTextExpenses.textContent = 'Cannot go over budget'
    errorTextExpenses.style.display = 'inline-block'
    expenses -= parseInt(productCostInput.value)
    return
  }
  errorTextExpenses.style.display = 'none'
  const expenseItem = document.createElement('div')
  expenseItem.classList.add('expense-item')
  const expenseTitle = document.createElement('div')
  expenseTitle.classList.add('expense-title')
  const expenseTitleParagraph = document.createElement('p')
  const expensePrice = document.createElement('div')
  expensePrice.classList.add('expense-price')
  const expensePriceParagraph = document.createElement('p')
  expenseTitleParagraph.textContent = productTitleInput.value
  expensePriceParagraph.textContent = productCostInput.value
  const expenseLogos = document.createElement('div')
  expenseLogos.classList.add('expense-logos')
  expenseLogos.innerHTML = `<i class="fa-solid fa-pen-to-square logo"></i> <i class="fa-solid fa-trash-can logo"></i>`
  expenseTitle.appendChild(expenseTitleParagraph)
  expensePrice.appendChild(expensePriceParagraph)
  expenseItem.append(expenseTitle, expensePrice, expenseLogos)
  expensesList.append(expenseItem)
  productTitleInput.value = ''
  productCostInput.value = ''
  expensesValue.textContent = expenses
  balance = budget - expenses
  balanceValue.textContent = balance
}
