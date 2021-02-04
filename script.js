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
                });
    
        }

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
    var toActivateElements = document.querySelectorAll("."+fragmentId);
    [].forEach.call(toActivateElements, function (el) {
        el.classList.add("active");
    });
}

const openMenu = () => {
    if (toggledMenu)
        document.getElementById("hamburger-items").style.right = "-500px";
    else
        document.getElementById("hamburger-items").style.right =
            "calc(2vw - 3px)";
    toggledMenu = !toggledMenu;
};


