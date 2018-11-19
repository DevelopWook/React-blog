const Router = require('koa-router');
const postCtrl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', postCtrl.write);
posts.get('/:id', postCtrl.checkObjectId, postCtrl.read);
posts.delete('/:id', postCtrl.checkObjectId, postCtrl.remove);
// posts.put('/:id', postCtrl.replace);
posts.patch('/:id', postCtrl.checkObjectId, postCtrl.update);

module.exports = posts;