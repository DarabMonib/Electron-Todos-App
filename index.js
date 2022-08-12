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

})

let button = document.querySelector('button');

button.addEventListener('click', () => {
    console.log('Okay!')
    window.electronAPI.openWin2(true);
})