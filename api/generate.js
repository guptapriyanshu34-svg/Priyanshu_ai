export default async function handler(req, res) {
    try {
        const body = JSON.parse(req.body);
        const prompt = body.prompt;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-video-diffusion-img2vid-xt",
            {
                headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        const result = await response.blob();
        res.setHeader('Content-Type', 'video/mp4');
        res.send(Buffer.from(await result.arrayBuffer()));
    } catch (error) {
        res.status(500).json({ error: "Generation Failed" });
    }
}

