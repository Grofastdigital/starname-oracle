export interface BirthData {
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  gender: string;
  culturalPreference?: string;
  nameTheme?: string;
  preferredLanguage: string;
  startsWith?: string;
}

export interface AstrologyResult {
  birthSign: string;
  nakshatra: string;
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

// Language-specific content
const languageContent = {
  Tamil: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `பிறப்பு ராசி ${rashi} மற்றும் நட்சத்திரம் ${nakshatra} படி, உங்கள் குழந்தையில் தலைமைத்துவ திறன் மற்றும் படைப்பாற்றல் குணங்கள் உள்ளன.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `நட்சத்திரம் ${nakshatra} படி பெயர் தேர்வு செய்வது குழந்தைக்கு ஆன்மீக நன்மையைத் தரும்.`,
      `ராசி படி ${colors[0]} நிறம் குழந்தையின் வாழ்வில் நல்லது கொண்டு வரும்.`,
      `பிறப்பு ஜாதகம் படி குழந்தையில் சிறந்த அறிவு மற்றும் வெற்றியின் வாய்ப்புகள் உள்ளன.`,
      `நாமகரண சடங்கை நல்ல நேரத்தில் செய்வது அதிக பலன் தரும்.`,
      `வேத ஜோதிடம் படி இந்த குழந்தை எதிர்காலத்தில் சிறந்த செயல்கள் செய்யும் திறன் கொண்டுள்ளது.`
    ]
  },
  Hindi: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `जन्म राशि ${rashi} और नक्षत्र ${nakshatra} के अनुसार, आपके बच्चे में नेतृत्व की क्षमता और रचनात्मकता के गुण हैं।`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `नक्षत्र ${nakshatra} के अनुसार नाम चुनने से बच्चे को आध्यात्मिक लाभ मिलेगा।`,
      `राशि के अनुसार ${colors[0]} रंग बच्चे के जीवन में शुभता लाएगा।`,
      `जन्म कुंडली के अनुसार बच्चे में उत्कृष्ट बुद्धि और सफलता की संभावनाएं हैं।`,
      `नामकरण संस्कार शुभ मुहूर्त में करवाने से अधिक फल मिलेगा।`,
      `वैदिक ज्योतिष के अनुसार यह बच्चा भविष्य में महान कार्य करने की क्षमता रखता है।`
    ]
  },
  Malayalam: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `ജന്മ രാശി ${rashi} യും നക്ഷത്രം ${nakshatra} യും അനുസരിച്ച്, നിങ്ങളുടെ കുട്ടിയിൽ നേതൃത്വ കഴിവും സൃജനാത്മകതയും ഉണ്ട്.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `നക്ഷത്രം ${nakshatra} അനുസരിച്ച് പേര് തിരഞ്ഞെടുക്കുന്നത് കുട്ടിക്ക് ആത്മീയ ഗുണം നൽകും.`,
      `രാശി അനുസരിച്ച് ${colors[0]} നിറം കുട്ടിയുടെ ജീവിതത്തിൽ ഭാഗ്യം കൊണ്ടുവരും.`,
      `ജന്മ ജാതകം അനുസരിച്ച് കുട്ടിയിൽ മികച്ച ബുദ്ധിയും വിജയ സാധ്യതകളും ഉണ്ട്.`,
      `നാമകരണ ചടങ്ങ് ശുഭ സമയത്ത് നടത്തുന്നത് കൂടുതൽ ഫലം നൽകും.`,
      `വേദ ജ്യോതിഷം അനുസരിച്ച് ഈ കുട്ടിക്ക് ഭാവിയിൽ മഹത്തായ കാര്യങ്ങൾ ചെയ്യാനുള്ള കഴിവുണ്ട്.`
    ]
  },
  Telugu: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `జన్మ రాశి ${rashi} మరియు నక్షత్రం ${nakshatra} ప్రకారం, మీ పిల్లవాడిలో నాయకత్వ గుణాలు మరియు సృజనాత్మకత ఉన్నాయి.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `నక్షత్రం ${nakshatra} ప్రకారం పేరు ఎంచుకోవడం పిల్లవాడికి ఆధ్యాత్మిక ప్రయోజనం చేకూరుస్తుంది.`,
      `రాశి ప్రకారం ${colors[0]} రంగు పిల్లవాడి జీవితంలో అదృష్టం తెస్తుంది.`,
      `జన్మ జాతకం ప్రకారం పిల్లవాడిలో అద్భుతమైన తెలివితేటలు మరియు విజయ అవకాశాలు ఉన్నాయి.`,
      `నామకరణ సంస్కారాన్ని శుభ సమయంలో చేయడం వల్ల ఎక్కువ ఫలితం లభిస్తుంది.`,
      `వేద జ్యోతిష్యం ప్రకారం ఈ పిల్లవాడు భవిష్యత్తులో గొప్ప పనులు చేసే సామర్థ్యం కలిగి ఉన్నాడు.`
    ]
  },
  Kannada: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `ಜನ್ಮ ರಾಶಿ ${rashi} ಮತ್ತು ನಕ್ಷತ್ರ ${nakshatra} ಪ್ರಕಾರ, ನಿಮ್ಮ ಮಗುವಿನಲ್ಲಿ ನಾಯಕತ್ವ ಮತ್ತು ಸೃಜನಶೀಲತೆಯ ಗುಣಗಳಿವೆ.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `ನಕ್ಷತ್ರ ${nakshatra} ಪ್ರಕಾರ ಹೆಸರು ಆಯ್ಕೆ ಮಾಡುವುದರಿಂದ ಮಗುವಿಗೆ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಯೋಜನ ಸಿಗುತ್ತದೆ.`,
      `ರಾಶಿ ಪ್ರಕಾರ ${colors[0]} ಬಣ್ಣ ಮಗುವಿನ ಜೀವನದಲ್ಲಿ ಅದೃಷ್ಟ ತರುತ್ತದೆ.`,
      `ಜನ್ಮ ಜಾತಕ ಪ್ರಕಾರ ಮಗುವಿನಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಬುದ್ಧಿ ಮತ್ತು ಯಶಸ್ಸಿನ ಸಾಧ್ಯತೆಗಳಿವೆ.`,
      `ನಾಮಕರಣ ಸಂಸ್ಕಾರವನ್ನು ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ ಮಾಡುವುದರಿಂದ ಹೆಚ್ಚು ಫಲ ಸಿಗುತ್ತದೆ.`,
      `ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ ಪ್ರಕಾರ ಈ ಮಗು ಭವಿಷ್ಯದಲ್ಲಿ ಮಹಾನ್ ಕಾರ್ಯಗಳನ್ನು ಮಾಡುವ ಸಾಮರ್ಥ್ಯವನ್ನು ಹೊಂದಿದೆ.`
    ]
  },
  English: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `According to birth rashi ${rashi} and nakshatra ${nakshatra}, your child has leadership qualities and creative abilities.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `Choosing a name according to nakshatra ${nakshatra} will bring spiritual benefits to the child.`,
      `According to the rashi, ${colors[0]} color will bring good fortune in the child's life.`,
      `According to the birth chart, the child has excellent intelligence and potential for success.`,
      `Performing the naming ceremony at an auspicious time will yield greater results.`,
      `According to Vedic astrology, this child has the ability to do great work in the future.`
    ]
  }
};

// Indian Vedic Rashi (Zodiac Signs) with Sanskrit names
const getVedicRashi = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'मेष राशि (Mesha - Aries)';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'वृषभ राशि (Vrishabha - Taurus)';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'मिथुन राशि (Mithuna - Gemini)';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'कर्क राशि (Karka - Cancer)';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'सिंह राशि (Simha - Leo)';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'कन्या राशि (Kanya - Virgo)';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'तुला राशि (Tula - Libra)';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'वृश्चिक राशि (Vrishchika - Scorpio)';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'धनु राशि (Dhanu - Sagittarius)';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'मकर राशि (Makara - Capricorn)';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'कुम्भ राशि (Kumbha - Aquarius)';
  return 'मीन राशि (Meena - Pisces)';
};

// Calculate Nakshatra based on birth date (simplified calculation)
const getNakshatra = (date: Date): string => {
  const nakshatras = [
    'अश्विनी (Ashwini)', 'भरणी (Bharani)', 'कृत्तिका (Krittika)', 'रोहिणी (Rohini)',
    'मृगशिरा (Mrigashira)', 'आर्द्रा (Ardra)', 'पुनर्वसु (Punarvasu)', 'पुष्य (Pushya)',
    'आश्लेषा (Ashlesha)', 'मघा (Magha)', 'पूर्वाफाल्गुनी (Purva Phalguni)', 'उत्तराफाल्गुनी (Uttara Phalguni)',
    'हस्त (Hasta)', 'चित्रा (Chitra)', 'स्वाती (Swati)', 'विशाखा (Vishakha)',
    'अनुराधा (Anuradha)', 'ज्येष्ठा (Jyeshtha)', 'मूल (Mula)', 'पूर्वाषाढ़ा (Purva Ashadha)',
    'उत्तराषाढ़ा (Uttara Ashadha)', 'श्रवण (Shravana)', 'धनिष्ठा (Dhanishta)', 'शतभिषा (Shatabhisha)',
    'पूर्वाभाद्रपद (Purva Bhadrapada)', 'उत्तराभाद्रपद (Uttara Bhadrapada)', 'रेवती (Revati)'
  ];
  
  // Simplified calculation: use day of year to determine nakshatra
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const nakshatraIndex = Math.floor((dayOfYear * 27) / 365) % 27;
  return nakshatras[nakshatraIndex];
};

// Expanded Indian name database organized by Rashi and gender
const vedicNameDatabase = {
  boy: {
    "Sanskrit/Hindu Names": [
      { name: "आर्यन (Aryan)", meaning: "Noble soul, warrior", origin: "Sanskrit" },
      { name: "आदित्य (Aditya)", meaning: "Son of Aditi, Sun god", origin: "Sanskrit" },
      { name: "अभिनव (Abhinav)", meaning: "New, fresh, modern", origin: "Sanskrit" },
      { name: "अभिमन्यु (Abhimanyu)", meaning: "Proud, passionate", origin: "Sanskrit" },
      { name: "अक्षय (Akshay)", meaning: "Eternal, indestructible", origin: "Sanskrit" },
      { name: "अमित (Amit)", meaning: "Boundless, infinite", origin: "Sanskrit" },
      { name: "अनिल (Anil)", meaning: "Wind god", origin: "Sanskrit" },
      { name: "अनुज (Anuj)", meaning: "Younger brother", origin: "Sanskrit" },
      { name: "अर्जुन (Arjun)", meaning: "Bright, shining warrior", origin: "Sanskrit" },
      { name: "अशोक (Ashok)", meaning: "Without sorrow", origin: "Sanskrit" },
      { name: "देव (Dev)", meaning: "Divine, godly", origin: "Sanskrit" },
      { name: "धर्मेश (Dharmesh)", meaning: "Lord of righteousness", origin: "Sanskrit" },
      { name: "गौरव (Gaurav)", meaning: "Honor, pride", origin: "Sanskrit" },
      { name: "हर्षित (Harshit)", meaning: "Happy, joyful", origin: "Sanskrit" },
      { name: "ईशान (Ishan)", meaning: "Lord Shiva, northeast", origin: "Sanskrit" },
      { name: "जय (Jay)", meaning: "Victory", origin: "Sanskrit" },
      { name: "कृष्ण (Krishna)", meaning: "Dark, attractive one", origin: "Sanskrit" },
      { name: "मनीष (Manish)", meaning: "God of mind, intelligent", origin: "Sanskrit" },
      { name: "नवीन (Naveen)", meaning: "New, fresh", origin: "Sanskrit" },
      { name: "प्रकाश (Prakash)", meaning: "Light, illumination", origin: "Sanskrit" },
      { name: "राहुल (Rahul)", meaning: "Capable, efficient", origin: "Sanskrit" },
      { name: "संजय (Sanjay)", meaning: "Completely victorious", origin: "Sanskrit" },
      { name: "तुषार (Tushar)", meaning: "Snow, winter", origin: "Sanskrit" },
      { name: "उमेश (Umesh)", meaning: "Lord Shiva", origin: "Sanskrit" },
      { name: "विकास (Vikas)", meaning: "Development, progress", origin: "Sanskrit" },
      { name: "यश (Yash)", meaning: "Fame, success", origin: "Sanskrit" }
    ],
    "Tamil/South Indian Names": [
      { name: "अरुण (Arun)", meaning: "Dawn, reddish brown", origin: "Tamil" },
      { name: "कार्तिक (Karthik)", meaning: "Son of Lord Shiva", origin: "Tamil" },
      { name: "मुरुगन (Murugan)", meaning: "Lord Kartikeya", origin: "Tamil" },
      { name: "राजेश (Rajesh)", meaning: "King of kings", origin: "Tamil" },
      { name: "सूर्य (Surya)", meaning: "Sun god", origin: "Tamil" },
      { name: "विक्रम (Vikram)", meaning: "Valor, bravery", origin: "Tamil" },
      { name: "गणेश (Ganesh)", meaning: "Lord of obstacles", origin: "Tamil" },
      { name: "रमेश (Ramesh)", meaning: "Lord Rama", origin: "Tamil" },
      { name: "दिनेश (Dinesh)", meaning: "Lord of the day", origin: "Tamil" },
      { name: "संगीत (Sangeet)", meaning: "Music", origin: "Tamil" },
      { name: "सेंथिल (Senthil)", meaning: "Lord Murugan", origin: "Tamil" },
      { name: "बाला (Bala)", meaning: "Young, child", origin: "Tamil" },
      { name: "रवि (Ravi)", meaning: "Sun", origin: "Tamil" },
      { name: "कन्नन (Kannan)", meaning: "Lord Krishna", origin: "Tamil" },
      { name: "मुत्तु (Muthu)", meaning: "Pearl", origin: "Tamil" }
    ],
    "Regional/Cultural Names": [
      { name: "आकाश (Akash)", meaning: "Sky, space", origin: "Hindi" },
      { name: "भावेश (Bhavesh)", meaning: "Lord of emotions", origin: "Gujarati" },
      { name: "चिराग (Chirag)", meaning: "Lamp, light", origin: "Gujarati" },
      { name: "दर्शन (Darshan)", meaning: "Vision, sight", origin: "Marathi" },
      { name: "एकनाथ (Eknath)", meaning: "Devoted to one God", origin: "Marathi" },
      { name: "फाल्गुन (Falgun)", meaning: "Born in Falgun month", origin: "Bengali" },
      { name: "गिरीश (Girish)", meaning: "Lord of mountains", origin: "Kannada" },
      { name: "हिमांशु (Himanshu)", meaning: "Moon", origin: "Punjabi" },
      { name: "इन्द्र (Indra)", meaning: "King of gods", origin: "Sanskrit" },
      { name: "जगदीश (Jagdish)", meaning: "Lord of the world", origin: "Rajasthani" }
    ]
  },
  girl: {
    "Sanskrit/Hindu Names": [
      { name: "आरती (Aarti)", meaning: "Divine light worship", origin: "Sanskrit" },
      { name: "अनन्या (Ananya)", meaning: "Unique, matchless", origin: "Sanskrit" },
      { name: "अवनि (Avani)", meaning: "Earth", origin: "Sanskrit" },
      { name: "भावना (Bhavana)", meaning: "Feeling, emotion", origin: "Sanskrit" },
      { name: "चेतना (Chetana)", meaning: "Consciousness, awareness", origin: "Sanskrit" },
      { name: "दीया (Diya)", meaning: "Lamp, light", origin: "Sanskrit" },
      { name: "एशा (Esha)", meaning: "Desire, goddess Parvati", origin: "Sanskrit" },
      { name: "गायत्री (Gayatri)", meaning: "Sacred Vedic hymn", origin: "Sanskrit" },
      { name: "हर्षिता (Harshita)", meaning: "Happy, joyful", origin: "Sanskrit" },
      { name: "इशिका (Ishika)", meaning: "Sacred pen, brush", origin: "Sanskrit" },
      { name: "जानकी (Janaki)", meaning: "Daughter of Janaka, Sita", origin: "Sanskrit" },
      { name: "कविता (Kavita)", meaning: "Poetry, poem", origin: "Sanskrit" },
      { name: "लक्ष्मी (Lakshmi)", meaning: "Goddess of wealth", origin: "Sanskrit" },
      { name: "माधुरी (Madhuri)", meaning: "Sweetness", origin: "Sanskrit" },
      { name: "नैना (Naina)", meaning: "Eyes", origin: "Sanskrit" },
      { name: "ओजस्विनी (Ojaswini)", meaning: "Bright, lustrous", origin: "Sanskrit" },
      { name: "प्रिया (Priya)", meaning: "Beloved, dear one", origin: "Sanskrit" },
      { name: "रिया (Riya)", meaning: "Singer, graceful", origin: "Sanskrit" },
      { name: "सरस्वती (Saraswati)", meaning: "Goddess of knowledge", origin: "Sanskrit" },
      { name: "तारा (Tara)", meaning: "Star", origin: "Sanskrit" },
      { name: "उर्वशी (Urvashi)", meaning: "Most beautiful apsara", origin: "Sanskrit" },
      { name: "वैदेही (Vaidehi)", meaning: "Princess of Videha, Sita", origin: "Sanskrit" },
      { name: "यशोदा (Yashoda)", meaning: "Giver of fame", origin: "Sanskrit" },
      { name: "जया (Jaya)", meaning: "Victory", origin: "Sanskrit" },
      { name: "कीर्ति (Kirti)", meaning: "Fame, glory", origin: "Sanskrit" }
    ],
    "Tamil/South Indian Names": [
      { name: "मीरा (Meera)", meaning: "Devotee of Krishna", origin: "Tamil" },
      { name: "कीर्तना (Keertana)", meaning: "Song, hymn", origin: "Tamil" },
      { name: "दिव्या (Divya)", meaning: "Divine, heavenly", origin: "Tamil" },
      { name: "कमला (Kamala)", meaning: "Lotus", origin: "Tamil" },
      { name: "संगीता (Sangeeta)", meaning: "Music", origin: "Tamil" },
      { name: "देविका (Devika)", meaning: "Little goddess", origin: "Tamil" },
      { name: "मिथिली (Mithili)", meaning: "Princess of Mithila", origin: "Tamil" },
      { name: "वल्ली (Valli)", meaning: "Creeper plant", origin: "Tamil" },
      { name: "सेल्वी (Selvi)", meaning: "Prosperous woman", origin: "Tamil" },
      { name: "तुलसी (Tulsi)", meaning: "Holy basil", origin: "Tamil" },
      { name: "मल्लिका (Mallika)", meaning: "Jasmine flower", origin: "Tamil" },
      { name: "भारती (Bharati)", meaning: "Goddess Saraswati", origin: "Tamil" },
      { name: "नीला (Nila)", meaning: "Blue", origin: "Tamil" },
      { name: "वेणिला (Venila)", meaning: "Moonlight", origin: "Tamil" },
      { name: "सुगन्या (Suganya)", meaning: "Good natured", origin: "Tamil" }
    ],
    "Regional/Cultural Names": [
      { name: "आरिया (Ariya)", meaning: "Noble melody", origin: "Modern" },
      { name: "भूमिका (Bhumika)", meaning: "Earth, role", origin: "Gujarati" },
      { name: "चांदनी (Chandni)", meaning: "Moonlight", origin: "Hindi" },
      { name: "दर्शना (Darshana)", meaning: "Vision, philosophy", origin: "Marathi" },
      { name: "एकता (Ekta)", meaning: "Unity", origin: "Punjabi" },
      { name: "फूलकुमारी (Phoolkumari)", meaning: "Flower princess", origin: "Bengali" },
      { name: "गीता (Geeta)", meaning: "Sacred song", origin: "Rajasthani" },
      { name: "हेमा (Hema)", meaning: "Gold", origin: "Kannada" },
      { name: "इंदिरा (Indira)", meaning: "Goddess Lakshmi", origin: "Sanskrit" },
      { name: "ज्योति (Jyoti)", meaning: "Light, flame", origin: "Hindi" }
    ]
  }
};

// Generate lucky numbers based on Vedic numerology
const generateVedicLuckyNumbers = (date: Date, nakshatra: string): number[] => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  // Vedic numerology calculations
  const birthNumber = day % 9 || 9;
  const lifePathNumber = (day + month + (year % 1000)) % 9 || 9;
  
  // Nakshatra-based number (simplified)
  const nakshatraNumber = (nakshatra.length % 9) + 1;
  
  const numbers = [birthNumber, lifePathNumber, nakshatraNumber];
  return [...new Set(numbers)].slice(0, 3);
};

// Generate lucky colors based on Vedic Rashi
const getVedicLuckyColors = (rashi: string): string[] => {
  const colorMap: { [key: string]: string[] } = {
    'Mesha': ['Red', 'Orange', 'Coral'],
    'Vrishabha': ['White', 'Green', 'Pink'],
    'Mithuna': ['Yellow', 'Green', 'Silver'],
    'Karka': ['White', 'Silver', 'Sea Green'],
    'Simha': ['Gold', 'Orange', 'Red'],
    'Kanya': ['Green', 'White', 'Yellow'],
    'Tula': ['White', 'Blue', 'Pink'],
    'Vrishchika': ['Red', 'Maroon', 'Coral'],
    'Dhanu': ['Yellow', 'Orange', 'Red'],
    'Makara': ['Black', 'Dark Blue', 'Brown'],
    'Kumbha': ['Blue', 'Cyan', 'Electric Blue'],
    'Meena': ['Yellow', 'Orange', 'Pink']
  };
  
  // Extract English rashi name from Sanskrit
  const rashiName = rashi.split('(')[1]?.split(' -')[0] || 'Mesha';
  return colorMap[rashiName] || ['Gold', 'Silver', 'White'];
};

export const calculateAstrology = async (birthData: BirthData): Promise<AstrologyResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const birthDate = new Date(birthData.birthDate);
  const vedicRashi = getVedicRashi(birthDate);
  const nakshatra = getNakshatra(birthDate);
  const luckyNumbers = generateVedicLuckyNumbers(birthDate, nakshatra);
  const luckyColors = getVedicLuckyColors(vedicRashi);
  
  // Get language-specific content
  const selectedLanguage = birthData.preferredLanguage || 'English';
  const langContent = languageContent[selectedLanguage as keyof typeof languageContent] || languageContent.English;
  
  // Get cultural preference or default to Sanskrit/Hindu Names
  const cultural = birthData.culturalPreference || "Sanskrit/Hindu Names";
  const gender = birthData.gender === 'unisex' ? Math.random() > 0.5 ? 'boy' : 'girl' : birthData.gender;
  
  let availableNames = vedicNameDatabase[gender as keyof typeof vedicNameDatabase][cultural] || 
                      vedicNameDatabase[gender as keyof typeof vedicNameDatabase]["Sanskrit/Hindu Names"];
  
  // Filter by starting letter if specified
  if (birthData.startsWith) {
    const filtered = availableNames.filter(name => 
      name.name.includes(birthData.startsWith!) || 
      name.name.toLowerCase().startsWith(birthData.startsWith!.toLowerCase())
    );
    if (filtered.length > 0) {
      availableNames = filtered;
    }
  }
  
  // Filter by preference theme if specified
  if (birthData.nameTheme) {
    const preferenceKeywords = birthData.nameTheme.toLowerCase().split(' ');
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
  
  // Ensure minimum 10 names by adding names from other categories if needed
  if (availableNames.length < 10) {
    const allCategories = Object.values(vedicNameDatabase[gender as keyof typeof vedicNameDatabase]);
    const additionalNames = allCategories.flat().filter(name => 
      !availableNames.some(existing => existing.name === name.name)
    );
    availableNames = [...availableNames, ...additionalNames];
  }
  
  // Select and score names (minimum 10, maximum 20)
  const selectedNames = availableNames
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.max(10, Math.min(20, availableNames.length)))
    .map(name => ({
      ...name,
      score: Math.floor(Math.random() * 3) + 8 // Score between 8-10
    }));
  
  return {
    birthSign: vedicRashi,
    nakshatra,
    luckyNumbers,
    luckyColors,
    suggestedNames: selectedNames,
    planetaryInfluence: langContent.planetaryInfluence(vedicRashi, nakshatra),
    recommendations: langContent.recommendations(nakshatra, luckyColors)
  };
};
