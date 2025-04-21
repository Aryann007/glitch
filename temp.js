const generateRoadmap = async (data) => {

    const request = await fetch("https://mention.com/wp-json/openai-proxy/v1/generate", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/json",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "Referer": "https://mention.com/en/linkedin-post-generator/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"model\":\"gpt-4o-mini\",\"messages\":[{\"role\":\"user\",\"content\":\"" + encodeURIComponent(data) + "\"}],\"temperature\":0.7,\"max_tokens\":256,\"top_p\":1,\"frequency_penalty\":0,\"presence_penalty\":0}",
        "method": "POST"
    });
    const response = await request.json();
    console.log(`Response: ${JSON.stringify(response, null, 4)}`);
}

(async () => {
    await generateRoadmap("Write an engaging LinkedIn post.\nTone: professional.\nTopic: Generate an AI roadmap which include everything like studio labelling, hugging face transformer, etc..")
})();
