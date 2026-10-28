import { Recipe } from '../types';

export const RECIPES_DATABASE: Recipe[] = [
  {
    id: 'paneer-quinoa-bowl',
    title: 'Warm Herb-Spiced Paneer & Quinoa Power Bowl',
    description: 'Crisp golden paneer cubes tossed with steamed fluffy quinoa, roasted bell peppers, baby spinach, and a zesty lemon-tahini dressing.',
    category: 'lunch',
    subcategories: ['high-protein', 'vegetarian', 'indian'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servingsDefault: 2,
    caloriesPerServing: 420,
    proteinPerServing: 24,
    carbsPerServing: 38,
    fatPerServing: 18,
    fiberPerServing: 7,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Fresh Paneer (diced into cubes)', amount: 160, unit: 'g', note: 'Can substitute with extra-firm tofu for vegan' },
      { name: 'Dry Quinoa (rinsed well)', amount: 90, unit: 'g' },
      { name: 'Fresh Baby Spinach leaves', amount: 80, unit: 'g' },
      { name: 'Red Bell Pepper (sliced thin)', amount: 1, unit: 'medium' },
      { name: 'Extra Virgin Olive Oil', amount: 1, unit: 'tbsp' },
      { name: 'Ground Cumin & Turmeric', amount: 0.5, unit: 'tsp each' },
      { name: 'Fresh Lemon Juice', amount: 1.5, unit: 'tbsp' },
      { name: 'Roasted Sunflower / Pumpkin Seeds', amount: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Rinse quinoa thoroughly and simmer in 180ml lightly salted water for 14 minutes until tender and spiraled. Fluff with fork.',
      'Heat 1/2 tbsp olive oil in a non-stick skillet over medium-high heat. Add paneer cubes dusted with turmeric, cumin, and sea salt. Sauté 4-5 minutes until edges are golden.',
      'In the same warm pan, quickly toss the sliced bell peppers and baby spinach until just wilted (around 90 seconds).',
      'Layer warm quinoa into two bowls. Top with sautéed greens, roasted pepper slices, and golden paneer cubes.',
      'Whisk remaining olive oil, lemon juice, salt, and pepper; drizzle generously over bowls. Sprinkle with roasted seeds.'
    ],
    nutritionTips: 'Delivers a complete amino acid profile combining quinoa and paneer, alongside rich bioavailable calcium and iron boosted by vitamin C from the bell pepper and lemon dressing.'
  },
  {
    id: 'berry-chia-oats',
    title: 'Antioxidant Berry & Chia Overnight Rolled Oats',
    description: 'Heart-healthy rolled oats slow-soaked in almond milk with chia seeds, Ceylon cinnamon, topped with fresh raspberries, blueberries, and sliced almonds.',
    category: 'breakfast',
    subcategories: ['vegetarian', 'vegan', 'quick-meal'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    servingsDefault: 1,
    caloriesPerServing: 345,
    proteinPerServing: 13,
    carbsPerServing: 52,
    fatPerServing: 10,
    fiberPerServing: 11,
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Old-Fashioned Rolled Oats', amount: 50, unit: 'g' },
      { name: 'Unsweetened Almond Milk or Soy Milk', amount: 180, unit: 'ml' },
      { name: 'Whole Chia Seeds', amount: 12, unit: 'g' },
      { name: 'Fresh Mixed Berries (Blueberries & Raspberries)', amount: 75, unit: 'g' },
      { name: 'Raw Sliced Almonds', amount: 10, unit: 'g' },
      { name: 'Pure Vanilla Extract & Ground Cinnamon', amount: 0.5, unit: 'tsp each' },
      { name: 'Pure Maple Syrup or Raw Honey (optional)', amount: 1, unit: 'tsp' }
    ],
    instructions: [
      'In a wide-mouth glass mason jar, combine rolled oats, chia seeds, cinnamon, and a pinch of salt.',
      'Pour in the almond milk and vanilla extract. Stir vigorously until chia seeds are distributed and not clumped at the base.',
      'Seal tightly with lid and refrigerate overnight (or at least 4 hours) allowing the beta-glucan and chia mucilage to create a creamy pudding texture.',
      'Before serving, stir well. Top with vibrant fresh berries and crunchy sliced almonds.'
    ],
    nutritionTips: 'Overnight soaking preserves delicate water-soluble B vitamins while gelatinous soluble fiber stabilizes morning glycemic curve and optimizes gut transit.'
  },
  {
    id: 'moong-dal-khichdi',
    title: 'Soothing Ayurvedic Moong Dal & Brown Rice Khichdi',
    description: 'Gentle, comforting Indian one-pot superfood prepared with yellow split moong dal, whole spices, cumin seeds, ginger, and fresh cilantro.',
    category: 'dinner',
    subcategories: ['vegetarian', 'vegan', 'indian', 'quick-meal'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    servingsDefault: 3,
    caloriesPerServing: 290,
    proteinPerServing: 12,
    carbsPerServing: 48,
    fatPerServing: 5,
    fiberPerServing: 8,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Split Yellow Moong Dal (soaked 20 mins)', amount: 100, unit: 'g' },
      { name: 'Brown Basmati Rice', amount: 80, unit: 'g' },
      { name: 'Ghee or Cold-Pressed Mustard/Sesame Oil', amount: 1, unit: 'tbsp' },
      { name: 'Cumin Seeds (Jeera)', amount: 1, unit: 'tsp' },
      { name: 'Fresh Ginger (grated)', amount: 1, unit: 'inch' },
      { name: 'Turmeric Powder & Asafoetida (Hing)', amount: 0.5, unit: 'tsp' },
      { name: 'Fresh Spinach or Green Peas', amount: 80, unit: 'g' },
      { name: 'Filtered Water', amount: 750, unit: 'ml' }
    ],
    instructions: [
      'Rinse dal and rice together until water runs clear. Soak for 20 minutes to reduce phytates.',
      'Heat ghee or oil in a pressure cooker or deep pot. Crackle cumin seeds and add a tiny pinch of hing and grated ginger.',
      'Add turmeric and toss drained dal and rice for 60 seconds to toast slightly in the aromatics.',
      'Pour 750ml water and season with salt. Add spinach or peas. Cover and cook (3 whistles on medium, or simmer covered for 22 mins).',
      'Stir gently to a porridge-like consistency. Garnish with chopped fresh cilantro and a squeeze of fresh lime juice.'
    ],
    nutritionTips: 'Considered the premier detox and restorative meal in Indian nutrition science; provides 100% of complementary limiting amino acids with minimal gastrointestinal strain.'
  },
  {
    id: 'lemon-herb-salmon',
    title: 'Pan-Seared Wild Salmon with Steamed Garlic Asparagus',
    description: 'Rich in marine Omega-3 fatty acids, paired with vibrant crisp-tender asparagus spears and a dill-lemon reduction.',
    category: 'dinner',
    subcategories: ['high-protein'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    servingsDefault: 2,
    caloriesPerServing: 380,
    proteinPerServing: 36,
    carbsPerServing: 8,
    fatPerServing: 22,
    fiberPerServing: 3.5,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Wild Salmon Fillets (skin-on)', amount: 2, unit: 'fillets (160g each)' },
      { name: 'Fresh Asparagus (woody ends trimmed)', amount: 200, unit: 'g' },
      { name: 'Garlic cloves (minced)', amount: 3, unit: 'cloves' },
      { name: 'Extra Virgin Olive Oil', amount: 1, unit: 'tbsp' },
      { name: 'Lemon (juiced and zested)', amount: 1, unit: 'fruit' },
      { name: 'Fresh Chopped Dill & Black Pepper', amount: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Pat salmon fillets dry with paper towels. Season flesh side with coarse sea salt, freshly cracked pepper, and lemon zest.',
      'Heat olive oil in a heavy stainless steel or cast iron skillet over medium-high heat until shimmering.',
      'Place salmon skin-side down. Press gently for 10 seconds to keep skin flat. Cook undisturbed for 5-6 minutes until skin is golden and crisp.',
      'Flip gently and cook for an additional 2-3 minutes until center is just opaque pink.',
      'In the same skillet alongside salmon, flash-sauté asparagus and minced garlic for 3 minutes until tender-crisp. Spoon lemon juice and chopped dill over salmon before serving.'
    ],
    nutritionTips: 'Rich in anti-inflammatory EPA and DHA omega-3 fats which actively reduce systemic vascular inflammation and enhance neuronal signaling.'
  },
  {
    id: 'chickpea-avocado-salad',
    title: 'Mediterranean Crunchy Chickpea & Avocado Salad',
    description: 'Protein-packed boiled chickpeas combined with creamy avocado cubes, crisp English cucumbers, cherry tomatoes, and kalamata olives.',
    category: 'lunch',
    subcategories: ['high-protein', 'vegetarian', 'vegan', 'quick-meal'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    servingsDefault: 2,
    caloriesPerServing: 360,
    proteinPerServing: 14,
    carbsPerServing: 36,
    fatPerServing: 19,
    fiberPerServing: 12,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Cooked Chickpeas (rinsed and drained)', amount: 240, unit: 'g' },
      { name: 'Ripe Hass Avocado (diced)', amount: 1, unit: 'medium' },
      { name: 'Cherry Tomatoes (halved)', amount: 120, unit: 'g' },
      { name: 'English Cucumber (diced)', amount: 100, unit: 'g' },
      { name: 'Red Onion (finely diced)', amount: 30, unit: 'g' },
      { name: 'Fresh Flat-Leaf Parsley (chopped)', amount: 20, unit: 'g' },
      { name: 'Cold-Pressed Olive Oil & Apple Cider Vinegar', amount: 1, unit: 'tbsp each' }
    ],
    instructions: [
      'In a large mixing bowl, combine rinsed chickpeas, diced cucumber, halved cherry tomatoes, and red onion.',
      'Gently fold in the diced avocado chunks so they remain intact.',
      'Whisk olive oil, apple cider vinegar, a pinch of sea salt, oregano, and black pepper.',
      'Pour dressing over salad, add fresh flat-leaf parsley, and toss gently until glistening.'
    ],
    nutritionTips: 'Offers massive 12g dietary fiber per portion, feeding healthy bifidobacteria while healthy oleic monounsaturated fats maximize carotene uptake from tomatoes.'
  },
  {
    id: 'tofu-broccoli-stirfry',
    title: 'Sesame Ginger Tofu & Vibrant Broccoli Stir-Fry',
    description: 'Crispy pan-browned organic firm tofu cubes and crunchy broccoli florets tossed in a light ginger-tamari glaze with toasted sesame.',
    category: 'dinner',
    subcategories: ['high-protein', 'vegetarian', 'vegan', 'quick-meal'],
    prepTimeMinutes: 12,
    cookTimeMinutes: 14,
    servingsDefault: 2,
    caloriesPerServing: 310,
    proteinPerServing: 22,
    carbsPerServing: 18,
    fatPerServing: 16,
    fiberPerServing: 6,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Firm Tofu (pressed and cubed)', amount: 250, unit: 'g' },
      { name: 'Fresh Broccoli Florets', amount: 250, unit: 'g' },
      { name: 'Toasted Sesame Oil', amount: 1, unit: 'tbsp' },
      { name: 'Low-Sodium Tamari / Soy Sauce', amount: 1.5, unit: 'tbsp' },
      { name: 'Fresh Minced Ginger & Garlic', amount: 1, unit: 'tbsp each' },
      { name: 'Toasted White Sesame Seeds', amount: 1, unit: 'tsp' },
      { name: 'Green Scallions (sliced)', amount: 2, unit: 'stalks' }
    ],
    instructions: [
      'Press excess moisture from tofu with clean kitchen towels. Cut into 2cm cubes.',
      'Heat half the sesame oil in a wok or large pan. Sear tofu on medium-high until golden crust forms on all sides (6-7 mins). Transfer to a plate.',
      'Add remaining oil to wok. Toss in broccoli florets and splash 2 tbsp water; steam-fry for 3-4 minutes until vibrant green and tender-crisp.',
      'Add minced garlic and ginger, cooking for 30 seconds until fragrant.',
      'Return tofu to pan, pour tamari, and toss vigorously. Finish with scallions and sesame seeds.'
    ],
    nutritionTips: 'Firm tofu provides complete soy isoflavones and bioavailable calcium, while rapid flash-cooking broccoli preserves heat-sensitive sulforaphane and Vitamin C.'
  },
  {
    id: 'steamed-idli-sambar',
    title: 'Traditional Steamed Idli with High-Fiber Vegetable Sambar',
    description: 'Soft cloud-like fermented idlis served with a fragrant toor dal stew packed with drumstick, carrots, bottle gourd, and shallots.',
    category: 'breakfast',
    subcategories: ['vegetarian', 'vegan', 'indian'],
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servingsDefault: 2,
    caloriesPerServing: 320,
    proteinPerServing: 14,
    carbsPerServing: 58,
    fatPerServing: 3.5,
    fiberPerServing: 9,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Fermented Idli Batter (Rice + Urad dal)', amount: 240, unit: 'g' },
      { name: 'Toor Dal (Split Pigeon Pea, boiled soft)', amount: 100, unit: 'g' },
      { name: 'Mixed Vegetables (Drumstick, Carrot, Pumpkin)', amount: 150, unit: 'g' },
      { name: 'Tamarind Pulp', amount: 1, unit: 'tbsp' },
      { name: 'Sambar Spice Powder', amount: 1.5, unit: 'tsp' },
      { name: 'Mustard Seeds & Curry Leaves', amount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Grease idli steamer plates lightly with coconut oil. Spoon fermented batter into cavities and steam for 10-12 minutes until toothpick comes out clean.',
      'In a pot, boil mixed diced vegetables with turmeric and salt until tender.',
      'Add boiled mashed toor dal, tamarind extract, and aromatic sambar powder. Simmer for 8 minutes to blend flavors.',
      'Perform traditional tadka: crackle mustard seeds, dried red chilli, and fresh curry leaves in a hot teaspoon of oil; pour sizzle over the sambar.',
      'Serve warm idlis dipped directly into steaming vegetable sambar.'
    ],
    nutritionTips: 'Naturally oil-free steaming retains vitamins; traditional fermentation activates gut probiotics and reduces anti-nutrients.'
  },
  {
    id: 'spinach-egg-scramble',
    title: 'Greek Feta & Baby Spinach Soft Egg Scramble',
    description: 'Fluffy whole eggs scrambled gently over low heat with wilted baby spinach leaves, crumbled feta, cherry tomatoes, and black pepper.',
    category: 'breakfast',
    subcategories: ['high-protein', 'vegetarian', 'quick-meal'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 6,
    servingsDefault: 1,
    caloriesPerServing: 280,
    proteinPerServing: 21,
    carbsPerServing: 4,
    fatPerServing: 19,
    fiberPerServing: 2,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Fresh Farm Eggs', amount: 3, unit: 'large' },
      { name: 'Baby Spinach leaves', amount: 60, unit: 'g' },
      { name: 'Crumbled Feta or Fresh Paneer', amount: 25, unit: 'g' },
      { name: 'Cherry Tomatoes (quartered)', amount: 4, unit: 'pieces' },
      { name: 'Extra Virgin Olive Oil or Butter', amount: 1, unit: 'tsp' },
      { name: 'Cracked Black Pepper & Sea Salt', amount: 0.25, unit: 'tsp' }
    ],
    instructions: [
      'Crack eggs into a bowl and whisk vigorously with a fork for 30 seconds until completely uniform.',
      'Melt butter or warm oil in a non-stick pan over gentle low-medium heat. Add baby spinach and tomatoes, wilting for 60 seconds.',
      'Pour in whisked eggs. Let sit for 15 seconds, then draw wooden spatula slowly from outer edge inward to form large, velvety soft curds.',
      'Just before eggs are fully set, fold in crumbled feta cheese and remove pan immediately from heat.',
      'Plate while glossy and finish with freshly cracked black pepper.'
    ],
    nutritionTips: 'High biological value protein with essential choline for neurological function, paired with lutein from egg yolks and folate from dark leafy spinach.'
  }
];
