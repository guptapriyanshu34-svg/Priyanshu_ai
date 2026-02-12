export default async function handler(req, res) {
    try {
        const { prompt } = JSON.parse(req.body);

        const response = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            {
                headers: { 
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ 
                    inputs: prompt,
                    parameters: { max_new_tokens: 500, temperature: 0.7 }
                }),
            }
        );

        const result = await response.json();
        // Hugging Face kabhi kabhi array bhejta hai, hum text nikalenge
        const reply = result[0]?.generated_text || "SYSTEM_ERROR: No response from AI.";
        
        res.status(200).json({ reply: reply });

    } catch (error) {
        res.status(500).json({ error: "Hacker_Core: Server Offline." });
    }
}
