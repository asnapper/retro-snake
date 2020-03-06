// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"sound.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var audioContext = new AudioContext();
var gain = audioContext.createGain();
gain.connect(audioContext.destination);
var beeping = false;

exports.beep = function (vol, freq, duration) {
  if (!beeping) {
    beeping = true;
    gain.gain.value = vol * 0.01;
    var oscillator = audioContext.createOscillator();
    oscillator.addEventListener('ended', function () {
      return beeping = false;
    });
    oscillator.connect(gain);
    oscillator.frequency.value = freq;
    oscillator.type = "square";
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration * 0.001);
  }
};
},{}],"apples.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
var points = {};

exports.map = function () {
  return points;
};

exports.add = function (x, y) {
  points[x] = points[x] || {};
  points[x][y] = true;
};

exports.remove = function (x, y) {
  delete points[x][y];
};

exports.exists = function (x, y) {
  return x in points && y in points[x];
};

exports.all = function () {
  return Object.keys(points).reduce(function (acc, valX) {
    return __spreadArrays(acc, Object.keys(points[valX]).reduce(function (acc, valY) {
      return __spreadArrays(acc, [[valX, valY]]);
    }, []));
  }, []);
};
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sound_1 = require("./sound");

var apples = __importStar(require("./apples"));

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var gameHeight = 100;
var gameWidth = 100;
var gameSpeed = 50;
var cellHeight = height / gameHeight;
var cellWidth = width / gameWidth;
var directions = {
  NORTH: 0,
  SOUTH: 1,
  EAST: 2,
  WEST: 3
};
var direction = directions.SOUTH;
var coordinates = {
  X: 0,
  Y: 1
};
var snake = [[50, 50], [50, 51], [50, 52], [50, 53], [50, 54], [50, 55], [50, 56], [50, 57], [50, 58], [50, 59]];

var addRandomApples = function addRandomApples(num) {
  if (num === void 0) {
    num = 5;
  }

  for (var i = 0; i < num; i++) {
    apples.add(Math.floor(Math.random() * gameWidth), Math.floor(Math.random() * gameHeight));
  }
};

addRandomApples();
var allApples = apples.all(); // let apples = [
//     [0, 0],
//     [
// Math.floor(Math.random() * gameWidth),
// Math.floor(Math.random() * gameHeight)
//     ],
//     [
//         Math.floor(Math.random() * gameWidth),
//         Math.floor(Math.random() * gameHeight)
//     ],
//     [
//         Math.floor(Math.random() * gameWidth),
//         Math.floor(Math.random() * gameHeight)
//     ],
//     [gameWidth - 1, gameHeight - 1]
// ]
// let appleIndex: any = {}
// apples.forEach(([x, y]) => {
//     appleIndex[x] = appleIndex[x] || {}
//     appleIndex[x][y] = true
// })

var paused = true;
var failed = false;
var last = performance.now();
var lastDiff = 0;
var score = 0;

var updateGameState = function updateGameState() {
  var now = performance.now();
  var diff = now - last + lastDiff;
  last = now;

  if (diff > gameSpeed) {
    if (allApples.length == 0) {
      addRandomApples();
    }

    var snakeHead = snake[snake.length - 1];

    var nextHead = __spreadArrays(snakeHead);

    switch (direction) {
      case directions.NORTH:
        nextHead[coordinates.Y] = (nextHead[coordinates.Y] - 1) % gameHeight;
        break;

      case directions.SOUTH:
        nextHead[coordinates.Y] = (nextHead[coordinates.Y] + 1) % gameHeight;
        break;

      case directions.EAST:
        nextHead[coordinates.X] = (nextHead[coordinates.X] + 1) % gameWidth;
        break;

      case directions.WEST:
        nextHead[coordinates.X] = (nextHead[coordinates.X] - 1) % gameWidth;
        break;

      default:
        throw new Error('invalid direction');
    }

    if (nextHead[coordinates.X] < 0) {
      nextHead[coordinates.X] = gameWidth;
    }

    if (nextHead[coordinates.Y] < 0) {
      nextHead[coordinates.Y] = gameHeight;
    }

    var x_1 = nextHead[0],
        y_1 = nextHead[1];
    var grow = false;

    if (apples.exists(x_1, y_1)) {
      apples.remove(x_1, y_1);
      sound_1.beep(50, 1500, 30);
      grow = true;
      gameSpeed--;
      score++;
    } else if (!!snake.find(function (p) {
      return p[coordinates.X] == x_1 && p[coordinates.Y] == y_1;
    })) {
      failed = true;
      sound_1.beep(90, 200, 100);
      sound_1.beep(90, 200, 100);
      sound_1.beep(90, 200, 100);
    }

    snake = __spreadArrays(snake.slice(grow ? 0 : 1, snake.length), [nextHead]);
    lastDiff = diff - gameSpeed;
  } else {
    lastDiff = diff;
  }
};

var render = function render() {
  context.fillStyle = '#70806C';
  context.fillRect(0, 0, width, height); // render snake

  for (var i = 0; i < snake.length; i++) {
    var _a = snake[i],
        x = _a[0],
        y = _a[1];
    context.fillStyle = '#10120F';
    context.fillRect(x * cellWidth + 1, y * cellHeight + 1, cellWidth - 2, cellHeight - 2);
  } // render apples


  allApples = apples.all();

  for (var i = 0; i < allApples.length; i++) {
    var _b = allApples[i],
        x = _b[0],
        y = _b[1];
    context.beginPath();
    context.fillStyle = '#10120F';
    context.arc(x * cellWidth + cellWidth / 2, y * cellHeight + cellHeight / 2, cellWidth / 2 - 1, 0, 2 * Math.PI);
    context.fill();
  } //render score


  context.font = '50px arcade-classic';
  var scoreText = 'Score: 000' + score;
  var textSize = context.measureText(scoreText);
  context.fillText(scoreText, width - textSize.width - 10, 60); // render pause message

  if (paused) {
    context.font = '250px arcade-classic';
    var textSize_1 = context.measureText('PAUSED');
    context.fillText('PAUSED', width / 2 - textSize_1.width / 2, height / 2);
  } // render pause message


  if (failed) {
    context.font = '240px arcade-classic';
    var textSize_2 = context.measureText('YOU SUCK');
    context.fillText('YOU SUCK', width / 2 - textSize_2.width / 2, height / 2);
  }
};

var keys = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  ENTER: 'Enter'
};

var handleInput = function handleInput(event) {
  switch (event.key) {
    case keys.UP:
      if (direction != directions.SOUTH) {
        direction = directions.NORTH;
      }

      break;

    case keys.DOWN:
      if (direction != directions.NORTH) {
        direction = directions.SOUTH;
      }

      break;

    case keys.LEFT:
      if (direction != directions.EAST) {
        direction = directions.WEST;
      }

      break;

    case keys.RIGHT:
      if (direction != directions.WEST) {
        direction = directions.EAST;
      }

      break;

    case keys.ENTER:
      if (paused || failed) {
        paused = false;
        failed = false;
        last = performance.now();
      } else {
        paused = true;
      }

      sound_1.beep(50, 1000, 50);
      break;

    default:
      console.log('unhandled keydown:', event.key);
  }
};

window.addEventListener('keydown', handleInput);

var gameLoop = function gameLoop() {
  render();

  if (!paused && !failed) {
    updateGameState();
  }

  requestAnimationFrame(gameLoop);
};

gameLoop();
},{"./sound":"sound.ts","./apples":"apples.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55420" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map