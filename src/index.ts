import _debounce from 'lodash.debounce';
import * as monaco from 'monaco-editor';

import './assets/styles/index.css';

import { initializeDrag } from './drag';

const DEBOUNCE_TIMEOUT = 300;

const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'vs-dark',
  automaticLayout: true,
};

let htmlEditor: monaco.editor.IStandaloneCodeEditor;
let cssEditor: monaco.editor.IStandaloneCodeEditor;

const htmlDOM = document.getElementById('html');
const cssDOM = document.getElementById('css');

if (htmlDOM && cssDOM) {
  htmlEditor = monaco.editor.create(htmlDOM, {
    value: `<p>Hello World</p>`,
    language: 'html',
    ...editorOptions,
  });

  window.addEventListener('resize', () =>
    htmlEditor.layout({} as monaco.editor.IDimension)
  );

  const htmlChangeListener = _debounce(() => {
    const value = htmlEditor.getValue();

    renderHTML(value);
  }, DEBOUNCE_TIMEOUT);

  htmlChangeListener();
  htmlEditor.onDidChangeModelContent(htmlChangeListener);

  cssEditor = monaco.editor.create(cssDOM, {
    value: ['p {', '  color: #424242;', '}'].join('\n'),
    language: 'css',
    ...editorOptions,
  });

  window.addEventListener('resize', () =>
    cssEditor.layout({} as monaco.editor.IDimension)
  );

  const cssChangeListener = _debounce(() => {
    const value = cssEditor.getValue();

    renderCSS(value);
  }, DEBOUNCE_TIMEOUT);

  cssChangeListener();
  cssEditor.onDidChangeModelContent(cssChangeListener);

  initializeDrag(htmlEditor, cssEditor);
}

const outputHTML = document.getElementById('output-html');
const outputCSS = document.getElementById('output-css');

function renderHTML(value: string) {
  if (outputHTML) outputHTML.innerHTML = value;
}

function renderCSS(value: string) {
  if (outputCSS) outputCSS.innerHTML = value;
}
