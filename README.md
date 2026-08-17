# Calk-AU Widgets

Embed Australian tax and finance calculators on your own site with one line of HTML.
Twelve calculators — pay, income tax, GST, stamp duty, mortgage, super, HECS-HELP and
more — running on the current 2026-27 ATO and state revenue office figures.

**[Live demo and copy-paste snippets →](https://cryptoagent666.github.io/calk-au-widgets/)**

Free, no signup, no API key, no quota. Built for accountants, mortgage brokers,
HR teams, personal-finance writers and anyone who would rather link to a working
calculator than maintain a spreadsheet of tax brackets.

## Why this exists

Australian tax constants change constantly, and a calculator embedded in someone
else's blog post is usually wrong within a year. The second bracket dropped from
16% to 15% on 1 July 2026, the super guarantee reached 12%, HECS thresholds
reindexed, every state moved its stamp duty and registration schedules.

Calk-AU tracks over a thousand government-set values with weekly source
monitoring and quarterly re-verification against primary sources. When a rate
changes, every embed updates at once — you do nothing. That is the whole pitch:
**you host the widget, we own the maintenance burden.**

## Quick start

The simplest version needs no JavaScript at all:

```html
<iframe src="https://calk-au.com/embed/pay-calculator/"
        width="100%" height="1050" style="border:0;max-width:720px"
        title="Pay Calculator — Calk-AU" loading="lazy"></iframe>
```

That works everywhere, including WordPress Custom HTML blocks and Squarespace code
blocks. Its one weakness is a fixed height: enter a salary, the results expand, and
you either get an inner scrollbar or leftover whitespace.

The loader in this repository fixes that. Add a placeholder and one script:

```html
<div data-calk-au="pay-calculator"></div>
<script src="https://cdn.jsdelivr.net/gh/CryptoAgent666/calk-au-widgets@v1.0.0/calk-au-embed.js" async></script>
```

The widget now reports its own height and the iframe grows and shrinks with it.
One script tag serves any number of widgets on the page.

## Options

Set them as attributes on the placeholder:

| Attribute | Default | What it does |
|---|---|---|
| `data-calk-au` | *required* | Calculator slug, see the table below |
| `data-height` | per calculator | Starting height in pixels, before the first self-report |
| `data-max-width` | `720px` | Any CSS length; the widget is responsive down to 320px |
| `data-theme` | follows the visitor's system setting | `light` or `dark` to pin it |
| `data-title` | calculator name | `<iframe title>` for screen readers |
| `data-query` | — | Extra query string passed through, e.g. `pay=90000&hecs=1` to open pre-filled |

```html
<div data-calk-au="stamp-duty-calculator"
     data-theme="light"
     data-max-width="640px"
     data-query="price=750000&state=nsw&buyer=first_home"></div>
```

Injecting widgets after page load (React, Vue, htmx, anything):

```js
CalkAU.mount()            // scans the whole document
CalkAU.mount(container)   // or just one subtree
CalkAU.calculators        // array of available slugs
```

## Available calculators

| Slug | Calculator | Suggested height |
|---|---|---|
| `pay-calculator` | Take-home pay, any pay period | 1050 |
| `income-tax-calculator` | Income tax, Medicare levy, LITO | 1050 |
| `gst-calculator` | Add or remove 10% GST | 750 |
| `stamp-duty-calculator` | Transfer duty, all 8 states | 950 |
| `mortgage-repayment-calculator` | Repayments, total interest, balance chart | 1000 |
| `super-calculator` | Balance projection to retirement | 1000 |
| `hecs-help-calculator` | HECS-HELP repayments and payoff year | 800 |
| `pay-rise-calculator` | What you actually keep from a raise | 1050 |
| `salary-comparison-calculator` | Two job offers side by side | 1100 |
| `fhss-calculator` | First Home Super Saver benefit | 1050 |
| `compound-interest-calculator` | Growth with regular contributions | 900 |
| `percentage-calculator` | Percentage of, change, difference | 700 |

Need one that is not on the list? All 130 calculators can be enabled — open an
issue or email <info@calk-au.com>.

## Terms

Free for commercial and personal use, including client sites. Two conditions:

1. **Keep the "Powered by Calk-AU" line visible.** It sits inside the widget and
   is how this stays free. Hiding it with CSS is not on.
2. **Do not present results as financial advice.** The calculators are general
   information built on published government figures.

The loader script itself is MIT licensed (see [LICENSE](LICENSE)) — fork it, bundle
it, self-host it. The calculators remain hosted by Calk-AU.

## Privacy

The loader sets no cookies, reads no storage and sends no analytics of its own.
Calculations run entirely in the visitor's browser inside the iframe — figures
typed into a widget never reach a server. The iframe carries
`utm_source=embed&utm_medium=widget` so we can see how many people use embedded
widgets in aggregate; no data about your visitors is collected by the loader.

Height messages are validated by origin: the loader accepts them only from
`https://calk-au.com`, and only for the frame that sent them, so an embedded page
cannot resize anything else on yours.

## Self-hosting the loader

The script is 3 KB, dependency-free, and pinned by tag on jsDelivr in the example
above. If you would rather not load third-party JavaScript, copy
`calk-au-embed.js` into your own assets — it needs no build step and no updates
unless you want new calculators added to the fallback height table.

## Contributing

Bug reports and pull requests welcome, particularly:

- CMS-specific integration notes (Webflow, Ghost, Drupal, Shopify)
- Framework wrappers (a React component, a Vue directive)
- Accessibility improvements to the loader

Found a wrong number in a calculator? That is a data issue, not a loader issue —
report it at <info@calk-au.com> or open an issue here and it gets checked against
the primary source. Corrections usually ship the same week.

## Links

- [Widget gallery with live previews](https://calk-au.com/widgets/)
- [All 130 calculators](https://calk-au.com/)
- [How the rates are kept current](https://calk-au.com/methodology/)
- [Rates tracker](https://calk-au.com/tracker/)
