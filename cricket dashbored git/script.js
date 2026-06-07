fetch("data/match.json")
  .then(res => {
    if (!res.ok) throw new Error("Could not load match.json");
    return res.json();
  })
  .then(data => loadDashboard(data))
  .catch(err => {
    console.error(err);
    document.getElementById("match-summary").innerHTML = 
      `<h3>Error</h3><p>Unable to load match data.</p>`;
  });

function loadDashboard(data) {

  document.getElementById("match-summary").innerHTML = `
    <h3>Match Summary</h3>
    <p><strong>Teams:</strong> ${data.teams}</p>
    <p><strong>Venue:</strong> ${data.venue}</p>
    <p><strong>Status:</strong> Completed</p>
    <hr>
    <p><strong>India:</strong> ${data.india_score}</p>
    <p><strong>New Zealand:</strong> ${data.nz_score}</p>
    <p><strong>Result:</strong> ${data.result}</p>
  `;

  document.getElementById("match-result").innerHTML = `
    <h3>Match Result</h3>
    <p><strong>Winner:</strong> ${inferWinner(data.result)}</p>
    <p><strong>Margin:</strong> ${extractMargin(data.result)}</p>
    <p><strong>Player of the Match:</strong> ${data.mom}</p>
  `;

  document.getElementById("batting-card").innerHTML = `
    <h3>India Batting</h3>
    <p><b>Virat Kohli:</b> ${data.kohli}</p>
    <p><b>shreyasiyer:</b> ${data.iyer}</p>
    <p><b>Rohit Sharma:</b> ${data.rohit}</p>
    <p><b>Extras:</b> ${data.extras}</p>
    <hr>
    <p><strong>Total:</strong> ${data.total}</p>
  `;

  document.getElementById("bowling-card").innerHTML = `
    <h3>New Zealand Bowling</h3>
    <p><b>tim southee:</b> ${data.southee}</p>
    <p><b>trent boult:</b> ${data.boult}</p>
    <p><b>lockie ferguson:</b> ${data.ferguson}</p>
    <p><b>glenn phillips:</b> ${data.phillips}</p>
  `;

  const barsDiv = document.getElementById("last-overs");
  barsDiv.innerHTML = "";
  if (Array.isArray(data.last6)) {
    data.last6.forEach(r => {
      const div = document.createElement("div");
      div.className = "bar";
      div.style.height = `${Math.max(8, r * 10)}px`;
      div.textContent = r;
      barsDiv.appendChild(div);
    });
  }

  document.getElementById("extra-info").innerHTML = `
    <h3>Pitch • Weather</h3>
    <p><b>Pitch:</b> ${data.pitch}</p>
    <p><b>Weather:</b> ${data.weather}</p>
    <hr>
    <h4>Match Info</h4>
    <p><strong>Toss:</strong> ${data.toss}</p>
    <p><strong>Series:</strong> ${data.series}</p>
  `;
}

function inferWinner(result) {
  if (!result) return "N/A";
  const match = result.match(/(.+?)\s+won/i);
  return match ? match[1] : result;
}

function extractMargin(result) {
  if (!result) return "N/A";
  const match = result.match(/by\s+(.+)/i);
  return match ? match[1] : "N/A";
}