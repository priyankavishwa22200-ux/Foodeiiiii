import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'fruits-vegetables-rainbow',
    title: 'The Science of Eating the Rainbow: Why Plant Diversity Transmutes Longevity',
    slug: 'benefits-of-eating-fruits-and-vegetables',
    category: 'Nutrition Science',
    readTime: '6 min read',
    publishDate: 'Oct 24, 2026',
    author: {
      name: 'Dr. Evelyn Reed, PhD, RD',
      role: 'Chief Nutrition Scientist',
      avatar: 'https://images.unsplash.com/photo-1594824813584-c5a4d6f8510a?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    summary: 'Phytochemicals, polyphenols, and soluble fibers are the biochemical secrets of colorful produce that slash cellular inflammation.',
    content: [
      'When nutritionists urge you to "eat the rainbow," they are referencing a rigorous biological principle: color pigments in plants are bio-active chemical compounds called polyphenols, carotenoids, and anthocyanins that provide direct systemic protection.',
      'Red plants like tomatoes, red bell peppers, and strawberries are rich in lycopene and anthocyanins, which protect vascular endothelium from oxidative stress and help lower arterial stiffness.',
      'Deep greens such as spinach, kale, and broccoli deliver lutein, zeaxanthin, and sulforaphane. These molecules do not just protect vision; they activate the Nrf2 genetic pathway—the cell’s master regulator of antioxidant defenses.',
      'Blue and purple fruits like blueberries, blackberries, and purple cabbage feature concentrated anthocyanidins. Clinical trials consistently link these to enhanced memory consolidation and blood-brain barrier integrity.',
      'Aim for at least 30 distinct plant varieties every week—counting whole grains, vegetables, fruits, herbs, and legumes—to nurture diverse microflora in your colon.'
    ],
    takeaways: [
      'Different color pigments signify distinct protective phytochemicals with unique biological functions.',
      'Aim for 30 different species of plants per week to foster microbial diversity in the gut.',
      'Pair fat-soluble vegetables (carrots, tomatoes, leafy greens) with healthy fats like extra virgin olive oil to increase nutrient uptake up to 4x.'
    ]
  },
  {
    id: 'protein-guide-active-living',
    title: 'Demystifying Protein: Plant vs. Animal Sources, Leucine Thresholds, and Daily Targets',
    slug: 'protein-rich-foods-guide',
    category: 'Nutrition Science',
    readTime: '7 min read',
    publishDate: 'Oct 18, 2026',
    author: {
      name: 'Marcus Vance, CSCS, MS',
      role: 'Sports Nutritionist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    summary: 'A deep-dive into muscle protein synthesis (MPS), biological value, and how both plant eaters and omnivores can hit their optimal protein targets.',
    content: [
      'Protein is often reduced to bodybuilding hype, but in reality, it is the fundamental building substrate for every enzyme, neurotransmitter, antibody, and cell membrane in the human body.',
      'The critical trigger for Muscle Protein Synthesis (MPS) is the branched-chain amino acid Leucine. Most adults require approximately 2.5 to 3 grams of leucine per meal to initiate the mTOR pathway.',
      'Animal proteins (eggs, wild fish, chicken, greek yogurt, paneer) naturally possess high biological value and complete essential amino acid distributions in relatively modest portion sizes.',
      'Plant proteins (tempeh, edamame, lentils, chickpeas, hemp seeds, quinoa) provide outstanding cardiovascular advantages and fiber, but require pairing or slightly higher overall volumes to reach equivalent leucine thresholds.',
      'For active individuals and healthy aging adults, targeting 1.6 to 2.2 grams per kilogram of body mass per day spread across 3-4 meals yields superior satiety, lean mass retention, and bone density preservation.'
    ],
    takeaways: [
      'Distribute protein evenly across 3-4 meals rather than back-loading everything into dinner.',
      'Plant proteins are thoroughly capable of supporting muscle growth when eaten in adequate volume and variety.',
      'Paneer, Greek yogurt, lentils, and eggs are exceptional high-yield staples.'
    ]
  },
  {
    id: 'understanding-calories-macros',
    title: 'Understanding Calories & Macronutrients Without Diet Obsession or Anxiety',
    slug: 'understanding-calories-and-macronutrients',
    category: 'Healthy Habits',
    readTime: '5 min read',
    publishDate: 'Oct 12, 2026',
    author: {
      name: 'Aria Sharma, Clinical Dietitian',
      role: 'Behavioral Nutrition Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    summary: 'Calories are units of chemical energy, not moral judgments. Learn how energy balance operates in tandem with nutrient density.',
    content: [
      'A calorie is simply the quantity of thermal energy needed to raise 1 gram of water by 1 degree Celsius. In the body, total daily energy expenditure (TDEE) is divided between basal metabolic rate (BMR), non-exercise activity thermogenesis (NEAT), the thermic effect of food (TEF), and intentional exercise.',
      'Carbohydrates and protein both yield approximately 4 kilocalories per gram, while dietary fats deliver 9 kilocalories per gram.',
      'However, not all 100 calories behave identically once swallowed. 100 calories of fibrous lentils require ~25% of their energy just to be digested and broken down (thermic effect of protein & fiber), while 100 calories of refined corn syrup are absorbed almost instantaneously with minimal thermic cost.',
      'Shift your perspective from "caloric restriction" to "caloric efficiency"—fueling with dense micronutrient foods that leave you satisfied and energized rather than depleted.'
    ],
    takeaways: [
      'Energy balance governs weight regulation, but food quality governs hunger, hormonal signals, and vitality.',
      'Protein and dietary fiber possess the highest thermic effects and longest satiety curves.',
      'Use calorie tracking as an educational awareness tool for 2-4 weeks, not a lifetime obsession.'
    ]
  },
  {
    id: 'healthy-eating-budget',
    title: 'Healthy Eating on a Budget: Smart Superfoods That Cost Pennies',
    slug: 'healthy-eating-on-a-budget',
    category: 'Meal Planning',
    readTime: '6 min read',
    publishDate: 'Oct 05, 2026',
    author: {
      name: 'Marcus Vance, CSCS, MS',
      role: 'Sports Nutritionist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    summary: 'You do not need $15 bottled juices or exotic powders to eat clean. Traditional whole staples like lentils, oats, and frozen greens beat luxury trends.',
    content: [
      'The wellness industry often markets an illusion that health requires expensive imported powders, rare berries, and boutique health food aisles. The scientific truth is far more accessible.',
      'Dry pulses and lentils (Moong dal, Masoor dal, Chickpeas, Black beans) cost only a fraction of imported superfoods yet deliver equivalent or superior protein, zinc, iron, and prebiotic fibers.',
      'Frozen produce is picked at peak ripeness and flash-frozen within hours, meaning frozen spinach, peas, and berries often contain higher micronutrient concentrations than fresh produce that sat in transit trucks for two weeks.',
      'Batch-cook whole grains like rolled oats, brown rice, or barley on weekends. Store in glass containers for instant bases during busy weekdays.'
    ],
    takeaways: [
      'Buy dry lentils, beans, and whole oats in bulk for massive cost savings.',
      'Frozen fruits and vegetables are equal or superior in nutrient retention to fresh imports.',
      'Seasonal local produce will always be fresher and more affordable than off-season imports.'
    ]
  },
  {
    id: 'hydration-metabolism',
    title: 'Hydration 101: How Water Regulates Cellular Energy and Metabolic Rate',
    slug: 'hydration-and-metabolism',
    category: 'Healthy Habits',
    readTime: '4 min read',
    publishDate: 'Sep 29, 2026',
    author: {
      name: 'Dr. Evelyn Reed, PhD, RD',
      role: 'Chief Nutrition Scientist',
      avatar: 'https://images.unsplash.com/photo-1594824813584-c5a4d6f8510a?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    summary: 'Mild dehydration of just 1-2% causes significant cognitive fog, elevated cortisol, and falsely simulated hunger pangs.',
    content: [
      'The human body is roughly 60% water by weight, and every enzymatic reaction in our mitochondria requires an aqueous matrix to transfer electrons and generate ATP.',
      'When you are under-hydrated by as little as 1.5%, cellular osmoreceptors signal the hypothalamus, which often translates low fluid volume as generalized craving or hunger, leading people to snack when their body actually requires water.',
      'Hydration is not just about H2O volume; it requires intracellular electrolytes: sodium, potassium, and magnesium. Incorporating mineral-rich foods like coconut water, spinach, and bananas creates true hydration at the cellular level.',
      'Track your daily intake aiming for roughly 30-35ml per kg of body mass, adjusting higher in warm climates or intense sweat sessions.'
    ],
    takeaways: [
      'Drink a large glass of water immediately upon waking to reverse nocturnal fluid loss.',
      'Before reaching for snacks between meals, drink a glass of water and wait 10 minutes.',
      'Electrolytes like potassium and sodium are crucial for cellular fluid retention.'
    ]
  },
  {
    id: 'debunking-nutrition-myths',
    title: 'Busted: 7 Persistent Nutrition Myths That Refuse to Die',
    slug: 'common-nutrition-myths-debunked',
    category: 'Myths & Facts',
    readTime: '8 min read',
    publishDate: 'Sep 20, 2026',
    author: {
      name: 'Aria Sharma, Clinical Dietitian',
      role: 'Behavioral Nutrition Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80',
    summary: 'Separating clinical fact from social media hype on carbs after 6 PM, egg yolks, detox teas, and fat phobia.',
    content: [
      'Myth 1: "Carbs eaten after 6 PM turn directly into fat." Science: Your digestive system does not have a clock that converts glycogen into adipose tissue at sunset. What matters is net caloric balance over the full 24-48 hour window.',
      'Myth 2: "Egg yolks should be avoided due to cholesterol." Science: Dietary cholesterol in whole eggs has minimal impact on blood serum LDL in 75% of the population, while providing irreplaceable choline, lutein, and fat-soluble vitamins.',
      'Myth 3: "Detox teas clean your internal organs." Science: You already possess the most sophisticated detox apparatus on Earth: your liver and kidneys. Teas claiming to "detox" are typically overpriced stimulant laxatives.',
      'Myth 4: "Eating fat makes you fat." Science: Dietary fat is essential for hormone production and satiety. Overconsumption of total calories makes you store fat, regardless of whether it comes from lipids or sugars.',
      'Myth 5: "All calories are equal." Science: While thermodynamic math holds true, metabolic pathways differ. 200 calories of salmon stimulates protein synthesis and insulin stability, whereas 200 calories of soda spikes blood sugar and triggers rapid rebound hunger.'
    ],
    takeaways: [
      'Ignore extreme dogmas that demonize entire macronutrient groups.',
      'Trust your liver and kidneys for detoxification—fuel them with water, cruciferous vegetables, and sleep.',
      'Egg yolks are nutritional powerhouses packed with choline and lutein.'
    ]
  },
  {
    id: 'balanced-indian-thali',
    title: 'The Modern Indian Plate: Rebalancing Dal, Roti, Rice, and Paneer for Optimal Macros',
    slug: 'balanced-indian-diet-guide',
    category: 'Indian Nutrition',
    readTime: '6 min read',
    publishDate: 'Sep 15, 2026',
    author: {
      name: 'Aria Sharma, Clinical Dietitian',
      role: 'Behavioral Nutrition Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    summary: 'Traditional Indian cuisine is inherently wholesome, but modern sedentary routines require adjusting the carbohydrate-to-protein ratio.',
    content: [
      'The traditional Indian Thali is an architectural marvel of culinary diversity and spice synergy (turmeric, cumin, coriander, ginger). However, in modern urban lifestyle where physical expenditure is lower, thalis frequently skew heavily toward carbs (e.g. 3 rotis PLUS a mountain of white rice, with only a small watery bowl of dal).',
      'By volume, standard cooked dal is approximately 70-75% carbohydrates and 20-25% protein. Relying solely on a small katori of dal for daily protein usually leaves people deficient in total amino acids.',
      'The Modern Rebalanced Thali Framework: Make 50% of your plate non-starchy sabzi, greens, or raw salad (cucumber, tomatoes, grated carrots). Allocate 25% to high-density protein (paneer, sprouted moong, boiled chana, tofu, eggs, or chicken breast). Dedicate the remaining 25% to complex grains (1-2 whole wheat rotis or brown/red rice).',
      'Mindful tadka: Spices are antioxidant powerhouses, but keep added oil or ghee to measured tablespoons rather than free-pouring.'
    ],
    takeaways: [
      'Fill half your thali with fiber-rich sabzi, salads, and raita.',
      'Treat dal as a nutritious complex carb + legume, and deliberately add a dense protein source like paneer, tofu, sprouts, or eggs.',
      'Maintain portion control on both rotis and rice together in the same meal.'
    ]
  }
];
