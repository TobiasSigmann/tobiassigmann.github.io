/*
 * changing to dar mode or light mode
 */
function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

/*
 * changeFontSize  
 */
function changefontSize() {
    document.querySelectorAll('span').forEach(node => {
        node.style.fontSize = fontSize + "pt"
    })
}