var interests = [{
  id: 'js',
  name: 'JavaScript',
  level: 'Advanced',
  isImproving: true
}, {
  id: 'ng',
  name: 'AngularJS',
  level: 'Beginnger',
  isImproving: true
}, {
  id: 'nd',
  name: 'NodeJS',
  level: 'Intermediate',
  isImproving: false
}];

function alreadyExists(id) {
  var found = false;
  for (var i = 0; i < interests.length; i++) {
    if (interests[i].id == id) {
      found = true;
    }
  }
  return found;
}

exports.getAll = function(req, res) {
  res.json({ success: true, data: interests });
};

exports.getById = function(req, res) {
  var found = false;
  for (var i = 0; i < interests.length; i++) {
    if (interests[i].id == req.params.id) {
      found = true;
      res.json({ success: true, data: interests[i] });
    }
  }
  if (!found) {
    res.json({ success: false, message: 'Item not found' });
  }

};

exports.edit = function(req, res) {
  var found = false;
  for (var i = 0; i < interests.length; i++) {
    if (interests[i].id == req.params.id) {
      found = true;
      interests[i].id = req.body.id;
      interests[i].name = req.body.name;
      interests[i].level = req.body.level;
      interests[i].isImproving = req.body.isImproving === 'true' ? true : false;
    }
  }

  if (!found) {
    res.json({ success: false, message: 'Item not found' });
  } else {
    res.json({ success: true });
  }
};

exports.add = function(req, res) {
  if (!req.body.id || !req.body.name) {
    res.json({ success: false, message: 'Missing id or name' });
  } else if(alreadyExists(req.body.id)) {
    res.json({ success: false, message: 'Duplicate item' });
  } else {
    interests.push({
      id: req.body.id,
      name: req.body.name,
      level: req.body.level || 'Beginner',
      isImproving: typeof req.body.isImproving == 'boolean' ? req.body.isImproving : req.body.isImproving === 'true' ? true : false
    });

    res.json({ success: true });
  }
};

exports.delete =function(req, res) {
  var indexToDelete = -1;
  for (var i = 0; i < interests.length; i++) {
    if (interests[i].id == req.params.id) {
      indexToDelete = i;
    }
  }

  if (indexToDelete == -1) {
    res.json({ success: false, message: 'Item not found' });
  } else {
    interests.splice(indexToDelete, 1);
    res.json({ success: true });
  }
};
