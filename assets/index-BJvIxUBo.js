(function () {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const c of o)
      if (c.type === "childList")
        for (const f of c.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && r(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const c = {};
    return (
      o.integrity && (c.integrity = o.integrity),
      o.referrerPolicy && (c.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (c.credentials = "omit")
          : (c.credentials = "same-origin"),
      c
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const c = s(o);
    fetch(o.href, c);
  }
})();
function _f(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var Dc = { exports: {} },
  zs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vg;
function bS() {
  if (vg) return zs;
  vg = 1;
  var n = Symbol.for("react.transitional.element"),
    a = Symbol.for("react.fragment");
  function s(r, o, c) {
    var f = null;
    if (
      (c !== void 0 && (f = "" + c),
      o.key !== void 0 && (f = "" + o.key),
      "key" in o)
    ) {
      c = {};
      for (var m in o) m !== "key" && (c[m] = o[m]);
    } else c = o;
    return (
      (o = c.ref),
      { $$typeof: n, type: r, key: f, ref: o !== void 0 ? o : null, props: c }
    );
  }
  return ((zs.Fragment = a), (zs.jsx = s), (zs.jsxs = s), zs);
}
var xg;
function SS() {
  return (xg || ((xg = 1), (Dc.exports = bS())), Dc.exports);
}
var A = SS(),
  Mc = { exports: {} },
  ge = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bg;
function TS() {
  if (bg) return ge;
  bg = 1;
  var n = Symbol.for("react.transitional.element"),
    a = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    c = Symbol.for("react.consumer"),
    f = Symbol.for("react.context"),
    m = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    h = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    v = Symbol.iterator;
  function x(S) {
    return S === null || typeof S != "object"
      ? null
      : ((S = (v && S[v]) || S["@@iterator"]),
        typeof S == "function" ? S : null);
  }
  var T = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    E = Object.assign,
    M = {};
  function N(S, D, F) {
    ((this.props = S),
      (this.context = D),
      (this.refs = M),
      (this.updater = F || T));
  }
  ((N.prototype.isReactComponent = {}),
    (N.prototype.setState = function (S, D) {
      if (typeof S != "object" && typeof S != "function" && S != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, S, D, "setState");
    }),
    (N.prototype.forceUpdate = function (S) {
      this.updater.enqueueForceUpdate(this, S, "forceUpdate");
    }));
  function R() {}
  R.prototype = N.prototype;
  function G(S, D, F) {
    ((this.props = S),
      (this.context = D),
      (this.refs = M),
      (this.updater = F || T));
  }
  var V = (G.prototype = new R());
  ((V.constructor = G), E(V, N.prototype), (V.isPureReactComponent = !0));
  var Q = Array.isArray,
    q = { H: null, A: null, T: null, S: null, V: null },
    ae = Object.prototype.hasOwnProperty;
  function te(S, D, F, X, W, se) {
    return (
      (F = se.ref),
      { $$typeof: n, type: S, key: D, ref: F !== void 0 ? F : null, props: se }
    );
  }
  function k(S, D) {
    return te(S.type, D, void 0, void 0, void 0, S.props);
  }
  function j(S) {
    return typeof S == "object" && S !== null && S.$$typeof === n;
  }
  function H(S) {
    var D = { "=": "=0", ":": "=2" };
    return (
      "$" +
      S.replace(/[=:]/g, function (F) {
        return D[F];
      })
    );
  }
  var I = /\/+/g;
  function ee(S, D) {
    return typeof S == "object" && S !== null && S.key != null
      ? H("" + S.key)
      : D.toString(36);
  }
  function oe() {}
  function ve(S) {
    switch (S.status) {
      case "fulfilled":
        return S.value;
      case "rejected":
        throw S.reason;
      default:
        switch (
          (typeof S.status == "string"
            ? S.then(oe, oe)
            : ((S.status = "pending"),
              S.then(
                function (D) {
                  S.status === "pending" &&
                    ((S.status = "fulfilled"), (S.value = D));
                },
                function (D) {
                  S.status === "pending" &&
                    ((S.status = "rejected"), (S.reason = D));
                },
              )),
          S.status)
        ) {
          case "fulfilled":
            return S.value;
          case "rejected":
            throw S.reason;
        }
    }
    throw S;
  }
  function ce(S, D, F, X, W) {
    var se = typeof S;
    (se === "undefined" || se === "boolean") && (S = null);
    var ne = !1;
    if (S === null) ne = !0;
    else
      switch (se) {
        case "bigint":
        case "string":
        case "number":
          ne = !0;
          break;
        case "object":
          switch (S.$$typeof) {
            case n:
            case a:
              ne = !0;
              break;
            case g:
              return ((ne = S._init), ce(ne(S._payload), D, F, X, W));
          }
      }
    if (ne)
      return (
        (W = W(S)),
        (ne = X === "" ? "." + ee(S, 0) : X),
        Q(W)
          ? ((F = ""),
            ne != null && (F = ne.replace(I, "$&/") + "/"),
            ce(W, D, F, "", function (ze) {
              return ze;
            }))
          : W != null &&
            (j(W) &&
              (W = k(
                W,
                F +
                  (W.key == null || (S && S.key === W.key)
                    ? ""
                    : ("" + W.key).replace(I, "$&/") + "/") +
                  ne,
              )),
            D.push(W)),
        1
      );
    ne = 0;
    var Ee = X === "" ? "." : X + ":";
    if (Q(S))
      for (var me = 0; me < S.length; me++)
        ((X = S[me]), (se = Ee + ee(X, me)), (ne += ce(X, D, F, se, W)));
    else if (((me = x(S)), typeof me == "function"))
      for (S = me.call(S), me = 0; !(X = S.next()).done; )
        ((X = X.value), (se = Ee + ee(X, me++)), (ne += ce(X, D, F, se, W)));
    else if (se === "object") {
      if (typeof S.then == "function") return ce(ve(S), D, F, X, W);
      throw (
        (D = String(S)),
        Error(
          "Objects are not valid as a React child (found: " +
            (D === "[object Object]"
              ? "object with keys {" + Object.keys(S).join(", ") + "}"
              : D) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return ne;
  }
  function U(S, D, F) {
    if (S == null) return S;
    var X = [],
      W = 0;
    return (
      ce(S, X, "", "", function (se) {
        return D.call(F, se, W++);
      }),
      X
    );
  }
  function Y(S) {
    if (S._status === -1) {
      var D = S._result;
      ((D = D()),
        D.then(
          function (F) {
            (S._status === 0 || S._status === -1) &&
              ((S._status = 1), (S._result = F));
          },
          function (F) {
            (S._status === 0 || S._status === -1) &&
              ((S._status = 2), (S._result = F));
          },
        ),
        S._status === -1 && ((S._status = 0), (S._result = D)));
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var J =
    typeof reportError == "function"
      ? reportError
      : function (S) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var D = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof S == "object" &&
                S !== null &&
                typeof S.message == "string"
                  ? String(S.message)
                  : String(S),
              error: S,
            });
            if (!window.dispatchEvent(D)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", S);
            return;
          }
          console.error(S);
        };
  function le() {}
  return (
    (ge.Children = {
      map: U,
      forEach: function (S, D, F) {
        U(
          S,
          function () {
            D.apply(this, arguments);
          },
          F,
        );
      },
      count: function (S) {
        var D = 0;
        return (
          U(S, function () {
            D++;
          }),
          D
        );
      },
      toArray: function (S) {
        return (
          U(S, function (D) {
            return D;
          }) || []
        );
      },
      only: function (S) {
        if (!j(S))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return S;
      },
    }),
    (ge.Component = N),
    (ge.Fragment = s),
    (ge.Profiler = o),
    (ge.PureComponent = G),
    (ge.StrictMode = r),
    (ge.Suspense = p),
    (ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q),
    (ge.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (S) {
        return q.H.useMemoCache(S);
      },
    }),
    (ge.cache = function (S) {
      return function () {
        return S.apply(null, arguments);
      };
    }),
    (ge.cloneElement = function (S, D, F) {
      if (S == null)
        throw Error(
          "The argument must be a React element, but you passed " + S + ".",
        );
      var X = E({}, S.props),
        W = S.key,
        se = void 0;
      if (D != null)
        for (ne in (D.ref !== void 0 && (se = void 0),
        D.key !== void 0 && (W = "" + D.key),
        D))
          !ae.call(D, ne) ||
            ne === "key" ||
            ne === "__self" ||
            ne === "__source" ||
            (ne === "ref" && D.ref === void 0) ||
            (X[ne] = D[ne]);
      var ne = arguments.length - 2;
      if (ne === 1) X.children = F;
      else if (1 < ne) {
        for (var Ee = Array(ne), me = 0; me < ne; me++)
          Ee[me] = arguments[me + 2];
        X.children = Ee;
      }
      return te(S.type, W, void 0, void 0, se, X);
    }),
    (ge.createContext = function (S) {
      return (
        (S = {
          $$typeof: f,
          _currentValue: S,
          _currentValue2: S,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (S.Provider = S),
        (S.Consumer = { $$typeof: c, _context: S }),
        S
      );
    }),
    (ge.createElement = function (S, D, F) {
      var X,
        W = {},
        se = null;
      if (D != null)
        for (X in (D.key !== void 0 && (se = "" + D.key), D))
          ae.call(D, X) &&
            X !== "key" &&
            X !== "__self" &&
            X !== "__source" &&
            (W[X] = D[X]);
      var ne = arguments.length - 2;
      if (ne === 1) W.children = F;
      else if (1 < ne) {
        for (var Ee = Array(ne), me = 0; me < ne; me++)
          Ee[me] = arguments[me + 2];
        W.children = Ee;
      }
      if (S && S.defaultProps)
        for (X in ((ne = S.defaultProps), ne))
          W[X] === void 0 && (W[X] = ne[X]);
      return te(S, se, void 0, void 0, null, W);
    }),
    (ge.createRef = function () {
      return { current: null };
    }),
    (ge.forwardRef = function (S) {
      return { $$typeof: m, render: S };
    }),
    (ge.isValidElement = j),
    (ge.lazy = function (S) {
      return { $$typeof: g, _payload: { _status: -1, _result: S }, _init: Y };
    }),
    (ge.memo = function (S, D) {
      return { $$typeof: h, type: S, compare: D === void 0 ? null : D };
    }),
    (ge.startTransition = function (S) {
      var D = q.T,
        F = {};
      q.T = F;
      try {
        var X = S(),
          W = q.S;
        (W !== null && W(F, X),
          typeof X == "object" &&
            X !== null &&
            typeof X.then == "function" &&
            X.then(le, J));
      } catch (se) {
        J(se);
      } finally {
        q.T = D;
      }
    }),
    (ge.unstable_useCacheRefresh = function () {
      return q.H.useCacheRefresh();
    }),
    (ge.use = function (S) {
      return q.H.use(S);
    }),
    (ge.useActionState = function (S, D, F) {
      return q.H.useActionState(S, D, F);
    }),
    (ge.useCallback = function (S, D) {
      return q.H.useCallback(S, D);
    }),
    (ge.useContext = function (S) {
      return q.H.useContext(S);
    }),
    (ge.useDebugValue = function () {}),
    (ge.useDeferredValue = function (S, D) {
      return q.H.useDeferredValue(S, D);
    }),
    (ge.useEffect = function (S, D, F) {
      var X = q.H;
      if (typeof F == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return X.useEffect(S, D);
    }),
    (ge.useId = function () {
      return q.H.useId();
    }),
    (ge.useImperativeHandle = function (S, D, F) {
      return q.H.useImperativeHandle(S, D, F);
    }),
    (ge.useInsertionEffect = function (S, D) {
      return q.H.useInsertionEffect(S, D);
    }),
    (ge.useLayoutEffect = function (S, D) {
      return q.H.useLayoutEffect(S, D);
    }),
    (ge.useMemo = function (S, D) {
      return q.H.useMemo(S, D);
    }),
    (ge.useOptimistic = function (S, D) {
      return q.H.useOptimistic(S, D);
    }),
    (ge.useReducer = function (S, D, F) {
      return q.H.useReducer(S, D, F);
    }),
    (ge.useRef = function (S) {
      return q.H.useRef(S);
    }),
    (ge.useState = function (S) {
      return q.H.useState(S);
    }),
    (ge.useSyncExternalStore = function (S, D, F) {
      return q.H.useSyncExternalStore(S, D, F);
    }),
    (ge.useTransition = function () {
      return q.H.useTransition();
    }),
    (ge.version = "19.1.0"),
    ge
  );
}
var Sg;
function ro() {
  return (Sg || ((Sg = 1), (Mc.exports = TS())), Mc.exports);
}
var C = ro();
const Le = _f(C);
var Nc = { exports: {} },
  Us = {},
  jc = { exports: {} },
  Lc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tg;
function ES() {
  return (
    Tg ||
      ((Tg = 1),
      (function (n) {
        function a(U, Y) {
          var J = U.length;
          U.push(Y);
          e: for (; 0 < J; ) {
            var le = (J - 1) >>> 1,
              S = U[le];
            if (0 < o(S, Y)) ((U[le] = Y), (U[J] = S), (J = le));
            else break e;
          }
        }
        function s(U) {
          return U.length === 0 ? null : U[0];
        }
        function r(U) {
          if (U.length === 0) return null;
          var Y = U[0],
            J = U.pop();
          if (J !== Y) {
            U[0] = J;
            e: for (var le = 0, S = U.length, D = S >>> 1; le < D; ) {
              var F = 2 * (le + 1) - 1,
                X = U[F],
                W = F + 1,
                se = U[W];
              if (0 > o(X, J))
                W < S && 0 > o(se, X)
                  ? ((U[le] = se), (U[W] = J), (le = W))
                  : ((U[le] = X), (U[F] = J), (le = F));
              else if (W < S && 0 > o(se, J))
                ((U[le] = se), (U[W] = J), (le = W));
              else break e;
            }
          }
          return Y;
        }
        function o(U, Y) {
          var J = U.sortIndex - Y.sortIndex;
          return J !== 0 ? J : U.id - Y.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var c = performance;
          n.unstable_now = function () {
            return c.now();
          };
        } else {
          var f = Date,
            m = f.now();
          n.unstable_now = function () {
            return f.now() - m;
          };
        }
        var p = [],
          h = [],
          g = 1,
          v = null,
          x = 3,
          T = !1,
          E = !1,
          M = !1,
          N = !1,
          R = typeof setTimeout == "function" ? setTimeout : null,
          G = typeof clearTimeout == "function" ? clearTimeout : null,
          V = typeof setImmediate < "u" ? setImmediate : null;
        function Q(U) {
          for (var Y = s(h); Y !== null; ) {
            if (Y.callback === null) r(h);
            else if (Y.startTime <= U)
              (r(h), (Y.sortIndex = Y.expirationTime), a(p, Y));
            else break;
            Y = s(h);
          }
        }
        function q(U) {
          if (((M = !1), Q(U), !E))
            if (s(p) !== null) ((E = !0), ae || ((ae = !0), ee()));
            else {
              var Y = s(h);
              Y !== null && ce(q, Y.startTime - U);
            }
        }
        var ae = !1,
          te = -1,
          k = 5,
          j = -1;
        function H() {
          return N ? !0 : !(n.unstable_now() - j < k);
        }
        function I() {
          if (((N = !1), ae)) {
            var U = n.unstable_now();
            j = U;
            var Y = !0;
            try {
              e: {
                ((E = !1), M && ((M = !1), G(te), (te = -1)), (T = !0));
                var J = x;
                try {
                  t: {
                    for (
                      Q(U), v = s(p);
                      v !== null && !(v.expirationTime > U && H());
                    ) {
                      var le = v.callback;
                      if (typeof le == "function") {
                        ((v.callback = null), (x = v.priorityLevel));
                        var S = le(v.expirationTime <= U);
                        if (((U = n.unstable_now()), typeof S == "function")) {
                          ((v.callback = S), Q(U), (Y = !0));
                          break t;
                        }
                        (v === s(p) && r(p), Q(U));
                      } else r(p);
                      v = s(p);
                    }
                    if (v !== null) Y = !0;
                    else {
                      var D = s(h);
                      (D !== null && ce(q, D.startTime - U), (Y = !1));
                    }
                  }
                  break e;
                } finally {
                  ((v = null), (x = J), (T = !1));
                }
                Y = void 0;
              }
            } finally {
              Y ? ee() : (ae = !1);
            }
          }
        }
        var ee;
        if (typeof V == "function")
          ee = function () {
            V(I);
          };
        else if (typeof MessageChannel < "u") {
          var oe = new MessageChannel(),
            ve = oe.port2;
          ((oe.port1.onmessage = I),
            (ee = function () {
              ve.postMessage(null);
            }));
        } else
          ee = function () {
            R(I, 0);
          };
        function ce(U, Y) {
          te = R(function () {
            U(n.unstable_now());
          }, Y);
        }
        ((n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (U) {
            U.callback = null;
          }),
          (n.unstable_forceFrameRate = function (U) {
            0 > U || 125 < U
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (k = 0 < U ? Math.floor(1e3 / U) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (n.unstable_next = function (U) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var Y = 3;
                break;
              default:
                Y = x;
            }
            var J = x;
            x = Y;
            try {
              return U();
            } finally {
              x = J;
            }
          }),
          (n.unstable_requestPaint = function () {
            N = !0;
          }),
          (n.unstable_runWithPriority = function (U, Y) {
            switch (U) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                U = 3;
            }
            var J = x;
            x = U;
            try {
              return Y();
            } finally {
              x = J;
            }
          }),
          (n.unstable_scheduleCallback = function (U, Y, J) {
            var le = n.unstable_now();
            switch (
              (typeof J == "object" && J !== null
                ? ((J = J.delay),
                  (J = typeof J == "number" && 0 < J ? le + J : le))
                : (J = le),
              U)
            ) {
              case 1:
                var S = -1;
                break;
              case 2:
                S = 250;
                break;
              case 5:
                S = 1073741823;
                break;
              case 4:
                S = 1e4;
                break;
              default:
                S = 5e3;
            }
            return (
              (S = J + S),
              (U = {
                id: g++,
                callback: Y,
                priorityLevel: U,
                startTime: J,
                expirationTime: S,
                sortIndex: -1,
              }),
              J > le
                ? ((U.sortIndex = J),
                  a(h, U),
                  s(p) === null &&
                    U === s(h) &&
                    (M ? (G(te), (te = -1)) : (M = !0), ce(q, J - le)))
                : ((U.sortIndex = S),
                  a(p, U),
                  E || T || ((E = !0), ae || ((ae = !0), ee()))),
              U
            );
          }),
          (n.unstable_shouldYield = H),
          (n.unstable_wrapCallback = function (U) {
            var Y = x;
            return function () {
              var J = x;
              x = Y;
              try {
                return U.apply(this, arguments);
              } finally {
                x = J;
              }
            };
          }));
      })(Lc)),
    Lc
  );
}
var Eg;
function wS() {
  return (Eg || ((Eg = 1), (jc.exports = ES())), jc.exports);
}
var Vc = { exports: {} },
  ht = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wg;
function AS() {
  if (wg) return ht;
  wg = 1;
  var n = ro();
  function a(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        h += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      h +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s() {}
  var r = {
      d: {
        f: s,
        r: function () {
          throw Error(a(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for("react.portal");
  function c(p, h, g) {
    var v =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: h,
      implementation: g,
    };
  }
  var f = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, h) {
    if (p === "font") return "";
    if (typeof h == "string") return h === "use-credentials" ? h : "";
  }
  return (
    (ht.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (ht.createPortal = function (p, h) {
      var g =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11))
        throw Error(a(299));
      return c(p, h, null, g);
    }),
    (ht.flushSync = function (p) {
      var h = f.T,
        g = r.p;
      try {
        if (((f.T = null), (r.p = 2), p)) return p();
      } finally {
        ((f.T = h), (r.p = g), r.d.f());
      }
    }),
    (ht.preconnect = function (p, h) {
      typeof p == "string" &&
        (h
          ? ((h = h.crossOrigin),
            (h =
              typeof h == "string"
                ? h === "use-credentials"
                  ? h
                  : ""
                : void 0))
          : (h = null),
        r.d.C(p, h));
    }),
    (ht.prefetchDNS = function (p) {
      typeof p == "string" && r.d.D(p);
    }),
    (ht.preinit = function (p, h) {
      if (typeof p == "string" && h && typeof h.as == "string") {
        var g = h.as,
          v = m(g, h.crossOrigin),
          x = typeof h.integrity == "string" ? h.integrity : void 0,
          T = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        g === "style"
          ? r.d.S(p, typeof h.precedence == "string" ? h.precedence : void 0, {
              crossOrigin: v,
              integrity: x,
              fetchPriority: T,
            })
          : g === "script" &&
            r.d.X(p, {
              crossOrigin: v,
              integrity: x,
              fetchPriority: T,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
      }
    }),
    (ht.preinitModule = function (p, h) {
      if (typeof p == "string")
        if (typeof h == "object" && h !== null) {
          if (h.as == null || h.as === "script") {
            var g = m(h.as, h.crossOrigin);
            r.d.M(p, {
              crossOrigin: g,
              integrity: typeof h.integrity == "string" ? h.integrity : void 0,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
          }
        } else h == null && r.d.M(p);
    }),
    (ht.preload = function (p, h) {
      if (
        typeof p == "string" &&
        typeof h == "object" &&
        h !== null &&
        typeof h.as == "string"
      ) {
        var g = h.as,
          v = m(g, h.crossOrigin);
        r.d.L(p, g, {
          crossOrigin: v,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority:
            typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy:
            typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet:
            typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0,
        });
      }
    }),
    (ht.preloadModule = function (p, h) {
      if (typeof p == "string")
        if (h) {
          var g = m(h.as, h.crossOrigin);
          r.d.m(p, {
            as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
            crossOrigin: g,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          });
        } else r.d.m(p);
    }),
    (ht.requestFormReset = function (p) {
      r.d.r(p);
    }),
    (ht.unstable_batchedUpdates = function (p, h) {
      return p(h);
    }),
    (ht.useFormState = function (p, h, g) {
      return f.H.useFormState(p, h, g);
    }),
    (ht.useFormStatus = function () {
      return f.H.useHostTransitionStatus();
    }),
    (ht.version = "19.1.0"),
    ht
  );
}
var Ag;
function CS() {
  if (Ag) return Vc.exports;
  Ag = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return (n(), (Vc.exports = AS()), Vc.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cg;
function OS() {
  if (Cg) return Us;
  Cg = 1;
  var n = wS(),
    a = ro(),
    s = CS();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        t += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function c(e) {
    var t = e,
      i = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (i = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? i : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (c(e) !== e) throw Error(r(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = c(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var i = e, l = t; ; ) {
      var u = i.return;
      if (u === null) break;
      var d = u.alternate;
      if (d === null) {
        if (((l = u.return), l !== null)) {
          i = l;
          continue;
        }
        break;
      }
      if (u.child === d.child) {
        for (d = u.child; d; ) {
          if (d === i) return (m(u), e);
          if (d === l) return (m(u), t);
          d = d.sibling;
        }
        throw Error(r(188));
      }
      if (i.return !== l.return) ((i = u), (l = d));
      else {
        for (var y = !1, b = u.child; b; ) {
          if (b === i) {
            ((y = !0), (i = u), (l = d));
            break;
          }
          if (b === l) {
            ((y = !0), (l = u), (i = d));
            break;
          }
          b = b.sibling;
        }
        if (!y) {
          for (b = d.child; b; ) {
            if (b === i) {
              ((y = !0), (i = d), (l = u));
              break;
            }
            if (b === l) {
              ((y = !0), (l = d), (i = u));
              break;
            }
            b = b.sibling;
          }
          if (!y) throw Error(r(189));
        }
      }
      if (i.alternate !== l) throw Error(r(190));
    }
    if (i.tag !== 3) throw Error(r(188));
    return i.stateNode.current === i ? e : t;
  }
  function h(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = h(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var g = Object.assign,
    v = Symbol.for("react.element"),
    x = Symbol.for("react.transitional.element"),
    T = Symbol.for("react.portal"),
    E = Symbol.for("react.fragment"),
    M = Symbol.for("react.strict_mode"),
    N = Symbol.for("react.profiler"),
    R = Symbol.for("react.provider"),
    G = Symbol.for("react.consumer"),
    V = Symbol.for("react.context"),
    Q = Symbol.for("react.forward_ref"),
    q = Symbol.for("react.suspense"),
    ae = Symbol.for("react.suspense_list"),
    te = Symbol.for("react.memo"),
    k = Symbol.for("react.lazy"),
    j = Symbol.for("react.activity"),
    H = Symbol.for("react.memo_cache_sentinel"),
    I = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (I && e[I]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var oe = Symbol.for("react.client.reference");
  function ve(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === oe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case E:
        return "Fragment";
      case N:
        return "Profiler";
      case M:
        return "StrictMode";
      case q:
        return "Suspense";
      case ae:
        return "SuspenseList";
      case j:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case T:
          return "Portal";
        case V:
          return (e.displayName || "Context") + ".Provider";
        case G:
          return (e._context.displayName || "Context") + ".Consumer";
        case Q:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case te:
          return (
            (t = e.displayName || null),
            t !== null ? t : ve(e.type) || "Memo"
          );
        case k:
          ((t = e._payload), (e = e._init));
          try {
            return ve(e(t));
          } catch {}
      }
    return null;
  }
  var ce = Array.isArray,
    U = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Y = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = { pending: !1, data: null, method: null, action: null },
    le = [],
    S = -1;
  function D(e) {
    return { current: e };
  }
  function F(e) {
    0 > S || ((e.current = le[S]), (le[S] = null), S--);
  }
  function X(e, t) {
    (S++, (le[S] = e.current), (e.current = t));
  }
  var W = D(null),
    se = D(null),
    ne = D(null),
    Ee = D(null);
  function me(e, t) {
    switch ((X(ne, t), X(se, e), X(W, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Fp(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = Fp(t)), (e = $p(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (F(W), X(W, e));
  }
  function ze() {
    (F(W), F(se), F(ne));
  }
  function ct(e) {
    e.memoizedState !== null && X(Ee, e);
    var t = W.current,
      i = $p(t, e.type);
    t !== i && (X(se, e), X(W, i));
  }
  function we(e) {
    (se.current === e && (F(W), F(se)),
      Ee.current === e && (F(Ee), (Ns._currentValue = J)));
  }
  var Ut = Object.prototype.hasOwnProperty,
    rt = n.unstable_scheduleCallback,
    yn = n.unstable_cancelCallback,
    Ua = n.unstable_shouldYield,
    Wx = n.unstable_requestPaint,
    nn = n.unstable_now,
    eb = n.unstable_getCurrentPriorityLevel,
    Cd = n.unstable_ImmediatePriority,
    Od = n.unstable_UserBlockingPriority,
    vr = n.unstable_NormalPriority,
    tb = n.unstable_LowPriority,
    Rd = n.unstable_IdlePriority,
    nb = n.log,
    ab = n.unstable_setDisableYieldValue,
    ki = null,
    Ot = null;
  function Un(e) {
    if (
      (typeof nb == "function" && ab(e),
      Ot && typeof Ot.setStrictMode == "function")
    )
      try {
        Ot.setStrictMode(ki, e);
      } catch {}
  }
  var Rt = Math.clz32 ? Math.clz32 : rb,
    ib = Math.log,
    sb = Math.LN2;
  function rb(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((ib(e) / sb) | 0)) | 0);
  }
  var xr = 256,
    br = 4194304;
  function fa(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Sr(e, t, i) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0,
      d = e.suspendedLanes,
      y = e.pingedLanes;
    e = e.warmLanes;
    var b = l & 134217727;
    return (
      b !== 0
        ? ((l = b & ~d),
          l !== 0
            ? (u = fa(l))
            : ((y &= b),
              y !== 0
                ? (u = fa(y))
                : i || ((i = b & ~e), i !== 0 && (u = fa(i)))))
        : ((b = l & ~d),
          b !== 0
            ? (u = fa(b))
            : y !== 0
              ? (u = fa(y))
              : i || ((i = l & ~e), i !== 0 && (u = fa(i)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & d) === 0 &&
            ((d = u & -u),
            (i = t & -t),
            d >= i || (d === 32 && (i & 4194048) !== 0))
          ? t
          : u
    );
  }
  function Pi(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function lb(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Dd() {
    var e = xr;
    return ((xr <<= 1), (xr & 4194048) === 0 && (xr = 256), e);
  }
  function Md() {
    var e = br;
    return ((br <<= 1), (br & 62914560) === 0 && (br = 4194304), e);
  }
  function vo(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function Hi(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function ob(e, t, i, l, u, d) {
    var y = e.pendingLanes;
    ((e.pendingLanes = i),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= i),
      (e.entangledLanes &= i),
      (e.errorRecoveryDisabledLanes &= i),
      (e.shellSuspendCounter = 0));
    var b = e.entanglements,
      w = e.expirationTimes,
      z = e.hiddenUpdates;
    for (i = y & ~i; 0 < i; ) {
      var K = 31 - Rt(i),
        Z = 1 << K;
      ((b[K] = 0), (w[K] = -1));
      var B = z[K];
      if (B !== null)
        for (z[K] = null, K = 0; K < B.length; K++) {
          var P = B[K];
          P !== null && (P.lane &= -536870913);
        }
      i &= ~Z;
    }
    (l !== 0 && Nd(e, l, 0),
      d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(y & ~t)));
  }
  function Nd(e, t, i) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var l = 31 - Rt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (i & 4194090)));
  }
  function jd(e, t) {
    var i = (e.entangledLanes |= t);
    for (e = e.entanglements; i; ) {
      var l = 31 - Rt(i),
        u = 1 << l;
      ((u & t) | (e[l] & t) && (e[l] |= t), (i &= ~u));
    }
  }
  function xo(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function bo(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Ld() {
    var e = Y.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : dg(e.type));
  }
  function ub(e, t) {
    var i = Y.p;
    try {
      return ((Y.p = e), t());
    } finally {
      Y.p = i;
    }
  }
  var Bn = Math.random().toString(36).slice(2),
    ft = "__reactFiber$" + Bn,
    xt = "__reactProps$" + Bn,
    Ba = "__reactContainer$" + Bn,
    So = "__reactEvents$" + Bn,
    cb = "__reactListeners$" + Bn,
    fb = "__reactHandles$" + Bn,
    Vd = "__reactResources$" + Bn,
    Gi = "__reactMarker$" + Bn;
  function To(e) {
    (delete e[ft], delete e[xt], delete e[So], delete e[cb], delete e[fb]);
  }
  function ka(e) {
    var t = e[ft];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if ((t = i[Ba] || i[ft])) {
        if (
          ((i = t.alternate),
          t.child !== null || (i !== null && i.child !== null))
        )
          for (e = Ip(e); e !== null; ) {
            if ((i = e[ft])) return i;
            e = Ip(e);
          }
        return t;
      }
      ((e = i), (i = e.parentNode));
    }
    return null;
  }
  function Pa(e) {
    if ((e = e[ft] || e[Ba])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Yi(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Ha(e) {
    var t = e[Vd];
    return (
      t ||
        (t = e[Vd] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function et(e) {
    e[Gi] = !0;
  }
  var _d = new Set(),
    zd = {};
  function da(e, t) {
    (Ga(e, t), Ga(e + "Capture", t));
  }
  function Ga(e, t) {
    for (zd[e] = t, e = 0; e < t.length; e++) _d.add(t[e]);
  }
  var db = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Ud = {},
    Bd = {};
  function hb(e) {
    return Ut.call(Bd, e)
      ? !0
      : Ut.call(Ud, e)
        ? !1
        : db.test(e)
          ? (Bd[e] = !0)
          : ((Ud[e] = !0), !1);
  }
  function Tr(e, t, i) {
    if (hb(t))
      if (i === null) e.removeAttribute(t);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + i);
      }
  }
  function Er(e, t, i) {
    if (i === null) e.removeAttribute(t);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + i);
    }
  }
  function vn(e, t, i, l) {
    if (l === null) e.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(t, i, "" + l);
    }
  }
  var Eo, kd;
  function Ya(e) {
    if (Eo === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        ((Eo = (t && t[1]) || ""),
          (kd =
            -1 <
            i.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < i.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Eo +
      e +
      kd
    );
  }
  var wo = !1;
  function Ao(e, t) {
    if (!e || wo) return "";
    wo = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Z.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Z, []);
                } catch (P) {
                  var B = P;
                }
                Reflect.construct(e, [], Z);
              } else {
                try {
                  Z.call();
                } catch (P) {
                  B = P;
                }
                e.call(Z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (P) {
                B = P;
              }
              (Z = e()) &&
                typeof Z.catch == "function" &&
                Z.catch(function () {});
            }
          } catch (P) {
            if (P && B && typeof P.stack == "string") return [P.stack, B.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var d = l.DetermineComponentFrameRoot(),
        y = d[0],
        b = d[1];
      if (y && b) {
        var w = y.split(`
`),
          z = b.split(`
`);
        for (
          u = l = 0;
          l < w.length && !w[l].includes("DetermineComponentFrameRoot");
        )
          l++;
        for (; u < z.length && !z[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (l === w.length || u === z.length)
          for (
            l = w.length - 1, u = z.length - 1;
            1 <= l && 0 <= u && w[l] !== z[u];
          )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (w[l] !== z[u]) {
            if (l !== 1 || u !== 1)
              do
                if ((l--, u--, 0 > u || w[l] !== z[u])) {
                  var K =
                    `
` + w[l].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      K.includes("<anonymous>") &&
                      (K = K.replace("<anonymous>", e.displayName)),
                    K
                  );
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      ((wo = !1), (Error.prepareStackTrace = i));
    }
    return (i = e ? e.displayName || e.name : "") ? Ya(i) : "";
  }
  function mb(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ya(e.type);
      case 16:
        return Ya("Lazy");
      case 13:
        return Ya("Suspense");
      case 19:
        return Ya("SuspenseList");
      case 0:
      case 15:
        return Ao(e.type, !1);
      case 11:
        return Ao(e.type.render, !1);
      case 1:
        return Ao(e.type, !0);
      case 31:
        return Ya("Activity");
      default:
        return "";
    }
  }
  function Pd(e) {
    try {
      var t = "";
      do ((t += mb(e)), (e = e.return));
      while (e);
      return t;
    } catch (i) {
      return (
        `
Error generating stack: ` +
        i.message +
        `
` +
        i.stack
      );
    }
  }
  function Bt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Hd(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function pb(e) {
    var t = Hd(e) ? "checked" : "value",
      i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      l = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof i < "u" &&
      typeof i.get == "function" &&
      typeof i.set == "function"
    ) {
      var u = i.get,
        d = i.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (y) {
            ((l = "" + y), d.call(this, y));
          },
        }),
        Object.defineProperty(e, t, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (y) {
            l = "" + y;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function wr(e) {
    e._valueTracker || (e._valueTracker = pb(e));
  }
  function Gd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(),
      l = "";
    return (
      e && (l = Hd(e) ? (e.checked ? "true" : "false") : e.value),
      (e = l),
      e !== i ? (t.setValue(e), !0) : !1
    );
  }
  function Ar(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var gb = /[\n"\\]/g;
  function kt(e) {
    return e.replace(gb, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Co(e, t, i, l, u, d, y, b) {
    ((e.name = ""),
      y != null &&
      typeof y != "function" &&
      typeof y != "symbol" &&
      typeof y != "boolean"
        ? (e.type = y)
        : e.removeAttribute("type"),
      t != null
        ? y === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + Bt(t))
          : e.value !== "" + Bt(t) && (e.value = "" + Bt(t))
        : (y !== "submit" && y !== "reset") || e.removeAttribute("value"),
      t != null
        ? Oo(e, y, Bt(t))
        : i != null
          ? Oo(e, y, Bt(i))
          : l != null && e.removeAttribute("value"),
      u == null && d != null && (e.defaultChecked = !!d),
      u != null &&
        (e.checked = u && typeof u != "function" && typeof u != "symbol"),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (e.name = "" + Bt(b))
        : e.removeAttribute("name"));
  }
  function Yd(e, t, i, l, u, d, y, b) {
    if (
      (d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean" &&
        (e.type = d),
      t != null || i != null)
    ) {
      if (!((d !== "submit" && d !== "reset") || t != null)) return;
      ((i = i != null ? "" + Bt(i) : ""),
        (t = t != null ? "" + Bt(t) : i),
        b || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((l = l ?? u),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (e.checked = b ? e.checked : !!l),
      (e.defaultChecked = !!l),
      y != null &&
        typeof y != "function" &&
        typeof y != "symbol" &&
        typeof y != "boolean" &&
        (e.name = y));
  }
  function Oo(e, t, i) {
    (t === "number" && Ar(e.ownerDocument) === e) ||
      e.defaultValue === "" + i ||
      (e.defaultValue = "" + i);
  }
  function qa(e, t, i, l) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < i.length; u++) t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        ((u = t.hasOwnProperty("$" + e[i].value)),
          e[i].selected !== u && (e[i].selected = u),
          u && l && (e[i].defaultSelected = !0));
    } else {
      for (i = "" + Bt(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          ((e[u].selected = !0), l && (e[u].defaultSelected = !0));
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function qd(e, t, i) {
    if (
      t != null &&
      ((t = "" + Bt(t)), t !== e.value && (e.value = t), i == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + Bt(i) : "";
  }
  function Kd(e, t, i, l) {
    if (t == null) {
      if (l != null) {
        if (i != null) throw Error(r(92));
        if (ce(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        i = l;
      }
      (i == null && (i = ""), (t = i));
    }
    ((i = Bt(t)),
      (e.defaultValue = i),
      (l = e.textContent),
      l === i && l !== "" && l !== null && (e.value = l));
  }
  function Ka(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var yb = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Fd(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === ""
      ? l
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : l
        ? e.setProperty(t, i)
        : typeof i != "number" || i === 0 || yb.has(t)
          ? t === "float"
            ? (e.cssFloat = i)
            : (e[t] = ("" + i).trim())
          : (e[t] = i + "px");
  }
  function $d(e, t, i) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((e = e.style), i != null)) {
      for (var l in i)
        !i.hasOwnProperty(l) ||
          (t != null && t.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? e.setProperty(l, "")
            : l === "float"
              ? (e.cssFloat = "")
              : (e[l] = ""));
      for (var u in t)
        ((l = t[u]), t.hasOwnProperty(u) && i[u] !== l && Fd(e, u, l));
    } else for (var d in t) t.hasOwnProperty(d) && Fd(e, d, t[d]);
  }
  function Ro(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var vb = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    xb =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Cr(e) {
    return xb.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var Do = null;
  function Mo(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Fa = null,
    $a = null;
  function Xd(e) {
    var t = Pa(e);
    if (t && (e = t.stateNode)) {
      var i = e[xt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Co(
              e,
              i.value,
              i.defaultValue,
              i.defaultValue,
              i.checked,
              i.defaultChecked,
              i.type,
              i.name,
            ),
            (t = i.name),
            i.type === "radio" && t != null)
          ) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (
              i = i.querySelectorAll(
                'input[name="' + kt("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < i.length;
              t++
            ) {
              var l = i[t];
              if (l !== e && l.form === e.form) {
                var u = l[xt] || null;
                if (!u) throw Error(r(90));
                Co(
                  l,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (t = 0; t < i.length; t++)
              ((l = i[t]), l.form === e.form && Gd(l));
          }
          break e;
        case "textarea":
          qd(e, i.value, i.defaultValue);
          break e;
        case "select":
          ((t = i.value), t != null && qa(e, !!i.multiple, t, !1));
      }
    }
  }
  var No = !1;
  function Zd(e, t, i) {
    if (No) return e(t, i);
    No = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (
        ((No = !1),
        (Fa !== null || $a !== null) &&
          (fl(), Fa && ((t = Fa), (e = $a), ($a = Fa = null), Xd(t), e)))
      )
        for (t = 0; t < e.length; t++) Xd(e[t]);
    }
  }
  function qi(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var l = i[xt] || null;
    if (l === null) return null;
    i = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((l = !l.disabled) ||
          ((e = e.type),
          (l = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !l));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function") throw Error(r(231, t, typeof i));
    return i;
  }
  var xn = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    jo = !1;
  if (xn)
    try {
      var Ki = {};
      (Object.defineProperty(Ki, "passive", {
        get: function () {
          jo = !0;
        },
      }),
        window.addEventListener("test", Ki, Ki),
        window.removeEventListener("test", Ki, Ki));
    } catch {
      jo = !1;
    }
  var kn = null,
    Lo = null,
    Or = null;
  function Qd() {
    if (Or) return Or;
    var e,
      t = Lo,
      i = t.length,
      l,
      u = "value" in kn ? kn.value : kn.textContent,
      d = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++);
    var y = i - e;
    for (l = 1; l <= y && t[i - l] === u[d - l]; l++);
    return (Or = u.slice(e, 1 < l ? 1 - l : void 0));
  }
  function Rr(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Dr() {
    return !0;
  }
  function Id() {
    return !1;
  }
  function bt(e) {
    function t(i, l, u, d, y) {
      ((this._reactName = i),
        (this._targetInst = u),
        (this.type = l),
        (this.nativeEvent = d),
        (this.target = y),
        (this.currentTarget = null));
      for (var b in e)
        e.hasOwnProperty(b) && ((i = e[b]), (this[b] = i ? i(d) : d[b]));
      return (
        (this.isDefaultPrevented = (
          d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1
        )
          ? Dr
          : Id),
        (this.isPropagationStopped = Id),
        this
      );
    }
    return (
      g(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var i = this.nativeEvent;
          i &&
            (i.preventDefault
              ? i.preventDefault()
              : typeof i.returnValue != "unknown" && (i.returnValue = !1),
            (this.isDefaultPrevented = Dr));
        },
        stopPropagation: function () {
          var i = this.nativeEvent;
          i &&
            (i.stopPropagation
              ? i.stopPropagation()
              : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0),
            (this.isPropagationStopped = Dr));
        },
        persist: function () {},
        isPersistent: Dr,
      }),
      t
    );
  }
  var ha = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Mr = bt(ha),
    Fi = g({}, ha, { view: 0, detail: 0 }),
    bb = bt(Fi),
    Vo,
    _o,
    $i,
    Nr = g({}, Fi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Uo,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== $i &&
              ($i && e.type === "mousemove"
                ? ((Vo = e.screenX - $i.screenX), (_o = e.screenY - $i.screenY))
                : (_o = Vo = 0),
              ($i = e)),
            Vo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : _o;
      },
    }),
    Jd = bt(Nr),
    Sb = g({}, Nr, { dataTransfer: 0 }),
    Tb = bt(Sb),
    Eb = g({}, Fi, { relatedTarget: 0 }),
    zo = bt(Eb),
    wb = g({}, ha, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ab = bt(wb),
    Cb = g({}, ha, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Ob = bt(Cb),
    Rb = g({}, ha, { data: 0 }),
    Wd = bt(Rb),
    Db = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Mb = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Nb = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function jb(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Nb[e])
        ? !!t[e]
        : !1;
  }
  function Uo() {
    return jb;
  }
  var Lb = g({}, Fi, {
      key: function (e) {
        if (e.key) {
          var t = Db[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Rr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Mb[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Uo,
      charCode: function (e) {
        return e.type === "keypress" ? Rr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Rr(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    Vb = bt(Lb),
    _b = g({}, Nr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    eh = bt(_b),
    zb = g({}, Fi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Uo,
    }),
    Ub = bt(zb),
    Bb = g({}, ha, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    kb = bt(Bb),
    Pb = g({}, Nr, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Hb = bt(Pb),
    Gb = g({}, ha, { newState: 0, oldState: 0 }),
    Yb = bt(Gb),
    qb = [9, 13, 27, 32],
    Bo = xn && "CompositionEvent" in window,
    Xi = null;
  xn && "documentMode" in document && (Xi = document.documentMode);
  var Kb = xn && "TextEvent" in window && !Xi,
    th = xn && (!Bo || (Xi && 8 < Xi && 11 >= Xi)),
    nh = " ",
    ah = !1;
  function ih(e, t) {
    switch (e) {
      case "keyup":
        return qb.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function sh(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Xa = !1;
  function Fb(e, t) {
    switch (e) {
      case "compositionend":
        return sh(t);
      case "keypress":
        return t.which !== 32 ? null : ((ah = !0), nh);
      case "textInput":
        return ((e = t.data), e === nh && ah ? null : e);
      default:
        return null;
    }
  }
  function $b(e, t) {
    if (Xa)
      return e === "compositionend" || (!Bo && ih(e, t))
        ? ((e = Qd()), (Or = Lo = kn = null), (Xa = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return th && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Xb = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function rh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Xb[e.type] : t === "textarea";
  }
  function lh(e, t, i, l) {
    (Fa ? ($a ? $a.push(l) : ($a = [l])) : (Fa = l),
      (t = yl(t, "onChange")),
      0 < t.length &&
        ((i = new Mr("onChange", "change", null, i, l)),
        e.push({ event: i, listeners: t })));
  }
  var Zi = null,
    Qi = null;
  function Zb(e) {
    Hp(e, 0);
  }
  function jr(e) {
    var t = Yi(e);
    if (Gd(t)) return e;
  }
  function oh(e, t) {
    if (e === "change") return t;
  }
  var uh = !1;
  if (xn) {
    var ko;
    if (xn) {
      var Po = "oninput" in document;
      if (!Po) {
        var ch = document.createElement("div");
        (ch.setAttribute("oninput", "return;"),
          (Po = typeof ch.oninput == "function"));
      }
      ko = Po;
    } else ko = !1;
    uh = ko && (!document.documentMode || 9 < document.documentMode);
  }
  function fh() {
    Zi && (Zi.detachEvent("onpropertychange", dh), (Qi = Zi = null));
  }
  function dh(e) {
    if (e.propertyName === "value" && jr(Qi)) {
      var t = [];
      (lh(t, Qi, e, Mo(e)), Zd(Zb, t));
    }
  }
  function Qb(e, t, i) {
    e === "focusin"
      ? (fh(), (Zi = t), (Qi = i), Zi.attachEvent("onpropertychange", dh))
      : e === "focusout" && fh();
  }
  function Ib(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return jr(Qi);
  }
  function Jb(e, t) {
    if (e === "click") return jr(t);
  }
  function Wb(e, t) {
    if (e === "input" || e === "change") return jr(t);
  }
  function e1(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Dt = typeof Object.is == "function" ? Object.is : e1;
  function Ii(e, t) {
    if (Dt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var i = Object.keys(e),
      l = Object.keys(t);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!Ut.call(t, u) || !Dt(e[u], t[u])) return !1;
    }
    return !0;
  }
  function hh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function mh(e, t) {
    var i = hh(e);
    e = 0;
    for (var l; i; ) {
      if (i.nodeType === 3) {
        if (((l = e + i.textContent.length), e <= t && l >= t))
          return { node: i, offset: t - e };
        e = l;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = hh(i);
    }
  }
  function ph(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? ph(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function gh(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Ar(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = Ar(e.document);
    }
    return t;
  }
  function Ho(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var t1 = xn && "documentMode" in document && 11 >= document.documentMode,
    Za = null,
    Go = null,
    Ji = null,
    Yo = !1;
  function yh(e, t, i) {
    var l =
      i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Yo ||
      Za == null ||
      Za !== Ar(l) ||
      ((l = Za),
      "selectionStart" in l && Ho(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (Ji && Ii(Ji, l)) ||
        ((Ji = l),
        (l = yl(Go, "onSelect")),
        0 < l.length &&
          ((t = new Mr("onSelect", "select", null, t, i)),
          e.push({ event: t, listeners: l }),
          (t.target = Za))));
  }
  function ma(e, t) {
    var i = {};
    return (
      (i[e.toLowerCase()] = t.toLowerCase()),
      (i["Webkit" + e] = "webkit" + t),
      (i["Moz" + e] = "moz" + t),
      i
    );
  }
  var Qa = {
      animationend: ma("Animation", "AnimationEnd"),
      animationiteration: ma("Animation", "AnimationIteration"),
      animationstart: ma("Animation", "AnimationStart"),
      transitionrun: ma("Transition", "TransitionRun"),
      transitionstart: ma("Transition", "TransitionStart"),
      transitioncancel: ma("Transition", "TransitionCancel"),
      transitionend: ma("Transition", "TransitionEnd"),
    },
    qo = {},
    vh = {};
  xn &&
    ((vh = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Qa.animationend.animation,
      delete Qa.animationiteration.animation,
      delete Qa.animationstart.animation),
    "TransitionEvent" in window || delete Qa.transitionend.transition);
  function pa(e) {
    if (qo[e]) return qo[e];
    if (!Qa[e]) return e;
    var t = Qa[e],
      i;
    for (i in t) if (t.hasOwnProperty(i) && i in vh) return (qo[e] = t[i]);
    return e;
  }
  var xh = pa("animationend"),
    bh = pa("animationiteration"),
    Sh = pa("animationstart"),
    n1 = pa("transitionrun"),
    a1 = pa("transitionstart"),
    i1 = pa("transitioncancel"),
    Th = pa("transitionend"),
    Eh = new Map(),
    Ko =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Ko.push("scrollEnd");
  function Zt(e, t) {
    (Eh.set(e, t), da(t, [e]));
  }
  var wh = new WeakMap();
  function Pt(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = wh.get(e);
      return i !== void 0
        ? i
        : ((t = { value: e, source: t, stack: Pd(t) }), wh.set(e, t), t);
    }
    return { value: e, source: t, stack: Pd(t) };
  }
  var Ht = [],
    Ia = 0,
    Fo = 0;
  function Lr() {
    for (var e = Ia, t = (Fo = Ia = 0); t < e; ) {
      var i = Ht[t];
      Ht[t++] = null;
      var l = Ht[t];
      Ht[t++] = null;
      var u = Ht[t];
      Ht[t++] = null;
      var d = Ht[t];
      if (((Ht[t++] = null), l !== null && u !== null)) {
        var y = l.pending;
        (y === null ? (u.next = u) : ((u.next = y.next), (y.next = u)),
          (l.pending = u));
      }
      d !== 0 && Ah(i, u, d);
    }
  }
  function Vr(e, t, i, l) {
    ((Ht[Ia++] = e),
      (Ht[Ia++] = t),
      (Ht[Ia++] = i),
      (Ht[Ia++] = l),
      (Fo |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l));
  }
  function $o(e, t, i, l) {
    return (Vr(e, t, i, l), _r(e));
  }
  function Ja(e, t) {
    return (Vr(e, null, null, t), _r(e));
  }
  function Ah(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, d = e.return; d !== null; )
      ((d.childLanes |= i),
        (l = d.alternate),
        l !== null && (l.childLanes |= i),
        d.tag === 22 &&
          ((e = d.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = d),
        (d = d.return));
    return e.tag === 3
      ? ((d = e.stateNode),
        u &&
          t !== null &&
          ((u = 31 - Rt(i)),
          (e = d.hiddenUpdates),
          (l = e[u]),
          l === null ? (e[u] = [t]) : l.push(t),
          (t.lane = i | 536870912)),
        d)
      : null;
  }
  function _r(e) {
    if (50 < Es) throw ((Es = 0), (Wu = null), Error(r(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Wa = {};
  function s1(e, t, i, l) {
    ((this.tag = e),
      (this.key = i),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Mt(e, t, i, l) {
    return new s1(e, t, i, l);
  }
  function Xo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function bn(e, t) {
    var i = e.alternate;
    return (
      i === null
        ? ((i = Mt(e.tag, t, e.key, e.mode)),
          (i.elementType = e.elementType),
          (i.type = e.type),
          (i.stateNode = e.stateNode),
          (i.alternate = e),
          (e.alternate = i))
        : ((i.pendingProps = t),
          (i.type = e.type),
          (i.flags = 0),
          (i.subtreeFlags = 0),
          (i.deletions = null)),
      (i.flags = e.flags & 65011712),
      (i.childLanes = e.childLanes),
      (i.lanes = e.lanes),
      (i.child = e.child),
      (i.memoizedProps = e.memoizedProps),
      (i.memoizedState = e.memoizedState),
      (i.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (i.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (i.sibling = e.sibling),
      (i.index = e.index),
      (i.ref = e.ref),
      (i.refCleanup = e.refCleanup),
      i
    );
  }
  function Ch(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return (
      i === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = i.childLanes),
          (e.lanes = i.lanes),
          (e.child = i.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = i.memoizedProps),
          (e.memoizedState = i.memoizedState),
          (e.updateQueue = i.updateQueue),
          (e.type = i.type),
          (t = i.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function zr(e, t, i, l, u, d) {
    var y = 0;
    if (((l = e), typeof e == "function")) Xo(e) && (y = 1);
    else if (typeof e == "string")
      y = lS(e, i, W.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case j:
          return ((e = Mt(31, i, t, u)), (e.elementType = j), (e.lanes = d), e);
        case E:
          return ga(i.children, u, d, t);
        case M:
          ((y = 8), (u |= 24));
          break;
        case N:
          return (
            (e = Mt(12, i, t, u | 2)),
            (e.elementType = N),
            (e.lanes = d),
            e
          );
        case q:
          return ((e = Mt(13, i, t, u)), (e.elementType = q), (e.lanes = d), e);
        case ae:
          return (
            (e = Mt(19, i, t, u)),
            (e.elementType = ae),
            (e.lanes = d),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case R:
              case V:
                y = 10;
                break e;
              case G:
                y = 9;
                break e;
              case Q:
                y = 11;
                break e;
              case te:
                y = 14;
                break e;
              case k:
                ((y = 16), (l = null));
                break e;
            }
          ((y = 29),
            (i = Error(r(130, e === null ? "null" : typeof e, ""))),
            (l = null));
      }
    return (
      (t = Mt(y, i, t, u)),
      (t.elementType = e),
      (t.type = l),
      (t.lanes = d),
      t
    );
  }
  function ga(e, t, i, l) {
    return ((e = Mt(7, e, l, t)), (e.lanes = i), e);
  }
  function Zo(e, t, i) {
    return ((e = Mt(6, e, null, t)), (e.lanes = i), e);
  }
  function Qo(e, t, i) {
    return (
      (t = Mt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = i),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var ei = [],
    ti = 0,
    Ur = null,
    Br = 0,
    Gt = [],
    Yt = 0,
    ya = null,
    Sn = 1,
    Tn = "";
  function va(e, t) {
    ((ei[ti++] = Br), (ei[ti++] = Ur), (Ur = e), (Br = t));
  }
  function Oh(e, t, i) {
    ((Gt[Yt++] = Sn), (Gt[Yt++] = Tn), (Gt[Yt++] = ya), (ya = e));
    var l = Sn;
    e = Tn;
    var u = 32 - Rt(l) - 1;
    ((l &= ~(1 << u)), (i += 1));
    var d = 32 - Rt(t) + u;
    if (30 < d) {
      var y = u - (u % 5);
      ((d = (l & ((1 << y) - 1)).toString(32)),
        (l >>= y),
        (u -= y),
        (Sn = (1 << (32 - Rt(t) + u)) | (i << u) | l),
        (Tn = d + e));
    } else ((Sn = (1 << d) | (i << u) | l), (Tn = e));
  }
  function Io(e) {
    e.return !== null && (va(e, 1), Oh(e, 1, 0));
  }
  function Jo(e) {
    for (; e === Ur; )
      ((Ur = ei[--ti]), (ei[ti] = null), (Br = ei[--ti]), (ei[ti] = null));
    for (; e === ya; )
      ((ya = Gt[--Yt]),
        (Gt[Yt] = null),
        (Tn = Gt[--Yt]),
        (Gt[Yt] = null),
        (Sn = Gt[--Yt]),
        (Gt[Yt] = null));
  }
  var gt = null,
    Ge = null,
    Ce = !1,
    xa = null,
    an = !1,
    Wo = Error(r(519));
  function ba(e) {
    var t = Error(r(418, ""));
    throw (ts(Pt(t, e)), Wo);
  }
  function Rh(e) {
    var t = e.stateNode,
      i = e.type,
      l = e.memoizedProps;
    switch (((t[ft] = e), (t[xt] = l), i)) {
      case "dialog":
        (Se("cancel", t), Se("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        Se("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < As.length; i++) Se(As[i], t);
        break;
      case "source":
        Se("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (Se("error", t), Se("load", t));
        break;
      case "details":
        Se("toggle", t);
        break;
      case "input":
        (Se("invalid", t),
          Yd(
            t,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0,
          ),
          wr(t));
        break;
      case "select":
        Se("invalid", t);
        break;
      case "textarea":
        (Se("invalid", t), Kd(t, l.value, l.defaultValue, l.children), wr(t));
    }
    ((i = l.children),
      (typeof i != "string" && typeof i != "number" && typeof i != "bigint") ||
      t.textContent === "" + i ||
      l.suppressHydrationWarning === !0 ||
      Kp(t.textContent, i)
        ? (l.popover != null && (Se("beforetoggle", t), Se("toggle", t)),
          l.onScroll != null && Se("scroll", t),
          l.onScrollEnd != null && Se("scrollend", t),
          l.onClick != null && (t.onclick = vl),
          (t = !0))
        : (t = !1),
      t || ba(e));
  }
  function Dh(e) {
    for (gt = e.return; gt; )
      switch (gt.tag) {
        case 5:
        case 13:
          an = !1;
          return;
        case 27:
        case 3:
          an = !0;
          return;
        default:
          gt = gt.return;
      }
  }
  function Wi(e) {
    if (e !== gt) return !1;
    if (!Ce) return (Dh(e), (Ce = !0), !1);
    var t = e.tag,
      i;
    if (
      ((i = t !== 3 && t !== 27) &&
        ((i = t === 5) &&
          ((i = e.type),
          (i =
            !(i !== "form" && i !== "button") || pc(e.type, e.memoizedProps))),
        (i = !i)),
      i && Ge && ba(e),
      Dh(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((i = e.data), i === "/$")) {
              if (t === 0) {
                Ge = It(e.nextSibling);
                break e;
              }
              t--;
            } else (i !== "$" && i !== "$!" && i !== "$?") || t++;
          e = e.nextSibling;
        }
        Ge = null;
      }
    } else
      t === 27
        ? ((t = Ge), ta(e.type) ? ((e = xc), (xc = null), (Ge = e)) : (Ge = t))
        : (Ge = gt ? It(e.stateNode.nextSibling) : null);
    return !0;
  }
  function es() {
    ((Ge = gt = null), (Ce = !1));
  }
  function Mh() {
    var e = xa;
    return (
      e !== null &&
        (Et === null ? (Et = e) : Et.push.apply(Et, e), (xa = null)),
      e
    );
  }
  function ts(e) {
    xa === null ? (xa = [e]) : xa.push(e);
  }
  var eu = D(null),
    Sa = null,
    En = null;
  function Pn(e, t, i) {
    (X(eu, t._currentValue), (t._currentValue = i));
  }
  function wn(e) {
    ((e._currentValue = eu.current), F(eu));
  }
  function tu(e, t, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
          : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
        e === i)
      )
        break;
      e = e.return;
    }
  }
  function nu(e, t, i, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var y = u.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var b = d;
          d = u;
          for (var w = 0; w < t.length; w++)
            if (b.context === t[w]) {
              ((d.lanes |= i),
                (b = d.alternate),
                b !== null && (b.lanes |= i),
                tu(d.return, i, e),
                l || (y = null));
              break e;
            }
          d = b.next;
        }
      } else if (u.tag === 18) {
        if (((y = u.return), y === null)) throw Error(r(341));
        ((y.lanes |= i),
          (d = y.alternate),
          d !== null && (d.lanes |= i),
          tu(y, i, e),
          (y = null));
      } else y = u.child;
      if (y !== null) y.return = u;
      else
        for (y = u; y !== null; ) {
          if (y === e) {
            y = null;
            break;
          }
          if (((u = y.sibling), u !== null)) {
            ((u.return = y.return), (y = u));
            break;
          }
          y = y.return;
        }
      u = y;
    }
  }
  function ns(e, t, i, l) {
    e = null;
    for (var u = t, d = !1; u !== null; ) {
      if (!d) {
        if ((u.flags & 524288) !== 0) d = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(r(387));
        if (((y = y.memoizedProps), y !== null)) {
          var b = u.type;
          Dt(u.pendingProps.value, y.value) ||
            (e !== null ? e.push(b) : (e = [b]));
        }
      } else if (u === Ee.current) {
        if (((y = u.alternate), y === null)) throw Error(r(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push(Ns) : (e = [Ns]));
      }
      u = u.return;
    }
    (e !== null && nu(t, e, i, l), (t.flags |= 262144));
  }
  function kr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Dt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ta(e) {
    ((Sa = e),
      (En = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function dt(e) {
    return Nh(Sa, e);
  }
  function Pr(e, t) {
    return (Sa === null && Ta(e), Nh(e, t));
  }
  function Nh(e, t) {
    var i = t._currentValue;
    if (((t = { context: t, memoizedValue: i, next: null }), En === null)) {
      if (e === null) throw Error(r(308));
      ((En = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else En = En.next = t;
    return i;
  }
  var r1 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (i, l) {
                  e.push(l);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (i) {
                  return i();
                }));
            };
          },
    l1 = n.unstable_scheduleCallback,
    o1 = n.unstable_NormalPriority,
    Je = {
      $$typeof: V,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function au() {
    return { controller: new r1(), data: new Map(), refCount: 0 };
  }
  function as(e) {
    (e.refCount--,
      e.refCount === 0 &&
        l1(o1, function () {
          e.controller.abort();
        }));
  }
  var is = null,
    iu = 0,
    ni = 0,
    ai = null;
  function u1(e, t) {
    if (is === null) {
      var i = (is = []);
      ((iu = 0),
        (ni = rc()),
        (ai = {
          status: "pending",
          value: void 0,
          then: function (l) {
            i.push(l);
          },
        }));
    }
    return (iu++, t.then(jh, jh), t);
  }
  function jh() {
    if (--iu === 0 && is !== null) {
      ai !== null && (ai.status = "fulfilled");
      var e = is;
      ((is = null), (ni = 0), (ai = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function c1(e, t) {
    var i = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          i.push(u);
        },
      };
    return (
      e.then(
        function () {
          ((l.status = "fulfilled"), (l.value = t));
          for (var u = 0; u < i.length; u++) (0, i[u])(t);
        },
        function (u) {
          for (l.status = "rejected", l.reason = u, u = 0; u < i.length; u++)
            (0, i[u])(void 0);
        },
      ),
      l
    );
  }
  var Lh = U.S;
  U.S = function (e, t) {
    (typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      u1(e, t),
      Lh !== null && Lh(e, t));
  };
  var Ea = D(null);
  function su() {
    var e = Ea.current;
    return e !== null ? e : _e.pooledCache;
  }
  function Hr(e, t) {
    t === null ? X(Ea, Ea.current) : X(Ea, t.pool);
  }
  function Vh() {
    var e = su();
    return e === null ? null : { parent: Je._currentValue, pool: e };
  }
  var ss = Error(r(460)),
    _h = Error(r(474)),
    Gr = Error(r(542)),
    ru = { then: function () {} };
  function zh(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Yr() {}
  function Uh(e, t, i) {
    switch (
      ((i = e[i]),
      i === void 0 ? e.push(t) : i !== t && (t.then(Yr, Yr), (t = i)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), kh(e), e);
      default:
        if (typeof t.status == "string") t.then(Yr, Yr);
        else {
          if (((e = _e), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (l) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "fulfilled"), (u.value = l));
                }
              },
              function (l) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "rejected"), (u.reason = l));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), kh(e), e);
        }
        throw ((rs = t), ss);
    }
  }
  var rs = null;
  function Bh() {
    if (rs === null) throw Error(r(459));
    var e = rs;
    return ((rs = null), e);
  }
  function kh(e) {
    if (e === ss || e === Gr) throw Error(r(483));
  }
  var Hn = !1;
  function lu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ou(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function Gn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Yn(e, t, i) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (Oe & 2) !== 0)) {
      var u = l.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (l.pending = t),
        (t = _r(e)),
        Ah(e, null, i),
        t
      );
    }
    return (Vr(e, l, t, i), _r(e));
  }
  function ls(e, t, i) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (i & 4194048) !== 0))
    ) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (i |= l), (t.lanes = i), jd(e, i));
    }
  }
  function uu(e, t) {
    var i = e.updateQueue,
      l = e.alternate;
    if (l !== null && ((l = l.updateQueue), i === l)) {
      var u = null,
        d = null;
      if (((i = i.firstBaseUpdate), i !== null)) {
        do {
          var y = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null,
          };
          (d === null ? (u = d = y) : (d = d.next = y), (i = i.next));
        } while (i !== null);
        d === null ? (u = d = t) : (d = d.next = t);
      } else u = d = t;
      ((i = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: d,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (e.updateQueue = i));
      return;
    }
    ((e = i.lastBaseUpdate),
      e === null ? (i.firstBaseUpdate = t) : (e.next = t),
      (i.lastBaseUpdate = t));
  }
  var cu = !1;
  function os() {
    if (cu) {
      var e = ai;
      if (e !== null) throw e;
    }
  }
  function us(e, t, i, l) {
    cu = !1;
    var u = e.updateQueue;
    Hn = !1;
    var d = u.firstBaseUpdate,
      y = u.lastBaseUpdate,
      b = u.shared.pending;
    if (b !== null) {
      u.shared.pending = null;
      var w = b,
        z = w.next;
      ((w.next = null), y === null ? (d = z) : (y.next = z), (y = w));
      var K = e.alternate;
      K !== null &&
        ((K = K.updateQueue),
        (b = K.lastBaseUpdate),
        b !== y &&
          (b === null ? (K.firstBaseUpdate = z) : (b.next = z),
          (K.lastBaseUpdate = w)));
    }
    if (d !== null) {
      var Z = u.baseState;
      ((y = 0), (K = z = w = null), (b = d));
      do {
        var B = b.lane & -536870913,
          P = B !== b.lane;
        if (P ? (Te & B) === B : (l & B) === B) {
          (B !== 0 && B === ni && (cu = !0),
            K !== null &&
              (K = K.next =
                {
                  lane: 0,
                  tag: b.tag,
                  payload: b.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var de = e,
              ue = b;
            B = t;
            var je = i;
            switch (ue.tag) {
              case 1:
                if (((de = ue.payload), typeof de == "function")) {
                  Z = de.call(je, Z, B);
                  break e;
                }
                Z = de;
                break e;
              case 3:
                de.flags = (de.flags & -65537) | 128;
              case 0:
                if (
                  ((de = ue.payload),
                  (B = typeof de == "function" ? de.call(je, Z, B) : de),
                  B == null)
                )
                  break e;
                Z = g({}, Z, B);
                break e;
              case 2:
                Hn = !0;
            }
          }
          ((B = b.callback),
            B !== null &&
              ((e.flags |= 64),
              P && (e.flags |= 8192),
              (P = u.callbacks),
              P === null ? (u.callbacks = [B]) : P.push(B)));
        } else
          ((P = {
            lane: B,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null,
          }),
            K === null ? ((z = K = P), (w = Z)) : (K = K.next = P),
            (y |= B));
        if (((b = b.next), b === null)) {
          if (((b = u.shared.pending), b === null)) break;
          ((P = b),
            (b = P.next),
            (P.next = null),
            (u.lastBaseUpdate = P),
            (u.shared.pending = null));
        }
      } while (!0);
      (K === null && (w = Z),
        (u.baseState = w),
        (u.firstBaseUpdate = z),
        (u.lastBaseUpdate = K),
        d === null && (u.shared.lanes = 0),
        (In |= y),
        (e.lanes = y),
        (e.memoizedState = Z));
    }
  }
  function Ph(e, t) {
    if (typeof e != "function") throw Error(r(191, e));
    e.call(t);
  }
  function Hh(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++) Ph(i[e], t);
  }
  var ii = D(null),
    qr = D(0);
  function Gh(e, t) {
    ((e = Nn), X(qr, e), X(ii, t), (Nn = e | t.baseLanes));
  }
  function fu() {
    (X(qr, Nn), X(ii, ii.current));
  }
  function du() {
    ((Nn = qr.current), F(ii), F(qr));
  }
  var qn = 0,
    ye = null,
    Me = null,
    Xe = null,
    Kr = !1,
    si = !1,
    wa = !1,
    Fr = 0,
    cs = 0,
    ri = null,
    f1 = 0;
  function Ke() {
    throw Error(r(321));
  }
  function hu(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Dt(e[i], t[i])) return !1;
    return !0;
  }
  function mu(e, t, i, l, u, d) {
    return (
      (qn = d),
      (ye = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (U.H = e === null || e.memoizedState === null ? Am : Cm),
      (wa = !1),
      (d = i(l, u)),
      (wa = !1),
      si && (d = qh(t, i, l, u)),
      Yh(e),
      d
    );
  }
  function Yh(e) {
    U.H = Jr;
    var t = Me !== null && Me.next !== null;
    if (((qn = 0), (Xe = Me = ye = null), (Kr = !1), (cs = 0), (ri = null), t))
      throw Error(r(300));
    e === null ||
      tt ||
      ((e = e.dependencies), e !== null && kr(e) && (tt = !0));
  }
  function qh(e, t, i, l) {
    ye = e;
    var u = 0;
    do {
      if ((si && (ri = null), (cs = 0), (si = !1), 25 <= u))
        throw Error(r(301));
      if (((u += 1), (Xe = Me = null), e.updateQueue != null)) {
        var d = e.updateQueue;
        ((d.lastEffect = null),
          (d.events = null),
          (d.stores = null),
          d.memoCache != null && (d.memoCache.index = 0));
      }
      ((U.H = v1), (d = t(i, l)));
    } while (si);
    return d;
  }
  function d1() {
    var e = U.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? fs(t) : t),
      (e = e.useState()[0]),
      (Me !== null ? Me.memoizedState : null) !== e && (ye.flags |= 1024),
      t
    );
  }
  function pu() {
    var e = Fr !== 0;
    return ((Fr = 0), e);
  }
  function gu(e, t, i) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i));
  }
  function yu(e) {
    if (Kr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Kr = !1;
    }
    ((qn = 0), (Xe = Me = ye = null), (si = !1), (cs = Fr = 0), (ri = null));
  }
  function St() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Xe === null ? (ye.memoizedState = Xe = e) : (Xe = Xe.next = e), Xe);
  }
  function Ze() {
    if (Me === null) {
      var e = ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Me.next;
    var t = Xe === null ? ye.memoizedState : Xe.next;
    if (t !== null) ((Xe = t), (Me = e));
    else {
      if (e === null)
        throw ye.alternate === null ? Error(r(467)) : Error(r(310));
      ((Me = e),
        (e = {
          memoizedState: Me.memoizedState,
          baseState: Me.baseState,
          baseQueue: Me.baseQueue,
          queue: Me.queue,
          next: null,
        }),
        Xe === null ? (ye.memoizedState = Xe = e) : (Xe = Xe.next = e));
    }
    return Xe;
  }
  function vu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function fs(e) {
    var t = cs;
    return (
      (cs += 1),
      ri === null && (ri = []),
      (e = Uh(ri, e, t)),
      (t = ye),
      (Xe === null ? t.memoizedState : Xe.next) === null &&
        ((t = t.alternate),
        (U.H = t === null || t.memoizedState === null ? Am : Cm)),
      e
    );
  }
  function $r(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return fs(e);
      if (e.$$typeof === V) return dt(e);
    }
    throw Error(r(438, String(e)));
  }
  function xu(e) {
    var t = null,
      i = ye.updateQueue;
    if ((i !== null && (t = i.memoCache), t == null)) {
      var l = ye.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (t = {
              data: l.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      i === null && ((i = vu()), (ye.updateQueue = i)),
      (i.memoCache = t),
      (i = t.data[t.index]),
      i === void 0)
    )
      for (i = t.data[t.index] = Array(e), l = 0; l < e; l++) i[l] = H;
    return (t.index++, i);
  }
  function An(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Xr(e) {
    var t = Ze();
    return bu(t, Me, e);
  }
  function bu(e, t, i) {
    var l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = i;
    var u = e.baseQueue,
      d = l.pending;
    if (d !== null) {
      if (u !== null) {
        var y = u.next;
        ((u.next = d.next), (d.next = y));
      }
      ((t.baseQueue = u = d), (l.pending = null));
    }
    if (((d = e.baseState), u === null)) e.memoizedState = d;
    else {
      t = u.next;
      var b = (y = null),
        w = null,
        z = t,
        K = !1;
      do {
        var Z = z.lane & -536870913;
        if (Z !== z.lane ? (Te & Z) === Z : (qn & Z) === Z) {
          var B = z.revertLane;
          if (B === 0)
            (w !== null &&
              (w = w.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              Z === ni && (K = !0));
          else if ((qn & B) === B) {
            ((z = z.next), B === ni && (K = !0));
            continue;
          } else
            ((Z = {
              lane: 0,
              revertLane: z.revertLane,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              w === null ? ((b = w = Z), (y = d)) : (w = w.next = Z),
              (ye.lanes |= B),
              (In |= B));
          ((Z = z.action),
            wa && i(d, Z),
            (d = z.hasEagerState ? z.eagerState : i(d, Z)));
        } else
          ((B = {
            lane: Z,
            revertLane: z.revertLane,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            w === null ? ((b = w = B), (y = d)) : (w = w.next = B),
            (ye.lanes |= Z),
            (In |= Z));
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (w === null ? (y = d) : (w.next = b),
        !Dt(d, e.memoizedState) && ((tt = !0), K && ((i = ai), i !== null)))
      )
        throw i;
      ((e.memoizedState = d),
        (e.baseState = y),
        (e.baseQueue = w),
        (l.lastRenderedState = d));
    }
    return (u === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
  }
  function Su(e) {
    var t = Ze(),
      i = t.queue;
    if (i === null) throw Error(r(311));
    i.lastRenderedReducer = e;
    var l = i.dispatch,
      u = i.pending,
      d = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var y = (u = u.next);
      do ((d = e(d, y.action)), (y = y.next));
      while (y !== u);
      (Dt(d, t.memoizedState) || (tt = !0),
        (t.memoizedState = d),
        t.baseQueue === null && (t.baseState = d),
        (i.lastRenderedState = d));
    }
    return [d, l];
  }
  function Kh(e, t, i) {
    var l = ye,
      u = Ze(),
      d = Ce;
    if (d) {
      if (i === void 0) throw Error(r(407));
      i = i();
    } else i = t();
    var y = !Dt((Me || u).memoizedState, i);
    (y && ((u.memoizedState = i), (tt = !0)), (u = u.queue));
    var b = Xh.bind(null, l, u, e);
    if (
      (ds(2048, 8, b, [e]),
      u.getSnapshot !== t || y || (Xe !== null && Xe.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        li(9, Zr(), $h.bind(null, l, u, i, t), null),
        _e === null)
      )
        throw Error(r(349));
      d || (qn & 124) !== 0 || Fh(l, t, i);
    }
    return i;
  }
  function Fh(e, t, i) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: i }),
      (t = ye.updateQueue),
      t === null
        ? ((t = vu()), (ye.updateQueue = t), (t.stores = [e]))
        : ((i = t.stores), i === null ? (t.stores = [e]) : i.push(e)));
  }
  function $h(e, t, i, l) {
    ((t.value = i), (t.getSnapshot = l), Zh(t) && Qh(e));
  }
  function Xh(e, t, i) {
    return i(function () {
      Zh(t) && Qh(e);
    });
  }
  function Zh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Dt(e, i);
    } catch {
      return !0;
    }
  }
  function Qh(e) {
    var t = Ja(e, 2);
    t !== null && _t(t, e, 2);
  }
  function Tu(e) {
    var t = St();
    if (typeof e == "function") {
      var i = e;
      if (((e = i()), wa)) {
        Un(!0);
        try {
          i();
        } finally {
          Un(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: An,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Ih(e, t, i, l) {
    return ((e.baseState = i), bu(e, Me, typeof l == "function" ? l : An));
  }
  function h1(e, t, i, l, u) {
    if (Ir(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var d = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (y) {
          d.listeners.push(y);
        },
      };
      (U.T !== null ? i(!0) : (d.isTransition = !1),
        l(d),
        (i = t.pending),
        i === null
          ? ((d.next = t.pending = d), Jh(t, d))
          : ((d.next = i.next), (t.pending = i.next = d)));
    }
  }
  function Jh(e, t) {
    var i = t.action,
      l = t.payload,
      u = e.state;
    if (t.isTransition) {
      var d = U.T,
        y = {};
      U.T = y;
      try {
        var b = i(u, l),
          w = U.S;
        (w !== null && w(y, b), Wh(e, t, b));
      } catch (z) {
        Eu(e, t, z);
      } finally {
        U.T = d;
      }
    } else
      try {
        ((d = i(u, l)), Wh(e, t, d));
      } catch (z) {
        Eu(e, t, z);
      }
  }
  function Wh(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function"
      ? i.then(
          function (l) {
            em(e, t, l);
          },
          function (l) {
            return Eu(e, t, l);
          },
        )
      : em(e, t, i);
  }
  function em(e, t, i) {
    ((t.status = "fulfilled"),
      (t.value = i),
      tm(t),
      (e.state = i),
      (t = e.pending),
      t !== null &&
        ((i = t.next),
        i === t ? (e.pending = null) : ((i = i.next), (t.next = i), Jh(e, i))));
  }
  function Eu(e, t, i) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do ((t.status = "rejected"), (t.reason = i), tm(t), (t = t.next));
      while (t !== l);
    }
    e.action = null;
  }
  function tm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function nm(e, t) {
    return t;
  }
  function am(e, t) {
    if (Ce) {
      var i = _e.formState;
      if (i !== null) {
        e: {
          var l = ye;
          if (Ce) {
            if (Ge) {
              t: {
                for (var u = Ge, d = an; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break t;
                  }
                  if (((u = It(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((d = u.data), (u = d === "F!" || d === "F" ? u : null));
              }
              if (u) {
                ((Ge = It(u.nextSibling)), (l = u.data === "F!"));
                break e;
              }
            }
            ba(l);
          }
          l = !1;
        }
        l && (t = i[0]);
      }
    }
    return (
      (i = St()),
      (i.memoizedState = i.baseState = t),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nm,
        lastRenderedState: t,
      }),
      (i.queue = l),
      (i = Tm.bind(null, ye, l)),
      (l.dispatch = i),
      (l = Tu(!1)),
      (d = Ru.bind(null, ye, !1, l.queue)),
      (l = St()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = u),
      (i = h1.bind(null, ye, u, d, i)),
      (u.dispatch = i),
      (l.memoizedState = e),
      [t, i, !1]
    );
  }
  function im(e) {
    var t = Ze();
    return sm(t, Me, e);
  }
  function sm(e, t, i) {
    if (
      ((t = bu(e, t, nm)[0]),
      (e = Xr(An)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var l = fs(t);
      } catch (y) {
        throw y === ss ? Gr : y;
      }
    else l = t;
    t = Ze();
    var u = t.queue,
      d = u.dispatch;
    return (
      i !== t.memoizedState &&
        ((ye.flags |= 2048), li(9, Zr(), m1.bind(null, u, i), null)),
      [l, d, e]
    );
  }
  function m1(e, t) {
    e.action = t;
  }
  function rm(e) {
    var t = Ze(),
      i = Me;
    if (i !== null) return sm(t, i, e);
    (Ze(), (t = t.memoizedState), (i = Ze()));
    var l = i.queue.dispatch;
    return ((i.memoizedState = e), [t, l, !1]);
  }
  function li(e, t, i, l) {
    return (
      (e = { tag: e, create: i, deps: l, inst: t, next: null }),
      (t = ye.updateQueue),
      t === null && ((t = vu()), (ye.updateQueue = t)),
      (i = t.lastEffect),
      i === null
        ? (t.lastEffect = e.next = e)
        : ((l = i.next), (i.next = e), (e.next = l), (t.lastEffect = e)),
      e
    );
  }
  function Zr() {
    return { destroy: void 0, resource: void 0 };
  }
  function lm() {
    return Ze().memoizedState;
  }
  function Qr(e, t, i, l) {
    var u = St();
    ((l = l === void 0 ? null : l),
      (ye.flags |= e),
      (u.memoizedState = li(1 | t, Zr(), i, l)));
  }
  function ds(e, t, i, l) {
    var u = Ze();
    l = l === void 0 ? null : l;
    var d = u.memoizedState.inst;
    Me !== null && l !== null && hu(l, Me.memoizedState.deps)
      ? (u.memoizedState = li(t, d, i, l))
      : ((ye.flags |= e), (u.memoizedState = li(1 | t, d, i, l)));
  }
  function om(e, t) {
    Qr(8390656, 8, e, t);
  }
  function um(e, t) {
    ds(2048, 8, e, t);
  }
  function cm(e, t) {
    return ds(4, 2, e, t);
  }
  function fm(e, t) {
    return ds(4, 4, e, t);
  }
  function dm(e, t) {
    if (typeof t == "function") {
      e = e();
      var i = t(e);
      return function () {
        typeof i == "function" ? i() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function hm(e, t, i) {
    ((i = i != null ? i.concat([e]) : null), ds(4, 4, dm.bind(null, t, e), i));
  }
  function wu() {}
  function mm(e, t) {
    var i = Ze();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && hu(t, l[1]) ? l[0] : ((i.memoizedState = [e, t]), e);
  }
  function pm(e, t) {
    var i = Ze();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && hu(t, l[1])) return l[0];
    if (((l = e()), wa)) {
      Un(!0);
      try {
        e();
      } finally {
        Un(!1);
      }
    }
    return ((i.memoizedState = [l, t]), l);
  }
  function Au(e, t, i) {
    return i === void 0 || (qn & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = i), (e = vp()), (ye.lanes |= e), (In |= e), i);
  }
  function gm(e, t, i, l) {
    return Dt(i, t)
      ? i
      : ii.current !== null
        ? ((e = Au(e, i, l)), Dt(e, t) || (tt = !0), e)
        : (qn & 42) === 0
          ? ((tt = !0), (e.memoizedState = i))
          : ((e = vp()), (ye.lanes |= e), (In |= e), t);
  }
  function ym(e, t, i, l, u) {
    var d = Y.p;
    Y.p = d !== 0 && 8 > d ? d : 8;
    var y = U.T,
      b = {};
    ((U.T = b), Ru(e, !1, t, i));
    try {
      var w = u(),
        z = U.S;
      if (
        (z !== null && z(b, w),
        w !== null && typeof w == "object" && typeof w.then == "function")
      ) {
        var K = c1(w, l);
        hs(e, t, K, Vt(e));
      } else hs(e, t, l, Vt(e));
    } catch (Z) {
      hs(e, t, { then: function () {}, status: "rejected", reason: Z }, Vt());
    } finally {
      ((Y.p = d), (U.T = y));
    }
  }
  function p1() {}
  function Cu(e, t, i, l) {
    if (e.tag !== 5) throw Error(r(476));
    var u = vm(e).queue;
    ym(
      e,
      u,
      t,
      J,
      i === null
        ? p1
        : function () {
            return (xm(e), i(l));
          },
    );
  }
  function vm(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: An,
        lastRenderedState: J,
      },
      next: null,
    };
    var i = {};
    return (
      (t.next = {
        memoizedState: i,
        baseState: i,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: An,
          lastRenderedState: i,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function xm(e) {
    var t = vm(e).next.queue;
    hs(e, t, {}, Vt());
  }
  function Ou() {
    return dt(Ns);
  }
  function bm() {
    return Ze().memoizedState;
  }
  function Sm() {
    return Ze().memoizedState;
  }
  function g1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = Vt();
          e = Gn(i);
          var l = Yn(t, e, i);
          (l !== null && (_t(l, t, i), ls(l, t, i)),
            (t = { cache: au() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function y1(e, t, i) {
    var l = Vt();
    ((i = {
      lane: l,
      revertLane: 0,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ir(e)
        ? Em(t, i)
        : ((i = $o(e, t, i, l)), i !== null && (_t(i, e, l), wm(i, t, l))));
  }
  function Tm(e, t, i) {
    var l = Vt();
    hs(e, t, i, l);
  }
  function hs(e, t, i, l) {
    var u = {
      lane: l,
      revertLane: 0,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ir(e)) Em(t, u);
    else {
      var d = e.alternate;
      if (
        e.lanes === 0 &&
        (d === null || d.lanes === 0) &&
        ((d = t.lastRenderedReducer), d !== null)
      )
        try {
          var y = t.lastRenderedState,
            b = d(y, i);
          if (((u.hasEagerState = !0), (u.eagerState = b), Dt(b, y)))
            return (Vr(e, t, u, 0), _e === null && Lr(), !1);
        } catch {
        } finally {
        }
      if (((i = $o(e, t, u, l)), i !== null))
        return (_t(i, e, l), wm(i, t, l), !0);
    }
    return !1;
  }
  function Ru(e, t, i, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: rc(),
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ir(e))
    ) {
      if (t) throw Error(r(479));
    } else ((t = $o(e, i, l, 2)), t !== null && _t(t, e, 2));
  }
  function Ir(e) {
    var t = e.alternate;
    return e === ye || (t !== null && t === ye);
  }
  function Em(e, t) {
    si = Kr = !0;
    var i = e.pending;
    (i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (e.pending = t));
  }
  function wm(e, t, i) {
    if ((i & 4194048) !== 0) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (i |= l), (t.lanes = i), jd(e, i));
    }
  }
  var Jr = {
      readContext: dt,
      use: $r,
      useCallback: Ke,
      useContext: Ke,
      useEffect: Ke,
      useImperativeHandle: Ke,
      useLayoutEffect: Ke,
      useInsertionEffect: Ke,
      useMemo: Ke,
      useReducer: Ke,
      useRef: Ke,
      useState: Ke,
      useDebugValue: Ke,
      useDeferredValue: Ke,
      useTransition: Ke,
      useSyncExternalStore: Ke,
      useId: Ke,
      useHostTransitionStatus: Ke,
      useFormState: Ke,
      useActionState: Ke,
      useOptimistic: Ke,
      useMemoCache: Ke,
      useCacheRefresh: Ke,
    },
    Am = {
      readContext: dt,
      use: $r,
      useCallback: function (e, t) {
        return ((St().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: dt,
      useEffect: om,
      useImperativeHandle: function (e, t, i) {
        ((i = i != null ? i.concat([e]) : null),
          Qr(4194308, 4, dm.bind(null, t, e), i));
      },
      useLayoutEffect: function (e, t) {
        return Qr(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Qr(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var i = St();
        t = t === void 0 ? null : t;
        var l = e();
        if (wa) {
          Un(!0);
          try {
            e();
          } finally {
            Un(!1);
          }
        }
        return ((i.memoizedState = [l, t]), l);
      },
      useReducer: function (e, t, i) {
        var l = St();
        if (i !== void 0) {
          var u = i(t);
          if (wa) {
            Un(!0);
            try {
              i(t);
            } finally {
              Un(!1);
            }
          }
        } else u = t;
        return (
          (l.memoizedState = l.baseState = u),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: u,
          }),
          (l.queue = e),
          (e = e.dispatch = y1.bind(null, ye, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = St();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Tu(e);
        var t = e.queue,
          i = Tm.bind(null, ye, t);
        return ((t.dispatch = i), [e.memoizedState, i]);
      },
      useDebugValue: wu,
      useDeferredValue: function (e, t) {
        var i = St();
        return Au(i, e, t);
      },
      useTransition: function () {
        var e = Tu(!1);
        return (
          (e = ym.bind(null, ye, e.queue, !0, !1)),
          (St().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, i) {
        var l = ye,
          u = St();
        if (Ce) {
          if (i === void 0) throw Error(r(407));
          i = i();
        } else {
          if (((i = t()), _e === null)) throw Error(r(349));
          (Te & 124) !== 0 || Fh(l, t, i);
        }
        u.memoizedState = i;
        var d = { value: i, getSnapshot: t };
        return (
          (u.queue = d),
          om(Xh.bind(null, l, d, e), [e]),
          (l.flags |= 2048),
          li(9, Zr(), $h.bind(null, l, d, i, t), null),
          i
        );
      },
      useId: function () {
        var e = St(),
          t = _e.identifierPrefix;
        if (Ce) {
          var i = Tn,
            l = Sn;
          ((i = (l & ~(1 << (32 - Rt(l) - 1))).toString(32) + i),
            (t = "«" + t + "R" + i),
            (i = Fr++),
            0 < i && (t += "H" + i.toString(32)),
            (t += "»"));
        } else ((i = f1++), (t = "«" + t + "r" + i.toString(32) + "»"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Ou,
      useFormState: am,
      useActionState: am,
      useOptimistic: function (e) {
        var t = St();
        t.memoizedState = t.baseState = e;
        var i = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = i),
          (t = Ru.bind(null, ye, !0, i)),
          (i.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: xu,
      useCacheRefresh: function () {
        return (St().memoizedState = g1.bind(null, ye));
      },
    },
    Cm = {
      readContext: dt,
      use: $r,
      useCallback: mm,
      useContext: dt,
      useEffect: um,
      useImperativeHandle: hm,
      useInsertionEffect: cm,
      useLayoutEffect: fm,
      useMemo: pm,
      useReducer: Xr,
      useRef: lm,
      useState: function () {
        return Xr(An);
      },
      useDebugValue: wu,
      useDeferredValue: function (e, t) {
        var i = Ze();
        return gm(i, Me.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Xr(An)[0],
          t = Ze().memoizedState;
        return [typeof e == "boolean" ? e : fs(e), t];
      },
      useSyncExternalStore: Kh,
      useId: bm,
      useHostTransitionStatus: Ou,
      useFormState: im,
      useActionState: im,
      useOptimistic: function (e, t) {
        var i = Ze();
        return Ih(i, Me, e, t);
      },
      useMemoCache: xu,
      useCacheRefresh: Sm,
    },
    v1 = {
      readContext: dt,
      use: $r,
      useCallback: mm,
      useContext: dt,
      useEffect: um,
      useImperativeHandle: hm,
      useInsertionEffect: cm,
      useLayoutEffect: fm,
      useMemo: pm,
      useReducer: Su,
      useRef: lm,
      useState: function () {
        return Su(An);
      },
      useDebugValue: wu,
      useDeferredValue: function (e, t) {
        var i = Ze();
        return Me === null ? Au(i, e, t) : gm(i, Me.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Su(An)[0],
          t = Ze().memoizedState;
        return [typeof e == "boolean" ? e : fs(e), t];
      },
      useSyncExternalStore: Kh,
      useId: bm,
      useHostTransitionStatus: Ou,
      useFormState: rm,
      useActionState: rm,
      useOptimistic: function (e, t) {
        var i = Ze();
        return Me !== null
          ? Ih(i, Me, e, t)
          : ((i.baseState = e), [e, i.queue.dispatch]);
      },
      useMemoCache: xu,
      useCacheRefresh: Sm,
    },
    oi = null,
    ms = 0;
  function Wr(e) {
    var t = ms;
    return ((ms += 1), oi === null && (oi = []), Uh(oi, e, t));
  }
  function ps(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function el(e, t) {
    throw t.$$typeof === v
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e,
          ),
        ));
  }
  function Om(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Rm(e) {
    function t(L, O) {
      if (e) {
        var _ = L.deletions;
        _ === null ? ((L.deletions = [O]), (L.flags |= 16)) : _.push(O);
      }
    }
    function i(L, O) {
      if (!e) return null;
      for (; O !== null; ) (t(L, O), (O = O.sibling));
      return null;
    }
    function l(L) {
      for (var O = new Map(); L !== null; )
        (L.key !== null ? O.set(L.key, L) : O.set(L.index, L), (L = L.sibling));
      return O;
    }
    function u(L, O) {
      return ((L = bn(L, O)), (L.index = 0), (L.sibling = null), L);
    }
    function d(L, O, _) {
      return (
        (L.index = _),
        e
          ? ((_ = L.alternate),
            _ !== null
              ? ((_ = _.index), _ < O ? ((L.flags |= 67108866), O) : _)
              : ((L.flags |= 67108866), O))
          : ((L.flags |= 1048576), O)
      );
    }
    function y(L) {
      return (e && L.alternate === null && (L.flags |= 67108866), L);
    }
    function b(L, O, _, $) {
      return O === null || O.tag !== 6
        ? ((O = Zo(_, L.mode, $)), (O.return = L), O)
        : ((O = u(O, _)), (O.return = L), O);
    }
    function w(L, O, _, $) {
      var ie = _.type;
      return ie === E
        ? K(L, O, _.props.children, $, _.key)
        : O !== null &&
            (O.elementType === ie ||
              (typeof ie == "object" &&
                ie !== null &&
                ie.$$typeof === k &&
                Om(ie) === O.type))
          ? ((O = u(O, _.props)), ps(O, _), (O.return = L), O)
          : ((O = zr(_.type, _.key, _.props, null, L.mode, $)),
            ps(O, _),
            (O.return = L),
            O);
    }
    function z(L, O, _, $) {
      return O === null ||
        O.tag !== 4 ||
        O.stateNode.containerInfo !== _.containerInfo ||
        O.stateNode.implementation !== _.implementation
        ? ((O = Qo(_, L.mode, $)), (O.return = L), O)
        : ((O = u(O, _.children || [])), (O.return = L), O);
    }
    function K(L, O, _, $, ie) {
      return O === null || O.tag !== 7
        ? ((O = ga(_, L.mode, $, ie)), (O.return = L), O)
        : ((O = u(O, _)), (O.return = L), O);
    }
    function Z(L, O, _) {
      if (
        (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
      )
        return ((O = Zo("" + O, L.mode, _)), (O.return = L), O);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case x:
            return (
              (_ = zr(O.type, O.key, O.props, null, L.mode, _)),
              ps(_, O),
              (_.return = L),
              _
            );
          case T:
            return ((O = Qo(O, L.mode, _)), (O.return = L), O);
          case k:
            var $ = O._init;
            return ((O = $(O._payload)), Z(L, O, _));
        }
        if (ce(O) || ee(O))
          return ((O = ga(O, L.mode, _, null)), (O.return = L), O);
        if (typeof O.then == "function") return Z(L, Wr(O), _);
        if (O.$$typeof === V) return Z(L, Pr(L, O), _);
        el(L, O);
      }
      return null;
    }
    function B(L, O, _, $) {
      var ie = O !== null ? O.key : null;
      if (
        (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
      )
        return ie !== null ? null : b(L, O, "" + _, $);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case x:
            return _.key === ie ? w(L, O, _, $) : null;
          case T:
            return _.key === ie ? z(L, O, _, $) : null;
          case k:
            return ((ie = _._init), (_ = ie(_._payload)), B(L, O, _, $));
        }
        if (ce(_) || ee(_)) return ie !== null ? null : K(L, O, _, $, null);
        if (typeof _.then == "function") return B(L, O, Wr(_), $);
        if (_.$$typeof === V) return B(L, O, Pr(L, _), $);
        el(L, _);
      }
      return null;
    }
    function P(L, O, _, $, ie) {
      if (
        (typeof $ == "string" && $ !== "") ||
        typeof $ == "number" ||
        typeof $ == "bigint"
      )
        return ((L = L.get(_) || null), b(O, L, "" + $, ie));
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case x:
            return (
              (L = L.get($.key === null ? _ : $.key) || null),
              w(O, L, $, ie)
            );
          case T:
            return (
              (L = L.get($.key === null ? _ : $.key) || null),
              z(O, L, $, ie)
            );
          case k:
            var xe = $._init;
            return (($ = xe($._payload)), P(L, O, _, $, ie));
        }
        if (ce($) || ee($))
          return ((L = L.get(_) || null), K(O, L, $, ie, null));
        if (typeof $.then == "function") return P(L, O, _, Wr($), ie);
        if ($.$$typeof === V) return P(L, O, _, Pr(O, $), ie);
        el(O, $);
      }
      return null;
    }
    function de(L, O, _, $) {
      for (
        var ie = null, xe = null, re = O, fe = (O = 0), at = null;
        re !== null && fe < _.length;
        fe++
      ) {
        re.index > fe ? ((at = re), (re = null)) : (at = re.sibling);
        var Ae = B(L, re, _[fe], $);
        if (Ae === null) {
          re === null && (re = at);
          break;
        }
        (e && re && Ae.alternate === null && t(L, re),
          (O = d(Ae, O, fe)),
          xe === null ? (ie = Ae) : (xe.sibling = Ae),
          (xe = Ae),
          (re = at));
      }
      if (fe === _.length) return (i(L, re), Ce && va(L, fe), ie);
      if (re === null) {
        for (; fe < _.length; fe++)
          ((re = Z(L, _[fe], $)),
            re !== null &&
              ((O = d(re, O, fe)),
              xe === null ? (ie = re) : (xe.sibling = re),
              (xe = re)));
        return (Ce && va(L, fe), ie);
      }
      for (re = l(re); fe < _.length; fe++)
        ((at = P(re, L, fe, _[fe], $)),
          at !== null &&
            (e &&
              at.alternate !== null &&
              re.delete(at.key === null ? fe : at.key),
            (O = d(at, O, fe)),
            xe === null ? (ie = at) : (xe.sibling = at),
            (xe = at)));
      return (
        e &&
          re.forEach(function (ra) {
            return t(L, ra);
          }),
        Ce && va(L, fe),
        ie
      );
    }
    function ue(L, O, _, $) {
      if (_ == null) throw Error(r(151));
      for (
        var ie = null,
          xe = null,
          re = O,
          fe = (O = 0),
          at = null,
          Ae = _.next();
        re !== null && !Ae.done;
        fe++, Ae = _.next()
      ) {
        re.index > fe ? ((at = re), (re = null)) : (at = re.sibling);
        var ra = B(L, re, Ae.value, $);
        if (ra === null) {
          re === null && (re = at);
          break;
        }
        (e && re && ra.alternate === null && t(L, re),
          (O = d(ra, O, fe)),
          xe === null ? (ie = ra) : (xe.sibling = ra),
          (xe = ra),
          (re = at));
      }
      if (Ae.done) return (i(L, re), Ce && va(L, fe), ie);
      if (re === null) {
        for (; !Ae.done; fe++, Ae = _.next())
          ((Ae = Z(L, Ae.value, $)),
            Ae !== null &&
              ((O = d(Ae, O, fe)),
              xe === null ? (ie = Ae) : (xe.sibling = Ae),
              (xe = Ae)));
        return (Ce && va(L, fe), ie);
      }
      for (re = l(re); !Ae.done; fe++, Ae = _.next())
        ((Ae = P(re, L, fe, Ae.value, $)),
          Ae !== null &&
            (e &&
              Ae.alternate !== null &&
              re.delete(Ae.key === null ? fe : Ae.key),
            (O = d(Ae, O, fe)),
            xe === null ? (ie = Ae) : (xe.sibling = Ae),
            (xe = Ae)));
      return (
        e &&
          re.forEach(function (xS) {
            return t(L, xS);
          }),
        Ce && va(L, fe),
        ie
      );
    }
    function je(L, O, _, $) {
      if (
        (typeof _ == "object" &&
          _ !== null &&
          _.type === E &&
          _.key === null &&
          (_ = _.props.children),
        typeof _ == "object" && _ !== null)
      ) {
        switch (_.$$typeof) {
          case x:
            e: {
              for (var ie = _.key; O !== null; ) {
                if (O.key === ie) {
                  if (((ie = _.type), ie === E)) {
                    if (O.tag === 7) {
                      (i(L, O.sibling),
                        ($ = u(O, _.props.children)),
                        ($.return = L),
                        (L = $));
                      break e;
                    }
                  } else if (
                    O.elementType === ie ||
                    (typeof ie == "object" &&
                      ie !== null &&
                      ie.$$typeof === k &&
                      Om(ie) === O.type)
                  ) {
                    (i(L, O.sibling),
                      ($ = u(O, _.props)),
                      ps($, _),
                      ($.return = L),
                      (L = $));
                    break e;
                  }
                  i(L, O);
                  break;
                } else t(L, O);
                O = O.sibling;
              }
              _.type === E
                ? (($ = ga(_.props.children, L.mode, $, _.key)),
                  ($.return = L),
                  (L = $))
                : (($ = zr(_.type, _.key, _.props, null, L.mode, $)),
                  ps($, _),
                  ($.return = L),
                  (L = $));
            }
            return y(L);
          case T:
            e: {
              for (ie = _.key; O !== null; ) {
                if (O.key === ie)
                  if (
                    O.tag === 4 &&
                    O.stateNode.containerInfo === _.containerInfo &&
                    O.stateNode.implementation === _.implementation
                  ) {
                    (i(L, O.sibling),
                      ($ = u(O, _.children || [])),
                      ($.return = L),
                      (L = $));
                    break e;
                  } else {
                    i(L, O);
                    break;
                  }
                else t(L, O);
                O = O.sibling;
              }
              (($ = Qo(_, L.mode, $)), ($.return = L), (L = $));
            }
            return y(L);
          case k:
            return ((ie = _._init), (_ = ie(_._payload)), je(L, O, _, $));
        }
        if (ce(_)) return de(L, O, _, $);
        if (ee(_)) {
          if (((ie = ee(_)), typeof ie != "function")) throw Error(r(150));
          return ((_ = ie.call(_)), ue(L, O, _, $));
        }
        if (typeof _.then == "function") return je(L, O, Wr(_), $);
        if (_.$$typeof === V) return je(L, O, Pr(L, _), $);
        el(L, _);
      }
      return (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
        ? ((_ = "" + _),
          O !== null && O.tag === 6
            ? (i(L, O.sibling), ($ = u(O, _)), ($.return = L), (L = $))
            : (i(L, O), ($ = Zo(_, L.mode, $)), ($.return = L), (L = $)),
          y(L))
        : i(L, O);
    }
    return function (L, O, _, $) {
      try {
        ms = 0;
        var ie = je(L, O, _, $);
        return ((oi = null), ie);
      } catch (re) {
        if (re === ss || re === Gr) throw re;
        var xe = Mt(29, re, null, L.mode);
        return ((xe.lanes = $), (xe.return = L), xe);
      } finally {
      }
    };
  }
  var ui = Rm(!0),
    Dm = Rm(!1),
    qt = D(null),
    sn = null;
  function Kn(e) {
    var t = e.alternate;
    (X(We, We.current & 1),
      X(qt, e),
      sn === null &&
        (t === null || ii.current !== null || t.memoizedState !== null) &&
        (sn = e));
  }
  function Mm(e) {
    if (e.tag === 22) {
      if ((X(We, We.current), X(qt, e), sn === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (sn = e);
      }
    } else Fn();
  }
  function Fn() {
    (X(We, We.current), X(qt, qt.current));
  }
  function Cn(e) {
    (F(qt), sn === e && (sn = null), F(We));
  }
  var We = D(0);
  function tl(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (
          i !== null &&
          ((i = i.dehydrated), i === null || i.data === "$?" || vc(i))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  function Du(e, t, i, l) {
    ((t = e.memoizedState),
      (i = i(l, t)),
      (i = i == null ? t : g({}, t, i)),
      (e.memoizedState = i),
      e.lanes === 0 && (e.updateQueue.baseState = i));
  }
  var Mu = {
    enqueueSetState: function (e, t, i) {
      e = e._reactInternals;
      var l = Vt(),
        u = Gn(l);
      ((u.payload = t),
        i != null && (u.callback = i),
        (t = Yn(e, u, l)),
        t !== null && (_t(t, e, l), ls(t, e, l)));
    },
    enqueueReplaceState: function (e, t, i) {
      e = e._reactInternals;
      var l = Vt(),
        u = Gn(l);
      ((u.tag = 1),
        (u.payload = t),
        i != null && (u.callback = i),
        (t = Yn(e, u, l)),
        t !== null && (_t(t, e, l), ls(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var i = Vt(),
        l = Gn(i);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = Yn(e, l, i)),
        t !== null && (_t(t, e, i), ls(t, e, i)));
    },
  };
  function Nm(e, t, i, l, u, d, y) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(l, d, y)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ii(i, l) || !Ii(u, d)
          : !0
    );
  }
  function jm(e, t, i, l) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(i, l),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(i, l),
      t.state !== e && Mu.enqueueReplaceState(t, t.state, null));
  }
  function Aa(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var l in t) l !== "ref" && (i[l] = t[l]);
    }
    if ((e = e.defaultProps)) {
      i === t && (i = g({}, i));
      for (var u in e) i[u] === void 0 && (i[u] = e[u]);
    }
    return i;
  }
  var nl =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Lm(e) {
    nl(e);
  }
  function Vm(e) {
    console.error(e);
  }
  function _m(e) {
    nl(e);
  }
  function al(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function zm(e, t, i) {
    try {
      var l = e.onCaughtError;
      l(i.value, {
        componentStack: i.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function Nu(e, t, i) {
    return (
      (i = Gn(i)),
      (i.tag = 3),
      (i.payload = { element: null }),
      (i.callback = function () {
        al(e, t);
      }),
      i
    );
  }
  function Um(e) {
    return ((e = Gn(e)), (e.tag = 3), e);
  }
  function Bm(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = l.value;
      ((e.payload = function () {
        return u(d);
      }),
        (e.callback = function () {
          zm(t, i, l);
        }));
    }
    var y = i.stateNode;
    y !== null &&
      typeof y.componentDidCatch == "function" &&
      (e.callback = function () {
        (zm(t, i, l),
          typeof u != "function" &&
            (Jn === null ? (Jn = new Set([this])) : Jn.add(this)));
        var b = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: b !== null ? b : "",
        });
      });
  }
  function x1(e, t, i, l, u) {
    if (
      ((i.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((t = i.alternate),
        t !== null && ns(t, i, u, !0),
        (i = qt.current),
        i !== null)
      ) {
        switch (i.tag) {
          case 13:
            return (
              sn === null ? tc() : i.alternate === null && Ye === 0 && (Ye = 3),
              (i.flags &= -257),
              (i.flags |= 65536),
              (i.lanes = u),
              l === ru
                ? (i.flags |= 16384)
                : ((t = i.updateQueue),
                  t === null ? (i.updateQueue = new Set([l])) : t.add(l),
                  ac(e, l, u)),
              !1
            );
          case 22:
            return (
              (i.flags |= 65536),
              l === ru
                ? (i.flags |= 16384)
                : ((t = i.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (i.updateQueue = t))
                    : ((i = t.retryQueue),
                      i === null ? (t.retryQueue = new Set([l])) : i.add(l)),
                  ac(e, l, u)),
              !1
            );
        }
        throw Error(r(435, i.tag));
      }
      return (ac(e, l, u), tc(), !1);
    }
    if (Ce)
      return (
        (t = qt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            l !== Wo && ((e = Error(r(422), { cause: l })), ts(Pt(e, i))))
          : (l !== Wo && ((t = Error(r(423), { cause: l })), ts(Pt(t, i))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (l = Pt(l, i)),
            (u = Nu(e.stateNode, l, u)),
            uu(e, u),
            Ye !== 4 && (Ye = 2)),
        !1
      );
    var d = Error(r(520), { cause: l });
    if (
      ((d = Pt(d, i)),
      Ts === null ? (Ts = [d]) : Ts.push(d),
      Ye !== 4 && (Ye = 2),
      t === null)
    )
      return !0;
    ((l = Pt(l, i)), (i = t));
    do {
      switch (i.tag) {
        case 3:
          return (
            (i.flags |= 65536),
            (e = u & -u),
            (i.lanes |= e),
            (e = Nu(i.stateNode, l, e)),
            uu(i, e),
            !1
          );
        case 1:
          if (
            ((t = i.type),
            (d = i.stateNode),
            (i.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (d !== null &&
                  typeof d.componentDidCatch == "function" &&
                  (Jn === null || !Jn.has(d)))))
          )
            return (
              (i.flags |= 65536),
              (u &= -u),
              (i.lanes |= u),
              (u = Um(u)),
              Bm(u, e, i, l),
              uu(i, u),
              !1
            );
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var km = Error(r(461)),
    tt = !1;
  function lt(e, t, i, l) {
    t.child = e === null ? Dm(t, null, i, l) : ui(t, e.child, i, l);
  }
  function Pm(e, t, i, l, u) {
    i = i.render;
    var d = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var b in l) b !== "ref" && (y[b] = l[b]);
    } else y = l;
    return (
      Ta(t),
      (l = mu(e, t, i, y, d, u)),
      (b = pu()),
      e !== null && !tt
        ? (gu(e, t, u), On(e, t, u))
        : (Ce && b && Io(t), (t.flags |= 1), lt(e, t, l, u), t.child)
    );
  }
  function Hm(e, t, i, l, u) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" &&
        !Xo(d) &&
        d.defaultProps === void 0 &&
        i.compare === null
        ? ((t.tag = 15), (t.type = d), Gm(e, t, d, l, u))
        : ((e = zr(i.type, null, l, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((d = e.child), !ku(e, u))) {
      var y = d.memoizedProps;
      if (
        ((i = i.compare), (i = i !== null ? i : Ii), i(y, l) && e.ref === t.ref)
      )
        return On(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = bn(d, l)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Gm(e, t, i, l, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (Ii(d, l) && e.ref === t.ref)
        if (((tt = !1), (t.pendingProps = l = d), ku(e, u)))
          (e.flags & 131072) !== 0 && (tt = !0);
        else return ((t.lanes = e.lanes), On(e, t, u));
    }
    return ju(e, t, i, l, u);
  }
  function Ym(e, t, i) {
    var l = t.pendingProps,
      u = l.children,
      d = e !== null ? e.memoizedState : null;
    if (l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((l = d !== null ? d.baseLanes | i : i), e !== null)) {
          for (u = t.child = e.child, d = 0; u !== null; )
            ((d = d | u.lanes | u.childLanes), (u = u.sibling));
          t.childLanes = d & ~l;
        } else ((t.childLanes = 0), (t.child = null));
        return qm(e, t, l, i);
      }
      if ((i & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Hr(t, d !== null ? d.cachePool : null),
          d !== null ? Gh(t, d) : fu(),
          Mm(t));
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          qm(e, t, d !== null ? d.baseLanes | i : i, i)
        );
    } else
      d !== null
        ? (Hr(t, d.cachePool), Gh(t, d), Fn(), (t.memoizedState = null))
        : (e !== null && Hr(t, null), fu(), Fn());
    return (lt(e, t, u, i), t.child);
  }
  function qm(e, t, i, l) {
    var u = su();
    return (
      (u = u === null ? null : { parent: Je._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: i, cachePool: u }),
      e !== null && Hr(t, null),
      fu(),
      Mm(t),
      e !== null && ns(e, t, l, !0),
      null
    );
  }
  function il(e, t) {
    var i = t.ref;
    if (i === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object") throw Error(r(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function ju(e, t, i, l, u) {
    return (
      Ta(t),
      (i = mu(e, t, i, l, void 0, u)),
      (l = pu()),
      e !== null && !tt
        ? (gu(e, t, u), On(e, t, u))
        : (Ce && l && Io(t), (t.flags |= 1), lt(e, t, i, u), t.child)
    );
  }
  function Km(e, t, i, l, u, d) {
    return (
      Ta(t),
      (t.updateQueue = null),
      (i = qh(t, l, i, u)),
      Yh(e),
      (l = pu()),
      e !== null && !tt
        ? (gu(e, t, d), On(e, t, d))
        : (Ce && l && Io(t), (t.flags |= 1), lt(e, t, i, d), t.child)
    );
  }
  function Fm(e, t, i, l, u) {
    if ((Ta(t), t.stateNode === null)) {
      var d = Wa,
        y = i.contextType;
      (typeof y == "object" && y !== null && (d = dt(y)),
        (d = new i(l, d)),
        (t.memoizedState =
          d.state !== null && d.state !== void 0 ? d.state : null),
        (d.updater = Mu),
        (t.stateNode = d),
        (d._reactInternals = t),
        (d = t.stateNode),
        (d.props = l),
        (d.state = t.memoizedState),
        (d.refs = {}),
        lu(t),
        (y = i.contextType),
        (d.context = typeof y == "object" && y !== null ? dt(y) : Wa),
        (d.state = t.memoizedState),
        (y = i.getDerivedStateFromProps),
        typeof y == "function" && (Du(t, i, y, l), (d.state = t.memoizedState)),
        typeof i.getDerivedStateFromProps == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function" ||
          (typeof d.UNSAFE_componentWillMount != "function" &&
            typeof d.componentWillMount != "function") ||
          ((y = d.state),
          typeof d.componentWillMount == "function" && d.componentWillMount(),
          typeof d.UNSAFE_componentWillMount == "function" &&
            d.UNSAFE_componentWillMount(),
          y !== d.state && Mu.enqueueReplaceState(d, d.state, null),
          us(t, l, d, u),
          os(),
          (d.state = t.memoizedState)),
        typeof d.componentDidMount == "function" && (t.flags |= 4194308),
        (l = !0));
    } else if (e === null) {
      d = t.stateNode;
      var b = t.memoizedProps,
        w = Aa(i, b);
      d.props = w;
      var z = d.context,
        K = i.contextType;
      ((y = Wa), typeof K == "object" && K !== null && (y = dt(K)));
      var Z = i.getDerivedStateFromProps;
      ((K =
        typeof Z == "function" ||
        typeof d.getSnapshotBeforeUpdate == "function"),
        (b = t.pendingProps !== b),
        K ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((b || z !== y) && jm(t, d, l, y)),
        (Hn = !1));
      var B = t.memoizedState;
      ((d.state = B),
        us(t, l, d, u),
        os(),
        (z = t.memoizedState),
        b || B !== z || Hn
          ? (typeof Z == "function" && (Du(t, i, Z, l), (z = t.memoizedState)),
            (w = Hn || Nm(t, i, w, l, B, z, y))
              ? (K ||
                  (typeof d.UNSAFE_componentWillMount != "function" &&
                    typeof d.componentWillMount != "function") ||
                  (typeof d.componentWillMount == "function" &&
                    d.componentWillMount(),
                  typeof d.UNSAFE_componentWillMount == "function" &&
                    d.UNSAFE_componentWillMount()),
                typeof d.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof d.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = l),
                (t.memoizedState = z)),
            (d.props = l),
            (d.state = z),
            (d.context = y),
            (l = w))
          : (typeof d.componentDidMount == "function" && (t.flags |= 4194308),
            (l = !1)));
    } else {
      ((d = t.stateNode),
        ou(e, t),
        (y = t.memoizedProps),
        (K = Aa(i, y)),
        (d.props = K),
        (Z = t.pendingProps),
        (B = d.context),
        (z = i.contextType),
        (w = Wa),
        typeof z == "object" && z !== null && (w = dt(z)),
        (b = i.getDerivedStateFromProps),
        (z =
          typeof b == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function") ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((y !== Z || B !== w) && jm(t, d, l, w)),
        (Hn = !1),
        (B = t.memoizedState),
        (d.state = B),
        us(t, l, d, u),
        os());
      var P = t.memoizedState;
      y !== Z ||
      B !== P ||
      Hn ||
      (e !== null && e.dependencies !== null && kr(e.dependencies))
        ? (typeof b == "function" && (Du(t, i, b, l), (P = t.memoizedState)),
          (K =
            Hn ||
            Nm(t, i, K, l, B, P, w) ||
            (e !== null && e.dependencies !== null && kr(e.dependencies)))
            ? (z ||
                (typeof d.UNSAFE_componentWillUpdate != "function" &&
                  typeof d.componentWillUpdate != "function") ||
                (typeof d.componentWillUpdate == "function" &&
                  d.componentWillUpdate(l, P, w),
                typeof d.UNSAFE_componentWillUpdate == "function" &&
                  d.UNSAFE_componentWillUpdate(l, P, w)),
              typeof d.componentDidUpdate == "function" && (t.flags |= 4),
              typeof d.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof d.componentDidUpdate != "function" ||
                (y === e.memoizedProps && B === e.memoizedState) ||
                (t.flags |= 4),
              typeof d.getSnapshotBeforeUpdate != "function" ||
                (y === e.memoizedProps && B === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = l),
              (t.memoizedState = P)),
          (d.props = l),
          (d.state = P),
          (d.context = w),
          (l = K))
        : (typeof d.componentDidUpdate != "function" ||
            (y === e.memoizedProps && B === e.memoizedState) ||
            (t.flags |= 4),
          typeof d.getSnapshotBeforeUpdate != "function" ||
            (y === e.memoizedProps && B === e.memoizedState) ||
            (t.flags |= 1024),
          (l = !1));
    }
    return (
      (d = l),
      il(e, t),
      (l = (t.flags & 128) !== 0),
      d || l
        ? ((d = t.stateNode),
          (i =
            l && typeof i.getDerivedStateFromError != "function"
              ? null
              : d.render()),
          (t.flags |= 1),
          e !== null && l
            ? ((t.child = ui(t, e.child, null, u)),
              (t.child = ui(t, null, i, u)))
            : lt(e, t, i, u),
          (t.memoizedState = d.state),
          (e = t.child))
        : (e = On(e, t, u)),
      e
    );
  }
  function $m(e, t, i, l) {
    return (es(), (t.flags |= 256), lt(e, t, i, l), t.child);
  }
  var Lu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Vu(e) {
    return { baseLanes: e, cachePool: Vh() };
  }
  function _u(e, t, i) {
    return ((e = e !== null ? e.childLanes & ~i : 0), t && (e |= Kt), e);
  }
  function Xm(e, t, i) {
    var l = t.pendingProps,
      u = !1,
      d = (t.flags & 128) !== 0,
      y;
    if (
      ((y = d) ||
        (y =
          e !== null && e.memoizedState === null ? !1 : (We.current & 2) !== 0),
      y && ((u = !0), (t.flags &= -129)),
      (y = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ce) {
        if ((u ? Kn(t) : Fn(), Ce)) {
          var b = Ge,
            w;
          if ((w = b)) {
            e: {
              for (w = b, b = an; w.nodeType !== 8; ) {
                if (!b) {
                  b = null;
                  break e;
                }
                if (((w = It(w.nextSibling)), w === null)) {
                  b = null;
                  break e;
                }
              }
              b = w;
            }
            b !== null
              ? ((t.memoizedState = {
                  dehydrated: b,
                  treeContext: ya !== null ? { id: Sn, overflow: Tn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (w = Mt(18, null, null, 0)),
                (w.stateNode = b),
                (w.return = t),
                (t.child = w),
                (gt = t),
                (Ge = null),
                (w = !0))
              : (w = !1);
          }
          w || ba(t);
        }
        if (
          ((b = t.memoizedState),
          b !== null && ((b = b.dehydrated), b !== null))
        )
          return (vc(b) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        Cn(t);
      }
      return (
        (b = l.children),
        (l = l.fallback),
        u
          ? (Fn(),
            (u = t.mode),
            (b = sl({ mode: "hidden", children: b }, u)),
            (l = ga(l, u, i, null)),
            (b.return = t),
            (l.return = t),
            (b.sibling = l),
            (t.child = b),
            (u = t.child),
            (u.memoizedState = Vu(i)),
            (u.childLanes = _u(e, y, i)),
            (t.memoizedState = Lu),
            l)
          : (Kn(t), zu(t, b))
      );
    }
    if (
      ((w = e.memoizedState), w !== null && ((b = w.dehydrated), b !== null))
    ) {
      if (d)
        t.flags & 256
          ? (Kn(t), (t.flags &= -257), (t = Uu(e, t, i)))
          : t.memoizedState !== null
            ? (Fn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Fn(),
              (u = l.fallback),
              (b = t.mode),
              (l = sl({ mode: "visible", children: l.children }, b)),
              (u = ga(u, b, i, null)),
              (u.flags |= 2),
              (l.return = t),
              (u.return = t),
              (l.sibling = u),
              (t.child = l),
              ui(t, e.child, null, i),
              (l = t.child),
              (l.memoizedState = Vu(i)),
              (l.childLanes = _u(e, y, i)),
              (t.memoizedState = Lu),
              (t = u));
      else if ((Kn(t), vc(b))) {
        if (((y = b.nextSibling && b.nextSibling.dataset), y)) var z = y.dgst;
        ((y = z),
          (l = Error(r(419))),
          (l.stack = ""),
          (l.digest = y),
          ts({ value: l, source: null, stack: null }),
          (t = Uu(e, t, i)));
      } else if (
        (tt || ns(e, t, i, !1), (y = (i & e.childLanes) !== 0), tt || y)
      ) {
        if (
          ((y = _e),
          y !== null &&
            ((l = i & -i),
            (l = (l & 42) !== 0 ? 1 : xo(l)),
            (l = (l & (y.suspendedLanes | i)) !== 0 ? 0 : l),
            l !== 0 && l !== w.retryLane))
        )
          throw ((w.retryLane = l), Ja(e, l), _t(y, e, l), km);
        (b.data === "$?" || tc(), (t = Uu(e, t, i)));
      } else
        b.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = w.treeContext),
            (Ge = It(b.nextSibling)),
            (gt = t),
            (Ce = !0),
            (xa = null),
            (an = !1),
            e !== null &&
              ((Gt[Yt++] = Sn),
              (Gt[Yt++] = Tn),
              (Gt[Yt++] = ya),
              (Sn = e.id),
              (Tn = e.overflow),
              (ya = t)),
            (t = zu(t, l.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Fn(),
        (u = l.fallback),
        (b = t.mode),
        (w = e.child),
        (z = w.sibling),
        (l = bn(w, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = w.subtreeFlags & 65011712),
        z !== null ? (u = bn(z, u)) : ((u = ga(u, b, i, null)), (u.flags |= 2)),
        (u.return = t),
        (l.return = t),
        (l.sibling = u),
        (t.child = l),
        (l = u),
        (u = t.child),
        (b = e.child.memoizedState),
        b === null
          ? (b = Vu(i))
          : ((w = b.cachePool),
            w !== null
              ? ((z = Je._currentValue),
                (w = w.parent !== z ? { parent: z, pool: z } : w))
              : (w = Vh()),
            (b = { baseLanes: b.baseLanes | i, cachePool: w })),
        (u.memoizedState = b),
        (u.childLanes = _u(e, y, i)),
        (t.memoizedState = Lu),
        l)
      : (Kn(t),
        (i = e.child),
        (e = i.sibling),
        (i = bn(i, { mode: "visible", children: l.children })),
        (i.return = t),
        (i.sibling = null),
        e !== null &&
          ((y = t.deletions),
          y === null ? ((t.deletions = [e]), (t.flags |= 16)) : y.push(e)),
        (t.child = i),
        (t.memoizedState = null),
        i);
  }
  function zu(e, t) {
    return (
      (t = sl({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function sl(e, t) {
    return (
      (e = Mt(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Uu(e, t, i) {
    return (
      ui(t, e.child, null, i),
      (e = zu(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Zm(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    (l !== null && (l.lanes |= t), tu(e.return, t, i));
  }
  function Bu(e, t, i, l, u) {
    var d = e.memoizedState;
    d === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: i,
          tailMode: u,
        })
      : ((d.isBackwards = t),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = l),
        (d.tail = i),
        (d.tailMode = u));
  }
  function Qm(e, t, i) {
    var l = t.pendingProps,
      u = l.revealOrder,
      d = l.tail;
    if ((lt(e, t, l.children, i), (l = We.current), (l & 2) !== 0))
      ((l = (l & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Zm(e, i, t);
          else if (e.tag === 19) Zm(e, i, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      l &= 1;
    }
    switch ((X(We, l), u)) {
      case "forwards":
        for (i = t.child, u = null; i !== null; )
          ((e = i.alternate),
            e !== null && tl(e) === null && (u = i),
            (i = i.sibling));
        ((i = u),
          i === null
            ? ((u = t.child), (t.child = null))
            : ((u = i.sibling), (i.sibling = null)),
          Bu(t, !1, u, i, d));
        break;
      case "backwards":
        for (i = null, u = t.child, t.child = null; u !== null; ) {
          if (((e = u.alternate), e !== null && tl(e) === null)) {
            t.child = u;
            break;
          }
          ((e = u.sibling), (u.sibling = i), (i = u), (u = e));
        }
        Bu(t, !0, i, null, d);
        break;
      case "together":
        Bu(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function On(e, t, i) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (In |= t.lanes),
      (i & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((ns(e, t, i, !1), (i & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        e = t.child, i = bn(e, e.pendingProps), t.child = i, i.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (i = i.sibling = bn(e, e.pendingProps)),
          (i.return = t));
      i.sibling = null;
    }
    return t.child;
  }
  function ku(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && kr(e)));
  }
  function b1(e, t, i) {
    switch (t.tag) {
      case 3:
        (me(t, t.stateNode.containerInfo),
          Pn(t, Je, e.memoizedState.cache),
          es());
        break;
      case 27:
      case 5:
        ct(t);
        break;
      case 4:
        me(t, t.stateNode.containerInfo);
        break;
      case 10:
        Pn(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Kn(t), (t.flags |= 128), null)
            : (i & t.child.childLanes) !== 0
              ? Xm(e, t, i)
              : (Kn(t), (e = On(e, t, i)), e !== null ? e.sibling : null);
        Kn(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((l = (i & t.childLanes) !== 0),
          l || (ns(e, t, i, !1), (l = (i & t.childLanes) !== 0)),
          u)
        ) {
          if (l) return Qm(e, t, i);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          X(We, We.current),
          l)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Ym(e, t, i));
      case 24:
        Pn(t, Je, e.memoizedState.cache);
    }
    return On(e, t, i);
  }
  function Im(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) tt = !0;
      else {
        if (!ku(e, i) && (t.flags & 128) === 0) return ((tt = !1), b1(e, t, i));
        tt = (e.flags & 131072) !== 0;
      }
    else ((tt = !1), Ce && (t.flags & 1048576) !== 0 && Oh(t, Br, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var l = t.elementType,
            u = l._init;
          if (((l = u(l._payload)), (t.type = l), typeof l == "function"))
            Xo(l)
              ? ((e = Aa(l, e)), (t.tag = 1), (t = Fm(null, t, l, e, i)))
              : ((t.tag = 0), (t = ju(null, t, l, e, i)));
          else {
            if (l != null) {
              if (((u = l.$$typeof), u === Q)) {
                ((t.tag = 11), (t = Pm(null, t, l, e, i)));
                break e;
              } else if (u === te) {
                ((t.tag = 14), (t = Hm(null, t, l, e, i)));
                break e;
              }
            }
            throw ((t = ve(l) || l), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return ju(e, t, t.type, t.pendingProps, i);
      case 1:
        return ((l = t.type), (u = Aa(l, t.pendingProps)), Fm(e, t, l, u, i));
      case 3:
        e: {
          if ((me(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387));
          l = t.pendingProps;
          var d = t.memoizedState;
          ((u = d.element), ou(e, t), us(t, l, null, i));
          var y = t.memoizedState;
          if (
            ((l = y.cache),
            Pn(t, Je, l),
            l !== d.cache && nu(t, [Je], i, !0),
            os(),
            (l = y.element),
            d.isDehydrated)
          )
            if (
              ((d = { element: l, isDehydrated: !1, cache: y.cache }),
              (t.updateQueue.baseState = d),
              (t.memoizedState = d),
              t.flags & 256)
            ) {
              t = $m(e, t, l, i);
              break e;
            } else if (l !== u) {
              ((u = Pt(Error(r(424)), t)), ts(u), (t = $m(e, t, l, i)));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                Ge = It(e.firstChild),
                  gt = t,
                  Ce = !0,
                  xa = null,
                  an = !0,
                  i = Dm(t, null, l, i),
                  t.child = i;
                i;
              )
                ((i.flags = (i.flags & -3) | 4096), (i = i.sibling));
            }
          else {
            if ((es(), l === u)) {
              t = On(e, t, i);
              break e;
            }
            lt(e, t, l, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          il(e, t),
          e === null
            ? (i = tg(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = i)
              : Ce ||
                ((i = t.type),
                (e = t.pendingProps),
                (l = xl(ne.current).createElement(i)),
                (l[ft] = t),
                (l[xt] = e),
                ut(l, i, e),
                et(l),
                (t.stateNode = l))
            : (t.memoizedState = tg(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          ct(t),
          e === null &&
            Ce &&
            ((l = t.stateNode = Jp(t.type, t.pendingProps, ne.current)),
            (gt = t),
            (an = !0),
            (u = Ge),
            ta(t.type) ? ((xc = u), (Ge = It(l.firstChild))) : (Ge = u)),
          lt(e, t, t.pendingProps.children, i),
          il(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ce &&
            ((u = l = Ge) &&
              ((l = X1(l, t.type, t.pendingProps, an)),
              l !== null
                ? ((t.stateNode = l),
                  (gt = t),
                  (Ge = It(l.firstChild)),
                  (an = !1),
                  (u = !0))
                : (u = !1)),
            u || ba(t)),
          ct(t),
          (u = t.type),
          (d = t.pendingProps),
          (y = e !== null ? e.memoizedProps : null),
          (l = d.children),
          pc(u, d) ? (l = null) : y !== null && pc(u, y) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = mu(e, t, d1, null, null, i)), (Ns._currentValue = u)),
          il(e, t),
          lt(e, t, l, i),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ce &&
            ((e = i = Ge) &&
              ((i = Z1(i, t.pendingProps, an)),
              i !== null
                ? ((t.stateNode = i), (gt = t), (Ge = null), (e = !0))
                : (e = !1)),
            e || ba(t)),
          null
        );
      case 13:
        return Xm(e, t, i);
      case 4:
        return (
          me(t, t.stateNode.containerInfo),
          (l = t.pendingProps),
          e === null ? (t.child = ui(t, null, l, i)) : lt(e, t, l, i),
          t.child
        );
      case 11:
        return Pm(e, t, t.type, t.pendingProps, i);
      case 7:
        return (lt(e, t, t.pendingProps, i), t.child);
      case 8:
        return (lt(e, t, t.pendingProps.children, i), t.child);
      case 12:
        return (lt(e, t, t.pendingProps.children, i), t.child);
      case 10:
        return (
          (l = t.pendingProps),
          Pn(t, t.type, l.value),
          lt(e, t, l.children, i),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (l = t.pendingProps.children),
          Ta(t),
          (u = dt(u)),
          (l = l(u)),
          (t.flags |= 1),
          lt(e, t, l, i),
          t.child
        );
      case 14:
        return Hm(e, t, t.type, t.pendingProps, i);
      case 15:
        return Gm(e, t, t.type, t.pendingProps, i);
      case 19:
        return Qm(e, t, i);
      case 31:
        return (
          (l = t.pendingProps),
          (i = t.mode),
          (l = { mode: l.mode, children: l.children }),
          e === null
            ? ((i = sl(l, i)),
              (i.ref = t.ref),
              (t.child = i),
              (i.return = t),
              (t = i))
            : ((i = bn(e.child, l)),
              (i.ref = t.ref),
              (t.child = i),
              (i.return = t),
              (t = i)),
          t
        );
      case 22:
        return Ym(e, t, i);
      case 24:
        return (
          Ta(t),
          (l = dt(Je)),
          e === null
            ? ((u = su()),
              u === null &&
                ((u = _e),
                (d = au()),
                (u.pooledCache = d),
                d.refCount++,
                d !== null && (u.pooledCacheLanes |= i),
                (u = d)),
              (t.memoizedState = { parent: l, cache: u }),
              lu(t),
              Pn(t, Je, u))
            : ((e.lanes & i) !== 0 && (ou(e, t), us(t, null, null, i), os()),
              (u = e.memoizedState),
              (d = t.memoizedState),
              u.parent !== l
                ? ((u = { parent: l, cache: l }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  Pn(t, Je, l))
                : ((l = d.cache),
                  Pn(t, Je, l),
                  l !== u.cache && nu(t, [Je], i, !0))),
          lt(e, t, t.pendingProps.children, i),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Rn(e) {
    e.flags |= 4;
  }
  function Jm(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !rg(t))) {
      if (
        ((t = qt.current),
        t !== null &&
          ((Te & 4194048) === Te
            ? sn !== null
            : ((Te & 62914560) !== Te && (Te & 536870912) === 0) || t !== sn))
      )
        throw ((rs = ru), _h);
      e.flags |= 8192;
    }
  }
  function rl(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Md() : 536870912), (e.lanes |= t), (hi |= t)));
  }
  function gs(e, t) {
    if (!Ce)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var i = null; t !== null; )
            (t.alternate !== null && (i = t), (t = t.sibling));
          i === null ? (e.tail = null) : (i.sibling = null);
          break;
        case "collapsed":
          i = e.tail;
          for (var l = null; i !== null; )
            (i.alternate !== null && (l = i), (i = i.sibling));
          l === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function Be(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      i = 0,
      l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        ((i |= u.lanes | u.childLanes),
          (l |= u.subtreeFlags & 65011712),
          (l |= u.flags & 65011712),
          (u.return = e),
          (u = u.sibling));
    else
      for (u = e.child; u !== null; )
        ((i |= u.lanes | u.childLanes),
          (l |= u.subtreeFlags),
          (l |= u.flags),
          (u.return = e),
          (u = u.sibling));
    return ((e.subtreeFlags |= l), (e.childLanes = i), t);
  }
  function S1(e, t, i) {
    var l = t.pendingProps;
    switch ((Jo(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Be(t), null);
      case 1:
        return (Be(t), null);
      case 3:
        return (
          (i = t.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          wn(Je),
          ze(),
          i.pendingContext &&
            ((i.context = i.pendingContext), (i.pendingContext = null)),
          (e === null || e.child === null) &&
            (Wi(t)
              ? Rn(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Mh())),
          Be(t),
          null
        );
      case 26:
        return (
          (i = t.memoizedState),
          e === null
            ? (Rn(t),
              i !== null ? (Be(t), Jm(t, i)) : (Be(t), (t.flags &= -16777217)))
            : i
              ? i !== e.memoizedState
                ? (Rn(t), Be(t), Jm(t, i))
                : (Be(t), (t.flags &= -16777217))
              : (e.memoizedProps !== l && Rn(t), Be(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        (we(t), (i = ne.current));
        var u = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== l && Rn(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(r(166));
            return (Be(t), null);
          }
          ((e = W.current),
            Wi(t) ? Rh(t) : ((e = Jp(u, l, i)), (t.stateNode = e), Rn(t)));
        }
        return (Be(t), null);
      case 5:
        if ((we(t), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && Rn(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(r(166));
            return (Be(t), null);
          }
          if (((e = W.current), Wi(t))) Rh(t);
          else {
            switch (((u = xl(ne.current)), e)) {
              case 1:
                e = u.createElementNS("http://www.w3.org/2000/svg", i);
                break;
              case 2:
                e = u.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                break;
              default:
                switch (i) {
                  case "svg":
                    e = u.createElementNS("http://www.w3.org/2000/svg", i);
                    break;
                  case "math":
                    e = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i,
                    );
                    break;
                  case "script":
                    ((e = u.createElement("div")),
                      (e.innerHTML = "<script><\/script>"),
                      (e = e.removeChild(e.firstChild)));
                    break;
                  case "select":
                    ((e =
                      typeof l.is == "string"
                        ? u.createElement("select", { is: l.is })
                        : u.createElement("select")),
                      l.multiple
                        ? (e.multiple = !0)
                        : l.size && (e.size = l.size));
                    break;
                  default:
                    e =
                      typeof l.is == "string"
                        ? u.createElement(i, { is: l.is })
                        : u.createElement(i);
                }
            }
            ((e[ft] = t), (e[xt] = l));
            e: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) e.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                ((u.child.return = u), (u = u.child));
                continue;
              }
              if (u === t) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === t) break e;
                u = u.return;
              }
              ((u.sibling.return = u.return), (u = u.sibling));
            }
            t.stateNode = e;
            e: switch ((ut(e, i, l), i)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!l.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Rn(t);
          }
        }
        return (Be(t), (t.flags &= -16777217), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && Rn(t);
        else {
          if (typeof l != "string" && t.stateNode === null) throw Error(r(166));
          if (((e = ne.current), Wi(t))) {
            if (
              ((e = t.stateNode),
              (i = t.memoizedProps),
              (l = null),
              (u = gt),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            ((e[ft] = t),
              (e = !!(
                e.nodeValue === i ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                Kp(e.nodeValue, i)
              )),
              e || ba(t));
          } else
            ((e = xl(e).createTextNode(l)), (e[ft] = t), (t.stateNode = e));
        }
        return (Be(t), null);
      case 13:
        if (
          ((l = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = Wi(t)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(r(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(r(317));
              u[ft] = t;
            } else
              (es(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Be(t), (u = !1));
          } else
            ((u = Mh()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return t.flags & 256 ? (Cn(t), t) : (Cn(t), null);
        }
        if ((Cn(t), (t.flags & 128) !== 0)) return ((t.lanes = i), t);
        if (
          ((i = l !== null), (e = e !== null && e.memoizedState !== null), i)
        ) {
          ((l = t.child),
            (u = null),
            l.alternate !== null &&
              l.alternate.memoizedState !== null &&
              l.alternate.memoizedState.cachePool !== null &&
              (u = l.alternate.memoizedState.cachePool.pool));
          var d = null;
          (l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (d = l.memoizedState.cachePool.pool),
            d !== u && (l.flags |= 2048));
        }
        return (
          i !== e && i && (t.child.flags |= 8192),
          rl(t, t.updateQueue),
          Be(t),
          null
        );
      case 4:
        return (ze(), e === null && cc(t.stateNode.containerInfo), Be(t), null);
      case 10:
        return (wn(t.type), Be(t), null);
      case 19:
        if ((F(We), (u = t.memoizedState), u === null)) return (Be(t), null);
        if (((l = (t.flags & 128) !== 0), (d = u.rendering), d === null))
          if (l) gs(u, !1);
          else {
            if (Ye !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((d = tl(e)), d !== null)) {
                  for (
                    t.flags |= 128,
                      gs(u, !1),
                      e = d.updateQueue,
                      t.updateQueue = e,
                      rl(t, e),
                      t.subtreeFlags = 0,
                      e = i,
                      i = t.child;
                    i !== null;
                  )
                    (Ch(i, e), (i = i.sibling));
                  return (X(We, (We.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            u.tail !== null &&
              nn() > ul &&
              ((t.flags |= 128), (l = !0), gs(u, !1), (t.lanes = 4194304));
          }
        else {
          if (!l)
            if (((e = tl(d)), e !== null)) {
              if (
                ((t.flags |= 128),
                (l = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                rl(t, e),
                gs(u, !0),
                u.tail === null &&
                  u.tailMode === "hidden" &&
                  !d.alternate &&
                  !Ce)
              )
                return (Be(t), null);
            } else
              2 * nn() - u.renderingStartTime > ul &&
                i !== 536870912 &&
                ((t.flags |= 128), (l = !0), gs(u, !1), (t.lanes = 4194304));
          u.isBackwards
            ? ((d.sibling = t.child), (t.child = d))
            : ((e = u.last),
              e !== null ? (e.sibling = d) : (t.child = d),
              (u.last = d));
        }
        return u.tail !== null
          ? ((t = u.tail),
            (u.rendering = t),
            (u.tail = t.sibling),
            (u.renderingStartTime = nn()),
            (t.sibling = null),
            (e = We.current),
            X(We, l ? (e & 1) | 2 : e & 1),
            t)
          : (Be(t), null);
      case 22:
      case 23:
        return (
          Cn(t),
          du(),
          (l = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (t.flags |= 8192)
            : l && (t.flags |= 8192),
          l
            ? (i & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Be(t),
          (i = t.updateQueue),
          i !== null && rl(t, i.retryQueue),
          (i = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (i = e.memoizedState.cachePool.pool),
          (l = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          l !== i && (t.flags |= 2048),
          e !== null && F(Ea),
          null
        );
      case 24:
        return (
          (i = null),
          e !== null && (i = e.memoizedState.cache),
          t.memoizedState.cache !== i && (t.flags |= 2048),
          wn(Je),
          Be(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function T1(e, t) {
    switch ((Jo(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          wn(Je),
          ze(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (we(t), null);
      case 13:
        if (
          (Cn(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          es();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (F(We), null);
      case 4:
        return (ze(), null);
      case 10:
        return (wn(t.type), null);
      case 22:
      case 23:
        return (
          Cn(t),
          du(),
          e !== null && F(Ea),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (wn(Je), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Wm(e, t) {
    switch ((Jo(t), t.tag)) {
      case 3:
        (wn(Je), ze());
        break;
      case 26:
      case 27:
      case 5:
        we(t);
        break;
      case 4:
        ze();
        break;
      case 13:
        Cn(t);
        break;
      case 19:
        F(We);
        break;
      case 10:
        wn(t.type);
        break;
      case 22:
      case 23:
        (Cn(t), du(), e !== null && F(Ea));
        break;
      case 24:
        wn(Je);
    }
  }
  function ys(e, t) {
    try {
      var i = t.updateQueue,
        l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            l = void 0;
            var d = i.create,
              y = i.inst;
            ((l = d()), (y.destroy = l));
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (b) {
      Ve(t, t.return, b);
    }
  }
  function $n(e, t, i) {
    try {
      var l = t.updateQueue,
        u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var d = u.next;
        l = d;
        do {
          if ((l.tag & e) === e) {
            var y = l.inst,
              b = y.destroy;
            if (b !== void 0) {
              ((y.destroy = void 0), (u = t));
              var w = i,
                z = b;
              try {
                z();
              } catch (K) {
                Ve(u, w, K);
              }
            }
          }
          l = l.next;
        } while (l !== d);
      }
    } catch (K) {
      Ve(t, t.return, K);
    }
  }
  function ep(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Hh(t, i);
      } catch (l) {
        Ve(e, e.return, l);
      }
    }
  }
  function tp(e, t, i) {
    ((i.props = Aa(e.type, e.memoizedProps)), (i.state = e.memoizedState));
    try {
      i.componentWillUnmount();
    } catch (l) {
      Ve(e, t, l);
    }
  }
  function vs(e, t) {
    try {
      var i = e.ref;
      if (i !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof i == "function" ? (e.refCleanup = i(l)) : (i.current = l);
      }
    } catch (u) {
      Ve(e, t, u);
    }
  }
  function rn(e, t) {
    var i = e.ref,
      l = e.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          Ve(e, t, u);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Ve(e, t, u);
        }
      else i.current = null;
  }
  function np(e) {
    var t = e.type,
      i = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && l.focus();
          break e;
        case "img":
          i.src ? (l.src = i.src) : i.srcSet && (l.srcset = i.srcSet);
      }
    } catch (u) {
      Ve(e, e.return, u);
    }
  }
  function Pu(e, t, i) {
    try {
      var l = e.stateNode;
      (Y1(l, e.type, i, t), (l[xt] = t));
    } catch (u) {
      Ve(e, e.return, u);
    }
  }
  function ap(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && ta(e.type)) ||
      e.tag === 4
    );
  }
  function Hu(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ap(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && ta(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Gu(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      ((e = e.stateNode),
        t
          ? (i.nodeType === 9
              ? i.body
              : i.nodeName === "HTML"
                ? i.ownerDocument.body
                : i
            ).insertBefore(e, t)
          : ((t =
              i.nodeType === 9
                ? i.body
                : i.nodeName === "HTML"
                  ? i.ownerDocument.body
                  : i),
            t.appendChild(e),
            (i = i._reactRootContainer),
            i != null || t.onclick !== null || (t.onclick = vl)));
    else if (
      l !== 4 &&
      (l === 27 && ta(e.type) && ((i = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Gu(e, t, i), e = e.sibling; e !== null; )
        (Gu(e, t, i), (e = e.sibling));
  }
  function ll(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      ((e = e.stateNode), t ? i.insertBefore(e, t) : i.appendChild(e));
    else if (
      l !== 4 &&
      (l === 27 && ta(e.type) && (i = e.stateNode), (e = e.child), e !== null)
    )
      for (ll(e, t, i), e = e.sibling; e !== null; )
        (ll(e, t, i), (e = e.sibling));
  }
  function ip(e) {
    var t = e.stateNode,
      i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      (ut(t, l, i), (t[ft] = e), (t[xt] = i));
    } catch (d) {
      Ve(e, e.return, d);
    }
  }
  var Dn = !1,
    Fe = !1,
    Yu = !1,
    sp = typeof WeakSet == "function" ? WeakSet : Set,
    nt = null;
  function E1(e, t) {
    if (((e = e.containerInfo), (hc = Al), (e = gh(e)), Ho(e))) {
      if ("selectionStart" in e)
        var i = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          i = ((i = e.ownerDocument) && i.defaultView) || window;
          var l = i.getSelection && i.getSelection();
          if (l && l.rangeCount !== 0) {
            i = l.anchorNode;
            var u = l.anchorOffset,
              d = l.focusNode;
            l = l.focusOffset;
            try {
              (i.nodeType, d.nodeType);
            } catch {
              i = null;
              break e;
            }
            var y = 0,
              b = -1,
              w = -1,
              z = 0,
              K = 0,
              Z = e,
              B = null;
            t: for (;;) {
              for (
                var P;
                Z !== i || (u !== 0 && Z.nodeType !== 3) || (b = y + u),
                  Z !== d || (l !== 0 && Z.nodeType !== 3) || (w = y + l),
                  Z.nodeType === 3 && (y += Z.nodeValue.length),
                  (P = Z.firstChild) !== null;
              )
                ((B = Z), (Z = P));
              for (;;) {
                if (Z === e) break t;
                if (
                  (B === i && ++z === u && (b = y),
                  B === d && ++K === l && (w = y),
                  (P = Z.nextSibling) !== null)
                )
                  break;
                ((Z = B), (B = Z.parentNode));
              }
              Z = P;
            }
            i = b === -1 || w === -1 ? null : { start: b, end: w };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (
      mc = { focusedElem: e, selectionRange: i }, Al = !1, nt = t;
      nt !== null;
    )
      if (
        ((t = nt), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        ((e.return = t), (nt = e));
      else
        for (; nt !== null; ) {
          switch (((t = nt), (d = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                ((e = void 0),
                  (i = t),
                  (u = d.memoizedProps),
                  (d = d.memoizedState),
                  (l = i.stateNode));
                try {
                  var de = Aa(i.type, u, i.elementType === i.type);
                  ((e = l.getSnapshotBeforeUpdate(de, d)),
                    (l.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ue) {
                  Ve(i, i.return, ue);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (i = e.nodeType), i === 9)
                )
                  yc(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      yc(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (nt = e));
            break;
          }
          nt = t.return;
        }
  }
  function rp(e, t, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        (Xn(e, i), l & 4 && ys(5, i));
        break;
      case 1:
        if ((Xn(e, i), l & 4))
          if (((e = i.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (y) {
              Ve(i, i.return, y);
            }
          else {
            var u = Aa(i.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(u, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (y) {
              Ve(i, i.return, y);
            }
          }
        (l & 64 && ep(i), l & 512 && vs(i, i.return));
        break;
      case 3:
        if ((Xn(e, i), l & 64 && ((e = i.updateQueue), e !== null))) {
          if (((t = null), i.child !== null))
            switch (i.child.tag) {
              case 27:
              case 5:
                t = i.child.stateNode;
                break;
              case 1:
                t = i.child.stateNode;
            }
          try {
            Hh(e, t);
          } catch (y) {
            Ve(i, i.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && ip(i);
      case 26:
      case 5:
        (Xn(e, i), t === null && l & 4 && np(i), l & 512 && vs(i, i.return));
        break;
      case 12:
        Xn(e, i);
        break;
      case 13:
        (Xn(e, i),
          l & 4 && up(e, i),
          l & 64 &&
            ((e = i.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((i = j1.bind(null, i)), Q1(e, i)))));
        break;
      case 22:
        if (((l = i.memoizedState !== null || Dn), !l)) {
          ((t = (t !== null && t.memoizedState !== null) || Fe), (u = Dn));
          var d = Fe;
          ((Dn = l),
            (Fe = t) && !d ? Zn(e, i, (i.subtreeFlags & 8772) !== 0) : Xn(e, i),
            (Dn = u),
            (Fe = d));
        }
        break;
      case 30:
        break;
      default:
        Xn(e, i);
    }
  }
  function lp(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), lp(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && To(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Ue = null,
    Tt = !1;
  function Mn(e, t, i) {
    for (i = i.child; i !== null; ) (op(e, t, i), (i = i.sibling));
  }
  function op(e, t, i) {
    if (Ot && typeof Ot.onCommitFiberUnmount == "function")
      try {
        Ot.onCommitFiberUnmount(ki, i);
      } catch {}
    switch (i.tag) {
      case 26:
        (Fe || rn(i, t),
          Mn(e, t, i),
          i.memoizedState
            ? i.memoizedState.count--
            : i.stateNode && ((i = i.stateNode), i.parentNode.removeChild(i)));
        break;
      case 27:
        Fe || rn(i, t);
        var l = Ue,
          u = Tt;
        (ta(i.type) && ((Ue = i.stateNode), (Tt = !1)),
          Mn(e, t, i),
          Os(i.stateNode),
          (Ue = l),
          (Tt = u));
        break;
      case 5:
        Fe || rn(i, t);
      case 6:
        if (
          ((l = Ue),
          (u = Tt),
          (Ue = null),
          Mn(e, t, i),
          (Ue = l),
          (Tt = u),
          Ue !== null)
        )
          if (Tt)
            try {
              (Ue.nodeType === 9
                ? Ue.body
                : Ue.nodeName === "HTML"
                  ? Ue.ownerDocument.body
                  : Ue
              ).removeChild(i.stateNode);
            } catch (d) {
              Ve(i, t, d);
            }
          else
            try {
              Ue.removeChild(i.stateNode);
            } catch (d) {
              Ve(i, t, d);
            }
        break;
      case 18:
        Ue !== null &&
          (Tt
            ? ((e = Ue),
              Qp(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                i.stateNode,
              ),
              _s(e))
            : Qp(Ue, i.stateNode));
        break;
      case 4:
        ((l = Ue),
          (u = Tt),
          (Ue = i.stateNode.containerInfo),
          (Tt = !0),
          Mn(e, t, i),
          (Ue = l),
          (Tt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Fe || $n(2, i, t), Fe || $n(4, i, t), Mn(e, t, i));
        break;
      case 1:
        (Fe ||
          (rn(i, t),
          (l = i.stateNode),
          typeof l.componentWillUnmount == "function" && tp(i, t, l)),
          Mn(e, t, i));
        break;
      case 21:
        Mn(e, t, i);
        break;
      case 22:
        ((Fe = (l = Fe) || i.memoizedState !== null), Mn(e, t, i), (Fe = l));
        break;
      default:
        Mn(e, t, i);
    }
  }
  function up(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        _s(e);
      } catch (i) {
        Ve(t, t.return, i);
      }
  }
  function w1(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new sp()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new sp()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function qu(e, t) {
    var i = w1(e);
    t.forEach(function (l) {
      var u = L1.bind(null, e, l);
      i.has(l) || (i.add(l), l.then(u, u));
    });
  }
  function Nt(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var u = i[l],
          d = e,
          y = t,
          b = y;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (ta(b.type)) {
                ((Ue = b.stateNode), (Tt = !1));
                break e;
              }
              break;
            case 5:
              ((Ue = b.stateNode), (Tt = !1));
              break e;
            case 3:
            case 4:
              ((Ue = b.stateNode.containerInfo), (Tt = !0));
              break e;
          }
          b = b.return;
        }
        if (Ue === null) throw Error(r(160));
        (op(d, y, u),
          (Ue = null),
          (Tt = !1),
          (d = u.alternate),
          d !== null && (d.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) (cp(t, e), (t = t.sibling));
  }
  var Qt = null;
  function cp(e, t) {
    var i = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Nt(t, e),
          jt(e),
          l & 4 && ($n(3, e, e.return), ys(3, e), $n(5, e, e.return)));
        break;
      case 1:
        (Nt(t, e),
          jt(e),
          l & 512 && (Fe || i === null || rn(i, i.return)),
          l & 64 &&
            Dn &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((i = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = i === null ? l : i.concat(l))))));
        break;
      case 26:
        var u = Qt;
        if (
          (Nt(t, e),
          jt(e),
          l & 512 && (Fe || i === null || rn(i, i.return)),
          l & 4)
        ) {
          var d = i !== null ? i.memoizedState : null;
          if (((l = e.memoizedState), i === null))
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  ((l = e.type),
                    (i = e.memoizedProps),
                    (u = u.ownerDocument || u));
                  t: switch (l) {
                    case "title":
                      ((d = u.getElementsByTagName("title")[0]),
                        (!d ||
                          d[Gi] ||
                          d[ft] ||
                          d.namespaceURI === "http://www.w3.org/2000/svg" ||
                          d.hasAttribute("itemprop")) &&
                          ((d = u.createElement(l)),
                          u.head.insertBefore(
                            d,
                            u.querySelector("head > title"),
                          )),
                        ut(d, l, i),
                        (d[ft] = e),
                        et(d),
                        (l = d));
                      break e;
                    case "link":
                      var y = ig("link", "href", u).get(l + (i.href || ""));
                      if (y) {
                        for (var b = 0; b < y.length; b++)
                          if (
                            ((d = y[b]),
                            d.getAttribute("href") ===
                              (i.href == null || i.href === ""
                                ? null
                                : i.href) &&
                              d.getAttribute("rel") ===
                                (i.rel == null ? null : i.rel) &&
                              d.getAttribute("title") ===
                                (i.title == null ? null : i.title) &&
                              d.getAttribute("crossorigin") ===
                                (i.crossOrigin == null ? null : i.crossOrigin))
                          ) {
                            y.splice(b, 1);
                            break t;
                          }
                      }
                      ((d = u.createElement(l)),
                        ut(d, l, i),
                        u.head.appendChild(d));
                      break;
                    case "meta":
                      if (
                        (y = ig("meta", "content", u).get(
                          l + (i.content || ""),
                        ))
                      ) {
                        for (b = 0; b < y.length; b++)
                          if (
                            ((d = y[b]),
                            d.getAttribute("content") ===
                              (i.content == null ? null : "" + i.content) &&
                              d.getAttribute("name") ===
                                (i.name == null ? null : i.name) &&
                              d.getAttribute("property") ===
                                (i.property == null ? null : i.property) &&
                              d.getAttribute("http-equiv") ===
                                (i.httpEquiv == null ? null : i.httpEquiv) &&
                              d.getAttribute("charset") ===
                                (i.charSet == null ? null : i.charSet))
                          ) {
                            y.splice(b, 1);
                            break t;
                          }
                      }
                      ((d = u.createElement(l)),
                        ut(d, l, i),
                        u.head.appendChild(d));
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  ((d[ft] = e), et(d), (l = d));
                }
                e.stateNode = l;
              } else sg(u, e.type, e.stateNode);
            else e.stateNode = ag(u, l, e.memoizedProps);
          else
            d !== l
              ? (d === null
                  ? i.stateNode !== null &&
                    ((i = i.stateNode), i.parentNode.removeChild(i))
                  : d.count--,
                l === null
                  ? sg(u, e.type, e.stateNode)
                  : ag(u, l, e.memoizedProps))
              : l === null &&
                e.stateNode !== null &&
                Pu(e, e.memoizedProps, i.memoizedProps);
        }
        break;
      case 27:
        (Nt(t, e),
          jt(e),
          l & 512 && (Fe || i === null || rn(i, i.return)),
          i !== null && l & 4 && Pu(e, e.memoizedProps, i.memoizedProps));
        break;
      case 5:
        if (
          (Nt(t, e),
          jt(e),
          l & 512 && (Fe || i === null || rn(i, i.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            Ka(u, "");
          } catch (P) {
            Ve(e, e.return, P);
          }
        }
        (l & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), Pu(e, u, i !== null ? i.memoizedProps : u)),
          l & 1024 && (Yu = !0));
        break;
      case 6:
        if ((Nt(t, e), jt(e), l & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          ((l = e.memoizedProps), (i = e.stateNode));
          try {
            i.nodeValue = l;
          } catch (P) {
            Ve(e, e.return, P);
          }
        }
        break;
      case 3:
        if (
          ((Tl = null),
          (u = Qt),
          (Qt = bl(t.containerInfo)),
          Nt(t, e),
          (Qt = u),
          jt(e),
          l & 4 && i !== null && i.memoizedState.isDehydrated)
        )
          try {
            _s(t.containerInfo);
          } catch (P) {
            Ve(e, e.return, P);
          }
        Yu && ((Yu = !1), fp(e));
        break;
      case 4:
        ((l = Qt),
          (Qt = bl(e.stateNode.containerInfo)),
          Nt(t, e),
          jt(e),
          (Qt = l));
        break;
      case 12:
        (Nt(t, e), jt(e));
        break;
      case 13:
        (Nt(t, e),
          jt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (i !== null && i.memoizedState !== null) &&
            (Qu = nn()),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), qu(e, l))));
        break;
      case 22:
        u = e.memoizedState !== null;
        var w = i !== null && i.memoizedState !== null,
          z = Dn,
          K = Fe;
        if (
          ((Dn = z || u),
          (Fe = K || w),
          Nt(t, e),
          (Fe = K),
          (Dn = z),
          jt(e),
          l & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (i === null || w || Dn || Fe || Ca(e)),
              i = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                w = i = t;
                try {
                  if (((d = w.stateNode), u))
                    ((y = d.style),
                      typeof y.setProperty == "function"
                        ? y.setProperty("display", "none", "important")
                        : (y.display = "none"));
                  else {
                    b = w.stateNode;
                    var Z = w.memoizedProps.style,
                      B =
                        Z != null && Z.hasOwnProperty("display")
                          ? Z.display
                          : null;
                    b.style.display =
                      B == null || typeof B == "boolean" ? "" : ("" + B).trim();
                  }
                } catch (P) {
                  Ve(w, w.return, P);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                w = t;
                try {
                  w.stateNode.nodeValue = u ? "" : w.memoizedProps;
                } catch (P) {
                  Ve(w, w.return, P);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (i === t && (i = null), (t = t.return));
            }
            (i === t && (i = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        l & 4 &&
          ((l = e.updateQueue),
          l !== null &&
            ((i = l.retryQueue),
            i !== null && ((l.retryQueue = null), qu(e, i))));
        break;
      case 19:
        (Nt(t, e),
          jt(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), qu(e, l))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Nt(t, e), jt(e));
    }
  }
  function jt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, l = e.return; l !== null; ) {
          if (ap(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(r(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode,
              d = Hu(e);
            ll(e, d, u);
            break;
          case 5:
            var y = i.stateNode;
            i.flags & 32 && (Ka(y, ""), (i.flags &= -33));
            var b = Hu(e);
            ll(e, b, y);
            break;
          case 3:
          case 4:
            var w = i.stateNode.containerInfo,
              z = Hu(e);
            Gu(e, z, w);
            break;
          default:
            throw Error(r(161));
        }
      } catch (K) {
        Ve(e, e.return, K);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function fp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (fp(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function Xn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (rp(e, t.alternate, t), (t = t.sibling));
  }
  function Ca(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ($n(4, t, t.return), Ca(t));
          break;
        case 1:
          rn(t, t.return);
          var i = t.stateNode;
          (typeof i.componentWillUnmount == "function" && tp(t, t.return, i),
            Ca(t));
          break;
        case 27:
          Os(t.stateNode);
        case 26:
        case 5:
          (rn(t, t.return), Ca(t));
          break;
        case 22:
          t.memoizedState === null && Ca(t);
          break;
        case 30:
          Ca(t);
          break;
        default:
          Ca(t);
      }
      e = e.sibling;
    }
  }
  function Zn(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate,
        u = e,
        d = t,
        y = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (Zn(u, d, i), ys(4, d));
          break;
        case 1:
          if (
            (Zn(u, d, i),
            (l = d),
            (u = l.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (z) {
              Ve(l, l.return, z);
            }
          if (((l = d), (u = l.updateQueue), u !== null)) {
            var b = l.stateNode;
            try {
              var w = u.shared.hiddenCallbacks;
              if (w !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < w.length; u++)
                  Ph(w[u], b);
            } catch (z) {
              Ve(l, l.return, z);
            }
          }
          (i && y & 64 && ep(d), vs(d, d.return));
          break;
        case 27:
          ip(d);
        case 26:
        case 5:
          (Zn(u, d, i), i && l === null && y & 4 && np(d), vs(d, d.return));
          break;
        case 12:
          Zn(u, d, i);
          break;
        case 13:
          (Zn(u, d, i), i && y & 4 && up(u, d));
          break;
        case 22:
          (d.memoizedState === null && Zn(u, d, i), vs(d, d.return));
          break;
        case 30:
          break;
        default:
          Zn(u, d, i);
      }
      t = t.sibling;
    }
  }
  function Ku(e, t) {
    var i = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (i = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== i && (e != null && e.refCount++, i != null && as(i)));
  }
  function Fu(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && as(e)));
  }
  function ln(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (dp(e, t, i, l), (t = t.sibling));
  }
  function dp(e, t, i, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ln(e, t, i, l), u & 2048 && ys(9, t));
        break;
      case 1:
        ln(e, t, i, l);
        break;
      case 3:
        (ln(e, t, i, l),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && as(e))));
        break;
      case 12:
        if (u & 2048) {
          (ln(e, t, i, l), (e = t.stateNode));
          try {
            var d = t.memoizedProps,
              y = d.id,
              b = d.onPostCommit;
            typeof b == "function" &&
              b(
                y,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (w) {
            Ve(t, t.return, w);
          }
        } else ln(e, t, i, l);
        break;
      case 13:
        ln(e, t, i, l);
        break;
      case 23:
        break;
      case 22:
        ((d = t.stateNode),
          (y = t.alternate),
          t.memoizedState !== null
            ? d._visibility & 2
              ? ln(e, t, i, l)
              : xs(e, t)
            : d._visibility & 2
              ? ln(e, t, i, l)
              : ((d._visibility |= 2),
                ci(e, t, i, l, (t.subtreeFlags & 10256) !== 0)),
          u & 2048 && Ku(y, t));
        break;
      case 24:
        (ln(e, t, i, l), u & 2048 && Fu(t.alternate, t));
        break;
      default:
        ln(e, t, i, l);
    }
  }
  function ci(e, t, i, l, u) {
    for (u = u && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var d = e,
        y = t,
        b = i,
        w = l,
        z = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          (ci(d, y, b, w, u), ys(8, y));
          break;
        case 23:
          break;
        case 22:
          var K = y.stateNode;
          (y.memoizedState !== null
            ? K._visibility & 2
              ? ci(d, y, b, w, u)
              : xs(d, y)
            : ((K._visibility |= 2), ci(d, y, b, w, u)),
            u && z & 2048 && Ku(y.alternate, y));
          break;
        case 24:
          (ci(d, y, b, w, u), u && z & 2048 && Fu(y.alternate, y));
          break;
        default:
          ci(d, y, b, w, u);
      }
      t = t.sibling;
    }
  }
  function xs(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e,
          l = t,
          u = l.flags;
        switch (l.tag) {
          case 22:
            (xs(i, l), u & 2048 && Ku(l.alternate, l));
            break;
          case 24:
            (xs(i, l), u & 2048 && Fu(l.alternate, l));
            break;
          default:
            xs(i, l);
        }
        t = t.sibling;
      }
  }
  var bs = 8192;
  function fi(e) {
    if (e.subtreeFlags & bs)
      for (e = e.child; e !== null; ) (hp(e), (e = e.sibling));
  }
  function hp(e) {
    switch (e.tag) {
      case 26:
        (fi(e),
          e.flags & bs &&
            e.memoizedState !== null &&
            uS(Qt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        fi(e);
        break;
      case 3:
      case 4:
        var t = Qt;
        ((Qt = bl(e.stateNode.containerInfo)), fi(e), (Qt = t));
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = bs), (bs = 16777216), fi(e), (bs = t))
            : fi(e));
        break;
      default:
        fi(e);
    }
  }
  function mp(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Ss(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          ((nt = l), gp(l, e));
        }
      mp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (pp(e), (e = e.sibling));
  }
  function pp(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ss(e), e.flags & 2048 && $n(9, e, e.return));
        break;
      case 3:
        Ss(e);
        break;
      case 12:
        Ss(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), ol(e))
          : Ss(e);
        break;
      default:
        Ss(e);
    }
  }
  function ol(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          ((nt = l), gp(l, e));
        }
      mp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          ($n(8, t, t.return), ol(t));
          break;
        case 22:
          ((i = t.stateNode),
            i._visibility & 2 && ((i._visibility &= -3), ol(t)));
          break;
        default:
          ol(t);
      }
      e = e.sibling;
    }
  }
  function gp(e, t) {
    for (; nt !== null; ) {
      var i = nt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          $n(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          as(i.memoizedState.cache);
      }
      if (((l = i.child), l !== null)) ((l.return = i), (nt = l));
      else
        e: for (i = e; nt !== null; ) {
          l = nt;
          var u = l.sibling,
            d = l.return;
          if ((lp(l), l === i)) {
            nt = null;
            break e;
          }
          if (u !== null) {
            ((u.return = d), (nt = u));
            break e;
          }
          nt = d;
        }
    }
  }
  var A1 = {
      getCacheForType: function (e) {
        var t = dt(Je),
          i = t.data.get(e);
        return (i === void 0 && ((i = e()), t.data.set(e, i)), i);
      },
    },
    C1 = typeof WeakMap == "function" ? WeakMap : Map,
    Oe = 0,
    _e = null,
    be = null,
    Te = 0,
    Re = 0,
    Lt = null,
    Qn = !1,
    di = !1,
    $u = !1,
    Nn = 0,
    Ye = 0,
    In = 0,
    Oa = 0,
    Xu = 0,
    Kt = 0,
    hi = 0,
    Ts = null,
    Et = null,
    Zu = !1,
    Qu = 0,
    ul = 1 / 0,
    cl = null,
    Jn = null,
    ot = 0,
    Wn = null,
    mi = null,
    pi = 0,
    Iu = 0,
    Ju = null,
    yp = null,
    Es = 0,
    Wu = null;
  function Vt() {
    if ((Oe & 2) !== 0 && Te !== 0) return Te & -Te;
    if (U.T !== null) {
      var e = ni;
      return e !== 0 ? e : rc();
    }
    return Ld();
  }
  function vp() {
    Kt === 0 && (Kt = (Te & 536870912) === 0 || Ce ? Dd() : 536870912);
    var e = qt.current;
    return (e !== null && (e.flags |= 32), Kt);
  }
  function _t(e, t, i) {
    (((e === _e && (Re === 2 || Re === 9)) || e.cancelPendingCommit !== null) &&
      (gi(e, 0), ea(e, Te, Kt, !1)),
      Hi(e, i),
      ((Oe & 2) === 0 || e !== _e) &&
        (e === _e &&
          ((Oe & 2) === 0 && (Oa |= i), Ye === 4 && ea(e, Te, Kt, !1)),
        on(e)));
  }
  function xp(e, t, i) {
    if ((Oe & 6) !== 0) throw Error(r(327));
    var l = (!i && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Pi(e, t),
      u = l ? D1(e, t) : nc(e, t, !0),
      d = l;
    do {
      if (u === 0) {
        di && !l && ea(e, t, 0, !1);
        break;
      } else {
        if (((i = e.current.alternate), d && !O1(i))) {
          ((u = nc(e, t, !1)), (d = !1));
          continue;
        }
        if (u === 2) {
          if (((d = t), e.errorRecoveryDisabledLanes & d)) var y = 0;
          else
            ((y = e.pendingLanes & -536870913),
              (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
          if (y !== 0) {
            t = y;
            e: {
              var b = e;
              u = Ts;
              var w = b.current.memoizedState.isDehydrated;
              if ((w && (gi(b, y).flags |= 256), (y = nc(b, y, !1)), y !== 2)) {
                if ($u && !w) {
                  ((b.errorRecoveryDisabledLanes |= d), (Oa |= d), (u = 4));
                  break e;
                }
                ((d = Et),
                  (Et = u),
                  d !== null &&
                    (Et === null ? (Et = d) : Et.push.apply(Et, d)));
              }
              u = y;
            }
            if (((d = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (gi(e, 0), ea(e, t, 0, !0));
          break;
        }
        e: {
          switch (((l = e), (d = u), d)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ea(l, t, Kt, !Qn);
              break e;
            case 2:
              Et = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((u = Qu + 300 - nn()), 10 < u)) {
            if ((ea(l, t, Kt, !Qn), Sr(l, 0, !0) !== 0)) break e;
            l.timeoutHandle = Xp(
              bp.bind(null, l, i, Et, cl, Zu, t, Kt, Oa, hi, Qn, d, 2, -0, 0),
              u,
            );
            break e;
          }
          bp(l, i, Et, cl, Zu, t, Kt, Oa, hi, Qn, d, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    on(e);
  }
  function bp(e, t, i, l, u, d, y, b, w, z, K, Z, B, P) {
    if (
      ((e.timeoutHandle = -1),
      (Z = t.subtreeFlags),
      (Z & 8192 || (Z & 16785408) === 16785408) &&
        ((Ms = { stylesheets: null, count: 0, unsuspend: oS }),
        hp(t),
        (Z = cS()),
        Z !== null))
    ) {
      ((e.cancelPendingCommit = Z(
        Op.bind(null, e, t, d, i, l, u, y, b, w, K, 1, B, P),
      )),
        ea(e, d, y, !z));
      return;
    }
    Op(e, t, d, i, l, u, y, b, w);
  }
  function O1(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if (
        (i === 0 || i === 11 || i === 15) &&
        t.flags & 16384 &&
        ((i = t.updateQueue), i !== null && ((i = i.stores), i !== null))
      )
        for (var l = 0; l < i.length; l++) {
          var u = i[l],
            d = u.getSnapshot;
          u = u.value;
          try {
            if (!Dt(d(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((i = t.child), t.subtreeFlags & 16384 && i !== null))
        ((i.return = t), (t = i));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function ea(e, t, i, l) {
    ((t &= ~Xu),
      (t &= ~Oa),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      l && (e.warmLanes |= t),
      (l = e.expirationTimes));
    for (var u = t; 0 < u; ) {
      var d = 31 - Rt(u),
        y = 1 << d;
      ((l[d] = -1), (u &= ~y));
    }
    i !== 0 && Nd(e, i, t);
  }
  function fl() {
    return (Oe & 6) === 0 ? (ws(0), !1) : !0;
  }
  function ec() {
    if (be !== null) {
      if (Re === 0) var e = be.return;
      else ((e = be), (En = Sa = null), yu(e), (oi = null), (ms = 0), (e = be));
      for (; e !== null; ) (Wm(e.alternate, e), (e = e.return));
      be = null;
    }
  }
  function gi(e, t) {
    var i = e.timeoutHandle;
    (i !== -1 && ((e.timeoutHandle = -1), K1(i)),
      (i = e.cancelPendingCommit),
      i !== null && ((e.cancelPendingCommit = null), i()),
      ec(),
      (_e = e),
      (be = i = bn(e.current, null)),
      (Te = t),
      (Re = 0),
      (Lt = null),
      (Qn = !1),
      (di = Pi(e, t)),
      ($u = !1),
      (hi = Kt = Xu = Oa = In = Ye = 0),
      (Et = Ts = null),
      (Zu = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - Rt(l),
          d = 1 << u;
        ((t |= e[u]), (l &= ~d));
      }
    return ((Nn = t), Lr(), i);
  }
  function Sp(e, t) {
    ((ye = null),
      (U.H = Jr),
      t === ss || t === Gr
        ? ((t = Bh()), (Re = 3))
        : t === _h
          ? ((t = Bh()), (Re = 4))
          : (Re =
              t === km
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Lt = t),
      be === null && ((Ye = 1), al(e, Pt(t, e.current))));
  }
  function Tp() {
    var e = U.H;
    return ((U.H = Jr), e === null ? Jr : e);
  }
  function Ep() {
    var e = U.A;
    return ((U.A = A1), e);
  }
  function tc() {
    ((Ye = 4),
      Qn || ((Te & 4194048) !== Te && qt.current !== null) || (di = !0),
      ((In & 134217727) === 0 && (Oa & 134217727) === 0) ||
        _e === null ||
        ea(_e, Te, Kt, !1));
  }
  function nc(e, t, i) {
    var l = Oe;
    Oe |= 2;
    var u = Tp(),
      d = Ep();
    ((_e !== e || Te !== t) && ((cl = null), gi(e, t)), (t = !1));
    var y = Ye;
    e: do
      try {
        if (Re !== 0 && be !== null) {
          var b = be,
            w = Lt;
          switch (Re) {
            case 8:
              (ec(), (y = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              qt.current === null && (t = !0);
              var z = Re;
              if (((Re = 0), (Lt = null), yi(e, b, w, z), i && di)) {
                y = 0;
                break e;
              }
              break;
            default:
              ((z = Re), (Re = 0), (Lt = null), yi(e, b, w, z));
          }
        }
        (R1(), (y = Ye));
        break;
      } catch (K) {
        Sp(e, K);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (En = Sa = null),
      (Oe = l),
      (U.H = u),
      (U.A = d),
      be === null && ((_e = null), (Te = 0), Lr()),
      y
    );
  }
  function R1() {
    for (; be !== null; ) wp(be);
  }
  function D1(e, t) {
    var i = Oe;
    Oe |= 2;
    var l = Tp(),
      u = Ep();
    _e !== e || Te !== t
      ? ((cl = null), (ul = nn() + 500), gi(e, t))
      : (di = Pi(e, t));
    e: do
      try {
        if (Re !== 0 && be !== null) {
          t = be;
          var d = Lt;
          t: switch (Re) {
            case 1:
              ((Re = 0), (Lt = null), yi(e, t, d, 1));
              break;
            case 2:
            case 9:
              if (zh(d)) {
                ((Re = 0), (Lt = null), Ap(t));
                break;
              }
              ((t = function () {
                ((Re !== 2 && Re !== 9) || _e !== e || (Re = 7), on(e));
              }),
                d.then(t, t));
              break e;
            case 3:
              Re = 7;
              break e;
            case 4:
              Re = 5;
              break e;
            case 7:
              zh(d)
                ? ((Re = 0), (Lt = null), Ap(t))
                : ((Re = 0), (Lt = null), yi(e, t, d, 7));
              break;
            case 5:
              var y = null;
              switch (be.tag) {
                case 26:
                  y = be.memoizedState;
                case 5:
                case 27:
                  var b = be;
                  if (!y || rg(y)) {
                    ((Re = 0), (Lt = null));
                    var w = b.sibling;
                    if (w !== null) be = w;
                    else {
                      var z = b.return;
                      z !== null ? ((be = z), dl(z)) : (be = null);
                    }
                    break t;
                  }
              }
              ((Re = 0), (Lt = null), yi(e, t, d, 5));
              break;
            case 6:
              ((Re = 0), (Lt = null), yi(e, t, d, 6));
              break;
            case 8:
              (ec(), (Ye = 6));
              break e;
            default:
              throw Error(r(462));
          }
        }
        M1();
        break;
      } catch (K) {
        Sp(e, K);
      }
    while (!0);
    return (
      (En = Sa = null),
      (U.H = l),
      (U.A = u),
      (Oe = i),
      be !== null ? 0 : ((_e = null), (Te = 0), Lr(), Ye)
    );
  }
  function M1() {
    for (; be !== null && !Ua(); ) wp(be);
  }
  function wp(e) {
    var t = Im(e.alternate, e, Nn);
    ((e.memoizedProps = e.pendingProps), t === null ? dl(e) : (be = t));
  }
  function Ap(e) {
    var t = e,
      i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Km(i, t, t.pendingProps, t.type, void 0, Te);
        break;
      case 11:
        t = Km(i, t, t.pendingProps, t.type.render, t.ref, Te);
        break;
      case 5:
        yu(t);
      default:
        (Wm(i, t), (t = be = Ch(t, Nn)), (t = Im(i, t, Nn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? dl(e) : (be = t));
  }
  function yi(e, t, i, l) {
    ((En = Sa = null), yu(t), (oi = null), (ms = 0));
    var u = t.return;
    try {
      if (x1(e, u, t, i, Te)) {
        ((Ye = 1), al(e, Pt(i, e.current)), (be = null));
        return;
      }
    } catch (d) {
      if (u !== null) throw ((be = u), d);
      ((Ye = 1), al(e, Pt(i, e.current)), (be = null));
      return;
    }
    t.flags & 32768
      ? (Ce || l === 1
          ? (e = !0)
          : di || (Te & 536870912) !== 0
            ? (e = !1)
            : ((Qn = e = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = qt.current),
                l !== null && l.tag === 13 && (l.flags |= 16384))),
        Cp(t, e))
      : dl(t);
  }
  function dl(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Cp(t, Qn);
        return;
      }
      e = t.return;
      var i = S1(t.alternate, t, Nn);
      if (i !== null) {
        be = i;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        be = t;
        return;
      }
      be = t = e;
    } while (t !== null);
    Ye === 0 && (Ye = 5);
  }
  function Cp(e, t) {
    do {
      var i = T1(e.alternate, e);
      if (i !== null) {
        ((i.flags &= 32767), (be = i));
        return;
      }
      if (
        ((i = e.return),
        i !== null &&
          ((i.flags |= 32768), (i.subtreeFlags = 0), (i.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        be = e;
        return;
      }
      be = e = i;
    } while (e !== null);
    ((Ye = 6), (be = null));
  }
  function Op(e, t, i, l, u, d, y, b, w) {
    e.cancelPendingCommit = null;
    do hl();
    while (ot !== 0);
    if ((Oe & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((d = t.lanes | t.childLanes),
        (d |= Fo),
        ob(e, i, d, y, b, w),
        e === _e && ((be = _e = null), (Te = 0)),
        (mi = t),
        (Wn = e),
        (pi = i),
        (Iu = d),
        (Ju = u),
        (yp = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            V1(vr, function () {
              return (jp(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = U.T), (U.T = null), (u = Y.p), (Y.p = 2), (y = Oe), (Oe |= 4));
        try {
          E1(e, t, i);
        } finally {
          ((Oe = y), (Y.p = u), (U.T = l));
        }
      }
      ((ot = 1), Rp(), Dp(), Mp());
    }
  }
  function Rp() {
    if (ot === 1) {
      ot = 0;
      var e = Wn,
        t = mi,
        i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        ((i = U.T), (U.T = null));
        var l = Y.p;
        Y.p = 2;
        var u = Oe;
        Oe |= 4;
        try {
          cp(t, e);
          var d = mc,
            y = gh(e.containerInfo),
            b = d.focusedElem,
            w = d.selectionRange;
          if (
            y !== b &&
            b &&
            b.ownerDocument &&
            ph(b.ownerDocument.documentElement, b)
          ) {
            if (w !== null && Ho(b)) {
              var z = w.start,
                K = w.end;
              if ((K === void 0 && (K = z), "selectionStart" in b))
                ((b.selectionStart = z),
                  (b.selectionEnd = Math.min(K, b.value.length)));
              else {
                var Z = b.ownerDocument || document,
                  B = (Z && Z.defaultView) || window;
                if (B.getSelection) {
                  var P = B.getSelection(),
                    de = b.textContent.length,
                    ue = Math.min(w.start, de),
                    je = w.end === void 0 ? ue : Math.min(w.end, de);
                  !P.extend && ue > je && ((y = je), (je = ue), (ue = y));
                  var L = mh(b, ue),
                    O = mh(b, je);
                  if (
                    L &&
                    O &&
                    (P.rangeCount !== 1 ||
                      P.anchorNode !== L.node ||
                      P.anchorOffset !== L.offset ||
                      P.focusNode !== O.node ||
                      P.focusOffset !== O.offset)
                  ) {
                    var _ = Z.createRange();
                    (_.setStart(L.node, L.offset),
                      P.removeAllRanges(),
                      ue > je
                        ? (P.addRange(_), P.extend(O.node, O.offset))
                        : (_.setEnd(O.node, O.offset), P.addRange(_)));
                  }
                }
              }
            }
            for (Z = [], P = b; (P = P.parentNode); )
              P.nodeType === 1 &&
                Z.push({ element: P, left: P.scrollLeft, top: P.scrollTop });
            for (
              typeof b.focus == "function" && b.focus(), b = 0;
              b < Z.length;
              b++
            ) {
              var $ = Z[b];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Al = !!hc), (mc = hc = null));
        } finally {
          ((Oe = u), (Y.p = l), (U.T = i));
        }
      }
      ((e.current = t), (ot = 2));
    }
  }
  function Dp() {
    if (ot === 2) {
      ot = 0;
      var e = Wn,
        t = mi,
        i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        ((i = U.T), (U.T = null));
        var l = Y.p;
        Y.p = 2;
        var u = Oe;
        Oe |= 4;
        try {
          rp(e, t.alternate, t);
        } finally {
          ((Oe = u), (Y.p = l), (U.T = i));
        }
      }
      ot = 3;
    }
  }
  function Mp() {
    if (ot === 4 || ot === 3) {
      ((ot = 0), Wx());
      var e = Wn,
        t = mi,
        i = pi,
        l = yp;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (ot = 5)
        : ((ot = 0), (mi = Wn = null), Np(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (Jn = null),
        bo(i),
        (t = t.stateNode),
        Ot && typeof Ot.onCommitFiberRoot == "function")
      )
        try {
          Ot.onCommitFiberRoot(ki, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((t = U.T), (u = Y.p), (Y.p = 2), (U.T = null));
        try {
          for (var d = e.onRecoverableError, y = 0; y < l.length; y++) {
            var b = l[y];
            d(b.value, { componentStack: b.stack });
          }
        } finally {
          ((U.T = t), (Y.p = u));
        }
      }
      ((pi & 3) !== 0 && hl(),
        on(e),
        (u = e.pendingLanes),
        (i & 4194090) !== 0 && (u & 42) !== 0
          ? e === Wu
            ? Es++
            : ((Es = 0), (Wu = e))
          : (Es = 0),
        ws(0));
    }
  }
  function Np(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), as(t)));
  }
  function hl(e) {
    return (Rp(), Dp(), Mp(), jp());
  }
  function jp() {
    if (ot !== 5) return !1;
    var e = Wn,
      t = Iu;
    Iu = 0;
    var i = bo(pi),
      l = U.T,
      u = Y.p;
    try {
      ((Y.p = 32 > i ? 32 : i), (U.T = null), (i = Ju), (Ju = null));
      var d = Wn,
        y = pi;
      if (((ot = 0), (mi = Wn = null), (pi = 0), (Oe & 6) !== 0))
        throw Error(r(331));
      var b = Oe;
      if (
        ((Oe |= 4),
        pp(d.current),
        dp(d, d.current, y, i),
        (Oe = b),
        ws(0, !1),
        Ot && typeof Ot.onPostCommitFiberRoot == "function")
      )
        try {
          Ot.onPostCommitFiberRoot(ki, d);
        } catch {}
      return !0;
    } finally {
      ((Y.p = u), (U.T = l), Np(e, t));
    }
  }
  function Lp(e, t, i) {
    ((t = Pt(i, t)),
      (t = Nu(e.stateNode, t, 2)),
      (e = Yn(e, t, 2)),
      e !== null && (Hi(e, 2), on(e)));
  }
  function Ve(e, t, i) {
    if (e.tag === 3) Lp(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Lp(t, e, i);
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (Jn === null || !Jn.has(l)))
          ) {
            ((e = Pt(i, e)),
              (i = Um(2)),
              (l = Yn(t, i, 2)),
              l !== null && (Bm(i, l, t, e), Hi(l, 2), on(l)));
            break;
          }
        }
        t = t.return;
      }
  }
  function ac(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new C1();
      var u = new Set();
      l.set(t, u);
    } else ((u = l.get(t)), u === void 0 && ((u = new Set()), l.set(t, u)));
    u.has(i) ||
      (($u = !0), u.add(i), (e = N1.bind(null, e, t, i)), t.then(e, e));
  }
  function N1(e, t, i) {
    var l = e.pingCache;
    (l !== null && l.delete(t),
      (e.pingedLanes |= e.suspendedLanes & i),
      (e.warmLanes &= ~i),
      _e === e &&
        (Te & i) === i &&
        (Ye === 4 || (Ye === 3 && (Te & 62914560) === Te && 300 > nn() - Qu)
          ? (Oe & 2) === 0 && gi(e, 0)
          : (Xu |= i),
        hi === Te && (hi = 0)),
      on(e));
  }
  function Vp(e, t) {
    (t === 0 && (t = Md()), (e = Ja(e, t)), e !== null && (Hi(e, t), on(e)));
  }
  function j1(e) {
    var t = e.memoizedState,
      i = 0;
    (t !== null && (i = t.retryLane), Vp(e, i));
  }
  function L1(e, t) {
    var i = 0;
    switch (e.tag) {
      case 13:
        var l = e.stateNode,
          u = e.memoizedState;
        u !== null && (i = u.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (l !== null && l.delete(t), Vp(e, i));
  }
  function V1(e, t) {
    return rt(e, t);
  }
  var ml = null,
    vi = null,
    ic = !1,
    pl = !1,
    sc = !1,
    Ra = 0;
  function on(e) {
    (e !== vi &&
      e.next === null &&
      (vi === null ? (ml = vi = e) : (vi = vi.next = e)),
      (pl = !0),
      ic || ((ic = !0), z1()));
  }
  function ws(e, t) {
    if (!sc && pl) {
      sc = !0;
      do
        for (var i = !1, l = ml; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var y = l.suspendedLanes,
                b = l.pingedLanes;
              ((d = (1 << (31 - Rt(42 | e) + 1)) - 1),
                (d &= u & ~(y & ~b)),
                (d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
            }
            d !== 0 && ((i = !0), Bp(l, d));
          } else
            ((d = Te),
              (d = Sr(
                l,
                l === _e ? d : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
              )),
              (d & 3) === 0 || Pi(l, d) || ((i = !0), Bp(l, d)));
          l = l.next;
        }
      while (i);
      sc = !1;
    }
  }
  function _1() {
    _p();
  }
  function _p() {
    pl = ic = !1;
    var e = 0;
    Ra !== 0 && (q1() && (e = Ra), (Ra = 0));
    for (var t = nn(), i = null, l = ml; l !== null; ) {
      var u = l.next,
        d = zp(l, t);
      (d === 0
        ? ((l.next = null),
          i === null ? (ml = u) : (i.next = u),
          u === null && (vi = i))
        : ((i = l), (e !== 0 || (d & 3) !== 0) && (pl = !0)),
        (l = u));
    }
    ws(e);
  }
  function zp(e, t) {
    for (
      var i = e.suspendedLanes,
        l = e.pingedLanes,
        u = e.expirationTimes,
        d = e.pendingLanes & -62914561;
      0 < d;
    ) {
      var y = 31 - Rt(d),
        b = 1 << y,
        w = u[y];
      (w === -1
        ? ((b & i) === 0 || (b & l) !== 0) && (u[y] = lb(b, t))
        : w <= t && (e.expiredLanes |= b),
        (d &= ~b));
    }
    if (
      ((t = _e),
      (i = Te),
      (i = Sr(
        e,
        e === t ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (l = e.callbackNode),
      i === 0 ||
        (e === t && (Re === 2 || Re === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && yn(l),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((i & 3) === 0 || Pi(e, i)) {
      if (((t = i & -i), t === e.callbackPriority)) return t;
      switch ((l !== null && yn(l), bo(i))) {
        case 2:
        case 8:
          i = Od;
          break;
        case 32:
          i = vr;
          break;
        case 268435456:
          i = Rd;
          break;
        default:
          i = vr;
      }
      return (
        (l = Up.bind(null, e)),
        (i = rt(i, l)),
        (e.callbackPriority = t),
        (e.callbackNode = i),
        t
      );
    }
    return (
      l !== null && l !== null && yn(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Up(e, t) {
    if (ot !== 0 && ot !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var i = e.callbackNode;
    if (hl() && e.callbackNode !== i) return null;
    var l = Te;
    return (
      (l = Sr(
        e,
        e === _e ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      l === 0
        ? null
        : (xp(e, l, t),
          zp(e, nn()),
          e.callbackNode != null && e.callbackNode === i
            ? Up.bind(null, e)
            : null)
    );
  }
  function Bp(e, t) {
    if (hl()) return null;
    xp(e, t, !0);
  }
  function z1() {
    F1(function () {
      (Oe & 6) !== 0 ? rt(Cd, _1) : _p();
    });
  }
  function rc() {
    return (Ra === 0 && (Ra = Dd()), Ra);
  }
  function kp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Cr("" + e);
  }
  function Pp(e, t) {
    var i = t.ownerDocument.createElement("input");
    return (
      (i.name = t.name),
      (i.value = t.value),
      e.id && i.setAttribute("form", e.id),
      t.parentNode.insertBefore(i, t),
      (e = new FormData(e)),
      i.parentNode.removeChild(i),
      e
    );
  }
  function U1(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var d = kp((u[xt] || null).action),
        y = l.submitter;
      y &&
        ((t = (t = y[xt] || null)
          ? kp(t.formAction)
          : y.getAttribute("formAction")),
        t !== null && ((d = t), (y = null)));
      var b = new Mr("action", "action", null, l, u);
      e.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Ra !== 0) {
                  var w = y ? Pp(u, y) : new FormData(u);
                  Cu(
                    i,
                    { pending: !0, data: w, method: u.method, action: d },
                    null,
                    w,
                  );
                }
              } else
                typeof d == "function" &&
                  (b.preventDefault(),
                  (w = y ? Pp(u, y) : new FormData(u)),
                  Cu(
                    i,
                    { pending: !0, data: w, method: u.method, action: d },
                    d,
                    w,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var lc = 0; lc < Ko.length; lc++) {
    var oc = Ko[lc],
      B1 = oc.toLowerCase(),
      k1 = oc[0].toUpperCase() + oc.slice(1);
    Zt(B1, "on" + k1);
  }
  (Zt(xh, "onAnimationEnd"),
    Zt(bh, "onAnimationIteration"),
    Zt(Sh, "onAnimationStart"),
    Zt("dblclick", "onDoubleClick"),
    Zt("focusin", "onFocus"),
    Zt("focusout", "onBlur"),
    Zt(n1, "onTransitionRun"),
    Zt(a1, "onTransitionStart"),
    Zt(i1, "onTransitionCancel"),
    Zt(Th, "onTransitionEnd"),
    Ga("onMouseEnter", ["mouseout", "mouseover"]),
    Ga("onMouseLeave", ["mouseout", "mouseover"]),
    Ga("onPointerEnter", ["pointerout", "pointerover"]),
    Ga("onPointerLeave", ["pointerout", "pointerover"]),
    da(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    da(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    da(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    da(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    da(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var As =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    P1 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(As),
    );
  function Hp(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i],
        u = l.event;
      l = l.listeners;
      e: {
        var d = void 0;
        if (t)
          for (var y = l.length - 1; 0 <= y; y--) {
            var b = l[y],
              w = b.instance,
              z = b.currentTarget;
            if (((b = b.listener), w !== d && u.isPropagationStopped()))
              break e;
            ((d = b), (u.currentTarget = z));
            try {
              d(u);
            } catch (K) {
              nl(K);
            }
            ((u.currentTarget = null), (d = w));
          }
        else
          for (y = 0; y < l.length; y++) {
            if (
              ((b = l[y]),
              (w = b.instance),
              (z = b.currentTarget),
              (b = b.listener),
              w !== d && u.isPropagationStopped())
            )
              break e;
            ((d = b), (u.currentTarget = z));
            try {
              d(u);
            } catch (K) {
              nl(K);
            }
            ((u.currentTarget = null), (d = w));
          }
      }
    }
  }
  function Se(e, t) {
    var i = t[So];
    i === void 0 && (i = t[So] = new Set());
    var l = e + "__bubble";
    i.has(l) || (Gp(t, e, 2, !1), i.add(l));
  }
  function uc(e, t, i) {
    var l = 0;
    (t && (l |= 4), Gp(i, e, l, t));
  }
  var gl = "_reactListening" + Math.random().toString(36).slice(2);
  function cc(e) {
    if (!e[gl]) {
      ((e[gl] = !0),
        _d.forEach(function (i) {
          i !== "selectionchange" && (P1.has(i) || uc(i, !1, e), uc(i, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[gl] || ((t[gl] = !0), uc("selectionchange", !1, t));
    }
  }
  function Gp(e, t, i, l) {
    switch (dg(t)) {
      case 2:
        var u = hS;
        break;
      case 8:
        u = mS;
        break;
      default:
        u = wc;
    }
    ((i = u.bind(null, t, i, e)),
      (u = void 0),
      !jo ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      l
        ? u !== void 0
          ? e.addEventListener(t, i, { capture: !0, passive: u })
          : e.addEventListener(t, i, !0)
        : u !== void 0
          ? e.addEventListener(t, i, { passive: u })
          : e.addEventListener(t, i, !1));
  }
  function fc(e, t, i, l, u) {
    var d = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var y = l.tag;
        if (y === 3 || y === 4) {
          var b = l.stateNode.containerInfo;
          if (b === u) break;
          if (y === 4)
            for (y = l.return; y !== null; ) {
              var w = y.tag;
              if ((w === 3 || w === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; b !== null; ) {
            if (((y = ka(b)), y === null)) return;
            if (((w = y.tag), w === 5 || w === 6 || w === 26 || w === 27)) {
              l = d = y;
              continue e;
            }
            b = b.parentNode;
          }
        }
        l = l.return;
      }
    Zd(function () {
      var z = d,
        K = Mo(i),
        Z = [];
      e: {
        var B = Eh.get(e);
        if (B !== void 0) {
          var P = Mr,
            de = e;
          switch (e) {
            case "keypress":
              if (Rr(i) === 0) break e;
            case "keydown":
            case "keyup":
              P = Vb;
              break;
            case "focusin":
              ((de = "focus"), (P = zo));
              break;
            case "focusout":
              ((de = "blur"), (P = zo));
              break;
            case "beforeblur":
            case "afterblur":
              P = zo;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              P = Jd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              P = Tb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              P = Ub;
              break;
            case xh:
            case bh:
            case Sh:
              P = Ab;
              break;
            case Th:
              P = kb;
              break;
            case "scroll":
            case "scrollend":
              P = bb;
              break;
            case "wheel":
              P = Hb;
              break;
            case "copy":
            case "cut":
            case "paste":
              P = Ob;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              P = eh;
              break;
            case "toggle":
            case "beforetoggle":
              P = Yb;
          }
          var ue = (t & 4) !== 0,
            je = !ue && (e === "scroll" || e === "scrollend"),
            L = ue ? (B !== null ? B + "Capture" : null) : B;
          ue = [];
          for (var O = z, _; O !== null; ) {
            var $ = O;
            if (
              ((_ = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                _ === null ||
                L === null ||
                (($ = qi(O, L)), $ != null && ue.push(Cs(O, $, _))),
              je)
            )
              break;
            O = O.return;
          }
          0 < ue.length &&
            ((B = new P(B, de, null, i, K)),
            Z.push({ event: B, listeners: ue }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((B = e === "mouseover" || e === "pointerover"),
            (P = e === "mouseout" || e === "pointerout"),
            B &&
              i !== Do &&
              (de = i.relatedTarget || i.fromElement) &&
              (ka(de) || de[Ba]))
          )
            break e;
          if (
            (P || B) &&
            ((B =
              K.window === K
                ? K
                : (B = K.ownerDocument)
                  ? B.defaultView || B.parentWindow
                  : window),
            P
              ? ((de = i.relatedTarget || i.toElement),
                (P = z),
                (de = de ? ka(de) : null),
                de !== null &&
                  ((je = c(de)),
                  (ue = de.tag),
                  de !== je || (ue !== 5 && ue !== 27 && ue !== 6)) &&
                  (de = null))
              : ((P = null), (de = z)),
            P !== de)
          ) {
            if (
              ((ue = Jd),
              ($ = "onMouseLeave"),
              (L = "onMouseEnter"),
              (O = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ue = eh),
                ($ = "onPointerLeave"),
                (L = "onPointerEnter"),
                (O = "pointer")),
              (je = P == null ? B : Yi(P)),
              (_ = de == null ? B : Yi(de)),
              (B = new ue($, O + "leave", P, i, K)),
              (B.target = je),
              (B.relatedTarget = _),
              ($ = null),
              ka(K) === z &&
                ((ue = new ue(L, O + "enter", de, i, K)),
                (ue.target = _),
                (ue.relatedTarget = je),
                ($ = ue)),
              (je = $),
              P && de)
            )
              t: {
                for (ue = P, L = de, O = 0, _ = ue; _; _ = xi(_)) O++;
                for (_ = 0, $ = L; $; $ = xi($)) _++;
                for (; 0 < O - _; ) ((ue = xi(ue)), O--);
                for (; 0 < _ - O; ) ((L = xi(L)), _--);
                for (; O--; ) {
                  if (ue === L || (L !== null && ue === L.alternate)) break t;
                  ((ue = xi(ue)), (L = xi(L)));
                }
                ue = null;
              }
            else ue = null;
            (P !== null && Yp(Z, B, P, ue, !1),
              de !== null && je !== null && Yp(Z, je, de, ue, !0));
          }
        }
        e: {
          if (
            ((B = z ? Yi(z) : window),
            (P = B.nodeName && B.nodeName.toLowerCase()),
            P === "select" || (P === "input" && B.type === "file"))
          )
            var ie = oh;
          else if (rh(B))
            if (uh) ie = Wb;
            else {
              ie = Ib;
              var xe = Qb;
            }
          else
            ((P = B.nodeName),
              !P ||
              P.toLowerCase() !== "input" ||
              (B.type !== "checkbox" && B.type !== "radio")
                ? z && Ro(z.elementType) && (ie = oh)
                : (ie = Jb));
          if (ie && (ie = ie(e, z))) {
            lh(Z, ie, i, K);
            break e;
          }
          (xe && xe(e, B, z),
            e === "focusout" &&
              z &&
              B.type === "number" &&
              z.memoizedProps.value != null &&
              Oo(B, "number", B.value));
        }
        switch (((xe = z ? Yi(z) : window), e)) {
          case "focusin":
            (rh(xe) || xe.contentEditable === "true") &&
              ((Za = xe), (Go = z), (Ji = null));
            break;
          case "focusout":
            Ji = Go = Za = null;
            break;
          case "mousedown":
            Yo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Yo = !1), yh(Z, i, K));
            break;
          case "selectionchange":
            if (t1) break;
          case "keydown":
          case "keyup":
            yh(Z, i, K);
        }
        var re;
        if (Bo)
          e: {
            switch (e) {
              case "compositionstart":
                var fe = "onCompositionStart";
                break e;
              case "compositionend":
                fe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                fe = "onCompositionUpdate";
                break e;
            }
            fe = void 0;
          }
        else
          Xa
            ? ih(e, i) && (fe = "onCompositionEnd")
            : e === "keydown" &&
              i.keyCode === 229 &&
              (fe = "onCompositionStart");
        (fe &&
          (th &&
            i.locale !== "ko" &&
            (Xa || fe !== "onCompositionStart"
              ? fe === "onCompositionEnd" && Xa && (re = Qd())
              : ((kn = K),
                (Lo = "value" in kn ? kn.value : kn.textContent),
                (Xa = !0))),
          (xe = yl(z, fe)),
          0 < xe.length &&
            ((fe = new Wd(fe, e, null, i, K)),
            Z.push({ event: fe, listeners: xe }),
            re
              ? (fe.data = re)
              : ((re = sh(i)), re !== null && (fe.data = re)))),
          (re = Kb ? Fb(e, i) : $b(e, i)) &&
            ((fe = yl(z, "onBeforeInput")),
            0 < fe.length &&
              ((xe = new Wd("onBeforeInput", "beforeinput", null, i, K)),
              Z.push({ event: xe, listeners: fe }),
              (xe.data = re))),
          U1(Z, e, z, i, K));
      }
      Hp(Z, t);
    });
  }
  function Cs(e, t, i) {
    return { instance: e, listener: t, currentTarget: i };
  }
  function yl(e, t) {
    for (var i = t + "Capture", l = []; e !== null; ) {
      var u = e,
        d = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          d === null ||
          ((u = qi(e, i)),
          u != null && l.unshift(Cs(e, u, d)),
          (u = qi(e, t)),
          u != null && l.push(Cs(e, u, d))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function xi(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Yp(e, t, i, l, u) {
    for (var d = t._reactName, y = []; i !== null && i !== l; ) {
      var b = i,
        w = b.alternate,
        z = b.stateNode;
      if (((b = b.tag), w !== null && w === l)) break;
      ((b !== 5 && b !== 26 && b !== 27) ||
        z === null ||
        ((w = z),
        u
          ? ((z = qi(i, d)), z != null && y.unshift(Cs(i, z, w)))
          : u || ((z = qi(i, d)), z != null && y.push(Cs(i, z, w)))),
        (i = i.return));
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var H1 = /\r\n?/g,
    G1 = /\u0000|\uFFFD/g;
  function qp(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        H1,
        `
`,
      )
      .replace(G1, "");
  }
  function Kp(e, t) {
    return ((t = qp(t)), qp(e) === t);
  }
  function vl() {}
  function Ne(e, t, i, l, u, d) {
    switch (i) {
      case "children":
        typeof l == "string"
          ? t === "body" || (t === "textarea" && l === "") || Ka(e, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            t !== "body" &&
            Ka(e, "" + l);
        break;
      case "className":
        Er(e, "class", l);
        break;
      case "tabIndex":
        Er(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Er(e, i, l);
        break;
      case "style":
        $d(e, l, d);
        break;
      case "data":
        if (t !== "object") {
          Er(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          e.removeAttribute(i);
          break;
        }
        ((l = Cr("" + l)), e.setAttribute(i, l));
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof d == "function" &&
            (i === "formAction"
              ? (t !== "input" && Ne(e, t, "name", u.name, u, null),
                Ne(e, t, "formEncType", u.formEncType, u, null),
                Ne(e, t, "formMethod", u.formMethod, u, null),
                Ne(e, t, "formTarget", u.formTarget, u, null))
              : (Ne(e, t, "encType", u.encType, u, null),
                Ne(e, t, "method", u.method, u, null),
                Ne(e, t, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        ((l = Cr("" + l)), e.setAttribute(i, l));
        break;
      case "onClick":
        l != null && (e.onclick = vl);
        break;
      case "onScroll":
        l != null && Se("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Se("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(r(61));
          if (((i = l.__html), i != null)) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = i;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((i = Cr("" + l)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", i));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(i, "" + l)
          : e.removeAttribute(i);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(i, "")
          : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        l === !0
          ? e.setAttribute(i, "")
          : l !== !1 &&
              l != null &&
              typeof l != "function" &&
              typeof l != "symbol"
            ? e.setAttribute(i, l)
            : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? e.setAttribute(i, l)
          : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? e.removeAttribute(i)
          : e.setAttribute(i, l);
        break;
      case "popover":
        (Se("beforetoggle", e), Se("toggle", e), Tr(e, "popover", l));
        break;
      case "xlinkActuate":
        vn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        vn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        vn(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        vn(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        vn(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        vn(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        vn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        vn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        vn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Tr(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) ||
          (i[0] !== "o" && i[0] !== "O") ||
          (i[1] !== "n" && i[1] !== "N")) &&
          ((i = vb.get(i) || i), Tr(e, i, l));
    }
  }
  function dc(e, t, i, l, u, d) {
    switch (i) {
      case "style":
        $d(e, l, d);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(r(61));
          if (((i = l.__html), i != null)) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? Ka(e, l)
          : (typeof l == "number" || typeof l == "bigint") && Ka(e, "" + l);
        break;
      case "onScroll":
        l != null && Se("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Se("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = vl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!zd.hasOwnProperty(i))
          e: {
            if (
              i[0] === "o" &&
              i[1] === "n" &&
              ((u = i.endsWith("Capture")),
              (t = i.slice(2, u ? i.length - 7 : void 0)),
              (d = e[xt] || null),
              (d = d != null ? d[i] : null),
              typeof d == "function" && e.removeEventListener(t, d, u),
              typeof l == "function")
            ) {
              (typeof d != "function" &&
                d !== null &&
                (i in e
                  ? (e[i] = null)
                  : e.hasAttribute(i) && e.removeAttribute(i)),
                e.addEventListener(t, l, u));
              break e;
            }
            i in e
              ? (e[i] = l)
              : l === !0
                ? e.setAttribute(i, "")
                : Tr(e, i, l);
          }
    }
  }
  function ut(e, t, i) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Se("error", e), Se("load", e));
        var l = !1,
          u = !1,
          d;
        for (d in i)
          if (i.hasOwnProperty(d)) {
            var y = i[d];
            if (y != null)
              switch (d) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  Ne(e, t, d, y, i, null);
              }
          }
        (u && Ne(e, t, "srcSet", i.srcSet, i, null),
          l && Ne(e, t, "src", i.src, i, null));
        return;
      case "input":
        Se("invalid", e);
        var b = (d = y = u = null),
          w = null,
          z = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var K = i[l];
            if (K != null)
              switch (l) {
                case "name":
                  u = K;
                  break;
                case "type":
                  y = K;
                  break;
                case "checked":
                  w = K;
                  break;
                case "defaultChecked":
                  z = K;
                  break;
                case "value":
                  d = K;
                  break;
                case "defaultValue":
                  b = K;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (K != null) throw Error(r(137, t));
                  break;
                default:
                  Ne(e, t, l, K, i, null);
              }
          }
        (Yd(e, d, b, w, z, y, u, !1), wr(e));
        return;
      case "select":
        (Se("invalid", e), (l = y = d = null));
        for (u in i)
          if (i.hasOwnProperty(u) && ((b = i[u]), b != null))
            switch (u) {
              case "value":
                d = b;
                break;
              case "defaultValue":
                y = b;
                break;
              case "multiple":
                l = b;
              default:
                Ne(e, t, u, b, i, null);
            }
        ((t = d),
          (i = y),
          (e.multiple = !!l),
          t != null ? qa(e, !!l, t, !1) : i != null && qa(e, !!l, i, !0));
        return;
      case "textarea":
        (Se("invalid", e), (d = u = l = null));
        for (y in i)
          if (i.hasOwnProperty(y) && ((b = i[y]), b != null))
            switch (y) {
              case "value":
                l = b;
                break;
              case "defaultValue":
                u = b;
                break;
              case "children":
                d = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(r(91));
                break;
              default:
                Ne(e, t, y, b, i, null);
            }
        (Kd(e, l, u, d), wr(e));
        return;
      case "option":
        for (w in i)
          if (i.hasOwnProperty(w) && ((l = i[w]), l != null))
            switch (w) {
              case "selected":
                e.selected =
                  l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ne(e, t, w, l, i, null);
            }
        return;
      case "dialog":
        (Se("beforetoggle", e),
          Se("toggle", e),
          Se("cancel", e),
          Se("close", e));
        break;
      case "iframe":
      case "object":
        Se("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < As.length; l++) Se(As[l], e);
        break;
      case "image":
        (Se("error", e), Se("load", e));
        break;
      case "details":
        Se("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (Se("error", e), Se("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in i)
          if (i.hasOwnProperty(z) && ((l = i[z]), l != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                Ne(e, t, z, l, i, null);
            }
        return;
      default:
        if (Ro(t)) {
          for (K in i)
            i.hasOwnProperty(K) &&
              ((l = i[K]), l !== void 0 && dc(e, t, K, l, i, void 0));
          return;
        }
    }
    for (b in i)
      i.hasOwnProperty(b) && ((l = i[b]), l != null && Ne(e, t, b, l, i, null));
  }
  function Y1(e, t, i, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          d = null,
          y = null,
          b = null,
          w = null,
          z = null,
          K = null;
        for (P in i) {
          var Z = i[P];
          if (i.hasOwnProperty(P) && Z != null)
            switch (P) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = Z;
              default:
                l.hasOwnProperty(P) || Ne(e, t, P, null, l, Z);
            }
        }
        for (var B in l) {
          var P = l[B];
          if (((Z = i[B]), l.hasOwnProperty(B) && (P != null || Z != null)))
            switch (B) {
              case "type":
                d = P;
                break;
              case "name":
                u = P;
                break;
              case "checked":
                z = P;
                break;
              case "defaultChecked":
                K = P;
                break;
              case "value":
                y = P;
                break;
              case "defaultValue":
                b = P;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null) throw Error(r(137, t));
                break;
              default:
                P !== Z && Ne(e, t, B, P, l, Z);
            }
        }
        Co(e, y, b, w, z, K, d, u);
        return;
      case "select":
        P = y = b = B = null;
        for (d in i)
          if (((w = i[d]), i.hasOwnProperty(d) && w != null))
            switch (d) {
              case "value":
                break;
              case "multiple":
                P = w;
              default:
                l.hasOwnProperty(d) || Ne(e, t, d, null, l, w);
            }
        for (u in l)
          if (
            ((d = l[u]),
            (w = i[u]),
            l.hasOwnProperty(u) && (d != null || w != null))
          )
            switch (u) {
              case "value":
                B = d;
                break;
              case "defaultValue":
                b = d;
                break;
              case "multiple":
                y = d;
              default:
                d !== w && Ne(e, t, u, d, l, w);
            }
        ((t = b),
          (i = y),
          (l = P),
          B != null
            ? qa(e, !!i, B, !1)
            : !!l != !!i &&
              (t != null ? qa(e, !!i, t, !0) : qa(e, !!i, i ? [] : "", !1)));
        return;
      case "textarea":
        P = B = null;
        for (b in i)
          if (
            ((u = i[b]),
            i.hasOwnProperty(b) && u != null && !l.hasOwnProperty(b))
          )
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ne(e, t, b, null, l, u);
            }
        for (y in l)
          if (
            ((u = l[y]),
            (d = i[y]),
            l.hasOwnProperty(y) && (u != null || d != null))
          )
            switch (y) {
              case "value":
                B = u;
                break;
              case "defaultValue":
                P = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== d && Ne(e, t, y, u, l, d);
            }
        qd(e, B, P);
        return;
      case "option":
        for (var de in i)
          if (
            ((B = i[de]),
            i.hasOwnProperty(de) && B != null && !l.hasOwnProperty(de))
          )
            switch (de) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ne(e, t, de, null, l, B);
            }
        for (w in l)
          if (
            ((B = l[w]),
            (P = i[w]),
            l.hasOwnProperty(w) && B !== P && (B != null || P != null))
          )
            switch (w) {
              case "selected":
                e.selected =
                  B && typeof B != "function" && typeof B != "symbol";
                break;
              default:
                Ne(e, t, w, B, l, P);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ue in i)
          ((B = i[ue]),
            i.hasOwnProperty(ue) &&
              B != null &&
              !l.hasOwnProperty(ue) &&
              Ne(e, t, ue, null, l, B));
        for (z in l)
          if (
            ((B = l[z]),
            (P = i[z]),
            l.hasOwnProperty(z) && B !== P && (B != null || P != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(r(137, t));
                break;
              default:
                Ne(e, t, z, B, l, P);
            }
        return;
      default:
        if (Ro(t)) {
          for (var je in i)
            ((B = i[je]),
              i.hasOwnProperty(je) &&
                B !== void 0 &&
                !l.hasOwnProperty(je) &&
                dc(e, t, je, void 0, l, B));
          for (K in l)
            ((B = l[K]),
              (P = i[K]),
              !l.hasOwnProperty(K) ||
                B === P ||
                (B === void 0 && P === void 0) ||
                dc(e, t, K, B, l, P));
          return;
        }
    }
    for (var L in i)
      ((B = i[L]),
        i.hasOwnProperty(L) &&
          B != null &&
          !l.hasOwnProperty(L) &&
          Ne(e, t, L, null, l, B));
    for (Z in l)
      ((B = l[Z]),
        (P = i[Z]),
        !l.hasOwnProperty(Z) ||
          B === P ||
          (B == null && P == null) ||
          Ne(e, t, Z, B, l, P));
  }
  var hc = null,
    mc = null;
  function xl(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Fp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function $p(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function pc(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var gc = null;
  function q1() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === gc
        ? !1
        : ((gc = e), !0)
      : ((gc = null), !1);
  }
  var Xp = typeof setTimeout == "function" ? setTimeout : void 0,
    K1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Zp = typeof Promise == "function" ? Promise : void 0,
    F1 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Zp < "u"
          ? function (e) {
              return Zp.resolve(null).then(e).catch($1);
            }
          : Xp;
  function $1(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function ta(e) {
    return e === "head";
  }
  function Qp(e, t) {
    var i = t,
      l = 0,
      u = 0;
    do {
      var d = i.nextSibling;
      if ((e.removeChild(i), d && d.nodeType === 8))
        if (((i = d.data), i === "/$")) {
          if (0 < l && 8 > l) {
            i = l;
            var y = e.ownerDocument;
            if ((i & 1 && Os(y.documentElement), i & 2 && Os(y.body), i & 4))
              for (i = y.head, Os(i), y = i.firstChild; y; ) {
                var b = y.nextSibling,
                  w = y.nodeName;
                (y[Gi] ||
                  w === "SCRIPT" ||
                  w === "STYLE" ||
                  (w === "LINK" && y.rel.toLowerCase() === "stylesheet") ||
                  i.removeChild(y),
                  (y = b));
              }
          }
          if (u === 0) {
            (e.removeChild(d), _s(t));
            return;
          }
          u--;
        } else
          i === "$" || i === "$?" || i === "$!"
            ? u++
            : (l = i.charCodeAt(0) - 48);
      else l = 0;
      i = d;
    } while (i);
    _s(t);
  }
  function yc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (((t = t.nextSibling), i.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (yc(i), To(i));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(i);
    }
  }
  function X1(e, t, i, l) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (l) {
        if (!e[Gi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((d = e.getAttribute("rel")),
                d === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                d !== u.rel ||
                e.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                e.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((d = e.getAttribute("src")),
                (d !== (u.src == null ? null : u.src) ||
                  e.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  e.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  d &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var d = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === d) return e;
      } else return e;
      if (((e = It(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Z1(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !i) ||
        ((e = It(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function vc(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function Q1(e, t) {
    var i = e.ownerDocument;
    if (e.data !== "$?" || i.readyState === "complete") t();
    else {
      var l = function () {
        (t(), i.removeEventListener("DOMContentLoaded", l));
      };
      (i.addEventListener("DOMContentLoaded", l), (e._reactRetry = l));
    }
  }
  function It(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var xc = null;
  function Ip(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?") {
          if (t === 0) return e;
          t--;
        } else i === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Jp(e, t, i) {
    switch (((t = xl(i)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function Os(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    To(e);
  }
  var Ft = new Map(),
    Wp = new Set();
  function bl(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var jn = Y.d;
  Y.d = { f: I1, r: J1, D: W1, C: eS, L: tS, m: nS, X: iS, S: aS, M: sS };
  function I1() {
    var e = jn.f(),
      t = fl();
    return e || t;
  }
  function J1(e) {
    var t = Pa(e);
    t !== null && t.tag === 5 && t.type === "form" ? xm(t) : jn.r(e);
  }
  var bi = typeof document > "u" ? null : document;
  function eg(e, t, i) {
    var l = bi;
    if (l && typeof t == "string" && t) {
      var u = kt(t);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof i == "string" && (u += '[crossorigin="' + i + '"]'),
        Wp.has(u) ||
          (Wp.add(u),
          (e = { rel: e, crossOrigin: i, href: t }),
          l.querySelector(u) === null &&
            ((t = l.createElement("link")),
            ut(t, "link", e),
            et(t),
            l.head.appendChild(t))));
    }
  }
  function W1(e) {
    (jn.D(e), eg("dns-prefetch", e, null));
  }
  function eS(e, t) {
    (jn.C(e, t), eg("preconnect", e, t));
  }
  function tS(e, t, i) {
    jn.L(e, t, i);
    var l = bi;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + kt(t) + '"]';
      t === "image" && i && i.imageSrcSet
        ? ((u += '[imagesrcset="' + kt(i.imageSrcSet) + '"]'),
          typeof i.imageSizes == "string" &&
            (u += '[imagesizes="' + kt(i.imageSizes) + '"]'))
        : (u += '[href="' + kt(e) + '"]');
      var d = u;
      switch (t) {
        case "style":
          d = Si(e);
          break;
        case "script":
          d = Ti(e);
      }
      Ft.has(d) ||
        ((e = g(
          {
            rel: "preload",
            href: t === "image" && i && i.imageSrcSet ? void 0 : e,
            as: t,
          },
          i,
        )),
        Ft.set(d, e),
        l.querySelector(u) !== null ||
          (t === "style" && l.querySelector(Rs(d))) ||
          (t === "script" && l.querySelector(Ds(d))) ||
          ((t = l.createElement("link")),
          ut(t, "link", e),
          et(t),
          l.head.appendChild(t)));
    }
  }
  function nS(e, t) {
    jn.m(e, t);
    var i = bi;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + kt(l) + '"][href="' + kt(e) + '"]',
        d = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = Ti(e);
      }
      if (
        !Ft.has(d) &&
        ((e = g({ rel: "modulepreload", href: e }, t)),
        Ft.set(d, e),
        i.querySelector(u) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Ds(d))) return;
        }
        ((l = i.createElement("link")),
          ut(l, "link", e),
          et(l),
          i.head.appendChild(l));
      }
    }
  }
  function aS(e, t, i) {
    jn.S(e, t, i);
    var l = bi;
    if (l && e) {
      var u = Ha(l).hoistableStyles,
        d = Si(e);
      t = t || "default";
      var y = u.get(d);
      if (!y) {
        var b = { loading: 0, preload: null };
        if ((y = l.querySelector(Rs(d)))) b.loading = 5;
        else {
          ((e = g({ rel: "stylesheet", href: e, "data-precedence": t }, i)),
            (i = Ft.get(d)) && bc(e, i));
          var w = (y = l.createElement("link"));
          (et(w),
            ut(w, "link", e),
            (w._p = new Promise(function (z, K) {
              ((w.onload = z), (w.onerror = K));
            })),
            w.addEventListener("load", function () {
              b.loading |= 1;
            }),
            w.addEventListener("error", function () {
              b.loading |= 2;
            }),
            (b.loading |= 4),
            Sl(y, t, l));
        }
        ((y = { type: "stylesheet", instance: y, count: 1, state: b }),
          u.set(d, y));
      }
    }
  }
  function iS(e, t) {
    jn.X(e, t);
    var i = bi;
    if (i && e) {
      var l = Ha(i).hoistableScripts,
        u = Ti(e),
        d = l.get(u);
      d ||
        ((d = i.querySelector(Ds(u))),
        d ||
          ((e = g({ src: e, async: !0 }, t)),
          (t = Ft.get(u)) && Sc(e, t),
          (d = i.createElement("script")),
          et(d),
          ut(d, "link", e),
          i.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        l.set(u, d));
    }
  }
  function sS(e, t) {
    jn.M(e, t);
    var i = bi;
    if (i && e) {
      var l = Ha(i).hoistableScripts,
        u = Ti(e),
        d = l.get(u);
      d ||
        ((d = i.querySelector(Ds(u))),
        d ||
          ((e = g({ src: e, async: !0, type: "module" }, t)),
          (t = Ft.get(u)) && Sc(e, t),
          (d = i.createElement("script")),
          et(d),
          ut(d, "link", e),
          i.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        l.set(u, d));
    }
  }
  function tg(e, t, i, l) {
    var u = (u = ne.current) ? bl(u) : null;
    if (!u) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string"
          ? ((t = Si(i.href)),
            (i = Ha(u).hoistableStyles),
            (l = i.get(t)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              i.set(t, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          i.rel === "stylesheet" &&
          typeof i.href == "string" &&
          typeof i.precedence == "string"
        ) {
          e = Si(i.href);
          var d = Ha(u).hoistableStyles,
            y = d.get(e);
          if (
            (y ||
              ((u = u.ownerDocument || u),
              (y = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              d.set(e, y),
              (d = u.querySelector(Rs(e))) &&
                !d._p &&
                ((y.instance = d), (y.state.loading = 5)),
              Ft.has(e) ||
                ((i = {
                  rel: "preload",
                  as: "style",
                  href: i.href,
                  crossOrigin: i.crossOrigin,
                  integrity: i.integrity,
                  media: i.media,
                  hrefLang: i.hrefLang,
                  referrerPolicy: i.referrerPolicy,
                }),
                Ft.set(e, i),
                d || rS(u, e, i, y.state))),
            t && l === null)
          )
            throw Error(r(528, ""));
          return y;
        }
        if (t && l !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = i.async),
          (i = i.src),
          typeof i == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ti(i)),
              (i = Ha(u).hoistableScripts),
              (l = i.get(t)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                i.set(t, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function Si(e) {
    return 'href="' + kt(e) + '"';
  }
  function Rs(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function ng(e) {
    return g({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function rS(e, t, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (l.loading = 1)
      : ((t = e.createElement("link")),
        (l.preload = t),
        t.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        ut(t, "link", i),
        et(t),
        e.head.appendChild(t));
  }
  function Ti(e) {
    return '[src="' + kt(e) + '"]';
  }
  function Ds(e) {
    return "script[async]" + e;
  }
  function ag(e, t, i) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var l = e.querySelector('style[data-href~="' + kt(i.href) + '"]');
          if (l) return ((t.instance = l), et(l), l);
          var u = g({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement("style")),
            et(l),
            ut(l, "style", u),
            Sl(l, i.precedence, e),
            (t.instance = l)
          );
        case "stylesheet":
          u = Si(i.href);
          var d = e.querySelector(Rs(u));
          if (d) return ((t.state.loading |= 4), (t.instance = d), et(d), d);
          ((l = ng(i)),
            (u = Ft.get(u)) && bc(l, u),
            (d = (e.ownerDocument || e).createElement("link")),
            et(d));
          var y = d;
          return (
            (y._p = new Promise(function (b, w) {
              ((y.onload = b), (y.onerror = w));
            })),
            ut(d, "link", l),
            (t.state.loading |= 4),
            Sl(d, i.precedence, e),
            (t.instance = d)
          );
        case "script":
          return (
            (d = Ti(i.src)),
            (u = e.querySelector(Ds(d)))
              ? ((t.instance = u), et(u), u)
              : ((l = i),
                (u = Ft.get(d)) && ((l = g({}, i)), Sc(l, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement("script")),
                et(u),
                ut(u, "link", l),
                e.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((l = t.instance), (t.state.loading |= 4), Sl(l, i.precedence, e));
    return t.instance;
  }
  function Sl(e, t, i) {
    for (
      var l = i.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = l.length ? l[l.length - 1] : null,
        d = u,
        y = 0;
      y < l.length;
      y++
    ) {
      var b = l[y];
      if (b.dataset.precedence === t) d = b;
      else if (d !== u) break;
    }
    d
      ? d.parentNode.insertBefore(e, d.nextSibling)
      : ((t = i.nodeType === 9 ? i.head : i), t.insertBefore(e, t.firstChild));
  }
  function bc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Sc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Tl = null;
  function ig(e, t, i) {
    if (Tl === null) {
      var l = new Map(),
        u = (Tl = new Map());
      u.set(i, l);
    } else ((u = Tl), (l = u.get(i)), l || ((l = new Map()), u.set(i, l)));
    if (l.has(e)) return l;
    for (
      l.set(e, null), i = i.getElementsByTagName(e), u = 0;
      u < i.length;
      u++
    ) {
      var d = i[u];
      if (
        !(
          d[Gi] ||
          d[ft] ||
          (e === "link" && d.getAttribute("rel") === "stylesheet")
        ) &&
        d.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var y = d.getAttribute(t) || "";
        y = e + y;
        var b = l.get(y);
        b ? b.push(d) : l.set(y, [d]);
      }
    }
    return l;
  }
  function sg(e, t, i) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        i,
        t === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function lS(e, t, i) {
    if (i === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled),
              typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function rg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Ms = null;
  function oS() {}
  function uS(e, t, i) {
    if (Ms === null) throw Error(r(475));
    var l = Ms;
    if (
      t.type === "stylesheet" &&
      (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var u = Si(i.href),
          d = e.querySelector(Rs(u));
        if (d) {
          ((e = d._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (l.count++, (l = El.bind(l)), e.then(l, l)),
            (t.state.loading |= 4),
            (t.instance = d),
            et(d));
          return;
        }
        ((d = e.ownerDocument || e),
          (i = ng(i)),
          (u = Ft.get(u)) && bc(i, u),
          (d = d.createElement("link")),
          et(d));
        var y = d;
        ((y._p = new Promise(function (b, w) {
          ((y.onload = b), (y.onerror = w));
        })),
          ut(d, "link", i),
          (t.instance = d));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (l.count++,
          (t = El.bind(l)),
          e.addEventListener("load", t),
          e.addEventListener("error", t)));
    }
  }
  function cS() {
    if (Ms === null) throw Error(r(475));
    var e = Ms;
    return (
      e.stylesheets && e.count === 0 && Tc(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var i = setTimeout(function () {
              if ((e.stylesheets && Tc(e, e.stylesheets), e.unsuspend)) {
                var l = e.unsuspend;
                ((e.unsuspend = null), l());
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                ((e.unsuspend = null), clearTimeout(i));
              }
            );
          }
        : null
    );
  }
  function El() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Tc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var wl = null;
  function Tc(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (wl = new Map()),
        t.forEach(fS, e),
        (wl = null),
        El.call(e)));
  }
  function fS(e, t) {
    if (!(t.state.loading & 4)) {
      var i = wl.get(e);
      if (i) var l = i.get(null);
      else {
        ((i = new Map()), wl.set(e, i));
        for (
          var u = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            d = 0;
          d < u.length;
          d++
        ) {
          var y = u[d];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
            (i.set(y.dataset.precedence, y), (l = y));
        }
        l && i.set(null, l);
      }
      ((u = t.instance),
        (y = u.getAttribute("data-precedence")),
        (d = i.get(y) || l),
        d === l && i.set(null, u),
        i.set(y, u),
        this.count++,
        (l = El.bind(this)),
        u.addEventListener("load", l),
        u.addEventListener("error", l),
        d
          ? d.parentNode.insertBefore(u, d.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Ns = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0,
  };
  function dS(e, t, i, l, u, d, y, b) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = vo(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = vo(0)),
      (this.hiddenUpdates = vo(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = u),
      (this.onCaughtError = d),
      (this.onRecoverableError = y),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = b),
      (this.incompleteTransitions = new Map()));
  }
  function lg(e, t, i, l, u, d, y, b, w, z, K, Z) {
    return (
      (e = new dS(e, t, i, y, b, w, z, Z)),
      (t = 1),
      d === !0 && (t |= 24),
      (d = Mt(3, null, null, t)),
      (e.current = d),
      (d.stateNode = e),
      (t = au()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (d.memoizedState = { element: l, isDehydrated: i, cache: t }),
      lu(d),
      e
    );
  }
  function og(e) {
    return e ? ((e = Wa), e) : Wa;
  }
  function ug(e, t, i, l, u, d) {
    ((u = og(u)),
      l.context === null ? (l.context = u) : (l.pendingContext = u),
      (l = Gn(t)),
      (l.payload = { element: i }),
      (d = d === void 0 ? null : d),
      d !== null && (l.callback = d),
      (i = Yn(e, l, t)),
      i !== null && (_t(i, e, t), ls(i, e, t)));
  }
  function cg(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Ec(e, t) {
    (cg(e, t), (e = e.alternate) && cg(e, t));
  }
  function fg(e) {
    if (e.tag === 13) {
      var t = Ja(e, 67108864);
      (t !== null && _t(t, e, 67108864), Ec(e, 67108864));
    }
  }
  var Al = !0;
  function hS(e, t, i, l) {
    var u = U.T;
    U.T = null;
    var d = Y.p;
    try {
      ((Y.p = 2), wc(e, t, i, l));
    } finally {
      ((Y.p = d), (U.T = u));
    }
  }
  function mS(e, t, i, l) {
    var u = U.T;
    U.T = null;
    var d = Y.p;
    try {
      ((Y.p = 8), wc(e, t, i, l));
    } finally {
      ((Y.p = d), (U.T = u));
    }
  }
  function wc(e, t, i, l) {
    if (Al) {
      var u = Ac(l);
      if (u === null) (fc(e, t, l, Cl, i), hg(e, l));
      else if (gS(u, e, t, i, l)) l.stopPropagation();
      else if ((hg(e, l), t & 4 && -1 < pS.indexOf(e))) {
        for (; u !== null; ) {
          var d = Pa(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
                  var y = fa(d.pendingLanes);
                  if (y !== 0) {
                    var b = d;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; y; ) {
                      var w = 1 << (31 - Rt(y));
                      ((b.entanglements[1] |= w), (y &= ~w));
                    }
                    (on(d), (Oe & 6) === 0 && ((ul = nn() + 500), ws(0)));
                  }
                }
                break;
              case 13:
                ((b = Ja(d, 2)), b !== null && _t(b, d, 2), fl(), Ec(d, 2));
            }
          if (((d = Ac(l)), d === null && fc(e, t, l, Cl, i), d === u)) break;
          u = d;
        }
        u !== null && l.stopPropagation();
      } else fc(e, t, l, null, i);
    }
  }
  function Ac(e) {
    return ((e = Mo(e)), Cc(e));
  }
  var Cl = null;
  function Cc(e) {
    if (((Cl = null), (e = ka(e)), e !== null)) {
      var t = c(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (((e = f(t)), e !== null)) return e;
          e = null;
        } else if (i === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Cl = e), null);
  }
  function dg(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (eb()) {
          case Cd:
            return 2;
          case Od:
            return 8;
          case vr:
          case tb:
            return 32;
          case Rd:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Oc = !1,
    na = null,
    aa = null,
    ia = null,
    js = new Map(),
    Ls = new Map(),
    sa = [],
    pS =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function hg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        na = null;
        break;
      case "dragenter":
      case "dragleave":
        aa = null;
        break;
      case "mouseover":
      case "mouseout":
        ia = null;
        break;
      case "pointerover":
      case "pointerout":
        js.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ls.delete(t.pointerId);
    }
  }
  function Vs(e, t, i, l, u, d) {
    return e === null || e.nativeEvent !== d
      ? ((e = {
          blockedOn: t,
          domEventName: i,
          eventSystemFlags: l,
          nativeEvent: d,
          targetContainers: [u],
        }),
        t !== null && ((t = Pa(t)), t !== null && fg(t)),
        e)
      : ((e.eventSystemFlags |= l),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function gS(e, t, i, l, u) {
    switch (t) {
      case "focusin":
        return ((na = Vs(na, e, t, i, l, u)), !0);
      case "dragenter":
        return ((aa = Vs(aa, e, t, i, l, u)), !0);
      case "mouseover":
        return ((ia = Vs(ia, e, t, i, l, u)), !0);
      case "pointerover":
        var d = u.pointerId;
        return (js.set(d, Vs(js.get(d) || null, e, t, i, l, u)), !0);
      case "gotpointercapture":
        return (
          (d = u.pointerId),
          Ls.set(d, Vs(Ls.get(d) || null, e, t, i, l, u)),
          !0
        );
    }
    return !1;
  }
  function mg(e) {
    var t = ka(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (((t = i.tag), t === 13)) {
          if (((t = f(i)), t !== null)) {
            ((e.blockedOn = t),
              ub(e.priority, function () {
                if (i.tag === 13) {
                  var l = Vt();
                  l = xo(l);
                  var u = Ja(i, l);
                  (u !== null && _t(u, i, l), Ec(i, l));
                }
              }));
            return;
          }
        } else if (t === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ol(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = Ac(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(i.type, i);
        ((Do = l), i.target.dispatchEvent(l), (Do = null));
      } else return ((t = Pa(i)), t !== null && fg(t), (e.blockedOn = i), !1);
      t.shift();
    }
    return !0;
  }
  function pg(e, t, i) {
    Ol(e) && i.delete(t);
  }
  function yS() {
    ((Oc = !1),
      na !== null && Ol(na) && (na = null),
      aa !== null && Ol(aa) && (aa = null),
      ia !== null && Ol(ia) && (ia = null),
      js.forEach(pg),
      Ls.forEach(pg));
  }
  function Rl(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Oc ||
        ((Oc = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, yS)));
  }
  var Dl = null;
  function gg(e) {
    Dl !== e &&
      ((Dl = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Dl === e && (Dl = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t],
            l = e[t + 1],
            u = e[t + 2];
          if (typeof l != "function") {
            if (Cc(l || i) === null) continue;
            break;
          }
          var d = Pa(i);
          d !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Cu(d, { pending: !0, data: u, method: i.method, action: l }, l, u));
        }
      }));
  }
  function _s(e) {
    function t(w) {
      return Rl(w, e);
    }
    (na !== null && Rl(na, e),
      aa !== null && Rl(aa, e),
      ia !== null && Rl(ia, e),
      js.forEach(t),
      Ls.forEach(t));
    for (var i = 0; i < sa.length; i++) {
      var l = sa[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < sa.length && ((i = sa[0]), i.blockedOn === null); )
      (mg(i), i.blockedOn === null && sa.shift());
    if (((i = (e.ownerDocument || e).$$reactFormReplay), i != null))
      for (l = 0; l < i.length; l += 3) {
        var u = i[l],
          d = i[l + 1],
          y = u[xt] || null;
        if (typeof d == "function") y || gg(i);
        else if (y) {
          var b = null;
          if (d && d.hasAttribute("formAction")) {
            if (((u = d), (y = d[xt] || null))) b = y.formAction;
            else if (Cc(u) !== null) continue;
          } else b = y.action;
          (typeof b == "function" ? (i[l + 1] = b) : (i.splice(l, 3), (l -= 3)),
            gg(i));
        }
      }
  }
  function Rc(e) {
    this._internalRoot = e;
  }
  ((Ml.prototype.render = Rc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var i = t.current,
        l = Vt();
      ug(i, l, e, t, null, null);
    }),
    (Ml.prototype.unmount = Rc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (ug(e.current, 2, null, e, null, null), fl(), (t[Ba] = null));
        }
      }));
  function Ml(e) {
    this._internalRoot = e;
  }
  Ml.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Ld();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < sa.length && t !== 0 && t < sa[i].priority; i++);
      (sa.splice(i, 0, e), i === 0 && mg(e));
    }
  };
  var yg = a.version;
  if (yg !== "19.1.0") throw Error(r(527, yg, "19.1.0"));
  Y.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(r(188))
        : ((e = Object.keys(e).join(",")), Error(r(268, e)));
    return (
      (e = p(t)),
      (e = e !== null ? h(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var vS = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Nl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Nl.isDisabled && Nl.supportsFiber)
      try {
        ((ki = Nl.inject(vS)), (Ot = Nl));
      } catch {}
  }
  return (
    (Us.createRoot = function (e, t) {
      if (!o(e)) throw Error(r(299));
      var i = !1,
        l = "",
        u = Lm,
        d = Vm,
        y = _m,
        b = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (i = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (d = t.onCaughtError),
          t.onRecoverableError !== void 0 && (y = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (b = t.unstable_transitionCallbacks)),
        (t = lg(e, 1, !1, null, null, i, l, u, d, y, b, null)),
        (e[Ba] = t.current),
        cc(e),
        new Rc(t)
      );
    }),
    (Us.hydrateRoot = function (e, t, i) {
      if (!o(e)) throw Error(r(299));
      var l = !1,
        u = "",
        d = Lm,
        y = Vm,
        b = _m,
        w = null,
        z = null;
      return (
        i != null &&
          (i.unstable_strictMode === !0 && (l = !0),
          i.identifierPrefix !== void 0 && (u = i.identifierPrefix),
          i.onUncaughtError !== void 0 && (d = i.onUncaughtError),
          i.onCaughtError !== void 0 && (y = i.onCaughtError),
          i.onRecoverableError !== void 0 && (b = i.onRecoverableError),
          i.unstable_transitionCallbacks !== void 0 &&
            (w = i.unstable_transitionCallbacks),
          i.formState !== void 0 && (z = i.formState)),
        (t = lg(e, 1, !0, t, i ?? null, l, u, d, y, b, w, z)),
        (t.context = og(null)),
        (i = t.current),
        (l = Vt()),
        (l = xo(l)),
        (u = Gn(l)),
        (u.callback = null),
        Yn(i, u, l),
        (i = l),
        (t.current.lanes = i),
        Hi(t, i),
        on(t),
        (e[Ba] = t.current),
        cc(e),
        new Ml(t)
      );
    }),
    (Us.version = "19.1.0"),
    Us
  );
}
var Og;
function RS() {
  if (Og) return Nc.exports;
  Og = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return (n(), (Nc.exports = OS()), Nc.exports);
}
var DS = RS(),
  Bs = {},
  Rg;
function MS() {
  if (Rg) return Bs;
  ((Rg = 1),
    Object.defineProperty(Bs, "__esModule", { value: !0 }),
    (Bs.parse = f),
    (Bs.serialize = h));
  const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    a = /^[\u0021-\u003A\u003C-\u007E]*$/,
    s =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    r = /^[\u0020-\u003A\u003D-\u007E]*$/,
    o = Object.prototype.toString,
    c = (() => {
      const x = function () {};
      return ((x.prototype = Object.create(null)), x);
    })();
  function f(x, T) {
    const E = new c(),
      M = x.length;
    if (M < 2) return E;
    const N = (T == null ? void 0 : T.decode) || g;
    let R = 0;
    do {
      const G = x.indexOf("=", R);
      if (G === -1) break;
      const V = x.indexOf(";", R),
        Q = V === -1 ? M : V;
      if (G > Q) {
        R = x.lastIndexOf(";", G - 1) + 1;
        continue;
      }
      const q = m(x, R, G),
        ae = p(x, G, q),
        te = x.slice(q, ae);
      if (E[te] === void 0) {
        let k = m(x, G + 1, Q),
          j = p(x, Q, k);
        const H = N(x.slice(k, j));
        E[te] = H;
      }
      R = Q + 1;
    } while (R < M);
    return E;
  }
  function m(x, T, E) {
    do {
      const M = x.charCodeAt(T);
      if (M !== 32 && M !== 9) return T;
    } while (++T < E);
    return E;
  }
  function p(x, T, E) {
    for (; T > E; ) {
      const M = x.charCodeAt(--T);
      if (M !== 32 && M !== 9) return T + 1;
    }
    return E;
  }
  function h(x, T, E) {
    const M = (E == null ? void 0 : E.encode) || encodeURIComponent;
    if (!n.test(x)) throw new TypeError(`argument name is invalid: ${x}`);
    const N = M(T);
    if (!a.test(N)) throw new TypeError(`argument val is invalid: ${T}`);
    let R = x + "=" + N;
    if (!E) return R;
    if (E.maxAge !== void 0) {
      if (!Number.isInteger(E.maxAge))
        throw new TypeError(`option maxAge is invalid: ${E.maxAge}`);
      R += "; Max-Age=" + E.maxAge;
    }
    if (E.domain) {
      if (!s.test(E.domain))
        throw new TypeError(`option domain is invalid: ${E.domain}`);
      R += "; Domain=" + E.domain;
    }
    if (E.path) {
      if (!r.test(E.path))
        throw new TypeError(`option path is invalid: ${E.path}`);
      R += "; Path=" + E.path;
    }
    if (E.expires) {
      if (!v(E.expires) || !Number.isFinite(E.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${E.expires}`);
      R += "; Expires=" + E.expires.toUTCString();
    }
    if (
      (E.httpOnly && (R += "; HttpOnly"),
      E.secure && (R += "; Secure"),
      E.partitioned && (R += "; Partitioned"),
      E.priority)
    )
      switch (
        typeof E.priority == "string" ? E.priority.toLowerCase() : void 0
      ) {
        case "low":
          R += "; Priority=Low";
          break;
        case "medium":
          R += "; Priority=Medium";
          break;
        case "high":
          R += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${E.priority}`);
      }
    if (E.sameSite)
      switch (
        typeof E.sameSite == "string" ? E.sameSite.toLowerCase() : E.sameSite
      ) {
        case !0:
        case "strict":
          R += "; SameSite=Strict";
          break;
        case "lax":
          R += "; SameSite=Lax";
          break;
        case "none":
          R += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${E.sameSite}`);
      }
    return R;
  }
  function g(x) {
    if (x.indexOf("%") === -1) return x;
    try {
      return decodeURIComponent(x);
    } catch {
      return x;
    }
  }
  function v(x) {
    return o.call(x) === "[object Date]";
  }
  return Bs;
}
MS();
var Dg = "popstate";
function NS(n = {}) {
  function a(r, o) {
    let { pathname: c, search: f, hash: m } = r.location;
    return sf(
      "",
      { pathname: c, search: f, hash: m },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default",
    );
  }
  function s(r, o) {
    return typeof o == "string" ? o : er(o);
  }
  return LS(a, s, null, n);
}
function He(n, a) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(a);
}
function hn(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {}
  }
}
function jS() {
  return Math.random().toString(36).substring(2, 10);
}
function Mg(n, a) {
  return { usr: n.state, key: n.key, idx: a };
}
function sf(n, a, s = null, r) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...(typeof a == "string" ? Vi(a) : a),
    state: s,
    key: (a && a.key) || r || jS(),
  };
}
function er({ pathname: n = "/", search: a = "", hash: s = "" }) {
  return (
    a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a),
    s && s !== "#" && (n += s.charAt(0) === "#" ? s : "#" + s),
    n
  );
}
function Vi(n) {
  let a = {};
  if (n) {
    let s = n.indexOf("#");
    s >= 0 && ((a.hash = n.substring(s)), (n = n.substring(0, s)));
    let r = n.indexOf("?");
    (r >= 0 && ((a.search = n.substring(r)), (n = n.substring(0, r))),
      n && (a.pathname = n));
  }
  return a;
}
function LS(n, a, s, r = {}) {
  let { window: o = document.defaultView, v5Compat: c = !1 } = r,
    f = o.history,
    m = "POP",
    p = null,
    h = g();
  h == null && ((h = 0), f.replaceState({ ...f.state, idx: h }, ""));
  function g() {
    return (f.state || { idx: null }).idx;
  }
  function v() {
    m = "POP";
    let N = g(),
      R = N == null ? null : N - h;
    ((h = N), p && p({ action: m, location: M.location, delta: R }));
  }
  function x(N, R) {
    m = "PUSH";
    let G = sf(M.location, N, R);
    h = g() + 1;
    let V = Mg(G, h),
      Q = M.createHref(G);
    try {
      f.pushState(V, "", Q);
    } catch (q) {
      if (q instanceof DOMException && q.name === "DataCloneError") throw q;
      o.location.assign(Q);
    }
    c && p && p({ action: m, location: M.location, delta: 1 });
  }
  function T(N, R) {
    m = "REPLACE";
    let G = sf(M.location, N, R);
    h = g();
    let V = Mg(G, h),
      Q = M.createHref(G);
    (f.replaceState(V, "", Q),
      c && p && p({ action: m, location: M.location, delta: 0 }));
  }
  function E(N) {
    return VS(N);
  }
  let M = {
    get action() {
      return m;
    },
    get location() {
      return n(o, f);
    },
    listen(N) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(Dg, v),
        (p = N),
        () => {
          (o.removeEventListener(Dg, v), (p = null));
        }
      );
    },
    createHref(N) {
      return a(o, N);
    },
    createURL: E,
    encodeLocation(N) {
      let R = E(N);
      return { pathname: R.pathname, search: R.search, hash: R.hash };
    },
    push: x,
    replace: T,
    go(N) {
      return f.go(N);
    },
  };
  return M;
}
function VS(n, a = !1) {
  let s = "http://localhost";
  (typeof window < "u" &&
    (s =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    He(s, "No window.location.(origin|href) available to create URL"));
  let r = typeof n == "string" ? n : er(n);
  return (
    (r = r.replace(/ $/, "%20")),
    !a && r.startsWith("//") && (r = s + r),
    new URL(r, s)
  );
}
function kv(n, a, s = "/") {
  return _S(n, a, s, !1);
}
function _S(n, a, s, r) {
  let o = typeof a == "string" ? Vi(a) : a,
    c = Vn(o.pathname || "/", s);
  if (c == null) return null;
  let f = Pv(n);
  zS(f);
  let m = null;
  for (let p = 0; m == null && p < f.length; ++p) {
    let h = $S(c);
    m = KS(f[p], h, r);
  }
  return m;
}
function Pv(n, a = [], s = [], r = "") {
  let o = (c, f, m) => {
    let p = {
      relativePath: m === void 0 ? c.path || "" : m,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: f,
      route: c,
    };
    p.relativePath.startsWith("/") &&
      (He(
        p.relativePath.startsWith(r),
        `Absolute route path "${p.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (p.relativePath = p.relativePath.slice(r.length)));
    let h = Ln([r, p.relativePath]),
      g = s.concat(p);
    (c.children &&
      c.children.length > 0 &&
      (He(
        c.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${h}".`,
      ),
      Pv(c.children, a, g, h)),
      !(c.path == null && !c.index) &&
        a.push({ path: h, score: YS(h, c.index), routesMeta: g }));
  };
  return (
    n.forEach((c, f) => {
      var m;
      if (c.path === "" || !((m = c.path) != null && m.includes("?"))) o(c, f);
      else for (let p of Hv(c.path)) o(c, f, p);
    }),
    a
  );
}
function Hv(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [s, ...r] = a,
    o = s.endsWith("?"),
    c = s.replace(/\?$/, "");
  if (r.length === 0) return o ? [c, ""] : [c];
  let f = Hv(r.join("/")),
    m = [];
  return (
    m.push(...f.map((p) => (p === "" ? c : [c, p].join("/")))),
    o && m.push(...f),
    m.map((p) => (n.startsWith("/") && p === "" ? "/" : p))
  );
}
function zS(n) {
  n.sort((a, s) =>
    a.score !== s.score
      ? s.score - a.score
      : qS(
          a.routesMeta.map((r) => r.childrenIndex),
          s.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
var US = /^:[\w-]+$/,
  BS = 3,
  kS = 2,
  PS = 1,
  HS = 10,
  GS = -2,
  Ng = (n) => n === "*";
function YS(n, a) {
  let s = n.split("/"),
    r = s.length;
  return (
    s.some(Ng) && (r += GS),
    a && (r += kS),
    s
      .filter((o) => !Ng(o))
      .reduce((o, c) => o + (US.test(c) ? BS : c === "" ? PS : HS), r)
  );
}
function qS(n, a) {
  return n.length === a.length && n.slice(0, -1).every((r, o) => r === a[o])
    ? n[n.length - 1] - a[a.length - 1]
    : 0;
}
function KS(n, a, s = !1) {
  let { routesMeta: r } = n,
    o = {},
    c = "/",
    f = [];
  for (let m = 0; m < r.length; ++m) {
    let p = r[m],
      h = m === r.length - 1,
      g = c === "/" ? a : a.slice(c.length) || "/",
      v = $l(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: h },
        g,
      ),
      x = p.route;
    if (
      (!v &&
        h &&
        s &&
        !r[r.length - 1].route.index &&
        (v = $l(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          g,
        )),
      !v)
    )
      return null;
    (Object.assign(o, v.params),
      f.push({
        params: o,
        pathname: Ln([c, v.pathname]),
        pathnameBase: IS(Ln([c, v.pathnameBase])),
        route: x,
      }),
      v.pathnameBase !== "/" && (c = Ln([c, v.pathnameBase])));
  }
  return f;
}
function $l(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [s, r] = FS(n.path, n.caseSensitive, n.end),
    o = a.match(s);
  if (!o) return null;
  let c = o[0],
    f = c.replace(/(.)\/+$/, "$1"),
    m = o.slice(1);
  return {
    params: r.reduce((h, { paramName: g, isOptional: v }, x) => {
      if (g === "*") {
        let E = m[x] || "";
        f = c.slice(0, c.length - E.length).replace(/(.)\/+$/, "$1");
      }
      const T = m[x];
      return (
        v && !T ? (h[g] = void 0) : (h[g] = (T || "").replace(/%2F/g, "/")),
        h
      );
    }, {}),
    pathname: c,
    pathnameBase: f,
    pattern: n,
  };
}
function FS(n, a = !1, s = !0) {
  hn(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`,
  );
  let r = [],
    o =
      "^" +
      n
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (f, m, p) => (
            r.push({ paramName: m, isOptional: p != null }),
            p ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    n.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
        ? (o += "\\/*$")
        : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, a ? void 0 : "i"), r]
  );
}
function $S(n) {
  try {
    return n
      .split("/")
      .map((a) => decodeURIComponent(a).replace(/\//g, "%2F"))
      .join("/");
  } catch (a) {
    return (
      hn(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`,
      ),
      n
    );
  }
}
function Vn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase())) return null;
  let s = a.endsWith("/") ? a.length - 1 : a.length,
    r = n.charAt(s);
  return r && r !== "/" ? null : n.slice(s) || "/";
}
function XS(n, a = "/") {
  let {
    pathname: s,
    search: r = "",
    hash: o = "",
  } = typeof n == "string" ? Vi(n) : n;
  return {
    pathname: s ? (s.startsWith("/") ? s : ZS(s, a)) : a,
    search: JS(r),
    hash: WS(o),
  };
}
function ZS(n, a) {
  let s = a.replace(/\/+$/, "").split("/");
  return (
    n.split("/").forEach((o) => {
      o === ".." ? s.length > 1 && s.pop() : o !== "." && s.push(o);
    }),
    s.length > 1 ? s.join("/") : "/"
  );
}
function _c(n, a, s, r) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function QS(n) {
  return n.filter(
    (a, s) => s === 0 || (a.route.path && a.route.path.length > 0),
  );
}
function Gv(n) {
  let a = QS(n);
  return a.map((s, r) => (r === a.length - 1 ? s.pathname : s.pathnameBase));
}
function Yv(n, a, s, r = !1) {
  let o;
  typeof n == "string"
    ? (o = Vi(n))
    : ((o = { ...n }),
      He(
        !o.pathname || !o.pathname.includes("?"),
        _c("?", "pathname", "search", o),
      ),
      He(
        !o.pathname || !o.pathname.includes("#"),
        _c("#", "pathname", "hash", o),
      ),
      He(!o.search || !o.search.includes("#"), _c("#", "search", "hash", o)));
  let c = n === "" || o.pathname === "",
    f = c ? "/" : o.pathname,
    m;
  if (f == null) m = s;
  else {
    let v = a.length - 1;
    if (!r && f.startsWith("..")) {
      let x = f.split("/");
      for (; x[0] === ".."; ) (x.shift(), (v -= 1));
      o.pathname = x.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let p = XS(o, m),
    h = f && f !== "/" && f.endsWith("/"),
    g = (c || f === ".") && s.endsWith("/");
  return (!p.pathname.endsWith("/") && (h || g) && (p.pathname += "/"), p);
}
var Ln = (n) => n.join("/").replace(/\/\/+/g, "/"),
  IS = (n) => n.replace(/\/+$/, "").replace(/^\/*/, "/"),
  JS = (n) => (!n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n),
  WS = (n) => (!n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n);
function eT(n) {
  return (
    n != null &&
    typeof n.status == "number" &&
    typeof n.statusText == "string" &&
    typeof n.internal == "boolean" &&
    "data" in n
  );
}
var qv = ["POST", "PUT", "PATCH", "DELETE"];
new Set(qv);
var tT = ["GET", ...qv];
new Set(tT);
var _i = C.createContext(null);
_i.displayName = "DataRouter";
var lo = C.createContext(null);
lo.displayName = "DataRouterState";
var Kv = C.createContext({ isTransitioning: !1 });
Kv.displayName = "ViewTransition";
var nT = C.createContext(new Map());
nT.displayName = "Fetchers";
var aT = C.createContext(null);
aT.displayName = "Await";
var pn = C.createContext(null);
pn.displayName = "Navigation";
var ur = C.createContext(null);
ur.displayName = "Location";
var gn = C.createContext({ outlet: null, matches: [], isDataRoute: !1 });
gn.displayName = "Route";
var zf = C.createContext(null);
zf.displayName = "RouteError";
function iT(n, { relative: a } = {}) {
  He(
    cr(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: s, navigator: r } = C.useContext(pn),
    { hash: o, pathname: c, search: f } = fr(n, { relative: a }),
    m = c;
  return (
    s !== "/" && (m = c === "/" ? s : Ln([s, c])),
    r.createHref({ pathname: m, search: f, hash: o })
  );
}
function cr() {
  return C.useContext(ur) != null;
}
function zn() {
  return (
    He(
      cr(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    C.useContext(ur).location
  );
}
var Fv =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function $v(n) {
  C.useContext(pn).static || C.useLayoutEffect(n);
}
function oo() {
  let { isDataRoute: n } = C.useContext(gn);
  return n ? vT() : sT();
}
function sT() {
  He(
    cr(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let n = C.useContext(_i),
    { basename: a, navigator: s } = C.useContext(pn),
    { matches: r } = C.useContext(gn),
    { pathname: o } = zn(),
    c = JSON.stringify(Gv(r)),
    f = C.useRef(!1);
  return (
    $v(() => {
      f.current = !0;
    }),
    C.useCallback(
      (p, h = {}) => {
        if ((hn(f.current, Fv), !f.current)) return;
        if (typeof p == "number") {
          s.go(p);
          return;
        }
        let g = Yv(p, JSON.parse(c), o, h.relative === "path");
        (n == null &&
          a !== "/" &&
          (g.pathname = g.pathname === "/" ? a : Ln([a, g.pathname])),
          (h.replace ? s.replace : s.push)(g, h.state, h));
      },
      [a, s, c, o, n],
    )
  );
}
C.createContext(null);
function rT() {
  let { matches: n } = C.useContext(gn),
    a = n[n.length - 1];
  return a ? a.params : {};
}
function fr(n, { relative: a } = {}) {
  let { matches: s } = C.useContext(gn),
    { pathname: r } = zn(),
    o = JSON.stringify(Gv(s));
  return C.useMemo(() => Yv(n, JSON.parse(o), r, a === "path"), [n, o, r, a]);
}
function lT(n, a) {
  return Xv(n, a);
}
function Xv(n, a, s, r) {
  var G;
  He(
    cr(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: o, static: c } = C.useContext(pn),
    { matches: f } = C.useContext(gn),
    m = f[f.length - 1],
    p = m ? m.params : {},
    h = m ? m.pathname : "/",
    g = m ? m.pathnameBase : "/",
    v = m && m.route;
  {
    let V = (v && v.path) || "";
    Zv(
      h,
      !v || V.endsWith("*") || V.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${V}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${V}"> to <Route path="${V === "/" ? "*" : `${V}/*`}">.`,
    );
  }
  let x = zn(),
    T;
  if (a) {
    let V = typeof a == "string" ? Vi(a) : a;
    (He(
      g === "/" || ((G = V.pathname) == null ? void 0 : G.startsWith(g)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${V.pathname}" was given in the \`location\` prop.`,
    ),
      (T = V));
  } else T = x;
  let E = T.pathname || "/",
    M = E;
  if (g !== "/") {
    let V = g.replace(/^\//, "").split("/");
    M = "/" + E.replace(/^\//, "").split("/").slice(V.length).join("/");
  }
  let N =
    !c && s && s.matches && s.matches.length > 0
      ? s.matches
      : kv(n, { pathname: M });
  (hn(
    v || N != null,
    `No routes matched location "${T.pathname}${T.search}${T.hash}" `,
  ),
    hn(
      N == null ||
        N[N.length - 1].route.element !== void 0 ||
        N[N.length - 1].route.Component !== void 0 ||
        N[N.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${T.pathname}${T.search}${T.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let R = dT(
    N &&
      N.map((V) =>
        Object.assign({}, V, {
          params: Object.assign({}, p, V.params),
          pathname: Ln([
            g,
            o.encodeLocation
              ? o.encodeLocation(V.pathname).pathname
              : V.pathname,
          ]),
          pathnameBase:
            V.pathnameBase === "/"
              ? g
              : Ln([
                  g,
                  o.encodeLocation
                    ? o.encodeLocation(V.pathnameBase).pathname
                    : V.pathnameBase,
                ]),
        }),
      ),
    f,
    s,
    r,
  );
  return a && R
    ? C.createElement(
        ur.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...T,
            },
            navigationType: "POP",
          },
        },
        R,
      )
    : R;
}
function oT() {
  let n = yT(),
    a = eT(n)
      ? `${n.status} ${n.statusText}`
      : n instanceof Error
        ? n.message
        : JSON.stringify(n),
    s = n instanceof Error ? n.stack : null,
    r = "rgba(200,200,200, 0.5)",
    o = { padding: "0.5rem", backgroundColor: r },
    c = { padding: "2px 4px", backgroundColor: r },
    f = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", n),
    (f = C.createElement(
      C.Fragment,
      null,
      C.createElement("p", null, "💿 Hey developer 👋"),
      C.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        C.createElement("code", { style: c }, "ErrorBoundary"),
        " or",
        " ",
        C.createElement("code", { style: c }, "errorElement"),
        " prop on your route.",
      ),
    )),
    C.createElement(
      C.Fragment,
      null,
      C.createElement("h2", null, "Unexpected Application Error!"),
      C.createElement("h3", { style: { fontStyle: "italic" } }, a),
      s ? C.createElement("pre", { style: o }, s) : null,
      f,
    )
  );
}
var uT = C.createElement(oT, null),
  cT = class extends C.Component {
    constructor(n) {
      (super(n),
        (this.state = {
          location: n.location,
          revalidation: n.revalidation,
          error: n.error,
        }));
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, a) {
      return a.location !== n.location ||
        (a.revalidation !== "idle" && n.revalidation === "idle")
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : a.error,
            location: a.location,
            revalidation: n.revalidation || a.revalidation,
          };
    }
    componentDidCatch(n, a) {
      console.error(
        "React Router caught the following error during render",
        n,
        a,
      );
    }
    render() {
      return this.state.error !== void 0
        ? C.createElement(
            gn.Provider,
            { value: this.props.routeContext },
            C.createElement(zf.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function fT({ routeContext: n, match: a, children: s }) {
  let r = C.useContext(_i);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (a.route.errorElement || a.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = a.route.id),
    C.createElement(gn.Provider, { value: n }, s)
  );
}
function dT(n, a = [], s = null, r = null) {
  if (n == null) {
    if (!s) return null;
    if (s.errors) n = s.matches;
    else if (a.length === 0 && !s.initialized && s.matches.length > 0)
      n = s.matches;
    else return null;
  }
  let o = n,
    c = s == null ? void 0 : s.errors;
  if (c != null) {
    let p = o.findIndex(
      (h) => h.route.id && (c == null ? void 0 : c[h.route.id]) !== void 0,
    );
    (He(
      p >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`,
    ),
      (o = o.slice(0, Math.min(o.length, p + 1))));
  }
  let f = !1,
    m = -1;
  if (s)
    for (let p = 0; p < o.length; p++) {
      let h = o[p];
      if (
        ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (m = p),
        h.route.id)
      ) {
        let { loaderData: g, errors: v } = s,
          x =
            h.route.loader &&
            !g.hasOwnProperty(h.route.id) &&
            (!v || v[h.route.id] === void 0);
        if (h.route.lazy || x) {
          ((f = !0), m >= 0 ? (o = o.slice(0, m + 1)) : (o = [o[0]]));
          break;
        }
      }
    }
  return o.reduceRight((p, h, g) => {
    let v,
      x = !1,
      T = null,
      E = null;
    s &&
      ((v = c && h.route.id ? c[h.route.id] : void 0),
      (T = h.route.errorElement || uT),
      f &&
        (m < 0 && g === 0
          ? (Zv(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (x = !0),
            (E = null))
          : m === g &&
            ((x = !0), (E = h.route.hydrateFallbackElement || null))));
    let M = a.concat(o.slice(0, g + 1)),
      N = () => {
        let R;
        return (
          v
            ? (R = T)
            : x
              ? (R = E)
              : h.route.Component
                ? (R = C.createElement(h.route.Component, null))
                : h.route.element
                  ? (R = h.route.element)
                  : (R = p),
          C.createElement(fT, {
            match: h,
            routeContext: { outlet: p, matches: M, isDataRoute: s != null },
            children: R,
          })
        );
      };
    return s && (h.route.ErrorBoundary || h.route.errorElement || g === 0)
      ? C.createElement(cT, {
          location: s.location,
          revalidation: s.revalidation,
          component: T,
          error: v,
          children: N(),
          routeContext: { outlet: null, matches: M, isDataRoute: !0 },
        })
      : N();
  }, null);
}
function Uf(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function hT(n) {
  let a = C.useContext(_i);
  return (He(a, Uf(n)), a);
}
function mT(n) {
  let a = C.useContext(lo);
  return (He(a, Uf(n)), a);
}
function pT(n) {
  let a = C.useContext(gn);
  return (He(a, Uf(n)), a);
}
function Bf(n) {
  let a = pT(n),
    s = a.matches[a.matches.length - 1];
  return (
    He(
      s.route.id,
      `${n} can only be used on routes that contain a unique "id"`,
    ),
    s.route.id
  );
}
function gT() {
  return Bf("useRouteId");
}
function yT() {
  var r;
  let n = C.useContext(zf),
    a = mT("useRouteError"),
    s = Bf("useRouteError");
  return n !== void 0 ? n : (r = a.errors) == null ? void 0 : r[s];
}
function vT() {
  let { router: n } = hT("useNavigate"),
    a = Bf("useNavigate"),
    s = C.useRef(!1);
  return (
    $v(() => {
      s.current = !0;
    }),
    C.useCallback(
      async (o, c = {}) => {
        (hn(s.current, Fv),
          s.current &&
            (typeof o == "number"
              ? n.navigate(o)
              : await n.navigate(o, { fromRouteId: a, ...c })));
      },
      [n, a],
    )
  );
}
var jg = {};
function Zv(n, a, s) {
  !a && !jg[n] && ((jg[n] = !0), hn(!1, s));
}
C.memo(xT);
function xT({ routes: n, future: a, state: s }) {
  return Xv(n, void 0, s, a);
}
function Ci(n) {
  He(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function bT({
  basename: n = "/",
  children: a = null,
  location: s,
  navigationType: r = "POP",
  navigator: o,
  static: c = !1,
}) {
  He(
    !cr(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let f = n.replace(/^\/*/, "/"),
    m = C.useMemo(
      () => ({ basename: f, navigator: o, static: c, future: {} }),
      [f, o, c],
    );
  typeof s == "string" && (s = Vi(s));
  let {
      pathname: p = "/",
      search: h = "",
      hash: g = "",
      state: v = null,
      key: x = "default",
    } = s,
    T = C.useMemo(() => {
      let E = Vn(p, f);
      return E == null
        ? null
        : {
            location: { pathname: E, search: h, hash: g, state: v, key: x },
            navigationType: r,
          };
    }, [f, p, h, g, v, x, r]);
  return (
    hn(
      T != null,
      `<Router basename="${f}"> is not able to match the URL "${p}${h}${g}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    T == null
      ? null
      : C.createElement(
          pn.Provider,
          { value: m },
          C.createElement(ur.Provider, { children: a, value: T }),
        )
  );
}
function ST({ children: n, location: a }) {
  return lT(rf(n), a);
}
function rf(n, a = []) {
  let s = [];
  return (
    C.Children.forEach(n, (r, o) => {
      if (!C.isValidElement(r)) return;
      let c = [...a, o];
      if (r.type === C.Fragment) {
        s.push.apply(s, rf(r.props.children, c));
        return;
      }
      (He(
        r.type === Ci,
        `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        He(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes.",
        ));
      let f = {
        id: r.props.id || c.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (f.children = rf(r.props.children, c)), s.push(f));
    }),
    s
  );
}
var Bl = "get",
  kl = "application/x-www-form-urlencoded";
function uo(n) {
  return n != null && typeof n.tagName == "string";
}
function TT(n) {
  return uo(n) && n.tagName.toLowerCase() === "button";
}
function ET(n) {
  return uo(n) && n.tagName.toLowerCase() === "form";
}
function wT(n) {
  return uo(n) && n.tagName.toLowerCase() === "input";
}
function AT(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function CT(n, a) {
  return n.button === 0 && (!a || a === "_self") && !AT(n);
}
var jl = null;
function OT() {
  if (jl === null)
    try {
      (new FormData(document.createElement("form"), 0), (jl = !1));
    } catch {
      jl = !0;
    }
  return jl;
}
var RT = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function zc(n) {
  return n != null && !RT.has(n)
    ? (hn(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${kl}"`,
      ),
      null)
    : n;
}
function DT(n, a) {
  let s, r, o, c, f;
  if (ET(n)) {
    let m = n.getAttribute("action");
    ((r = m ? Vn(m, a) : null),
      (s = n.getAttribute("method") || Bl),
      (o = zc(n.getAttribute("enctype")) || kl),
      (c = new FormData(n)));
  } else if (TT(n) || (wT(n) && (n.type === "submit" || n.type === "image"))) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let p = n.getAttribute("formaction") || m.getAttribute("action");
    if (
      ((r = p ? Vn(p, a) : null),
      (s = n.getAttribute("formmethod") || m.getAttribute("method") || Bl),
      (o =
        zc(n.getAttribute("formenctype")) ||
        zc(m.getAttribute("enctype")) ||
        kl),
      (c = new FormData(m, n)),
      !OT())
    ) {
      let { name: h, type: g, value: v } = n;
      if (g === "image") {
        let x = h ? `${h}.` : "";
        (c.append(`${x}x`, "0"), c.append(`${x}y`, "0"));
      } else h && c.append(h, v);
    }
  } else {
    if (uo(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((s = Bl), (r = null), (o = kl), (f = n));
  }
  return (
    c && o === "text/plain" && ((f = c), (c = void 0)),
    { action: r, method: s.toLowerCase(), encType: o, formData: c, body: f }
  );
}
function kf(n, a) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(a);
}
async function MT(n, a) {
  if (n.id in a) return a[n.id];
  try {
    let s = await import(n.module);
    return ((a[n.id] = s), s);
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${n.module}\`, reloading page...`,
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function NT(n) {
  return n == null
    ? !1
    : n.href == null
      ? n.rel === "preload" &&
        typeof n.imageSrcSet == "string" &&
        typeof n.imageSizes == "string"
      : typeof n.rel == "string" && typeof n.href == "string";
}
async function jT(n, a, s) {
  let r = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let f = await MT(c, s);
        return f.links ? f.links() : [];
      }
      return [];
    }),
  );
  return zT(
    r
      .flat(1)
      .filter(NT)
      .filter((o) => o.rel === "stylesheet" || o.rel === "preload")
      .map((o) =>
        o.rel === "stylesheet"
          ? { ...o, rel: "prefetch", as: "style" }
          : { ...o, rel: "prefetch" },
      ),
  );
}
function Lg(n, a, s, r, o, c) {
  let f = (p, h) => (s[h] ? p.route.id !== s[h].route.id : !0),
    m = (p, h) => {
      var g;
      return (
        s[h].pathname !== p.pathname ||
        (((g = s[h].route.path) == null ? void 0 : g.endsWith("*")) &&
          s[h].params["*"] !== p.params["*"])
      );
    };
  return c === "assets"
    ? a.filter((p, h) => f(p, h) || m(p, h))
    : c === "data"
      ? a.filter((p, h) => {
          var v;
          let g = r.routes[p.route.id];
          if (!g || !g.hasLoader) return !1;
          if (f(p, h) || m(p, h)) return !0;
          if (p.route.shouldRevalidate) {
            let x = p.route.shouldRevalidate({
              currentUrl: new URL(
                o.pathname + o.search + o.hash,
                window.origin,
              ),
              currentParams: ((v = s[0]) == null ? void 0 : v.params) || {},
              nextUrl: new URL(n, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof x == "boolean") return x;
          }
          return !0;
        })
      : [];
}
function LT(n, a, { includeHydrateFallback: s } = {}) {
  return VT(
    n
      .map((r) => {
        let o = a.routes[r.route.id];
        if (!o) return [];
        let c = [o.module];
        return (
          o.clientActionModule && (c = c.concat(o.clientActionModule)),
          o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)),
          s &&
            o.hydrateFallbackModule &&
            (c = c.concat(o.hydrateFallbackModule)),
          o.imports && (c = c.concat(o.imports)),
          c
        );
      })
      .flat(1),
  );
}
function VT(n) {
  return [...new Set(n)];
}
function _T(n) {
  let a = {},
    s = Object.keys(n).sort();
  for (let r of s) a[r] = n[r];
  return a;
}
function zT(n, a) {
  let s = new Set();
  return (
    new Set(a),
    n.reduce((r, o) => {
      let c = JSON.stringify(_T(o));
      return (s.has(c) || (s.add(c), r.push({ key: c, link: o })), r);
    }, [])
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var UT = new Set([100, 101, 204, 205]);
function BT(n, a) {
  let s =
    typeof n == "string"
      ? new URL(
          n,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : n;
  return (
    s.pathname === "/"
      ? (s.pathname = "_root.data")
      : a && Vn(s.pathname, a) === "/"
        ? (s.pathname = `${a.replace(/\/$/, "")}/_root.data`)
        : (s.pathname = `${s.pathname.replace(/\/$/, "")}.data`),
    s
  );
}
function Qv() {
  let n = C.useContext(_i);
  return (
    kf(
      n,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    n
  );
}
function kT() {
  let n = C.useContext(lo);
  return (
    kf(
      n,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    n
  );
}
var Pf = C.createContext(void 0);
Pf.displayName = "FrameworkContext";
function Iv() {
  let n = C.useContext(Pf);
  return (
    kf(n, "You must render this element inside a <HydratedRouter> element"),
    n
  );
}
function PT(n, a) {
  let s = C.useContext(Pf),
    [r, o] = C.useState(!1),
    [c, f] = C.useState(!1),
    {
      onFocus: m,
      onBlur: p,
      onMouseEnter: h,
      onMouseLeave: g,
      onTouchStart: v,
    } = a,
    x = C.useRef(null);
  (C.useEffect(() => {
    if ((n === "render" && f(!0), n === "viewport")) {
      let M = (R) => {
          R.forEach((G) => {
            f(G.isIntersecting);
          });
        },
        N = new IntersectionObserver(M, { threshold: 0.5 });
      return (
        x.current && N.observe(x.current),
        () => {
          N.disconnect();
        }
      );
    }
  }, [n]),
    C.useEffect(() => {
      if (r) {
        let M = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(M);
        };
      }
    }, [r]));
  let T = () => {
      o(!0);
    },
    E = () => {
      (o(!1), f(!1));
    };
  return s
    ? n !== "intent"
      ? [c, x, {}]
      : [
          c,
          x,
          {
            onFocus: ks(m, T),
            onBlur: ks(p, E),
            onMouseEnter: ks(h, T),
            onMouseLeave: ks(g, E),
            onTouchStart: ks(v, T),
          },
        ]
    : [!1, x, {}];
}
function ks(n, a) {
  return (s) => {
    (n && n(s), s.defaultPrevented || a(s));
  };
}
function HT({ page: n, ...a }) {
  let { router: s } = Qv(),
    r = C.useMemo(() => kv(s.routes, n, s.basename), [s.routes, n, s.basename]);
  return r ? C.createElement(YT, { page: n, matches: r, ...a }) : null;
}
function GT(n) {
  let { manifest: a, routeModules: s } = Iv(),
    [r, o] = C.useState([]);
  return (
    C.useEffect(() => {
      let c = !1;
      return (
        jT(n, a, s).then((f) => {
          c || o(f);
        }),
        () => {
          c = !0;
        }
      );
    }, [n, a, s]),
    r
  );
}
function YT({ page: n, matches: a, ...s }) {
  let r = zn(),
    { manifest: o, routeModules: c } = Iv(),
    { basename: f } = Qv(),
    { loaderData: m, matches: p } = kT(),
    h = C.useMemo(() => Lg(n, a, p, o, r, "data"), [n, a, p, o, r]),
    g = C.useMemo(() => Lg(n, a, p, o, r, "assets"), [n, a, p, o, r]),
    v = C.useMemo(() => {
      if (n === r.pathname + r.search + r.hash) return [];
      let E = new Set(),
        M = !1;
      if (
        (a.forEach((R) => {
          var V;
          let G = o.routes[R.route.id];
          !G ||
            !G.hasLoader ||
            ((!h.some((Q) => Q.route.id === R.route.id) &&
              R.route.id in m &&
              (V = c[R.route.id]) != null &&
              V.shouldRevalidate) ||
            G.hasClientLoader
              ? (M = !0)
              : E.add(R.route.id));
        }),
        E.size === 0)
      )
        return [];
      let N = BT(n, f);
      return (
        M &&
          E.size > 0 &&
          N.searchParams.set(
            "_routes",
            a
              .filter((R) => E.has(R.route.id))
              .map((R) => R.route.id)
              .join(","),
          ),
        [N.pathname + N.search]
      );
    }, [f, m, r, o, h, a, n, c]),
    x = C.useMemo(() => LT(g, o), [g, o]),
    T = GT(g);
  return C.createElement(
    C.Fragment,
    null,
    v.map((E) =>
      C.createElement("link", {
        key: E,
        rel: "prefetch",
        as: "fetch",
        href: E,
        ...s,
      }),
    ),
    x.map((E) =>
      C.createElement("link", { key: E, rel: "modulepreload", href: E, ...s }),
    ),
    T.map(({ key: E, link: M }) => C.createElement("link", { key: E, ...M })),
  );
}
function qT(...n) {
  return (a) => {
    n.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var Jv =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Jv && (window.__reactRouterVersion = "7.6.0");
} catch {}
function KT({ basename: n, children: a, window: s }) {
  let r = C.useRef();
  r.current == null && (r.current = NS({ window: s, v5Compat: !0 }));
  let o = r.current,
    [c, f] = C.useState({ action: o.action, location: o.location }),
    m = C.useCallback(
      (p) => {
        C.startTransition(() => f(p));
      },
      [f],
    );
  return (
    C.useLayoutEffect(() => o.listen(m), [o, m]),
    C.createElement(bT, {
      basename: n,
      children: a,
      location: c.location,
      navigationType: c.action,
      navigator: o,
    })
  );
}
var Wv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  La = C.forwardRef(function (
    {
      onClick: a,
      discover: s = "render",
      prefetch: r = "none",
      relative: o,
      reloadDocument: c,
      replace: f,
      state: m,
      target: p,
      to: h,
      preventScrollReset: g,
      viewTransition: v,
      ...x
    },
    T,
  ) {
    let { basename: E } = C.useContext(pn),
      M = typeof h == "string" && Wv.test(h),
      N,
      R = !1;
    if (typeof h == "string" && M && ((N = h), Jv))
      try {
        let j = new URL(window.location.href),
          H = h.startsWith("//") ? new URL(j.protocol + h) : new URL(h),
          I = Vn(H.pathname, E);
        H.origin === j.origin && I != null
          ? (h = I + H.search + H.hash)
          : (R = !0);
      } catch {
        hn(
          !1,
          `<Link to="${h}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let G = iT(h, { relative: o }),
      [V, Q, q] = PT(r, x),
      ae = ZT(h, {
        replace: f,
        state: m,
        target: p,
        preventScrollReset: g,
        relative: o,
        viewTransition: v,
      });
    function te(j) {
      (a && a(j), j.defaultPrevented || ae(j));
    }
    let k = C.createElement("a", {
      ...x,
      ...q,
      href: N || G,
      onClick: R || c ? a : te,
      ref: qT(T, Q),
      target: p,
      "data-discover": !M && s === "render" ? "true" : void 0,
    });
    return V && !M
      ? C.createElement(C.Fragment, null, k, C.createElement(HT, { page: G }))
      : k;
  });
La.displayName = "Link";
var FT = C.forwardRef(function (
  {
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: r = "",
    end: o = !1,
    style: c,
    to: f,
    viewTransition: m,
    children: p,
    ...h
  },
  g,
) {
  let v = fr(f, { relative: h.relative }),
    x = zn(),
    T = C.useContext(lo),
    { navigator: E, basename: M } = C.useContext(pn),
    N = T != null && eE(v) && m === !0,
    R = E.encodeLocation ? E.encodeLocation(v).pathname : v.pathname,
    G = x.pathname,
    V =
      T && T.navigation && T.navigation.location
        ? T.navigation.location.pathname
        : null;
  (s ||
    ((G = G.toLowerCase()),
    (V = V ? V.toLowerCase() : null),
    (R = R.toLowerCase())),
    V && M && (V = Vn(V, M) || V));
  const Q = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
  let q = G === R || (!o && G.startsWith(R) && G.charAt(Q) === "/"),
    ae =
      V != null &&
      (V === R || (!o && V.startsWith(R) && V.charAt(R.length) === "/")),
    te = { isActive: q, isPending: ae, isTransitioning: N },
    k = q ? a : void 0,
    j;
  typeof r == "function"
    ? (j = r(te))
    : (j = [
        r,
        q ? "active" : null,
        ae ? "pending" : null,
        N ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let H = typeof c == "function" ? c(te) : c;
  return C.createElement(
    La,
    {
      ...h,
      "aria-current": k,
      className: j,
      ref: g,
      style: H,
      to: f,
      viewTransition: m,
    },
    typeof p == "function" ? p(te) : p,
  );
});
FT.displayName = "NavLink";
var $T = C.forwardRef(
  (
    {
      discover: n = "render",
      fetcherKey: a,
      navigate: s,
      reloadDocument: r,
      replace: o,
      state: c,
      method: f = Bl,
      action: m,
      onSubmit: p,
      relative: h,
      preventScrollReset: g,
      viewTransition: v,
      ...x
    },
    T,
  ) => {
    let E = JT(),
      M = WT(m, { relative: h }),
      N = f.toLowerCase() === "get" ? "get" : "post",
      R = typeof m == "string" && Wv.test(m),
      G = (V) => {
        if ((p && p(V), V.defaultPrevented)) return;
        V.preventDefault();
        let Q = V.nativeEvent.submitter,
          q = (Q == null ? void 0 : Q.getAttribute("formmethod")) || f;
        E(Q || V.currentTarget, {
          fetcherKey: a,
          method: q,
          navigate: s,
          replace: o,
          state: c,
          relative: h,
          preventScrollReset: g,
          viewTransition: v,
        });
      };
    return C.createElement("form", {
      ref: T,
      method: N,
      action: M,
      onSubmit: r ? p : G,
      ...x,
      "data-discover": !R && n === "render" ? "true" : void 0,
    });
  },
);
$T.displayName = "Form";
function XT(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function e0(n) {
  let a = C.useContext(_i);
  return (He(a, XT(n)), a);
}
function ZT(
  n,
  {
    target: a,
    replace: s,
    state: r,
    preventScrollReset: o,
    relative: c,
    viewTransition: f,
  } = {},
) {
  let m = oo(),
    p = zn(),
    h = fr(n, { relative: c });
  return C.useCallback(
    (g) => {
      if (CT(g, a)) {
        g.preventDefault();
        let v = s !== void 0 ? s : er(p) === er(h);
        m(n, {
          replace: v,
          state: r,
          preventScrollReset: o,
          relative: c,
          viewTransition: f,
        });
      }
    },
    [p, m, h, s, r, a, n, o, c, f],
  );
}
var QT = 0,
  IT = () => `__${String(++QT)}__`;
function JT() {
  let { router: n } = e0("useSubmit"),
    { basename: a } = C.useContext(pn),
    s = gT();
  return C.useCallback(
    async (r, o = {}) => {
      let { action: c, method: f, encType: m, formData: p, body: h } = DT(r, a);
      if (o.navigate === !1) {
        let g = o.fetcherKey || IT();
        await n.fetch(g, s, o.action || c, {
          preventScrollReset: o.preventScrollReset,
          formData: p,
          body: h,
          formMethod: o.method || f,
          formEncType: o.encType || m,
          flushSync: o.flushSync,
        });
      } else
        await n.navigate(o.action || c, {
          preventScrollReset: o.preventScrollReset,
          formData: p,
          body: h,
          formMethod: o.method || f,
          formEncType: o.encType || m,
          replace: o.replace,
          state: o.state,
          fromRouteId: s,
          flushSync: o.flushSync,
          viewTransition: o.viewTransition,
        });
    },
    [n, a, s],
  );
}
function WT(n, { relative: a } = {}) {
  let { basename: s } = C.useContext(pn),
    r = C.useContext(gn);
  He(r, "useFormAction must be used inside a RouteContext");
  let [o] = r.matches.slice(-1),
    c = { ...fr(n || ".", { relative: a }) },
    f = zn();
  if (n == null) {
    c.search = f.search;
    let m = new URLSearchParams(c.search),
      p = m.getAll("index");
    if (p.some((g) => g === "")) {
      (m.delete("index"),
        p.filter((v) => v).forEach((v) => m.append("index", v)));
      let g = m.toString();
      c.search = g ? `?${g}` : "";
    }
  }
  return (
    (!n || n === ".") &&
      o.route.index &&
      (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (c.pathname = c.pathname === "/" ? s : Ln([s, c.pathname])),
    er(c)
  );
}
function eE(n, a = {}) {
  let s = C.useContext(Kv);
  He(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: r } = e0("useViewTransitionState"),
    o = fr(n, { relative: a.relative });
  if (!s.isTransitioning) return !1;
  let c = Vn(s.currentLocation.pathname, r) || s.currentLocation.pathname,
    f = Vn(s.nextLocation.pathname, r) || s.nextLocation.pathname;
  return $l(o.pathname, f) != null || $l(o.pathname, c) != null;
}
[...UT];
const tE = (n, a, s, r) => {
    var c, f, m, p;
    const o = [s, { code: a, ...(r || {}) }];
    if (
      (f = (c = n == null ? void 0 : n.services) == null ? void 0 : c.logger) !=
        null &&
      f.forward
    )
      return n.services.logger.forward(o, "warn", "react-i18next::", !0);
    (Va(o[0]) && (o[0] = `react-i18next:: ${o[0]}`),
      (p = (m = n == null ? void 0 : n.services) == null ? void 0 : m.logger) !=
        null && p.warn
        ? n.services.logger.warn(...o)
        : console != null && console.warn && console.warn(...o));
  },
  Vg = {},
  lf = (n, a, s, r) => {
    (Va(s) && Vg[s]) || (Va(s) && (Vg[s] = new Date()), tE(n, a, s, r));
  },
  t0 = (n, a) => () => {
    if (n.isInitialized) a();
    else {
      const s = () => {
        (setTimeout(() => {
          n.off("initialized", s);
        }, 0),
          a());
      };
      n.on("initialized", s);
    }
  },
  of = (n, a, s) => {
    n.loadNamespaces(a, t0(n, s));
  },
  _g = (n, a, s, r) => {
    if (
      (Va(s) && (s = [s]),
      n.options.preload && n.options.preload.indexOf(a) > -1)
    )
      return of(n, s, r);
    (s.forEach((o) => {
      n.options.ns.indexOf(o) < 0 && n.options.ns.push(o);
    }),
      n.loadLanguages(a, t0(n, r)));
  },
  nE = (n, a, s = {}) =>
    !a.languages || !a.languages.length
      ? (lf(a, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
          languages: a.languages,
        }),
        !0)
      : a.hasLoadedNamespace(n, {
          lng: s.lng,
          precheck: (r, o) => {
            var c;
            if (
              ((c = s.bindI18n) == null
                ? void 0
                : c.indexOf("languageChanging")) > -1 &&
              r.services.backendConnector.backend &&
              r.isLanguageChangingTo &&
              !o(r.isLanguageChangingTo, n)
            )
              return !1;
          },
        }),
  Va = (n) => typeof n == "string",
  aE = (n) => typeof n == "object" && n !== null,
  iE =
    /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
  sE = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
    "&nbsp;": " ",
    "&#160;": " ",
    "&copy;": "©",
    "&#169;": "©",
    "&reg;": "®",
    "&#174;": "®",
    "&hellip;": "…",
    "&#8230;": "…",
    "&#x2F;": "/",
    "&#47;": "/",
  },
  rE = (n) => sE[n],
  lE = (n) => n.replace(iE, rE);
let uf = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: lE,
};
const oE = (n = {}) => {
    uf = { ...uf, ...n };
  },
  uE = () => uf;
let n0;
const cE = (n) => {
    n0 = n;
  },
  fE = () => n0,
  dE = {
    type: "3rdParty",
    init(n) {
      (oE(n.options.react), cE(n));
    },
  },
  hE = C.createContext();
class mE {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(a) {
    a.forEach((s) => {
      this.usedNamespaces[s] || (this.usedNamespaces[s] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const pE = (n, a) => {
    const s = C.useRef();
    return (
      C.useEffect(() => {
        s.current = n;
      }, [n, a]),
      s.current
    );
  },
  a0 = (n, a, s, r) => n.getFixedT(a, s, r),
  gE = (n, a, s, r) => C.useCallback(a0(n, a, s, r), [n, a, s, r]),
  Ct = (n, a = {}) => {
    var Q, q, ae, te;
    const { i18n: s } = a,
      { i18n: r, defaultNS: o } = C.useContext(hE) || {},
      c = s || r || fE();
    if ((c && !c.reportNamespaces && (c.reportNamespaces = new mE()), !c)) {
      lf(
        c,
        "NO_I18NEXT_INSTANCE",
        "useTranslation: You will need to pass in an i18next instance by using initReactI18next",
      );
      const k = (H, I) =>
          Va(I)
            ? I
            : aE(I) && Va(I.defaultValue)
              ? I.defaultValue
              : Array.isArray(H)
                ? H[H.length - 1]
                : H,
        j = [k, {}, !1];
      return ((j.t = k), (j.i18n = {}), (j.ready = !1), j);
    }
    (Q = c.options.react) != null &&
      Q.wait &&
      lf(
        c,
        "DEPRECATED_OPTION",
        "useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.",
      );
    const f = { ...uE(), ...c.options.react, ...a },
      { useSuspense: m, keyPrefix: p } = f;
    let h = o || ((q = c.options) == null ? void 0 : q.defaultNS);
    ((h = Va(h) ? [h] : h || ["translation"]),
      (te = (ae = c.reportNamespaces).addUsedNamespaces) == null ||
        te.call(ae, h));
    const g =
        (c.isInitialized || c.initializedStoreOnce) &&
        h.every((k) => nE(k, c, f)),
      v = gE(c, a.lng || null, f.nsMode === "fallback" ? h : h[0], p),
      x = () => v,
      T = () => a0(c, a.lng || null, f.nsMode === "fallback" ? h : h[0], p),
      [E, M] = C.useState(x);
    let N = h.join();
    a.lng && (N = `${a.lng}${N}`);
    const R = pE(N),
      G = C.useRef(!0);
    (C.useEffect(() => {
      const { bindI18n: k, bindI18nStore: j } = f;
      ((G.current = !0),
        !g &&
          !m &&
          (a.lng
            ? _g(c, a.lng, h, () => {
                G.current && M(T);
              })
            : of(c, h, () => {
                G.current && M(T);
              })),
        g && R && R !== N && G.current && M(T));
      const H = () => {
        G.current && M(T);
      };
      return (
        k && (c == null || c.on(k, H)),
        j && (c == null || c.store.on(j, H)),
        () => {
          ((G.current = !1),
            c && (k == null || k.split(" ").forEach((I) => c.off(I, H))),
            j && c && j.split(" ").forEach((I) => c.store.off(I, H)));
        }
      );
    }, [c, N]),
      C.useEffect(() => {
        G.current && g && M(x);
      }, [c, p, g]));
    const V = [E, c, g];
    if (((V.t = E), (V.i18n = c), (V.ready = g), g || (!g && !m))) return V;
    throw new Promise((k) => {
      a.lng ? _g(c, a.lng, h, () => k()) : of(c, h, () => k());
    });
  };
function yE() {
  const { i18n: n, t: a } = Ct(),
    s = oo(),
    r = n.language === "ar";
  return A.jsxs("section", {
    className: `
        relative md:mt-[-50px] md:h-[110vh] w-full overflow-hidden
        flex items-center justify-center font-theme
      `,
    children: [
      A.jsx("div", {
        className: "w-full h-[400px] mt-[100px] md:h-full relative z-0",
        children: A.jsx("video", {
          className: "w-full h-full object-cover",
          autoPlay: !0,
          loop: !0,
          muted: !0,
          playsInline: !0,
          children: A.jsx("source", { src: "/hero.mp4", type: "video/mp4" }),
        }),
      }),
      A.jsx("div", {
        className:
          "absolute inset-0 z-10 flex items-end justify-center pb-[6%]",
        children: A.jsxs("button", {
          onClick: () => s("/contact"),
          className: `
            /* fluid font-size: from .875rem up to 1.25rem as viewport goes from 0→100vw */
            text-[clamp(0.875rem,2vw,1.25rem)]
            /* fluid horizontal padding: 0.75rem→1.5rem */
            px-[clamp(0.75rem,4vw,1.5rem)]
            /* fluid vertical padding: 0.5rem→1rem */
            py-[clamp(0.5rem,2vw,1rem)]

            flex items-center gap-2
            border border-theme
            rounded-lg
            bg-transparent text-theme
            font-medium
            transition-all duration-300 cursor-pointer
            hover:shadow-[inset_0_0_20px_rgba(255,238,212,0.6)]
          `,
          children: [
            A.jsx("span", { children: a("home.order") }),
            A.jsx("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "currentColor",
              stroke: "currentColor",
              strokeWidth: 2,
              className: `w-6 h-6 transform ${r ? "scale-x-[-1]" : ""}`,
              children: A.jsx("path", { d: "M9 5l7 7-7 7" }),
            }),
          ],
        }),
      }),
    ],
  });
}
const i0 = C.createContext({});
function dr(n) {
  const a = C.useRef(null);
  return (a.current === null && (a.current = n()), a.current);
}
const Hf = typeof window < "u",
  co = Hf ? C.useLayoutEffect : C.useEffect,
  Gf = C.createContext(null);
function Yf(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function qf(n, a) {
  const s = n.indexOf(a);
  s > -1 && n.splice(s, 1);
}
const mn = (n, a, s) => (s > a ? a : s < n ? n : s);
let vE = () => {},
  Kf = () => {};
const _n = {},
  s0 = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function r0(n) {
  return typeof n == "object" && n !== null;
}
const l0 = (n) => /^0[^.\s]+$/u.test(n);
function Ff(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const At = (n) => n,
  xE = (n, a) => (s) => a(n(s)),
  hr = (...n) => n.reduce(xE),
  ji = (n, a, s) => {
    const r = a - n;
    return r === 0 ? 1 : (s - n) / r;
  };
class $f {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return (Yf(this.subscriptions, a), () => qf(this.subscriptions, a));
  }
  notify(a, s, r) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1) this.subscriptions[0](a, s, r);
      else
        for (let c = 0; c < o; c++) {
          const f = this.subscriptions[c];
          f && f(a, s, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const cn = (n) => n * 1e3,
  fn = (n) => n / 1e3;
function Xf(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const o0 = (n, a, s) =>
    (((1 - 3 * s + 3 * a) * n + (3 * s - 6 * a)) * n + 3 * a) * n,
  bE = 1e-7,
  SE = 12;
function TE(n, a, s, r, o) {
  let c,
    f,
    m = 0;
  do ((f = a + (s - a) / 2), (c = o0(f, r, o) - n), c > 0 ? (s = f) : (a = f));
  while (Math.abs(c) > bE && ++m < SE);
  return f;
}
function mr(n, a, s, r) {
  if (n === a && s === r) return At;
  const o = (c) => TE(c, 0, 1, n, s);
  return (c) => (c === 0 || c === 1 ? c : o0(o(c), a, r));
}
const u0 = (n) => (a) => (a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2),
  c0 = (n) => (a) => 1 - n(1 - a),
  f0 = mr(0.33, 1.53, 0.69, 0.99),
  Zf = c0(f0),
  d0 = u0(Zf),
  h0 = (n) =>
    (n *= 2) < 1 ? 0.5 * Zf(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))),
  Qf = (n) => 1 - Math.sin(Math.acos(n)),
  m0 = c0(Qf),
  p0 = u0(Qf),
  EE = mr(0.42, 0, 1, 1),
  wE = mr(0, 0, 0.58, 1),
  g0 = mr(0.42, 0, 0.58, 1),
  AE = (n) => Array.isArray(n) && typeof n[0] != "number",
  y0 = (n) => Array.isArray(n) && typeof n[0] == "number",
  CE = {
    linear: At,
    easeIn: EE,
    easeInOut: g0,
    easeOut: wE,
    circIn: Qf,
    circInOut: p0,
    circOut: m0,
    backIn: Zf,
    backInOut: d0,
    backOut: f0,
    anticipate: h0,
  },
  OE = (n) => typeof n == "string",
  zg = (n) => {
    if (y0(n)) {
      Kf(n.length === 4);
      const [a, s, r, o] = n;
      return mr(a, s, r, o);
    } else if (OE(n)) return CE[n];
    return n;
  },
  Ll = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function RE(n, a) {
  let s = new Set(),
    r = new Set(),
    o = !1,
    c = !1;
  const f = new WeakSet();
  let m = { delta: 0, timestamp: 0, isProcessing: !1 };
  function p(g) {
    (f.has(g) && (h.schedule(g), n()), g(m));
  }
  const h = {
    schedule: (g, v = !1, x = !1) => {
      const E = x && o ? s : r;
      return (v && f.add(g), E.has(g) || E.add(g), g);
    },
    cancel: (g) => {
      (r.delete(g), f.delete(g));
    },
    process: (g) => {
      if (((m = g), o)) {
        c = !0;
        return;
      }
      ((o = !0),
        ([s, r] = [r, s]),
        s.forEach(p),
        s.clear(),
        (o = !1),
        c && ((c = !1), h.process(g)));
    },
  };
  return h;
}
const DE = 40;
function v0(n, a) {
  let s = !1,
    r = !0;
  const o = { delta: 0, timestamp: 0, isProcessing: !1 },
    c = () => (s = !0),
    f = Ll.reduce((V, Q) => ((V[Q] = RE(c)), V), {}),
    {
      setup: m,
      read: p,
      resolveKeyframes: h,
      preUpdate: g,
      update: v,
      preRender: x,
      render: T,
      postRender: E,
    } = f,
    M = () => {
      const V = _n.useManualTiming ? o.timestamp : performance.now();
      ((s = !1),
        _n.useManualTiming ||
          (o.delta = r ? 1e3 / 60 : Math.max(Math.min(V - o.timestamp, DE), 1)),
        (o.timestamp = V),
        (o.isProcessing = !0),
        m.process(o),
        p.process(o),
        h.process(o),
        g.process(o),
        v.process(o),
        x.process(o),
        T.process(o),
        E.process(o),
        (o.isProcessing = !1),
        s && a && ((r = !1), n(M)));
    },
    N = () => {
      ((s = !0), (r = !0), o.isProcessing || n(M));
    };
  return {
    schedule: Ll.reduce((V, Q) => {
      const q = f[Q];
      return (
        (V[Q] = (ae, te = !1, k = !1) => (s || N(), q.schedule(ae, te, k))),
        V
      );
    }, {}),
    cancel: (V) => {
      for (let Q = 0; Q < Ll.length; Q++) f[Ll[Q]].cancel(V);
    },
    state: o,
    steps: f,
  };
}
const {
  schedule: De,
  cancel: tn,
  state: it,
  steps: Uc,
} = v0(typeof requestAnimationFrame < "u" ? requestAnimationFrame : At, !0);
let Pl;
function ME() {
  Pl = void 0;
}
const wt = {
    now: () => (
      Pl === void 0 &&
        wt.set(
          it.isProcessing || _n.useManualTiming
            ? it.timestamp
            : performance.now(),
        ),
      Pl
    ),
    set: (n) => {
      ((Pl = n), queueMicrotask(ME));
    },
  },
  x0 = (n) => (a) => typeof a == "string" && a.startsWith(n),
  If = x0("--"),
  NE = x0("var(--"),
  Jf = (n) => (NE(n) ? jE.test(n.split("/*")[0].trim()) : !1),
  jE =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  zi = {
    test: (n) => typeof n == "number",
    parse: parseFloat,
    transform: (n) => n,
  },
  tr = { ...zi, transform: (n) => mn(0, 1, n) },
  Vl = { ...zi, default: 1 },
  Fs = (n) => Math.round(n * 1e5) / 1e5,
  Wf = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function LE(n) {
  return n == null;
}
const VE =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  ed = (n, a) => (s) =>
    !!(
      (typeof s == "string" && VE.test(s) && s.startsWith(n)) ||
      (a && !LE(s) && Object.prototype.hasOwnProperty.call(s, a))
    ),
  b0 = (n, a, s) => (r) => {
    if (typeof r != "string") return r;
    const [o, c, f, m] = r.match(Wf);
    return {
      [n]: parseFloat(o),
      [a]: parseFloat(c),
      [s]: parseFloat(f),
      alpha: m !== void 0 ? parseFloat(m) : 1,
    };
  },
  _E = (n) => mn(0, 255, n),
  Bc = { ...zi, transform: (n) => Math.round(_E(n)) },
  Na = {
    test: ed("rgb", "red"),
    parse: b0("red", "green", "blue"),
    transform: ({ red: n, green: a, blue: s, alpha: r = 1 }) =>
      "rgba(" +
      Bc.transform(n) +
      ", " +
      Bc.transform(a) +
      ", " +
      Bc.transform(s) +
      ", " +
      Fs(tr.transform(r)) +
      ")",
  };
function zE(n) {
  let a = "",
    s = "",
    r = "",
    o = "";
  return (
    n.length > 5
      ? ((a = n.substring(1, 3)),
        (s = n.substring(3, 5)),
        (r = n.substring(5, 7)),
        (o = n.substring(7, 9)))
      : ((a = n.substring(1, 2)),
        (s = n.substring(2, 3)),
        (r = n.substring(3, 4)),
        (o = n.substring(4, 5)),
        (a += a),
        (s += s),
        (r += r),
        (o += o)),
    {
      red: parseInt(a, 16),
      green: parseInt(s, 16),
      blue: parseInt(r, 16),
      alpha: o ? parseInt(o, 16) / 255 : 1,
    }
  );
}
const cf = { test: ed("#"), parse: zE, transform: Na.transform },
  pr = (n) => ({
    test: (a) =>
      typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
    parse: parseFloat,
    transform: (a) => `${a}${n}`,
  }),
  la = pr("deg"),
  dn = pr("%"),
  he = pr("px"),
  UE = pr("vh"),
  BE = pr("vw"),
  Ug = {
    ...dn,
    parse: (n) => dn.parse(n) / 100,
    transform: (n) => dn.transform(n * 100),
  },
  Oi = {
    test: ed("hsl", "hue"),
    parse: b0("hue", "saturation", "lightness"),
    transform: ({ hue: n, saturation: a, lightness: s, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(n) +
      ", " +
      dn.transform(Fs(a)) +
      ", " +
      dn.transform(Fs(s)) +
      ", " +
      Fs(tr.transform(r)) +
      ")",
  },
  mt = {
    test: (n) => Na.test(n) || cf.test(n) || Oi.test(n),
    parse: (n) =>
      Na.test(n) ? Na.parse(n) : Oi.test(n) ? Oi.parse(n) : cf.parse(n),
    transform: (n) =>
      typeof n == "string"
        ? n
        : n.hasOwnProperty("red")
          ? Na.transform(n)
          : Oi.transform(n),
  },
  kE =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function PE(n) {
  var a, s;
  return (
    isNaN(n) &&
    typeof n == "string" &&
    (((a = n.match(Wf)) == null ? void 0 : a.length) || 0) +
      (((s = n.match(kE)) == null ? void 0 : s.length) || 0) >
      0
  );
}
const S0 = "number",
  T0 = "color",
  HE = "var",
  GE = "var(",
  Bg = "${}",
  YE =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function nr(n) {
  const a = n.toString(),
    s = [],
    r = { color: [], number: [], var: [] },
    o = [];
  let c = 0;
  const m = a
    .replace(
      YE,
      (p) => (
        mt.test(p)
          ? (r.color.push(c), o.push(T0), s.push(mt.parse(p)))
          : p.startsWith(GE)
            ? (r.var.push(c), o.push(HE), s.push(p))
            : (r.number.push(c), o.push(S0), s.push(parseFloat(p))),
        ++c,
        Bg
      ),
    )
    .split(Bg);
  return { values: s, split: m, indexes: r, types: o };
}
function E0(n) {
  return nr(n).values;
}
function w0(n) {
  const { split: a, types: s } = nr(n),
    r = a.length;
  return (o) => {
    let c = "";
    for (let f = 0; f < r; f++)
      if (((c += a[f]), o[f] !== void 0)) {
        const m = s[f];
        m === S0
          ? (c += Fs(o[f]))
          : m === T0
            ? (c += mt.transform(o[f]))
            : (c += o[f]);
      }
    return c;
  };
}
const qE = (n) => (typeof n == "number" ? 0 : n);
function KE(n) {
  const a = E0(n);
  return w0(n)(a.map(qE));
}
const ua = {
  test: PE,
  parse: E0,
  createTransformer: w0,
  getAnimatableNone: KE,
};
function kc(n, a, s) {
  return (
    s < 0 && (s += 1),
    s > 1 && (s -= 1),
    s < 1 / 6
      ? n + (a - n) * 6 * s
      : s < 1 / 2
        ? a
        : s < 2 / 3
          ? n + (a - n) * (2 / 3 - s) * 6
          : n
  );
}
function FE({ hue: n, saturation: a, lightness: s, alpha: r }) {
  ((n /= 360), (a /= 100), (s /= 100));
  let o = 0,
    c = 0,
    f = 0;
  if (!a) o = c = f = s;
  else {
    const m = s < 0.5 ? s * (1 + a) : s + a - s * a,
      p = 2 * s - m;
    ((o = kc(p, m, n + 1 / 3)), (c = kc(p, m, n)), (f = kc(p, m, n - 1 / 3)));
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(f * 255),
    alpha: r,
  };
}
function Xl(n, a) {
  return (s) => (s > 0 ? a : n);
}
const Pe = (n, a, s) => n + (a - n) * s,
  Pc = (n, a, s) => {
    const r = n * n,
      o = s * (a * a - r) + r;
    return o < 0 ? 0 : Math.sqrt(o);
  },
  $E = [cf, Na, Oi],
  XE = (n) => $E.find((a) => a.test(n));
function kg(n) {
  const a = XE(n);
  if (!a) return !1;
  let s = a.parse(n);
  return (a === Oi && (s = FE(s)), s);
}
const Pg = (n, a) => {
    const s = kg(n),
      r = kg(a);
    if (!s || !r) return Xl(n, a);
    const o = { ...s };
    return (c) => (
      (o.red = Pc(s.red, r.red, c)),
      (o.green = Pc(s.green, r.green, c)),
      (o.blue = Pc(s.blue, r.blue, c)),
      (o.alpha = Pe(s.alpha, r.alpha, c)),
      Na.transform(o)
    );
  },
  ff = new Set(["none", "hidden"]);
function ZE(n, a) {
  return ff.has(n) ? (s) => (s <= 0 ? n : a) : (s) => (s >= 1 ? a : n);
}
function QE(n, a) {
  return (s) => Pe(n, a, s);
}
function td(n) {
  return typeof n == "number"
    ? QE
    : typeof n == "string"
      ? Jf(n)
        ? Xl
        : mt.test(n)
          ? Pg
          : WE
      : Array.isArray(n)
        ? A0
        : typeof n == "object"
          ? mt.test(n)
            ? Pg
            : IE
          : Xl;
}
function A0(n, a) {
  const s = [...n],
    r = s.length,
    o = n.map((c, f) => td(c)(c, a[f]));
  return (c) => {
    for (let f = 0; f < r; f++) s[f] = o[f](c);
    return s;
  };
}
function IE(n, a) {
  const s = { ...n, ...a },
    r = {};
  for (const o in s)
    n[o] !== void 0 && a[o] !== void 0 && (r[o] = td(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in r) s[c] = r[c](o);
    return s;
  };
}
function JE(n, a) {
  const s = [],
    r = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o],
      f = n.indexes[c][r[c]],
      m = n.values[f] ?? 0;
    ((s[o] = m), r[c]++);
  }
  return s;
}
const WE = (n, a) => {
  const s = ua.createTransformer(a),
    r = nr(n),
    o = nr(a);
  return r.indexes.var.length === o.indexes.var.length &&
    r.indexes.color.length === o.indexes.color.length &&
    r.indexes.number.length >= o.indexes.number.length
    ? (ff.has(n) && !o.values.length) || (ff.has(a) && !r.values.length)
      ? ZE(n, a)
      : hr(A0(JE(r, o), o.values), s)
    : Xl(n, a);
};
function C0(n, a, s) {
  return typeof n == "number" && typeof a == "number" && typeof s == "number"
    ? Pe(n, a, s)
    : td(n)(n, a);
}
const ew = (n) => {
    const a = ({ timestamp: s }) => n(s);
    return {
      start: (s = !0) => De.update(a, s),
      stop: () => tn(a),
      now: () => (it.isProcessing ? it.timestamp : wt.now()),
    };
  },
  O0 = (n, a, s = 10) => {
    let r = "";
    const o = Math.max(Math.round(a / s), 2);
    for (let c = 0; c < o; c++) r += n(c / (o - 1)) + ", ";
    return `linear(${r.substring(0, r.length - 2)})`;
  },
  Zl = 2e4;
function nd(n) {
  let a = 0;
  const s = 50;
  let r = n.next(a);
  for (; !r.done && a < Zl; ) ((a += s), (r = n.next(a)));
  return a >= Zl ? 1 / 0 : a;
}
function tw(n, a = 100, s) {
  const r = s({ ...n, keyframes: [0, a] }),
    o = Math.min(nd(r), Zl);
  return {
    type: "keyframes",
    ease: (c) => r.next(o * c).value / a,
    duration: fn(o),
  };
}
const nw = 5;
function R0(n, a, s) {
  const r = Math.max(a - nw, 0);
  return Xf(s - n(r), a - r);
}
const qe = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  Hg = 0.001;
function aw({
  duration: n = qe.duration,
  bounce: a = qe.bounce,
  velocity: s = qe.velocity,
  mass: r = qe.mass,
}) {
  let o,
    c,
    f = 1 - a;
  ((f = mn(qe.minDamping, qe.maxDamping, f)),
    (n = mn(qe.minDuration, qe.maxDuration, fn(n))),
    f < 1
      ? ((o = (h) => {
          const g = h * f,
            v = g * n,
            x = g - s,
            T = df(h, f),
            E = Math.exp(-v);
          return Hg - (x / T) * E;
        }),
        (c = (h) => {
          const v = h * f * n,
            x = v * s + s,
            T = Math.pow(f, 2) * Math.pow(h, 2) * n,
            E = Math.exp(-v),
            M = df(Math.pow(h, 2), f);
          return ((-o(h) + Hg > 0 ? -1 : 1) * ((x - T) * E)) / M;
        }))
      : ((o = (h) => {
          const g = Math.exp(-h * n),
            v = (h - s) * n + 1;
          return -0.001 + g * v;
        }),
        (c = (h) => {
          const g = Math.exp(-h * n),
            v = (s - h) * (n * n);
          return g * v;
        })));
  const m = 5 / n,
    p = sw(o, c, m);
  if (((n = cn(n)), isNaN(p)))
    return { stiffness: qe.stiffness, damping: qe.damping, duration: n };
  {
    const h = Math.pow(p, 2) * r;
    return { stiffness: h, damping: f * 2 * Math.sqrt(r * h), duration: n };
  }
}
const iw = 12;
function sw(n, a, s) {
  let r = s;
  for (let o = 1; o < iw; o++) r = r - n(r) / a(r);
  return r;
}
function df(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const rw = ["duration", "bounce"],
  lw = ["stiffness", "damping", "mass"];
function Gg(n, a) {
  return a.some((s) => n[s] !== void 0);
}
function ow(n) {
  let a = {
    velocity: qe.velocity,
    stiffness: qe.stiffness,
    damping: qe.damping,
    mass: qe.mass,
    isResolvedFromDuration: !1,
    ...n,
  };
  if (!Gg(n, lw) && Gg(n, rw))
    if (n.visualDuration) {
      const s = n.visualDuration,
        r = (2 * Math.PI) / (s * 1.2),
        o = r * r,
        c = 2 * mn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = { ...a, mass: qe.mass, stiffness: o, damping: c };
    } else {
      const s = aw(n);
      ((a = { ...a, ...s, mass: qe.mass }), (a.isResolvedFromDuration = !0));
    }
  return a;
}
function Ql(n = qe.visualDuration, a = qe.bounce) {
  const s =
    typeof n != "object"
      ? { visualDuration: n, keyframes: [0, 1], bounce: a }
      : n;
  let { restSpeed: r, restDelta: o } = s;
  const c = s.keyframes[0],
    f = s.keyframes[s.keyframes.length - 1],
    m = { done: !1, value: c },
    {
      stiffness: p,
      damping: h,
      mass: g,
      duration: v,
      velocity: x,
      isResolvedFromDuration: T,
    } = ow({ ...s, velocity: -fn(s.velocity || 0) }),
    E = x || 0,
    M = h / (2 * Math.sqrt(p * g)),
    N = f - c,
    R = fn(Math.sqrt(p / g)),
    G = Math.abs(N) < 5;
  (r || (r = G ? qe.restSpeed.granular : qe.restSpeed.default),
    o || (o = G ? qe.restDelta.granular : qe.restDelta.default));
  let V;
  if (M < 1) {
    const q = df(R, M);
    V = (ae) => {
      const te = Math.exp(-M * R * ae);
      return (
        f -
        te * (((E + M * R * N) / q) * Math.sin(q * ae) + N * Math.cos(q * ae))
      );
    };
  } else if (M === 1) V = (q) => f - Math.exp(-R * q) * (N + (E + R * N) * q);
  else {
    const q = R * Math.sqrt(M * M - 1);
    V = (ae) => {
      const te = Math.exp(-M * R * ae),
        k = Math.min(q * ae, 300);
      return (
        f - (te * ((E + M * R * N) * Math.sinh(k) + q * N * Math.cosh(k))) / q
      );
    };
  }
  const Q = {
    calculatedDuration: (T && v) || null,
    next: (q) => {
      const ae = V(q);
      if (T) m.done = q >= v;
      else {
        let te = q === 0 ? E : 0;
        M < 1 && (te = q === 0 ? cn(E) : R0(V, q, ae));
        const k = Math.abs(te) <= r,
          j = Math.abs(f - ae) <= o;
        m.done = k && j;
      }
      return ((m.value = m.done ? f : ae), m);
    },
    toString: () => {
      const q = Math.min(nd(Q), Zl),
        ae = O0((te) => Q.next(q * te).value, q, 30);
      return q + "ms " + ae;
    },
    toTransition: () => {},
  };
  return Q;
}
Ql.applyToOptions = (n) => {
  const a = tw(n, 100, Ql);
  return (
    (n.ease = a.ease),
    (n.duration = cn(a.duration)),
    (n.type = "keyframes"),
    n
  );
};
function hf({
  keyframes: n,
  velocity: a = 0,
  power: s = 0.8,
  timeConstant: r = 325,
  bounceDamping: o = 10,
  bounceStiffness: c = 500,
  modifyTarget: f,
  min: m,
  max: p,
  restDelta: h = 0.5,
  restSpeed: g,
}) {
  const v = n[0],
    x = { done: !1, value: v },
    T = (k) => (m !== void 0 && k < m) || (p !== void 0 && k > p),
    E = (k) =>
      m === void 0
        ? p
        : p === void 0 || Math.abs(m - k) < Math.abs(p - k)
          ? m
          : p;
  let M = s * a;
  const N = v + M,
    R = f === void 0 ? N : f(N);
  R !== N && (M = R - v);
  const G = (k) => -M * Math.exp(-k / r),
    V = (k) => R + G(k),
    Q = (k) => {
      const j = G(k),
        H = V(k);
      ((x.done = Math.abs(j) <= h), (x.value = x.done ? R : H));
    };
  let q, ae;
  const te = (k) => {
    T(x.value) &&
      ((q = k),
      (ae = Ql({
        keyframes: [x.value, E(x.value)],
        velocity: R0(V, k, x.value),
        damping: o,
        stiffness: c,
        restDelta: h,
        restSpeed: g,
      })));
  };
  return (
    te(0),
    {
      calculatedDuration: null,
      next: (k) => {
        let j = !1;
        return (
          !ae && q === void 0 && ((j = !0), Q(k), te(k)),
          q !== void 0 && k >= q ? ae.next(k - q) : (!j && Q(k), x)
        );
      },
    }
  );
}
function uw(n, a, s) {
  const r = [],
    o = s || _n.mix || C0,
    c = n.length - 1;
  for (let f = 0; f < c; f++) {
    let m = o(n[f], n[f + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[f] || At : a;
      m = hr(p, m);
    }
    r.push(m);
  }
  return r;
}
function ad(n, a, { clamp: s = !0, ease: r, mixer: o } = {}) {
  const c = n.length;
  if ((Kf(c === a.length), c === 1)) return () => a[0];
  if (c === 2 && a[0] === a[1]) return () => a[1];
  const f = n[0] === n[1];
  n[0] > n[c - 1] && ((n = [...n].reverse()), (a = [...a].reverse()));
  const m = uw(a, r, o),
    p = m.length,
    h = (g) => {
      if (f && g < n[0]) return a[0];
      let v = 0;
      if (p > 1) for (; v < n.length - 2 && !(g < n[v + 1]); v++);
      const x = ji(n[v], n[v + 1], g);
      return m[v](x);
    };
  return s ? (g) => h(mn(n[0], n[c - 1], g)) : h;
}
function cw(n, a) {
  const s = n[n.length - 1];
  for (let r = 1; r <= a; r++) {
    const o = ji(0, a, r);
    n.push(Pe(s, 1, o));
  }
}
function D0(n) {
  const a = [0];
  return (cw(a, n.length - 1), a);
}
function fw(n, a) {
  return n.map((s) => s * a);
}
function dw(n, a) {
  return n.map(() => a || g0).splice(0, n.length - 1);
}
function $s({
  duration: n = 300,
  keyframes: a,
  times: s,
  ease: r = "easeInOut",
}) {
  const o = AE(r) ? r.map(zg) : zg(r),
    c = { done: !1, value: a[0] },
    f = fw(s && s.length === a.length ? s : D0(a), n),
    m = ad(f, a, { ease: Array.isArray(o) ? o : dw(a, o) });
  return {
    calculatedDuration: n,
    next: (p) => ((c.value = m(p)), (c.done = p >= n), c),
  };
}
const hw = (n) => n !== null;
function id(n, { repeat: a, repeatType: s = "loop" }, r, o = 1) {
  const c = n.filter(hw),
    m = o < 0 || (a && s !== "loop" && a % 2 === 1) ? 0 : c.length - 1;
  return !m || r === void 0 ? c[m] : r;
}
const mw = { decay: hf, inertia: hf, tween: $s, keyframes: $s, spring: Ql };
function M0(n) {
  typeof n.type == "string" && (n.type = mw[n.type]);
}
class sd {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((a) => {
      this.resolve = a;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(a, s) {
    return this.finished.then(a, s);
  }
}
const pw = (n) => n / 100;
class fo extends sd {
  constructor(a) {
    (super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        var r, o;
        const { motionValue: s } = this.options;
        (s && s.updatedAt !== wt.now() && this.tick(wt.now()),
          (this.isStopped = !0),
          this.state !== "idle" &&
            (this.teardown(),
            (o = (r = this.options).onStop) == null || o.call(r)));
      }),
      (this.options = a),
      this.initAnimation(),
      this.play(),
      a.autoplay === !1 && this.pause());
  }
  initAnimation() {
    const { options: a } = this;
    M0(a);
    const {
      type: s = $s,
      repeat: r = 0,
      repeatDelay: o = 0,
      repeatType: c,
      velocity: f = 0,
    } = a;
    let { keyframes: m } = a;
    const p = s || $s;
    p !== $s &&
      typeof m[0] != "number" &&
      ((this.mixKeyframes = hr(pw, C0(m[0], m[1]))), (m = [0, 100]));
    const h = p({ ...a, keyframes: m });
    (c === "mirror" &&
      (this.mirroredGenerator = p({
        ...a,
        keyframes: [...m].reverse(),
        velocity: -f,
      })),
      h.calculatedDuration === null && (h.calculatedDuration = nd(h)));
    const { calculatedDuration: g } = h;
    ((this.calculatedDuration = g),
      (this.resolvedDuration = g + o),
      (this.totalDuration = this.resolvedDuration * (r + 1) - o),
      (this.generator = h));
  }
  updateTime(a) {
    const s = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = s);
  }
  tick(a, s = !1) {
    const {
      generator: r,
      totalDuration: o,
      mixKeyframes: c,
      mirroredGenerator: f,
      resolvedDuration: m,
      calculatedDuration: p,
    } = this;
    if (this.startTime === null) return r.next(0);
    const {
      delay: h = 0,
      keyframes: g,
      repeat: v,
      repeatType: x,
      repeatDelay: T,
      type: E,
      onUpdate: M,
      finalKeyframe: N,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, a))
      : this.speed < 0 &&
        (this.startTime = Math.min(a - o / this.speed, this.startTime)),
      s ? (this.currentTime = a) : this.updateTime(a));
    const R = this.currentTime - h * (this.playbackSpeed >= 0 ? 1 : -1),
      G = this.playbackSpeed >= 0 ? R < 0 : R > o;
    ((this.currentTime = Math.max(R, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = o));
    let V = this.currentTime,
      Q = r;
    if (v) {
      const k = Math.min(this.currentTime, o) / m;
      let j = Math.floor(k),
        H = k % 1;
      (!H && k >= 1 && (H = 1),
        H === 1 && j--,
        (j = Math.min(j, v + 1)),
        !!(j % 2) &&
          (x === "reverse"
            ? ((H = 1 - H), T && (H -= T / m))
            : x === "mirror" && (Q = f)),
        (V = mn(0, 1, H) * m));
    }
    const q = G ? { done: !1, value: g[0] } : Q.next(V);
    c && (q.value = c(q.value));
    let { done: ae } = q;
    !G &&
      p !== null &&
      (ae =
        this.playbackSpeed >= 0
          ? this.currentTime >= o
          : this.currentTime <= 0);
    const te =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && ae));
    return (
      te && E !== hf && (q.value = id(g, this.options, N, this.speed)),
      M && M(q.value),
      te && this.finish(),
      q
    );
  }
  then(a, s) {
    return this.finished.then(a, s);
  }
  get duration() {
    return fn(this.calculatedDuration);
  }
  get time() {
    return fn(this.currentTime);
  }
  set time(a) {
    var s;
    ((a = cn(a)),
      (this.currentTime = a),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = a)
        : this.driver &&
          (this.startTime = this.driver.now() - a / this.playbackSpeed),
      (s = this.driver) == null || s.start(!1));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    this.updateTime(wt.now());
    const s = this.playbackSpeed !== a;
    ((this.playbackSpeed = a), s && (this.time = fn(this.currentTime)));
  }
  play() {
    var o, c;
    if (this.isStopped) return;
    const { driver: a = ew, startTime: s } = this.options;
    (this.driver || (this.driver = a((f) => this.tick(f))),
      (c = (o = this.options).onPlay) == null || c.call(o));
    const r = this.driver.now();
    (this.state === "finished"
      ? (this.updateFinished(), (this.startTime = r))
      : this.holdTime !== null
        ? (this.startTime = r - this.holdTime)
        : this.startTime || (this.startTime = s ?? r),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    ((this.state = "paused"),
      this.updateTime(wt.now()),
      (this.holdTime = this.currentTime));
  }
  complete() {
    (this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null));
  }
  finish() {
    var a, s;
    (this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      (s = (a = this.options).onComplete) == null || s.call(a));
  }
  cancel() {
    var a, s;
    ((this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      (s = (a = this.options).onCancel) == null || s.call(a));
  }
  teardown() {
    ((this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null));
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(a) {
    return ((this.startTime = 0), this.tick(a, !0));
  }
  attachTimeline(a) {
    var s;
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      (s = this.driver) == null || s.stop(),
      a.observe(this)
    );
  }
}
function gw(n) {
  for (let a = 1; a < n.length; a++) n[a] ?? (n[a] = n[a - 1]);
}
const ja = (n) => (n * 180) / Math.PI,
  mf = (n) => {
    const a = ja(Math.atan2(n[1], n[0]));
    return pf(a);
  },
  yw = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
    rotate: mf,
    rotateZ: mf,
    skewX: (n) => ja(Math.atan(n[1])),
    skewY: (n) => ja(Math.atan(n[2])),
    skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2,
  },
  pf = (n) => ((n = n % 360), n < 0 && (n += 360), n),
  Yg = mf,
  qg = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]),
  Kg = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]),
  vw = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: qg,
    scaleY: Kg,
    scale: (n) => (qg(n) + Kg(n)) / 2,
    rotateX: (n) => pf(ja(Math.atan2(n[6], n[5]))),
    rotateY: (n) => pf(ja(Math.atan2(-n[2], n[0]))),
    rotateZ: Yg,
    rotate: Yg,
    skewX: (n) => ja(Math.atan(n[4])),
    skewY: (n) => ja(Math.atan(n[1])),
    skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2,
  };
function gf(n) {
  return n.includes("scale") ? 1 : 0;
}
function yf(n, a) {
  if (!n || n === "none") return gf(a);
  const s = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, o;
  if (s) ((r = vw), (o = s));
  else {
    const m = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((r = yw), (o = m));
  }
  if (!o) return gf(a);
  const c = r[a],
    f = o[1].split(",").map(bw);
  return typeof c == "function" ? c(f) : f[c];
}
const xw = (n, a) => {
  const { transform: s = "none" } = getComputedStyle(n);
  return yf(s, a);
};
function bw(n) {
  return parseFloat(n.trim());
}
const Ui = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  Bi = new Set(Ui),
  Fg = (n) => n === zi || n === he,
  Sw = new Set(["x", "y", "z"]),
  Tw = Ui.filter((n) => !Sw.has(n));
function Ew(n) {
  const a = [];
  return (
    Tw.forEach((s) => {
      const r = n.getValue(s);
      r !== void 0 &&
        (a.push([s, r.get()]), r.set(s.startsWith("scale") ? 1 : 0));
    }),
    a
  );
}
const _a = {
  width: ({ x: n }, { paddingLeft: a = "0", paddingRight: s = "0" }) =>
    n.max - n.min - parseFloat(a) - parseFloat(s),
  height: ({ y: n }, { paddingTop: a = "0", paddingBottom: s = "0" }) =>
    n.max - n.min - parseFloat(a) - parseFloat(s),
  top: (n, { top: a }) => parseFloat(a),
  left: (n, { left: a }) => parseFloat(a),
  bottom: ({ y: n }, { top: a }) => parseFloat(a) + (n.max - n.min),
  right: ({ x: n }, { left: a }) => parseFloat(a) + (n.max - n.min),
  x: (n, { transform: a }) => yf(a, "x"),
  y: (n, { transform: a }) => yf(a, "y"),
};
_a.translateX = _a.x;
_a.translateY = _a.y;
const za = new Set();
let vf = !1,
  xf = !1,
  bf = !1;
function N0() {
  if (xf) {
    const n = Array.from(za).filter((r) => r.needsMeasurement),
      a = new Set(n.map((r) => r.element)),
      s = new Map();
    (a.forEach((r) => {
      const o = Ew(r);
      o.length && (s.set(r, o), r.render());
    }),
      n.forEach((r) => r.measureInitialState()),
      a.forEach((r) => {
        r.render();
        const o = s.get(r);
        o &&
          o.forEach(([c, f]) => {
            var m;
            (m = r.getValue(c)) == null || m.set(f);
          });
      }),
      n.forEach((r) => r.measureEndState()),
      n.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      }));
  }
  ((xf = !1), (vf = !1), za.forEach((n) => n.complete(bf)), za.clear());
}
function j0() {
  za.forEach((n) => {
    (n.readKeyframes(), n.needsMeasurement && (xf = !0));
  });
}
function ww() {
  ((bf = !0), j0(), N0(), (bf = !1));
}
class rd {
  constructor(a, s, r, o, c, f = !1) {
    ((this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...a]),
      (this.onComplete = s),
      (this.name = r),
      (this.motionValue = o),
      (this.element = c),
      (this.isAsync = f));
  }
  scheduleResolve() {
    ((this.state = "scheduled"),
      this.isAsync
        ? (za.add(this),
          vf || ((vf = !0), De.read(j0), De.resolveKeyframes(N0)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: a,
      name: s,
      element: r,
      motionValue: o,
    } = this;
    if (a[0] === null) {
      const c = o == null ? void 0 : o.get(),
        f = a[a.length - 1];
      if (c !== void 0) a[0] = c;
      else if (r && s) {
        const m = r.readValue(s, f);
        m != null && (a[0] = m);
      }
      (a[0] === void 0 && (a[0] = f), o && c === void 0 && o.set(a[0]));
    }
    gw(a);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(a = !1) {
    ((this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a),
      za.delete(this));
  }
  cancel() {
    this.state === "scheduled" && (za.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Aw = (n) => n.startsWith("--");
function Cw(n, a, s) {
  Aw(a) ? n.style.setProperty(a, s) : (n.style[a] = s);
}
const L0 = Ff(() => window.ScrollTimeline !== void 0),
  Ow = {};
function Rw(n, a) {
  const s = Ff(n);
  return () => Ow[a] ?? s();
}
const V0 = Rw(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  qs = ([n, a, s, r]) => `cubic-bezier(${n}, ${a}, ${s}, ${r})`,
  $g = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: qs([0, 0.65, 0.55, 1]),
    circOut: qs([0.55, 0, 1, 0.45]),
    backIn: qs([0.31, 0.01, 0.66, -0.59]),
    backOut: qs([0.33, 1.53, 0.69, 0.99]),
  };
function _0(n, a) {
  if (n)
    return typeof n == "function"
      ? V0()
        ? O0(n, a)
        : "ease-out"
      : y0(n)
        ? qs(n)
        : Array.isArray(n)
          ? n.map((s) => _0(s, a) || $g.easeOut)
          : $g[n];
}
function Dw(
  n,
  a,
  s,
  {
    delay: r = 0,
    duration: o = 300,
    repeat: c = 0,
    repeatType: f = "loop",
    ease: m = "easeOut",
    times: p,
  } = {},
  h = void 0,
) {
  const g = { [a]: s };
  p && (g.offset = p);
  const v = _0(m, o);
  Array.isArray(v) && (g.easing = v);
  const x = {
    delay: r,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: c + 1,
    direction: f === "reverse" ? "alternate" : "normal",
  };
  return (h && (x.pseudoElement = h), n.animate(g, x));
}
function z0(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function Mw({ type: n, ...a }) {
  return z0(n) && V0()
    ? n.applyToOptions(a)
    : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class Nw extends sd {
  constructor(a) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !a))
      return;
    const {
      element: s,
      name: r,
      keyframes: o,
      pseudoElement: c,
      allowFlatten: f = !1,
      finalKeyframe: m,
      onComplete: p,
    } = a;
    ((this.isPseudoElement = !!c),
      (this.allowFlatten = f),
      (this.options = a),
      Kf(typeof a.type != "string"));
    const h = Mw(a);
    ((this.animation = Dw(s, r, o, h, c)),
      h.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !c)) {
          const g = id(o, this.options, m, this.speed);
          (this.updateMotionValue ? this.updateMotionValue(g) : Cw(s, r, g),
            this.animation.cancel());
        }
        (p == null || p(), this.notifyFinished());
      }));
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var a, s;
    (s = (a = this.animation).finish) == null || s.call(a);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: a } = this;
    a === "idle" ||
      a === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    var a, s;
    this.isPseudoElement ||
      (s = (a = this.animation).commitStyles) == null ||
      s.call(a);
  }
  get duration() {
    var s, r;
    const a =
      ((r =
        (s = this.animation.effect) == null ? void 0 : s.getComputedTiming) ==
      null
        ? void 0
        : r.call(s).duration) || 0;
    return fn(Number(a));
  }
  get time() {
    return fn(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    ((this.finishedTime = null), (this.animation.currentTime = cn(a)));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(a) {
    (a < 0 && (this.finishedTime = null), (this.animation.playbackRate = a));
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(a) {
    this.animation.startTime = a;
  }
  attachTimeline({ timeline: a, observe: s }) {
    var r;
    return (
      this.allowFlatten &&
        ((r = this.animation.effect) == null ||
          r.updateTiming({ easing: "linear" })),
      (this.animation.onfinish = null),
      a && L0() ? ((this.animation.timeline = a), At) : s(this)
    );
  }
}
const U0 = { anticipate: h0, backInOut: d0, circInOut: p0 };
function jw(n) {
  return n in U0;
}
function Lw(n) {
  typeof n.ease == "string" && jw(n.ease) && (n.ease = U0[n.ease]);
}
const Xg = 10;
class Vw extends Nw {
  constructor(a) {
    (Lw(a),
      M0(a),
      super(a),
      a.startTime && (this.startTime = a.startTime),
      (this.options = a));
  }
  updateMotionValue(a) {
    const {
      motionValue: s,
      onUpdate: r,
      onComplete: o,
      element: c,
      ...f
    } = this.options;
    if (!s) return;
    if (a !== void 0) {
      s.set(a);
      return;
    }
    const m = new fo({ ...f, autoplay: !1 }),
      p = cn(this.finishedTime ?? this.time);
    (s.setWithVelocity(m.sample(p - Xg).value, m.sample(p).value, Xg),
      m.stop());
  }
}
const Zg = (n, a) =>
  a === "zIndex"
    ? !1
    : !!(
        typeof n == "number" ||
        Array.isArray(n) ||
        (typeof n == "string" &&
          (ua.test(n) || n === "0") &&
          !n.startsWith("url("))
      );
function _w(n) {
  const a = n[0];
  if (n.length === 1) return !0;
  for (let s = 0; s < n.length; s++) if (n[s] !== a) return !0;
}
function zw(n, a, s, r) {
  const o = n[0];
  if (o === null) return !1;
  if (a === "display" || a === "visibility") return !0;
  const c = n[n.length - 1],
    f = Zg(o, a),
    m = Zg(c, a);
  return !f || !m ? !1 : _w(n) || ((s === "spring" || z0(s)) && r);
}
function ld(n) {
  return r0(n) && "offsetHeight" in n;
}
const Uw = new Set(["opacity", "clipPath", "filter", "transform"]),
  Bw = Ff(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function kw(n) {
  var h;
  const {
    motionValue: a,
    name: s,
    repeatDelay: r,
    repeatType: o,
    damping: c,
    type: f,
  } = n;
  if (!ld((h = a == null ? void 0 : a.owner) == null ? void 0 : h.current))
    return !1;
  const { onUpdate: m, transformTemplate: p } = a.owner.getProps();
  return (
    Bw() &&
    s &&
    Uw.has(s) &&
    (s !== "transform" || !p) &&
    !m &&
    !r &&
    o !== "mirror" &&
    c !== 0 &&
    f !== "inertia"
  );
}
const Pw = 40;
class Hw extends sd {
  constructor({
    autoplay: a = !0,
    delay: s = 0,
    type: r = "keyframes",
    repeat: o = 0,
    repeatDelay: c = 0,
    repeatType: f = "loop",
    keyframes: m,
    name: p,
    motionValue: h,
    element: g,
    ...v
  }) {
    var E;
    (super(),
      (this.stop = () => {
        var M, N;
        (this._animation &&
          (this._animation.stop(),
          (M = this.stopTimeline) == null || M.call(this)),
          (N = this.keyframeResolver) == null || N.cancel());
      }),
      (this.createdAt = wt.now()));
    const x = {
        autoplay: a,
        delay: s,
        type: r,
        repeat: o,
        repeatDelay: c,
        repeatType: f,
        name: p,
        motionValue: h,
        element: g,
        ...v,
      },
      T = (g == null ? void 0 : g.KeyframeResolver) || rd;
    ((this.keyframeResolver = new T(
      m,
      (M, N, R) => this.onKeyframesResolved(M, N, x, !R),
      p,
      h,
      g,
    )),
      (E = this.keyframeResolver) == null || E.scheduleResolve());
  }
  onKeyframesResolved(a, s, r, o) {
    this.keyframeResolver = void 0;
    const {
      name: c,
      type: f,
      velocity: m,
      delay: p,
      isHandoff: h,
      onUpdate: g,
    } = r;
    ((this.resolvedAt = wt.now()),
      zw(a, c, f, m) ||
        ((_n.instantAnimations || !p) && (g == null || g(id(a, r, s))),
        (a[0] = a[a.length - 1]),
        (r.duration = 0),
        (r.repeat = 0)));
    const x = {
        startTime: o
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > Pw
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: s,
        ...r,
        keyframes: a,
      },
      T =
        !h && kw(x)
          ? new Vw({ ...x, element: x.motionValue.owner.current })
          : new fo(x);
    (T.finished.then(() => this.notifyFinished()).catch(At),
      this.pendingTimeline &&
        ((this.stopTimeline = T.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = T));
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, s) {
    return this.finished.finally(a).then(() => {});
  }
  get animation() {
    var a;
    return (
      this._animation ||
        ((a = this.keyframeResolver) == null || a.resume(), ww()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get time() {
    return this.animation.time;
  }
  set time(a) {
    this.animation.time = a;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(a) {
    this.animation.speed = a;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(a) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(a))
        : (this.pendingTimeline = a),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var a;
    (this._animation && this.animation.cancel(),
      (a = this.keyframeResolver) == null || a.cancel());
  }
}
const Gw = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Yw(n) {
  const a = Gw.exec(n);
  if (!a) return [,];
  const [, s, r, o] = a;
  return [`--${s ?? r}`, o];
}
function B0(n, a, s = 1) {
  const [r, o] = Yw(n);
  if (!r) return;
  const c = window.getComputedStyle(a).getPropertyValue(r);
  if (c) {
    const f = c.trim();
    return s0(f) ? parseFloat(f) : f;
  }
  return Jf(o) ? B0(o, a, s + 1) : o;
}
function od(n, a) {
  return (n == null ? void 0 : n[a]) ?? (n == null ? void 0 : n.default) ?? n;
}
const k0 = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...Ui,
  ]),
  qw = { test: (n) => n === "auto", parse: (n) => n },
  P0 = (n) => (a) => a.test(n),
  H0 = [zi, he, dn, la, BE, UE, qw],
  Qg = (n) => H0.find(P0(n));
function Kw(n) {
  return typeof n == "number"
    ? n === 0
    : n !== null
      ? n === "none" || n === "0" || l0(n)
      : !0;
}
const Fw = new Set(["brightness", "contrast", "saturate", "opacity"]);
function $w(n) {
  const [a, s] = n.slice(0, -1).split("(");
  if (a === "drop-shadow") return n;
  const [r] = s.match(Wf) || [];
  if (!r) return n;
  const o = s.replace(r, "");
  let c = Fw.has(a) ? 1 : 0;
  return (r !== s && (c *= 100), a + "(" + c + o + ")");
}
const Xw = /\b([a-z-]*)\(.*?\)/gu,
  Sf = {
    ...ua,
    getAnimatableNone: (n) => {
      const a = n.match(Xw);
      return a ? a.map($w).join(" ") : n;
    },
  },
  Ig = { ...zi, transform: Math.round },
  Zw = {
    rotate: la,
    rotateX: la,
    rotateY: la,
    rotateZ: la,
    scale: Vl,
    scaleX: Vl,
    scaleY: Vl,
    scaleZ: Vl,
    skew: la,
    skewX: la,
    skewY: la,
    distance: he,
    translateX: he,
    translateY: he,
    translateZ: he,
    x: he,
    y: he,
    z: he,
    perspective: he,
    transformPerspective: he,
    opacity: tr,
    originX: Ug,
    originY: Ug,
    originZ: he,
  },
  ud = {
    borderWidth: he,
    borderTopWidth: he,
    borderRightWidth: he,
    borderBottomWidth: he,
    borderLeftWidth: he,
    borderRadius: he,
    radius: he,
    borderTopLeftRadius: he,
    borderTopRightRadius: he,
    borderBottomRightRadius: he,
    borderBottomLeftRadius: he,
    width: he,
    maxWidth: he,
    height: he,
    maxHeight: he,
    top: he,
    right: he,
    bottom: he,
    left: he,
    padding: he,
    paddingTop: he,
    paddingRight: he,
    paddingBottom: he,
    paddingLeft: he,
    margin: he,
    marginTop: he,
    marginRight: he,
    marginBottom: he,
    marginLeft: he,
    backgroundPositionX: he,
    backgroundPositionY: he,
    ...Zw,
    zIndex: Ig,
    fillOpacity: tr,
    strokeOpacity: tr,
    numOctaves: Ig,
  },
  Qw = {
    ...ud,
    color: mt,
    backgroundColor: mt,
    outlineColor: mt,
    fill: mt,
    stroke: mt,
    borderColor: mt,
    borderTopColor: mt,
    borderRightColor: mt,
    borderBottomColor: mt,
    borderLeftColor: mt,
    filter: Sf,
    WebkitFilter: Sf,
  },
  G0 = (n) => Qw[n];
function Y0(n, a) {
  let s = G0(n);
  return (
    s !== Sf && (s = ua),
    s.getAnimatableNone ? s.getAnimatableNone(a) : void 0
  );
}
const Iw = new Set(["auto", "none", "0"]);
function Jw(n, a, s) {
  let r = 0,
    o;
  for (; r < n.length && !o; ) {
    const c = n[r];
    (typeof c == "string" && !Iw.has(c) && nr(c).values.length && (o = n[r]),
      r++);
  }
  if (o && s) for (const c of a) n[c] = Y0(s, o);
}
class Ww extends rd {
  constructor(a, s, r, o, c) {
    super(a, s, r, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: s, name: r } = this;
    if (!s || !s.current) return;
    super.readKeyframes();
    for (let p = 0; p < a.length; p++) {
      let h = a[p];
      if (typeof h == "string" && ((h = h.trim()), Jf(h))) {
        const g = B0(h, s.current);
        (g !== void 0 && (a[p] = g),
          p === a.length - 1 && (this.finalKeyframe = h));
      }
    }
    if ((this.resolveNoneKeyframes(), !k0.has(r) || a.length !== 2)) return;
    const [o, c] = a,
      f = Qg(o),
      m = Qg(c);
    if (f !== m)
      if (Fg(f) && Fg(m))
        for (let p = 0; p < a.length; p++) {
          const h = a[p];
          typeof h == "string" && (a[p] = parseFloat(h));
        }
      else _a[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this,
      r = [];
    for (let o = 0; o < a.length; o++) (a[o] === null || Kw(a[o])) && r.push(o);
    r.length && Jw(a, r, s);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: s, name: r } = this;
    if (!a || !a.current) return;
    (r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = _a[r](
        a.measureViewportBox(),
        window.getComputedStyle(a.current),
      )),
      (s[0] = this.measuredOrigin));
    const o = s[s.length - 1];
    o !== void 0 && a.getValue(r, o).jump(o, !1);
  }
  measureEndState() {
    var m;
    const { element: a, name: s, unresolvedKeyframes: r } = this;
    if (!a || !a.current) return;
    const o = a.getValue(s);
    o && o.jump(this.measuredOrigin, !1);
    const c = r.length - 1,
      f = r[c];
    ((r[c] = _a[s](a.measureViewportBox(), window.getComputedStyle(a.current))),
      f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f),
      (m = this.removedTransforms) != null &&
        m.length &&
        this.removedTransforms.forEach(([p, h]) => {
          a.getValue(p).set(h);
        }),
      this.resolveNoneKeyframes());
  }
}
function cd(n, a, s) {
  if (n instanceof EventTarget) return [n];
  if (typeof n == "string") {
    const o = document.querySelectorAll(n);
    return o ? Array.from(o) : [];
  }
  return Array.from(n);
}
const q0 = (n, a) => (a && typeof n == "number" ? a.transform(n) : n),
  Jg = 30,
  e2 = (n) => !isNaN(parseFloat(n)),
  Xs = { current: void 0 };
class t2 {
  constructor(a, s = {}) {
    ((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r, o = !0) => {
        var f, m;
        const c = wt.now();
        if (
          (this.updatedAt !== c && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            ((f = this.events.change) == null || f.notify(this.current),
            this.dependents))
        )
          for (const p of this.dependents) p.dirty();
        o &&
          ((m = this.events.renderRequest) == null || m.notify(this.current));
      }),
      (this.hasAnimated = !1),
      this.setCurrent(a),
      (this.owner = s.owner));
  }
  setCurrent(a) {
    ((this.current = a),
      (this.updatedAt = wt.now()),
      this.canTrackVelocity === null &&
        a !== void 0 &&
        (this.canTrackVelocity = e2(this.current)));
  }
  setPrevFrameValue(a = this.current) {
    ((this.prevFrameValue = a), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(a) {
    return this.on("change", a);
  }
  on(a, s) {
    this.events[a] || (this.events[a] = new $f());
    const r = this.events[a].add(s);
    return a === "change"
      ? () => {
          (r(),
            De.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : r;
  }
  clearListeners() {
    for (const a in this.events) this.events[a].clear();
  }
  attach(a, s) {
    ((this.passiveEffect = a), (this.stopPassiveEffect = s));
  }
  set(a, s = !0) {
    !s || !this.passiveEffect
      ? this.updateAndNotify(a, s)
      : this.passiveEffect(a, this.updateAndNotify);
  }
  setWithVelocity(a, s, r) {
    (this.set(s),
      (this.prev = void 0),
      (this.prevFrameValue = a),
      (this.prevUpdatedAt = this.updatedAt - r));
  }
  jump(a, s = !0) {
    (this.updateAndNotify(a),
      (this.prev = a),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      s && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  dirty() {
    var a;
    (a = this.events.change) == null || a.notify(this.current);
  }
  addDependent(a) {
    (this.dependents || (this.dependents = new Set()), this.dependents.add(a));
  }
  removeDependent(a) {
    this.dependents && this.dependents.delete(a);
  }
  get() {
    return (Xs.current && Xs.current.push(this), this.current);
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const a = wt.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      a - this.updatedAt > Jg
    )
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, Jg);
    return Xf(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
  }
  start(a) {
    return (
      this.stop(),
      new Promise((s) => {
        ((this.hasAnimated = !0),
          (this.animation = a(s)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete &&
          this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    var a, s;
    ((a = this.dependents) == null || a.clear(),
      (s = this.events.destroy) == null || s.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function en(n, a) {
  return new t2(n, a);
}
const { schedule: fd } = v0(queueMicrotask, !1),
  Jt = { x: !1, y: !1 };
function K0() {
  return Jt.x || Jt.y;
}
function n2(n) {
  return n === "x" || n === "y"
    ? Jt[n]
      ? null
      : ((Jt[n] = !0),
        () => {
          Jt[n] = !1;
        })
    : Jt.x || Jt.y
      ? null
      : ((Jt.x = Jt.y = !0),
        () => {
          Jt.x = Jt.y = !1;
        });
}
function F0(n, a) {
  const s = cd(n),
    r = new AbortController(),
    o = { passive: !0, ...a, signal: r.signal };
  return [s, o, () => r.abort()];
}
function Wg(n) {
  return !(n.pointerType === "touch" || K0());
}
function a2(n, a, s = {}) {
  const [r, o, c] = F0(n, s),
    f = (m) => {
      if (!Wg(m)) return;
      const { target: p } = m,
        h = a(p, m);
      if (typeof h != "function" || !p) return;
      const g = (v) => {
        Wg(v) && (h(v), p.removeEventListener("pointerleave", g));
      };
      p.addEventListener("pointerleave", g, o);
    };
  return (
    r.forEach((m) => {
      m.addEventListener("pointerenter", f, o);
    }),
    c
  );
}
const $0 = (n, a) => (a ? (n === a ? !0 : $0(n, a.parentElement)) : !1),
  dd = (n) =>
    n.pointerType === "mouse"
      ? typeof n.button != "number" || n.button <= 0
      : n.isPrimary !== !1,
  i2 = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function s2(n) {
  return i2.has(n.tagName) || n.tabIndex !== -1;
}
const Hl = new WeakSet();
function ey(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function Hc(n, a) {
  n.dispatchEvent(
    new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }),
  );
}
const r2 = (n, a) => {
  const s = n.currentTarget;
  if (!s) return;
  const r = ey(() => {
    if (Hl.has(s)) return;
    Hc(s, "down");
    const o = ey(() => {
        Hc(s, "up");
      }),
      c = () => Hc(s, "cancel");
    (s.addEventListener("keyup", o, a), s.addEventListener("blur", c, a));
  });
  (s.addEventListener("keydown", r, a),
    s.addEventListener("blur", () => s.removeEventListener("keydown", r), a));
};
function ty(n) {
  return dd(n) && !K0();
}
function l2(n, a, s = {}) {
  const [r, o, c] = F0(n, s),
    f = (m) => {
      const p = m.currentTarget;
      if (!ty(m)) return;
      Hl.add(p);
      const h = a(p, m),
        g = (T, E) => {
          (window.removeEventListener("pointerup", v),
            window.removeEventListener("pointercancel", x),
            Hl.has(p) && Hl.delete(p),
            ty(T) && typeof h == "function" && h(T, { success: E }));
        },
        v = (T) => {
          g(
            T,
            p === window ||
              p === document ||
              s.useGlobalTarget ||
              $0(p, T.target),
          );
        },
        x = (T) => {
          g(T, !1);
        };
      (window.addEventListener("pointerup", v, o),
        window.addEventListener("pointercancel", x, o));
    };
  return (
    r.forEach((m) => {
      ((s.useGlobalTarget ? window : m).addEventListener("pointerdown", f, o),
        ld(m) &&
          (m.addEventListener("focus", (h) => r2(h, o)),
          !s2(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0)));
    }),
    c
  );
}
function X0(n, a) {
  let s;
  const r = () => {
    const { currentTime: o } = a,
      f = (o === null ? 0 : o.value) / 100;
    (s !== f && n(f), (s = f));
  };
  return (De.preUpdate(r, !0), () => tn(r));
}
function hd(n) {
  return r0(n) && "ownerSVGElement" in n;
}
function o2(n) {
  return hd(n) && n.tagName === "svg";
}
function u2(...n) {
  const a = !Array.isArray(n[0]),
    s = a ? 0 : -1,
    r = n[0 + s],
    o = n[1 + s],
    c = n[2 + s],
    f = n[3 + s],
    m = ad(o, c, f);
  return a ? m(r) : m;
}
const st = (n) => !!(n && n.getVelocity);
function c2(n, a, s) {
  const r = n.get();
  let o = null,
    c = r,
    f;
  const m = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0,
    p = () => {
      o && (o.stop(), (o = null));
    },
    h = () => {
      (p(),
        (o = new fo({
          keyframes: [ay(n.get()), ay(c)],
          velocity: n.getVelocity(),
          type: "spring",
          restDelta: 0.001,
          restSpeed: 0.01,
          ...s,
          onUpdate: f,
        })));
    };
  n.attach(
    (v, x) => ((c = v), (f = (T) => x(ny(T, m))), De.postRender(h), n.get()),
    p,
  );
  let g;
  return (
    st(a) && ((g = a.on("change", (v) => n.set(ny(v, m)))), n.on("destroy", g)),
    g
  );
}
function ny(n, a) {
  return a ? n + a : n;
}
function ay(n) {
  return typeof n == "number" ? n : parseFloat(n);
}
const f2 = [...H0, mt, ua],
  d2 = (n) => f2.find(P0(n)),
  ho = C.createContext({
    transformPagePoint: (n) => n,
    isStatic: !1,
    reducedMotion: "never",
  });
function h2(n = !0) {
  const a = C.useContext(Gf);
  if (a === null) return [!0, null];
  const { isPresent: s, onExitComplete: r, register: o } = a,
    c = C.useId();
  C.useEffect(() => {
    if (n) return o(c);
  }, [n]);
  const f = C.useCallback(() => n && r && r(c), [c, r, n]);
  return !s && r ? [!1, f] : [!0];
}
const Z0 = C.createContext({ strict: !1 }),
  iy = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  Li = {};
for (const n in iy) Li[n] = { isEnabled: (a) => iy[n].some((s) => !!a[s]) };
function m2(n) {
  for (const a in n) Li[a] = { ...Li[a], ...n[a] };
}
const p2 = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function Il(n) {
  return (
    n.startsWith("while") ||
    (n.startsWith("drag") && n !== "draggable") ||
    n.startsWith("layout") ||
    n.startsWith("onTap") ||
    n.startsWith("onPan") ||
    n.startsWith("onLayout") ||
    p2.has(n)
  );
}
let Q0 = (n) => !Il(n);
function g2(n) {
  n && (Q0 = (a) => (a.startsWith("on") ? !Il(a) : n(a)));
}
try {
  g2(require("@emotion/is-prop-valid").default);
} catch {}
function y2(n, a, s) {
  const r = {};
  for (const o in n)
    (o === "values" && typeof n.values == "object") ||
      ((Q0(o) ||
        (s === !0 && Il(o)) ||
        (!a && !Il(o)) ||
        (n.draggable && o.startsWith("onDrag"))) &&
        (r[o] = n[o]));
  return r;
}
function v2(n) {
  if (typeof Proxy > "u") return n;
  const a = new Map(),
    s = (...r) => n(...r);
  return new Proxy(s, {
    get: (r, o) =>
      o === "create" ? n : (a.has(o) || a.set(o, n(o)), a.get(o)),
  });
}
const mo = C.createContext({});
function po(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function ar(n) {
  return typeof n == "string" || Array.isArray(n);
}
const md = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  pd = ["initial", ...md];
function go(n) {
  return po(n.animate) || pd.some((a) => ar(n[a]));
}
function I0(n) {
  return !!(go(n) || n.variants);
}
function x2(n, a) {
  if (go(n)) {
    const { initial: s, animate: r } = n;
    return {
      initial: s === !1 || ar(s) ? s : void 0,
      animate: ar(r) ? r : void 0,
    };
  }
  return n.inherit !== !1 ? a : {};
}
function b2(n) {
  const { initial: a, animate: s } = x2(n, C.useContext(mo));
  return C.useMemo(() => ({ initial: a, animate: s }), [sy(a), sy(s)]);
}
function sy(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const S2 = Symbol.for("motionComponentSymbol");
function Ri(n) {
  return (
    n &&
    typeof n == "object" &&
    Object.prototype.hasOwnProperty.call(n, "current")
  );
}
function T2(n, a, s) {
  return C.useCallback(
    (r) => {
      (r && n.onMount && n.onMount(r),
        a && (r ? a.mount(r) : a.unmount()),
        s && (typeof s == "function" ? s(r) : Ri(s) && (s.current = r)));
    },
    [a],
  );
}
const gd = (n) => n.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  E2 = "framerAppearId",
  J0 = "data-" + gd(E2),
  W0 = C.createContext({});
function w2(n, a, s, r, o) {
  var M, N;
  const { visualElement: c } = C.useContext(mo),
    f = C.useContext(Z0),
    m = C.useContext(Gf),
    p = C.useContext(ho).reducedMotion,
    h = C.useRef(null);
  ((r = r || f.renderer),
    !h.current &&
      r &&
      (h.current = r(n, {
        visualState: a,
        parent: c,
        props: s,
        presenceContext: m,
        blockInitialAnimation: m ? m.initial === !1 : !1,
        reducedMotionConfig: p,
      })));
  const g = h.current,
    v = C.useContext(W0);
  g &&
    !g.projection &&
    o &&
    (g.type === "html" || g.type === "svg") &&
    A2(h.current, s, o, v);
  const x = C.useRef(!1);
  C.useInsertionEffect(() => {
    g && x.current && g.update(s, m);
  });
  const T = s[J0],
    E = C.useRef(
      !!T &&
        !((M = window.MotionHandoffIsComplete) != null && M.call(window, T)) &&
        ((N = window.MotionHasOptimisedAnimation) == null
          ? void 0
          : N.call(window, T)),
    );
  return (
    co(() => {
      g &&
        ((x.current = !0),
        (window.MotionIsMounted = !0),
        g.updateFeatures(),
        fd.render(g.render),
        E.current && g.animationState && g.animationState.animateChanges());
    }),
    C.useEffect(() => {
      g &&
        (!E.current && g.animationState && g.animationState.animateChanges(),
        E.current &&
          (queueMicrotask(() => {
            var R;
            (R = window.MotionHandoffMarkAsComplete) == null ||
              R.call(window, T);
          }),
          (E.current = !1)));
    }),
    g
  );
}
function A2(n, a, s, r) {
  const {
    layoutId: o,
    layout: c,
    drag: f,
    dragConstraints: m,
    layoutScroll: p,
    layoutRoot: h,
    layoutCrossfade: g,
  } = a;
  ((n.projection = new s(
    n.latestValues,
    a["data-framer-portal-id"] ? void 0 : ex(n.parent),
  )),
    n.projection.setOptions({
      layoutId: o,
      layout: c,
      alwaysMeasureLayout: !!f || (m && Ri(m)),
      visualElement: n,
      animationType: typeof c == "string" ? c : "both",
      initialPromotionConfig: r,
      crossfade: g,
      layoutScroll: p,
      layoutRoot: h,
    }));
}
function ex(n) {
  if (n) return n.options.allowProjection !== !1 ? n.projection : ex(n.parent);
}
function C2({
  preloadedFeatures: n,
  createVisualElement: a,
  useRender: s,
  useVisualState: r,
  Component: o,
}) {
  n && m2(n);
  function c(m, p) {
    let h;
    const g = { ...C.useContext(ho), ...m, layoutId: O2(m) },
      { isStatic: v } = g,
      x = b2(m),
      T = r(m, v);
    if (!v && Hf) {
      R2();
      const E = D2(g);
      ((h = E.MeasureLayout),
        (x.visualElement = w2(o, T, g, a, E.ProjectionNode)));
    }
    return A.jsxs(mo.Provider, {
      value: x,
      children: [
        h && x.visualElement
          ? A.jsx(h, { visualElement: x.visualElement, ...g })
          : null,
        s(o, m, T2(T, x.visualElement, p), T, v, x.visualElement),
      ],
    });
  }
  c.displayName = `motion.${typeof o == "string" ? o : `create(${o.displayName ?? o.name ?? ""})`}`;
  const f = C.forwardRef(c);
  return ((f[S2] = o), f);
}
function O2({ layoutId: n }) {
  const a = C.useContext(i0).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function R2(n, a) {
  C.useContext(Z0).strict;
}
function D2(n) {
  const { drag: a, layout: s } = Li;
  if (!a && !s) return {};
  const r = { ...a, ...s };
  return {
    MeasureLayout:
      (a != null && a.isEnabled(n)) || (s != null && s.isEnabled(n))
        ? r.MeasureLayout
        : void 0,
    ProjectionNode: r.ProjectionNode,
  };
}
const ir = {};
function M2(n) {
  for (const a in n) ((ir[a] = n[a]), If(a) && (ir[a].isCSSVariable = !0));
}
function tx(n, { layout: a, layoutId: s }) {
  return (
    Bi.has(n) ||
    n.startsWith("origin") ||
    ((a || s !== void 0) && (!!ir[n] || n === "opacity"))
  );
}
const N2 = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  j2 = Ui.length;
function L2(n, a, s) {
  let r = "",
    o = !0;
  for (let c = 0; c < j2; c++) {
    const f = Ui[c],
      m = n[f];
    if (m === void 0) continue;
    let p = !0;
    if (
      (typeof m == "number"
        ? (p = m === (f.startsWith("scale") ? 1 : 0))
        : (p = parseFloat(m) === 0),
      !p || s)
    ) {
      const h = q0(m, ud[f]);
      if (!p) {
        o = !1;
        const g = N2[f] || f;
        r += `${g}(${h}) `;
      }
      s && (a[f] = h);
    }
  }
  return ((r = r.trim()), s ? (r = s(a, o ? "" : r)) : o && (r = "none"), r);
}
function yd(n, a, s) {
  const { style: r, vars: o, transformOrigin: c } = n;
  let f = !1,
    m = !1;
  for (const p in a) {
    const h = a[p];
    if (Bi.has(p)) {
      f = !0;
      continue;
    } else if (If(p)) {
      o[p] = h;
      continue;
    } else {
      const g = q0(h, ud[p]);
      p.startsWith("origin") ? ((m = !0), (c[p] = g)) : (r[p] = g);
    }
  }
  if (
    (a.transform ||
      (f || s
        ? (r.transform = L2(a, n.transform, s))
        : r.transform && (r.transform = "none")),
    m)
  ) {
    const { originX: p = "50%", originY: h = "50%", originZ: g = 0 } = c;
    r.transformOrigin = `${p} ${h} ${g}`;
  }
}
const vd = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function nx(n, a, s) {
  for (const r in a) !st(a[r]) && !tx(r, s) && (n[r] = a[r]);
}
function V2({ transformTemplate: n }, a) {
  return C.useMemo(() => {
    const s = vd();
    return (yd(s, a, n), Object.assign({}, s.vars, s.style));
  }, [a]);
}
function _2(n, a) {
  const s = n.style || {},
    r = {};
  return (nx(r, s, n), Object.assign(r, V2(n, a)), r);
}
function z2(n, a) {
  const s = {},
    r = _2(n, a);
  return (
    n.drag &&
      n.dragListener !== !1 &&
      ((s.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none"),
      (r.touchAction =
        n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`)),
    n.tabIndex === void 0 &&
      (n.onTap || n.onTapStart || n.whileTap) &&
      (s.tabIndex = 0),
    (s.style = r),
    s
  );
}
const U2 = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  B2 = { offset: "strokeDashoffset", array: "strokeDasharray" };
function k2(n, a, s = 1, r = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? U2 : B2;
  n[c.offset] = he.transform(-r);
  const f = he.transform(a),
    m = he.transform(s);
  n[c.array] = `${f} ${m}`;
}
function ax(
  n,
  {
    attrX: a,
    attrY: s,
    attrScale: r,
    pathLength: o,
    pathSpacing: c = 1,
    pathOffset: f = 0,
    ...m
  },
  p,
  h,
  g,
) {
  if ((yd(n, m, h), p)) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  ((n.attrs = n.style), (n.style = {}));
  const { attrs: v, style: x } = n;
  (v.transform && ((x.transform = v.transform), delete v.transform),
    (x.transform || v.transformOrigin) &&
      ((x.transformOrigin = v.transformOrigin ?? "50% 50%"),
      delete v.transformOrigin),
    x.transform &&
      ((x.transformBox = (g == null ? void 0 : g.transformBox) ?? "fill-box"),
      delete v.transformBox),
    a !== void 0 && (v.x = a),
    s !== void 0 && (v.y = s),
    r !== void 0 && (v.scale = r),
    o !== void 0 && k2(v, o, c, f, !1));
}
const ix = () => ({ ...vd(), attrs: {} }),
  sx = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function P2(n, a, s, r) {
  const o = C.useMemo(() => {
    const c = ix();
    return (
      ax(c, a, sx(r), n.transformTemplate, n.style),
      { ...c.attrs, style: { ...c.style } }
    );
  }, [a]);
  if (n.style) {
    const c = {};
    (nx(c, n.style, n), (o.style = { ...c, ...o.style }));
  }
  return o;
}
const H2 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function xd(n) {
  return typeof n != "string" || n.includes("-")
    ? !1
    : !!(H2.indexOf(n) > -1 || /[A-Z]/u.test(n));
}
function G2(n = !1) {
  return (s, r, o, { latestValues: c }, f) => {
    const p = (xd(s) ? P2 : z2)(r, c, f, s),
      h = y2(r, typeof s == "string", n),
      g = s !== C.Fragment ? { ...h, ...p, ref: o } : {},
      { children: v } = r,
      x = C.useMemo(() => (st(v) ? v.get() : v), [v]);
    return C.createElement(s, { ...g, children: x });
  };
}
function ry(n) {
  const a = [{}, {}];
  return (
    n == null ||
      n.values.forEach((s, r) => {
        ((a[0][r] = s.get()), (a[1][r] = s.getVelocity()));
      }),
    a
  );
}
function bd(n, a, s, r) {
  if (typeof a == "function") {
    const [o, c] = ry(r);
    a = a(s !== void 0 ? s : n.custom, o, c);
  }
  if (
    (typeof a == "string" && (a = n.variants && n.variants[a]),
    typeof a == "function")
  ) {
    const [o, c] = ry(r);
    a = a(s !== void 0 ? s : n.custom, o, c);
  }
  return a;
}
function Gl(n) {
  return st(n) ? n.get() : n;
}
function Y2({ scrapeMotionValuesFromProps: n, createRenderState: a }, s, r, o) {
  return { latestValues: q2(s, r, o, n), renderState: a() };
}
const rx = (n) => (a, s) => {
  const r = C.useContext(mo),
    o = C.useContext(Gf),
    c = () => Y2(n, a, r, o);
  return s ? c() : dr(c);
};
function q2(n, a, s, r) {
  const o = {},
    c = r(n, {});
  for (const x in c) o[x] = Gl(c[x]);
  let { initial: f, animate: m } = n;
  const p = go(n),
    h = I0(n);
  a &&
    h &&
    !p &&
    n.inherit !== !1 &&
    (f === void 0 && (f = a.initial), m === void 0 && (m = a.animate));
  let g = s ? s.initial === !1 : !1;
  g = g || f === !1;
  const v = g ? m : f;
  if (v && typeof v != "boolean" && !po(v)) {
    const x = Array.isArray(v) ? v : [v];
    for (let T = 0; T < x.length; T++) {
      const E = bd(n, x[T]);
      if (E) {
        const { transitionEnd: M, transition: N, ...R } = E;
        for (const G in R) {
          let V = R[G];
          if (Array.isArray(V)) {
            const Q = g ? V.length - 1 : 0;
            V = V[Q];
          }
          V !== null && (o[G] = V);
        }
        for (const G in M) o[G] = M[G];
      }
    }
  }
  return o;
}
function Sd(n, a, s) {
  var c;
  const { style: r } = n,
    o = {};
  for (const f in r)
    (st(r[f]) ||
      (a.style && st(a.style[f])) ||
      tx(f, n) ||
      ((c = s == null ? void 0 : s.getValue(f)) == null
        ? void 0
        : c.liveStyle) !== void 0) &&
      (o[f] = r[f]);
  return o;
}
const K2 = {
  useVisualState: rx({
    scrapeMotionValuesFromProps: Sd,
    createRenderState: vd,
  }),
};
function lx(n, a, s) {
  const r = Sd(n, a, s);
  for (const o in n)
    if (st(n[o]) || st(a[o])) {
      const c =
        Ui.indexOf(o) !== -1
          ? "attr" + o.charAt(0).toUpperCase() + o.substring(1)
          : o;
      r[c] = n[o];
    }
  return r;
}
const F2 = {
  useVisualState: rx({
    scrapeMotionValuesFromProps: lx,
    createRenderState: ix,
  }),
};
function $2(n, a) {
  return function (r, { forwardMotionProps: o } = { forwardMotionProps: !1 }) {
    const f = {
      ...(xd(r) ? F2 : K2),
      preloadedFeatures: n,
      useRender: G2(o),
      createVisualElement: a,
      Component: r,
    };
    return C2(f);
  };
}
function sr(n, a, s) {
  const r = n.getProps();
  return bd(r, a, s !== void 0 ? s : r.custom, n);
}
const Tf = (n) => Array.isArray(n);
function X2(n, a, s) {
  n.hasValue(a) ? n.getValue(a).set(s) : n.addValue(a, en(s));
}
function Z2(n) {
  return Tf(n) ? n[n.length - 1] || 0 : n;
}
function Td(n, a) {
  const s = sr(n, a);
  let { transitionEnd: r = {}, transition: o = {}, ...c } = s || {};
  c = { ...c, ...r };
  for (const f in c) {
    const m = Z2(c[f]);
    X2(n, f, m);
  }
}
function Q2(n) {
  return !!(st(n) && n.add);
}
function Ef(n, a) {
  const s = n.getValue("willChange");
  if (Q2(s)) return s.add(a);
  if (!s && _n.WillChange) {
    const r = new _n.WillChange("auto");
    (n.addValue("willChange", r), r.add(a));
  }
}
function ox(n) {
  return n.props[J0];
}
const I2 = (n) => n !== null;
function J2(n, { repeat: a, repeatType: s = "loop" }, r) {
  const o = n.filter(I2),
    c = a && s !== "loop" && a % 2 === 1 ? 0 : o.length - 1;
  return o[c];
}
const W2 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  eA = (n) => ({
    type: "spring",
    stiffness: 550,
    damping: n === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  tA = { type: "keyframes", duration: 0.8 },
  nA = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  aA = (n, { keyframes: a }) =>
    a.length > 2
      ? tA
      : Bi.has(n)
        ? n.startsWith("scale")
          ? eA(a[1])
          : W2
        : nA;
function iA({
  when: n,
  delay: a,
  delayChildren: s,
  staggerChildren: r,
  staggerDirection: o,
  repeat: c,
  repeatType: f,
  repeatDelay: m,
  from: p,
  elapsed: h,
  ...g
}) {
  return !!Object.keys(g).length;
}
const Ed =
  (n, a, s, r = {}, o, c) =>
  (f) => {
    const m = od(r, n) || {},
      p = m.delay || r.delay || 0;
    let { elapsed: h = 0 } = r;
    h = h - cn(p);
    const g = {
      keyframes: Array.isArray(s) ? s : [null, s],
      ease: "easeOut",
      velocity: a.getVelocity(),
      ...m,
      delay: -h,
      onUpdate: (x) => {
        (a.set(x), m.onUpdate && m.onUpdate(x));
      },
      onComplete: () => {
        (f(), m.onComplete && m.onComplete());
      },
      name: n,
      motionValue: a,
      element: c ? void 0 : o,
    };
    (iA(m) || Object.assign(g, aA(n, g)),
      g.duration && (g.duration = cn(g.duration)),
      g.repeatDelay && (g.repeatDelay = cn(g.repeatDelay)),
      g.from !== void 0 && (g.keyframes[0] = g.from));
    let v = !1;
    if (
      ((g.type === !1 || (g.duration === 0 && !g.repeatDelay)) &&
        ((g.duration = 0), g.delay === 0 && (v = !0)),
      (_n.instantAnimations || _n.skipAnimations) &&
        ((v = !0), (g.duration = 0), (g.delay = 0)),
      (g.allowFlatten = !m.type && !m.ease),
      v && !c && a.get() !== void 0)
    ) {
      const x = J2(g.keyframes, m);
      if (x !== void 0) {
        De.update(() => {
          (g.onUpdate(x), g.onComplete());
        });
        return;
      }
    }
    return m.isSync ? new fo(g) : new Hw(g);
  };
function sA({ protectedKeys: n, needsAnimating: a }, s) {
  const r = n.hasOwnProperty(s) && a[s] !== !0;
  return ((a[s] = !1), r);
}
function ux(n, a, { delay: s = 0, transitionOverride: r, type: o } = {}) {
  let { transition: c = n.getDefaultTransition(), transitionEnd: f, ...m } = a;
  r && (c = r);
  const p = [],
    h = o && n.animationState && n.animationState.getState()[o];
  for (const g in m) {
    const v = n.getValue(g, n.latestValues[g] ?? null),
      x = m[g];
    if (x === void 0 || (h && sA(h, g))) continue;
    const T = { delay: s, ...od(c || {}, g) },
      E = v.get();
    if (
      E !== void 0 &&
      !v.isAnimating &&
      !Array.isArray(x) &&
      x === E &&
      !T.velocity
    )
      continue;
    let M = !1;
    if (window.MotionHandoffAnimation) {
      const R = ox(n);
      if (R) {
        const G = window.MotionHandoffAnimation(R, g, De);
        G !== null && ((T.startTime = G), (M = !0));
      }
    }
    (Ef(n, g),
      v.start(
        Ed(g, v, x, n.shouldReduceMotion && k0.has(g) ? { type: !1 } : T, n, M),
      ));
    const N = v.animation;
    N && p.push(N);
  }
  return (
    f &&
      Promise.all(p).then(() => {
        De.update(() => {
          f && Td(n, f);
        });
      }),
    p
  );
}
function wf(n, a, s = {}) {
  var p;
  const r = sr(
    n,
    a,
    s.type === "exit"
      ? (p = n.presenceContext) == null
        ? void 0
        : p.custom
      : void 0,
  );
  let { transition: o = n.getDefaultTransition() || {} } = r || {};
  s.transitionOverride && (o = s.transitionOverride);
  const c = r ? () => Promise.all(ux(n, r, s)) : () => Promise.resolve(),
    f =
      n.variantChildren && n.variantChildren.size
        ? (h = 0) => {
            const {
              delayChildren: g = 0,
              staggerChildren: v,
              staggerDirection: x,
            } = o;
            return rA(n, a, g + h, v, x, s);
          }
        : () => Promise.resolve(),
    { when: m } = o;
  if (m) {
    const [h, g] = m === "beforeChildren" ? [c, f] : [f, c];
    return h().then(() => g());
  } else return Promise.all([c(), f(s.delay)]);
}
function rA(n, a, s = 0, r = 0, o = 1, c) {
  const f = [],
    m = (n.variantChildren.size - 1) * r,
    p = o === 1 ? (h = 0) => h * r : (h = 0) => m - h * r;
  return (
    Array.from(n.variantChildren)
      .sort(lA)
      .forEach((h, g) => {
        (h.notify("AnimationStart", a),
          f.push(
            wf(h, a, { ...c, delay: s + p(g) }).then(() =>
              h.notify("AnimationComplete", a),
            ),
          ));
      }),
    Promise.all(f)
  );
}
function lA(n, a) {
  return n.sortNodePosition(a);
}
function cx(n, a, s = {}) {
  n.notify("AnimationStart", a);
  let r;
  if (Array.isArray(a)) {
    const o = a.map((c) => wf(n, c, s));
    r = Promise.all(o);
  } else if (typeof a == "string") r = wf(n, a, s);
  else {
    const o = typeof a == "function" ? sr(n, a, s.custom) : a;
    r = Promise.all(ux(n, o, s));
  }
  return r.then(() => {
    n.notify("AnimationComplete", a);
  });
}
function fx(n, a) {
  if (!Array.isArray(a)) return !1;
  const s = a.length;
  if (s !== n.length) return !1;
  for (let r = 0; r < s; r++) if (a[r] !== n[r]) return !1;
  return !0;
}
const oA = pd.length;
function dx(n) {
  if (!n) return;
  if (!n.isControllingVariants) {
    const s = n.parent ? dx(n.parent) || {} : {};
    return (n.props.initial !== void 0 && (s.initial = n.props.initial), s);
  }
  const a = {};
  for (let s = 0; s < oA; s++) {
    const r = pd[s],
      o = n.props[r];
    (ar(o) || o === !1) && (a[r] = o);
  }
  return a;
}
const uA = [...md].reverse(),
  cA = md.length;
function fA(n) {
  return (a) =>
    Promise.all(a.map(({ animation: s, options: r }) => cx(n, s, r)));
}
function dA(n) {
  let a = fA(n),
    s = ly(),
    r = !0;
  const o = (p) => (h, g) => {
    var x;
    const v = sr(
      n,
      g,
      p === "exit"
        ? (x = n.presenceContext) == null
          ? void 0
          : x.custom
        : void 0,
    );
    if (v) {
      const { transition: T, transitionEnd: E, ...M } = v;
      h = { ...h, ...M, ...E };
    }
    return h;
  };
  function c(p) {
    a = p(n);
  }
  function f(p) {
    const { props: h } = n,
      g = dx(n.parent) || {},
      v = [],
      x = new Set();
    let T = {},
      E = 1 / 0;
    for (let N = 0; N < cA; N++) {
      const R = uA[N],
        G = s[R],
        V = h[R] !== void 0 ? h[R] : g[R],
        Q = ar(V),
        q = R === p ? G.isActive : null;
      q === !1 && (E = N);
      let ae = V === g[R] && V !== h[R] && Q;
      if (
        (ae && r && n.manuallyAnimateOnMount && (ae = !1),
        (G.protectedKeys = { ...T }),
        (!G.isActive && q === null) ||
          (!V && !G.prevProp) ||
          po(V) ||
          typeof V == "boolean")
      )
        continue;
      const te = hA(G.prevProp, V);
      let k = te || (R === p && G.isActive && !ae && Q) || (N > E && Q),
        j = !1;
      const H = Array.isArray(V) ? V : [V];
      let I = H.reduce(o(R), {});
      q === !1 && (I = {});
      const { prevResolvedValues: ee = {} } = G,
        oe = { ...ee, ...I },
        ve = (Y) => {
          ((k = !0),
            x.has(Y) && ((j = !0), x.delete(Y)),
            (G.needsAnimating[Y] = !0));
          const J = n.getValue(Y);
          J && (J.liveStyle = !1);
        };
      for (const Y in oe) {
        const J = I[Y],
          le = ee[Y];
        if (T.hasOwnProperty(Y)) continue;
        let S = !1;
        (Tf(J) && Tf(le) ? (S = !fx(J, le)) : (S = J !== le),
          S
            ? J != null
              ? ve(Y)
              : x.add(Y)
            : J !== void 0 && x.has(Y)
              ? ve(Y)
              : (G.protectedKeys[Y] = !0));
      }
      ((G.prevProp = V),
        (G.prevResolvedValues = I),
        G.isActive && (T = { ...T, ...I }),
        r && n.blockInitialAnimation && (k = !1),
        k &&
          (!(ae && te) || j) &&
          v.push(...H.map((Y) => ({ animation: Y, options: { type: R } }))));
    }
    if (x.size) {
      const N = {};
      if (typeof h.initial != "boolean") {
        const R = sr(n, Array.isArray(h.initial) ? h.initial[0] : h.initial);
        R && R.transition && (N.transition = R.transition);
      }
      (x.forEach((R) => {
        const G = n.getBaseTarget(R),
          V = n.getValue(R);
        (V && (V.liveStyle = !0), (N[R] = G ?? null));
      }),
        v.push({ animation: N }));
    }
    let M = !!v.length;
    return (
      r &&
        (h.initial === !1 || h.initial === h.animate) &&
        !n.manuallyAnimateOnMount &&
        (M = !1),
      (r = !1),
      M ? a(v) : Promise.resolve()
    );
  }
  function m(p, h) {
    var v;
    if (s[p].isActive === h) return Promise.resolve();
    ((v = n.variantChildren) == null ||
      v.forEach((x) => {
        var T;
        return (T = x.animationState) == null ? void 0 : T.setActive(p, h);
      }),
      (s[p].isActive = h));
    const g = f(p);
    for (const x in s) s[x].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: f,
    setActive: m,
    setAnimateFunction: c,
    getState: () => s,
    reset: () => {
      ((s = ly()), (r = !0));
    },
  };
}
function hA(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !fx(a, n) : !1;
}
function Da(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function ly() {
  return {
    animate: Da(!0),
    whileInView: Da(),
    whileHover: Da(),
    whileTap: Da(),
    whileDrag: Da(),
    whileFocus: Da(),
    exit: Da(),
  };
}
class ca {
  constructor(a) {
    ((this.isMounted = !1), (this.node = a));
  }
  update() {}
}
class mA extends ca {
  constructor(a) {
    (super(a), a.animationState || (a.animationState = dA(a)));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    po(a) && (this.unmountControls = a.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(),
      { animate: s } = this.node.prevProps || {};
    a !== s && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var a;
    (this.node.animationState.reset(),
      (a = this.unmountControls) == null || a.call(this));
  }
}
let pA = 0;
class gA extends ca {
  constructor() {
    (super(...arguments), (this.id = pA++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: a, onExitComplete: s } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === r) return;
    const o = this.node.animationState.setActive("exit", !a);
    s &&
      !a &&
      o.then(() => {
        s(this.id);
      });
  }
  mount() {
    const { register: a, onExitComplete: s } = this.node.presenceContext || {};
    (s && s(this.id), a && (this.unmount = a(this.id)));
  }
  unmount() {}
}
const yA = { animation: { Feature: mA }, exit: { Feature: gA } };
function rr(n, a, s, r = { passive: !0 }) {
  return (n.addEventListener(a, s, r), () => n.removeEventListener(a, s));
}
function gr(n) {
  return { point: { x: n.pageX, y: n.pageY } };
}
const vA = (n) => (a) => dd(a) && n(a, gr(a));
function Zs(n, a, s, r) {
  return rr(n, a, vA(s), r);
}
function hx({ top: n, left: a, right: s, bottom: r }) {
  return { x: { min: a, max: s }, y: { min: n, max: r } };
}
function xA({ x: n, y: a }) {
  return { top: a.min, right: n.max, bottom: a.max, left: n.min };
}
function bA(n, a) {
  if (!a) return n;
  const s = a({ x: n.left, y: n.top }),
    r = a({ x: n.right, y: n.bottom });
  return { top: s.y, left: s.x, bottom: r.y, right: r.x };
}
const mx = 1e-4,
  SA = 1 - mx,
  TA = 1 + mx,
  px = 0.01,
  EA = 0 - px,
  wA = 0 + px;
function vt(n) {
  return n.max - n.min;
}
function AA(n, a, s) {
  return Math.abs(n - a) <= s;
}
function oy(n, a, s, r = 0.5) {
  ((n.origin = r),
    (n.originPoint = Pe(a.min, a.max, n.origin)),
    (n.scale = vt(s) / vt(a)),
    (n.translate = Pe(s.min, s.max, n.origin) - n.originPoint),
    ((n.scale >= SA && n.scale <= TA) || isNaN(n.scale)) && (n.scale = 1),
    ((n.translate >= EA && n.translate <= wA) || isNaN(n.translate)) &&
      (n.translate = 0));
}
function Qs(n, a, s, r) {
  (oy(n.x, a.x, s.x, r ? r.originX : void 0),
    oy(n.y, a.y, s.y, r ? r.originY : void 0));
}
function uy(n, a, s) {
  ((n.min = s.min + a.min), (n.max = n.min + vt(a)));
}
function CA(n, a, s) {
  (uy(n.x, a.x, s.x), uy(n.y, a.y, s.y));
}
function cy(n, a, s) {
  ((n.min = a.min - s.min), (n.max = n.min + vt(a)));
}
function Is(n, a, s) {
  (cy(n.x, a.x, s.x), cy(n.y, a.y, s.y));
}
const fy = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Di = () => ({ x: fy(), y: fy() }),
  dy = () => ({ min: 0, max: 0 }),
  $e = () => ({ x: dy(), y: dy() });
function Xt(n) {
  return [n("x"), n("y")];
}
function Gc(n) {
  return n === void 0 || n === 1;
}
function Af({ scale: n, scaleX: a, scaleY: s }) {
  return !Gc(n) || !Gc(a) || !Gc(s);
}
function Ma(n) {
  return (
    Af(n) ||
    gx(n) ||
    n.z ||
    n.rotate ||
    n.rotateX ||
    n.rotateY ||
    n.skewX ||
    n.skewY
  );
}
function gx(n) {
  return hy(n.x) || hy(n.y);
}
function hy(n) {
  return n && n !== "0%";
}
function Jl(n, a, s) {
  const r = n - s,
    o = a * r;
  return s + o;
}
function my(n, a, s, r, o) {
  return (o !== void 0 && (n = Jl(n, o, r)), Jl(n, s, r) + a);
}
function Cf(n, a = 0, s = 1, r, o) {
  ((n.min = my(n.min, a, s, r, o)), (n.max = my(n.max, a, s, r, o)));
}
function yx(n, { x: a, y: s }) {
  (Cf(n.x, a.translate, a.scale, a.originPoint),
    Cf(n.y, s.translate, s.scale, s.originPoint));
}
const py = 0.999999999999,
  gy = 1.0000000000001;
function OA(n, a, s, r = !1) {
  const o = s.length;
  if (!o) return;
  a.x = a.y = 1;
  let c, f;
  for (let m = 0; m < o; m++) {
    ((c = s[m]), (f = c.projectionDelta));
    const { visualElement: p } = c.options;
    (p && p.props.style && p.props.style.display === "contents") ||
      (r &&
        c.options.layoutScroll &&
        c.scroll &&
        c !== c.root &&
        Ni(n, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
      f && ((a.x *= f.x.scale), (a.y *= f.y.scale), yx(n, f)),
      r && Ma(c.latestValues) && Ni(n, c.latestValues));
  }
  (a.x < gy && a.x > py && (a.x = 1), a.y < gy && a.y > py && (a.y = 1));
}
function Mi(n, a) {
  ((n.min = n.min + a), (n.max = n.max + a));
}
function yy(n, a, s, r, o = 0.5) {
  const c = Pe(n.min, n.max, o);
  Cf(n, a, s, c, r);
}
function Ni(n, a) {
  (yy(n.x, a.x, a.scaleX, a.scale, a.originX),
    yy(n.y, a.y, a.scaleY, a.scale, a.originY));
}
function vx(n, a) {
  return hx(bA(n.getBoundingClientRect(), a));
}
function RA(n, a, s) {
  const r = vx(n, s),
    { scroll: o } = a;
  return (o && (Mi(r.x, o.offset.x), Mi(r.y, o.offset.y)), r);
}
const xx = ({ current: n }) => (n ? n.ownerDocument.defaultView : null),
  vy = (n, a) => Math.abs(n - a);
function DA(n, a) {
  const s = vy(n.x, a.x),
    r = vy(n.y, a.y);
  return Math.sqrt(s ** 2 + r ** 2);
}
class bx {
  constructor(
    a,
    s,
    { transformPagePoint: r, contextWindow: o, dragSnapToOrigin: c = !1 } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const v = qc(this.lastMoveEventInfo, this.history),
          x = this.startEvent !== null,
          T = DA(v.offset, { x: 0, y: 0 }) >= 3;
        if (!x && !T) return;
        const { point: E } = v,
          { timestamp: M } = it;
        this.history.push({ ...E, timestamp: M });
        const { onStart: N, onMove: R } = this.handlers;
        (x ||
          (N && N(this.lastMoveEvent, v),
          (this.startEvent = this.lastMoveEvent)),
          R && R(this.lastMoveEvent, v));
      }),
      (this.handlePointerMove = (v, x) => {
        ((this.lastMoveEvent = v),
          (this.lastMoveEventInfo = Yc(x, this.transformPagePoint)),
          De.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (v, x) => {
        this.end();
        const { onEnd: T, onSessionEnd: E, resumeAnimation: M } = this.handlers;
        if (
          (this.dragSnapToOrigin && M && M(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const N = qc(
          v.type === "pointercancel"
            ? this.lastMoveEventInfo
            : Yc(x, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && T && T(v, N), E && E(v, N));
      }),
      !dd(a))
    )
      return;
    ((this.dragSnapToOrigin = c),
      (this.handlers = s),
      (this.transformPagePoint = r),
      (this.contextWindow = o || window));
    const f = gr(a),
      m = Yc(f, this.transformPagePoint),
      { point: p } = m,
      { timestamp: h } = it;
    this.history = [{ ...p, timestamp: h }];
    const { onSessionStart: g } = s;
    (g && g(a, qc(m, this.history)),
      (this.removeListeners = hr(
        Zs(this.contextWindow, "pointermove", this.handlePointerMove),
        Zs(this.contextWindow, "pointerup", this.handlePointerUp),
        Zs(this.contextWindow, "pointercancel", this.handlePointerUp),
      )));
  }
  updateHandlers(a) {
    this.handlers = a;
  }
  end() {
    (this.removeListeners && this.removeListeners(), tn(this.updatePoint));
  }
}
function Yc(n, a) {
  return a ? { point: a(n.point) } : n;
}
function xy(n, a) {
  return { x: n.x - a.x, y: n.y - a.y };
}
function qc({ point: n }, a) {
  return {
    point: n,
    delta: xy(n, Sx(a)),
    offset: xy(n, MA(a)),
    velocity: NA(a, 0.1),
  };
}
function MA(n) {
  return n[0];
}
function Sx(n) {
  return n[n.length - 1];
}
function NA(n, a) {
  if (n.length < 2) return { x: 0, y: 0 };
  let s = n.length - 1,
    r = null;
  const o = Sx(n);
  for (; s >= 0 && ((r = n[s]), !(o.timestamp - r.timestamp > cn(a))); ) s--;
  if (!r) return { x: 0, y: 0 };
  const c = fn(o.timestamp - r.timestamp);
  if (c === 0) return { x: 0, y: 0 };
  const f = { x: (o.x - r.x) / c, y: (o.y - r.y) / c };
  return (f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f);
}
function jA(n, { min: a, max: s }, r) {
  return (
    a !== void 0 && n < a
      ? (n = r ? Pe(a, n, r.min) : Math.max(n, a))
      : s !== void 0 && n > s && (n = r ? Pe(s, n, r.max) : Math.min(n, s)),
    n
  );
}
function by(n, a, s) {
  return {
    min: a !== void 0 ? n.min + a : void 0,
    max: s !== void 0 ? n.max + s - (n.max - n.min) : void 0,
  };
}
function LA(n, { top: a, left: s, bottom: r, right: o }) {
  return { x: by(n.x, s, o), y: by(n.y, a, r) };
}
function Sy(n, a) {
  let s = a.min - n.min,
    r = a.max - n.max;
  return (
    a.max - a.min < n.max - n.min && ([s, r] = [r, s]),
    { min: s, max: r }
  );
}
function VA(n, a) {
  return { x: Sy(n.x, a.x), y: Sy(n.y, a.y) };
}
function _A(n, a) {
  let s = 0.5;
  const r = vt(n),
    o = vt(a);
  return (
    o > r
      ? (s = ji(a.min, a.max - r, n.min))
      : r > o && (s = ji(n.min, n.max - o, a.min)),
    mn(0, 1, s)
  );
}
function zA(n, a) {
  const s = {};
  return (
    a.min !== void 0 && (s.min = a.min - n.min),
    a.max !== void 0 && (s.max = a.max - n.min),
    s
  );
}
const Of = 0.35;
function UA(n = Of) {
  return (
    n === !1 ? (n = 0) : n === !0 && (n = Of),
    { x: Ty(n, "left", "right"), y: Ty(n, "top", "bottom") }
  );
}
function Ty(n, a, s) {
  return { min: Ey(n, a), max: Ey(n, s) };
}
function Ey(n, a) {
  return typeof n == "number" ? n : n[a] || 0;
}
const BA = new WeakMap();
class kA {
  constructor(a) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = $e()),
      (this.visualElement = a));
  }
  start(a, { snapToCursor: s = !1 } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1) return;
    const o = (g) => {
        const { dragSnapToOrigin: v } = this.getProps();
        (v ? this.pauseAnimation() : this.stopAnimation(),
          s && this.snapToCursor(gr(g).point));
      },
      c = (g, v) => {
        const { drag: x, dragPropagation: T, onDragStart: E } = this.getProps();
        if (
          x &&
          !T &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = n2(x)),
          !this.openDragLock)
        )
          return;
        ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          Xt((N) => {
            let R = this.getAxisMotionValue(N).get() || 0;
            if (dn.test(R)) {
              const { projection: G } = this.visualElement;
              if (G && G.layout) {
                const V = G.layout.layoutBox[N];
                V && (R = vt(V) * (parseFloat(R) / 100));
              }
            }
            this.originPoint[N] = R;
          }),
          E && De.postRender(() => E(g, v)),
          Ef(this.visualElement, "transform"));
        const { animationState: M } = this.visualElement;
        M && M.setActive("whileDrag", !0);
      },
      f = (g, v) => {
        const {
          dragPropagation: x,
          dragDirectionLock: T,
          onDirectionLock: E,
          onDrag: M,
        } = this.getProps();
        if (!x && !this.openDragLock) return;
        const { offset: N } = v;
        if (T && this.currentDirection === null) {
          ((this.currentDirection = PA(N)),
            this.currentDirection !== null && E && E(this.currentDirection));
          return;
        }
        (this.updateAxis("x", v.point, N),
          this.updateAxis("y", v.point, N),
          this.visualElement.render(),
          M && M(g, v));
      },
      m = (g, v) => this.stop(g, v),
      p = () =>
        Xt((g) => {
          var v;
          return (
            this.getAnimationState(g) === "paused" &&
            ((v = this.getAxisMotionValue(g).animation) == null
              ? void 0
              : v.play())
          );
        }),
      { dragSnapToOrigin: h } = this.getProps();
    this.panSession = new bx(
      a,
      {
        onSessionStart: o,
        onStart: c,
        onMove: f,
        onSessionEnd: m,
        resumeAnimation: p,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: h,
        contextWindow: xx(this.visualElement),
      },
    );
  }
  stop(a, s) {
    const r = this.isDragging;
    if ((this.cancel(), !r)) return;
    const { velocity: o } = s;
    this.startAnimation(o);
    const { onDragEnd: c } = this.getProps();
    c && De.postRender(() => c(a, s));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: a, animationState: s } = this.visualElement;
    (a && (a.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: r } = this.getProps();
    (!r &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      s && s.setActive("whileDrag", !1));
  }
  updateAxis(a, s, r) {
    const { drag: o } = this.getProps();
    if (!r || !_l(a, o, this.currentDirection)) return;
    const c = this.getAxisMotionValue(a);
    let f = this.originPoint[a] + r[a];
    (this.constraints &&
      this.constraints[a] &&
      (f = jA(f, this.constraints[a], this.elastic[a])),
      c.set(f));
  }
  resolveConstraints() {
    var c;
    const { dragConstraints: a, dragElastic: s } = this.getProps(),
      r =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (c = this.visualElement.projection) == null
            ? void 0
            : c.layout,
      o = this.constraints;
    (a && Ri(a)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : a && r
        ? (this.constraints = LA(r.layoutBox, a))
        : (this.constraints = !1),
      (this.elastic = UA(s)),
      o !== this.constraints &&
        r &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Xt((f) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(f) &&
            (this.constraints[f] = zA(r.layoutBox[f], this.constraints[f]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: s } = this.getProps();
    if (!a || !Ri(a)) return !1;
    const r = a.current,
      { projection: o } = this.visualElement;
    if (!o || !o.layout) return !1;
    const c = RA(r, o.root, this.visualElement.getTransformPagePoint());
    let f = VA(o.layout.layoutBox, c);
    if (s) {
      const m = s(xA(f));
      ((this.hasMutatedConstraints = !!m), m && (f = hx(m)));
    }
    return f;
  }
  startAnimation(a) {
    const {
        drag: s,
        dragMomentum: r,
        dragElastic: o,
        dragTransition: c,
        dragSnapToOrigin: f,
        onDragTransitionEnd: m,
      } = this.getProps(),
      p = this.constraints || {},
      h = Xt((g) => {
        if (!_l(g, s, this.currentDirection)) return;
        let v = (p && p[g]) || {};
        f && (v = { min: 0, max: 0 });
        const x = o ? 200 : 1e6,
          T = o ? 40 : 1e7,
          E = {
            type: "inertia",
            velocity: r ? a[g] : 0,
            bounceStiffness: x,
            bounceDamping: T,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...c,
            ...v,
          };
        return this.startAxisValueAnimation(g, E);
      });
    return Promise.all(h).then(m);
  }
  startAxisValueAnimation(a, s) {
    const r = this.getAxisMotionValue(a);
    return (
      Ef(this.visualElement, a),
      r.start(Ed(a, r, 0, s, this.visualElement, !1))
    );
  }
  stopAnimation() {
    Xt((a) => this.getAxisMotionValue(a).stop());
  }
  pauseAnimation() {
    Xt((a) => {
      var s;
      return (s = this.getAxisMotionValue(a).animation) == null
        ? void 0
        : s.pause();
    });
  }
  getAnimationState(a) {
    var s;
    return (s = this.getAxisMotionValue(a).animation) == null
      ? void 0
      : s.state;
  }
  getAxisMotionValue(a) {
    const s = `_drag${a.toUpperCase()}`,
      r = this.visualElement.getProps(),
      o = r[s];
    return (
      o ||
      this.visualElement.getValue(a, (r.initial ? r.initial[a] : void 0) || 0)
    );
  }
  snapToCursor(a) {
    Xt((s) => {
      const { drag: r } = this.getProps();
      if (!_l(s, r, this.currentDirection)) return;
      const { projection: o } = this.visualElement,
        c = this.getAxisMotionValue(s);
      if (o && o.layout) {
        const { min: f, max: m } = o.layout.layoutBox[s];
        c.set(a[s] - Pe(f, m, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: a, dragConstraints: s } = this.getProps(),
      { projection: r } = this.visualElement;
    if (!Ri(s) || !r || !this.constraints) return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Xt((f) => {
      const m = this.getAxisMotionValue(f);
      if (m && this.constraints !== !1) {
        const p = m.get();
        o[f] = _A({ min: p, max: p }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = c ? c({}, "") : "none"),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      Xt((f) => {
        if (!_l(f, a, null)) return;
        const m = this.getAxisMotionValue(f),
          { min: p, max: h } = this.constraints[f];
        m.set(Pe(p, h, o[f]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    BA.set(this.visualElement, this);
    const a = this.visualElement.current,
      s = Zs(a, "pointerdown", (p) => {
        const { drag: h, dragListener: g = !0 } = this.getProps();
        h && g && this.start(p);
      }),
      r = () => {
        const { dragConstraints: p } = this.getProps();
        Ri(p) && p.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: o } = this.visualElement,
      c = o.addEventListener("measure", r);
    (o && !o.layout && (o.root && o.root.updateScroll(), o.updateLayout()),
      De.read(r));
    const f = rr(window, "resize", () => this.scalePositionWithinConstraints()),
      m = o.addEventListener(
        "didUpdate",
        ({ delta: p, hasLayoutChanged: h }) => {
          this.isDragging &&
            h &&
            (Xt((g) => {
              const v = this.getAxisMotionValue(g);
              v &&
                ((this.originPoint[g] += p[g].translate),
                v.set(v.get() + p[g].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      (f(), s(), c(), m && m());
    };
  }
  getProps() {
    const a = this.visualElement.getProps(),
      {
        drag: s = !1,
        dragDirectionLock: r = !1,
        dragPropagation: o = !1,
        dragConstraints: c = !1,
        dragElastic: f = Of,
        dragMomentum: m = !0,
      } = a;
    return {
      ...a,
      drag: s,
      dragDirectionLock: r,
      dragPropagation: o,
      dragConstraints: c,
      dragElastic: f,
      dragMomentum: m,
    };
  }
}
function _l(n, a, s) {
  return (a === !0 || a === n) && (s === null || s === n);
}
function PA(n, a = 10) {
  let s = null;
  return (Math.abs(n.y) > a ? (s = "y") : Math.abs(n.x) > a && (s = "x"), s);
}
class HA extends ca {
  constructor(a) {
    (super(a),
      (this.removeGroupControls = At),
      (this.removeListeners = At),
      (this.controls = new kA(a)));
  }
  mount() {
    const { dragControls: a } = this.node.getProps();
    (a && (this.removeGroupControls = a.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || At));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const wy = (n) => (a, s) => {
  n && De.postRender(() => n(a, s));
};
class GA extends ca {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = At));
  }
  onPointerDown(a) {
    this.session = new bx(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: xx(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: a,
      onPanStart: s,
      onPan: r,
      onPanEnd: o,
    } = this.node.getProps();
    return {
      onSessionStart: wy(a),
      onStart: wy(s),
      onMove: r,
      onEnd: (c, f) => {
        (delete this.session, o && De.postRender(() => o(c, f)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Zs(this.node.current, "pointerdown", (a) =>
      this.onPointerDown(a),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const Yl = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Ay(n, a) {
  return a.max === a.min ? 0 : (n / (a.max - a.min)) * 100;
}
const Ps = {
    correct: (n, a) => {
      if (!a.target) return n;
      if (typeof n == "string")
        if (he.test(n)) n = parseFloat(n);
        else return n;
      const s = Ay(n, a.target.x),
        r = Ay(n, a.target.y);
      return `${s}% ${r}%`;
    },
  },
  YA = {
    correct: (n, { treeScale: a, projectionDelta: s }) => {
      const r = n,
        o = ua.parse(n);
      if (o.length > 5) return r;
      const c = ua.createTransformer(n),
        f = typeof o[0] != "number" ? 1 : 0,
        m = s.x.scale * a.x,
        p = s.y.scale * a.y;
      ((o[0 + f] /= m), (o[1 + f] /= p));
      const h = Pe(m, p, 0.5);
      return (
        typeof o[2 + f] == "number" && (o[2 + f] /= h),
        typeof o[3 + f] == "number" && (o[3 + f] /= h),
        c(o)
      );
    },
  };
class qA extends C.Component {
  componentDidMount() {
    const {
        visualElement: a,
        layoutGroup: s,
        switchLayoutGroup: r,
        layoutId: o,
      } = this.props,
      { projection: c } = a;
    (M2(KA),
      c &&
        (s.group && s.group.add(c),
        r && r.register && o && r.register(c),
        c.root.didUpdate(),
        c.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        c.setOptions({
          ...c.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Yl.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(a) {
    const {
        layoutDependency: s,
        visualElement: r,
        drag: o,
        isPresent: c,
      } = this.props,
      { projection: f } = r;
    return (
      f &&
        ((f.isPresent = c),
        o || a.layoutDependency !== s || s === void 0 || a.isPresent !== c
          ? f.willUpdate()
          : this.safeToRemove(),
        a.isPresent !== c &&
          (c
            ? f.promote()
            : f.relegate() ||
              De.postRender(() => {
                const m = f.getStack();
                (!m || !m.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: a } = this.props.visualElement;
    a &&
      (a.root.didUpdate(),
      fd.postRender(() => {
        !a.currentAnimation && a.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: a,
        layoutGroup: s,
        switchLayoutGroup: r,
      } = this.props,
      { projection: o } = a;
    o &&
      (o.scheduleCheckAfterUnmount(),
      s && s.group && s.group.remove(o),
      r && r.deregister && r.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: a } = this.props;
    a && a();
  }
  render() {
    return null;
  }
}
function Tx(n) {
  const [a, s] = h2(),
    r = C.useContext(i0);
  return A.jsx(qA, {
    ...n,
    layoutGroup: r,
    switchLayoutGroup: C.useContext(W0),
    isPresent: a,
    safeToRemove: s,
  });
}
const KA = {
  borderRadius: {
    ...Ps,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: Ps,
  borderTopRightRadius: Ps,
  borderBottomLeftRadius: Ps,
  borderBottomRightRadius: Ps,
  boxShadow: YA,
};
function FA(n, a, s) {
  const r = st(n) ? n : en(n);
  return (r.start(Ed("", r, a, s)), r.animation);
}
const $A = (n, a) => n.depth - a.depth;
class XA {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(a) {
    (Yf(this.children, a), (this.isDirty = !0));
  }
  remove(a) {
    (qf(this.children, a), (this.isDirty = !0));
  }
  forEach(a) {
    (this.isDirty && this.children.sort($A),
      (this.isDirty = !1),
      this.children.forEach(a));
  }
}
function ZA(n, a) {
  const s = wt.now(),
    r = ({ timestamp: o }) => {
      const c = o - s;
      c >= a && (tn(r), n(c - a));
    };
  return (De.setup(r, !0), () => tn(r));
}
const Ex = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  QA = Ex.length,
  Cy = (n) => (typeof n == "string" ? parseFloat(n) : n),
  Oy = (n) => typeof n == "number" || he.test(n);
function IA(n, a, s, r, o, c) {
  o
    ? ((n.opacity = Pe(0, s.opacity ?? 1, JA(r))),
      (n.opacityExit = Pe(a.opacity ?? 1, 0, WA(r))))
    : c && (n.opacity = Pe(a.opacity ?? 1, s.opacity ?? 1, r));
  for (let f = 0; f < QA; f++) {
    const m = `border${Ex[f]}Radius`;
    let p = Ry(a, m),
      h = Ry(s, m);
    if (p === void 0 && h === void 0) continue;
    (p || (p = 0),
      h || (h = 0),
      p === 0 || h === 0 || Oy(p) === Oy(h)
        ? ((n[m] = Math.max(Pe(Cy(p), Cy(h), r), 0)),
          (dn.test(h) || dn.test(p)) && (n[m] += "%"))
        : (n[m] = h));
  }
  (a.rotate || s.rotate) && (n.rotate = Pe(a.rotate || 0, s.rotate || 0, r));
}
function Ry(n, a) {
  return n[a] !== void 0 ? n[a] : n.borderRadius;
}
const JA = wx(0, 0.5, m0),
  WA = wx(0.5, 0.95, At);
function wx(n, a, s) {
  return (r) => (r < n ? 0 : r > a ? 1 : s(ji(n, a, r)));
}
function Dy(n, a) {
  ((n.min = a.min), (n.max = a.max));
}
function $t(n, a) {
  (Dy(n.x, a.x), Dy(n.y, a.y));
}
function My(n, a) {
  ((n.translate = a.translate),
    (n.scale = a.scale),
    (n.originPoint = a.originPoint),
    (n.origin = a.origin));
}
function Ny(n, a, s, r, o) {
  return (
    (n -= a),
    (n = Jl(n, 1 / s, r)),
    o !== void 0 && (n = Jl(n, 1 / o, r)),
    n
  );
}
function eC(n, a = 0, s = 1, r = 0.5, o, c = n, f = n) {
  if (
    (dn.test(a) &&
      ((a = parseFloat(a)), (a = Pe(f.min, f.max, a / 100) - f.min)),
    typeof a != "number")
  )
    return;
  let m = Pe(c.min, c.max, r);
  (n === c && (m -= a),
    (n.min = Ny(n.min, a, s, m, o)),
    (n.max = Ny(n.max, a, s, m, o)));
}
function jy(n, a, [s, r, o], c, f) {
  eC(n, a[s], a[r], a[o], a.scale, c, f);
}
const tC = ["x", "scaleX", "originX"],
  nC = ["y", "scaleY", "originY"];
function Ly(n, a, s, r) {
  (jy(n.x, a, tC, s ? s.x : void 0, r ? r.x : void 0),
    jy(n.y, a, nC, s ? s.y : void 0, r ? r.y : void 0));
}
function Vy(n) {
  return n.translate === 0 && n.scale === 1;
}
function Ax(n) {
  return Vy(n.x) && Vy(n.y);
}
function _y(n, a) {
  return n.min === a.min && n.max === a.max;
}
function aC(n, a) {
  return _y(n.x, a.x) && _y(n.y, a.y);
}
function zy(n, a) {
  return (
    Math.round(n.min) === Math.round(a.min) &&
    Math.round(n.max) === Math.round(a.max)
  );
}
function Cx(n, a) {
  return zy(n.x, a.x) && zy(n.y, a.y);
}
function Uy(n) {
  return vt(n.x) / vt(n.y);
}
function By(n, a) {
  return (
    n.translate === a.translate &&
    n.scale === a.scale &&
    n.originPoint === a.originPoint
  );
}
class iC {
  constructor() {
    this.members = [];
  }
  add(a) {
    (Yf(this.members, a), a.scheduleRender());
  }
  remove(a) {
    if (
      (qf(this.members, a),
      a === this.prevLead && (this.prevLead = void 0),
      a === this.lead)
    ) {
      const s = this.members[this.members.length - 1];
      s && this.promote(s);
    }
  }
  relegate(a) {
    const s = this.members.findIndex((o) => a === o);
    if (s === 0) return !1;
    let r;
    for (let o = s; o >= 0; o--) {
      const c = this.members[o];
      if (c.isPresent !== !1) {
        r = c;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(a, s) {
    const r = this.lead;
    if (a !== r && ((this.prevLead = r), (this.lead = a), a.show(), r)) {
      (r.instance && r.scheduleRender(),
        a.scheduleRender(),
        (a.resumeFrom = r),
        s && (a.resumeFrom.preserveOpacity = !0),
        r.snapshot &&
          ((a.snapshot = r.snapshot),
          (a.snapshot.latestValues = r.animationValues || r.latestValues)),
        a.root && a.root.isUpdating && (a.isLayoutDirty = !0));
      const { crossfade: o } = a.options;
      o === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((a) => {
      const { options: s, resumingFrom: r } = a;
      (s.onExitComplete && s.onExitComplete(),
        r && r.options.onExitComplete && r.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((a) => {
      a.instance && a.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function sC(n, a, s) {
  let r = "";
  const o = n.x.translate / a.x,
    c = n.y.translate / a.y,
    f = (s == null ? void 0 : s.z) || 0;
  if (
    ((o || c || f) && (r = `translate3d(${o}px, ${c}px, ${f}px) `),
    (a.x !== 1 || a.y !== 1) && (r += `scale(${1 / a.x}, ${1 / a.y}) `),
    s)
  ) {
    const {
      transformPerspective: h,
      rotate: g,
      rotateX: v,
      rotateY: x,
      skewX: T,
      skewY: E,
    } = s;
    (h && (r = `perspective(${h}px) ${r}`),
      g && (r += `rotate(${g}deg) `),
      v && (r += `rotateX(${v}deg) `),
      x && (r += `rotateY(${x}deg) `),
      T && (r += `skewX(${T}deg) `),
      E && (r += `skewY(${E}deg) `));
  }
  const m = n.x.scale * a.x,
    p = n.y.scale * a.y;
  return ((m !== 1 || p !== 1) && (r += `scale(${m}, ${p})`), r || "none");
}
const Kc = ["", "X", "Y", "Z"],
  rC = { visibility: "hidden" },
  lC = 1e3;
let oC = 0;
function Fc(n, a, s, r) {
  const { latestValues: o } = a;
  o[n] && ((s[n] = o[n]), a.setStaticValue(n, 0), r && (r[n] = 0));
}
function Ox(n) {
  if (((n.hasCheckedOptimisedAppear = !0), n.root === n)) return;
  const { visualElement: a } = n.options;
  if (!a) return;
  const s = ox(a);
  if (window.MotionHasOptimisedAnimation(s, "transform")) {
    const { layout: o, layoutId: c } = n.options;
    window.MotionCancelOptimisedAnimation(s, "transform", De, !(o || c));
  }
  const { parent: r } = n;
  r && !r.hasCheckedOptimisedAppear && Ox(r);
}
function Rx({
  attachResizeListener: n,
  defaultParent: a,
  measureScroll: s,
  checkIsScrollRoot: r,
  resetTransform: o,
}) {
  return class {
    constructor(f = {}, m = a == null ? void 0 : a()) {
      ((this.id = oC++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(fC),
            this.nodes.forEach(gC),
            this.nodes.forEach(yC),
            this.nodes.forEach(dC));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = f),
        (this.root = m ? m.root || m : this),
        (this.path = m ? [...m.path, m] : []),
        (this.parent = m),
        (this.depth = m ? m.depth + 1 : 0));
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new XA());
    }
    addEventListener(f, m) {
      return (
        this.eventHandlers.has(f) || this.eventHandlers.set(f, new $f()),
        this.eventHandlers.get(f).add(m)
      );
    }
    notifyListeners(f, ...m) {
      const p = this.eventHandlers.get(f);
      p && p.notify(...m);
    }
    hasListeners(f) {
      return this.eventHandlers.has(f);
    }
    mount(f) {
      if (this.instance) return;
      ((this.isSVG = hd(f) && !o2(f)), (this.instance = f));
      const { layoutId: m, layout: p, visualElement: h } = this.options;
      if (
        (h && !h.current && h.mount(f),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (p || m) && (this.isLayoutDirty = !0),
        n)
      ) {
        let g;
        const v = () => (this.root.updateBlockedByResize = !1);
        n(f, () => {
          ((this.root.updateBlockedByResize = !0),
            g && g(),
            (g = ZA(v, 250)),
            Yl.hasAnimatedSinceResize &&
              ((Yl.hasAnimatedSinceResize = !1), this.nodes.forEach(Py)));
        });
      }
      (m && this.root.registerSharedNode(m, this),
        this.options.animate !== !1 &&
          h &&
          (m || p) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: g,
              hasLayoutChanged: v,
              hasRelativeLayoutChanged: x,
              layout: T,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const E =
                  this.options.transition || h.getDefaultTransition() || TC,
                { onLayoutAnimationStart: M, onLayoutAnimationComplete: N } =
                  h.getProps(),
                R = !this.targetLayout || !Cx(this.targetLayout, T),
                G = !v && x;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                G ||
                (v && (R || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const V = { ...od(E, "layout"), onPlay: M, onComplete: N };
                ((h.shouldReduceMotion || this.options.layoutRoot) &&
                  ((V.delay = 0), (V.type = !1)),
                  this.startAnimation(V),
                  this.setAnimationOrigin(g, G));
              } else
                (v || Py(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete());
              this.targetLayout = T;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      const f = this.getStack();
      (f && f.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        tn(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(vC),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options;
      return f && f.getProps().transformTemplate;
    }
    willUpdate(f = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          Ox(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        ((v.shouldResetTransform = !0),
          v.updateScroll("snapshot"),
          v.options.layoutRoot && v.willUpdate(!1));
      }
      const { layoutId: m, layout: p } = this.options;
      if (m === void 0 && !p) return;
      const h = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = h
        ? h(this.latestValues, "")
        : void 0),
        this.updateSnapshot(),
        f && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(ky));
        return;
      }
      (this.isUpdating || this.nodes.forEach(mC),
        (this.isUpdating = !1),
        this.nodes.forEach(pC),
        this.nodes.forEach(uC),
        this.nodes.forEach(cC),
        this.clearAllSnapshots());
      const m = wt.now();
      ((it.delta = mn(0, 1e3 / 60, m - it.timestamp)),
        (it.timestamp = m),
        (it.isProcessing = !0),
        Uc.update.process(it),
        Uc.preRender.process(it),
        Uc.render.process(it),
        (it.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), fd.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(hC), this.sharedNodes.forEach(xC));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        De.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      De.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !vt(this.snapshot.measuredBox.x) &&
          !vt(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++) this.path[p].updateScroll();
      const f = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = $e()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: m } = this.options;
      m &&
        m.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          f ? f.layoutBox : void 0,
        );
    }
    updateScroll(f = "measure") {
      let m = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === f &&
          (m = !1),
        m && this.instance)
      ) {
        const p = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: p,
          offset: s(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p,
        };
      }
    }
    resetTransform() {
      if (!o) return;
      const f =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        m = this.projectionDelta && !Ax(this.projectionDelta),
        p = this.getTransformTemplate(),
        h = p ? p(this.latestValues, "") : void 0,
        g = h !== this.prevTransformTemplateValue;
      f &&
        this.instance &&
        (m || Ma(this.latestValues) || g) &&
        (o(this.instance, h),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(f = !0) {
      const m = this.measurePageBox();
      let p = this.removeElementScroll(m);
      return (
        f && (p = this.removeTransform(p)),
        EC(p),
        {
          animationId: this.root.animationId,
          measuredBox: m,
          layoutBox: p,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var h;
      const { visualElement: f } = this.options;
      if (!f) return $e();
      const m = f.measureViewportBox();
      if (
        !(
          ((h = this.scroll) == null ? void 0 : h.wasRoot) || this.path.some(wC)
        )
      ) {
        const { scroll: g } = this.root;
        g && (Mi(m.x, g.offset.x), Mi(m.y, g.offset.y));
      }
      return m;
    }
    removeElementScroll(f) {
      var p;
      const m = $e();
      if (($t(m, f), (p = this.scroll) != null && p.wasRoot)) return m;
      for (let h = 0; h < this.path.length; h++) {
        const g = this.path[h],
          { scroll: v, options: x } = g;
        g !== this.root &&
          v &&
          x.layoutScroll &&
          (v.wasRoot && $t(m, f), Mi(m.x, v.offset.x), Mi(m.y, v.offset.y));
      }
      return m;
    }
    applyTransform(f, m = !1) {
      const p = $e();
      $t(p, f);
      for (let h = 0; h < this.path.length; h++) {
        const g = this.path[h];
        (!m &&
          g.options.layoutScroll &&
          g.scroll &&
          g !== g.root &&
          Ni(p, { x: -g.scroll.offset.x, y: -g.scroll.offset.y }),
          Ma(g.latestValues) && Ni(p, g.latestValues));
      }
      return (Ma(this.latestValues) && Ni(p, this.latestValues), p);
    }
    removeTransform(f) {
      const m = $e();
      $t(m, f);
      for (let p = 0; p < this.path.length; p++) {
        const h = this.path[p];
        if (!h.instance || !Ma(h.latestValues)) continue;
        Af(h.latestValues) && h.updateSnapshot();
        const g = $e(),
          v = h.measurePageBox();
        ($t(g, v),
          Ly(m, h.latestValues, h.snapshot ? h.snapshot.layoutBox : void 0, g));
      }
      return (Ma(this.latestValues) && Ly(m, this.latestValues), m);
    }
    setTargetDelta(f) {
      ((this.targetDelta = f),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(f) {
      this.options = {
        ...this.options,
        ...f,
        crossfade: f.crossfade !== void 0 ? f.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== it.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      var x;
      const m = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = m.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = m.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = m.isSharedProjectionDirty));
      const p = !!this.resumingFrom || this !== m;
      if (
        !(
          f ||
          (p && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          ((x = this.parent) != null && x.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: g, layoutId: v } = this.options;
      if (!(!this.layout || !(g || v))) {
        if (
          ((this.resolvedRelativeTargetAt = it.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const T = this.getClosestProjectingParent();
          T && T.layout && this.animationProgress !== 1
            ? ((this.relativeParent = T),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = $e()),
              (this.relativeTargetOrigin = $e()),
              Is(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                T.layout.layoutBox,
              ),
              $t(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = $e()), (this.targetWithTransforms = $e())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              CA(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : $t(this.target, this.layout.layoutBox),
                yx(this.target, this.targetDelta))
              : $t(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const T = this.getClosestProjectingParent();
          T &&
          !!T.resumingFrom == !!this.resumingFrom &&
          !T.options.layoutScroll &&
          T.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = T),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = $e()),
              (this.relativeTargetOrigin = $e()),
              Is(this.relativeTargetOrigin, this.target, T.target),
              $t(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Af(this.parent.latestValues) ||
          gx(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var E;
      const f = this.getLead(),
        m = !!this.resumingFrom || this !== f;
      let p = !0;
      if (
        ((this.isProjectionDirty ||
          ((E = this.parent) != null && E.isProjectionDirty)) &&
          (p = !1),
        m &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (p = !1),
        this.resolvedRelativeTargetAt === it.timestamp && (p = !1),
        p)
      )
        return;
      const { layout: h, layoutId: g } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(h || g))
      )
        return;
      $t(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x,
        x = this.treeScale.y;
      (OA(this.layoutCorrected, this.treeScale, this.path, m),
        f.layout &&
          !f.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((f.target = f.layout.layoutBox), (f.targetWithTransforms = $e())));
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (My(this.prevProjectionDelta.x, this.projectionDelta.x),
          My(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Qs(this.projectionDelta, this.layoutCorrected, T, this.latestValues),
        (this.treeScale.x !== v ||
          this.treeScale.y !== x ||
          !By(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !By(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", T)));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(f = !0) {
      var m;
      if (((m = this.options.visualElement) == null || m.scheduleRender(), f)) {
        const p = this.getStack();
        p && p.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = Di()),
        (this.projectionDelta = Di()),
        (this.projectionDeltaWithTransform = Di()));
    }
    setAnimationOrigin(f, m = !1) {
      const p = this.snapshot,
        h = p ? p.latestValues : {},
        g = { ...this.latestValues },
        v = Di();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !m));
      const x = $e(),
        T = p ? p.source : void 0,
        E = this.layout ? this.layout.source : void 0,
        M = T !== E,
        N = this.getStack(),
        R = !N || N.members.length <= 1,
        G = !!(M && !R && this.options.crossfade === !0 && !this.path.some(SC));
      this.animationProgress = 0;
      let V;
      ((this.mixTargetDelta = (Q) => {
        const q = Q / 1e3;
        (Hy(v.x, f.x, q),
          Hy(v.y, f.y, q),
          this.setTargetDelta(v),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Is(x, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            bC(this.relativeTarget, this.relativeTargetOrigin, x, q),
            V && aC(this.relativeTarget, V) && (this.isProjectionDirty = !1),
            V || (V = $e()),
            $t(V, this.relativeTarget)),
          M &&
            ((this.animationValues = g), IA(g, h, this.latestValues, q, G, R)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = q));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(f) {
      var m, p, h;
      (this.notifyListeners("animationStart"),
        (m = this.currentAnimation) == null || m.stop(),
        (h = (p = this.resumingFrom) == null ? void 0 : p.currentAnimation) ==
          null || h.stop(),
        this.pendingAnimation &&
          (tn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = De.update(() => {
          ((Yl.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = en(0)),
            (this.currentAnimation = FA(this.motionValue, [0, 1e3], {
              ...f,
              isSync: !0,
              onUpdate: (g) => {
                (this.mixTargetDelta(g), f.onUpdate && f.onUpdate(g));
              },
              onStop: () => {},
              onComplete: () => {
                (f.onComplete && f.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const f = this.getStack();
      (f && f.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(lC),
        this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let {
        targetWithTransforms: m,
        target: p,
        layout: h,
        latestValues: g,
      } = f;
      if (!(!m || !p || !h)) {
        if (
          this !== f &&
          this.layout &&
          h &&
          Dx(this.options.animationType, this.layout.layoutBox, h.layoutBox)
        ) {
          p = this.target || $e();
          const v = vt(this.layout.layoutBox.x);
          ((p.x.min = f.target.x.min), (p.x.max = p.x.min + v));
          const x = vt(this.layout.layoutBox.y);
          ((p.y.min = f.target.y.min), (p.y.max = p.y.min + x));
        }
        ($t(m, p),
          Ni(m, g),
          Qs(this.projectionDeltaWithTransform, this.layoutCorrected, m, g));
      }
    }
    registerSharedNode(f, m) {
      (this.sharedNodes.has(f) || this.sharedNodes.set(f, new iC()),
        this.sharedNodes.get(f).add(m));
      const h = m.options.initialPromotionConfig;
      m.promote({
        transition: h ? h.transition : void 0,
        preserveFollowOpacity:
          h && h.shouldPreserveFollowOpacity
            ? h.shouldPreserveFollowOpacity(m)
            : void 0,
      });
    }
    isLead() {
      const f = this.getStack();
      return f ? f.lead === this : !0;
    }
    getLead() {
      var m;
      const { layoutId: f } = this.options;
      return f
        ? ((m = this.getStack()) == null ? void 0 : m.lead) || this
        : this;
    }
    getPrevLead() {
      var m;
      const { layoutId: f } = this.options;
      return f ? ((m = this.getStack()) == null ? void 0 : m.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: f } = this.options;
      if (f) return this.root.sharedNodes.get(f);
    }
    promote({ needsReset: f, transition: m, preserveFollowOpacity: p } = {}) {
      const h = this.getStack();
      (h && h.promote(this, p),
        f && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        m && this.setOptions({ transition: m }));
    }
    relegate() {
      const f = this.getStack();
      return f ? f.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options;
      if (!f) return;
      let m = !1;
      const { latestValues: p } = f;
      if (
        ((p.z ||
          p.rotate ||
          p.rotateX ||
          p.rotateY ||
          p.rotateZ ||
          p.skewX ||
          p.skewY) &&
          (m = !0),
        !m)
      )
        return;
      const h = {};
      p.z && Fc("z", f, h, this.animationValues);
      for (let g = 0; g < Kc.length; g++)
        (Fc(`rotate${Kc[g]}`, f, h, this.animationValues),
          Fc(`skew${Kc[g]}`, f, h, this.animationValues));
      f.render();
      for (const g in h)
        (f.setStaticValue(g, h[g]),
          this.animationValues && (this.animationValues[g] = h[g]));
      f.scheduleRender();
    }
    getProjectionStyles(f) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return rC;
      const m = { visibility: "" },
        p = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (m.opacity = ""),
          (m.pointerEvents = Gl(f == null ? void 0 : f.pointerEvents) || ""),
          (m.transform = p ? p(this.latestValues, "") : "none"),
          m
        );
      const h = this.getLead();
      if (!this.projectionDelta || !this.layout || !h.target) {
        const T = {};
        return (
          this.options.layoutId &&
            ((T.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (T.pointerEvents = Gl(f == null ? void 0 : f.pointerEvents) || "")),
          this.hasProjected &&
            !Ma(this.latestValues) &&
            ((T.transform = p ? p({}, "") : "none"), (this.hasProjected = !1)),
          T
        );
      }
      const g = h.animationValues || h.latestValues;
      (this.applyTransformsToTarget(),
        (m.transform = sC(
          this.projectionDeltaWithTransform,
          this.treeScale,
          g,
        )),
        p && (m.transform = p(g, m.transform)));
      const { x: v, y: x } = this.projectionDelta;
      ((m.transformOrigin = `${v.origin * 100}% ${x.origin * 100}% 0`),
        h.animationValues
          ? (m.opacity =
              h === this
                ? (g.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : g.opacityExit)
          : (m.opacity =
              h === this
                ? g.opacity !== void 0
                  ? g.opacity
                  : ""
                : g.opacityExit !== void 0
                  ? g.opacityExit
                  : 0));
      for (const T in ir) {
        if (g[T] === void 0) continue;
        const { correct: E, applyTo: M, isCSSVariable: N } = ir[T],
          R = m.transform === "none" ? g[T] : E(g[T], h);
        if (M) {
          const G = M.length;
          for (let V = 0; V < G; V++) m[M[V]] = R;
        } else
          N ? (this.options.visualElement.renderState.vars[T] = R) : (m[T] = R);
      }
      return (
        this.options.layoutId &&
          (m.pointerEvents =
            h === this
              ? Gl(f == null ? void 0 : f.pointerEvents) || ""
              : "none"),
        m
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((f) => {
        var m;
        return (m = f.currentAnimation) == null ? void 0 : m.stop();
      }),
        this.root.nodes.forEach(ky),
        this.root.sharedNodes.clear());
    }
  };
}
function uC(n) {
  n.updateLayout();
}
function cC(n) {
  var s;
  const a = ((s = n.resumeFrom) == null ? void 0 : s.snapshot) || n.snapshot;
  if (n.isLead() && n.layout && a && n.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: o } = n.layout,
      { animationType: c } = n.options,
      f = a.source !== n.layout.source;
    c === "size"
      ? Xt((v) => {
          const x = f ? a.measuredBox[v] : a.layoutBox[v],
            T = vt(x);
          ((x.min = r[v].min), (x.max = x.min + T));
        })
      : Dx(c, a.layoutBox, r) &&
        Xt((v) => {
          const x = f ? a.measuredBox[v] : a.layoutBox[v],
            T = vt(r[v]);
          ((x.max = x.min + T),
            n.relativeTarget &&
              !n.currentAnimation &&
              ((n.isProjectionDirty = !0),
              (n.relativeTarget[v].max = n.relativeTarget[v].min + T)));
        });
    const m = Di();
    Qs(m, r, a.layoutBox);
    const p = Di();
    f ? Qs(p, n.applyTransform(o, !0), a.measuredBox) : Qs(p, r, a.layoutBox);
    const h = !Ax(m);
    let g = !1;
    if (!n.resumeFrom) {
      const v = n.getClosestProjectingParent();
      if (v && !v.resumeFrom) {
        const { snapshot: x, layout: T } = v;
        if (x && T) {
          const E = $e();
          Is(E, a.layoutBox, x.layoutBox);
          const M = $e();
          (Is(M, r, T.layoutBox),
            Cx(E, M) || (g = !0),
            v.options.layoutRoot &&
              ((n.relativeTarget = M),
              (n.relativeTargetOrigin = E),
              (n.relativeParent = v)));
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: r,
      snapshot: a,
      delta: p,
      layoutDelta: m,
      hasLayoutChanged: h,
      hasRelativeLayoutChanged: g,
    });
  } else if (n.isLead()) {
    const { onExitComplete: r } = n.options;
    r && r();
  }
  n.options.transition = void 0;
}
function fC(n) {
  n.parent &&
    (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty),
    n.isSharedProjectionDirty ||
      (n.isSharedProjectionDirty = !!(
        n.isProjectionDirty ||
        n.parent.isProjectionDirty ||
        n.parent.isSharedProjectionDirty
      )),
    n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function dC(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function hC(n) {
  n.clearSnapshot();
}
function ky(n) {
  n.clearMeasurements();
}
function mC(n) {
  n.isLayoutDirty = !1;
}
function pC(n) {
  const { visualElement: a } = n.options;
  (a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"),
    n.resetTransform());
}
function Py(n) {
  (n.finishAnimation(),
    (n.targetDelta = n.relativeTarget = n.target = void 0),
    (n.isProjectionDirty = !0));
}
function gC(n) {
  n.resolveTargetDelta();
}
function yC(n) {
  n.calcProjection();
}
function vC(n) {
  n.resetSkewAndRotation();
}
function xC(n) {
  n.removeLeadSnapshot();
}
function Hy(n, a, s) {
  ((n.translate = Pe(a.translate, 0, s)),
    (n.scale = Pe(a.scale, 1, s)),
    (n.origin = a.origin),
    (n.originPoint = a.originPoint));
}
function Gy(n, a, s, r) {
  ((n.min = Pe(a.min, s.min, r)), (n.max = Pe(a.max, s.max, r)));
}
function bC(n, a, s, r) {
  (Gy(n.x, a.x, s.x, r), Gy(n.y, a.y, s.y, r));
}
function SC(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const TC = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Yy = (n) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(n),
  qy = Yy("applewebkit/") && !Yy("chrome/") ? Math.round : At;
function Ky(n) {
  ((n.min = qy(n.min)), (n.max = qy(n.max)));
}
function EC(n) {
  (Ky(n.x), Ky(n.y));
}
function Dx(n, a, s) {
  return (
    n === "position" || (n === "preserve-aspect" && !AA(Uy(a), Uy(s), 0.2))
  );
}
function wC(n) {
  var a;
  return n !== n.root && ((a = n.scroll) == null ? void 0 : a.wasRoot);
}
const AC = Rx({
    attachResizeListener: (n, a) => rr(n, "resize", a),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  $c = { current: void 0 },
  Mx = Rx({
    measureScroll: (n) => ({ x: n.scrollLeft, y: n.scrollTop }),
    defaultParent: () => {
      if (!$c.current) {
        const n = new AC({});
        (n.mount(window), n.setOptions({ layoutScroll: !0 }), ($c.current = n));
      }
      return $c.current;
    },
    resetTransform: (n, a) => {
      n.style.transform = a !== void 0 ? a : "none";
    },
    checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed",
  }),
  CC = {
    pan: { Feature: GA },
    drag: { Feature: HA, ProjectionNode: Mx, MeasureLayout: Tx },
  };
function Fy(n, a, s) {
  const { props: r } = n;
  n.animationState &&
    r.whileHover &&
    n.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s,
    c = r[o];
  c && De.postRender(() => c(a, gr(a)));
}
class OC extends ca {
  mount() {
    const { current: a } = this.node;
    a &&
      (this.unmount = a2(
        a,
        (s, r) => (Fy(this.node, r, "Start"), (o) => Fy(this.node, o, "End")),
      ));
  }
  unmount() {}
}
class RC extends ca {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let a = !1;
    try {
      a = this.node.current.matches(":focus-visible");
    } catch {
      a = !0;
    }
    !a ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = hr(
      rr(this.node.current, "focus", () => this.onFocus()),
      rr(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function $y(n, a, s) {
  const { props: r } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled) return;
  n.animationState &&
    r.whileTap &&
    n.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s),
    c = r[o];
  c && De.postRender(() => c(a, gr(a)));
}
class DC extends ca {
  mount() {
    const { current: a } = this.node;
    a &&
      (this.unmount = l2(
        a,
        (s, r) => (
          $y(this.node, r, "Start"),
          (o, { success: c }) => $y(this.node, o, c ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const Rf = new WeakMap(),
  Xc = new WeakMap(),
  MC = (n) => {
    const a = Rf.get(n.target);
    a && a(n);
  },
  NC = (n) => {
    n.forEach(MC);
  };
function jC({ root: n, ...a }) {
  const s = n || document;
  Xc.has(s) || Xc.set(s, {});
  const r = Xc.get(s),
    o = JSON.stringify(a);
  return (
    r[o] || (r[o] = new IntersectionObserver(NC, { root: n, ...a })),
    r[o]
  );
}
function LC(n, a, s) {
  const r = jC(a);
  return (
    Rf.set(n, s),
    r.observe(n),
    () => {
      (Rf.delete(n), r.unobserve(n));
    }
  );
}
const VC = { some: 0, all: 1 };
class _C extends ca {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: a = {} } = this.node.getProps(),
      { root: s, margin: r, amount: o = "some", once: c } = a,
      f = {
        root: s ? s.current : void 0,
        rootMargin: r,
        threshold: typeof o == "number" ? o : VC[o],
      },
      m = (p) => {
        const { isIntersecting: h } = p;
        if (
          this.isInView === h ||
          ((this.isInView = h), c && !h && this.hasEnteredView)
        )
          return;
        (h && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", h));
        const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(),
          x = h ? g : v;
        x && x(p);
      };
    return LC(this.node.current, f, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(zC(a, s)) && this.startObserver();
  }
  unmount() {}
}
function zC({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (s) => n[s] !== a[s];
}
const UC = {
    inView: { Feature: _C },
    tap: { Feature: DC },
    focus: { Feature: RC },
    hover: { Feature: OC },
  },
  BC = { layout: { ProjectionNode: Mx, MeasureLayout: Tx } },
  Df = { current: null },
  Nx = { current: !1 };
function kC() {
  if (((Nx.current = !0), !!Hf))
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"),
        a = () => (Df.current = n.matches);
      (n.addListener(a), a());
    } else Df.current = !1;
}
const PC = new WeakMap();
function HC(n, a, s) {
  for (const r in a) {
    const o = a[r],
      c = s[r];
    if (st(o)) n.addValue(r, o);
    else if (st(c)) n.addValue(r, en(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(r)) {
        const f = n.getValue(r);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = n.getStaticValue(r);
        n.addValue(r, en(f !== void 0 ? f : o, { owner: n }));
      }
  }
  for (const r in s) a[r] === void 0 && n.removeValue(r);
  return a;
}
const Xy = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class GC {
  scrapeMotionValuesFromProps(a, s, r) {
    return {};
  }
  constructor(
    {
      parent: a,
      props: s,
      presenceContext: r,
      reducedMotionConfig: o,
      blockInitialAnimation: c,
      visualState: f,
    },
    m = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = rd),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const x = wt.now();
        this.renderScheduledAt < x &&
          ((this.renderScheduledAt = x), De.render(this.render, !1, !0));
      }));
    const { latestValues: p, renderState: h } = f;
    ((this.latestValues = p),
      (this.baseTarget = { ...p }),
      (this.initialValues = s.initial ? { ...p } : {}),
      (this.renderState = h),
      (this.parent = a),
      (this.props = s),
      (this.presenceContext = r),
      (this.depth = a ? a.depth + 1 : 0),
      (this.reducedMotionConfig = o),
      (this.options = m),
      (this.blockInitialAnimation = !!c),
      (this.isControllingVariants = go(s)),
      (this.isVariantNode = I0(s)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(a && a.current)));
    const { willChange: g, ...v } = this.scrapeMotionValuesFromProps(
      s,
      {},
      this,
    );
    for (const x in v) {
      const T = v[x];
      p[x] !== void 0 && st(T) && T.set(p[x], !1);
    }
  }
  mount(a) {
    ((this.current = a),
      PC.set(a, this),
      this.projection && !this.projection.instance && this.projection.mount(a),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((s, r) => this.bindToMotionValue(r, s)),
      Nx.current || kC(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : Df.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    (this.projection && this.projection.unmount(),
      tn(this.notifyUpdate),
      tn(this.render),
      this.valueSubscriptions.forEach((a) => a()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this));
    for (const a in this.events) this.events[a].clear();
    for (const a in this.features) {
      const s = this.features[a];
      s && (s.unmount(), (s.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(a, s) {
    this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)();
    const r = Bi.has(a);
    r && this.onBindTransform && this.onBindTransform();
    const o = s.on("change", (m) => {
        ((this.latestValues[a] = m),
          this.props.onUpdate && De.preRender(this.notifyUpdate),
          r && this.projection && (this.projection.isTransformDirty = !0));
      }),
      c = s.on("renderRequest", this.scheduleRender);
    let f;
    (window.MotionCheckAppearSync &&
      (f = window.MotionCheckAppearSync(this, a, s)),
      this.valueSubscriptions.set(a, () => {
        (o(), c(), f && f(), s.owner && s.stop());
      }));
  }
  sortNodePosition(a) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== a.type
      ? 0
      : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in Li) {
      const s = Li[a];
      if (!s) continue;
      const { isEnabled: r, Feature: o } = s;
      if (
        (!this.features[a] &&
          o &&
          r(this.props) &&
          (this.features[a] = new o(this)),
        this.features[a])
      ) {
        const c = this.features[a];
        c.isMounted ? c.update() : (c.mount(), (c.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : $e();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, s) {
    this.latestValues[a] = s;
  }
  update(a, s) {
    ((a.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = a),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = s));
    for (let r = 0; r < Xy.length; r++) {
      const o = Xy[r];
      this.propEventSubscriptions[o] &&
        (this.propEventSubscriptions[o](),
        delete this.propEventSubscriptions[o]);
      const c = "on" + o,
        f = a[c];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    ((this.prevMotionValues = HC(
      this,
      this.scrapeMotionValuesFromProps(a, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue());
  }
  getProps() {
    return this.props;
  }
  getVariant(a) {
    return this.props.variants ? this.props.variants[a] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(a) {
    const s = this.getClosestVariantNode();
    if (s)
      return (
        s.variantChildren && s.variantChildren.add(a),
        () => s.variantChildren.delete(a)
      );
  }
  addValue(a, s) {
    const r = this.values.get(a);
    s !== r &&
      (r && this.removeValue(a),
      this.bindToMotionValue(a, s),
      this.values.set(a, s),
      (this.latestValues[a] = s.get()));
  }
  removeValue(a) {
    this.values.delete(a);
    const s = this.valueSubscriptions.get(a);
    (s && (s(), this.valueSubscriptions.delete(a)),
      delete this.latestValues[a],
      this.removeValueFromRenderState(a, this.renderState));
  }
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, s) {
    if (this.props.values && this.props.values[a]) return this.props.values[a];
    let r = this.values.get(a);
    return (
      r === void 0 &&
        s !== void 0 &&
        ((r = en(s === null ? void 0 : s, { owner: this })),
        this.addValue(a, r)),
      r
    );
  }
  readValue(a, s) {
    let r =
      this.latestValues[a] !== void 0 || !this.current
        ? this.latestValues[a]
        : (this.getBaseTargetFromProps(this.props, a) ??
          this.readValueFromInstance(this.current, a, this.options));
    return (
      r != null &&
        (typeof r == "string" && (s0(r) || l0(r))
          ? (r = parseFloat(r))
          : !d2(r) && ua.test(s) && (r = Y0(a, s)),
        this.setBaseTarget(a, st(r) ? r.get() : r)),
      st(r) ? r.get() : r
    );
  }
  setBaseTarget(a, s) {
    this.baseTarget[a] = s;
  }
  getBaseTarget(a) {
    var c;
    const { initial: s } = this.props;
    let r;
    if (typeof s == "string" || typeof s == "object") {
      const f = bd(
        this.props,
        s,
        (c = this.presenceContext) == null ? void 0 : c.custom,
      );
      f && (r = f[a]);
    }
    if (s && r !== void 0) return r;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !st(o)
      ? o
      : this.initialValues[a] !== void 0 && r === void 0
        ? void 0
        : this.baseTarget[a];
  }
  on(a, s) {
    return (
      this.events[a] || (this.events[a] = new $f()),
      this.events[a].add(s)
    );
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
}
class jx extends GC {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = Ww));
  }
  sortInstanceNodePosition(a, s) {
    return a.compareDocumentPosition(s) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, s) {
    return a.style ? a.style[s] : void 0;
  }
  removeValueFromRenderState(a, { vars: s, style: r }) {
    (delete s[a], delete r[a]);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    st(a) &&
      (this.childSubscription = a.on("change", (s) => {
        this.current && (this.current.textContent = `${s}`);
      }));
  }
}
function Lx(n, { style: a, vars: s }, r, o) {
  Object.assign(n.style, a, o && o.getProjectionStyles(r));
  for (const c in s) n.style.setProperty(c, s[c]);
}
function YC(n) {
  return window.getComputedStyle(n);
}
class qC extends jx {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = Lx));
  }
  readValueFromInstance(a, s) {
    var r;
    if (Bi.has(s))
      return (r = this.projection) != null && r.isProjecting ? gf(s) : xw(a, s);
    {
      const o = YC(a),
        c = (If(s) ? o.getPropertyValue(s) : o[s]) || 0;
      return typeof c == "string" ? c.trim() : c;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return vx(a, s);
  }
  build(a, s, r) {
    yd(a, s, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, r) {
    return Sd(a, s, r);
  }
}
const Vx = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function KC(n, a, s, r) {
  Lx(n, a, void 0, r);
  for (const o in a.attrs) n.setAttribute(Vx.has(o) ? o : gd(o), a.attrs[o]);
}
class FC extends jx {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = $e));
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (Bi.has(s)) {
      const r = G0(s);
      return (r && r.default) || 0;
    }
    return ((s = Vx.has(s) ? s : gd(s)), a.getAttribute(s));
  }
  scrapeMotionValuesFromProps(a, s, r) {
    return lx(a, s, r);
  }
  build(a, s, r) {
    ax(a, s, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(a, s, r, o) {
    KC(a, s, r, o);
  }
  mount(a) {
    ((this.isSVGTag = sx(a.tagName)), super.mount(a));
  }
}
const $C = (n, a) =>
    xd(n) ? new FC(a) : new qC(a, { allowProjection: n !== C.Fragment }),
  XC = $2({ ...yA, ...UC, ...CC, ...BC }, $C),
  Wt = v2(XC),
  ql = new WeakMap();
let oa;
function ZC(n, a) {
  if (a) {
    const { inlineSize: s, blockSize: r } = a[0];
    return { width: s, height: r };
  } else
    return hd(n) && "getBBox" in n
      ? n.getBBox()
      : { width: n.offsetWidth, height: n.offsetHeight };
}
function QC({ target: n, contentRect: a, borderBoxSize: s }) {
  var r;
  (r = ql.get(n)) == null ||
    r.forEach((o) => {
      o({
        target: n,
        contentSize: a,
        get size() {
          return ZC(n, s);
        },
      });
    });
}
function IC(n) {
  n.forEach(QC);
}
function JC() {
  typeof ResizeObserver > "u" || (oa = new ResizeObserver(IC));
}
function WC(n, a) {
  oa || JC();
  const s = cd(n);
  return (
    s.forEach((r) => {
      let o = ql.get(r);
      (o || ((o = new Set()), ql.set(r, o)),
        o.add(a),
        oa == null || oa.observe(r));
    }),
    () => {
      s.forEach((r) => {
        const o = ql.get(r);
        (o == null || o.delete(a),
          (o != null && o.size) || oa == null || oa.unobserve(r));
      });
    }
  );
}
const Kl = new Set();
let Js;
function eO() {
  ((Js = () => {
    const n = { width: window.innerWidth, height: window.innerHeight },
      a = { target: window, size: n, contentSize: n };
    Kl.forEach((s) => s(a));
  }),
    window.addEventListener("resize", Js));
}
function tO(n) {
  return (
    Kl.add(n),
    Js || eO(),
    () => {
      (Kl.delete(n), !Kl.size && Js && (Js = void 0));
    }
  );
}
function nO(n, a) {
  return typeof n == "function" ? tO(n) : WC(n, a);
}
const aO = 50,
  Zy = () => ({
    current: 0,
    offset: [],
    progress: 0,
    scrollLength: 0,
    targetOffset: 0,
    targetLength: 0,
    containerLength: 0,
    velocity: 0,
  }),
  iO = () => ({ time: 0, x: Zy(), y: Zy() }),
  sO = {
    x: { length: "Width", position: "Left" },
    y: { length: "Height", position: "Top" },
  };
function Qy(n, a, s, r) {
  const o = s[a],
    { length: c, position: f } = sO[a],
    m = o.current,
    p = s.time;
  ((o.current = n[`scroll${f}`]),
    (o.scrollLength = n[`scroll${c}`] - n[`client${c}`]),
    (o.offset.length = 0),
    (o.offset[0] = 0),
    (o.offset[1] = o.scrollLength),
    (o.progress = ji(0, o.scrollLength, o.current)));
  const h = r - p;
  o.velocity = h > aO ? 0 : Xf(o.current - m, h);
}
function rO(n, a, s) {
  (Qy(n, "x", a, s), Qy(n, "y", a, s), (a.time = s));
}
function lO(n, a) {
  const s = { x: 0, y: 0 };
  let r = n;
  for (; r && r !== a; )
    if (ld(r))
      ((s.x += r.offsetLeft), (s.y += r.offsetTop), (r = r.offsetParent));
    else if (r.tagName === "svg") {
      const o = r.getBoundingClientRect();
      r = r.parentElement;
      const c = r.getBoundingClientRect();
      ((s.x += o.left - c.left), (s.y += o.top - c.top));
    } else if (r instanceof SVGGraphicsElement) {
      const { x: o, y: c } = r.getBBox();
      ((s.x += o), (s.y += c));
      let f = null,
        m = r.parentNode;
      for (; !f; ) (m.tagName === "svg" && (f = m), (m = r.parentNode));
      r = f;
    } else break;
  return s;
}
const Mf = { start: 0, center: 0.5, end: 1 };
function Iy(n, a, s = 0) {
  let r = 0;
  if ((n in Mf && (n = Mf[n]), typeof n == "string")) {
    const o = parseFloat(n);
    n.endsWith("px")
      ? (r = o)
      : n.endsWith("%")
        ? (n = o / 100)
        : n.endsWith("vw")
          ? (r = (o / 100) * document.documentElement.clientWidth)
          : n.endsWith("vh")
            ? (r = (o / 100) * document.documentElement.clientHeight)
            : (n = o);
  }
  return (typeof n == "number" && (r = a * n), s + r);
}
const oO = [0, 0];
function uO(n, a, s, r) {
  let o = Array.isArray(n) ? n : oO,
    c = 0,
    f = 0;
  return (
    typeof n == "number"
      ? (o = [n, n])
      : typeof n == "string" &&
        ((n = n.trim()),
        n.includes(" ") ? (o = n.split(" ")) : (o = [n, Mf[n] ? n : "0"])),
    (c = Iy(o[0], s, r)),
    (f = Iy(o[1], a)),
    c - f
  );
}
const cO = {
    All: [
      [0, 0],
      [1, 1],
    ],
  },
  fO = { x: 0, y: 0 };
function dO(n) {
  return "getBBox" in n && n.tagName !== "svg"
    ? n.getBBox()
    : { width: n.clientWidth, height: n.clientHeight };
}
function hO(n, a, s) {
  const { offset: r = cO.All } = s,
    { target: o = n, axis: c = "y" } = s,
    f = c === "y" ? "height" : "width",
    m = o !== n ? lO(o, n) : fO,
    p = o === n ? { width: n.scrollWidth, height: n.scrollHeight } : dO(o),
    h = { width: n.clientWidth, height: n.clientHeight };
  a[c].offset.length = 0;
  let g = !a[c].interpolate;
  const v = r.length;
  for (let x = 0; x < v; x++) {
    const T = uO(r[x], h[f], p[f], m[c]);
    (!g && T !== a[c].interpolatorOffsets[x] && (g = !0), (a[c].offset[x] = T));
  }
  (g &&
    ((a[c].interpolate = ad(a[c].offset, D0(r), { clamp: !1 })),
    (a[c].interpolatorOffsets = [...a[c].offset])),
    (a[c].progress = mn(0, 1, a[c].interpolate(a[c].current))));
}
function mO(n, a = n, s) {
  if (((s.x.targetOffset = 0), (s.y.targetOffset = 0), a !== n)) {
    let r = a;
    for (; r && r !== n; )
      ((s.x.targetOffset += r.offsetLeft),
        (s.y.targetOffset += r.offsetTop),
        (r = r.offsetParent));
  }
  ((s.x.targetLength = a === n ? a.scrollWidth : a.clientWidth),
    (s.y.targetLength = a === n ? a.scrollHeight : a.clientHeight),
    (s.x.containerLength = n.clientWidth),
    (s.y.containerLength = n.clientHeight));
}
function pO(n, a, s, r = {}) {
  return {
    measure: (o) => {
      (mO(n, r.target, s), rO(n, s, o), (r.offset || r.target) && hO(n, s, r));
    },
    notify: () => a(s),
  };
}
const Hs = new WeakMap(),
  Jy = new WeakMap(),
  Zc = new WeakMap(),
  Wy = (n) => (n === document.scrollingElement ? window : n);
function _x(n, { container: a = document.scrollingElement, ...s } = {}) {
  if (!a) return At;
  let r = Zc.get(a);
  r || ((r = new Set()), Zc.set(a, r));
  const o = iO(),
    c = pO(a, n, o, s);
  if ((r.add(c), !Hs.has(a))) {
    const m = () => {
        for (const v of r) v.measure(it.timestamp);
        De.preUpdate(p);
      },
      p = () => {
        for (const v of r) v.notify();
      },
      h = () => De.read(m);
    Hs.set(a, h);
    const g = Wy(a);
    (window.addEventListener("resize", h, { passive: !0 }),
      a !== document.documentElement && Jy.set(a, nO(a, h)),
      g.addEventListener("scroll", h, { passive: !0 }),
      h());
  }
  const f = Hs.get(a);
  return (
    De.read(f, !1, !0),
    () => {
      var h;
      tn(f);
      const m = Zc.get(a);
      if (!m || (m.delete(c), m.size)) return;
      const p = Hs.get(a);
      (Hs.delete(a),
        p &&
          (Wy(a).removeEventListener("scroll", p),
          (h = Jy.get(a)) == null || h(),
          window.removeEventListener("resize", p)));
    }
  );
}
const ev = new Map();
function gO(n) {
  const a = { value: 0 },
    s = _x((r) => {
      a.value = r[n.axis].progress * 100;
    }, n);
  return { currentTime: a, cancel: s };
}
function zx({ source: n, container: a, ...s }) {
  const { axis: r } = s;
  n && (a = n);
  const o = ev.get(a) ?? new Map();
  ev.set(a, o);
  const c = s.target ?? "self",
    f = o.get(c) ?? {},
    m = r + (s.offset ?? []).join(",");
  return (
    f[m] ||
      (f[m] =
        !s.target && L0()
          ? new ScrollTimeline({ source: a, axis: r })
          : gO({ container: a, ...s })),
    f[m]
  );
}
function yO(n, a) {
  const s = zx(a);
  return n.attachTimeline({
    timeline: a.target ? void 0 : s,
    observe: (r) => (
      r.pause(),
      X0((o) => {
        r.time = r.duration * o;
      }, s)
    ),
  });
}
function vO(n) {
  return n.length === 2;
}
function xO(n, a) {
  return vO(n)
    ? _x((s) => {
        n(s[a.axis].progress, s);
      }, a)
    : X0(n, zx(a));
}
function bO(
  n,
  { axis: a = "y", container: s = document.scrollingElement, ...r } = {},
) {
  if (!s) return At;
  const o = { axis: a, container: s, ...r };
  return typeof n == "function" ? xO(n, o) : yO(n, o);
}
function tv(n, a) {
  vE(!!(!a || a.current));
}
const SO = () => ({
  scrollX: en(0),
  scrollY: en(0),
  scrollXProgress: en(0),
  scrollYProgress: en(0),
});
function Ux({ container: n, target: a, layoutEffect: s = !0, ...r } = {}) {
  const o = dr(SO);
  return (
    (s ? co : C.useEffect)(
      () => (
        tv("target", a),
        tv("container", n),
        bO(
          (f, { x: m, y: p }) => {
            (o.scrollX.set(m.current),
              o.scrollXProgress.set(m.progress),
              o.scrollY.set(p.current),
              o.scrollYProgress.set(p.progress));
          },
          {
            ...r,
            container: (n == null ? void 0 : n.current) || void 0,
            target: (a == null ? void 0 : a.current) || void 0,
          },
        )
      ),
      [n, a, JSON.stringify(r.offset)],
    ),
    o
  );
}
function Bx(n) {
  const a = dr(() => en(n)),
    { isStatic: s } = C.useContext(ho);
  if (s) {
    const [, r] = C.useState(n);
    C.useEffect(() => a.on("change", r), []);
  }
  return a;
}
function kx(n, a) {
  const s = Bx(a()),
    r = () => s.set(a());
  return (
    r(),
    co(() => {
      const o = () => De.preRender(r, !1, !0),
        c = n.map((f) => f.on("change", o));
      return () => {
        (c.forEach((f) => f()), tn(r));
      };
    }),
    s
  );
}
function TO(n) {
  ((Xs.current = []), n());
  const a = kx(Xs.current, n);
  return ((Xs.current = void 0), a);
}
function yt(n, a, s, r) {
  if (typeof n == "function") return TO(n);
  const o = typeof a == "function" ? a : u2(a, s, r);
  return Array.isArray(n) ? nv(n, o) : nv([n], ([c]) => o(c));
}
function nv(n, a) {
  const s = dr(() => []);
  return kx(n, () => {
    s.length = 0;
    const r = n.length;
    for (let o = 0; o < r; o++) s[o] = n[o].get();
    return a(s);
  });
}
function EO(n, a = {}) {
  const { isStatic: s } = C.useContext(ho),
    r = () => (st(n) ? n.get() : n);
  if (s) return yt(r);
  const o = Bx(r());
  return (C.useInsertionEffect(() => c2(o, n, a), [o, JSON.stringify(a)]), o);
}
function wO(n) {
  n.values.forEach((a) => a.stop());
}
function Nf(n, a) {
  [...a].reverse().forEach((r) => {
    const o = n.getVariant(r);
    (o && Td(n, o),
      n.variantChildren &&
        n.variantChildren.forEach((c) => {
          Nf(c, a);
        }));
  });
}
function AO(n, a) {
  if (Array.isArray(a)) return Nf(n, a);
  if (typeof a == "string") return Nf(n, [a]);
  Td(n, a);
}
function CO() {
  const n = new Set(),
    a = {
      subscribe(s) {
        return (n.add(s), () => void n.delete(s));
      },
      start(s, r) {
        const o = [];
        return (
          n.forEach((c) => {
            o.push(cx(c, s, { transitionOverride: r }));
          }),
          Promise.all(o)
        );
      },
      set(s) {
        return n.forEach((r) => {
          AO(r, s);
        });
      },
      stop() {
        n.forEach((s) => {
          wO(s);
        });
      },
      mount() {
        return () => {
          a.stop();
        };
      },
    };
  return a;
}
function OO() {
  const n = dr(CO);
  return (co(n.mount, []), n);
}
const av = OO,
  RO = { some: 0, all: 1 };
function DO(n, a, { root: s, margin: r, amount: o = "some" } = {}) {
  const c = cd(n),
    f = new WeakMap(),
    m = (h) => {
      h.forEach((g) => {
        const v = f.get(g.target);
        if (g.isIntersecting !== !!v)
          if (g.isIntersecting) {
            const x = a(g.target, g);
            typeof x == "function" ? f.set(g.target, x) : p.unobserve(g.target);
          } else typeof v == "function" && (v(g), f.delete(g.target));
      });
    },
    p = new IntersectionObserver(m, {
      root: s,
      rootMargin: r,
      threshold: typeof o == "number" ? o : RO[o],
    });
  return (c.forEach((h) => p.observe(h)), () => p.disconnect());
}
function Px(
  n,
  { root: a, margin: s, amount: r, once: o = !1, initial: c = !1 } = {},
) {
  const [f, m] = C.useState(c);
  return (
    C.useEffect(() => {
      if (!n.current || (o && f)) return;
      const p = () => (m(!0), o ? void 0 : () => m(!1)),
        h = { root: (a && a.current) || void 0, margin: s, amount: r };
      return DO(n.current, p, h);
    }, [a, n, s, o, r]),
    f
  );
}
const Qc = [
  {
    id: 1,
    title: "PSI",
    logo: "/works/logo1.png",
    labelKey: "With MASHAB",
    video: "/works/work1.mp4",
  },
  {
    id: 2,
    title: "I Bar",
    logo: "/works/new_logo.png",
    labelKey: "With MASHAB",
    video: "/works/work2.mp4",
  },
  {
    id: 3,
    title: "Harvesting Guide",
    logo: "/works/logo3.png",
    labelKey: "With MASHAB",
    video: "/works/work3.mp4",
  },
  {
    id: 4,
    title: "Stackable Guide",
    logo: "/works/logo4.png",
    labelKey: "With MASHAB",
    video: "/works/work4.mp4",
  },
];
function MO() {
  const n = C.useRef(null),
    { t: a, i18n: s } = Ct(),
    r = s.language === "ar",
    o = "font-theme",
    { scrollYProgress: c } = Ux({
      target: n,
      offset: ["start start", "end end"],
    }),
    f = yt(c, (p) => {
      const v = (Qc.length - 1) * 100,
        x = (typeof window < "u" && window.innerWidth >= 768, 0);
      return `-${p * v * 1 + x - p * x * 2}vw`;
    }),
    m = `${Qc.length * 100}vw`;
  return A.jsx("section", {
    ref: n,
    className: `relative h-[400vh] bg-[var(--primary-black)] text-[var(--secondary-white)] ${o} pb-10`,
    children: A.jsxs("div", {
      dir: "ltr",
      className:
        "sticky inset-x-0 top-1/4 md:top-0 md:h-screen overflow-hidden",
      children: [
        A.jsx("h2", {
          className:
            "text-3xl md:text-5xl font-bold text-theme my-10 md:pb-25 lg:my-10 text-center",
          children: a("home.featured.title"),
        }),
        A.jsx(Wt.div, {
          style: { x: f, width: m },
          className: "flex",
          children: Qc.map((p) =>
            A.jsx(
              "div",
              {
                className:
                  "relative flex h-full md:h-[50vh] w-screen md:min-w-[100vw] lg:min-w-[100vw] flex-shrink-0 items-center justify-center px-4 sm:px-10 md:pl-[50px]",
                children: A.jsxs("div", {
                  className: "relative w-full max-w-[90vw] md:max-w-[700px]",
                  children: [
                    A.jsx("div", {
                      className: `mb-3 flex flex-col items-center ${o}`,
                    }),
                    A.jsx("video", {
                      src: p.video,
                      autoPlay: !0,
                      muted: !0,
                      loop: !0,
                      playsInline: !0,
                      className:
                        "aspect-video w-full rounded-2xl md:rounded-3xl object-cover shadow-2xl",
                    }),
                    A.jsx("div", {
                      className: `absolute bottom-2 md:bottom-4 ${r ? "right-4 md:right-6 text-right" : "left-4 md:left-6 text-left"} text-base sm:text-lg md:text-2xl font-bold drop-shadow-sm ${o}`,
                      children: a(`home.featured.items.${p.title}`),
                    }),
                  ],
                }),
              },
              p.id,
            ),
          ),
        }),
      ],
    }),
  });
}
const NO = [
    "ALL",
    "BH Stack Guides",
    "Prothesis",
    "Sub-Periosteal Implants",
    "Guides",
  ],
  jf = [
    {
      title: "Tissue Guide",
      image: "/dental/2.png",
      category: "Guides",
      orientation: "landscape",
    },
    {
      title: "Tooth Supported Guide",
      image: "/dental/1.png",
      category: "Guides",
      orientation: "portrait",
    },
    {
      title: "Apicectomy Guide",
      image: "/dental/8.png",
      category: "Guides",
      orientation: "landscape",
    },
    {
      title: "BH Stack Guide",
      image: "/dental/4.png",
      category: "BH Stack Guides",
      orientation: "portrait",
    },
    {
      title: "Immediate Loading",
      image: "/dental/5.png",
      category: "BH Stack Guides",
      orientation: "portrait",
    },
    {
      title: "Crown Lengthening Guide",
      image: "/dental/6.png",
      category: "Guides",
      orientation: "landscape",
    },
    {
      title: "Zygomatic Guides",
      image: "/dental/7.png",
      category: "Guides",
      orientation: "portrait",
    },
    {
      title: "Bone Guide",
      image: "/dental/3.png",
      category: "Guides",
      orientation: "landscape",
    },
    {
      title: "I Bar",
      image: "/dental/13.png",
      category: "Prothesis",
      orientation: "landscape",
    },
    {
      title: "PSI",
      image: "/dental/10.png",
      category: "Sub-Periosteal Implants",
      orientation: "landscape",
    },
    {
      title: "Complete Denture",
      image: "/dental/11.png",
      category: "Prothesis",
      orientation: "landscape",
    },
    {
      title: "Nose Prosthesis",
      image: "/dental/12.png",
      category: "Prothesis",
      orientation: "landscape",
    },
    {
      title: "Mesh",
      image: "/dental/9.png",
      category: "",
      orientation: "landscape",
    },
  ];
function jO() {
  const { t: n, i18n: a } = Ct(),
    [s, r] = C.useState("ALL"),
    o = a.language === "ar",
    c = "font-theme",
    f = s === "ALL" ? jf : jf.filter((p) => p.category === s),
    m = (p) =>
      ({
        0: "col-start-4 col-span-2 row-start-1 row-span-2",
        1: "col-start-3 row-start-1",
        2: "col-start-3 row-start-2",
        3: "col-start-2 row-start-1",
        4: "col-start-2 row-start-2",
        5: "col-start-5 row-start-3",
        6: "col-start-4 row-start-3",
        7: "col-start-2 col-span-2 row-start-3",
        8: "col-start-4 col-span-2 row-start-4 row-span-2",
        9: "col-start-3 row-start-4",
        10: "col-start-3 row-start-5",
        11: "col-start-2 row-start-4",
        12: "col-start-2 row-start-5",
      })[p] || "";
  return A.jsxs("section", {
    className: `bg-[var(--primary-black)] text-theme px-4 md:px-8 pb-20 overflow-x-hidden ${c}`,
    children: [
      A.jsx(Wt.h2, {
        className: "text-center text-3xl md:text-6xl font-bold mb-10 mt-5",
        initial: "rest",
        whileInView: "enter",
        variants: {
          rest: { opacity: 0, scale: 0.9 },
          enter: { opacity: 1, scale: 1 },
        },
        transition: { duration: 0.6 },
        viewport: { once: !1 },
        children: n("home.showreel.title"),
      }),
      A.jsxs("div", {
        className: "flex flex-col gap-12 items-center",
        children: [
          A.jsx(Wt.div, {
            className: "flex flex-wrap justify-center gap-2",
            dir: o ? "rtl" : "ltr",
            initial: "rest",
            whileInView: "enter",
            variants: {
              rest: { opacity: 0, scale: 0.9 },
              enter: { opacity: 1, scale: 1 },
            },
            transition: { duration: 0.6 },
            viewport: { once: !1 },
            children: NO.map((p) =>
              A.jsx(
                "button",
                {
                  onClick: () => r(p),
                  className: `border border-theme px-4 py-2 rounded-lg text-sm md:text-base transition cursor-pointer
                ${s === p ? "bg-[var(--primary-light)] text-black" : "text-theme bg-transparent hover:shadow-[inset_0_0_20px_rgba(255,238,212,0.6)]"}`,
                  children: n(`home.showreel.categories.${p}`),
                },
                p,
              ),
            ),
          }),
          A.jsx("div", {
            className: `
            grid 
            auto-rows-auto 
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 
            w-full gap-2 auto-flow-dense
          `,
            dir: "ltr",
            children: f.map((p, h) =>
              A.jsxs(Wt.div, {
                className: `relative cursor-pointer overflow-hidden rounded-lg ${m(h)}`,
                initial: "rest",
                whileInView: "enter",
                whileHover: "hover",
                variants: {
                  rest: { opacity: 0, scale: 0.9 },
                  enter: { opacity: 1, scale: 1 },
                  hover: { opacity: 1, scale: 1.02 },
                },
                transition: { duration: 0.5, delay: h * 0.05 },
                viewport: { once: !1 },
                children: [
                  A.jsx(Wt.img, {
                    src: p.image,
                    alt: n(`home.showreel.items.${p.title}`),
                    className: "w-full h-full object-cover",
                    variants: { rest: { scale: 1 }, hover: { scale: 1.05 } },
                    transition: { duration: 0.3 },
                  }),
                  A.jsx(Wt.div, {
                    className: "absolute inset-0 bg-black",
                    variants: { rest: { opacity: 0 }, hover: { opacity: 0.3 } },
                    transition: { duration: 0.3 },
                  }),
                  A.jsx("span", {
                    className: `
                  absolute bottom-2
                  ${o ? "right-2 text-right" : "left-2 text-left"}
                  z-10
                  font-semibold text-[clamp(0.75rem,2vw,1rem)] md:text-[clamp(1rem,2.5vw,1.25rem)]
                  bg-black/20
                  px-1 rounded
                  drop-shadow-lg
                `,
                    children: n(`home.showreel.items.${p.title}`),
                  }),
                ],
              }),
            ),
          }),
        ],
      }),
    ],
  });
}
var Gs = {},
  Ks = { exports: {} },
  LO = Ks.exports,
  iv;
function VO() {
  return (
    iv ||
      ((iv = 1),
      (function (n, a) {
        (function (s, r) {
          r(a);
        })(LO, function (s) {
          var r = function () {
              return (
                (r =
                  Object.assign ||
                  function (c) {
                    for (var f, m = 1, p = arguments.length; m < p; m++)
                      for (var h in (f = arguments[m]))
                        Object.prototype.hasOwnProperty.call(f, h) &&
                          (c[h] = f[h]);
                    return c;
                  }),
                r.apply(this, arguments)
              );
            },
            o = (function () {
              function c(f, m, p) {
                var h = this;
                ((this.endVal = m),
                  (this.options = p),
                  (this.version = "2.8.1"),
                  (this.defaults = {
                    startVal: 0,
                    decimalPlaces: 0,
                    duration: 2,
                    useEasing: !0,
                    useGrouping: !0,
                    useIndianSeparators: !1,
                    smartEasingThreshold: 999,
                    smartEasingAmount: 333,
                    separator: ",",
                    decimal: ".",
                    prefix: "",
                    suffix: "",
                    enableScrollSpy: !1,
                    scrollSpyDelay: 200,
                    scrollSpyOnce: !1,
                  }),
                  (this.finalEndVal = null),
                  (this.useEasing = !0),
                  (this.countDown = !1),
                  (this.error = ""),
                  (this.startVal = 0),
                  (this.paused = !0),
                  (this.once = !1),
                  (this.count = function (g) {
                    h.startTime || (h.startTime = g);
                    var v = g - h.startTime;
                    ((h.remaining = h.duration - v),
                      h.useEasing
                        ? h.countDown
                          ? (h.frameVal =
                              h.startVal -
                              h.easingFn(
                                v,
                                0,
                                h.startVal - h.endVal,
                                h.duration,
                              ))
                          : (h.frameVal = h.easingFn(
                              v,
                              h.startVal,
                              h.endVal - h.startVal,
                              h.duration,
                            ))
                        : (h.frameVal =
                            h.startVal +
                            (h.endVal - h.startVal) * (v / h.duration)));
                    var x = h.countDown
                      ? h.frameVal < h.endVal
                      : h.frameVal > h.endVal;
                    ((h.frameVal = x ? h.endVal : h.frameVal),
                      (h.frameVal = Number(
                        h.frameVal.toFixed(h.options.decimalPlaces),
                      )),
                      h.printValue(h.frameVal),
                      v < h.duration
                        ? (h.rAF = requestAnimationFrame(h.count))
                        : h.finalEndVal !== null
                          ? h.update(h.finalEndVal)
                          : h.options.onCompleteCallback &&
                            h.options.onCompleteCallback());
                  }),
                  (this.formatNumber = function (g) {
                    var v,
                      x,
                      T,
                      E,
                      M = g < 0 ? "-" : "";
                    v = Math.abs(g).toFixed(h.options.decimalPlaces);
                    var N = (v += "").split(".");
                    if (
                      ((x = N[0]),
                      (T = N.length > 1 ? h.options.decimal + N[1] : ""),
                      h.options.useGrouping)
                    ) {
                      E = "";
                      for (var R = 3, G = 0, V = 0, Q = x.length; V < Q; ++V)
                        (h.options.useIndianSeparators &&
                          V === 4 &&
                          ((R = 2), (G = 1)),
                          V !== 0 &&
                            G % R == 0 &&
                            (E = h.options.separator + E),
                          G++,
                          (E = x[Q - V - 1] + E));
                      x = E;
                    }
                    return (
                      h.options.numerals &&
                        h.options.numerals.length &&
                        ((x = x.replace(/[0-9]/g, function (q) {
                          return h.options.numerals[+q];
                        })),
                        (T = T.replace(/[0-9]/g, function (q) {
                          return h.options.numerals[+q];
                        }))),
                      M + h.options.prefix + x + T + h.options.suffix
                    );
                  }),
                  (this.easeOutExpo = function (g, v, x, T) {
                    return (
                      (x * (1 - Math.pow(2, (-10 * g) / T)) * 1024) / 1023 + v
                    );
                  }),
                  (this.options = r(r({}, this.defaults), p)),
                  (this.formattingFn = this.options.formattingFn
                    ? this.options.formattingFn
                    : this.formatNumber),
                  (this.easingFn = this.options.easingFn
                    ? this.options.easingFn
                    : this.easeOutExpo),
                  (this.startVal = this.validateValue(this.options.startVal)),
                  (this.frameVal = this.startVal),
                  (this.endVal = this.validateValue(m)),
                  (this.options.decimalPlaces = Math.max(
                    this.options.decimalPlaces,
                  )),
                  this.resetDuration(),
                  (this.options.separator = String(this.options.separator)),
                  (this.useEasing = this.options.useEasing),
                  this.options.separator === "" &&
                    (this.options.useGrouping = !1),
                  (this.el =
                    typeof f == "string" ? document.getElementById(f) : f),
                  this.el
                    ? this.printValue(this.startVal)
                    : (this.error = "[CountUp] target is null or undefined"),
                  typeof window < "u" &&
                    this.options.enableScrollSpy &&
                    (this.error
                      ? console.error(this.error, f)
                      : ((window.onScrollFns = window.onScrollFns || []),
                        window.onScrollFns.push(function () {
                          return h.handleScroll(h);
                        }),
                        (window.onscroll = function () {
                          window.onScrollFns.forEach(function (g) {
                            return g();
                          });
                        }),
                        this.handleScroll(this))));
              }
              return (
                (c.prototype.handleScroll = function (f) {
                  if (f && window && !f.once) {
                    var m = window.innerHeight + window.scrollY,
                      p = f.el.getBoundingClientRect(),
                      h = p.top + window.pageYOffset,
                      g = p.top + p.height + window.pageYOffset;
                    g < m && g > window.scrollY && f.paused
                      ? ((f.paused = !1),
                        setTimeout(function () {
                          return f.start();
                        }, f.options.scrollSpyDelay),
                        f.options.scrollSpyOnce && (f.once = !0))
                      : (window.scrollY > g || h > m) && !f.paused && f.reset();
                  }
                }),
                (c.prototype.determineDirectionAndSmartEasing = function () {
                  var f = this.finalEndVal ? this.finalEndVal : this.endVal;
                  this.countDown = this.startVal > f;
                  var m = f - this.startVal;
                  if (
                    Math.abs(m) > this.options.smartEasingThreshold &&
                    this.options.useEasing
                  ) {
                    this.finalEndVal = f;
                    var p = this.countDown ? 1 : -1;
                    ((this.endVal = f + p * this.options.smartEasingAmount),
                      (this.duration = this.duration / 2));
                  } else ((this.endVal = f), (this.finalEndVal = null));
                  this.finalEndVal !== null
                    ? (this.useEasing = !1)
                    : (this.useEasing = this.options.useEasing);
                }),
                (c.prototype.start = function (f) {
                  this.error ||
                    (this.options.onStartCallback &&
                      this.options.onStartCallback(),
                    f && (this.options.onCompleteCallback = f),
                    this.duration > 0
                      ? (this.determineDirectionAndSmartEasing(),
                        (this.paused = !1),
                        (this.rAF = requestAnimationFrame(this.count)))
                      : this.printValue(this.endVal));
                }),
                (c.prototype.pauseResume = function () {
                  (this.paused
                    ? ((this.startTime = null),
                      (this.duration = this.remaining),
                      (this.startVal = this.frameVal),
                      this.determineDirectionAndSmartEasing(),
                      (this.rAF = requestAnimationFrame(this.count)))
                    : cancelAnimationFrame(this.rAF),
                    (this.paused = !this.paused));
                }),
                (c.prototype.reset = function () {
                  (cancelAnimationFrame(this.rAF),
                    (this.paused = !0),
                    this.resetDuration(),
                    (this.startVal = this.validateValue(this.options.startVal)),
                    (this.frameVal = this.startVal),
                    this.printValue(this.startVal));
                }),
                (c.prototype.update = function (f) {
                  (cancelAnimationFrame(this.rAF),
                    (this.startTime = null),
                    (this.endVal = this.validateValue(f)),
                    this.endVal !== this.frameVal &&
                      ((this.startVal = this.frameVal),
                      this.finalEndVal == null && this.resetDuration(),
                      (this.finalEndVal = null),
                      this.determineDirectionAndSmartEasing(),
                      (this.rAF = requestAnimationFrame(this.count))));
                }),
                (c.prototype.printValue = function (f) {
                  var m;
                  if (this.el) {
                    var p = this.formattingFn(f);
                    !((m = this.options.plugin) === null || m === void 0) &&
                    m.render
                      ? this.options.plugin.render(this.el, p)
                      : this.el.tagName === "INPUT"
                        ? (this.el.value = p)
                        : this.el.tagName === "text" ||
                            this.el.tagName === "tspan"
                          ? (this.el.textContent = p)
                          : (this.el.innerHTML = p);
                  }
                }),
                (c.prototype.ensureNumber = function (f) {
                  return typeof f == "number" && !isNaN(f);
                }),
                (c.prototype.validateValue = function (f) {
                  var m = Number(f);
                  return this.ensureNumber(m)
                    ? m
                    : ((this.error =
                        "[CountUp] invalid start or end value: ".concat(f)),
                      null);
                }),
                (c.prototype.resetDuration = function () {
                  ((this.startTime = null),
                    (this.duration = 1e3 * Number(this.options.duration)),
                    (this.remaining = this.duration));
                }),
                c
              );
            })();
          s.CountUp = o;
        });
      })(Ks, Ks.exports)),
    Ks.exports
  );
}
var sv;
function _O() {
  if (sv) return Gs;
  ((sv = 1), Object.defineProperty(Gs, "__esModule", { value: !0 }));
  var n = ro(),
    a = VO();
  function s(k, j) {
    var H =
      k == null
        ? null
        : (typeof Symbol < "u" && k[Symbol.iterator]) || k["@@iterator"];
    if (H != null) {
      var I,
        ee,
        oe,
        ve,
        ce = [],
        U = !0,
        Y = !1;
      try {
        if (((oe = (H = H.call(k)).next), j !== 0))
          for (
            ;
            !(U = (I = oe.call(H)).done) && (ce.push(I.value), ce.length !== j);
            U = !0
          );
      } catch (J) {
        ((Y = !0), (ee = J));
      } finally {
        try {
          if (!U && H.return != null && ((ve = H.return()), Object(ve) !== ve))
            return;
        } finally {
          if (Y) throw ee;
        }
      }
      return ce;
    }
  }
  function r(k, j) {
    var H = Object.keys(k);
    if (Object.getOwnPropertySymbols) {
      var I = Object.getOwnPropertySymbols(k);
      (j &&
        (I = I.filter(function (ee) {
          return Object.getOwnPropertyDescriptor(k, ee).enumerable;
        })),
        H.push.apply(H, I));
    }
    return H;
  }
  function o(k) {
    for (var j = 1; j < arguments.length; j++) {
      var H = arguments[j] != null ? arguments[j] : {};
      j % 2
        ? r(Object(H), !0).forEach(function (I) {
            m(k, I, H[I]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(k, Object.getOwnPropertyDescriptors(H))
          : r(Object(H)).forEach(function (I) {
              Object.defineProperty(
                k,
                I,
                Object.getOwnPropertyDescriptor(H, I),
              );
            });
    }
    return k;
  }
  function c(k, j) {
    if (typeof k != "object" || !k) return k;
    var H = k[Symbol.toPrimitive];
    if (H !== void 0) {
      var I = H.call(k, j);
      if (typeof I != "object") return I;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (j === "string" ? String : Number)(k);
  }
  function f(k) {
    var j = c(k, "string");
    return typeof j == "symbol" ? j : String(j);
  }
  function m(k, j, H) {
    return (
      (j = f(j)),
      j in k
        ? Object.defineProperty(k, j, {
            value: H,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (k[j] = H),
      k
    );
  }
  function p() {
    return (
      (p = Object.assign
        ? Object.assign.bind()
        : function (k) {
            for (var j = 1; j < arguments.length; j++) {
              var H = arguments[j];
              for (var I in H)
                Object.prototype.hasOwnProperty.call(H, I) && (k[I] = H[I]);
            }
            return k;
          }),
      p.apply(this, arguments)
    );
  }
  function h(k, j) {
    if (k == null) return {};
    var H = {},
      I = Object.keys(k),
      ee,
      oe;
    for (oe = 0; oe < I.length; oe++)
      ((ee = I[oe]), !(j.indexOf(ee) >= 0) && (H[ee] = k[ee]));
    return H;
  }
  function g(k, j) {
    if (k == null) return {};
    var H = h(k, j),
      I,
      ee;
    if (Object.getOwnPropertySymbols) {
      var oe = Object.getOwnPropertySymbols(k);
      for (ee = 0; ee < oe.length; ee++)
        ((I = oe[ee]),
          !(j.indexOf(I) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(k, I) &&
            (H[I] = k[I]));
    }
    return H;
  }
  function v(k, j) {
    return x(k) || s(k, j) || T(k, j) || M();
  }
  function x(k) {
    if (Array.isArray(k)) return k;
  }
  function T(k, j) {
    if (k) {
      if (typeof k == "string") return E(k, j);
      var H = Object.prototype.toString.call(k).slice(8, -1);
      if (
        (H === "Object" && k.constructor && (H = k.constructor.name),
        H === "Map" || H === "Set")
      )
        return Array.from(k);
      if (
        H === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(H)
      )
        return E(k, j);
    }
  }
  function E(k, j) {
    (j == null || j > k.length) && (j = k.length);
    for (var H = 0, I = new Array(j); H < j; H++) I[H] = k[H];
    return I;
  }
  function M() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var N =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u"
      ? n.useLayoutEffect
      : n.useEffect;
  function R(k) {
    var j = n.useRef(k);
    return (
      N(function () {
        j.current = k;
      }),
      n.useCallback(function () {
        for (var H = arguments.length, I = new Array(H), ee = 0; ee < H; ee++)
          I[ee] = arguments[ee];
        return j.current.apply(void 0, I);
      }, [])
    );
  }
  var G = function (j, H) {
      var I = H.decimal,
        ee = H.decimals,
        oe = H.duration,
        ve = H.easingFn,
        ce = H.end,
        U = H.formattingFn,
        Y = H.numerals,
        J = H.prefix,
        le = H.separator,
        S = H.start,
        D = H.suffix,
        F = H.useEasing,
        X = H.useGrouping,
        W = H.useIndianSeparators,
        se = H.enableScrollSpy,
        ne = H.scrollSpyDelay,
        Ee = H.scrollSpyOnce,
        me = H.plugin;
      return new a.CountUp(j, ce, {
        startVal: S,
        duration: oe,
        decimal: I,
        decimalPlaces: ee,
        easingFn: ve,
        formattingFn: U,
        numerals: Y,
        separator: le,
        prefix: J,
        suffix: D,
        plugin: me,
        useEasing: F,
        useIndianSeparators: W,
        useGrouping: X,
        enableScrollSpy: se,
        scrollSpyDelay: ne,
        scrollSpyOnce: Ee,
      });
    },
    V = [
      "ref",
      "startOnMount",
      "enableReinitialize",
      "delay",
      "onEnd",
      "onStart",
      "onPauseResume",
      "onReset",
      "onUpdate",
    ],
    Q = {
      decimal: ".",
      separator: ",",
      delay: null,
      prefix: "",
      suffix: "",
      duration: 2,
      start: 0,
      decimals: 0,
      startOnMount: !0,
      enableReinitialize: !0,
      useEasing: !0,
      useGrouping: !0,
      useIndianSeparators: !1,
    },
    q = function (j) {
      var H = Object.fromEntries(
          Object.entries(j).filter(function (rt) {
            var yn = v(rt, 2),
              Ua = yn[1];
            return Ua !== void 0;
          }),
        ),
        I = n.useMemo(
          function () {
            return o(o({}, Q), H);
          },
          [j],
        ),
        ee = I.ref,
        oe = I.startOnMount,
        ve = I.enableReinitialize,
        ce = I.delay,
        U = I.onEnd,
        Y = I.onStart,
        J = I.onPauseResume,
        le = I.onReset,
        S = I.onUpdate,
        D = g(I, V),
        F = n.useRef(),
        X = n.useRef(),
        W = n.useRef(!1),
        se = R(function () {
          return G(typeof ee == "string" ? ee : ee.current, D);
        }),
        ne = R(function (rt) {
          var yn = F.current;
          if (yn && !rt) return yn;
          var Ua = se();
          return ((F.current = Ua), Ua);
        }),
        Ee = R(function () {
          var rt = function () {
            return ne(!0).start(function () {
              U == null ||
                U({ pauseResume: me, reset: ze, start: we, update: ct });
            });
          };
          (ce && ce > 0 ? (X.current = setTimeout(rt, ce * 1e3)) : rt(),
            Y == null || Y({ pauseResume: me, reset: ze, update: ct }));
        }),
        me = R(function () {
          (ne().pauseResume(),
            J == null || J({ reset: ze, start: we, update: ct }));
        }),
        ze = R(function () {
          ne().el &&
            (X.current && clearTimeout(X.current),
            ne().reset(),
            le == null || le({ pauseResume: me, start: we, update: ct }));
        }),
        ct = R(function (rt) {
          (ne().update(rt),
            S == null || S({ pauseResume: me, reset: ze, start: we }));
        }),
        we = R(function () {
          (ze(), Ee());
        }),
        Ut = R(function (rt) {
          oe && (rt && ze(), Ee());
        });
      return (
        n.useEffect(
          function () {
            W.current ? ve && Ut(!0) : ((W.current = !0), Ut());
          },
          [
            ve,
            W,
            Ut,
            ce,
            j.start,
            j.suffix,
            j.prefix,
            j.duration,
            j.separator,
            j.decimals,
            j.decimal,
            j.formattingFn,
          ],
        ),
        n.useEffect(
          function () {
            return function () {
              ze();
            };
          },
          [ze],
        ),
        { start: we, pauseResume: me, reset: ze, update: ct, getCountUp: ne }
      );
    },
    ae = ["className", "redraw", "containerProps", "children", "style"],
    te = function (j) {
      var H = j.className,
        I = j.redraw,
        ee = j.containerProps,
        oe = j.children,
        ve = j.style,
        ce = g(j, ae),
        U = n.useRef(null),
        Y = n.useRef(!1),
        J = q(
          o(
            o({}, ce),
            {},
            {
              ref: U,
              startOnMount: typeof oe != "function" || j.delay === 0,
              enableReinitialize: !1,
            },
          ),
        ),
        le = J.start,
        S = J.reset,
        D = J.update,
        F = J.pauseResume,
        X = J.getCountUp,
        W = R(function () {
          le();
        }),
        se = R(function (me) {
          (j.preserveValue || S(), D(me));
        }),
        ne = R(function () {
          if (
            typeof j.children == "function" &&
            !(U.current instanceof Element)
          ) {
            console.error(
              `Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an Element, eg. <span ref={containerRef} />.`,
            );
            return;
          }
          X();
        });
      (n.useEffect(
        function () {
          ne();
        },
        [ne],
      ),
        n.useEffect(
          function () {
            Y.current && se(j.end);
          },
          [j.end, se],
        ));
      var Ee = I && j;
      return (
        n.useEffect(
          function () {
            I && Y.current && W();
          },
          [W, I, Ee],
        ),
        n.useEffect(
          function () {
            !I && Y.current && W();
          },
          [
            W,
            I,
            j.start,
            j.suffix,
            j.prefix,
            j.duration,
            j.separator,
            j.decimals,
            j.decimal,
            j.className,
            j.formattingFn,
          ],
        ),
        n.useEffect(function () {
          Y.current = !0;
        }, []),
        typeof oe == "function"
          ? oe({
              countUpRef: U,
              start: le,
              reset: S,
              update: D,
              pauseResume: F,
              getCountUp: X,
            })
          : n.createElement(
              "span",
              p({ className: H, ref: U, style: ve }, ee),
              typeof j.start < "u" ? X().formattingFn(j.start) : "",
            )
      );
    };
  return ((Gs.default = te), (Gs.useCountUp = q), Gs);
}
var zO = _O();
const Hx = _f(zO),
  rv = [
    { end: 3, suffix: "+", key: "years" },
    { end: 2e3, suffix: "+", key: "Cases" },
  ];
function UO() {
  const { t: n, i18n: a } = Ct();
  a.language;
  const s = "font-theme",
    r = C.useRef(null),
    o = Px(r, { once: !1 }),
    [c, f] = C.useState(!1);
  return (
    C.useEffect(() => {
      f(o);
    }, [o]),
    A.jsxs("section", {
      ref: r,
      className: `bg-[var(--primary-black)] text-theme px-4 md:px-8 pb-20 text-center ${s}`,
      children: [
        A.jsx("h2", {
          className: "text-3xl md:text-5xl font-bold mb-12 text-theme",
          children: n("home.inNumbers.title"),
        }),
        A.jsx("div", {
          className:
            "flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0",
          children: rv.map((m, p) =>
            A.jsxs(
              C.Fragment,
              {
                children: [
                  A.jsxs("div", {
                    className: "text-center px-6 md:px-10",
                    children: [
                      A.jsx("div", {
                        className: "text-4xl md:text-6xl font-bold text-theme",
                        children:
                          c &&
                          A.jsx(Hx, {
                            end: m.end,
                            suffix: m.suffix,
                            duration: 2,
                          }),
                      }),
                      A.jsx("div", {
                        className:
                          "text-[var(--primary-light)] text-3xl md:text-3xl mt-2",
                        children: n(`home.inNumbers.stats.${m.key}`),
                      }),
                    ],
                  }),
                  p < rv.length - 1 &&
                    A.jsx("div", {
                      className:
                        "hidden md:block h-16 border-r border-theme mx-2",
                    }),
                ],
              },
              p,
            ),
          ),
        }),
      ],
    })
  );
}
function BO() {
  return A.jsxs(A.Fragment, {
    children: [A.jsx(yE, {}), A.jsx(MO, {}), A.jsx(jO, {}), A.jsx(UO, {})],
  });
}
const kO = "/about/About_Cover.png";
var Lf = new Map(),
  zl = new WeakMap(),
  lv = 0,
  PO = void 0;
function HO(n) {
  return n
    ? (zl.has(n) || ((lv += 1), zl.set(n, lv.toString())), zl.get(n))
    : "0";
}
function GO(n) {
  return Object.keys(n)
    .sort()
    .filter((a) => n[a] !== void 0)
    .map((a) => `${a}_${a === "root" ? HO(n.root) : n[a]}`)
    .toString();
}
function YO(n) {
  const a = GO(n);
  let s = Lf.get(a);
  if (!s) {
    const r = new Map();
    let o;
    const c = new IntersectionObserver((f) => {
      f.forEach((m) => {
        var p;
        const h = m.isIntersecting && o.some((g) => m.intersectionRatio >= g);
        (n.trackVisibility && typeof m.isVisible > "u" && (m.isVisible = h),
          (p = r.get(m.target)) == null ||
            p.forEach((g) => {
              g(h, m);
            }));
      });
    }, n);
    ((o =
      c.thresholds ||
      (Array.isArray(n.threshold) ? n.threshold : [n.threshold || 0])),
      (s = { id: a, observer: c, elements: r }),
      Lf.set(a, s));
  }
  return s;
}
function qO(n, a, s = {}, r = PO) {
  if (typeof window.IntersectionObserver > "u" && r !== void 0) {
    const p = n.getBoundingClientRect();
    return (
      a(r, {
        isIntersecting: r,
        target: n,
        intersectionRatio: typeof s.threshold == "number" ? s.threshold : 0,
        time: 0,
        boundingClientRect: p,
        intersectionRect: p,
        rootBounds: p,
      }),
      () => {}
    );
  }
  const { id: o, observer: c, elements: f } = YO(s),
    m = f.get(n) || [];
  return (
    f.has(n) || f.set(n, m),
    m.push(a),
    c.observe(n),
    function () {
      (m.splice(m.indexOf(a), 1),
        m.length === 0 && (f.delete(n), c.unobserve(n)),
        f.size === 0 && (c.disconnect(), Lf.delete(o)));
    }
  );
}
function KO({
  threshold: n,
  delay: a,
  trackVisibility: s,
  rootMargin: r,
  root: o,
  triggerOnce: c,
  skip: f,
  initialInView: m,
  fallbackInView: p,
  onChange: h,
} = {}) {
  var g;
  const [v, x] = C.useState(null),
    T = C.useRef(h),
    [E, M] = C.useState({ inView: !!m, entry: void 0 });
  ((T.current = h),
    C.useEffect(() => {
      if (f || !v) return;
      let V;
      return (
        (V = qO(
          v,
          (Q, q) => {
            (M({ inView: Q, entry: q }),
              T.current && T.current(Q, q),
              q.isIntersecting && c && V && (V(), (V = void 0)));
          },
          {
            root: o,
            rootMargin: r,
            threshold: n,
            trackVisibility: s,
            delay: a,
          },
          p,
        )),
        () => {
          V && V();
        }
      );
    }, [Array.isArray(n) ? n.toString() : n, v, o, r, c, f, s, p, a]));
  const N = (g = E.entry) == null ? void 0 : g.target,
    R = C.useRef(void 0);
  !v &&
    N &&
    !c &&
    !f &&
    R.current !== N &&
    ((R.current = N), M({ inView: !!m, entry: void 0 }));
  const G = [x, E.inView, E.entry];
  return ((G.ref = G[0]), (G.inView = G[1]), (G.entry = G[2]), G);
}
function FO() {
  const { t: n, i18n: a } = Ct(),
    s = a.language === "ar",
    r = s ? "text-right" : "text-left",
    o = "font-theme",
    f = [
      "3D conversions",
      "Consultations",
      "Guides",
      "Implant Treatment plans",
      "Esthetic / Prosthetic Consultations",
      "DSD planning",
      "Extra-Oral Prosthesis",
      "Research Samples and Assistance",
    ].map((g, v) => ({
      id: `section-${v + 1}`,
      title: n(`about.FirstParallax.title.${g}`),
      description: n(`about.FirstParallax.description.${g}`),
      image: `/about/${["1", "2", "3", "4", "5", "6", "7", "8", "9"][v]}.jpeg`,
    })),
    [m, p] = C.useState(null),
    h = C.useRef(null);
  return (
    C.useEffect(() => {
      var x;
      const g = new IntersectionObserver(
          (T) => {
            const E = T.filter((N) => N.isIntersecting);
            if (E.length === 0) {
              p(null);
              return;
            }
            const M = E.sort(
              (N, R) => R.intersectionRatio - N.intersectionRatio,
            )[0];
            p(M.target.id);
          },
          {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: "-35% 0px -35% 0px",
          },
        ),
        v =
          ((x = h.current) == null ? void 0 : x.querySelectorAll("section")) ??
          [];
      return (
        v.forEach((T) => g.observe(T)),
        () => v.forEach((T) => g.unobserve(T))
      );
    }, []),
    A.jsxs("div", {
      ref: h,
      dir: "ltr",
      className: `relative w-full bg-[var(--primary-black)] text-theme ${o}`,
      children: [
        A.jsx("aside", {
          className: `
          hidden md:flex flex-col items-end gap-3         
          absolute md:sticky                               
          right-4 md:right-8 lg:right-16 mr-8   
          top-[33vh] pt-36 pb-40                
          z-20 text-right leading-tight
        `,
          children: f.map((g) =>
            A.jsx(
              "button",
              {
                onClick: () => {
                  var v;
                  return (v = document.getElementById(g.id)) == null
                    ? void 0
                    : v.scrollIntoView({ behavior: "smooth" });
                },
                className: `whitespace-nowrap transition-colors duration-300 text-2xl font-semibold cursor-pointer
              ${m === g.id ? "text-[var(--secondary-orange)] font-extrabold" : "text-[var(--secondary-light)] hover:text-[var(--secondary-orange)]"}`,
                children: g.title,
              },
              g.id,
            ),
          ),
        }),
        A.jsx("div", {
          children: f.map((g) =>
            A.jsx(
              $O,
              {
                id: g.id,
                title: g.title,
                description: g.description,
                image: g.image,
                fontClass: o,
                textAlignClass: r,
                isArabic: s,
              },
              g.id,
            ),
          ),
        }),
      ],
    })
  );
}
function $O({
  id: n,
  title: a,
  description: s,
  image: r,
  fontClass: o,
  textAlignClass: c,
  isArabic: f,
}) {
  const [m, p] = KO({ triggerOnce: !1, threshold: 0.2 }),
    h = av(),
    g = av();
  return (
    C.useEffect(() => {
      p
        ? (h.start({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 1, ease: "easeOut" },
          }),
          g.start({
            opacity: 1,
            y: 0,
            rotateZ: 0,
            transition: { duration: 1.2, ease: "easeOut", delay: 0.2 },
          }))
        : (h.start({
            opacity: 0,
            y: 50,
            rotateX: -5,
            transition: { duration: 0.5, ease: "easeIn" },
          }),
          g.start({
            opacity: 0,
            y: 50,
            rotateZ: 3.5,
            transition: { duration: 0.5, ease: "easeIn" },
          }));
    }, [p, h, g]),
    A.jsx("section", {
      ref: m,
      id: n,
      className:
        "relative min-h-screen flex flex-col items-center md:items-start justify-center px-6 md:px-20 md:pr-[260px] lg:pr-[320px] md:mb-32",
      children: A.jsxs(Wt.div, {
        initial: { opacity: 0, y: 50, rotateZ: 3.5 },
        animate: g,
        className: "w-full",
        style: { transformOrigin: "bottom left" },
        children: [
          A.jsxs(Wt.div, {
            initial: { opacity: 0, y: 50, rotateX: -5 },
            animate: h,
            className: `max-w-3xl mx-auto md:mx-0 text-center md:text-left ${o} ${f ? "md:pr-12" : ""}`,
            children: [
              A.jsx("h2", {
                className: `text-4xl md:text-3xl font-extrabold text-theme mb-3 ${c}`,
                children: a,
              }),
              A.jsx("p", {
                className: `text-lg md:text-xl leading-relaxed text-white/80 mb-6 ${c}`,
                children: s,
              }),
            ],
          }),
          A.jsx(Wt.figure, {
            initial: { opacity: 0, y: 50, rotateX: -5 },
            animate: h,
            className: "w-full flex justify-center md:justify-start",
            children: A.jsx("img", {
              src: r,
              alt: a,
              className:
                "w-full max-w-[720px] h-[380px] object-position-center rounded-xl shadow-lg",
            }),
          }),
        ],
      }),
    })
  );
}
const wd = [
    [Math.PI / 2, Math.PI],
    [0, Math.PI],
    [0, Math.PI],
    [0, Math.PI / 2],
  ],
  XO = wd.reduce((n, [a, s]) => n + Math.abs(s - a), 0);
let Ic = 0;
const ov = wd.map(([n, a]) => {
  const s = Math.abs(a - n) / XO,
    r = [Ic, Ic + s];
  return ((Ic += s), r);
});
function ZO() {
  const { t: n, i18n: a } = Ct();
  a.language;
  const s = "font-theme",
    [r, o] = C.useState({ x: 867, y: 350 });
  C.useEffect(() => {
    const g = () => {
      const v = window.innerWidth;
      v < 640
        ? o({ x: 700, y: 330 })
        : v < 768
          ? o({ x: 650, y: 300 })
          : v < 1024
            ? o({ x: 560, y: 175 })
            : v < 1440
              ? o({ x: 610, y: 200 })
              : v < 1920
                ? o({ x: 866.5, y: 360 })
                : v < 2560
                  ? o({ x: 1400, y: 655 })
                  : o({ x: 1420, y: 670 });
    };
    return (
      g(),
      window.addEventListener("resize", g),
      () => window.removeEventListener("resize", g)
    );
  }, []);
  const f = [
      "3D conversions",
      "Implant Planning",
      "Surgical Guides",
      "Restorations",
    ].map((g) => ({
      label: n(`about.SecondParallax.labels.${g}`),
      text: n(`about.SecondParallax.text.${g}`),
      image: "/about/bubble-yellow.png",
    })),
    m = C.useRef(null),
    { scrollYProgress: p } = Ux({
      target: m,
      offset: ["start start", "end end"],
    }),
    h = EO(p, { stiffness: 80, damping: 20, restDelta: 0.001 });
  return A.jsx("section", {
    ref: m,
    className: `relative h-[850vh] -mt-20 bg-[var(--primary-black)] text-[var(--secondary-white)] ${s}`,
    children: A.jsxs("div", {
      className:
        "sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden",
      children: [
        A.jsx("h2", {
          className:
            "text-4xl sm:text-4xl md:text-6xl lg:text-6xl font-bold text-theme mb-6 mt-14",
          children: n("about.SecondParallax.title"),
        }),
        A.jsxs("div", {
          className:
            "relative w-full h-[65vh] sm:h-[72vh] md:h-[100vh] flex items-end justify-center",
          children: [
            A.jsx("img", {
              src: "/about/light-dome.png",
              alt: "Golden dome",
              className:
                "absolute bottom-0 w-[335vw] sm:w-[160vw] md:w-[100vw] h-auto max-w-none object-cover z-0",
            }),
            A.jsx("div", {
              className:
                "absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-black)] -bottom-1",
            }),
            f.map((g, v) => {
              const x = yt(h, ov[v], [0, 1]),
                [T, E] = wd[v],
                M = (T + E) / 2,
                N =
                  v === 1 || v === 2
                    ? yt(x, [0, 0.4, 0.45, 1], [T, M, M, E])
                    : yt(x, [0, 1], [T, E]),
                R = yt(N, (Q) => Math.cos(Q) * r.x),
                G = yt(N, (Q) => -Math.sin(Q) * r.y),
                V = yt(
                  N,
                  (Q) =>
                    (Math.atan2(r.y * Math.cos(Q), r.x * Math.sin(Q)) * 180) /
                    Math.PI,
                );
              return A.jsx(
                Wt.div,
                {
                  style: { x: R, y: G, rotate: V },
                  className:
                    "absolute w-[170px] h-[170px] sm:w-36 sm:h-36 md:w-[200px] md:h-[200px] lg:w-[205px] lg:h-[205px]",
                  children: A.jsxs("div", {
                    className: "relative w-full h-full",
                    children: [
                      A.jsx("img", {
                        src: g.image,
                        alt: g.label,
                        className: "w-full h-full object-contain",
                      }),
                      A.jsx("div", {
                        className: `absolute inset-0 flex items-center justify-center
                                text-theme font-semibold
                                text-2xl sm:text-lg md:text-2xl lg:text-3xl
                                tracking-tight text-center px-2 ${s}`,
                        children: g.label,
                      }),
                    ],
                  }),
                },
                v,
              );
            }),
            A.jsx("div", {
              className:
                "absolute inset-0 pointer-events-none flex items-center justify-center",
              children: f.map((g, v) => {
                const E = yt(h, ov[v], [0, 1]),
                  M = v === 0,
                  N = v === f.length - 1;
                let R, G;
                return (
                  M
                    ? ((R = yt(E, [0, 0.25, 0.5], [0, -30, -60])),
                      (G = yt(E, [0, 0.25, 0.5], [1, 1, 0])))
                    : N
                      ? ((R = yt(E, [0, 0.5, 1], [60, 0, 0])),
                        (G = yt(E, [0, 0.5, 1], [0, 1, 1])))
                      : ((R = yt(E, [0, 0.35, 0.8, 1], [60, 0, -60, -60])),
                        (G = yt(E, [0, 0.35, 0.8, 1], [0, 1, 1, 0]))),
                  A.jsx(
                    Wt.div,
                    {
                      style: { y: R, opacity: G },
                      className: `absolute left-1/2 -translate-x-1/2 whitespace-pre text-center
                              text-2xl sm:text-base md:text-2xl lg:text-3xl
                              text-theme mt-30`,
                      children: g.text,
                    },
                    v,
                  )
                );
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
const uv = [
  { end: 3, suffix: "+", key: "years" },
  { end: 2e3, suffix: "+", key: "Cases" },
];
function QO() {
  const { t: n, i18n: a } = Ct();
  a.language;
  const s = "font-theme",
    r = C.useRef(null),
    o = Px(r, { once: !1 }),
    [c, f] = C.useState(!1);
  return (
    C.useEffect(() => {
      f(o);
    }, [o]),
    A.jsxs("section", {
      ref: r,
      className: `bg-[var(--primary-black)] text-theme px-4 md:px-8 py-20 text-center ${s}`,
      children: [
        A.jsx("h2", {
          className: "text-3xl md:text-5xl font-bold mb-12 text-theme",
          children: n("home.inNumbers.title"),
        }),
        A.jsx("div", {
          className:
            "flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0",
          children: uv.map((m, p) =>
            A.jsxs(
              C.Fragment,
              {
                children: [
                  A.jsxs("div", {
                    className: "text-center px-6 md:px-10",
                    children: [
                      A.jsx("div", {
                        className: "text-4xl md:text-6xl font-bold text-theme",
                        children:
                          c &&
                          A.jsx(Hx, {
                            end: m.end,
                            suffix: m.suffix,
                            duration: 2,
                          }),
                      }),
                      A.jsx("div", {
                        className:
                          "text-[var(--primary-light)] text-3xl md:text-3xl mt-2",
                        children: n(`home.inNumbers.stats.${m.key}`),
                      }),
                    ],
                  }),
                  p < uv.length - 1 &&
                    A.jsx("div", {
                      className:
                        "hidden md:block h-16 border-r border-theme mx-2",
                    }),
                ],
              },
              p,
            ),
          ),
        }),
      ],
    })
  );
}
function IO() {
  const { t: n, i18n: a } = Ct();
  return (
    a.language,
    A.jsxs("section", {
      className: "w-full font-theme",
      children: [
        A.jsx("div", {
          className: "w-full h-[70vh] relative",
          style: {
            backgroundImage: `url(${kO})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
          children: A.jsx("div", {
            className:
              "absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-black)] -bottom-1",
          }),
        }),
        A.jsx("div", {
          className: "bg-[var(--primary-black)] pb-12 md:pb-20 text-center",
          children: A.jsx("h1", {
            className: "text-3xl md:text-6xl font-bold text-theme",
            children: n("about.title"),
          }),
        }),
        A.jsx(FO, {}),
        A.jsx(ZO, {}),
        A.jsx(QO, {}),
      ],
    })
  );
}
var Jc = { exports: {} },
  Wc,
  cv;
function JO() {
  if (cv) return Wc;
  cv = 1;
  var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ((Wc = n), Wc);
}
var ef, fv;
function WO() {
  if (fv) return ef;
  fv = 1;
  var n = JO();
  function a() {}
  function s() {}
  return (
    (s.resetWarningCache = a),
    (ef = function () {
      function r(f, m, p, h, g, v) {
        if (v !== n) {
          var x = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((x.name = "Invariant Violation"), x);
        }
      }
      r.isRequired = r;
      function o() {
        return r;
      }
      var c = {
        array: r,
        bigint: r,
        bool: r,
        func: r,
        number: r,
        object: r,
        string: r,
        symbol: r,
        any: r,
        arrayOf: o,
        element: r,
        elementType: r,
        instanceOf: o,
        node: r,
        objectOf: o,
        oneOf: o,
        oneOfType: o,
        shape: o,
        exact: o,
        checkPropTypes: s,
        resetWarningCache: a,
      };
      return ((c.PropTypes = c), c);
    }),
    ef
  );
}
var dv;
function eR() {
  return (dv || ((dv = 1), (Jc.exports = WO()())), Jc.exports);
}
var tR = eR();
const ke = _f(tR);
function hv(n, a) {
  var s = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    (a &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(n, o).enumerable;
      })),
      s.push.apply(s, r));
  }
  return s;
}
function mv(n) {
  for (var a = 1; a < arguments.length; a++) {
    var s = arguments[a] != null ? arguments[a] : {};
    a % 2
      ? hv(Object(s), !0).forEach(function (r) {
          Gx(n, r, s[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(s))
        : hv(Object(s)).forEach(function (r) {
            Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(s, r));
          });
  }
  return n;
}
function Fl(n) {
  "@babel/helpers - typeof";
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (Fl = function (a) {
          return typeof a;
        })
      : (Fl = function (a) {
          return a &&
            typeof Symbol == "function" &&
            a.constructor === Symbol &&
            a !== Symbol.prototype
            ? "symbol"
            : typeof a;
        }),
    Fl(n)
  );
}
function Gx(n, a, s) {
  return (
    a in n
      ? Object.defineProperty(n, a, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (n[a] = s),
    n
  );
}
function nR(n, a) {
  if (n == null) return {};
  var s = {},
    r = Object.keys(n),
    o,
    c;
  for (c = 0; c < r.length; c++)
    ((o = r[c]), !(a.indexOf(o) >= 0) && (s[o] = n[o]));
  return s;
}
function aR(n, a) {
  if (n == null) return {};
  var s = nR(n, a),
    r,
    o;
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(n);
    for (o = 0; o < c.length; o++)
      ((r = c[o]),
        !(a.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(n, r) &&
          (s[r] = n[r]));
  }
  return s;
}
function iR(n, a) {
  return sR(n) || rR(n, a) || lR(n, a) || oR();
}
function sR(n) {
  if (Array.isArray(n)) return n;
}
function rR(n, a) {
  var s = n && ((typeof Symbol < "u" && n[Symbol.iterator]) || n["@@iterator"]);
  if (s != null) {
    var r = [],
      o = !0,
      c = !1,
      f,
      m;
    try {
      for (
        s = s.call(n);
        !(o = (f = s.next()).done) && (r.push(f.value), !(a && r.length === a));
        o = !0
      );
    } catch (p) {
      ((c = !0), (m = p));
    } finally {
      try {
        !o && s.return != null && s.return();
      } finally {
        if (c) throw m;
      }
    }
    return r;
  }
}
function lR(n, a) {
  if (n) {
    if (typeof n == "string") return pv(n, a);
    var s = Object.prototype.toString.call(n).slice(8, -1);
    if (
      (s === "Object" && n.constructor && (s = n.constructor.name),
      s === "Map" || s === "Set")
    )
      return Array.from(n);
    if (s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
      return pv(n, a);
  }
}
function pv(n, a) {
  (a == null || a > n.length) && (a = n.length);
  for (var s = 0, r = new Array(a); s < a; s++) r[s] = n[s];
  return r;
}
function oR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var zt = function (a, s, r) {
    var o = !!r,
      c = Le.useRef(r);
    (Le.useEffect(
      function () {
        c.current = r;
      },
      [r],
    ),
      Le.useEffect(
        function () {
          if (!o || !a) return function () {};
          var f = function () {
            c.current && c.current.apply(c, arguments);
          };
          return (
            a.on(s, f),
            function () {
              a.off(s, f);
            }
          );
        },
        [o, s, a, c],
      ));
  },
  uR = function (a) {
    var s = Le.useRef(a);
    return (
      Le.useEffect(
        function () {
          s.current = a;
        },
        [a],
      ),
      s.current
    );
  },
  Wl = function (a) {
    return a !== null && Fl(a) === "object";
  },
  gv = "[object Object]",
  cR = function n(a, s) {
    if (!Wl(a) || !Wl(s)) return a === s;
    var r = Array.isArray(a),
      o = Array.isArray(s);
    if (r !== o) return !1;
    var c = Object.prototype.toString.call(a) === gv,
      f = Object.prototype.toString.call(s) === gv;
    if (c !== f) return !1;
    if (!c && !r) return a === s;
    var m = Object.keys(a),
      p = Object.keys(s);
    if (m.length !== p.length) return !1;
    for (var h = {}, g = 0; g < m.length; g += 1) h[m[g]] = !0;
    for (var v = 0; v < p.length; v += 1) h[p[v]] = !0;
    var x = Object.keys(h);
    if (x.length !== m.length) return !1;
    var T = a,
      E = s,
      M = function (R) {
        return n(T[R], E[R]);
      };
    return x.every(M);
  },
  fR = function (a, s, r) {
    return Wl(a)
      ? Object.keys(a).reduce(function (o, c) {
          var f = !Wl(s) || !cR(a[c], s[c]);
          return r.includes(c)
            ? (f &&
                console.warn(
                  "Unsupported prop change: options.".concat(
                    c,
                    " is not a mutable property.",
                  ),
                ),
              o)
            : f
              ? mv(mv({}, o || {}), {}, Gx({}, c, a[c]))
              : o;
        }, null)
      : null;
  },
  Yx = Le.createContext(null);
Yx.displayName = "ElementsContext";
var dR = function (a, s) {
  if (!a)
    throw new Error(
      "Could not find Elements context; You need to wrap the part of your app that ".concat(
        s,
        " in an <Elements> provider.",
      ),
    );
  return a;
};
(ke.any, ke.object);
ke.func.isRequired;
var qx = Le.createContext(null);
qx.displayName = "CheckoutSdkContext";
var hR = function (a, s) {
    if (!a)
      throw new Error(
        "Could not find CheckoutProvider context; You need to wrap the part of your app that ".concat(
          s,
          " in an <CheckoutProvider> provider.",
        ),
      );
    return a;
  },
  mR = Le.createContext(null);
mR.displayName = "CheckoutContext";
(ke.any,
  ke.shape({
    fetchClientSecret: ke.func.isRequired,
    elementsOptions: ke.object,
  }).isRequired);
var yv = function (a) {
    var s = Le.useContext(qx),
      r = Le.useContext(Yx);
    if (s && r)
      throw new Error(
        "You cannot wrap the part of your app that ".concat(
          a,
          " in both <CheckoutProvider> and <Elements> providers.",
        ),
      );
    return s ? hR(s, a) : dR(r, a);
  },
  pR = ["mode"],
  gR = function (a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  },
  Qe = function (a, s) {
    var r = "".concat(gR(a), "Element"),
      o = function (p) {
        var h = p.id,
          g = p.className,
          v = p.options,
          x = v === void 0 ? {} : v,
          T = p.onBlur,
          E = p.onFocus,
          M = p.onReady,
          N = p.onChange,
          R = p.onEscape,
          G = p.onClick,
          V = p.onLoadError,
          Q = p.onLoaderStart,
          q = p.onNetworksChange,
          ae = p.onConfirm,
          te = p.onCancel,
          k = p.onShippingAddressChange,
          j = p.onShippingRateChange,
          H = yv("mounts <".concat(r, ">")),
          I = "elements" in H ? H.elements : null,
          ee = "checkoutSdk" in H ? H.checkoutSdk : null,
          oe = Le.useState(null),
          ve = iR(oe, 2),
          ce = ve[0],
          U = ve[1],
          Y = Le.useRef(null),
          J = Le.useRef(null);
        (zt(ce, "blur", T),
          zt(ce, "focus", E),
          zt(ce, "escape", R),
          zt(ce, "click", G),
          zt(ce, "loaderror", V),
          zt(ce, "loaderstart", Q),
          zt(ce, "networkschange", q),
          zt(ce, "confirm", ae),
          zt(ce, "cancel", te),
          zt(ce, "shippingaddresschange", k),
          zt(ce, "shippingratechange", j),
          zt(ce, "change", N));
        var le;
        (M &&
          (a === "expressCheckout"
            ? (le = M)
            : (le = function () {
                M(ce);
              })),
          zt(ce, "ready", le),
          Le.useLayoutEffect(
            function () {
              if (Y.current === null && J.current !== null && (I || ee)) {
                var D = null;
                if (ee)
                  switch (a) {
                    case "payment":
                      D = ee.createPaymentElement(x);
                      break;
                    case "address":
                      if ("mode" in x) {
                        var F = x.mode,
                          X = aR(x, pR);
                        if (F === "shipping")
                          D = ee.createShippingAddressElement(X);
                        else if (F === "billing")
                          D = ee.createBillingAddressElement(X);
                        else
                          throw new Error(
                            "Invalid options.mode. mode must be 'billing' or 'shipping'.",
                          );
                      } else
                        throw new Error(
                          "You must supply options.mode. mode must be 'billing' or 'shipping'.",
                        );
                      break;
                    case "expressCheckout":
                      D = ee.createExpressCheckoutElement(x);
                      break;
                    case "currencySelector":
                      D = ee.createCurrencySelectorElement();
                      break;
                    default:
                      throw new Error(
                        "Invalid Element type ".concat(
                          r,
                          ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />.",
                        ),
                      );
                  }
                else I && (D = I.create(a, x));
                ((Y.current = D), U(D), D && D.mount(J.current));
              }
            },
            [I, ee, x],
          ));
        var S = uR(x);
        return (
          Le.useEffect(
            function () {
              if (Y.current) {
                var D = fR(x, S, ["paymentRequest"]);
                D && "update" in Y.current && Y.current.update(D);
              }
            },
            [x, S],
          ),
          Le.useLayoutEffect(function () {
            return function () {
              if (Y.current && typeof Y.current.destroy == "function")
                try {
                  (Y.current.destroy(), (Y.current = null));
                } catch {}
            };
          }, []),
          Le.createElement("div", { id: h, className: g, ref: J })
        );
      },
      c = function (p) {
        yv("mounts <".concat(r, ">"));
        var h = p.id,
          g = p.className;
        return Le.createElement("div", { id: h, className: g });
      },
      f = s ? c : o;
    return (
      (f.propTypes = {
        id: ke.string,
        className: ke.string,
        onChange: ke.func,
        onBlur: ke.func,
        onFocus: ke.func,
        onReady: ke.func,
        onEscape: ke.func,
        onClick: ke.func,
        onLoadError: ke.func,
        onLoaderStart: ke.func,
        onNetworksChange: ke.func,
        onConfirm: ke.func,
        onCancel: ke.func,
        onShippingAddressChange: ke.func,
        onShippingRateChange: ke.func,
        options: ke.object,
      }),
      (f.displayName = r),
      (f.__elementType = a),
      f
    );
  },
  Ie = typeof window > "u",
  yR = Le.createContext(null);
yR.displayName = "EmbeddedCheckoutProviderContext";
Qe("auBankAccount", Ie);
var vR = Qe("card", Ie);
Qe("cardNumber", Ie);
Qe("cardExpiry", Ie);
Qe("cardCvc", Ie);
Qe("fpxBank", Ie);
Qe("iban", Ie);
Qe("idealBank", Ie);
Qe("p24Bank", Ie);
Qe("epsBank", Ie);
Qe("payment", Ie);
Qe("expressCheckout", Ie);
Qe("currencySelector", Ie);
Qe("paymentRequestButton", Ie);
Qe("linkAuthentication", Ie);
Qe("address", Ie);
Qe("shippingAddress", Ie);
Qe("paymentMethodMessaging", Ie);
Qe("affirmMessage", Ie);
Qe("afterpayClearpayMessage", Ie);
var tf, vv;
function xR() {
  if (vv) return tf;
  vv = 1;
  var n = Object.defineProperty,
    a = Object.getOwnPropertyDescriptor,
    s = Object.getOwnPropertyNames,
    r = Object.prototype.hasOwnProperty,
    o = (S, D) => {
      for (var F in D) n(S, F, { get: D[F], enumerable: !0 });
    },
    c = (S, D, F, X) => {
      if ((D && typeof D == "object") || typeof D == "function")
        for (let W of s(D))
          !r.call(S, W) &&
            W !== F &&
            n(S, W, {
              get: () => D[W],
              enumerable: !(X = a(D, W)) || X.enumerable,
            });
      return S;
    },
    f = (S) => c(n({}, "__esModule", { value: !0 }), S),
    m = (S, D, F) =>
      new Promise((X, W) => {
        var se = (me) => {
            try {
              Ee(F.next(me));
            } catch (ze) {
              W(ze);
            }
          },
          ne = (me) => {
            try {
              Ee(F.throw(me));
            } catch (ze) {
              W(ze);
            }
          },
          Ee = (me) =>
            me.done ? X(me.value) : Promise.resolve(me.value).then(se, ne);
        Ee((F = F.apply(S, D)).next());
      }),
    p = {};
  (o(p, {
    SubmissionError: () => Q,
    appendExtraData: () => oe,
    createClient: () => Y,
    getDefaultClient: () => J,
    isSubmissionError: () => V,
  }),
    (tf = f(p)));
  var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    g =
      /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  function v(S) {
    S = String(S);
    for (var D, F, X, W, se = "", ne = 0, Ee = S.length % 3; ne < S.length; ) {
      if (
        (F = S.charCodeAt(ne++)) > 255 ||
        (X = S.charCodeAt(ne++)) > 255 ||
        (W = S.charCodeAt(ne++)) > 255
      )
        throw new TypeError(
          "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.",
        );
      ((D = (F << 16) | (X << 8) | W),
        (se +=
          h.charAt((D >> 18) & 63) +
          h.charAt((D >> 12) & 63) +
          h.charAt((D >> 6) & 63) +
          h.charAt(D & 63)));
    }
    return Ee ? se.slice(0, Ee - 3) + "===".substring(Ee) : se;
  }
  function x(S) {
    if (((S = String(S).replace(/[\t\n\f\r ]+/g, "")), !g.test(S)))
      throw new TypeError(
        "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.",
      );
    S += "==".slice(2 - (S.length & 3));
    for (var D, F = "", X, W, se = 0; se < S.length; )
      ((D =
        (h.indexOf(S.charAt(se++)) << 18) |
        (h.indexOf(S.charAt(se++)) << 12) |
        ((X = h.indexOf(S.charAt(se++))) << 6) |
        (W = h.indexOf(S.charAt(se++)))),
        (F +=
          X === 64
            ? String.fromCharCode((D >> 16) & 255)
            : W === 64
              ? String.fromCharCode((D >> 16) & 255, (D >> 8) & 255)
              : String.fromCharCode((D >> 16) & 255, (D >> 8) & 255, D & 255)));
    return F;
  }
  var T = () =>
      navigator.webdriver ||
      !!document.documentElement.getAttribute(x("d2ViZHJpdmVy")) ||
      !!window.callPhantom ||
      !!window._phantom,
    E = class {
      constructor() {
        ((this.loadedAt = Date.now()), (this.webdriver = T()));
      }
      data() {
        return { loadedAt: this.loadedAt, webdriver: this.webdriver };
      }
    },
    M = class {
      constructor(S) {
        ((this.kind = "success"), (this.next = S.next));
      }
    };
  function N(S) {
    return "next" in S && typeof S.next == "string";
  }
  var R = class {
    constructor(S, D) {
      ((this.paymentIntentClientSecret = S),
        (this.resubmitKey = D),
        (this.kind = "stripePluginPending"));
    }
  };
  function G(S) {
    if (
      "stripe" in S &&
      "resubmitKey" in S &&
      typeof S.resubmitKey == "string"
    ) {
      let { stripe: D } = S;
      return (
        typeof D == "object" &&
        D != null &&
        "paymentIntentClientSecret" in D &&
        typeof D.paymentIntentClientSecret == "string"
      );
    }
    return !1;
  }
  function V(S) {
    return S.kind === "error";
  }
  var Q = class {
    constructor(...S) {
      ((this.kind = "error"),
        (this.formErrors = []),
        (this.fieldErrors = new Map()));
      var D;
      for (let F of S) {
        if (!F.field) {
          this.formErrors.push({
            code: F.code && q(F.code) ? F.code : "UNSPECIFIED",
            message: F.message,
          });
          continue;
        }
        let X = (D = this.fieldErrors.get(F.field)) != null ? D : [];
        (X.push({
          code: F.code && te(F.code) ? F.code : "UNSPECIFIED",
          message: F.message,
        }),
          this.fieldErrors.set(F.field, X));
      }
    }
    getFormErrors() {
      return [...this.formErrors];
    }
    getFieldErrors(S) {
      var D;
      return (D = this.fieldErrors.get(S)) != null ? D : [];
    }
    getAllFieldErrors() {
      return Array.from(this.fieldErrors);
    }
  };
  function q(S) {
    return S in ae;
  }
  var ae = {
    BLOCKED: "BLOCKED",
    EMPTY: "EMPTY",
    FILES_TOO_BIG: "FILES_TOO_BIG",
    FORM_NOT_FOUND: "FORM_NOT_FOUND",
    INACTIVE: "INACTIVE",
    NO_FILE_UPLOADS: "NO_FILE_UPLOADS",
    PROJECT_NOT_FOUND: "PROJECT_NOT_FOUND",
    TOO_MANY_FILES: "TOO_MANY_FILES",
  };
  function te(S) {
    return S in k;
  }
  var k = {
    REQUIRED_FIELD_EMPTY: "REQUIRED_FIELD_EMPTY",
    REQUIRED_FIELD_MISSING: "REQUIRED_FIELD_MISSING",
    STRIPE_CLIENT_ERROR: "STRIPE_CLIENT_ERROR",
    STRIPE_SCA_ERROR: "STRIPE_SCA_ERROR",
    TYPE_EMAIL: "TYPE_EMAIL",
    TYPE_NUMERIC: "TYPE_NUMERIC",
    TYPE_TEXT: "TYPE_TEXT",
  };
  function j(S) {
    return (
      ("errors" in S &&
        Array.isArray(S.errors) &&
        S.errors.every((D) => typeof D.message == "string")) ||
      ("error" in S && typeof S.error == "string")
    );
  }
  var H = "4.0.0",
    I = (S) => v(JSON.stringify(S)),
    ee = (S) => {
      let D = `@formspree/core@${H}`;
      return S ? `${S} ${D}` : D;
    };
  function oe(S, D, F) {
    S instanceof FormData ? S.append(D, F) : (S[D] = F);
  }
  function ve(S) {
    return S !== null && typeof S == "object";
  }
  var ce = class {
    constructor(S = {}) {
      ((this.project = S.project),
        (this.stripe = S.stripe),
        typeof window < "u" && (this.session = new E()));
    }
    submitForm(S, D) {
      return m(this, arguments, function* (F, X, W = {}) {
        let se = W.endpoint || "https://formspree.io",
          ne = this.project ? `${se}/p/${this.project}/f/${F}` : `${se}/f/${F}`,
          Ee = {
            Accept: "application/json",
            "Formspree-Client": ee(W.clientName),
          };
        (this.session &&
          (Ee["Formspree-Session-Data"] = I(this.session.data())),
          X instanceof FormData || (Ee["Content-Type"] = "application/json"));
        function me(ct) {
          return m(this, null, function* () {
            try {
              let we = yield (yield fetch(ne, {
                method: "POST",
                mode: "cors",
                body: ct instanceof FormData ? ct : JSON.stringify(ct),
                headers: Ee,
              })).json();
              if (ve(we)) {
                if (j(we))
                  return Array.isArray(we.errors)
                    ? new Q(...we.errors)
                    : new Q({ message: we.error });
                if (G(we))
                  return new R(
                    we.stripe.paymentIntentClientSecret,
                    we.resubmitKey,
                  );
                if (N(we)) return new M({ next: we.next });
              }
              return new Q({ message: "Unexpected response format" });
            } catch (we) {
              let Ut =
                we instanceof Error
                  ? we.message
                  : `Unknown error while posting to Formspree: ${JSON.stringify(we)}`;
              return new Q({ message: Ut });
            }
          });
        }
        if (this.stripe && W.createPaymentMethod) {
          let ct = yield W.createPaymentMethod();
          if (ct.error)
            return new Q({
              code: "STRIPE_CLIENT_ERROR",
              field: "paymentMethod",
              message: "Error creating payment method",
            });
          oe(X, "paymentMethod", ct.paymentMethod.id);
          let we = yield me(X);
          if (we.kind === "error") return we;
          if (we.kind === "stripePluginPending") {
            let Ut = yield this.stripe.handleCardAction(
              we.paymentIntentClientSecret,
            );
            if (Ut.error)
              return new Q({
                code: "STRIPE_CLIENT_ERROR",
                field: "paymentMethod",
                message: "Stripe SCA error",
              });
            (X instanceof FormData
              ? X.delete("paymentMethod")
              : delete X.paymentMethod,
              oe(X, "paymentIntent", Ut.paymentIntent.id),
              oe(X, "resubmitKey", we.resubmitKey));
            let rt = yield me(X);
            return (U(rt), rt);
          }
          return we;
        }
        let ze = yield me(X);
        return (U(ze), ze);
      });
    }
  };
  function U(S) {
    let { kind: D } = S;
    if (D !== "success" && D !== "error")
      throw new Error(`Unexpected submission result (kind: ${D})`);
  }
  var Y = (S) => new ce(S),
    J = () => (le || (le = Y()), le),
    le;
  return tf;
}
var Ad = xR();
function eo(n) {
  let { prefix: a, field: s, errors: r, ...o } = n;
  if (r == null) return null;
  let c = s ? r.getFieldErrors(s) : r.getFormErrors();
  return c.length === 0
    ? null
    : Le.createElement(
        "div",
        { ...o },
        a ? `${a} ` : null,
        c.map((f) => f.message).join(", "),
      );
}
var bR = C.createContext({ elements: null });
function SR() {
  return C.useContext(bR);
}
var TR = Le.createContext(null);
function ER() {
  return C.useContext(TR) ?? { client: Ad.getDefaultClient() };
}
var wR = "3.0.0",
  AR = `@formspree/react@${wR}`;
function CR(n, a = {}) {
  let s = ER(),
    { client: r = s.client, extraData: o, origin: c } = a,
    { elements: f } = SR(),
    { stripe: m } = r;
  return async function (p) {
    let h = OR(p) ? RR(p) : p;
    if (typeof o == "object")
      for (let [x, T] of Object.entries(o)) {
        let E;
        (typeof T == "function" ? (E = await T()) : (E = T),
          E !== void 0 && Ad.appendExtraData(h, x, E));
      }
    let g = f == null ? void 0 : f.getElement(vR),
      v =
        m && g
          ? () =>
              m.createPaymentMethod({
                type: "card",
                card: g,
                billing_details: DR(h),
              })
          : void 0;
    return r.submitForm(n, h, {
      endpoint: c,
      clientName: AR,
      createPaymentMethod: v,
    });
  };
}
function OR(n) {
  return "preventDefault" in n && typeof n.preventDefault == "function";
}
function RR(n) {
  n.preventDefault();
  let a = n.currentTarget;
  if (a.tagName != "FORM")
    throw new Error("submit was triggered for a non-form element");
  return new FormData(a);
}
function DR(n) {
  let a = { address: MR(n) };
  for (let s of ["name", "email", "phone"]) {
    let r = n instanceof FormData ? n.get(s) : n[s];
    r && typeof r == "string" && (a[s] = r);
  }
  return a;
}
function MR(n) {
  let a = {};
  for (let [s, r] of [
    ["address_line1", "line1"],
    ["address_line2", "line2"],
    ["address_city", "city"],
    ["address_country", "country"],
    ["address_state", "state"],
    ["address_postal_code", "postal_code"],
  ]) {
    let o = n instanceof FormData ? n.get(s) : n[s];
    o && typeof o == "string" && (a[r] = o);
  }
  return a;
}
function Kx(n, a = {}) {
  let [s, r] = C.useState(null),
    [o, c] = C.useState(null),
    [f, m] = C.useState(!1),
    [p, h] = C.useState(!1);
  if (!n)
    throw new Error(
      'You must provide a form key or hashid (e.g. useForm("myForm") or useForm("123xyz")',
    );
  let g = CR(n, { client: a.client, extraData: a.data, origin: a.endpoint });
  return [
    { errors: s, result: o, submitting: f, succeeded: p },
    async function (v) {
      m(!0);
      let x = await g(v);
      (m(!1), Ad.isSubmissionError(x) ? (r(x), h(!1)) : (r(null), c(x), h(!0)));
    },
    function () {
      (r(null), c(null), m(!1), h(!1));
    },
  ];
}
function NR() {
  const { t: n } = Ct(),
    a = "font-theme",
    [s, r] = Kx("xzzarrrz"),
    o =
      "w-full rounded-md px-4 py-3 bg-[var(--secondary-white)] text-[var(--primary-black)] placeholder:text-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--secondary-orange)]";
  return A.jsxs("section", {
    className: `w-full bg-[var(--primary-black)] text-theme px-6 py-10 ${a}`,
    children: [
      A.jsxs("form", {
        onSubmit: r,
        className: "max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6",
        children: [
          A.jsx("input", {
            type: "text",
            name: "_gotcha",
            className: "hidden",
            tabIndex: -1,
            autoComplete: "off",
          }),
          A.jsx(c, {
            label: n("contact.clients.name"),
            name: "name",
            placeholder: n("contact.placeholders.name"),
            className: "md:col-span-1",
          }),
          A.jsx(c, {
            label: n("contact.clients.number"),
            name: "phone",
            placeholder: n("contact.placeholders.phone", "050 000 0000"),
            type: "tel",
            className: "md:col-span-1",
          }),
          A.jsx(c, {
            label: n("contact.clients.email"),
            name: "email",
            placeholder: n("contact.placeholders.email", "email@example.com"),
            type: "email",
            className: "md:col-span-1",
          }),
          A.jsx(f, {
            label: n("contact.clients.scope"),
            name: "scope",
            list: n("contact.options.scopes", { returnObjects: !0 }),
          }),
          A.jsx(m, {
            label: n("contact.clients.message"),
            name: "message",
            placeholder: n("contact.placeholders.message") || "Message",
            className: "md:col-span-2",
          }),
          A.jsx("button", {
            type: "submit",
            disabled: s.submitting,
            className:
              "w-full rounded-md bg-[var(--secondary-orange)] py-3 text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 md:col-span-2 cursor-pointer",
            children: n("contact.clients.send"),
          }),
        ],
      }),
      A.jsx("div", {
        className: "max-w-3xl mx-auto",
        children:
          s.succeeded &&
          A.jsx("p", {
            className: "text-center text-[var(--secondary-cream)] mt-4",
            children: "Thanks — we’ll be in touch shortly!",
          }),
      }),
    ],
  });
  function c({
    label: p,
    name: h,
    placeholder: g,
    type: v = "text",
    className: x = "",
  }) {
    return A.jsxs("div", {
      className: `flex flex-col gap-1 ${x}`,
      children: [
        A.jsx("label", { className: "font-medium text-theme", children: p }),
        A.jsx("input", {
          type: v,
          name: h,
          required: !0,
          placeholder: g,
          className: o,
        }),
        A.jsx(eo, { prefix: p, field: h, errors: s.errors }),
      ],
    });
  }
  function f({ label: p, name: h, list: g, className: v = "" }) {
    return A.jsxs("div", {
      className: `flex flex-col gap-1 ${v}`,
      children: [
        A.jsx("label", { className: "font-medium text-theme", children: p }),
        A.jsxs("select", {
          name: h,
          required: !0,
          className: o + " cursor-pointer",
          defaultValue: "",
          children: [
            A.jsx("option", {
              value: "",
              disabled: !0,
              children: n("Scope") || "Select...",
            }),
            g.map((x) => A.jsx("option", { value: x, children: x }, x)),
          ],
        }),
      ],
    });
  }
  function m({ label: p, name: h, placeholder: g, className: v = "" }) {
    return A.jsxs("div", {
      className: `flex flex-col gap-1 ${v}`,
      children: [
        A.jsx("label", { className: "font-medium text-theme", children: p }),
        A.jsx("textarea", { name: h, rows: 4, placeholder: g, className: o }),
        A.jsx(eo, { prefix: p, field: h, errors: s.errors }),
      ],
    });
  }
}
const jR = () => {
  const { t: n, i18n: a } = Ct(),
    r = a.language === "ar" ? "font-theme-ar" : "font-theme";
  return A.jsxs("section", {
    className: `min-h-screen bg-[var(--primary-black)] text-white overflow-x-hidden ${r}`,
    children: [
      A.jsx("div", {
        className: "text-center pt-32",
        children: A.jsx("h2", {
          className: "text-5xl font-bold text-theme",
          children: n("contact.title"),
        }),
      }),
      A.jsx(NR, {}),
    ],
  });
};
function LR() {
  const { t: n, i18n: a } = Ct();
  a.language;
  const s = "font-theme",
    r = oo(),
    [o, c] = Kx("myzwrlke");
  C.useEffect(() => {
    if (o.succeeded) {
      const j = setTimeout(() => r("/"), 3e3);
      return () => clearTimeout(j);
    }
  }, [o.succeeded, r]);
  const f = "YOUR_GOOGLE_CLIENT_ID",
    m = "YOUR_DEVELOPER_KEY",
    [p, h] = C.useState(!1),
    [g, v] = C.useState(!1),
    [x, T] = C.useState(null),
    [E, M] = C.useState(!1),
    [N, R] = C.useState(null),
    G = C.useRef(null);
  (C.useEffect(() => {
    if (document.getElementById("gapi-script")) v(!0);
    else {
      const j = document.createElement("script");
      ((j.id = "gapi-script"),
        (j.src = "https://apis.google.com/js/api.js"),
        (j.onload = () => v(!0)),
        document.body.appendChild(j));
    }
  }, []),
    C.useEffect(() => {
      g && !p && window.gapi.load("picker", { callback: () => h(!0) });
    }, [g, p]));
  const V = () => {
      window.gapi.load("auth", {
        callback: () => {
          window.gapi.auth.authorize(
            {
              client_id: f,
              scope: [
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/drive",
              ].join(" "),
              immediate: !1,
            },
            (j) => {
              j && !j.error && Q(j.access_token);
            },
          );
        },
      });
    },
    Q = async (j) => {
      (M(!0), R(null));
      try {
        const H = `Order_${Date.now()}`,
          ee = await (
            await fetch("https://www.googleapis.com/drive/v3/files", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${j}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: H,
                mimeType: "application/vnd.google-apps.folder",
              }),
            })
          ).json();
        ee && ee.id
          ? q(j, ee.id)
          : R("Failed to create folder. Please try again.");
      } catch {
        R("Failed to create folder. Please try again.");
      } finally {
        M(!1);
      }
    },
    q = (j, H) => {
      if (window.google && window.google.picker) {
        const I = new window.google.picker.DocsUploadView();
        (H && I.setParent(H),
          new window.google.picker.PickerBuilder()
            .addView(I)
            .setOAuthToken(j)
            .setDeveloperKey(m)
            .setCallback((oe) => {
              oe.action === window.google.picker.Action.PICKED && T(oe);
            })
            .build()
            .setVisible(!0));
      }
    },
    ae =
      "w-full rounded-md px-[clamp(0.75rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,1rem)] bg-[var(--secondary-white)] text-[var(--primary-black)] placeholder:text-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--secondary-orange)]";
  return A.jsxs("section", {
    id: "order",
    className: `
        min-h-screen flex flex-col justify-center
        bg-[var(--primary-black)] text-theme
        px-[clamp(1rem,5vw,3rem)] py-[clamp(2rem,5vw,4rem)]
        ${s}
      `,
    children: [
      A.jsx("h2", {
        className:
          "mb-[clamp(1.5rem,3vw,2rem)] text-center font-bold text-[clamp(1.5rem,4vw,2.5rem)] text-theme",
        children: n("order.title"),
      }),
      o.succeeded
        ? A.jsxs("div", {
            className: "flex flex-col items-center gap-4 mt-8",
            children: [
              A.jsx("p", {
                className: "text-lg text-theme",
                children: n("order.uploadTitle", "Upload your files"),
              }),
              A.jsx("button", {
                ref: G,
                onClick: V,
                className:
                  "px-6 py-2 rounded bg-[var(--secondary-orange)] text-white font-semibold",
                disabled: !p || E,
                children: E
                  ? n("order.creatingFolder", "Creating folder...")
                  : n("order.uploadWithGoogle", "Upload with Google Drive"),
              }),
              N && A.jsx("p", { className: "text-red-500", children: N }),
              x &&
                A.jsxs("div", {
                  className: "mt-4 text-green-400",
                  children: [
                    A.jsx("p", {
                      children: n("order.uploadedFile", "Uploaded file(s):"),
                    }),
                    A.jsx("ul", {
                      children: x.docs.map((j) =>
                        A.jsx(
                          "li",
                          {
                            children: A.jsx("a", {
                              href: j.url,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              children: j.name,
                            }),
                          },
                          j.id,
                        ),
                      ),
                    }),
                  ],
                }),
              A.jsx("button", {
                className:
                  "mt-6 px-6 py-2 rounded bg-[var(--secondary-orange)] text-white font-semibold",
                onClick: () => r("/"),
                children: n("order.backHome", "Back to Home"),
              }),
            ],
          })
        : A.jsxs("form", {
            onSubmit: c,
            className: `w-full max-w-screen-lg mx-auto
            grid grid-cols-1 md:grid-cols-2
            gap-[clamp(0.5rem,1vw,1rem)]`,
            children: [
              A.jsx("input", {
                type: "text",
                name: "_gotcha",
                className: "hidden",
                tabIndex: -1,
                autoComplete: "off",
              }),
              A.jsx(te, {
                label: n("order.clients.name"),
                name: "name",
                placeholder: n("order.placeholders.name"),
              }),
              A.jsx(te, {
                label: n("order.clients.number"),
                name: "phone",
                placeholder: n("order.placeholders.phone", "050 000 0000"),
                type: "tel",
              }),
              A.jsx(te, {
                label: n("order.clients.email"),
                name: "email",
                placeholder: n("order.placeholders.email", "example@email.com"),
                type: "email",
                className: "md:col-span-1",
              }),
              A.jsx(te, {
                label: n("order.clients.organization"),
                name: "organization",
                placeholder: n("order.placeholders.organization"),
              }),
              A.jsx(k, {
                label: n("order.clients.message"),
                name: "message",
                placeholder: n("order.placeholders.message"),
                className: "md:col-span-2",
              }),
              A.jsx("div", {
                className: "md:col-span-2",
                children: A.jsx("button", {
                  type: "submit",
                  disabled: o.submitting,
                  className:
                    "w-full rounded-md bg-[var(--secondary-orange)] py-[clamp(0.75rem,2vw,1rem)] transition-opacity disabled:opacity-50 cursor-pointer text-[clamp(1rem,2.5vw,1.25rem)] font-semibold text-white hover:opacity-90",
                  children: n("order.clients.send"),
                }),
              }),
            ],
          }),
    ],
  });
  function te({
    label: j,
    name: H,
    placeholder: I,
    type: ee = "text",
    className: oe = "",
  }) {
    return A.jsxs("div", {
      className: `flex flex-col gap-[clamp(0.5rem,1vw,1rem)] ${oe} ${s}`,
      children: [
        A.jsx("label", {
          className: "text-[clamp(1rem,2vw,1.25rem)]",
          children: j,
        }),
        A.jsx("input", {
          type: ee,
          name: H,
          required: !0,
          placeholder: I,
          className: ae,
        }),
        A.jsx(eo, { prefix: j, field: H, errors: o.errors }),
      ],
    });
  }
  function k({ label: j, name: H, placeholder: I, className: ee = "" }) {
    return A.jsxs("div", {
      className: `flex flex-col gap-[clamp(0.5rem,1vw,1rem)] md:col-span-2 ${ee} ${s}`,
      children: [
        A.jsx("label", {
          className: "text-[clamp(1rem,2vw,1.25rem)]",
          children: j,
        }),
        A.jsx("textarea", {
          name: H,
          rows: 4,
          required: !0,
          placeholder: I,
          className: ae,
        }),
        A.jsx(eo, { prefix: j, field: H, errors: o.errors }),
      ],
    });
  }
}
function VR() {
  const { slug: n } = rT(),
    a = oo(),
    { t: s, i18n: r } = Ct(),
    o = r.language === "ar",
    c = "font-theme",
    f = (h) =>
      h
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    m = jf.find((h) => f(h.title) === (n ? f(n) : ""));
  if (!m) return A.jsx("p", { children: s("common.notFound") });
  const p = m.orientation === "portrait";
  return A.jsxs("section", {
    className: `px-6 py-12 ${c}`,
    children: [
      A.jsx("h1", {
        className: "text-3xl font-bold mb-6 text-theme text-center",
        children: s(`home.showreel.items.${m.title}`),
      }),
      A.jsx("p", {
        className:
          "max-w-2xl mx-auto text-lg text-secondary-cream mb-8 text-center",
        children: s("reelDetail.intro", {
          brand: s(`home.showreel.items.${m.title}`),
        }),
      }),
      A.jsx("div", {
        className: `w-full mx-auto px-4 ${p ? "aspect-[9/16] max-w-sm md:max-w-md" : "aspect-video max-w-4xl"}`,
        children: A.jsx("iframe", {
          title: s(`home.showreel.items.${m.title}`),
          className: "w-full h-full rounded-md shadow-lg",
          frameBorder: "0",
          allow: "autoplay; fullscreen; picture-in-picture",
          allowFullScreen: !0,
        }),
      }),
      A.jsxs("button", {
        onClick: () => a(-1),
        className: "mb-6 flex items-center text-theme cursor-pointer",
        children: [
          A.jsx("span", { className: "text-xl", children: o ? "→" : "←" }),
          A.jsx("span", {
            className: "ml-2 hover:underline",
            children: s("common.back", "Back"),
          }),
        ],
      }),
    ],
  });
}
var Fx = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  xv = Le.createContext && Le.createContext(Fx),
  _R = ["attr", "size", "title"];
function zR(n, a) {
  if (n == null) return {};
  var s = UR(n, a),
    r,
    o;
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(n);
    for (o = 0; o < c.length; o++)
      ((r = c[o]),
        !(a.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(n, r) &&
          (s[r] = n[r]));
  }
  return s;
}
function UR(n, a) {
  if (n == null) return {};
  var s = {};
  for (var r in n)
    if (Object.prototype.hasOwnProperty.call(n, r)) {
      if (a.indexOf(r) >= 0) continue;
      s[r] = n[r];
    }
  return s;
}
function to() {
  return (
    (to = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var a = 1; a < arguments.length; a++) {
            var s = arguments[a];
            for (var r in s)
              Object.prototype.hasOwnProperty.call(s, r) && (n[r] = s[r]);
          }
          return n;
        }),
    to.apply(this, arguments)
  );
}
function bv(n, a) {
  var s = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    (a &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(n, o).enumerable;
      })),
      s.push.apply(s, r));
  }
  return s;
}
function no(n) {
  for (var a = 1; a < arguments.length; a++) {
    var s = arguments[a] != null ? arguments[a] : {};
    a % 2
      ? bv(Object(s), !0).forEach(function (r) {
          BR(n, r, s[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(s))
        : bv(Object(s)).forEach(function (r) {
            Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(s, r));
          });
  }
  return n;
}
function BR(n, a, s) {
  return (
    (a = kR(a)),
    a in n
      ? Object.defineProperty(n, a, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (n[a] = s),
    n
  );
}
function kR(n) {
  var a = PR(n, "string");
  return typeof a == "symbol" ? a : a + "";
}
function PR(n, a) {
  if (typeof n != "object" || !n) return n;
  var s = n[Symbol.toPrimitive];
  if (s !== void 0) {
    var r = s.call(n, a);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (a === "string" ? String : Number)(n);
}
function $x(n) {
  return (
    n &&
    n.map((a, s) =>
      Le.createElement(a.tag, no({ key: s }, a.attr), $x(a.child)),
    )
  );
}
function yr(n) {
  return (a) =>
    Le.createElement(HR, to({ attr: no({}, n.attr) }, a), $x(n.child));
}
function HR(n) {
  var a = (s) => {
    var { attr: r, size: o, title: c } = n,
      f = zR(n, _R),
      m = o || s.size || "1em",
      p;
    return (
      s.className && (p = s.className),
      n.className && (p = (p ? p + " " : "") + n.className),
      Le.createElement(
        "svg",
        to(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          s.attr,
          r,
          f,
          {
            className: p,
            style: no(no({ color: n.color || s.color }, s.style), n.style),
            height: m,
            width: m,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        c && Le.createElement("title", null, c),
        n.children,
      )
    );
  };
  return xv !== void 0
    ? Le.createElement(xv.Consumer, null, (s) => a(s))
    : a(Fx);
}
function GR(n) {
  return yr({
    attr: {
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      "aria-hidden": "true",
    },
    child: [
      {
        tag: "path",
        attr: {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M4 6h16M4 12h16m-7 6h7",
        },
        child: [],
      },
    ],
  })(n);
}
function YR(n) {
  return yr({
    attr: { viewBox: "0 0 15 15", fill: "none" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
          fill: "currentColor",
        },
        child: [],
      },
    ],
  })(n);
}
const qR = "/new_logo.png",
  KR = () => {
    const { t: n, i18n: a } = Ct(),
      [s, r] = C.useState(a.language || "en"),
      [o, c] = C.useState(!1),
      f = C.useRef(null),
      { pathname: m } = zn(),
      p = m === "/" || /^\/(en|ar)\/?$/.test(m),
      h = s === "ar",
      g = h ? "font-theme-ar" : "font-theme",
      v = (T) => {
        (a.changeLanguage(T),
          r(T),
          (document.dir = T === "ar" ? "rtl" : "ltr"));
      };
    (C.useEffect(() => {
      ((document.documentElement.lang = s),
        (document.dir = s === "ar" ? "rtl" : "ltr"));
    }, [s]),
      C.useEffect(() => {
        const T = (E) => {
          f.current && !f.current.contains(E.target) && c(!1);
        };
        return (
          document.addEventListener("mousedown", T),
          () => document.removeEventListener("mousedown", T)
        );
      }, []));
    const x = p ? "fixed top-0 left-0" : "absolute top-0 left-0";
    return A.jsxs("header", {
      className: `
        w-full z-50 bg-transparent text-secondary-orange
        ${x} ${g}
      `,
      children: [
        A.jsxs("div", {
          className:
            "flex items-center justify-between px-8 py-3 relative z-50 bg-transparent",
          children: [
            A.jsx(La, {
              to: "/",
              className: "w-30 h-auto block mt-2",
              children: A.jsx("img", {
                src: qR,
                alt: "Mashab Logo",
                className: "w-full object-contain",
              }),
            }),
            A.jsxs("div", {
              className: `flex items-center gap-6 text-base font-semibold text-white ${g}`,
              children: [
                A.jsxs("div", {
                  className: "space-x-2 rtl:space-x-reverse",
                  style: { display: "none" },
                  children: [
                    A.jsx("button", {
                      onClick: () => v("en"),
                      className: `transition hover:scale-110 cursor-pointer ${s === "en" ? "text-theme" : ""}`,
                      children: "ENG",
                    }),
                    A.jsx("span", { children: "|" }),
                    A.jsx("button", {
                      onClick: () => v("ar"),
                      className: `transition hover:scale-110 mr-1.5 cursor-pointer ${s === "ar" ? "text-theme" : ""}`,
                      children: "AR",
                    }),
                  ],
                }),
                A.jsx("button", {
                  onClick: () => c(!o),
                  className:
                    "text-4xl transition-transform duration-300 cursor-pointer",
                  "aria-label": "Menu",
                  children: o
                    ? A.jsx(YR, { className: "rotate-90" })
                    : A.jsx(GR, { className: `${h ? "scale-x-[-1]" : ""}` }),
                }),
              ],
            }),
          ],
        }),
        o &&
          A.jsx("div", {
            ref: f,
            className: `absolute left-0 top-0 w-full bg-[var(--primary-black)] text-theme px-8 pt-[110px] pb-8 shadow-lg animate-slide-down z-40 ${g}`,
            children: A.jsxs("div", {
              className: "bh-auth-menu",
              children: [
                A.jsx("ul", {
                  className: "flex flex-col gap-6 text-2xl font-medium",
                  children: [
                    { name: n("nav.home"), to: "/" },
                    { name: n("nav.about"), to: "/about" },
                    { name: n("nav.contact"), to: "/contact" },
                  ].map((T) =>
                    A.jsx(
                      "li",
                      {
                        children: A.jsx(La, {
                          to: T.to,
                          onClick: () => c(!1),
                          className: "hover:text-white transition",
                          children: T.name,
                        }),
                      },
                      T.to,
                    ),
                  ),
                }),
                A.jsxs("div", {
                  className: "bh-auth-menu-footer text-xs sm:text-sm font-semibold",
                  children: [
                    A.jsx("a", {
                      href: "https://bonehard.afaqalehtrafia.com/login",
                      className: "bh-auth-btn",
                      children: "Login",
                    }),
                    A.jsx("a", {
                      href: "https://bonehard.afaqalehtrafia.com/register",
                      className: "bh-auth-btn bh-auth-btn--primary",
                      children: "Sign up",
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    });
  };
function FR(n) {
  return yr({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
        },
        child: [],
      },
    ],
  })(n);
}
function $R(n) {
  return yr({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
        },
        child: [],
      },
    ],
  })(n);
}
function XR(n) {
  return yr({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z",
        },
        child: [],
      },
    ],
  })(n);
}
function ZR() {
  const { t: n, i18n: a } = Ct(),
    r = a.language === "ar" ? "font-theme-ar" : "font-theme";
  return A.jsxs("footer", {
    className: `bg-[var(--primary-black)] text-white ${r} px-4 md:px-12 pt-12 pb-6`,
    children: [
      A.jsxs("div", {
        className:
          "max-w-7xl mx-auto flex flex-col items-center gap-10 md:grid md:grid-cols-3 md:items-start md:text-left md:gap-8 md:justify-between",
        children: [
          A.jsxs("div", {
            className:
              "order-4 md:order-1 flex flex-col items-center md:items-start",
            children: [
              A.jsx("h4", {
                className: "text-xl font-semibold mb-2",
                children: n("footer.addressTitle"),
              }),
              A.jsx("p", {
                className: "text-theme font-semibold mb-2",
                children: n("footer.address"),
              }),
              A.jsx("iframe", {
                title: "location",
                src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115012.28230727344!2d55.13897410858364!3d25.075085336453295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4346e73ac68b%3A0x260caa1ff6d5645!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1723226541123!5m2!1sen!2sae",
                width: "240",
                height: "150",
                className: "rounded-md border-none",
                loading: "lazy",
              }),
            ],
          }),
          A.jsxs("div", {
            className: "order-1 md:order-2 flex flex-col items-center",
            children: [
              A.jsx("img", {
                src: "/new_logo.png",
                alt: "MASHAB Logo",
                className: "h-60 w-auto mb-10",
              }),
              A.jsx("h4", {
                className: "text-xl font-semibold mb-2",
                children: n("footer.socialTitle"),
              }),
              A.jsxs("div", {
                className: "flex gap-4 text-theme text-xl",
                children: [
                  A.jsx("a", {
                    href: "https://www.instagram.com/bonehard__/#",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Instagram",
                    className: "hover:text-white transition",
                    children: A.jsx(FR, {}),
                  }),
                  A.jsx("a", {
                    href: "https://www.linkedin.com/company/bonehard/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "LinkedIn",
                    className: "hover:text-white transition",
                    children: A.jsx($R, {}),
                  }),
                  A.jsx("a", {
                    href: "https://mail.google.com/mail/?view=cm&fs=1&to=Info@bone-hard.com&su=Hello%20BoneHard&body=I%20want%20to%20contact%20you",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Email",
                    className: "hover:text-white transition",
                    children: A.jsx(XR, {}),
                  }),
                ],
              }),
            ],
          }),
          A.jsxs("div", {
            className:
              "order-2 md:order-3 flex flex-col items-center md:items-end",
            children: [
              A.jsx("h4", {
                className: "text-xl font-semibold mb-2",
                children: n("footer.pagesTitle"),
              }),
              A.jsxs("ul", {
                className:
                  "space-y-1 text-theme text-lg font-medium text-center md:text-right",
                children: [
                  A.jsx("li", {
                    children: A.jsx(La, {
                      to: "/",
                      className: "hover:text-white transition",
                      children: n("footer.pages.home"),
                    }),
                  }),
                  A.jsx("li", {
                    children: A.jsx(La, {
                      to: "/about",
                      className: "hover:text-white transition",
                      children: n("footer.pages.about"),
                    }),
                  }),
                  A.jsx("li", {
                    children: A.jsx(La, {
                      to: "/contact",
                      className: "hover:text-white transition",
                      children: n("footer.pages.contact"),
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      A.jsxs("p", {
        className: "text-sm text-white mt-12 text-center",
        children: ["© BoneHard. ", n("footer.country")],
      }),
    ],
  });
}
const nf = ({ children: n }) =>
  A.jsxs("div", {
    className: "w-full h-[100vh]",
    children: [A.jsx(KR, {}), n, A.jsx(ZR, {})],
  });
function QR() {
  const { pathname: n } = zn();
  return (
    C.useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, [n]),
    null
  );
}
function IR() {
  return A.jsxs(KT, {
    children: [
      A.jsx(QR, {}),
      A.jsxs(ST, {
        children: [
          A.jsx(Ci, {
            path: "/",
            element: A.jsx(nf, { children: A.jsx(BO, {}) }),
          }),
          A.jsx(Ci, {
            path: "/about",
            element: A.jsx(nf, { children: A.jsx(IO, {}) }),
          }),
          A.jsx(Ci, {
            path: "/contact",
            element: A.jsx(nf, { children: A.jsx(jR, {}) }),
          }),
          A.jsx(Ci, { path: "/order", element: A.jsx(LR, {}) }),
          A.jsx(Ci, { path: "/reel/:slug", element: A.jsx(VR, {}) }),
        ],
      }),
    ],
  });
}
const pe = (n) => typeof n == "string",
  Ys = () => {
    let n, a;
    const s = new Promise((r, o) => {
      ((n = r), (a = o));
    });
    return ((s.resolve = n), (s.reject = a), s);
  },
  Sv = (n) => (n == null ? "" : "" + n),
  JR = (n, a, s) => {
    n.forEach((r) => {
      a[r] && (s[r] = a[r]);
    });
  },
  WR = /###/g,
  Tv = (n) => (n && n.indexOf("###") > -1 ? n.replace(WR, ".") : n),
  Ev = (n) => !n || pe(n),
  Ws = (n, a, s) => {
    const r = pe(a) ? a.split(".") : a;
    let o = 0;
    for (; o < r.length - 1; ) {
      if (Ev(n)) return {};
      const c = Tv(r[o]);
      (!n[c] && s && (n[c] = new s()),
        Object.prototype.hasOwnProperty.call(n, c) ? (n = n[c]) : (n = {}),
        ++o);
    }
    return Ev(n) ? {} : { obj: n, k: Tv(r[o]) };
  },
  wv = (n, a, s) => {
    const { obj: r, k: o } = Ws(n, a, Object);
    if (r !== void 0 || a.length === 1) {
      r[o] = s;
      return;
    }
    let c = a[a.length - 1],
      f = a.slice(0, a.length - 1),
      m = Ws(n, f, Object);
    for (; m.obj === void 0 && f.length; )
      ((c = `${f[f.length - 1]}.${c}`),
        (f = f.slice(0, f.length - 1)),
        (m = Ws(n, f, Object)),
        m != null &&
          m.obj &&
          typeof m.obj[`${m.k}.${c}`] < "u" &&
          (m.obj = void 0));
    m.obj[`${m.k}.${c}`] = s;
  },
  e3 = (n, a, s, r) => {
    const { obj: o, k: c } = Ws(n, a, Object);
    ((o[c] = o[c] || []), o[c].push(s));
  },
  ao = (n, a) => {
    const { obj: s, k: r } = Ws(n, a);
    if (s && Object.prototype.hasOwnProperty.call(s, r)) return s[r];
  },
  t3 = (n, a, s) => {
    const r = ao(n, s);
    return r !== void 0 ? r : ao(a, s);
  },
  Xx = (n, a, s) => {
    for (const r in a)
      r !== "__proto__" &&
        r !== "constructor" &&
        (r in n
          ? pe(n[r]) ||
            n[r] instanceof String ||
            pe(a[r]) ||
            a[r] instanceof String
            ? s && (n[r] = a[r])
            : Xx(n[r], a[r], s)
          : (n[r] = a[r]));
    return n;
  },
  Ei = (n) => n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var n3 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};
const a3 = (n) => (pe(n) ? n.replace(/[&<>"'\/]/g, (a) => n3[a]) : n);
class i3 {
  constructor(a) {
    ((this.capacity = a),
      (this.regExpMap = new Map()),
      (this.regExpQueue = []));
  }
  getRegExp(a) {
    const s = this.regExpMap.get(a);
    if (s !== void 0) return s;
    const r = new RegExp(a);
    return (
      this.regExpQueue.length === this.capacity &&
        this.regExpMap.delete(this.regExpQueue.shift()),
      this.regExpMap.set(a, r),
      this.regExpQueue.push(a),
      r
    );
  }
}
const s3 = [" ", ",", "?", "!", ";"],
  r3 = new i3(20),
  l3 = (n, a, s) => {
    ((a = a || ""), (s = s || ""));
    const r = s3.filter((f) => a.indexOf(f) < 0 && s.indexOf(f) < 0);
    if (r.length === 0) return !0;
    const o = r3.getRegExp(
      `(${r.map((f) => (f === "?" ? "\\?" : f)).join("|")})`,
    );
    let c = !o.test(n);
    if (!c) {
      const f = n.indexOf(s);
      f > 0 && !o.test(n.substring(0, f)) && (c = !0);
    }
    return c;
  },
  Vf = (n, a, s = ".") => {
    if (!n) return;
    if (n[a]) return Object.prototype.hasOwnProperty.call(n, a) ? n[a] : void 0;
    const r = a.split(s);
    let o = n;
    for (let c = 0; c < r.length; ) {
      if (!o || typeof o != "object") return;
      let f,
        m = "";
      for (let p = c; p < r.length; ++p)
        if ((p !== c && (m += s), (m += r[p]), (f = o[m]), f !== void 0)) {
          if (
            ["string", "number", "boolean"].indexOf(typeof f) > -1 &&
            p < r.length - 1
          )
            continue;
          c += p - c + 1;
          break;
        }
      o = f;
    }
    return o;
  },
  lr = (n) => (n == null ? void 0 : n.replace("_", "-")),
  o3 = {
    type: "logger",
    log(n) {
      this.output("log", n);
    },
    warn(n) {
      this.output("warn", n);
    },
    error(n) {
      this.output("error", n);
    },
    output(n, a) {
      var s, r;
      (r =
        (s = console == null ? void 0 : console[n]) == null
          ? void 0
          : s.apply) == null || r.call(s, console, a);
    },
  };
class io {
  constructor(a, s = {}) {
    this.init(a, s);
  }
  init(a, s = {}) {
    ((this.prefix = s.prefix || "i18next:"),
      (this.logger = a || o3),
      (this.options = s),
      (this.debug = s.debug));
  }
  log(...a) {
    return this.forward(a, "log", "", !0);
  }
  warn(...a) {
    return this.forward(a, "warn", "", !0);
  }
  error(...a) {
    return this.forward(a, "error", "");
  }
  deprecate(...a) {
    return this.forward(a, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(a, s, r, o) {
    return o && !this.debug
      ? null
      : (pe(a[0]) && (a[0] = `${r}${this.prefix} ${a[0]}`), this.logger[s](a));
  }
  create(a) {
    return new io(this.logger, {
      prefix: `${this.prefix}:${a}:`,
      ...this.options,
    });
  }
  clone(a) {
    return (
      (a = a || this.options),
      (a.prefix = a.prefix || this.prefix),
      new io(this.logger, a)
    );
  }
}
var un = new io();
class yo {
  constructor() {
    this.observers = {};
  }
  on(a, s) {
    return (
      a.split(" ").forEach((r) => {
        this.observers[r] || (this.observers[r] = new Map());
        const o = this.observers[r].get(s) || 0;
        this.observers[r].set(s, o + 1);
      }),
      this
    );
  }
  off(a, s) {
    if (this.observers[a]) {
      if (!s) {
        delete this.observers[a];
        return;
      }
      this.observers[a].delete(s);
    }
  }
  emit(a, ...s) {
    (this.observers[a] &&
      Array.from(this.observers[a].entries()).forEach(([o, c]) => {
        for (let f = 0; f < c; f++) o(...s);
      }),
      this.observers["*"] &&
        Array.from(this.observers["*"].entries()).forEach(([o, c]) => {
          for (let f = 0; f < c; f++) o.apply(o, [a, ...s]);
        }));
  }
}
class Av extends yo {
  constructor(a, s = { ns: ["translation"], defaultNS: "translation" }) {
    (super(),
      (this.data = a || {}),
      (this.options = s),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      this.options.ignoreJSONStructure === void 0 &&
        (this.options.ignoreJSONStructure = !0));
  }
  addNamespaces(a) {
    this.options.ns.indexOf(a) < 0 && this.options.ns.push(a);
  }
  removeNamespaces(a) {
    const s = this.options.ns.indexOf(a);
    s > -1 && this.options.ns.splice(s, 1);
  }
  getResource(a, s, r, o = {}) {
    var h, g;
    const c =
        o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator,
      f =
        o.ignoreJSONStructure !== void 0
          ? o.ignoreJSONStructure
          : this.options.ignoreJSONStructure;
    let m;
    a.indexOf(".") > -1
      ? (m = a.split("."))
      : ((m = [a, s]),
        r &&
          (Array.isArray(r)
            ? m.push(...r)
            : pe(r) && c
              ? m.push(...r.split(c))
              : m.push(r)));
    const p = ao(this.data, m);
    return (
      !p &&
        !s &&
        !r &&
        a.indexOf(".") > -1 &&
        ((a = m[0]), (s = m[1]), (r = m.slice(2).join("."))),
      p || !f || !pe(r)
        ? p
        : Vf(
            (g = (h = this.data) == null ? void 0 : h[a]) == null
              ? void 0
              : g[s],
            r,
            c,
          )
    );
  }
  addResource(a, s, r, o, c = { silent: !1 }) {
    const f =
      c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator;
    let m = [a, s];
    (r && (m = m.concat(f ? r.split(f) : r)),
      a.indexOf(".") > -1 && ((m = a.split(".")), (o = s), (s = m[1])),
      this.addNamespaces(s),
      wv(this.data, m, o),
      c.silent || this.emit("added", a, s, r, o));
  }
  addResources(a, s, r, o = { silent: !1 }) {
    for (const c in r)
      (pe(r[c]) || Array.isArray(r[c])) &&
        this.addResource(a, s, c, r[c], { silent: !0 });
    o.silent || this.emit("added", a, s, r);
  }
  addResourceBundle(a, s, r, o, c, f = { silent: !1, skipCopy: !1 }) {
    let m = [a, s];
    (a.indexOf(".") > -1 && ((m = a.split(".")), (o = r), (r = s), (s = m[1])),
      this.addNamespaces(s));
    let p = ao(this.data, m) || {};
    (f.skipCopy || (r = JSON.parse(JSON.stringify(r))),
      o ? Xx(p, r, c) : (p = { ...p, ...r }),
      wv(this.data, m, p),
      f.silent || this.emit("added", a, s, r));
  }
  removeResourceBundle(a, s) {
    (this.hasResourceBundle(a, s) && delete this.data[a][s],
      this.removeNamespaces(s),
      this.emit("removed", a, s));
  }
  hasResourceBundle(a, s) {
    return this.getResource(a, s) !== void 0;
  }
  getResourceBundle(a, s) {
    return (s || (s = this.options.defaultNS), this.getResource(a, s));
  }
  getDataByLanguage(a) {
    return this.data[a];
  }
  hasLanguageSomeTranslations(a) {
    const s = this.getDataByLanguage(a);
    return !!((s && Object.keys(s)) || []).find(
      (o) => s[o] && Object.keys(s[o]).length > 0,
    );
  }
  toJSON() {
    return this.data;
  }
}
var Zx = {
  processors: {},
  addPostProcessor(n) {
    this.processors[n.name] = n;
  },
  handle(n, a, s, r, o) {
    return (
      n.forEach((c) => {
        var f;
        a =
          ((f = this.processors[c]) == null ? void 0 : f.process(a, s, r, o)) ??
          a;
      }),
      a
    );
  },
};
const Cv = {},
  Ov = (n) => !pe(n) && typeof n != "boolean" && typeof n != "number";
class so extends yo {
  constructor(a, s = {}) {
    (super(),
      JR(
        [
          "resourceStore",
          "languageUtils",
          "pluralResolver",
          "interpolator",
          "backendConnector",
          "i18nFormat",
          "utils",
        ],
        a,
        this,
      ),
      (this.options = s),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      (this.logger = un.create("translator")));
  }
  changeLanguage(a) {
    a && (this.language = a);
  }
  exists(a, s = { interpolation: {} }) {
    const r = { ...s };
    if (a == null) return !1;
    const o = this.resolve(a, r);
    return (o == null ? void 0 : o.res) !== void 0;
  }
  extractFromKey(a, s) {
    let r = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const o =
      s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator;
    let c = s.ns || this.options.defaultNS || [];
    const f = r && a.indexOf(r) > -1,
      m =
        !this.options.userDefinedKeySeparator &&
        !s.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !s.nsSeparator &&
        !l3(a, r, o);
    if (f && !m) {
      const p = a.match(this.interpolator.nestingRegexp);
      if (p && p.length > 0) return { key: a, namespaces: pe(c) ? [c] : c };
      const h = a.split(r);
      ((r !== o || (r === o && this.options.ns.indexOf(h[0]) > -1)) &&
        (c = h.shift()),
        (a = h.join(o)));
    }
    return { key: a, namespaces: pe(c) ? [c] : c };
  }
  translate(a, s, r) {
    let o = typeof s == "object" ? { ...s } : s;
    if (
      (typeof o != "object" &&
        this.options.overloadTranslationOptionHandler &&
        (o = this.options.overloadTranslationOptionHandler(arguments)),
      typeof options == "object" && (o = { ...o }),
      o || (o = {}),
      a == null)
    )
      return "";
    Array.isArray(a) || (a = [String(a)]);
    const c =
        o.returnDetails !== void 0
          ? o.returnDetails
          : this.options.returnDetails,
      f =
        o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator,
      { key: m, namespaces: p } = this.extractFromKey(a[a.length - 1], o),
      h = p[p.length - 1];
    let g = o.nsSeparator !== void 0 ? o.nsSeparator : this.options.nsSeparator;
    g === void 0 && (g = ":");
    const v = o.lng || this.language,
      x = o.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((v == null ? void 0 : v.toLowerCase()) === "cimode")
      return x
        ? c
          ? {
              res: `${h}${g}${m}`,
              usedKey: m,
              exactUsedKey: m,
              usedLng: v,
              usedNS: h,
              usedParams: this.getUsedParamsDetails(o),
            }
          : `${h}${g}${m}`
        : c
          ? {
              res: m,
              usedKey: m,
              exactUsedKey: m,
              usedLng: v,
              usedNS: h,
              usedParams: this.getUsedParamsDetails(o),
            }
          : m;
    const T = this.resolve(a, o);
    let E = T == null ? void 0 : T.res;
    const M = (T == null ? void 0 : T.usedKey) || m,
      N = (T == null ? void 0 : T.exactUsedKey) || m,
      R = ["[object Number]", "[object Function]", "[object RegExp]"],
      G = o.joinArrays !== void 0 ? o.joinArrays : this.options.joinArrays,
      V = !this.i18nFormat || this.i18nFormat.handleAsObject,
      Q = o.count !== void 0 && !pe(o.count),
      q = so.hasDefaultValue(o),
      ae = Q ? this.pluralResolver.getSuffix(v, o.count, o) : "",
      te =
        o.ordinal && Q
          ? this.pluralResolver.getSuffix(v, o.count, { ordinal: !1 })
          : "",
      k = Q && !o.ordinal && o.count === 0,
      j =
        (k && o[`defaultValue${this.options.pluralSeparator}zero`]) ||
        o[`defaultValue${ae}`] ||
        o[`defaultValue${te}`] ||
        o.defaultValue;
    let H = E;
    V && !E && q && (H = j);
    const I = Ov(H),
      ee = Object.prototype.toString.apply(H);
    if (V && H && I && R.indexOf(ee) < 0 && !(pe(G) && Array.isArray(H))) {
      if (!o.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn(
            "accessing an object - but returnObjects options is not enabled!",
          );
        const oe = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(M, H, { ...o, ns: p })
          : `key '${m} (${this.language})' returned an object instead of string.`;
        return c
          ? ((T.res = oe), (T.usedParams = this.getUsedParamsDetails(o)), T)
          : oe;
      }
      if (f) {
        const oe = Array.isArray(H),
          ve = oe ? [] : {},
          ce = oe ? N : M;
        for (const U in H)
          if (Object.prototype.hasOwnProperty.call(H, U)) {
            const Y = `${ce}${f}${U}`;
            (q && !E
              ? (ve[U] = this.translate(Y, {
                  ...o,
                  defaultValue: Ov(j) ? j[U] : void 0,
                  joinArrays: !1,
                  ns: p,
                }))
              : (ve[U] = this.translate(Y, { ...o, joinArrays: !1, ns: p })),
              ve[U] === Y && (ve[U] = H[U]));
          }
        E = ve;
      }
    } else if (V && pe(G) && Array.isArray(E))
      ((E = E.join(G)), E && (E = this.extendTranslation(E, a, o, r)));
    else {
      let oe = !1,
        ve = !1;
      (!this.isValidLookup(E) && q && ((oe = !0), (E = j)),
        this.isValidLookup(E) || ((ve = !0), (E = m)));
      const U =
          (o.missingKeyNoValueFallbackToKey ||
            this.options.missingKeyNoValueFallbackToKey) &&
          ve
            ? void 0
            : E,
        Y = q && j !== E && this.options.updateMissing;
      if (ve || oe || Y) {
        if (
          (this.logger.log(Y ? "updateKey" : "missingKey", v, h, m, Y ? j : E),
          f)
        ) {
          const D = this.resolve(m, { ...o, keySeparator: !1 });
          D &&
            D.res &&
            this.logger.warn(
              "Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.",
            );
        }
        let J = [];
        const le = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          o.lng || this.language,
        );
        if (this.options.saveMissingTo === "fallback" && le && le[0])
          for (let D = 0; D < le.length; D++) J.push(le[D]);
        else
          this.options.saveMissingTo === "all"
            ? (J = this.languageUtils.toResolveHierarchy(
                o.lng || this.language,
              ))
            : J.push(o.lng || this.language);
        const S = (D, F, X) => {
          var se;
          const W = q && X !== E ? X : U;
          (this.options.missingKeyHandler
            ? this.options.missingKeyHandler(D, h, F, W, Y, o)
            : (se = this.backendConnector) != null &&
              se.saveMissing &&
              this.backendConnector.saveMissing(D, h, F, W, Y, o),
            this.emit("missingKey", D, h, F, E));
        };
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && Q
            ? J.forEach((D) => {
                const F = this.pluralResolver.getSuffixes(D, o);
                (k &&
                  o[`defaultValue${this.options.pluralSeparator}zero`] &&
                  F.indexOf(`${this.options.pluralSeparator}zero`) < 0 &&
                  F.push(`${this.options.pluralSeparator}zero`),
                  F.forEach((X) => {
                    S([D], m + X, o[`defaultValue${X}`] || j);
                  }));
              })
            : S(J, m, j));
      }
      ((E = this.extendTranslation(E, a, o, T, r)),
        ve &&
          E === m &&
          this.options.appendNamespaceToMissingKey &&
          (E = `${h}${g}${m}`),
        (ve || oe) &&
          this.options.parseMissingKeyHandler &&
          (E = this.options.parseMissingKeyHandler(
            this.options.appendNamespaceToMissingKey ? `${h}${g}${m}` : m,
            oe ? E : void 0,
            o,
          )));
    }
    return c
      ? ((T.res = E), (T.usedParams = this.getUsedParamsDetails(o)), T)
      : E;
  }
  extendTranslation(a, s, r, o, c) {
    var p, h;
    if ((p = this.i18nFormat) != null && p.parse)
      a = this.i18nFormat.parse(
        a,
        { ...this.options.interpolation.defaultVariables, ...r },
        r.lng || this.language || o.usedLng,
        o.usedNS,
        o.usedKey,
        { resolved: o },
      );
    else if (!r.skipInterpolation) {
      r.interpolation &&
        this.interpolator.init({
          ...r,
          interpolation: { ...this.options.interpolation, ...r.interpolation },
        });
      const g =
        pe(a) &&
        (((h = r == null ? void 0 : r.interpolation) == null
          ? void 0
          : h.skipOnVariables) !== void 0
          ? r.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables);
      let v;
      if (g) {
        const T = a.match(this.interpolator.nestingRegexp);
        v = T && T.length;
      }
      let x = r.replace && !pe(r.replace) ? r.replace : r;
      if (
        (this.options.interpolation.defaultVariables &&
          (x = { ...this.options.interpolation.defaultVariables, ...x }),
        (a = this.interpolator.interpolate(
          a,
          x,
          r.lng || this.language || o.usedLng,
          r,
        )),
        g)
      ) {
        const T = a.match(this.interpolator.nestingRegexp),
          E = T && T.length;
        v < E && (r.nest = !1);
      }
      (!r.lng && o && o.res && (r.lng = this.language || o.usedLng),
        r.nest !== !1 &&
          (a = this.interpolator.nest(
            a,
            (...T) =>
              (c == null ? void 0 : c[0]) === T[0] && !r.context
                ? (this.logger.warn(
                    `It seems you are nesting recursively key: ${T[0]} in key: ${s[0]}`,
                  ),
                  null)
                : this.translate(...T, s),
            r,
          )),
        r.interpolation && this.interpolator.reset());
    }
    const f = r.postProcess || this.options.postProcess,
      m = pe(f) ? [f] : f;
    return (
      a != null &&
        m != null &&
        m.length &&
        r.applyPostProcessor !== !1 &&
        (a = Zx.handle(
          m,
          a,
          s,
          this.options && this.options.postProcessPassResolved
            ? {
                i18nResolved: {
                  ...o,
                  usedParams: this.getUsedParamsDetails(r),
                },
                ...r,
              }
            : r,
          this,
        )),
      a
    );
  }
  resolve(a, s = {}) {
    let r, o, c, f, m;
    return (
      pe(a) && (a = [a]),
      a.forEach((p) => {
        if (this.isValidLookup(r)) return;
        const h = this.extractFromKey(p, s),
          g = h.key;
        o = g;
        let v = h.namespaces;
        this.options.fallbackNS && (v = v.concat(this.options.fallbackNS));
        const x = s.count !== void 0 && !pe(s.count),
          T = x && !s.ordinal && s.count === 0,
          E =
            s.context !== void 0 &&
            (pe(s.context) || typeof s.context == "number") &&
            s.context !== "",
          M = s.lngs
            ? s.lngs
            : this.languageUtils.toResolveHierarchy(
                s.lng || this.language,
                s.fallbackLng,
              );
        v.forEach((N) => {
          var R, G;
          this.isValidLookup(r) ||
            ((m = N),
            !Cv[`${M[0]}-${N}`] &&
              (R = this.utils) != null &&
              R.hasLoadedNamespace &&
              !((G = this.utils) != null && G.hasLoadedNamespace(m)) &&
              ((Cv[`${M[0]}-${N}`] = !0),
              this.logger.warn(
                `key "${o}" for languages "${M.join(", ")}" won't get resolved as namespace "${m}" was not yet loaded`,
                "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!",
              )),
            M.forEach((V) => {
              var ae;
              if (this.isValidLookup(r)) return;
              f = V;
              const Q = [g];
              if ((ae = this.i18nFormat) != null && ae.addLookupKeys)
                this.i18nFormat.addLookupKeys(Q, g, V, N, s);
              else {
                let te;
                x && (te = this.pluralResolver.getSuffix(V, s.count, s));
                const k = `${this.options.pluralSeparator}zero`,
                  j = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                if (
                  (x &&
                    (Q.push(g + te),
                    s.ordinal &&
                      te.indexOf(j) === 0 &&
                      Q.push(g + te.replace(j, this.options.pluralSeparator)),
                    T && Q.push(g + k)),
                  E)
                ) {
                  const H = `${g}${this.options.contextSeparator}${s.context}`;
                  (Q.push(H),
                    x &&
                      (Q.push(H + te),
                      s.ordinal &&
                        te.indexOf(j) === 0 &&
                        Q.push(H + te.replace(j, this.options.pluralSeparator)),
                      T && Q.push(H + k)));
                }
              }
              let q;
              for (; (q = Q.pop()); )
                this.isValidLookup(r) ||
                  ((c = q), (r = this.getResource(V, N, q, s)));
            }));
        });
      }),
      { res: r, usedKey: o, exactUsedKey: c, usedLng: f, usedNS: m }
    );
  }
  isValidLookup(a) {
    return (
      a !== void 0 &&
      !(!this.options.returnNull && a === null) &&
      !(!this.options.returnEmptyString && a === "")
    );
  }
  getResource(a, s, r, o = {}) {
    var c;
    return (c = this.i18nFormat) != null && c.getResource
      ? this.i18nFormat.getResource(a, s, r, o)
      : this.resourceStore.getResource(a, s, r, o);
  }
  getUsedParamsDetails(a = {}) {
    const s = [
        "defaultValue",
        "ordinal",
        "context",
        "replace",
        "lng",
        "lngs",
        "fallbackLng",
        "ns",
        "keySeparator",
        "nsSeparator",
        "returnObjects",
        "returnDetails",
        "joinArrays",
        "postProcess",
        "interpolation",
      ],
      r = a.replace && !pe(a.replace);
    let o = r ? a.replace : a;
    if (
      (r && typeof a.count < "u" && (o.count = a.count),
      this.options.interpolation.defaultVariables &&
        (o = { ...this.options.interpolation.defaultVariables, ...o }),
      !r)
    ) {
      o = { ...o };
      for (const c of s) delete o[c];
    }
    return o;
  }
  static hasDefaultValue(a) {
    const s = "defaultValue";
    for (const r in a)
      if (
        Object.prototype.hasOwnProperty.call(a, r) &&
        s === r.substring(0, s.length) &&
        a[r] !== void 0
      )
        return !0;
    return !1;
  }
}
class Rv {
  constructor(a) {
    ((this.options = a),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = un.create("languageUtils")));
  }
  getScriptPartFromCode(a) {
    if (((a = lr(a)), !a || a.indexOf("-") < 0)) return null;
    const s = a.split("-");
    return s.length === 2 || (s.pop(), s[s.length - 1].toLowerCase() === "x")
      ? null
      : this.formatLanguageCode(s.join("-"));
  }
  getLanguagePartFromCode(a) {
    if (((a = lr(a)), !a || a.indexOf("-") < 0)) return a;
    const s = a.split("-");
    return this.formatLanguageCode(s[0]);
  }
  formatLanguageCode(a) {
    if (pe(a) && a.indexOf("-") > -1) {
      let s;
      try {
        s = Intl.getCanonicalLocales(a)[0];
      } catch {}
      return (
        s && this.options.lowerCaseLng && (s = s.toLowerCase()),
        s || (this.options.lowerCaseLng ? a.toLowerCase() : a)
      );
    }
    return this.options.cleanCode || this.options.lowerCaseLng
      ? a.toLowerCase()
      : a;
  }
  isSupportedCode(a) {
    return (
      (this.options.load === "languageOnly" ||
        this.options.nonExplicitSupportedLngs) &&
        (a = this.getLanguagePartFromCode(a)),
      !this.supportedLngs ||
        !this.supportedLngs.length ||
        this.supportedLngs.indexOf(a) > -1
    );
  }
  getBestMatchFromCodes(a) {
    if (!a) return null;
    let s;
    return (
      a.forEach((r) => {
        if (s) return;
        const o = this.formatLanguageCode(r);
        (!this.options.supportedLngs || this.isSupportedCode(o)) && (s = o);
      }),
      !s &&
        this.options.supportedLngs &&
        a.forEach((r) => {
          if (s) return;
          const o = this.getScriptPartFromCode(r);
          if (this.isSupportedCode(o)) return (s = o);
          const c = this.getLanguagePartFromCode(r);
          if (this.isSupportedCode(c)) return (s = c);
          s = this.options.supportedLngs.find((f) => {
            if (f === c) return f;
            if (
              !(f.indexOf("-") < 0 && c.indexOf("-") < 0) &&
              ((f.indexOf("-") > 0 &&
                c.indexOf("-") < 0 &&
                f.substring(0, f.indexOf("-")) === c) ||
                (f.indexOf(c) === 0 && c.length > 1))
            )
              return f;
          });
        }),
      s || (s = this.getFallbackCodes(this.options.fallbackLng)[0]),
      s
    );
  }
  getFallbackCodes(a, s) {
    if (!a) return [];
    if (
      (typeof a == "function" && (a = a(s)),
      pe(a) && (a = [a]),
      Array.isArray(a))
    )
      return a;
    if (!s) return a.default || [];
    let r = a[s];
    return (
      r || (r = a[this.getScriptPartFromCode(s)]),
      r || (r = a[this.formatLanguageCode(s)]),
      r || (r = a[this.getLanguagePartFromCode(s)]),
      r || (r = a.default),
      r || []
    );
  }
  toResolveHierarchy(a, s) {
    const r = this.getFallbackCodes(s || this.options.fallbackLng || [], a),
      o = [],
      c = (f) => {
        f &&
          (this.isSupportedCode(f)
            ? o.push(f)
            : this.logger.warn(
                `rejecting language code not found in supportedLngs: ${f}`,
              ));
      };
    return (
      pe(a) && (a.indexOf("-") > -1 || a.indexOf("_") > -1)
        ? (this.options.load !== "languageOnly" &&
            c(this.formatLanguageCode(a)),
          this.options.load !== "languageOnly" &&
            this.options.load !== "currentOnly" &&
            c(this.getScriptPartFromCode(a)),
          this.options.load !== "currentOnly" &&
            c(this.getLanguagePartFromCode(a)))
        : pe(a) && c(this.formatLanguageCode(a)),
      r.forEach((f) => {
        o.indexOf(f) < 0 && c(this.formatLanguageCode(f));
      }),
      o
    );
  }
}
const Dv = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
  Mv = {
    select: (n) => (n === 1 ? "one" : "other"),
    resolvedOptions: () => ({ pluralCategories: ["one", "other"] }),
  };
class u3 {
  constructor(a, s = {}) {
    ((this.languageUtils = a),
      (this.options = s),
      (this.logger = un.create("pluralResolver")),
      (this.pluralRulesCache = {}));
  }
  addRule(a, s) {
    this.rules[a] = s;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(a, s = {}) {
    const r = lr(a === "dev" ? "en" : a),
      o = s.ordinal ? "ordinal" : "cardinal",
      c = JSON.stringify({ cleanedCode: r, type: o });
    if (c in this.pluralRulesCache) return this.pluralRulesCache[c];
    let f;
    try {
      f = new Intl.PluralRules(r, { type: o });
    } catch {
      if (!Intl)
        return (
          this.logger.error("No Intl support, please use an Intl polyfill!"),
          Mv
        );
      if (!a.match(/-|_/)) return Mv;
      const p = this.languageUtils.getLanguagePartFromCode(a);
      f = this.getRule(p, s);
    }
    return ((this.pluralRulesCache[c] = f), f);
  }
  needsPlural(a, s = {}) {
    let r = this.getRule(a, s);
    return (
      r || (r = this.getRule("dev", s)),
      (r == null ? void 0 : r.resolvedOptions().pluralCategories.length) > 1
    );
  }
  getPluralFormsOfKey(a, s, r = {}) {
    return this.getSuffixes(a, r).map((o) => `${s}${o}`);
  }
  getSuffixes(a, s = {}) {
    let r = this.getRule(a, s);
    return (
      r || (r = this.getRule("dev", s)),
      r
        ? r
            .resolvedOptions()
            .pluralCategories.sort((o, c) => Dv[o] - Dv[c])
            .map(
              (o) =>
                `${this.options.prepend}${s.ordinal ? `ordinal${this.options.prepend}` : ""}${o}`,
            )
        : []
    );
  }
  getSuffix(a, s, r = {}) {
    const o = this.getRule(a, r);
    return o
      ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${o.select(s)}`
      : (this.logger.warn(`no plural rule found for: ${a}`),
        this.getSuffix("dev", s, r));
  }
}
const Nv = (n, a, s, r = ".", o = !0) => {
    let c = t3(n, a, s);
    return (
      !c &&
        o &&
        pe(s) &&
        ((c = Vf(n, s, r)), c === void 0 && (c = Vf(a, s, r))),
      c
    );
  },
  af = (n) => n.replace(/\$/g, "$$$$");
class c3 {
  constructor(a = {}) {
    var s;
    ((this.logger = un.create("interpolator")),
      (this.options = a),
      (this.format =
        ((s = a == null ? void 0 : a.interpolation) == null
          ? void 0
          : s.format) || ((r) => r)),
      this.init(a));
  }
  init(a = {}) {
    a.interpolation || (a.interpolation = { escapeValue: !0 });
    const {
      escape: s,
      escapeValue: r,
      useRawValueToEscape: o,
      prefix: c,
      prefixEscaped: f,
      suffix: m,
      suffixEscaped: p,
      formatSeparator: h,
      unescapeSuffix: g,
      unescapePrefix: v,
      nestingPrefix: x,
      nestingPrefixEscaped: T,
      nestingSuffix: E,
      nestingSuffixEscaped: M,
      nestingOptionsSeparator: N,
      maxReplaces: R,
      alwaysFormat: G,
    } = a.interpolation;
    ((this.escape = s !== void 0 ? s : a3),
      (this.escapeValue = r !== void 0 ? r : !0),
      (this.useRawValueToEscape = o !== void 0 ? o : !1),
      (this.prefix = c ? Ei(c) : f || "{{"),
      (this.suffix = m ? Ei(m) : p || "}}"),
      (this.formatSeparator = h || ","),
      (this.unescapePrefix = g ? "" : v || "-"),
      (this.unescapeSuffix = this.unescapePrefix ? "" : g || ""),
      (this.nestingPrefix = x ? Ei(x) : T || Ei("$t(")),
      (this.nestingSuffix = E ? Ei(E) : M || Ei(")")),
      (this.nestingOptionsSeparator = N || ","),
      (this.maxReplaces = R || 1e3),
      (this.alwaysFormat = G !== void 0 ? G : !1),
      this.resetRegExp());
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const a = (s, r) =>
      (s == null ? void 0 : s.source) === r
        ? ((s.lastIndex = 0), s)
        : new RegExp(r, "g");
    ((this.regexp = a(this.regexp, `${this.prefix}(.+?)${this.suffix}`)),
      (this.regexpUnescape = a(
        this.regexpUnescape,
        `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`,
      )),
      (this.nestingRegexp = a(
        this.nestingRegexp,
        `${this.nestingPrefix}(.+?)${this.nestingSuffix}`,
      )));
  }
  interpolate(a, s, r, o) {
    var T;
    let c, f, m;
    const p =
        (this.options &&
          this.options.interpolation &&
          this.options.interpolation.defaultVariables) ||
        {},
      h = (E) => {
        if (E.indexOf(this.formatSeparator) < 0) {
          const G = Nv(
            s,
            p,
            E,
            this.options.keySeparator,
            this.options.ignoreJSONStructure,
          );
          return this.alwaysFormat
            ? this.format(G, void 0, r, { ...o, ...s, interpolationkey: E })
            : G;
        }
        const M = E.split(this.formatSeparator),
          N = M.shift().trim(),
          R = M.join(this.formatSeparator).trim();
        return this.format(
          Nv(
            s,
            p,
            N,
            this.options.keySeparator,
            this.options.ignoreJSONStructure,
          ),
          R,
          r,
          { ...o, ...s, interpolationkey: N },
        );
      };
    this.resetRegExp();
    const g =
        (o == null ? void 0 : o.missingInterpolationHandler) ||
        this.options.missingInterpolationHandler,
      v =
        ((T = o == null ? void 0 : o.interpolation) == null
          ? void 0
          : T.skipOnVariables) !== void 0
          ? o.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables;
    return (
      [
        { regex: this.regexpUnescape, safeValue: (E) => af(E) },
        {
          regex: this.regexp,
          safeValue: (E) => (this.escapeValue ? af(this.escape(E)) : af(E)),
        },
      ].forEach((E) => {
        for (m = 0; (c = E.regex.exec(a)); ) {
          const M = c[1].trim();
          if (((f = h(M)), f === void 0))
            if (typeof g == "function") {
              const R = g(a, c, o);
              f = pe(R) ? R : "";
            } else if (o && Object.prototype.hasOwnProperty.call(o, M)) f = "";
            else if (v) {
              f = c[0];
              continue;
            } else
              (this.logger.warn(
                `missed to pass in variable ${M} for interpolating ${a}`,
              ),
                (f = ""));
          else !pe(f) && !this.useRawValueToEscape && (f = Sv(f));
          const N = E.safeValue(f);
          if (
            ((a = a.replace(c[0], N)),
            v
              ? ((E.regex.lastIndex += f.length),
                (E.regex.lastIndex -= c[0].length))
              : (E.regex.lastIndex = 0),
            m++,
            m >= this.maxReplaces)
          )
            break;
        }
      }),
      a
    );
  }
  nest(a, s, r = {}) {
    let o, c, f;
    const m = (p, h) => {
      const g = this.nestingOptionsSeparator;
      if (p.indexOf(g) < 0) return p;
      const v = p.split(new RegExp(`${g}[ ]*{`));
      let x = `{${v[1]}`;
      ((p = v[0]), (x = this.interpolate(x, f)));
      const T = x.match(/'/g),
        E = x.match(/"/g);
      ((((T == null ? void 0 : T.length) ?? 0) % 2 === 0 && !E) ||
        E.length % 2 !== 0) &&
        (x = x.replace(/'/g, '"'));
      try {
        ((f = JSON.parse(x)), h && (f = { ...h, ...f }));
      } catch (M) {
        return (
          this.logger.warn(
            `failed parsing options string in nesting for key ${p}`,
            M,
          ),
          `${p}${g}${x}`
        );
      }
      return (
        f.defaultValue &&
          f.defaultValue.indexOf(this.prefix) > -1 &&
          delete f.defaultValue,
        p
      );
    };
    for (; (o = this.nestingRegexp.exec(a)); ) {
      let p = [];
      ((f = { ...r }),
        (f = f.replace && !pe(f.replace) ? f.replace : f),
        (f.applyPostProcessor = !1),
        delete f.defaultValue);
      let h = !1;
      if (o[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(o[1])) {
        const g = o[1].split(this.formatSeparator).map((v) => v.trim());
        ((o[1] = g.shift()), (p = g), (h = !0));
      }
      if (((c = s(m.call(this, o[1].trim(), f), f)), c && o[0] === a && !pe(c)))
        return c;
      (pe(c) || (c = Sv(c)),
        c ||
          (this.logger.warn(`missed to resolve ${o[1]} for nesting ${a}`),
          (c = "")),
        h &&
          (c = p.reduce(
            (g, v) =>
              this.format(g, v, r.lng, { ...r, interpolationkey: o[1].trim() }),
            c.trim(),
          )),
        (a = a.replace(o[0], c)),
        (this.regexp.lastIndex = 0));
    }
    return a;
  }
}
const f3 = (n) => {
    let a = n.toLowerCase().trim();
    const s = {};
    if (n.indexOf("(") > -1) {
      const r = n.split("(");
      a = r[0].toLowerCase().trim();
      const o = r[1].substring(0, r[1].length - 1);
      a === "currency" && o.indexOf(":") < 0
        ? s.currency || (s.currency = o.trim())
        : a === "relativetime" && o.indexOf(":") < 0
          ? s.range || (s.range = o.trim())
          : o.split(";").forEach((f) => {
              if (f) {
                const [m, ...p] = f.split(":"),
                  h = p
                    .join(":")
                    .trim()
                    .replace(/^'+|'+$/g, ""),
                  g = m.trim();
                (s[g] || (s[g] = h),
                  h === "false" && (s[g] = !1),
                  h === "true" && (s[g] = !0),
                  isNaN(h) || (s[g] = parseInt(h, 10)));
              }
            });
    }
    return { formatName: a, formatOptions: s };
  },
  jv = (n) => {
    const a = {};
    return (s, r, o) => {
      let c = o;
      o &&
        o.interpolationkey &&
        o.formatParams &&
        o.formatParams[o.interpolationkey] &&
        o[o.interpolationkey] &&
        (c = { ...c, [o.interpolationkey]: void 0 });
      const f = r + JSON.stringify(c);
      let m = a[f];
      return (m || ((m = n(lr(r), o)), (a[f] = m)), m(s));
    };
  },
  d3 = (n) => (a, s, r) => n(lr(s), r)(a);
class h3 {
  constructor(a = {}) {
    ((this.logger = un.create("formatter")), (this.options = a), this.init(a));
  }
  init(a, s = { interpolation: {} }) {
    this.formatSeparator = s.interpolation.formatSeparator || ",";
    const r = s.cacheInBuiltFormats ? jv : d3;
    this.formats = {
      number: r((o, c) => {
        const f = new Intl.NumberFormat(o, { ...c });
        return (m) => f.format(m);
      }),
      currency: r((o, c) => {
        const f = new Intl.NumberFormat(o, { ...c, style: "currency" });
        return (m) => f.format(m);
      }),
      datetime: r((o, c) => {
        const f = new Intl.DateTimeFormat(o, { ...c });
        return (m) => f.format(m);
      }),
      relativetime: r((o, c) => {
        const f = new Intl.RelativeTimeFormat(o, { ...c });
        return (m) => f.format(m, c.range || "day");
      }),
      list: r((o, c) => {
        const f = new Intl.ListFormat(o, { ...c });
        return (m) => f.format(m);
      }),
    };
  }
  add(a, s) {
    this.formats[a.toLowerCase().trim()] = s;
  }
  addCached(a, s) {
    this.formats[a.toLowerCase().trim()] = jv(s);
  }
  format(a, s, r, o = {}) {
    const c = s.split(this.formatSeparator);
    if (
      c.length > 1 &&
      c[0].indexOf("(") > 1 &&
      c[0].indexOf(")") < 0 &&
      c.find((m) => m.indexOf(")") > -1)
    ) {
      const m = c.findIndex((p) => p.indexOf(")") > -1);
      c[0] = [c[0], ...c.splice(1, m)].join(this.formatSeparator);
    }
    return c.reduce((m, p) => {
      var v;
      const { formatName: h, formatOptions: g } = f3(p);
      if (this.formats[h]) {
        let x = m;
        try {
          const T =
              ((v = o == null ? void 0 : o.formatParams) == null
                ? void 0
                : v[o.interpolationkey]) || {},
            E = T.locale || T.lng || o.locale || o.lng || r;
          x = this.formats[h](m, E, { ...g, ...o, ...T });
        } catch (T) {
          this.logger.warn(T);
        }
        return x;
      } else this.logger.warn(`there was no format function for ${h}`);
      return m;
    }, a);
  }
}
const m3 = (n, a) => {
  n.pending[a] !== void 0 && (delete n.pending[a], n.pendingCount--);
};
class p3 extends yo {
  constructor(a, s, r, o = {}) {
    var c, f;
    (super(),
      (this.backend = a),
      (this.store = s),
      (this.services = r),
      (this.languageUtils = r.languageUtils),
      (this.options = o),
      (this.logger = un.create("backendConnector")),
      (this.waitingReads = []),
      (this.maxParallelReads = o.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = o.maxRetries >= 0 ? o.maxRetries : 5),
      (this.retryTimeout = o.retryTimeout >= 1 ? o.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      (f = (c = this.backend) == null ? void 0 : c.init) == null ||
        f.call(c, r, o.backend, o));
  }
  queueLoad(a, s, r, o) {
    const c = {},
      f = {},
      m = {},
      p = {};
    return (
      a.forEach((h) => {
        let g = !0;
        (s.forEach((v) => {
          const x = `${h}|${v}`;
          !r.reload && this.store.hasResourceBundle(h, v)
            ? (this.state[x] = 2)
            : this.state[x] < 0 ||
              (this.state[x] === 1
                ? f[x] === void 0 && (f[x] = !0)
                : ((this.state[x] = 1),
                  (g = !1),
                  f[x] === void 0 && (f[x] = !0),
                  c[x] === void 0 && (c[x] = !0),
                  p[v] === void 0 && (p[v] = !0)));
        }),
          g || (m[h] = !0));
      }),
      (Object.keys(c).length || Object.keys(f).length) &&
        this.queue.push({
          pending: f,
          pendingCount: Object.keys(f).length,
          loaded: {},
          errors: [],
          callback: o,
        }),
      {
        toLoad: Object.keys(c),
        pending: Object.keys(f),
        toLoadLanguages: Object.keys(m),
        toLoadNamespaces: Object.keys(p),
      }
    );
  }
  loaded(a, s, r) {
    const o = a.split("|"),
      c = o[0],
      f = o[1];
    (s && this.emit("failedLoading", c, f, s),
      !s &&
        r &&
        this.store.addResourceBundle(c, f, r, void 0, void 0, { skipCopy: !0 }),
      (this.state[a] = s ? -1 : 2),
      s && r && (this.state[a] = 0));
    const m = {};
    (this.queue.forEach((p) => {
      (e3(p.loaded, [c], f),
        m3(p, a),
        s && p.errors.push(s),
        p.pendingCount === 0 &&
          !p.done &&
          (Object.keys(p.loaded).forEach((h) => {
            m[h] || (m[h] = {});
            const g = p.loaded[h];
            g.length &&
              g.forEach((v) => {
                m[h][v] === void 0 && (m[h][v] = !0);
              });
          }),
          (p.done = !0),
          p.errors.length ? p.callback(p.errors) : p.callback()));
    }),
      this.emit("loaded", m),
      (this.queue = this.queue.filter((p) => !p.done)));
  }
  read(a, s, r, o = 0, c = this.retryTimeout, f) {
    if (!a.length) return f(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: a,
        ns: s,
        fcName: r,
        tried: o,
        wait: c,
        callback: f,
      });
      return;
    }
    this.readingCalls++;
    const m = (h, g) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const v = this.waitingReads.shift();
          this.read(v.lng, v.ns, v.fcName, v.tried, v.wait, v.callback);
        }
        if (h && g && o < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, a, s, r, o + 1, c * 2, f);
          }, c);
          return;
        }
        f(h, g);
      },
      p = this.backend[r].bind(this.backend);
    if (p.length === 2) {
      try {
        const h = p(a, s);
        h && typeof h.then == "function"
          ? h.then((g) => m(null, g)).catch(m)
          : m(null, h);
      } catch (h) {
        m(h);
      }
      return;
    }
    return p(a, s, m);
  }
  prepareLoading(a, s, r = {}, o) {
    if (!this.backend)
      return (
        this.logger.warn(
          "No backend was added via i18next.use. Will not load resources.",
        ),
        o && o()
      );
    (pe(a) && (a = this.languageUtils.toResolveHierarchy(a)),
      pe(s) && (s = [s]));
    const c = this.queueLoad(a, s, r, o);
    if (!c.toLoad.length) return (c.pending.length || o(), null);
    c.toLoad.forEach((f) => {
      this.loadOne(f);
    });
  }
  load(a, s, r) {
    this.prepareLoading(a, s, {}, r);
  }
  reload(a, s, r) {
    this.prepareLoading(a, s, { reload: !0 }, r);
  }
  loadOne(a, s = "") {
    const r = a.split("|"),
      o = r[0],
      c = r[1];
    this.read(o, c, "read", void 0, void 0, (f, m) => {
      (f &&
        this.logger.warn(
          `${s}loading namespace ${c} for language ${o} failed`,
          f,
        ),
        !f &&
          m &&
          this.logger.log(`${s}loaded namespace ${c} for language ${o}`, m),
        this.loaded(a, f, m));
    });
  }
  saveMissing(a, s, r, o, c, f = {}, m = () => {}) {
    var p, h, g, v, x;
    if (
      (h = (p = this.services) == null ? void 0 : p.utils) != null &&
      h.hasLoadedNamespace &&
      !(
        (v = (g = this.services) == null ? void 0 : g.utils) != null &&
        v.hasLoadedNamespace(s)
      )
    ) {
      this.logger.warn(
        `did not save key "${r}" as the namespace "${s}" was not yet loaded`,
        "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!",
      );
      return;
    }
    if (!(r == null || r === "")) {
      if ((x = this.backend) != null && x.create) {
        const T = { ...f, isUpdate: c },
          E = this.backend.create.bind(this.backend);
        if (E.length < 6)
          try {
            let M;
            (E.length === 5 ? (M = E(a, s, r, o, T)) : (M = E(a, s, r, o)),
              M && typeof M.then == "function"
                ? M.then((N) => m(null, N)).catch(m)
                : m(null, M));
          } catch (M) {
            m(M);
          }
        else E(a, s, r, o, m, T);
      }
      !a || !a[0] || this.store.addResource(a[0], s, r, o);
    }
  }
}
const Lv = () => ({
    debug: !1,
    initAsync: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: (n) => {
      let a = {};
      if (
        (typeof n[1] == "object" && (a = n[1]),
        pe(n[1]) && (a.defaultValue = n[1]),
        pe(n[2]) && (a.tDescription = n[2]),
        typeof n[2] == "object" || typeof n[3] == "object")
      ) {
        const s = n[3] || n[2];
        Object.keys(s).forEach((r) => {
          a[r] = s[r];
        });
      }
      return a;
    },
    interpolation: {
      escapeValue: !0,
      format: (n) => n,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
    cacheInBuiltFormats: !0,
  }),
  Vv = (n) => {
    var a, s;
    return (
      pe(n.ns) && (n.ns = [n.ns]),
      pe(n.fallbackLng) && (n.fallbackLng = [n.fallbackLng]),
      pe(n.fallbackNS) && (n.fallbackNS = [n.fallbackNS]),
      ((s = (a = n.supportedLngs) == null ? void 0 : a.indexOf) == null
        ? void 0
        : s.call(a, "cimode")) < 0 &&
        (n.supportedLngs = n.supportedLngs.concat(["cimode"])),
      typeof n.initImmediate == "boolean" && (n.initAsync = n.initImmediate),
      n
    );
  },
  Ul = () => {},
  g3 = (n) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(n)).forEach((s) => {
      typeof n[s] == "function" && (n[s] = n[s].bind(n));
    });
  };
class or extends yo {
  constructor(a = {}, s) {
    if (
      (super(),
      (this.options = Vv(a)),
      (this.services = {}),
      (this.logger = un),
      (this.modules = { external: [] }),
      g3(this),
      s && !this.isInitialized && !a.isClone)
    ) {
      if (!this.options.initAsync) return (this.init(a, s), this);
      setTimeout(() => {
        this.init(a, s);
      }, 0);
    }
  }
  init(a = {}, s) {
    ((this.isInitializing = !0),
      typeof a == "function" && ((s = a), (a = {})),
      a.defaultNS == null &&
        a.ns &&
        (pe(a.ns)
          ? (a.defaultNS = a.ns)
          : a.ns.indexOf("translation") < 0 && (a.defaultNS = a.ns[0])));
    const r = Lv();
    ((this.options = { ...r, ...this.options, ...Vv(a) }),
      (this.options.interpolation = {
        ...r.interpolation,
        ...this.options.interpolation,
      }),
      a.keySeparator !== void 0 &&
        (this.options.userDefinedKeySeparator = a.keySeparator),
      a.nsSeparator !== void 0 &&
        (this.options.userDefinedNsSeparator = a.nsSeparator));
    const o = (h) => (h ? (typeof h == "function" ? new h() : h) : null);
    if (!this.options.isClone) {
      this.modules.logger
        ? un.init(o(this.modules.logger), this.options)
        : un.init(null, this.options);
      let h;
      this.modules.formatter ? (h = this.modules.formatter) : (h = h3);
      const g = new Rv(this.options);
      this.store = new Av(this.options.resources, this.options);
      const v = this.services;
      ((v.logger = un),
        (v.resourceStore = this.store),
        (v.languageUtils = g),
        (v.pluralResolver = new u3(g, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        h &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === r.interpolation.format) &&
          ((v.formatter = o(h)),
          v.formatter.init(v, this.options),
          (this.options.interpolation.format = v.formatter.format.bind(
            v.formatter,
          ))),
        (v.interpolator = new c3(this.options)),
        (v.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (v.backendConnector = new p3(
          o(this.modules.backend),
          v.resourceStore,
          v,
          this.options,
        )),
        v.backendConnector.on("*", (x, ...T) => {
          this.emit(x, ...T);
        }),
        this.modules.languageDetector &&
          ((v.languageDetector = o(this.modules.languageDetector)),
          v.languageDetector.init &&
            v.languageDetector.init(v, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((v.i18nFormat = o(this.modules.i18nFormat)),
          v.i18nFormat.init && v.i18nFormat.init(this)),
        (this.translator = new so(this.services, this.options)),
        this.translator.on("*", (x, ...T) => {
          this.emit(x, ...T);
        }),
        this.modules.external.forEach((x) => {
          x.init && x.init(this);
        }));
    }
    if (
      ((this.format = this.options.interpolation.format),
      s || (s = Ul),
      this.options.fallbackLng &&
        !this.services.languageDetector &&
        !this.options.lng)
    ) {
      const h = this.services.languageUtils.getFallbackCodes(
        this.options.fallbackLng,
      );
      h.length > 0 && h[0] !== "dev" && (this.options.lng = h[0]);
    }
    (!this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn(
        "init: no languageDetector is used and no lng is defined",
      ),
      [
        "getResource",
        "hasResourceBundle",
        "getResourceBundle",
        "getDataByLanguage",
      ].forEach((h) => {
        this[h] = (...g) => this.store[h](...g);
      }),
      [
        "addResource",
        "addResources",
        "addResourceBundle",
        "removeResourceBundle",
      ].forEach((h) => {
        this[h] = (...g) => (this.store[h](...g), this);
      }));
    const m = Ys(),
      p = () => {
        const h = (g, v) => {
          ((this.isInitializing = !1),
            this.isInitialized &&
              !this.initializedStoreOnce &&
              this.logger.warn(
                "init: i18next is already initialized. You should call init just once!",
              ),
            (this.isInitialized = !0),
            this.options.isClone ||
              this.logger.log("initialized", this.options),
            this.emit("initialized", this.options),
            m.resolve(v),
            s(g, v));
        };
        if (this.languages && !this.isInitialized)
          return h(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, h);
      };
    return (
      this.options.resources || !this.options.initAsync
        ? p()
        : setTimeout(p, 0),
      m
    );
  }
  loadResources(a, s = Ul) {
    var c, f;
    let r = s;
    const o = pe(a) ? a : this.language;
    if (
      (typeof a == "function" && (r = a),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (
        (o == null ? void 0 : o.toLowerCase()) === "cimode" &&
        (!this.options.preload || this.options.preload.length === 0)
      )
        return r();
      const m = [],
        p = (h) => {
          if (!h || h === "cimode") return;
          this.services.languageUtils.toResolveHierarchy(h).forEach((v) => {
            v !== "cimode" && m.indexOf(v) < 0 && m.push(v);
          });
        };
      (o
        ? p(o)
        : this.services.languageUtils
            .getFallbackCodes(this.options.fallbackLng)
            .forEach((g) => p(g)),
        (f = (c = this.options.preload) == null ? void 0 : c.forEach) == null ||
          f.call(c, (h) => p(h)),
        this.services.backendConnector.load(m, this.options.ns, (h) => {
          (!h &&
            !this.resolvedLanguage &&
            this.language &&
            this.setResolvedLanguage(this.language),
            r(h));
        }));
    } else r(null);
  }
  reloadResources(a, s, r) {
    const o = Ys();
    return (
      typeof a == "function" && ((r = a), (a = void 0)),
      typeof s == "function" && ((r = s), (s = void 0)),
      a || (a = this.languages),
      s || (s = this.options.ns),
      r || (r = Ul),
      this.services.backendConnector.reload(a, s, (c) => {
        (o.resolve(), r(c));
      }),
      o
    );
  }
  use(a) {
    if (!a)
      throw new Error(
        "You are passing an undefined module! Please check the object you are passing to i18next.use()",
      );
    if (!a.type)
      throw new Error(
        "You are passing a wrong module! Please check the object you are passing to i18next.use()",
      );
    return (
      a.type === "backend" && (this.modules.backend = a),
      (a.type === "logger" || (a.log && a.warn && a.error)) &&
        (this.modules.logger = a),
      a.type === "languageDetector" && (this.modules.languageDetector = a),
      a.type === "i18nFormat" && (this.modules.i18nFormat = a),
      a.type === "postProcessor" && Zx.addPostProcessor(a),
      a.type === "formatter" && (this.modules.formatter = a),
      a.type === "3rdParty" && this.modules.external.push(a),
      this
    );
  }
  setResolvedLanguage(a) {
    if (!(!a || !this.languages) && !(["cimode", "dev"].indexOf(a) > -1)) {
      for (let s = 0; s < this.languages.length; s++) {
        const r = this.languages[s];
        if (
          !(["cimode", "dev"].indexOf(r) > -1) &&
          this.store.hasLanguageSomeTranslations(r)
        ) {
          this.resolvedLanguage = r;
          break;
        }
      }
      !this.resolvedLanguage &&
        this.languages.indexOf(a) < 0 &&
        this.store.hasLanguageSomeTranslations(a) &&
        ((this.resolvedLanguage = a), this.languages.unshift(a));
    }
  }
  changeLanguage(a, s) {
    this.isLanguageChangingTo = a;
    const r = Ys();
    this.emit("languageChanging", a);
    const o = (m) => {
        ((this.language = m),
          (this.languages = this.services.languageUtils.toResolveHierarchy(m)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(m));
      },
      c = (m, p) => {
        (p
          ? this.isLanguageChangingTo === a &&
            (o(p),
            this.translator.changeLanguage(p),
            (this.isLanguageChangingTo = void 0),
            this.emit("languageChanged", p),
            this.logger.log("languageChanged", p))
          : (this.isLanguageChangingTo = void 0),
          r.resolve((...h) => this.t(...h)),
          s && s(m, (...h) => this.t(...h)));
      },
      f = (m) => {
        var g, v;
        !a && !m && this.services.languageDetector && (m = []);
        const p = pe(m) ? m : m && m[0],
          h = this.store.hasLanguageSomeTranslations(p)
            ? p
            : this.services.languageUtils.getBestMatchFromCodes(
                pe(m) ? [m] : m,
              );
        (h &&
          (this.language || o(h),
          this.translator.language || this.translator.changeLanguage(h),
          (v =
            (g = this.services.languageDetector) == null
              ? void 0
              : g.cacheUserLanguage) == null || v.call(g, h)),
          this.loadResources(h, (x) => {
            c(x, h);
          }));
      };
    return (
      !a &&
      this.services.languageDetector &&
      !this.services.languageDetector.async
        ? f(this.services.languageDetector.detect())
        : !a &&
            this.services.languageDetector &&
            this.services.languageDetector.async
          ? this.services.languageDetector.detect.length === 0
            ? this.services.languageDetector.detect().then(f)
            : this.services.languageDetector.detect(f)
          : f(a),
      r
    );
  }
  getFixedT(a, s, r) {
    const o = (c, f, ...m) => {
      let p;
      (typeof f != "object"
        ? (p = this.options.overloadTranslationOptionHandler([c, f].concat(m)))
        : (p = { ...f }),
        (p.lng = p.lng || o.lng),
        (p.lngs = p.lngs || o.lngs),
        (p.ns = p.ns || o.ns),
        p.keyPrefix !== "" && (p.keyPrefix = p.keyPrefix || r || o.keyPrefix));
      const h = this.options.keySeparator || ".";
      let g;
      return (
        p.keyPrefix && Array.isArray(c)
          ? (g = c.map((v) => `${p.keyPrefix}${h}${v}`))
          : (g = p.keyPrefix ? `${p.keyPrefix}${h}${c}` : c),
        this.t(g, p)
      );
    };
    return (
      pe(a) ? (o.lng = a) : (o.lngs = a),
      (o.ns = s),
      (o.keyPrefix = r),
      o
    );
  }
  t(...a) {
    var s;
    return (s = this.translator) == null ? void 0 : s.translate(...a);
  }
  exists(...a) {
    var s;
    return (s = this.translator) == null ? void 0 : s.exists(...a);
  }
  setDefaultNamespace(a) {
    this.options.defaultNS = a;
  }
  hasLoadedNamespace(a, s = {}) {
    if (!this.isInitialized)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18next was not initialized",
          this.languages,
        ),
        !1
      );
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18n.languages were undefined or empty",
          this.languages,
        ),
        !1
      );
    const r = s.lng || this.resolvedLanguage || this.languages[0],
      o = this.options ? this.options.fallbackLng : !1,
      c = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode") return !0;
    const f = (m, p) => {
      const h = this.services.backendConnector.state[`${m}|${p}`];
      return h === -1 || h === 0 || h === 2;
    };
    if (s.precheck) {
      const m = s.precheck(this, f);
      if (m !== void 0) return m;
    }
    return !!(
      this.hasResourceBundle(r, a) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (f(r, a) && (!o || f(c, a)))
    );
  }
  loadNamespaces(a, s) {
    const r = Ys();
    return this.options.ns
      ? (pe(a) && (a = [a]),
        a.forEach((o) => {
          this.options.ns.indexOf(o) < 0 && this.options.ns.push(o);
        }),
        this.loadResources((o) => {
          (r.resolve(), s && s(o));
        }),
        r)
      : (s && s(), Promise.resolve());
  }
  loadLanguages(a, s) {
    const r = Ys();
    pe(a) && (a = [a]);
    const o = this.options.preload || [],
      c = a.filter(
        (f) =>
          o.indexOf(f) < 0 && this.services.languageUtils.isSupportedCode(f),
      );
    return c.length
      ? ((this.options.preload = o.concat(c)),
        this.loadResources((f) => {
          (r.resolve(), s && s(f));
        }),
        r)
      : (s && s(), Promise.resolve());
  }
  dir(a) {
    var o, c;
    if (
      (a ||
        (a =
          this.resolvedLanguage ||
          (((o = this.languages) == null ? void 0 : o.length) > 0
            ? this.languages[0]
            : this.language)),
      !a)
    )
      return "rtl";
    const s = [
        "ar",
        "shu",
        "sqr",
        "ssh",
        "xaa",
        "yhd",
        "yud",
        "aao",
        "abh",
        "abv",
        "acm",
        "acq",
        "acw",
        "acx",
        "acy",
        "adf",
        "ads",
        "aeb",
        "aec",
        "afb",
        "ajp",
        "apc",
        "apd",
        "arb",
        "arq",
        "ars",
        "ary",
        "arz",
        "auz",
        "avl",
        "ayh",
        "ayl",
        "ayn",
        "ayp",
        "bbz",
        "pga",
        "he",
        "iw",
        "ps",
        "pbt",
        "pbu",
        "pst",
        "prp",
        "prd",
        "ug",
        "ur",
        "ydd",
        "yds",
        "yih",
        "ji",
        "yi",
        "hbo",
        "men",
        "xmn",
        "fa",
        "jpr",
        "peo",
        "pes",
        "prs",
        "dv",
        "sam",
        "ckb",
      ],
      r =
        ((c = this.services) == null ? void 0 : c.languageUtils) ||
        new Rv(Lv());
    return s.indexOf(r.getLanguagePartFromCode(a)) > -1 ||
      a.toLowerCase().indexOf("-arab") > 1
      ? "rtl"
      : "ltr";
  }
  static createInstance(a = {}, s) {
    return new or(a, s);
  }
  cloneInstance(a = {}, s = Ul) {
    const r = a.forkResourceStore;
    r && delete a.forkResourceStore;
    const o = { ...this.options, ...a, isClone: !0 },
      c = new or(o);
    if (
      ((a.debug !== void 0 || a.prefix !== void 0) &&
        (c.logger = c.logger.clone(a)),
      ["store", "services", "language"].forEach((m) => {
        c[m] = this[m];
      }),
      (c.services = { ...this.services }),
      (c.services.utils = { hasLoadedNamespace: c.hasLoadedNamespace.bind(c) }),
      r)
    ) {
      const m = Object.keys(this.store.data).reduce(
        (p, h) => (
          (p[h] = { ...this.store.data[h] }),
          (p[h] = Object.keys(p[h]).reduce(
            (g, v) => ((g[v] = { ...p[h][v] }), g),
            p[h],
          )),
          p
        ),
        {},
      );
      ((c.store = new Av(m, o)), (c.services.resourceStore = c.store));
    }
    return (
      (c.translator = new so(c.services, o)),
      c.translator.on("*", (m, ...p) => {
        c.emit(m, ...p);
      }),
      c.init(o, s),
      (c.translator.options = o),
      (c.translator.backendConnector.services.utils = {
        hasLoadedNamespace: c.hasLoadedNamespace.bind(c),
      }),
      c
    );
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    };
  }
}
const pt = or.createInstance();
pt.createInstance = or.createInstance;
pt.createInstance;
pt.dir;
pt.init;
pt.loadResources;
pt.reloadResources;
pt.use;
pt.changeLanguage;
pt.getFixedT;
pt.t;
pt.exists;
pt.setDefaultNamespace;
pt.hasLoadedNamespace;
pt.loadNamespaces;
pt.loadLanguages;
const { slice: y3, forEach: v3 } = [];
function x3(n) {
  return (
    v3.call(y3.call(arguments, 1), (a) => {
      if (a) for (const s in a) n[s] === void 0 && (n[s] = a[s]);
    }),
    n
  );
}
function b3(n) {
  return typeof n != "string"
    ? !1
    : [
        /<\s*script.*?>/i,
        /<\s*\/\s*script\s*>/i,
        /<\s*img.*?on\w+\s*=/i,
        /<\s*\w+\s*on\w+\s*=.*?>/i,
        /javascript\s*:/i,
        /vbscript\s*:/i,
        /expression\s*\(/i,
        /eval\s*\(/i,
        /alert\s*\(/i,
        /document\.cookie/i,
        /document\.write\s*\(/i,
        /window\.location/i,
        /innerHTML/i,
      ].some((s) => s.test(n));
}
const _v = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
  S3 = function (n, a) {
    const r =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : { path: "/" },
      o = encodeURIComponent(a);
    let c = `${n}=${o}`;
    if (r.maxAge > 0) {
      const f = r.maxAge - 0;
      if (Number.isNaN(f)) throw new Error("maxAge should be a Number");
      c += `; Max-Age=${Math.floor(f)}`;
    }
    if (r.domain) {
      if (!_v.test(r.domain)) throw new TypeError("option domain is invalid");
      c += `; Domain=${r.domain}`;
    }
    if (r.path) {
      if (!_v.test(r.path)) throw new TypeError("option path is invalid");
      c += `; Path=${r.path}`;
    }
    if (r.expires) {
      if (typeof r.expires.toUTCString != "function")
        throw new TypeError("option expires is invalid");
      c += `; Expires=${r.expires.toUTCString()}`;
    }
    if (
      (r.httpOnly && (c += "; HttpOnly"),
      r.secure && (c += "; Secure"),
      r.sameSite)
    )
      switch (
        typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite
      ) {
        case !0:
          c += "; SameSite=Strict";
          break;
        case "lax":
          c += "; SameSite=Lax";
          break;
        case "strict":
          c += "; SameSite=Strict";
          break;
        case "none":
          c += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    return (r.partitioned && (c += "; Partitioned"), c);
  },
  zv = {
    create(n, a, s, r) {
      let o =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : { path: "/", sameSite: "strict" };
      (s &&
        ((o.expires = new Date()),
        o.expires.setTime(o.expires.getTime() + s * 60 * 1e3)),
        r && (o.domain = r),
        (document.cookie = S3(n, encodeURIComponent(a), o)));
    },
    read(n) {
      const a = `${n}=`,
        s = document.cookie.split(";");
      for (let r = 0; r < s.length; r++) {
        let o = s[r];
        for (; o.charAt(0) === " "; ) o = o.substring(1, o.length);
        if (o.indexOf(a) === 0) return o.substring(a.length, o.length);
      }
      return null;
    },
    remove(n) {
      this.create(n, "", -1);
    },
  };
var T3 = {
    name: "cookie",
    lookup(n) {
      let { lookupCookie: a } = n;
      if (a && typeof document < "u") return zv.read(a) || void 0;
    },
    cacheUserLanguage(n, a) {
      let {
        lookupCookie: s,
        cookieMinutes: r,
        cookieDomain: o,
        cookieOptions: c,
      } = a;
      s && typeof document < "u" && zv.create(s, n, r, o, c);
    },
  },
  E3 = {
    name: "querystring",
    lookup(n) {
      var r;
      let { lookupQuerystring: a } = n,
        s;
      if (typeof window < "u") {
        let { search: o } = window.location;
        !window.location.search &&
          ((r = window.location.hash) == null ? void 0 : r.indexOf("?")) > -1 &&
          (o = window.location.hash.substring(
            window.location.hash.indexOf("?"),
          ));
        const f = o.substring(1).split("&");
        for (let m = 0; m < f.length; m++) {
          const p = f[m].indexOf("=");
          p > 0 && f[m].substring(0, p) === a && (s = f[m].substring(p + 1));
        }
      }
      return s;
    },
  };
let wi = null;
const Uv = () => {
  if (wi !== null) return wi;
  try {
    if (((wi = typeof window < "u" && window.localStorage !== null), !wi))
      return !1;
    const n = "i18next.translate.boo";
    (window.localStorage.setItem(n, "foo"), window.localStorage.removeItem(n));
  } catch {
    wi = !1;
  }
  return wi;
};
var w3 = {
  name: "localStorage",
  lookup(n) {
    let { lookupLocalStorage: a } = n;
    if (a && Uv()) return window.localStorage.getItem(a) || void 0;
  },
  cacheUserLanguage(n, a) {
    let { lookupLocalStorage: s } = a;
    s && Uv() && window.localStorage.setItem(s, n);
  },
};
let Ai = null;
const Bv = () => {
  if (Ai !== null) return Ai;
  try {
    if (((Ai = typeof window < "u" && window.sessionStorage !== null), !Ai))
      return !1;
    const n = "i18next.translate.boo";
    (window.sessionStorage.setItem(n, "foo"),
      window.sessionStorage.removeItem(n));
  } catch {
    Ai = !1;
  }
  return Ai;
};
var A3 = {
    name: "sessionStorage",
    lookup(n) {
      let { lookupSessionStorage: a } = n;
      if (a && Bv()) return window.sessionStorage.getItem(a) || void 0;
    },
    cacheUserLanguage(n, a) {
      let { lookupSessionStorage: s } = a;
      s && Bv() && window.sessionStorage.setItem(s, n);
    },
  },
  C3 = {
    name: "navigator",
    lookup(n) {
      const a = [];
      if (typeof navigator < "u") {
        const { languages: s, userLanguage: r, language: o } = navigator;
        if (s) for (let c = 0; c < s.length; c++) a.push(s[c]);
        (r && a.push(r), o && a.push(o));
      }
      return a.length > 0 ? a : void 0;
    },
  },
  O3 = {
    name: "htmlTag",
    lookup(n) {
      let { htmlTag: a } = n,
        s;
      const r = a || (typeof document < "u" ? document.documentElement : null);
      return (
        r &&
          typeof r.getAttribute == "function" &&
          (s = r.getAttribute("lang")),
        s
      );
    },
  },
  R3 = {
    name: "path",
    lookup(n) {
      var o;
      let { lookupFromPathIndex: a } = n;
      if (typeof window > "u") return;
      const s = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      return Array.isArray(s)
        ? (o = s[typeof a == "number" ? a : 0]) == null
          ? void 0
          : o.replace("/", "")
        : void 0;
    },
  },
  D3 = {
    name: "subdomain",
    lookup(n) {
      var o, c;
      let { lookupFromSubdomainIndex: a } = n;
      const s = typeof a == "number" ? a + 1 : 1,
        r =
          typeof window < "u" &&
          ((c = (o = window.location) == null ? void 0 : o.hostname) == null
            ? void 0
            : c.match(
                /^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i,
              ));
      if (r) return r[s];
    },
  };
let Qx = !1;
try {
  (document.cookie, (Qx = !0));
} catch {}
const Ix = [
  "querystring",
  "cookie",
  "localStorage",
  "sessionStorage",
  "navigator",
  "htmlTag",
];
Qx || Ix.splice(1, 1);
const M3 = () => ({
  order: Ix,
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  caches: ["localStorage"],
  excludeCacheFor: ["cimode"],
  convertDetectedLanguage: (n) => n,
});
class Jx {
  constructor(a) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    ((this.type = "languageDetector"), (this.detectors = {}), this.init(a, s));
  }
  init() {
    let a =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : { languageUtils: {} },
      s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    ((this.services = a),
      (this.options = x3(s, this.options || {}, M3())),
      typeof this.options.convertDetectedLanguage == "string" &&
        this.options.convertDetectedLanguage.indexOf("15897") > -1 &&
        (this.options.convertDetectedLanguage = (o) => o.replace("-", "_")),
      this.options.lookupFromUrlIndex &&
        (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
      (this.i18nOptions = r),
      this.addDetector(T3),
      this.addDetector(E3),
      this.addDetector(w3),
      this.addDetector(A3),
      this.addDetector(C3),
      this.addDetector(O3),
      this.addDetector(R3),
      this.addDetector(D3));
  }
  addDetector(a) {
    return ((this.detectors[a.name] = a), this);
  }
  detect() {
    let a =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : this.options.order,
      s = [];
    return (
      a.forEach((r) => {
        if (this.detectors[r]) {
          let o = this.detectors[r].lookup(this.options);
          (o && typeof o == "string" && (o = [o]), o && (s = s.concat(o)));
        }
      }),
      (s = s
        .filter((r) => r != null && !b3(r))
        .map((r) => this.options.convertDetectedLanguage(r))),
      this.services &&
      this.services.languageUtils &&
      this.services.languageUtils.getBestMatchFromCodes
        ? s
        : s.length > 0
          ? s[0]
          : null
    );
  }
  cacheUserLanguage(a) {
    let s =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : this.options.caches;
    s &&
      ((this.options.excludeCacheFor &&
        this.options.excludeCacheFor.indexOf(a) > -1) ||
        s.forEach((r) => {
          this.detectors[r] &&
            this.detectors[r].cacheUserLanguage(a, this.options);
        }));
  }
}
Jx.type = "languageDetector";
const N3 = { home: "Home", about: "Services", contact: "Upload Your Case" },
  j3 = {
    order: "Order Now",
    featured: {
      title: "FEATURED WORKS",
      items: {
        PSI: "PSI",
        "I Bar": "I Bar",
        "Harvesting Guide": "Harvesting Guide",
        "Stackable Guide": "Stackable Guide",
      },
      label: { "With MASHAB": "With MASHAB" },
    },
    showreel: {
      title: "ShowReel",
      categories: {
        ALL: "All",
        "BH Stack Guides": "BH Stack Guides",
        Prothesis: "Prothesis",
        "Sub-Periosteal Implants": "Sub-Periosteal Implants",
        Guides: "Guides",
      },
      items: {
        "Tooth Supported Guide": "Tooth Supported Guide",
        "Tissue Guide": "Tissue Guide",
        "Bone Guide": "Bone Guide",
        "BH Stack Guide": "BH Stack Guide",
        "Immediate Loading": "Immediate Loading",
        "Crown Lengthening Guide": "Crown Lengthening Guide",
        "Zygomatic Guides": "Zygomatic Guides",
        "Apicectomy Guide": "Apicectomy Guide",
        Mesh: "Mesh",
        PSI: "PSI",
        "Complete Denture": "Complete Denture",
        "Nose Prosthesis": "Nose Prosthesis",
        "I Bar": "I Bar",
      },
    },
    inNumbers: {
      title: "BoneHard In Numbers",
      stats: { years: "Years", Cases: "Cases", awards: "Awards" },
    },
  },
  L3 = {
    intro:
      "This project was worked on in partnership between Mashab Company and {{brand}}, and achieved great success thanks to God and the efforts of those working on this project.",
  },
  V3 = { notFound: "Sorry, that reel could not be found.", back: "Back" },
  _3 = {
    title: "Our Services",
    FirstParallax: {
      title: {
        "3D conversions": "3D conversions",
        Consultations: "Consultations",
        Guides: "Guides",
        "Implant Treatment plans": "Implant Treatment plans",
        "Esthetic / Prosthetic Consultations":
          "Esthetic / Prosthetic Consultations",
        "DSD planning": "DSD planning",
        "Extra-Oral Prosthesis": "Extra-Oral Prosthesis",
        "Research Samples and Assistance": "Research Samples and Assistance",
      },
      description: {
        "3D conversions":
          "Bring your scans to life with our advanced 3D conversion services. We transform CBCT data into accurate digital models, giving you a clear view of your patient’s anatomy in STL format. Whether for planning, visualization, or guide design, our service makes digital dentistry simpler, faster, and more precise.",
        Consultations:
          "Expert digital dentistry consultations tailored to your needs from scan evaluation to surgical planning, we’re here to support every step of your workflow.",
        Guides:
          "We specialize in providing fully customized dental surgical guides designed from your patient’s scans for maximum accuracy and predictability. Each guide is carefully planned to support precise implant placement, reduce surgical risks, and save valuable chair time. Our goal is to give you peace of mind during surgery and better outcomes for your patients.",
        "Implant Treatment plans":
          "Whether for single-tooth replacement or full-arch rehabilitation, we deliver reliable, detailed implant planning that supports minimally invasive surgery and long-term treatment success.",
        "Esthetic / Prosthetic Consultations":
          "A beautiful smile begins with the right plan. Our esthetic and prosthetic consultation service is designed to guide dentists in achieving both functional and highly aesthetic results for their patients. We combine digital tools with clinical expertise to analyze facial harmony, smile design, and occlusion, ensuring every restoration is tailored for long-term success.",
        "DSD planning":
          "Transform the way you approach esthetic dentistry with Digital Smile Design, every smile begins with a vision.",
        "Extra-Oral Prosthesis":
          "From orbital and nasal prostheses to auricular rehabilitation, our goal is to deliver prosthetic solutions that restore not only appearance but also the emotional well-being of every patient.",
        "Research Samples and Assistance":
          "Whether you’re preparing a thesis, clinical study, or scientific publication, we are here to make the research process smoother, more efficient, and more impactful.",
      },
    },
    SecondParallax: {
      title: "Our Services",
      labels: {
        "3D conversions": "3D conversions",
        "Implant Planning": "Implant Planning",
        "Surgical Guides": "Surgical Guides",
        Restorations: "Restorations",
      },
      text: {
        "3D conversions": "",
        "Implant Planning": "",
        "Surgical Guides": "",
        Restorations: "",
      },
    },
    clients: {
      title: "Clients",
      filters: { all: "ALL", private: "Private", government: "Government" },
    },
  },
  z3 = {
    title: "Upload Your Case",
    clients: {
      name: "Contact Name*",
      email: "Contact Email*",
      number: "Contact Number*",
      organization: "Organization*",
      sector: "Sector*",
      campaign: "Campaign Type*",
      scope: "Scope of work*",
      budget: "Budget*",
      message: "Link For Swiss Transfer Files",
      send: "SEND MESSAGE",
      info: "Other Information",
    },
    types: { clients: "Clients" },
    buttons: { clients: "Clients" },
    cvInfo: "Email us your CV at: Info@bone-hard.com",
    select: {
      campaign: "Select Campaign Type",
      sector: "Select Sector",
      services: "Select Services",
    },
    options: {
      sectors: ["Retail", "Healthcare", "Government"],
      campaignTypes: ["360 Campaign", "Med Complexity", "Low Complexity"],
      scopes: ["Surgical Guides", "Prothesis", "Education", "Other"],
    },
    placeholders: {
      name: "Full Name",
      phone: "966 50 000 0000",
      email: "example@email.com",
      organization: "Organization Name",
      possession: "Contact Possession",
      profile: "organization.com",
      message: "Your Link",
      partnership: "Partnership Opportunity",
      budget: "Your Budget",
    },
  },
  U3 = {
    title: "Order Now",
    clients: {
      name: "Contact Name*",
      email: "Contact Email*",
      number: "Contact Number*",
      organization: "Organization*",
      sector: "Sector*",
      campaign: "Campaign Type*",
      scope: "Scope of work*",
      budget: "Budget*",
      message: "Work Details*",
      send: "SEND MESSAGE",
      info: "Other Information",
    },
    types: { clients: "Clients" },
    buttons: { clients: "Clients" },
    cvInfo: "Email us your CV at: Info@bone-hard.com",
    select: {
      campaign: "Select Campaign Type",
      sector: "Select Sector",
      services: "Select Services",
    },
    options: {
      sectors: ["Retail", "Healthcare", "Government"],
      campaignTypes: ["360 Campaign", "Med Complexity", "Low Complexity"],
      scopes: ["Media Buying", "Video Production", "Campaign Concept"],
    },
    placeholders: {
      name: "Full Name",
      phone: "966 50 000 0000",
      email: "example@email.com",
      organization: "Organization Name",
      possession: "Contact Possession",
      profile: "organization.com",
      message: "Your Link",
      partnership: "Partnership Opportunity",
      budget: "Your Budget",
    },
  },
  B3 = {
    addressTitle: "Address",
    address: "Dubai - UAE",
    socialTitle: "Social Accounts",
    pagesTitle: "Pages",
    pages: { home: "Home", about: "Services", contact: "Upload Your Case" },
    country: "UAE - Dubai",
  },
  k3 = {
    nav: N3,
    home: j3,
    reelDetail: L3,
    common: V3,
    about: _3,
    contact: z3,
    order: U3,
    footer: B3,
  },
  P3 = { home: "الرئيسية", about: "من نحن", contact: "تواصل معنا" },
  H3 = {
    order: "اطلب الأن",
    featured: {
      title: "أعمال مختارة",
      items: {
        "saldwish | MBC GROUP": "سالدويش | MBC GROUP",
        "Akhdod Club": "نادي الأخدود",
        "Jeddah History": "جدة البلد التاريخية",
        "Saudi Founding Day": "يوم التأسيس السعودي",
      },
      label: { "With MASHAB": "مع مشب" },
    },
    showreel: {
      title: "أعمالنا",
      categories: {
        ALL: "الكل",
        "Long Term Partnership": "شراكة طويلة الأمد",
        "Strategy Work": "عمل استراتيجي",
        "Video Based Campaigns": "حملات مرئية",
        "Brand Activation": "تنشيط العلامة التجارية",
        "Seasonal Campaigns": "حملات موسمية",
      },
      items: {
        Buhari: "بهاري",
        "I'm Hungry": "I'm Hungry",
        "Elshabrawi Abha": "الشبراوي-ابها",
        Assaf: "عساف",
        Ninja: "نينجا",
        "Almajd Real Estate": "المجد العقارية",
        "Joaan Application": "تطبيق جوعان",
        "Mada Elebtsama": "مدى الابتسامه الطبي",
        "Saudi Company For Coffee": "الشركة السعودية للقهوة",
        "Zed Corner": "زد كورنر",
        "Zen HR": "Zen HR",
        Salala: "صلالة",
        "Ministry of Housing": "وزارة الاسكان",
      },
    },
    inNumbers: {
      title: "مشب في أرقام",
      stats: { years: "سنوات", projects: "مشاريع", awards: "جوائز" },
    },
  },
  G3 = {
    intro:
      "تم العمل على هذا المشروع بالشراكة بين شركة مشب و {{brand}} و حقق نجاحاً كبيراً بفضل الله و مجهودات العاملين على هذا العمل.",
  },
  Y3 = { notFound: "عذراً، لم يتم العثور على تلك القائمة.", back: "الرجوع" },
  q3 = {
    title: "تفكيرنا",
    FirstParallax: {
      title: {
        "3D conversions": "رواة القصص",
        "Implant Planning": "رواد التجريب وصناعة التوجهات",
        "Surgical Guides": "بيئات رقمية وأداء أولاً",
        "All-on-X Full-Arch Guided Surgery": "هنا لنستمر",
        Restorations: "خبرة في العمليات المعقدة",
      },
      description: {
        "3D conversions":
          "تتمحور استراتيجيتنا في التواصل حول رواية القصص، قصص مرتبطة بمجتمعنا، لا يمكن اختلاقها أو صناعتها دون السياق الصحيح. نخلق فرصًا لتحويل المحتوى الإبداعي إلى سردٍ للعلامة التجارية يتطور إلى منصة تواصل متكاملة",
        "Implant Planning":
          "نفتح نوافذ لعملائنا الذين يجرؤون على التجريب معنا. نصنع التوجهات التي تهز السوق والصناعة. نحن صنعنا فيلمًا قصيرًا بدلًا من إعلان حتى نتمكن من إيصال الرسالة.",
        "Surgical Guides":
          "ندرك أن الإبداع القوي أساسي، ولكن مع العلامات التجارية التي تعتمد على الأداء والرقمنة، يتغير منظورنا لخلق محتوى يعمل ضمن نظام متكامل، حيث أن لكل نقطة اتصال طابعها الخاص الذي يعكس متطلبات التواصل.",
        "All-on-X Full-Arch Guided Surgery":
          "بُنيت علاقاتنا وهيكل فريقنا وإجراءاتنا بطريقة تضمن استمرارية علاقتنا مع شركائنا، لماذا؟ حتى نرى رؤيتنا الاستراتيجية المشتركة تتحقق، نحن نستثمر في شركائنا ليتمكنوا من الاستثمار فينا.",
        Restorations:
          "نمتلك الجاهزية الاستراتيجية والتنفيذية لإدارة عملاء ذوي احتياجات معقدة مع الحفاظ على مستوى الخدمة وتحقيق الأهداف التي تواكب حجم وتعقيد هذه الشراكات.",
      },
    },
    SecondParallax: {
      title: "خدماتنا",
      labels: {
        Discover: "اكتشف",
        Define: "حدد",
        Develop: "طور",
        Distribute: "وزع",
      },
      text: {
        Discover: `أبحاث
تسويقية`,
        Define: `استراتيجية التواصل
استراتيجية الإعلام`,
        Develop: `فن وتصميم
خطة وحملة إعلانية
إدارة الإنتاج`,
        Distribute: "تخطيط وشراء الوسائط",
      },
    },
    clients: {
      title: "عملاؤنا",
      filters: { all: "الكل", private: "خاص", government: "حكومي" },
    },
  },
  K3 = {
    title: "تواصل معنا",
    options: {
      sectors: ["Retail", "Healthcare", "Government"],
      campaignTypes: ["360 Campaign", "Med Complexity", "Low Complexity"],
      scopes: ["Media Buying", "Video Production", "Campaign Concept"],
      budgets: ["400 – 600 k", "600 – 800 k", "800 – 1 300 k", "1 300 k+"],
    },
    placeholders: {
      name: "الاسم الكامل",
      phone: "966 50 000 0000",
      email: "example@email.com",
      organization: "اسم الجهة",
      possession: "صفة المتواصل",
      profile: "organization.com",
      message: "رسالتك",
      partnership: "فرصة شراكة",
      budget: "ميزانيتك",
    },
    successMessage: "شكرًا – سنتواصل معك قريبًا!",
    clients: {
      name: "الاسم الكامل*",
      email: "البريد الإلكتروني*",
      number: "رقم التواصل*",
      organization: "اسم جهة العمل*",
      sector: "القطاع*",
      campaign: "نوع الحملة*",
      scope: "نطاق العمل*",
      budget: "الميزانية*",
      message: "معلومات إضافية",
      send: "إرسال الرسالة",
    },
    types: { clients: "العملاء" },
    buttons: { clients: "العملاء" },
    cvInfo: "أرسل سيرتك الذاتية إلى: Info@bone-hard.com",
    select: {
      campaign: "اختر نوع الحملة",
      sector: "اختر القطاع",
      services: "اختر الخدمة",
    },
  },
  F3 = { title: "اطلب الأن" },
  $3 = {
    addressTitle: "العنوان",
    address: "نجران - السعودية",
    socialTitle: "الحسابات الاجتماعية",
    pagesTitle: "الصفحات",
    pages: { home: "الرئيسية", about: "من نحن", contact: "اتصل بنا" },
    country: "المملكة العربية السعودية - نجران",
  },
  X3 = {
    nav: P3,
    home: H3,
    reelDetail: G3,
    common: Y3,
    about: q3,
    contact: K3,
    order: F3,
    footer: $3,
  },
  Z3 = localStorage.getItem("i18nextLng");
pt.use(Jx)
  .use(dE)
  .init({
    lng: Z3 ?? "en",
    fallbackLng: "ar",
    resources: { ar: { translation: X3 }, en: { translation: k3 } },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: !1 },
  });
DS.createRoot(document.getElementById("root")).render(
  A.jsx(C.StrictMode, { children: A.jsx(IR, {}) }),
);
