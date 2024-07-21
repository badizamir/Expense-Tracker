const form = document.getElementById('expense-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const expensesList = document.getElementById('expenses-list');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to display expenses
function displayExpenses() {
    // Clear previous list
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.text}: <span>$${expense.amount}</span>
            <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;
        expensesList.appendChild(li);
    });

    // Update local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to add expense
function addExpense(e) {
    e.preventDefault();

    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please enter a description and amount');
        return;
    }

    const expense = {
        text: textInput.value,
        amount: +amountInput.value
    };

    expenses.push(expense);
    displayExpenses();

    // Clear inputs
    textInput.value = '';
    amountInput.value = '';
}

// Function to edit expense
function editExpense(index) {
    const newText = prompt('Enter new description:');
    const newAmount = parseFloat(prompt('Enter new amount:'));

    if (newText !== null && newAmount !== null) {
        expenses[index].text = newText;
        expenses[index].amount = newAmount;
        displayExpenses();
    }
}

// Function to delete expense
function deleteExpense(index) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses.splice(index, 1);
        displayExpenses();
    }
}

// Event listener for form submission
form.addEventListener('submit', addExpense);

// Display existing expenses when the page loads
displayExpenses();
