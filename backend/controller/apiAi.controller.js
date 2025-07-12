// Inside your controller (apiAi.controller.js)

import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // make sure this is set in your .env file
});


export const generateBlogSuggestions = async (req, res) => {
  try {
    const { idea } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `You are a blog writing assistant. Given a short idea, generate:
- A blog title (3–6 words)
- 3 bullet points (each 2–3 lines)

Respond ONLY in strict JSON format like:
{
  "title": "Your Blog Title",
  "points": [
    "Bullet point 1",
    "Bullet point 2",
    "Bullet point 3"
  ]
}`,
        },
        {
          role: "user",
          content: idea,
        },
      ],
      temperature: 0.7,
    });

    const raw = completion.choices[0]?.message?.content;

    // ✅ Extract valid JSON using RegEx
    const jsonMatch = raw.match(/{[\s\S]+}/);
    if (!jsonMatch) throw new Error("No valid JSON in AI response");

    const parsed = JSON.parse(jsonMatch[0]);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("🔥 Error generating blog suggestion:", error);
    return res.status(500).json({ error: "Something went wrong while generating suggestion" });
  }
};
