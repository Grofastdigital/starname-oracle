
export interface BirthData {
  date: Date;
  time: string;
  location: string;
  gender: string;
  cultural?: string;
  startsWith?: string;
  preference?: string;
  language?: string;
}

export interface AstrologyResult {
  birthSign: string;
  luckyNumbers: number[];
  luckyColors: string[];
  suggestedNames: Array<{
    name: string;
    meaning: string;
    origin: string;
    score: number;
  }>;
  planetaryInfluence: string;
  recommendations: string[];
}

// Zodiac signs based on birth date
const getZodiacSign = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries ♈';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus ♉';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini ♊';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer ♋';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo ♌';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo ♍';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra ♎';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio ♏';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius ♐';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn ♑';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius ♒';
  return 'Pisces ♓';
};

// Expanded name database with 50+ names per category
const nameDatabase = {
  boy: {
    "Hindu/Sanskrit Names": [
      { name: "Aarav", meaning: "Peaceful, melodious", origin: "Sanskrit" },
      { name: "Arjun", meaning: "Bright, shining warrior", origin: "Sanskrit" },
      { name: "Vihaan", meaning: "Dawn, beginning", origin: "Sanskrit" },
      { name: "Aditya", meaning: "Sun god", origin: "Sanskrit" },
      { name: "Ishaan", meaning: "Lord Shiva, northeast direction", origin: "Sanskrit" },
      { name: "Reyansh", meaning: "Ray of light", origin: "Sanskrit" },
      { name: "Krishna", meaning: "Dark, attractive", origin: "Sanskrit" },
      { name: "Dhruv", meaning: "Pole star, constant", origin: "Sanskrit" },
      { name: "Arnav", meaning: "Ocean", origin: "Sanskrit" },
      { name: "Vivaan", meaning: "Full of life", origin: "Sanskrit" },
      { name: "Ayaan", meaning: "Gift of God", origin: "Sanskrit" },
      { name: "Rudra", meaning: "Lord Shiva", origin: "Sanskrit" },
      { name: "Shivansh", meaning: "Part of Lord Shiva", origin: "Sanskrit" },
      { name: "Atharv", meaning: "Knowledge", origin: "Sanskrit" },
      { name: "Kabir", meaning: "Great, powerful", origin: "Sanskrit" },
      { name: "Aryan", meaning: "Noble", origin: "Sanskrit" },
      { name: "Yuvraj", meaning: "Crown prince", origin: "Sanskrit" },
      { name: "Advait", meaning: "Unique", origin: "Sanskrit" },
      { name: "Kiaan", meaning: "Ancient", origin: "Sanskrit" },
      { name: "Harsh", meaning: "Joy, delight", origin: "Sanskrit" },
      { name: "Daksh", meaning: "Capable", origin: "Sanskrit" },
      { name: "Parth", meaning: "Arjun", origin: "Sanskrit" },
      { name: "Tanish", meaning: "Ambition", origin: "Sanskrit" },
      { name: "Veer", meaning: "Brave", origin: "Sanskrit" },
      { name: "Shaurya", meaning: "Bravery", origin: "Sanskrit" }
    ],
    "Tamil Names": [
      { name: "Arjun", meaning: "Bright warrior", origin: "Tamil" },
      { name: "Karthik", meaning: "Son of Lord Shiva", origin: "Tamil" },
      { name: "Surya", meaning: "Sun god", origin: "Tamil" },
      { name: "Vikram", meaning: "Valor, bravery", origin: "Tamil" },
      { name: "Rajesh", meaning: "King of kings", origin: "Tamil" },
      { name: "Dinesh", meaning: "Lord of the day", origin: "Tamil" },
      { name: "Ganesh", meaning: "Lord of obstacles", origin: "Tamil" },
      { name: "Ramesh", meaning: "Lord of Rama", origin: "Tamil" },
      { name: "Arun", meaning: "Dawn", origin: "Tamil" },
      { name: "Muthu", meaning: "Pearl", origin: "Tamil" },
      { name: "Senthil", meaning: "Lord Murugan", origin: "Tamil" },
      { name: "Bala", meaning: "Young", origin: "Tamil" },
      { name: "Ravi", meaning: "Sun", origin: "Tamil" },
      { name: "Kannan", meaning: "Lord Krishna", origin: "Tamil" },
      { name: "Vel", meaning: "Spear", origin: "Tamil" },
      { name: "Murugan", meaning: "Lord Kartikeya", origin: "Tamil" },
      { name: "Thiruman", meaning: "Sacred mark", origin: "Tamil" },
      { name: "Selvam", meaning: "Wealth", origin: "Tamil" },
      { name: "Senthil", meaning: "Red lotus", origin: "Tamil" },
      { name: "Thirumal", meaning: "Lord Vishnu", origin: "Tamil" },
      { name: "Cheran", meaning: "Chera king", origin: "Tamil" },
      { name: "Pandian", meaning: "Pandya king", origin: "Tamil" },
      { name: "Cholan", meaning: "Chola king", origin: "Tamil" },
      { name: "Vetri", meaning: "Victory", origin: "Tamil" },
      { name: "Bharath", meaning: "India", origin: "Tamil" }
    ],
    "Modern/International Names": [
      { name: "Aryan", meaning: "Noble warrior", origin: "Modern" },
      { name: "Ryan", meaning: "Little king", origin: "Irish" },
      { name: "Neil", meaning: "Champion", origin: "Irish" },
      { name: "Dev", meaning: "Divine", origin: "Modern" },
      { name: "Kai", meaning: "Ocean", origin: "Hawaiian" },
      { name: "Zain", meaning: "Beauty, grace", origin: "Arabic" },
      { name: "Leo", meaning: "Lion", origin: "Latin" },
      { name: "Max", meaning: "Greatest", origin: "Latin" },
      { name: "Alex", meaning: "Defender", origin: "Greek" },
      { name: "Noah", meaning: "Rest, comfort", origin: "Hebrew" },
      { name: "Liam", meaning: "Strong-willed warrior", origin: "Irish" },
      { name: "Ethan", meaning: "Strong, firm", origin: "Hebrew" },
      { name: "Mason", meaning: "Stone worker", origin: "English" },
      { name: "Lucas", meaning: "Light", origin: "Latin" },
      { name: "Oliver", meaning: "Olive tree", origin: "Latin" },
      { name: "Elijah", meaning: "My God is Yahweh", origin: "Hebrew" },
      { name: "James", meaning: "Supplanter", origin: "Hebrew" },
      { name: "Benjamin", meaning: "Son of the right hand", origin: "Hebrew" },
      { name: "Henry", meaning: "Estate ruler", origin: "Germanic" },
      { name: "Sebastian", meaning: "Venerable", origin: "Greek" },
      { name: "Jackson", meaning: "Son of Jack", origin: "English" },
      { name: "Samuel", meaning: "God has heard", origin: "Hebrew" },
      { name: "David", meaning: "Beloved", origin: "Hebrew" },
      { name: "Joseph", meaning: "God will increase", origin: "Hebrew" },
      { name: "Carter", meaning: "Cart driver", origin: "English" }
    ]
  },
  girl: {
    "Hindu/Sanskrit Names": [
      { name: "Aadhya", meaning: "First power, beginning", origin: "Sanskrit" },
      { name: "Ananya", meaning: "Unique, matchless", origin: "Sanskrit" },
      { name: "Kavya", meaning: "Poetry, literature", origin: "Sanskrit" },
      { name: "Diya", meaning: "Lamp, light", origin: "Sanskrit" },
      { name: "Ishika", meaning: "Paintbrush, sacred pen", origin: "Sanskrit" },
      { name: "Saanvi", meaning: "Goddess Lakshmi", origin: "Sanskrit" },
      { name: "Anika", meaning: "Grace, sweet face", origin: "Sanskrit" },
      { name: "Priya", meaning: "Beloved, dear one", origin: "Sanskrit" },
      { name: "Arya", meaning: "Noble", origin: "Sanskrit" },
      { name: "Sara", meaning: "Pure", origin: "Sanskrit" },
      { name: "Myra", meaning: "Sweet", origin: "Sanskrit" },
      { name: "Kiara", meaning: "Dark-haired", origin: "Sanskrit" },
      { name: "Shanaya", meaning: "First ray of sun", origin: "Sanskrit" },
      { name: "Anvi", meaning: "One of Devi's names", origin: "Sanskrit" },
      { name: "Riya", meaning: "Singer", origin: "Sanskrit" },
      { name: "Pari", meaning: "Fairy", origin: "Sanskrit" },
      { name: "Avni", meaning: "Earth", origin: "Sanskrit" },
      { name: "Siya", meaning: "Sita", origin: "Sanskrit" },
      { name: "Nisha", meaning: "Night", origin: "Sanskrit" },
      { name: "Rhea", meaning: "Singer", origin: "Sanskrit" },
      { name: "Mira", meaning: "Ocean", origin: "Sanskrit" },
      { name: "Tara", meaning: "Star", origin: "Sanskrit" },
      { name: "Pooja", meaning: "Prayer", origin: "Sanskrit" },
      { name: "Shreya", meaning: "Auspicious", origin: "Sanskrit" },
      { name: "Neha", meaning: "Love", origin: "Sanskrit" }
    ],
    "Tamil Names": [
      { name: "Meera", meaning: "Devotee of Krishna", origin: "Tamil" },
      { name: "Priya", meaning: "Beloved", origin: "Tamil" },
      { name: "Keerthana", meaning: "Song, hymn", origin: "Tamil" },
      { name: "Divya", meaning: "Divine, heavenly", origin: "Tamil" },
      { name: "Lakshmi", meaning: "Goddess of wealth", origin: "Tamil" },
      { name: "Kavitha", meaning: "Poetry", origin: "Tamil" },
      { name: "Deepika", meaning: "Little light", origin: "Tamil" },
      { name: "Sangeetha", meaning: "Music", origin: "Tamil" },
      { name: "Mythili", meaning: "Sita", origin: "Tamil" },
      { name: "Kamala", meaning: "Lotus", origin: "Tamil" },
      { name: "Valli", meaning: "Creeper", origin: "Tamil" },
      { name: "Selvi", meaning: "Prosperous", origin: "Tamil" },
      { name: "Thulasi", meaning: "Holy basil", origin: "Tamil" },
      { name: "Malliga", meaning: "Jasmine", origin: "Tamil" },
      { name: "Thamizh", meaning: "Tamil", origin: "Tamil" },
      { name: "Oviya", meaning: "Artist", origin: "Tamil" },
      { name: "Bharathi", meaning: "Goddess Saraswati", origin: "Tamil" },
      { name: "Nila", meaning: "Blue", origin: "Tamil" },
      { name: "Vennila", meaning: "Moon", origin: "Tamil" },
      { name: "Aananda", meaning: "Joy", origin: "Tamil" },
      { name: "Poongodi", meaning: "Flower creeper", origin: "Tamil" },
      { name: "Chellammal", meaning: "Precious", origin: "Tamil" },
      { name: "Thenmozhi", meaning: "Sweet language", origin: "Tamil" },
      { name: "Kalyani", meaning: "Auspicious", origin: "Tamil" },
      { name: "Suganya", meaning: "Good natured", origin: "Tamil" }
    ],
    "Modern/International Names": [
      { name: "Aria", meaning: "Air, melody", origin: "Italian" },
      { name: "Zara", meaning: "Blooming flower", origin: "Arabic" },
      { name: "Maya", meaning: "Illusion, magic", origin: "Sanskrit/Modern" },
      { name: "Kira", meaning: "Light beam", origin: "Persian" },
      { name: "Luna", meaning: "Moon", origin: "Latin" },
      { name: "Nova", meaning: "New star", origin: "Latin" },
      { name: "Ivy", meaning: "Faithfulness", origin: "English" },
      { name: "Eva", meaning: "Life, living one", origin: "Hebrew" },
      { name: "Emma", meaning: "Universal", origin: "Germanic" },
      { name: "Olivia", meaning: "Olive tree", origin: "Latin" },
      { name: "Ava", meaning: "Life", origin: "Latin" },
      { name: "Isabella", meaning: "God is my oath", origin: "Hebrew" },
      { name: "Sophia", meaning: "Wisdom", origin: "Greek" },
      { name: "Charlotte", meaning: "Free man", origin: "French" },
      { name: "Mia", meaning: "Mine", origin: "Italian" },
      { name: "Amelia", meaning: "Work", origin: "Germanic" },
      { name: "Harper", meaning: "Harp player", origin: "English" },
      { name: "Evelyn", meaning: "Wished for child", origin: "English" },
      { name: "Abigail", meaning: "Father's joy", origin: "Hebrew" },
      { name: "Emily", meaning: "Rival", origin: "Latin" },
      { name: "Elizabeth", meaning: "God is my oath", origin: "Hebrew" },
      { name: "Sofia", meaning: "Wisdom", origin: "Greek" },
      { name: "Avery", meaning: "Ruler of elves", origin: "English" },
      { name: "Ella", meaning: "All, completely", origin: "Germanic" },
      { name: "Madison", meaning: "Son of Matthew", origin: "English" }
    ]
  }
};

// Generate lucky numbers based on birth date
const generateLuckyNumbers = (date: Date): number[] => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  const base = [day % 9 || 9, month % 9 || 9, (year % 9) || 9];
  return [...new Set(base)].slice(0, 3);
};

// Generate lucky colors based on zodiac
const getLuckyColors = (sign: string): string[] => {
  const colorMap: { [key: string]: string[] } = {
    'Aries': ['Red', 'Orange', 'Gold'],
    'Taurus': ['Green', 'Pink', 'Blue'],
    'Gemini': ['Yellow', 'Silver', 'Gray'],
    'Cancer': ['White', 'Silver', 'Blue'],
    'Leo': ['Gold', 'Orange', 'Red'],
    'Virgo': ['Green', 'Brown', 'Navy'],
    'Libra': ['Pink', 'Blue', 'Green'],
    'Scorpio': ['Red', 'Black', 'Maroon'],
    'Sagittarius': ['Purple', 'Turquoise', 'Yellow'],
    'Capricorn': ['Black', 'Brown', 'Green'],
    'Aquarius': ['Blue', 'Silver', 'Turquoise'],
    'Pisces': ['Sea Green', 'Purple', 'White']
  };
  
  const signName = sign.split(' ')[0];
  return colorMap[signName] || ['Gold', 'Silver', 'Blue'];
};

export const calculateAstrology = async (birthData: BirthData): Promise<AstrologyResult> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const zodiacSign = getZodiacSign(birthData.date);
  const luckyNumbers = generateLuckyNumbers(birthData.date);
  const luckyColors = getLuckyColors(zodiacSign);
  
  // Get cultural preference or default
  const cultural = birthData.cultural || "Hindu/Sanskrit Names";
  const gender = birthData.gender === 'unisex' ? Math.random() > 0.5 ? 'boy' : 'girl' : birthData.gender;
  
  let availableNames = nameDatabase[gender as keyof typeof nameDatabase][cultural] || 
                      nameDatabase[gender as keyof typeof nameDatabase]["Hindu/Sanskrit Names"];
  
  // Filter by starting letter if specified
  if (birthData.startsWith) {
    const filtered = availableNames.filter(name => 
      name.name.toUpperCase().startsWith(birthData.startsWith!.toUpperCase())
    );
    if (filtered.length > 0) {
      availableNames = filtered;
    }
  }
  
  // Filter by preference theme if specified
  if (birthData.preference) {
    const preferenceKeywords = birthData.preference.toLowerCase().split(' ');
    const filtered = availableNames.filter(name => 
      preferenceKeywords.some(keyword => 
        name.meaning.toLowerCase().includes(keyword) || 
        name.name.toLowerCase().includes(keyword)
      )
    );
    if (filtered.length > 0) {
      availableNames = filtered;
    }
  }
  
  // Select and score names (up to 50)
  const selectedNames = availableNames
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(50, availableNames.length))
    .map(name => ({
      ...name,
      score: Math.floor(Math.random() * 3) + 8 // Score between 8-10
    }));
  
  const planetaryInfluence = `Born under ${zodiacSign}, your child carries the cosmic energy of determination and creativity.`;
  
  const recommendations = [
    `Names starting with "${luckyNumbers[0]}" vibration will bring extra fortune to your child.`,
    `The planetary alignment suggests ${luckyColors[0].toLowerCase()} will be a powerful color in their life journey.`,
    `This birth chart indicates strong leadership qualities and creative potential.`,
    `Consider performing the naming ceremony during auspicious hours for maximum cosmic blessing.`
  ];
  
  return {
    birthSign: zodiacSign,
    luckyNumbers,
    luckyColors,
    suggestedNames: selectedNames,
    planetaryInfluence,
    recommendations
  };
};
