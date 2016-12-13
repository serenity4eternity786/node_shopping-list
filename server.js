var express = require('express');

var Storage = {
  add: function(name) {
    var item = {
      name: name,
      id: this.setId
    };
    this.items.push(item);
    this.setId += 1;
    return item;
  },
  delete: function(id) {

    if (!this.items[id]) {
      //Id doesn't exist, return an error
    }
    else {
      //delete this.items[id];
      return this.items.splice(id, 1);
    }
    return this.items;
  },
  update: function(id, name) {

    var msg;
    if (this.items[id]) {
      //item already exists, update it
      this.items[id].name = name;
    }
    else {
      //no such item # exists, create it
      storage.add(name);
    }
    return this.items;
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

app.delete('/items/:id', jsonParser, function(request, response) {
  if (!request.body) {
    return response.sendStatus(400);
  }

  var item = storage.delete(request.params.id);

  response.status(200).json(item);

});

app.put('items/:id', function(request, response) {
  if (!req.body) {
    return response.sendStatus(400);
  }
  var item = storage.put(req.params.id, req.body.name);
  return response.sendStatus(201);
});

app.listen(process.env.PORT || 8080, process.env.IP);