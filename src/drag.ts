import * as monaco from 'monaco-editor';

export function initializeDrag(
  htmlEditor: monaco.editor.IStandaloneCodeEditor,
  cssEditor: monaco.editor.IStandaloneCodeEditor,
  htmlDOM: HTMLElement | null,
  cssDOM: HTMLElement | null
) {
  // Horizontal panels
  const editorDOM = document.getElementById('editors');
  const outputDOM = document.getElementById('output');

  // Horizontal panel overlays
  const overlayDOM = document.getElementById('overlay');
  const overlayLeftDOM = document.getElementById('overlay-left');
  const overlayRightDOM = document.getElementById('overlay-right');

  // Divider DOMs
  const dividerX = document.getElementById('divider-x');
  const dividerY = document.getElementById('divider-y');

  const UPDATE_THRESHOLD = 20;

  // Dividing drag values
  let draggingX = false;
  let draggingY = false;

  // Divider positions
  let dividerXPosition: number;
  let previousDividerXPosition: number;

  let dividerYPosition: number;
  let previousDividerYPosition: number;

  dividerX?.addEventListener('mousedown', (event) => {
    draggingX = true;
    overlayDOM?.classList.add('show');

    previousDividerXPosition = event.clientX;

    if (!dividerXPosition) dividerXPosition = event.clientX;
  });

  dividerY?.addEventListener('mousedown', (event) => {
    draggingY = true;

    previousDividerYPosition = event.clientY;

    if (!dividerYPosition) dividerYPosition = event.clientY;
  });

  window.addEventListener('mousemove', (event) => {
    // Update horizontal divider position
    if (draggingX && dividerX) {
      dividerXPosition = event.clientX;

      dividerX.style.left = `calc(${dividerXPosition}px - 4px)`;

      updateOverlay();
    }

    // Update vertical divider position
    if (draggingY && dividerY) {
      dividerYPosition = event.clientY;

      dividerY.style.top = `calc(${dividerYPosition}px - 4px)`;
    }
  });

  // Update horizontal panel overlay DOM sizes
  function updateOverlay() {
    if (overlayLeftDOM && overlayRightDOM) {
      const windowWidth = window.innerWidth;

      const left = (dividerXPosition / windowWidth) * 100;
      const right = 100 - (dividerXPosition / windowWidth) * 100;

      overlayLeftDOM.style.flexBasis = `${left}%`;
      overlayRightDOM.style.flexBasis = `${right}%`;
    }
  }

  // Update horizontal panel DOM sizes
  function updateDividerX() {
    if (editorDOM && outputDOM) {
      const windowWidth = window.innerWidth;

      editorDOM.style.flexBasis = `${(dividerXPosition / windowWidth) * 100}%`;
      outputDOM.style.flexBasis = `${
        100 - (dividerXPosition / windowWidth) * 100
      }%`;
    }
  }

  // Update vertical panel DOM sizes
  function updateDividerY() {
    if (htmlDOM && cssDOM) {
      const windowHeight = window.innerHeight;

      htmlDOM.style.flexBasis = `${(dividerYPosition / windowHeight) * 100}%`;
      cssDOM.style.flexBasis = `${
        100 - (dividerYPosition / windowHeight) * 100
      }%`;
    }
  }

  window.addEventListener('mouseup', () => {
    // Check horizontal panel update
    if (draggingX && dividerX) {
      overlayDOM?.classList.remove('show');

      const shouldUpdateX =
        Math.abs(dividerXPosition - previousDividerXPosition) >
        UPDATE_THRESHOLD;

      if (shouldUpdateX) {
        updateDividerX();

        htmlEditor.layout({} as monaco.editor.IDimension);
        cssEditor.layout({} as monaco.editor.IDimension);
      } else {
        dividerX.style.left = `calc(${previousDividerXPosition}px - 4px)`;
      }
    }
    draggingX = false;

    // Check vertical panel update
    if (draggingY && dividerY) {
      const shouldUpdateY =
        Math.abs(dividerYPosition - previousDividerYPosition) >
        UPDATE_THRESHOLD;

      if (shouldUpdateY) {
        updateDividerY();

        htmlEditor.layout({} as monaco.editor.IDimension);
        cssEditor.layout({} as monaco.editor.IDimension);
      } else {
        dividerY.style.top = `calc(${previousDividerYPosition}px - 4px)`;
      }
    }
    draggingY = false;
  });
}
