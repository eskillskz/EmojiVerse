
import { BlogPost, Locale, LOCALE_DATA } from '../types';

// ==========================================
// OPTIMIZED IMAGES (Context-Aware)
// ==========================================
const IMG_INSTAGRAM = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80";
const IMG_UNICODE = "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80"; // Code/Tech
const IMG_MARKETING = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"; // Analytics/Growth
const IMG_RARE = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80"; // Abstract/Art
const IMG_CULTURE = "https://images.unsplash.com/photo-1528164344705-475426879887?auto=format&fit=crop&w=800&q=80"; // Japan Lanterns
const IMG_HISTORY = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"; // Retro/Pixel
const IMG_FUTURE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"; // Sci-fi/Connect

// Define the master content structure to ensure consistency
interface ArticleBase {
  slug: string;
  image: string;
  category: 'Instagram' | 'Emoji' | 'Business';
  gradient: string;
  contentMap: Record<Locale, { title: string; excerpt: string; content: string[] }>;
}

const ARTICLES_DATA: ArticleBase[] = [
  {
    slug: 'instagram-bio-hacks',
    category: 'Instagram',
    image: IMG_INSTAGRAM,
    gradient: "from-purple-500 to-pink-500",
    contentMap: {
      en: {
        title: "5 Instagram Bio Hacks to Get More Followers",
        excerpt: "Your bio is your digital business card. Learn how to use special fonts and emojis to stand out.",
        content: [
          "You only get 150 characters to make a first impression on Instagram. How do you use them wisely?",
          "1. **Use Custom Fonts**: A standard font is boring. Use our 'Instagram Fonts' feature to turn your name into **Bold** or 𝒞𝓊𝓇𝓈𝒾𝓋ℯ.",
          "2. **Line Breaks**: Don't write a wall of text. Use line breaks to list your hobbies. Type in our editor first, then copy.",
          "3. **The Power of Emojis**: Use emojis as bullet points (e.g., 📸 for photographer).",
          "4. **Call to Action**: Always point down 👇 to your website link."
        ]
      },
      ru: {
        title: "5 лайфхаков для шапки профиля Instagram",
        excerpt: "Ваше БИО — это цифровая визитка. Узнайте, как использовать шрифты и смайлы, чтобы набрать подписчиков.",
        content: [
          "У вас есть всего 150 символов для первого впечатления. Как потратить их с умом?",
          "1. **Красивые шрифты**: Стандартный текст — это скучно. Используйте наш генератор, чтобы сделать имя **Жирным** или написать его 𝒞𝓊𝓇𝓈𝒾𝓋ℯ.",
          "2. **Воздух в тексте**: Не пишите сплошной «простыней». Делайте списки увлечений через Enter.",
          "3. **Эмодзи-маркеры**: Используйте смайлы вместо точек (например, 📸 для фотографа или ✈️ для тревел-блога).",
          "4. **Призыв к действию**: Всегда указывайте пальцем вниз 👇 на вашу ссылку."
        ]
      },
      es: {
        title: "5 Trucos para tu Bio de Instagram",
        excerpt: "Tu biografía es tu tarjeta de presentación. Aprende a usar fuentes y emojis para destacar.",
        content: [
          "Solo tienes 150 caracteres para causar una primera impresión. ¿Cómo usarlos sabiamente?",
          "1. **Fuentes Personalizadas**: Usa nuestra herramienta para transformar tu nombre en **Negrita** o 𝒞𝓊𝓇𝓈𝒾𝓋ℯ.",
          "2. **Saltos de Línea**: No escribas un muro de texto. Haz listas ordenadas.",
          "3. **El Poder de los Emojis**: Úsalos como viñetas (ej. 📸 para fotógrafos).",
          "4. **Llamada a la Acción**: Señala siempre hacia abajo 👇 a tu enlace."
        ]
      },
      // Fallbacks for other languages (simplified for brevity but fully functional)
      fr: { title: "5 Astuces pour votre Bio Instagram", excerpt: "Votre bio est votre carte de visite. Utilisez des polices spéciales.", content: ["Utilisez des polices personnalisées.", "Ajoutez des sauts de ligne.", "Utilisez des émojis."] },
      de: { title: "5 Instagram-Bio-Hacks", excerpt: "Deine Bio ist deine Visitenkarte. Nutze spezielle Schriftarten.", content: ["Nutze benutzerdefinierte Schriften.", "Mach Zeilenumbrüche.", "Nutze Emojis."] },
      it: { title: "5 Trucchi per la Bio di Instagram", excerpt: "La tua bio è il tuo biglietto da visita. Usa font speciali.", content: ["Usa font personalizzati.", "Aggiungi interruzioni di riga.", "Usa le emoji."] },
      pt: { title: "5 Truques para Bio do Instagram", excerpt: "Sua bio é seu cartão de visita. Use fontes especiais.", content: ["Use fontes personalizadas.", "Adicione quebras de linha.", "Use emojis."] },
      zh: { title: "5个Instagram简介技巧", excerpt: "你的简介是你的数字名片。学习如何使用特殊字体。", content: ["使用自定义字体。", "添加换行符。", "使用表情符号。"] },
      ja: { title: "Instagramプロフィールの5つのハック", excerpt: "プロフィールはデジタルの名刺です。フォントを活用しましょう。", content: ["カスタムフォントを使用。", "改行を追加。", "絵文字を使用。"] },
      ko: { title: "인스타그램 프로필 꿀팁 5가지", excerpt: "프로필은 디지털 명함입니다. 특수 글꼴을 사용하세요.", content: ["사용자 지정 글꼴 사용.", "줄 바꿈 추가.", "이모티콘 사용."] },
      ar: { title: "٥ حيل لبايو انستغرام", excerpt: "سيرتك الذاتية هي هويتك الرقمية. استخدم خطوطاً مميزة.", content: ["استخدم خطوط مخصصة.", "أضف فواصل أسطر.", "استخدم الرموز التعبيرية."] },
      hi: { title: "इंस्टाग्राम बायो के 5 हैक्स", excerpt: "आपका बायो आपका डिजिटल कार्ड है। विशेष फोंट का उपयोग करें।", content: ["कस्टम फोंट का उपयोग करें।", "लाइन ब्रेक जोड़ें।", "इमोजी का उपयोग करें।"] },
      kk: { title: "Instagram биосына арналған 5 кеңес", excerpt: "Сіздің биоңыз - сандық визитка. Қаріптерді қолданыңыз.", content: ["Арнайы қаріптерді қолданыңыз.", "Жол үзілімдерін қосыңыз.", "Эмодзи қолданыңыз."] },
    }
  },
  {
    slug: 'unicode-secrets',
    category: 'Emoji',
    image: IMG_UNICODE,
    gradient: "from-blue-600 to-cyan-500",
    contentMap: {
      en: {
        title: "How Does a New Emoji Appear? Secrets of the Unicode Consortium",
        excerpt: "It takes up to 2 years for a new emoji to reach your phone. We reveal the bureaucratic process behind the smiley.",
        content: [
          "Ever wondered why there isn't a 'Flamingo' emoji until recently? It's not accidental.",
          "**The Unicode Consortium**: A non-profit group in California decides what becomes an emoji. Anyone can submit a proposal, but the criteria are strict.",
          "1. **Distinctiveness**: Can it be confused with an existing one?",
          "2. **Frequency**: Is there data showing people demand it?",
          "3. **Completeness**: Does it fill a gap in language?",
          "Once approved, companies like Apple, Google, and Samsung draw their own versions. That's why the 'Pistol' emoji turned into a water gun on iOS years ago."
        ]
      },
      ru: {
        title: "Как появляется новый эмодзи? Секреты консорциума Unicode",
        excerpt: "Чтобы новый смайл попал в ваш телефон, нужно до 2 лет согласований. Раскрываем бюрократию цифрового языка.",
        content: [
          "Вы когда-нибудь задумывались, почему эмодзи 'Фламинго' не было так долго? Это не случайность.",
          "**Консорциум Unicode**: Некоммерческая группа в Калифорнии решает судьбу смайлов. Предложить идею может любой (даже вы!), но критерии жесткие.",
          "1. **Отличимость**: Нельзя добавить смайл, если он похож на существующий.",
          "2. **Частота использования**: Нужно доказать статистикой, что людям это нужно.",
          "3. **Универсальность**: Смайл должен быть понятен во всем мире.",
          "После одобрения Apple, Google и Samsung рисуют свои версии. Именно поэтому 'Пистолет' на айфонах превратился в водный пистолет — это решение компаний, а не Unicode."
        ]
      },
      es: {
        title: "¿Cómo nace un nuevo emoji? Secretos de Unicode",
        excerpt: "Un emoji tarda hasta 2 años en llegar a tu teléfono. Revelamos el proceso burocrático.",
        content: [
          "¿Por qué tardó tanto el emoji del 'Flamenco'? No es casualidad.",
          "**El Consorcio Unicode**: Un grupo en California decide. Cualquiera puede enviar una propuesta.",
          "Criterios: ¿Es distintivo? ¿Es demandado? ¿Es universal?",
          "Una vez aprobado, Apple y Google diseñan sus propias versiones."
        ]
      },
      fr: { title: "Comment naît un nouvel émoji ?", excerpt: "Les secrets du Consortium Unicode révélés.", content: ["Le Consortium Unicode décide tout.", "C'est un processus long de 2 ans.", "Apple et Google dessinent leurs propres versions."] },
      de: { title: "Wie entsteht ein neues Emoji?", excerpt: "Die Geheimnisse des Unicode-Konsortiums.", content: ["Das Unicode-Konsortium entscheidet.", "Der Prozess dauert 2 Jahre.", "Kriterien sind streng."] },
      it: { title: "Come nasce un nuovo emoji?", excerpt: "I segreti del Consorzio Unicode svelati.", content: ["Il Consorzio Unicode decide tutto.", "Ci vogliono 2 anni.", "I criteri sono severi."] },
      pt: { title: "Como nasce um novo emoji?", excerpt: "Os segredos do Consórcio Unicode.", content: ["O Consórcio Unicode decide.", "Demora até 2 anos.", "Critérios rigorosos."] },
      zh: { title: "新表情符号是如何诞生的？", excerpt: "Unicode联盟的秘密。", content: ["Unicode联盟决定一切。", "过程长达2年。", "标准非常严格。"] },
      ja: { title: "新しい絵文字はどのように生まれる？", excerpt: "Unicodeコンソーシアムの秘密。", content: ["Unicodeコンソーシアムが決定します。", "2年かかります。", "厳しい基準があります。"] },
      ko: { title: "새로운 이모티콘의 탄생 과정", excerpt: "유니코드 컨소시엄의 비밀.", content: ["유니코드 컨소시엄이 결정합니다.", "2년이 걸립니다.", "기준이 엄격합니다."] },
      ar: { title: "كيف يظهر رمز تعبيري جديد؟", excerpt: "أسرار اتحاد Unicode.", content: ["اتحاد Unicode يقرر.", "العملية تستغرق عامين.", "المعايير صارمة."] },
      hi: { title: "नया इमोजी कैसे बनता है?", excerpt: "Unicode कंसोर्टियम के रहस्य।", content: ["Unicode निर्णय लेता है।", "इसमें 2 साल लगते हैं।", "मानदंड सख्त हैं।"] },
      kk: { title: "Жаңа эмодзи қалай пайда болады?", excerpt: "Unicode консорциумының құпиялары.", content: ["Unicode шешім қабылдайды.", "Процесс 2 жылға созылады.", "Талаптар қатаң."] },
    }
  },
  {
    slug: 'emoji-marketing',
    category: 'Business',
    image: IMG_MARKETING,
    gradient: "from-emerald-600 to-teal-500",
    contentMap: {
      en: {
        title: "Emoji Marketing: How to Use Smileys to Boost CTR and Sales",
        excerpt: "Emails with emojis in the subject line have a 25% higher open rate. Here is how to use them professionally.",
        content: [
          "Marketing is no longer just text. It's visual. Emojis are the fastest way to convey emotion.",
          "**Boost Email Open Rates**: Studies show a 56% increase in unique open rates when businesses use emojis in subject lines.",
          "**Push Notifications**: An app notification saying 'Your order is ready 🍕' performs better than plain text.",
          "**The Don'ts**: Never use emojis that can be misinterpreted (like the Peach 🍑 or Eggplant 🍆) in a business context unless you are being intentionally edgy. Keep it relevant to your brand."
        ]
      },
      ru: {
        title: "Эмодзи-маркетинг: как использовать смайлы для повышения продаж",
        excerpt: "Письма со смайликами в теме открывают на 25% чаще. Учимся использовать эмодзи в бизнесе профессионально.",
        content: [
          "Маркетинг больше не сухой текст. Эмодзи — это самый быстрый способ передать эмоцию.",
          "**Email-рассылки**: Исследования показывают рост открываемости на 56%, если в теме письма есть релевантный смайл.",
          "**Push-уведомления**: Сообщение «Ваш заказ готов 🍕» работает лучше, чем просто текст.",
          "**Табу**: Никогда не используйте двусмысленные эмодзи (Персик 🍑 или Баклажан 🍆) в деловой переписке, если это не часть дерзкой стратегии. Будьте аккуратны."
        ]
      },
      es: {
        title: "Marketing con Emojis: Aumenta tu CTR y Ventas",
        excerpt: "Los correos con emojis tienen un 25% más de apertura. Aprende a usarlos profesionalmente.",
        content: [
          "El marketing es visual. Los emojis transmiten emoción al instante.",
          "**Emails**: Aumentan la tasa de apertura en un 56%.",
          "**Notificaciones**: 'Tu pedido está listo 🍕' funciona mejor.",
          "**Cuidado**: Evita emojis con doble sentido (🍑, 🍆) en contextos serios."
        ]
      },
      fr: { title: "Marketing Émoji : Boostez vos ventes", excerpt: "Les émojis augmentent le taux d'ouverture des e-mails.", content: ["Utilisez des émojis dans les objets d'e-mail.", "Attention aux doubles sens.", "Soyez pertinent."] },
      de: { title: "Emoji-Marketing: Mehr Umsatz", excerpt: "Emojis erhöhen die Öffnungsrate von E-Mails.", content: ["Nutze Emojis im Betreff.", "Vermeide Missverständnisse.", "Sei professionell."] },
      it: { title: "Emoji Marketing: Aumenta le vendite", excerpt: "Le emoji aumentano il tasso di apertura delle email.", content: ["Usa le emoji nell'oggetto.", "Evita doppi sensi.", "Sii pertinente."] },
      pt: { title: "Marketing com Emojis", excerpt: "Emojis aumentam a taxa de abertura de e-mails.", content: ["Use emojis no assunto.", "Cuidado com duplos sentidos.", "Seja profissional."] },
      zh: { title: "表情符号营销：提高销量", excerpt: "带有表情符号的邮件打开率更高。", content: ["在标题中使用表情。", "避免歧义。", "保持专业。"] },
      ja: { title: "絵文字マーケティング：売上アップ", excerpt: "絵文字付きメールは開封率が高いです。", content: ["件名に絵文字を使用。", "誤解を避ける。", "関連性を持たせる。"] },
      ko: { title: "이모티콘 마케팅: 매출 증대", excerpt: "이모티콘이 있는 이메일은 개방률이 높습니다.", content: ["제목에 이모티콘 사용.", "이중 의미 주의.", "전문성 유지."] },
      ar: { title: "تسويق الرموز التعبيرية", excerpt: "الرسائل ذات الرموز التعبيرية تفتح أكثر.", content: ["استخدم الرموز في العناوين.", "تجنب سوء الفهم.", "كن محترفاً."] },
      hi: { title: "इमोजी मार्केटिंग", excerpt: "इमोजी वाले ईमेल की ओपन रेट ज्यादा होती है।", content: ["विषय में इमोजी का उपयोग करें।", "गलत अर्थ से बचें।", "प्रासंगिक रहें।"] },
      kk: { title: "Эмодзи маркетинг", excerpt: "Эмодзи бар хаттар жиі ашылады.", content: ["Тақырыпта эмодзи қолданыңыз.", "Екіұшты мағынадан аулақ болыңыз.", "Кәсіби болыңыз."] },
    }
  },
  {
    slug: 'rare-emojis',
    category: 'Emoji',
    image: IMG_RARE,
    gradient: "from-indigo-500 to-purple-700",
    contentMap: {
      en: {
        title: "The Strangest and Rarest Emojis You've Never Heard Of",
        excerpt: "Have you ever used the 'Levitating Man in a Suit'? We compiled a collection of the weirdest symbols in the library.",
        content: [
          "With over 3,600 emojis, some are bound to be useless. Or are they?",
          "**Levitating Businessman 🕴️**: This dates back to the Webdings font in the 90s. It was originally an exclamation mark in the shape of a jumping ska dancer.",
          "**The Moyai 🗿**: Not an Easter Island head! It's actually a statue in Shibuya Station, Tokyo. It represents the Moyai cooperation movement.",
          "**Ogre 👹**: Known as 'Namahage' in Japanese folklore. It's not a devil, but a spirit that wards off evil (or scares lazy children)."
        ]
      },
      ru: {
        title: "Самые странные и редкие эмодзи: подборка символов",
        excerpt: "Вы когда-нибудь использовали «Левитирующего бизнесмена»? Подборка самых загадочных символов клавиатуры.",
        content: [
          "Среди 3600 эмодзи есть те, которые никто не использует. Но у них есть история.",
          "**Левитирующий бизнесмен 🕴️**: Пришел из шрифта Webdings 90-х. Изначально это был восклицательный знак в форме танцующего фаната ска-музыки.",
          "**Мойя 🗿**: Это не голова с острова Пасхи! Это статуя на станции Сибуя в Токио. В Японии она место встречи, как памятник Пушкину в Москве.",
          "**Демон Они 👹**: Это Намахагэ из японского фольклора. Он не зло, а дух, который отпугивает неудачи (и ленивых детей)."
        ]
      },
      es: {
        title: "Los Emojis más extraños y raros",
        excerpt: "¿Has usado al 'Hombre Levitando'? Una colección de los símbolos más raros.",
        content: [
          "**Hombre Levitando 🕴️**: Viene de la fuente Webdings de los 90.",
          "**Moyai 🗿**: No es de la Isla de Pascua, es una estatua en Tokio.",
          "**Ogro 👹**: Es un Namahage del folclore japonés, no un diablo."
        ]
      },
      fr: { title: "Les émojis les plus étranges", excerpt: "Avez-vous déjà utilisé l'homme en lévitation ?", content: ["L'homme en costume 🕴️ vient de Webdings.", "Le Moyai 🗿 est à Tokyo.", "L'Ogre 👹 est un esprit japonais."] },
      de: { title: "Die seltsamsten Emojis", excerpt: "Haben Sie den schwebenden Mann benutzt?", content: ["Der schwebende Mann 🕴️.", "Der Moyai 🗿 ist in Tokio.", "Der Oger 👹 ist japanische Folklore."] },
      it: { title: "Gli emoji più strani", excerpt: "Hai mai usato l'uomo che levita?", content: ["L'uomo che levita 🕴️.", "Il Moyai 🗿 è a Tokyo.", "L'Orco 👹 è folclore giapponese."] },
      pt: { title: "Os emojis mais estranhos", excerpt: "Já usou o homem levitando?", content: ["O homem de terno 🕴️.", "O Moyai 🗿 fica em Tóquio.", "O Ogro 👹 é japonês."] },
      zh: { title: "最奇怪和罕见的表情符号", excerpt: "你用过悬浮西装男吗？", content: ["悬浮男🕴️来自Webdings。", "摩艾石像🗿在东京。", "食人魔👹是日本传说。"] },
      ja: { title: "最も奇妙で珍しい絵文字", excerpt: "浮遊するビジネスマンを使ったことはありますか？", content: ["浮遊する男🕴️はWebdings出身。", "モヤイ像🗿は渋谷にあります。", "なまはげ👹は日本の伝承です。"] },
      ko: { title: "가장 이상하고 희귀한 이모티콘", excerpt: "공중부양하는 남자를 써보셨나요?", content: ["공중부양 남자🕴️는 90년대 폰트에서 유래.", "모아이🗿는 도쿄 시부야에 있습니다.", "도깨비👹는 일본 민속입니다."] },
      ar: { title: "أغرب الرموز التعبيرية", excerpt: "هل استخدمت الرجل الطائر؟", content: ["الرجل الطائر 🕴️.", "تمثال موياي 🗿 في طوكيو.", "الغول 👹 من الفلكلور الياباني."] },
      hi: { title: "सबसे अजीब और दुर्लभ इमोजी", excerpt: "क्या आपने उड़ते हुए आदमी का उपयोग किया है?", content: ["उड़ता आदमी 🕴️ Webdings से है।", "Moyai 🗿 टोक्यो में है।", "राक्षस 👹 जापानी लोककथा है।"] },
      kk: { title: "Ең оғаш және сирек эмодзилер", excerpt: "Сіз ұшатын адамды қолдандыңыз ба?", content: ["Ұшатын адам 🕴️.", "Мояи 🗿 Токиода.", "Огр 👹 жапон фольклоры."] },
    }
  },
  {
    slug: 'cultural-code',
    category: 'Emoji',
    image: IMG_CULTURE,
    gradient: "from-orange-500 to-red-500",
    contentMap: {
      en: {
        title: "Cultural Code: Why Emojis Mean Different Things in Japan and the West",
        excerpt: "Using the 'Poop' emoji in Japan implies good luck. Understanding global emoji etiquette prevents embarrassment.",
        content: [
          "Language is tricky, but emojis are supposed to be universal. Or are they?",
          "**The Poop Emoji 💩**: In the West, it's funny or gross. In Japan, it's a symbol of good luck because the word 'unko' (poop) sounds like 'oon' (luck). Gold poop charms are common gifts!",
          "**Slightly Smiling Face 🙂**: In Western culture, it's polite. In China, this specific smile implies distrust or sarcasm ('I have nothing to say to you').",
          "**Angel 👼**: In the West, it means innocence. In India, it is often used to represent a baby or death, depending on context."
        ]
      },
      ru: {
        title: "Культурный код: почему эмодзи означают разное в Японии и на Западе",
        excerpt: "Какашка 💩 в Японии — к удаче? Понимание этикета эмодзи спасет вас от неловкости за границей.",
        content: [
          "Язык сложен, но эмодзи должны быть универсальны. Так ли это?",
          "**Эмодзи Какашка 💩**: На Западе это просто смешно. В Японии это символ удачи! Слово «унко» (какашка) созвучно со словом «ун» (удача). Золотые какашки — популярный сувенир.",
          "**Легкая улыбка 🙂**: У нас это вежливость. В Китае этот конкретный смайл означает недоверие или сарказм («мне нечего тебе сказать»).",
          "**Сложенные руки 🙏**: В США это «дай пять», в России — молитва, а в Японии — «спасибо» или «извините»."
        ]
      },
      es: {
        title: "Código Cultural: Emojis en Japón vs Occidente",
        excerpt: "Usar la 💩 en Japón implica buena suerte. Entiende la etiqueta global.",
        content: [
          "**La Caca 💩**: En Japón trae buena suerte porque suena como 'suerte' (oon).",
          "**Sonrisa leve 🙂**: En China implica desconfianza o sarcasmo.",
          "**Ángel 👼**: En occidente es inocencia, en otros lados puede significar muerte."
        ]
      },
      fr: { title: "Code Culturel : Japon vs Occident", excerpt: "Pourquoi la 💩 porte chance au Japon.", content: ["La crotte 💩 porte chance au Japon.", "Le sourire 🙂 est sarcastique en Chine.", "Les mains jointes 🙏 signifient merci."] },
      de: { title: "Kultureller Code: Emojis weltweit", excerpt: "Warum 💩 in Japan Glück bringt.", content: ["Der Haufen 💩 bringt Glück in Japan.", "Lächeln 🙂 ist in China Sarkasmus.", "Gefaltete Hände 🙏 bedeuten Danke."] },
      it: { title: "Codice Culturale: Giappone vs Occidente", excerpt: "Perché la 💩 porta fortuna in Giappone.", content: ["La cacca 💩 porta fortuna.", "Il sorriso 🙂 è sarcastico in Cina.", "Mani giunte 🙏 significano grazie."] },
      pt: { title: "Código Cultural: Emojis no mundo", excerpt: "Por que o 💩 dá sorte no Japão.", content: ["O cocô 💩 dá sorte no Japão.", "O sorriso 🙂 é sarcasmo na China.", "Mãos juntas 🙏 significam obrigado."] },
      zh: { title: "文化代码：东西方表情差异", excerpt: "为什么💩在日本意味着好运。", content: ["大便💩在日本代表好运。", "微笑🙂在中国代表呵呵。", "双手合十🙏代表感谢。"] },
      ja: { title: "文化的コード：日本と西洋の絵文字", excerpt: "なぜ💩が日本で幸運を意味するのか。", content: ["うんこ💩は「運」に通じます。", "微笑み🙂は中国では皮肉です。", "合わせ手🙏は感謝を意味します。"] },
      ko: { title: "문화 코드: 동서양의 이모티콘 차이", excerpt: "일본에서 💩가 행운인 이유.", content: ["똥💩은 일본에서 행운을 의미.", "미소🙂는 중국에서 비꼬는 의미.", "합장🙏은 감사를 의미."] },
      ar: { title: "الرموز الثقافية", excerpt: "لماذا يعني 💩 الحظ في اليابان.", content: ["الروث 💩 يعني الحظ في اليابان.", "الابتسامة 🙂 تعني السخرية في الصين.", "الأيدي المتشابكة 🙏 تعني الشكر."] },
      hi: { title: "सांस्कृतिक कोड", excerpt: "जापान में 💩 का मतलब भाग्य क्यों है।", content: ["जापान में 💩 भाग्य लाता है।", "चीन में मुस्कान 🙂 व्यंग्य है।", "जुड़े हाथ 🙏 का मतलब धन्यवाद है।"] },
      kk: { title: "Мәдени код", excerpt: "Неге Жапонияда 💩 сәттілік білдіреді.", content: ["Жапонияда 💩 сәттілік әкеледі.", "Қытайда 🙂 кекесінді білдіреді.", "Қол қусыру 🙏 рахмет айту."] },
    }
  },
  {
    slug: 'ascii-history',
    category: 'Emoji',
    image: IMG_HISTORY,
    gradient: "from-gray-700 to-slate-900",
    contentMap: {
      en: {
        title: "From ASCII Art to Memoji: The Timeline of Digital Emotions",
        excerpt: "Before yellow faces, we had :-) and text art. Trace the evolution from 1982 to the Metaverse.",
        content: [
          "**1982**: Scott Fahlman proposes using :-) to mark jokes on a university bulletin board. The emoticon is born.",
          "**1999**: Shigetaka Kurita creates the first 176 pixel emojis for Japanese pagers.",
          "**2008**: Apple introduces the iPhone in Japan, hiding an emoji keyboard inside that users discovered.",
          "**2017**: Apple launches Animoji and Memoji, tracking facial muscles to animate avatars.",
          "**Future**: Holographic emotions in VR?"
        ]
      },
      ru: {
        title: "От ASCII-арта до Memoji: хронология цифровых эмоций",
        excerpt: "До желтых колобков у нас были :-) и текстовые рисунки. Эволюция общения с 1982 года до Метавселенной.",
        content: [
          "**1982**: Скотт Фалман предлагает использовать :-) для обозначения шуток в университетской сети. Так родился смайлик.",
          "**1999**: Сигэтака Курита создает первые 176 пиксельных эмодзи для японских пейджеров.",
          "**2008**: Apple выпускает iPhone с секретной клавиатурой эмодзи для Японии, которую быстро находят хакеры.",
          "**2017**: Появление Animoji и Memoji, которые считывают мимику вашего лица.",
          "**Будущее**: Голографические эмоции в VR?"
        ]
      },
      es: {
        title: "Del arte ASCII a los Memoji",
        excerpt: "Antes de las caras amarillas teníamos :-). La evolución digital.",
        content: [
          "**1982**: Nace el emoticono :-).",
          "**1999**: Primeros emojis en Japón.",
          "**2008**: Apple esconde el teclado emoji en iPhone.",
          "**2017**: Llegan los Animojis."
        ]
      },
      fr: { title: "De l'ASCII aux Memoji", excerpt: "L'évolution des émotions numériques.", content: ["1982 : Naissance du :-)", "1999 : Premiers émojis au Japon.", "2017 : Les Animojis arrivent."] },
      de: { title: "Von ASCII zu Memoji", excerpt: "Die Entwicklung digitaler Emotionen.", content: ["1982: Das :-) wird geboren.", "1999: Erste Emojis in Japan.", "2017: Animojis kommen."] },
      it: { title: "Dall'ASCII ai Memoji", excerpt: "L'evoluzione delle emozioni digitali.", content: ["1982: Nasce l'emoticon.", "1999: Primi emoji in Giappone.", "2017: Arrivano gli Animoji."] },
      pt: { title: "Do ASCII ao Memoji", excerpt: "A evolução das emoções digitais.", content: ["1982: Nasce o :-)", "1999: Primeiros emojis no Japão.", "2017: Animojis chegam."] },
      zh: { title: "从ASCII到Memoji", excerpt: "数字情感的时间线。", content: ["1982：颜文字诞生。", "1999：日本首批表情符号。", "2017：动话表情发布。"] },
      ja: { title: "ASCIIからMemojiへ", excerpt: "デジタル感情の歴史。", content: ["1982年：顔文字の誕生。", "1999年：日本で最初の絵文字。", "2017年：アニ文字の登場。"] },
      ko: { title: "ASCII에서 미모지까지", excerpt: "디지털 감정의 연대기.", content: ["1982: 이모티콘 탄생.", "1999: 일본 최초의 이모지.", "2017: 애니모지 출시."] },
      ar: { title: "من ASCII إلى Memoji", excerpt: "تطور المشاعر الرقمية.", content: ["١٩٨٢: ولادة الرموز.", "١٩٩٩: أول رموز تعبيرية.", "٢٠١٧: ظهور Animoji."] },
      hi: { title: "ASCII से Memoji तक", excerpt: "डिजिटल भावनाओं का विकास।", content: ["1982: इमोटिकॉन का जन्म।", "1999: जापान में पहले इमोजी।", "2017: Animoji आया।"] },
      kk: { title: "ASCII-ден Memoji-ге дейін", excerpt: "Сандық эмоциялардың хронологиясы.", content: ["1982: Смайлик туылды.", "1999: Алғашқы эмодзилер.", "2017: Animoji пайда болды."] },
    }
  },
  {
    slug: 'future-communication',
    category: 'Business',
    image: IMG_FUTURE,
    gradient: "from-cyan-500 to-blue-600",
    contentMap: {
      en: {
        title: "Future of Communication: Will Emojis Replace Text?",
        excerpt: "Gen Alpha is already ditching words for stickers. We analyze if the alphabet is doomed.",
        content: [
          "Ancient Egyptians used hieroglyphs. Modern humans use emojis. Are we going backwards or evolving?",
          "**Speed**: It takes 3 seconds to type 'I am happy', but 0.5 seconds to tap 😊.",
          "**Universal**: An alien implies 'weird' in almost every language.",
          "**The Verdict**: Emojis won't replace text for contracts or laws, but for casual communication, they are becoming the primary layer of meaning. Text is becoming the 'subtitles' for our digital interactions."
        ]
      },
      ru: {
        title: "Будущее общения: заменят ли эмодзи и стикеры обычный текст?",
        excerpt: "Поколение Альфа уже отказывается от слов в пользу стикеров. Грозит ли вымирание алфавиту?",
        content: [
          "Древние египтяне использовали иероглифы. Мы используем эмодзи. Мы деградируем или эволюционируем?",
          "**Скорость**: Напечатать «Я счастлив» — 3 секунды. Нажать 😊 — 0.5 секунды.",
          "**Универсальность**: Пришелец 👽 понятен на любом языке.",
          "**Вердикт**: Эмодзи не заменят текст в законах или договорах, но в личном общении они становятся главным слоем смысла. Текст превращается в «субтитры» к нашим эмоциям."
        ]
      },
      es: {
        title: "El futuro de la comunicación",
        excerpt: "¿Reemplazarán los emojis al texto? Analizamos el fin del alfabeto.",
        content: [
          "¿Volvemos a los jeroglíficos?",
          "**Velocidad**: Es más rápido pulsar 😊 que escribir.",
          "**Universalidad**: Se entiende en todos los idiomas.",
          "**Veredicto**: No reemplazarán leyes, pero sí charlas casuales."
        ]
      },
      fr: { title: "L'avenir de la communication", excerpt: "Les émojis remplaceront-ils le texte ?", content: ["Retour aux hiéroglyphes ?", "Plus rapide de taper 😊.", "Universel dans toutes les langues."] },
      de: { title: "Die Zukunft der Kommunikation", excerpt: "Ersetzen Emojis den Text?", content: ["Zurück zu Hieroglyphen?", "Schneller 😊 zu tippen.", "Universell verständlich."] },
      it: { title: "Il futuro della comunicazione", excerpt: "Le emoji sostituiranno il testo?", content: ["Ritorno ai geroglifici?", "Più veloce digitare 😊.", "Universale."] },
      pt: { title: "O futuro da comunicação", excerpt: "Emojis substituirão o texto?", content: ["Volta aos hieróglifos?", "Mais rápido digitar 😊.", "Universal."] },
      zh: { title: "沟通的未来", excerpt: "表情符号会取代文字吗？", content: ["回到象形文字？", "点击😊更快。", "通用语言。"] },
      ja: { title: "コミュニケーションの未来", excerpt: "絵文字はテキストに取って代わるのか？", content: ["ヒエログリフへの回帰？", "😊の方が速い。", "世界共通です。"] },
      ko: { title: "의사소통의 미래", excerpt: "이모티콘이 텍스트를 대체할까요?", content: ["상형문자로의 회귀?", "😊가 더 빠릅니다.", "만국 공통입니다."] },
      ar: { title: "مستقبل التواصل", excerpt: "هل ستحل الرموز محل النص؟", content: ["العودة للهيروغليفية؟", "النقر 😊 أسرع.", "لغة عالمية."] },
      hi: { title: "संचार का भविष्य", excerpt: "क्या इमोजी टेक्स्ट की जगह लेंगे?", content: ["चित्रलिपि की वापसी?", "😊 टाइप करना तेज है।", "सार्वभौमिक भाषा।"] },
      kk: { title: "Қарым-қатынас болашағы", excerpt: "Эмодзи мәтінді алмастыра ма?", content: ["Иероглифтерге қайту?", "😊 басу жылдам.", "Әлемдік тіл."] },
    }
  }
];

// Generate the flat list of all posts for all locales
export const BLOG_POSTS: BlogPost[] = [];

// Helper to ensure we have content for a requested locale, falling back to English if specific trans missing
const getContent = (article: ArticleBase, locale: Locale) => {
  return article.contentMap[locale] || article.contentMap['en'];
};

ARTICLES_DATA.forEach(article => {
  LOCALE_DATA.forEach(localeInfo => {
    const loc = localeInfo.code;
    const content = getContent(article, loc);
    
    BLOG_POSTS.push({
      id: `${article.slug}-${loc}`,
      slug: article.slug,
      locale: loc,
      title: content.title,
      category: article.category,
      excerpt: content.excerpt,
      date: "2023-2024", // Generalized date
      readTime: "5 min",
      image: article.image,
      imageAlt: content.title,
      imageGradient: article.gradient,
      content: content.content
    });
  });
});
