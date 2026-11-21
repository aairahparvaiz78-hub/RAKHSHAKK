(() => {
  'use strict';

  const LANGUAGE_KEY = 'rakhshak-language';
  const hindi = Object.freeze({
    'Rakhshak home': 'रक्षक होम', 'Main navigation': 'मुख्य नेविगेशन', 'Homepage links': 'होमपेज लिंक',
    'ACTIVE INCIDENT': 'सक्रिय घटना', 'Kosi Basin · Flood response': 'कोसी बेसिन · बाढ़ राहत',
    'OPERATIONS': 'संचालन', 'Dashboard': 'डैशबोर्ड', 'Overall disaster overview': 'आपदा की समग्र जानकारी',
    'Disaster Map': 'आपदा मानचित्र', 'Satellite images and affected areas': 'उपग्रह चित्र और प्रभावित क्षेत्र',
    'Village Risk': 'गाँव का जोखिम', 'Village-level risk and priority': 'गाँव का जोखिम और प्राथमिकता',
    'SOS & Rescue': 'SOS और बचाव', 'Emergency requests and routes': 'आपातकालीन अनुरोध और मार्ग',
    'Teams & Vehicles': 'दल और वाहन', 'Vehicle tracking and rescue assignments': 'वाहन ट्रैकिंग और बचाव कार्य',
    'Offline Communication': 'ऑफ़लाइन संचार', 'Team messaging and connectivity': 'दल संदेश और कनेक्टिविटी',
    'Reports & History': 'रिपोर्ट और इतिहास', 'Disaster and rescue reports': 'आपदा और बचाव रिपोर्ट',
    'Relay network': 'रिले नेटवर्क', 'Gateway connected': 'गेटवे जुड़ा है', 'Incident coordinator': 'घटना समन्वयक',
    'INCIDENTS': 'घटनाएँ', 'Database starting': 'डेटाबेस शुरू हो रहा है', 'Connecting…': 'कनेक्ट हो रहा है…',
    'Saving data…': 'डेटा सहेजा जा रहा है…', 'Browser save only': 'केवल ब्राउज़र में सहेजा गया',
    'SIMULATED REPLAY': 'सिमुलेटेड पुनरावलोकन', 'Network online': 'नेटवर्क ऑनलाइन', 'Network offline': 'नेटवर्क ऑफ़लाइन',
    'Public alert': 'सार्वजनिक चेतावनी', 'Open navigation': 'नेविगेशन खोलें', 'DEMO ENVIRONMENT': 'डेमो वातावरण',
    'Data is simulated for demonstration': 'प्रदर्शन के लिए डेटा सिमुलेटेड है', 'Last sync': 'अंतिम सिंक',
    'just now': 'अभी-अभी', 'Public alerts': 'सार्वजनिक चेतावनियाँ', 'Kosi Basin incident active': 'कोसी बेसिन की घटना सक्रिय',
    'Command center': 'कमांड सेंटर', 'COMMUNITY RESPONSE · KOSI BASIN': 'सामुदायिक प्रतिक्रिया · कोसी बेसिन',
    'Response Network': 'प्रतिक्रिया नेटवर्क',
    'When roads and signals fail, every request still needs a way through.': 'जब सड़कें और सिग्नल बंद हों, तब भी हर अनुरोध पहुँचने का रास्ता चाहिए।',
    'One shared response picture for communities, rescue teams, and the people coordinating help.': 'समुदायों, बचाव दलों और मदद समन्वित करने वालों के लिए एक साझा स्थिति-चित्र।',
    'Request emergency help': 'आपातकालीन मदद माँगें', 'Send a location and tell responders what you need': 'अपनी जगह भेजें और बचाव दल को बताएँ कि आपको क्या चाहिए',
    'Explore the command center': 'कमांड सेंटर देखें', 'RESPONSE DESK ACTIVE': 'प्रतिक्रिया केंद्र सक्रिय',
    'SIMULATED FLOOD RESPONSE · SUPAUL, BIHAR': 'सिमुलेटेड बाढ़ राहत · सुपौल, बिहार',
    'VILLAGES MONITORED': 'निगरानी में गाँव', 'RESPONSE TEAMS': 'प्रतिक्रिया दल', 'OPEN SOS REQUESTS': 'खुले SOS अनुरोध',
    'MESSAGES ACKNOWLEDGED': 'पुष्टि किए गए संदेश', 'FIELD VIEW': 'मैदानी दृश्य', 'Map': 'मानचित्र', 'Villages': 'गाँव',
    'Teams': 'दल', 'LIVE REPLAY': 'लाइव पुनरावलोकन', '01 / SITUATION MAP': '01 / स्थिति मानचित्र',
    'See the ground.': 'ज़मीनी स्थिति देखें।', 'Move with context.': 'जानकारी के साथ आगे बढ़ें।',
    'Flood extent, village risk, SOS markers and response locations in one picture.': 'बाढ़ का फैलाव, गाँवों का जोखिम, SOS संकेत और प्रतिक्रिया दल एक ही दृश्य में।',
    'Open disaster map ↗': 'आपदा मानचित्र खोलें ↗', 'Flood extent': 'बाढ़ का फैलाव', 'Simulated replay layer': 'सिमुलेटेड परत',
    'Risk-ranked': 'जोखिम के अनुसार क्रम', 'Road status': 'सड़क की स्थिति', 'North bridge blocked': 'उत्तर का पुल बंद',
    'Crossing unverified': 'रास्ते की पुष्टि नहीं', '02 / COMMUNITY SOS': '02 / सामुदायिक SOS',
    'One clear signal': 'एक स्पष्ट संकेत', 'starts a response.': 'राहत शुरू करता है।',
    'Urgency, medical need, people affected and isolation help explain priority.': 'तत्कालता, चिकित्सा ज़रूरत, प्रभावित लोगों और अलगाव से प्राथमिकता तय होती है।',
    'View rescue queue ↗': 'बचाव अनुरोध देखें ↗', 'Transparent priority': 'स्पष्ट प्राथमिकता', 'Explainable factors': 'समझने योग्य कारण',
    'Team assignment': 'दल को काम सौंपें', 'Dispatch & reassign': 'भेजें और दोबारा सौंपें',
    'Confirmed outcomes': 'पुष्ट परिणाम', 'Contact before complete': 'पूरा करने से पहले संपर्क की पुष्टि',
    'COMMUNITY FIRST': 'समुदाय पहले', 'People': 'लोग', 'Shelters': 'आश्रय स्थल', 'FIELD CONTEXT': 'मैदानी जानकारी',
    'FLOOD RESPONSE · COMMUNITY CONTEXT': 'बाढ़ राहत · समुदाय की स्थिति', '03 / VILLAGE RISK': '03 / गाँव का जोखिम',
    'The last mile': 'आख़िरी छोर', 'is human.': 'इंसानों तक पहुँचता है।',
    'Find communities at risk of isolation and see why each village is prioritized.': 'अलग-थलग पड़ने के जोखिम वाले समुदायों और हर गाँव की प्राथमिकता का कारण देखें।',
    'Explore village risk ↗': 'गाँव का जोखिम देखें ↗', 'Estimated population': 'अनुमानित आबादी',
    'Clearly labelled': 'स्पष्ट रूप से चिह्नित', 'Warnings': 'चेतावनियाँ', 'Received or pending': 'मिलीं या लंबित',
    'Access status': 'पहुँच की स्थिति', 'Reachable or unverified': 'पहुँच संभव या अपुष्ट', '04 / OFFLINE COMMUNICATION': '04 / ऑफ़लाइन संचार',
    'When signal drops,': 'जब सिग्नल चला जाए,', 'messages keep moving.': 'संदेश फिर भी पहुँचते रहें।',
    'Rescue vehicles can carry queued updates toward a gateway and reconnect isolated teams.': 'बचाव वाहन कतार में रखे संदेश गेटवे तक पहुँचा सकते हैं और अलग-थलग दलों को फिर जोड़ सकते हैं।',
    'Open relay network ↗': 'रिले नेटवर्क खोलें ↗', 'Offline queue': 'ऑफ़लाइन कतार', 'Saved on device': 'डिवाइस पर सहेजा गया',
    'Relay hops': 'रिले चरण', 'Simulated in demo': 'डेमो में सिमुलेटेड', 'Acknowledgement': 'पुष्टिकरण',
    'Required for delivery': 'पहुँच के लिए ज़रूरी', 'VEHICLES AS RELAYS': 'रिले के रूप में वाहन',
    'Carry information forward': 'जानकारी आगे पहुँचाएँ', 'UNCERTAINTY VISIBLE': 'अनिश्चितता स्पष्ट',
    'Source, freshness, confidence': 'स्रोत, नवीनता और भरोसे का स्तर', 'OUTCOMES CONFIRMED': 'परिणाम की पुष्टि',
    'Track delivery and assistance': 'संदेश और मदद का पता रखें', 'Every estimate is labelled. Every delivery waits for acknowledgement.': 'हर अनुमान पर निशान है। हर संदेश की पहुँच पुष्टि के बाद मानी जाती है।',
    'Open incident dashboard ↗': 'घटना डैशबोर्ड खोलें ↗', 'Need help now?': 'अभी मदद चाहिए?',
    'Send an SOS to responders': 'बचाव दल को SOS भेजें', 'RESPONSE OVERVIEW': 'प्रतिक्रिया का सार',
    'Good morning, Ananya': 'सुप्रभात, अनन्या', 'Your response picture for the active incident. Updates from the field appear here as they arrive.': 'सक्रिय घटना की प्रतिक्रिया स्थिति। मैदानी अपडेट मिलते ही यहाँ दिखेंगे।',
    'Incident report': 'घटना रिपोर्ट', 'Log an SOS': 'SOS दर्ज करें', 'villages monitored': 'गाँव निगरानी में',
    'population estimate': 'आबादी का अनुमान', 'response teams': 'प्रतिक्रिया दल', 'Unresolved SOS': 'अनसुलझे SOS',
    'high priority': 'उच्च प्राथमिकता', 'needs attention': 'ध्यान देने की ज़रूरत', 'People contacted': 'संपर्क किए गए लोग',
    'Across active rescue cases': 'सक्रिय बचाव मामलों में', 'Teams in field': 'मैदान में दल',
    'available for dispatch': 'भेजने के लिए उपलब्ध', 'Messages awaiting sync': 'सिंक की प्रतीक्षा में संदेश',
    'SITUATION MAP': 'स्थिति मानचित्र', 'Flood impact & response': 'बाढ़ का असर और प्रतिक्रिया',
    'Observed layer, village estimates and live response locations': 'देखी गई परत, गाँवों के अनुमान और प्रतिक्रिया दलों की जगह',
    'Open full map ↗': 'पूरा मानचित्र खोलें ↗', 'Flood extent · estimated': 'बाढ़ का फैलाव · अनुमानित',
    'Village': 'गाँव', 'Rescue team': 'बचाव दल', 'Shelter': 'आश्रय स्थल', 'Layer details': 'परत का विवरण',
    'NEEDS ATTENTION': 'ध्यान देने योग्य', 'Priority villages': 'प्राथमिकता वाले गाँव', 'Explainable risk score · highest first': 'समझने योग्य जोखिम अंक · सबसे अधिक पहले',
    'View all ↗': 'सभी देखें ↗', 'SOS queue ↗': 'SOS कतार ↗', 'FIELD PICTURE': 'मैदानी स्थिति',
    'Village risk snapshot': 'गाँव के जोखिम का सार', 'Village risk ↗': 'गाँव का जोखिम ↗', 'LATEST UPDATES': 'नए अपडेट',
    'Incident activity': 'घटना गतिविधि', 'Full timeline ↗': 'पूरी समयरेखा ↗', 'FLOOD RISK OUTLOOK': 'बाढ़ जोखिम अनुमान',
    'What may need attention next': 'आगे किस पर ध्यान देना पड़ सकता है',
    'Screening index from forecast rainfall, modelled river flow and village access context.': 'अनुमानित बारिश, नदी के मॉडल प्रवाह और गाँव तक पहुँच के आधार पर जाँच-सूचकांक।',
    '＋ Add reading': '＋ रीडिंग जोड़ें', '↻ Refresh': '↻ ताज़ा करें', 'Village': 'गाँव', '6 hours': '6 घंटे',
    '24 hours': '24 घंटे', '72 hours': '72 घंटे', 'Outlook unavailable. Connect the cloud database and reload to request model data.': 'अनुमान उपलब्ध नहीं। मॉडल डेटा के लिए क्लाउड डेटाबेस जोड़कर पेज फिर खोलें।',
    'Low-confidence screening index': 'कम भरोसे वाला जाँच-सूचकांक', 'not a probability, evacuation instruction or official warning. GloFAS uses an approximate 5 km river grid that may select a nearby river; verify with local gauges and official CWC/IMD alerts. Source: ': 'यह संभावना, निकासी निर्देश या आधिकारिक चेतावनी नहीं है। GloFAS लगभग 5 किमी नदी ग्रिड इस्तेमाल करता है और पास की दूसरी नदी चुन सकता है; स्थानीय गेज और आधिकारिक CWC/IMD चेतावनियों से पुष्टि करें। स्रोत: ',
    'GLOBAL MODEL OUTLOOK': 'वैश्विक मॉडल अनुमान', 'BASELINE / FIELD ONLY': 'आधार / केवल मैदानी जानकारी', 'MODEL FEED OFFLINE': 'मॉडल फ़ीड बंद',
    'Monitor': 'निगरानी', 'Elevated': 'बढ़ा हुआ', 'High': 'उच्च', 'Severe': 'गंभीर', 'Low confidence': 'कम भरोसा',
    'RESPONSE OVERVIEW': 'प्रतिक्रिया का सार', 'GEO SPATIAL PICTURE': 'भौगोलिक स्थिति', 'Disaster Map': 'आपदा मानचित्र',
    'Review hazard layers, affected communities and field response locations.': 'खतरे की परतें, प्रभावित समुदाय और मैदानी प्रतिक्रिया की जगहें देखें।',
    'Reopen bridge': 'पुल फिर खोलें', 'Flag north bridge': 'उत्तर के पुल को चिह्नित करें', 'Compare imagery': 'चित्रों की तुलना करें',
    'Map controls': 'मानचित्र नियंत्रण', 'Layers & filters': 'परतें और फ़िल्टर', 'Reset': 'रीसेट',
    'Find village or case…': 'गाँव या मामला खोजें…', 'INCIDENT LAYERS': 'घटना की परतें', 'SELECTED FEATURE': 'चुनी गई जानकारी',
    'ROUTE CONDITION': 'मार्ग की स्थिति', 'DATA PROVENANCE': 'डेटा का स्रोत', 'Map inspection': 'मानचित्र जाँच',
    'Select a marker to inspect its shared incident record. Mark the north bridge blocked or unverified from the map.': 'साझा घटना रिकॉर्ड देखने के लिए निशान चुनें। मानचित्र से उत्तर के पुल को बंद या अपुष्ट चिह्नित करें।',
    'ILLUSTRATIVE MAP': 'उदाहरण मानचित्र', 'NOT TO SCALE': 'माप के अनुसार नहीं', 'BEFORE': 'पहले', 'AFTER': 'बाद में',
    'Flood area · estimated': 'बाढ़ क्षेत्र · अनुमानित', 'Village risk': 'गाँव का जोखिम', 'SOS requests': 'SOS अनुरोध',
    'Rescue teams': 'बचाव दल', 'Fire hotspots': 'आग के केंद्र', 'Seismic alert': 'भूकंप चेतावनी',
    'Village Risk': 'गाँव का जोखिम', 'COMMUNITY PRIORITY': 'समुदाय की प्राथमिकता',
    'Risk is an explainable estimate. Use access status, SOS urgency and exposure to guide attention.': 'जोखिम एक समझने योग्य अनुमान है। ध्यान तय करने के लिए पहुँच, SOS की तात्कालिकता और खतरे को देखें।',
    '↓  Export village list': '↓  गाँवों की सूची निकालें', 'Affected villages': 'प्रभावित गाँव',
    'Within the active incident boundary': 'सक्रिय घटना सीमा के भीतर', 'Population estimate · not a live count': 'आबादी का अनुमान · लाइव गिनती नहीं',
    'At risk of isolation': 'अलग-थलग पड़ने का जोखिम', 'Access routes need field review': 'पहुँच मार्ग की मैदानी जाँच ज़रूरी',
    'Warnings received': 'मिली चेतावनियाँ', 'VILLAGE REGISTER': 'गाँवों का रजिस्टर',
    'Village-level risk & priority': 'गाँव का जोखिम और प्राथमिकता', 'Factors shown for each score · latest field picture': 'हर अंक के कारण · नवीनतम मैदानी स्थिति',
    'Search villages…': 'गाँव खोजें…', 'Sort villages': 'गाँव क्रमबद्ध करें', 'Highest risk': 'सबसे अधिक जोखिम',
    'Lowest risk': 'सबसे कम जोखिम', 'VILLAGE': 'गाँव', 'EXPOSURE / RISK': 'खतरा / जोखिम', 'EST. POPULATION': 'अनुमानित आबादी',
    'OPEN SOS': 'खुले SOS', 'ACCESS': 'पहुँच', 'WARNING / CONTACT': 'चेतावनी / संपर्क', 'FACTORS': 'कारण',
    'HIGH': 'उच्च', 'ELEVATED': 'बढ़ा हुआ', 'MONITOR': 'निगरानी', 'estimate': 'अनुमान', 'requests': 'अनुरोध',
    'Reachable': 'पहुँच संभव', 'At risk': 'जोखिम में', 'Unverified': 'अपुष्ट', 'Warning sent': 'चेतावनी भेजी गई',
    'No warning': 'कोई चेतावनी नहीं', 'Awaiting team contact': 'दल के संपर्क की प्रतीक्षा', 'No villages match this search.': 'इस खोज से कोई गाँव नहीं मिला।',
    'ESTIMATES · SIMULATED DATA': 'अनुमान · सिमुलेटेड डेटा',
    'Risk score considers hazard exposure, reported urgency and access reliability.': 'जोखिम अंक में खतरे का स्तर, बताई गई तात्कालिकता और पहुँच की विश्वसनीयता शामिल है।',
    'CITIZEN REQUESTS & DISPATCH': 'नागरिक अनुरोध और रवाना करना',
    'Create and prioritize requests, assign a team, and confirm what happened on the ground.': 'अनुरोध बनाएँ और प्राथमिकता दें, दल सौंपें और मैदानी कार्रवाई की पुष्टि करें।',
    'Public safety page': 'सार्वजनिक सुरक्षा पेज', '＋  Create SOS': '＋  SOS बनाएँ',
    'Priority logic:': 'प्राथमिकता का आधार:', 'danger indicator + medical need + people affected + village exposure + isolation risk. Scores are transparent demo suggestions; the dispatcher makes the final decision.': 'खतरे का संकेत + चिकित्सा ज़रूरत + प्रभावित लोग + गाँव का जोखिम + अलगाव का खतरा। अंक डेमो सुझाव हैं; अंतिम निर्णय डिस्पैचर लेता है।',
    'Active requests': 'सक्रिय अनुरोध', 'Filter SOS requests': 'SOS अनुरोध फ़िल्टर करें', 'All requests': 'सभी अनुरोध',
    'No SOS requests match this filter.': 'इस फ़िल्टर से कोई SOS अनुरोध नहीं मिला।', 'CITIZEN ACCESS': 'नागरिक सहायता',
    'Request help from a phone': 'फोन से मदद माँगें', 'Open the form as a citizen; it creates a case in this shared incident queue.': 'नागरिक के रूप में फ़ॉर्म खोलें; अनुरोध साझा घटना कतार में जुड़ेगा।',
    'Open citizen SOS form ↗': 'नागरिक SOS फ़ॉर्म खोलें ↗', 'Received': 'मिला', 'Prioritized': 'प्राथमिकता तय',
    'Assigned': 'सौंपा गया', 'Team en route': 'दल रास्ते में', 'Contacted': 'संपर्क हुआ',
    'Assistance complete': 'मदद पूरी', 'Unable to reach': 'संपर्क नहीं हो सका',
    'FIELD OPERATIONS': 'मैदानी संचालन', 'Track last-known locations, assignments and communication state. Updates are shared with SOS and map views.': 'अंतिम ज्ञात स्थान, ज़िम्मेदारियाँ और संचार स्थिति देखें। अपडेट SOS और मानचित्र में साझा होते हैं।',
    'View on map': 'मानचित्र पर देखें', '＋  Log field update': '＋  मैदानी अपडेट दर्ज करें', 'Teams tracked': 'ट्रैक किए गए दल',
    'Locations may be last-known': 'स्थान अंतिम ज्ञात हो सकता है', 'On active assignment': 'सक्रिय कार्य पर', 'Shared with SOS queue': 'SOS कतार से साझा',
    'Devices relaying': 'रिले कर रहे डिवाइस', 'Passing messages between teams': 'दल के बीच संदेश पहुँचा रहे हैं',
    'Waiting to sync': 'सिंक की प्रतीक्षा', 'Location and field notes may be stale': 'स्थान और मैदानी जानकारी पुरानी हो सकती है',
    'LIVE / LAST KNOWN': 'लाइव / अंतिम ज्ञात', 'Response teams': 'प्रतिक्रिया दल', 'Use reassignment to coordinate with the active SOS queue.': 'सक्रिय SOS कतार से तालमेल के लिए काम दोबारा सौंपें।',
    'NETWORK CONNECTED': 'नेटवर्क जुड़ा है', 'SIMULATED OFFLINE': 'सिमुलेटेड ऑफ़लाइन', 'CURRENT TASK': 'वर्तमान काम',
    'Route:': 'मार्ग:', 'Suggested · verify on approach': 'सुझाया गया · पहुँचकर पुष्टि करें',
    'Change assignment': 'काम बदलें', 'Field update': 'मैदानी अपडेट', 'ROUTE PLANNING': 'मार्ग योजना',
    'Road conditions': 'सड़क की स्थिति', '1 BLOCKED': '1 बंद', '1 UNVERIFIED': '1 अपुष्ट', 'North bridge crossing': 'उत्तर पुल पार मार्ग',
    'Reported blocked by dispatch': 'डिस्पैच ने बंद बताया', 'Status unverified · no field confirmation': 'स्थिति अपुष्ट · मैदानी पुष्टि नहीं',
    'Reopen': 'फिर खोलें', 'Flag': 'चिह्नित करें', 'Suggested route to Dharampur': 'धर्मपुर का सुझाया मार्ग',
    'Updated: south road → east embankment. Verify conditions with field team.': 'अपडेट: दक्षिणी सड़क → पूर्वी तटबंध। मैदानी दल से स्थिति की पुष्टि करें।',
    'Primary route via north bridge. Crossing status unverified; verify before dispatch.': 'मुख्य मार्ग उत्तर पुल से है। पार मार्ग अपुष्ट है; रवाना करने से पहले पुष्टि करें।',
    'FIELD UPDATES': 'मैदानी अपडेट', 'Latest reports': 'नवीनतम रिपोर्ट', 'History ↗': 'इतिहास ↗', 'No field updates yet.': 'अभी कोई मैदानी अपडेट नहीं।',
    'STORE · CARRY · FORWARD': 'सहेजें · ले जाएँ · आगे पहुँचाएँ',
    'Queue SOS and field messages locally, relay between responder devices, then sync with acknowledgement.': 'SOS और मैदानी संदेश डिवाइस पर कतार में रखें, बचाव डिवाइसों के बीच पहुँचाएँ, फिर पुष्टि के साथ सिंक करें।',
    '◉  Simulate network loss': '◉  नेटवर्क बंद होने का अनुकरण', '↗  Restore connectivity': '↗  कनेक्शन बहाल करें',
    'Gateway connected · network online': 'गेटवे जुड़ा है · नेटवर्क ऑनलाइन', 'Network unavailable · local queue active': 'नेटवर्क उपलब्ध नहीं · स्थानीय कतार सक्रिय',
    'Messages sync when acknowledged by the gateway.': 'गेटवे की पुष्टि मिलने पर संदेश सिंक होते हैं।',
    'New messages remain on this device until a nearby relay or gateway receives them.': 'नए संदेश तब तक इसी डिवाइस पर रहेंगे जब तक पास का रिले या गेटवे उन्हें प्राप्त न करे।',
    'MESSAGE QUEUE': 'संदेश कतार', 'Shared incident messages': 'साझा घटना संदेश',
    'Pending and relayed messages never show delivered without an acknowledgement.': 'पुष्टि के बिना लंबित या रिले संदेशों को पहुँचा हुआ नहीं दिखाया जाता।',
    'NEED SYNC': 'सिंक ज़रूरी', 'No messages in this incident.': 'इस घटना में कोई संदेश नहीं।',
    'Duplicate message IDs are preserved during reconnect.': 'दोबारा कनेक्ट होने पर दोहराए संदेश पहचान सुरक्षित रहती है।',
    'Sync queue': 'कतार सिंक करें', 'COMPOSE': 'संदेश लिखें', 'Send field message': 'मैदानी संदेश भेजें',
    'Saved locally if offline': 'ऑफ़लाइन होने पर डिवाइस में सहेजा जाएगा', 'Subject': 'विषय',
    'e.g. Road condition update': 'जैसे, सड़क की स्थिति का अपडेट', 'Message': 'संदेश',
    'Share a short operational update': 'काम से जुड़ा छोटा अपडेट लिखें', 'Destination': 'किसे भेजें',
    'All response teams': 'सभी प्रतिक्रिया दल', 'Priority': 'प्राथमिकता', 'Normal': 'सामान्य', 'Urgent': 'तत्काल',
    'Send message': 'संदेश भेजें', 'Save to offline queue': 'ऑफ़लाइन कतार में सहेजें',
    'DEMO RELAY NETWORK': 'डेमो रिले नेटवर्क', 'Nearby devices': 'पास के डिवाइस', 'Prototype note:': 'प्रोटोटाइप नोट:',
    'relay hops are simulated in this browser. No radio, Bluetooth or satellite hardware is connected. NavIC is not implied. Messages become delivered only after the demo gateway records an acknowledgement.': 'रिले चरण इस ब्राउज़र में सिमुलेटेड हैं। कोई रेडियो, ब्लूटूथ या उपग्रह हार्डवेयर जुड़ा नहीं है। NavIC का दावा नहीं है। डेमो गेटवे की पुष्टि के बाद ही संदेश पहुँचा हुआ माना जाता है।',
    'PUBLIC INFORMATION': 'सार्वजनिक जानकारी', 'Safety updates': 'सुरक्षा अपडेट',
    'Public information is approved by an authorized operator before it appears here.': 'सार्वजनिक जानकारी यहाँ दिखने से पहले अधिकृत ऑपरेटर द्वारा मंज़ूर होती है।',
    '←  Back to command center': '←  कमांड सेंटर पर वापस', '＋  Draft public alert': '＋  सार्वजनिक चेतावनी का मसौदा',
    'RAKHSHAK · PUBLIC SAFETY': 'रक्षक · सार्वजनिक सुरक्षा', 'Community safety updates': 'समुदाय सुरक्षा अपडेट',
    'Follow official instructions from responders. Routes are suggestions only and may change with conditions. If you need urgent help, use the SOS form or contact local emergency services.': 'बचाव दल के आधिकारिक निर्देश मानें। मार्ग केवल सुझाव हैं और स्थिति के साथ बदल सकते हैं। तत्काल मदद के लिए SOS फ़ॉर्म या स्थानीय आपातकालीन सेवा से संपर्क करें।',
    'Published alerts': 'जारी चेतावनियाँ', 'Public page contains no private citizen SOS details.': 'सार्वजनिक पेज पर नागरिकों के निजी SOS विवरण नहीं हैं।',
    'PUBLISHED': 'जारी', 'No active public alerts.': 'कोई सक्रिय सार्वजनिक चेतावनी नहीं।',
    'Suggested routes are not guaranteed safe. Check latest field guidance and treat stale or unverified information carefully.': 'सुझाए गए मार्ग सुरक्षित होने की गारंटी नहीं हैं। नवीनतम मैदानी सलाह लें और पुरानी या अपुष्ट जानकारी से सावधान रहें।',
    'OPERATOR REVIEW': 'ऑपरेटर की समीक्षा', 'Drafts awaiting approval': 'मंज़ूरी की प्रतीक्षा में मसौदे',
    'Only the authorized operator can publish a warning.': 'केवल अधिकृत ऑपरेटर चेतावनी जारी कर सकता है।',
    'APPROVED': 'मंज़ूर', 'DRAFT': 'मसौदा', '✓ Approve & publish': '✓ मंज़ूर करके जारी करें',
    'Edit draft': 'मसौदा संपादित करें', 'No alerts awaiting approval.': 'मंज़ूरी की प्रतीक्षा में कोई चेतावनी नहीं।',
    'Alert history and approval time are logged.': 'चेतावनी का इतिहास और मंज़ूरी का समय दर्ज होता है।', 'Audit trail ↗': 'ऑडिट रिकॉर्ड ↗',
    'OPERATIONAL RECORD': 'संचालन रिकॉर्ड', 'A traceable incident record of alerts, assignments, field reports and confirmed outcomes.': 'चेतावनियों, ज़िम्मेदारियों, मैदानी रिपोर्ट और पुष्ट परिणामों का पता लगाने योग्य रिकॉर्ड।',
    '▤  Print report': '▤  रिपोर्ट प्रिंट करें', '↓  Export report': '↓  रिपोर्ट निर्यात करें', 'SOS requests': 'SOS अनुरोध',
    'unresolved': 'अनसुलझे', 'complete': 'पूरे', 'Contacted or assistance complete': 'संपर्क हुआ या मदद पूरी',
    'Messages acknowledged': 'पुष्टि किए गए संदेश', 'pending acknowledgement': 'पुष्टि लंबित', 'received a warning': 'को चेतावनी मिली',
    'AUDIT TRAIL': 'ऑडिट रिकॉर्ड', 'MATCHING EVENTS': 'मेल खाते घटनाक्रम', 'OUTCOME SNAPSHOT': 'परिणाम का सार',
    'SIMULATED': 'सिमुलेटेड', 'RESPONSE COVERAGE': 'प्रतिक्रिया कवरेज', 'MESSAGE HEALTH': 'संदेश स्थिति',
    'FILTERABLE RECORDS': 'फ़िल्टर किए जा सकने वाले रिकॉर्ड', 'Current incident': 'वर्तमान घटना',
    'All villages': 'सभी गाँव', 'All teams': 'सभी दल', 'All message statuses': 'सभी संदेश स्थितियाँ',
    'Last 24 hours': 'पिछले 24 घंटे', 'Last 7 days': 'पिछले 7 दिन', 'No activity matches these filters.': 'इन फ़िल्टर से कोई गतिविधि नहीं मिली।',
    'CITIZEN SOS': 'नागरिक SOS', 'Request emergency help': 'आपातकालीन मदद माँगें',
    'Your request is linked to the Kosi Basin incident.': 'आपका अनुरोध कोसी बेसिन की घटना से जुड़ा है।',
    'Village / location': 'गाँव / स्थान', 'Type of help': 'मदद का प्रकार', 'People needing help': 'मदद की ज़रूरत वाले लोग',
    'Location detail (optional)': 'स्थान का विवरण (वैकल्पिक)', 'Landmark or last-known location': 'नज़दीकी पहचान या अंतिम ज्ञात स्थान',
    'Medical need': 'चिकित्सा सहायता', 'Immediate danger': 'तत्काल खतरा', 'Short note (optional)': 'छोटा नोट (वैकल्पिक)',
    'Tell responders what they should know': 'बचाव दल को ज़रूरी जानकारी दें',
    'Priority is suggested from need, people affected, village exposure and isolation.': 'ज़रूरत, प्रभावित लोग, गाँव का खतरा और अलगाव देखकर प्राथमिकता सुझाई जाती है।',
    'Request will be sent through this simulated network.': 'अनुरोध इस सिमुलेटेड नेटवर्क से भेजा जाएगा।',
    'Request will be saved on this device and marked pending until synced.': 'अनुरोध इस डिवाइस पर सहेजा जाएगा और सिंक होने तक लंबित रहेगा।',
    'Cancel': 'रद्द करें', 'Send SOS request': 'SOS अनुरोध भेजें', 'DISPATCH ASSIGNMENT': 'बचाव कार्य सौंपें',
    'Choose a response team': 'प्रतिक्रिया दल चुनें', 'Available team': 'उपलब्ध दल',
    'Suggested route accounts for known closures.': 'सुझाया मार्ग ज्ञात बंद रास्तों को ध्यान में रखता है।',
    'North bridge is marked blocked; use the south road and east embankment.': 'उत्तर पुल बंद चिह्नित है; दक्षिणी सड़क और पूर्वी तटबंध का उपयोग करें।',
    'North bridge is unverified; confirm conditions before dispatch.': 'उत्तर पुल की पुष्टि नहीं है; दल भेजने से पहले स्थिति जाँचें।',
    'Assign team': 'दल सौंपें', 'TEAM DISPATCH': 'दल रवाना करें', 'Assign': 'सौंपें',
    'No open SOS requests.': 'कोई खुला SOS अनुरोध नहीं।', 'RESPONDER CONFIRMATION': 'बचाव दल की पुष्टि',
    'Confirm assistance complete': 'मदद पूरी होने की पुष्टि करें',
    'This status is reserved for a responder-verified outcome.': 'यह स्थिति तभी चुनें जब बचाव दल ने परिणाम की पुष्टि की हो।',
    'Record that a responder contacted the people and confirmed the assistance was completed.': 'दर्ज करें कि बचाव दल ने लोगों से संपर्क किया और मदद पूरी होने की पुष्टि की।',
    'I confirm this person was contacted and assistance was completed.': 'मैं पुष्टि करता/करती हूँ कि व्यक्ति से संपर्क हुआ और मदद पूरी हुई।',
    'Confirm outcome': 'परिणाम की पुष्टि करें', 'FLOOD OUTLOOK INPUT': 'बाढ़ अनुमान की जानकारी',
    'Add a ground reading': 'मैदानी रीडिंग जोड़ें',
    'Use a trusted station or responder observation. The forecast remains a screening estimate.': 'विश्वसनीय स्टेशन या बचाव दल की रीडिंग लें। अनुमान केवल प्रारंभिक जाँच है।',
    'Reading source': 'रीडिंग का स्रोत', 'Manual observation': 'मैन्युअल अवलोकन',
    'Rainfall · last 6 hours (mm)': 'बारिश · पिछले 6 घंटे (मिमी)', 'Rainfall · last 24 hours (mm)': 'बारिश · पिछले 24 घंटे (मिमी)',
    'River level (cm)': 'नदी का स्तर (सेमी)', 'River rise (cm/hour)': 'नदी बढ़ने की गति (सेमी/घंटा)',
    'Soil saturation (%)': 'मिट्टी में नमी (%)', 'Save reading': 'रीडिंग सहेजें',
    'OPERATOR ALERT DRAFT': 'ऑपरेटर चेतावनी मसौदा', 'Edit public alert': 'सार्वजनिक चेतावनी संपादित करें',
    'Draft a public alert': 'सार्वजनिक चेतावनी का मसौदा बनाएँ', 'Private citizen data is never included in public alerts.': 'नागरिकों की निजी जानकारी सार्वजनिक चेतावनी में शामिल नहीं होती।',
    'Title': 'शीर्षक', 'Clear, actionable safety update': 'स्पष्ट और उपयोगी सुरक्षा अपडेट', 'Public message': 'सार्वजनिक संदेश',
    'Approved warning, shelter information or safe-route update': 'मंज़ूर चेतावनी, आश्रय की जानकारी या सुरक्षित मार्ग अपडेट',
    'Area': 'क्षेत्र', 'Source': 'स्रोत', 'Save draft for approval': 'मंज़ूरी के लिए मसौदा सहेजें',
    'No messages were waiting to sync.': 'सिंक के लिए कोई संदेश नहीं था।', 'No messages were waiting for acknowledgement.': 'पुष्टि की प्रतीक्षा में कोई संदेश नहीं था।',
    'Online': 'ऑनलाइन', 'Offline': 'ऑफ़लाइन', 'Relaying': 'रिले हो रहा है', 'Waiting to sync': 'सिंक की प्रतीक्षा',
    'Delivered': 'पहुँच गया', 'Pending': 'लंबित', 'Relayed': 'रिले किया गया', 'Unassigned': 'बिना सौंपा',
    'Assistance complete': 'मदद पूरी', 'Available': 'उपलब्ध', 'En route': 'रास्ते में', 'High priority': 'उच्च प्राथमिकता',
    'RISK': 'जोखिम', 'BLOCKED': 'बंद', 'NORTH BRIDGE': 'उत्तर पुल', 'BEFORE · ARCHIVE REFERENCE': 'पहले · संग्रह संदर्भ',
    'KOSI BASIN · SIMULATED MAP TILE': 'कोसी बेसिन · सिमुलेटेड मानचित्र', 'REPLAY': 'पुनरावलोकन',
    'Need + urgency + isolation': 'ज़रूरत + तात्कालिकता + अलगाव', 'Unassigned': 'बिना सौंपा', 'No additional note provided.': 'कोई अतिरिक्त नोट नहीं दिया गया।',
    'Unknown location': 'अज्ञात स्थान', 'Unknown village': 'अज्ञात गाँव', 'Access unverified': 'पहुँच अपुष्ट',
    'Assistance complete': 'मदद पूरी', 'Medical help': 'चिकित्सा सहायता', 'Food & water': 'भोजन और पानी',
    'Rescue from water': 'पानी से बचाव', 'Other urgent help': 'अन्य तत्काल मदद', 'Water level rising': 'पानी का स्तर बढ़ रहा है',
    'Road blocked': 'सड़क बंद', 'People contacted': 'लोगों से संपर्क हुआ', 'Shelter status': 'आश्रय की स्थिति',
    'Other field report': 'अन्य मैदानी रिपोर्ट', 'Details': 'विवरण', 'What has changed? Include location and time observed.': 'क्या बदला है? स्थान और देखे जाने का समय लिखें।',
    'If offline, the update is stored in the local message queue and will remain pending.': 'ऑफ़लाइन होने पर अपडेट स्थानीय संदेश कतार में सहेजा जाएगा और लंबित रहेगा।',
    'Save field update': 'मैदानी अपडेट सहेजें', 'OPERATOR REVIEW': 'ऑपरेटर समीक्षा', 'FIELD UPDATE': 'मैदानी अपडेट',
    'Log a field update': 'मैदानी अपडेट दर्ज करें', 'Share a change to the ground picture with the incident team.': 'मैदानी स्थिति का बदलाव घटना दल के साथ साझा करें।',
    'Update type': 'अपडेट का प्रकार', 'Details': 'विवरण', 'Public safety update': 'सार्वजनिक सुरक्षा अपडेट',
    'Database unavailable.': 'डेटाबेस उपलब्ध नहीं।', 'Could not refresh flood outlook.': 'बाढ़ अनुमान ताज़ा नहीं हो सका।',
    'Flood risk outlook refreshed from the latest saved readings.': 'नवीनतम सहेजी गई रीडिंग से बाढ़ अनुमान ताज़ा किया गया।',
    'Check the responder confirmation before closing this case.': 'मामला बंद करने से पहले बचाव दल की पुष्टि चुनें।',
    'Alert saved as a draft. Approve it to publish.': 'चेतावनी मसौदे के रूप में सहेजी गई। जारी करने के लिए मंज़ूर करें।',
    'Message sent and gateway acknowledged it.': 'संदेश भेजा गया और गेटवे ने पुष्टि की।',
    'Message saved locally. Pending until a relay or gateway acknowledgement.': 'संदेश डिवाइस पर सहेजा गया। रिले या गेटवे की पुष्टि लंबित है।',
    'Restore connectivity before syncing to the gateway.': 'गेटवे से सिंक करने से पहले कनेक्शन बहाल करें।',
    'Gateway is online. Sync the queue to record an acknowledgement.': 'गेटवे ऑनलाइन है। पुष्टि दर्ज करने के लिए कतार सिंक करें।',
    'Offline mode simulated. New messages will stay pending until acknowledged.': 'ऑफ़लाइन मोड सिमुलेटेड है। पुष्टि मिलने तक नए संदेश लंबित रहेंगे।',
    'Public alert approved and published.': 'सार्वजनिक चेतावनी मंज़ूर करके जारी की गई।',
    'No incident activity yet.': 'अभी कोई घटना गतिविधि नहीं।', 'This page did not load': 'यह पेज लोड नहीं हुआ',
    'Refresh the page. If it remains blank, check that its page file is available.': 'पेज रीफ़्रेश करें। खाली रहने पर जाँचें कि इसकी पेज फ़ाइल मौजूद है।',
    'This page module could not be loaded. Check the matching file in the pages folder.': 'यह पेज मॉड्यूल लोड नहीं हुआ। pages फ़ोल्डर में संबंधित फ़ाइल जाँचें।',
    'No activity matches these filters.': 'इन फ़िल्टर से कोई गतिविधि नहीं मिली।', 'No field updates yet.': 'अभी कोई मैदानी अपडेट नहीं।',
    'Search villages…': 'गाँव खोजें…', 'Filter SOS requests': 'SOS अनुरोध फ़िल्टर करें', 'Sort villages': 'गाँव क्रमबद्ध करें',
    'Update outlook': 'अनुमान ताज़ा करें', 'Refresh outlook': 'अनुमान ताज़ा करें', 'Refresh': 'ताज़ा करें',
    'Network connected': 'नेटवर्क जुड़ा है', 'Unverified crossing': 'पार मार्ग अपुष्ट', 'Field verified': 'मैदान में पुष्टि',
    'SITUATED': 'स्थिति', 'SIMULATED · MEDIUM': 'सिमुलेटेड · मध्यम', 'ESTIMATE': 'अनुमान', 'USER REPORTS': 'उपयोगकर्ता रिपोर्ट',
    'FIELD VERIFIED': 'मैदान में पुष्टि', 'NO OBSERVATION · N/A': 'कोई अवलोकन नहीं · लागू नहीं',
    'NO ALERT · N/A': 'कोई चेतावनी नहीं · लागू नहीं', 'ROUTE UPDATED': 'मार्ग अपडेट किया गया', 'ROUTE SUGGESTED': 'मार्ग सुझाया गया',
    'ILLUSTRATIVE MAP': 'उदाहरण मानचित्र', 'NOT TO SCALE': 'माप के अनुसार नहीं', 'DATA PROVENANCE': 'डेटा स्रोत',
    'MONSOON RESPONSE': 'मानसून प्रतिक्रिया', 'Flood response': 'बाढ़ राहत', 'Active': 'सक्रिय',
    'SIMULATED · Hydrology replay': 'सिमुलेटेड · जल प्रवाह पुनरावलोकन', 'RESPONSE DESK ACTIVE': 'प्रतिक्रिया केंद्र सक्रिय',
    'Network online': 'नेटवर्क ऑनलाइन', 'Network offline': 'नेटवर्क ऑफ़लाइन', 'Public safety page': 'सार्वजनिक सुरक्षा पेज',
    'Report saved to the database and flood outlook updated.': 'रिपोर्ट डेटाबेस में सहेजी गई और बाढ़ अनुमान अपडेट हुआ।',
    'Reading saved to the database and flood outlook updated.': 'रीडिंग डेटाबेस में सहेजी गई और बाढ़ अनुमान अपडेट हुआ।',
    'FIELD COMMAND': 'मैदानी कमान', 'INCIDENTS /': 'घटनाएँ /', 'Supabase connected': 'Supabase जुड़ा है',
    'SQLite connected': 'SQLite जुड़ा है', 'Saving data…': 'डेटा सहेजा जा रहा है…', 'RESPONSE OVERVIEW': 'प्रतिक्रिया का सार',
    'Geo spatial picture': 'भौगोलिक स्थिति', 'GEO SPATIAL PICTURE': 'भौगोलिक स्थिति', 'SITUATION MAP': 'स्थिति मानचित्र',
    'Observed layer, village estimates and live response locations': 'देखी गई परत, गाँवों के अनुमान और प्रतिक्रिया दलों के स्थान',
    'SIMULATED REPLAY · HYDROLOGY MODEL ·': 'सिमुलेटेड पुनरावलोकन · जल प्रवाह मॉडल ·',
    'Confidence: Medium ·': 'भरोसा: मध्यम ·', 'NEEDS ATTENTION': 'ध्यान देने योग्य',
    'Priority villages': 'प्राथमिकता वाले गाँव', 'Explainable risk score · highest first': 'समझने योग्य जोखिम अंक · सबसे अधिक पहले',
    'Risk considers exposure, access and field reports': 'जोखिम में खतरा, पहुँच और मैदानी रिपोर्ट शामिल हैं',
    'Flood impact & response': 'बाढ़ का असर और प्रतिक्रिया', 'Open full map': 'पूरा मानचित्र खोलें',
    'Village risk snapshot': 'गाँव के जोखिम का सार', 'Incident activity': 'घटना गतिविधि', 'Full timeline': 'पूरी समयरेखा',
    'CITIZEN REQUESTS & DISPATCH': 'नागरिक अनुरोध और रवाना करना', 'Public safety page': 'सार्वजनिक सुरक्षा पेज',
    'Priority logic:': 'प्राथमिकता का आधार:', 'Active requests': 'सक्रिय अनुरोध',
    'Create and prioritize requests, assign a team, and confirm what happened on the ground.': 'अनुरोध बनाएँ और प्राथमिकता दें, दल सौंपें और मैदानी कार्रवाई की पुष्टि करें।',
    'FIELD OPERATIONS': 'मैदानी संचालन', 'ROUTE PLANNING': 'मार्ग योजना', 'Reports & History': 'रिपोर्ट और इतिहास',
    'Last-known locations': 'अंतिम ज्ञात स्थान', 'Locations may be last-known': 'स्थान अंतिम ज्ञात हो सकता है',
    'Response summary': 'प्रतिक्रिया का सार', 'Incident timeline': 'घटना की समयरेखा',
    'Actor and timestamp are recorded for each update': 'हर अपडेट के साथ व्यक्ति और समय दर्ज होता है',
    'estimated population in monitored villages': 'निगरानी वाले गाँवों की अनुमानित आबादी',
    'people in confirmed complete cases': 'पुष्ट पूरे मामलों में लोग', 'cases with team en route': 'दल रास्ते में वाले मामले',
    'messages relayed, awaiting gateway ack': 'रिले संदेश, गेटवे पुष्टि की प्रतीक्षा में',
    'Village risk by priority': 'प्राथमिकता के अनुसार गाँव का जोखिम', 'Delivery acknowledgements': 'पहुँच की पुष्टि',
    'Incident activity filters': 'घटना गतिविधि फ़िल्टर', 'Filter the audit trail by incident, village, team, message status and date.': 'ऑडिट रिकॉर्ड को घटना, गाँव, दल, संदेश स्थिति और तारीख से फ़िल्टर करें।',
    'All incidents': 'सभी घटनाएँ', 'All dates': 'सभी तारीखें', 'View all': 'सभी देखें', 'Awaiting team contact': 'दल के संपर्क की प्रतीक्षा',
    'CITIZEN ACCESS': 'नागरिक सहायता', 'Request help from a phone': 'फोन से मदद माँगें',
    'OPERATIONAL RECORD': 'संचालन रिकॉर्ड', 'Reports & History': 'रिपोर्ट और इतिहास',
    'Sustained access': 'निरंतर पहुँच', 'Rakhshak — Home': 'रक्षक — होम', 'Home — Rakhshak': 'होम — रक्षक',
    'Dashboard — Rakhshak': 'डैशबोर्ड — रक्षक', 'Disaster Map — Rakhshak': 'आपदा मानचित्र — रक्षक',
    'Village Risk — Rakhshak': 'गाँव का जोखिम — रक्षक', 'SOS & Rescue — Rakhshak': 'SOS और बचाव — रक्षक',
    'Teams & Vehicles — Rakhshak': 'दल और वाहन — रक्षक', 'Offline Communication — Rakhshak': 'ऑफ़लाइन संचार — रक्षक',
    'Reports & History — Rakhshak': 'रिपोर्ट और इतिहास — रक्षक', 'Public Alerts — Rakhshak': 'सार्वजनिक चेतावनियाँ — रक्षक',
    'North bridge crossing': 'उत्तर पुल पार मार्ग', 'Crossing unverified': 'रास्ते की पुष्टि नहीं',
    'No verified closure report. Routes crossing this segment are suggested and unverified.': 'बंद होने की पुष्टि नहीं है। इस हिस्से से जाने वाले मार्ग सुझाव हैं और अपुष्ट हैं।',
    'Suggested route now avoids the north crossing via the east embankment.': 'सुझाया गया मार्ग अब उत्तर पार रास्ते से बचकर पूर्वी तटबंध से जाता है।',
    'Never treat a suggested route as guaranteed safe.': 'सुझाए गए मार्ग को कभी भी निश्चित रूप से सुरक्षित न मानें।',
    'Map controls': 'मानचित्र नियंत्रण', 'Layers & filters': 'परतें और फ़िल्टर', 'Flood extent': 'बाढ़ का फैलाव',
    'Observed river context with estimated flood impact · SIMULATED REPLAY': 'नदी की देखी गई स्थिति और अनुमानित बाढ़ का असर · सिमुलेटेड पुनरावलोकन',
    'Before and after comparison slider': 'पहले और बाद की तुलना स्लाइडर', 'Find village or case…': 'गाँव या मामला खोजें…',
    'ROUTE CONDITION': 'मार्ग की स्थिति', 'SELECTED FEATURE': 'चुनी गई जानकारी', 'INCIDENT LAYERS': 'घटना की परतें',
    'Flood extent · estimated': 'बाढ़ का फैलाव · अनुमानित', 'Suggested route to Dharampur': 'धर्मपुर का सुझाया मार्ग',
    'FLOOD RISK OUTLOOK': 'बाढ़ जोखिम अनुमान', 'What may need attention next': 'आगे किस पर ध्यान देना पड़ सकता है',
    'View all ↗': 'सभी देखें ↗', 'Village risk ↗': 'गाँव का जोखिम ↗', 'Open full map ↗': 'पूरा मानचित्र खोलें ↗',
    'REQUESTS & DISPATCH': 'अनुरोध और रवाना करना', 'Request emergency help': 'आपातकालीन मदद माँगें',
    'Request will be saved on this device and marked pending until synced.': 'अनुरोध इस डिवाइस पर सहेजा जाएगा और सिंक होने तक लंबित रहेगा।',
    'Request will be sent through this simulated network.': 'अनुरोध इस सिमुलेटेड नेटवर्क से भेजा जाएगा।',
    'Clear, actionable safety update': 'स्पष्ट और उपयोगी सुरक्षा अपडेट', 'Save draft for approval': 'मंज़ूरी के लिए मसौदा सहेजें',
    'No active public alerts.': 'कोई सक्रिय सार्वजनिक चेतावनी नहीं।', 'No alerts awaiting approval.': 'मंज़ूरी की प्रतीक्षा में कोई चेतावनी नहीं।',
    'Home': 'होम', 'Language': 'भाषा'
  });

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalDocumentTitle = document.title;
  let language = 'en';

  function translatePhrase(value) {
    if (Object.prototype.hasOwnProperty.call(hindi, value)) return hindi[value];
    let match = value.match(/^(\d+) high priority$/i);
    if (match) return `${match[1]} उच्च प्राथमिकता`;
    match = value.match(/^(\d+) available for dispatch$/i);
    if (match) return `${match[1]} भेजने के लिए उपलब्ध`;
    match = value.match(/^(\d+) OPEN$/i);
    if (match) return `${match[1]} खुले`;
    match = value.match(/^(\d+) APPROVED$/i);
    if (match) return `${match[1]} मंज़ूर`;
    match = value.match(/^(\d+) DRAFT$/i);
    if (match) return `${match[1]} मसौदे`;
    match = value.match(/^(\d+) NEED SYNC$/i);
    if (match) return `${match[1]} को सिंक चाहिए`;
    match = value.match(/^(\d+) villages$/i);
    if (match) return `${match[1]} गाँव`;
    match = value.match(/^(\d+) open SOS$/i);
    if (match) return `${match[1]} खुले SOS`;
    match = value.match(/^Baseline (\d+)\/100 · (.+)$/i);
    if (match) return `आधार ${match[1]}/100 · ${translatePhrase(match[2])}`;
    match = value.match(/^RISK (\d+)$/i);
    if (match) return `जोखिम ${match[1]}`;
    match = value.match(/^Update (.+)$/i);
    if (match) return `अपडेट ${match[1]}`;
    match = value.match(/^(\d+) min ago$/i);
    if (match) return `${match[1]} मिनट पहले`;
    match = value.match(/^(\d+) hr ago$/i);
    if (match) return `${match[1]} घंटे पहले`;
    return value;
  }

  function translateTextNode(node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    const leading = (original.match(/^\s*/) || [''])[0];
    const trailing = (original.match(/\s*$/) || [''])[0];
    const phrase = original.slice(leading.length, original.length - trailing.length);
    if (!phrase) {
      node.nodeValue = original;
      return;
    }
    const option = node.parentElement?.closest('option');
    if (language === 'hi' && option && !option.hasAttribute('value') && phrase) {
      option.setAttribute('value', phrase);
    }
    node.nodeValue = leading + (language === 'hi' ? translatePhrase(phrase) : phrase) + trailing;
  }

  function translateAttributes(element) {
    const attributes = ['aria-label', 'placeholder', 'title', 'alt'];
    let originals = originalAttributes.get(element);
    if (!originals) {
      originals = new Map();
      originalAttributes.set(element, originals);
    }
    for (const name of attributes) {
      if (!element.hasAttribute(name)) continue;
      if (!originals.has(name)) originals.set(name, element.getAttribute(name));
      const original = originals.get(name);
      element.setAttribute(name, language === 'hi' ? translatePhrase(original) : original);
    }
  }

  function apply(root) {
    if (!root) return;
    const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT']);
    const visit = (element) => {
      if (!element || skip.has(element.tagName) || element.closest?.('[data-no-translate]')) return;
      translateAttributes(element);
      element.querySelectorAll?.('*').forEach((child) => {
        if (skip.has(child.tagName) || child.closest('[data-no-translate]')) return;
        translateAttributes(child);
      });
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const parent = node.parentElement;
        if (!parent || skip.has(parent.tagName) || parent.closest('[data-no-translate]') || parent.closest('script,style,noscript,textarea,input')) return;
        translateTextNode(node);
      });
    };
    if (root.nodeType === Node.TEXT_NODE) translateTextNode(root);
    else if (root.nodeType === Node.ELEMENT_NODE) visit(root);
  }

  function updateSwitchers() {
    document.querySelectorAll('[data-rakhshak-lang]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.rakhshakLang === language));
    });
  }

  function mountSwitcher() {
    const home = document.body.dataset.page === 'home';
    const host = home ? document.querySelector('.home-nav-links') : document.querySelector('.top-actions');
    if (!host || host.querySelector('.language-switcher')) return;
    const group = document.createElement('div');
    group.className = 'language-switcher';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Choose language / भाषा चुनें');
    group.dataset.noTranslate = 'true';
    group.innerHTML = '<button type="button" data-rakhshak-lang="en" aria-label="English">EN</button><button type="button" data-rakhshak-lang="hi" aria-label="हिंदी">हिंदी</button>';
    host.append(group);
    updateSwitchers();
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'hi' ? 'hi' : 'en';
    try { localStorage.setItem(LANGUAGE_KEY, language); } catch {}
    document.documentElement.lang = language;
    document.body.dataset.language = language;
    document.title = language === 'hi' ? translatePhrase(originalDocumentTitle) : originalDocumentTitle;
    updateSwitchers();
    apply(document.body);
    window.dispatchEvent(new CustomEvent('rakhshak-language-change', { detail: { language } }));
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-rakhshak-lang]');
    if (button) setLanguage(button.dataset.rakhshakLang);
  });

  function init() {
    try { language = localStorage.getItem(LANGUAGE_KEY) === 'hi' ? 'hi' : 'en'; } catch { language = 'en'; }
    document.documentElement.lang = language;
    document.body.dataset.language = language;
    document.title = language === 'hi' ? translatePhrase(originalDocumentTitle) : originalDocumentTitle;
    mountSwitcher();
    apply(document.body);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) apply(node);
      }
      mountSwitcher();
      updateSwitchers();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.RakhshakI18n = { setLanguage, getLanguage: () => language, apply };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
