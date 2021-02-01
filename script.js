let toggledMenu = false;

const openMenu = () => {
    if(toggledMenu)
        document.getElementById("hamburger-items").style.right = "-500px";
    else
        document.getElementById("hamburger-items").style.right = "calc(2vw - 3px)";
    toggledMenu = !toggledMenu;
}

console.log(window.location.hostname.split("."));