import { Locale } from '../types';

interface SEOData {
  appTitle: string;
  metaDescription: string;
  mainHeading: string;
  subHeading: string;
  aboutTitle: string;
  aboutText: string[];
  faqTitle: string;
  faqIntro: string;
  faq: { q: string; a: string }[];
  keywords: string[];
}

// Helper to get SEO data safely
export const getSEOData = (locale: Locale): SEOData => {
  return SEO_CONTENT[locale] || SEO_CONTENT['en'];
};

const SEO_CONTENT: Record<string, SEOData> = {
  en: {
    appTitle: "EmojiVerse - Word Counter, Emoji Picker & Social Editor",
    metaDescription: "Free online Emoji Picker, Word Counter, and Character Counter. Check Instagram caption limits, copy emojis, and format text for social media.",
    mainHeading: "The Ultimate Emoji & Text Editor",
    subHeading: "Type, count words, format fonts, and find emojis in any language.",
    aboutTitle: "More Than Just Emojis",
    aboutText: [
      "Welcome to EmojiVerse, your all-in-one workspace for crafting the perfect social media posts. While we started as a comprehensive emoji library, we realized content creators needed more. That's why we built a powerful text editing suite right into the browser.",
      "Whether you are drafting an Instagram caption, writing a tweet, or composing an email, clarity matters. Our integrated **Word Counter** and **Character Counter** update in real-time, ensuring you hit your targets without guessing. We specifically included an **Instagram Limit Checker** (2,200 chars) so you never get cut off mid-sentence again.",
      "We believe in breaking language barriers. Our unique search engine allows you to find emojis using keywords in over 13 languages. Plus, with our new 'Magic Fonts' feature, you can transform boring text into bold, italic, or decorative styles to make your bio stand out. No installation required—just open, type, and copy."
    ],
    faqTitle: "Frequently Asked Questions",
    faqIntro: "Everything you need to know about using our text tools, counters, and emoji library.",
    faq: [
      { q: "Does this tool count words and characters?", a: "Yes! EmojiVerse is a fully functional Word Counter and Character Counter. As you type in the text area, look for the statistics bar just above the emoji list. It updates instantly to show you exactly how long your text is." },
      { q: "How does the Instagram Limit checker work?", a: "Instagram captions are limited to 2,200 characters. Our tool has a dedicated 'IG Limit' indicator that counts down as you type. It turns red if you exceed the limit, helping you edit your caption to the perfect length." },
      { q: "Is this service completely free?", a: "Absolutely. EmojiVerse is 100% free to use. We don't require registration, we don't charge subscriptions, and there are no hidden fees. You get full access to everything immediately." },
      { q: "Can I search for emojis in my native language?", a: "Yes, this is one of our unique features. Whether you speak Spanish, Russian, Japanese, or Arabic, you can type keywords in your own language into the search bar. Our system understands multilingual queries." },
      { q: "Does the app save my text?", a: "For your privacy, we do not store your text on our servers. However, we use your browser's local storage to save your 'Favorites' and 'Recently Used' emojis. Your actual text draft is temporary." },
      { q: "How do I change the font style?", a: "Click the 'Instagram Fonts' (or Magic Wand) button in the text editor. A menu will appear letting you convert your normal text into Bold, Italic, Gothic, or Bubble text styles." },
      { q: "Does it work on mobile phones?", a: "Yes, EmojiVerse is designed as a Progressive Web App (PWA). It works perfectly on iPhones, iPads, and Android devices with a touch-friendly interface." },
      { q: "Can I copy multiple emojis at once?", a: "Yes. Unlike other pickers that copy one by one, EmojiVerse lets you build a whole sentence or a string of emojis in the editor and copy them all at once." },
      { q: "What browsers are supported?", a: "We support all modern browsers including Chrome, Safari, Firefox, Edge, and Opera. We ensure high performance and fast loading times on all platforms." },
      { q: "Why use this instead of my phone keyboard?", a: "Phone keyboards are small and limited. EmojiVerse gives you a full-screen view, lets you count characters, check limits, and use special fonts unavailable on standard keyboards." }
    ],
    keywords: [
      "Word Counter", "Character Counter", "Online Text Editor", 
      "Instagram Caption Limit", "Emoji Picker", "Social Media Tool", 
      "Copy Paste Emojis", "Font Generator", "Instagram Fonts", 
      "Symbol Counter", "Unicode Characters", "IG Bio Fonts"
    ]
  },
  ru: {
    appTitle: "EmojiVerse - Счетчик Слов, Символов и Эмодзи",
    metaDescription: "Бесплатный онлайн редактор. Счетчик слов и символов, проверка лимитов Инстаграм, красивые шрифты и коллекция эмодзи.",
    mainHeading: "Ваш Идеальный Текстовый Редактор",
    subHeading: "Печатайте, считайте слова, меняйте шрифты и находите эмодзи мгновенно.",
    aboutTitle: "Больше, чем просто смайлики",
    aboutText: [
      "Добро пожаловать в EmojiVerse — вашу универсальную творческую студию для социальных сетей. Мы начинали как библиотека эмодзи, но поняли, что авторам контента нужно больше. Поэтому мы создали мощный текстовый редактор прямо в браузере.",
      "Пишете ли вы пост для Instagram, статью в блог или сообщение в Telegram — объем имеет значение. Наш встроенный **Счетчик Слов** и **Счетчик Символов** работают в реальном времени. Мы также добавили специальный **Индикатор лимита Instagram** (2200 знаков), чтобы ваш текст никогда не обрезался на самом интересном месте.",
      "Мы стираем языковые барьеры. Наш умный поиск позволяет находить эмодзи, вводя слова на русском, английском и еще 12 языках. А с новой функцией «Instagram Шрифты» вы можете превратить скучный текст в жирный, курсив или готический, чтобы выделить свой профиль. Никаких установок — просто откройте и творите."
    ],
    faqTitle: "Часто задаваемые вопросы",
    faqIntro: "Всё, что нужно знать о работе с текстом, счетчиками и нашей библиотекой.",
    faq: [
      { q: "Есть ли здесь счетчик слов и символов?", a: "Да! EmojiVerse — это полноценный инструмент для подсчета слов и знаков. Посмотрите на панель статистики над списком эмодзи. Она мгновенно обновляется по мере ввода текста, показывая точное количество символов и слов." },
      { q: "Как работает проверка лимита Instagram?", a: "В постах Instagram есть ограничение в 2200 символов. Наш инструмент содержит индикатор «IG Limit», который ведет обратный отсчет. Он станет красным, если вы превысите лимит." },
      { q: "Это бесплатно?", a: "Абсолютно. EmojiVerse на 100% бесплатен. Мы не требуем регистрации и не вводим скрытых платежей. Вы сразу получаете доступ ко всем шрифтам, счетчикам и базе эмодзи." },
      { q: "Могу ли я искать эмодзи на русском языке?", a: "Да, это наша гордость. Вы можете вводить запросы на русском (например, «кот», «улыбка», «флаг»), и наша система поймет вас, даже если интерфейс включен на другом языке." },
      { q: "Сохраняется ли мой текст?", a: "Мы заботимся о приватности и не сохраняем ваш текст на наших серверах. Однако мы используем память вашего браузера для сохранения «Избранных» смайлов. Сам текст существует только пока открыта вкладка." },
      { q: "Как изменить шрифт для Инстаграм?", a: "Нажмите кнопку «Шрифты Инстаграм» (или волшебную палочку). Откроется меню, где вы сможете превратить обычный текст в Жирный, Курсив, Готический или текст в кружочках." },
      { q: "Работает ли это на телефоне?", a: "Да, EmojiVerse работает как приложение (PWA). Оно отлично адаптировано для iPhone и Android. На мобильных устройствах интерфейс упрощен для удобства." },
      { q: "Можно ли скопировать сразу много смайлов?", a: "Конечно. Вы можете составить целое предложение или узор из смайлов в редакторе, а затем нажать одну кнопку «Копировать текст», чтобы забрать всё сразу." },
      { q: "Какие браузеры поддерживаются?", a: "Мы поддерживаем все современные браузеры: Chrome, Safari, Yandex Browser, Firefox и Opera. Сайт загружается мгновенно даже при медленном интернете." },
      { q: "Зачем это нужно, если есть клавиатура в телефоне?", a: "Клавиатура телефона мала. EmojiVerse дает полный обзор всех категорий на одном экране, позволяет считать символы и использовать красивые шрифты, которых нет в обычной клавиатуре." }
    ],
    keywords: [
      "Счетчик слов", "Счетчик символов", "Символы для инстаграм", 
      "Лимит знаков инстаграм", "Эмодзи клавиатура", "Красивые шрифты", 
      "Жирный шрифт инстаграм", "Посчитать слова онлайн", "Редактор постов", 
      "Копировать смайлики", "Генератор шрифтов", "Инстаграм био"
    ]
  },
  es: {
    appTitle: "EmojiVerse - Contador de Palabras y Emojis",
    metaDescription: "Selector de emojis online gratis, contador de palabras y caracteres. Verifica límites de Instagram, copia emojis y da formato al texto.",
    mainHeading: "El Editor de Texto y Emojis Definitivo",
    subHeading: "Escribe, cuenta palabras, cambia fuentes y encuentra emojis en cualquier idioma.",
    aboutTitle: "Más que simples emojis",
    aboutText: [
      "Bienvenido a EmojiVerse, tu espacio creativo todo en uno para redes sociales. Comenzamos como una biblioteca de emojis, pero nos dimos cuenta de que los creadores necesitaban más. Por eso creamos una potente suite de edición de texto directamente en el navegador.",
      "Ya sea que estés redactando para Instagram, Twitter o un blog, la precisión importa. Nuestro **Contador de Palabras** y **Contador de Caracteres** integrados se actualizan en tiempo real. Incluimos específicamente un **Verificador de Límite de Instagram** (2.200 caracteres) para que nunca tengas que recortar tus ideas.",
      "Rompemos las barreras del idioma. Nuestro motor de búsqueda único te permite encontrar emojis usando palabras clave en más de 13 idiomas. Además, con la función 'Fuentes Mágicas', puedes transformar texto aburrido en estilos negrita o cursiva para destacar. Sin instalaciones: solo abre y usa."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqIntro: "Todo lo que necesitas saber sobre nuestras herramientas de texto y biblioteca.",
    faq: [
      { q: "¿Esta herramienta cuenta palabras y caracteres?", a: "¡Sí! EmojiVerse es un Contador de Palabras y Caracteres totalmente funcional. Mira la barra de estadísticas sobre la lista de emojis. Se actualiza al instante mientras escribes." },
      { q: "¿Cómo funciona el límite de Instagram?", a: "Las descripciones de Instagram están limitadas a 2.200 caracteres. Nuestra herramienta tiene un indicador 'IG Limit' que cuenta hacia atrás. Se pone rojo si excedes el límite." },
      { q: "¿Es este servicio totalmente gratuito?", a: "Absolutamente. EmojiVerse es 100% gratuito. No requerimos registro ni cobramos suscripciones. Tienes acceso total a todo inmediatamente." },
      { q: "¿Puedo buscar emojis en español?", a: "Sí, puedes escribir palabras clave en español (como 'gato', 'feliz', 'bandera') y nuestro sistema multilingüe encontrará el emoji exacto que buscas." },
      { q: "¿La aplicación guarda mi texto?", a: "Por tu privacidad, no guardamos tu texto en nuestros servidores. Sin embargo, usamos el almacenamiento de tu navegador para recordar tus emojis 'Favoritos'. Tu borrador es temporal." },
      { q: "¿Cómo cambio el estilo de fuente?", a: "Haz clic en el botón 'Fuentes Instagram' (varita mágica). Aparecerá un menú para convertir tu texto normal en Negrita, Cursiva o Gótico compatible con redes sociales." },
      { q: "¿Funciona en teléfonos móviles?", a: "Sí, EmojiVerse es una Web App Progresiva (PWA). Funciona perfecto en iPhone y Android, con una interfaz táctil optimizada." },
      { q: "¿Puedo copiar varios emojis a la vez?", a: "Sí. Puedes construir una frase completa o una cadena de emojis en el editor y luego copiarlos todos juntos con un solo clic." },
      { q: "¿Qué navegadores son compatibles?", a: "Soportamos todos los navegadores modernos: Chrome, Safari, Firefox, Edge y Opera. Garantizamos un rendimiento rápido." },
      { q: "¿Por qué usar esto en lugar del teclado del móvil?", a: "El teclado del móvil es pequeño. EmojiVerse te da una vista completa, te permite contar caracteres, verificar límites y usar fuentes especiales." }
    ],
    keywords: [
      "Contador de palabras", "Contador de caracteres", "Límite Instagram", 
      "Editor de texto online", "Teclado Emoji", "Fuentes para Instagram", 
      "Letras bonitas", "Generador de fuentes", "Copiar pegar emojis", 
      "Emojis para bio", "Caracteres unicode", "Leyendas para fotos"
    ]
  },
  fr: {
    appTitle: "EmojiVerse - Compteur de Mots & Éditeur d'Émojis",
    metaDescription: "Sélecteur d'émojis gratuit, compteur de mots et de caractères. Vérifiez les limites Instagram, copiez des émojis et formatez le texte.",
    mainHeading: "L'Éditeur d'Émojis et de Texte Ultime",
    subHeading: "Tapez, comptez les mots, changez les polices et trouvez des émojis dans n'importe quelle langue.",
    aboutTitle: "Plus que de simples émojis",
    aboutText: [
      "Bienvenue sur EmojiVerse, votre espace tout-en-un pour créer les publications parfaites sur les réseaux sociaux. Initialement une bibliothèque d'émojis, nous avons réalisé que les créateurs avaient besoin de plus. C'est pourquoi nous avons intégré une suite d'édition de texte puissante.",
      "Que vous rédigiez une légende Instagram, un tweet ou un e-mail, la clarté compte. Notre **Compteur de Mots** et **Compteur de Caractères** intégré se met à jour en temps réel. Nous avons inclus un **Vérificateur de Limite Instagram** (2 200 caractères) pour ne jamais être coupé.",
      "Nous brisons les barrières linguistiques. Notre moteur de recherche vous permet de trouver des émojis avec des mots-clés dans plus de 13 langues. Avec la fonction 'Polices Magiques', transformez un texte ennuyeux en gras ou italique pour vous démarquer."
    ],
    faqTitle: "Foire Aux Questions",
    faqIntro: "Tout ce que vous devez savoir sur nos outils de texte et notre bibliothèque.",
    faq: [
      { q: "Cet outil compte-t-il les mots et les caractères ?", a: "Oui ! EmojiVerse est un compteur complet. La barre de statistiques se met à jour instantanément pendant que vous tapez pour afficher la longueur exacte de votre texte." },
      { q: "Comment fonctionne la limite Instagram ?", a: "Instagram limite les légendes à 2 200 caractères. Notre indicateur 'IG Limit' compte à rebours et devient rouge si vous dépassez la limite, pour vous aider à ajuster votre texte." },
      { q: "Est-ce totalement gratuit ?", a: "Absolument. EmojiVerse est 100 % gratuit, sans inscription ni frais cachés. Vous avez un accès immédiat à toutes les fonctionnalités." },
      { q: "Puis-je chercher des émojis en français ?", a: "Oui, c'est une de nos fonctionnalités uniques. Vous pouvez taper des mots-clés en français (comme 'chat', 'joie') et notre système trouvera l'émoji exact." },
      { q: "L'application sauvegarde-t-elle mon texte ?", a: "Non, pour votre confidentialité, nous ne stockons pas votre texte sur nos serveurs. Il reste uniquement dans votre session actuelle de navigateur." },
      { q: "Comment changer le style de police ?", a: "Cliquez sur le bouton 'Polices Insta' (baguette magique). Un menu apparaîtra pour convertir votre texte en Gras, Italique ou Gothique pour vos profils." },
      { q: "Est-ce que ça marche sur mobile ?", a: "Oui, EmojiVerse est conçu comme une PWA. Il fonctionne parfaitement sur iPhone, iPad et Android avec une interface tactile adaptée." },
      { q: "Puis-je copier plusieurs émojis à la fois ?", a: "Oui. Vous pouvez construire une phrase entière ou une suite d'émojis dans l'éditeur et tout copier d'un seul clic." },
      { q: "Quels navigateurs sont supportés ?", a: "Nous supportons tous les navigateurs modernes : Chrome, Safari, Firefox, Edge et Opera. Le site est optimisé pour la vitesse." },
      { q: "Pourquoi utiliser ceci au lieu du clavier mobile ?", a: "Les claviers mobiles sont limités. EmojiVerse offre une vue plein écran, des compteurs précis et des polices spéciales introuvables ailleurs." }
    ],
    keywords: [
      "Compteur de mots", "Compteur de caractères", "Limite Instagram", 
      "Polices Instagram", "Émojis", "Texte stylé", "Clavier émoji", 
      "Générateur de polices", "Copier coller émojis", "Bio Instagram", 
      "Caractères spéciaux", "Outil réseaux sociaux"
    ]
  },
  de: {
    appTitle: "EmojiVerse - Wortzähler & Emoji Editor",
    metaDescription: "Kostenloser Emoji-Picker, Wortzähler und Zeichenzähler. Prüfen Sie Instagram-Limits und formatieren Sie Text für soziale Medien.",
    mainHeading: "Der ultimative Emoji- & Texteditor",
    subHeading: "Tippen, Wörter zählen, Schriften formatieren und Emojis in jeder Sprache finden.",
    aboutTitle: "Mehr als nur Emojis",
    aboutText: [
      "Willkommen bei EmojiVerse, Ihrem All-in-One-Arbeitsbereich für soziale Medien. Wir haben als Emoji-Bibliothek begonnen, aber Content Creators brauchten mehr. Deshalb haben wir eine leistungsstarke Textbearbeitungssuite direkt in den Browser integriert.",
      "Egal ob Instagram-Caption, Tweet oder E-Mail, Klarheit zählt. Unser **Wortzähler** und **Zeichenzähler** aktualisieren sich in Echtzeit. Der integrierte **Instagram-Limit-Checker** (2.200 Zeichen) hilft Ihnen, Texte perfekt zu kürzen.",
      "Wir überwinden Sprachbarrieren. Unsere Suchmaschine versteht über 13 Sprachen. Mit 'Magische Schriften' können Sie langweiligen Text in Fett, Kursiv oder dekorative Stile verwandeln, um aufzufallen."
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqIntro: "Alles, was Sie über unsere Textwerkzeuge und Emoji-Bibliothek wissen müssen.",
    faq: [
      { q: "Zählt dieses Tool Wörter und Zeichen?", a: "Ja! EmojiVerse ist ein voll funktionsfähiger Wort- und Zeichenzähler. Die Statistikleiste aktualisiert sich sofort während des Tippens." },
      { q: "Wie funktioniert der Instagram-Limit-Checker?", a: "Instagram erlaubt 2.200 Zeichen. Unser 'IG Limit'-Indikator zählt rückwärts und warnt Sie rot, wenn Sie das Limit überschreiten." },
      { q: "Ist dieser Dienst komplett kostenlos?", a: "Absolut. EmojiVerse ist zu 100 % kostenlos, ohne Anmeldung und ohne versteckte Gebühren. Sie haben sofortigen Zugriff auf alles." },
      { q: "Kann ich auf Deutsch suchen?", a: "Ja, das ist eine unserer Stärken. Geben Sie deutsche Stichwörter ein (z.B. 'Lachen', 'Auto'), und unser System findet das passende Emoji." },
      { q: "Wird mein Text gespeichert?", a: "Nein, aus Datenschutzgründen speichern wir Ihren Text nicht auf unseren Servern. Er existiert nur temporär in Ihrem Browser." },
      { q: "Wie ändere ich den Schriftstil?", a: "Klicken Sie auf 'Insta Schriften' (Zauberstab). Ein Menü öffnet sich, mit dem Sie Text in Fett, Kursiv oder Gotisch umwandeln können." },
      { q: "Funktioniert es auf Handys?", a: "Ja, EmojiVerse ist als Progressive Web App (PWA) konzipiert. Es funktioniert perfekt auf iPhones und Android-Geräten." },
      { q: "Kann ich mehrere Emojis gleichzeitig kopieren?", a: "Ja. Sie können im Editor ganze Sätze oder Emoji-Reihen erstellen und alles mit einem Klick kopieren." },
      { q: "Welche Browser werden unterstützt?", a: "Wir unterstützen alle modernen Browser wie Chrome, Safari, Firefox, Edge und Opera mit hoher Geschwindigkeit." },
      { q: "Warum dies statt meiner Handytastatur nutzen?", a: "Handytastaturen sind klein. EmojiVerse bietet eine Vollbildansicht, Zeichenzähler und spezielle Schriftarten, die Standardtastaturen fehlen." }
    ],
    keywords: [
      "Wortzähler", "Zeichenzähler", "Instagram Schriften", "Emoji Tastatur", 
      "Text formatieren", "Schriftgenerator", "Instagram Bio", "Emojis kopieren", 
      "Sonderzeichen", "Textlänge prüfen", "Online Editor", "Social Media Tool"
    ]
  },
  it: {
    appTitle: "EmojiVerse - Conta Parole ed Emojis",
    metaDescription: "Selettore di emoji gratuito, conta parole e caratteri. Controlla i limiti di Instagram e formatta il testo per i social.",
    mainHeading: "L'Editor di Testo ed Emoji Definitivo",
    subHeading: "Scrivi, conta le parole, cambia font e trova emoji in qualsiasi lingua.",
    aboutTitle: "Più che semplici emoji",
    aboutText: [
      "Benvenuto su EmojiVerse, il tuo spazio creativo tutto-in-uno. Abbiamo iniziato come libreria di emoji, ma abbiamo capito che i creator avevano bisogno di altro. Ecco perché abbiamo integrato una potente suite di editing di testo.",
      "Che tu stia scrivendo per Instagram, Twitter o un'email, la precisione conta. Il nostro **Conta Parole** e **Conta Caratteri** ti aiutano in tempo reale. Include un controllo dedicato per il **Limite di Instagram** (2.200 caratteri).",
      "Abbiamo abbattuto le barriere linguistiche. Il nostro motore di ricerca supporta oltre 13 lingue. Inoltre, con 'Font Magici', puoi trasformare il testo in grassetto, corsivo o stili decorativi per distinguerti."
    ],
    faqTitle: "Domande Frequenti",
    faqIntro: "Tutto ciò che devi sapere sui nostri strumenti di testo e libreria.",
    faq: [
      { q: "Questo strumento conta parole e caratteri?", a: "Sì! EmojiVerse è un conta parole e caratteri completo. La barra delle statistiche si aggiorna istantaneamente mentre digiti." },
      { q: "Come funziona il limite Instagram?", a: "Le didascalie di Instagram sono limitate a 2.200 caratteri. Il nostro indicatore 'IG Limit' diventa rosso se superi il limite, aiutandoti a modificare il testo." },
      { q: "È un servizio gratuito?", a: "Assolutamente sì. EmojiVerse è gratuito al 100%, senza registrazione né costi nascosti. Hai accesso immediato a tutto." },
      { q: "Posso cercare emoji in italiano?", a: "Sì, puoi digitare parole chiave in italiano (come 'gatto', 'felice') e il sistema troverà l'emoji esatto indipendentemente dalla lingua dell'interfaccia." },
      { q: "Salvate il mio testo?", a: "No, per la tua privacy non memorizziamo il testo sui server. Il testo è temporaneo e vive solo nella sessione corrente." },
      { q: "Come cambio lo stile del carattere?", a: "Clicca su 'Font Instagram' (bacchetta magica). Apparirà un menu per convertire il testo in Grassetto, Corsivo o Gotico per i social." },
      { q: "Funziona sui cellulari?", a: "Sì, EmojiVerse è una Web App (PWA). Funziona perfettamente su iPhone, iPad e Android con un'interfaccia ottimizzata." },
      { q: "Posso copiare più emoji contemporaneamente?", a: "Sì. Puoi costruire intere frasi o sequenze di emoji nell'editor e copiare tutto in una volta." },
      { q: "Quali browser sono supportati?", a: "Supportiamo tutti i browser moderni: Chrome, Safari, Firefox, Edge e Opera. Garantiamo prestazioni elevate." },
      { q: "Perché usare questo invece della tastiera del telefono?", a: "Le tastiere dei telefoni sono limitate. EmojiVerse offre una visione a schermo intero, conteggio caratteri e font speciali non disponibili altrove." }
    ],
    keywords: [
      "Conta parole", "Conta caratteri", "Font Instagram", "Emoji", 
      "Scrittura creativa", "Tastiera emoji", "Generatore font", "Copia incolla emoji", 
      "Bio Instagram", "Caratteri speciali", "Limite didascalia", "Editor di testo"
    ]
  },
  pt: {
    appTitle: "EmojiVerse - Contador de Palavras e Emojis",
    metaDescription: "Seletor de emojis, contador de palavras e caracteres. Verifique limites do Instagram e formate texto para redes sociais.",
    mainHeading: "O Editor Definitivo de Emojis e Texto",
    subHeading: "Digite, conte palavras, mude fontes e encontre emojis em qualquer idioma.",
    aboutTitle: "Mais que apenas emojis",
    aboutText: [
      "Bem-vindo ao EmojiVerse, seu espaço criativo tudo-em-um. Começamos como uma biblioteca de emojis, mas percebemos que os criadores precisavam de mais. Por isso, construímos uma poderosa suíte de edição de texto no navegador.",
      "Seja para Instagram, Twitter ou e-mail, o tamanho importa. Nosso **Contador de Palavras** e **Caracteres** funciona em tempo real. Incluímos um verificador de **Limite do Instagram** (2.200 caracteres) para você nunca ser cortado.",
      "Quebramos barreiras linguísticas. Nossa busca suporta mais de 13 idiomas. Além disso, com 'Fontes Mágicas', você transforma texto simples em negrito, itálico ou decorativo para destacar sua bio."
    ],
    faqTitle: "Perguntas Frequentes",
    faqIntro: "Tudo o que você precisa saber sobre nossas ferramentas.",
    faq: [
      { q: "Essa ferramenta conta palavras e caracteres?", a: "Sim! O EmojiVerse é um contador completo. A barra de estatísticas atualiza instantaneamente enquanto você digita para mostrar o tamanho exato." },
      { q: "Como funciona o limite do Instagram?", a: "O Instagram limita legendas a 2.200 caracteres. Nosso indicador 'IG Limit' conta regressivamente e fica vermelho se você exceder o limite." },
      { q: "É totalmente gratuito?", a: "Sim, 100% gratuito, sem cadastro e sem taxas ocultas. Você tem acesso imediato a todas as ferramentas." },
      { q: "Posso buscar emojis em português?", a: "Sim, digite palavras-chave em português (como 'gato', 'feliz') e nosso sistema multilíngue encontrará o emoji exato." },
      { q: "Vocês salvam meu texto?", a: "Não, para sua privacidade, não armazenamos seu texto. Ele existe apenas temporariamente no seu navegador atual." },
      { q: "Como mudo o estilo da fonte?", a: "Clique no botão 'Fontes Instagram' (varinha mágica). Um menu aparecerá para converter seu texto em Negrito, Itálico ou Gótico." },
      { q: "Funciona no celular?", a: "Sim, é um Web App Progressivo (PWA). Funciona perfeitamente em iPhone e Android com uma interface fácil de usar." },
      { q: "Posso copiar vários emojis de uma vez?", a: "Sim. Você pode criar frases inteiras ou sequências de emojis no editor e copiar tudo com um único clique." },
      { q: "Quais navegadores são suportados?", a: "Suportamos Chrome, Safari, Firefox, Edge e Opera. O site é otimizado para carregar rápido." },
      { q: "Por que usar isso em vez do teclado do celular?", a: "Teclados de celular são pequenos. O EmojiVerse oferece tela cheia, contagem de caracteres, limites e fontes especiais exclusivas." }
    ],
    keywords: [
      "Contador de palavras", "Contador de caracteres", "Limite Instagram", 
      "Editor de texto online", "Teclado Emoji", "Fontes para Instagram", 
      "Letras bonitas", "Gerador de fontes", "Copiar colar emojis", 
      "Emojis para bio", "Caracteres unicode", "Legendas para fotos"
    ]
  },
  zh: {
    appTitle: "EmojiVerse - 字数统计与表情符号编辑器",
    metaDescription: "免费在线表情符号选择器，字数和字符统计。检查 Instagram 限制，复制表情符号并格式化文本。",
    mainHeading: "终极表情符号与文本编辑器",
    subHeading: "打字、计字、格式化字体并查找任何语言的表情符号。",
    aboutTitle: "不仅仅是表情符号",
    aboutText: [
      "欢迎来到 EmojiVerse。我们在浏览器中构建了一个强大的文本编辑套件，旨在满足内容创作者的所有需求。",
      "无论您是写 Instagram 说明、推文还是电子邮件，清晰度都很重要。我们的**字数统计**和**字符统计**会实时更新。我们特别包含了**Instagram 限制检查器**（2,200 个字符），确保您的文本长度完美。",
      "我们打破了语言障碍。我们的搜索引擎支持超过 13 种语言。此外，使用“魔法字体”功能，您可以将枯燥的文本转换为粗体、斜体或装饰风格。"
    ],
    faqTitle: "常见问题",
    faqIntro: "关于我们文本工具和表情符号库的所有信息。",
    faq: [
      { q: "这个工具能统计字数和字符吗？", a: "是的！EmojiVerse 是一个功能齐全的计数器。统计栏会在您输入时即时更新，显示确切的长度。" },
      { q: "Instagram 限制检查器如何工作？", a: "Instagram 说明限制为 2,200 个字符。我们的 'IG Limit' 指示器会倒数，如果您超出限制，它会变红，帮助您调整文本。" },
      { q: "这项服务是完全免费的吗？", a: "绝对免费。EmojiVerse 100% 免费，无需注册，无隐藏费用。您可以立即使用所有功能。" },
      { q: "我可以用中文搜索表情符号吗？", a: "是的，这是一项独特功能。您可以输入中文关键词（如“猫”、“开心”），我们的多语言系统会找到准确的表情符号。" },
      { q: "应用会保存我的文本吗？", a: "为了您的隐私，我们不会在服务器上存储您的文本。它仅暂时存在于您当前的浏览器会话中。" },
      { q: "如何更改字体样式？", a: "点击文本编辑器中的“Instagram 字体”（魔杖）按钮。菜单将允许您将文本转换为粗体、斜体或哥特式风格。" },
      { q: "它在手机上可以使用吗？", a: "是的，EmojiVerse 设计为渐进式 Web 应用 (PWA)。它在 iPhone、iPad 和 Android 设备上运行完美。" },
      { q: "我可以一次复制多个表情符号吗？", a: "是的。与一次只能复制一个的其他选择器不同，您可以在编辑器中构建整个句子，然后一键复制所有内容。" },
      { q: "支持哪些浏览器？", a: "我们支持所有现代浏览器，包括 Chrome、Safari、Firefox、Edge 和 Opera，并确保极快的加载速度。" },
      { q: "为什么要使用这个而不是手机键盘？", a: "手机键盘很小且受限。EmojiVerse 提供全屏视图、字符计数、限制检查以及标准键盘上没有的特殊字体。" }
    ],
    keywords: [
      "字数统计", "字符统计", "Instagram 字体", "表情符号", 
      "在线编辑器", "表情键盘", "字体生成器", "复制粘贴表情", 
      "特殊字符", "Instagram 简介", "社交媒体工具", "文本格式化"
    ]
  },
  ja: {
    appTitle: "EmojiVerse - 文字数カウント & 絵文字エディタ",
    metaDescription: "無料の絵文字ピッカー、単語数・文字数カウンター。Instagramの制限を確認し、テキストを装飾できます。",
    mainHeading: "究極の絵文字＆テキストエディタ",
    subHeading: "入力、文字数カウント、フォント変更、そして多言語での絵文字検索。",
    aboutTitle: "単なる絵文字以上",
    aboutText: [
      "EmojiVerseへようこそ。私たちはコンテンツクリエイターのために、ブラウザ上で動作する強力なテキスト編集スイートを構築しました。",
      "Instagramのキャプション、ツイート、メールを作成する際、正確さが重要です。**単語カウンター**と**文字カウンター**はリアルタイムで更新されます。**Instagram制限チェッカー**（2,200文字）も搭載しており、文章が途中で切れるのを防ぎます。",
      "私たちは言葉の壁を取り払います。独自の検索エンジンは13言語以上に対応。さらに「魔法のフォント」機能を使えば、テキストを太字や斜体、装飾スタイルに変換してプロフィールを目立たせることができます。"
    ],
    faqTitle: "よくある質問",
    faqIntro: "テキストツールとライブラリの使用に関するすべて。",
    faq: [
      { q: "文字数と単語数をカウントできますか？", a: "はい！EmojiVerseは完全なカウンター機能を備えています。入力中に統計バーが即座に更新され、正確な長さを表示します。" },
      { q: "Instagram制限チェッカーはどう機能しますか？", a: "Instagramのキャプションは2,200文字制限です。'IG Limit'インジケーターがカウントダウンし、制限を超えると赤く点灯して警告します。" },
      { q: "本当に無料ですか？", a: "はい、100％無料です。登録や隠れた料金は一切ありません。すべての機能にすぐにアクセスできます。" },
      { q: "日本語で絵文字を検索できますか？", a: "はい、可能です。「猫」「笑顔」などの日本語キーワードを入力すれば、多言語システムが正確な絵文字を見つけ出します。" },
      { q: "テキストは保存されますか？", a: "プライバシー保護のため、サーバーには保存されません。テキストは現在のブラウザセッション内でのみ一時的に存在します。" },
      { q: "フォントスタイルを変更するには？", a: "エディタ内の「インスタフォント」（魔法の杖）ボタンをクリックしてください。テキストを太字、斜体、ゴシック体などに変換するメニューが開きます。" },
      { q: "スマホでも使えますか？", a: "はい、PWAとして設計されており、iPhoneやAndroidで完璧に動作します。タッチ操作に最適化されたインターフェースを提供しています。" },
      { q: "一度に複数の絵文字をコピーできますか？", a: "はい。1つずつしかコピーできないツールとは異なり、エディタ内で文章や絵文字の列を作成し、ワンクリックでまとめてコピーできます。" },
      { q: "対応ブラウザは？", a: "Chrome、Safari、Firefox、Edge、Operaなど、すべての最新ブラウザに対応しており、高速な動作を保証しています。" },
      { q: "なぜスマホのキーボードではなくこれを使うのですか？", a: "スマホのキーボードは画面が小さく機能が限られています。EmojiVerseは全画面表示、文字数確認、制限チェック、そして特殊フォントを提供します。" }
    ],
    keywords: [
      "文字数カウント", "Instagramフォント", "絵文字", "テキストエディタ", 
      "文字数チェッカー", "絵文字キーボード", "フォント生成", "コピペ", 
      "特殊文字", "インスタプロフィール", "キャプション制限", "SNSツール"
    ]
  },
  ko: {
    appTitle: "EmojiVerse - 글자수 세기 및 이모티콘 에디터",
    metaDescription: "무료 온라인 이모티콘 선택기, 단어 및 글자수 계산기. 인스타그램 제한 확인 및 소셜 미디어용 텍스트 서식 지정.",
    mainHeading: "궁극의 이모티콘 & 텍스트 에디터",
    subHeading: "입력하고, 단어를 세고, 글꼴을 변경하고, 모든 언어로 이모티콘을 찾으세요.",
    aboutTitle: "이모티콘 그 이상",
    aboutText: [
      "EmojiVerse에 오신 것을 환영합니다. 우리는 콘텐츠 크리에이터를 위해 브라우저에 강력한 텍스트 편집 제품군을 구축했습니다.",
      "인스타그램 캡션이나 트윗을 작성할 때 **단어 계산기**와 **글자수 계산기**가 실시간으로 업데이트되어 목표를 달성하도록 돕습니다. **인스타그램 제한 검사기**(2,200자)가 포함되어 있어 문장이 잘리는 것을 방지합니다.",
      "언어 장벽을 허물었습니다. 우리의 검색 엔진은 13개 이상의 언어를 지원합니다. 또한 '매직 폰트' 기능을 사용하여 텍스트를 굵게, 기울임꼴 또는 장식 스타일로 변환하여 프로필을 돋보이게 할 수 있습니다."
    ],
    faqTitle: "자주 묻는 질문",
    faqIntro: "텍스트 도구 및 이모티콘 라이브러리 사용에 대한 모든 것.",
    faq: [
      { q: "이 도구는 글자수와 단어수를 세나요?", a: "네! EmojiVerse는 완벽한 계산기입니다. 입력하는 동안 통계 표시줄이 즉시 업데이트되어 정확한 길이를 보여줍니다." },
      { q: "인스타그램 제한 검사기는 어떻게 작동하나요?", a: "인스타그램 캡션은 2,200자로 제한됩니다. 'IG Limit' 표시기가 카운트다운되며, 제한을 초과하면 빨간색으로 변해 편집을 돕습니다." },
      { q: "정말 무료인가요?", a: "네, 100% 무료이며 가입이나 숨겨진 비용이 없습니다. 모든 기능에 즉시 액세스할 수 있습니다." },
      { q: "한국어로 이모티콘을 검색할 수 있나요?", a: "네, 가능합니다. '고양이', '미소'와 같은 한국어 키워드를 입력하면 다국어 시스템이 정확한 이모티콘을 찾아줍니다." },
      { q: "텍스트가 저장되나요?", a: "개인 정보 보호를 위해 서버에 텍스트를 저장하지 않습니다. 텍스트는 현재 브라우저 세션에만 임시로 존재합니다." },
      { q: "글꼴 스타일은 어떻게 변경하나요?", a: "에디터의 '인스타 폰트'(마술봉) 버튼을 클릭하세요. 텍스트를 굵게, 기울임꼴, 고딕 등으로 변환할 수 있는 메뉴가 열립니다." },
      { q: "모바일에서도 작동하나요?", a: "네, PWA로 설계되어 아이폰과 안드로이드에서 완벽하게 작동합니다. 터치에 최적화된 인터페이스를 제공합니다." },
      { q: "여러 이모티콘을 한 번에 복사할 수 있나요?", a: "네. 하나씩 복사하는 다른 도구와 달리, 에디터에서 전체 문장이나 이모티콘 줄을 만들고 한 번에 복사할 수 있습니다." },
      { q: "지원되는 브라우저는 무엇인가요?", a: "Chrome, Safari, Firefox, Edge, Opera 등 모든 최신 브라우저를 지원하며 빠른 속도를 보장합니다." },
      { q: "휴대폰 키보드 대신 이것을 사용하는 이유는 무엇인가요?", a: "휴대폰 키보드는 작고 기능이 제한적입니다. EmojiVerse는 전체 화면 보기, 글자수 확인, 제한 확인 및 특수 글꼴을 제공합니다." }
    ],
    keywords: [
      "글자수 세기", "인스타 폰트", "이모티콘", "텍스트 에디터", 
      "글자수 확인", "이모티콘 키보드", "폰트 생성기", "복사 붙여넣기", 
      "특수 문자", "인스타 바이오", "소셜 미디어 도구", "캡션 제한"
    ]
  },
  ar: {
    appTitle: "EmojiVerse - عداد الكلمات والرموز التعبيرية",
    metaDescription: "منتقي الرموز التعبيرية المجاني ، عداد الكلمات والأحرف. تحقق من حدود Instagram وانسخ الرموز ونسق النص.",
    mainHeading: "المحرر النهائي للنص والرموز التعبيرية",
    subHeading: "اكتب ، واحسب الكلمات ، ونسق الخطوط ، وابحث عن الرموز التعبيرية بأي لغة.",
    aboutTitle: "أكثر من مجرد رموز تعبيرية",
    aboutText: [
      "مرحبًا بك في EmojiVerse ، مساحة العمل المتكاملة الخاصة بك لوسائل التواصل الاجتماعي. لقد قمنا ببناء مجموعة تحرير نصوص قوية مباشرة في المتصفح لمساعدة المبدعين.",
      "سواء كنت تكتب تسمية توضيحية لـ Instagram أو تغريدة ، فإن الدقة مهمة. يتم تحديث **عداد الكلمات** و **عداد الأحرف** المدمج في الوقت الفعلي. قمنا بتضمين **مدقق حد Instagram** (2200 حرف) حتى لا يتم قطع نصك.",
      "نحن نكسر حواجز اللغة. محرك بحثنا الفريد يسمح لك بالعثور على الرموز التعبيرية باستخدام كلمات رئيسية بأكثر من 13 لغة. بالإضافة إلى ذلك ، مع ميزة 'الخطوط السحرية' ، يمكنك تحويل النص العادي إلى أنماط عريضة أو مائلة لتمييز ملفك الشخصي."
    ],
    faqTitle: "أسئلة مكررة",
    faqIntro: "كل ما تحتاج لمعرفته حول أدواتنا النصية ومكتبة الرموز.",
    faq: [
      { q: "هل تحسب هذه الأداة الكلمات والأحرف؟", a: "نعم! EmojiVerse هو عداد كلمات وأحرف كامل الوظائف. يتم تحديث شريط الإحصائيات فورًا أثناء الكتابة لإظهار الطول الدقيق." },
      { q: "كيف يعمل مدقق حد Instagram؟", a: "تسميات Instagram التوضيحية محدودة بـ 2200 حرف. يحتوي أداتنا على مؤشر 'IG Limit' الذي يعد تنازليًا ويتحول للأحمر إذا تجاوزت الحد." },
      { q: "هل هذه الخدمة مجانية بالكامل؟", a: "قطعاً. EmojiVerse مجاني بنسبة 100٪. لا نطلب التسجيل ولا توجد رسوم خفية. تحصل على وصول كامل لكل شيء على الفور." },
      { q: "هل يمكنني البحث عن الرموز التعبيرية باللغة العربية؟", a: "نعم ، هذه ميزة فريدة. يمكنك كتابة كلمات رئيسية باللغة العربية (مثل 'قطة' ، 'سعيد') وسيفهم نظامنا الاستعلامات متعددة اللغات." },
      { q: "هل يحفظ التطبيق نصي؟", a: "لخصوصيتك ، لا نقوم بتخزين النص الخاص بك على خوادمنا. ومع ذلك ، نستخدم متصفحك لحفظ الرموز المفضلة. مسودة النص مؤقتة فقط." },
      { q: "كيف أقوم بتغيير نمط الخط؟", a: "انقر فوق زر 'خطوط انستغرام' (العصا السحرية). ستظهر قائمة تتيح لك تحويل النص العادي إلى عريض أو مائل أو قوطي." },
      { q: "هل يعمل على الهواتف المحمولة؟", a: "نعم ، تم تصميم EmojiVerse كتطبيق ويب تقدمي (PWA). يعمل بشكل مثالي على أجهزة iPhone و Android مع واجهة تعمل باللمس." },
      { q: "هل يمكنني نسخ عدة رموز تعبيرية في وقت واحد؟", a: "نعم. على عكس المنتقيات الأخرى ، يمكنك بناء جملة كاملة أو سلسلة من الرموز في المحرر ونسخها كلها مرة واحدة." },
      { q: "ما هي المتصفحات المدعومة؟", a: "نحن ندعم جميع المتصفحات الحديثة بما في ذلك Chrome و Safari و Firefox و Edge. نضمن أداءً عاليًا وسرعة تحميل." },
      { q: "لماذا أستخدم هذا بدلاً من لوحة مفاتيح هاتفي؟", a: "لوحات مفاتيح الهاتف صغيرة. يمنحك EmojiVerse عرضًا بملء الشاشة ، ويتيح لك عد الأحرف ، والتحقق من الحدود ، واستخدام خطوط خاصة." }
    ],
    keywords: [
      "عداد الكلمات", "خطوط انستغرام", "رموز تعبيرية", "زخرفة النصوص", 
      "عداد الحروف", "لوحة مفاتيح الرموز", "مولد الخطوط", "نسخ الرموز التعبيرية", 
      "سيرة ذاتية انستغرام", "أحرف خاصة", "أداة التواصل الاجتماعي", "تنسيق النص"
    ]
  },
  hi: {
    appTitle: "EmojiVerse - शब्द और इमोजी काउंटर",
    metaDescription: "मुफ्त ऑनलाइन इमोजी पिकर, शब्द और अक्षर काउंटर। इंस्टाग्राम सीमा की जाँच करें, इमोजी कॉपी करें और टेक्स्ट फॉर्मेट करें।",
    mainHeading: "अल्टीमेट इमोजी और टेक्स्ट एडिटर",
    subHeading: "टाइप करें, शब्द गिनें, फ़ॉन्ट बदलें और किसी भी भाषा में इमोजी खोजें।",
    aboutTitle: "सिर्फ इमोजी से बढ़कर",
    aboutText: [
      "EmojiVerse में आपका स्वागत है, सोशल मीडिया पोस्ट बनाने के लिए आपका ऑल-इन-वन वर्कस्पेस। हमने क्रिएटर्स की मदद के लिए ब्राउज़र में एक शक्तिशाली टेक्स्ट एडिटिंग सूट बनाया है।",
      "चाहे आप इंस्टाग्राम कैप्शन लिख रहे हों या ट्वीट, स्पष्टता मायने रखती है। हमारा एकीकृत **वर्ड काउंटर** और **कैरेक्टर काउंटर** रीयल-टाइम में अपडेट होता है। हमने **इंस्टाग्राम लिमिट चेकर** (2,200 वर्ण) शामिल किया है ताकि आपका टेक्स्ट कभी भी बीच में न कटे।",
      "हम भाषा की बाधाओं को तोड़ते हैं। हमारा सर्च इंजन आपको 13 से अधिक भाषाओं में कीवर्ड का उपयोग करके इमोजी खोजने की अनुमति देता है। साथ ही, 'मैजिक फ़ॉन्ट्स' के साथ, आप अपने बायो को अलग दिखाने के लिए टेक्स्ट को बोल्ड या इटैलिक में बदल सकते हैं।"
    ],
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqIntro: "हमारे टेक्स्ट टूल्स और इमोजी लाइब्रेरी के बारे में सब कुछ।",
    faq: [
      { q: "क्या यह टूल शब्द और अक्षर गिनता है?", a: "हाँ! EmojiVerse एक पूरी तरह से कार्यात्मक शब्द और अक्षर काउंटर है। जैसे ही आप टाइप करते हैं, सांख्यिकी बार तुरंत अपडेट हो जाता है।" },
      { q: "इंस्टाग्राम लिमिट चेकर कैसे काम करता है?", a: "इंस्टाग्राम कैप्शन 2,200 अक्षरों तक सीमित हैं। हमारा 'IG Limit' संकेतक उल्टी गिनती करता है और यदि आप सीमा पार करते हैं तो यह लाल हो जाता है।" },
      { q: "क्या यह सेवा पूरी तरह से मुफ़्त है?", a: "बिल्कुल। EmojiVerse 100% मुफ़्त है। कोई पंजीकरण नहीं, कोई छिपा हुआ शुल्क नहीं। आपको तुरंत हर चीज़ तक पूरी पहुँच मिलती है।" },
      { q: "क्या मैं अपनी भाषा में इमोजी खोज सकता हूँ?", a: "हाँ। आप हिंदी में कीवर्ड टाइप कर सकते हैं (जैसे 'बिल्ली', 'खुश') और हमारा सिस्टम बहुभाषी प्रश्नों को समझेगा।" },
      { q: "क्या ऐप मेरे टेक्स्ट को सेव करता है?", a: "आपकी गोपनीयता के लिए, हम आपके टेक्स्ट को सर्वर पर स्टोर नहीं करते हैं। यह केवल आपके वर्तमान ब्राउज़र सत्र में अस्थायी रूप से रहता है।" },
      { q: "मैं फ़ॉन्ट शैली कैसे बदलूं?", a: "टेक्स्ट एडिटर में 'इंस्टाग्राम फ़ॉन्ट्स' (जादू की छड़ी) बटन पर क्लिक करें। एक मेनू खुलेगा जो आपको टेक्स्ट को बोल्ड, इटैलिक या गॉथिक में बदलने देगा।" },
      { q: "क्या यह मोबाइल फोन पर काम करता है?", a: "हाँ, EmojiVerse एक PWA के रूप में डिज़ाइन किया गया है। यह iPhone और Android पर टच इंटरफ़ेस के साथ पूरी तरह से काम करता है।" },
      { q: "क्या मैं एक साथ कई इमोजी कॉपी कर सकता हूँ?", a: "हाँ। आप एडिटर में पूरा वाक्य या इमोजी की स्ट्रिंग बना सकते हैं और एक क्लिक में उन सभी को कॉपी कर सकते हैं।" },
      { q: "कौन से ब्राउज़र समर्थित हैं?", a: "हम Chrome, Safari, Firefox और Edge सहित सभी आधुनिक ब्राउज़रों का समर्थन करते हैं। हम तेज़ लोडिंग गति सुनिश्चित करते हैं।" },
      { q: "अपने फोन कीबोर्ड के बजाय इसका उपयोग क्यों करें?", a: "फोन कीबोर्ड छोटे होते हैं। EmojiVerse आपको फुल-स्क्रीन व्यू देता है, अक्षर गिनने देता है और विशेष फ़ॉन्ट का उपयोग करने देता है।" }
    ],
    keywords: [
      "शब्द काउंटर", "इंस्टाग्राम फ़ॉन्ट्स", "इमोजी", "टेक्स्ट एडिटर", 
      "अक्षर गिनती", "इमोजी कीबोर्ड", "फ़ॉन्ट जेनरेटर", "कॉपी पेस्ट इमोजी", 
      "इंस्टाग्राम बायो", "विशेष वर्ण", "सोशल मीडिया टूल", "कैप्शन सीमा"
    ]
  },
  kk: {
    appTitle: "EmojiVerse - Сөздер мен Эмодзи санауыш",
    metaDescription: "Тегін онлайн эмодзи таңдаушы, сөз және таңба санауыш. Instagram шектеулерін тексеріңіз және мәтінді пішімдеңіз.",
    mainHeading: "Ең жақсы Эмодзи және Мәтін редакторы",
    subHeading: "Жазыңыз, сөздерді санаңыз, қаріптерді өзгертіңіз және кез келген тілде эмодзи табыңыз.",
    aboutTitle: "Жай ғана эмодзи емес",
    aboutText: [
      "EmojiVerse-ке қош келдіңіз. Біз контент жасаушыларға көмектесу үшін браузерде қуатты мәтіндік редактор жасадық.",
      "Instagram жазбасын, твит немесе электрондық хат жазсаңыз да, анықтық маңызды. Біздің кірістірілген **Сөз санауыш** пен **Таңба санауыш** нақты уақытта жаңартылады. Мәтініңіз үзіліп қалмауы үшін біз **Instagram шегін тексерушіні** (2200 таңба) қостық.",
      "Біз тілдік кедергілерді жоямыз. Біздің іздеу жүйеміз 13-тен астам тілдегі кілт сөздерді қолдана отырып эмодзи табуға мүмкіндік береді. Сонымен қатар, «Сиқырлы қаріптер» арқылы профиліңізді ерекшелеу үшін мәтінді қалың немесе курсивке айналдыра аласыз."
    ],
    faqTitle: "Жиі қойылатын сұрақтар",
    faqIntro: "Біздің мәтіндік құралдар мен кітапхана туралы білуіңіз керек барлық нәрсе.",
    faq: [
      { q: "Бұл құрал сөздер мен таңбаларды санай ма?", a: "Иә! EmojiVerse - толыққанды санауыш. Статистика тақтасы теру кезінде бірден жаңартылып, нақты ұзындықты көрсетеді." },
      { q: "Instagram шегін тексеруші қалай жұмыс істейді?", a: "Instagram жазбалары 2200 таңбамен шектелген. Біздің 'IG Limit' индикаторы кері санайды және шектен ассаңыз қызарады." },
      { q: "Бұл қызмет толығымен тегін бе?", a: "Әлбетте. EmojiVerse 100% тегін. Тіркелу қажет емес, жасырын төлемдер жоқ. Сіз барлығына бірден қол жеткізесіз." },
      { q: "Мен қазақша эмодзи іздей аламын ба?", a: "Иә. Сіз қазақша кілт сөздерді (мысалы, 'мысық', 'күлу') тере аласыз және біздің жүйе көптілді сұрауларды түсінеді." },
      { q: "Қолданба менің мәтінімді сақтай ма?", a: "Құпиялылық үшін біз сіздің мәтініңізді сақтамаймыз. Ол тек ағымдағы браузер сеансында уақытша сақталады." },
      { q: "Қаріп мәнерін қалай өзгертуге болады?", a: "Редактордағы 'Instagram қаріптері' (сиқырлы таяқша) түймесін басыңыз. Мәзір мәтінді қалың, курсив немесе готикалық стильге түрлендіруге мүмкіндік береді." },
      { q: "Бұл ұялы телефондарда жұмыс істей ме?", a: "Иә, EmojiVerse PWA ретінде жасалған. Ол iPhone және Android құрылғыларында сенсорлық интерфейспен тамаша жұмыс істейді." },
      { q: "Бір уақытта бірнеше эмодзиді көшіре аламын ба?", a: "Иә. Сіз редакторда толық сөйлемді немесе эмодзилер тізбегін құрастырып, барлығын бір рет басу арқылы көшіре аласыз." },
      { q: "Қандай браузерлерге қолдау көрсетіледі?", a: "Біз Chrome, Safari, Firefox және Edge сияқты барлық заманауи браузерлерді қолдаймыз және жылдам жүктелуге кепілдік береміз." },
      { q: "Телефон пернетақтасының орнына мұны неге пайдалану керек?", a: "Телефон пернетақталары шағын. EmojiVerse толық экранды көріністі, таңбаларды санауды және арнайы қаріптерді ұсынады." }
    ],
    keywords: [
      "Сөз санауыш", "Instagram қаріптері", "Эмодзи", "Мәтін редакторы", 
      "Таңба санауыш", "Эмодзи пернетақтасы", "Қаріп генераторы", "Эмодзиді көшіру", 
      "Instagram био", "Арнайы таңбалар", "Әлеуметтік желі құралы", "Жазба шектеуі"
    ]
  }
};