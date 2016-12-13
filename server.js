var express = require('express');

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  } 
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', function(request, response) {
    if (item) {
    return response.sendStatus(201);
  } else {
    return response.sendStatus(400);
}
});

app.put('items/:id', function(request, response) {
    if (!req.body) {
    return response.sendStatus(400);
  }
  var item = storage.put(req.params.id, req.body.name);
  return response.sendStatus(201);
});

app.listen(process.env.PORT || 8080, process.env.IP);