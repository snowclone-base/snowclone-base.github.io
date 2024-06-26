(() => {
  var n = Object.create,
    e = Object.defineProperty,
    s = Object.getOwnPropertyDescriptor,
    t = Object.getOwnPropertyNames,
    o = Object.getPrototypeOf,
    i = Object.prototype.hasOwnProperty,
    a = (e, n) =>
      function () {
        return (
          n ||
            (0, e[t(e)[0]])(
              (n = {
                exports: {},
              }).exports,
              n
            ),
          n.exports
        );
      },
    r = (n, o, a, r) => {
      if ((o && typeof o == "object") || typeof o == "function")
        for (let c of t(o))
          !i.call(n, c) &&
            c !== a &&
            e(n, c, {
              get: () => o[c],
              enumerable: !(r = s(o, c)) || r.enumerable,
            });
      return n;
    },
    c = (t, s, i) => (
      (i = t != null ? n(o(t)) : {}),
      r(
        s || !t || !t.__esModule
          ? e(i, "default", {
              value: t,
              enumerable: !0,
            })
          : i,
        t
      )
    ),
    l = a({
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"(e, t) {
        !(function (n, s) {
          typeof e == "object" && typeof t != "undefined"
            ? (t.exports = s())
            : typeof define == "function" && define.amd
            ? define(s)
            : ((n =
                typeof globalThis != "undefined"
                  ? globalThis
                  : n || self).bootstrap = s());
        })(e, function () {
          "use strict";
          const Ce = "transitionend",
            At = (e) => {
              let t = e.getAttribute("data-bs-target");
              if (!t || t === "#") {
                let n = e.getAttribute("href");
                if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
                n.includes("#") &&
                  !n.startsWith("#") &&
                  (n = `#${n.split("#")[1]}`),
                  (t = n && n !== "#" ? n.trim() : null);
              }
              return t;
            },
            Ge = (e) => {
              const t = At(e);
              return t && document.querySelector(t) ? t : null;
            },
            b = (e) => {
              const t = At(e);
              return t ? document.querySelector(t) : null;
            },
            Dt = (e) => {
              e.dispatchEvent(new Event(Ce));
            },
            C = (e) =>
              !!e &&
              typeof e == "object" &&
              (e.jquery !== void 0 && (e = e[0]), e.nodeType !== void 0),
            w = (e) =>
              C(e)
                ? e.jquery
                  ? e[0]
                  : e
                : typeof e == "string" && e.length > 0
                ? document.querySelector(e)
                : null,
            p = (e, t, n) => {
              Object.keys(n).forEach((s) => {
                const a = n[s],
                  o = t[s],
                  r =
                    o && C(o)
                      ? "element"
                      : (i = o) == null
                      ? `${i}`
                      : {}.toString
                          .call(i)
                          .match(/\s([a-z]+)/i)[1]
                          .toLowerCase();
                var i;
                if (!new RegExp(a).test(r))
                  throw new TypeError(
                    `${e.toUpperCase()}: Option "${s}" provided type "${r}" but expected type "${a}".`
                  );
              });
            },
            X = (e) =>
              !!C(e) &&
              e.getClientRects().length !== 0 &&
              getComputedStyle(e).getPropertyValue("visibility") === "visible",
            E = (e) =>
              !e ||
              e.nodeType !== Node.ELEMENT_NODE ||
              !!e.classList.contains("disabled") ||
              (e.disabled !== void 0
                ? e.disabled
                : e.hasAttribute("disabled") &&
                  e.getAttribute("disabled") !== "false"),
            Bt = (e) => {
              if (!document.documentElement.attachShadow) return null;
              if (typeof e.getRootNode == "function") {
                const t = e.getRootNode();
                return t instanceof ShadowRoot ? t : null;
              }
              return e instanceof ShadowRoot
                ? e
                : e.parentNode
                ? Bt(e.parentNode)
                : null;
            },
            ye = () => {},
            R = (e) => {
              e.offsetHeight;
            },
            nn = () => {
              const { jQuery: e } = window;
              return e && !document.body.hasAttribute("data-bs-no-jquery")
                ? e
                : null;
            },
            $e = [],
            o = () => document.documentElement.dir === "rtl",
            d = (e) => {
              var t = () => {
                const t = nn();
                if (t) {
                  const n = e.NAME,
                    s = t.fn[n];
                  (t.fn[n] = e.jQueryInterface),
                    (t.fn[n].Constructor = e),
                    (t.fn[n].noConflict = () => (
                      (t.fn[n] = s), e.jQueryInterface
                    ));
                }
              };
              document.readyState === "loading"
                ? ($e.length ||
                    document.addEventListener("DOMContentLoaded", () => {
                      $e.forEach((e) => e());
                    }),
                  $e.push(t))
                : t();
            },
            O = (e) => {
              typeof e == "function" && e();
            },
            sn = (e, t, n = !0) => {
              if (!n) return void O(e);
              const i =
                ((e) => {
                  if (!e) return 0;
                  let { transitionDuration: t, transitionDelay: n } =
                    window.getComputedStyle(e);
                  const s = Number.parseFloat(t),
                    o = Number.parseFloat(n);
                  return s || o
                    ? ((t = t.split(",")[0]),
                      (n = n.split(",")[0]),
                      1e3 * (Number.parseFloat(t) + Number.parseFloat(n)))
                    : 0;
                })(t) + 5;
              let s = !1;
              const o = ({ target: n }) => {
                n === t && ((s = !0), t.removeEventListener(Ce, o), O(e));
              };
              t.addEventListener(Ce, o),
                setTimeout(() => {
                  s || Dt(t);
                }, i);
            },
            an = (e, t, n, s) => {
              let o = e.indexOf(t);
              if (o === -1) return e[!n && s ? e.length - 1 : 0];
              const i = e.length;
              return (
                (o += n ? 1 : -1),
                s && (o = (o + i) % i),
                e[Math.max(0, Math.min(o, i - 1))]
              );
            },
            _s = /[^.]*(?=\..*)\.|.*/,
            vs = /\..*/,
            ms = /::\d+$/,
            He = {};
          let dn = 1;
          const rs = {
              mouseenter: "mouseover",
              mouseleave: "mouseout",
            },
            is = /^(mouseenter|mouseleave)/i,
            _n = new Set([
              "click",
              "dblclick",
              "mouseup",
              "mousedown",
              "contextmenu",
              "mousewheel",
              "DOMMouseScroll",
              "mouseover",
              "mouseout",
              "mousemove",
              "selectstart",
              "selectend",
              "keydown",
              "keypress",
              "keyup",
              "orientationchange",
              "touchstart",
              "touchmove",
              "touchend",
              "touchcancel",
              "pointerdown",
              "pointermove",
              "pointerup",
              "pointerleave",
              "pointercancel",
              "gesturestart",
              "gesturechange",
              "gestureend",
              "focus",
              "blur",
              "change",
              "reset",
              "select",
              "submit",
              "focusin",
              "focusout",
              "load",
              "unload",
              "beforeunload",
              "resize",
              "move",
              "DOMContentLoaded",
              "readystatechange",
              "error",
              "abort",
              "scroll",
            ]);
          function An(e, t) {
            return (t && `${t}::${dn++}`) || e.uidEvent || dn++;
          }
          function Un(e) {
            const t = An(e);
            return (e.uidEvent = t), (He[t] = He[t] || {}), He[t];
          }
          function Pn(e, t, n = null) {
            const s = Object.keys(e);
            for (let o = 0, a = s.length; o < a; o++) {
              const i = e[s[o]];
              if (i.originalHandler === t && i.delegationSelector === n)
                return i;
            }
            return null;
          }
          function kt(e, t, n) {
            const o = typeof t == "string",
              i = o ? n : t;
            let s = fn(e);
            return _n.has(s) || (s = e), [o, i, s];
          }
          function Rn(t, n, s, o, i) {
            if (typeof n != "string" || !t) return;
            if ((s || ((s = o), (o = null)), is.test(n))) {
              const e = (e) =>
                function (t) {
                  if (
                    !t.relatedTarget ||
                    (t.relatedTarget !== t.delegateTarget &&
                      !t.delegateTarget.contains(t.relatedTarget))
                  )
                    return e.call(this, t);
                };
              o ? (o = e(o)) : (s = e(s));
            }
            const [r, d, c] = kt(n, s, o),
              u = Un(t),
              h = u[c] || (u[c] = {}),
              l = Pn(h, d, r ? s : null);
            if (l) return void (l.oneOff = l.oneOff && i);
            const m = An(d, n.replace(_s, "")),
              a = r
                ? (function (t, n, s) {
                    return function o(i) {
                      const a = t.querySelectorAll(n);
                      for (
                        let { target: r } = i;
                        r && r !== this;
                        r = r.parentNode
                      )
                        for (let c = a.length; c--; )
                          if (a[c] === r)
                            return (
                              (i.delegateTarget = r),
                              o.oneOff && e.off(t, i.type, n, s),
                              s.apply(r, [i])
                            );
                      return null;
                    };
                  })(t, s, o)
                : (function (t, n) {
                    return function s(o) {
                      return (
                        (o.delegateTarget = t),
                        s.oneOff && e.off(t, o.type, n),
                        n.apply(t, [o])
                      );
                    };
                  })(t, s);
            (a.delegationSelector = r ? s : null),
              (a.originalHandler = d),
              (a.oneOff = i),
              (a.uidEvent = m),
              (h[m] = a),
              t.addEventListener(c, a, r);
          }
          function ke(e, t, n, s, o) {
            const i = Pn(t[n], s, o);
            i &&
              (e.removeEventListener(n, i, Boolean(o)),
              delete t[n][i.uidEvent]);
          }
          function fn(e) {
            return (e = e.replace(vs, "")), rs[e] || e;
          }
          const e = {
              on(e, t, n, s) {
                Rn(e, t, n, s, !1);
              },
              one(e, t, n, s) {
                Rn(e, t, n, s, !0);
              },
              off(e, t, n, s) {
                if (typeof t != "string" || !e) return;
                const [d, r, i] = kt(t, n, s),
                  c = i !== t,
                  o = Un(e),
                  l = t.startsWith(".");
                if (r !== void 0) {
                  if (!o || !o[i]) return;
                  return void ke(e, o, i, r, d ? n : null);
                }
                l &&
                  Object.keys(o).forEach((n) => {
                    !(function (e, t, n, s) {
                      const o = t[n] || {};
                      Object.keys(o).forEach((i) => {
                        if (i.includes(s)) {
                          const s = o[i];
                          ke(e, t, n, s.originalHandler, s.delegationSelector);
                        }
                      });
                    })(e, o, n, t.slice(1));
                  });
                const a = o[i] || {};
                Object.keys(a).forEach((n) => {
                  const s = n.replace(ms, "");
                  if (!c || t.includes(s)) {
                    const t = a[n];
                    ke(e, o, i, t.originalHandler, t.delegationSelector);
                  }
                });
              },
              trigger(e, t, n) {
                if (typeof t != "string" || !e) return null;
                const i = nn(),
                  a = fn(t),
                  u = t !== a,
                  d = _n.has(a);
                let o,
                  r = !0,
                  c = !0,
                  l = !1,
                  s = null;
                return (
                  u &&
                    i &&
                    ((o = i.Event(t, n)),
                    i(e).trigger(o),
                    (r = !o.isPropagationStopped()),
                    (c = !o.isImmediatePropagationStopped()),
                    (l = o.isDefaultPrevented())),
                  d
                    ? ((s = document.createEvent("HTMLEvents")),
                      s.initEvent(a, r, !0))
                    : (s = new CustomEvent(t, {
                        bubbles: r,
                        cancelable: !0,
                      })),
                  n !== void 0 &&
                    Object.keys(n).forEach((e) => {
                      Object.defineProperty(s, e, {
                        get: () => n[e],
                      });
                    }),
                  l && s.preventDefault(),
                  c && e.dispatchEvent(s),
                  s.defaultPrevented && o !== void 0 && o.preventDefault(),
                  s
                );
              },
            },
            j = new Map(),
            K = {
              set(e, t, n) {
                j.has(e) || j.set(e, new Map());
                const s = j.get(e);
                s.has(t) || s.size === 0
                  ? s.set(t, n)
                  : console.error(
                      `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                        Array.from(s.keys())[0]
                      }.`
                    );
              },
              get: (e, t) => (j.has(e) && j.get(e).get(t)) || null,
              remove(e, t) {
                if (!j.has(e)) return;
                const n = j.get(e);
                n.delete(t), n.size === 0 && j.delete(e);
              },
            };
          class u {
            constructor(e) {
              (e = w(e)) &&
                ((this._element = e),
                K.set(this._element, this.constructor.DATA_KEY, this));
            }
            dispose() {
              K.remove(this._element, this.constructor.DATA_KEY),
                e.off(this._element, this.constructor.EVENT_KEY),
                Object.getOwnPropertyNames(this).forEach((e) => {
                  this[e] = null;
                });
            }
            _queueCallback(e, t, n = !0) {
              sn(e, t, n);
            }
            static getInstance(e) {
              return K.get(w(e), this.DATA_KEY);
            }
            static getOrCreateInstance(e, t = {}) {
              return (
                this.getInstance(e) ||
                new this(e, typeof t == "object" ? t : null)
              );
            }
            static get VERSION() {
              return "5.1.3";
            }
            static get NAME() {
              throw new Error(
                'You have to implement the static method "NAME", for each component!'
              );
            }
            static get DATA_KEY() {
              return `bs.${this.NAME}`;
            }
            static get EVENT_KEY() {
              return `.${this.DATA_KEY}`;
            }
          }
          const ve = (t, n = "hide") => {
            const o = `click.dismiss${t.EVENT_KEY}`,
              s = t.NAME;
            e.on(document, o, `[data-bs-dismiss="${s}"]`, function (e) {
              if (
                (["A", "AREA"].includes(this.tagName) && e.preventDefault(),
                E(this))
              )
                return;
              const o = b(this) || this.closest(`.${s}`);
              t.getOrCreateInstance(o)[n]();
            });
          };
          class he extends u {
            static get NAME() {
              return "alert";
            }
            close() {
              if (e.trigger(this._element, "close.bs.alert").defaultPrevented)
                return;
              this._element.classList.remove("show");
              const t = this._element.classList.contains("fade");
              this._queueCallback(
                () => this._destroyElement(),
                this._element,
                t
              );
            }
            _destroyElement() {
              this._element.remove(),
                e.trigger(this._element, "closed.bs.alert"),
                this.dispose();
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = he.getOrCreateInstance(this);
                if (typeof e == "string") {
                  if (
                    t[e] === void 0 ||
                    e.startsWith("_") ||
                    e === "constructor"
                  )
                    throw new TypeError(`No method named "${e}"`);
                  t[e](this);
                }
              });
            }
          }
          ve(he, "close"), d(he);
          const un = '[data-bs-toggle="button"]';
          class ge extends u {
            static get NAME() {
              return "button";
            }
            toggle() {
              this._element.setAttribute(
                "aria-pressed",
                this._element.classList.toggle("active")
              );
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = ge.getOrCreateInstance(this);
                e === "toggle" && t[e]();
              });
            }
          }
          function tn(e) {
            return (
              e === "true" ||
              (e !== "false" &&
                (e === Number(e).toString()
                  ? Number(e)
                  : e === "" || e === "null"
                  ? null
                  : e))
            );
          }
          function Le(e) {
            return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
          }
          e.on(document, "click.bs.button.data-api", un, (e) => {
            e.preventDefault();
            const t = e.target.closest(un);
            ge.getOrCreateInstance(t).toggle();
          }),
            d(ge);
          const n = {
              setDataAttribute(e, t, n) {
                e.setAttribute(`data-bs-${Le(t)}`, n);
              },
              removeDataAttribute(e, t) {
                e.removeAttribute(`data-bs-${Le(t)}`);
              },
              getDataAttributes(e) {
                if (!e) return {};
                const t = {};
                return (
                  Object.keys(e.dataset)
                    .filter((e) => e.startsWith("bs"))
                    .forEach((n) => {
                      let s = n.replace(/^bs/, "");
                      (s = s.charAt(0).toLowerCase() + s.slice(1, s.length)),
                        (t[s] = tn(e.dataset[n]));
                    }),
                  t
                );
              },
              getDataAttribute: (e, t) =>
                tn(e.getAttribute(`data-bs-${Le(t)}`)),
              offset(e) {
                const t = e.getBoundingClientRect();
                return {
                  top: t.top + window.pageYOffset,
                  left: t.left + window.pageXOffset,
                };
              },
              position: (e) => ({
                top: e.offsetTop,
                left: e.offsetLeft,
              }),
            },
            t = {
              find: (e, t = document.documentElement) =>
                [].concat(...Element.prototype.querySelectorAll.call(t, e)),
              findOne: (e, t = document.documentElement) =>
                Element.prototype.querySelector.call(t, e),
              children: (e, t) =>
                [].concat(...e.children).filter((e) => e.matches(t)),
              parents(e, t) {
                const s = [];
                let n = e.parentNode;
                for (
                  ;
                  n && n.nodeType === Node.ELEMENT_NODE && n.nodeType !== 3;

                )
                  n.matches(t) && s.push(n), (n = n.parentNode);
                return s;
              },
              prev(e, t) {
                let n = e.previousElementSibling;
                for (; n; ) {
                  if (n.matches(t)) return [n];
                  n = n.previousElementSibling;
                }
                return [];
              },
              next(e, t) {
                let n = e.nextElementSibling;
                for (; n; ) {
                  if (n.matches(t)) return [n];
                  n = n.nextElementSibling;
                }
                return [];
              },
              focusableChildren(e) {
                const t = [
                  "a",
                  "button",
                  "input",
                  "textarea",
                  "select",
                  "details",
                  "[tabindex]",
                  '[contenteditable="true"]',
                ]
                  .map((e) => `${e}:not([tabindex^="-"])`)
                  .join(", ");
                return this.find(t, e).filter((e) => !E(e) && X(e));
              },
            },
            en = "carousel",
            Jt = {
              interval: 5e3,
              keyboard: !0,
              slide: !1,
              pause: "hover",
              wrap: !0,
              touch: !0,
            },
            ks = {
              interval: "(number|boolean)",
              keyboard: "boolean",
              slide: "(boolean|string)",
              pause: "(string|boolean)",
              wrap: "boolean",
              touch: "boolean",
            },
            k = "next",
            x = "prev",
            A = "left",
            W = "right",
            As = {
              ArrowLeft: W,
              ArrowRight: A,
            },
            $t = "slid.bs.carousel",
            F = "active",
            re = ".active.carousel-item";
          class v extends u {
            constructor(e, n) {
              super(e),
                (this._items = null),
                (this._interval = null),
                (this._activeElement = null),
                (this._isPaused = !1),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this.touchStartX = 0),
                (this.touchDeltaX = 0),
                (this._config = this._getConfig(n)),
                (this._indicatorsElement = t.findOne(
                  ".carousel-indicators",
                  this._element
                )),
                (this._touchSupported =
                  "ontouchstart" in document.documentElement ||
                  navigator.maxTouchPoints > 0),
                (this._pointerEvent = Boolean(window.PointerEvent)),
                this._addEventListeners();
            }
            static get Default() {
              return Jt;
            }
            static get NAME() {
              return en;
            }
            next() {
              this._slide(k);
            }
            nextWhenVisible() {
              !document.hidden && X(this._element) && this.next();
            }
            prev() {
              this._slide(x);
            }
            pause(e) {
              e || (this._isPaused = !0),
                t.findOne(
                  ".carousel-item-next, .carousel-item-prev",
                  this._element
                ) && (Dt(this._element), this.cycle(!0)),
                clearInterval(this._interval),
                (this._interval = null);
            }
            cycle(e) {
              e || (this._isPaused = !1),
                this._interval &&
                  (clearInterval(this._interval), (this._interval = null)),
                this._config &&
                  this._config.interval &&
                  !this._isPaused &&
                  (this._updateInterval(),
                  (this._interval = setInterval(
                    (document.visibilityState
                      ? this.nextWhenVisible
                      : this.next
                    ).bind(this),
                    this._config.interval
                  )));
            }
            to(n) {
              this._activeElement = t.findOne(re, this._element);
              const s = this._getItemIndex(this._activeElement);
              if (n > this._items.length - 1 || n < 0) return;
              if (this._isSliding)
                return void e.one(this._element, $t, () => this.to(n));
              if (s === n) return this.pause(), void this.cycle();
              const o = n > s ? k : x;
              this._slide(o, this._items[n]);
            }
            _getConfig(e) {
              return (
                (e = {
                  ...Jt,
                  ...n.getDataAttributes(this._element),
                  ...(typeof e == "object" ? e : {}),
                }),
                p(en, e, ks),
                e
              );
            }
            _handleSwipe() {
              const e = Math.abs(this.touchDeltaX);
              if (e <= 40) return;
              const t = e / this.touchDeltaX;
              (this.touchDeltaX = 0), t && this._slide(t > 0 ? W : A);
            }
            _addEventListeners() {
              this._config.keyboard &&
                e.on(this._element, "keydown.bs.carousel", (e) =>
                  this._keydown(e)
                ),
                this._config.pause === "hover" &&
                  (e.on(this._element, "mouseenter.bs.carousel", (e) =>
                    this.pause(e)
                  ),
                  e.on(this._element, "mouseleave.bs.carousel", (e) =>
                    this.cycle(e)
                  )),
                this._config.touch &&
                  this._touchSupported &&
                  this._addTouchEventListeners();
            }
            _addTouchEventListeners() {
              const n = (e) =>
                  this._pointerEvent &&
                  (e.pointerType === "pen" || e.pointerType === "touch"),
                s = (e) => {
                  n(e)
                    ? (this.touchStartX = e.clientX)
                    : this._pointerEvent ||
                      (this.touchStartX = e.touches[0].clientX);
                },
                i = (e) => {
                  this.touchDeltaX =
                    e.touches && e.touches.length > 1
                      ? 0
                      : e.touches[0].clientX - this.touchStartX;
                },
                o = (e) => {
                  n(e) && (this.touchDeltaX = e.clientX - this.touchStartX),
                    this._handleSwipe(),
                    this._config.pause === "hover" &&
                      (this.pause(),
                      this.touchTimeout && clearTimeout(this.touchTimeout),
                      (this.touchTimeout = setTimeout(
                        (e) => this.cycle(e),
                        500 + this._config.interval
                      )));
                };
              t.find(".carousel-item img", this._element).forEach((t) => {
                e.on(t, "dragstart.bs.carousel", (e) => e.preventDefault());
              }),
                this._pointerEvent
                  ? (e.on(this._element, "pointerdown.bs.carousel", (e) =>
                      s(e)
                    ),
                    e.on(this._element, "pointerup.bs.carousel", (e) => o(e)),
                    this._element.classList.add("pointer-event"))
                  : (e.on(this._element, "touchstart.bs.carousel", (e) => s(e)),
                    e.on(this._element, "touchmove.bs.carousel", (e) => i(e)),
                    e.on(this._element, "touchend.bs.carousel", (e) => o(e)));
            }
            _keydown(e) {
              if (/input|textarea/i.test(e.target.tagName)) return;
              const t = As[e.key];
              t && (e.preventDefault(), this._slide(t));
            }
            _getItemIndex(e) {
              return (
                (this._items =
                  e && e.parentNode
                    ? t.find(".carousel-item", e.parentNode)
                    : []),
                this._items.indexOf(e)
              );
            }
            _getItemByOrder(e, t) {
              const n = e === k;
              return an(this._items, t, n, this._config.wrap);
            }
            _triggerSlideEvent(n, s) {
              const o = this._getItemIndex(n),
                i = this._getItemIndex(t.findOne(re, this._element));
              return e.trigger(this._element, "slide.bs.carousel", {
                relatedTarget: n,
                direction: s,
                from: i,
                to: o,
              });
            }
            _setActiveIndicatorElement(e) {
              if (this._indicatorsElement) {
                const s = t.findOne(".active", this._indicatorsElement);
                s.classList.remove(F), s.removeAttribute("aria-current");
                const n = t.find("[data-bs-target]", this._indicatorsElement);
                for (let t = 0; t < n.length; t++)
                  if (
                    Number.parseInt(
                      n[t].getAttribute("data-bs-slide-to"),
                      10
                    ) === this._getItemIndex(e)
                  ) {
                    n[t].classList.add(F),
                      n[t].setAttribute("aria-current", "true");
                    break;
                  }
              }
            }
            _updateInterval() {
              const e = this._activeElement || t.findOne(re, this._element);
              if (!e) return;
              const n = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
              n
                ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                  (this._config.interval = n))
                : (this._config.interval =
                    this._config.defaultInterval || this._config.interval);
            }
            _slide(n, s) {
              const r = this._directionToOrder(n),
                i = t.findOne(re, this._element),
                m = this._getItemIndex(i),
                o = s || this._getItemByOrder(r, i),
                f = this._getItemIndex(o),
                d = Boolean(this._interval),
                u = r === k,
                a = u ? "carousel-item-start" : "carousel-item-end",
                c = u ? "carousel-item-next" : "carousel-item-prev",
                h = this._orderToDirection(r);
              if (o && o.classList.contains(F))
                return void (this._isSliding = !1);
              if (this._isSliding) return;
              if (this._triggerSlideEvent(o, h).defaultPrevented) return;
              if (!i || !o) return;
              (this._isSliding = !0),
                d && this.pause(),
                this._setActiveIndicatorElement(o),
                (this._activeElement = o);
              const l = () => {
                e.trigger(this._element, $t, {
                  relatedTarget: o,
                  direction: h,
                  from: m,
                  to: f,
                });
              };
              if (this._element.classList.contains("slide")) {
                o.classList.add(c),
                  R(o),
                  i.classList.add(a),
                  o.classList.add(a);
                const e = () => {
                  o.classList.remove(a, c),
                    o.classList.add(F),
                    i.classList.remove(F, c, a),
                    (this._isSliding = !1),
                    setTimeout(l, 0);
                };
                this._queueCallback(e, i, !0);
              } else i.classList.remove(F), o.classList.add(F), (this._isSliding = !1), l();
              d && this.cycle();
            }
            _directionToOrder(e) {
              return [W, A].includes(e)
                ? o()
                  ? e === A
                    ? x
                    : k
                  : e === A
                  ? k
                  : x
                : e;
            }
            _orderToDirection(e) {
              return [k, x].includes(e)
                ? o()
                  ? e === x
                    ? A
                    : W
                  : e === x
                  ? W
                  : A
                : e;
            }
            static carouselInterface(e, t) {
              const n = v.getOrCreateInstance(e, t);
              let { _config: s } = n;
              typeof t == "object" &&
                (s = {
                  ...s,
                  ...t,
                });
              const o = typeof t == "string" ? t : s.slide;
              if (typeof t == "number") n.to(t);
              else if (typeof o == "string") {
                if (n[o] === void 0)
                  throw new TypeError(`No method named "${o}"`);
                n[o]();
              } else s.interval && s.ride && (n.pause(), n.cycle());
            }
            static jQueryInterface(e) {
              return this.each(function () {
                v.carouselInterface(this, e);
              });
            }
            static dataApiClickHandler(e) {
              const t = b(this);
              if (!t || !t.classList.contains("carousel")) return;
              const o = {
                  ...n.getDataAttributes(t),
                  ...n.getDataAttributes(this),
                },
                s = this.getAttribute("data-bs-slide-to");
              s && (o.interval = !1),
                v.carouselInterface(t, o),
                s && v.getInstance(t).to(s),
                e.preventDefault();
            }
          }
          e.on(
            document,
            "click.bs.carousel.data-api",
            "[data-bs-slide], [data-bs-slide-to]",
            v.dataApiClickHandler
          ),
            e.on(window, "load.bs.carousel.data-api", () => {
              const e = t.find('[data-bs-ride="carousel"]');
              for (let t = 0, n = e.length; t < n; t++)
                v.carouselInterface(e[t], v.getInstance(e[t]));
            }),
            d(v);
          const It = "collapse",
            Pt = {
              toggle: !0,
              parent: null,
            },
            zs = {
              toggle: "boolean",
              parent: "(null|element)",
            },
            Je = "show",
            le = "collapse",
            de = "collapsing",
            xt = "collapsed",
            Ot = ":scope .collapse .collapse",
            Re = '[data-bs-toggle="collapse"]';
          class I extends u {
            constructor(e, n) {
              super(e),
                (this._isTransitioning = !1),
                (this._config = this._getConfig(n)),
                (this._triggerArray = []);
              const s = t.find(Re);
              for (let e = 0, i = s.length; e < i; e++) {
                const o = s[e],
                  n = Ge(o),
                  a = t.find(n).filter((e) => e === this._element);
                n !== null &&
                  a.length &&
                  ((this._selector = n), this._triggerArray.push(o));
              }
              this._initializeChildren(),
                this._config.parent ||
                  this._addAriaAndCollapsedClass(
                    this._triggerArray,
                    this._isShown()
                  ),
                this._config.toggle && this.toggle();
            }
            static get Default() {
              return Pt;
            }
            static get NAME() {
              return It;
            }
            toggle() {
              this._isShown() ? this.hide() : this.show();
            }
            show() {
              if (this._isTransitioning || this._isShown()) return;
              let s,
                o = [];
              if (this._config.parent) {
                const e = t.find(Ot, this._config.parent);
                o = t
                  .find(
                    ".collapse.show, .collapse.collapsing",
                    this._config.parent
                  )
                  .filter((t) => !e.includes(t));
              }
              const i = t.findOne(this._selector);
              if (o.length) {
                const e = o.find((e) => i !== e);
                if (
                  ((s = e ? I.getInstance(e) : null), s && s._isTransitioning)
                )
                  return;
              }
              if (e.trigger(this._element, "show.bs.collapse").defaultPrevented)
                return;
              o.forEach((e) => {
                i !== e &&
                  I.getOrCreateInstance(e, {
                    toggle: !1,
                  }).hide(),
                  s || K.set(e, "bs.collapse", null);
              });
              const n = this._getDimension();
              this._element.classList.remove(le),
                this._element.classList.add(de),
                (this._element.style[n] = 0),
                this._addAriaAndCollapsedClass(this._triggerArray, !0),
                (this._isTransitioning = !0);
              const a = `scroll${n[0].toUpperCase() + n.slice(1)}`;
              this._queueCallback(
                () => {
                  (this._isTransitioning = !1),
                    this._element.classList.remove(de),
                    this._element.classList.add(le, Je),
                    (this._element.style[n] = ""),
                    e.trigger(this._element, "shown.bs.collapse");
                },
                this._element,
                !0
              ),
                (this._element.style[n] = `${this._element[a]}px`);
            }
            hide() {
              if (this._isTransitioning || !this._isShown()) return;
              if (e.trigger(this._element, "hide.bs.collapse").defaultPrevented)
                return;
              const t = this._getDimension();
              (this._element.style[t] = `${
                this._element.getBoundingClientRect()[t]
              }px`),
                R(this._element),
                this._element.classList.add(de),
                this._element.classList.remove(le, Je);
              const n = this._triggerArray.length;
              for (let e = 0; e < n; e++) {
                const t = this._triggerArray[e],
                  s = b(t);
                s &&
                  !this._isShown(s) &&
                  this._addAriaAndCollapsedClass([t], !1);
              }
              (this._isTransitioning = !0),
                (this._element.style[t] = ""),
                this._queueCallback(
                  () => {
                    (this._isTransitioning = !1),
                      this._element.classList.remove(de),
                      this._element.classList.add(le),
                      e.trigger(this._element, "hidden.bs.collapse");
                  },
                  this._element,
                  !0
                );
            }
            _isShown(e = this._element) {
              return e.classList.contains(Je);
            }
            _getConfig(e) {
              return (
                ((e = {
                  ...Pt,
                  ...n.getDataAttributes(this._element),
                  ...e,
                }).toggle = Boolean(e.toggle)),
                (e.parent = w(e.parent)),
                p(It, e, zs),
                e
              );
            }
            _getDimension() {
              return this._element.classList.contains("collapse-horizontal")
                ? "width"
                : "height";
            }
            _initializeChildren() {
              if (!this._config.parent) return;
              const e = t.find(Ot, this._config.parent);
              t.find(Re, this._config.parent)
                .filter((t) => !e.includes(t))
                .forEach((e) => {
                  const t = b(e);
                  t && this._addAriaAndCollapsedClass([e], this._isShown(t));
                });
            }
            _addAriaAndCollapsedClass(e, t) {
              e.length &&
                e.forEach((e) => {
                  t ? e.classList.remove(xt) : e.classList.add(xt),
                    e.setAttribute("aria-expanded", t);
                });
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = {};
                typeof e == "string" && /show|hide/.test(e) && (t.toggle = !1);
                const n = I.getOrCreateInstance(this, t);
                if (typeof e == "string") {
                  if (n[e] === void 0)
                    throw new TypeError(`No method named "${e}"`);
                  n[e]();
                }
              });
            }
          }
          e.on(document, "click.bs.collapse.data-api", Re, function (e) {
            (e.target.tagName === "A" ||
              (e.delegateTarget && e.delegateTarget.tagName === "A")) &&
              e.preventDefault();
            const n = Ge(this);
            t.find(n).forEach((e) => {
              I.getOrCreateInstance(e, {
                toggle: !1,
              }).toggle();
            });
          }),
            d(I);
          var Y,
            s = "top",
            a = "bottom",
            r = "right",
            i = "left",
            je = "auto",
            $ = [s, a, r, i],
            M = "start",
            T = "end",
            _t = "clippingParents",
            xe = "viewport",
            z = "popper",
            yt = "reference",
            ze = $.reduce(function (e, t) {
              return e.concat([t + "-" + M, t + "-" + T]);
            }, []),
            Ae = [].concat($, [je]).reduce(function (e, t) {
              return e.concat([t, t + "-" + M, t + "-" + T]);
            }, []),
            jt = "beforeRead",
            bt = "read",
            gt = "afterRead",
            ft = "beforeMain",
            mt = "main",
            ht = "afterMain",
            lt = "beforeWrite",
            it = "write",
            ot = "afterWrite",
            st = [jt, bt, gt, ft, mt, ht, lt, it, ot],
            dt,
            pt,
            vt,
            Ke;
          function f(e) {
            return e ? (e.nodeName || "").toLowerCase() : null;
          }
          function h(e) {
            if (e == null) return window;
            if (e.toString() !== "[object Window]") {
              var t = e.ownerDocument;
              return (t && t.defaultView) || window;
            }
            return e;
          }
          function ee(e) {
            return e instanceof h(e).Element || e instanceof Element;
          }
          function l(e) {
            return e instanceof h(e).HTMLElement || e instanceof HTMLElement;
          }
          function nt(e) {
            return (
              typeof ShadowRoot != "undefined" &&
              (e instanceof h(e).ShadowRoot || e instanceof ShadowRoot)
            );
          }
          const We = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function (e) {
              var t = e.state;
              Object.keys(t.elements).forEach(function (e) {
                var o = t.styles[e] || {},
                  s = t.attributes[e] || {},
                  n = t.elements[e];
                l(n) &&
                  f(n) &&
                  (Object.assign(n.style, o),
                  Object.keys(s).forEach(function (e) {
                    var t = s[e];
                    t === !1
                      ? n.removeAttribute(e)
                      : n.setAttribute(e, t === !0 ? "" : t);
                  }));
              });
            },
            effect: function (e) {
              var t = e.state,
                n = {
                  popper: {
                    position: t.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0",
                  },
                  arrow: {
                    position: "absolute",
                  },
                  reference: {},
                };
              return (
                Object.assign(t.elements.popper.style, n.popper),
                (t.styles = n),
                t.elements.arrow &&
                  Object.assign(t.elements.arrow.style, n.arrow),
                function () {
                  Object.keys(t.elements).forEach(function (e) {
                    var s = t.elements[e],
                      o = t.attributes[e] || {},
                      i = Object.keys(
                        t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
                      ).reduce(function (e, t) {
                        return (e[t] = ""), e;
                      }, {});
                    l(s) &&
                      f(s) &&
                      (Object.assign(s.style, i),
                      Object.keys(o).forEach(function (e) {
                        s.removeAttribute(e);
                      }));
                  });
                }
              );
            },
            requires: ["computeStyles"],
          };
          function m(e) {
            return e.split("-")[0];
          }
          function L(e) {
            var n = e.getBoundingClientRect();
            return {
              width: n.width / 1,
              height: n.height / 1,
              top: n.top / 1,
              right: n.right / 1,
              bottom: n.bottom / 1,
              left: n.left / 1,
              x: n.left / 1,
              y: n.top / 1,
            };
          }
          function qe(e) {
            var t = L(e),
              n = e.offsetWidth,
              s = e.offsetHeight;
            return (
              Math.abs(t.width - n) <= 1 && (n = t.width),
              Math.abs(t.height - s) <= 1 && (s = t.height),
              {
                x: e.offsetLeft,
                y: e.offsetTop,
                width: n,
                height: s,
              }
            );
          }
          function tt(e, t) {
            var n,
              s = t.getRootNode && t.getRootNode();
            if (e.contains(t)) return !0;
            if (s && nt(s)) {
              n = t;
              do {
                if (n && e.isSameNode(n)) return !0;
                n = n.parentNode || n.host;
              } while (n);
            }
            return !1;
          }
          function g(e) {
            return h(e).getComputedStyle(e);
          }
          function Ls(e) {
            return ["table", "td", "th"].indexOf(f(e)) >= 0;
          }
          function y(e) {
            return (
              (ee(e) ? e.ownerDocument : e.document) || window.document
            ).documentElement;
          }
          function _e(e) {
            return f(e) === "html"
              ? e
              : e.assignedSlot ||
                  e.parentNode ||
                  (nt(e) ? e.host : null) ||
                  y(e);
          }
          function Kn(e) {
            return l(e) && g(e).position !== "fixed" ? e.offsetParent : null;
          }
          function Z(e) {
            for (
              var n = h(e), t = Kn(e);
              t && Ls(t) && g(t).position === "static";

            )
              t = Kn(t);
            return t &&
              (f(t) === "html" ||
                (f(t) === "body" && g(t).position === "static"))
              ? n
              : t ||
                  (function (e) {
                    var t,
                      n,
                      s =
                        navigator.userAgent.toLowerCase().indexOf("firefox") !==
                        -1;
                    if (
                      navigator.userAgent.indexOf("Trident") !== -1 &&
                      l(e) &&
                      g(e).position === "fixed"
                    )
                      return null;
                    for (
                      n = _e(e);
                      l(n) && ["html", "body"].indexOf(f(n)) < 0;

                    ) {
                      if (
                        ((t = g(n)),
                        t.transform !== "none" ||
                          t.perspective !== "none" ||
                          t.contain === "paint" ||
                          ["transform", "perspective"].indexOf(t.willChange) !==
                            -1 ||
                          (s && t.willChange === "filter") ||
                          (s && t.filter && t.filter !== "none"))
                      )
                        return n;
                      n = n.parentNode;
                    }
                    return null;
                  })(e) ||
                  n;
          }
          function Ye(e) {
            return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
          }
          var _ = Math.max,
            G = Math.min,
            me = Math.round;
          function fe(e, t, n) {
            return _(e, G(t, n));
          }
          function at(e) {
            return Object.assign(
              {},
              {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
              e
            );
          }
          function rt(e, t) {
            return t.reduce(function (t, n) {
              return (t[n] = e), t;
            }, {});
          }
          const ct = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function (e) {
              var c,
                t = e.state,
                k = e.name,
                E = e.options,
                l = t.elements.arrow,
                d = t.modifiersData.popperOffsets,
                h = m(t.placement),
                n = Ye(h),
                o = [i, r].indexOf(h) >= 0 ? "height" : "width";
              if (l && d) {
                var p = (function (e, t) {
                    return at(
                      typeof (e =
                        typeof e == "function"
                          ? e(
                              Object.assign({}, t.rects, {
                                placement: t.placement,
                              })
                            )
                          : e) != "number"
                        ? e
                        : rt(e, $)
                    );
                  })(E.padding, t),
                  g = qe(l),
                  j = n === "y" ? s : i,
                  w = n === "y" ? a : r,
                  _ =
                    t.rects.reference[o] +
                    t.rects.reference[n] -
                    d[n] -
                    t.rects.popper[o],
                  y = d[n] - t.rects.reference[n],
                  u = Z(l),
                  b = u
                    ? n === "y"
                      ? u.clientHeight || 0
                      : u.clientWidth || 0
                    : 0,
                  O = _ / 2 - y / 2,
                  x = p[j],
                  C = b - g[o] - p[w],
                  f = b / 2 - g[o] / 2 + O,
                  v = fe(x, f, C),
                  A = n;
                t.modifiersData[k] =
                  (((c = {})[A] = v), (c.centerOffset = v - f), c);
              }
            },
            effect: function (e) {
              var n = e.state,
                s = e.options.element,
                t = s === void 0 ? "[data-popper-arrow]" : s;
              t != null &&
                (typeof t != "string" ||
                  (t = n.elements.popper.querySelector(t))) &&
                tt(n.elements.popper, t) &&
                (n.elements.arrow = t);
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"],
          };
          function P(e) {
            return e.split("-")[1];
          }
          dt = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto",
          };
          function ut(e) {
            var d,
              u,
              j,
              f = e.popper,
              k = e.popperRect,
              n = e.placement,
              w = e.variation,
              l = e.offsets,
              x = e.position,
              m = e.gpuAcceleration,
              M = e.adaptive,
              p = e.roundOffsets,
              E =
                p === !0
                  ? (function (e) {
                      var n = e.x,
                        s = e.y,
                        t = window.devicePixelRatio || 1;
                      return {
                        x: me(me(n * t) / t) || 0,
                        y: me(me(s * t) / t) || 0,
                      };
                    })(l)
                  : typeof p == "function"
                  ? p(l)
                  : l,
              C = E.x,
              o = C === void 0 ? 0 : C,
              _ = E.y,
              c = _ === void 0 ? 0 : _,
              O = l.hasOwnProperty("x"),
              F = l.hasOwnProperty("y"),
              b = i,
              v = s,
              z = window;
            if (M) {
              var t = Z(f),
                A = "clientHeight",
                S = "clientWidth";
              t === h(f) &&
                g((t = y(f))).position !== "static" &&
                x === "absolute" &&
                ((A = "scrollHeight"), (S = "scrollWidth")),
                (t = t),
                (n !== s && ((n !== i && n !== r) || w !== T)) ||
                  ((v = a), (c -= t[A] - k.height), (c *= m ? 1 : -1)),
                (n !== i && ((n !== s && n !== a) || w !== T)) ||
                  ((b = r), (o -= t[S] - k.width), (o *= m ? 1 : -1));
            }
            return (
              (j = Object.assign(
                {
                  position: x,
                },
                M && dt
              )),
              m
                ? Object.assign(
                    {},
                    j,
                    (((d = {})[v] = F ? "0" : ""),
                    (d[b] = O ? "0" : ""),
                    (d.transform =
                      (z.devicePixelRatio || 1) <= 1
                        ? "translate(" + o + "px, " + c + "px)"
                        : "translate3d(" + o + "px, " + c + "px, 0)"),
                    d)
                  )
                : Object.assign(
                    {},
                    j,
                    (((u = {})[v] = F ? c + "px" : ""),
                    (u[b] = O ? o + "px" : ""),
                    (u.transform = ""),
                    u)
                  )
            );
          }
          const De = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function (e) {
              var t = e.state,
                n = e.options,
                s = n.gpuAcceleration,
                c = s === void 0 || s,
                o = n.adaptive,
                l = o === void 0 || o,
                i = n.roundOffsets,
                a = i === void 0 || i,
                r = {
                  placement: m(t.placement),
                  variation: P(t.placement),
                  popper: t.elements.popper,
                  popperRect: t.rects.popper,
                  gpuAcceleration: c,
                };
              t.modifiersData.popperOffsets != null &&
                (t.styles.popper = Object.assign(
                  {},
                  t.styles.popper,
                  ut(
                    Object.assign({}, r, {
                      offsets: t.modifiersData.popperOffsets,
                      position: t.options.strategy,
                      adaptive: l,
                      roundOffsets: a,
                    })
                  )
                )),
                t.modifiersData.arrow != null &&
                  (t.styles.arrow = Object.assign(
                    {},
                    t.styles.arrow,
                    ut(
                      Object.assign({}, r, {
                        offsets: t.modifiersData.arrow,
                        position: "absolute",
                        adaptive: !1,
                        roundOffsets: a,
                      })
                    )
                  )),
                (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                  "data-popper-placement": t.placement,
                }));
            },
            data: {},
          };
          Y = {
            passive: !0,
          };
          const Te = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function () {},
            effect: function (e) {
              var n = e.state,
                t = e.instance,
                s = e.options,
                o = s.scroll,
                i = o === void 0 || o,
                a = s.resize,
                r = a === void 0 || a,
                c = h(n.elements.popper),
                l = [].concat(
                  n.scrollParents.reference,
                  n.scrollParents.popper
                );
              return (
                i &&
                  l.forEach(function (e) {
                    e.addEventListener("scroll", t.update, Y);
                  }),
                r && c.addEventListener("resize", t.update, Y),
                function () {
                  i &&
                    l.forEach(function (e) {
                      e.removeEventListener("scroll", t.update, Y);
                    }),
                    r && c.removeEventListener("resize", t.update, Y);
                }
              );
            },
            data: {},
          };
          pt = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom",
          };
          function pe(e) {
            return e.replace(/left|right|bottom|top/g, function (e) {
              return pt[e];
            });
          }
          vt = {
            start: "end",
            end: "start",
          };
          function Gt(e) {
            return e.replace(/start|end/g, function (e) {
              return vt[e];
            });
          }
          function Se(e) {
            var t = h(e);
            return {
              scrollLeft: t.pageXOffset,
              scrollTop: t.pageYOffset,
            };
          }
          function Ee(e) {
            return L(y(e)).left + Se(e).scrollLeft;
          }
          function Oe(e) {
            var t = g(e),
              n = t.overflow,
              s = t.overflowX,
              o = t.overflowY;
            return /auto|scroll|overlay|hidden/.test(n + o + s);
          }
          function wt(e) {
            return ["html", "body", "#document"].indexOf(f(e)) >= 0
              ? e.ownerDocument.body
              : l(e) && Oe(e)
              ? e
              : wt(_e(e));
          }
          function te(e, t) {
            t === void 0 && (t = []);
            var s,
              n = wt(e),
              o = n === ((s = e.ownerDocument) == null ? void 0 : s.body),
              i = h(n),
              a = o ? [i].concat(i.visualViewport || [], Oe(n) ? n : []) : n,
              r = t.concat(a);
            return o ? r : r.concat(te(_e(a)));
          }
          function Pe(e) {
            return Object.assign({}, e, {
              left: e.x,
              top: e.y,
              right: e.x + e.width,
              bottom: e.y + e.height,
            });
          }
          function Ct(e, t) {
            return t === xe
              ? Pe(
                  (function (e) {
                    var r = h(e),
                      s = y(e),
                      t = r.visualViewport,
                      o = s.clientWidth,
                      i = s.clientHeight,
                      a = 0,
                      n = 0;
                    return (
                      t &&
                        ((o = t.width),
                        (i = t.height),
                        /^((?!chrome|android).)*safari/i.test(
                          navigator.userAgent
                        ) || ((a = t.offsetLeft), (n = t.offsetTop))),
                      {
                        width: o,
                        height: i,
                        x: a + Ee(e),
                        y: n,
                      }
                    );
                  })(e)
                )
              : l(t)
              ? (function (e) {
                  var t = L(e);
                  return (
                    (t.top = t.top + e.clientTop),
                    (t.left = t.left + e.clientLeft),
                    (t.bottom = t.top + e.clientHeight),
                    (t.right = t.left + e.clientWidth),
                    (t.width = e.clientWidth),
                    (t.height = e.clientHeight),
                    (t.x = t.left),
                    (t.y = t.top),
                    t
                  );
                })(t)
              : Pe(
                  (function (e) {
                    var s,
                      n = y(e),
                      o = Se(e),
                      t = (s = e.ownerDocument) == null ? void 0 : s.body,
                      i = _(
                        n.scrollWidth,
                        n.clientWidth,
                        t ? t.scrollWidth : 0,
                        t ? t.clientWidth : 0
                      ),
                      r = _(
                        n.scrollHeight,
                        n.clientHeight,
                        t ? t.scrollHeight : 0,
                        t ? t.clientHeight : 0
                      ),
                      a = -o.scrollLeft + Ee(e),
                      c = -o.scrollTop;
                    return (
                      g(t || n).direction === "rtl" &&
                        (a += _(n.clientWidth, t ? t.clientWidth : 0) - i),
                      {
                        width: i,
                        height: r,
                        x: a,
                        y: c,
                      }
                    );
                  })(y(e))
                );
          }
          function Et(e) {
            var n,
              o,
              l,
              t = e.reference,
              c = e.element,
              d = e.placement,
              u = d ? m(d) : null,
              p = d ? P(d) : null,
              h = t.x + t.width / 2 - c.width / 2,
              f = t.y + t.height / 2 - c.height / 2;
            switch (u) {
              case s:
                n = {
                  x: h,
                  y: t.y - c.height,
                };
                break;
              case a:
                n = {
                  x: h,
                  y: t.y + t.height,
                };
                break;
              case r:
                n = {
                  x: t.x + t.width,
                  y: f,
                };
                break;
              case i:
                n = {
                  x: t.x - c.width,
                  y: f,
                };
                break;
              default:
                n = {
                  x: t.x,
                  y: t.y,
                };
            }
            if (((o = u ? Ye(u) : null), o != null))
              switch (((l = o === "y" ? "height" : "width"), p)) {
                case M:
                  n[o] = n[o] - (t[l] / 2 - c[l] / 2);
                  break;
                case T:
                  n[o] = n[o] + (t[l] / 2 - c[l] / 2);
              }
            return n;
          }
          function N(e, t) {
            t === void 0 && (t = {});
            var A,
              n = t,
              w = n.placement,
              x = w === void 0 ? e.placement : w,
              k = n.boundary,
              N = k === void 0 ? _t : k,
              O = n.rootBoundary,
              T = O === void 0 ? xe : O,
              E = n.elementContext,
              d = E === void 0 ? z : E,
              v = n.altBoundary,
              D = v !== void 0 && v,
              j = n.padding,
              m = j === void 0 ? 0 : j,
              c = at(typeof m != "number" ? m : rt(m, $)),
              F = d === z ? yt : z,
              C = e.rects.popper,
              h = e.elements[D ? F : d],
              i = (function (e, t, n) {
                var i =
                    t === "clippingParents"
                      ? (function (e) {
                          var n = te(_e(e)),
                            t =
                              ["absolute", "fixed"].indexOf(g(e).position) >=
                                0 && l(e)
                                ? Z(e)
                                : e;
                          return ee(t)
                            ? n.filter(function (e) {
                                return ee(e) && tt(e, t) && f(e) !== "body";
                              })
                            : [];
                        })(e)
                      : [].concat(t),
                  o = [].concat(i, [n]),
                  a = o[0],
                  s = o.reduce(function (t, n) {
                    var s = Ct(e, n);
                    return (
                      (t.top = _(s.top, t.top)),
                      (t.right = G(s.right, t.right)),
                      (t.bottom = G(s.bottom, t.bottom)),
                      (t.left = _(s.left, t.left)),
                      t
                    );
                  }, Ct(e, a));
                return (
                  (s.width = s.right - s.left),
                  (s.height = s.bottom - s.top),
                  (s.x = s.left),
                  (s.y = s.top),
                  s
                );
              })(ee(h) ? h : h.contextElement || y(e.elements.popper), N, T),
              p = L(e.elements.reference),
              S = Et({
                reference: p,
                element: C,
                strategy: "absolute",
                placement: x,
              }),
              M = Pe(Object.assign({}, C, S)),
              o = d === z ? M : p,
              u = {
                top: i.top - o.top + c.top,
                bottom: o.bottom - i.bottom + c.bottom,
                left: i.left - o.left + c.left,
                right: o.right - i.right + c.right,
              },
              b = e.modifiersData.offset;
            return (
              d === z &&
                b &&
                ((A = b[x]),
                Object.keys(u).forEach(function (e) {
                  var t = [r, a].indexOf(e) >= 0 ? 1 : -1,
                    n = [s, a].indexOf(e) >= 0 ? "y" : "x";
                  u[e] += A[n] * t;
                })),
              u
            );
          }
          function Ds(e, t) {
            t === void 0 && (t = {});
            var s,
              n = t,
              c = n.placement,
              d = n.boundary,
              u = n.rootBoundary,
              h = n.padding,
              f = n.flipVariations,
              r = n.allowedAutoPlacements,
              l = r === void 0 ? Ae : r,
              i = P(c),
              a = i
                ? f
                  ? ze
                  : ze.filter(function (e) {
                      return P(e) === i;
                    })
                : $,
              o = a.filter(function (e) {
                return l.indexOf(e) >= 0;
              });
            return (
              o.length === 0 && (o = a),
              (s = o.reduce(function (t, n) {
                return (
                  (t[n] = N(e, {
                    placement: n,
                    boundary: d,
                    rootBoundary: u,
                    padding: h,
                  })[m(n)]),
                  t
                );
              }, {})),
              Object.keys(s).sort(function (e, t) {
                return s[e] - s[t];
              })
            );
          }
          const St = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function (e) {
              var t = e.state,
                n = e.options,
                y = e.name;
              if (!t.modifiersData[y]._skip) {
                for (
                  var o,
                    f,
                    _,
                    w,
                    b = n.mainAxis,
                    D = b === void 0 || b,
                    S = n.altAxis,
                    W = S === void 0 || S,
                    B = n.fallbackPlacements,
                    z = n.padding,
                    A = n.boundary,
                    O = n.rootBoundary,
                    $ = n.altBoundary,
                    j = n.flipVariations,
                    p = j === void 0 || j,
                    V = n.allowedAutoPlacements,
                    l = t.options.placement,
                    I = m(l),
                    H =
                      B ||
                      (I !== l && p
                        ? (function (e) {
                            if (m(e) === je) return [];
                            var t = pe(e);
                            return [Gt(e), t, Gt(t)];
                          })(l)
                        : [pe(l)]),
                    h = [l].concat(H).reduce(function (e, n) {
                      return e.concat(
                        m(n) === je
                          ? Ds(t, {
                              placement: n,
                              boundary: A,
                              rootBoundary: O,
                              padding: z,
                              flipVariations: p,
                              allowedAutoPlacements: V,
                            })
                          : n
                      );
                    }, []),
                    R = t.rects.reference,
                    L = t.rects.popper,
                    k = new Map(),
                    T = !0,
                    u = h[0],
                    v = 0;
                  v < h.length;
                  v++
                ) {
                  var c = h[v],
                    F = m(c),
                    E = P(c) === M,
                    C = [s, a].indexOf(F) >= 0,
                    x = C ? "width" : "height",
                    g = N(t, {
                      placement: c,
                      boundary: A,
                      rootBoundary: O,
                      altBoundary: $,
                      padding: z,
                    }),
                    d = C ? (E ? r : i) : E ? a : s;
                  if (
                    (R[x] > L[x] && (d = pe(d)),
                    (_ = pe(d)),
                    (o = []),
                    D && o.push(g[F] <= 0),
                    W && o.push(g[d] <= 0, g[_] <= 0),
                    o.every(function (e) {
                      return e;
                    }))
                  ) {
                    (u = c), (T = !1);
                    break;
                  }
                  k.set(c, o);
                }
                if (T)
                  for (
                    w = function (e) {
                      var t = h.find(function (t) {
                        var n = k.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (u = t), "break";
                    },
                      f = p ? 3 : 1;
                    f > 0 && w(f) !== "break";
                    f--
                  );
                t.placement !== u &&
                  ((t.modifiersData[y]._skip = !0),
                  (t.placement = u),
                  (t.reset = !0));
              }
            },
            requiresIfExists: ["offset"],
            data: {
              _skip: !1,
            },
          };
          function Mt(e, t, n) {
            return (
              n === void 0 &&
                (n = {
                  x: 0,
                  y: 0,
                }),
              {
                top: e.top - t.height - n.y,
                right: e.right - t.width + n.x,
                bottom: e.bottom - t.height + n.y,
                left: e.left - t.width - n.x,
              }
            );
          }
          function Ft(e) {
            return [s, r, a, i].some(function (t) {
              return e[t] >= 0;
            });
          }
          const Tt = {
              name: "hide",
              enabled: !0,
              phase: "main",
              requiresIfExists: ["preventOverflow"],
              fn: function (e) {
                var t = e.state,
                  c = e.name,
                  l = t.rects.reference,
                  d = t.rects.popper,
                  u = t.modifiersData.preventOverflow,
                  a = N(t, {
                    elementContext: "reference",
                  }),
                  r = N(t, {
                    altBoundary: !0,
                  }),
                  n = Mt(a, l),
                  s = Mt(r, d, u),
                  o = Ft(n),
                  i = Ft(s);
                (t.modifiersData[c] = {
                  referenceClippingOffsets: n,
                  popperEscapeOffsets: s,
                  isReferenceHidden: o,
                  hasPopperEscaped: i,
                }),
                  (t.attributes.popper = Object.assign(
                    {},
                    t.attributes.popper,
                    {
                      "data-popper-reference-hidden": o,
                      "data-popper-escaped": i,
                    }
                  ));
              },
            },
            zt = {
              name: "offset",
              enabled: !0,
              phase: "main",
              requires: ["popperOffsets"],
              fn: function (e) {
                var t = e.state,
                  c = e.options,
                  l = e.name,
                  n = c.offset,
                  d = n === void 0 ? [0, 0] : n,
                  o = Ae.reduce(function (e, n) {
                    return (
                      (e[n] = (function (e, t, n) {
                        var c = m(e),
                          d = [i, s].indexOf(c) >= 0 ? -1 : 1,
                          l =
                            typeof n == "function"
                              ? n(
                                  Object.assign({}, t, {
                                    placement: e,
                                  })
                                )
                              : n,
                          o = l[0],
                          a = l[1];
                        return (
                          (o = o || 0),
                          (a = (a || 0) * d),
                          [i, r].indexOf(c) >= 0
                            ? {
                                x: a,
                                y: o,
                              }
                            : {
                                x: o,
                                y: a,
                              }
                        );
                      })(n, t.rects, d)),
                      e
                    );
                  }, {}),
                  a = o[t.placement],
                  u = a.x,
                  h = a.y;
                t.modifiersData.popperOffsets != null &&
                  ((t.modifiersData.popperOffsets.x += u),
                  (t.modifiersData.popperOffsets.y += h)),
                  (t.modifiersData[l] = o);
              },
            },
            Ue = {
              name: "popperOffsets",
              enabled: !0,
              phase: "read",
              fn: function (e) {
                var t = e.state,
                  n = e.name;
                t.modifiersData[n] = Et({
                  reference: t.rects.reference,
                  element: t.rects.popper,
                  strategy: "absolute",
                  placement: t.placement,
                });
              },
              data: {},
            },
            Nt = {
              name: "preventOverflow",
              enabled: !0,
              phase: "main",
              fn: function (e) {
                var v,
                  t = e.state,
                  l = e.options,
                  ue = e.name,
                  W = l.mainAxis,
                  R = W === void 0 || W,
                  L = l.altAxis,
                  S = L !== void 0 && L,
                  de = l.boundary,
                  le = l.rootBoundary,
                  ae = l.altBoundary,
                  J = l.padding,
                  F = l.tether,
                  d = F === void 0 || F,
                  A = l.tetherOffset,
                  y = A === void 0 ? 0 : A,
                  p = N(t, {
                    boundary: de,
                    rootBoundary: le,
                    padding: J,
                    altBoundary: ae,
                  }),
                  oe = m(t.placement),
                  x = P(t.placement),
                  E = !x,
                  n = Ye(oe),
                  O = n === "x" ? "y" : "x",
                  o = t.modifiersData.popperOffsets,
                  u = t.rects.reference,
                  b = t.rects.popper,
                  g =
                    typeof y == "function"
                      ? y(
                          Object.assign({}, t.rects, {
                            placement: t.placement,
                          })
                        )
                      : y,
                  j = {
                    x: 0,
                    y: 0,
                  };
                if (o) {
                  if (R || S) {
                    var D = n === "y" ? s : i,
                      X = n === "y" ? a : r,
                      c = n === "y" ? "height" : "width",
                      H = o[n],
                      I = o[n] + p[D],
                      B = o[n] - p[X],
                      V = d ? -b[c] / 2 : 0,
                      se = x === M ? u[c] : b[c],
                      te = x === M ? -b[c] : -u[c],
                      U = t.elements.arrow,
                      he =
                        d && U
                          ? qe(U)
                          : {
                              width: 0,
                              height: 0,
                            },
                      q = t.modifiersData["arrow#persistent"]
                        ? t.modifiersData["arrow#persistent"].padding
                        : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                          },
                      Y = q[D],
                      C = q[X],
                      h = fe(0, u[c], he[c]),
                      ie = E ? u[c] / 2 - V - h - Y - g : se - h - Y - g,
                      ee = E ? -u[c] / 2 + V + h + C + g : te + h + C + g,
                      w = t.elements.arrow && Z(t.elements.arrow),
                      ne = w
                        ? n === "y"
                          ? w.clientTop || 0
                          : w.clientLeft || 0
                        : 0,
                      $ = t.modifiersData.offset
                        ? t.modifiersData.offset[t.placement][n]
                        : 0,
                      k = o[n] + ie - $ - ne,
                      T = o[n] + ee - $;
                    if (
                      (R &&
                        ((v = fe(d ? G(I, k) : I, H, d ? _(B, T) : B)),
                        (o[n] = v),
                        (j[n] = v - H)),
                      S)
                    ) {
                      var re = n === "x" ? s : i,
                        ce = n === "x" ? a : r,
                        f = o[O],
                        z = f + p[re],
                        K = f - p[ce],
                        Q = fe(d ? G(z, k) : z, f, d ? _(K, T) : K);
                      (o[O] = Q), (j[O] = Q - f);
                    }
                  }
                  t.modifiersData[ue] = j;
                }
              },
              requiresIfExists: ["offset"],
            };
          function Rs(e, t, n) {
            n === void 0 && (n = !1),
              (c = l(t)),
              l(t) &&
                (function (e) {
                  var t = e.getBoundingClientRect();
                  t.width, e.offsetWidth, t.height, e.offsetHeight;
                })(t);
            var o,
              c,
              d,
              a = y(t),
              i = L(e),
              r = {
                scrollLeft: 0,
                scrollTop: 0,
              },
              s = {
                x: 0,
                y: 0,
              };
            return (
              (c || (!c && !n)) &&
                ((f(t) !== "body" || Oe(a)) &&
                  (r =
                    (o = t) !== h(o) && l(o)
                      ? {
                          scrollLeft: (d = o).scrollLeft,
                          scrollTop: d.scrollTop,
                        }
                      : Se(o)),
                l(t)
                  ? (((s = L(t)).x += t.clientLeft), (s.y += t.clientTop))
                  : a && (s.x = Ee(a))),
              {
                x: i.left + r.scrollLeft - s.x,
                y: i.top + r.scrollTop - s.y,
                width: i.width,
                height: i.height,
              }
            );
          }
          function Fs(e) {
            var n = new Map(),
              t = new Set(),
              s = [];
            function o(e) {
              t.add(e.name),
                []
                  .concat(e.requires || [], e.requiresIfExists || [])
                  .forEach(function (e) {
                    if (!t.has(e)) {
                      var s = n.get(e);
                      s && o(s);
                    }
                  }),
                s.push(e);
            }
            return (
              e.forEach(function (e) {
                n.set(e.name, e);
              }),
              e.forEach(function (e) {
                t.has(e.name) || o(e);
              }),
              s
            );
          }
          Ke = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute",
          };
          function Ht() {
            for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++)
              n[e] = arguments[e];
            return !n.some(function (e) {
              return !e || typeof e.getBoundingClientRect != "function";
            });
          }
          function ie(e) {
            e === void 0 && (e = {});
            var n = e,
              s = n.defaultModifiers,
              i = s === void 0 ? [] : s,
              o = n.defaultOptions,
              t = o === void 0 ? Ke : o;
            return function (e, n, s) {
              s === void 0 && (s = t);
              var r,
                d,
                o = {
                  placement: "bottom",
                  orderedModifiers: [],
                  options: Object.assign({}, Ke, t),
                  modifiersData: {},
                  elements: {
                    reference: e,
                    popper: n,
                  },
                  attributes: {},
                  styles: {},
                },
                c = [],
                l = !1,
                a = {
                  state: o,
                  setOptions: function (s) {
                    var r,
                      l,
                      d,
                      h = typeof s == "function" ? s(o.options) : s;
                    return (
                      u(),
                      (o.options = Object.assign({}, t, o.options, h)),
                      (o.scrollParents = {
                        reference: ee(e)
                          ? te(e)
                          : e.contextElement
                          ? te(e.contextElement)
                          : [],
                        popper: te(n),
                      }),
                      (d = (function (e) {
                        var t = Fs(e);
                        return st.reduce(function (e, n) {
                          return e.concat(
                            t.filter(function (e) {
                              return e.phase === n;
                            })
                          );
                        }, []);
                      })(
                        ((l = [].concat(i, o.options.modifiers)),
                        (r = l.reduce(function (e, t) {
                          var n = e[t.name];
                          return (
                            (e[t.name] = n
                              ? Object.assign({}, n, t, {
                                  options: Object.assign(
                                    {},
                                    n.options,
                                    t.options
                                  ),
                                  data: Object.assign({}, n.data, t.data),
                                })
                              : t),
                            e
                          );
                        }, {})),
                        Object.keys(r).map(function (e) {
                          return r[e];
                        }))
                      )),
                      (o.orderedModifiers = d.filter(function (e) {
                        return e.enabled;
                      })),
                      o.orderedModifiers.forEach(function (e) {
                        var s,
                          i = e.name,
                          t = e.options,
                          r = t === void 0 ? {} : t,
                          n = e.effect;
                        typeof n == "function" &&
                          ((s = n({
                            state: o,
                            name: i,
                            instance: a,
                            options: r,
                          })),
                          c.push(s || function () {}));
                      }),
                      a.update()
                    );
                  },
                  forceUpdate: function () {
                    if (!l) {
                      var s = o.elements,
                        i = s.reference,
                        t = s.popper;
                      if (Ht(i, t)) {
                        (o.rects = {
                          reference: Rs(
                            i,
                            Z(t),
                            o.options.strategy === "fixed"
                          ),
                          popper: qe(t),
                        }),
                          (o.reset = !1),
                          (o.placement = o.options.placement),
                          o.orderedModifiers.forEach(function (e) {
                            return (o.modifiersData[e.name] = Object.assign(
                              {},
                              e.data
                            ));
                          });
                        for (e = 0; e < o.orderedModifiers.length; e++)
                          if (o.reset !== !0) {
                            var e,
                              n = o.orderedModifiers[e],
                              r = n.fn,
                              c = n.options,
                              d = c === void 0 ? {} : c,
                              u = n.name;
                            typeof r == "function" &&
                              (o =
                                r({
                                  state: o,
                                  options: d,
                                  name: u,
                                  instance: a,
                                }) || o);
                          } else (o.reset = !1), (e = -1);
                      }
                    }
                  },
                  update:
                    ((d = function () {
                      return new Promise(function (e) {
                        a.forceUpdate(), e(o);
                      });
                    }),
                    function () {
                      return (
                        r ||
                          (r = new Promise(function (e) {
                            Promise.resolve().then(function () {
                              (r = void 0), e(d());
                            });
                          })),
                        r
                      );
                    }),
                  destroy: function () {
                    u(), (l = !0);
                  },
                };
              if (!Ht(e, n)) return a;
              function u() {
                c.forEach(function (e) {
                  return e();
                }),
                  (c = []);
              }
              return (
                a.setOptions(s).then(function (e) {
                  !l && s.onFirstUpdate && s.onFirstUpdate(e);
                }),
                a
              );
            };
          }
          var Ms = ie(),
            Ss = ie({
              defaultModifiers: [Te, Ue, De, We],
            }),
            Qe = ie({
              defaultModifiers: [Te, Ue, De, We, zt, St, Nt, ct, Tt],
            });
          const Wt = Object.freeze({
              __proto__: null,
              popperGenerator: ie,
              detectOverflow: N,
              createPopperBase: Ms,
              createPopper: Qe,
              createPopperLite: Ss,
              top: s,
              bottom: a,
              right: r,
              left: i,
              auto: je,
              basePlacements: $,
              start: M,
              end: T,
              clippingParents: _t,
              viewport: xe,
              popper: z,
              reference: yt,
              variationPlacements: ze,
              placements: Ae,
              beforeRead: jt,
              read: bt,
              afterRead: gt,
              beforeMain: ft,
              main: mt,
              afterMain: ht,
              beforeWrite: lt,
              write: it,
              afterWrite: ot,
              modifierPhases: st,
              applyStyles: We,
              arrow: ct,
              computeStyles: De,
              eventListeners: Te,
              flip: St,
              hide: Tt,
              offset: zt,
              popperOffsets: Ue,
              preventOverflow: Nt,
            }),
            Xe = "dropdown",
            Ve = "Escape",
            qt = "Space",
            Yt = "ArrowUp",
            Ze = "ArrowDown",
            Es = new RegExp("ArrowUp|ArrowDown|Escape"),
            Qt = "click.bs.dropdown.data-api",
            Zt = "keydown.bs.dropdown.data-api",
            V = "show",
            q = '[data-bs-toggle="dropdown"]',
            Fe = ".dropdown-menu",
            Cs = o() ? "top-end" : "top-start",
            xs = o() ? "top-start" : "top-end",
            Os = o() ? "bottom-end" : "bottom-start",
            ws = o() ? "bottom-start" : "bottom-end",
            js = o() ? "left-start" : "right-start",
            bs = o() ? "right-start" : "left-start",
            hs = {
              offset: [0, 2],
              boundary: "clippingParents",
              reference: "toggle",
              display: "dynamic",
              popperConfig: null,
              autoClose: !0,
            },
            us = {
              offset: "(array|string|function)",
              boundary: "(string|element)",
              reference: "(string|element|object)",
              display: "string",
              popperConfig: "(null|object|function)",
              autoClose: "(boolean|string)",
            };
          class c extends u {
            constructor(e, t) {
              super(e),
                (this._popper = null),
                (this._config = this._getConfig(t)),
                (this._menu = this._getMenuElement()),
                (this._inNavbar = this._detectNavbar());
            }
            static get Default() {
              return hs;
            }
            static get DefaultType() {
              return us;
            }
            static get NAME() {
              return Xe;
            }
            toggle() {
              return this._isShown() ? this.hide() : this.show();
            }
            show() {
              if (E(this._element) || this._isShown(this._menu)) return;
              const t = {
                relatedTarget: this._element,
              };
              if (
                e.trigger(this._element, "show.bs.dropdown", t).defaultPrevented
              )
                return;
              const s = c.getParentFromElement(this._element);
              this._inNavbar
                ? n.setDataAttribute(this._menu, "popper", "none")
                : this._createPopper(s),
                "ontouchstart" in document.documentElement &&
                  !s.closest(".navbar-nav") &&
                  []
                    .concat(...document.body.children)
                    .forEach((t) => e.on(t, "mouseover", ye)),
                this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                this._menu.classList.add(V),
                this._element.classList.add(V),
                e.trigger(this._element, "shown.bs.dropdown", t);
            }
            hide() {
              if (E(this._element) || !this._isShown(this._menu)) return;
              const e = {
                relatedTarget: this._element,
              };
              this._completeHide(e);
            }
            dispose() {
              this._popper && this._popper.destroy(), super.dispose();
            }
            update() {
              (this._inNavbar = this._detectNavbar()),
                this._popper && this._popper.update();
            }
            _completeHide(t) {
              e.trigger(this._element, "hide.bs.dropdown", t)
                .defaultPrevented ||
                ("ontouchstart" in document.documentElement &&
                  []
                    .concat(...document.body.children)
                    .forEach((t) => e.off(t, "mouseover", ye)),
                this._popper && this._popper.destroy(),
                this._menu.classList.remove(V),
                this._element.classList.remove(V),
                this._element.setAttribute("aria-expanded", "false"),
                n.removeDataAttribute(this._menu, "popper"),
                e.trigger(this._element, "hidden.bs.dropdown", t));
            }
            _getConfig(e) {
              if (
                ((e = {
                  ...this.constructor.Default,
                  ...n.getDataAttributes(this._element),
                  ...e,
                }),
                p(Xe, e, this.constructor.DefaultType),
                typeof e.reference == "object" &&
                  !C(e.reference) &&
                  typeof e.reference.getBoundingClientRect != "function")
              )
                throw new TypeError(
                  `${Xe.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
                );
              return e;
            }
            _createPopper(e) {
              if (Wt === void 0)
                throw new TypeError(
                  "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                );
              let t = this._element;
              this._config.reference === "parent"
                ? (t = e)
                : C(this._config.reference)
                ? (t = w(this._config.reference))
                : typeof this._config.reference == "object" &&
                  (t = this._config.reference);
              const s = this._getPopperConfig(),
                o = s.modifiers.find(
                  (e) => e.name === "applyStyles" && e.enabled === !1
                );
              (this._popper = Qe(t, this._menu, s)),
                o && n.setDataAttribute(this._menu, "popper", "static");
            }
            _isShown(e = this._element) {
              return e.classList.contains(V);
            }
            _getMenuElement() {
              return t.next(this._element, Fe)[0];
            }
            _getPlacement() {
              const e = this._element.parentNode;
              if (e.classList.contains("dropend")) return js;
              if (e.classList.contains("dropstart")) return bs;
              const t =
                getComputedStyle(this._menu)
                  .getPropertyValue("--bs-position")
                  .trim() === "end";
              return e.classList.contains("dropup")
                ? t
                  ? xs
                  : Cs
                : t
                ? ws
                : Os;
            }
            _detectNavbar() {
              return this._element.closest(".navbar") !== null;
            }
            _getOffset() {
              const { offset: e } = this._config;
              return typeof e == "string"
                ? e.split(",").map((e) => Number.parseInt(e, 10))
                : typeof e == "function"
                ? (t) => e(t, this._element)
                : e;
            }
            _getPopperConfig() {
              const e = {
                placement: this._getPlacement(),
                modifiers: [
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: this._config.boundary,
                    },
                  },
                  {
                    name: "offset",
                    options: {
                      offset: this._getOffset(),
                    },
                  },
                ],
              };
              return (
                this._config.display === "static" &&
                  (e.modifiers = [
                    {
                      name: "applyStyles",
                      enabled: !1,
                    },
                  ]),
                {
                  ...e,
                  ...(typeof this._config.popperConfig == "function"
                    ? this._config.popperConfig(e)
                    : this._config.popperConfig),
                }
              );
            }
            _selectMenuItem({ key: e, target: n }) {
              const s = t
                .find(
                  ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
                  this._menu
                )
                .filter(X);
              s.length && an(s, n, e === Ze, !s.includes(n)).focus();
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = c.getOrCreateInstance(this, e);
                if (typeof e == "string") {
                  if (t[e] === void 0)
                    throw new TypeError(`No method named "${e}"`);
                  t[e]();
                }
              });
            }
            static clearMenus(e) {
              if (
                e &&
                (e.button === 2 || (e.type === "keyup" && e.key !== "Tab"))
              )
                return;
              const n = t.find(q);
              for (let s = 0, i = n.length; s < i; s++) {
                const t = c.getInstance(n[s]);
                if (!t || t._config.autoClose === !1) continue;
                if (!t._isShown()) continue;
                const o = {
                  relatedTarget: t._element,
                };
                if (e) {
                  const n = e.composedPath(),
                    s = n.includes(t._menu);
                  if (
                    n.includes(t._element) ||
                    (t._config.autoClose === "inside" && !s) ||
                    (t._config.autoClose === "outside" && s)
                  )
                    continue;
                  if (
                    t._menu.contains(e.target) &&
                    ((e.type === "keyup" && e.key === "Tab") ||
                      /input|select|option|textarea|form/i.test(
                        e.target.tagName
                      ))
                  )
                    continue;
                  e.type === "click" && (o.clickEvent = e);
                }
                t._completeHide(o);
              }
            }
            static getParentFromElement(e) {
              return b(e) || e.parentNode;
            }
            static dataApiKeydownHandler(e) {
              if (
                /input|textarea/i.test(e.target.tagName)
                  ? e.key === qt ||
                    (e.key !== Ve &&
                      ((e.key !== Ze && e.key !== Yt) || e.target.closest(Fe)))
                  : !Es.test(e.key)
              )
                return;
              const n = this.classList.contains(V);
              if (!n && e.key === Ve) return;
              if ((e.preventDefault(), e.stopPropagation(), E(this))) return;
              const o = this.matches(q) ? this : t.prev(this, q)[0],
                s = c.getOrCreateInstance(o);
              if (e.key !== Ve)
                return e.key === Yt || e.key === Ze
                  ? (n || s.show(), void s._selectMenuItem(e))
                  : void ((n && e.key !== qt) || c.clearMenus());
              s.hide();
            }
          }
          e.on(document, Zt, q, c.dataApiKeydownHandler),
            e.on(document, Zt, Fe, c.dataApiKeydownHandler),
            e.on(document, Qt, c.clearMenus),
            e.on(document, "keyup.bs.dropdown.data-api", c.clearMenus),
            e.on(document, Qt, q, function (e) {
              e.preventDefault(), c.getOrCreateInstance(this).toggle();
            }),
            d(c);
          const hn = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            mn = ".sticky-top";
          class Me {
            constructor() {
              this._element = document.body;
            }
            getWidth() {
              const e = document.documentElement.clientWidth;
              return Math.abs(window.innerWidth - e);
            }
            hide() {
              const e = this.getWidth();
              this._disableOverFlow(),
                this._setElementAttributes(
                  this._element,
                  "paddingRight",
                  (t) => t + e
                ),
                this._setElementAttributes(hn, "paddingRight", (t) => t + e),
                this._setElementAttributes(mn, "marginRight", (t) => t - e);
            }
            _disableOverFlow() {
              this._saveInitialAttribute(this._element, "overflow"),
                (this._element.style.overflow = "hidden");
            }
            _setElementAttributes(e, t, n) {
              const s = this.getWidth();
              this._applyManipulationCallback(e, (e) => {
                if (
                  e !== this._element &&
                  window.innerWidth > e.clientWidth + s
                )
                  return;
                this._saveInitialAttribute(e, t);
                const o = window.getComputedStyle(e)[t];
                e.style[t] = `${n(Number.parseFloat(o))}px`;
              });
            }
            reset() {
              this._resetElementAttributes(this._element, "overflow"),
                this._resetElementAttributes(this._element, "paddingRight"),
                this._resetElementAttributes(hn, "paddingRight"),
                this._resetElementAttributes(mn, "marginRight");
            }
            _saveInitialAttribute(e, t) {
              const s = e.style[t];
              s && n.setDataAttribute(e, t, s);
            }
            _resetElementAttributes(e, t) {
              this._applyManipulationCallback(e, (e) => {
                const s = n.getDataAttribute(e, t);
                s === void 0
                  ? e.style.removeProperty(t)
                  : (n.removeDataAttribute(e, t), (e.style[t] = s));
              });
            }
            _applyManipulationCallback(e, n) {
              C(e) ? n(e) : t.find(e, this._element).forEach(n);
            }
            isOverflowing() {
              return this.getWidth() > 0;
            }
          }
          const ds = {
              className: "modal-backdrop",
              isVisible: !0,
              isAnimated: !1,
              rootElement: "body",
              clickCallback: null,
            },
            ls = {
              className: "string",
              isVisible: "boolean",
              isAnimated: "boolean",
              rootElement: "(element|string)",
              clickCallback: "(function|null)",
            },
            vn = "show",
            bn = "mousedown.bs.backdrop";
          class jn {
            constructor(e) {
              (this._config = this._getConfig(e)),
                (this._isAppended = !1),
                (this._element = null);
            }
            show(e) {
              this._config.isVisible
                ? (this._append(),
                  this._config.isAnimated && R(this._getElement()),
                  this._getElement().classList.add(vn),
                  this._emulateAnimation(() => {
                    O(e);
                  }))
                : O(e);
            }
            hide(e) {
              this._config.isVisible
                ? (this._getElement().classList.remove(vn),
                  this._emulateAnimation(() => {
                    this.dispose(), O(e);
                  }))
                : O(e);
            }
            _getElement() {
              if (!this._element) {
                const e = document.createElement("div");
                (e.className = this._config.className),
                  this._config.isAnimated && e.classList.add("fade"),
                  (this._element = e);
              }
              return this._element;
            }
            _getConfig(e) {
              return (
                ((e = {
                  ...ds,
                  ...(typeof e == "object" ? e : {}),
                }).rootElement = w(e.rootElement)),
                p("backdrop", e, ls),
                e
              );
            }
            _append() {
              this._isAppended ||
                (this._config.rootElement.append(this._getElement()),
                e.on(this._getElement(), bn, () => {
                  O(this._config.clickCallback);
                }),
                (this._isAppended = !0));
            }
            dispose() {
              this._isAppended &&
                (e.off(this._element, bn),
                this._element.remove(),
                (this._isAppended = !1));
            }
            _emulateAnimation(e) {
              sn(e, this._getElement(), this._config.isAnimated);
            }
          }
          const cs = {
              trapElement: null,
              autofocus: !0,
            },
            os = {
              trapElement: "element",
              autofocus: "boolean",
            },
            wn = ".bs.focustrap",
            On = "backward";
          class xn {
            constructor(e) {
              (this._config = this._getConfig(e)),
                (this._isActive = !1),
                (this._lastTabNavDirection = null);
            }
            activate() {
              const { trapElement: t, autofocus: n } = this._config;
              this._isActive ||
                (n && t.focus(),
                e.off(document, wn),
                e.on(document, "focusin.bs.focustrap", (e) =>
                  this._handleFocusin(e)
                ),
                e.on(document, "keydown.tab.bs.focustrap", (e) =>
                  this._handleKeydown(e)
                ),
                (this._isActive = !0));
            }
            deactivate() {
              this._isActive && ((this._isActive = !1), e.off(document, wn));
            }
            _handleFocusin(e) {
              const { target: o } = e,
                { trapElement: n } = this._config;
              if (o === document || o === n || n.contains(o)) return;
              const s = t.focusableChildren(n);
              s.length === 0
                ? n.focus()
                : this._lastTabNavDirection === On
                ? s[s.length - 1].focus()
                : s[0].focus();
            }
            _handleKeydown(e) {
              e.key === "Tab" &&
                (this._lastTabNavDirection = e.shiftKey ? On : "forward");
            }
            _getConfig(e) {
              return (
                (e = {
                  ...cs,
                  ...(typeof e == "object" ? e : {}),
                }),
                p("focustrap", e, os),
                e
              );
            }
          }
          const Cn = "modal",
            En = "Escape",
            kn = {
              backdrop: !0,
              keyboard: !0,
              focus: !0,
            },
            ss = {
              backdrop: "(boolean|string)",
              keyboard: "boolean",
              focus: "boolean",
            },
            Sn = "hidden.bs.modal",
            Mn = "show.bs.modal",
            Fn = "resize.bs.modal",
            Tn = "click.dismiss.bs.modal",
            zn = "keydown.dismiss.bs.modal",
            Dn = "mousedown.dismiss.bs.modal",
            Nn = "modal-open",
            Ln = "show",
            we = "modal-static";
          class D extends u {
            constructor(e, n) {
              super(e),
                (this._config = this._getConfig(n)),
                (this._dialog = t.findOne(".modal-dialog", this._element)),
                (this._backdrop = this._initializeBackDrop()),
                (this._focustrap = this._initializeFocusTrap()),
                (this._isShown = !1),
                (this._ignoreBackdropClick = !1),
                (this._isTransitioning = !1),
                (this._scrollBar = new Me());
            }
            static get Default() {
              return kn;
            }
            static get NAME() {
              return Cn;
            }
            toggle(e) {
              return this._isShown ? this.hide() : this.show(e);
            }
            show(t) {
              this._isShown ||
                this._isTransitioning ||
                e.trigger(this._element, Mn, {
                  relatedTarget: t,
                }).defaultPrevented ||
                ((this._isShown = !0),
                this._isAnimated() && (this._isTransitioning = !0),
                this._scrollBar.hide(),
                document.body.classList.add(Nn),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e.on(this._dialog, Dn, () => {
                  e.one(this._element, "mouseup.dismiss.bs.modal", (e) => {
                    e.target === this._element &&
                      (this._ignoreBackdropClick = !0);
                  });
                }),
                this._showBackdrop(() => this._showElement(t)));
            }
            hide() {
              if (!this._isShown || this._isTransitioning) return;
              if (e.trigger(this._element, "hide.bs.modal").defaultPrevented)
                return;
              this._isShown = !1;
              const t = this._isAnimated();
              t && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                this._focustrap.deactivate(),
                this._element.classList.remove(Ln),
                e.off(this._element, Tn),
                e.off(this._dialog, Dn),
                this._queueCallback(() => this._hideModal(), this._element, t);
            }
            dispose() {
              [window, this._dialog].forEach((t) => e.off(t, ".bs.modal")),
                this._backdrop.dispose(),
                this._focustrap.deactivate(),
                super.dispose();
            }
            handleUpdate() {
              this._adjustDialog();
            }
            _initializeBackDrop() {
              return new jn({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated(),
              });
            }
            _initializeFocusTrap() {
              return new xn({
                trapElement: this._element,
              });
            }
            _getConfig(e) {
              return (
                (e = {
                  ...kn,
                  ...n.getDataAttributes(this._element),
                  ...(typeof e == "object" ? e : {}),
                }),
                p(Cn, e, ss),
                e
              );
            }
            _showElement(n) {
              const s = this._isAnimated(),
                o = t.findOne(".modal-body", this._dialog);
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
                document.body.append(this._element),
                (this._element.style.display = "block"),
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                (this._element.scrollTop = 0),
                o && (o.scrollTop = 0),
                s && R(this._element),
                this._element.classList.add(Ln),
                this._queueCallback(
                  () => {
                    this._config.focus && this._focustrap.activate(),
                      (this._isTransitioning = !1),
                      e.trigger(this._element, "shown.bs.modal", {
                        relatedTarget: n,
                      });
                  },
                  this._dialog,
                  s
                );
            }
            _setEscapeEvent() {
              this._isShown
                ? e.on(this._element, zn, (e) => {
                    this._config.keyboard && e.key === En
                      ? (e.preventDefault(), this.hide())
                      : this._config.keyboard ||
                        e.key !== En ||
                        this._triggerBackdropTransition();
                  })
                : e.off(this._element, zn);
            }
            _setResizeEvent() {
              this._isShown
                ? e.on(window, Fn, () => this._adjustDialog())
                : e.off(window, Fn);
            }
            _hideModal() {
              (this._element.style.display = "none"),
                this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                (this._isTransitioning = !1),
                this._backdrop.hide(() => {
                  document.body.classList.remove(Nn),
                    this._resetAdjustments(),
                    this._scrollBar.reset(),
                    e.trigger(this._element, Sn);
                });
            }
            _showBackdrop(t) {
              e.on(this._element, Tn, (e) => {
                this._ignoreBackdropClick
                  ? (this._ignoreBackdropClick = !1)
                  : e.target === e.currentTarget &&
                    (this._config.backdrop === !0
                      ? this.hide()
                      : this._config.backdrop === "static" &&
                        this._triggerBackdropTransition());
              }),
                this._backdrop.show(t);
            }
            _isAnimated() {
              return this._element.classList.contains("fade");
            }
            _triggerBackdropTransition() {
              if (
                e.trigger(this._element, "hidePrevented.bs.modal")
                  .defaultPrevented
              )
                return;
              const { classList: t, scrollHeight: o, style: n } = this._element,
                s = o > document.documentElement.clientHeight;
              (!s && n.overflowY === "hidden") ||
                t.contains(we) ||
                (s || (n.overflowY = "hidden"),
                t.add(we),
                this._queueCallback(() => {
                  t.remove(we),
                    s ||
                      this._queueCallback(() => {
                        n.overflowY = "";
                      }, this._dialog);
                }, this._dialog),
                this._element.focus());
            }
            _adjustDialog() {
              const e =
                  this._element.scrollHeight >
                  document.documentElement.clientHeight,
                n = this._scrollBar.getWidth(),
                t = n > 0;
              ((!t && e && !o()) || (t && !e && o())) &&
                (this._element.style.paddingLeft = `${n}px`),
                ((t && !e && !o()) || (!t && e && o())) &&
                  (this._element.style.paddingRight = `${n}px`);
            }
            _resetAdjustments() {
              (this._element.style.paddingLeft = ""),
                (this._element.style.paddingRight = "");
            }
            static jQueryInterface(e, t) {
              return this.each(function () {
                const n = D.getOrCreateInstance(this, e);
                if (typeof e == "string") {
                  if (n[e] === void 0)
                    throw new TypeError(`No method named "${e}"`);
                  n[e](t);
                }
              });
            }
          }
          e.on(
            document,
            "click.bs.modal.data-api",
            '[data-bs-toggle="modal"]',
            function (n) {
              const s = b(this);
              ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
                e.one(s, Mn, (t) => {
                  t.defaultPrevented ||
                    e.one(s, Sn, () => {
                      X(this) && this.focus();
                    });
                });
              const o = t.findOne(".modal.show");
              o && D.getInstance(o).hide(),
                D.getOrCreateInstance(s).toggle(this);
            }
          ),
            ve(D),
            d(D);
          const Hn = "offcanvas",
            In = {
              backdrop: !0,
              keyboard: !0,
              scroll: !1,
            },
            Qn = {
              backdrop: "boolean",
              keyboard: "boolean",
              scroll: "boolean",
            },
            Vn = "show",
            $n = ".offcanvas.show",
            Wn = "hidden.bs.offcanvas";
          class S extends u {
            constructor(e, t) {
              super(e),
                (this._config = this._getConfig(t)),
                (this._isShown = !1),
                (this._backdrop = this._initializeBackDrop()),
                (this._focustrap = this._initializeFocusTrap()),
                this._addEventListeners();
            }
            static get NAME() {
              return Hn;
            }
            static get Default() {
              return In;
            }
            toggle(e) {
              return this._isShown ? this.hide() : this.show(e);
            }
            show(t) {
              this._isShown ||
                e.trigger(this._element, "show.bs.offcanvas", {
                  relatedTarget: t,
                }).defaultPrevented ||
                ((this._isShown = !0),
                (this._element.style.visibility = "visible"),
                this._backdrop.show(),
                this._config.scroll || new Me().hide(),
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                this._element.classList.add(Vn),
                this._queueCallback(
                  () => {
                    this._config.scroll || this._focustrap.activate(),
                      e.trigger(this._element, "shown.bs.offcanvas", {
                        relatedTarget: t,
                      });
                  },
                  this._element,
                  !0
                ));
            }
            hide() {
              this._isShown &&
                (e.trigger(this._element, "hide.bs.offcanvas")
                  .defaultPrevented ||
                  (this._focustrap.deactivate(),
                  this._element.blur(),
                  (this._isShown = !1),
                  this._element.classList.remove(Vn),
                  this._backdrop.hide(),
                  this._queueCallback(
                    () => {
                      this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        this._element.removeAttribute("role"),
                        (this._element.style.visibility = "hidden"),
                        this._config.scroll || new Me().reset(),
                        e.trigger(this._element, Wn);
                    },
                    this._element,
                    !0
                  )));
            }
            dispose() {
              this._backdrop.dispose(),
                this._focustrap.deactivate(),
                super.dispose();
            }
            _getConfig(e) {
              return (
                (e = {
                  ...In,
                  ...n.getDataAttributes(this._element),
                  ...(typeof e == "object" ? e : {}),
                }),
                p(Hn, e, Qn),
                e
              );
            }
            _initializeBackDrop() {
              return new jn({
                className: "offcanvas-backdrop",
                isVisible: this._config.backdrop,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: () => this.hide(),
              });
            }
            _initializeFocusTrap() {
              return new xn({
                trapElement: this._element,
              });
            }
            _addEventListeners() {
              e.on(this._element, "keydown.dismiss.bs.offcanvas", (e) => {
                this._config.keyboard && e.key === "Escape" && this.hide();
              });
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = S.getOrCreateInstance(this, e);
                if (typeof e == "string") {
                  if (
                    t[e] === void 0 ||
                    e.startsWith("_") ||
                    e === "constructor"
                  )
                    throw new TypeError(`No method named "${e}"`);
                  t[e](this);
                }
              });
            }
          }
          e.on(
            document,
            "click.bs.offcanvas.data-api",
            '[data-bs-toggle="offcanvas"]',
            function (n) {
              const s = b(this);
              if (
                (["A", "AREA"].includes(this.tagName) && n.preventDefault(),
                E(this))
              )
                return;
              e.one(s, Wn, () => {
                X(this) && this.focus();
              });
              const o = t.findOne($n);
              o && o !== s && S.getInstance(o).hide(),
                S.getOrCreateInstance(s).toggle(this);
            }
          ),
            e.on(window, "load.bs.offcanvas.data-api", () =>
              t.find($n).forEach((e) => S.getOrCreateInstance(e).show())
            ),
            ve(S),
            d(S);
          const Xn = new Set([
              "background",
              "cite",
              "href",
              "itemtype",
              "longdesc",
              "poster",
              "src",
              "xlink:href",
            ]),
            Yn =
              /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
            Ts =
              /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
            Gn = (e, t) => {
              const n = e.nodeName.toLowerCase();
              if (t.includes(n))
                return (
                  !Xn.has(n) ||
                  Boolean(Yn.test(e.nodeValue) || Ts.test(e.nodeValue))
                );
              const s = t.filter((e) => e instanceof RegExp);
              for (let e = 0, t = s.length; e < t; e++)
                if (s[e].test(n)) return !0;
              return !1;
            };
          function et(e, t, n) {
            if (!e.length) return e;
            if (n && typeof n == "function") return n(e);
            const s = new window.DOMParser().parseFromString(e, "text/html"),
              o = [].concat(...s.body.querySelectorAll("*"));
            for (let n = 0, i = o.length; n < i; n++) {
              const e = o[n],
                s = e.nodeName.toLowerCase();
              if (!Object.keys(t).includes(s)) {
                e.remove();
                continue;
              }
              const a = [].concat(...e.attributes),
                r = [].concat(t["*"] || [], t[s] || []);
              a.forEach((t) => {
                Gn(t, r) || e.removeAttribute(t.nodeName);
              });
            }
            return s.body.innerHTML;
          }
          const Bn = "tooltip",
            Zn = new Set(["sanitize", "allowList", "sanitizeFn"]),
            Jn = {
              animation: "boolean",
              template: "string",
              title: "(string|element|function)",
              trigger: "string",
              delay: "(number|object)",
              html: "boolean",
              selector: "(string|boolean)",
              placement: "(string|function)",
              offset: "(array|string|function)",
              container: "(string|element|boolean)",
              fallbackPlacements: "array",
              boundary: "(string|element)",
              customClass: "(string|function)",
              sanitize: "boolean",
              sanitizeFn: "(null|function)",
              allowList: "object",
              popperConfig: "(null|object|function)",
            },
            es = {
              AUTO: "auto",
              TOP: "top",
              RIGHT: o() ? "left" : "right",
              BOTTOM: "bottom",
              LEFT: o() ? "right" : "left",
            },
            ts = {
              animation: !0,
              template:
                '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
              trigger: "hover focus",
              title: "",
              delay: 0,
              html: !1,
              selector: !1,
              placement: "top",
              offset: [0, 0],
              container: !1,
              fallbackPlacements: ["top", "right", "bottom", "left"],
              boundary: "clippingParents",
              customClass: "",
              sanitize: !0,
              sanitizeFn: null,
              allowList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: [],
              },
              popperConfig: null,
            },
            ns = {
              HIDE: "hide.bs.tooltip",
              HIDDEN: "hidden.bs.tooltip",
              SHOW: "show.bs.tooltip",
              SHOWN: "shown.bs.tooltip",
              INSERTED: "inserted.bs.tooltip",
              CLICK: "click.bs.tooltip",
              FOCUSIN: "focusin.bs.tooltip",
              FOCUSOUT: "focusout.bs.tooltip",
              MOUSEENTER: "mouseenter.bs.tooltip",
              MOUSELEAVE: "mouseleave.bs.tooltip",
            },
            se = "fade",
            J = "show",
            ne = "show",
            Ne = "out",
            yn = ".tooltip-inner",
            gn = ".modal",
            pn = "hide.bs.modal",
            ue = "hover",
            ln = "focus";
          class H extends u {
            constructor(e, t) {
              if (Wt === void 0)
                throw new TypeError(
                  "Bootstrap's tooltips require Popper (https://popper.js.org)"
                );
              super(e),
                (this._isEnabled = !0),
                (this._timeout = 0),
                (this._hoverState = ""),
                (this._activeTrigger = {}),
                (this._popper = null),
                (this._config = this._getConfig(t)),
                (this.tip = null),
                this._setListeners();
            }
            static get Default() {
              return ts;
            }
            static get NAME() {
              return Bn;
            }
            static get Event() {
              return ns;
            }
            static get DefaultType() {
              return Jn;
            }
            enable() {
              this._isEnabled = !0;
            }
            disable() {
              this._isEnabled = !1;
            }
            toggleEnabled() {
              this._isEnabled = !this._isEnabled;
            }
            toggle(e) {
              if (this._isEnabled)
                if (e) {
                  const t = this._initializeOnDelegatedTarget(e);
                  (t._activeTrigger.click = !t._activeTrigger.click),
                    t._isWithActiveTrigger()
                      ? t._enter(null, t)
                      : t._leave(null, t);
                } else {
                  if (this.getTipElement().classList.contains(J))
                    return void this._leave(null, this);
                  this._enter(null, this);
                }
            }
            dispose() {
              clearTimeout(this._timeout),
                e.off(this._element.closest(gn), pn, this._hideModalHandler),
                this.tip && this.tip.remove(),
                this._disposePopper(),
                super.dispose();
            }
            show() {
              if (this._element.style.display === "none")
                throw new Error("Please use show on visible elements");
              if (!this.isWithContent() || !this._isEnabled) return;
              const r = e.trigger(this._element, this.constructor.Event.SHOW),
                s = Bt(this._element),
                l =
                  s === null
                    ? this._element.ownerDocument.documentElement.contains(
                        this._element
                      )
                    : s.contains(this._element);
              if (r.defaultPrevented || !l) return;
              this.constructor.NAME === "tooltip" &&
                this.tip &&
                this.getTitle() !== this.tip.querySelector(yn).innerHTML &&
                (this._disposePopper(), this.tip.remove(), (this.tip = null));
              const t = this.getTipElement(),
                i = ((e) => {
                  do e += Math.floor(1e6 * Math.random());
                  while (document.getElementById(e));
                  return e;
                })(this.constructor.NAME);
              t.setAttribute("id", i),
                this._element.setAttribute("aria-describedby", i),
                this._config.animation && t.classList.add(se);
              const a =
                  typeof this._config.placement == "function"
                    ? this._config.placement.call(this, t, this._element)
                    : this._config.placement,
                n = this._getAttachment(a);
              this._addAttachmentClass(n);
              const { container: c } = this._config;
              K.set(t, this.constructor.DATA_KEY, this),
                this._element.ownerDocument.documentElement.contains(
                  this.tip
                ) ||
                  (c.append(t),
                  e.trigger(this._element, this.constructor.Event.INSERTED)),
                this._popper
                  ? this._popper.update()
                  : (this._popper = Qe(
                      this._element,
                      t,
                      this._getPopperConfig(n)
                    )),
                t.classList.add(J);
              const o = this._resolvePossibleFunction(this._config.customClass);
              o && t.classList.add(...o.split(" ")),
                "ontouchstart" in document.documentElement &&
                  [].concat(...document.body.children).forEach((t) => {
                    e.on(t, "mouseover", ye);
                  });
              const d = this.tip.classList.contains(se);
              this._queueCallback(
                () => {
                  const t = this._hoverState;
                  (this._hoverState = null),
                    e.trigger(this._element, this.constructor.Event.SHOWN),
                    t === Ne && this._leave(null, this);
                },
                this.tip,
                d
              );
            }
            hide() {
              if (!this._popper) return;
              const t = this.getTipElement();
              if (
                e.trigger(this._element, this.constructor.Event.HIDE)
                  .defaultPrevented
              )
                return;
              t.classList.remove(J),
                "ontouchstart" in document.documentElement &&
                  []
                    .concat(...document.body.children)
                    .forEach((t) => e.off(t, "mouseover", ye)),
                (this._activeTrigger.click = !1),
                (this._activeTrigger.focus = !1),
                (this._activeTrigger.hover = !1);
              const n = this.tip.classList.contains(se);
              this._queueCallback(
                () => {
                  this._isWithActiveTrigger() ||
                    (this._hoverState !== ne && t.remove(),
                    this._cleanTipClass(),
                    this._element.removeAttribute("aria-describedby"),
                    e.trigger(this._element, this.constructor.Event.HIDDEN),
                    this._disposePopper());
                },
                this.tip,
                n
              ),
                (this._hoverState = "");
            }
            update() {
              this._popper !== null && this._popper.update();
            }
            isWithContent() {
              return Boolean(this.getTitle());
            }
            getTipElement() {
              if (this.tip) return this.tip;
              const t = document.createElement("div");
              t.innerHTML = this._config.template;
              const e = t.children[0];
              return (
                this.setContent(e),
                e.classList.remove(se, J),
                (this.tip = e),
                this.tip
              );
            }
            setContent(e) {
              this._sanitizeAndSetContent(e, this.getTitle(), yn);
            }
            _sanitizeAndSetContent(e, n, s) {
              const o = t.findOne(s, e);
              n || !o ? this.setElementContent(o, n) : o.remove();
            }
            setElementContent(e, t) {
              if (e !== null)
                return C(t)
                  ? ((t = w(t)),
                    void (this._config.html
                      ? t.parentNode !== e && ((e.innerHTML = ""), e.append(t))
                      : (e.textContent = t.textContent)))
                  : void (this._config.html
                      ? (this._config.sanitize &&
                          (t = et(
                            t,
                            this._config.allowList,
                            this._config.sanitizeFn
                          )),
                        (e.innerHTML = t))
                      : (e.textContent = t));
            }
            getTitle() {
              const e =
                this._element.getAttribute("data-bs-original-title") ||
                this._config.title;
              return this._resolvePossibleFunction(e);
            }
            updateAttachment(e) {
              return e === "right" ? "end" : e === "left" ? "start" : e;
            }
            _initializeOnDelegatedTarget(e, t) {
              return (
                t ||
                this.constructor.getOrCreateInstance(
                  e.delegateTarget,
                  this._getDelegateConfig()
                )
              );
            }
            _getOffset() {
              const { offset: e } = this._config;
              return typeof e == "string"
                ? e.split(",").map((e) => Number.parseInt(e, 10))
                : typeof e == "function"
                ? (t) => e(t, this._element)
                : e;
            }
            _resolvePossibleFunction(e) {
              return typeof e == "function" ? e.call(this._element) : e;
            }
            _getPopperConfig(e) {
              const t = {
                placement: e,
                modifiers: [
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: this._config.fallbackPlacements,
                    },
                  },
                  {
                    name: "offset",
                    options: {
                      offset: this._getOffset(),
                    },
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: this._config.boundary,
                    },
                  },
                  {
                    name: "arrow",
                    options: {
                      element: `.${this.constructor.NAME}-arrow`,
                    },
                  },
                  {
                    name: "onChange",
                    enabled: !0,
                    phase: "afterWrite",
                    fn: (e) => this._handlePopperPlacementChange(e),
                  },
                ],
                onFirstUpdate: (e) => {
                  e.options.placement !== e.placement &&
                    this._handlePopperPlacementChange(e);
                },
              };
              return {
                ...t,
                ...(typeof this._config.popperConfig == "function"
                  ? this._config.popperConfig(t)
                  : this._config.popperConfig),
              };
            }
            _addAttachmentClass(e) {
              this.getTipElement().classList.add(
                `${this._getBasicClassPrefix()}-${this.updateAttachment(e)}`
              );
            }
            _getAttachment(e) {
              return es[e.toUpperCase()];
            }
            _setListeners() {
              this._config.trigger.split(" ").forEach((t) => {
                if (t === "click")
                  e.on(
                    this._element,
                    this.constructor.Event.CLICK,
                    this._config.selector,
                    (e) => this.toggle(e)
                  );
                else if (t !== "manual") {
                  const n =
                      t === ue
                        ? this.constructor.Event.MOUSEENTER
                        : this.constructor.Event.FOCUSIN,
                    s =
                      t === ue
                        ? this.constructor.Event.MOUSELEAVE
                        : this.constructor.Event.FOCUSOUT;
                  e.on(this._element, n, this._config.selector, (e) =>
                    this._enter(e)
                  ),
                    e.on(this._element, s, this._config.selector, (e) =>
                      this._leave(e)
                    );
                }
              }),
                (this._hideModalHandler = () => {
                  this._element && this.hide();
                }),
                e.on(this._element.closest(gn), pn, this._hideModalHandler),
                this._config.selector
                  ? (this._config = {
                      ...this._config,
                      trigger: "manual",
                      selector: "",
                    })
                  : this._fixTitle();
            }
            _fixTitle() {
              const e = this._element.getAttribute("title"),
                t = typeof this._element.getAttribute("data-bs-original-title");
              (e || t !== "string") &&
                (this._element.setAttribute("data-bs-original-title", e || ""),
                !e ||
                  this._element.getAttribute("aria-label") ||
                  this._element.textContent ||
                  this._element.setAttribute("aria-label", e),
                this._element.setAttribute("title", ""));
            }
            _enter(e, t) {
              (t = this._initializeOnDelegatedTarget(e, t)),
                e && (t._activeTrigger[e.type === "focusin" ? ln : ue] = !0),
                t.getTipElement().classList.contains(J) || t._hoverState === ne
                  ? (t._hoverState = ne)
                  : (clearTimeout(t._timeout),
                    (t._hoverState = ne),
                    t._config.delay && t._config.delay.show
                      ? (t._timeout = setTimeout(() => {
                          t._hoverState === ne && t.show();
                        }, t._config.delay.show))
                      : t.show());
            }
            _leave(e, t) {
              (t = this._initializeOnDelegatedTarget(e, t)),
                e &&
                  (t._activeTrigger[e.type === "focusout" ? ln : ue] =
                    t._element.contains(e.relatedTarget)),
                t._isWithActiveTrigger() ||
                  (clearTimeout(t._timeout),
                  (t._hoverState = Ne),
                  t._config.delay && t._config.delay.hide
                    ? (t._timeout = setTimeout(() => {
                        t._hoverState === Ne && t.hide();
                      }, t._config.delay.hide))
                    : t.hide());
            }
            _isWithActiveTrigger() {
              for (const e in this._activeTrigger)
                if (this._activeTrigger[e]) return !0;
              return !1;
            }
            _getConfig(e) {
              const t = n.getDataAttributes(this._element);
              return (
                Object.keys(t).forEach((e) => {
                  Zn.has(e) && delete t[e];
                }),
                ((e = {
                  ...this.constructor.Default,
                  ...t,
                  ...(typeof e == "object" && e ? e : {}),
                }).container =
                  e.container === !1 ? document.body : w(e.container)),
                typeof e.delay == "number" &&
                  (e.delay = {
                    show: e.delay,
                    hide: e.delay,
                  }),
                typeof e.title == "number" && (e.title = e.title.toString()),
                typeof e.content == "number" &&
                  (e.content = e.content.toString()),
                p(Bn, e, this.constructor.DefaultType),
                e.sanitize &&
                  (e.template = et(e.template, e.allowList, e.sanitizeFn)),
                e
              );
            }
            _getDelegateConfig() {
              const e = {};
              for (const t in this._config)
                this.constructor.Default[t] !== this._config[t] &&
                  (e[t] = this._config[t]);
              return e;
            }
            _cleanTipClass() {
              const t = this.getTipElement(),
                n = new RegExp(
                  `(^|\\s)${this._getBasicClassPrefix()}\\S+`,
                  "g"
                ),
                e = t.getAttribute("class").match(n);
              e !== null &&
                e.length > 0 &&
                e.map((e) => e.trim()).forEach((e) => t.classList.remove(e));
            }
            _getBasicClassPrefix() {
              return "bs-tooltip";
            }
            _handlePopperPlacementChange(e) {
              const { state: t } = e;
              t &&
                ((this.tip = t.elements.popper),
                this._cleanTipClass(),
                this._addAttachmentClass(this._getAttachment(t.placement)));
            }
            _disposePopper() {
              this._popper && (this._popper.destroy(), (this._popper = null));
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = H.getOrCreateInstance(this, e);
                if (typeof e == "string") {
                  if (t[e] === void 0)
                    throw new TypeError(`No method named "${e}"`);
                  t[e]();
                }
              });
            }
          }
          d(H);
          const fs = {
              ...H.Default,
              placement: "right",
              offset: [0, 8],
              trigger: "click",
              content: "",
              template:
                '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            },
            ps = {
              ...H.DefaultType,
              content: "(string|element|function)",
            },
            gs = {
              HIDE: "hide.bs.popover",
              HIDDEN: "hidden.bs.popover",
              SHOW: "show.bs.popover",
              SHOWN: "shown.bs.popover",
              INSERTED: "inserted.bs.popover",
              CLICK: "click.bs.popover",
              FOCUSIN: "focusin.bs.popover",
              FOCUSOUT: "focusout.bs.popover",
              MOUSEENTER: "mouseenter.bs.popover",
              MOUSELEAVE: "mouseleave.bs.popover",
            };
          class Ie extends H {
            static get Default() {
              return fs;
            }
            static get NAME() {
              return "popover";
            }
            static get Event() {
              return gs;
            }
            static get DefaultType() {
              return ps;
            }
            isWithContent() {
              return this.getTitle() || this._getContent();
            }
            setContent(e) {
              this._sanitizeAndSetContent(
                e,
                this.getTitle(),
                ".popover-header"
              ),
                this._sanitizeAndSetContent(
                  e,
                  this._getContent(),
                  ".popover-body"
                );
            }
            _getContent() {
              return this._resolvePossibleFunction(this._config.content);
            }
            _getBasicClassPrefix() {
              return "bs-popover";
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = Ie.getOrCreateInstance(this, e);
                if (typeof e == "string") {
                  if (t[e] === void 0)
                    throw new TypeError(`No method named "${e}"`);
                  t[e]();
                }
              });
            }
          }
          d(Ie);
          const cn = "scrollspy",
            qn = {
              offset: 10,
              method: "auto",
              target: "",
            },
            ys = {
              offset: "number",
              method: "string",
              target: "(string|element)",
            },
            B = "active",
            Be = ".nav-link, .list-group-item, .dropdown-item",
            on = "position";
          class ce extends u {
            constructor(t, n) {
              super(t),
                (this._scrollElement =
                  this._element.tagName === "BODY" ? window : this._element),
                (this._config = this._getConfig(n)),
                (this._offsets = []),
                (this._targets = []),
                (this._activeTarget = null),
                (this._scrollHeight = 0),
                e.on(this._scrollElement, "scroll.bs.scrollspy", () =>
                  this._process()
                ),
                this.refresh(),
                this._process();
            }
            static get Default() {
              return qn;
            }
            static get NAME() {
              return cn;
            }
            refresh() {
              const s =
                  this._scrollElement === this._scrollElement.window
                    ? "offset"
                    : on,
                e = this._config.method === "auto" ? s : this._config.method,
                o = e === on ? this._getScrollTop() : 0;
              (this._offsets = []),
                (this._targets = []),
                (this._scrollHeight = this._getScrollHeight()),
                t
                  .find(Be, this._config.target)
                  .map((s) => {
                    const i = Ge(s),
                      a = i ? t.findOne(i) : null;
                    if (a) {
                      const t = a.getBoundingClientRect();
                      if (t.width || t.height) return [n[e](a).top + o, i];
                    }
                    return null;
                  })
                  .filter((e) => e)
                  .sort((e, t) => e[0] - t[0])
                  .forEach((e) => {
                    this._offsets.push(e[0]), this._targets.push(e[1]);
                  });
            }
            dispose() {
              e.off(this._scrollElement, ".bs.scrollspy"), super.dispose();
            }
            _getConfig(e) {
              return (
                ((e = {
                  ...qn,
                  ...n.getDataAttributes(this._element),
                  ...(typeof e == "object" && e ? e : {}),
                }).target = w(e.target) || document.documentElement),
                p(cn, e, ys),
                e
              );
            }
            _getScrollTop() {
              return this._scrollElement === window
                ? this._scrollElement.pageYOffset
                : this._scrollElement.scrollTop;
            }
            _getScrollHeight() {
              return (
                this._scrollElement.scrollHeight ||
                Math.max(
                  document.body.scrollHeight,
                  document.documentElement.scrollHeight
                )
              );
            }
            _getOffsetHeight() {
              return this._scrollElement === window
                ? window.innerHeight
                : this._scrollElement.getBoundingClientRect().height;
            }
            _process() {
              const e = this._getScrollTop() + this._config.offset,
                t = this._getScrollHeight(),
                n = this._config.offset + t - this._getOffsetHeight();
              if ((this._scrollHeight !== t && this.refresh(), e >= n)) {
                const e = this._targets[this._targets.length - 1];
                this._activeTarget !== e && this._activate(e);
              } else {
                if (
                  this._activeTarget &&
                  e < this._offsets[0] &&
                  this._offsets[0] > 0
                )
                  return (this._activeTarget = null), void this._clear();
                for (let t = this._offsets.length; t--; )
                  this._activeTarget !== this._targets[t] &&
                    e >= this._offsets[t] &&
                    (this._offsets[t + 1] === void 0 ||
                      e < this._offsets[t + 1]) &&
                    this._activate(this._targets[t]);
              }
            }
            _activate(n) {
              (this._activeTarget = n), this._clear();
              const o = Be.split(",").map(
                  (e) => `${e}[data-bs-target="${n}"],${e}[href="${n}"]`
                ),
                s = t.findOne(o.join(","), this._config.target);
              s.classList.add(B),
                s.classList.contains("dropdown-item")
                  ? t
                      .findOne(".dropdown-toggle", s.closest(".dropdown"))
                      .classList.add(B)
                  : t.parents(s, ".nav, .list-group").forEach((e) => {
                      t
                        .prev(e, ".nav-link, .list-group-item")
                        .forEach((e) => e.classList.add(B)),
                        t.prev(e, ".nav-item").forEach((e) => {
                          t.children(e, ".nav-link").forEach((e) =>
                            e.classList.add(B)
                          );
                        });
                    }),
                e.trigger(this._scrollElement, "activate.bs.scrollspy", {
                  relatedTarget: n,
                });
            }
            _clear() {
              t.find(Be, this._config.target)
                .filter((e) => e.classList.contains(B))
                .forEach((e) => e.classList.remove(B));
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = ce.getOrCreateInstance(this, e);
                if (typeof e == "string") {
                  if (t[e] === void 0)
                    throw new TypeError(`No method named "${e}"`);
                  t[e]();
                }
              });
            }
          }
          e.on(window, "load.bs.scrollspy.data-api", () => {
            t.find('[data-bs-spy="scroll"]').forEach((e) => new ce(e));
          }),
            d(ce);
          const U = "active",
            Xt = "fade",
            Kt = "show",
            Ut = ".active",
            Vt = ":scope > li > .active";
          class ae extends u {
            static get NAME() {
              return "tab";
            }
            show() {
              if (
                this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                this._element.classList.contains(U)
              )
                return;
              let n;
              const o = b(this._element),
                s = this._element.closest(".nav, .list-group");
              if (s) {
                const e = s.nodeName === "UL" || s.nodeName === "OL" ? Vt : Ut;
                (n = t.find(e, s)), (n = n[n.length - 1]);
              }
              const i = n
                ? e.trigger(n, "hide.bs.tab", {
                    relatedTarget: this._element,
                  })
                : null;
              if (
                e.trigger(this._element, "show.bs.tab", {
                  relatedTarget: n,
                }).defaultPrevented ||
                (i !== null && i.defaultPrevented)
              )
                return;
              this._activate(this._element, s);
              const a = () => {
                e.trigger(n, "hidden.bs.tab", {
                  relatedTarget: this._element,
                }),
                  e.trigger(this._element, "shown.bs.tab", {
                    relatedTarget: n,
                  });
              };
              o ? this._activate(o, o.parentNode, a) : a();
            }
            _activate(e, n, s) {
              const o = (
                  !n || (n.nodeName !== "UL" && n.nodeName !== "OL")
                    ? t.children(n, Ut)
                    : t.find(Vt, n)
                )[0],
                a = s && o && o.classList.contains(Xt),
                i = () => this._transitionComplete(e, o, s);
              o && a
                ? (o.classList.remove(Kt), this._queueCallback(i, e, !0))
                : i();
            }
            _transitionComplete(e, n, s) {
              if (n) {
                n.classList.remove(U);
                const e = t.findOne(
                  ":scope > .dropdown-menu .active",
                  n.parentNode
                );
                e && e.classList.remove(U),
                  n.getAttribute("role") === "tab" &&
                    n.setAttribute("aria-selected", !1);
              }
              e.classList.add(U),
                e.getAttribute("role") === "tab" &&
                  e.setAttribute("aria-selected", !0),
                R(e),
                e.classList.contains(Xt) && e.classList.add(Kt);
              let o = e.parentNode;
              if (
                (o && o.nodeName === "LI" && (o = o.parentNode),
                o && o.classList.contains("dropdown-menu"))
              ) {
                const n = e.closest(".dropdown");
                n &&
                  t
                    .find(".dropdown-toggle", n)
                    .forEach((e) => e.classList.add(U)),
                  e.setAttribute("aria-expanded", !0);
              }
              s && s();
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = ae.getOrCreateInstance(this);
                if (typeof e == "string") {
                  if (t[e] === void 0)
                    throw new TypeError(`No method named "${e}"`);
                  t[e]();
                }
              });
            }
          }
          e.on(
            document,
            "click.bs.tab.data-api",
            '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
            function (e) {
              ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
                E(this) || ae.getOrCreateInstance(this).show();
            }
          ),
            d(ae);
          const Rt = "toast",
            Lt = "hide",
            Q = "show",
            oe = "showing",
            Ns = {
              animation: "boolean",
              autohide: "boolean",
              delay: "number",
            },
            rn = {
              animation: !0,
              autohide: !0,
              delay: 5e3,
            };
          class be extends u {
            constructor(e, t) {
              super(e),
                (this._config = this._getConfig(t)),
                (this._timeout = null),
                (this._hasMouseInteraction = !1),
                (this._hasKeyboardInteraction = !1),
                this._setListeners();
            }
            static get DefaultType() {
              return Ns;
            }
            static get Default() {
              return rn;
            }
            static get NAME() {
              return Rt;
            }
            show() {
              e.trigger(this._element, "show.bs.toast").defaultPrevented ||
                (this._clearTimeout(),
                this._config.animation && this._element.classList.add("fade"),
                this._element.classList.remove(Lt),
                R(this._element),
                this._element.classList.add(Q),
                this._element.classList.add(oe),
                this._queueCallback(
                  () => {
                    this._element.classList.remove(oe),
                      e.trigger(this._element, "shown.bs.toast"),
                      this._maybeScheduleHide();
                  },
                  this._element,
                  this._config.animation
                ));
            }
            hide() {
              this._element.classList.contains(Q) &&
                (e.trigger(this._element, "hide.bs.toast").defaultPrevented ||
                  (this._element.classList.add(oe),
                  this._queueCallback(
                    () => {
                      this._element.classList.add(Lt),
                        this._element.classList.remove(oe),
                        this._element.classList.remove(Q),
                        e.trigger(this._element, "hidden.bs.toast");
                    },
                    this._element,
                    this._config.animation
                  )));
            }
            dispose() {
              this._clearTimeout(),
                this._element.classList.contains(Q) &&
                  this._element.classList.remove(Q),
                super.dispose();
            }
            _getConfig(e) {
              return (
                (e = {
                  ...rn,
                  ...n.getDataAttributes(this._element),
                  ...(typeof e == "object" && e ? e : {}),
                }),
                p(Rt, e, this.constructor.DefaultType),
                e
              );
            }
            _maybeScheduleHide() {
              this._config.autohide &&
                (this._hasMouseInteraction ||
                  this._hasKeyboardInteraction ||
                  (this._timeout = setTimeout(() => {
                    this.hide();
                  }, this._config.delay)));
            }
            _onInteraction(e, t) {
              switch (e.type) {
                case "mouseover":
                case "mouseout":
                  this._hasMouseInteraction = t;
                  break;
                case "focusin":
                case "focusout":
                  this._hasKeyboardInteraction = t;
              }
              if (t) return void this._clearTimeout();
              const n = e.relatedTarget;
              this._element === n ||
                this._element.contains(n) ||
                this._maybeScheduleHide();
            }
            _setListeners() {
              e.on(this._element, "mouseover.bs.toast", (e) =>
                this._onInteraction(e, !0)
              ),
                e.on(this._element, "mouseout.bs.toast", (e) =>
                  this._onInteraction(e, !1)
                ),
                e.on(this._element, "focusin.bs.toast", (e) =>
                  this._onInteraction(e, !0)
                ),
                e.on(this._element, "focusout.bs.toast", (e) =>
                  this._onInteraction(e, !1)
                );
            }
            _clearTimeout() {
              clearTimeout(this._timeout), (this._timeout = null);
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = be.getOrCreateInstance(this, e);
                if (typeof e == "string") {
                  if (t[e] === void 0)
                    throw new TypeError(`No method named "${e}"`);
                  t[e](this);
                }
              });
            }
          }
          return (
            ve(be),
            d(be),
            {
              Alert: he,
              Button: ge,
              Carousel: v,
              Collapse: I,
              Dropdown: c,
              Modal: D,
              Offcanvas: S,
              Popover: Ie,
              ScrollSpy: ce,
              Tab: ae,
              Toast: be,
              Tooltip: H,
            }
          );
        });
      },
    }),
    d = c(l());
})();
