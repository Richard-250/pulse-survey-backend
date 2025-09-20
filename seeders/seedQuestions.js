// seeder/seedQuestions.js
const Question = require('../models/Question');

const seedQuestions = async () => {
  try {
    const questions =[
  {
    "id": "q1",
    "text": "How many minutes do you typically spend commuting each weekday?",
    "choices": ["Less than 15", "15–30", "30–60", "More than 60"]
  },
  {
    "id": "q2",
    "text": "Which grocery item have you noticed has increased most in price recently?",
    "choices": ["Bread & staples", "Vegetables & fruits", "Cooking oil", "Dairy & eggs"]
  },
  {
    "id": "q3",
    "text": "How reliable is your mobile network during peak evening hours?",
    "choices": ["Very reliable", "Mostly reliable", "Occasionally drops", "Often unavailable"]
  },
  {
    "id": "q4",
    "text": "Do you prefer mobile money or cash for small purchases under 5,000 RWF?",
    "choices": ["Mobile money", "Cash", "Depends on merchant", "No preference"]
  },
  {
    "id": "q5",
    "text": "How many hours of uninterrupted electricity did you have yesterday?",
    "choices": ["0–4", "5–8", "9–16", "More than 16"]
  },
  {
    "id": "q6",
    "text": "How often do you shop using online delivery services in a month?",
    "choices": ["Never", "1–3 times", "4–8 times", "More than 8"]
  },
  {
    "id": "q7",
    "text": "Which social media platform do you use most for news?",
    "choices": ["Facebook", "Twitter/X", "WhatsApp/Telegram", "Other"]
  },
  {
    "id": "q8",
    "text": "How comfortable are you using contactless payments in small shops?",
    "choices": ["Very comfortable", "Somewhat comfortable", "Not comfortable", "I avoid them"]
  },
  {
    "id": "q9",
    "text": "Do you use any fitness or health apps daily?",
    "choices": ["Yes", "No", "Occasionally", "I used to"]
  },
  {
    "id": "q10",
    "text": "How often do power outages affect your work or study?",
    "choices": ["Never", "Rarely", "Sometimes", "Often"]
  },
  {
    "id": "q11",
    "text": "How many cups of coffee or tea do you drink daily?",
    "choices": ["None", "1-2", "3-4", "5 or more"]
  },
  {
    "id": "q12",
    "text": "What is your primary mode of transportation?",
    "choices": ["Walking", "Public transport", "Personal vehicle", "Bicycle"]
  },
  {
    "id": "q13",
    "text": "How often do you eat out at restaurants?",
    "choices": ["Once a week or less", "2-3 times a week", "4-5 times a week", "Almost every day"]
  },
  {
    "id": "q14",
    "text": "Which streaming service do you use most frequently?",
    "choices": ["Netflix", "YouTube", "Amazon Prime", "Other"]
  },
  {
    "id": "q15",
    "text": "How many hours of sleep do you typically get per night?",
    "choices": ["Less than 5", "5-6", "7-8", "More than 8"]
  },
  {
    "id": "q16",
    "text": "How do you primarily stay informed about current events?",
    "choices": ["TV news", "Online news sites", "Social media", "Word of mouth"]
  },
  {
    "id": "q17",
    "text": "How often do you experience water shortages?",
    "choices": ["Never", "Rarely", "Monthly", "Weekly"]
  },
  {
    "id": "q18",
    "text": "What type of housing do you live in?",
    "choices": ["Apartment", "Stand-alone house", "Compound", "Other"]
  },
  {
    "id": "q19",
    "text": "How would you rate your internet speed for daily tasks?",
    "choices": ["Excellent", "Good", "Fair", "Poor"]
  },
  {
    "id": "q20",
    "text": "How often do you visit a market for fresh produce?",
    "choices": ["Daily", "2-3 times a week", "Once a week", "Less than once a week"]
  },
  {
    "id": "q21",
    "text": "Which banking service do you use most frequently?",
    "choices": ["Mobile banking", "ATM", "Bank branch", "Online banking"]
  },
  {
    "id": "q22",
    "text": "How many people live in your household?",
    "choices": ["1-2", "3-4", "5-6", "More than 6"]
  },
  {
    "id": "q23",
    "text": "How often do you use public transportation?",
    "choices": ["Daily", "Several times a week", "Rarely", "Never"]
  },
  {
    "id": "q24",
    "text": "What is your main source of drinking water?",
    "choices": ["Tap water", "Bottled water", "Filtered water", "Well water"]
  },
  {
    "id": "q25",
    "text": "How often do you experience traffic congestion during your commute?",
    "choices": ["Always", "Often", "Sometimes", "Rarely"]
  },
  {
    "id": "q26",
    "text": "Which device do you use most for internet browsing?",
    "choices": ["Smartphone", "Laptop", "Tablet", "Desktop computer"]
  },
  {
    "id": "q27",
    "text": "How would you rate the availability of parking in your area?",
    "choices": ["Very easy", "Somewhat easy", "Difficult", "Very difficult"]
  },
  {
    "id": "q28",
    "text": "How often do you cook meals at home?",
    "choices": ["Every day", "Most days", "A few times a week", "Rarely"]
  },
  {
    "id": "q29",
    "text": "What is your preferred way to communicate with friends?",
    "choices": ["Phone call", "Text messaging", "Social media", "In person"]
  },
  {
    "id": "q30",
    "text": "How often do you participate in outdoor activities?",
    "choices": ["Daily", "Weekly", "Monthly", "Rarely"]
  },
  {
    "id": "q31",
    "text": "Which factor is most important when choosing a place to eat?",
    "choices": ["Price", "Convenience", "Food quality", "Ambiance"]
  },
  {
    "id": "q32",
    "text": "How do you typically pay your utility bills?",
    "choices": ["Mobile payment", "Bank transfer", "In person", "Automatic deduction"]
  },
  {
    "id": "q33",
    "text": "How often do you experience slow internet speeds?",
    "choices": ["Never", "Rarely", "Sometimes", "Frequently"]
  },
  {
    "id": "q34",
    "text": "What is your primary way to listen to music?",
    "choices": ["Streaming services", "Radio", "Personal collection", "Music channels on TV"]
  },
  {
    "id": "q35",
    "text": "How often do you buy new clothes?",
    "choices": ["Once a month", "Every 2-3 months", "Twice a year", "Once a year or less"]
  },
  {
    "id": "q36",
    "text": "Which type of fuel does your vehicle use?",
    "choices": ["Petrol", "Diesel", "Electric", "I don't own a vehicle"]
  },
  {
    "id": "q37",
    "text": "How often do you use food delivery apps?",
    "choices": ["Never", "Rarely", "Once a week", "Several times a week"]
  },
  {
    "id": "q38",
    "text": "What is your main method for saving money?",
    "choices": ["Bank account", "Mobile money", "Cash at home", "Investments"]
  },
  {
    "id": "q39",
    "text": "How often do you back up your important digital files?",
    "choices": ["Automatically", "Weekly", "Monthly", "Rarely/Never"]
  },
  {
    "id": "q40",
    "text": "Which type of entertainment do you spend most on?",
    "choices": ["Streaming services", "Cinema", "Live events", "Games"]
  },
  {
    "id": "q41",
    "text": "How often do you check your phone within an hour of waking up?",
    "choices": ["Immediately", "Within 15 minutes", "Within 30 minutes", "After an hour or more"]
  },
  {
    "id": "q42",
    "text": "What is your preferred way to shop for groceries?",
    "choices": ["Supermarket", "Local market", "Online delivery", "Small neighborhood shops"]
  },
  {
    "id": "q43",
    "text": "How often do you experience issues with your water supply?",
    "choices": ["Never", "Rarely", "Sometimes", "Frequently"]
  },
  {
    "id": "q44",
    "text": "Which social media platform do you use most frequently?",
    "choices": ["Facebook", "Instagram", "Twitter/X", "WhatsApp/Telegram"]
  },
  {
    "id": "q45",
    "text": "How do you typically send money to family or friends?",
    "choices": ["Mobile money", "Bank transfer", "Cash in person", "Through an app"]
  },
  {
    "id": "q46",
    "text": "How many books do you read in a month?",
    "choices": ["None", "1", "2-3", "4 or more"]
  },
  {
    "id": "q47",
    "text": "What is your primary source of news?",
    "choices": ["Television", "Online news sites", "Social media", "Newspapers"]
  },
  {
    "id": "q48",
    "text": "How often do you exercise?",
    "choices": ["Daily", "3-4 times a week", "1-2 times a week", "Rarely/Never"]
  },
  {
    "id": "q49",
    "text": "Which payment method do you use for large purchases?",
    "choices": ["Mobile money", "Card payment", "Bank transfer", "Cash"]
  },
  {
    "id": "q50",
    "text": "How often do you have to queue for services?",
    "choices": ["Daily", "Weekly", "Monthly", "Rarely"]
  },
  {
    "id": "q51",
    "text": "What is your main concern about online shopping?",
    "choices": ["Security", "Delivery time", "Product quality", "Return policy"]
  },
  {
    "id": "q52",
    "text": "How often do you use video calling apps?",
    "choices": ["Daily", "Weekly", "Monthly", "Rarely"]
  },
  {
    "id": "q53",
    "text": "Which factor most influences your grocery shopping decisions?",
    "choices": ["Price", "Quality", "Convenience", "Brand loyalty"]
  },
  {
    "id": "q54",
    "text": "How often do you check your social media accounts?",
    "choices": ["Multiple times daily", "Once daily", "A few times weekly", "Rarely"]
  },
  {
    "id": "q55",
    "text": "What is your preferred way to relax after work?",
    "choices": ["Watching TV", "Reading", "Exercising", "Socializing"]
  },
  {
    "id": "q56",
    "text": "How often do you try new recipes when cooking?",
    "choices": ["Weekly", "Monthly", "Rarely", "Never"]
  },
  {
    "id": "q57",
    "text": "Which type of content do you watch most online?",
    "choices": ["News", "Entertainment", "Educational", "Sports"]
  },
  {
    "id": "q58",
    "text": "How do you typically plan your daily activities?",
    "choices": ["Digital calendar", "Physical planner", "Mental notes", "I don't plan"]
  },
  {
    "id": "q59",
    "text": "How often do you experience issues with public transportation?",
    "choices": ["Never", "Rarely", "Sometimes", "Frequently"]
  },
  {
    "id": "q60",
    "text": "What is your primary method for remembering passwords?",
    "choices": ["Password manager", "Write them down", "Memory", "Use the same password"]
  },
  {
    "id": "q61",
    "text": "How often do you donate to charity?",
    "choices": ["Monthly", "Quarterly", "Yearly", "Never"]
  },
  {
    "id": "q62",
    "text": "Which device do you use most for social media?",
    "choices": ["Smartphone", "Tablet", "Laptop", "Desktop computer"]
  },
  {
    "id": "q63",
    "text": "How often do you eat fast food?",
    "choices": ["Never", "Once a month", "Once a week", "Several times a week"]
  },
  {
    "id": "q64",
    "text": "What is your main method for learning new skills?",
    "choices": ["Online courses", "Books", "In-person classes", "Learning from friends"]
  },
  {
    "id": "q65",
    "text": "How often do you back up your phone data?",
    "choices": ["Automatically", "Weekly", "Monthly", "Rarely/Never"]
  },
  {
    "id": "q66",
    "text": "Which factor is most important when choosing a mobile plan?",
    "choices": ["Data allowance", "Call rates", "Network coverage", "Price"]
  },
  {
    "id": "q67",
    "text": "How often do you visit healthcare facilities?",
    "choices": ["Monthly", "Quarterly", "Only when sick", "Rarely"]
  },
  {
    "id": "q68",
    "text": "What is your preferred way to pay for public transportation?",
    "choices": ["Cash", "Transport card", "Mobile payment", "Monthly pass"]
  },
  {
    "id": "q69",
    "text": "How often do you check product reviews before purchasing?",
    "choices": ["Always", "Often", "Sometimes", "Never"]
  },
  {
    "id": "q70",
    "text": "Which type of investment are you most familiar with?",
    "choices": ["Savings account", "Real estate", "Stocks", "I don't invest"]
  },
  {
    "id": "q71",
    "text": "How often do you update your software/apps?",
    "choices": ["Automatically", "Immediately when notified", "After some time", "Rarely"]
  },
  {
    "id": "q72",
    "text": "What is your main source of stress in daily life?",
    "choices": ["Work", "Finances", "Family", "Health"]
  },
  {
    "id": "q73",
    "text": "How often do you use navigation apps when traveling?",
    "choices": ["Always", "Often", "Only in unfamiliar areas", "Never"]
  },
  {
    "id": "q74",
    "text": "Which household chore do you spend the most time on?",
    "choices": ["Cooking", "Cleaning", "Laundry", "Shopping"]
  },
  {
    "id": "q75",
    "text": "How often do you participate in community events?",
    "choices": ["Weekly", "Monthly", "A few times a year", "Never"]
  },
  {
    "id": "q76",
    "text": "What is your preferred way to discover new music?",
    "choices": ["Streaming recommendations", "Radio", "Friends", "Social media"]
  },
  {
    "id": "q77",
    "text": "How often do you check your bank account balance?",
    "choices": ["Daily", "Weekly", "Monthly", "Rarely"]
  },
  {
    "id": "q78",
    "text": "Which factor is most important when choosing a place to live?",
    "choices": ["Price", "Location", "Size", "Amenities"]
  },
  {
    "id": "q79",
    "text": "How often do you use public Wi-Fi networks?",
    "choices": ["Daily", "Weekly", "Rarely", "Never"]
  },
  {
    "id": "q80",
    "text": "What is your main method for tracking expenses?",
    "choices": ["Mobile app", "Spreadsheet", "Notebook", "I don't track"]
  },
  {
    "id": "q81",
    "text": "How often do you experience issues with online payments?",
    "choices": ["Never", "Rarely", "Sometimes", "Frequently"]
  },
  {
    "id": "q82",
    "text": "Which type of content do you share most on social media?",
    "choices": ["Personal updates", "News articles", "Memes/funny content", "Photos/videos"]
  },
  {
    "id": "q83",
    "text": "How often do you carpool or share rides?",
    "choices": ["Daily", "Weekly", "Rarely", "Never"]
  },
  {
    "id": "q84",
    "text": "What is your preferred way to complain about a product or service?",
    "choices": ["In person", "Phone call", "Email", "Social media"]
  },
  {
    "id": "q85",
    "text": "How often do you use cash versus digital payments?",
    "choices": ["Mostly cash", "Mostly digital", "50/50", "It depends on the situation"]
  },
  {
    "id": "q86",
    "text": "Which factor most influences your choice of bank?",
    "choices": ["Fees", "Convenience", "Customer service", "Digital services"]
  },
  {
    "id": "q87",
    "text": "How often do you forget important dates or appointments?",
    "choices": ["Never", "Rarely", "Sometimes", "Often"]
  },
  {
    "id": "q88",
    "text": "What is your primary device for watching movies or TV shows?",
    "choices": ["Smartphone", "TV", "Laptop", "Tablet"]
  },
  {
    "id": "q89",
    "text": "How often do you try to repair items instead of replacing them?",
    "choices": ["Always", "Often", "Sometimes", "Never"]
  },
  {
    "id": "q90",
    "text": "Which language do you primarily use on your digital devices?",
    "choices": ["English", "Local language", "Mixed", "Other"]
  },
  {
    "id": "q91",
    "text": "How often do you back up important photos?",
    "choices": ["Automatically to cloud", "Manual backup", "Rarely", "Never"]
  },
  {
    "id": "q92",
    "text": "What is your main consideration when choosing a mobile phone?",
    "choices": ["Price", "Camera quality", "Battery life", "Brand"]
  },
  {
    "id": "q93",
    "text": "How often do you participate in online surveys or polls?",
    "choices": ["Never", "Rarely", "Sometimes", "Often"]
  },
  {
    "id": "q94",
    "text": "Which method do you prefer for customer service interactions?",
    "choices": ["Phone", "Email", "Live chat", "In person"]
  },
  {
    "id": "q95",
    "text": "How often do you check the weather forecast?",
    "choices": ["Daily", "When planning outdoor activities", "Rarely", "Never"]
  },
  {
    "id": "q96",
    "text": "What is your primary source of cooking recipes?",
    "choices": ["Online", "Cookbooks", "Family", "Trial and error"]
  },
  {
    "id": "q97",
    "text": "How often do you use discount coupons or promo codes?",
    "choices": ["Whenever available", "Sometimes", "Rarely", "Never"]
  },
  {
    "id": "q98",
    "text": "Which factor is most important when choosing an internet provider?",
    "choices": ["Speed", "Reliability", "Price", "Customer service"]
  },
  {
    "id": "q99",
    "text": "How often do you change your passwords?",
    "choices": ["Every 3 months", "Every 6 months", "Once a year", "Only when required"]
  },
  {
    "id": "q100",
    "text": "What is your preferred way to wake up in the morning?",
    "choices": ["Alarm clock", "Phone alarm", "Natural waking", "Someone wakes me"]
  },
   {
    "id": "q101",
    "text": "How often do you check your email?",
    "choices": ["Multiple times daily", "Once daily", "A few times weekly", "Rarely"]
  },
  {
    "id": "q102",
    "text": "What is your primary method for taking notes?",
    "choices": ["Paper notebook", "Phone notes app", "Digital tablet", "Computer software"]
  },
  {
    "id": "q103",
    "text": "How often do you need to charge your phone during the day?",
    "choices": ["Multiple times", "Once", "Rarely", "Never needed"]
  },
  {
    "id": "q104",
    "text": "Which type of packaging frustrates you the most when opening?",
    "choices": ["Plastic clamshell", "Excessive plastic wrap", "Hard-to-open boxes", "Sealed jars"]
  },
  {
    "id": "q105",
    "text": "How do you primarily consume news?",
    "choices": ["Reading articles", "Watching videos", "Listening to podcasts", "Social media snippets"]
  },
  {
    "id": "q106",
    "text": "How often do you need to restart your router?",
    "choices": ["Daily", "Weekly", "Monthly", "Rarely/Never"]
  },
  {
    "id": "q107",
    "text": "What is your biggest frustration with online shopping?",
    "choices": ["Delivery delays", "Product not matching description", "Return process", "Shipping costs"]
  },
  {
    "id": "q108",
    "text": "How often do you use voice assistants?",
    "choices": ["Daily", "Weekly", "Rarely", "Never"]
  },
  {
    "id": "q109",
    "text": "Which household appliance requires the most repairs?",
    "choices": ["Refrigerator", "Washing machine", "Oven/stove", "Water heater"]
  },
  {
    "id": "q110",
    "text": "How do you typically discover new TV shows or movies?",
    "choices": ["Streaming recommendations", "Friend suggestions", "Social media", "Traditional advertising"]
  },
  {
    "id": "q111",
    "text": "How often do you need to update your apps?",
    "choices": ["Automatically", "Weekly", "Monthly", "Only when forced"]
  },
  {
    "id": "q112",
    "text": "What is your preferred lighting for evening relaxation?",
    "choices": ["Bright overhead lights", "Lamp lighting", "Dimmed lights", "Candlelight"]
  },
  {
    "id": "q113",
    "text": "How often do you back up your computer files?",
    "choices": ["Automatically", "Weekly", "Monthly", "Rarely/Never"]
  },
  {
    "id": "q114",
    "text": "Which public service needs the most improvement in your area?",
    "choices": ["Public transportation", "Waste management", "Road maintenance", "Water supply"]
  },
  {
    "id": "q115",
    "text": "How do you typically deal with spam calls?",
    "choices": ["Ignore them", "Block the number", "Answer and hang up", "Use spam protection apps"]
  },
  {
    "id": "q116",
    "text": "What is your biggest challenge with recycling?",
    "choices": ["Knowing what can be recycled", "Access to recycling facilities", "Lack of space", "Time required"]
  },
  {
    "id": "q117",
    "text": "How often do you need to replace your phone charger?",
    "choices": ["Every few months", "Once a year", "Every 2 years", "Rarely/never"]
  },
  {
    "id": "q118",
    "text": "Which home maintenance task do you procrastinate on most?",
    "choices": ["Cleaning gutters", "Changing air filters", "Testing smoke alarms", "Deep cleaning"]
  },
  {
    "id": "q119",
    "text": "How do you typically remember to take medications?",
    "choices": ["Phone alarm", "Pill organizer", "Daily routine", "Family reminders"]
  },
  {
    "id": "q120",
    "text": "What is your primary method for drying clothes?",
    "choices": ["Clothesline", "Tumble dryer", "Drying rack indoors", "Radiator/heater"]
  },
  {
    "id": "q121",
    "text": "How often do you need to reset forgotten passwords?",
    "choices": ["Weekly", "Monthly", "Every few months", "Rarely"]
  },
  {
    "id": "q122",
    "text": "Which kitchen gadget do you use most frequently?",
    "choices": ["Microwave", "Coffee maker", "Blender", "Toaster"]
  },
  {
    "id": "q123",
    "text": "How do you typically cool your home in hot weather?",
    "choices": ["Air conditioning", "Fans", "Open windows", "Shades/curtains closed"]
  },
  {
    "id": "q124",
    "text": "What is your biggest frustration with automated customer service?",
    "choices": ["Cannot reach human", "Complex menu options", "Poor voice recognition", "Limited solutions"]
  },
  {
    "id": "q125",
    "text": "How often do you clean your phone screen?",
    "choices": ["Daily", "Weekly", "When visibly dirty", "Rarely"]
  },
  {
    "id": "q126",
    "text": "Which type of battery drains fastest in your devices?",
    "choices": ["Phone", "Laptop", "Tablet", "Wireless headphones"]
  },
  {
    "id": "q127",
    "text": "How do you typically navigate in unfamiliar areas?",
    "choices": ["GPS navigation app", "Paper maps", "Ask locals", "Memorize directions beforehand"]
  },
  {
    "id": "q128",
    "text": "What is your primary method for storing leftovers?",
    "choices": ["Plastic containers", "Glass containers", "Plastic wrap", "Reusable food wraps"]
  },
  {
    "id": "q129",
    "text": "How often do you need to clear storage space on your phone?",
    "choices": ["Weekly", "Monthly", "Every few months", "Rarely"]
  },
  {
    "id": "q130",
    "text": "Which home security measures do you use?",
    "choices": ["Locks only", "Security system", "Security cameras", "Motion sensor lights"]
  },
  {
    "id": "q131",
    "text": "How do you typically wake up in the morning?",
    "choices": ["Alarm clock", "Phone alarm", "Natural wake-up", "Family member wakes me"]
  },
  {
    "id": "q132",
    "text": "What is your biggest challenge with online meetings?",
    "choices": ["Technical issues", "Background distractions", "Difficulty engaging", "Scheduling across time zones"]
  },
  {
    "id": "q133",
    "text": "How often do you need to replace light bulbs?",
    "choices": ["Monthly", "Every few months", "Yearly", "Rarely"]
  },
  {
    "id": "q134",
    "text": "Which method do you use for taking temperature?",
    "choices": ["Digital thermometer", "Mercury thermometer", "Forehead scanner", "No thermometer"]
  },
  {
    "id": "q135",
    "text": "How do you typically track time while cooking?",
    "choices": ["Phone timer", "Oven timer", "Kitchen timer", "Mental estimation"]
  },
  {
    "id": "q136",
    "text": "What is your primary method for purifying drinking water?",
    "choices": ["Filter pitcher", "Faucet filter", "Bottled water", "Boiling"]
  },
  {
    "id": "q137",
    "text": "How often do you need to defrost your freezer?",
    "choices": ["Monthly", "Quarterly", "Twice a year", "Never (frost-free)"]
  },
  {
    "id": "q138",
    "text": "Which personal care task takes the most time in your routine?",
    "choices": ["Hair styling", "Skincare", "Showering", "Selecting outfit"]
  },
  {
    "id": "q139",
    "text": "How do you typically monitor your daily activity?",
    "choices": ["Smartwatch", "Fitness app", "Manual tracking", "Don't track"]
  },
  {
    "id": "q140",
    "text": "What is your biggest challenge with public transportation?",
    "choices": ["Unreliable schedule", "Overcrowding", "Limited routes", "Cleanliness"]
  },
  {
    "id": "q141",
    "text": "How often do you need to clean your computer keyboard?",
    "choices": ["Weekly", "Monthly", "Every few months", "Rarely"]
  },
  {
    "id": "q142",
    "text": "Which method do you use for measuring ingredients while cooking?",
    "choices": ["Measuring cups", "Kitchen scale", "Estimation", "Recipe-specific tools"]
  },
  {
    "id": "q143",
    "text": "How do you typically cut fruits and vegetables?",
    "choices": ["Traditional knife", "Mandoline slicer", "Food processor", "Pre-cut purchases"]
  },
  {
    "id": "q144",
    "text": "What is your primary method for organizing photos?",
    "choices": ["Digital albums", "Cloud storage", "Physical albums", "No organization"]
  },
  {
    "id": "q145",
    "text": "How often do you need to replace your toothbrush?",
    "choices": ["Monthly", "Every 3 months", "Every 6 months", "When visibly worn"]
  },
  {
    "id": "q146",
    "text": "Which cleaning supply do you restock most frequently?",
    "choices": ["Dish soap", "Laundry detergent", "All-purpose cleaner", "Paper products"]
  },
  {
    "id": "q147",
    "text": "How do you typically remove stains from clothing?",
    "choices": ["Pre-treatment", "Specialty stain removers", "Home remedies", "Professional cleaning"]
  },
  {
    "id": "q148",
    "text": "What is your biggest challenge with waste disposal?",
    "choices": ["Limited pickup services", "Sorting requirements", "Odor control", "Space for bins"]
  },
  {
    "id": "q149",
    "text": "How often do you need to replace air filters in your home?",
    "choices": ["Monthly", "Every 3 months", "Every 6 months", "Yearly"]
  },
  {
    "id": "q150",
    "text": "Which method do you use for sharpening knives?",
    "choices": ["Sharpening steel", "Whetstone", "Electric sharpener", "Professional service"]
  },
  {
    "id": "q151",
    "text": "How do you typically track your spending?",
    "choices": ["Budgeting app", "Spreadsheet", "Paper ledger", "Mental tracking"]
  },
  {
    "id": "q152",
    "text": "What is your primary method for storing digital documents?",
    "choices": ["Cloud storage", "Computer hard drive", "External drive", "Printed copies"]
  },
  {
    "id": "q153",
    "text": "How often do you need to clean your glasses?",
    "choices": ["Multiple times daily", "Once daily", "When noticeably dirty", "Rarely"]
  },
  {
    "id": "q154",
    "text": "Which household task do you find most tedious?",
    "choices": ["Dishes", "Laundry", "Vacuuming", "Bathroom cleaning"]
  },
  {
    "id": "q155",
    "text": "How do you typically thaw frozen food?",
    "choices": ["Refrigerator", "Cold water", "Microwave", "Counter thawing"]
  },
  {
    "id": "q156",
    "text": "What is your biggest challenge with plant care?",
    "choices": ["Proper watering", "Adequate sunlight", "Pest control", "Soil quality"]
  },
  {
    "id": "q157",
    "text": "How often do you need to replace kitchen sponges?",
    "choices": ["Weekly", "Bi-weekly", "Monthly", "When worn out"]
  },
  {
    "id": "q158",
    "text": "Which method do you use for organizing cables?",
    "choices": ["Cable ties", "Cable sleeves", "Cable management box", "No organization"]
  },
  {
    "id": "q159",
    "text": "How do you typically monitor weather conditions?",
    "choices": ["Weather app", "TV forecast", "Website", "Outdoor observation"]
  },
  {
    "id": "q160",
    "text": "What is your primary method for preventing mosquito bites?",
    "choices": ["Repellent spray", "Mosquito nets", "Citronella candles", "Screened windows"]
  },
  {
    "id": "q161",
    "text": "How often do you need to clean your water bottles?",
    "choices": ["Daily", "Every few days", "Weekly", "Rarely"]
  },
  {
    "id": "q162",
    "text": "Which method do you use for organizing your pantry?",
    "choices": ["Clear containers", "Shelving units", "Baskets/bins", "No organization"]
  },
  {
    "id": "q163",
    "text": "How do you typically remove dust from your home?",
    "choices": ["Feather duster", "Microfiber cloth", "Vacuum attachment", "Static duster"]
  },
  {
    "id": "q164",
    "text": "What is your biggest challenge with laundry?",
    "choices": ["Folding/putting away", "Stain treatment", "Sorting colors", "Remembering to switch loads"]
  },
  {
    "id": "q165",
    "text": "How often do you need to replace your shower curtain?",
    "choices": ["Every 6 months", "Yearly", "Every 2 years", "When moldy/torn"]
  },
  {
    "id": "q166",
    "text": "Which method do you use for organizing your refrigerator?",
    "choices": ["Clear bins", "Lazy susans", "Produce drawers", "No organization"]
  },
  {
    "id": "q167",
    "text": "How do you typically clean your floors?",
    "choices": ["Vacuum only", "Mop only", "Vacuum then mop", "Steam cleaner"]
  },
  {
    "id": "q168",
    "text": "What is your primary method for storing seasonal clothing?",
    "choices": ["Vacuum bags", "Plastic bins", "Cardboard boxes", "Closet rotation"]
  },
  {
    "id": "q169",
    "text": "How often do you need to clean your washing machine?",
    "choices": ["Monthly", "Quarterly", "Twice a year", "Yearly"]
  },
  {
    "id": "q170",
    "text": "Which method do you use for organizing important dates?",
    "choices": ["Wall calendar", "Digital calendar", "Planner", "Memory"]
  },
  {
    "id": "q171",
    "text": "How do you typically clean windows?",
    "choices": ["Commercial cleaner", "Vinegar solution", "Soap and water", "Professional service"]
  },
  {
    "id": "q172",
    "text": "What is your biggest challenge with grocery shopping?",
    "choices": ["Sticking to list", "Finding everything", "Crowded stores", "Transporting groceries"]
  },
  {
    "id": "q173",
    "text": "How often do you need to replace your pillows?",
    "choices": ["Yearly", "Every 2 years", "Every 5 years", "When uncomfortable"]
  },
  {
    "id": "q174",
    "text": "Which method do you use for organizing receipts?",
    "choices": ["Digital scanning", "Envelope system", "File folder", "No organization"]
  },
  {
    "id": "q175",
    "text": "How do you typically clean your oven?",
    "choices": ["Self-clean cycle", "Commercial oven cleaner", "Baking soda paste", "Professional cleaning"]
  },
  {
    "id": "q176",
    "text": "What is your primary method for storing opened food packages?",
    "choices": ["Original packaging", "Airtight containers", "Resealable bags", "Clips/ties"]
  },
  {
    "id": "q177",
    "text": "How often do you need to replace your mattress?",
    "choices": ["Every 5 years", "Every 8 years", "Every 10 years", "When uncomfortable"]
  },
  {
    "id": "q178",
    "text": "Which method do you use for organizing digital files?",
    "choices": ["Folder system", "Tagging system", "Search function", "No organization"]
  },
  {
    "id": "q179",
    "text": "How do you typically clean your dishwasher?",
    "choices": ["Vinegar cycle", "Commercial cleaner", "Baking soda", "Professional service"]
  },
  {
    "id": "q180",
    "text": "What is your biggest challenge with meal planning?",
    "choices": ["Variety", "Time required", "Nutritional balance", "Family preferences"]
  },
  {
    "id": "q181",
    "text": "How often do you need to replace your towels?",
    "choices": ["Yearly", "Every 2 years", "Every 5 years", "When worn"]
  },
  {
    "id": "q182",
    "text": "Which method do you use for organizing books?",
    "choices": ["Alphabetical", "By genre", "By color", "No organization"]
  },
  {
    "id": "q183",
    "text": "How do you typically clean your microwave?",
    "choices": ["Steam cleaning", "Vinegar solution", "Commercial cleaner", "Soap and water"]
  },
  {
    "id": "q184",
    "text": "What is your primary method for storing luggage?",
    "choices": ["Closet", "Under bed", "Basement/attic", "Garage"]
  },
  {
    "id": "q185",
    "text": "How often do you need to replace your bath mat?",
    "choices": ["Yearly", "Every 2 years", "Every 5 years", "When worn"]
  },
  {
    "id": "q186",
    "text": "Which method do you use for organizing spices?",
    "choices": ["Spice rack", "Drawer insert", "Magnetic tins", "Cabinet shelf"]
  },
  {
    "id": "q187",
    "text": "How do you typically clean your blinds?",
    "choices": ["Duster", "Damp cloth", "Vacuum attachment", "Professional cleaning"]
  },
  {
    "id": "q188",
    "text": "What is your biggest challenge with keeping plants alive?",
    "choices": ["Proper watering", "Adequate light", "Pest control", "Soil nutrition"]
  },
  {
    "id": "q189",
    "text": "How often do you need to replace your cutting boards?",
    "choices": ["Yearly", "When deeply scratched", "When warped", "Every 5 years"]
  },
  {
    "id": "q190",
    "text": "Which method do you use for organizing shoes?",
    "choices": ["Shoe rack", "Shoe cabinet", "Original boxes", "Closet floor"]
  },
  {
    "id": "q191",
    "text": "How do you typically clean your garbage cans?",
    "choices": ["Hose outside", "Disinfectant spray", "Bleach solution", "Professional service"]
  },
  {
    "id": "q192",
    "text": "What is your primary method for storing holiday decorations?",
    "choices": ["Labeled bins", "Original boxes", "Various containers", "No organization"]
  },
  {
    "id": "q193",
    "text": "How often do you need to replace your vacuum bags/filters?",
    "choices": ["Monthly", "Quarterly", "Twice yearly", "Yearly"]
  },
  {
    "id": "q194",
    "text": "Which method do you use for organizing tools?",
    "choices": ["Toolbox", "Pegboard", "Tool chest", "Various locations"]
  },
  {
    "id": "q195",
    "text": "How do you typically clean your fireplace?",
    "choices": ["Ash vacuum", "Broom and dustpan", "Professional service", "Don't have one"]
  },
  {
    "id": "q196",
    "text": "What is your biggest challenge with organizing paperwork?",
    "choices": ["Sorting", "Deciding what to keep", "Finding storage space", "Remembering to file"]
  },
  {
    "id": "q197",
    "text": "How often do you need to replace your smoke detector batteries?",
    "choices": ["Yearly", "When chirping", "Every 2 years", "Don't know"]
  },
  {
    "id": "q198",
    "text": "Which method do you use for organizing jewelry?",
    "choices": ["Jewelry box", "Wall organizer", "Dish/bowl", "Various locations"]
  },
  {
    "id": "q199",
    "text": "How do you typically clean your grill?",
    "choices": ["Wire brush", "Onion method", "Commercial cleaner", "Professional service"]
  },
  {
    "id": "q200",
    "text": "What is your primary method for storing out-of-season clothing?",
    "choices": ["Vacuum bags", "Plastic bins", "Cardboard boxes", "Closet rotation"]
  }
];

    // Seed only if no questions exist
    const existingCount = await Question.countDocuments();
    if (existingCount === 0) {
      await Question.insertMany(questions);
      console.log(`✅ Seeded ${questions.length} questions`);
    } else {
      console.log("⚠️ Questions already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
};

module.exports = seedQuestions;
