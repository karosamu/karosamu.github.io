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

function removecss(id) {
    document.getElementById(id).classList.remove('failed');
}

$(document).ready(function () {
    $('.submit').click(function (event) {
        var email = $('.e-mail').val();
        var name = $('.name').val();
        var message = $('.message').val();
        var statusElm = $('.status');
        statusElm.empty();

        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            event.preventDefault();
            document.getElementById("e-mail").classList.add('failed');
        }
        if (email === "") {
            event.preventDefault();
            document.getElementById("e-mail").classList.add('failed');
        }
        if (name === "") {
            event.preventDefault();
            document.getElementById("name").classList.add('failed');
        }
        if (message === "") {
            event.preventDefault();
            document.getElementById("message").classList.add('failed');
        }

        var form = document.getElementById("contact-form");
        var button = document.getElementById("submit");
        var status = document.getElementById("status");

        function success() {
            form.reset();
            button.style = "display: none ";
            status.innerHTML = '<div class="success">Message sent</div>';
        }

        function error() {
            status.innerHTML = '<div class="error">Something went wrong!</div>';
        }

        form.addEventListener("submit", function (ev) {
            ev.preventDefault();
            var data = new FormData(form);
            ajax(form.method, form.action, data, success, error);
        });

        function ajax(method, url, data, success, error) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;
                if (xhr.status === 200) {
                    success(xhr.response, xhr.responseType);
                } else {
                    error(xhr.status, xhr.response, xhr.responseType);
                }
            };
            xhr.send(data);
        }
    });
});