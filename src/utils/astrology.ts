
export interface BirthData {
  date: Date;
  time: string;
  location: string;
  gender: string;
  cultural?: string;
  startsWith?: string;
  preference?: string;
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
  if ((month === 1 && day >= 20) || (month === 2 <= 18)) return 'Aquarius ♒';
  return 'Pisces ♓';
};

// Name databases based on cultural preferences
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
      { name: "Dhruv", meaning: "Pole star, constant", origin: "Sanskrit" }
    ],
    "Tamil Names": [
      { name: "Arjun", meaning: "Bright warrior", origin: "Tamil" },
      { name: "Karthik", meaning: "Son of Lord Shiva", origin: "Tamil" },
      { name: "Surya", meaning: "Sun god", origin: "Tamil" },
      { name: "Vikram", meaning: "Valor, bravery", origin: "Tamil" },
      { name: "Rajesh", meaning: "King of kings", origin: "Tamil" },
      { name: "Dinesh", meaning: "Lord of the day", origin: "Tamil" },
      { name: "Ganesh", meaning: "Lord of obstacles", origin: "Tamil" },
      { name: "Ramesh", meaning: "Lord of Rama", origin: "Tamil" }
    ],
    "Modern/International Names": [
      { name: "Aryan", meaning: "Noble warrior", origin: "Modern" },
      { name: "Ryan", meaning: "Little king", origin: "Irish" },
      { name: "Neil", meaning: "Champion", origin: "Irish" },
      { name: "Dev", meaning: "Divine", origin: "Modern" },
      { name: "Kai", meaning: "Ocean", origin: "Hawaiian" },
      { name: "Zain", meaning: "Beauty, grace", origin: "Arabic" },
      { name: "Leo", meaning: "Lion", origin: "Latin" },
      { name: "Max", meaning: "Greatest", origin: "Latin" }
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
      { name: "Priya", meaning: "Beloved, dear one", origin: "Sanskrit" }
    ],
    "Tamil Names": [
      { name: "Meera", meaning: "Devotee of Krishna", origin: "Tamil" },
      { name: "Priya", meaning: "Beloved", origin: "Tamil" },
      { name: "Keerthana", meaning: "Song, hymn", origin: "Tamil" },
      { name: "Divya", meaning: "Divine, heavenly", origin: "Tamil" },
      { name: "Lakshmi", meaning: "Goddess of wealth", origin: "Tamil" },
      { name: "Kavitha", meaning: "Poetry", origin: "Tamil" },
      { name: "Deepika", meaning: "Little light", origin: "Tamil" },
      { name: "Sangeetha", meaning: "Music", origin: "Tamil" }
    ],
    "Modern/International Names": [
      { name: "Aria", meaning: "Air, melody", origin: "Italian" },
      { name: "Zara", meaning: "Blooming flower", origin: "Arabic" },
      { name: "Maya", meaning: "Illusion, magic", origin: "Sanskrit/Modern" },
      { name: "Kira", meaning: "Light beam", origin: "Persian" },
      { name: "Luna", meaning: "Moon", origin: "Latin" },
      { name: "Nova", meaning: "New star", origin: "Latin" },
      { name: "Ivy", meaning: "Faithfulness", origin: "English" },
      { name: "Eva", meaning: "Life, living one", origin: "Hebrew" }
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
  
  // Select and score names
  const selectedNames = availableNames
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
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
