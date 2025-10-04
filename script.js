document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECT DOM ELEMENTS
    const expenseForm = document.getElementById('expense-form');
    const expenseTableBody = document.getElementById('expense-table-body');
    const filterCategory = document.getElementById('filter-category');
    const filterMonth = document.getElementById('filter-month');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const totalSpentEl = document.getElementById('total-spent');

    // 2. STATE MANAGEMENT (Data)
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    // 3. HELPER FUNCTIONS (for reusable tasks)
    const saveExpenses = () => localStorage.setItem('expenses', JSON.stringify(expenses));

    // 4. CORE LOGIC
    const updateDisplay = () => {
        const selectedCategory = filterCategory.value;
        const selectedMonth = filterMonth.value;

        // Filter expenses in a single, chained command
        const filteredExpenses = expenses
            .filter(e => selectedCategory === 'all' || e.category === selectedCategory)
            .filter(e => selectedMonth === '' || e.date.startsWith(selectedMonth));

        // Calculate total spent using reduce
        const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
        totalSpentEl.textContent = `₹${totalSpent.toFixed(2)}`;

        // REFACTORED: Use map() and join() for efficient rendering
        const tableRows = filteredExpenses.map(e => `
            <tr>
                <td>₹${e.amount.toFixed(2)}</td>
                <td>${e.date}</td>
                <td>${e.category}</td>
                <td>${e.note}</td>
                <td><button class="delete-btn" data-id="${e.id}">Delete</button></td>
            </tr>
        `).join('');
        
        expenseTableBody.innerHTML = tableRows;
    };
    
    const addExpense = (event) => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const date = document.getElementById('expense-date').value;
        const category = document.getElementById('expense-category').value;
        const note = document.getElementById('expense-note').value;

        if (isNaN(amount) || !date || !category || !note.trim()) {
            return alert('Please fill out all fields correctly.');
        }

        expenses.push({ id: Date.now(), amount, date, category, note });
        saveExpenses();
        updateDisplay();
        expenseForm.reset();
    };

    const deleteExpense = (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const expenseId = parseInt(event.target.getAttribute('data-id'));
            expenses = expenses.filter(e => e.id !== expenseId);
            saveExpenses();
            updateDisplay();
        }
    };
    
    // 5. EVENT LISTENERS
    expenseForm.addEventListener('submit', addExpense);
    expenseTableBody.addEventListener('click', deleteExpense);
    filterCategory.addEventListener('change', updateDisplay);
    filterMonth.addEventListener('change', updateDisplay);
    resetFiltersBtn.addEventListener('click', () => {
        filterCategory.value = 'all';
        filterMonth.value = '';
        updateDisplay();
    });

    // Initial Render
    updateDisplay();
});


