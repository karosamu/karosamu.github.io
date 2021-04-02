let toggledMenu = false;
var fr = new FileReader();

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        const loadContent = () => {
            var fragmentId = location.hash.substr(1);
            fetch(`./pages/${location.pathname.substr(1)}/${fragmentId}.html`)
                .then((response) => response.text())
                .then((data) => {
                    document.getElementById("app").innerHTML = data;
                    assignActive(fragmentId);
                    if (fragmentId == "contact") {
                        setForm();
                    }
                });
        };

        if (!location.hash) {
            location.hash = "#home";
        }
        loadContent();
        window.addEventListener("hashchange", loadContent);
    }
};

const assignActive = (fragmentId) => {
    var activeElements = document.querySelectorAll(".active");
    [].forEach.call(activeElements, function (el) {
        el.classList.remove("active");
    });
    var toActivateElements = document.querySelectorAll("." + fragmentId);
    [].forEach.call(toActivateElements, function (el) {
        el.classList.add("active");
    });
};

const openMenu = () => {
    if (toggledMenu)
        document.getElementById("hamburger-items").style.right = "-500px";
    else
        document.getElementById("hamburger-items").style.right =
            "calc(2vw - 3px)";
    toggledMenu = !toggledMenu;
};

window.onclick = (event) => {
    if (
        event.target != document.getElementById("hamburger") &&
        event.target != document.getElementById("hamburger-items") &&
        event.target != document.getElementById("work") &&
        event.target != document.getElementById("about") &&
        event.target != document.getElementById("contact")
    ) {
        document.getElementById("hamburger-items").style.right = "-500px";
        toggledMenu = !toggledMenu;
    }
};

const setForm = () => {
    var form = document.getElementById("contact-form");
    document.getElementById("submit").onclick = function () {
        form.addEventListener("submit", function (ev) {
            ev.preventDefault();
            var data = new FormData(form);
            ajax(`POST`, `https://formspree.io/f/mbjplqle`, data);
        });
        function success() {
            form.reset();
            document.getElementById(
                "submit"
            ).innerHTML = `<i class="fas fa-check"></i>`;
            document.getElementById("submit").style.backgroundColor = "#61cc40";
            setTimeout(function () {
                document.getElementById(
                    "submit"
                ).innerHTML = `<i class="fas fa-paper-plane"></i>`;
                document.getElementById("submit").style.backgroundColor = "var(--accent)";
            }, 3000);
        }
        function ajax(method, url, data) {
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
    };
};

var consoleStyle="font-size: 16px;"+
    "background: linear-gradient(to right, #e66465, #9198e5);"+
    "color: white;"+
    "text-align: center;"+
    "padding: 10x 15px;"+
    "width: 100%;"+
    "border-radius: 20px;";

var consoleText="%cHello, new phone, who dis?"
console.log(consoleText, consoleStyle);
