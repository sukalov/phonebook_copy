"use strict";
(self.webpackChunkphonebook = self.webpackChunkphonebook || []).push([[511], {
  511: function (e, n, t) {
    t.r(n),
      t.d(n, {
        default: function () {
          return a;
        },
      });
    var s = t(816),
      r = t(982),
      o = t(836),
      c = function (e, n, t, s) {
        var c = (0, r.Z)(e), u = c.indexOf(s);
        window.confirm(
          "Are you sure you want to delete ".concat(s.name, " from conacts?"),
        ) && (o.Z.del(s).then(function (e) {
          t({ message: "Contact deleted successfully!", status: "good" }),
            setTimeout(function () {
              return t({ message: null });
            }, 3e3),
            c.splice(u, 0),
            n(c);
        }).catch(function (e) {
          t({ message: "404: contact already deleted" }),
            setTimeout(function () {
              return t({ message: null });
            }, 3e3);
        }),
          c.splice(u, 1),
          n(c));
      },
      u = t(184),
      a = function (e) {
        var n = e.persons, t = e.search, r = e.set, o = e.setMessage;
        return (0, u.jsxs)(u.Fragment, {
          children: [
            (0, u.jsx)("h3", { children: "Contacts" }),
            (0, u.jsx)("table", {
              children: (0, u.jsx)("tbody", {
                children: n.filter(function (e) {
                  return null !== e.name.toLowerCase().match(t.toLowerCase());
                }).sort(function (e, n) {
                  return e.name.localeCompare(n.name);
                }).map(function (e) {
                  return (0, u.jsxs)("tr", {
                    children: [
                      (0, u.jsxs)("td", { children: [" ", e.name] }),
                      (0, u.jsxs)("td", { children: [" ", e.number] }),
                      (0, u.jsx)("td", {
                        children: (0, u.jsx)(s.Z, {
                          text: "delete",
                          onClick: function () {
                            return c(n, r, o, e);
                          },
                        }),
                      }),
                    ],
                  }, e.id);
                }),
              }),
            }),
          ],
        });
      };
  },
}]);
//# sourceMappingURL=511.eff4a71a.chunk.js.map
