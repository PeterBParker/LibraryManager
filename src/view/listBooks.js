pl.view.listBooks = {
    setupUserInterface: function() {
        var tableBodyEl = document.querySelector("#bookTbody");
        Book.loadAll();
        var keys = Object.keys(Book.instances);
        for (var key of keys) {
            row = tableBodyEl.insertRow();
            row.insertCell(-1).textContent = Book.instances[key].isbn;
            row.insertCell(-1).textContent = Book.instances[key].title;
            row.insertCell(-1).textContent = Book.instances[key].year;
        }
    }
};