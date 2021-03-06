! function(e) {
    "use strict";
    window.StyleHatch = window.StyleHatch || {}, StyleHatch.Sections = function() {
        this.constructors = {}, this.instances = [], e(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:section:reorder", this._onReorder.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
    }, StyleHatch.Sections.prototype = e.extend({}, StyleHatch.Sections.prototype, {
        _createInstance: function(t, a) {
            var o = e(t),
                n = o.attr("data-section-id"),
                r = o.attr("data-section-type");
            if (a = a || this.constructors[r], "undefined" != typeof a) {
                var i = e.extend(new a(t), {
                    id: n,
                    type: r,
                    container: t
                });
                this.instances.push(i)
            }
        },
        _onSectionLoad: function(t) {
            var a = e("[data-section-id]", t.target)[0];
            a && this._createInstance(a)
        },
        _onSectionUnload: function(e) {
            var t = slate.utils.findInstance(this.instances, "id", e.detail.sectionId);
            t && ("function" == typeof t.onUnload && t.onUnload(e), this.instances = slate.utils.removeInstance(this.instances, "id", e.detail.sectionId))
        },
        _onSelect: function(t) {
            var a = slate.utils.findInstance(this.instances, "id", t.detail.sectionId);
            a && "function" == typeof a.onSelect && a.onSelect(t), e("body").hasClass("panel-open") && (StyleHatch.closePanelMenu(), e("html, body").addClass("scroll-lock"), setTimeout(function() {
                e("html, body").removeClass("scroll-lock"), e("html, body").animate({
                    scrollTop: a.$container.offset().top
                }, 600)
            }, 400))
        },
        _onDeselect: function(t) {
            var a = slate.utils.findInstance(this.instances, "id", t.detail.sectionId);
            a && "function" == typeof a.onDeselect && a.onDeselect(t), e("body").hasClass("panel-open") && StyleHatch.closePanelMenu()
        },
        _onReorder: function(e) {
            var t = slate.utils.findInstance(this.instances, "id", e.detail.sectionId);
            t && "function" == typeof t.onReorder && t.onReorder(e)
        },
        _onBlockSelect: function(e) {
            var t = slate.utils.findInstance(this.instances, "id", e.detail.sectionId);
            t && "function" == typeof t.onBlockSelect && t.onBlockSelect(e)
        },
        _onBlockDeselect: function(e) {
            var t = slate.utils.findInstance(this.instances, "id", e.detail.sectionId);
            t && "function" == typeof t.onBlockDeselect && t.onBlockDeselect(e)
        },
        register: function(t, a) {
            this.constructors[t] = a, e("[data-section-type=" + t + "]").each(function(e, t) {
                this._createInstance(t, a)
            }.bind(this))
        }
    }), StyleHatch.cacheSelectors = function() {
        StyleHatch.cache = {
            $body: e("body"),
            $html: e("html"),
            $util: e("header.util"),
            $header: e("header.site-header"),
            $siteNav: e("header.site-header ul.site-nav"),
            $featuredCollection: e(".featured-collection"),
            $instagramCollection: e(".instagram-collection"),
            $addToCartForm: e("#AddToCartForm"),
            $addToCartButton: e("#AddToCart"),
            $cartButton: e("#CartButton"),
            $recoverPasswordLink: e("#RecoverPassword"),
            $hideRecoverPasswordLink: e("#HideRecoverPasswordLink"),
            $recoverPasswordForm: e("#RecoverPasswordForm"),
            $customerLoginForm: e("#CustomerLoginForm"),
            $passwordResetSuccess: e("#ResetSuccess")
        }
    }, StyleHatch.init = function() {
        var e = document.documentElement;
        e.setAttribute("data-useragent", navigator.userAgent), StyleHatch.cacheSelectors(), StyleHatch.largeMobile = 700;
        var t = new StyleHatch.Sections;
        t.register("promos-section", StyleHatch.PromosSection), t.register("header-section", StyleHatch.HeaderSection), t.register("footer-section", StyleHatch.FooterSection), t.register("slideshow-section", StyleHatch.SlideshowSection), t.register("hero-video-section", StyleHatch.HeroVideoSection), t.register("featured-collection-section", StyleHatch.FeaturedCollectionSection), t.register("simple-collection-section", StyleHatch.SimpleCollectionSection), t.register("featured-text-section", StyleHatch.PageSection), t.register("custom-content-section", StyleHatch.PageSection), t.register("instagram-section", StyleHatch.InstagramSection), t.register("featured-blog-section", StyleHatch.GenericSection), t.register("map", StyleHatch.Maps), t.register("product-template", StyleHatch.Product), t.register("collection-template", StyleHatch.Collection), t.register("collection-list-template", StyleHatch.Collection), t.register("list-collections-template", StyleHatch.ListCollections), t.register("blog-template", StyleHatch.BlogArticle), t.register("article-template", StyleHatch.BlogArticle), t.register("password-template", StyleHatch.Password), t.register("cart-template", StyleHatch.Cart), StyleHatch.currencyConverter && StyleHatch.CurrencyConverter.init(), StyleHatch.ajaxCartEnable && StyleHatch.AjaxCart.init(), StyleHatch.loginForms(), StyleHatch.videoLayout(), StyleHatch.initTemplates()
    }, StyleHatch.PromosSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            StyleHatch.Promos.init()
        }
        return t
    }(), StyleHatch.PromosSection.prototype = e.extend({}, StyleHatch.PromosSection.prototype, {
        onUnload: function() {
            StyleHatch.Promos.unload()
        },
        onBlockSelect: function(e) {
            StyleHatch.Promos.blockSelect(e)
        },
        onBlockDeselect: function(e) {
            StyleHatch.Promos.blockDeselect(e)
        }
    }), StyleHatch.Promos = function() {
        function t() {
            a(), p.scrollLock = h.$promos.find(">*:first").data("scroll-lock"), o(), s(), StyleHatch.Header.rebuildFixTo()
        }

        function a() {
            h = {
                $body: e(u.body),
                $promos: e(u.promos),
                $promosContainer: e(u.promos).find(">*:first"),
                $promoBar: e(u.promoBar),
                $bottomContainer: e(u.bottomContainer),
                $popup: e(u.popup)
            }
        }

        function o() {
            h.$promoBar.length && (h.$promoBar.each(function() {
                var t = e(this),
                    a = t.data("hide-delay"),
                    o = t.data("bar-placement"),
                    n = t.find("div.errors");
                n.length && n.prependTo(t), "bottom" == o && (h.$bottomContainer.length || (h.$promosContainer.append('<div class="promo-bar-container bottom"></div>'), h.$bottomContainer = e(u.bottomContainer)), t.appendTo(h.$bottomContainer), h.$bottomContainer.resize(function() {
                    var t = e(this).height() + "px";
                    h.$body.css({
                        "margin-bottom": t
                    })
                })), t.hasClass("signup-bar") && t.showPopup(), "no-delay" !== a && p.hideTimers.push(setTimeout(function() {
                    t.data("pause-hide") || t.promoSlideUp()
                }, a))
            }), n(), i())
        }

        function n() {
            h.$promos.data("fixtoInstance") && h.$promos.fixTo("destroy")
        }

        function r() {
            h.$promos.data("fixtoInstance") && h.$promos.fixTo("refresh")
        }

        function i() {
            p.scrollLock && h.$promos.fixTo(u.page, {
                zIndex: p.fixToZIndex
            })
        }

        function s() {
            h.$popup.length && h.$popup.each(function() {
                var t = e(this),
                    a = !0,
                    o = t.data("show-delay"),
                    n = (t.data("homepage-limit"), t.data("visitor-limit")),
                    r = t.data("visitor"),
                    i = t.data("show-for");
                1 == n && 0 == r && (a = !1);
                var s = t.find(".errors");
                s.length && (o = 0);
                setTimeout(function() {
                    var a = e(window).width();
                    switch (i) {
                        case "mobile":
                            a <= StyleHatch.largeMobile && t.showPopup();
                            break;
                        case "desktop":
                            a > StyleHatch.largeMobile && t.showPopup();
                            break;
                        case "both":
                            t.showPopup()
                    }
                }, o)
            })
        }

        function l(t) {
            var a = e("#block-" + t.detail.blockId),
                o = a.data("type");
            switch (e.magnificPopup.close(), o) {
                case "announcement-bar":
                    a.promoSlideDown(), a.attr("data-pause-hide", !0);
                    break;
                case "popup":
                    a.showMockPopup();
                    break;
                case "signup-bar":
                    a.showPopup(!0)
            }
            StyleHatch.Header.rebuildFixTo(), StyleHatch.refreshFixTo()
        }

        function c(t) {
            var a = e("#block-" + t.detail.blockId),
                o = a.data("type"),
                n = a.data("show-for"),
                r = e(window).width();
            switch (o) {
                case "announcement-bar":
                    var i = a;
                    i.attr("data-pause-hide", !1);
                    var s = i.data("hide-delay");
                    i.data("bar-placement"), i.data("homepage-limit");
                    "desktop" == n && r <= StyleHatch.largeMobile ? a.promoSlideUp() : "mobile" == n && r > StyleHatch.largeMobile && a.promoSlideUp(), "no-delay" !== s && p.hideTimers.push(setTimeout(function() {
                        i.data("pause-hide") || i.promoSlideUp()
                    }, s));
                    break;
                case "popup":
                    a.hideMockPopup();
                    break;
                case "signup-bar":
                    "desktop" == n && r <= StyleHatch.largeMobile && (a.hidePopup(), StyleHatch.refreshFixTo()), "mobile" == n && r > StyleHatch.largeMobile && (a.hidePopup(), StyleHatch.refreshFixTo())
            }
            StyleHatch.Header.rebuildFixTo()
        }

        function d() {
            if ("undefined" != typeof p.hideTimers && p.hideTimers instanceof Array) {
                for (var t = 0; t < p.hideTimers.length; t++) clearTimeout(p.hideTimers[t]);
                p.hideTimers.length = 0
            } else p.hideTimers = [];
            n(), StyleHatch.refreshFixTo(), h.$bottomContainer.remove(), e.magnificPopup.close()
        }
        var u = {
                body: "body",
                page: "#page",
                promos: "#shopify-section-promos",
                promoBar: "header.promo-bar",
                bottomContainer: ".promo-bar-container.bottom",
                popup: ".promo-popup"
            },
            p = {};
        p = {
            scrollLock: !1,
            fixToZIndex: 992,
            hideTimers: [],
            slideSpeed: 400
        };
        var h = {};
        return e.fn.extend({
            showPopup: function(t) {
                var a = e(this),
                    o = !0,
                    n = (a.data("show-delay"), a.data("show-again-delay")),
                    r = a.data("homepage-limit"),
                    i = a.data("visitor-limit"),
                    s = a.data("visitor"),
                    l = (a.data("show-for"), a.data("type")),
                    c = a.data("id");
                1 == i && 0 == s && (o = !1);
                var d = "popup-" + c;
                e.cookie(d) && (o = !1), r && !h.$body.hasClass("template-index") && (o = !1), window.self !== window.top && "popup" == l && (o = !1), t && (o = !0);
                var u = a.find(".errors"),
                    p = getQueryString("contact%5Btags%5D");
                if (u.length && p.includes("popup") && (o = !0, a.find("input#email").addClass("errors")), u.length && p.includes("signup-bar") && (o = !0), Modernizr.touchevents && a.find("form").removeAttr("target"), o) {
                    "popup" == l && e.magnificPopup.open({
                        items: {
                            src: a,
                            type: "inline",
                            showCloseBtn: !1
                        },
                        mainClass: "mfp-slideup",
                        removalDelay: 300,
                        callbacks: {
                            close: function() {
                                e.cookie(d, "shown", {
                                    expires: n,
                                    path: "/"
                                })
                            }
                        }
                    }), "signup-bar" == l && (t ? a.addClass("visible force") : a.addClass("visible"));
                    var f = a.find(".icon-text");
                    f.on("click", function(e) {
                        a.hidePopup(), e.preventDefault()
                    });
                    var y = a.find("form");
                    y.on("submit", function(t) {
                        return !!t.target.checkValidity() && (a.hidePopup(), void e(this).submit())
                    })
                }
            },
            hidePopup: function() {
                var t = (e("#shopify-section-promos"), e(this)),
                    a = t.data("type"),
                    o = t.data("id");
                if ("popup" == a && e.magnificPopup.close(), "signup-bar" == a) {
                    var n = "popup-" + o;
                    e.cookie(n, "shown", {
                        expires: 60,
                        path: "/"
                    }), e(".promo-bar.signup-bar").each(function(t) {
                        e(this).slideUp({
                            duration: 400,
                            progress: function() {
                                StyleHatch.refreshFixTo()
                            },
                            complete: function() {
                                StyleHatch.refreshFixTo(), e(this).removeClass("visible force")
                            }
                        })
                    })
                }
            },
            promoSlideUp: function() {
                e(this).slideUp({
                    duration: p.slideSpeed,
                    progress: StyleHatch.refreshFixTo,
                    complete: StyleHatch.refreshFixTo
                })
            },
            promoSlideDown: function() {
                e(this).slideDown({
                    duration: p.slideSpeed,
                    progress: StyleHatch.refreshFixTo,
                    complete: StyleHatch.refreshFixTo
                })
            },
            showMockPopup: function() {
                var t = e("#shopify-section-promos");
                e(".mock-popup-container").length || t.find(">*:first").append('<div class="mock-popup-container"></div>');
                var a = e(".mock-popup-container"),
                    o = e(this);
                o.appendTo(a), a.show(), o.show()
            },
            hideMockPopup: function() {
                var t = e(".mock-popup-container"),
                    a = e(this);
                t.hide(), a.hide()
            }
        }), {
            init: t,
            unload: d,
            blockSelect: l,
            blockDeselect: c,
            refreshFixTo: r
        }
    }(), StyleHatch.HeaderSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            StyleHatch.Header.init()
        }
        return t
    }(), StyleHatch.HeaderSection.prototype = e.extend({}, StyleHatch.HeaderSection.prototype, {
        onUnload: function() {
            StyleHatch.Header.unload()
        }
    }), StyleHatch.Header = function() {
        function t() {
            a(), o(), c(), u(), m(), b()
        }

        function a() {
            k = {
                $htmlBody: e(T.htmlBody),
                $body: e(T.body),
                $page: e(T.page),
                $section: e(T.section),
                $promosSection: e(T.promosSection),
                $util: e(T.util),
                $header: e(T.header),
                $siteNav: e(T.siteNav),
                $dropdownParent: e(T.siteNav).find("li.has-dropdown"),
                $defaultLink: e(T.siteNav).find("> li:not(.has-dropdown)"),
                $subMenuLinks: e(T.siteNav).find("li.has-dropdown a"),
                $subDropdownParent: e(T.siteNav).find("li.has-sub-dropdown"),
                $search: e(T.util).find(".search-wrapper"),
                $searchLink: e(T.util).find("a.search"),
                $searchClose: e(T.util).find("form.search-bar button"),
                $searchInput: e(T.util).find("form.search-bar input"),
                $menuLink: e(T.menuLink),
                $menuPanel: e(T.menuPanel),
                $menuPanelDropdown: e(T.menuPanel).find("li.has-dropdown"),
                $menuPanelSubDropdown: e(T.menuPanel).find("li.has-sub-dropdown")
            }
        }

        function o() {
            e(T.menuOverlay).length || (k.$section.append('<div class="mobile-menu-overlay"></div>'), k.$menuOverlay = e(T.menuOverlay))
        }

        function n() {
            k.$search.slideDown({
                duration: C.slideSpeed,
                progress: function() {
                    StyleHatch.refreshFixTo()
                },
                complete: function() {
                    StyleHatch.refreshFixTo()
                }
            }), k.$searchInput.focus()
        }

        function r() {
            k.$searchInput.blur(), clearTimeout(C.blurTimer), k.$search.slideUp({
                duration: C.slideSpeed,
                progress: function() {
                    StyleHatch.refreshFixTo()
                },
                complete: function() {
                    StyleHatch.refreshFixTo()
                }
            })
        }

        function i() {
            k.$body.hasClass("panel-open") ? l() : s()
        }

        function s() {
            k.$htmlBody.addClass("panel-open"), window.scrollTo(0, 0), k.$menuPanel.attr("tabindex", "0"), k.$menuPanel.focus()
        }

        function l() {
            k.$htmlBody.addClass("panel-open-transition"), k.$htmlBody.removeClass("panel-open"), k.$menuPanel.removeAttr("tabindex"), setTimeout(function() {
                k.$htmlBody.removeClass("panel-open-transition")
            }, 400)
        }

        function c() {
            k.$searchLink.on("click.search", function(e) {
                n(), e.preventDefault()
            }), k.$searchClose.on("click.search", function(e) {
                r(), e.preventDefault()
            }), k.$searchInput.on("blur.search", function(e) {
                C.blurTimer = setTimeout(r, C.blurTime), e.preventDefault()
            }), k.$menuLink.on("click.panel", function(e) {
                i(), e.preventDefault()
            }), k.$menuOverlay.on("click.panel", function(e) {
                i(), e.preventDefault()
            }), k.$menuPanelDropdown.on("click.panelDropdown", function(t) {
                k.$menuPanelDropdown.find("ul.dropdown").slideUp(), k.$menuPanelDropdown.find("> a").attr("aria-expanded", "false"), k.$menuPanelDropdown.removeClass("expanded"), k.$menuPanelDropdown.find("ul.dropdown").attr("aria-hidden", "true"), k.$menuPanelDropdown.find("ul.dropdown a").attr("tabindex", "-1"), e(this).find("ul.dropdown").is(":visible") || (e(this).find("> a").attr("aria-expanded", "true"), e(this).find("ul.dropdown").slideDown(), e(this).find("ul.dropdown").attr("aria-hidden", "false"), e(this).find("ul.dropdown > li > a").attr("tabindex", "0"), e(this).addClass("expanded"))
            }), k.$menuPanelDropdown.find("> a").on("click.panelDropdown", function(t) {
                e(this).closest("li").hasClass("expanded") || t.preventDefault()
            }), k.$menuPanelDropdown.find("ul.dropdown li:not(.has-sub-dropdown) a").on("click.panelDropdown", function(e) {
                e.stopPropagation()
            }), k.$menuPanelSubDropdown.on("click.panelDropdown", function(t) {
                t.stopPropagation(), k.$menuPanelSubDropdown.find("ul.sub-dropdown").slideUp(), k.$menuPanelDropdown.find("> a").attr("aria-expanded", "false"), k.$menuPanelSubDropdown.removeClass("expanded"), k.$menuPanelDropdown.find("ul.sub-dropdown").attr("aria-hidden", "true"), k.$menuPanelDropdown.find("ul.sub-dropdown a").attr("tabindex", "-1"), e(this).find("ul.sub-dropdown").is(":visible") || (e(this).find("> a").attr("aria-expanded", "true"), e(this).find("ul.sub-dropdown").slideDown(), e(this).find("ul.sub-dropdown").attr("aria-hidden", "false"), e(this).find("ul.sub-dropdown > li > a").attr("tabindex", "0"), e(this).addClass("expanded"))
            }), k.$menuPanelSubDropdown.find("> a").on("click.panelDropdown", function(t) {
                e(this).closest("li").hasClass("expanded") || t.preventDefault()
            }), k.$menuPanelSubDropdown.find("ul.sub-dropdown a").on("click.panelDropdown", function(e) {
                e.stopPropagation()
            }), k.$promosSection.resize(StyleHatch.refreshFixTo)
        }

        function d() {
            clearTimeout(C.blurTimer), k.$searchLink.off("click.search"), k.$searchClose.off("click.search"), k.$searchInput.off("blur.search"), k.$menuLink.off("click.panel"), k.$menuPanelDropdown.off("click.panelDropdown"), k.$menuPanelDropdown.find("> a").off("click.panelDropdown"), k.$menuPanelDropdown.find("ul.dropdown li:not(.has-sub-dropdown) a").off("click.panelDropdown"), k.$menuPanelSubDropdown.off("click.panelDropdown"), k.$menuPanelSubDropdown.find("> a").off("click.panelDropdown"), k.$menuPanelSubDropdown.find("ul.sub-dropdown a").off("click.panelDropdown"), k.$promosSection.removeResize(StyleHatch.refreshFixTo)
        }

        function u() {
            k.$subMenuLinks.each(function() {
                var t = e(this),
                    a = t.text();
                wordWrapper(a, 24, "<br/>\n")
            }), h(k.$dropdownParent)
        }

        function p(t) {
            h(e("." + C.dropdownActiveClass)), t.addClass(C.dropdownActiveClass), t.find("> a").attr("aria-expanded", "true"), t.find("ul.dropdown").attr("aria-hidden", "false"), t.find("ul.dropdown > li > a").attr("tabindex", "0");
            var a = t.find("ul.dropdown");
            a.hasClass("dropdown--mega-menu") || a.css({
                left: "auto"
            });
            var o = a.offset().left + a.outerWidth(),
                n = e(window).width() - 20,
                r = k.$header.width(),
                i = k.$header.find(".logo-nav-contain").offset().left;
            if (r + 40 > e(window).width() && (r = e(window).width(), i = -20), n = r + i + 1, o > n && !a.hasClass("dropdown--mega-menu")) {
                var s = "-" + (o - n) + "px";
                a.css({
                    left: s
                })
            }
            setTimeout(function() {
                k.$body.on("touchstart", function() {
                    h(t)
                })
            }, 250)
        }

        function h(e) {
            e.removeClass(C.dropdownActiveClass), k.$body.off("touchstart"), e.find("> a").attr("aria-expanded", "false"), e.find("ul.dropdown").attr("aria-hidden", "true"), e.find("ul.dropdown > li > a").attr("tabindex", "-1")
        }

        function f(t) {
            h(e("." + C.subDropdownActiveClass)), t.addClass(C.subDropdownActiveClass), t.find("> a").attr("aria-expanded", "true"), t.find("ul.sub-dropdown").attr("aria-hidden", "false"), t.find("ul.sub-dropdown > li > a").attr("tabindex", "0");
            var a = t.find(".sub-dropdown").offset().left + t.find(".sub-dropdown").width(),
                o = e(window).width();
            a > o ? t.addClass("alternate-align") : t.removeClass("alternate-align")
        }

        function y(e) {
            e.removeClass(C.subDropdownActiveClass), e.removeClass("alternate-align"), e.find("> a").attr("aria-expanded", "false"), e.find("ul.sub-dropdown").attr("aria-hidden", "true"), e.find("ul.sub-dropdown > li > a").attr("tabindex", "-1")
        }

        function m() {
            k.$dropdownParent.on("mouseenter.dropdown touchstart.dropdown focusin.dropdown", function(t) {
                var a = e(this);
                a.hasClass(C.dropdownActiveClass) || (t.preventDefault(), p(a))
            }), k.$dropdownParent.on("mouseleave.dropdown", function() {
                h(e(this))
            }), k.$subMenuLinks.on("touchstart.dropdown", function(e) {
                e.stopImmediatePropagation()
            }), k.$subDropdownParent.on("mouseenter.subdropdown touchstart.subdropdown focusin.subdropdown", function(t) {
                var a = e(this);
                a.hasClass(C.subDropdownActiveClass) || (t.preventDefault(), f(a))
            }), k.$subDropdownParent.on("mouseleave.subdropdown", function() {
                y(e(this))
            }), k.$subDropdownParent.on("touchstart.subdropdown", function(e) {
                e.stopImmediatePropagation()
            }), e("html").hasClass("touchevents") && k.$subDropdownParent.children("a").on("click", function(t) {
                var a = e(this);
                a.hasClass(C.subDropdownActiveClass) || (t.preventDefault(), f(a))
            }), k.$subMenuLinks.on("focusout.dropdown", function(t) {
                null == t.relatedTarget ? h(e("." + C.dropdownActiveClass)) : (e(t.target).closest("li.has-dropdown")[0] !== e(t.relatedTarget).closest("li.has-dropdown")[0] && h(e("." + C.dropdownActiveClass)), e(t.target).closest("li.has-sub-dropdown")[0] !== e(t.relatedTarget).closest("li.has-sub-dropdown")[0] && y(e("." + C.subDropdownActiveClass)))
            })
        }

        function v() {
            k.$dropdownParent.off("mouseenter.dropdown touchstart.dropdown focusin.dropdown"), k.$dropdownParent.off("mouseleave.dropdown"), k.$subMenuLinks.off("touchstart.dropdown"), k.$subDropdownParent.off("mouseenter.subdropdown touchstart.subdropdown focusin.subdropdown"), k.$subDropdownParent.off("mouseleave.subdropdown"), k.$subDropdownParent.off("touchstart.subdropdown"), k.$subMenuLinks.off("focusout.dropdown")
        }

        function g() {
            var t = k.$section,
                a = k.$promosSection,
                o = k.$header,
                n = k.$util,
                r = o.data("scroll-lock");
            if ("util" == r || "header" == r) {
                var i = "";
                a.data("fixtoInstance") && (i = "#shopify-section-promos"), n.fixTo("#page", {
                    zIndex: 991,
                    mind: i
                })
            }
            if ("header" == r) {
                var i = "header.util";
                a.data("fixtoInstance") && (i = "header.util, #shopify-section-promos"), t.fixTo("#page", {
                    zIndex: 990,
                    mind: i
                }), t.resize(function() {
                    e(this).width() <= 700 ? t.fixTo("stop") : t.fixTo("start")
                })
            }
        }

        function S() {
            var t = e("header.util, #shopify-section-header").filter(function() {
                return e(this).data("fixtoInstance")
            });
            t.length && t.fixTo("destroy")
        }

        function b() {
            a(), S(), g()
        }

        function w() {
            l(), d(), v(), S()
        }
        var T = {
                htmlBody: "html, body",
                body: "body",
                page: "#page",
                section: "#shopify-section-header",
                promosSection: "#shopify-section-promos",
                util: "header.util",
                header: "header.site-header",
                siteNav: "header.site-header ul.site-nav",
                menuLink: ".menu-link",
                menuPanel: "#menu.panel",
                menuOverlay: ".mobile-menu-overlay"
            },
            C = {};
        C = {
            blurTimer: {},
            blurTime: 2e3,
            slideSpeed: 300,
            dropdownActiveClass: "dropdown-hover",
            subDropdownActiveClass: "sub-dropdown-hover"
        };
        var k = {};
        return {
            init: t,
            unload: w,
            openSearch: n,
            closeSearch: r,
            togglePanelMenu: i,
            openPanelMenu: s,
            closePanelMenu: l,
            rebuildFixTo: b
        }
    }(), StyleHatch.FooterSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            StyleHatch.Footer.init(a)
        }
        return t
    }(), StyleHatch.FooterSection.prototype = e.extend({}, StyleHatch.FooterSection.prototype, {
        onUnload: function(e) {
            StyleHatch.Footer.unload(e)
        }
    }), StyleHatch.Footer = function() {
        function e(e) {
            var t = e.find("ul.nested-menu");
            t.initNestedMenu()
        }

        function t(e) {
            $nestedMenu.destroyNestedMenu()
        }
        return {
            init: e,
            unload: t
        }
    }(), StyleHatch.SlideshowSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            StyleHatch.Slideshow.init(a)
        }
        return t
    }(), StyleHatch.SlideshowSection.prototype = e.extend({}, StyleHatch.SlideshowSection.prototype, {
        onUnload: function(e) {
            StyleHatch.Slideshow.unload(e)
        },
        onBlockSelect: function(e) {
            StyleHatch.Slideshow.blockSelect(e)
        },
        onBlockDeselect: function(e) {
            StyleHatch.Slideshow.blockDeselect(e)
        }
    }), StyleHatch.Slideshow = function() {
        function t(t) {
            var a = t.find(".slideshow-carousel"),
                o = 700,
                n = a.find(".slide__item");
            e(window).on("resize", function() {
                n.each(function(t) {
                    var a;
                    e(window).width() > o ? a = e(this).find("img.slide__image-desktop") : (a = e(this).find("img.slide__image-mobile"), a.length < 1 && (a = e(this).find("img.slide__image-desktop"))), a.hasClass("lazymanual") && (a.attr("src", a.attr("data-preload")).removeAttr("data-preload"), a.removeClass("lazymanual").addClass("lazyload"))
                })
            });
            var r = a.data("flickity-options");
            a.flickity(r), a.parent().find(".flickity-page-dots.placeholder").remove();
            var i;
            e(window).width() > o ? i = e("img.slide__image-desktop", t) : (i = e("img.slide__image-mobile", t), i.length < 1 && (i = e("img.slide__image-desktop", t))), i.eq(0).removeClass("lazymanual").addClass("lazyload"), a.on("change.flickity", function(o, n) {
                var r = e("img.lazymanual", t);
                r.removeClass("lazymanual").addClass("lazyload"), a.off("change.flickity")
            });
            var s = t.find(".slide__item-video");
            s.each(function() {
                var t = e(this).find(".slide__item-image"),
                    a = e(this).data("video-id"),
                    o = e(this).data("mobile-autoplay"),
                    n = 0;
                o && (n = 1), (e(window).width() > StyleHatch.largeMobile || o) && t.YTPlayer({
                    fitToBackground: !1,
                    videoId: a,
                    repeat: !0,
                    mute: !0,
                    playerVars: {
                        rel: 0,
                        mute: 1,
                        playsinline: n,
                        autoplay: 1
                    },
                    callback: function() {
                        e(window).trigger("resize")
                    }
                })
            })
        }

        function a(t) {
            var a = e("#block-" + t.detail.blockId),
                o = a.closest(".slideshow-carousel"),
                n = a.data("slide-index");
            o.flickity("pausePlayer"), o.flickity("select", n, !0, !0), o.find("img").removeClass(".lazymanual").addClass("lazyload")
        }

        function o(t) {
            var a = e("#block-" + t.detail.blockId),
                o = a.closest(".slideshow-carousel");
            o.flickity("unpausePlayer")
        }

        function n(t) {
            var a = e(".slideshow-" + t.detail.sectionId),
                o = a.find(".slideshow-carousel");
            o.flickity("destroy");
            var n = a.find(".slide__item-video .slide__item-image");
            n.removeData("yt-init").removeData("ytPlayer").removeClass("loaded"), e(window).off("resize.YTplayer" + n.ID), e(window).off("scroll.YTplayer" + n.ID), n.$body = null, n.$node = null, n.$YTPlayerString = null, n.player = null
        }
        return {
            init: t,
            unload: n,
            blockSelect: a,
            blockDeselect: o
        }
    }(), StyleHatch.HeroVideoSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            StyleHatch.HeroVideo.init(a)
        }
        return t
    }(), StyleHatch.HeroVideoSection.prototype = e.extend({}, StyleHatch.HeroVideoSection.prototype, {
        onUnload: function(e) {
            StyleHatch.HeroVideo.unload(e)
        }
    }), StyleHatch.HeroVideo = function() {
        function t(e) {
            var t = e.find(".wrapper"),
                a = e.data("video-id"),
                o = e.data("mobile-autoplay"),
                n = 0;
            o && (n = 1), t.removeData("ytPlayer"), t.YTPlayer({
                fitToBackground: !1,
                videoId: a,
                repeat: !0,
                mute: !0,
                playerVars: {
                    rel: 0,
                    mute: 1,
                    playsinline: n,
                    autoplay: 1
                }
            })
        }

        function a(t) {
            var a = e(".slideshow-" + t.detail.sectionId),
                o = a.find(".wrapper");
            o.removeData("yt-init").removeData("ytPlayer").removeClass("loaded"), o.find(".ytplayer-container .ytplayer-shield").remove()
        }
        return {
            init: t,
            unload: a
        }
    }(), StyleHatch.Maps = function() {
        function t(t) {
            if (this.$container = e(t), this.$map = this.$container.find(u.map), this.key = this.$map.data("api-key"), this.key != i && (i = this.key, r = null, s = !0), "undefined" != typeof this.key)
                if ("loaded" === r) this.createMap();
                else {
                    l.push(this);
                    var o = this;
                    "loading" !== r && (r = "loading", ("undefined" == typeof window.google || s) && e.getScript("https://maps.googleapis.com/maps/api/js?key=" + this.key).then(function() {
                        r = "loaded", s = !1, a(o)
                    }))
                }
        }

        function a(t) {
            document.addEventListener("lazybeforeunveil", function(a) {
                e(a.target).attr("data-section-type") && t.createMap()
            }), e.each(l, function(e, a) {
                a.$container.hasClass("lazyloaded") && t.createMap()
            })
        }

        function o(t) {
            var a = e.Deferred(),
                o = new google.maps.Geocoder,
                n = t.data("address-setting");
            return o.geocode({
                address: n
            }, function(e, t) {
                t !== google.maps.GeocoderStatus.OK && a.reject(t), a.resolve(e)
            }), a
        }
        var n = {
                zoom: 14
            },
            r = null,
            i = null,
            s = !1,
            l = [],
            c = {
                standard: [],
                silver: [{
                    elementType: "geometry",
                    stylers: [{
                        color: "#f5f5f5"
                    }]
                }, {
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#616161"
                    }]
                }, {
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#f5f5f5"
                    }]
                }, {
                    featureType: "administrative.land_parcel",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#bdbdbd"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{
                        color: "#eeeeee"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#757575"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{
                        color: "#e5e5e5"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#9e9e9e"
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{
                        color: "#ffffff"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#757575"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{
                        color: "#dadada"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#616161"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#9e9e9e"
                    }]
                }, {
                    featureType: "transit.line",
                    elementType: "geometry",
                    stylers: [{
                        color: "#e5e5e5"
                    }]
                }, {
                    featureType: "transit.station",
                    elementType: "geometry",
                    stylers: [{
                        color: "#eeeeee"
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        color: "#c9c9c9"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#9e9e9e"
                    }]
                }],
                retro: [{
                    elementType: "geometry",
                    stylers: [{
                        color: "#ebe3cd"
                    }]
                }, {
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#523735"
                    }]
                }, {
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#f5f1e6"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#c9b2a6"
                    }]
                }, {
                    featureType: "administrative.land_parcel",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#dcd2be"
                    }]
                }, {
                    featureType: "administrative.land_parcel",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#ae9e90"
                    }]
                }, {
                    featureType: "landscape.natural",
                    elementType: "geometry",
                    stylers: [{
                        color: "#dfd2ae"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{
                        color: "#dfd2ae"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#93817c"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#a5b076"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#447530"
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{
                        color: "#f5f1e6"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{
                        color: "#fdfcf8"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{
                        color: "#f8c967"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#e9bc62"
                    }]
                }, {
                    featureType: "road.highway.controlled_access",
                    elementType: "geometry",
                    stylers: [{
                        color: "#e98d58"
                    }]
                }, {
                    featureType: "road.highway.controlled_access",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#db8555"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#806b63"
                    }]
                }, {
                    featureType: "transit.line",
                    elementType: "geometry",
                    stylers: [{
                        color: "#dfd2ae"
                    }]
                }, {
                    featureType: "transit.line",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#8f7d77"
                    }]
                }, {
                    featureType: "transit.line",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#ebe3cd"
                    }]
                }, {
                    featureType: "transit.station",
                    elementType: "geometry",
                    stylers: [{
                        color: "#dfd2ae"
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#b9d3c2"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#92998d"
                    }]
                }],
                dark: [{
                    elementType: "geometry",
                    stylers: [{
                        color: "#212121"
                    }]
                }, {
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#757575"
                    }]
                }, {
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#212121"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [{
                        color: "#757575"
                    }]
                }, {
                    featureType: "administrative.country",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#9e9e9e"
                    }]
                }, {
                    featureType: "administrative.land_parcel",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#bdbdbd"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#757575"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{
                        color: "#181818"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#616161"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#1b1b1b"
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#2c2c2c"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#8a8a8a"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{
                        color: "#373737"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{
                        color: "#3c3c3c"
                    }]
                }, {
                    featureType: "road.highway.controlled_access",
                    elementType: "geometry",
                    stylers: [{
                        color: "#4e4e4e"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#616161"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#757575"
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#3d3d3d"
                    }]
                }],
                night: [{
                    elementType: "geometry",
                    stylers: [{
                        color: "#242f3e"
                    }]
                }, {
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#746855"
                    }]
                }, {
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#242f3e"
                    }]
                }, {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#d59563"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#d59563"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{
                        color: "#263c3f"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#6b9a76"
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{
                        color: "#38414e"
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#212a37"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#9ca5b3"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{
                        color: "#746855"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#1f2835"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#f3d19c"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{
                        color: "#2f3948"
                    }]
                }, {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#d59563"
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        color: "#17263c"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#515c6d"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#17263c"
                    }]
                }],
                aubergine: [{
                    elementType: "geometry",
                    stylers: [{
                        color: "#1d2c4d"
                    }]
                }, {
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#8ec3b9"
                    }]
                }, {
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#1a3646"
                    }]
                }, {
                    featureType: "administrative.country",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#4b6878"
                    }]
                }, {
                    featureType: "administrative.land_parcel",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#64779e"
                    }]
                }, {
                    featureType: "administrative.province",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#4b6878"
                    }]
                }, {
                    featureType: "landscape.man_made",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#334e87"
                    }]
                }, {
                    featureType: "landscape.natural",
                    elementType: "geometry",
                    stylers: [{
                        color: "#023e58"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{
                        color: "#283d6a"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#6f9ba5"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#1d2c4d"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#023e58"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#3C7680"
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{
                        color: "#304a7d"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#98a5be"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#1d2c4d"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{
                        color: "#2c6675"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#255763"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#b0d5ce"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#023e58"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#98a5be"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#1d2c4d"
                    }]
                }, {
                    featureType: "transit.line",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#283d6a"
                    }]
                }, {
                    featureType: "transit.station",
                    elementType: "geometry",
                    stylers: [{
                        color: "#3a4762"
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        color: "#0e1626"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#4e6d70"
                    }]
                }]
            },
            d = {
                addressNoResults: StyleHatch.Strings.addressNoResults,
                addressQueryLimit: StyleHatch.Strings.addressQueryLimit,
                addressError: StyleHatch.Strings.addressError,
                authError: StyleHatch.Strings.authError
            },
            u = {
                section: '[data-section-type="maps"]',
                map: "[data-map]",
                mapOverlay: "[data-map-overlay]"
            },
            p = {
                mapError: "map-selection--load-error",
                errorMsg: "map-section__errors errors text-center"
            };
        return window.gm_authFailure = function() {
            return Shopify.designMode ? (e(u.section).addClass(p.mapError), e(u.map).remove(), void e(u.mapOverlay).after('<div class="' + p.errorMsg + '">' + StyleHatch.Strings.authError + "</div>")) : void log("Google Maps authentication error", window.google, r)
        }, t.prototype = e.extend({}, t.prototype, {
            createMap: function() {
                var e = this.$map,
                    t = e.data("map-style");
                return o(e).then(function(a) {
                    var o = {
                            zoom: n.zoom,
                            center: a[0].geometry.location,
                            draggable: !1,
                            clickableIcons: !1,
                            scrollwheel: !1,
                            disableDoubleClickZoom: !0,
                            disableDefaultUI: !0,
                            styles: c[t]
                        },
                        r = this.map = new google.maps.Map(e[0], o),
                        i = this.center = r.getCenter();
                    new google.maps.Marker({
                        map: r,
                        position: r.getCenter()
                    });
                    google.maps.event.addDomListener(window, "resize", slate.utils.debounce(function() {
                        google.maps.event.trigger(r, "resize"), r.setCenter(i), e.removeAttr("style")
                    }, 250))
                }.bind(this)).fail(function() {
                    var t;
                    switch (status) {
                        case "ZERO_RESULTS":
                            t = d.addressNoResults;
                            break;
                        case "OVER_QUERY_LIMIT":
                            t = d.addresQueryLimit;
                            break;
                        case "REQUEST_DENIED":
                            t = d.authError;
                            break;
                        default:
                            t = d.addressError
                    }
                    Shopify.designMode && e.parent().addClass(p.mapError).append('<div class="' + p.errorMsg + '">' + t + "</div>")
                })
            },
            onUnload: function() {
                0 !== this.$map.length && google.maps.event.clearListeners(this.map, "resize")
            }
        }), t
    }(), StyleHatch.PageSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            StyleHatch.Page.init(a)
        }
        return t
    }(), StyleHatch.Page = function() {
        function e(e) {
            e.fitVids()
        }

        function t(e) {}
        return {
            init: e,
            unload: t
        }
    }(), StyleHatch.FeaturedCollectionSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            a.productBox(), StyleHatch.currencyConverter && StyleHatch.CurrencyConverter.init()
        }
        return t
    }(), StyleHatch.FeaturedCollectionSection.prototype = e.extend({}, StyleHatch.FeaturedCollectionSection.prototype, {
        onUnload: function(t) {
            var a = e("#section-" + t.detail.sectionId);
            a.attr("data-section-id");
            a.destroyProductBox()
        }
    }), StyleHatch.SimpleCollectionSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            a.productBox(), StyleHatch.currencyConverter && StyleHatch.CurrencyConverter.init()
        }
        return t
    }(), StyleHatch.SimpleCollectionSection.prototype = e.extend({}, StyleHatch.SimpleCollectionSection.prototype, {
        onUnload: function(t) {
            var a = e("#section-" + t.detail.sectionId);
            a.attr("data-section-id");
            a.destroyProductBox()
        }
    }), StyleHatch.instagrams = {}, StyleHatch.InstagramSection = function() {
        function t(t) {
            var a = this.$container = e(t),
                o = a.attr("data-section-id"),
                n = this.instagram = "#Instagram-" + o;
            if (e("html").hasClass("lt-ie9")) return !1;
            var r = a.find(".instagram-container"),
                i = a.find("header a.button, footer a.button"),
                s = a.data("image-count"),
                l = a.data("instagram-access-token"),
                c = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + l + "&count=20",
                d = 432e5,
                u = StyleHatch.Strings.instagramAddToken,
                p = StyleHatch.Strings.instagramInvalidToken,
                h = StyleHatch.Strings.instagramRateLimitToken,
                f = function() {
                    l ? e.ajax({
                        url: c,
                        dataType: "jsonp",
                        timeout: 5e3,
                        success: function(e) {
                            switch (e.meta.code) {
                                case 400:
                                    Shopify.designMode && (r.attr("data-helper-text", p), storeWithExpiration.set(l, e, d), a.show());
                                    break;
                                case 429:
                                    Shopify.designMode && (r.attr("data-helper-text", h), a.show());
                                    break;
                                default:
                                    y(e), storeWithExpiration.set(l, e, d)
                            }
                        }
                    }) : Shopify.designMode && (r.attr("data-helper-text", u), a.show())
                },
                y = function(t) {
                    if (t.data) {
                        if (t.data.length < s) {
                            var o = t.data.length,
                                n = s,
                                l = n - (n - o);
                            s = t.data.length, a.find(".box").each(function(t) {
                                t >= l && e(this).hide()
                            })
                        }
                        for (var c = 0; c < s; c++) {
                            var d = t.data[c].images,
                                u = d.thumbnail.url,
                                p = d.thumbnail.width,
                                h = d.low_resolution.url,
                                f = d.low_resolution.width,
                                y = d.standard_resolution.url,
                                m = d.standard_resolution.width,
                                v = t.data[c].link,
                                g = t.data[c].likes.count,
                                S = t.data[c].comments.count,
                                b = "";
                            t.data[c].caption && (b = t.data[c].caption.text);
                            var w = a.find(".box-" + c),
                                T = w.find("figure > a"),
                                C = w.find("figure > a, li > a"),
                                k = w.find("figcaption > p"),
                                x = w.find("a.likes span.label"),
                                H = w.find("a.comments span.label");
                            T.html('<div class="card__image lazyload">');
                            var $ = T.find(".card__image");
                            $.attr("data-sizes", "auto"), $.attr("data-bgset", u + " " + p + "w, " + h + " " + f + "w, " + y + " " + m + "w"), C.attr("href", v), k.html(b), x.text(g), H.text(S)
                        }
                        var _ = "https://www.instagram.com/" + t.data[0].user.username;
                        i.attr("href", _), i.attr("target", "_blank"), a.show(), r.addClass("loaded")
                    }
                };
            if (storeWithExpiration.get(l) && !Shopify.designMode) {
                var m = storeWithExpiration.get(l);
                y(m)
            } else f();
            StyleHatch.instagrams[n] = this
        }
        return t
    }(), StyleHatch.InstagramSection.prototype = e.extend({}, StyleHatch.InstagramSection.prototype, {
        onUnload: function() {
            delete StyleHatch.instagrams[this.instagram]
        }
    }), StyleHatch.GenericSection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            StyleHatch.cacheSelectors()
        }
        return t
    }(), StyleHatch.Product = function() {
        function t(t) {
            var a = this.$container = e(t),
                o = a.attr("data-section-id");
            this.settings = {
                enableHistoryState: a.data("enable-history-state") || !1,
                enableSwatch: a.data("enable-swatch") || !1,
                imageSize: "394x",
                imageZoomSize: null,
                namespace: ".product-" + o,
                sectionId: o,
                zoomEnabled: !1,
                lightboxEnabled: !1,
                productImageLightboxData: []
            }, this.selectors = {
                addToCartForm: "#AddToCartForm-" + o,
                addToCart: "#AddToCart-" + o,
                addToCartText: "#AddToCartText-" + o,
                comparePrice: "#ComparePrice-" + o,
                originalPrice: "#ProductPrice-" + o,
                SKU: ".variant-sku",
                originalSelectorId: "#ProductSelect-" + o,
                productFeaturedImage: "#FeaturedImage-" + o,
                productImageWrap: ".featured-container-" + o,
                productPrices: ".product-single__price-" + o,
                productThumbImages: ".product-single__thumbnail--" + o,
                productPhoto: "#ProductPhoto-" + o,
                productImage: "#ProductImage-" + o,
                productThumbs: "#ProductThumbs-" + o,
                quantityWrap: ".quantity-" + o,
                quantity: ".quantity-select-" + o,
                cartError: ".cart-error-" + o,
                singleOptionSelector: ".single-option-selector-" + o,
                cartButtons: "#CartButtons-" + o,
                paymentButtonContainer: "#PaymentButtonContainer-" + o,
                productSizeGuideLink: "a.product-size-guide-" + o,
                productSizeGuideContent: "#product-size-guide-content-" + o
            }, this._initSlider(), e("#ProductJson-" + o).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + o).innerHTML), this.settings.zoomEnabled = e(this.selectors.productImageWrap).hasClass("featured-zoom"), Modernizr.objectfit && (this.settings.lightboxEnabled = e(this.selectors.productImageWrap).data("lightbox")), a.productBox(), StyleHatch.currencyConverter && StyleHatch.CurrencyConverter.init(), this._initVariants(), this._initQuanitySelect(), e(this.selectors.productSizeGuideLink).length && e(this.selectors.productSizeGuideLink).magnificPopup({
                items: {
                    src: e(this.selectors.productSizeGuideContent),
                    type: "inline"
                }
            }))
        }

        function a(e) {
            var t = e.easyZoom().data("easyZoom");
            t.teardown()
        }
        return t.prototype = e.extend({}, t.prototype, {
            _initVariants: function() {
                var e = {
                    $container: this.$container,
                    enableHistoryState: this.$container.data("enable-history-state") || !1,
                    enableSwatch: this.$container.data("enable-swatch"),
                    singleOptionSelector: this.selectors.singleOptionSelector,
                    originalSelectorId: this.selectors.originalSelectorId,
                    product: this.productSingleObject
                };
                this.optionsMap = {}, this.variants = new slate.Variants(e), e.enableSwatch && (this._linkOptionSelectors(this.productSingleObject), this.$container.on("variantSwatchChange" + this.settings.namespace, this._updateSwatches.bind(this))), this.$container.on("variantChange" + this.settings.namespace, this._updateAddToCart.bind(this)), this.$container.on("variantImageChange" + this.settings.namespace, this._updateImages.bind(this)), this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)), this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this));
                var t = this.variants.currentVariant;
                this.$container.trigger({
                    type: "variantChange" + this.settings.namespace,
                    variant: t
                })
            },
            _initQuanitySelect: function() {
                var t = e(this.selectors.quantity);
                t.each(function() {
                    var t = e(this),
                        a = t.find(".adjust-minus"),
                        o = t.find(".adjust-plus"),
                        n = t.find("input.quantity"),
                        r = n.val();
                    a.on("click", function(e) {
                        r = n.val(), r > 1 && (r--, n.val(r)), e.preventDefault()
                    }), o.on("click", function(e) {
                        r = n.val(), r++, n.val(r), e.preventDefault()
                    })
                })
            },
            _initSlider: function() {
                var t = this.$container.find(".product-image--slider");
                if (t.length) {
                    var a = t.data("flickity-options"),
                        o = t.data("slider-enabled"),
                        n = t.data("zoom"),
                        r = t.data("lightbox"),
                        i = t.find("[data-initial-image]"),
                        s = i.parent().find(".product-image--cell").index(i);
                    if (a.initialIndex = s, o || (a.draggable = !1, a.selectedAttraction = 1, a.friction = 1), i.removeAttr("data-initial-image"), t.flickity(a), t.parent().find(".flickity-page-dots.placeholder").remove(), !Modernizr.touchevents && n) {
                        e(".product-image--cell").easyZoom();
                        t.on("dragStart.flickity", function(t) {
                            var a = e(t.currentTarget).find(".easyzoom-flyout");
                            a.addClass("hidden")
                        }).on("dragEnd.flickity", function(t) {
                            var a = e(t.currentTarget).find(".easyzoom-flyout");
                            a.removeClass("hidden")
                        })
                    }
                    t.on("dragStart.flickity", function(e, t) {
                        document.ontouchmove = function(e) {
                            e.preventDefault()
                        }
                    }), t.on("dragEnd.flickity", function(e, t) {
                        document.ontouchmove = function(e) {
                            return !0
                        }
                    }), t.find("a").on("click", function(e) {
                        e.preventDefault()
                    }), r && Modernizr.objectfit && (t.on("staticClick.flickity", function() {
                        t.flickity("toggleFullscreen")
                    }), t.on("fullscreenChange.flickity", function(e, a) {
                        a ? t.parent().addClass("is-fullscreen") : t.parent().removeClass("is-fullscreen")
                    }))
                }
                var l = this.$container.find(".product-thumb--slider");
                if (l.length) {
                    var a = l.data("flickity-options"),
                        o = l.data("slider-enabled");
                    if (o) {
                        var i = l.find("[data-initial-image]"),
                            s = i.parent().find(".product-thumb--cell").index(i);
                        a.initialIndex = s, i.removeAttr("data-initial-image"), l.flickity(a), l.find("a").on("click", function(e) {
                            e.preventDefault()
                        }), l.on("dragStart.flickity", function(e, t) {
                            document.ontouchmove = function(e) {
                                e.preventDefault()
                            }
                        }), l.on("dragEnd.flickity", function(e, t) {
                            document.ontouchmove = function(e) {
                                return !0
                            }
                        })
                    } else {
                        var i = l.find("[data-initial-image]");
                        i.addClass("is-nav-selected"), i.removeAttr("data-initial-image"), l.find("a").on("click", function(a) {
                            var o = e(this),
                                n = o.parent(),
                                r = n.data("image-id"),
                                i = '[data-image-id="' + r + '"]';
                            t.flickity("selectCell", i, !1, !0), n.parent().find(".is-nav-selected").removeClass("is-nav-selected"), n.addClass("is-nav-selected"), a.preventDefault()
                        }), t.on("change.flickity", function(t, a) {
                            var o = e(this),
                                n = o.find(".product-image--cell").eq(a),
                                r = n.data("image-id");
                            l.find(".is-nav-selected").removeClass("is-nav-selected");
                            var i = l.find('[data-image-id="' + r + '"]');
                            i.addClass("is-nav-selected")
                        })
                    }
                    Modernizr.objectfit || l.find(".product-thumb--cell a").each(function() {
                        var t = e(this),
                            a = t.find("img").prop("src");
                        t.css({
                            "background-image": "url(" + a + ")"
                        }), t.addClass("fallback-object-fit")
                    })
                }
                var c = this.$container.find(".thumbnails");
                if (c.length && (c.find("a").on("click", function(a) {
                        var o = e(this),
                            n = o.data("image-id"),
                            r = '[data-image-id="' + n + '"]';
                        t.flickity("selectCell", r, !1, !0), o.parent().parent().find(".active").removeClass("active"), o.addClass("active"), a.preventDefault()
                    }), t.on("change.flickity", function(t, a) {
                        var o = e(this),
                            n = o.find(".product-image--cell").eq(a),
                            r = n.data("image-id");
                        c.find(".active").removeClass("active");
                        var i = c.find('[data-image-id="' + r + '"]');
                        i.addClass("active");
                        var s = c.find("[data-productthumbs]");
                        s.height() > c.height() && c.data("enable-group") && c.is(":visible") && setTimeout(function() {
                            i.scrollIntoView()
                        }, 200)
                    }), c.data("enable-group"))) {
                    c.css({
                        "overflow-y": "scroll",
                        position: "relative"
                    }), t.resize(function() {
                        c.height(e(this).find(".flickity-viewport").height())
                    });
                    var d = c.find("[data-productthumbs]");
                    setTimeout(function() {
                        d.height() > c.height() && c.find("a.active").scrollIntoView()
                    }, 200), c.find("li").each(function(t) {
                        e(this).delay(100 * t).fadeTo(200, 1)
                    })
                }
            },
            _linkOptionSelectors: function(t) {
                for (var a = 0; a < t.variants.length; a++) {
                    var o = t.variants[a];
                    if (o.available) {
                        if (this.optionsMap.root = this.optionsMap.root || [], this.optionsMap.root.push(o.option1), this.optionsMap.root = e.unique(this.optionsMap.root), t.options.length > 1) {
                            var n = o.option1;
                            this.optionsMap[n] = this.optionsMap[n] || [], this.optionsMap[n].push(o.option2), this.optionsMap[n] = e.unique(this.optionsMap[n])
                        }
                        if (3 === t.options.length) {
                            var n = o.option1 + " / " + o.option2;
                            this.optionsMap[n] = this.optionsMap[n] || [], this.optionsMap[n].push(o.option3), this.optionsMap[n] = e.unique(this.optionsMap[n])
                        }
                    }
                }
                this._updateOptionsInSelector(0), t.options.length > 1 && this._updateOptionsInSelector(1), 3 === t.options.length && this._updateOptionsInSelector(2)
            },
            _updateOptionsInSelector: function(t) {
                switch (t) {
                    case 0:
                        var a = "root",
                            o = e(".single-option-radio:eq(0)", this.selectors.addToCartForm);
                        break;
                    case 1:
                        var a = e("input:checked", this.selectors.addToCartForm + " .single-option-radio:eq(0)").val(),
                            o = e(".single-option-radio:eq(1)", this.selectors.addToCartForm);
                        break;
                    case 2:
                        var a = e("input:checked", this.selectors.addToCartForm + " .single-option-radio:eq(0)").val();
                        a += " / " + e("input:checked", this.selectors.addToCartForm + " .single-option-radio:eq(1)").val();
                        var o = e(".single-option-radio:eq(2)", this.selectors.addToCartForm)
                }
                var n = (e("input:checked", o).val(), this.optionsMap[a]),
                    r = t + 1;
                e('.radio-wrapper[data-option-index="' + r + '"] input.single-option-selector__radio', this.selectors.addToCartForm).each(function() {
                    e.inArray(e(this).val(), n) !== -1 ? e(this).parent().removeClass("soldout") : e(this).parent().addClass("soldout")
                });
                var i = e('.radio-wrapper[data-option-index="' + r + '"]', this.selectors.addToCartForm),
                    s = i.find("input:checked").parent();
                if (s.hasClass("soldout") && "true" == s.attr("data-variant-swatch-soldout")) {
                    var l = i.find(".swatch-container:not(.soldout)").eq(0);
                    l.length > 0 && l.find("input").trigger("click")
                }
            },
            _updateAddToCart: function(t) {
                var a = t.variant,
                    o = e(this.selectors.addToCartForm).data("dynamic-checkout");
                a ? (e(this.selectors.cartError).hide(), e(this.selectors.productPrices).removeClass("visibility-hidden").attr("aria-hidden", "true"), a.available ? (e(this.selectors.addToCart).removeClass("disabled").prop("disabled", !1), e(this.selectors.addToCartText).text(StyleHatch.Strings.addToCart), e(this.selectors.quantityWrap).show(), o && e(this.selectors.cartButtons).addClass("cart-buttons__enabled")) : (e(this.selectors.addToCart).addClass("disabled").prop("disabled", !0), e(this.selectors.addToCartText).text(StyleHatch.Strings.soldOut), e(this.selectors.quantityWrap).hide(), o && e(this.selectors.cartButtons).removeClass("cart-buttons__enabled"))) : (e(this.selectors.addToCart).addClass("disabled").prop("disabled", !0), e(this.selectors.addToCartText).text(StyleHatch.Strings.soldOut), e(this.selectors.productPrices).addClass("visibility-hidden").attr("aria-hidden", "false"), e(this.selectors.quantityWrap).hide(), o && e(this.selectors.cartButtons).removeClass("cart-buttons__enabled"))
            },
            _updateSwatches: function(t) {
                var a = t.variant,
                    o = (e(t.currentTarget).find("[type=radio]"), e(t.currentTarget).find(".radio-wrapper")),
                    n = this;
                this._updateOptionsInSelector(0), n.productSingleObject.options.length > 1 && this._updateOptionsInSelector(1), 3 === n.productSingleObject.options.length && this._updateOptionsInSelector(2), o.each(function() {
                    var t = e(this),
                        o = "option" + t.data("option-index"),
                        n = t.find(".single-option-radio__label--value");
                    if (n.length && a) {
                        var r = a[o];
                        n.text(r)
                    }
                })
            },
            _updateImages: function(t) {
                var a, o = t.variant;
                theme.Images.getSizedImageUrl(o.featured_image.src, this.settings.imageSize);
                this.settings.zoomEnabled && (a = theme.Images.getSizedImageUrl(o.featured_image.src, this.settings.imageZoomSize));
                var n = (e(this.selectors.productThumbImages + '[data-image-id="' + o.featured_image.id + '"]'), this.$container.find(".product-image--slider"));
                if (n.length) {
                    var r = '[data-image-id="' + o.featured_image.id + '"]';
                    n.flickity("selectCell", r, !1, !0)
                }
            },
            _updatePrice: function(t) {
                var a = t.variant;
                e(this.selectors.originalPrice).html(theme.Currency.formatMoney(a.price, StyleHatch.currencyFormat)), StyleHatch.currencyConverter && (removeDataAttributes(e(this.selectors.originalPrice)), Currency.convertAll(StyleHatch.shopCurrency, e("[name=currencies]").val()), e(".selected-currency").text(Currency.currentCurrency)), a.compare_at_price > a.price ? (e(this.selectors.comparePrice).find("span.money").html(theme.Currency.formatMoney(a.compare_at_price, StyleHatch.currencyFormat)), e(this.selectors.comparePrice).show()) : e(this.selectors.comparePrice).hide()
            },
            _updateSKU: function(t) {
                var a = t.variant;
                e(this.selectors.SKU).html(a.sku)
            },
            onUnload: function() {
                this.$container.off(this.settings.namespace), e.magnificPopup.close(), this.settings.zoomEnabled && a(e(this.selectors.productImageWrap)), StyleHatch.ajaxCartEnable && StyleHatch.AjaxCart.unload(), this.$container.destroyProductBox()
            }
        }), t
    }(), StyleHatch.Collection = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            this.$sortSelect = e(o.sortSelection, a), this.defaultSort = this._getDefaultSortValue(), this.$viewButton = e(o.viewChange), this.$sortSelect.on("change", this._onSortChange.bind(this)), this.$viewButton.on("click", this._onViewChange), this.$productbox = e(o.productBox, a), this._initSidebar(), this._initAdvancedTags(), a.productBox(), StyleHatch.currencyConverter && StyleHatch.CurrencyConverter.init()
        }
        var a = {
                SORT_BY: "sort_by",
                DEFAULT_SORT: "title-ascending",
                VIEW: "view"
            },
            o = {
                sortSelection: "#SortBy",
                defaultSort: ".sort-by__default-sort",
                viewChange: ".change-view",
                advancedFilter: ".advanced-filter a",
                filterCollection: ".mobile-aside-container > a.button.simple",
                mobileAside: ".mobile-aside-container aside",
                productBox: ".box.product .image-table",
                nestedMenu: "ul.nested-menu"
            };
        return t.prototype = e.extend({}, t.prototype, {
            _onSortChange: function(e) {
                var t = "";
                this.sort = this._getSortValue(), this.sort !== this.defaultSort && (t = [a.SORT_BY + "=" + this.sort]);
                var o = document.URL,
                    n = o.indexOf("?") > -1;
                if (n) document.location.href = replaceUrlParam(o, a.SORT_BY, this.sort);
                else {
                    var r = document.location.search = t.length ? "?" + t : "";
                    document.location.href = this.$filterSelect.val() + r
                }
            },
            _getSortValue: function() {
                return this.$sortSelect.val() || this.defaultSort
            },
            _getDefaultSortValue: function() {
                return e(o.defaultSort, this.$container).val() || a.DEFAULT_SORT
            },
            _onViewChange: function(t) {
                var a = e(this).data("view"),
                    o = document.URL,
                    n = o.indexOf("?") > -1;
                n ? window.location = replaceUrlParam(o, "view", a) : window.location = o + "?view=" + a, t.preventDefault()
            },
            _initSidebar: function() {
                e(o.filterCollection).on("click", function(t) {
                    e(o.mobileAside).slideToggle(), t.preventDefault()
                }), this.$container.find(o.nestedMenu).initNestedMenu()
            },
            _initAdvancedTags: function() {
                var t, a, n, r, i = e(o.advancedFilter);
                i.on("click", function(o) {
                    t = e(this).parent(), a = t.data("group"), n = t.data("handle"), r = e('.active[data-group="' + a + '"]'), !t.hasClass("active") && r.length > 0 && (o.preventDefault(), location.href = location.href.replace(r.data("handle"), n).replace(/(&page=\d+)|(page=\d+&)|(\?page=\d+$)/, ""))
                })
            },
            onUnload: function() {
                this.$sortSelect.off("change"), this.$viewButton.off("click"), e(o.advancedFilter).off("click"), this.$container.destroyProductBox(), this.$container.find(o.nestedMenu).destroyNestedMenu()
            }
        }), t
    }(), StyleHatch.ListCollections = function() {
        function t(t) {
            var o = this.$container = e(t),
                n = (o.attr("data-section-id"), o.data("layout"));
            o.find(".card__image");
            this.$productbox = e(a.productBox, o), "preview" == n && o.productBox(), StyleHatch.currencyConverter && StyleHatch.CurrencyConverter.init()
        }
        var a = {
            productBox: ".box .image-table"
        };
        return t.prototype = e.extend({}, t.prototype, {
            onUnload: function() {
                $container.destroyProductBox()
            }
        }), t
    }(), StyleHatch.BlogArticle = function() {
        function t(t) {
            var a = this.$container = e(t);
            a.attr("data-section-id");
            this._initSidebar(), StyleHatch.videoLayout()
        }
        var a = {
            filterCollection: ".mobile-aside-container > a.button.simple",
            mobileAside: ".mobile-aside-container aside",
            nestedMenu: "ul.nested-menu"
        };
        return t.prototype = e.extend({}, t.prototype, {
            _initSidebar: function() {
                e(a.filterCollection).on("click", function(t) {
                    e(a.mobileAside).slideToggle(), t.preventDefault()
                }), this.$container.find(a.nestedMenu).initNestedMenu()
            },
            onUnload: function() {
                e(a.filterCollection).off("click"), this.$container.find(a.nestedMenu).destroyNestedMenu()
            }
        }), t
    }(), StyleHatch.Password = function() {
        function t(t) {
            var a = this.$container = e(t),
                o = (a.attr("data-section-id"), e("#login_form"));
            e(".login-popup").magnificPopup({
                type: "inline",
                midClick: !0,
                mainClass: "mfp-fade",
                closeBtnInside: !1,
                callbacks: {
                    afterClose: function() {
                        e("a").blur(), o.find(".errors").remove()
                    }
                }
            }), e("#mc-embedded-subscribe-form").on("submit", function() {
                e("p.signup-message").hide(), e("p.thanks-message").show(), e(this).find(".input-row").hide()
            }), o.find(".errors").length > 0 && e(".login-popup").magnificPopup("open")
        }
        return t.prototype = e.extend({}, t.prototype, {
            onUnload: function() {
                e.magnificPopup.close(), e("#mc-embedded-subscribe-form").off("submit")
            }
        }), t
    }(), StyleHatch.Cart = function() {
        function t(t) {
            var a = this.$container = e(t),
                o = (a.attr("data-section-id"), a.data("ajax-cart"));
            if (StyleHatch.quantitySelect(), o) {
                CartJS.init(StyleHatch.cartData);
                var n = e("[data-cart-item]", a);
                n.each(function() {
                    var t = e(this),
                        a = t.attr("data-cart-item"),
                        o = e("[data-cart-item-quantity]", t),
                        n = e("[data-cart-item-quantity-minus]", t),
                        r = e("[data-cart-item-quantity-plus]", t),
                        i = e("[data-cart-item-remove]", t);
                    o.on("blur", function(t) {
                        t.preventDefault();
                        var o = e(this).val(),
                            n = e(this).closest(".cart-item");
                        n.addClass("cart-item--pending"), e(".cart-checkout").addClass("cart-checkout--pending"), CartJS.updateItemById(a, o)
                    }), o.on("keypress", function(t) {
                        if (13 === t.which) {
                            var o = e(this).val(),
                                n = e(this).closest(".cart-item");
                            n.addClass("cart-item--pending"), e(".cart-checkout").addClass("cart-checkout--pending"), CartJS.updateItemById(a, o), t.preventDefault()
                        }
                    }), n.on("click", function(n) {
                        n.preventDefault();
                        var r = o.val(),
                            i = e(this).closest(".cart-item");
                        i.addClass("cart-item--pending"), e(".cart-checkout").addClass("cart-checkout--pending"), CartJS.updateItemById(a, r), 0 == r && t.fadeOut(500, function() {
                            e(this).remove()
                        })
                    }), r.on("click", function(t) {
                        t.preventDefault();
                        var n = o.val(),
                            r = e(this).closest(".cart-item");
                        r.addClass("cart-item--pending"), e(".cart-checkout").addClass("cart-checkout--pending"), CartJS.updateItemById(a, n)
                    }), i.on("click", function(o) {
                        o.preventDefault(), CartJS.removeItemById(a), e(".cart-checkout").addClass("cart-checkout--pending"), t.fadeOut(500, function() {
                            e(this).remove()
                        }).slideUp(500)
                    })
                }), e(document).on("cart.requestComplete", function(t, a) {
                    StyleHatch.AjaxCart.updateCartButton(a), e(".cart-item--pending").removeClass("cart-item--pending"), e(".cart-checkout--pending").removeClass("cart-checkout--pending"), e.each(a.items, function(t, a) {
                        var o = a.key,
                            n = a.quantity,
                            r = theme.Currency.formatMoney(a.price, StyleHatch.currencyFormat),
                            i = theme.Currency.formatMoney(a.line_price, StyleHatch.currencyFormat),
                            s = e('[data-cart-item="' + o + '"]'),
                            l = e("[data-cart-item-quantity]", s),
                            c = e("[data-cart-item-price]", s),
                            d = e("[data-cart-item-line-price]", s);
                        l.val(n), c.removeClass("money"), c.html('<span class="money">' + r + "</span>"), d.removeClass("money"), d.html('<span class="money">' + i + "</span>")
                    });
                    var o = theme.Currency.formatMoney(a.total_price, StyleHatch.currencyFormat),
                        n = e("[data-cart-subtotal]");
                    n.removeClass("money"), n.html('<span class="money">' + o + "</span>"), StyleHatch.currencyConverter && Currency.convertAll(StyleHatch.shopCurrency, jQuery("[name=currencies]").val())
                })
            }
            var r = e(".terms-and-conditions", a);
            if (r.length > 0) {
                e("body").on("click", '[name="checkout"], [name="goto_pp"], [name="goto_gc"]', function() {
                    return e("#terms-and-conditions__agree").is(":checked") ? void e(this).submit() : (e(".terms-and-conditions__notice").length <= 0 && r.append('<div class="terms-and-conditions__notice"><p><em>' + StyleHatch.Strings.agreeNotice + "</em></p></div>"), !1)
                });
                var i = r.find("input");
                i.on("click", function() {
                    r.find(".terms-and-conditions__notice").remove()
                })
            }
        }
        return t.prototype = e.extend({}, t.prototype, {
            onUnload: function() {}
        }), t
    }(), StyleHatch.AjaxCart = function() {
        function t() {
            p = {
                $body: e(d.body),
                $util: e(d.util),
                $cartPreview: e(d.cartPreview),
                $addToCartForm: e(d.addToCartForm),
                $addToCartButton: e(d.addToCartButton),
                $cartButton: e(d.cartButton),
                $cartCount: e(d.cartCount),
                $cartCost: e(d.cartCost)
            }
        }

        function a() {
            t(), s()
        }

        function o(t) {
            var t = t,
                a = t.find(".cart-error"),
                o = t.find("[data-AddToCartText]").html(),
                n = (t.find("[data-AddToCartText]").attr("data-added"), t.find("[data-AddToCartText]").attr("data-adding"));
            return t.find("[data-AddToCart]").addClass("added").prop("disabled", !0), t.find("[data-AddToCartText]").html(n), a.hide(), e.post(u.addURL, t.serialize(), function(a) {
                var n = a;
                e.get(u.cartURL, function(e) {
                    var a = e;
                    r(a), i(n, a);
                    var s;
                    s = setTimeout(function() {
                        t.find("[data-AddToCart]").removeClass("added").prop("disabled", !1), t.find("[data-AddToCartText]").html(o)
                    }, 500)
                }, "json")
            }, "text").fail(function(e) {
                if ("undefined" != typeof e && "undefined" != typeof e.status) {
                    var n = JSON.parse(e.responseText);
                    a.html("<strong>" + n.message + ":</strong> <em>" + n.description + "<em>"), a.slideDown()
                }
                var r;
                r = setTimeout(function() {
                    t.find("[data-AddToCart]").removeClass("added").prop("disabled", !1), t.find("[data-AddToCartText]").html(o)
                }, 500)
            }), !1
        }

        function n() {
            e.post(u.clearURL)
        }

        function r(e) {
            var t = (p.$cartButton, p.$cartCount),
                a = p.$cartCost,
                o = e.item_count,
                n = theme.Currency.formatMoney(e.total_price, StyleHatch.currencyFormat);
            t.text(o), a.removeClass("money"), a.html('<span class="money">' + n + "</span>"), StyleHatch.currencyConverter && Currency.convertAll(StyleHatch.shopCurrency, jQuery("[name=currencies]").val())
        }

        function i(t, a) {
            var o = p.$util,
                n = p.$cartPreview;
            clearTimeout(p.hideCartPreview), p.$cartPreview.hide();
            var r = a.item_count,
                i = theme.Currency.formatMoney(a.total_price, StyleHatch.currencyFormat),
                t = JSON.parse(t),
                s = t.product_title,
                sku=  t.sku,
                l = t.variant_options,
                c = t.image,
                d = t.url,
                u = theme.Currency.formatMoney(t.price, StyleHatch.currencyFormat),
                h = (t.quantity, theme.Currency.formatMoney(t.line_price, StyleHatch.currencyFormat), n.find(".product-image").empty());
            h.append('<img src="' + c + '" alt="' + s + '">'), h.attr("href", d);
            var f = n.find(".product-title");
            f.html(s), f.attr("href", d);
            var y = n.find(".product-variant").empty();
          	y.append("<p>" + sku + "</p>")
            e.each(l, function() {
                var e = this;
                e.toLowerCase().indexOf("default title") < 0 ? (y.show(), y.append("<li>" + e + "</li>")) : y.hide()
            });
            var m = n.find(".product-price");
            m.removeClass("money"), m.html('<span class="money">' + u + "</span>");
            var v = n.find(".item-count");
            v.text(r), r > 1 ? (n.find(".count.plural").show(), n.find(".count.singular").hide()) : (n.find(".count.plural").hide(), n.find(".count.singular").show());
            var g = n.find(".total-price");
            g.html('<span class="money">' + i + "</span>");
            var S = o.height();
            n.css({
                top: S
            }), n.fadeIn(300), p.hideCartPreview = setTimeout(function() {
                n.fadeOut(300)
            }, 6e3), n.find("a.continue-shopping").on("click", function(e) {
                n.fadeOut(300), e.preventDefault()
            }), StyleHatch.currencyConverter && Currency.convertAll(StyleHatch.shopCurrency, jQuery("[name=currencies]").val())
        }

        function s() {
            p.$addToCartForm.each(function() {
                e(this).on("submit", function(t) {
                    var a = e(this);
                    o(a), t.preventDefault()
                })
            })
        }

        function l() {
            p.$addToCartForm.off("submit")
        }

        function c() {
            l(), clearTimeout(p.hideCartPreview), p.$cartPreview.hide()
        }
        var d = {
                body: "body",
                util: "header.util",
                cartPreview: "header.util .cart-preview",
                addToCartForm: "[data-AddToCartForm] > form",
                addToCartButton: "[data-AddToCartForm]",
                cartButton: "[data-CartButton]",
                cartCount: "#CartCount",
                cartCost: "#CartCost"
            },
            u = {
                addURL: "/cart/add.js",
                cartURL: "/cart.js",
                clearURL: "/cart/clear.js"
            },
            p = {};
        return {
            init: a,
            clearCart: n,
            updateCartButton: r,
            unload: c
        }
    }(), StyleHatch.CurrencyConverter = function() {
        function t() {
            i = {
                $body: e(n.body),
                $money: e(n.money)
            }
        }

        function a() {
            t(), o()
        }

        function o() {
            r.cookieCurrency = Currency.cookie.read(), e("span.money span.money").each(function() {
                e(this).parents(n.money).removeClass("money")
            }), i.$money.each(function() {
                "" !== Currency.currentCurrency ? e(this).attr("data-currency-" + Currency.currentCurrency, e(this).html()) : e(this).attr("data-currency-" + StyleHatch.shopCurrency, e(this).html())
            }), null == r.cookieCurrency ? StyleHatch.shopCurrency !== StyleHatch.defaultCurrency ? Currency.convertAll(StyleHatch.shopCurrency, StyleHatch.defaultCurrency) : Currency.currentCurrency = StyleHatch.defaultCurrency : e("[name=currencies]").length > 0 && 0 === e("[name=currencies] option[value=" + r.cookieCurrency + "]").length ? (Currency.currentCurrency = StyleHatch.shopCurrency, Currency.cookie.write(StyleHatch.shopCurrency)) : r.cookieCurrency === StyleHatch.shopCurrency ? Currency.currentCurrency = StyleHatch.shopCurrency : Currency.convertAll(StyleHatch.shopCurrency, r.cookieCurrency), e("[name=currencies]").val(Currency.currentCurrency).change(function() {
                var t = e(this).val();
                Currency.convertAll(Currency.currentCurrency, t), e(".selected-currency").text(Currency.currentCurrency), e("p.currency-at-checkout").length > 0 && (Currency.currentCurrency == StyleHatch.shopCurrency ? e("p.currency-at-checkout").hide() : e("p.currency-at-checkout").show())
            }), e("[name=currencies]").val(Currency.currentCurrency).change()
        }
        var n = {
                body: "body",
                money: "span.money"
            },
            r = {
                enabled: !1
            },
            i = {};
        return {
            init: a,
            config: r,
            convert: o
        }
    }(), window.theme = window.theme || {}, window.slate = window.slate || {}, theme.Images = function() {
        function e(e, t) {
            "string" == typeof e && (e = [e]);
            for (var a = 0; a < e.length; a++) {
                var o = e[a];
                this.loadImage(this.getSizedImageUrl(o, t))
            }
        }

        function t(e) {
            (new Image).src = e
        }

        function a(e, t, a) {
            var o = this.imageSize(t.src),
                n = this.getSizedImageUrl(e.src, o);
            a ? a(n, e, t) : t.src = n
        }

        function o(e) {
            var t = e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
            return null !== t ? t[1] : null
        }

        function n(e, t) {
            if (null == t) return e;
            if ("master" === t) return this.removeProtocol(e);
            var a = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != a) {
                var o = e.split(a[0]),
                    n = a[0];
                return this.removeProtocol(o[0] + "_" + t + n)
            }
            return null
        }

        function r(e) {
            return e.replace(/http(s)?:/, "")
        }
        return {
            preload: e,
            loadImage: t,
            switchImage: a,
            imageSize: o,
            getSizedImageUrl: n,
            removeProtocol: r
        }
    }(), theme.Currency = function() {
        function e(e, a) {
            function o(e, t, a, o) {
                if (t = slate.utils.defaultTo(t, 2), a = slate.utils.defaultTo(a, ","), o = slate.utils.defaultTo(o, "."), isNaN(e) || null == e) return 0;
                e = (e / 100).toFixed(t);
                var n = e.split("."),
                    r = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a),
                    i = n[1] ? o + n[1] : "";
                return r + i
            }
            "string" == typeof e && (e = e.replace(".", ""));
            var n = "",
                r = /\{\{\s*(\w+)\s*\}\}/,
                i = a || t;
            switch (i.match(r)[1]) {
                case "amount":
                    n = o(e, 2);
                    break;
                case "amount_no_decimals":
                    n = o(e, 0);
                    break;
                case "amount_with_comma_separator":
                    n = o(e, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    n = o(e, 0, ".", ",");
                    break;
                case "amount_no_decimals_with_space_separator":
                    n = o(e, 0, " ")
            }
            return i.replace(r, n)
        }
        var t = "${{amount}}";
        return {
            formatMoney: e
        }
    }(), slate.utils = {
        findInstance: function(e, t, a) {
            for (var o = 0; o < e.length; o++)
                if (e[o][t] === a) return e[o]
        },
        removeInstance: function(e, t, a) {
            for (var o = e.length; o--;)
                if (e[o][t] === a) {
                    e.splice(o, 1);
                    break
                }
            return e
        },
        compact: function(e) {
            for (var t = -1, a = null == e ? 0 : e.length, o = 0, n = []; ++t < a;) {
                var r = e[t];
                r && (n[o++] = r)
            }
            return n
        },
        defaultTo: function(e, t) {
            return null == e || e !== e ? t : e
        },
        debounce: function(e, t, a) {
            var o;
            return function() {
                var n = this,
                    r = arguments,
                    i = function() {
                        o = null, a || e.apply(n, r)
                    },
                    s = a && !o;
                clearTimeout(o), o = setTimeout(i, t), s && e.apply(n, r)
            }
        }
    }, slate.Variants = function() {
        function t(t) {
            this.$container = t.$container, this.product = t.product, this.singleOptionSelector = t.singleOptionSelector, this.originalSelectorId = t.originalSelectorId, this.enableHistoryState = t.enableHistoryState,
                this.enableSwatch = t.enableSwatch, this.currentVariant = this._getVariantFromOptions(), e(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
        }
        return t.prototype = e.extend({}, t.prototype, {
            _getCurrentOptions: function() {
                var t = e.map(e(this.singleOptionSelector, this.$container), function(t) {
                    var a = e(t),
                        o = a.attr("type"),
                        n = {};
                    return "radio" === o || "checkbox" === o ? !!a[0].checked && (n.value = a.val(), n.index = a.data("index"), n) : (n.value = a.val(), n.index = a.data("index"), n)
                });
                return t = slate.utils.compact(t)
            },
            _getVariantFromOptions: function() {
                var e = this._getCurrentOptions(),
                    t = this.product.variants,
                    a = !1;
                return t.forEach(function(t) {
                    var o = !0;
                    t.options;
                    e.forEach(function(e) {
                        o && (o = e.value === t[e.index])
                    }), o && (a = t)
                }), a || null
            },
            _onSelectChange: function() {
                var e = this._getVariantFromOptions();
                return this.$container.trigger({
                    type: "variantChange",
                    variant: e
                }), e ? (this._updateMasterSelect(e), this._updateImages(e), this._updatePrice(e), this._updateSKU(e), this._updateSwatches(e), this.currentVariant = e, void(this.enableHistoryState && this._updateHistoryState(e))) : void this._updateSwatches(e)
            },
            _updateImages: function(e) {
                var t = e.featured_image || {},
                    a = this.currentVariant.featured_image || {};
                e.featured_image && t.src !== a.src && this.$container.trigger({
                    type: "variantImageChange",
                    variant: e
                })
            },
            _updatePrice: function(e) {
                e.price === this.currentVariant.price && e.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
                    type: "variantPriceChange",
                    variant: e
                })
            },
            _updateSKU: function(e) {
                e.sku !== this.currentVariant.sku && this.$container.trigger({
                    type: "variantSKUChange",
                    variant: e
                })
            },
            _updateSwatches: function(e) {
                this.$container.trigger({
                    type: "variantSwatchChange",
                    variant: e
                })
            },
            _updateHistoryState: function(e) {
                if (history.replaceState && e) {
                    var t = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + e.id;
                    window.history.replaceState({
                        path: t
                    }, "", t)
                }
            },
            _updateMasterSelect: function(t) {
                e(this.originalSelectorId, this.$container)[0].value = t.id
            }
        }), t
    }(), e.fn.extend({
        productBox: function() {
            var t = e(this).find(".box.product figure");
            t.on("click", function(t) {
                if (e(t.target).is(".vendor") || e(t.target).parent().is(".vendor"));
                else if (e(t.target).is(".product-swatches__li") || 0 != e(t.target).closest(".product-swatches__li").length) {
                    var a = e(t.target).closest(".product-swatches"),
                        o = e(t.target).closest(".product-swatches__li"),
                        n = o.find("a"),
                        r = n.data("variant-image"),
                        i = n.data("variant-image-pattern"),
                        s = n.data("variant-url"),
                        l = o.closest(".box.product").find("a.product_card"),
                        c = l.find(".product_card__image:not(.alt)");
                    "" !== s && l.attr("href", s), "" !== r && c.attr("src", r).attr("data-fallback", r).attr("srcset", "").attr("data-srcset", "").attr("data-src", i), e(".product-swatches__link--selected", a).removeClass("product-swatches__link--selected"), n.addClass("product-swatches__link--selected"), t.preventDefault()
                } else {
                    t.preventDefault();
                    var d = e(this).find("a").attr("href");
                    t.shiftKey || t.ctrlKey || t.metaKey ? window.open(d, "_blank") : window.location = d
                }
            }), Modernizr.objectfit || t.find(".product_card__image-wrapper").each(function() {
                var t = e(this),
                    a = t.find(".product_card__image.alt");
                t.find("img").prop("src");
                a.hide(), t.addClass("ie-fallback lazyload")
            });
            var a = e(this).find(".box.product a.product-swatches__link");
            a.on("mouseenter", function(t) {
                StyleHatch.productSwatchPreload = StyleHatch.productSwatchPreload || [];
                var a = e(t.target).closest("a.product-swatches__link"),
                    o = a.data("variant-image");
                if ("" !== o && StyleHatch.productSwatchPreload.indexOf(o) < 0) {
                    StyleHatch.productSwatchPreload.push(o);
                    var n = new Image;
                    n.src = o
                }
            })
        },
        destroyProductBox: function() {
            var t = e(this).find(".box.product figure");
            t.off("click")
        },
        initNestedMenu: function() {
            var t = e(this),
                a = t.find('a[aria-haspopup="true"]'),
                o = function(e) {
                    var t = e.find("li.has-dropdown.expanded");
                    if (t.length > 0) {
                        t.removeClass("expanded");
                        var a = t.find("> a");
                        a.attr("aria-expanded", "false");
                        var o = t.find("> ul.dropdown");
                        o.attr("aria-hidden", "true"), o.slideUp();
                        var r = o.find("a");
                        r.attr("tabindex", "-1"), n(e)
                    }
                },
                n = function(e) {
                    var t = e.find("li.has-sub-dropdown.expanded");
                    if (t.length > 0) {
                        t.removeClass("expanded");
                        var a = t.find("> a");
                        a.attr("aria-expanded", "false");
                        var o = t.find("> ul.sub-dropdown");
                        o.attr("aria-hidden", "true"), o.slideUp();
                        var r = o.find("a");
                        r.attr("tabindex", "-1"), n(e)
                    }
                };
            a.on("click", function(t) {
                var a = e(this),
                    r = a.parent(),
                    i = r.find("> ul"),
                    s = r.find("> ul > li > a"),
                    l = a.closest("ul.nested-menu");
                "true" !== a.attr("aria-expanded") && (t.preventDefault(), r.hasClass("has-dropdown") ? o(l) : n(l), a.attr("aria-expanded", "true"), r.addClass("expanded"), i.attr("aria-hidden", "false"), s.attr("tabindex", "0"), i.slideDown())
            })
        },
        destroyNestedMenu: function() {
            var t = e(this),
                a = t.find('a[aria-haspopup="true"]');
            a.off("click")
        }
    }), StyleHatch.refreshFixTo = function() {
        StyleHatch.Promos.refreshFixTo();
        var t = e("*").filter(function() {
            return e(this).data("fixtoInstance")
        });
        t.each(function(t) {
            e(this).data("fixto-instance")._running && e(this).fixTo("refresh")
        })
    }, StyleHatch.videoLayout = function() {
        e(".rte").fitVids();
        var t = e(".rte").find("table");
        t.wrap('<div class="table-wrapper"></div>')
    }, StyleHatch.loginForms = function() {
        function e() {
            StyleHatch.cache.$recoverPasswordForm.show(), StyleHatch.cache.$customerLoginForm.hide()
        }

        function t() {
            StyleHatch.cache.$recoverPasswordForm.hide(), StyleHatch.cache.$customerLoginForm.show()
        }
        StyleHatch.cache.$recoverPasswordLink.on("click", function(t) {
            t.preventDefault(), e(), StyleHatch.updateHash("recover")
        }), StyleHatch.cache.$hideRecoverPasswordLink.on("click", function(e) {
            e.preventDefault(), t(), StyleHatch.updateHash()
        }), "#recover" == StyleHatch.getHash() && e()
    }, StyleHatch.initTemplates = function() {
        var e = StyleHatch.cache.$body,
            t = e.data("template");
        switch (t) {
            case "addresses":
                StyleHatch.initCustomerAddressTemplate()
        }
    }, StyleHatch.initCustomerAddressTemplate = function() {
        if (StyleHatch.addressJSValidation) {
            var t = e('.customer-address input[type="submit"]');
            t.on("click", function(t) {
                var a = e(this).closest("form"),
                    o = a.find('input[name="address[last_name]"]'),
                    n = a.find('input[name="address[address1]"]'),
                    r = a.find('input[name="address[city]"]'),
                    i = a.find('select[name="address[country]"]'),
                    s = a.find('select[name="address[province]"]'),
                    l = a.find('input[name="address[zip]"]');
                o.val() || o.addClass("required"), n.val() || n.addClass("required"), r.val() || r.addClass("required"), "---" == i.val() && i.addClass("required"), s.closest(".input-row").is(":visible") && (s.val() && "---" != s.val() && "" != s.val() || s.addClass("required")), l.val() || l.addClass("required");
                var c = a.find("input.required, select.required");
                c.on("focus", function() {
                    e(this).removeClass("required")
                }), c.length > 0 ? (a.find("div.errors").parent().show(), t.preventDefault()) : a.find("div.errors").parent().hide()
            })
        }
    }, StyleHatch.updateHash = function(t) {
        t ? (window.location.hash = "#" + t, e("#" + t).attr("tabindex", -1).focus()) : window.location.hash = ""
    }, StyleHatch.getHash = function() {
        return window.location.hash
    }, StyleHatch.quantitySelect = function() {
        var t = e(".quantity-select");
        t.each(function(t) {
            var a = e(this),
                o = a.find(".adjust-minus"),
                n = a.find(".adjust-plus"),
                r = a.find("input.quantity"),
                i = r.val();
            r.on("click", function(e) {
                e.preventDefault()
            }), o.on("click", function(e) {
                i = r.val(), i > 0 && (i--, r.val(i)), e.preventDefault()
            }), n.on("click", function(e) {
                i = r.val(), i++, r.val(i), e.preventDefault()
            })
        })
    }, StyleHatch.resetPasswordSuccess = function() {
        StyleHatch.cache.$passwordResetSuccess.show()
    }, e(document).ready(function() {
        StyleHatch.init()
    })
}(jq223);