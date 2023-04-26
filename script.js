const budgetInput = document.querySelector('#budget-input')
const productTitleInput = document.querySelector('#product-title-input')
const productCostInput = document.querySelector('#product-cost-input')
const totalBudgetValue = document.querySelector('.total-budget-value')
const expensesValue = document.querySelector('.expenses-value')
const balanceValue = document.querySelector('.balance-value')
const expensesList = document.querySelector('.all-expenses')
const setBudgetBtn = document.querySelector('.budget-container .btn')
const checkAmountBtn = document.querySelector('.expenses-container .btn')
const errorTextBudget = document.querySelector('.budget-container .error-text')
const errorTextExpenses = document.querySelector(
  '.expenses-container .error-text'
)

setBudgetBtn.addEventListener('click', () => {
  addBudget()
})

checkAmountBtn.addEventListener('click', () => {
  checkAmount()
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
  expenses = 0
}

function checkAmount() {
  if (productTitleInput.value == '' || productCostInput.value == '') {
    errorTextExpenses.textContent = 'Fields cannot be empty'
    errorTextExpenses.style.display = 'inline-block'
    return
  }
  const expenseTitle = productTitleInput.value
  const expensePrice = parseInt(productCostInput.value)
  const allExpenses = [...expensesList.children]
  let expenses = expensePrice
  if (allExpenses.length !== 0) {
    allExpenses.forEach((expense) => {
      expenses += parseInt(expense.children[1].textContent)
    })
  }
  if (expenses > budget) {
    errorTextExpenses.textContent = 'Cannot go over budget'
    errorTextExpenses.style.display = 'inline-block'
    return
  }
  errorTextExpenses.style.display = 'none'
  addToExpensesList(expenseTitle, expensePrice)
  productTitleInput.value = ''
  productCostInput.value = ''
  expensesValue.textContent = expenses
  balance = budget - expenses
  balanceValue.textContent = balance
}

function addToExpensesList(expenseTitle, expensePrice) {
  const expenseItem = document.createElement('div')
  expenseItem.classList.add('expense-item')
  const expenseTitleDiv = document.createElement('div')
  expenseTitleDiv.classList.add('expense-title')
  const expenseTitleParagraph = document.createElement('p')
  const expensePriceDiv = document.createElement('div')
  expensePriceDiv.classList.add('expense-price')
  const expensePriceParagraph = document.createElement('p')
  expenseTitleParagraph.textContent = expenseTitle
  expensePriceParagraph.textContent = expensePrice
  const expenseLogos = document.createElement('div')
  const editButton = document.createElement('button')
  editButton.classList.add('edit-button')
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button')
  expenseLogos.classList.add('expense-logos')
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square logo"></i>`
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can logo"></i>`
  editButton.addEventListener('click', () => editList(expenseItem))
  deleteButton.addEventListener('click', () => deleteFromList(expenseItem))
  expenseLogos.append(editButton, deleteButton)
  expenseTitleDiv.appendChild(expenseTitleParagraph)
  expensePriceDiv.appendChild(expensePriceParagraph)
  expenseItem.append(expenseTitleDiv, expensePriceDiv, expenseLogos)
  expensesList.append(expenseItem)
}

function editList(element) {
  const elementTitle = element.querySelector('.expense-title').textContent
  const elementPrice = parseInt(
    element.querySelector('.expense-price').textContent
  )
  productTitleInput.value = elementTitle
  productCostInput.value = elementPrice
  balance += elementPrice
  balanceValue.textContent = balance
  expensesValue.textContent = parseInt(expensesValue.textContent) - elementPrice
  element.remove()
}

function deleteFromList(element) {
  const elementPrice = parseInt(
    element.querySelector('.expense-price').textContent
  )
  balance += elementPrice
  balanceValue.textContent = balance
  expensesValue.textContent = parseInt(expensesValue.textContent) - elementPrice
  element.remove()
}
