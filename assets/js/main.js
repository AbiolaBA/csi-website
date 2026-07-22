/* Consumer Intelligence Lab — shared UI + chart system.
   Charts follow the validated dataviz palette (see assets/css/main.css). */

(function () {
  // ---------- nav ----------
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });
})();

/* ---------- chart defaults ---------- */
const CIL = {
  series: ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"],
  pos: "#2a78d6",
  neg: "#e34948",
  ink: "#0b0b0b",
  ink2: "#52514e",
  grid: "#eceae5",
};

if (window.Chart) {
  Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = CIL.ink2;
  Chart.defaults.borderColor = CIL.grid;
  Chart.defaults.plugins.legend.labels.boxWidth = 14;
  Chart.defaults.plugins.legend.labels.boxHeight = 3;
  Chart.defaults.plugins.tooltip.backgroundColor = "#10161f";
  Chart.defaults.plugins.tooltip.titleFont = { weight: "600" };
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.animation.duration = 350;
}

function cilLineChart(id, years, seriesDefs, opts = {}) {
  const el = document.getElementById(id);
  if (!el || !window.Chart) return;
  new Chart(el, {
    type: "line",
    data: {
      labels: years,
      datasets: seriesDefs.map((s, i) => ({
        label: s.label,
        data: s.data,
        borderColor: s.color || CIL.series[i % CIL.series.length],
        backgroundColor: s.color || CIL.series[i % CIL.series.length],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointHoverBorderColor: "#fcfcfb",
        tension: 0.25,
        spanGaps: true,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: seriesDefs.length > 1, position: "bottom" },
        tooltip: {
          callbacks: {
            label: c => ` ${c.dataset.label}: ${(+c.parsed.y).toFixed(3)}`,
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
        y: {
          title: opts.yTitle ? { display: true, text: opts.yTitle, color: CIL.ink2 } : undefined,
          min: opts.yMin, max: opts.yMax,
          ticks: { maxTicksLimit: 6 },
        },
      },
    },
  });
}

function cilDivergingBar(id, labels, values, opts = {}) {
  const el = document.getElementById(id);
  if (!el || !window.Chart) return;
  new Chart(el, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: values.map(v => (v >= 0 ? CIL.pos : CIL.neg)),
        borderRadius: 3,
        borderSkipped: false,
        maxBarThickness: 16,
        categoryPercentage: 0.72,
      }],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: c => ` ${(+c.parsed.x).toFixed(opts.dp ?? 2)}${opts.unit || ""}` },
        },
      },
      scales: {
        x: {
          title: opts.xTitle ? { display: true, text: opts.xTitle, color: CIL.ink2 } : undefined,
          grid: { color: ctx => (ctx.tick.value === 0 ? "#8a8880" : CIL.grid) },
        },
        y: { grid: { display: false }, ticks: { autoSkip: false, color: CIL.ink } },
      },
    },
  });
}

function cilScatter(id, points, opts = {}) {
  const el = document.getElementById(id);
  if (!el || !window.Chart) return;
  new Chart(el, {
    type: "scatter",
    data: {
      datasets: [{
        label: opts.label || "",
        data: points,
        backgroundColor: "rgba(42,120,214,.62)",
        borderColor: "#1c5cab",
        borderWidth: 1,
        pointRadius: 4.5,
        pointHoverRadius: 7,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: c => ` ${c.raw.name}: T1 ${c.raw.x.toFixed(2)}, T3 ${c.raw.y.toFixed(2)}`,
          },
        },
      },
      scales: {
        x: { title: { display: true, text: opts.xTitle || "x", color: CIL.ink2 } },
        y: { title: { display: true, text: opts.yTitle || "y", color: CIL.ink2 } },
      },
    },
  });
}

/* ---------- helpers ---------- */
function fmtZ(v) {
  const s = v >= 0 ? "+" : "−";
  return s + Math.abs(v).toFixed(2);
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
