/*
 * changing to dar mode or light mode
 */
function toggleDarkMode(isDark) {
    var element = document.body;
    if (isDark){
        element.classList.add("dark-mode");
    }else{
        element.classList.remove("dark-mode");
    }
}

/*
 * changeFontSize  
 */
function changefontSize() {
    document.querySelectorAll('span').forEach(node => {
        node.style.fontSize = fontSize + "pt"
    })
}