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
                bookProps = Object.keys(book); 
                //loop through inputs and if a bookProps name matches the 
                //input name, set the input value to the value of the book property i.e. book[bookPropKey]
                //then remove the matching bookProps value from the bookProps list to optimize run time.
                for(var inp of formEl.getElementsByTagName("input")) {
                    //By using indexOf, we search the list once and get 1) if it matches and 2) the splice value
                    var inpName = inp.getAttribute("name");
                    var index = bookProps.indexOf(inpName);
                    if (index !== -1) {
                        if (inpName == "favorite") {
                            if (book[inpName] == true) {
                                inp.checked = true;
                            } else {
                                inp.checked = false;
                            }                            
                        } else {
                            inp.value = book[inpName];
                        }
                        bookProps.splice(index, 1);
                    }
                }       
            } else {
                for(var inp of formEl.getElementsByTagName("input")) {
                    inp.value = "";
                }
            }
        });
        saveButton.addEventListener("click", pl.view.updateBook.handleUpdateButtonClickEvent);
        window.addEventListener("beforeunload", function() {
            Book.saveAll();
        });
    },
    handleUpdateButtonClickEvent: function() {
        var formEl = document.forms["Book"];
        var isFavorite = false;
        if(formEl.favorite.checked) {
            isFavorite = true;
        }
        var slots = {isbn: formEl.isbn.value, title:formEl.title.value, year:formEl.year.value, author: formEl.author.value, favorite:isFavorite};
        Book.update(slots);
        formEl.reset();
    }
    
}