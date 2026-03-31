import express from 'express';
import Groq from 'groq-sdk';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { quizAnswers } = req.body;

    if (!quizAnswers) {
      return res.status(400).json({ message: 'Quiz answers are required' });
    }

    // Find dominant style from scores
    const dominantStyle = Object.entries(quizAnswers)
      .sort((a, b) => b[1] - a[1])[0][0];

    // Get top 3 styles
    const topStyles = Object.entries(quizAnswers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([style, score]) => ({ style, score }));

    const prompt = `You are a furniture recommendation expert for an interior design platform called Lumora.

A user completed a style quiz. Here are their results:
- Dominant style: ${dominantStyle}
- Top styles with scores: ${JSON.stringify(topStyles)}
- Full style scores: ${JSON.stringify(quizAnswers)}

Based on their style profile, recommend exactly 6 furniture products they should buy.
Each product must perfectly match their ${dominantStyle} style.

Return ONLY a valid JSON array with no extra text, no markdown, no code blocks. Just the raw JSON array:
[
  {
    "name": "product name",
    "brand": "brand name",
    "category": "e.g. Sofa, Desk, Bookshelf, Bed, Chair, Table",
    "priceRange": "e.g. $200 - $400",
    "style": "${dominantStyle}",
    "reason": "one sentence explaining why this matches their quiz results",
    "searchQuery": "exact search terms to find this on Amazon",
    "amazonUrl": "https://www.amazon.com/s?k=SEARCH+TERMS+HERE",
    "site": "Amazon"
  }
]

Make the searchQuery specific and realistic. Replace spaces with + in the amazonUrl.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2000,
    });

    const rawResponse = completion.choices[0]?.message?.content;

    // Parse the JSON from Groq's response
    let recommendations;
    try {
      // Strip any accidental markdown fences
      const cleaned = rawResponse.replace(/```json|```/g, '').trim();
      recommendations = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('Groq JSON parse error:', parseError);
      return res.status(500).json({ message: 'Failed to parse recommendations from AI' });
    }

    res.json({
      dominantStyle,
      topStyles,
      recommendations,
    });

  } catch (error) {
    console.error('Recommendations error:', error.message);  // should already be there
    res.status(500).json({ message: error.message });
  }
});

export default router;