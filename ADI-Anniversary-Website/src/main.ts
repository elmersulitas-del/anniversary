import './style.css';
import { letter } from './letter';

interface Memory { id: number; caption: string; alt: string }
const memories: Memory[] = [
  { id: 15, caption: 'My favorite person.', alt: 'Studio photo, magkahawak-kamay at parehong naka-red.' },
  { id: 4, caption: 'Ikaw at ako.', alt: 'Magkasamang nakangiti sa ilalim ng mga puno.' },
  { id: 12, caption: 'Basta kasama kita.', alt: 'Magkatabing nakatayo sa labas, may mga puno sa likod.' },
  { id: 1, caption: 'Little things, big love.', alt: 'Collage ng couple selfies, sunset, bulaklak, at photo strips.' },
  { id: 11, caption: 'A little sparkle.', alt: 'Couple selfie sa ilalim ng maraming ilaw.' },
  { id: 2, caption: 'Mga lakad natin.', alt: 'Collage ng selfies, beach, at pusong iginuhit sa buhangin.' },
  { id: 10, caption: 'Yung kulit natin.', alt: 'Selfie collage, nakapikit ang isang mata at naka-peace sign.' },
  { id: 14, caption: 'More days like this.', alt: 'Four-photo collage ng magkasama sa labas at mga selfie.' },
  { id: 3, caption: 'Ordinary days, with you.', alt: 'Couple selfie sa lilim ng mga puno.' },
  { id: 13, caption: 'All the little laughs.', alt: 'Playful outdoor photo, nakangiti at naka-thumbs up.' },
  { id: 5, caption: 'My kind of happy.', alt: 'Magkadikit sa isang indoor selfie.' },
  { id: 6, caption: 'Kahit anong mood.', alt: 'Playful indoor couple selfie.' },
  { id: 7, caption: 'Still my favorite.', alt: 'Indoor selfie, may playful hand gesture.' },
  { id: 8, caption: 'Just us.', alt: 'Mirror photo ng magkatabing nakaupo.' },
  { id: 9, caption: 'Ikaw pa rin.', alt: 'Close-up couple selfie sa loob ng bahay.' }
];
function get<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing element: ${id}`);
  return element as T;
}
const photoPath = (id: number): string => `/photos/${String(id).padStart(2, '0')}.webp`;
const gallery = get<HTMLDivElement>('gallery');
const dialog = get<HTMLDialogElement>('lightbox');
const viewerImage = get<HTMLImageElement>('viewer-image');
let currentPhoto = 0;
let previousFocus: HTMLElement | null = null;

function showPhoto(index: number): void {
  currentPhoto = (index + memories.length) % memories.length;
  const memory = memories[currentPhoto];
  viewerImage.src = photoPath(memory.id);
  viewerImage.alt = memory.alt;
  get('viewer-caption').textContent = `${memory.caption} · ${currentPhoto + 1} / ${memories.length}`;
}
memories.forEach((memory, index) => {
  const button = document.createElement('button');
  button.className = 'memory';
  button.setAttribute('aria-label', `Open photo ${index + 1}: ${memory.alt}`);
  const image = document.createElement('img');
  image.src = photoPath(memory.id);
  image.alt = memory.alt;
  image.loading = 'lazy';
  image.decoding = 'async';
  const caption = document.createElement('span');
  caption.className = 'memory-caption';
  caption.textContent = memory.caption;
  const number = document.createElement('small');
  number.textContent = String(index + 1).padStart(2, '0');
  caption.append(number);
  button.append(image, caption);
  button.addEventListener('click', () => {
    previousFocus = button;
    showPhoto(index);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
  gallery.append(button);
});
get('viewer-close').addEventListener('click', () => dialog.close());
get('previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
get('next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
dialog.addEventListener('close', () => { document.body.style.overflow = ''; previousFocus?.focus(); });
dialog.addEventListener('click', (event: MouseEvent) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentPhoto - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + 1); }
});
let startX = 0;
viewerImage.addEventListener('touchstart', (event: TouchEvent) => { startX = event.changedTouches[0].clientX; }, {passive: true});
viewerImage.addEventListener('touchend', (event: TouchEvent) => {
  const distance = event.changedTouches[0].clientX - startX;
  if (Math.abs(distance) > 55) showPhoto(currentPhoto + (distance < 0 ? 1 : -1));
}, {passive: true});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let clearHearts: ReturnType<typeof setTimeout> | undefined;
function celebrate(): void {
  if (reducedMotion.matches) return;
  const layer = get('celebration');
  layer.replaceChildren();
  clearTimeout(clearHearts);
  for (let i = 0; i < 32; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = i % 3 === 0 ? '♡' : '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    heart.style.setProperty('--duration', `${3 + Math.random() * 2}s`);
    heart.style.setProperty('--delay', `${Math.random() * 1.4}s`);
    layer.append(heart);
  }
  clearHearts = setTimeout(() => layer.replaceChildren(), 6500);
}
const welcome = get('welcome');
const site = get('site');
const unwrap = get<HTMLButtonElement>('unwrap');
unwrap.addEventListener('click', () => {
  unwrap.disabled = true;
  welcome.classList.add('leaving');
  setTimeout(() => {
    welcome.hidden = true;
    site.hidden = false;
    site.classList.add('revealed');
    window.scrollTo({top: 0, behavior: 'instant'});
    get('main').focus({preventScroll: true});
    celebrate();
  }, reducedMotion.matches ? 0 : 600);
});
const letterBody = get('letter-body');
const letterButton = get<HTMLButtonElement>('open-letter');
letter.forEach(text => { const p = document.createElement('p'); p.textContent = text; get('letter-text').append(p); });
letterButton.addEventListener('click', () => {
  letterButton.hidden = true;
  letterButton.setAttribute('aria-expanded', 'true');
  letterBody.hidden = false;
  letterBody.tabIndex = -1;
  letterBody.focus({preventScroll: true});
  letterBody.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start'});
});
get('close-letter').addEventListener('click', () => {
  letterBody.hidden = true;
  letterButton.hidden = false;
  letterButton.setAttribute('aria-expanded', 'false');
  letterButton.focus();
});
get('one-more').addEventListener('click', () => {
  get('last-note').hidden = false;
  get('one-more').textContent = 'I love you, Adi! ♡';
  celebrate();
});
get('replay').addEventListener('click', () => {
  site.hidden = true;
  site.classList.remove('revealed');
  welcome.hidden = false;
  welcome.classList.remove('leaving');
  unwrap.disabled = false;
  letterBody.hidden = true;
  letterButton.hidden = false;
  letterButton.setAttribute('aria-expanded', 'false');
  get('last-note').hidden = true;
  get('one-more').textContent = 'Isa pang surprise?';
  get('celebration').replaceChildren();
  window.scrollTo({top: 0, behavior: 'instant'});
  unwrap.focus({preventScroll: true});
});
