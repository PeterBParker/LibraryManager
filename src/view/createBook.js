pl.view.createBook = {
    setupUserInterface: function () {
        var saveButton = document.forms['Book'].commit;
        Book.loadAll();
        saveButton.addEventListener("click", pl.view.createBook.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function() {
            Book.saveAll();
        })
    },
    handleSaveButtonClickEvent: function() {
        var formEl = document.forms["Book"];
        var isFavorite = false;
        if(formEl.favorite.checked) {
            isFavorite = true;
        }
        var slots = {isbn: formEl.isbn.value, title: formEl.title.value, year: formEl.year.value, author: formEl.author.value, favorite: isFavorite};
        Book.add(slots);
        formEl.reset();
    }
}