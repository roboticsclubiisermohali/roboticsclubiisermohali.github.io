'use strict';
window.addEventListener('load', scroll);
window.addEventListener('load', navbutton);

function navbutton() {
    var hamburger = document.getElementById('hamburger');

    $(hamburger).click(function() {
        $(this).toggleClass('is-active');
    })
}

function scrollNav(offset, navCont, dataCont, linkClass, activeClass, contentClass) {
    this.navCont = navCont || 'navbar';
    this.dataCont = dataCont || 'scrollNavData';
    this.linkClass = linkClass || 'nav-item';
    this.activeClass = activeClass || 'active';
    this.contentClass = contentClass || 'scrollNav-content';
    this.offset = offset || 50;
    this.winH = $(window).height();
    this.docH = $(document).height();
}

scrollNav.prototype.init = function() {
    var _self = this;

    _self.contentBlocks = $('.' + _self.dataCont).find('.' + _self.contentClass);

    if (!_self.contentBlocks.length === 0) {
        console.log('no content');
        return false;
    }
    //get pos of each elements
    _self.elePos = [];

    _self.contentBlocks.each(function(element) {
        _self.elePos.push({ top: _self.contentBlocks[element].offsetTop });
    });

    $(window).on('scroll', _self.scrollHandler.bind(_self));
}

scrollNav.prototype.scrollHandler = function() {
    var _self = this;
    //get current pos
    var currPos = $(window).scrollTop();
    var i;
    for (i = 0; i < _self.elePos.length - 1; i++) {

        if (currPos > _self.elePos[i].top - _self.offset && currPos < _self.elePos[i + 1].top) {
            $('.' + _self.linkClass).removeClass(_self.activeClass);
            $('.' + _self.linkClass).eq(i).addClass(_self.activeClass);
        }
    }

    if (currPos + _self.winH == _self.docH) {
        //for last item
        $('.' + _self.linkClass).removeClass(_self.activeClass);
        $('.' + _self.linkClass).last().addClass(_self.activeClass);
    }

}

function scroll() {
    var scroll = $(window).scrollTop();
    var vidheight = document.getElementById('home').clientHeight - 50;
    if (scroll > vidheight) {
        $(".navbar-dark").css("background", "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.99))");
    } else {
        $(".navbar-dark").css("background", "linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, 0))");
    }
}