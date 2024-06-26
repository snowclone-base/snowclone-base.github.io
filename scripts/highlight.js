(() => {
  var c = Object.create,
    t = Object.defineProperty,
    x = Object.getOwnPropertyDescriptor,
    s = Object.getOwnPropertyNames,
    v = Object.getPrototypeOf,
    g = Object.prototype.hasOwnProperty,
    p = (e, t) =>
      function () {
        return (
          t ||
            (0, e[s(e)[0]])(
              (t = {
                exports: {},
              }).exports,
              t
            ),
          t.exports
        );
      },
    h = (e, n, o, i) => {
      if ((n && typeof n == "object") || typeof n == "function")
        for (let a of s(n))
          !g.call(e, a) &&
            a !== o &&
            t(e, a, {
              get: () => n[a],
              enumerable: !(i = x(n, a)) || i.enumerable,
            });
      return e;
    },
    u = (e, n, s) => (
      (s = e != null ? c(v(e)) : {}),
      h(
        n || !e || !e.__esModule
          ? t(s, "default", {
              value: e,
              enumerable: !0,
            })
          : s,
        e
      )
    ),
    l = p({
      "node_modules/highlight.js/lib/core.js"(e, t) {
        var n,
          i,
          a,
          r,
          l,
          d,
          u,
          h,
          m,
          f,
          p,
          g,
          v,
          b,
          _,
          O,
          C,
          E,
          k,
          A,
          M,
          F,
          T,
          z,
          D,
          N,
          L,
          P,
          H,
          I,
          B,
          V,
          $,
          W,
          U,
          K,
          q,
          Y,
          G,
          X,
          Z,
          J,
          j = {
            exports: {},
          },
          ae,
          ce,
          le,
          ne,
          de,
          se,
          oe,
          ee;
        function w(e) {
          return (
            e instanceof Map
              ? (e.clear =
                  e.delete =
                  e.set =
                    function () {
                      throw new Error("map is read-only");
                    })
              : e instanceof Set &&
                (e.add =
                  e.clear =
                  e.delete =
                    function () {
                      throw new Error("set is read-only");
                    }),
            Object.freeze(e),
            Object.getOwnPropertyNames(e).forEach(function (t) {
              var n = e[t];
              typeof n == "object" && !Object.isFrozen(n) && w(n);
            }),
            e
          );
        }
        (j.exports = w),
          (j.exports.default = w),
          (G = j.exports),
          (b = class {
            constructor(e) {
              e.data === void 0 && (e.data = {}),
                (this.data = e.data),
                (this.isMatchIgnored = !1);
            }
            ignoreMatch() {
              this.isMatchIgnored = !0;
            }
          });
        function Q(e) {
          return e
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;");
        }
        function s(t, ...n) {
          const e = Object.create(null);
          for (const n in t) e[n] = t[n];
          return (
            n.forEach(function (t) {
              for (const n in t) e[n] = t[n];
            }),
            e
          );
        }
        (Z = "</span>"),
          (g = (e) => !!e.kind),
          (ae = (e, { prefix: t }) => {
            if (e.includes(".")) {
              const n = e.split(".");
              return [
                `${t}${n.shift()}`,
                ...n.map((e, t) => `${e}${"_".repeat(t + 1)}`),
              ].join(" ");
            }
            return `${t}${e}`;
          }),
          (ce = class {
            constructor(e, t) {
              (this.buffer = ""),
                (this.classPrefix = t.classPrefix),
                e.walk(this);
            }
            addText(e) {
              this.buffer += Q(e);
            }
            openNode(e) {
              if (!g(e)) return;
              let t = e.kind;
              e.sublanguage
                ? (t = `language-${t}`)
                : (t = ae(t, {
                    prefix: this.classPrefix,
                  })),
                this.span(t);
            }
            closeNode(e) {
              if (!g(e)) return;
              this.buffer += Z;
            }
            value() {
              return this.buffer;
            }
            span(e) {
              this.buffer += `<span class="${e}">`;
            }
          }),
          (p = class {
            constructor() {
              (this.rootNode = {
                children: [],
              }),
                (this.stack = [this.rootNode]);
            }
            get top() {
              return this.stack[this.stack.length - 1];
            }
            get root() {
              return this.rootNode;
            }
            add(e) {
              this.top.children.push(e);
            }
            openNode(e) {
              const t = {
                kind: e,
                children: [],
              };
              this.add(t), this.stack.push(t);
            }
            closeNode() {
              return this.stack.length > 1 ? this.stack.pop() : void 0;
            }
            closeAllNodes() {
              for (; this.closeNode(); );
            }
            toJSON() {
              return JSON.stringify(this.rootNode, null, 4);
            }
            walk(e) {
              return this.constructor._walk(e, this.rootNode);
            }
            static _walk(e, t) {
              return (
                typeof t == "string"
                  ? e.addText(t)
                  : t.children &&
                    (e.openNode(t),
                    t.children.forEach((t) => this._walk(e, t)),
                    e.closeNode(t)),
                e
              );
            }
            static _collapse(e) {
              if (typeof e == "string") return;
              if (!e.children) return;
              e.children.every((e) => typeof e == "string")
                ? (e.children = [e.children.join("")])
                : e.children.forEach((e) => {
                    p._collapse(e);
                  });
            }
          }),
          (le = class extends p {
            constructor(e) {
              super(), (this.options = e);
            }
            addKeyword(e, t) {
              if (e === "") return;
              this.openNode(t), this.addText(e), this.closeNode();
            }
            addText(e) {
              if (e === "") return;
              this.add(e);
            }
            addSublanguage(e, t) {
              const n = e.root;
              (n.kind = t), (n.sublanguage = !0), this.add(n);
            }
            toHTML() {
              const e = new ce(this, this.options);
              return e.value();
            }
            finalize() {
              return !0;
            }
          });
        function c(e) {
          return e ? (typeof e == "string" ? e : e.source) : null;
        }
        function S(e) {
          return o("(?=", e, ")");
        }
        function ue(e) {
          return o("(?:", e, ")*");
        }
        function Ce(e) {
          return o("(?:", e, ")?");
        }
        function o(...e) {
          const t = e.map((e) => c(e)).join("");
          return t;
        }
        function Ee(e) {
          const t = e[e.length - 1];
          return typeof t == "object" && t.constructor === Object
            ? (e.splice(e.length - 1, 1), t)
            : {};
        }
        function y(...e) {
          const t = Ee(e),
            n =
              "(" +
              (t.capture ? "" : "?:") +
              e.map((e) => c(e)).join("|") +
              ")";
          return n;
        }
        function R(e) {
          return new RegExp(e.toString() + "|").exec("").length - 1;
        }
        function ke(e, t) {
          const n = e && e.exec(t);
          return n && n.index === 0;
        }
        M = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
        function x(e, { joinWith: t }) {
          let n = 0;
          return e
            .map((e) => {
              n += 1;
              const o = n;
              let t = c(e),
                s = "";
              for (; t.length > 0; ) {
                const e = M.exec(t);
                if (!e) {
                  s += t;
                  break;
                }
                (s += t.substring(0, e.index)),
                  (t = t.substring(e.index + e[0].length)),
                  e[0][0] === "\\" && e[1]
                    ? (s += "\\" + String(Number(e[1]) + o))
                    : ((s += e[0]), e[0] === "(" && n++);
              }
              return s;
            })
            .map((e) => `(${e})`)
            .join(t);
        }
        (ne = /\b\B/),
          (E = "[a-zA-Z]\\w*"),
          (m = "[a-zA-Z_]\\w*"),
          (k = "\\b\\d+(\\.\\d+)?"),
          (C =
            "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"),
          (O = "\\b(0b[01]+)"),
          (F =
            "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"),
          (T = (e = {}) => {
            const t = /^#![ ]*\//;
            return (
              e.binary && (e.begin = o(t, /.*\b/, e.binary, /\b.*/)),
              s(
                {
                  scope: "meta",
                  begin: t,
                  end: /$/,
                  relevance: 0,
                  "on:begin": (e, t) => {
                    e.index !== 0 && t.ignoreMatch();
                  },
                },
                e
              )
            );
          }),
          (r = {
            begin: "\\\\[\\s\\S]",
            relevance: 0,
          }),
          (D = {
            scope: "string",
            begin: "'",
            end: "'",
            illegal: `\\n`,
            contains: [r],
          }),
          (N = {
            scope: "string",
            begin: '"',
            end: '"',
            illegal: `\\n`,
            contains: [r],
          }),
          (L = {
            begin:
              /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
          }),
          (d = function (e, t, n = {}) {
            const i = s(
              {
                scope: "comment",
                begin: e,
                end: t,
                contains: [],
              },
              n
            );
            i.contains.push({
              scope: "doctag",
              begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
              end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
              excludeBegin: !0,
              relevance: 0,
            });
            const a = y(
              "I",
              "a",
              "is",
              "so",
              "us",
              "to",
              "at",
              "if",
              "in",
              "it",
              "on",
              /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
              /[A-Za-z]+[-][a-z]+/,
              /[A-Za-z][a-z]{2,}/
            );
            return (
              i.contains.push({
                begin: o(/[ ]+/, "(", a, /[.]?[:]?([.][ ]|[ ])/, "){3}"),
              }),
              i
            );
          }),
          (P = d("//", "$")),
          (H = d("/\\*", "\\*/")),
          (I = d("#", "$")),
          (B = {
            scope: "number",
            begin: k,
            relevance: 0,
          }),
          (de = {
            scope: "number",
            begin: C,
            relevance: 0,
          }),
          ($ = {
            scope: "number",
            begin: O,
            relevance: 0,
          }),
          (W = {
            begin: /(?=\/[^/\n]*\/)/,
            contains: [
              {
                scope: "regexp",
                begin: /\//,
                end: /\/[gimuy]*/,
                illegal: /\n/,
                contains: [
                  r,
                  {
                    begin: /\[/,
                    end: /\]/,
                    relevance: 0,
                    contains: [r],
                  },
                ],
              },
            ],
          }),
          (U = {
            scope: "title",
            begin: E,
            relevance: 0,
          }),
          (K = {
            scope: "title",
            begin: m,
            relevance: 0,
          }),
          (q = {
            begin: "\\.\\s*" + m,
            relevance: 0,
          }),
          (Y = function (e) {
            return Object.assign(e, {
              "on:begin": (e, t) => {
                t.data._beginMatch = e[1];
              },
              "on:end": (e, t) => {
                t.data._beginMatch !== e[1] && t.ignoreMatch();
              },
            });
          }),
          (l = Object.freeze({
            __proto__: null,
            MATCH_NOTHING_RE: ne,
            IDENT_RE: E,
            UNDERSCORE_IDENT_RE: m,
            NUMBER_RE: k,
            C_NUMBER_RE: C,
            BINARY_NUMBER_RE: O,
            RE_STARTERS_RE: F,
            SHEBANG: T,
            BACKSLASH_ESCAPE: r,
            APOS_STRING_MODE: D,
            QUOTE_STRING_MODE: N,
            PHRASAL_WORDS_MODE: L,
            COMMENT: d,
            C_LINE_COMMENT_MODE: P,
            C_BLOCK_COMMENT_MODE: H,
            HASH_COMMENT_MODE: I,
            NUMBER_MODE: B,
            C_NUMBER_MODE: de,
            BINARY_NUMBER_MODE: $,
            REGEXP_MODE: W,
            TITLE_MODE: U,
            UNDERSCORE_TITLE_MODE: K,
            METHOD_GUARD: q,
            END_SAME_AS_BEGIN: Y,
          }));
        function Ae(e, t) {
          const n = e.input[e.index - 1];
          n === "." && t.ignoreMatch();
        }
        function xe(e) {
          e.className !== void 0 &&
            ((e.scope = e.className), delete e.className);
        }
        function Oe(e, t) {
          if (!t) return;
          if (!e.beginKeywords) return;
          (e.begin =
            "\\b(" +
            e.beginKeywords.split(" ").join("|") +
            ")(?!\\.)(?=\\b|\\s)"),
            (e.__beforeBegin = Ae),
            (e.keywords = e.keywords || e.beginKeywords),
            delete e.beginKeywords,
            e.relevance === void 0 && (e.relevance = 0);
        }
        function we(e) {
          if (!Array.isArray(e.illegal)) return;
          e.illegal = y(...e.illegal);
        }
        function _e(e) {
          if (!e.match) return;
          if (e.begin || e.end)
            throw new Error("begin & end are not supported with match");
          (e.begin = e.match), delete e.match;
        }
        function je(e) {
          e.relevance === void 0 && (e.relevance = 1);
        }
        (X = (e) => {
          if (!e.beforeMatch) return;
          if (e.starts)
            throw new Error("beforeMatch cannot be used with starts");
          const n = Object.assign({}, e);
          Object.keys(e).forEach((t) => {
            delete e[t];
          }),
            (e.keywords = n.keywords),
            (e.begin = o(n.beforeMatch, S(n.begin))),
            (e.starts = {
              relevance: 0,
              contains: [
                Object.assign(n, {
                  endsParent: !0,
                }),
              ],
            }),
            (e.relevance = 0),
            delete n.beforeMatch;
        }),
          (se = [
            "of",
            "and",
            "for",
            "in",
            "not",
            "or",
            "if",
            "then",
            "parent",
            "list",
            "value",
          ]),
          (oe = "keyword");
        function ie(e, t, n = oe) {
          const s = Object.create(null);
          return (
            typeof e == "string"
              ? o(n, e.split(" "))
              : Array.isArray(e)
              ? o(n, e)
              : Object.keys(e).forEach(function (n) {
                  Object.assign(s, ie(e[n], t, n));
                }),
            s
          );
          function o(e, n) {
            t && (n = n.map((e) => e.toLowerCase())),
              n.forEach(function (t) {
                const n = t.split("|");
                s[n[0]] = [e, be(n[0], n[1])];
              });
          }
        }
        function be(e, t) {
          return t ? Number(t) : me(e) ? 0 : 1;
        }
        function me(e) {
          return se.includes(e.toLowerCase());
        }
        (A = {}),
          (n = (e) => {
            console.error(e);
          }),
          (f = (e, ...t) => {
            console.log(`WARN: ${e}`, ...t);
          }),
          (i = (e, t) => {
            if (A[`${e}/${t}`]) return;
            console.log(`Deprecated as of ${e}. ${t}`), (A[`${e}/${t}`] = !0);
          }),
          (u = new Error());
        function re(e, t, { key: n }) {
          let s = 0;
          const a = e[n],
            o = {},
            i = {};
          for (let e = 1; e <= t.length; e++)
            (i[e + s] = a[e]), (o[e + s] = !0), (s += R(t[e - 1]));
          (e[n] = i), (e[n]._emit = o), (e[n]._multi = !0);
        }
        function fe(e) {
          if (!Array.isArray(e.begin)) return;
          if (e.skip || e.excludeBegin || e.returnBegin)
            throw (
              (n(
                "skip, excludeBegin, returnBegin not compatible with beginScope: {}"
              ),
              u)
            );
          if (typeof e.beginScope != "object" || e.beginScope === null)
            throw (n("beginScope must be object"), u);
          re(e, e.begin, {
            key: "beginScope",
          }),
            (e.begin = x(e.begin, {
              joinWith: "",
            }));
        }
        function pe(e) {
          if (!Array.isArray(e.end)) return;
          if (e.skip || e.excludeEnd || e.returnEnd)
            throw (
              (n(
                "skip, excludeEnd, returnEnd not compatible with endScope: {}"
              ),
              u)
            );
          if (typeof e.endScope != "object" || e.endScope === null)
            throw (n("endScope must be object"), u);
          re(e, e.end, {
            key: "endScope",
          }),
            (e.end = x(e.end, {
              joinWith: "",
            }));
        }
        function ge(e) {
          e.scope &&
            typeof e.scope == "object" &&
            e.scope !== null &&
            ((e.beginScope = e.scope), delete e.scope);
        }
        function ve(e) {
          ge(e),
            typeof e.beginScope == "string" &&
              (e.beginScope = {
                _wrap: e.beginScope,
              }),
            typeof e.endScope == "string" &&
              (e.endScope = {
                _wrap: e.endScope,
              }),
            fe(e),
            pe(e);
        }
        function he(e) {
          function t(t, n) {
            return new RegExp(
              c(t),
              "m" +
                (e.case_insensitive ? "i" : "") +
                (e.unicodeRegex ? "u" : "") +
                (n ? "g" : "")
            );
          }
          class o {
            constructor() {
              (this.matchIndexes = {}),
                (this.regexes = []),
                (this.matchAt = 1),
                (this.position = 0);
            }
            addRule(e, t) {
              (t.position = this.position++),
                (this.matchIndexes[this.matchAt] = t),
                this.regexes.push([t, e]),
                (this.matchAt += R(e) + 1);
            }
            compile() {
              this.regexes.length === 0 && (this.exec = () => null);
              const e = this.regexes.map((e) => e[1]);
              (this.matcherRe = t(
                x(e, {
                  joinWith: "|",
                }),
                !0
              )),
                (this.lastIndex = 0);
            }
            exec(e) {
              this.matcherRe.lastIndex = this.lastIndex;
              const t = this.matcherRe.exec(e);
              if (!t) return null;
              const n = t.findIndex((e, t) => t > 0 && e !== void 0),
                s = this.matchIndexes[n];
              return t.splice(0, n), Object.assign(t, s);
            }
          }
          class i {
            constructor() {
              (this.rules = []),
                (this.multiRegexes = []),
                (this.count = 0),
                (this.lastIndex = 0),
                (this.regexIndex = 0);
            }
            getMatcher(e) {
              if (this.multiRegexes[e]) return this.multiRegexes[e];
              const t = new o();
              return (
                this.rules.slice(e).forEach(([e, n]) => t.addRule(e, n)),
                t.compile(),
                (this.multiRegexes[e] = t),
                t
              );
            }
            resumingScanAtSamePosition() {
              return this.regexIndex !== 0;
            }
            considerAll() {
              this.regexIndex = 0;
            }
            addRule(e, t) {
              this.rules.push([e, t]), t.type === "begin" && this.count++;
            }
            exec(e) {
              const n = this.getMatcher(this.regexIndex);
              n.lastIndex = this.lastIndex;
              let t = n.exec(e);
              if (this.resumingScanAtSamePosition())
                if (t && t.index === this.lastIndex);
                else {
                  const n = this.getMatcher(0);
                  (n.lastIndex = this.lastIndex + 1), (t = n.exec(e));
                }
              return (
                t &&
                  ((this.regexIndex += t.position + 1),
                  this.regexIndex === this.count && this.considerAll()),
                t
              );
            }
          }
          function a(e) {
            const t = new i();
            return (
              e.contains.forEach((e) =>
                t.addRule(e.begin, {
                  rule: e,
                  type: "begin",
                })
              ),
              e.terminatorEnd &&
                t.addRule(e.terminatorEnd, {
                  type: "end",
                }),
              e.illegal &&
                t.addRule(e.illegal, {
                  type: "illegal",
                }),
              t
            );
          }
          function n(s, o) {
            const i = s;
            if (s.isCompiled) return i;
            [xe, _e, ve, X].forEach((e) => e(s, o)),
              e.compilerExtensions.forEach((e) => e(s, o)),
              (s.__beforeBegin = null),
              [Oe, we, je].forEach((e) => e(s, o)),
              (s.isCompiled = !0);
            let r = null;
            return (
              typeof s.keywords == "object" &&
                s.keywords.$pattern &&
                ((s.keywords = Object.assign({}, s.keywords)),
                (r = s.keywords.$pattern),
                delete s.keywords.$pattern),
              (r = r || /\w+/),
              s.keywords && (s.keywords = ie(s.keywords, e.case_insensitive)),
              (i.keywordPatternRe = t(r, !0)),
              o &&
                (s.begin || (s.begin = /\B|\b/),
                (i.beginRe = t(i.begin)),
                !s.end && !s.endsWithParent && (s.end = /\B|\b/),
                s.end && (i.endRe = t(i.end)),
                (i.terminatorEnd = c(i.end) || ""),
                s.endsWithParent &&
                  o.terminatorEnd &&
                  (i.terminatorEnd += (s.end ? "|" : "") + o.terminatorEnd)),
              s.illegal && (i.illegalRe = t(s.illegal)),
              s.contains || (s.contains = []),
              (s.contains = [].concat(
                ...s.contains.map(function (e) {
                  return ye(e === "self" ? s : e);
                })
              )),
              s.contains.forEach(function (e) {
                n(e, i);
              }),
              s.starts && n(s.starts, o),
              (i.matcher = a(i)),
              i
            );
          }
          if (
            (e.compilerExtensions || (e.compilerExtensions = []),
            e.contains && e.contains.includes("self"))
          )
            throw new Error(
              "ERR: contains `self` is not supported at the top-level of a language.  See documentation."
            );
          return (e.classNameAliases = s(e.classNameAliases || {})), n(e);
        }
        function te(e) {
          return !!e && (e.endsWithParent || te(e.starts));
        }
        function ye(e) {
          return (
            e.variants &&
              !e.cachedVariants &&
              (e.cachedVariants = e.variants.map(function (t) {
                return s(
                  e,
                  {
                    variants: null,
                  },
                  t
                );
              })),
            e.cachedVariants
              ? e.cachedVariants
              : te(e)
              ? s(e, {
                  starts: e.starts ? s(e.starts) : null,
                })
              : Object.isFrozen(e)
              ? s(e)
              : e
          );
        }
        (ee = "11.5.1"),
          (J = class extends Error {
            constructor(e, t) {
              super(e), (this.name = "HTMLInjectionError"), (this.html = t);
            }
          }),
          (h = Q),
          (v = s),
          (_ = Symbol("nomatch")),
          (V = 7),
          (z = function (e) {
            const a = Object.create(null),
              r = Object.create(null),
              k = [];
            let c = !0;
            const E =
                "Could not find the language '{}', did you forget to load/include a language module?",
              C = {
                disableAutodetect: !0,
                name: "Plain text",
                contains: [],
              };
            let t = {
              ignoreUnescapedHTML: !1,
              throwUnescapedHTML: !1,
              noHighlightRe: /^(no-?highlight)$/i,
              languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
              classPrefix: "hljs-",
              cssSelector: "pre code",
              languages: null,
              __emitter: le,
            };
            function O(e) {
              return t.noHighlightRe.test(e);
            }
            function B(e) {
              let o = e.className + " ";
              o += e.parentNode ? e.parentNode.className : "";
              const n = t.languageDetectRe.exec(o);
              if (n) {
                const t = s(n[1]);
                return (
                  t ||
                    (f(E.replace("{}", n[1])),
                    f("Falling back to no-highlight mode for this block.", e)),
                  t ? n[1] : "no-highlight"
                );
              }
              return o.split(/\s+/).find((e) => O(e) || s(e));
            }
            function j(e, t, n) {
              let o = "",
                a = "";
              typeof t == "object"
                ? ((o = e), (n = t.ignoreIllegals), (a = t.language))
                : (i(
                    "10.7.0",
                    "highlight(lang, code, ...args) has been deprecated."
                  ),
                  i(
                    "10.7.0",
                    `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`
                  ),
                  (a = e),
                  (o = t)),
                n === void 0 && (n = !0);
              const s = {
                code: o,
                language: a,
              };
              d("before:highlight", s);
              const r = s.result ? s.result : p(s.language, s.code, n);
              return (r.code = s.code), d("after:highlight", r), r;
            }
            function p(e, o, i, r) {
              const x = Object.create(null);
              function P(e, t) {
                return e.keywords[t];
              }
              function A() {
                if (!l.keywords) {
                  u.addText(d);
                  return;
                }
                let n = 0;
                l.keywordPatternRe.lastIndex = 0;
                let e = l.keywordPatternRe.exec(d),
                  t = "";
                for (; e; ) {
                  t += d.substring(n, e.index);
                  const s = m.case_insensitive ? e[0].toLowerCase() : e[0],
                    o = P(l, s);
                  if (o) {
                    const [n, i] = o;
                    if (
                      (u.addText(t),
                      (t = ""),
                      (x[s] = (x[s] || 0) + 1),
                      x[s] <= V && (y += i),
                      n.startsWith("_"))
                    )
                      t += e[0];
                    else {
                      const t = m.classNameAliases[n] || n;
                      u.addKeyword(e[0], t);
                    }
                  } else t += e[0];
                  (n = l.keywordPatternRe.lastIndex),
                    (e = l.keywordPatternRe.exec(d));
                }
                (t += d.substr(n)), u.addText(t);
              }
              function L() {
                if (d === "") return;
                let e = null;
                if (typeof l.subLanguage == "string") {
                  if (!a[l.subLanguage]) {
                    u.addText(d);
                    return;
                  }
                  (e = p(l.subLanguage, d, !0, T[l.subLanguage])),
                    (T[l.subLanguage] = e._top);
                } else e = g(d, l.subLanguage.length ? l.subLanguage : null);
                l.relevance > 0 && (y += e.relevance),
                  u.addSublanguage(e._emitter, e.language);
              }
              function v() {
                l.subLanguage != null ? L() : A(), (d = "");
              }
              function M(e, t) {
                let n = 1;
                const s = t.length - 1;
                for (; n <= s; ) {
                  if (!e._emit[n]) {
                    n++;
                    continue;
                  }
                  const s = m.classNameAliases[e[n]] || e[n],
                    o = t[n];
                  s ? u.addKeyword(o, s) : ((d = o), A(), (d = "")), n++;
                }
              }
              function F(e, t) {
                return (
                  e.scope &&
                    typeof e.scope == "string" &&
                    u.openNode(m.classNameAliases[e.scope] || e.scope),
                  e.beginScope &&
                    (e.beginScope._wrap
                      ? (u.addKeyword(
                          d,
                          m.classNameAliases[e.beginScope._wrap] ||
                            e.beginScope._wrap
                        ),
                        (d = ""))
                      : e.beginScope._multi && (M(e.beginScope, t), (d = ""))),
                  (l = Object.create(e, {
                    parent: {
                      value: l,
                    },
                  })),
                  l
                );
              }
              function k(e, t, n) {
                let s = ke(e.endRe, n);
                if (s) {
                  if (e["on:end"]) {
                    const n = new b(e);
                    e["on:end"](t, n), n.isMatchIgnored && (s = !1);
                  }
                  if (s) {
                    for (; e.endsParent && e.parent; ) e = e.parent;
                    return e;
                  }
                }
                if (e.endsWithParent) return k(e.parent, t, n);
              }
              function z(e) {
                return l.matcher.regexIndex === 0
                  ? ((d += e[0]), 1)
                  : ((C = !0), 0);
              }
              function N(e) {
                const n = e[0],
                  t = e.rule,
                  s = new b(t),
                  o = [t.__beforeBegin, t["on:begin"]];
                for (const t of o) {
                  if (!t) continue;
                  if ((t(e, s), s.isMatchIgnored)) return z(n);
                }
                return (
                  t.skip
                    ? (d += n)
                    : (t.excludeBegin && (d += n),
                      v(),
                      !t.returnBegin && !t.excludeBegin && (d = n)),
                  F(t, e),
                  t.returnBegin ? 0 : n.length
                );
              }
              function R(e) {
                const t = e[0],
                  i = o.substr(e.index),
                  s = k(l, e, i);
                if (!s) return _;
                const n = l;
                l.endScope && l.endScope._wrap
                  ? (v(), u.addKeyword(t, l.endScope._wrap))
                  : l.endScope && l.endScope._multi
                  ? (v(), M(l.endScope, e))
                  : n.skip
                  ? (d += t)
                  : (n.returnEnd || n.excludeEnd || (d += t),
                    v(),
                    n.excludeEnd && (d = t));
                do
                  l.scope && u.closeNode(),
                    !l.skip && !l.subLanguage && (y += l.relevance),
                    (l = l.parent);
                while (l !== s.parent);
                return s.starts && F(s.starts, e), n.returnEnd ? 0 : t.length;
              }
              function H() {
                const e = [];
                for (let t = l; t !== m; t = t.parent)
                  t.scope && e.unshift(t.scope);
                e.forEach((e) => u.openNode(e));
              }
              let j = {};
              function S(t, n) {
                const s = n && n[0];
                if (((d += t), s == null)) return v(), 0;
                if (
                  j.type === "begin" &&
                  n.type === "end" &&
                  j.index === n.index &&
                  s === ""
                ) {
                  if (((d += o.slice(n.index, n.index + 1)), !c)) {
                    const t = new Error(`0 width match regex (${e})`);
                    throw ((t.languageName = e), (t.badRule = j.rule), t);
                  }
                  return 1;
                }
                if (((j = n), n.type === "begin")) return N(n);
                if (n.type === "illegal" && !i) {
                  const e = new Error(
                    'Illegal lexeme "' +
                      s +
                      '" for mode "' +
                      (l.scope || "<unnamed>") +
                      '"'
                  );
                  throw ((e.mode = l), e);
                }
                if (n.type === "end") {
                  const e = R(n);
                  if (e !== _) return e;
                }
                if (n.type === "illegal" && s === "") return 1;
                if (w > 1e5 && w > n.index * 3) {
                  const e = new Error(
                    "potential infinite loop, way more iterations than matches"
                  );
                  throw e;
                }
                return (d += s), s.length;
              }
              const m = s(e);
              if (!m)
                throw (
                  (n(E.replace("{}", e)),
                  new Error('Unknown language: "' + e + '"'))
                );
              const D = he(m);
              let O = "",
                l = r || D;
              const T = {},
                u = new t.__emitter(t);
              H();
              let d = "",
                y = 0,
                f = 0,
                w = 0,
                C = !1;
              try {
                for (l.matcher.considerAll(); ; ) {
                  w++,
                    C ? (C = !1) : l.matcher.considerAll(),
                    (l.matcher.lastIndex = f);
                  const e = l.matcher.exec(o);
                  if (!e) break;
                  const t = o.substring(f, e.index),
                    n = S(t, e);
                  f = e.index + n;
                }
                return (
                  S(o.substr(f)),
                  u.closeAllNodes(),
                  u.finalize(),
                  (O = u.toHTML()),
                  {
                    language: e,
                    value: O,
                    relevance: y,
                    illegal: !1,
                    _emitter: u,
                    _top: l,
                  }
                );
              } catch (t) {
                if (t.message && t.message.includes("Illegal"))
                  return {
                    language: e,
                    value: h(o),
                    illegal: !0,
                    relevance: 0,
                    _illegalBy: {
                      message: t.message,
                      index: f,
                      context: o.slice(f - 100, f + 100),
                      mode: t.mode,
                      resultSoFar: O,
                    },
                    _emitter: u,
                  };
                if (c)
                  return {
                    language: e,
                    value: h(o),
                    illegal: !1,
                    relevance: 0,
                    errorRaised: t,
                    _emitter: u,
                    _top: l,
                  };
                throw t;
              }
            }
            function P(e) {
              const n = {
                value: h(e),
                illegal: !1,
                relevance: 0,
                _top: C,
                _emitter: new t.__emitter(t),
              };
              return n._emitter.addText(e), n;
            }
            function g(e, n) {
              n = n || t.languages || Object.keys(a);
              const r = P(e),
                o = n
                  .filter(s)
                  .filter(w)
                  .map((t) => p(t, e, !1));
              o.unshift(r);
              const c = o.sort((e, t) => {
                  if (e.relevance !== t.relevance)
                    return t.relevance - e.relevance;
                  if (e.language && t.language) {
                    if (s(e.language).supersetOf === t.language) return 1;
                    if (s(t.language).supersetOf === e.language) return -1;
                  }
                  return 0;
                }),
                [l, d] = c,
                i = l;
              return (i.secondBest = d), i;
            }
            function R(e, t, n) {
              const s = (t && r[t]) || n;
              e.classList.add("hljs"), e.classList.add(`language-${s}`);
            }
            function m(e) {
              let i = null;
              const s = B(e);
              if (O(s)) return;
              if (
                (d("before:highlightElement", {
                  el: e,
                  language: s,
                }),
                e.children.length > 0 &&
                  (t.ignoreUnescapedHTML ||
                    (console.warn(
                      "One of your code blocks includes unescaped HTML. This is a potentially serious security risk."
                    ),
                    console.warn(
                      "https://github.com/highlightjs/highlight.js/wiki/security"
                    ),
                    console.warn("The element with unescaped HTML:"),
                    console.warn(e)),
                  t.throwUnescapedHTML))
              ) {
                const t = new J(
                  "One of your code blocks includes unescaped HTML.",
                  e.innerHTML
                );
                throw t;
              }
              i = e;
              const o = i.textContent,
                n = s
                  ? j(o, {
                      language: s,
                      ignoreIllegals: !0,
                    })
                  : g(o);
              (e.innerHTML = n.value),
                R(e, s, n.language),
                (e.result = {
                  language: n.language,
                  re: n.relevance,
                  relevance: n.relevance,
                }),
                n.secondBest &&
                  (e.secondBest = {
                    language: n.secondBest.language,
                    relevance: n.secondBest.relevance,
                  }),
                d("after:highlightElement", {
                  el: e,
                  result: n,
                  text: o,
                });
            }
            function M(e) {
              t = v(t, e);
            }
            const L = () => {
              u(),
                i(
                  "10.6.0",
                  "initHighlighting() deprecated.  Use highlightAll() now."
                );
            };
            function F() {
              u(),
                i(
                  "10.6.0",
                  "initHighlightingOnLoad() deprecated.  Use highlightAll() now."
                );
            }
            let A = !1;
            function u() {
              if (document.readyState === "loading") {
                A = !0;
                return;
              }
              const e = document.querySelectorAll(t.cssSelector);
              e.forEach(m);
            }
            function T() {
              A && u();
            }
            typeof window != "undefined" &&
              window.addEventListener &&
              window.addEventListener("DOMContentLoaded", T, !1);
            function z(t, s) {
              let o = null;
              try {
                o = s(e);
              } catch (e) {
                if (
                  (n(
                    "Language definition for '{}' could not be registered.".replace(
                      "{}",
                      t
                    )
                  ),
                  !c)
                )
                  throw e;
                n(e), (o = C);
              }
              o.name || (o.name = t),
                (a[t] = o),
                (o.rawDefinition = s.bind(null, e)),
                o.aliases &&
                  x(o.aliases, {
                    languageName: t,
                  });
            }
            function D(e) {
              delete a[e];
              for (const t of Object.keys(r)) r[t] === e && delete r[t];
            }
            function N() {
              return Object.keys(a);
            }
            function s(e) {
              return (e = (e || "").toLowerCase()), a[e] || a[r[e]];
            }
            function x(e, { languageName: t }) {
              typeof e == "string" && (e = [e]),
                e.forEach((e) => {
                  r[e.toLowerCase()] = t;
                });
            }
            function w(e) {
              const t = s(e);
              return t && !t.disableAutodetect;
            }
            function H(e) {
              e["before:highlightBlock"] &&
                !e["before:highlightElement"] &&
                (e["before:highlightElement"] = (t) => {
                  e["before:highlightBlock"](
                    Object.assign(
                      {
                        block: t.el,
                      },
                      t
                    )
                  );
                }),
                e["after:highlightBlock"] &&
                  !e["after:highlightElement"] &&
                  (e["after:highlightElement"] = (t) => {
                    e["after:highlightBlock"](
                      Object.assign(
                        {
                          block: t.el,
                        },
                        t
                      )
                    );
                  });
            }
            function I(e) {
              H(e), k.push(e);
            }
            function d(e, t) {
              const n = e;
              k.forEach(function (e) {
                e[n] && e[n](t);
              });
            }
            function $(e) {
              return (
                i("10.7.0", "highlightBlock will be removed entirely in v12.0"),
                i("10.7.0", "Please use highlightElement now."),
                m(e)
              );
            }
            Object.assign(e, {
              highlight: j,
              highlightAuto: g,
              highlightAll: u,
              highlightElement: m,
              highlightBlock: $,
              configure: M,
              initHighlighting: L,
              initHighlightingOnLoad: F,
              registerLanguage: z,
              unregisterLanguage: D,
              listLanguages: N,
              getLanguage: s,
              registerAliases: x,
              autoDetection: w,
              inherit: v,
              addPlugin: I,
            }),
              (e.debugMode = function () {
                c = !1;
              }),
              (e.safeMode = function () {
                c = !0;
              }),
              (e.versionString = ee),
              (e.regex = {
                concat: o,
                lookahead: S,
                either: y,
                optional: Ce,
                anyNumberOfTimes: ue,
              });
            for (const e in l) typeof l[e] == "object" && G(l[e]);
            return Object.assign(e, l), e;
          }),
          (a = z({})),
          (t.exports = a),
          (a.HighlightJS = a),
          (a.default = a);
      },
    }),
    d = u(l(), 1),
    e = d.default,
    r = "[A-Za-z$_][0-9A-Za-z$_]*",
    m = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends",
    ],
    f = ["true", "false", "null", "undefined", "NaN", "Infinity"],
    a = [
      "Object",
      "Function",
      "Boolean",
      "Symbol",
      "Math",
      "Date",
      "Number",
      "BigInt",
      "String",
      "RegExp",
      "Array",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Int32Array",
      "Uint16Array",
      "Uint32Array",
      "BigInt64Array",
      "BigUint64Array",
      "Set",
      "Map",
      "WeakSet",
      "WeakMap",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "Atomics",
      "DataView",
      "JSON",
      "Promise",
      "Generator",
      "GeneratorFunction",
      "AsyncFunction",
      "Reflect",
      "Proxy",
      "Intl",
      "WebAssembly",
    ],
    i = [
      "Error",
      "EvalError",
      "InternalError",
      "RangeError",
      "ReferenceError",
      "SyntaxError",
      "TypeError",
      "URIError",
    ],
    o = [
      "setInterval",
      "setTimeout",
      "clearInterval",
      "clearTimeout",
      "require",
      "exports",
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "escape",
      "unescape",
    ],
    b = [
      "arguments",
      "this",
      "super",
      "console",
      "window",
      "document",
      "localStorage",
      "module",
      "global",
    ],
    j = [].concat(o, a, i);
  function y(e) {
    const n = e.regex,
      S = (e, { after: t }) => {
        const n = "</" + e[0].slice(1),
          s = e.input.indexOf(n, t);
        return s !== -1;
      },
      t = r,
      A = {
        begin: "<>",
        end: "</>",
      },
      F = /<[A-Za-z0-9\\._:-]+\s*\/>/,
      l = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        isTrulyOpeningTag: (e, t) => {
          const n = e[0].length + e.index,
            s = e.input[n];
          if (s === "<" || s === ",") {
            t.ignoreMatch();
            return;
          }
          s === ">" &&
            (S(e, {
              after: n,
            }) ||
              t.ignoreMatch());
          let o;
          const i = e.input.substr(n);
          if ((o = i.match(/^\s+extends\s+/)) && o.index === 0) {
            t.ignoreMatch();
            return;
          }
        },
      },
      s = {
        $pattern: r,
        keyword: m,
        literal: f,
        built_in: j,
        "variable.language": b,
      },
      y = "[0-9](_?[0-9])*",
      u = `\\.(${y})`,
      g = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`,
      v = {
        className: "number",
        variants: [
          {
            begin: `(\\b(${g})((${u})|\\.)?|(${u}))[eE][+-]?(${y})\\b`,
          },
          {
            begin: `\\b(${g})\\b((${u})\\b|\\.)?|(${u})\\b`,
          },
          {
            begin: `\\b(0|[1-9](_?[0-9])*)n\\b`,
          },
          {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b",
          },
          {
            begin: "\\b0[bB][0-1](_?[0-1])*n?\\b",
          },
          {
            begin: "\\b0[oO][0-7](_?[0-7])*n?\\b",
          },
          {
            begin: "\\b0[0-7]+n?\\b",
          },
        ],
        relevance: 0,
      },
      d = {
        className: "subst",
        begin: "\\$\\{",
        end: "\\}",
        keywords: s,
        contains: [],
      },
      _ = {
        begin: "html`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [e.BACKSLASH_ESCAPE, d],
          subLanguage: "xml",
        },
      },
      w = {
        begin: "css`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [e.BACKSLASH_ESCAPE, d],
          subLanguage: "css",
        },
      },
      O = {
        className: "string",
        begin: "`",
        end: "`",
        contains: [e.BACKSLASH_ESCAPE, d],
      },
      H = e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
        relevance: 0,
        contains: [
          {
            begin: "(?=@[A-Za-z]+)",
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+",
              },
              {
                className: "type",
                begin: "\\{",
                end: "\\}",
                excludeEnd: !0,
                excludeBegin: !0,
                relevance: 0,
              },
              {
                className: "variable",
                begin: t + "(?=\\s*(-)|$)",
                endsParent: !0,
                relevance: 0,
              },
              {
                begin: /(?=[^\n])\s/,
                relevance: 0,
              },
            ],
          },
        ],
      }),
      p = {
        className: "comment",
        variants: [H, e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE],
      },
      E = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, _, w, O, v];
    d.contains = E.concat({
      begin: /\{/,
      end: /\}/,
      keywords: s,
      contains: ["self"].concat(E),
    });
    const k = [].concat(p, d.contains),
      h = k.concat([
        {
          begin: /\(/,
          end: /\)/,
          keywords: s,
          contains: ["self"].concat(k),
        },
      ]),
      c = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        keywords: s,
        contains: h,
      },
      M = {
        variants: [
          {
            match: [
              /class/,
              /\s+/,
              t,
              /\s+/,
              /extends/,
              /\s+/,
              n.concat(t, "(", n.concat(/\./, t), ")*"),
            ],
            scope: {
              1: "keyword",
              3: "title.class",
              5: "keyword",
              7: "title.class.inherited",
            },
          },
          {
            match: [/class/, /\s+/, t],
            scope: {
              1: "keyword",
              3: "title.class",
            },
          },
        ],
      },
      C = {
        relevance: 0,
        match: n.either(
          /\bJSON/,
          /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
          /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
          /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
        ),
        className: "title.class",
        keywords: {
          _: [...a, ...i],
        },
      },
      T = {
        label: "use_strict",
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/,
      },
      z = {
        variants: [
          {
            match: [/function/, /\s+/, t, /(?=\s*\()/],
          },
          {
            match: [/function/, /\s*(?=\()/],
          },
        ],
        className: {
          1: "keyword",
          3: "title.function",
        },
        label: "func.def",
        contains: [c],
        illegal: /%/,
      },
      D = {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: "variable.constant",
      };
    function N(e) {
      return n.concat("(?!", e.join("|"), ")");
    }
    const L = {
        match: n.concat(/\b/, N([...o, "super"]), t, n.lookahead(/\(/)),
        className: "title.function",
        relevance: 0,
      },
      R = {
        begin: n.concat(/\./, n.lookahead(n.concat(t, /(?![0-9A-Za-z$_(])/))),
        end: t,
        excludeBegin: !0,
        keywords: "prototype",
        className: "property",
        relevance: 0,
      },
      P = {
        match: [/get|set/, /\s+/, t, /(?=\()/],
        className: {
          1: "keyword",
          3: "title.function",
        },
        contains: [
          {
            begin: /\(\)/,
          },
          c,
        ],
      },
      x =
        "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" +
        e.UNDERSCORE_IDENT_RE +
        ")\\s*=>",
      I = {
        match: [
          /const|var|let/,
          /\s+/,
          t,
          /\s*/,
          /=\s*/,
          /(async\s*)?/,
          n.lookahead(x),
        ],
        keywords: "async",
        className: {
          1: "keyword",
          3: "title.function",
        },
        contains: [c],
      };
    return {
      name: "Javascript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: s,
      exports: {
        PARAMS_CONTAINS: h,
        CLASS_REFERENCE: C,
      },
      illegal: /#(?![$_A-z])/,
      contains: [
        e.SHEBANG({
          label: "shebang",
          binary: "node",
          relevance: 5,
        }),
        T,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        _,
        w,
        O,
        p,
        v,
        C,
        {
          className: "attr",
          begin: t + n.lookahead(":"),
          relevance: 0,
        },
        I,
        {
          begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
          keywords: "return throw case",
          relevance: 0,
          contains: [
            p,
            e.REGEXP_MODE,
            {
              className: "function",
              begin: x,
              returnBegin: !0,
              end: "\\s*=>",
              contains: [
                {
                  className: "params",
                  variants: [
                    {
                      begin: e.UNDERSCORE_IDENT_RE,
                      relevance: 0,
                    },
                    {
                      className: null,
                      begin: /\(\s*\)/,
                      skip: !0,
                    },
                    {
                      begin: /\(/,
                      end: /\)/,
                      excludeBegin: !0,
                      excludeEnd: !0,
                      keywords: s,
                      contains: h,
                    },
                  ],
                },
              ],
            },
            {
              begin: /,/,
              relevance: 0,
            },
            {
              match: /\s+/,
              relevance: 0,
            },
            {
              variants: [
                {
                  begin: A.begin,
                  end: A.end,
                },
                {
                  match: F,
                },
                {
                  begin: l.begin,
                  "on:begin": l.isTrulyOpeningTag,
                  end: l.end,
                },
              ],
              subLanguage: "xml",
              contains: [
                {
                  begin: l.begin,
                  end: l.end,
                  skip: !0,
                  contains: ["self"],
                },
              ],
            },
          ],
        },
        z,
        {
          beginKeywords: "while if switch catch for",
        },
        {
          begin:
            "\\b(?!function)" +
            e.UNDERSCORE_IDENT_RE +
            "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
          returnBegin: !0,
          label: "func.def",
          contains: [
            c,
            e.inherit(e.TITLE_MODE, {
              begin: t,
              className: "title.function",
            }),
          ],
        },
        {
          match: /\.\.\./,
          relevance: 0,
        },
        R,
        {
          match: "\\$" + t,
          relevance: 0,
        },
        {
          match: [/\bconstructor(?=\s*\()/],
          className: {
            1: "title.function",
          },
          contains: [c],
        },
        L,
        D,
        M,
        P,
        {
          match: /\$[(.]/,
        },
      ],
    };
  }
  function _(e) {
    const t = {
        className: "attr",
        begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
        relevance: 1.01,
      },
      n = {
        match: /[{}[\],:]/,
        className: "punctuation",
        relevance: 0,
      },
      s = {
        beginKeywords: ["true", "false", "null"].join(" "),
      };
    return {
      name: "JSON",
      contains: [
        t,
        n,
        e.QUOTE_STRING_MODE,
        s,
        e.C_NUMBER_MODE,
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
      ],
      illegal: "\\S",
    };
  }
  function w(e) {
    const o = e.regex,
      t = {},
      a = {
        begin: /\$\{/,
        end: /\}/,
        contains: [
          "self",
          {
            begin: /:-/,
            contains: [t],
          },
        ],
      };
    Object.assign(t, {
      className: "variable",
      variants: [
        {
          begin: o.concat(/\$[\w\d#@][\w\d_]*/, `(?![\\w\\d])(?![$])`),
        },
        a,
      ],
    });
    const n = {
        className: "subst",
        begin: /\$\(/,
        end: /\)/,
        contains: [e.BACKSLASH_ESCAPE],
      },
      i = {
        begin: /<<-?\s*(?=\w+)/,
        starts: {
          contains: [
            e.END_SAME_AS_BEGIN({
              begin: /(\w+)/,
              end: /(\w+)/,
              className: "string",
            }),
          ],
        },
      },
      s = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [e.BACKSLASH_ESCAPE, t, n],
      };
    n.contains.push(s);
    const r = {
        className: "",
        begin: /\\"/,
      },
      c = {
        className: "string",
        begin: /'/,
        end: /'/,
      },
      l = {
        begin: /\$\(\(/,
        end: /\)\)/,
        contains: [
          {
            begin: /\d+#[0-9a-f]+/,
            className: "number",
          },
          e.NUMBER_MODE,
          t,
        ],
      },
      d = ["fish", "bash", "zsh", "sh", "csh", "ksh", "tcsh", "dash", "scsh"],
      u = e.SHEBANG({
        binary: `(${d.join("|")})`,
        relevance: 10,
      }),
      h = {
        className: "function",
        begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        returnBegin: !0,
        contains: [
          e.inherit(e.TITLE_MODE, {
            begin: /\w[\w\d_]*/,
          }),
        ],
        relevance: 0,
      },
      m = [
        "if",
        "then",
        "else",
        "elif",
        "fi",
        "for",
        "while",
        "in",
        "do",
        "done",
        "case",
        "esac",
        "function",
      ],
      f = ["true", "false"],
      p = {
        match: /(\/[a-z._-]+)+/,
      },
      g = [
        "break",
        "cd",
        "continue",
        "eval",
        "exec",
        "exit",
        "export",
        "getopts",
        "hash",
        "pwd",
        "readonly",
        "return",
        "shift",
        "test",
        "times",
        "trap",
        "umask",
        "unset",
      ],
      v = [
        "alias",
        "bind",
        "builtin",
        "caller",
        "command",
        "declare",
        "echo",
        "enable",
        "help",
        "let",
        "local",
        "logout",
        "mapfile",
        "printf",
        "read",
        "readarray",
        "source",
        "type",
        "typeset",
        "ulimit",
        "unalias",
      ],
      b = [
        "autoload",
        "bg",
        "bindkey",
        "bye",
        "cap",
        "chdir",
        "clone",
        "comparguments",
        "compcall",
        "compctl",
        "compdescribe",
        "compfiles",
        "compgroups",
        "compquote",
        "comptags",
        "comptry",
        "compvalues",
        "dirs",
        "disable",
        "disown",
        "echotc",
        "echoti",
        "emulate",
        "fc",
        "fg",
        "float",
        "functions",
        "getcap",
        "getln",
        "history",
        "integer",
        "jobs",
        "kill",
        "limit",
        "log",
        "noglob",
        "popd",
        "print",
        "pushd",
        "pushln",
        "rehash",
        "sched",
        "setcap",
        "setopt",
        "stat",
        "suspend",
        "ttyctl",
        "unfunction",
        "unhash",
        "unlimit",
        "unsetopt",
        "vared",
        "wait",
        "whence",
        "where",
        "which",
        "zcompile",
        "zformat",
        "zftp",
        "zle",
        "zmodload",
        "zparseopts",
        "zprof",
        "zpty",
        "zregexparse",
        "zsocket",
        "zstyle",
        "ztcp",
      ],
      j = [
        "chcon",
        "chgrp",
        "chown",
        "chmod",
        "cp",
        "dd",
        "df",
        "dir",
        "dircolors",
        "ln",
        "ls",
        "mkdir",
        "mkfifo",
        "mknod",
        "mktemp",
        "mv",
        "realpath",
        "rm",
        "rmdir",
        "shred",
        "sync",
        "touch",
        "truncate",
        "vdir",
        "b2sum",
        "base32",
        "base64",
        "cat",
        "cksum",
        "comm",
        "csplit",
        "cut",
        "expand",
        "fmt",
        "fold",
        "head",
        "join",
        "md5sum",
        "nl",
        "numfmt",
        "od",
        "paste",
        "ptx",
        "pr",
        "sha1sum",
        "sha224sum",
        "sha256sum",
        "sha384sum",
        "sha512sum",
        "shuf",
        "sort",
        "split",
        "sum",
        "tac",
        "tail",
        "tr",
        "tsort",
        "unexpand",
        "uniq",
        "wc",
        "arch",
        "basename",
        "chroot",
        "date",
        "dirname",
        "du",
        "echo",
        "env",
        "expr",
        "factor",
        "groups",
        "hostid",
        "id",
        "link",
        "logname",
        "nice",
        "nohup",
        "nproc",
        "pathchk",
        "pinky",
        "printenv",
        "printf",
        "pwd",
        "readlink",
        "runcon",
        "seq",
        "sleep",
        "stat",
        "stdbuf",
        "stty",
        "tee",
        "test",
        "timeout",
        "tty",
        "uname",
        "unlink",
        "uptime",
        "users",
        "who",
        "whoami",
        "yes",
      ];
    return {
      name: "Bash",
      aliases: ["sh"],
      keywords: {
        $pattern: /\b[a-z][a-z0-9._-]+\b/,
        keyword: m,
        literal: f,
        built_in: [...g, ...v, "set", "shopt", ...b, ...j],
      },
      contains: [u, e.SHEBANG(), h, l, e.HASH_COMMENT_MODE, i, p, s, r, c, t],
    };
  }
  function O(e) {
    const t = e.regex,
      n = t.concat(/[A-Z_]/, t.optional(/[A-Z0-9_.-]*:/), /[A-Z0-9_.-]*/),
      l = /[A-Za-z0-9._:-]+/,
      o = {
        className: "symbol",
        begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/,
      },
      i = {
        begin: /\s/,
        contains: [
          {
            className: "keyword",
            begin: /#?[a-z_][a-z1-9_-]+/,
            illegal: /\n/,
          },
        ],
      },
      r = e.inherit(i, {
        begin: /\(/,
        end: /\)/,
      }),
      c = e.inherit(e.APOS_STRING_MODE, {
        className: "string",
      }),
      a = e.inherit(e.QUOTE_STRING_MODE, {
        className: "string",
      }),
      s = {
        endsWithParent: !0,
        illegal: /</,
        relevance: 0,
        contains: [
          {
            className: "attr",
            begin: l,
            relevance: 0,
          },
          {
            begin: /=\s*/,
            relevance: 0,
            contains: [
              {
                className: "string",
                endsParent: !0,
                variants: [
                  {
                    begin: /"/,
                    end: /"/,
                    contains: [o],
                  },
                  {
                    begin: /'/,
                    end: /'/,
                    contains: [o],
                  },
                  {
                    begin: /[^\s"'=<>`]+/,
                  },
                ],
              },
            ],
          },
        ],
      };
    return {
      name: "HTML, XML",
      aliases: [
        "html",
        "xhtml",
        "rss",
        "atom",
        "xjb",
        "xsd",
        "xsl",
        "plist",
        "wsf",
        "svg",
      ],
      case_insensitive: !0,
      contains: [
        {
          className: "meta",
          begin: /<![a-z]/,
          end: />/,
          relevance: 10,
          contains: [
            i,
            a,
            c,
            r,
            {
              begin: /\[/,
              end: /\]/,
              contains: [
                {
                  className: "meta",
                  begin: /<![a-z]/,
                  end: />/,
                  contains: [i, r, a, c],
                },
              ],
            },
          ],
        },
        e.COMMENT(/<!--/, /-->/, {
          relevance: 10,
        }),
        {
          begin: /<!\[CDATA\[/,
          end: /\]\]>/,
          relevance: 10,
        },
        o,
        {
          className: "meta",
          end: /\?>/,
          variants: [
            {
              begin: /<\?xml/,
              relevance: 10,
              contains: [a],
            },
            {
              begin: /<\?[a-z][a-z0-9]+/,
            },
          ],
        },
        {
          className: "tag",
          begin: /<style(?=\s|>)/,
          end: />/,
          keywords: {
            name: "style",
          },
          contains: [s],
          starts: {
            end: /<\/style>/,
            returnEnd: !0,
            subLanguage: ["css", "xml"],
          },
        },
        {
          className: "tag",
          begin: /<script(?=\s|>)/,
          end: />/,
          keywords: {
            name: "script",
          },
          contains: [s],
          starts: {
            end: /<\/script>/,
            returnEnd: !0,
            subLanguage: ["javascript", "handlebars", "xml"],
          },
        },
        {
          className: "tag",
          begin: /<>|<\/>/,
        },
        {
          className: "tag",
          begin: t.concat(
            /</,
            t.lookahead(t.concat(n, t.either(/\/>/, />/, /\s/)))
          ),
          end: /\/?>/,
          contains: [
            {
              className: "name",
              begin: n,
              relevance: 0,
              starts: s,
            },
          ],
        },
        {
          className: "tag",
          begin: t.concat(/<\//, t.lookahead(t.concat(n, />/))),
          contains: [
            {
              className: "name",
              begin: n,
              relevance: 0,
            },
            {
              begin: />/,
              relevance: 0,
              endsParent: !0,
            },
          ],
        },
      ],
    };
  }
  function n(e) {
    const n = e.regex,
      s = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: /([+-]+)?[\d]+_[\d_]+/,
          },
          {
            begin: e.NUMBER_RE,
          },
        ],
      },
      t = e.COMMENT();
    t.variants = [
      {
        begin: /;/,
        end: /$/,
      },
      {
        begin: /#/,
        end: /$/,
      },
    ];
    const o = {
        className: "variable",
        variants: [
          {
            begin: /\$[\w\d"][\w\d_]*/,
          },
          {
            begin: /\$\{(.*?)\}/,
          },
        ],
      },
      i = {
        className: "literal",
        begin: /\bon|off|true|false|yes|no\b/,
      },
      a = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE],
        variants: [
          {
            begin: "'''",
            end: "'''",
            relevance: 10,
          },
          {
            begin: '"""',
            end: '"""',
            relevance: 10,
          },
          {
            begin: '"',
            end: '"',
          },
          {
            begin: "'",
            end: "'",
          },
        ],
      },
      c = {
        begin: /\[/,
        end: /\]/,
        contains: [t, i, o, a, s, "self"],
        relevance: 0,
      },
      l = /[A-Za-z0-9_-]+/,
      d = /"(\\"|[^"])*"/,
      u = /'[^']*'/,
      r = n.either(l, d, u),
      h = n.concat(r, "(\\s*\\.\\s*", r, ")*", n.lookahead(/\s*=\s*[^#\s]/));
    return {
      name: "TOML, also INI",
      aliases: ["toml"],
      case_insensitive: !0,
      illegal: /\S/,
      contains: [
        t,
        {
          className: "section",
          begin: /\[+/,
          end: /\]+/,
        },
        {
          begin: h,
          className: "attr",
          starts: {
            end: /$/,
            contains: [t, c, i, o, a, s],
          },
        },
      ],
    };
  }
  function C(e) {
    const n = "true false yes no null",
      t = "[\\w#;/?:@&=+$,.~*'()[\\]]+",
      h = {
        className: "attr",
        variants: [
          {
            begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)",
          },
          {
            begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)',
          },
          {
            begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)",
          },
        ],
      },
      p = {
        className: "template-variable",
        variants: [
          {
            begin: /\{\{/,
            end: /\}\}/,
          },
          {
            begin: /%\{/,
            end: /\}/,
          },
        ],
      },
      i = {
        className: "string",
        relevance: 0,
        variants: [
          {
            begin: /'/,
            end: /'/,
          },
          {
            begin: /"/,
            end: /"/,
          },
          {
            begin: /\S+/,
          },
        ],
        contains: [e.BACKSLASH_ESCAPE, p],
      },
      r = e.inherit(i, {
        variants: [
          {
            begin: /'/,
            end: /'/,
          },
          {
            begin: /"/,
            end: /"/,
          },
          {
            begin: /[^\s,{}[\]]+/,
          },
        ],
      }),
      c = "[0-9]{4}(-[0-9][0-9]){0,2}",
      l = "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?",
      g = "(\\.[0-9]*)?",
      d = "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?",
      u = {
        className: "number",
        begin: "\\b" + c + l + g + d + "\\b",
      },
      s = {
        end: ",",
        endsWithParent: !0,
        excludeEnd: !0,
        keywords: n,
        relevance: 0,
      },
      m = {
        begin: /\{/,
        end: /\}/,
        contains: [s],
        illegal: `\\n`,
        relevance: 0,
      },
      f = {
        begin: "\\[",
        end: "\\]",
        contains: [s],
        illegal: `\\n`,
        relevance: 0,
      },
      a = [
        h,
        {
          className: "meta",
          begin: "^---\\s*$",
          relevance: 10,
        },
        {
          className: "string",
          begin:
            "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*",
        },
        {
          begin: "<%[%=-]?",
          end: "[%-]?%>",
          subLanguage: "ruby",
          excludeBegin: !0,
          excludeEnd: !0,
          relevance: 0,
        },
        {
          className: "type",
          begin: "!\\w+!" + t,
        },
        {
          className: "type",
          begin: "!<" + t + ">",
        },
        {
          className: "type",
          begin: "!" + t,
        },
        {
          className: "type",
          begin: "!!" + t,
        },
        {
          className: "meta",
          begin: "&" + e.UNDERSCORE_IDENT_RE + "$",
        },
        {
          className: "meta",
          begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$",
        },
        {
          className: "bullet",
          begin: "-(?=[ ]|$)",
          relevance: 0,
        },
        e.HASH_COMMENT_MODE,
        {
          beginKeywords: n,
          keywords: {
            literal: n,
          },
        },
        u,
        {
          className: "number",
          begin: e.C_NUMBER_RE + "\\b",
          relevance: 0,
        },
        m,
        f,
        i,
      ],
      o = [...a];
    return (
      o.pop(),
      o.push(r),
      (s.contains = o),
      {
        name: "YAML",
        case_insensitive: !0,
        aliases: ["yml"],
        contains: a,
      }
    );
  }
  function E(e) {
    const c = e.regex,
      o = {
        begin: /<\/?[A-Za-z_]/,
        end: ">",
        subLanguage: "xml",
        relevance: 0,
      },
      m = {
        begin: "^[-\\*]{3,}",
        end: "$",
      },
      h = {
        className: "code",
        variants: [
          {
            begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*",
          },
          {
            begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*",
          },
          {
            begin: "```",
            end: "```+[ ]*$",
          },
          {
            begin: "~~~",
            end: "~~~+[ ]*$",
          },
          {
            begin: "`.+?`",
          },
          {
            begin: "(?=^( {4}|\\t))",
            contains: [
              {
                begin: "^( {4}|\\t)",
                end: "(\\n)$",
              },
            ],
            relevance: 0,
          },
        ],
      },
      u = {
        className: "bullet",
        begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
        end: "\\s+",
        excludeEnd: !0,
      },
      d = {
        begin: /^\[[^\n]+\]:/,
        returnBegin: !0,
        contains: [
          {
            className: "symbol",
            begin: /\[/,
            end: /\]/,
            excludeBegin: !0,
            excludeEnd: !0,
          },
          {
            className: "link",
            begin: /:\s*/,
            end: /$/,
            excludeBegin: !0,
          },
        ],
      },
      l = /[A-Za-z][A-Za-z0-9+.-]*/,
      r = {
        variants: [
          {
            begin: /\[.+?\]\[.*?\]/,
            relevance: 0,
          },
          {
            begin:
              /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
            relevance: 2,
          },
          {
            begin: c.concat(/\[.+?\]\(/, l, /:\/\/.*?\)/),
            relevance: 2,
          },
          {
            begin: /\[.+?\]\([./?&#].*?\)/,
            relevance: 1,
          },
          {
            begin: /\[.*?\]\(.*?\)/,
            relevance: 0,
          },
        ],
        returnBegin: !0,
        contains: [
          {
            match: /\[(?=\])/,
          },
          {
            className: "string",
            relevance: 0,
            begin: "\\[",
            end: "\\]",
            excludeBegin: !0,
            returnEnd: !0,
          },
          {
            className: "link",
            relevance: 0,
            begin: "\\]\\(",
            end: "\\)",
            excludeBegin: !0,
            excludeEnd: !0,
          },
          {
            className: "symbol",
            relevance: 0,
            begin: "\\]\\[",
            end: "\\]",
            excludeBegin: !0,
            excludeEnd: !0,
          },
        ],
      },
      n = {
        className: "strong",
        contains: [],
        variants: [
          {
            begin: /_{2}/,
            end: /_{2}/,
          },
          {
            begin: /\*{2}/,
            end: /\*{2}/,
          },
        ],
      },
      s = {
        className: "emphasis",
        contains: [],
        variants: [
          {
            begin: /\*(?!\*)/,
            end: /\*/,
          },
          {
            begin: /_(?!_)/,
            end: /_/,
            relevance: 0,
          },
        ],
      },
      a = e.inherit(n, {
        contains: [],
      }),
      i = e.inherit(s, {
        contains: [],
      });
    n.contains.push(i), s.contains.push(a);
    let t = [o, r];
    [n, s, a, i].forEach((e) => {
      e.contains = e.contains.concat(t);
    }),
      (t = t.concat(n, s));
    const f = {
        className: "section",
        variants: [
          {
            begin: "^#{1,6}",
            end: "$",
            contains: t,
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              {
                begin: "^[=-]*$",
              },
              {
                begin: "^",
                end: `\\n`,
                contains: t,
              },
            ],
          },
        ],
      },
      p = {
        className: "quote",
        begin: "^>\\s+",
        contains: t,
        end: "$",
      };
    return {
      name: "Markdown",
      aliases: ["md", "mkdown", "mkd"],
      contains: [f, o, u, n, s, p, h, m, r, d],
    };
  }
  function k(e) {
    const v = e.regex,
      r = /[\p{XID_Start}_]\p{XID_Continue}*/u,
      u = [
        "and",
        "as",
        "assert",
        "async",
        "await",
        "break",
        "class",
        "continue",
        "def",
        "del",
        "elif",
        "else",
        "except",
        "finally",
        "for",
        "from",
        "global",
        "if",
        "import",
        "in",
        "is",
        "lambda",
        "nonlocal|10",
        "not",
        "or",
        "pass",
        "raise",
        "return",
        "try",
        "while",
        "with",
        "yield",
      ],
      p = [
        "__import__",
        "abs",
        "all",
        "any",
        "ascii",
        "bin",
        "bool",
        "breakpoint",
        "bytearray",
        "bytes",
        "callable",
        "chr",
        "classmethod",
        "compile",
        "complex",
        "delattr",
        "dict",
        "dir",
        "divmod",
        "enumerate",
        "eval",
        "exec",
        "filter",
        "float",
        "format",
        "frozenset",
        "getattr",
        "globals",
        "hasattr",
        "hash",
        "help",
        "hex",
        "id",
        "input",
        "int",
        "isinstance",
        "issubclass",
        "iter",
        "len",
        "list",
        "locals",
        "map",
        "max",
        "memoryview",
        "min",
        "next",
        "object",
        "oct",
        "open",
        "ord",
        "pow",
        "print",
        "property",
        "range",
        "repr",
        "reversed",
        "round",
        "set",
        "setattr",
        "slice",
        "sorted",
        "staticmethod",
        "str",
        "sum",
        "super",
        "tuple",
        "type",
        "vars",
        "zip",
      ],
      f = ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
      m = [
        "Any",
        "Callable",
        "Coroutine",
        "Dict",
        "List",
        "Literal",
        "Generic",
        "Optional",
        "Sequence",
        "Set",
        "Tuple",
        "Type",
        "Union",
      ],
      a = {
        $pattern: /[A-Za-z]\w+|__\w+__/,
        keyword: u,
        built_in: p,
        literal: f,
        type: m,
      },
      t = {
        className: "meta",
        begin: /^(>>>|\.\.\.) /,
      },
      o = {
        className: "subst",
        begin: /\{/,
        end: /\}/,
        keywords: a,
        illegal: /#/,
      },
      c = {
        begin: /\{\{/,
        relevance: 0,
      },
      l = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE],
        variants: [
          {
            begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, t],
            relevance: 10,
          },
          {
            begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, t],
            relevance: 10,
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, t, c, o],
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, t, c, o],
          },
          {
            begin: /([uU]|[rR])'/,
            end: /'/,
            relevance: 10,
          },
          {
            begin: /([uU]|[rR])"/,
            end: /"/,
            relevance: 10,
          },
          {
            begin: /([bB]|[bB][rR]|[rR][bB])'/,
            end: /'/,
          },
          {
            begin: /([bB]|[bB][rR]|[rR][bB])"/,
            end: /"/,
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])'/,
            end: /'/,
            contains: [e.BACKSLASH_ESCAPE, c, o],
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, c, o],
          },
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
        ],
      },
      n = "[0-9](_?[0-9])*",
      d = `(\\b(${n}))?\\.(${n})|\\b(${n})\\.`,
      s = `\\b|${u.join("|")}`,
      i = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: `(\\b(${n})|(${d}))[eE][+-]?(${n})[jJ]?(?=${s})`,
          },
          {
            begin: `(${d})[jJ]?`,
          },
          {
            begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${s})`,
          },
          {
            begin: `\\b0[bB](_?[01])+[lL]?(?=${s})`,
          },
          {
            begin: `\\b0[oO](_?[0-7])+[lL]?(?=${s})`,
          },
          {
            begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${s})`,
          },
          {
            begin: `\\b(${n})[jJ](?=${s})`,
          },
        ],
      },
      g = {
        className: "comment",
        begin: v.lookahead(/# type:/),
        end: /$/,
        keywords: a,
        contains: [
          {
            begin: /# type:/,
          },
          {
            begin: /#/,
            end: /\b\B/,
            endsWithParent: !0,
          },
        ],
      },
      h = {
        className: "params",
        variants: [
          {
            className: "",
            begin: /\(\s*\)/,
            skip: !0,
          },
          {
            begin: /\(/,
            end: /\)/,
            excludeBegin: !0,
            excludeEnd: !0,
            keywords: a,
            contains: ["self", t, i, l, e.HASH_COMMENT_MODE],
          },
        ],
      };
    return (
      (o.contains = [l, i, t]),
      {
        name: "Python",
        aliases: ["py", "gyp", "ipython"],
        unicodeRegex: !0,
        keywords: a,
        illegal: /(<\/|->|\?)|=>/,
        contains: [
          t,
          i,
          {
            begin: /\bself\b/,
          },
          {
            beginKeywords: "if",
            relevance: 0,
          },
          l,
          g,
          e.HASH_COMMENT_MODE,
          {
            match: [/\bdef/, /\s+/, r],
            scope: {
              1: "keyword",
              3: "title.function",
            },
            contains: [h],
          },
          {
            variants: [
              {
                match: [/\bclass/, /\s+/, r, /\s*/, /\(\s*/, r, /\s*\)/],
              },
              {
                match: [/\bclass/, /\s+/, r],
              },
            ],
            scope: {
              1: "keyword",
              3: "title.class",
              6: "title.class.inherited",
            },
          },
          {
            className: "meta",
            begin: /^[\t ]*@/,
            end: /(?=#)|$/,
            contains: [i, h, l],
          },
        ],
      }
    );
  }
  e.registerLanguage("javascript", y),
    e.registerLanguage("json", _),
    e.registerLanguage("bash", w),
    e.registerLanguage("html", O),
    e.registerLanguage("ini", n),
    e.registerLanguage("toml", n),
    e.registerLanguage("yaml", C),
    e.registerLanguage("md", E),
    e.registerLanguage("python", k),
    document.addEventListener("DOMContentLoaded", () => {
      document
        .querySelectorAll("pre code:not(.language-mermaid)")
        .forEach((t) => {
          e.highlightElement(t);
        });
    });
})();
