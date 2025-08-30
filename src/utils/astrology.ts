
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
      `பிறப்பு ஜாதகம் படி குழந்தையில் சிறந்த அறிவு மற்றும் வெற்றியின் வாய்ப்புகள் உள்ளன.`
    ]
  },
  Hindi: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `जन्म राशि ${rashi} और नक्षत्र ${nakshatra} के अनुसार, आपके बच्चे में नेतृत्व की क्षमता और रचनात्मकता के गुण हैं।`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `नक्षत्र ${nakshatra} के अनुसार नाम चुनने से बच्चे को आध्यात्मिक लाभ मिलेगा।`,
      `राशि के अनुसार ${colors[0]} रंग बच्चे के जीवन में शुभता लाएगा।`,
      `जन्म कुंडली के अनुसार बच्चे में उत्कृष्ट बुद्धि और सफलता की संभावनाएं हैं।`
    ]
  },
  Malayalam: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `ജന്മ രാശി ${rashi} യും നക്ഷത്രം ${nakshatra} യും അനുസരിച്ച്, നിങ്ങളുടെ കുട്ടിയിൽ നേതൃത്വ കഴിവും സൃജനാത്മകതയും ഉണ്ട്.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `നക്ഷത്രം ${nakshatra} അനുസരിച്ച് പേര് തിരഞ്ഞെടുക്കുന്നത് കുട്ടിക്ക് ആത്മീയ ഗുണം നൽകും.`,
      `രാശി അനുസരിച്ച് ${colors[0]} നിറം കുട്ടിയുടെ ജീവിതത്തിൽ ഭാഗ്യം കൊണ്ടുവരും.`,
      `ജന്മ ജാതകം അനുസരിച്ച് കുട്ടിയിൽ മികച്ച ബുദ്ധിയും വിജയ സാധ്യതകളും ഉണ്ട്.`
    ]
  },
  Telugu: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `జన్మ రాశి ${rashi} మరియు నక్షత్రం ${nakshatra} ప్రకారం, మీ పిల్లవాడిలో నాయకత్వ గుణాలు మరియు సృజనాత్మకత ఉన్నాయి.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `నక్షత్రం ${nakshatra} ప్రకారం పేరు ఎంచుకోవడం పిల్లవాడికి ఆధ్యాత్మిక ప్రయోజనం చేకూరుస్తుంది.`,
      `రాశి ప్రకారం ${colors[0]} రంగు పిల్లవాడి జీవితంలో అదృష్టం తెస్తుంది.`,
      `జన్మ జాతకం ప్రకారం పిల్లవాడిలో అద్భుతమైన తెలివితేటలు మరియు విజయ అవకాశాలు ఉన్నాయి.`
    ]
  },
  Kannada: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `ಜನ್ಮ ರಾಶಿ ${rashi} ಮತ್ತು ನಕ್ಷತ್ರ ${nakshatra} ಪ್ರಕಾರ, ನಿಮ್ಮ ಮಗುವಿನಲ್ಲಿ ನಾಯಕತ್ವ ಮತ್ತು ಸೃಜನಶೀಲತೆಯ ಗುಣಗಳಿವೆ.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `ನಕ್ಷತ್ರ ${nakshatra} ಪ್ರಕಾರ ಹೆಸರು ಆಯ್ಕೆ ಮಾಡುವುದರಿಂದ ಮಗುವಿಗೆ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಯೋಜನ ಸಿಗುತ್ತದೆ.`,
      `ರಾಶಿ ಪ್ರಕಾರ ${colors[0]} ಬಣ್ಣ ಮಗುವಿನ ಜೀವನದಲ್ಲಿ ಅದೃಷ್ಟ ತರುತ್ತದೆ.`,
      `ಜನ್ಮ ಜಾತಕ ಪ್ರಕಾರ ಮಗುವಿನಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಬುದ್ಧಿ ಮತ್ತು ಯಶಸ್ಸಿನ ಸಾಧ್ಯತೆಗಳಿವೆ.`
    ]
  },
  English: {
    planetaryInfluence: (rashi: string, nakshatra: string) => 
      `According to birth rashi ${rashi} and nakshatra ${nakshatra}, your child has leadership qualities and creative abilities.`,
    recommendations: (nakshatra: string, colors: string[]) => [
      `Choosing a name according to nakshatra ${nakshatra} will bring spiritual benefits to the child.`,
      `According to the rashi, ${colors[0]} color will bring good fortune in the child's life.`,
      `According to the birth chart, the child has excellent intelligence and potential for success.`
    ]
  }
};

// Language-specific name databases
const languageSpecificNames = {
  Tamil: {
    boy: [
      { name: "அர்ஜுன் (Arjun)", meaning: "Bright, shining warrior", origin: "Tamil" },
      { name: "கார்த்திக் (Karthik)", meaning: "Son of Lord Shiva", origin: "Tamil" },
      { name: "முருகன் (Murugan)", meaning: "Lord Kartikeya", origin: "Tamil" },
      { name: "ராகவ் (Raghav)", meaning: "Lord Rama", origin: "Tamil" },
      { name: "விஷ்ணு (Vishnu)", meaning: "The Preserver", origin: "Tamil" },
      { name: "அனில் (Anil)", meaning: "Wind god", origin: "Tamil" },
      { name: "சூர்யா (Surya)", meaning: "Sun god", origin: "Tamil" },
      { name: "கிருஷ்ணா (Krishna)", meaning: "Dark, attractive one", origin: "Tamil" },
      { name: "ராம் (Ram)", meaning: "Pleasant, charming", origin: "Tamil" },
      { name: "ஹர்ஷ் (Harsh)", meaning: "Joy, happiness", origin: "Tamil" },
      { name: "வாசு (Vasu)", meaning: "Brightness", origin: "Tamil" },
      { name: "ரவி (Ravi)", meaning: "Sun", origin: "Tamil" },
      { name: "ஆதித்யா (Aditya)", meaning: "Son of Aditi", origin: "Tamil" },
      { name: "விகாஸ் (Vikas)", meaning: "Development", origin: "Tamil" },
      { name: "ரோஹித் (Rohit)", meaning: "Red color", origin: "Tamil" },
      { name: "சந்தீப் (Sandeep)", meaning: "Lighting", origin: "Tamil" },
      { name: "ராகேஷ் (Rakesh)", meaning: "Lord of night", origin: "Tamil" },
      { name: "சுரேஷ் (Suresh)", meaning: "Ruler of gods", origin: "Tamil" },
      { name: "மோஹன் (Mohan)", meaning: "Attractive", origin: "Tamil" },
      { name: "கோபால் (Gopal)", meaning: "Cowherd", origin: "Tamil" },
      { name: "மனீஷ் (Manish)", meaning: "God of mind", origin: "Tamil" },
      { name: "நவீன் (Naveen)", meaning: "New", origin: "Tamil" },
      { name: "பிரகாஷ் (Prakash)", meaning: "Light", origin: "Tamil" }
    ],
    girl: [
      { name: "ப்ரியா (Priya)", meaning: "Beloved", origin: "Tamil" },
      { name: "கவிதா (Kavitha)", meaning: "Poetry", origin: "Tamil" },
      { name: "மீரா (Meera)", meaning: "Devotee of Krishna", origin: "Tamil" },
      { name: "தீயா (Diya)", meaning: "Lamp", origin: "Tamil" },
      { name: "அனன்யா (Ananya)", meaning: "Unique", origin: "Tamil" },
      { name: "ஸ்ரியா (Shriya)", meaning: "Prosperity", origin: "Tamil" },
      { name: "அவனி (Avani)", meaning: "Earth", origin: "Tamil" },
      { name: "இஷா (Isha)", meaning: "Goddess", origin: "Tamil" },
      { name: "ரியா (Riya)", meaning: "Singer", origin: "Tamil" },
      { name: "தாரா (Tara)", meaning: "Star", origin: "Tamil" },
      { name: "நைனா (Naina)", meaning: "Eyes", origin: "Tamil" },
      { name: "பூஜா (Pooja)", meaning: "Prayer", origin: "Tamil" },
      { name: "ஸ்னேஹா (Sneha)", meaning: "Love", origin: "Tamil" },
      { name: "வர்ஷா (Varsha)", meaning: "Rain", origin: "Tamil" },
      { name: "ஸ்வாதி (Swati)", meaning: "Independent", origin: "Tamil" },
      { name: "சௌம்யா (Soumya)", meaning: "Gentle", origin: "Tamil" },
      { name: "ஷிவானி (Shivani)", meaning: "Follower of Shiva", origin: "Tamil" },
      { name: "கயத்ரி (Gayatri)", meaning: "Goddess Gayatri", origin: "Tamil" },
      { name: "சங்கீதா (Sangeeta)", meaning: "Music", origin: "Tamil" },
      { name: "ஸுமித்ரா (Sumitra)", meaning: "Good friend", origin: "Tamil" },
      { name: "வைதேஹி (Vaidehi)", meaning: "Princess of Videha", origin: "Tamil" },
      { name: "லட்சுமி (Lakshmi)", meaning: "Goddess of wealth", origin: "Tamil" },
      { name: "சரஸ்வதி (Saraswati)", meaning: "Goddess of knowledge", origin: "Tamil" }
    ]
  },
  Hindi: {
    boy: [
      { name: "अर्जुन (Arjun)", meaning: "Bright, shining warrior", origin: "Hindi" },
      { name: "कृष्ण (Krishna)", meaning: "Dark, attractive one", origin: "Hindi" },
      { name: "राम (Ram)", meaning: "Pleasant, charming", origin: "Hindi" },
      { name: "शिव (Shiv)", meaning: "Auspicious", origin: "Hindi" },
      { name: "विष्णु (Vishnu)", meaning: "The Preserver", origin: "Hindi" },
      { name: "गणेश (Ganesh)", meaning: "Lord of obstacles", origin: "Hindi" },
      { name: "आदित्य (Aditya)", meaning: "Son of Aditi", origin: "Hindi" },
      { name: "अनिल (Anil)", meaning: "Wind god", origin: "Hindi" },
      { name: "सूर्य (Surya)", meaning: "Sun god", origin: "Hindi" },
      { name: "चन्द्र (Chandra)", meaning: "Moon", origin: "Hindi" },
      { name: "राहुल (Rahul)", meaning: "Capable", origin: "Hindi" },
      { name: "रोहित (Rohit)", meaning: "Red color", origin: "Hindi" },
      { name: "विकास (Vikas)", meaning: "Development", origin: "Hindi" },
      { name: "संदीप (Sandeep)", meaning: "Lighting", origin: "Hindi" },
      { name: "राकेश (Rakesh)", meaning: "Lord of night", origin: "Hindi" },
      { name: "सुरेश (Suresh)", meaning: "Ruler of gods", origin: "Hindi" },
      { name: "मोहन (Mohan)", meaning: "Attractive", origin: "Hindi" },
      { name: "गोपाल (Gopal)", meaning: "Cowherd", origin: "Hindi" },
      { name: "मनीष (Manish)", meaning: "God of mind", origin: "Hindi" },
      { name: "नवीन (Naveen)", meaning: "New", origin: "Hindi" },
      { name: "प्रकाश (Prakash)", meaning: "Light", origin: "Hindi" },
      { name: "अमित (Amit)", meaning: "Boundless", origin: "Hindi" },
      { name: "अशोक (Ashok)", meaning: "Without sorrow", origin: "Hindi" }
    ],
    girl: [
      { name: "प्रिया (Priya)", meaning: "Beloved", origin: "Hindi" },
      { name: "कविता (Kavita)", meaning: "Poetry", origin: "Hindi" },
      { name: "मीरा (Meera)", meaning: "Devotee of Krishna", origin: "Hindi" },
      { name: "दीया (Diya)", meaning: "Lamp", origin: "Hindi" },
      { name: "अनन्या (Ananya)", meaning: "Unique", origin: "Hindi" },
      { name: "श्रिया (Shriya)", meaning: "Prosperity", origin: "Hindi" },
      { name: "अवनि (Avani)", meaning: "Earth", origin: "Hindi" },
      { name: "ईशा (Isha)", meaning: "Goddess", origin: "Hindi" },
      { name: "रिया (Riya)", meaning: "Singer", origin: "Hindi" },
      { name: "तारा (Tara)", meaning: "Star", origin: "Hindi" },
      { name: "नैना (Naina)", meaning: "Eyes", origin: "Hindi" },
      { name: "पूजा (Pooja)", meaning: "Prayer", origin: "Hindi" },
      { name: "स्नेहा (Sneha)", meaning: "Love", origin: "Hindi" },
      { name: "वर्षा (Varsha)", meaning: "Rain", origin: "Hindi" },
      { name: "स्वाति (Swati)", meaning: "Independent", origin: "Hindi" },
      { name: "सौम्या (Soumya)", meaning: "Gentle", origin: "Hindi" },
      { name: "शिवानी (Shivani)", meaning: "Follower of Shiva", origin: "Hindi" },
      { name: "गायत्री (Gayatri)", meaning: "Goddess Gayatri", origin: "Hindi" },
      { name: "संगीता (Sangeeta)", meaning: "Music", origin: "Hindi" },
      { name: "सुमित्रा (Sumitra)", meaning: "Good friend", origin: "Hindi" },
      { name: "वैदेही (Vaidehi)", meaning: "Princess of Videha", origin: "Hindi" },
      { name: "लक्ष्मी (Lakshmi)", meaning: "Goddess of wealth", origin: "Hindi" },
      { name: "सरस्वती (Saraswati)", meaning: "Goddess of knowledge", origin: "Hindi" }
    ]
  },
  Malayalam: {
    boy: [
      { name: "അർജുൻ (Arjun)", meaning: "Bright, shining warrior", origin: "Malayalam" },
      { name: "കൃഷ്ണ (Krishna)", meaning: "Dark, attractive one", origin: "Malayalam" },
      { name: "രാം (Ram)", meaning: "Pleasant, charming", origin: "Malayalam" },
      { name: "ശിവ് (Shiv)", meaning: "Auspicious", origin: "Malayalam" },
      { name: "വിഷ്ണു (Vishnu)", meaning: "The Preserver", origin: "Malayalam" },
      { name: "ഗണേശ് (Ganesh)", meaning: "Lord of obstacles", origin: "Malayalam" },
      { name: "ആദിത്യ (Aditya)", meaning: "Son of Aditi", origin: "Malayalam" },
      { name: "അനിൽ (Anil)", meaning: "Wind god", origin: "Malayalam" },
      { name: "സൂര്യ (Surya)", meaning: "Sun god", origin: "Malayalam" },
      { name: "ചന്ദ്ര (Chandra)", meaning: "Moon", origin: "Malayalam" },
      { name: "രാഹുൽ (Rahul)", meaning: "Capable", origin: "Malayalam" },
      { name: "രോഹിത് (Rohit)", meaning: "Red color", origin: "Malayalam" },
      { name: "വികാസ് (Vikas)", meaning: "Development", origin: "Malayalam" },
      { name: "സന്ദീപ് (Sandeep)", meaning: "Lighting", origin: "Malayalam" },
      { name: "രാകേശ് (Rakesh)", meaning: "Lord of night", origin: "Malayalam" },
      { name: "സുരേശ് (Suresh)", meaning: "Ruler of gods", origin: "Malayalam" },
      { name: "മോഹൻ (Mohan)", meaning: "Attractive", origin: "Malayalam" },
      { name: "ഗോപാൽ (Gopal)", meaning: "Cowherd", origin: "Malayalam" },
      { name: "മനീഷ് (Manish)", meaning: "God of mind", origin: "Malayalam" },
      { name: "നവീൻ (Naveen)", meaning: "New", origin: "Malayalam" },
      { name: "പ്രകാശ് (Prakash)", meaning: "Light", origin: "Malayalam" },
      { name: "അമിത് (Amit)", meaning: "Boundless", origin: "Malayalam" },
      { name: "അശോക് (Ashok)", meaning: "Without sorrow", origin: "Malayalam" }
    ],
    girl: [
      { name: "പ്രിയ (Priya)", meaning: "Beloved", origin: "Malayalam" },
      { name: "കവിത (Kavitha)", meaning: "Poetry", origin: "Malayalam" },
      { name: "മീര (Meera)", meaning: "Devotee of Krishna", origin: "Malayalam" },
      { name: "ദീയ (Diya)", meaning: "Lamp", origin: "Malayalam" },
      { name: "അനന്യ (Ananya)", meaning: "Unique", origin: "Malayalam" },
      { name: "ശ്രിയ (Shriya)", meaning: "Prosperity", origin: "Malayalam" },
      { name: "അവനി (Avani)", meaning: "Earth", origin: "Malayalam" },
      { name: "ഈശ (Isha)", meaning: "Goddess", origin: "Malayalam" },
      { name: "രിയ (Riya)", meaning: "Singer", origin: "Malayalam" },
      { name: "താര (Tara)", meaning: "Star", origin: "Malayalam" },
      { name: "നൈന (Naina)", meaning: "Eyes", origin: "Malayalam" },
      { name: "പൂജ (Pooja)", meaning: "Prayer", origin: "Malayalam" },
      { name: "സ്നേഹ (Sneha)", meaning: "Love", origin: "Malayalam" },
      { name: "വർഷ (Varsha)", meaning: "Rain", origin: "Malayalam" },
      { name: "സ്വാതി (Swati)", meaning: "Independent", origin: "Malayalam" },
      { name: "സൗമ്യ (Soumya)", meaning: "Gentle", origin: "Malayalam" },
      { name: "ശിവാനി (Shivani)", meaning: "Follower of Shiva", origin: "Malayalam" },
      { name: "ഗായത്രി (Gayatri)", meaning: "Goddess Gayatri", origin: "Malayalam" },
      { name: "സങ്ഗീത (Sangeeta)", meaning: "Music", origin: "Malayalam" },
      { name: "സുമിത്ര (Sumitra)", meaning: "Good friend", origin: "Malayalam" },
      { name: "വൈദേഹി (Vaidehi)", meaning: "Princess of Videha", origin: "Malayalam" },
      { name: "ലക്ഷ്മി (Lakshmi)", meaning: "Goddess of wealth", origin: "Malayalam" },
      { name: "സരസ്വതി (Saraswati)", meaning: "Goddess of knowledge", origin: "Malayalam" }
    ]
  },
  Telugu: {
    boy: [
      { name: "అర్జున్ (Arjun)", meaning: "Bright, shining warrior", origin: "Telugu" },
      { name: "కృష్ణ (Krishna)", meaning: "Dark, attractive one", origin: "Telugu" },
      { name: "రామ్ (Ram)", meaning: "Pleasant, charming", origin: "Telugu" },
      { name: "శివ్ (Shiv)", meaning: "Auspicious", origin: "Telugu" },
      { name: "విష్ణు (Vishnu)", meaning: "The Preserver", origin: "Telugu" },
      { name: "గణేష్ (Ganesh)", meaning: "Lord of obstacles", origin: "Telugu" },
      { name: "ఆదిత్య (Aditya)", meaning: "Son of Aditi", origin: "Telugu" },
      { name: "అనిల్ (Anil)", meaning: "Wind god", origin: "Telugu" },
      { name: "సూర్య (Surya)", meaning: "Sun god", origin: "Telugu" },
      { name: "చంద్ర (Chandra)", meaning: "Moon", origin: "Telugu" },
      { name: "రాహుల్ (Rahul)", meaning: "Capable", origin: "Telugu" },
      { name: "రోహిత్ (Rohit)", meaning: "Red color", origin: "Telugu" },
      { name: "వికాస్ (Vikas)", meaning: "Development", origin: "Telugu" },
      { name: "సందీప్ (Sandeep)", meaning: "Lighting", origin: "Telugu" },
      { name: "రాకేష్ (Rakesh)", meaning: "Lord of night", origin: "Telugu" },
      { name: "సురేష్ (Suresh)", meaning: "Ruler of gods", origin: "Telugu" },
      { name: "మోహన్ (Mohan)", meaning: "Attractive", origin: "Telugu" },
      { name: "గోపాల్ (Gopal)", meaning: "Cowherd", origin: "Telugu" },
      { name: "మనీష్ (Manish)", meaning: "God of mind", origin: "Telugu" },
      { name: "నవీన్ (Naveen)", meaning: "New", origin: "Telugu" },
      { name: "ప్రకాష్ (Prakash)", meaning: "Light", origin: "Telugu" },
      { name: "అమిత్ (Amit)", meaning: "Boundless", origin: "Telugu" },
      { name: "అశోక్ (Ashok)", meaning: "Without sorrow", origin: "Telugu" }
    ],
    girl: [
      { name: "ప్రియ (Priya)", meaning: "Beloved", origin: "Telugu" },
      { name: "కవిత (Kavitha)", meaning: "Poetry", origin: "Telugu" },
      { name: "మీర (Meera)", meaning: "Devotee of Krishna", origin: "Telugu" },
      { name: "దీయ (Diya)", meaning: "Lamp", origin: "Telugu" },
      { name: "అనన్య (Ananya)", meaning: "Unique", origin: "Telugu" },
      { name: "శ్రియ (Shriya)", meaning: "Prosperity", origin: "Telugu" },
      { name: "అవని (Avani)", meaning: "Earth", origin: "Telugu" },
      { name: "ఈశ (Isha)", meaning: "Goddess", origin: "Telugu" },
      { name: "రియ (Riya)", meaning: "Singer", origin: "Telugu" },
      { name: "తార (Tara)", meaning: "Star", origin: "Telugu" },
      { name: "నైన (Naina)", meaning: "Eyes", origin: "Telugu" },
      { name: "పూజ (Pooja)", meaning: "Prayer", origin: "Telugu" },
      { name: "స్నేహ (Sneha)", meaning: "Love", origin: "Telugu" },
      { name: "వర్ష (Varsha)", meaning: "Rain", origin: "Telugu" },
      { name: "స్వాతి (Swati)", meaning: "Independent", origin: "Telugu" },
      { name: "సౌమ్య (Soumya)", meaning: "Gentle", origin: "Telugu" },
      { name: "శివాని (Shivani)", meaning: "Follower of Shiva", origin: "Telugu" },
      { name: "గాయత్రి (Gayatri)", meaning: "Goddess Gayatri", origin: "Telugu" },
      { name: "సంగీత (Sangeeta)", meaning: "Music", origin: "Telugu" },
      { name: "సుమిత్ర (Sumitra)", meaning: "Good friend", origin: "Telugu" },
      { name: "వైదేహి (Vaidehi)", meaning: "Princess of Videha", origin: "Telugu" },
      { name: "లక్ష్మి (Lakshmi)", meaning: "Goddess of wealth", origin: "Telugu" },
      { name: "సరస్వతి (Saraswati)", meaning: "Goddess of knowledge", origin: "Telugu" }
    ]
  },
  Kannada: {
    boy: [
      { name: "ಅರ್ಜುನ್ (Arjun)", meaning: "Bright, shining warrior", origin: "Kannada" },
      { name: "ಕೃಷ್ಣ (Krishna)", meaning: "Dark, attractive one", origin: "Kannada" },
      { name: "ರಾಮ್ (Ram)", meaning: "Pleasant, charming", origin: "Kannada" },
      { name: "ಶಿವ್ (Shiv)", meaning: "Auspicious", origin: "Kannada" },
      { name: "ವಿಷ್ಣು (Vishnu)", meaning: "The Preserver", origin: "Kannada" },
      { name: "ಗಣೇಶ್ (Ganesh)", meaning: "Lord of obstacles", origin: "Kannada" },
      { name: "ಆದಿತ್ಯ (Aditya)", meaning: "Son of Aditi", origin: "Kannada" },
      { name: "ಅನಿಲ್ (Anil)", meaning: "Wind god", origin: "Kannada" },
      { name: "ಸೂರ್ಯ (Surya)", meaning: "Sun god", origin: "Kannada" },
      { name: "ಚಂದ್ರ (Chandra)", meaning: "Moon", origin: "Kannada" },
      { name: "ರಾಹುಲ್ (Rahul)", meaning: "Capable", origin: "Kannada" },
      { name: "ರೋಹಿತ್ (Rohit)", meaning: "Red color", origin: "Kannada" },
      { name: "ವಿಕಾಸ್ (Vikas)", meaning: "Development", origin: "Kannada" },
      { name: "ಸಂದೀಪ್ (Sandeep)", meaning: "Lighting", origin: "Kannada" },
      { name: "ರಾಕೇಶ್ (Rakesh)", meaning: "Lord of night", origin: "Kannada" },
      { name: "ಸುರೇಶ್ (Suresh)", meaning: "Ruler of gods", origin: "Kannada" },
      { name: "ಮೋಹನ್ (Mohan)", meaning: "Attractive", origin: "Kannada" },
      { name: "ಗೋಪಾಲ್ (Gopal)", meaning: "Cowherd", origin: "Kannada" },
      { name: "ಮನೀಷ್ (Manish)", meaning: "God of mind", origin: "Kannada" },
      { name: "ನವೀನ್ (Naveen)", meaning: "New", origin: "Kannada" },
      { name: "ಪ್ರಕಾಶ್ (Prakash)", meaning: "Light", origin: "Kannada" },
      { name: "ಅಮಿತ್ (Amit)", meaning: "Boundless", origin: "Kannada" },
      { name: "ಅಶೋಕ್ (Ashok)", meaning: "Without sorrow", origin: "Kannada" }
    ],
    girl: [
      { name: "ಪ್ರಿಯ (Priya)", meaning: "Beloved", origin: "Kannada" },
      { name: "ಕವಿತ (Kavitha)", meaning: "Poetry", origin: "Kannada" },
      { name: "ಮೀರ (Meera)", meaning: "Devotee of Krishna", origin: "Kannada" },
      { name: "ದೀಯ (Diya)", meaning: "Lamp", origin: "Kannada" },
      { name: "ಅನನ್ಯ (Ananya)", meaning: "Unique", origin: "Kannada" },
      { name: "ಶ್ರಿಯ (Shriya)", meaning: "Prosperity", origin: "Kannada" },
      { name: "ಅವನಿ (Avani)", meaning: "Earth", origin: "Kannada" },
      { name: "ಈಶ (Isha)", meaning: "Goddess", origin: "Kannada" },
      { name: "ರಿಯ (Riya)", meaning: "Singer", origin: "Kannada" },
      { name: "ತಾರ (Tara)", meaning: "Star", origin: "Kannada" },
      { name: "ನೈನ (Naina)", meaning: "Eyes", origin: "Kannada" },
      { name: "ಪೂಜ (Pooja)", meaning: "Prayer", origin: "Kannada" },
      { name: "ಸ್ನೇಹ (Sneha)", meaning: "Love", origin: "Kannada" },
      { name: "ವರ್ಷ (Varsha)", meaning: "Rain", origin: "Kannada" },
      { name: "ಸ್ವಾತಿ (Swati)", meaning: "Independent", origin: "Kannada" },
      { name: "ಸೌಮ್ಯ (Soumya)", meaning: "Gentle", origin: "Kannada" },
      { name: "ಶಿವಾನಿ (Shivani)", meaning: "Follower of Shiva", origin: "Kannada" },
      { name: "ಗಾಯತ್ರಿ (Gayatri)", meaning: "Goddess Gayatri", origin: "Kannada" },
      { name: "ಸಂಗೀತ (Sangeeta)", meaning: "Music", origin: "Kannada" },
      { name: "ಸುಮಿತ್ರ (Sumitra)", meaning: "Good friend", origin: "Kannada" },
      { name: "ವೈದೇಹಿ (Vaidehi)", meaning: "Princess of Videha", origin: "Kannada" },
      { name: "ಲಕ್ಷ್ಮಿ (Lakshmi)", meaning: "Goddess of wealth", origin: "Kannada" },
      { name: "ಸರಸ್ವತಿ (Saraswati)", meaning: "Goddess of knowledge", origin: "Kannada" }
    ]
  },
  English: {
    boy: [
      { name: "Arjun", meaning: "Bright, shining warrior", origin: "English" },
      { name: "Krishna", meaning: "Dark, attractive one", origin: "English" },
      { name: "Ram", meaning: "Pleasant, charming", origin: "English" },
      { name: "Shiv", meaning: "Auspicious", origin: "English" },
      { name: "Vishnu", meaning: "The Preserver", origin: "English" },
      { name: "Ganesh", meaning: "Lord of obstacles", origin: "English" },
      { name: "Aditya", meaning: "Son of Aditi", origin: "English" },
      { name: "Anil", meaning: "Wind god", origin: "English" },
      { name: "Surya", meaning: "Sun god", origin: "English" },
      { name: "Chandra", meaning: "Moon", origin: "English" },
      { name: "Rahul", meaning: "Capable", origin: "English" },
      { name: "Rohit", meaning: "Red color", origin: "English" },
      { name: "Vikas", meaning: "Development", origin: "English" },
      { name: "Sandeep", meaning: "Lighting", origin: "English" },
      { name: "Rakesh", meaning: "Lord of night", origin: "English" },
      { name: "Suresh", meaning: "Ruler of gods", origin: "English" },
      { name: "Mohan", meaning: "Attractive", origin: "English" },
      { name: "Gopal", meaning: "Cowherd", origin: "English" },
      { name: "Manish", meaning: "God of mind", origin: "English" },
      { name: "Naveen", meaning: "New", origin: "English" },
      { name: "Prakash", meaning: "Light", origin: "English" },
      { name: "Amit", meaning: "Boundless", origin: "English" },
      { name: "Ashok", meaning: "Without sorrow", origin: "English" }
    ],
    girl: [
      { name: "Priya", meaning: "Beloved", origin: "English" },
      { name: "Kavitha", meaning: "Poetry", origin: "English" },
      { name: "Meera", meaning: "Devotee of Krishna", origin: "English" },
      { name: "Diya", meaning: "Lamp", origin: "English" },
      { name: "Ananya", meaning: "Unique", origin: "English" },
      { name: "Shriya", meaning: "Prosperity", origin: "English" },
      { name: "Avani", meaning: "Earth", origin: "English" },
      { name: "Isha", meaning: "Goddess", origin: "English" },
      { name: "Riya", meaning: "Singer", origin: "English" },
      { name: "Tara", meaning: "Star", origin: "English" },
      { name: "Naina", meaning: "Eyes", origin: "English" },
      { name: "Pooja", meaning: "Prayer", origin: "English" },
      { name: "Sneha", meaning: "Love", origin: "English" },
      { name: "Varsha", meaning: "Rain", origin: "English" },
      { name: "Swati", meaning: "Independent", origin: "English" },
      { name: "Soumya", meaning: "Gentle", origin: "English" },
      { name: "Shivani", meaning: "Follower of Shiva", origin: "English" },
      { name: "Gayatri", meaning: "Goddess Gayatri", origin: "English" },
      { name: "Sangeeta", meaning: "Music", origin: "English" },
      { name: "Sumitra", meaning: "Good friend", origin: "English" },
      { name: "Vaidehi", meaning: "Princess of Videha", origin: "English" },
      { name: "Lakshmi", meaning: "Goddess of wealth", origin: "English" },
      { name: "Saraswati", meaning: "Goddess of knowledge", origin: "English" }
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
  
  // Get language-specific names
  const gender = birthData.gender === 'unisex' ? Math.random() > 0.5 ? 'boy' : 'girl' : birthData.gender;
  let availableNames = languageSpecificNames[selectedLanguage as keyof typeof languageSpecificNames]?.[gender as keyof typeof languageSpecificNames.English] || 
                      languageSpecificNames.English[gender as keyof typeof languageSpecificNames.English];
  
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
  
  // Select and score names (all available names)
  const selectedNames = availableNames
    .sort(() => Math.random() - 0.5)
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
