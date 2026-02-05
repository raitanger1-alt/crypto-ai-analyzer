async function load() {
  const container = document.getElementById("data");
  container.innerHTML = "<div class='card'>Loading market data...</div>";

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1"
    );
    const coins = await response.json();

    container.innerHTML = "";

    coins.forEach((coin) => {
      let signal = "HOLD";
      let cls = "hold";

      if (coin.price_change_percentage_24h > 3) {
        signal = "BUY";
        cls = "buy";
      } else if (coin.price_change_percentage_24h < -3) {
        signal = "SELL";
        cls = "sell";
      }

      container.innerHTML += `
        <div class="card">
          <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
          <p>Price: $${coin.current_price}</p>
          <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
          <p class="${cls}">Signal: ${signal}</p>
        </div>
      `;
    });
  } catch (e) {
    container.innerHTML =
      "<div class='card'>Error loading data</div>";
  }
}
