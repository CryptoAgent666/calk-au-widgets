/*!
 * calk-au-embed v1.0.0 — embed Australian tax & finance calculators on any page.
 * https://github.com/CryptoAgent666/calk-au-widgets — MIT licence.
 *
 * No dependencies, no cookies, no tracking. Turns
 *   <div data-calk-au="pay-calculator"></div>
 * into a responsive iframe that resizes itself as the calculator's results grow.
 */
(function () {
  "use strict";

  var ORIGIN = "https://calk-au.com";
  var ATTR = "data-calk-au";
  var MARK = "data-calk-au-ready";

  /**
   * Fallback heights in CSS pixels, used until the widget reports its real
   * height (and forever in browsers where the message never arrives). Generous
   * on purpose: too tall shows whitespace, too short shows an inner scrollbar.
   */
  var HEIGHTS = {
    "pay-calculator": 1050,
    "income-tax-calculator": 1050,
    "gst-calculator": 750,
    "stamp-duty-calculator": 950,
    "mortgage-repayment-calculator": 1000,
    "super-calculator": 1000,
    "hecs-help-calculator": 800,
    "pay-rise-calculator": 1050,
    "salary-comparison-calculator": 1100,
    "fhss-calculator": 1050,
    "compound-interest-calculator": 900,
    "percentage-calculator": 700
  };

  var TITLES = {
    "pay-calculator": "Pay Calculator",
    "income-tax-calculator": "Income Tax Calculator",
    "gst-calculator": "GST Calculator",
    "stamp-duty-calculator": "Stamp Duty Calculator",
    "mortgage-repayment-calculator": "Mortgage Repayment Calculator",
    "super-calculator": "Superannuation Calculator",
    "hecs-help-calculator": "HECS-HELP Repayment Calculator",
    "pay-rise-calculator": "Pay Rise Calculator",
    "salary-comparison-calculator": "Salary Comparison Calculator",
    "fhss-calculator": "First Home Super Saver Calculator",
    "compound-interest-calculator": "Compound Interest Calculator",
    "percentage-calculator": "Percentage Calculator"
  };

  // slug -> [iframe, ...] so a height message can find its frame(s).
  var frames = {};

  function buildSrc(slug, params) {
    var url = ORIGIN + "/embed/" + slug + "/?utm_source=embed&utm_medium=widget";
    if (params.theme) url += "&theme=" + encodeURIComponent(params.theme);
    if (params.query) url += "&" + params.query.replace(/^[?&]+/, "");
    return url;
  }

  function mount(host) {
    var slug = host.getAttribute(ATTR);
    if (!slug || host.getAttribute(MARK)) return;

    var known = Object.prototype.hasOwnProperty.call(HEIGHTS, slug);
    if (!known) {
      // Unknown slug still renders — the site decides whether it exists — but
      // say so in the console rather than silently showing an empty box.
      if (window.console && console.warn) {
        console.warn("[calk-au-embed] unknown calculator \"" + slug + "\"; see " +
          "https://github.com/CryptoAgent666/calk-au-widgets#available-calculators");
      }
    }

    var height = parseInt(host.getAttribute("data-height"), 10) ||
      (known ? HEIGHTS[slug] : 900);
    var maxWidth = host.getAttribute("data-max-width") || "720px";

    var iframe = document.createElement("iframe");
    iframe.src = buildSrc(slug, {
      theme: host.getAttribute("data-theme"),
      query: host.getAttribute("data-query")
    });
    iframe.title = host.getAttribute("data-title") ||
      ((TITLES[slug] || "Calculator") + " — Calk-AU");
    iframe.loading = "lazy";
    iframe.setAttribute("frameborder", "0");
    iframe.style.cssText = "display:block;width:100%;max-width:" + maxWidth +
      ";height:" + height + "px;border:0;margin:0 auto;transition:height .2s ease";

    host.setAttribute(MARK, "1");
    host.appendChild(iframe);

    (frames[slug] = frames[slug] || []).push(iframe);
  }

  function scan(root) {
    var nodes = (root || document).querySelectorAll("[" + ATTR + "]");
    for (var i = 0; i < nodes.length; i++) mount(nodes[i]);
  }

  // Height messages. Only calk-au.com may resize a frame, and only its own.
  window.addEventListener("message", function (event) {
    if (event.origin !== ORIGIN) return;
    var data = event.data;
    if (!data || data.type !== "calk-au:height") return;

    var height = parseInt(data.height, 10);
    if (!height || height < 200 || height > 5000) return;

    var list = frames[data.slug] || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].contentWindow === event.source) {
        list[i].style.height = height + "px";
        return;
      }
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { scan(); });
  } else {
    scan();
  }

  // Public hook for single-page apps that inject widgets after load.
  window.CalkAU = window.CalkAU || {};
  window.CalkAU.mount = scan;
  window.CalkAU.calculators = Object.keys(HEIGHTS);
})();
