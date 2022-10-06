let toggleBtns = document.querySelectorAll('.section__content-item__toggle-btn')
for( btn of toggleBtns){
    
    btn.addEventListener('click', toggleList);
}
function toggleList(e) {
    let listToToggle = e.target.closest('.section__content-item__toggle-btn').parentNode.nextElementSibling;
    console.log(listToToggle);
    let isDisplayed = !listToToggle.hidden;
    console.log(isDisplayed);
    if (isDisplayed) {
        listToToggle.hidden = true;
        console.log('Is hidden');
    }
    else {
        listToToggle.hidden = false;
        console.log('Is shown');

    }

    
}