document.addEventListener('DOMContentLoaded', () => {
  const amountEl = document.getElementById('amount');
  const fromEl = document.getElementById('from');
  const toEl = document.getElementById('to');
  const convertBtn = document.getElementById('convert');
  const resultEl = document.getElementById('result');

  if (!amountEl || !fromEl || !toEl || !convertBtn || !resultEl) {
    console.error('Missing DOM elements');
    return;
  }

  convertBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const amount = parseFloat(amountEl.value);
    const from = fromEl.value;
    const to = toEl.value;
    if (isNaN(amount) || amount <= 0) {
      resultEl.textContent = 'Please enter a valid positive number.';
      return;
    }

    resultEl.textContent = "Fetching exchange rate...";
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      const rate = data.rates[to];
      if (!rate) throw new Error("Rate not found");
      const converted = (amount * rate).toFixed(2);
      resultEl.textContent = `${amount} ${from} = ${converted} ${to}`;
    } catch (error) {
      resultEl.textContent = "Failed to fetch exchange rate.";
      console.error(error);
    }
  });
});
