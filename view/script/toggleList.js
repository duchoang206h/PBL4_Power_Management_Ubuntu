let toggleBtns = document.querySelectorAll('.section__content-item__toggle-btn')
for(const btn of toggleBtns){
    btn.addEventListener('click', toggleList);
}
function toggleList(e) {
    let listToToggle = e.target.closest('.section__content-item__toggle-btn').parentNode.nextElementSibling;
    let isDisplayed = !listToToggle.hidden;
    if (isDisplayed) {
        listToToggle.hidden = true;
    }
    else {
        listToToggle.hidden = false;
    }
}