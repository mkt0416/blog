
const router = require('express').Router();
const postControllers = require('../controllers/post');

//投稿を作成する
router.post('/', postControllers.createPost);

//投稿を更新する
router.put('/:id', postControllers.updatePost);

//投稿を削除する
router.delete('/:id', postControllers.deletePost);

//ある特定の投稿を取得する
router.get('/:id', postControllers.getSinglePost);

//特定の投稿にいいねを押す
router.put('/:id/like', postControllers.likePost);

//タイムラインの投稿を取得する
router.get('/timeline/:userId', postControllers.getTimeline);

//プロフィール専用のタイムラインの取得
router.get('/profile/:username', postControllers.getTimelineProfile);

//全ての投稿を取得
router.get('/', postControllers.getAllPosts);

module.exports = router;