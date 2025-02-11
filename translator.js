class Translator {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    }

    async translate(text, targetLang = 'zh-CN') {
        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    target: targetLang,
                    format: 'html'
                })
            });

            const data = await response.json();
            return data.data.translations[0].translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            return text; // 翻译失败时返回原文
        }
    }
} 