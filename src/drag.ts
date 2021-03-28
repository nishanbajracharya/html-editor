import * as monaco from 'monaco-editor';

export function initializeDrag(
  htmlEditor: monaco.editor.IStandaloneCodeEditor,
  cssEditor: monaco.editor.IStandaloneCodeEditor
) {
  const editorDOM = document.getElementById('editors');
  const outputDOM = document.getElementById('output');

  const overlayDOM = document.getElementById('overlay');
  const overlayLeftDOM = document.getElementById('overlay-left');
  const overlayRightDOM = document.getElementById('overlay-right');

  let dragging = false;

  let shouldUpdate = false;

  const UPDATE_THRESHOLD = 20;

  const divider = document.getElementById('divider');

  let previousDividerPosition: number;
  let dividerPosition: number;

  divider?.addEventListener('mousedown', (event) => {
    dragging = true;
    overlayDOM?.classList.add('show');

    previousDividerPosition = event.clientX;

    if (!dividerPosition) dividerPosition = event.clientX;
  });

  window.addEventListener('mousemove', (event) => {
    if (
      dragging &&
      divider &&
      overlayDOM &&
      overlayLeftDOM &&
      overlayRightDOM
    ) {
      dividerPosition = event.clientX;

      divider.style.left = `calc(${dividerPosition}px - 4px)`;

      const windowWidth = window.innerWidth;

      const left = (dividerPosition / windowWidth) * 100;
      const right = 100 - (dividerPosition / windowWidth) * 100;

      overlayLeftDOM.style.flexBasis = `${left}%`;
      overlayRightDOM.style.flexBasis = `${right}%`;
    }
  });

  function updateDivider() {
    if (editorDOM && outputDOM) {
      const windowWidth = window.innerWidth;

      editorDOM.style.flexBasis = `${(dividerPosition / windowWidth) * 100}%`;
      outputDOM.style.flexBasis = `${
        100 - (dividerPosition / windowWidth) * 100
      }%`;
    }
  }

  window.addEventListener('mouseup', () => {
    if (dragging && divider) {
      overlayDOM?.classList.remove('show');

      shouldUpdate =
        Math.abs(dividerPosition - previousDividerPosition) > UPDATE_THRESHOLD;

      if (shouldUpdate) {
        updateDivider();

        if (shouldUpdate) {
          htmlEditor.layout({} as monaco.editor.IDimension);
          cssEditor.layout({} as monaco.editor.IDimension);
        }
      } else {
        divider.style.left = `calc(${previousDividerPosition}px - 4px)`;
      }
    }
    dragging = false;
  });
}
