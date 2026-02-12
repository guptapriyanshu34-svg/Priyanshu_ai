export default async function handler(req, res) {
    try {
        const { prompt } = JSON.parse(req.body);

        // Hum aisi API use karenge jo fast ho aur timeout na kare
        const response = await fetch(
            "https://api-inference.huggingface.co/models/damo-vilab/modelscope-damo-text-to-video-generation",
            {
                headers: { 
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) throw new Error("API_LIMIT");

        const result = await response.blob();
        const buffer = Buffer.from(await result.arrayBuffer());
        
        res.setHeader('Content-Type', 'video/mp4');
        res.send(buffer);

    } catch (error) {
        // Agar error aaye toh hum user ko bata denge
        res.status(500).json({ error: "Server Busy. Please wait 1 minute." });
    }
}
