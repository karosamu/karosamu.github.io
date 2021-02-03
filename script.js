let toggledMenu = false;
var fr = new FileReader();

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        function loadContent() {
            var fragmentId = location.hash.substr(1);
            fetch(`./pages/${fragmentId}.html`)
                .then((response) => response.text())
                .then((data) => {
                        document.getElementById("app").innerHTML = data;
                    });
    
        }

        if (!location.hash) {
            location.hash = "#home";
        }
        loadContent();

        window.addEventListener("hashchange", loadContent);
    }
};

const openMenu = () => {
    if (toggledMenu)
        document.getElementById("hamburger-items").style.right = "-500px";
    else
        document.getElementById("hamburger-items").style.right =
            "calc(2vw - 3px)";
    toggledMenu = !toggledMenu;
};



