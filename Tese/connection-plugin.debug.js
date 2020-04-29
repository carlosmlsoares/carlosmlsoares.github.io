/*!
* rete-connection-plugin v0.3.0
* (c) 2018
* Released under the ISC license.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ConnectionPlugin = factory());
}(this, (function () { 'use strict';

  function ___$insertStyle(css) {
    if (!css) {
      return;
    }
    if (typeof window === 'undefined') {
      return;
    }

    var style = document.createElement('style');

    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);

    return css;
  }

  ___$insertStyle(".connection {\n  overflow: visible !important;\n  width: 12px;\n  height: 12px; }\n  .connection .main-path {\n    fill: none;\n    stroke-width: 4px;\n    stroke: grey; }\n");

  function toTrainCase(str) {
      return str.toLowerCase().replace(/ /g, '-');
  }

  function defaultPath(points, curvature) {
      const [x1, y1, x2, y2] = points;
      const hx1 = x1 + Math.abs(x2 - x1) * curvature;
      const hx2 = x2 - Math.abs(x2 - x1) * curvature;

      return `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
  }

  function renderPathData(emitter, points, connection) {
      const data = { points, connection, d: '' };

      emitter.trigger('connectionpath', data);

      return data.d || defaultPath(points, 0.4);
  }

  function updateConnection({ el, d }) {
      const path = el.querySelector('.connection path');

      if (!path) throw new Error('Path of connection was broken');

      path.setAttribute('d', d);
  }

  function renderConnection({ el, d, connection }) {
      const classed = !connection ? [] : ['input-' + toTrainCase(connection.input.name), 'output-' + toTrainCase(connection.output.name), 'socket-input-' + toTrainCase(connection.input.socket.name), 'socket-output-' + toTrainCase(connection.output.socket.name)];

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      svg.classList.add('connection', ...classed);
      path.classList.add('main-path');
      path.setAttribute('d', d);

      svg.appendChild(path);
      el.appendChild(svg);

      updateConnection({ el, d });
  }

  class Picker {

      constructor(editor) {
          this.el = document.createElement('div');
          this.editor = editor;
          this._output = null;
      }

      get output() {
          return this._output;
      }

      set output(val) {
          const { area } = this.editor.view;

          this._output = val;
          if (val !== null) {
              area.appendChild(this.el);
              this.renderConnection();
          } else if (this.el.parentElement) {
              area.removeChild(this.el);
              this.el.innerHTML = '';
          }
      }

      getPoints() {
          const mouse = this.editor.view.area.mouse;
          const node = this.editor.view.nodes.get(this.output.node);
          const [x1, y1] = node.getSocketPosition(this.output);

          return [x1, y1, mouse.x, mouse.y];
      }

      updateConnection() {
          if (!this.output) return;

          const d = renderPathData(this.editor, this.getPoints());

          updateConnection({ el: this.el, d });
      }

      renderConnection() {
          if (!this.output) return;

          const d = renderPathData(this.editor, this.getPoints());

          renderConnection({ el: this.el, d, connection: null });
      }

  }

  function install(editor) {
      editor.bind('connectionpath');

      var picker = new Picker(editor);

      function pickOutput(output) {
          if (output) {
              picker.output = output;
              return;
          }
      }

      function pickInput(input) {
          if (picker.output === null) {
              if (input.hasConnection()) {
                  picker.output = input.connections[0].output;
                  editor.removeConnection(input.connections[0]);
              }
              return true;
          }

          if (!input.multipleConnections && input.hasConnection()) editor.removeConnection(input.connections[0]);

          if (!picker.output.multipleConnections && picker.output.hasConnection()) editor.removeConnection(picker.output.connections[0]);

          if (picker.output.connectedTo(input)) {
              var connection = input.connections.find(c => {
                  return c.output === picker.output;
              });

              editor.removeConnection(connection);
          }

          editor.connect(picker.output, input);
          picker.output = null;
      }

      editor.on('rendersocket', ({ el, input, output }) => {

          var prevent = false;

          function mouseHandle(e) {
              if (prevent) return;
              e.stopPropagation();
              e.preventDefault();

              if (input) pickInput(input);else if (output) pickOutput(output);
          }

          el.addEventListener('mousedown', e => {
              return mouseHandle(e), prevent = true;
          });
          el.addEventListener('mouseup', mouseHandle);
          el.addEventListener('click', e => {
              return mouseHandle(e), prevent = false;
          });
          el.addEventListener('mousemove', () => {
              return prevent = false;
          });
      });

      editor.on('mousemove', () => {
          picker.updateConnection();
      });

      editor.view.container.addEventListener('mousedown', () => {
          picker.output = null;
      });

      editor.on('renderconnection', ({ el, connection, points }) => {
          const d = renderPathData(editor, points, connection);

          el.addEventListener('contextmenu', e => {
              e.stopPropagation();
              e.preventDefault();

              pickInput(connection.input);
          });

          renderConnection({ el, d, connection });
      });

      editor.on('updateconnection', ({ el, connection, points }) => {
          const d = renderPathData(editor, points, connection);

          updateConnection({ el, connection, d });
      });
  }

  var index$1 = {
      install,
      defaultPath
  };

  return index$1;

})));
//# sourceMappingURL=connection-plugin.debug.js.map
