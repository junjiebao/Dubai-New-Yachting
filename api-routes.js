const express = require('express');
const router = express.Router();

// 获取文章列表
router.get('/articles', async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    try {
        const articles = await Article.find({ 
            category,
            status: 'published' 
        })
        .sort({ publishDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
        
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 获取展会信息
router.get('/shows', async (req, res) => {
    const { upcoming = true } = req.query;
    try {
        const shows = await Show.find({
            startDate: upcoming ? { $gte: new Date() } : { $lt: new Date() }
        }).sort({ startDate: 1 });
        
        res.json(shows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 获取文章详情
router.get('/articles/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: '文章不存在' });
        }
        
        // 增加阅读量
        article.viewCount += 1;
        await article.save();
        
        // 获取相关文章
        const relatedArticles = await Article.find({
            category: article.category,
            _id: { $ne: article._id }
        })
        .limit(3)
        .select('title publishDate images');

        res.json({ article, relatedArticles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 