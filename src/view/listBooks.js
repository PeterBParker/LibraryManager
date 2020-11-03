pl.view.listBooks = {
    setupUserInterface: function() {
        var tableBodyEl = document.querySelector("#bookTbody");
        Book.loadAll();
        var keys = Object.keys(Book.instances);
        for (var key of keys) {
            row = tableBodyEl.insertRow();
            for (var prop in Book.instances[key]) {
                console.log(prop);
                row.insertCell(-1).textContent = Book.instances[key][prop];
            }            
        }
    }
};