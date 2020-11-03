function Book(slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
    this.author = slots.author;
    this.favorite = slots.favorite;
}

Book.instances = {}; 

Book.convertRow2Obj = function(row) {
    return new Book(row);
}

Book.loadAll = function() {
    //Loads all managed Book instances from persistent data storage.
    var bookTableString="";
    //try to get from local storage
    try {
        if(localStorage["bookTable"]){
            bookTableString = localStorage["bookTable"];
        }
    } catch (e) {
        alert("Error when reading from local storage\n"+e)
    }
    //if successful, parse from JSON and load in Book objects
    if (bookTableString) {
        var bookTable = JSON.parse(bookTableString);
        var keys = Object.keys(bookTable);
        console.log(keys.length + " books were loaded.\n");
        for (key of keys) {
            Book.instances[key] = Book.convertRow2Obj(bookTable[key]);
        }
    }
}
Book.saveAll = function() {
    //Saves all managed Book instances to the persistent data storage.
    var error = false;
    try {
        bookTableString = JSON.stringify(Book.instances);
        localStorage["bookTable"] = bookTableString;
    } catch (e) {
        alert("Error when writing to Local Storage.\n" + e);
        error = true
    }
    if(!error) {
        const numBooks =  Object.keys(Book.instances).length;
        const bookWord = "books"
        if(numBooks == 1) {
            bookWord = "book"
        }
        console.log( numBooks + " " + bookWord + "  saved.")
    }
}
Book.add = function(slots) {
    //Creates and stores a new Book record
    var book = new Book(slots);
    Book.instances[slots.isbn] = book;
    console.log("Book " + book.isbn + " created.");
}
Book.update = function(slots) {
    //Updates an existing Book record
    var book = Book.instances[slots.isbn];
    var year = parseInt(slots.year)
    if (book.title !== slots.title) {
        book.title = slots.title;
    }
    if (book.year !== slots.year) {
        book.year = slots.year;
    }
    if (book.author !== slots.author) {
        book.author = slots.author;
    }
    if (book.favorite !== slots.favorite) {
        book.favorite = slots.favorite;
    }
    Book.instances[slots.isbn] = book
    console.log("Book " + book.isbn + " has been updated.\n")
}
Book.destroy = function(isbn) {
    //Deletes an existing Book record.
    if(Book.instances[isbn]) {
        console.log("Book " + isbn + "has been deleted.");
        delete Book.instances[isbn];
    } else {
        console.log("Book " + isbn + " does not exist in the library.\n");
    }
}
Book.clearData = function() {
    //Purges the library
    if (confirm("Do you really want to delete all book data?")) {
        localStorage["bookTable"] = "{}";
    }
}

Book.createTestData = function() {
    Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Going Postal", year:2004, author: "Terry Pratchett", favorite: true});
    Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999, author: "Unknown", favorite: false});
    Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008, author: "Douglas Hofstadter", favorite: false});
    Book.saveAll();
}
