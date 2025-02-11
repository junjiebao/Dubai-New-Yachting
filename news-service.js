class NewsService {
    constructor() {
        this.translator = new Translator(process.env.TRANSLATE_API_KEY);
        this.contentFilter = new ContentFilter();
        this.imageProcessor = new ImageProcessor();
    }

    async processArticle(article) {
        // 翻译内容
        const translatedTitle = await this.translator.translate(article.title);
        const translatedContent = await this.translator.translate(article.content);

        // 处理图片
        const processedImages = await Promise.all(
            article.images.map(img => this.imageProcessor.processImage(img))
        );

        // 内容过滤
        const filteredArticle = await this.contentFilter.filterContent({
            ...article,
            title: translatedTitle,
            content: translatedContent,
            images: processedImages
        });

        return filteredArticle;
    }

    async saveArticle(article) {
        // 保存到数据库
        const response = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        });

        return response.json();
    }
} 