# Bakery design demo

A playable demo of the proposed new look for a bakery maths game for young children. It is a design demo for
review on a phone, not the app.

It plays the shop front, one shift of five orders and closing time. Every order brings a new cookie shape and
icing. The cookies already in the tray have a soft icing with a white drizzle; the ones the child adds have a
bold icing with sprinkles, so the two parts of ten stay easy to see. The five orders cover the three oven
stages:

| Order | Cookie | Stage | Pair, make 10 | Pair, make 5 |
|---|---|---|---|---|
| 1 | Round | See | 6 + 4 | 4 + 1 |
| 2 | Heart | See | 3 + 7 | 3 + 2 |
| 3 | Star | Peek | 8 + 2 | 2 + 3 |
| 4 | Flower | Peek | 5 + 5 | 1 + 4 |
| 5 | Butterfly | Closed door | 7 + 3 | 3 + 2 |

The gear on the shop front opens the demo controls: make 10 or make 5, a jump to any order or to closing time,
sound on or off, and an empty shop window to see a first visit again. On a wide screen the same controls sit
beside the phone.

## Live demo

https://pnrappsptyltd.github.io/bakery-design-demo/ (GitHub Pages, public repository
`pnrappsptyltd/bakery-design-demo`).

## Privacy

No accounts, no analytics and no data collection. The page's only outside request is the Nunito font from
Google Fonts. The browser remembers three settings on the device: the shop window, sound on or off, and make 5
or 10. The voice is the browser's own speech.

## Files

- [`index.html`](index.html): the page, with every drawing inline. It is built; don't edit it by hand.
- [`src/page.html`](src/page.html): the page template.
- [`src/build.mjs`](src/build.mjs): puts the drawings into the template and writes `index.html`.
- [`src/art/`](src/art/): the drawings, as SVG.

## Build and run

```bash
node design-demo/src/build.mjs
```

```bash
python3 -m http.server 8774 --directory design-demo
```

Then open http://localhost:8774/ in a browser.

## Republish

From the project repository, after the change is committed: `REPO=bakery-design-demo PREFIX=design-demo scripts/publish-demo.sh`.

## Not in this demo, on purpose

Parent Corner and the grown-ups check, split orders with two customers, saved progress, the engine that picks
the pairs and the stages, and recorded voice.
