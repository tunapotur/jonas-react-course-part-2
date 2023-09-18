// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [money, setMoney] = useState(1);
  const [rates, setRates] = useState(0);
  const [moneyFrom, setMoneyFrom] = useState("EUR");
  const [moneyTo, setMoneyTo] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function convertMoney() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${money}&from=${moneyFrom}&to=${moneyTo}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong with fetching");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Not found");

          setRates(Object.values(data.rates));
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      moneyFrom !== moneyTo ? convertMoney() : setRates(money);

      return function () {
        controller.abort();
      };
    },
    [money, moneyFrom, moneyTo]
  );

  return (
    <div>
      <input
        disabled={isLoading}
        type="text"
        value={money}
        onChange={(e) => setMoney(Number(e.target.value))}
      />
      <select
        disabled={isLoading}
        value={moneyFrom}
        onChange={(e) => setMoneyFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        disabled={isLoading}
        value={moneyTo}
        onChange={(e) => setMoneyTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {!error && <p>{`${rates} ${moneyTo}`}</p>}
    </div>
  );
}
