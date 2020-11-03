pl.view.deleteBook = {
    setupUserInterface: function() {
        var deleteButton = document.forms['Book'].commit;
        var selectEl = document.forms['Book'].selectBook;
        Book.loadAll();
        for(var key of Object.keys(Book.instances)) {
            var book = Book.instances[key];
            var optionEl = document.createElement("option");
            optionEl.text = book.title;
            optionEl.value = book.isbn;
            selectEl.add(optionEl, null);
        }
        deleteButton.addEventListener("click", pl.view.deleteBook.handleDeleteButtonClickEvent);
        window.addEventListener("beforeunload", function() {
            Book.saveAll();
        });
    },
    handleDeleteButtonClickEvent: function() {
        var selectEl = document.forms["Book"].selectBook;
        var isbn = selectEl.value;
        if (isbn) {
            Book.destroy(isbn);
            selectEl.remove(selectEl.selectedIndex);
        }
    }
}