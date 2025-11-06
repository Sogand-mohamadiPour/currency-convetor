import { useEffect, useState } from "react";

function App() {

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function convert() {
      setIsLoading(true);
      // If both currencies are the same, no conversion needed
      if (fromCurrency === toCurrency) {
        setConvertedAmount(amount);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);

        if (!res.ok) {
          throw new Error('Failed to fetch conversion rate');
        }

        const data = await res.json();
        setConvertedAmount(data.rates[toCurrency]);
      } catch (error) {
        console.error('Conversion error:', error);
        setConvertedAmount('Error');
      } finally {
        setIsLoading(false);
      }
    }

    convert()
  }, [amount, fromCurrency, toCurrency])

  return (
    <>
      <div className="container">
        <h1>Currency Converter</h1>
        <div className="converter">
          <input
            type="text"
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            disabled={isLoading}
          />
          <select
            className="currency-select"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <span className="arrow">→</span>
          <select
            className="currency-select"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <p className="result">{convertedAmount} {toCurrency}</p>
      </div>
    </>
  );
}

export default App;
