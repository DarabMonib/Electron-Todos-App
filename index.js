let ol = document.querySelector('ol');
console.log(ol);

window.electronAPI.getImage((e, item) => {

    let newItem = document.createElement('li')
    newItem.innerHTML = item;
    newItem.className = "text-lg text-white p-4 mb-2 bg-blue-500 shadow-xl rounded-xl";
    newItem.style.width = 'fit-content'
    newItem.style.marginLeft = 'auto'
    newItem.style.marginRight = 'auto'

    ol.appendChild(newItem)

    if(ol.children.length !== 0) {

        ol.style.border = "4px rgb(236, 236, 236) dotted";
        ol.style.width = "fit-content";
        ol.style.marginLeft = "auto";
        ol.style.marginRight = "auto";
        ol.style.marginTop = "16px";
        ol.style.padding = "20px";

    }

})

let button = document.querySelector('button');

button.addEventListener('click', () => {
    console.log('Okay!')
    window.electronAPI.openWin2(true);
})

let closeBtn = document.querySelector('div');

closeBtn.addEventListener('click', () => {
    window.electronAPI.closeAll(true);
})