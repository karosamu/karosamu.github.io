window.smoothScroll = function (target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function (c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function () { scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

//window.onload = function () { document.getElementById("loading").style.cssText = "transition: 1s; display: none;" }

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-light2') {
        setTheme('theme-dark2');
    } else {
        setTheme('theme-light2');
    }
}

(function () {
    if (localStorage.getItem('theme') === 'theme-light2') {
        setTheme('theme-light2');
    } else {
        setTheme('theme-dark2');
    }
})();

function loadCurrentPage() {
    //$('input').attr('disabled','disabled');
    $('#displayResults').html('<img src="http://blog-well.com/wp-content/uploads/2007/06/indicator-big-2.gif" />');

    $.ajax({
        url: '/echo/html/',
        data: 'html=Current Page: ' + currentPage + '&delay=1',
        type: 'POST',
        success: function (data) {
            // $('input').attr('disabled','');
            $('#displayResults').html(data);
        }
    });

    $('#home').page();
}

function move(target) {
    document.getElementById(target).scrollIntoView();
}

$(document).ready(function () {
    $('.submit').click(function (event) {
        event.preventDefault();
        var email = $('.e-mail').val();
        var name = $('.name').val();
        var message = $('.message').val();
        var statusElm = $('.status');
        statusElm.empty();

        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            event.preventDefault();
            statusElm.append('<div class="error">E-mail is invalid</div>');
        }
        if (email === ""){
            event.preventDefault();
            statusElm.append('<div class="error">E-mail field is empty</div>');
        }
        if (name === "") {
            event.preventDefault();
            statusElm.append('<div class="error">Name field is empty</div>');
        }
        if (message === ""){
            event.preventDefault();
            statusElm.append('<div class="error">Message field is empty</div>');
        }
    });
});