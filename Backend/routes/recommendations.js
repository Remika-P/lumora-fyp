import express from 'express';
import Groq from 'groq-sdk';

const router = express.Router();

const buildSearchUrl = (site, searchQuery) => {
  const keyword = searchQuery.replace(/\s+/g, '+');
  const encoded = encodeURIComponent(searchQuery);
  switch (site.toLowerCase()) {
    case 'amazon':
      return `https://www.amazon.com/s?k=${encoded}`;
    case 'wayfair':
      return `https://www.wayfair.com/keyword.php?keyword=${keyword}`;
    case 'aliexpress':
      return `https://www.aliexpress.com/w/wholesale-${keyword}.html`;
    case 'pepperfry':
  return `https://www.pepperfry.com/site_product/search?q=${encoded}`;
    default:
      return `https://www.amazon.com/s?k=${encoded}`;
  }
};


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

Based on their style profile, recommend EXACTLY 8 furniture products they should buy.
IMPORTANT: You MUST return exactly 8 products in the JSON array - no more, no less.
Each product must perfectly match their ${dominantStyle} style.
Distribute the products across these marketplaces: Amazon, Wayfair, AliExpress, and Pepperfry.

Return ONLY a valid JSON array with no extra text, no markdown, no code blocks. Just the raw JSON array with exactly 8 items:
[
  {
    "name": "product name",
    "brand": "brand name",
    "category": "e.g. Sofa, Desk, Bookshelf, Bed, Chair, Table",
    "priceRange": "e.g. $200 - $400",
    "style": "${dominantStyle}",
    "reason": "one sentence explaining why this matches their quiz results",
    "searchQuery": "exact search terms to find this product",
    "amazonUrl": "https://relevant-marketplace-link.com/search/...",
    "site": "Amazon or Wayfair or AliExpress or Pepperfry"
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
      
      // Ensure we have exactly 8 products
      if (!Array.isArray(recommendations)) {
        recommendations = [];
      }
      
      // Log if we didn't get exactly 8
      if (recommendations.length !== 8) {
        console.warn(`Expected 8 products, got ${recommendations.length}`);
      }
      
      // Ensure minimum of 8 products (truncate if more, but should request exactly 8)
      recommendations = recommendations.slice(0, 8).map((product) => ({
        ...product,
        amazonUrl: buildSearchUrl(product.site, product.searchQuery),
      }));
      
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