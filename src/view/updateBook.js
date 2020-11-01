pl.view.updateBook = {
    setupUserInterface: function() {
        var formEl = document.forms["Book"]
        var saveButton = formEl.commit
        var selectBookEl = formEl.selectBook;
        Book.loadAll();
        for (var key of Object.keys(Book.instances)) {
            book = Book.instances[key];
            optionEl = document.createElement("option");
            optionEl.text = book.title;
            optionEl.value = book.isbn;
            selectBookEl.add(optionEl, null);
        }
        selectBookEl.addEventListener("change", function() {
            var key = selectBookEl.value;
            if (key) {
                book = Book.instances[key];
                formEl.isbn.value = book.isbn;
                formEl.title.value = book.title;
                formEl.year.value = book.year;
            } else {
                formEl.isbn.value = "";
                formEl.title.value = "";
                formEl.year.value = "";
            }
        });
        saveButton.addEventListener("click", pl.view.updateBook.handleUpdateButtonClickEvent);
        window.addEventListener("beforeunload", function() {
            Book.saveAll();
        });
    },
    handleUpdateButtonClickEvent: function() {
        var formEl = document.forms["Book"];
        var slots = {isbn: formEl.isbn.value, title:formEl.title.value, year:formEl.year.value};
        Book.update(slots);
        formEl.reset();
    }
    
}