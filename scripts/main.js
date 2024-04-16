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
})()(() => {
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
      "node_modules/lazysizes/lazysizes.js"(e, t) {
        (function (e, n) {
          var s = n(e, e.document, Date);
          (e.lazySizes = s),
            typeof t == "object" && t.exports && (t.exports = s);
        })(typeof window != "undefined" ? window : {}, function (t, n, s) {
          "use strict";
          if (
            ((function () {
              var e,
                n = {
                  lazyClass: "lazyload",
                  loadedClass: "lazyloaded",
                  loadingClass: "lazyloading",
                  preloadClass: "lazypreload",
                  errorClass: "lazyerror",
                  autosizesClass: "lazyautosizes",
                  fastLoadedClass: "ls-is-cached",
                  iframeLoadMode: 0,
                  srcAttr: "data-src",
                  srcsetAttr: "data-srcset",
                  sizesAttr: "data-sizes",
                  minSize: 40,
                  customMedia: {},
                  init: !0,
                  expFactor: 1.5,
                  hFac: 0.8,
                  loadMode: 2,
                  loadHidden: !0,
                  ricTimeout: 0,
                  throttleDelay: 125,
                };
              o = t.lazySizesConfig || t.lazysizesConfig || {};
              for (e in n) e in o || (o[e] = n[e]);
            })(),
            !n || !n.getElementsByClassName)
          )
            return {
              init: function () {},
              cfg: o,
              noSupport: !0,
            };
          var o,
            r,
            l = n.documentElement,
            T = t.HTMLPictureElement,
            d = "addEventListener",
            i = "getAttribute",
            c = t[d].bind(t),
            a = t.setTimeout,
            x = t.requestAnimationFrame || a,
            w = t.requestIdleCallback,
            E = /^picture$/i,
            F = ["load", "error", "lazyincluded", "_lazyloaded"],
            g = {},
            M = Array.prototype.forEach,
            p = function (e, t) {
              return (
                g[t] || (g[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
                g[t].test(e[i]("class") || "") && g[t]
              );
            },
            f = function (e, t) {
              p(e, t) ||
                e.setAttribute("class", (e[i]("class") || "").trim() + " " + t);
            },
            y = function (e, t) {
              var n;
              (n = p(e, t)) &&
                e.setAttribute("class", (e[i]("class") || "").replace(n, " "));
            },
            _ = function (e, t, n) {
              var s = n ? d : "removeEventListener";
              n && _(e, t),
                F.forEach(function (n) {
                  e[s](n, t);
                });
            },
            m = function (e, t, s, o, i) {
              var a = n.createEvent("Event");
              return (
                s || (s = {}),
                (s.instance = r),
                a.initEvent(t, !o, !i),
                (a.detail = s),
                e.dispatchEvent(a),
                a
              );
            },
            O = function (e, n) {
              var s;
              !T && (s = t.picturefill || o.pf)
                ? (n &&
                    n.src &&
                    !e[i]("srcset") &&
                    e.setAttribute("srcset", n.src),
                  s({
                    reevaluate: !0,
                    elements: [e],
                  }))
                : n && n.src && (e.src = n.src);
            },
            h = function (e, t) {
              return (getComputedStyle(e, null) || {})[t];
            },
            C = function (e, t, n) {
              for (
                n = n || e.offsetWidth;
                n < o.minSize && t && !e._lazysizesWidth;

              )
                (n = t.offsetWidth), (t = t.parentNode);
              return n;
            },
            u = (function () {
              var e,
                t,
                s = [],
                c = [],
                o = s,
                i = function () {
                  var n = o;
                  for (o = s.length ? c : s, e = !0, t = !1; n.length; )
                    n.shift()();
                  e = !1;
                },
                r = function (s, r) {
                  e && !r
                    ? s.apply(this, arguments)
                    : (o.push(s), t || ((t = !0), (n.hidden ? a : x)(i)));
                };
              return (r._lsFlush = i), r;
            })(),
            v = function (e, t) {
              return t
                ? function () {
                    u(e);
                  }
                : function () {
                    var t = this,
                      n = arguments;
                    u(function () {
                      e.apply(t, n);
                    });
                  };
            },
            S = function (e) {
              var n,
                i = 0,
                l = o.throttleDelay,
                t = o.ricTimeout,
                r = function () {
                  (n = !1), (i = s.now()), e();
                },
                c =
                  w && t > 49
                    ? function () {
                        w(r, {
                          timeout: t,
                        }),
                          t !== o.ricTimeout && (t = o.ricTimeout);
                      }
                    : v(function () {
                        a(r);
                      }, !0);
              return function (e) {
                var o;
                if (((e = e === !0) && (t = 33), n)) return;
                (n = !0),
                  (o = l - (s.now() - i)),
                  o < 0 && (o = 0),
                  e || o < 9 ? c() : a(c, o);
              };
            },
            A = function (e) {
              var t,
                o,
                n = 99,
                i = function () {
                  (t = null), e();
                },
                r = function () {
                  var e = s.now() - o;
                  e < n ? a(r, n - e) : (w || i)(i);
                };
              return function () {
                (o = s.now()), t || (t = a(r, n));
              };
            },
            k = (function () {
              var w,
                k,
                T,
                z,
                D,
                N,
                L,
                R,
                I,
                V,
                $,
                Y,
                Q = /^img$/i,
                oe = /^iframe$/i,
                se =
                  "onscroll" in t && !/(gle|ing)bot/.test(navigator.userAgent),
                te = 0,
                F = 0,
                g = 0,
                b = -1,
                W = function (e) {
                  g--, (!e || g < 0 || !e.target) && (g = 0);
                },
                U = function (e) {
                  return (
                    L == null && (L = h(n.body, "visibility") == "hidden"),
                    L ||
                      h(e.parentNode, "visibility") != "hidden" ||
                      h(e, "visibility") != "hidden"
                  );
                },
                G = function (e, t) {
                  var o,
                    s = e,
                    i = U(e);
                  for (
                    T -= t, N += t, z -= t, D += t;
                    i && (s = s.offsetParent) && s != n.body && s != l;

                  )
                    (i = (h(s, "opacity") || 1) > 0),
                      i &&
                        h(s, "overflow") != "visible" &&
                        ((o = s.getBoundingClientRect()),
                        (i =
                          D > o.left &&
                          z < o.right &&
                          N > o.top - 1 &&
                          T < o.bottom + 1));
                  return i;
                },
                q = function () {
                  var e,
                    s,
                    a,
                    c,
                    d,
                    u,
                    h,
                    m,
                    f,
                    p,
                    v,
                    j,
                    t = r.elements;
                  if ((k = o.loadMode) && g < 8 && (j = t.length)) {
                    for (e = 0, b++; e < j; e++) {
                      if (!t[e] || t[e]._lazyRace) continue;
                      if (
                        !se ||
                        (r.prematureUnveil && r.prematureUnveil(t[e]))
                      ) {
                        C(t[e]);
                        continue;
                      }
                      if (
                        ((!(u = t[e][i]("data-expand")) || !(s = u * 1)) &&
                          (s = F),
                        c ||
                          ((c =
                            !o.expand || o.expand < 1
                              ? l.clientHeight > 500 && l.clientWidth > 500
                                ? 500
                                : 370
                              : o.expand),
                          (r._defEx = c),
                          (p = c * o.expFactor),
                          (m = o.hFac),
                          (L = null),
                          F < p && g < 1 && b > 2 && k > 2 && !n.hidden
                            ? ((F = p), (b = 0))
                            : k > 1 && b > 1 && g < 6
                            ? (F = c)
                            : (F = te)),
                        v !== s &&
                          (($ = innerWidth + s * m),
                          (V = innerHeight + s),
                          (h = s * -1),
                          (v = s)),
                        (a = t[e].getBoundingClientRect()),
                        (N = a.bottom) >= h &&
                          (T = a.top) <= V &&
                          (D = a.right) >= h * m &&
                          (z = a.left) <= $ &&
                          (N || D || z || T) &&
                          (o.loadHidden || U(t[e])) &&
                          ((w && g < 3 && !u && (k < 3 || b < 4)) ||
                            G(t[e], s)))
                      ) {
                        if ((C(t[e]), (f = !0), g > 9)) break;
                      } else
                        !f &&
                          w &&
                          !d &&
                          g < 4 &&
                          b < 4 &&
                          k > 2 &&
                          (R[0] || o.preloadAfterLoad) &&
                          (R[0] ||
                            (!u &&
                              (N ||
                                D ||
                                z ||
                                T ||
                                t[e][i](o.sizesAttr) != "auto"))) &&
                          (d = R[0] || t[e]);
                    }
                    d && !f && C(d);
                  }
                },
                e = S(q),
                K = function (e) {
                  var t = e.target;
                  if (t._lazyCache) {
                    delete t._lazyCache;
                    return;
                  }
                  W(e),
                    f(t, o.loadedClass),
                    y(t, o.loadingClass),
                    _(t, B),
                    m(t, "lazyloaded");
                },
                X = v(K),
                B = function (e) {
                  X({
                    target: e.target,
                  });
                },
                Z = function (e, t) {
                  var n = e.getAttribute("data-load-mode") || o.iframeLoadMode;
                  n == 0
                    ? e.contentWindow.location.replace(t)
                    : n == 1 && (e.src = t);
                },
                J = function (e) {
                  var t,
                    n = e[i](o.srcsetAttr);
                  (t = o.customMedia[e[i]("data-media") || e[i]("media")]) &&
                    e.setAttribute("media", t),
                    n && e.setAttribute("srcset", n);
                },
                ee = v(function (e, t, n, s, r) {
                  var c, l, d, h, p, v;
                  (p = m(e, "lazybeforeunveil", t)).defaultPrevented ||
                    (s &&
                      (n ? f(e, o.autosizesClass) : e.setAttribute("sizes", s)),
                    (l = e[i](o.srcsetAttr)),
                    (c = e[i](o.srcAttr)),
                    r &&
                      ((h = e.parentNode), (d = h && E.test(h.nodeName || ""))),
                    (v = t.firesLoad || ("src" in e && (l || c || d))),
                    (p = {
                      target: e,
                    }),
                    f(e, o.loadingClass),
                    v && (clearTimeout(I), (I = a(W, 2500)), _(e, B, !0)),
                    d && M.call(h.getElementsByTagName("source"), J),
                    l
                      ? e.setAttribute("srcset", l)
                      : c &&
                        !d &&
                        (oe.test(e.nodeName) ? Z(e, c) : (e.src = c)),
                    r &&
                      (l || d) &&
                      O(e, {
                        src: c,
                      })),
                    e._lazyRace && delete e._lazyRace,
                    y(e, o.lazyClass),
                    u(function () {
                      var t = e.complete && e.naturalWidth > 1;
                      (!v || t) &&
                        (t && f(e, o.fastLoadedClass),
                        K(p),
                        (e._lazyCache = !0),
                        a(function () {
                          "_lazyCache" in e && delete e._lazyCache;
                        }, 9)),
                        e.loading == "lazy" && g--;
                    }, !0);
                }),
                C = function (e) {
                  if (e._lazyRace) return;
                  var s,
                    t = Q.test(e.nodeName),
                    a = t && (e[i](o.sizesAttr) || e[i]("sizes")),
                    n = a == "auto";
                  if (
                    (n || !w) &&
                    t &&
                    (e[i]("src") || e.srcset) &&
                    !e.complete &&
                    !p(e, o.errorClass) &&
                    p(e, o.lazyClass)
                  )
                    return;
                  (s = m(e, "lazyunveilread").detail),
                    n && j.updateElem(e, !0, e.offsetWidth),
                    (e._lazyRace = !0),
                    g++,
                    ee(e, s, n, a, t);
                },
                ne = A(function () {
                  (o.loadMode = 3), e();
                }),
                H = function () {
                  o.loadMode == 3 && (o.loadMode = 2), ne();
                },
                P = function () {
                  if (w) return;
                  if (s.now() - Y < 999) {
                    a(P, 999);
                    return;
                  }
                  (w = !0), (o.loadMode = 3), e(), c("scroll", H, !0);
                };
              return {
                _: function () {
                  (Y = s.now()),
                    (r.elements = n.getElementsByClassName(o.lazyClass)),
                    (R = n.getElementsByClassName(
                      o.lazyClass + " " + o.preloadClass
                    )),
                    c("scroll", e, !0),
                    c("resize", e, !0),
                    c("pageshow", function (e) {
                      if (e.persisted) {
                        var t = n.querySelectorAll("." + o.loadingClass);
                        t.length &&
                          t.forEach &&
                          x(function () {
                            t.forEach(function (e) {
                              e.complete && C(e);
                            });
                          });
                      }
                    }),
                    t.MutationObserver
                      ? new MutationObserver(e).observe(l, {
                          childList: !0,
                          subtree: !0,
                          attributes: !0,
                        })
                      : (l[d]("DOMNodeInserted", e, !0),
                        l[d]("DOMAttrModified", e, !0),
                        setInterval(e, 999)),
                    c("hashchange", e, !0),
                    [
                      "focus",
                      "mouseover",
                      "click",
                      "load",
                      "transitionend",
                      "animationend",
                    ].forEach(function (t) {
                      n[d](t, e, !0);
                    }),
                    /d$|^c/.test(n.readyState)
                      ? P()
                      : (c("load", P), n[d]("DOMContentLoaded", e), a(P, 2e4)),
                    r.elements.length ? (q(), u._lsFlush()) : e();
                },
                checkElems: e,
                unveil: C,
                _aLSL: H,
              };
            })(),
            j = (function () {
              var e,
                i = v(function (e, t, n, s) {
                  var o, i, a;
                  if (
                    ((e._lazysizesWidth = s),
                    (s += "px"),
                    e.setAttribute("sizes", s),
                    E.test(t.nodeName || ""))
                  ) {
                    i = t.getElementsByTagName("source");
                    for (o = 0, a = i.length; o < a; o++)
                      i[o].setAttribute("sizes", s);
                  }
                  n.detail.dataAttr || O(e, n.detail);
                }),
                t = function (e, t, n) {
                  var s,
                    o = e.parentNode;
                  o &&
                    ((n = C(e, o, n)),
                    (s = m(e, "lazybeforesizes", {
                      width: n,
                      dataAttr: !!t,
                    })),
                    s.defaultPrevented ||
                      ((n = s.detail.width),
                      n && n !== e._lazysizesWidth && i(e, o, s, n)));
                },
                a = function () {
                  var n,
                    s = e.length;
                  if (s) for (n = 0; n < s; n++) t(e[n]);
                },
                s = A(a);
              return {
                _: function () {
                  (e = n.getElementsByClassName(o.autosizesClass)),
                    c("resize", s);
                },
                checkElems: s,
                updateElem: t,
              };
            })(),
            b = function () {
              !b.i && n.getElementsByClassName && ((b.i = !0), j._(), k._());
            };
          return (
            a(function () {
              o.init && b();
            }),
            (r = {
              cfg: o,
              autoSizer: j,
              loader: k,
              init: b,
              uP: O,
              aC: f,
              rC: y,
              hC: p,
              fire: m,
              gW: C,
              rAF: u,
            }),
            r
          );
        });
      },
    }),
    d = c(l());
})(),
  (() => {
    var e,
      t,
      n,
      i,
      p = Object.create,
      s = Object.defineProperty,
      f = Object.getOwnPropertyDescriptor,
      o = Object.getOwnPropertyNames,
      m = Object.getPrototypeOf,
      h = Object.prototype.hasOwnProperty,
      u = (e, t) =>
        function () {
          return (
            t ||
              (0, e[o(e)[0]])(
                (t = {
                  exports: {},
                }).exports,
                t
              ),
            t.exports
          );
        },
      c = (e, t, n, i) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let a of o(t))
            !h.call(e, a) &&
              a !== n &&
              s(e, a, {
                get: () => t[a],
                enumerable: !(i = f(t, a)) || i.enumerable,
              });
        return e;
      },
      r = (e, t, n) => (
        (n = e != null ? p(m(e)) : {}),
        c(
          t || !e || !e.__esModule
            ? s(n, "default", {
                value: e,
                enumerable: !0,
              })
            : n,
          e
        )
      ),
      l = u({
        "node_modules/clipboard/dist/clipboard.js"(e, t) {
          (function (s, o) {
            typeof e == "object" && typeof t == "object"
              ? (t.exports = o())
              : typeof define == "function" && define.amd
              ? define([], o)
              : typeof e == "object"
              ? (e.ClipboardJS = o())
              : (s.ClipboardJS = o());
          })(e, function () {
            return (function () {
              var n = {
                  686: function (e, t, n) {
                    "use strict";
                    n.d(t, {
                      default: function () {
                        return j;
                      },
                    });
                    var a,
                      r,
                      h,
                      f,
                      p,
                      g,
                      v,
                      b,
                      j,
                      T = n(279),
                      F = n.n(T),
                      M = n(370),
                      S = n.n(M),
                      x = n(817),
                      l = n.n(x);
                    function d(e) {
                      try {
                        return document.execCommand(e);
                      } catch {
                        return !1;
                      }
                    }
                    (p = function (t) {
                      var n = l()(t);
                      return d("cut"), n;
                    }),
                      (h = p);
                    function _(e) {
                      var n,
                        s =
                          document.documentElement.getAttribute("dir") ===
                          "rtl",
                        t = document.createElement("textarea");
                      return (
                        (t.style.fontSize = "12pt"),
                        (t.style.border = "0"),
                        (t.style.padding = "0"),
                        (t.style.margin = "0"),
                        (t.style.position = "absolute"),
                        (t.style[s ? "right" : "left"] = "-9999px"),
                        (n =
                          window.pageYOffset ||
                          document.documentElement.scrollTop),
                        (t.style.top = "".concat(n, "px")),
                        t.setAttribute("readonly", ""),
                        (t.value = e),
                        t
                      );
                    }
                    (r = function (t, n) {
                      var o,
                        s = _(t);
                      return (
                        n.container.appendChild(s),
                        (o = l()(s)),
                        d("copy"),
                        s.remove(),
                        o
                      );
                    }),
                      (f = function (t) {
                        var s =
                            arguments.length > 1 && arguments[1] !== void 0
                              ? arguments[1]
                              : {
                                  container: document.body,
                                },
                          n = "";
                        return (
                          typeof t == "string"
                            ? (n = r(t, s))
                            : t instanceof HTMLInputElement &&
                              ![
                                "text",
                                "search",
                                "url",
                                "tel",
                                "password",
                              ].includes(t?.type)
                            ? (n = r(t.value, s))
                            : ((n = l()(t)), d("copy")),
                          n
                        );
                      }),
                      (a = f);
                    function o(e) {
                      "@babel/helpers - typeof";
                      return (
                        typeof Symbol == "function" &&
                        typeof Symbol.iterator == "symbol"
                          ? (o = function (t) {
                              return typeof t;
                            })
                          : (o = function (t) {
                              return t &&
                                typeof Symbol == "function" &&
                                t.constructor === Symbol &&
                                t !== Symbol.prototype
                                ? "symbol"
                                : typeof t;
                            }),
                        o(e)
                      );
                    }
                    (v = function () {
                      var s =
                          arguments.length > 0 && arguments[0] !== void 0
                            ? arguments[0]
                            : {},
                        i = s.action,
                        n = i === void 0 ? "copy" : i,
                        r = s.container,
                        t = s.target,
                        c = s.text;
                      if (n !== "copy" && n !== "cut")
                        throw new Error(
                          'Invalid "action" value, use either "copy" or "cut"'
                        );
                      if (t !== void 0)
                        if (t && o(t) === "object" && t.nodeType === 1) {
                          {
                            if (n === "copy" && t.hasAttribute("disabled"))
                              throw new Error(
                                'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                              );
                            if (
                              n === "cut" &&
                              (t.hasAttribute("readonly") ||
                                t.hasAttribute("disabled"))
                            )
                              throw new Error(
                                `Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`
                              );
                          }
                        } else
                          throw new Error(
                            'Invalid "target" value, use a valid Element'
                          );
                      if (c)
                        return a(c, {
                          container: r,
                        });
                      if (t)
                        return n === "cut"
                          ? h(t)
                          : a(t, {
                              container: r,
                            });
                    }),
                      (b = v);
                    function s(e) {
                      "@babel/helpers - typeof";
                      return (
                        typeof Symbol == "function" &&
                        typeof Symbol.iterator == "symbol"
                          ? (s = function (t) {
                              return typeof t;
                            })
                          : (s = function (t) {
                              return t &&
                                typeof Symbol == "function" &&
                                t.constructor === Symbol &&
                                t !== Symbol.prototype
                                ? "symbol"
                                : typeof t;
                            }),
                        s(e)
                      );
                    }
                    function y(e, t) {
                      if (!(e instanceof t))
                        throw new TypeError(
                          "Cannot call a class as a function"
                        );
                    }
                    function m(e, t) {
                      for (var n, s = 0; s < t.length; s++)
                        (n = t[s]),
                          (n.enumerable = n.enumerable || !1),
                          (n.configurable = !0),
                          "value" in n && (n.writable = !0),
                          Object.defineProperty(e, n.key, n);
                    }
                    function w(e, t, n) {
                      return t && m(e.prototype, t), n && m(e, n), e;
                    }
                    function O(e, t) {
                      if (typeof t != "function" && t !== null)
                        throw new TypeError(
                          "Super expression must either be null or a function"
                        );
                      (e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                          value: e,
                          writable: !0,
                          configurable: !0,
                        },
                      })),
                        t && c(e, t);
                    }
                    function c(e, t) {
                      return (
                        (c =
                          Object.setPrototypeOf ||
                          function (t, n) {
                            return (t.__proto__ = n), t;
                          }),
                        c(e, t)
                      );
                    }
                    function C(e) {
                      var t = A();
                      return function () {
                        var s,
                          a,
                          o = i(e);
                        return (
                          t
                            ? ((a = i(this).constructor),
                              (s = Reflect.construct(o, arguments, a)))
                            : (s = o.apply(this, arguments)),
                          E(this, s)
                        );
                      };
                    }
                    function E(e, t) {
                      return t && (s(t) === "object" || typeof t == "function")
                        ? t
                        : k(e);
                    }
                    function k(e) {
                      if (e === void 0)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called"
                        );
                      return e;
                    }
                    function A() {
                      if (typeof Reflect == "undefined" || !Reflect.construct)
                        return !1;
                      if (Reflect.construct.sham) return !1;
                      if (typeof Proxy == "function") return !0;
                      try {
                        return (
                          Date.prototype.toString.call(
                            Reflect.construct(Date, [], function () {})
                          ),
                          !0
                        );
                      } catch {
                        return !1;
                      }
                    }
                    function i(e) {
                      return (
                        (i = Object.setPrototypeOf
                          ? Object.getPrototypeOf
                          : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                            }),
                        i(e)
                      );
                    }
                    function u(e, t) {
                      var n = "data-clipboard-".concat(e);
                      if (!t.hasAttribute(n)) return;
                      return t.getAttribute(n);
                    }
                    (g = (function (e) {
                      O(t, e);
                      var n = C(t);
                      function t(e, s) {
                        var o;
                        return (
                          y(this, t),
                          (o = n.call(this)),
                          o.resolveOptions(s),
                          o.listenClick(e),
                          o
                        );
                      }
                      return (
                        w(
                          t,
                          [
                            {
                              key: "resolveOptions",
                              value: function () {
                                var t =
                                  arguments.length > 0 &&
                                  arguments[0] !== void 0
                                    ? arguments[0]
                                    : {};
                                (this.action =
                                  typeof t.action == "function"
                                    ? t.action
                                    : this.defaultAction),
                                  (this.target =
                                    typeof t.target == "function"
                                      ? t.target
                                      : this.defaultTarget),
                                  (this.text =
                                    typeof t.text == "function"
                                      ? t.text
                                      : this.defaultText),
                                  (this.container =
                                    s(t.container) === "object"
                                      ? t.container
                                      : document.body);
                              },
                            },
                            {
                              key: "listenClick",
                              value: function (t) {
                                var n = this;
                                this.listener = S()(t, "click", function (e) {
                                  return n.onClick(e);
                                });
                              },
                            },
                            {
                              key: "onClick",
                              value: function (t) {
                                var n = t.delegateTarget || t.currentTarget,
                                  s = this.action(n) || "copy",
                                  o = b({
                                    action: s,
                                    container: this.container,
                                    target: this.target(n),
                                    text: this.text(n),
                                  });
                                this.emit(o ? "success" : "error", {
                                  action: s,
                                  text: o,
                                  trigger: n,
                                  clearSelection: function () {
                                    n && n.focus(),
                                      window.getSelection().removeAllRanges();
                                  },
                                });
                              },
                            },
                            {
                              key: "defaultAction",
                              value: function (t) {
                                return u("action", t);
                              },
                            },
                            {
                              key: "defaultTarget",
                              value: function (t) {
                                var n = u("target", t);
                                if (n) return document.querySelector(n);
                              },
                            },
                            {
                              key: "defaultText",
                              value: function (t) {
                                return u("text", t);
                              },
                            },
                            {
                              key: "destroy",
                              value: function () {
                                this.listener.destroy();
                              },
                            },
                          ],
                          [
                            {
                              key: "copy",
                              value: function (t) {
                                var n =
                                  arguments.length > 1 &&
                                  arguments[1] !== void 0
                                    ? arguments[1]
                                    : {
                                        container: document.body,
                                      };
                                return a(t, n);
                              },
                            },
                            {
                              key: "cut",
                              value: function (t) {
                                return h(t);
                              },
                            },
                            {
                              key: "isSupported",
                              value: function () {
                                var t =
                                    arguments.length > 0 &&
                                    arguments[0] !== void 0
                                      ? arguments[0]
                                      : ["copy", "cut"],
                                  s = typeof t == "string" ? [t] : t,
                                  n = !!document.queryCommandSupported;
                                return (
                                  s.forEach(function (e) {
                                    n =
                                      n && !!document.queryCommandSupported(e);
                                  }),
                                  n
                                );
                              },
                            },
                          ]
                        ),
                        t
                      );
                    })(F())),
                      (j = g);
                  },
                  828: function (e) {
                    var t,
                      n = 9;
                    typeof Element != "undefined" &&
                      !Element.prototype.matches &&
                      ((t = Element.prototype),
                      (t.matches =
                        t.matchesSelector ||
                        t.mozMatchesSelector ||
                        t.msMatchesSelector ||
                        t.oMatchesSelector ||
                        t.webkitMatchesSelector));
                    function s(e, t) {
                      for (; e && e.nodeType !== n; ) {
                        if (typeof e.matches == "function" && e.matches(t))
                          return e;
                        e = e.parentNode;
                      }
                    }
                    e.exports = s;
                  },
                  438: function (e, t, n) {
                    var o = n(828);
                    function s(e, t, n, s, o) {
                      var i = a.apply(this, arguments);
                      return (
                        e.addEventListener(n, i, o),
                        {
                          destroy: function () {
                            e.removeEventListener(n, i, o);
                          },
                        }
                      );
                    }
                    function i(e, t, n, o, i) {
                      return typeof e.addEventListener == "function"
                        ? s.apply(null, arguments)
                        : typeof n == "function"
                        ? s.bind(null, document).apply(null, arguments)
                        : (typeof e == "string" &&
                            (e = document.querySelectorAll(e)),
                          Array.prototype.map.call(e, function (e) {
                            return s(e, t, n, o, i);
                          }));
                    }
                    function a(e, t, n, s) {
                      return function (n) {
                        (n.delegateTarget = o(n.target, t)),
                          n.delegateTarget && s.call(e, n);
                      };
                    }
                    e.exports = i;
                  },
                  879: function (e, t) {
                    (t.node = function (e) {
                      return (
                        e !== void 0 &&
                        e instanceof HTMLElement &&
                        e.nodeType === 1
                      );
                    }),
                      (t.nodeList = function (e) {
                        var n = Object.prototype.toString.call(e);
                        return (
                          e !== void 0 &&
                          (n === "[object NodeList]" ||
                            n === "[object HTMLCollection]") &&
                          "length" in e &&
                          (e.length === 0 || t.node(e[0]))
                        );
                      }),
                      (t.string = function (e) {
                        return typeof e == "string" || e instanceof String;
                      }),
                      (t.fn = function (e) {
                        var t = Object.prototype.toString.call(e);
                        return t === "[object Function]";
                      });
                  },
                  370: function (e, t, n) {
                    var s = n(879),
                      o = n(438);
                    function i(e, t, n) {
                      if (!e && !t && !n)
                        throw new Error("Missing required arguments");
                      if (!s.string(t))
                        throw new TypeError("Second argument must be a String");
                      if (!s.fn(n))
                        throw new TypeError(
                          "Third argument must be a Function"
                        );
                      if (s.node(e)) return a(e, t, n);
                      if (s.nodeList(e)) return r(e, t, n);
                      if (s.string(e)) return c(e, t, n);
                      throw new TypeError(
                        "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
                      );
                    }
                    function a(e, t, n) {
                      return (
                        e.addEventListener(t, n),
                        {
                          destroy: function () {
                            e.removeEventListener(t, n);
                          },
                        }
                      );
                    }
                    function r(e, t, n) {
                      return (
                        Array.prototype.forEach.call(e, function (e) {
                          e.addEventListener(t, n);
                        }),
                        {
                          destroy: function () {
                            Array.prototype.forEach.call(e, function (e) {
                              e.removeEventListener(t, n);
                            });
                          },
                        }
                      );
                    }
                    function c(e, t, n) {
                      return o(document.body, e, t, n);
                    }
                    e.exports = i;
                  },
                  817: function (e) {
                    function t(e) {
                      if (e.nodeName === "SELECT") e.focus(), (t = e.value);
                      else if (
                        e.nodeName === "INPUT" ||
                        e.nodeName === "TEXTAREA"
                      ) {
                        var t,
                          n,
                          s,
                          o = e.hasAttribute("readonly");
                        o || e.setAttribute("readonly", ""),
                          e.select(),
                          e.setSelectionRange(0, e.value.length),
                          o || e.removeAttribute("readonly"),
                          (t = e.value);
                      } else
                        e.hasAttribute("contenteditable") && e.focus(),
                          (n = window.getSelection()),
                          (s = document.createRange()),
                          s.selectNodeContents(e),
                          n.removeAllRanges(),
                          n.addRange(s),
                          (t = n.toString());
                      return t;
                    }
                    e.exports = t;
                  },
                  279: function (e) {
                    function t() {}
                    (t.prototype = {
                      on: function (e, t, n) {
                        var s = this.e || (this.e = {});
                        return (
                          (s[e] || (s[e] = [])).push({
                            fn: t,
                            ctx: n,
                          }),
                          this
                        );
                      },
                      once: function (e, t, n) {
                        var o = this;
                        function s() {
                          o.off(e, s), t.apply(n, arguments);
                        }
                        return (s._ = t), this.on(e, s, n);
                      },
                      emit: function (e) {
                        var s = [].slice.call(arguments, 1),
                          n = ((this.e || (this.e = {}))[e] || []).slice(),
                          t = 0,
                          o = n.length;
                        for (t; t < o; t++) n[t].fn.apply(n[t].ctx, s);
                        return this;
                      },
                      off: function (e, t) {
                        if (
                          ((o = this.e || (this.e = {})),
                          (n = o[e]),
                          (i = []),
                          n && t)
                        )
                          for (var n, o, i, s = 0, a = n.length; s < a; s++)
                            n[s].fn !== t && n[s].fn._ !== t && i.push(n[s]);
                        return i.length ? (o[e] = i) : delete o[e], this;
                      },
                    }),
                      (e.exports = t),
                      (e.exports.TinyEmitter = t);
                  },
                },
                t = {};
              function e(s) {
                if (t[s]) return t[s].exports;
                var o = (t[s] = {
                  exports: {},
                });
                return n[s](o, o.exports, e), o.exports;
              }
              return (
                !(function () {
                  e.n = function (t) {
                    var n =
                      t && t.__esModule
                        ? function () {
                            return t.default;
                          }
                        : function () {
                            return t;
                          };
                    return (
                      e.d(n, {
                        a: n,
                      }),
                      n
                    );
                  };
                })(),
                !(function () {
                  e.d = function (t, n) {
                    for (var s in n)
                      e.o(n, s) &&
                        !e.o(t, s) &&
                        Object.defineProperty(t, s, {
                          enumerable: !0,
                          get: n[s],
                        });
                  };
                })(),
                !(function () {
                  e.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                  };
                })(),
                e(686)
              );
            })().default;
          });
        },
      }),
      d = r(l()),
      a = document.getElementsByTagName("pre");
    for (e = 0; e < a.length; ++e)
      (n = a[e]),
        (i = n.getElementsByClassName("language-mermaid")[0]),
        i == null &&
          n.insertAdjacentHTML(
            "afterbegin",
            '<button class="btn btn-copy"></button>'
          );
    (t = new d.default(".btn-copy", {
      target: function (e) {
        return e.nextElementSibling;
      },
    })),
      t.on("success", function (e) {
        e.clearSelection();
      }),
      t.on("error", function (e) {
        console.error("Action:", e.action),
          console.error("Trigger:", e.trigger);
      });
  })(),
  (() => {
    var e,
      s,
      a = new Set(),
      i = document.createElement("link"),
      j =
        i.relList &&
        i.relList.supports &&
        i.relList.supports("prefetch") &&
        window.IntersectionObserver &&
        "isIntersecting" in IntersectionObserverEntry.prototype,
      f = "instantAllowQueryString" in document.body.dataset,
      m = "instantAllowExternalLinks" in document.body.dataset,
      h = "instantWhitelist" in document.body.dataset,
      c = "instantMousedownShortcut" in document.body.dataset,
      l = 1111,
      u = 65,
      r = !1,
      d = !1,
      o = !1;
    if ("instantIntensity" in document.body.dataset) {
      const e = document.body.dataset.instantIntensity;
      if (e.substr(0, "mousedown".length) == "mousedown")
        (r = !0), e == "mousedown-only" && (d = !0);
      else if (e.substr(0, "viewport".length) == "viewport")
        (navigator.connection &&
          (navigator.connection.saveData ||
            (navigator.connection.effectiveType &&
              navigator.connection.effectiveType.includes("2g")))) ||
          (e == "viewport"
            ? document.documentElement.clientWidth *
                document.documentElement.clientHeight <
                45e4 && (o = !0)
            : e == "viewport-all" && (o = !0));
      else {
        const t = parseInt(e);
        isNaN(t) || (u = t);
      }
    }
    if (j) {
      const e = {
        capture: !0,
        passive: !0,
      };
      if (
        (d || document.addEventListener("touchstart", y, e),
        r
          ? c || document.addEventListener("mousedown", g, e)
          : document.addEventListener("mouseover", p, e),
        c && document.addEventListener("mousedown", b, e),
        o)
      ) {
        let e;
        window.requestIdleCallback
          ? (e = (e) => {
              requestIdleCallback(e, {
                timeout: 1500,
              });
            })
          : (e = (e) => {
              e();
            }),
          e(() => {
            const e = new IntersectionObserver((t) => {
              t.forEach((t) => {
                if (t.isIntersecting) {
                  const s = t.target;
                  e.unobserve(s), n(s.href);
                }
              });
            });
            document.querySelectorAll("a").forEach((n) => {
              t(n) && e.observe(n);
            });
          });
      }
    }
    function y(e) {
      s = performance.now();
      const o = e.target.closest("a");
      if (!t(o)) return;
      n(o.href);
    }
    function p(o) {
      if (performance.now() - s < l) return;
      if (!("closest" in o.target)) return;
      const i = o.target.closest("a");
      if (!t(i)) return;
      i.addEventListener("mouseout", v, {
        passive: !0,
      }),
        (e = setTimeout(() => {
          n(i.href), (e = void 0);
        }, u));
    }
    function g(e) {
      const s = e.target.closest("a");
      if (!t(s)) return;
      n(s.href);
    }
    function v(t) {
      if (
        t.relatedTarget &&
        t.target.closest("a") == t.relatedTarget.closest("a")
      )
        return;
      e && (clearTimeout(e), (e = void 0));
    }
    function b(e) {
      if (performance.now() - s < l) return;
      const t = e.target.closest("a");
      if (e.which > 1 || e.metaKey || e.ctrlKey) return;
      if (!t) return;
      t.addEventListener(
        "click",
        function (e) {
          if (e.detail == 1337) return;
          e.preventDefault();
        },
        {
          capture: !0,
          passive: !1,
          once: !0,
        }
      );
      const n = new MouseEvent("click", {
        view: window,
        bubbles: !0,
        cancelable: !1,
        detail: 1337,
      });
      t.dispatchEvent(n);
    }
    function t(e) {
      if (!e || !e.href) return;
      if (h && !("instant" in e.dataset)) return;
      if (!m && e.origin != location.origin && !("instant" in e.dataset))
        return;
      if (!["http:", "https:"].includes(e.protocol)) return;
      if (e.protocol == "http:" && location.protocol == "https:") return;
      if (!f && e.search && !("instant" in e.dataset)) return;
      if (
        e.hash &&
        e.pathname + e.search == location.pathname + location.search
      )
        return;
      if ("noInstant" in e.dataset) return;
      return !0;
    }
    function n(e) {
      if (a.has(e)) return;
      const t = document.createElement("link");
      (t.rel = "prefetch"),
        (t.href = e),
        document.head.appendChild(t),
        a.add(e);
    }
  })(),
  (function e(t) {
    "use strict";
    try {
      module && (t = module);
    } catch {}
    t._factory = e;
    function v(e) {
      return "undefined" == typeof e || e;
    }
    function U(e) {
      const t = Array(e);
      for (let s = 0; s < e; s++) t[s] = n();
      return t;
    }
    function n() {
      return Object.create(null);
    }
    function ce(e, t) {
      return t.length - e.length;
    }
    function i(e) {
      return "string" == typeof e;
    }
    function a(e) {
      return "object" == typeof e;
    }
    function _(e) {
      return "function" == typeof e;
    }
    function W(e, t) {
      var n = re;
      if (
        e &&
        (t && (e = j(e, t)),
        this.H && (e = j(e, this.H)),
        this.J && 1 < e.length && (e = j(e, this.J)),
        n || "" === n)
      ) {
        if (((e = e.split(n)), this.filter)) {
          (t = this.filter), (n = e.length);
          const s = [];
          for (let o = 0, a = 0; o < n; o++) {
            const i = e[o];
            i && !t[i] && (s[a++] = i);
          }
          e = s;
        }
        return e;
      }
      return e;
    }
    const re = /[\p{Z}\p{S}\p{P}\p{C}]+/u,
      oe = /[\u0300-\u036f]/g;
    function V(e, t) {
      const a = Object.keys(e),
        r = a.length,
        n = [];
      let s = "",
        i = 0;
      for (let l = 0, c, d; l < r; l++)
        (c = a[l]),
          (d = e[c])
            ? ((n[i++] = o(t ? "(?!\\b)" + c + "(\\b|_)" : c)), (n[i++] = d))
            : (s += (s ? "|" : "") + c);
      return (
        s &&
          ((n[i++] = o(t ? "(?!\\b)(" + s + ")(\\b|_)" : "(" + s + ")")),
          (n[i] = "")),
        n
      );
    }
    function j(e, t) {
      for (
        let n = 0, s = t.length;
        n < s && ((e = e.replace(t[n], t[n + 1])), e);
        n += 2
      );
      return e;
    }
    function o(e) {
      return new RegExp(e, "g");
    }
    function B(e) {
      let t = "",
        n = "";
      for (let s = 0, i = e.length, o; s < i; s++)
        (o = e[s]) !== n && (t += n = o);
      return t;
    }
    var s,
      k,
      S,
      $,
      K,
      se = {
        encode: P,
        F: !1,
        G: "",
      };
    function P(e) {
      return W.call(this, ("" + e).toLowerCase(), !1);
    }
    const N = {},
      r = {};
    function z(e) {
      m(e, "add"),
        m(e, "append"),
        m(e, "search"),
        m(e, "update"),
        m(e, "remove");
    }
    function m(e, t) {
      e[t + "Async"] = function () {
        const s = this,
          e = arguments;
        var n = e[e.length - 1];
        let o;
        return (
          _(n) && ((o = n), delete e[e.length - 1]),
          (n = new Promise(function (n) {
            setTimeout(function () {
              s.async = !0;
              const o = s[t].apply(s, e);
              (s.async = !1), n(o);
            });
          })),
          o ? (n.then(o), this) : n
        );
      };
    }
    function F(e, t, s, o) {
      const l = e.length;
      let a = [],
        i,
        c,
        r = 0;
      o && (o = []);
      for (let d = l - 1; 0 <= d; d--) {
        const h = e[d],
          f = h.length,
          u = n();
        let m = !i;
        for (let e = 0; e < f; e++) {
          const n = h[e],
            p = n.length;
          if (p)
            for (let f = 0, h, e; f < p; f++)
              if (((e = n[f]), i)) {
                {
                  if (i[e]) {
                    if (!d)
                      if (s) s--;
                      else if (((a[r++] = e), r === t)) return a;
                    (d || o) && (u[e] = 1), (m = !0);
                  }
                  if (o && ((c[e] = (h = c[e]) ? ++h : (h = 1)), h < l)) {
                    const t = o[h - 2] || (o[h - 2] = []);
                    t[t.length] = e;
                  }
                }
              } else u[e] = 1;
        }
        if (o) i || (c = u);
        else if (!m) return [];
        i = u;
      }
      if (o)
        for (let e = o.length - 1, n, c; 0 <= e; e--) {
          (n = o[e]), (c = n.length);
          for (let o = 0, e; o < c; o++)
            if (((e = n[o]), !i[e])) {
              if (s) s--;
              else if (((a[r++] = e), r === t)) return a;
              i[e] = 1;
            }
        }
      return a;
    }
    function ne(e, t) {
      const o = n(),
        i = n(),
        s = [];
      for (let t = 0; t < e.length; t++) o[e[t]] = 1;
      for (let e = 0, n; e < t.length; e++) {
        n = t[e];
        for (let t = 0, e; t < n.length; t++)
          (e = n[t]), o[e] && !i[e] && ((i[e] = 1), (s[s.length] = e));
      }
      return s;
    }
    function g(e) {
      (this.l = !0 !== e && e), (this.cache = n()), (this.h = []);
    }
    function M(e, t, n) {
      a(e) && (e = e.query);
      let s = this.cache.get(e);
      return s || ((s = this.search(e, t, n)), this.cache.set(e, s)), s;
    }
    (g.prototype.set = function (e, t) {
      if (!this.cache[e]) {
        var n = this.h.length;
        n === this.l ? delete this.cache[this.h[n - 1]] : n++;
        for (--n; 0 < n; n--) this.h[n] = this.h[n - 1];
        this.h[0] = e;
      }
      this.cache[e] = t;
    }),
      (g.prototype.get = function (e) {
        const t = this.cache[e];
        if (this.l && t && (e = this.h.indexOf(e))) {
          const t = this.h[e - 1];
          (this.h[e - 1] = this.h[e]), (this.h[e] = t);
        }
        return t;
      });
    const te = {
      memory: {
        charset: "latin:extra",
        D: 3,
        B: 4,
        m: !1,
      },
      performance: {
        D: 3,
        B: 3,
        s: !1,
        context: {
          depth: 2,
          D: 1,
        },
      },
      match: {
        charset: "latin:extra",
        G: "reverse",
      },
      score: {
        charset: "latin:advanced",
        D: 20,
        B: 3,
        context: {
          depth: 3,
          D: 9,
        },
      },
      default: {},
    };
    function A(e, t, n, s, o, i) {
      setTimeout(function () {
        const a = e(n, JSON.stringify(i));
        a && a.then
          ? a.then(function () {
              t.export(e, t, n, s, o + 1);
            })
          : t.export(e, t, n, s, o + 1);
      });
    }
    function c(e, t) {
      if (!(this instanceof c)) return new c(e);
      if (e) {
        i(e) ? (e = te[e]) : (s = e.preset) && (e = Object.assign({}, s[s], e)),
          (s = e.charset);
        var s,
          o = e.lang;
        i(s) && (-1 === s.indexOf(":") && (s += ":default"), (s = r[s])),
          i(o) && (o = N[o]);
      } else e = {};
      let a,
        l,
        d = e.context || {};
      if (
        ((this.encode = e.encode || (s && s.encode) || P),
        (this.register = t || n()),
        (this.D = a = e.resolution || 9),
        (this.G = t = (s && s.G) || e.tokenize || "strict"),
        (this.depth = "strict" === t && d.depth),
        (this.l = v(d.bidirectional)),
        (this.s = l = v(e.optimize)),
        (this.m = v(e.fastupdate)),
        (this.B = e.minlength || 1),
        (this.C = e.boost),
        (this.map = l ? U(a) : n()),
        (this.A = a = d.resolution || 1),
        (this.h = l ? U(a) : n()),
        (this.F = (s && s.F) || e.rtl),
        (this.H = (t = e.matcher || (o && o.H)) && V(t, !1)),
        (this.J = (t = e.stemmer || (o && o.J)) && V(t, !0)),
        (s = t = e.filter || (o && o.filter)))
      ) {
        (s = t), (o = n());
        for (let e = 0, t = s.length; e < t; e++) o[s[e]] = 1;
        s = o;
      }
      (this.filter = s), (this.cache = (t = e.cache) && new g(t));
    }
    (s = c.prototype),
      (s.append = function (e, t) {
        return this.add(e, t, !0);
      }),
      (s.add = function (e, t, s, o) {
        if (t && (e || 0 === e)) {
          if (!o && !s && this.register[e]) return this.update(e, t);
          if (((t = this.encode(t)), (o = t.length))) {
            const f = n(),
              d = n(),
              m = this.depth,
              u = this.D;
            for (let g = 0; g < o; g++) {
              let p = t[this.F ? o - 1 - g : g];
              if (((r = p.length), p && r >= this.B && (m || !d[p]))) {
                var i,
                  r,
                  l,
                  a = y(u, o, g),
                  c = "";
                switch (this.G) {
                  case "full":
                    if (3 < r) {
                      for (a = 0; a < r; a++)
                        for (i = r; i > a; i--)
                          i - a >= this.B &&
                            ((l = y(u, o, g, r, a)),
                            (c = p.substring(a, i)),
                            h(this, d, c, l, e, s));
                      break;
                    }
                  case "reverse":
                    if (2 < r) {
                      for (i = r - 1; 0 < i; i--)
                        (c = p[i] + c),
                          c.length >= this.B &&
                            h(this, d, c, y(u, o, g, r, i), e, s);
                      c = "";
                    }
                  case "forward":
                    if (1 < r) {
                      for (i = 0; i < r; i++)
                        (c += p[i]),
                          c.length >= this.B && h(this, d, c, a, e, s);
                      break;
                    }
                  default:
                    if (
                      (this.C &&
                        (a = Math.min((a / this.C(t, p, g)) | 0, u - 1)),
                      h(this, d, p, a, e, s),
                      m && 1 < o && g < o - 1)
                    )
                      for (
                        r = n(),
                          c = this.A,
                          a = p,
                          i = Math.min(m + 1, o - g),
                          r[a] = 1,
                          l = 1;
                        l < i;
                        l++
                      )
                        if (
                          (p = t[this.F ? o - 1 - g - l : g + l]) &&
                          p.length >= this.B &&
                          !r[p]
                        ) {
                          r[p] = 1;
                          const t = this.l && p > a;
                          h(
                            this,
                            f,
                            t ? a : p,
                            y(c + (o / 2 > c ? 0 : 1), o, g, i - 1, l - 1),
                            e,
                            s,
                            t ? p : a
                          );
                        }
                }
              }
            }
            this.m || (this.register[e] = 1);
          }
        }
        return this;
      });
    function y(e, t, n, s, o) {
      return n && 1 < e
        ? t + (s || 0) <= e
          ? n + (o || 0)
          : (((e - 1) / (t + (s || 0))) * (n + (o || 0)) + 1) | 0
        : 0;
    }
    function h(e, t, s, o, i, a, r) {
      let c = r ? e.h : e.map;
      (!t[s] || (r && !t[s][r])) &&
        (e.s && (c = c[o]),
        r
          ? ((t = t[s] || (t[s] = n())), (t[r] = 1), (c = c[r] || (c[r] = n())))
          : (t[s] = 1),
        (c = c[s] || (c[s] = [])),
        e.s || (c = c[o] || (c[o] = [])),
        (a && -1 !== c.indexOf(i)) ||
          ((c[c.length] = i),
          e.m &&
            ((e = e.register[i] || (e.register[i] = [])), (e[e.length] = c))));
    }
    s.search = function (e, t, s) {
      s || (!t && a(e) ? ((s = e), (e = s.query)) : a(t) && (s = t));
      let i = [],
        o,
        r,
        d = 0;
      if (s) {
        (t = s.limit), (d = s.offset || 0);
        var l,
          c = s.context;
        r = s.suggest;
      }
      if (e && ((e = this.encode(e)), (o = e.length), 1 < o)) {
        (s = n()), (l = []);
        for (let n = 0, a = 0, t; n < o; n++)
          if ((t = e[n]) && t.length >= this.B && !s[t])
            if (this.s || r || this.map[t]) (l[a++] = t), (s[t] = 1);
            else return i;
        (e = l), (o = e.length);
      }
      if (!o) return i;
      t || (t = 100), (c = this.depth && 1 < o && !1 !== c), (s = 0);
      let u;
      c ? ((u = e[0]), (s = 1)) : 1 < o && e.sort(ce);
      for (let n, a; s < o; s++) {
        if (
          ((a = e[s]),
          c
            ? ((n = T(this, i, r, t, d, 2 === o, a, u)),
              (r && !1 === n && i.length) || (u = a))
            : (n = T(this, i, r, t, d, 1 === o, a)),
          n)
        )
          return n;
        if (r && s === o - 1) {
          if (((l = i.length), !l)) {
            if (c) {
              (c = 0), (s = -1);
              continue;
            }
            return i;
          }
          if (1 === l) return Y(i[0], t, d);
        }
      }
      return F(i, t, d, r);
    };
    function T(e, t, n, s, o, i, a, r) {
      let l = [],
        c = r ? e.h : e.map;
      if ((e.s || (c = D(c, a, r, e.l)), c)) {
        let n = 0;
        const d = Math.min(c.length, r ? e.A : e.D);
        for (let u = 0, m = 0, t, h; u < d; u++)
          if (
            (t = c[u]) &&
            (e.s && (t = D(t, a, r, e.l)),
            o &&
              t &&
              i &&
              ((h = t.length),
              h <= o ? ((o -= h), (t = null)) : ((t = t.slice(o)), (o = 0))),
            t && ((l[n++] = t), i && ((m += t.length), m >= s)))
          )
            break;
        if (n) {
          if (i) return Y(l, s, 0);
          t[t.length] = l;
          return;
        }
      }
      return !n && l;
    }
    function Y(e, t, n) {
      return (
        (e = 1 === e.length ? e[0] : [].concat.apply([], e)),
        n || e.length > t ? e.slice(n, n + t) : e
      );
    }
    function D(e, t, n, s) {
      return (
        n
          ? ((s = s && t > n), (e = (e = e[s ? t : n]) && e[s ? n : t]))
          : (e = e[t]),
        e
      );
    }
    (s.contain = function (e) {
      return !!this.register[e];
    }),
      (s.update = function (e, t) {
        return this.remove(e).add(e, t);
      }),
      (s.remove = function (e, t) {
        const n = this.register[e];
        if (n) {
          if (this.m)
            for (let t = 0, s; t < n.length; t++)
              (s = n[t]), s.splice(s.indexOf(e), 1);
          else
            b(this.map, e, this.D, this.s),
              this.depth && b(this.h, e, this.A, this.s);
          if ((t || delete this.register[e], this.cache)) {
            t = this.cache;
            for (let n = 0, o, s; n < t.h.length; n++)
              (s = t.h[n]),
                (o = t.cache[s]),
                -1 !== o.indexOf(e) && (t.h.splice(n--, 1), delete t.cache[s]);
          }
        }
        return this;
      });
    function b(e, t, n, s, o) {
      let i = 0;
      if (e.constructor === Array)
        if (o)
          (t = e.indexOf(t)),
            -1 !== t ? 1 < e.length && (e.splice(t, 1), i++) : i++;
        else {
          o = Math.min(e.length, n);
          for (let a = 0, r; a < o; a++)
            (r = e[a]) && ((i = b(r, t, n, s, o)), s || i || delete e[a]);
        }
      else for (let a in e) (i = b(e[a], t, n, s, o)) || delete e[a];
      return i;
    }
    (s.searchCache = M),
      (s.export = function (e, t, s, o, i) {
        let r, a;
        switch (i || (i = 0)) {
          case 0:
            if (((r = "reg"), this.m)) {
              a = n();
              for (let e in this.register) a[e] = 1;
            } else a = this.register;
            break;
          case 1:
            (r = "cfg"),
              (a = {
                doc: 0,
                opt: this.s ? 1 : 0,
              });
            break;
          case 2:
            (r = "map"), (a = this.map);
            break;
          case 3:
            (r = "ctx"), (a = this.h);
            break;
          default:
            return;
        }
        return A(e, t || this, s ? s + "." + r : r, o, i, a), !0;
      }),
      (s.import = function (e, t) {
        if (t)
          switch ((i(t) && (t = JSON.parse(t)), e)) {
            case "cfg":
              this.s = !!t.opt;
              break;
            case "reg":
              (this.m = !1), (this.register = t);
              break;
            case "map":
              this.map = t;
              break;
            case "ctx":
              this.h = t;
          }
      }),
      z(c.prototype);
    function ee(e) {
      e = e.data;
      var n,
        s = t._index;
      const o = e.args;
      switch (((n = e.task), n)) {
        case "init":
          (n = e.options || {}),
            (e = e.factory),
            (s = n.encode),
            (n.cache = !1),
            s &&
              0 === s.indexOf("function") &&
              (n.encode = Function("return " + s)()),
            e
              ? (Function("return " + e)()(t),
                (t._index = new t.FlexSearch.Index(n)),
                delete t.FlexSearch)
              : (t._index = new c(n));
          break;
        default:
          (e = e.id),
            (s = s[n].apply(s, o)),
            postMessage(
              "search" === n
                ? {
                    id: e,
                    msg: s,
                  }
                : {
                    id: e,
                  }
            );
      }
    }
    let R = 0;
    function l(e) {
      if (!(this instanceof l)) return new l(e);
      var s;
      e ? _((s = e.encode)) && (e.encode = s.toString()) : (e = {}),
        (s = (t || window)._factory) && (s = s.toString());
      const i = t.exports,
        o = this;
      (this.o = J(s, i, e.worker)),
        (this.h = n()),
        this.o &&
          (i
            ? this.o.on("message", function (e) {
                o.h[e.id](e.msg), delete o.h[e.id];
              })
            : (this.o.onmessage = function (e) {
                (e = e.data), o.h[e.id](e.msg), delete o.h[e.id];
              }),
          this.o.postMessage({
            task: "init",
            factory: s,
            options: e,
          }));
    }
    d("add"), d("append"), d("search"), d("update"), d("remove");
    function d(e) {
      l.prototype[e] = l.prototype[e + "Async"] = function () {
        const o = this,
          t = [].slice.call(arguments);
        var n = t[t.length - 1];
        let s;
        return (
          _(n) && ((s = n), t.splice(t.length - 1, 1)),
          (n = new Promise(function (n) {
            setTimeout(function () {
              (o.h[++R] = n),
                o.o.postMessage({
                  task: e,
                  id: R,
                  args: t,
                });
            });
          })),
          s ? (n.then(s), this) : n
        );
      };
    }
    function J(e, t, n) {
      let s;
      try {
        s = t
          ? eval(
              'new (require("worker_threads")["Worker"])("../dist/node/node.js")'
            )
          : e
          ? new Worker(
              URL.createObjectURL(
                new Blob(["onmessage=" + ee.toString()], {
                  type: "text/javascript",
                })
              )
            )
          : new Worker(i(n) ? n : "worker/worker.js", {
              type: "module",
            });
      } catch {}
      return s;
    }
    function u(e) {
      if (!(this instanceof u)) return new u(e);
      var t,
        s = e.document || e.doc || e;
      (this.K = []),
        (this.h = []),
        (this.A = []),
        (this.register = n()),
        (this.key = ((t = s.key || s.id) && f(t, this.A)) || "id"),
        (this.m = v(e.fastupdate)),
        (this.C = (t = s.store) && !0 !== t && []),
        (this.store = t && n()),
        (this.I = (t = s.tag) && f(t, this.A)),
        (this.l = t && n()),
        (this.cache = (t = e.cache) && new g(t)),
        (e.cache = !1),
        (this.o = e.worker),
        (this.async = !1),
        (t = n());
      let o = s.index || s.field || s;
      i(o) && (o = [o]);
      for (let r = 0, n, s; r < o.length; r++)
        (n = o[r]),
          i(n) || ((s = n), (n = n.field)),
          (s = a(s) ? Object.assign({}, e, s) : e),
          this.o && ((t[n] = new l(s)), t[n].o || (this.o = !1)),
          this.o || (t[n] = new c(s, this.register)),
          (this.K[r] = f(n, this.A)),
          (this.h[r] = n);
      if (this.C)
        for (e = s.store, i(e) && (e = [e]), s = 0; s < e.length; s++)
          this.C[s] = f(e[s], this.A);
      this.index = t;
    }
    function f(e, t) {
      const n = e.split(":");
      let s = 0;
      for (let o = 0; o < n.length; o++)
        (e = n[o]),
          0 <= e.indexOf("[]") &&
            (e = e.substring(0, e.length - 2)) &&
            (t[s] = !0),
          e && (n[s++] = e);
      return s < n.length && (n.length = s), 1 < s ? n : n[0];
    }
    function E(e, t) {
      if (i(t)) e = e[t];
      else for (let n = 0; e && n < t.length; n++) e = e[t[n]];
      return e;
    }
    function w(e, t, s, o, i) {
      if (((e = e[i]), o === s.length - 1)) t[i] = e;
      else if (e)
        if (e.constructor === Array)
          for (t = t[i] = Array(e.length), i = 0; i < e.length; i++)
            w(e, t, s, o, i);
        else (t = t[i] || (t[i] = n())), (i = s[++o]), w(e, t, s, o, i);
    }
    function C(e, t, n, s, o, i, a, r) {
      if ((e = e[a]))
        if (s === t.length - 1) {
          if (e.constructor === Array) {
            if (n[s]) {
              for (t = 0; t < e.length; t++) o.add(i, e[t], !0, !0);
              return;
            }
            e = e.join(" ");
          }
          o.add(i, e, r, !0);
        } else if (e.constructor === Array)
          for (a = 0; a < e.length; a++) C(e, t, n, s, o, i, a, r);
        else (a = t[++s]), C(e, t, n, s, o, i, a, r);
    }
    (s = u.prototype),
      (s.add = function (e, t, s) {
        if ((a(e) && ((t = e), (e = E(t, this.key))), t && (e || 0 === e))) {
          if (!s && this.register[e]) return this.update(e, t);
          for (let o = 0, n, a; o < this.h.length; o++)
            (a = this.h[o]),
              (n = this.K[o]),
              i(n) && (n = [n]),
              C(t, n, this.A, 0, this.index[a], e, n[0], s);
          if (this.I) {
            let o = E(t, this.I),
              a = n();
            i(o) && (o = [o]);
            for (let i = 0, t, n; i < o.length; i++)
              if (
                ((t = o[i]),
                !a[t] &&
                  ((a[t] = 1),
                  (n = this.l[t] || (this.l[t] = [])),
                  !s || -1 === n.indexOf(e)) &&
                  ((n[n.length] = e), this.m))
              ) {
                const t = this.register[e] || (this.register[e] = []);
                t[t.length] = n;
              }
          }
          if (this.store && (!s || !this.store[e])) {
            let s;
            if (this.C) {
              s = n();
              for (let n = 0, e; n < this.C.length; n++)
                (e = this.C[n]), i(e) ? (s[e] = t[e]) : w(t, s, e, 0, e[0]);
            }
            this.store[e] = s || t;
          }
        }
        return this;
      }),
      (s.append = function (e, t) {
        return this.add(e, t, !0);
      }),
      (s.update = function (e, t) {
        return this.remove(e).add(e, t);
      }),
      (s.remove = function (e) {
        if ((a(e) && (e = E(e, this.key)), this.register[e])) {
          for (
            var t = 0;
            t < this.h.length &&
            (this.index[this.h[t]].remove(e, !this.o), !this.m);
            t++
          );
          if (this.I && !this.m)
            for (let n in this.l) {
              t = this.l[n];
              const s = t.indexOf(e);
              -1 !== s && (1 < t.length ? t.splice(s, 1) : delete this.l[n]);
            }
          this.store && delete this.store[e], delete this.register[e];
        }
        return this;
      }),
      (s.search = function (e, t, n, s) {
        n ||
          (!t && a(e) ? ((n = e), (e = n.query)) : a(t) && ((n = t), (t = 0)));
        let c = [],
          m = [],
          p,
          u,
          r,
          o,
          l,
          f,
          d = 0;
        if (n)
          if (n.constructor === Array) (r = n), (n = null);
          else {
            if (
              ((r = (p = n.pluck) || n.index || n.field),
              (o = n.tag),
              (u = this.store && n.enrich),
              (l = "and" === n.bool),
              (t = n.limit || 100),
              (f = n.offset || 0),
              o && (i(o) && (o = [o]), !e))
            ) {
              for (let e = 0, n; e < o.length; e++)
                (n = Q.call(this, o[e], t, f, u)) && ((c[c.length] = n), d++);
              return d ? c : [];
            }
            i(r) && (r = [r]);
          }
        r || (r = this.h), (l = l && (1 < r.length || (o && 1 < o.length)));
        const h = !s && (this.o || this.async) && [];
        for (let p = 0, a, u, g; p < r.length; p++) {
          let v;
          if (((u = r[p]), i(u) || ((v = u), (u = u.field)), h))
            h[p] = this.index[u].searchAsync(e, t, v || n);
          else {
            if (
              (s ? (a = s[p]) : (a = this.index[u].search(e, t, v || n)),
              (g = a && a.length),
              o && g)
            ) {
              const e = [];
              let n = 0;
              l && (e[0] = [a]);
              for (let s = 0, i, t; s < o.length; s++)
                ((i = o[s]), (g = (t = this.l[i]) && t.length)) &&
                  (n++, (e[e.length] = l ? [t] : t));
              n &&
                ((a = l ? F(e, t || 100, f || 0) : ne(a, e)), (g = a.length));
            }
            if (g) (m[d] = u), (c[d++] = a);
            else if (l) return [];
          }
        }
        if (h) {
          const s = this;
          return new Promise(function (o) {
            Promise.all(h).then(function (i) {
              o(s.search(e, t, n, i));
            });
          });
        }
        if (!d) return [];
        if (p && (!u || !this.store)) return c[0];
        for (let t = 0, e; t < m.length; t++) {
          if (((e = c[t]), e.length && u && (e = q.call(this, e)), p)) return e;
          c[t] = {
            field: m[t],
            result: e,
          };
        }
        return c;
      });
    function Q(e, t, n, s) {
      let o = this.l[e],
        i = o && o.length - n;
      if (i && 0 < i)
        return (
          (i > t || n) && (o = o.slice(n, n + t)),
          s && (o = q.call(this, o)),
          {
            tag: e,
            result: o,
          }
        );
    }
    function q(e) {
      const t = Array(e.length);
      for (let n = 0, s; n < e.length; n++)
        (s = e[n]),
          (t[n] = {
            id: s,
            doc: this.store[s],
          });
      return t;
    }
    (s.contain = function (e) {
      return !!this.register[e];
    }),
      (s.get = function (e) {
        return this.store[e];
      }),
      (s.set = function (e, t) {
        return (this.store[e] = t), this;
      }),
      (s.searchCache = M),
      (s.export = function (e, t, n, s, o) {
        if ((o || (o = 0), s || (s = 0), s < this.h.length)) {
          const n = this.h[s],
            i = this.index[n];
          (t = this),
            setTimeout(function () {
              i.export(e, t, o ? n.replace(":", "-") : "", s, o++) ||
                (s++, (o = 1), t.export(e, t, n, s, o));
            });
        } else {
          let t;
          switch (o) {
            case 1:
              (n = "tag"), (t = this.l);
              break;
            case 2:
              (n = "store"), (t = this.store);
              break;
            default:
              return;
          }
          A(e, this, n, s, o, t);
        }
      }),
      (s.import = function (e, t) {
        if (t)
          switch ((i(t) && (t = JSON.parse(t)), e)) {
            case "tag":
              this.l = t;
              break;
            case "reg":
              (this.m = !1), (this.register = t);
              for (let e = 0, n; e < this.h.length; e++)
                (n = this.index[this.h[e]]), (n.register = t), (n.m = !1);
              break;
            case "store":
              this.store = t;
              break;
            default:
              e = e.split(".");
              const n = e[0];
              (e = e[1]), n && e && this.index[n].import(e, t);
          }
      }),
      z(u.prototype),
      (k = {
        encode: G,
        F: !1,
        G: "",
      });
    const X = [
      o("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"),
      "a",
      o("[\u00e8\u00e9\u00ea\u00eb]"),
      "e",
      o("[\u00ec\u00ed\u00ee\u00ef]"),
      "i",
      o("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"),
      "o",
      o("[\u00f9\u00fa\u00fb\u00fc\u0171]"),
      "u",
      o("[\u00fd\u0177\u00ff]"),
      "y",
      o("\u00f1"),
      "n",
      o("[\u00e7c]"),
      "k",
      o("\u00df"),
      "s",
      o(" & "),
      " and ",
    ];
    function G(e) {
      var t = e;
      return (
        t.normalize && (t = t.normalize("NFD").replace(oe, "")),
        W.call(this, t.toLowerCase(), !e.normalize && X)
      );
    }
    K = {
      encode: L,
      F: !1,
      G: "strict",
    };
    const Z = /[^a-z0-9]+/,
      I = {
        b: "p",
        v: "f",
        w: "f",
        z: "s",
        x: "s",
        "\u00df": "s",
        d: "t",
        n: "m",
        c: "k",
        g: "k",
        j: "k",
        q: "k",
        i: "e",
        y: "e",
        u: "o",
      };
    function L(e) {
      e = G.call(this, e).join(" ");
      const t = [];
      if (e) {
        const n = e.split(Z),
          s = n.length;
        for (let i = 0, o, a = 0; i < s; i++)
          if ((e = n[i]) && (!this.filter || !this.filter[e])) {
            o = e[0];
            let n = I[o] || o,
              s = n;
            for (let i = 1; i < e.length; i++) {
              o = e[i];
              const t = I[o] || o;
              t && t !== s && ((n += t), (s = t));
            }
            t[a++] = n;
          }
      }
      return t;
    }
    S = {
      encode: H,
      F: !1,
      G: "",
    };
    const le = [
      o("ae"),
      "a",
      o("oe"),
      "o",
      o("sh"),
      "s",
      o("th"),
      "t",
      o("ph"),
      "f",
      o("pf"),
      "f",
      o("(?![aeo])h(?![aeo])"),
      "",
      o("(?!^[aeo])h(?!^[aeo])"),
      "",
    ];
    function H(e, t) {
      return (
        e &&
          ((e = L.call(this, e).join(" ")),
          2 < e.length && (e = j(e, le)),
          t || (1 < e.length && (e = B(e)), e && (e = e.split(" ")))),
        e
      );
    }
    $ = {
      encode: ae,
      F: !1,
      G: "",
    };
    const ie = o("(?!\\b)[aeo]");
    function ae(e) {
      return (
        e &&
          ((e = H.call(this, e, !0)),
          1 < e.length && (e = e.replace(ie, "")),
          1 < e.length && (e = B(e)),
          e && (e = e.split(" "))),
        e
      );
    }
    (r["latin:default"] = se),
      (r["latin:simple"] = k),
      (r["latin:balance"] = K),
      (r["latin:advanced"] = S),
      (r["latin:extra"] = $);
    const p = t;
    let O;
    const x = {
      Index: c,
      Document: u,
      Worker: l,
      registerCharset: function (e, t) {
        r[e] = t;
      },
      registerLanguage: function (e, t) {
        N[e] = t;
      },
    };
    (O = p.define) && O.amd
      ? O([], function () {
          return x;
        })
      : p.exports
      ? (p.exports = x)
      : (p.FlexSearch = x);
  })(this),
  (() => {
    var e = document.getElementById("mode");
    e !== null &&
      (window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          e.matches
            ? (localStorage.setItem("theme", "dark"),
              document.documentElement.setAttribute("data-dark-mode", ""))
            : (localStorage.setItem("theme", "light"),
              document.documentElement.removeAttribute("data-dark-mode"));
        }),
      e.addEventListener("click", () => {
        document.documentElement.toggleAttribute("data-dark-mode"),
          localStorage.setItem(
            "theme",
            document.documentElement.hasAttribute("data-dark-mode")
              ? "dark"
              : "light"
          );
      }),
      localStorage.getItem("theme") === "dark"
        ? document.documentElement.setAttribute("data-dark-mode", "")
        : document.documentElement.removeAttribute("data-dark-mode"));
  })(),
  (() => {
    if (document.querySelector("#sidebar-default") !== null) {
      let e = document.getElementById("sidebar-default"),
        t = sessionStorage.getItem("sidebar-scroll");
      t !== null && (e.scrollTop = parseInt(t, 10)),
        window.addEventListener("beforeunload", () => {
          sessionStorage.setItem("sidebar-scroll", e.scrollTop);
        });
    }
  })(),
  (() => {
    var e = document.getElementById("toTop");
    e !== null &&
      ((e.style.display = "none"),
      (window.onscroll = function () {
        t();
      }));
    function t() {
      document.body.scrollTop > 40 || document.documentElement.scrollTop > 40
        ? (e.style.display = "block")
        : (e.style.display = "none");
    }
  })();
