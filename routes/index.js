import express from "express";
import widgetdb from "widgetdb";
import uuidv4 from "uuid/v4";

const router = express.Router();

router.get('/widgetdb/:id', (req, res) => {
  console.log('Request for ID is ' + req.params.id);
  const result = widgetdb.get(req.params.id);
  result.then((obj) => {
    if(obj) {
      res.json({
        id: req.params.id,
        value: obj
      });
    }else {
     res.status(404).send("Cannot find resource with id " + req.params.id);
    }
  }, () => {
    return next(new Error('Cannnot get from DB'));
  });
});

router.post('/widgetdb', (req, res, next) => {
  const id = uuidv4();

  if(!("value" in req.body)) {
    res.status(422).send("Could not find value in request object");
    return;
  }

  const value = req.body.value;
  const result = widgetdb.put(id, value);
  result.then(() => {
    res.json({
      id: id
    });
  }, () => {
    return next(new Error('Cannnot Save to DB'));
  });

});

router.put('/widgetdb/:id', async (req, res, next) => {
  if(!("value" in req.body)) {
    res.status(422).send("Could not find value in request object");
    return;
  }

  const result = await widgetdb.get(req.params.id);
  // console.log('Got result as ' + result);
  if(result) {
    widgetdb.put(req.params.id, req.body.value).then(() => {
      res.json({
        "id": req.params.id,
        "value" : req.body.value
      });
    }, () => {
      return next(new Error('Cannnot Save to DB'));
    });
  } else {
    res.status(400).send("Resource with id " + req.params.id + " does not exists, and hence cannot be updated");
  }
});

module.exports = router;
