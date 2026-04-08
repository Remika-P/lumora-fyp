export const QUESTIONS = [

{
id: 1,
question: "Which room are you shopping furniture for?",
options: [
{ text: "Living Room", scores: { bohemian: 1, modern: 1, scandinavian: 1 } },
{ text: "Bedroom", scores: { japandi: 2, minimalist: 2, scandinavian: 1 } },
{ text: "Dining Room", scores: { farmhouse: 2, traditional: 2 } },
{ text: "Home Office", scores: { minimalist: 2, modern: 2, industrial: 1 } }
]
},

{
id: 2,
question: "What is the main purpose of this space?",
options: [
{ text: "Work / Productivity", scores: { minimalist: 3, japandi: 2, modern: 1 } },
{ text: "Hosting & Socializing", scores: { modern: 3, industrial: 2, bohemian: 1 } },
{ text: "Rest & Privacy", scores: { scandinavian: 3, japandi: 2 } },
{ text: "Relaxation & unwinding", scores: { bohemian: 3, coastal: 2, farmhouse: 1 } }
]
},

{
id: 3,
question: "How many people will regularly use this space?",
options: [
{ text: "1 Person", scores: { minimalist: 3, japandi: 2 } },
{ text: "2–3 People", scores: { scandinavian: 2, modern: 1 } },
{ text: "Family / many users", scores: { farmhouse: 3, traditional: 2, scandinavian: 1 } }
]
},

{
id: 4,
question: "Do you need multi-functional furniture (e.g., sofa bed, storage table)?",
options: [
{ text: "Yes", scores: { minimalist: 4, japandi: 3, modern: 2 } },
{ text: "No", scores: { traditional: 2, bohemian: 2, midcentury: 1 } }
]
},

{
id: 5,
question: "Which interior style do you naturally feel most attracted to?",
options: [
{ text: "Minimalist", scores: { minimalist: 6 }, image: "/styles/minimalist.jpg" },
{ text: "Japandi", scores: { japandi: 6 }, image: "/styles/japandi.jpg" },
{ text: "Scandinavian", scores: { scandinavian: 6 }, image: "/styles/scandinavian.jpg" },
{ text: "Farmhouse", scores: { farmhouse: 6 }, image: "/styles/farmhouse.jpg" },
{ text: "Bohemian", scores: { bohemian: 6 }, image: "/styles/bohemian.jpg" },
{ text: "Traditional", scores: { traditional: 6 }, image: "/styles/traditional.jpg" },
{ text: "Industrial", scores: { industrial: 6 }, image: "/styles/industrial.jpg" },
{ text: "Coastal", scores: { coastal: 6 }, image: "/styles/coastal.jpg" },
{ text: "Mid-Century Modern", scores: { midcentury: 6 }, image: "/styles/midcentury.jpg" },
{ text: "Modern", scores: { modern: 6 }, image: "/styles/modern.jpg" }
]
},

{
id: 6,
question: "How do you want your space to feel emotionally?",
options: [
{ text: "Calm, clean and uncluttered", scores: { minimalist: 4, japandi: 3 } },
{ text: "Warm, cozy and inviting", scores: { scandinavian: 4, farmhouse: 3 } },
{ text: "Creative, vibrant and expressive", scores: { bohemian: 5 } },
{ text: "Elegant, formal and timeless", scores: { traditional: 5 } },
{ text: "Bold, edgy and urban", scores: { industrial: 5 } },
{ text: "Light, airy and relaxed", scores: { coastal: 5 } },
{ text: "Stylish, sleek and impressive", scores: { modern: 4, midcentury: 3 } }
]
},

{
id: 7,
question: "Do you prefer symmetrical and highly organized layouts?",
options: [
{ text: "Yes", scores: { traditional: 3, modern: 2, minimalist: 1 } },
{ text: "Neutral", scores: { scandinavian: 2, midcentury: 1 } },
{ text: "No", scores: { bohemian: 3, industrial: 1 } }
]
},

{
id: 8,
question: "How decorated should the space look?",
options: [
{ text: "Very minimal", scores: { minimalist: 4, japandi: 3 } },
{ text: "Moderately styled", scores: { scandinavian: 2, modern: 2 } },
{ text: "Highly decorated", scores: { bohemian: 4, traditional: 2 } },
{ text: "Raw / unfinished", scores: { industrial: 5 } }
]
},

{
id: 9,
question: "Which color environment attracts you most?",
options: [
{ text: "Soft neutrals & whites", scores: { minimalist: 3, scandinavian: 3, japandi: 2 } },
{ text: "Warm earthy tones", scores: { farmhouse: 3, bohemian: 2, coastal: 1 } },
{ text: "Dark academic tones", scores: { traditional: 3, industrial: 2 } },
{ text: "Bold energetic colors", scores: { bohemian: 4, midcentury: 2 } },
{ text: "Classic rich tones", scores: { traditional: 4 } }
]
},

{
id: 10,
question: "Which material feels most appealing?",
options: [
{ text: "Light wood & natural finishes", scores: { scandinavian: 3, japandi: 3, minimalist: 2 } },
{ text: "Metal / Concrete / Glass", scores: { industrial: 4, modern: 2 } },
{ text: "Upholstered comfort fabrics", scores: { farmhouse: 3, traditional: 2, scandinavian: 1 } },
{ text: "Decorative carved wood", scores: { traditional: 4 } },
{ text: "Mixed organic textures", scores: { bohemian: 4, coastal: 2 } }
]
},

{
id: 11,
question: "What type of furniture shapes do you prefer?",
options: [
{ text: "Clean straight lines", scores: { minimalist: 3, modern: 3, japandi: 2 } },
{ text: "Rounded cozy shapes", scores: { scandinavian: 3, farmhouse: 2 } },
{ text: "Ornate detailed designs", scores: { traditional: 4 } },
{ text: "Rugged chunky forms", scores: { industrial: 4 } },
{ text: "Unique artistic silhouettes", scores: { bohemian: 4, midcentury: 2 } }
]
},

{
id: 12,
question: "How often do you host guests?",
options: [
{ text: "Frequently", scores: { modern: 3, industrial: 2, bohemian: 1 } },
{ text: "Sometimes", scores: { scandinavian: 2, farmhouse: 1 } },
{ text: "Rarely", scores: { minimalist: 3, japandi: 2 } }
]
},

{
id: 13,
question: "Do you have pets or young children?",
options: [
{ text: "Yes", scores: { farmhouse: 3, scandinavian: 2, coastal: 1 } },
{ text: "No", scores: { minimalist: 2, industrial: 1 } }
]
},

{
id: 14,
question: "Do you work from home?",
options: [
{ text: "Yes full time", scores: { minimalist: 4, japandi: 3, modern: 2 } },
{ text: "Occasionally", scores: { scandinavian: 2, midcentury: 1 } },
{ text: "No", scores: { bohemian: 2, farmhouse: 1 } }
]
},

{
id: 15,
question: "How important is easy maintenance of furniture?",
options: [
{ text: "Extremely important", scores: { minimalist: 3, japandi: 3, modern: 1 } },
{ text: "Moderately", scores: { scandinavian: 2, farmhouse: 2 } },
{ text: "Not important", scores: { bohemian: 3, traditional: 2 } }
]
},

{
id: 16,
question: "What is your approximate furniture budget?",
options: [
{ text: "Low", scores: { farmhouse: 2, bohemian: 2 } },
{ text: "Medium", scores: { scandinavian: 2, modern: 2 } },
{ text: "High", scores: { traditional: 3, modern: 2, midcentury: 1 } }
]
},

{
id: 17,
question: "What is your scale of purchase?",
options: [
{ text: "Single item", scores: { minimalist: 2, midcentury: 1 } },
{ text: "Few items", scores: { modern: 2, scandinavian: 1 } },
{ text: "Full room design", scores: { farmhouse: 3, traditional: 2 } }
]
},

{
id: 18,
question: "What influences your decision most?",
options: [
{ text: "Price Value", scores: { farmhouse: 2, bohemian: 1 } },
{ text: "Long-term quality", scores: { scandinavian: 2, japandi: 2, traditional: 1 } },
{ text: "Brand image", scores: { modern: 3, midcentury: 1 } },
{ text: "Visual appeal", scores: { bohemian: 3, coastal: 2 } }
]
},

{
id: 19,
question: "Where do you explore design ideas?",
options: [
{ text: "Instagram", scores: { bohemian: 2, modern: 1 } },
{ text: "Pinterest", scores: { scandinavian: 3, bohemian: 1 } },
{ text: "Real homes / friends", scores: { farmhouse: 2, coastal: 1 } },
{ text: "Designers", scores: { traditional: 2, modern: 1 } },
{ text: "Online stores", scores: { minimalist: 2, modern: 1 } }
]
},

{
id: 20,
question: "Select the room you feel most connected to:",
options: [
{ text: "Minimalist Interior Style", scores: { minimalist: 5 }, image: "/styles/minimalist.jpg" },
{ text: "Japandi Interior Style", scores: { japandi: 5 }, image: "/styles/japandi.jpg" },
{ text: "Scandinavian Interior Style", scores: { scandinavian: 5 }, image: "/styles/scandinavian.jpg" },
{ text: "Farmhouse Interior Style", scores: { farmhouse: 5 }, image: "/styles/farmhouse.jpg" },
{ text: "Bohemian Interior Style", scores: { bohemian: 5 }, image: "/styles/bohemian.jpg" },
{ text: "Traditional Interior Style", scores: { traditional: 5 }, image: "/styles/traditional.jpg" },
{ text: "Industrial Interior Style", scores: { industrial: 5 }, image: "/styles/industrial.jpg" },
{ text: "Coastal Interior Style", scores: { coastal: 5 }, image: "/styles/coastal.jpg" },
{ text: "Mid-Century Modern Style", scores: { midcentury: 5 }, image: "/styles/midcentury.jpg" },
{ text: "Modern Interior Style", scores: { modern: 5 }, image: "/styles/modern.jpg" }
]
}

]