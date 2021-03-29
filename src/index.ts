import _debounce from 'lodash.debounce';
import * as monaco from 'monaco-editor';

import './assets/styles/index.css';

import { initializeDrag } from './drag';

// Disable Ctrl+S hotkey
document.addEventListener(
  'keydown',
  function (e) {
    if (
      e.key == 's' &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
    }
  },
  false
);

const DEBOUNCE_TIMEOUT = 300;

const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  tabSize: 2,
  theme: 'vs-dark',
  insertSpaces: true,
  automaticLayout: true,
  renderWhitespace: 'all',
};

let htmlEditor: monaco.editor.IStandaloneCodeEditor;
let cssEditor: monaco.editor.IStandaloneCodeEditor;

const htmlDOM = document.getElementById('html');
const cssDOM = document.getElementById('css');

if (htmlDOM && cssDOM) {
  const initialHTMLValue = localStorage.getItem('html') || `<p>Hello World</p>`;
  const initialCSSValue =
    localStorage.getItem('css') || ['p {', '  color: #424242;', '}'].join('\n');

  htmlEditor = monaco.editor.create(htmlDOM, {
    value: initialHTMLValue,
    language: 'html',
    ...editorOptions,
  });

  window.addEventListener('resize', () =>
    htmlEditor.layout({} as monaco.editor.IDimension)
  );

  const htmlChangeListener = _debounce(() => {
    const value = htmlEditor.getValue();

    update('html', value);
  }, DEBOUNCE_TIMEOUT);

  htmlChangeListener();
  htmlEditor.onDidChangeModelContent(htmlChangeListener);

  cssEditor = monaco.editor.create(cssDOM, {
    value: initialCSSValue,
    language: 'css',
    ...editorOptions,
  });

  window.addEventListener('resize', () =>
    cssEditor.layout({} as monaco.editor.IDimension)
  );

  const cssChangeListener = _debounce(() => {
    const value = cssEditor.getValue();

    update('css', value);
  }, DEBOUNCE_TIMEOUT);

  cssChangeListener();
  cssEditor.onDidChangeModelContent(cssChangeListener);

  initializeDrag(htmlEditor, cssEditor, htmlDOM, cssDOM);
}

const outputHTML = document.getElementById('output-html');
const outputCSS = document.getElementById('output-css');

function storeValue(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

function renderHTML(value: string) {
  if (outputHTML) outputHTML.innerHTML = value;
}

function renderCSS(value: string) {
  if (outputCSS) outputCSS.innerHTML = value;
}

function update(key: string, value: string) {
  storeValue(key, value);

  if (key === 'html') renderHTML(value);
  if (key === 'css') renderCSS(value);
}
