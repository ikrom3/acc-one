// Функция форматирования чисел с разделителями
function formatNumber(number) {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(number);
}

// Калькулятор подоходного налога
function calculatePersonalTax() {
    const income = parseFloat(document.getElementById('income').value);
    const taxRate = parseFloat(document.getElementById('taxType').value);
    const socialTaxRate = parseFloat(document.getElementById('socialTaxType').value);

    if (isNaN(income) || income <= 0) {
        alert('Пожалуйста, введите корректную сумму дохода');
        return;
    }

    // Расчет налогов
    const incomeTax = income * (taxRate / 100);
    const socialTax = income * (socialTaxRate / 100);
    const totalTax = incomeTax + socialTax;
    const netIncome = income - totalTax;

    // Отображение результатов
    document.getElementById('grossIncome').textContent = formatNumber(income) + ' сум';
    document.getElementById('incomeTax').textContent = formatNumber(incomeTax) + ' сум';
    document.getElementById('socialTax').textContent = formatNumber(socialTax) + ' сум';
    document.getElementById('totalTax').textContent = formatNumber(totalTax) + ' сум';
    document.getElementById('netIncome').textContent = formatNumber(netIncome) + ' сум';

    // Показываем блок с результатами
    document.getElementById('personalResult').classList.remove('hidden');

    // Плавная прокрутка к результатам
    document.getElementById('personalResult').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

// Калькулятор налога на прибыль
function calculateCorporateTax() {
    const revenue = parseFloat(document.getElementById('revenue').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    const vatApplicable = document.getElementById('vatApplicable').value;

    if (isNaN(revenue) || revenue < 0) {
        alert('Пожалуйста, введите корректную сумму выручки');
        return;
    }

    if (isNaN(expenses) || expenses < 0) {
        alert('Пожалуйста, введите корректную сумму расходов');
        return;
    }

    // Расчет НДС
    let vatAmount = 0;
    let revenueWithoutVat = revenue;

    if (vatApplicable === 'yes') {
        // НДС = выручка * 12%
        vatAmount = revenue * 0.12;
        // Для расчета прибыли используем выручку с НДС
        document.getElementById('vatRow').style.display = 'flex';
    } else {
        document.getElementById('vatRow').style.display = 'none';
    }

    // Расчет прибыли и налогов
    const profit = revenue - expenses;
    const profitTax = profit > 0 ? profit * 0.15 : 0;
    const netProfit = profit - profitTax;

    // Отображение результатов
    document.getElementById('corpRevenue').textContent = formatNumber(revenue) + ' сум';
    document.getElementById('vatAmount').textContent = formatNumber(vatAmount) + ' сум';
    document.getElementById('corpExpenses').textContent = formatNumber(expenses) + ' сум';
    document.getElementById('profit').textContent = formatNumber(profit) + ' сум';
    document.getElementById('profitTax').textContent = formatNumber(profitTax) + ' сум';
    document.getElementById('netProfit').textContent = formatNumber(netProfit) + ' сум';

    // Показываем блок с результатами
    document.getElementById('corporateResult').classList.remove('hidden');

    // Плавная прокрутка к результатам
    document.getElementById('corporateResult').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

// Обработка нажатия Enter в полях ввода
document.addEventListener('DOMContentLoaded', function() {
    // Для калькулятора подоходного налога
    const personalInputs = ['income', 'taxType', 'socialTaxType'];
    personalInputs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculatePersonalTax();
            }
        });
    });

    // Для калькулятора налога на прибыль
    const corporateInputs = ['revenue', 'expenses', 'vatApplicable'];
    corporateInputs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateCorporateTax();
            }
        });
    });
});
