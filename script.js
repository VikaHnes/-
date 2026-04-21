function calculateLoan() {
    // Отримуємо значення з полів введення
    const amount = parseFloat(document.getElementById('amount').value);
    const term = parseInt(document.getElementById('term').value); // у місяцях
    const rate = parseFloat(document.getElementById('rate').value);

    // Перевірка на те, чи всі дані введені правильно
    if (isNaN(amount) || isNaN(term) || isNaN(rate) || amount <= 0 || term <= 0 || rate < 0) {
        alert("Будь ласка, введіть коректні додатні числа у всі поля.");
        return;
    }

    let monthlyPayment = 0;
    let totalPayment = 0;
    let totalOverpayment = 0;

    if (rate === 0) {
        // Якщо кредит під 0%, платіж просто ділиться на кількість місяців
        monthlyPayment = amount / term;
        totalPayment = amount;
        totalOverpayment = 0;
    } else {
        // Формула ануїтетного платежу
        // r = місячна відсоткова ставка (річна ставка / 100 / 12 місяців)
        const monthlyRate = (rate / 100) / 12;
        
        // Математична формула: P = S * (r * (1 + r)^n) / ((1 + r)^n - 1)
        const mathPower = Math.pow(1 + monthlyRate, term);
        monthlyPayment = amount * (monthlyRate * mathPower) / (mathPower - 1);
        
        // Загальна сума виплат = щомісячний платіж * кількість місяців
        totalPayment = monthlyPayment * term;
        
        // Переплата = загальна сума виплат - початкова сума кредиту
        totalOverpayment = totalPayment - amount;
    }

    // Форматування чисел для красивого виведення (2 знаки після коми та пробіли між тисячами)
    const formatCurrency = (number) => {
        return number.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₴';
    };

    // Виведення результатів на екран
    document.getElementById('monthly-payment').innerText = formatCurrency(monthlyPayment);
    document.getElementById('total-overpayment').innerText = formatCurrency(totalOverpayment);
    document.getElementById('total-payment').innerText = formatCurrency(totalPayment);
}
