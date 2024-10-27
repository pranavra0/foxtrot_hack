class Plan {
    static MAX_GRANT = 7395;

    constructor(income, tuition) {
        if (tuition > 11000) {
            tuition = 11000;
        }
        this.grant = 0;

        // Set field to numbers based on income and tuition.
        if (income >= 66500) {
            const difference = income - (income * 0.6805);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 66500 && income >= 63079.1) {
            const difference = income - (income * 0.67);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 63079.1 && income >= 59658.2) {
            const difference = income - (income * 0.66);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 59658.2 && income >= 56237.3) {
            const difference = income - (income * 0.65);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 56237.3 && income >= 52816.4) {
            const difference = income - (income * 0.64);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 52816.4 && income >= 49395.5) {
            const difference = income - (income * 0.63);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 49395.5 && income >= 45974.6) {
            const difference = income - (income * 0.62);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 45974.6 && income >= 42553.7) {
            const difference = income - (income * 0.61);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 42553.7 && income >= 39132.8) {
            const difference = income - (income * 0.60);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 39132.8 && income >= 35711.9) {
            const difference = income - (income * 0.59);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 35711.9 && income >= 32291) {
            const difference = income - (income * 0.58);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;

        } else if (income < 32291) {
            const difference = income - (income * 0.57142857);
            const EFC = difference - tuition;
            this.grant = tuition - EFC;
        } 
        if (this.grant > 7300) {
            this.grant = 7300;
        }

    }



    getGrant() {
        return this.grant;
    }
}


let incomeEntryCount = 0;
let expenseEntryCount = 0;

function addIncomeEntry() {
    const incomeContainer = document.getElementById('income-container');
    incomeEntryCount++;

    const incomeHTML = `
        <div class="entry" id="income-${incomeEntryCount}">
            <label for="income-name-${incomeEntryCount}">Income Source ${incomeEntryCount}:</label>
            <input type="text" id="income-name-${incomeEntryCount}" placeholder="Source Name" />
            <input type="number" min="0" id="income-amount-${incomeEntryCount}" placeholder="Amount" />
            <select id="income-frequency-${incomeEntryCount}">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
        </div>`;
    
    incomeContainer.insertAdjacentHTML('beforeend', incomeHTML);
}

function addExpenseEntry() {
    const expenseContainer = document.getElementById('expense-container');
    expenseEntryCount++;

    const expenseHTML = `
        <div class="entry" id="expense-${expenseEntryCount}">
            <label for="expense-name-${expenseEntryCount}">Expense ${expenseEntryCount}:</label>
            <input type="text" id="expense-name-${expenseEntryCount}" placeholder="Expense Name" />
            <input type="number" min="0" id="expense-amount-${expenseEntryCount}" placeholder="Amount" />
            <select id="expense-frequency-${expenseEntryCount}">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
        </div>`;
    
    expenseContainer.insertAdjacentHTML('beforeend', expenseHTML);
}

function calculateBudget() {
    let totalIncome = 0;
    let totalExpenses = 0;

    for (let i = 1; i <= incomeEntryCount; i++) {
        const amount = parseFloat(document.getElementById(`income-amount-${i}`).value) || 0;
        const frequency = document.getElementById(`income-frequency-${i}`).value;
        totalIncome += calculateAnnualAmount(amount, frequency);
    }

    for (let i = 1; i <= expenseEntryCount; i++) {
        const amount = parseFloat(document.getElementById(`expense-amount-${i}`).value) || 0;
        const frequency = document.getElementById(`expense-frequency-${i}`).value;
        totalExpenses += calculateAnnualAmount(amount, frequency);
    }

    const monthlyIncome = (totalIncome / 12).toFixed(2);
    const monthlyExpenses = (totalExpenses / 12).toFixed(2);
    const surplusOrDeficit = (totalIncome - totalExpenses) / 12;

    const tuition = monthlyExpenses * 12; 
    const plan = new Plan(totalIncome, tuition);
    const grant = plan.getGrant();

    document.getElementById('plan').style.display = 'block';
    document.getElementById('plan-income').textContent = `$${monthlyIncome}`;
    document.getElementById('plan-expenses').textContent = `$${monthlyExpenses}`;
    document.getElementById('grant-amount').textContent = `$${grant.toFixed(2)}`;
    
    document.getElementById('payment-increments').textContent = `To be determined...`;

    // Data for the graph
    generateGraph(totalExpenses, totalIncome);

    // Scroll to the plan section
    // document.getElementById('plan').scrollIntoView({ behavior: 'smooth' });
}
let myChart;

function generateGraph(expenses, income) {
    const ctx = document.getElementById('costGraph').getContext('2d');

    // Destroy the existing chart if it exists
    if (myChart) {
        myChart.destroy();
    }

    const years = [1, 2, 3, 4, 5]; // Next 5 years
    const expenseData = years.map(year => expenses * year); // Cumulative expenses
    const incomeData = years.map(year => income * year); // Cumulative income

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Expenses',
                    data: expenseData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                },
                {
                    label: 'Income',
                    data: incomeData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function calculateAnnualAmount(amount, frequency) {
    switch (frequency) {
        case 'daily': return amount * 365;
        case 'weekly': return amount * 52;
        case 'biweekly': return amount * 26;
        case 'monthly': return amount * 12;
        case 'yearly': return amount;
        default: return 0;
    }
}
