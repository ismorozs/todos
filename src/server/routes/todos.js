const express = require('express');
const router = express.Router();
const multer = require('multer');
const { resize: resizeImage } = require('../helpers/image');
const { doIf, getAbsImagePath, getServerImagePath } = require('../../helpers/index');
const settings = require('../../../settings');
const statuses = require('../../constants/statuses').default;

module.exports = (app) => app.use(router);

const fileStorage = multer.diskStorage({
  destination: settings.ABS_IMAGES_FOLDER,
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload  = multer({
  storage: fileStorage
});

const Todos = require('../models/todos');

router.get('/todos', (req, res) => {
  Promise.resolve()
    .then(() => {
      const { tasks, todosLength } = Todos.get(req.query);
      res.json({ message: { tasks, total_task_count: todosLength }, status: statuses.OK });
    })
    .catch((e) => handleError(e, res));
});

router.post('/todos/create', upload.single('image'), (req, res) => {
  tryToSaveImage(req.file)
    .then((filepath) => {
      Todos.create({ ...req.body, image: filepath });
      res.json({ status: statuses.OK })
    })
    .catch((e) => handleError(e, res));
});

router.post('/todos/edit/:id', upload.single('image'), (req, res) => {
  tryToSaveImage(req.file)
    .then((filepath) => {

      if (filepath) {
        req.body.image = filepath;
      }

      const todo = Todos.update(+req.params.id, req.body);
      res.json({ status: statuses.OK, message: todo });
    })
    .catch((e) => handleError(e, res));
});

router.delete('/todos/:id', (req, res) => {
  try {
    Todos.remove(+req.params.id);
    res.json({ status: statuses.OK });
  } catch (e) {
    handleError(e, res);
  }
});

function tryToSaveImage (file) {
  return doIf(file, () => {
    return resizeImage(
      getAbsImagePath(file.originalname),
      150,
      null
    ).then(() => getServerImagePath(file.originalname));
  }, '');
}

function handleError (e, res) {
  if (e.message) {
    res.json({ status: e.message, message: e.details });
    return;
  }

  res.json({ status: statuses.ERROR });  
}
