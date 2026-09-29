// "Save matchday card": opens the browser's print dialog, which can also save
// a PDF. The button is hidden without JavaScript, where the reader can print
// from the browser menu; the print stylesheet in PrintCard.astro does the rest.
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-print]')) {
  b.hidden = false;
  b.addEventListener('click', () => window.print());
}
