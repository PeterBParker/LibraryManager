function Book(slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
}

Book.instances = {}; 

Book.convertRow2Obj = function(row) {
    return new Book(row);
}

Book.loadAll = function() {
    //Loads all managed Book instances from persistent data storage.
    
}
Book.saveAll = function() {
    //Saves all managed Book instances to the persistent data storage.

}
Book.add = function() {
    //Creates and stores a new Book record

}
Book.update = function() {
    //Updates an existing Book record

}
Book.destroy = function() {
    //Deletes an existing Book record.

}
Book.clearData = function() {
    //Purges the library

}
