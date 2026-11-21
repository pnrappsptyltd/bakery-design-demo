// Builds design-demo/index.html: the page template with every drawing inlined, so the page is one file
// with no requests of its own except the font. Run from anywhere: node design-demo/src/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const art = (name) => readFileSync(join(HERE, 'art', `${name}.svg`), 'utf8').trim();
const INK = '#2B2B2B';
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88">${body}</svg>`;

// Customers in the review's smiling style. Ava is the drawing from the design review; the other four are the
// app's existing customers (colour and accessory) drawn with the same face.
const ACCESSORY = {
  cap: `<path d="M16 26 q28 -26 56 0 z" fill="${INK}"/><rect x="40" y="20" width="30" height="6" rx="3" fill="${INK}"/>`,
  glasses: `<circle cx="32" cy="38" r="9.5" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="56" cy="38" r="9.5" fill="none" stroke="${INK}" stroke-width="3"/><path d="M41.5 38 h5" stroke="${INK}" stroke-width="3"/>`,
  scarf: `<path d="M14 66 q30 14 60 0 v10 q-30 14 -60 0 z" fill="#FF8A3D" stroke="${INK}" stroke-width="2"/>`,
  flower: `<circle cx="66" cy="18" r="7" fill="#FF7A9A" stroke="${INK}" stroke-width="2"/><circle cx="66" cy="18" r="2.5" fill="#FFD93B"/>`,
};
const MOUTH = {
  warm: `<path d="M33 55 q11 8 22 0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  happy: `<path d="M29 52 q15 17 30 0 z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M37 60 q7 4 14 0" stroke="#FF7A9A" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
};
const face = (color, accessory, mood) => svg(`<circle cx="44" cy="44" r="36" fill="${color}" stroke="${INK}" stroke-width="3"/>`
  + `<circle cx="32" cy="38" r="4.5" fill="${INK}"/><circle cx="56" cy="38" r="4.5" fill="${INK}"/>`
  + `<circle cx="33.6" cy="36.4" r="1.5" fill="#FFFFFF"/><circle cx="57.6" cy="36.4" r="1.5" fill="#FFFFFF"/>`
  + `<circle cx="23" cy="50" r="5" fill="#FF7A9A" opacity=".55"/><circle cx="65" cy="50" r="5" fill="#FF7A9A" opacity=".55"/>`
  + MOUTH[mood] + ACCESSORY[accessory]);

const ART = {
  shopEmpty: art('shop-day-empty'),
  shopOpenEmpty: art('shop-day-open-empty'),
  shopMix: art('shop-day-mix'),
  shopOpenMix: art('shop-day-open-mix'),
  bakerWave: art('baker-wave'),
  bakerCheer: art('baker-cheer'),
  gear: art('icon-gear'),
  close: art('icon-close'),
  speaker: art('icon-speaker'),
  nightSky: art('night-sky'),
  awning: art('awning'),
  avaWarm: art('customer-ava-warm'),
  avaHappy: art('customer-ava-happy'),
};
for (const [name, color, accessory] of [['leo', '#58C27D', 'cap'], ['mia', '#FF8A3D', 'glasses'], ['noah', '#B892FF', 'scarf'], ['zoe', '#FFD93B', 'flower']]) {
  ART[`${name}Warm`] = face(color, accessory, 'warm');
  ART[`${name}Happy`] = face(color, accessory, 'happy');
}
for (const kind of ['round', 'heart', 'star', 'flower', 'butterfly']) {
  ART[`${kind}Soft`] = art(`cookie-${kind}-soft`);
  ART[`${kind}Bold`] = art(`cookie-${kind}-bold`);
  ART[`box${kind[0].toUpperCase()}${kind.slice(1)}`] = art(`box-${kind}`);
}

const template = readFileSync(join(HERE, 'page.html'), 'utf8');
if (!template.includes('__ART__')) throw new Error('page.html has no __ART__ placeholder');
const page = template.replace('__ART__', JSON.stringify(ART));
writeFileSync(join(HERE, '..', 'index.html'), page);
console.log(`wrote design-demo/index.html (${Math.round(page.length / 1024)} KB, ${Object.keys(ART).length} drawings)`);
