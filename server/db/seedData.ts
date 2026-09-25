export const SEED_CATEGORIES = [
  {
    slug: 'ramayana',
    name: 'Ramayana',
    content_type: 'epic_tradition',
    description: 'The journey of Rama, Sita, and Lakshmana in one of India\'s most beloved epic literary traditions.',
    display_order: 1,
  },
  {
    slug: 'mahabharata',
    name: 'Mahabharata',
    content_type: 'epic_tradition',
    description: 'The monumental epic of duty, diplomacy, family ties, and the Kurukshetra war.',
    display_order: 2,
  },
  {
    slug: 'ancient-india',
    name: 'Ancient India',
    content_type: 'history',
    description: 'The Indus Valley Civilization, Vedic period, Maurya Empire, and early urban centers based on archaeological research.',
    display_order: 3,
  },
  {
    slug: 'medieval-india',
    name: 'Medieval India',
    content_type: 'history',
    description: 'The Chola naval power, Vijayanagara Empire, Sultanates, Mughal architectural heritage, and regional kingdoms.',
    display_order: 4,
  },
  {
    slug: 'modern-india',
    name: 'Modern India',
    content_type: 'history',
    description: 'The Indian freedom movement, constitutional assembly, socio-religious reforms, and post-independence nation-building.',
    display_order: 5,
  },
  {
    slug: 'culture',
    name: 'Culture & Arts',
    content_type: 'culture',
    description: 'Classical dance traditions, Hindustani & Carnatic music, architectural forms, linguistics, and festivals.',
    display_order: 6,
  },
];

export const SEED_ACHIEVEMENTS = [
  {
    slug: 'first-step',
    title: 'First Discovery',
    description: 'Complete your first quiz, memory match, or story chapter.',
    icon_key: 'Compass',
    rule_key: 'first_activity',
  },
  {
    slug: 'quiz-scholar',
    title: 'Quiz Scholar',
    description: 'Complete 3 full quizzes with accuracy above 70%.',
    icon_key: 'BookOpen',
    rule_key: 'quiz_count_3',
  },
  {
    slug: 'memory-maestro',
    title: 'Memory Maestro',
    description: 'Successfully complete a memory deck challenge.',
    icon_key: 'Grid',
    rule_key: 'memory_complete_1',
  },
  {
    slug: 'epic-explorer',
    title: 'Epic Explorer',
    description: 'Complete a full interactive epic story.',
    icon_key: 'Scroll',
    rule_key: 'story_complete_1',
  },
  {
    slug: 'century-xp',
    title: 'Knowledge Seeker',
    description: 'Accumulate 100 Total Experience Points (XP).',
    icon_key: 'Award',
    rule_key: 'xp_100',
  },
];

export const SEED_LESSONS = [
  {
    slug: 'indus-valley-urban-planning',
    category_slug: 'ancient-india',
    title: 'Urban Planning in the Indus Valley (Harappan) Civilization',
    summary: 'Discover how cities like Mohenjo-Daro and Harappa featured sophisticated drainage systems, standardized baked bricks, and grid layouts as early as 2600 BCE.',
    reading_minutes: 5,
    difficulty: 'easy',
    source_refs: [
      { title: 'The Indus Civilization: A Contemporary Perspective', author: 'Gregory L. Possehl', publication: 'AltaMira Press (2002)', type: 'academic' },
      { title: 'Ancient Cities of the Indus Valley Civilization', author: 'Jonathan Mark Kenoyer', publication: 'Oxford University Press (1998)', type: 'academic' }
    ],
    body_markdown: `### Grid Layouts and Standardized Metallurgy

The Indus Valley (Harappan) Civilization (c. 2600–1900 BCE) represents one of the world's earliest urban cultures. Archaeological excavations at major sites such as **Harappa**, **Mohenjo-daro**, and **Dholavira** reveal an extraordinary level of civic planning and architectural engineering.

#### Key Engineering Achievements:
1. **Grid Street Systems:** Major streets were aligned north-south and east-west, creating clean rectangular blocks.
2. **Covered Brick Drainage:** Every house connected to a central underground drainage system made of precision-cut kiln-baked bricks.
3. **Standardized Weight Ratios:** Weight measures followed binary and decimal systems across thousands of kilometers from Gujarat to Punjab.
4. **The Great Bath at Mohenjo-Daro:** Built using watertight bitumen mortar, showing early hydraulics mastery.

Archaeological consensus indicates that Harappan urbanism operated without centralized monarchical palaces, suggesting complex civic administration or merchant guild governance.`
  },
  {
    slug: 'ashoka-edicts-and-dhamma',
    category_slug: 'ancient-india',
    title: 'The Rock and Pillar Edicts of Emperor Ashoka',
    summary: 'Examine Emperor Ashoka\'s inscriptions across the Indian subcontinent promoting ethical governance, non-violence (ahimsa), and religious tolerance after the Kalinga War.',
    reading_minutes: 6,
    difficulty: 'medium',
    source_refs: [
      { title: 'Ashoka in Ancient India', author: 'Nayanjot Lahiri', publication: 'Harvard University Press (2015)', type: 'academic' },
      { title: 'The Edicts of Asoka', author: 'N. A. Nikam & Richard McKeon', publication: 'University of Chicago Press (1959)', type: 'primary' }
    ],
    body_markdown: `### Epigraphy and Moral Governance

In the 3rd Century BCE, Emperor **Ashoka Maurya** (r. c. 268–232 BCE) ruled over most of the Indian subcontinent. Following the devastating Kalinga War (c. 261 BCE), Ashoka issued a series of public proclamations carved into natural cliff faces and polished monolithic sandstone pillars.

#### Significance of Ashoka's Edicts:
* **Scripts & Languages:** Inscribed predominantly in **Brahmi** and **Kharosthi** scripts using Prakrit, as well as Aramaic and Greek in the northwest frontier (Kandahar).
* **Concept of Dhamma:** Promoted civic duties, respect for parents and teachers, medical care for humans and animals, and restraint against violence.
* **Lion Capital of Sarnath:** Featured four back-to-back Asiatic lions above the Ashoka Chakra (wheel of law), which now serves as the official National Emblem of modern India.`
  },
  {
    slug: 'chola-maritime-trade-empire',
    category_slug: 'medieval-india',
    title: 'Maritime Trade & Temple Architecture of the Chola Empire',
    summary: 'Explore the naval power, Indian Ocean trade networks, and magnificent Dravidian architecture under Rajaraja Chola I and Rajendra Chola I.',
    reading_minutes: 6,
    difficulty: 'medium',
    source_refs: [
      { title: 'The Colas', author: 'K.A. Nilakanta Sastri', publication: 'University of Madras (1955)', type: 'academic' },
      { title: 'Nagapattinam to Suvarnadwipa: Reflections on the Chola Naval Expeditions', author: 'Hermann Kulke et al.', publication: 'ISEAS Publishing (2009)', type: 'academic' }
    ],
    body_markdown: `### Naval Supremacy and Monumental Granite Architecture

During the 10th and 11th centuries CE, the **Chola Dynasty** of Southern India expanded into a dominant maritime power across the Bay of Bengal.

#### Key Historical Highlights:
1. **The Brihadisvara Temple:** Built by Rajaraja I in Thanjavur (completed 1010 CE), constructed entirely of granite with an 81-ton monolithic capstone (Kumbam).
2. **Naval Expeditions:** Rajendra Chola I launched naval campaigns across the Malacca Strait against the Srivijaya Empire to protect merchant trade routes to China.
3. **Merchant Guilds:** Groups like the *Manigramam* and *Ayyavole* facilitated international trade in spices, textiles, and bronze sculptures across Southeast Asia.`
  },
  {
    slug: 'valmiki-ramayana-structure',
    category_slug: 'ramayana',
    title: 'Structure and Poetic Meter of Valmiki\'s Ramayana',
    summary: 'Understand the organization of the Adi Kavya (First Epic Poem), composed in Sanskrit slokas across seven books (Kandas).',
    reading_minutes: 5,
    difficulty: 'easy',
    source_refs: [
      { title: 'The Ramayana of Valmiki: An Epic of Ancient India', author: 'Robert P. Goldman (Ed.)', publication: 'Princeton University Press (1984–2017)', type: 'literary' },
      { title: 'A History of Indian Literature: Vol. 1', author: 'Maurice Winternitz', publication: 'University of Calcutta (1927)', type: 'academic' }
    ],
    body_markdown: `### The Seven Kandas and Anustubh Meter

The **Ramayana**, attributed in tradition to the sage **Valmiki**, is venerated as the *Adi Kavya* (the first epic poem) in Sanskrit literature.

#### Literary Structure:
* **The Seven Kandas (Books):**
  1. *Bala Kanda* (Youthful Period)
  2. *Ayodhya Kanda* (Events in Ayodhya)
  3. *Aranya Kanda* (The Forest Years)
  4. *Kishkindha Kanda* (The Kingdom of Vanaras)
  5. *Sundara Kanda* (Hanuman's Journey to Lanka)
  6. *Yuddha Kanda* (The Great Battle)
  7. *Uttara Kanda* (Epilogue & Final Events)
* **Poetic Form:** Composed mainly in the 32-syllable **Anustubh** meter, known for its lyrical flow and rhythmic cadence.`
  },
  {
    slug: 'mahabharata-bhagavad-gita-context',
    category_slug: 'mahabharata',
    title: 'The Narrative Context of the Bhagavad Gita',
    summary: 'Analyze the literary placement of the 700-verse philosophical discourse embedded within the Bhishma Parva of the Mahabharata.',
    reading_minutes: 7,
    difficulty: 'hard',
    source_refs: [
      { title: 'The Mahabharata: Text and Translation', author: 'J.A.B. van Buitenen', publication: 'University of Chicago Press (1973–1981)', type: 'literary' },
      { title: 'The Bhagavadgita in the Mahabharata', author: 'Angelika Malinar', publication: 'Cambridge University Press (2007)', type: 'academic' }
    ],
    body_markdown: `### Dialogue on the Battlefield of Kurukshetra

The **Bhagavad Gita** ("Song of the Divine") forms chapters 23 through 40 of the *Bhishma Parva*, the sixth book of the Mahabharata.

#### Literary & Philosophical Context:
* **The Dilemma of Arjuna:** Standing between two armies at Kurukshetra, Arjuna experiences intense emotional crisis upon facing kin, teachers (Drona), and patriarchs (Bhishma).
* **Krishna\'s Guidance:** Krishna serves as Arjuna\'s charioteer (*Parthasarathi*) and provides a discourse weaving together *Karma Yoga* (disinterested action), *Jnana Yoga* (knowledge), and *Bhakti Yoga* (devotion).
* **Dharma vs. Personal Ties:** Explores the tension between individual emotional attachments and societal/moral duty (*Svadharma*).`
  },
  {
    slug: 'classical-dance-natyashastra',
    category_slug: 'culture',
    title: 'The Natyashastra and India\'s Performing Arts Traditions',
    summary: 'Discover the ancient treatise on dramaturgy, dance, and music attributed to Sage Bharata, forming the foundation of Indian classical arts.',
    reading_minutes: 6,
    difficulty: 'medium',
    source_refs: [
      { title: 'The Natyashastra: English Translation', author: 'Manomohan Ghosh', publication: 'Asiatic Society of Bengal (1951)', type: 'academic' },
      { title: 'Indian Classical Dance: Tradition in Transition', author: 'Leela Venkataraman', publication: 'Roli Books (2002)', type: 'academic' }
    ],
    body_markdown: `### Rasa Theory and Expressive Performance

The **Natyashastra** (c. 200 BCE – 200 CE) is a comprehensive ancient Sanskrit text detailing aesthetic theory, music, gesture (*Abhinaya*), and theatrical staging.

#### Core Aesthetics:
1. **The Concept of Rasa:** Identifies eight primary aesthetic emotions experienced by the audience (e.g., *Sringara* [Love], *Vira* [Heroism], *Karuna* [Compassion], *Raudra* [Anger]).
2. **Bhavas and Gestures:** Describes detailed hand mudras, eye movements, and body postures to evoke corresponding emotional states.
3. **Recognized Classical Dances:** Forms the theoretical basis for classical dance styles including Bharatanatyam, Kathak, Kathakali, Odissi, Manipuri, Kuchipudi, Sattriya, and Mohiniyattam.`
  }
];

export const SEED_QUESTIONS = [
  // RAMAYANA (6 Questions)
  {
    slug: 'ram-1',
    category_slug: 'ramayana',
    difficulty: 'easy',
    prompt: 'According to Valmiki\'s epic Ramayana, who was the king of Ayodhya and father of Rama?',
    options: ['Dasharatha', 'Janaka', 'Shantanu', 'Dhritarashtra'],
    correct_index: 0,
    explanation: 'King Dasharatha was the ruler of Ayodhya of the Suryavamsha (Solar dynasty) and father of Rama, Bharata, Lakshmana, and Shatrughna.',
    source_refs: [{ title: 'Valmiki Ramayana, Bala Kanda', type: 'literary' }]
  },
  {
    slug: 'ram-2',
    category_slug: 'ramayana',
    difficulty: 'easy',
    prompt: 'Which sage is traditionally credited as the author of the Adi Kavya (Sanskrit Ramayana)?',
    options: ['Sage Valmiki', 'Sage Vyasa', 'Sage Agastya', 'Sage Vashistha'],
    correct_index: 0,
    explanation: 'Sage Valmiki is traditionally celebrated as the Adi Kavi (first poet) who composed the Ramayana epic in Anustubh Sanskrit verses.',
    source_refs: [{ title: 'Valmiki Ramayana, Bala Kanda Sarga 2', type: 'literary' }]
  },
  {
    slug: 'ram-3',
    category_slug: 'ramayana',
    difficulty: 'medium',
    prompt: 'In the Ramayana, which kingdom was ruled by King Janaka, where the Swayamvara of Sita took place?',
    options: ['Mithila (Videha)', 'Kishkindha', 'Magadha', 'Lanka'],
    correct_index: 0,
    explanation: 'King Janaka ruled Videha from its capital Mithila. Rama lifted and strung the Pinaka (Shiva\'s bow) during Sita\'s Swayamvara in Mithila.',
    source_refs: [{ title: 'Valmiki Ramayana, Bala Kanda Sarga 66', type: 'literary' }]
  },
  {
    slug: 'ram-4',
    category_slug: 'ramayana',
    difficulty: 'medium',
    prompt: 'Which queen asked King Dasharatha for the two boons that led to Rama\'s fourteen-year forest exile?',
    options: ['Queen Kaikeyi', 'Queen Kausalya', 'Queen Sumitra', 'Queen Mandodari'],
    correct_index: 0,
    explanation: 'Queen Kaikeyi, influenced by her maid Manthara, claimed two boons previously promised by Dasharatha: crowning Bharata and exiling Rama to Dandakaranya.',
    source_refs: [{ title: 'Valmiki Ramayana, Ayodhya Kanda Sarga 11', type: 'literary' }]
  },
  {
    slug: 'ram-5',
    category_slug: 'ramayana',
    difficulty: 'hard',
    prompt: 'In the Sundara Kanda, which mountain did Hanuman leap from to cross the ocean toward Lanka?',
    options: ['Mount Mahendra', 'Mount Mainaka', 'Mount Kailash', 'Mount Gandhamadana'],
    correct_index: 0,
    explanation: 'Hanuman ascended Mount Mahendra on the southern coast of India to gather momentum for his miraculous leap across the sea to Lanka.',
    source_refs: [{ title: 'Valmiki Ramayana, Sundara Kanda Sarga 1', type: 'literary' }]
  },
  {
    slug: 'ram-6',
    category_slug: 'ramayana',
    difficulty: 'hard',
    prompt: 'Who was the king of the Vanaras in Kishkindha who allied with Rama after being helped to reclaim his throne?',
    options: ['Sugriva', 'Vali', 'Angada', 'Jambavan'],
    correct_index: 0,
    explanation: 'Sugriva allied with Rama in Kishkindha. After Rama assisted Sugriva against Vali, Sugriva dispatched the Vanara search parties across the four cardinal directions.',
    source_refs: [{ title: 'Valmiki Ramayana, Kishkindha Kanda Sarga 4', type: 'literary' }]
  },

  // MAHABHARATA (6 Questions)
  {
    slug: 'mb-1',
    category_slug: 'mahabharata',
    difficulty: 'easy',
    prompt: 'How many brothers made up the Pandava princes in the Mahabharata epic?',
    options: ['Five', 'One Hundred', 'Seven', 'Twelve'],
    correct_index: 0,
    explanation: 'The Pandavas were the five brothers: Yudhishthira, Bhima, Arjuna, Nakula, and Sahadeva.',
    source_refs: [{ title: 'Mahabharata, Adi Parva', type: 'literary' }]
  },
  {
    slug: 'mb-2',
    category_slug: 'mahabharata',
    difficulty: 'easy',
    prompt: 'Who was the royal guru who taught archery and warfare to both the Pandavas and Kauravas?',
    options: ['Dronacharya', 'Parashurama', 'Kripacharya', 'Vashistha'],
    correct_index: 0,
    explanation: 'Dronacharya (Drona) was the master of martial arts and archery who trained the royal Kuru princes in Hastinapura.',
    source_refs: [{ title: 'Mahabharata, Adi Parva (Sambhava Parva)', type: 'literary' }]
  },
  {
    slug: 'mb-3',
    category_slug: 'mahabharata',
    difficulty: 'medium',
    prompt: 'In which book (Parva) of the Mahabharata is the Bhagavad Gita contained?',
    options: ['Bhishma Parva', 'Udyoga Parva', 'Vana Parva', 'Santi Parva'],
    correct_index: 0,
    explanation: 'The Bhagavad Gita is embedded within the Bhishma Parva (Book 6), containing chapters 23 to 40 of that Parva.',
    source_refs: [{ title: 'Mahabharata, Bhishma Parva Chapters 23-40', type: 'literary' }]
  },
  {
    slug: 'mb-4',
    category_slug: 'mahabharata',
    difficulty: 'medium',
    prompt: 'What was the capital city built by the Pandavas on the banks of the Yamuna, renowned for its architectural marvels?',
    options: ['Indraprastha', 'Hastinapura', 'Mathura', 'Taxila'],
    correct_index: 0,
    explanation: 'Indraprastha was built by the Pandavas on cleared land (Khandava forest) with the aid of the celestial architect Maya Danava.',
    source_refs: [{ title: 'Mahabharata, Sabha Parva', type: 'literary' }]
  },
  {
    slug: 'mb-5',
    category_slug: 'mahabharata',
    difficulty: 'hard',
    prompt: 'Which elder took a vow of lifelong celibacy and supreme loyalty to the throne of Hastinapura, earning him the name Bhishma?',
    options: ['Devavrata', 'Vichitravirya', 'Chitrangada', 'Shantanu'],
    correct_index: 0,
    explanation: 'Devavrata took the formidable vow (Bhishma Pratigya) of celibacy so his father Shantanu could marry Satyavati, gaining the name Bhishma.',
    source_refs: [{ title: 'Mahabharata, Adi Parva Sarga 100', type: 'literary' }]
  },
  {
    slug: 'mb-6',
    category_slug: 'mahabharata',
    difficulty: 'hard',
    prompt: 'During their 13th year of exile incognito (Ajnata Vasa), in which kingdom did the Pandavas reside in disguise?',
    options: ['Matsya Kingdom (Virata)', 'Panchala Kingdom', 'Chedi Kingdom', 'Kashi Kingdom'],
    correct_index: 0,
    explanation: 'The Pandavas lived for one year disguised at the court of King Virata in the Matsya Kingdom (Yudhishthira as Kanka, Arjuna as Brihannala, etc.).',
    source_refs: [{ title: 'Mahabharata, Virata Parva', type: 'literary' }]
  },

  // ANCIENT INDIA (6 Questions)
  {
    slug: 'anc-1',
    category_slug: 'ancient-india',
    difficulty: 'easy',
    prompt: 'Which major ancient civilization flourished in the northwestern region of the Indian subcontinent around 2600–1900 BCE?',
    options: ['Indus Valley (Harappan) Civilization', 'Mesopotamian Civilization', 'Egyptian Old Kingdom', 'Shang Dynasty'],
    correct_index: 0,
    explanation: 'The Indus Valley (Harappan) Civilization flourished around the Indus river basin and Punjab-Gujarat regions with advanced urban sites.',
    source_refs: [{ title: 'The Indus Civilization', author: 'G.L. Possehl', type: 'academic' }]
  },
  {
    slug: 'anc-2',
    category_slug: 'ancient-india',
    difficulty: 'easy',
    prompt: 'Who was the founder of the Maurya Empire who defeated the Nanda dynasty in 322 BCE with the counsel of Chanakya?',
    options: ['Chandragupta Maurya', 'Ashoka the Great', 'Bindusara', 'Harsha'],
    correct_index: 0,
    explanation: 'Chandragupta Maurya founded the Maurya Empire in 322 BCE, establishing Pataliputra as the capital with guidance from Chanakya (Kautilya).',
    source_refs: [{ title: 'A History of Ancient and Early Medieval India', author: 'Upinder Singh', type: 'academic' }]
  },
  {
    slug: 'anc-3',
    category_slug: 'ancient-india',
    difficulty: 'medium',
    prompt: 'What was the script used in the majority of Emperor Ashoka\'s rock and pillar edicts across mainland India?',
    options: ['Brahmi', 'Kharosthi', 'Devanagari', 'Tamil-Brahmi'],
    correct_index: 0,
    explanation: 'Brahmi script was used for the vast majority of Ashokan edicts in mainland India, deciphered in 1837 by James Prinsep.',
    source_refs: [{ title: 'Ashoka in Ancient India', author: 'Nayanjot Lahiri', type: 'academic' }]
  },
  {
    slug: 'anc-4',
    category_slug: 'ancient-india',
    difficulty: 'medium',
    prompt: 'Which ancient university in modern Bihar was a renowned international center of higher Buddhist and secular learning from the 5th to 12th century CE?',
    options: ['Nalanda University', 'Taxila (Takshashila)', 'Vikramashila', 'Valabhi'],
    correct_index: 0,
    explanation: 'Nalanda Mahavihara was founded during the Gupta era (under Kumaragupta I) and attracted scholars across Asia including Xuanzang and Yijing.',
    source_refs: [{ title: 'The University of Nalanda', author: 'H.D. Sankalia', type: 'academic' }]
  },
  {
    slug: 'anc-5',
    category_slug: 'ancient-india',
    difficulty: 'hard',
    prompt: 'Which famous treatise on statecraft, economic policy, and military strategy is attributed to Kautilya (Chanakya)?',
    options: ['Arthashastra', 'Natyashastra', 'Charaka Samhita', 'Kamandaka Nitisara'],
    correct_index: 0,
    explanation: 'The Arthashastra is an ancient Sanskrit manual on political governance, economics, espionage, and diplomacy attributed to Kautilya.',
    source_refs: [{ title: 'The Kautiliya Arthasastra', author: 'R.P. Kangle', type: 'academic' }]
  },
  {
    slug: 'anc-6',
    category_slug: 'ancient-india',
    difficulty: 'hard',
    prompt: 'Which Gupta emperor earned the title "Napoleonic ruler of India" in modern historiography due to his extensive military conquests recorded on the Allahabad Pillar (Prayag Prashasti)?',
    options: ['Samudragupta', 'Chandragupta I', 'Chandragupta II (Vikramaditya)', 'Skandagupta'],
    correct_index: 0,
    explanation: 'Samudragupta (r. c. 335–375 CE) expanded Gupta sovereignty across northern India and the Deccan, as celebrated in Harishena\'s Allahabad Prashasti.',
    source_refs: [{ title: 'The Imperial Guptas', author: 'R.C. Majumdar', type: 'academic' }]
  },

  // MEDIEVAL INDIA (6 Questions)
  {
    slug: 'med-1',
    category_slug: 'medieval-india',
    difficulty: 'easy',
    prompt: 'Which iconic granite temple in Thanjavur was completed in 1010 CE by Emperor Rajaraja Chola I?',
    options: ['Brihadisvara Temple', 'Shore Temple at Mamallapuram', 'Sun Temple at Konark', 'Meenakshi Temple'],
    correct_index: 0,
    explanation: 'The Brihadisvara Temple (Peruvudaiyar Kovil) in Thanjavur is a masterpiece of Dravidian architecture constructed by Rajaraja Chola I.',
    source_refs: [{ title: 'The Colas', author: 'K.A. Nilakanta Sastri', type: 'academic' }]
  },
  {
    slug: 'med-2',
    category_slug: 'medieval-india',
    difficulty: 'easy',
    prompt: 'Which empire was founded in 1336 CE south of the Tungabhadra River by brothers Harihara I and Bukka Raya I?',
    options: ['Vijayanagara Empire', 'Bahmani Sultanate', 'Hoysala Empire', 'Kakatiya Dynasty'],
    correct_index: 0,
    explanation: 'The Vijayanagara Empire was established in 1336 CE with its capital at Hampi, becoming a major stronghold of South Indian art and administration.',
    source_refs: [{ title: 'A Forgotten Empire: Vijayanagar', author: 'Robert Sewell', type: 'academic' }]
  },
  {
    slug: 'med-3',
    category_slug: 'medieval-india',
    difficulty: 'medium',
    prompt: 'Which ruler of the Mughal Empire commissioned the building of the Taj Mahal in Agra in memory of Mumtaz Mahal?',
    options: ['Shah Jahan', 'Akbar', 'Jahangir', 'Babur'],
    correct_index: 0,
    explanation: 'Shah Jahan commissioned the Taj Mahal on the bank of the Yamuna River in Agra, constructed between 1632 and 1653 CE.',
    source_refs: [{ title: 'The Complete Taj Mahal', author: 'Ebba Koch', type: 'academic' }]
  },
  {
    slug: 'med-4',
    category_slug: 'medieval-india',
    difficulty: 'medium',
    prompt: 'Who was the 14th-century Moroccan scholar and traveler whose detailed travelogue (Rihla) recorded life under Sultan Muhammad bin Tughlaq in Delhi?',
    options: ['Ibn Battuta', 'Marco Polo', 'Al-Biruni', 'Niccolò de\' Conti'],
    correct_index: 0,
    explanation: 'Ibn Battuta visited India in 1333 CE, serving as a Qadi (judge) in Delhi under Muhammad bin Tughlaq and documenting social conditions in his Rihla.',
    source_refs: [{ title: 'The Travels of Ibn Battuta', author: 'H.A.R. Gibb', type: 'academic' }]
  },
  {
    slug: 'med-5',
    category_slug: 'medieval-india',
    difficulty: 'hard',
    prompt: 'Which Vijayanagara emperor (r. 1509–1529 CE) composed the Telugu epic poem Amuktamalyada and presided over the golden age of literature?',
    options: ['Krishnadevaraya', 'Achyuta Deva Raya', 'Rama Raya', 'Deva Raya II'],
    correct_index: 0,
    explanation: 'Emperor Krishnadevaraya of the Tuluva dynasty patronized the Ashtadiggajas (eight eminent poets) and authored Amuktamalyada.',
    source_refs: [{ title: 'Krishnadevaraya of Vijayanagara', author: 'V.N. Hari Rao', type: 'academic' }]
  },
  {
    slug: 'med-6',
    category_slug: 'medieval-india',
    difficulty: 'hard',
    prompt: 'Who founded the Maratha Kingdom in the western Deccan in the 17th century and was crowned Chhatrapati at Raigad Fort in 1674?',
    options: ['Chhatrapati Shivaji Maharaj', 'Sambhaji Maharaj', 'Baji Rao I', 'Shahaji Bhonsle'],
    correct_index: 0,
    explanation: 'Chhatrapati Shivaji Maharaj established an independent Maratha state using hill forts, naval forces, and guerilla techniques (Ganimi Kava).',
    source_refs: [{ title: 'Shivaji and His Times', author: 'Jadunath Sarkar', type: 'academic' }]
  },

  // MODERN INDIA (6 Questions)
  {
    slug: 'mod-1',
    category_slug: 'modern-india',
    difficulty: 'easy',
    prompt: 'In which year did India gain independence from British colonial rule?',
    options: ['1947', '1950', '1942', '1930'],
    correct_index: 0,
    explanation: 'India achieved independence at midnight on August 15, 1947 under the Indian Independence Act passed by the British Parliament.',
    source_refs: [{ title: 'India After Gandhi', author: 'Ramachandra Guha', type: 'academic' }]
  },
  {
    slug: 'mod-2',
    category_slug: 'modern-india',
    difficulty: 'easy',
    prompt: 'Who served as the Chairman of the Drafting Committee of the Indian Constitution?',
    options: ['Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Dr. Rajendra Prasad'],
    correct_index: 0,
    explanation: 'Dr. B.R. Ambedkar led the Drafting Committee of the Constituent Assembly, steering the adoption of the Constitution of India in 1949.',
    source_refs: [{ title: 'The Indian Constitution: Cornerstone of a Nation', author: 'Granville Austin', type: 'academic' }]
  },
  {
    slug: 'mod-3',
    category_slug: 'modern-india',
    difficulty: 'medium',
    prompt: 'Which 1930 civil disobedience march led by Mahatma Gandhi protested the British monopoly tax on salt?',
    options: ['Dandi Salt March', 'Non-Cooperation Movement', 'Quit India Movement', 'Champaran Satyagraha'],
    correct_index: 0,
    explanation: 'Mahatma Gandhi walked 240 miles from Sabarmati Ashram to Dandi on the Gujarat coast from March 12 to April 6, 1930 to break the salt law.',
    source_refs: [{ title: 'Gandhi: Prisoner of Hope', author: 'Judith M. Brown', type: 'academic' }]
  },
  {
    slug: 'mod-4',
    category_slug: 'modern-india',
    difficulty: 'medium',
    prompt: 'Who earned the title "Iron Man of India" for integrating over 560 princely states into the Indian Union after independence?',
    options: ['Sardar Vallabhbhai Patel', 'Subhas Chandra Bose', 'Lal Bahadur Shastri', 'C. Rajagopalachari'],
    correct_index: 0,
    explanation: 'Sardar Vallabhbhai Patel served as India\'s first Deputy Prime Minister and Home Minister, successfully unifying the princely states.',
    source_refs: [{ title: 'Patel: A Life', author: 'Rajmohan Gandhi', type: 'academic' }]
  },
  {
    slug: 'mod-5',
    category_slug: 'modern-india',
    difficulty: 'hard',
    prompt: 'Which 19th-century reformer founded the Brahmo Samaj in 1828 and campaigned vigorously against the practice of Sati?',
    options: ['Raja Ram Mohan Roy', 'Swami Dayananda Saraswati', 'Ishwar Chandra Vidyasagar', 'Swami Vivekananda'],
    correct_index: 0,
    explanation: 'Raja Ram Mohan Roy is widely regarded as the "Father of the Indian Renaissance" for pioneering social reform and modern education.',
    source_refs: [{ title: 'Raja Rammohun Roy and the Making of Modern India', author: 'Bruce Robertson', type: 'academic' }]
  },
  {
    slug: 'mod-6',
    category_slug: 'modern-india',
    difficulty: 'hard',
    prompt: 'Which nationalist leader formed the Indian National Army (Azad Hind Fauj) to fight British rule during World War II?',
    options: ['Netaji Subhas Chandra Bose', 'Bhagat Singh', 'Chandrashekhar Azad', 'Rash Behari Bose'],
    correct_index: 0,
    explanation: 'Netaji Subhas Chandra Bose reorganized the Azad Hind Fauj in Southeast Asia with the motto "Give me blood, and I will give you freedom!"',
    source_refs: [{ title: 'His Majesty\'s Opponent', author: 'Sugata Bose', type: 'academic' }]
  },

  // CULTURE & ARTS (6 Questions)
  {
    slug: 'cul-1',
    category_slug: 'culture',
    difficulty: 'easy',
    prompt: 'Which classical dance form originated in the temples of Tamil Nadu and is known for its geometric body postures (Araimandi) and Abhinaya?',
    options: ['Bharatanatyam', 'Kathakali', 'Odissi', 'Kathak'],
    correct_index: 0,
    explanation: 'Bharatanatyam is one of India\'s oldest classical dance forms, rooted in the Natyashastra and cultivated historically in South Indian temples.',
    source_refs: [{ title: 'Bharata Natyam: History and Practice', author: 'Sunil Kothari', type: 'academic' }]
  },
  {
    slug: 'cul-2',
    category_slug: 'culture',
    difficulty: 'easy',
    prompt: 'Which stringed instrument associated with classical Hindustani music was popularized worldwide by Pandit Ravi Shankar?',
    options: ['Sitar', 'Veena', 'Sarod', 'Santoor'],
    correct_index: 0,
    explanation: 'The Sitar is a plucked stringed instrument with sympathetic strings, brought to global acclaim by maestro Pandit Ravi Shankar.',
    source_refs: [{ title: 'My Music, My Life', author: 'Ravi Shankar', type: 'academic' }]
  },
  {
    slug: 'cul-3',
    category_slug: 'culture',
    difficulty: 'medium',
    prompt: 'In classical Indian aesthetic theory (Natyashastra), what term refers to the emotional flavor or aesthetic experience evoked in the audience?',
    options: ['Rasa', 'Bhava', 'Tala', 'Raga'],
    correct_index: 0,
    explanation: 'Rasa translates to "aesthetic essence" or "taste", which is experienced when primary emotions (Bhavas) are articulated through performance.',
    source_refs: [{ title: 'The Natyashastra', author: 'Bharata Muni / M. Ghosh', type: 'academic' }]
  },
  {
    slug: 'cul-4',
    category_slug: 'culture',
    difficulty: 'medium',
    prompt: 'Which major festival celebrated across India signifies the victory of light over darkness and knowledge over ignorance?',
    options: ['Diwali (Deepavali)', 'Holi', 'Navratri', 'Onam'],
    correct_index: 0,
    explanation: 'Diwali (Deepavali), the festival of lights, is celebrated with oil lamps (diyas), rangoli, and fireworks across multiple Indian traditions.',
    source_refs: [{ title: 'Festivals of India', author: 'Brijendra Nath Goswamy', type: 'academic' }]
  },
  {
    slug: 'cul-5',
    category_slug: 'culture',
    difficulty: 'hard',
    prompt: 'Which architectural style characterizes North Indian Hindu temples with distinctive curving beehive-shaped towers called Shikhara?',
    options: ['Nagara Style', 'Dravida Style', 'Vesara Style', 'Kalinga Style'],
    correct_index: 0,
    explanation: 'The Nagara temple style is prominent in North India, characterized by a square plan, raised platform (Jagati), and curvilinear Shikhara.',
    source_refs: [{ title: 'The Hindu Temple', author: 'Stella Kramrisch', type: 'academic' }]
  },
  {
    slug: 'cul-6',
    category_slug: 'culture',
    difficulty: 'hard',
    prompt: 'Which ancient language belongs to the Indo-Aryan branch of Indo-European and forms the liturgical vehicle for Vedic and classical literature?',
    options: ['Sanskrit', 'Pali', 'Prakrit', 'Tamil'],
    correct_index: 0,
    explanation: 'Sanskrit is the ancient language of the Vedas, epics, classical literature, and scientific treatises, codified systematically by Panini in his Astadhyayi.',
    source_refs: [{ title: 'The Sanskrit Language', author: 'T. Burrow', type: 'academic' }]
  }
];

export const SEED_MEMORY_DECKS = [
  {
    slug: 'ramayana-symbols',
    category_slug: 'ramayana',
    title: 'Ramayana Characters & Symbols',
    description: 'Match key heroes, sages, and symbols from the Ramayana epic.',
    difficulty: 'easy',
    cards: [
      { pair_key: 'rama', face_text: 'Rama', accessible_description: 'Hero of Ayodhya known for righteousness (Dharma).' },
      { pair_key: 'rama', face_text: 'Bow of Shiva', accessible_description: 'The sacred pinaka bow lifted by Rama at Mithila.' },
      { pair_key: 'sita', face_text: 'Sita', accessible_description: 'Princess of Mithila and embodiment of devotion.' },
      { pair_key: 'sita', face_text: 'Golden Deer', accessible_description: 'The illusionary deer Maricha created in Panchavati.' },
      { pair_key: 'hanuman', face_text: 'Hanuman', accessible_description: 'The devoted Vanara who leaped across the ocean.' },
      { pair_key: 'hanuman', face_text: 'Sanjeevani Herb', accessible_description: 'The life-saving herb Hanuman brought from Mount Dronagiri.' },
      { pair_key: 'lakshmana', face_text: 'Lakshmana', accessible_description: 'Faithful brother who accompanied Rama to exile.' },
      { pair_key: 'lakshmana', face_text: 'Panchavati Huts', accessible_description: 'Hermitage in the Dandakaranya forest.' },
      { pair_key: 'ravana', face_text: 'Ravana', accessible_description: 'Scholar and king of Lanka.' },
      { pair_key: 'ravana', face_text: 'Pushpaka Vimana', accessible_description: 'The aerial chariot of Lanka.' },
      { pair_key: 'valmiki', face_text: 'Sage Valmiki', accessible_description: 'The Adi Kavi poet of the Ramayana.' },
      { pair_key: 'valmiki', face_text: 'Tamasa River', accessible_description: 'Riverbank where the first sloka verse was composed.' }
    ]
  },
  {
    slug: 'ancient-dynasties',
    category_slug: 'ancient-india',
    title: 'Ancient Empires & Landmarks',
    description: 'Pair iconic rulers with their historical capitals and monuments.',
    difficulty: 'medium',
    cards: [
      { pair_key: 'ashoka', face_text: 'Emperor Ashoka', accessible_description: 'Maurya ruler who promoted ethical Dhamma.' },
      { pair_key: 'ashoka', face_text: 'Sarnath Lion Capital', accessible_description: 'Monolithic pillar emblem at Sarnath.' },
      { pair_key: 'chandragupta', face_text: 'Chandragupta Maurya', accessible_description: 'Founder of the Maurya dynasty.' },
      { pair_key: 'chandragupta', face_text: 'Pataliputra Capital', accessible_description: 'Capital city near modern Patna.' },
      { pair_key: 'harappa', face_text: 'Mohenjo-Daro', accessible_description: 'Major urban center of the Indus Valley.' },
      { pair_key: 'harappa', face_text: 'The Great Bath', accessible_description: 'Watertight brick reservoir at Mohenjo-Daro.' },
      { pair_key: 'gupta', face_text: 'Samudragupta', accessible_description: 'Gupta emperor featured on gold coins.' },
      { pair_key: 'gupta', face_text: 'Prayag Prashasti', accessible_description: 'Inscribed pillar at Allahabad.' },
      { pair_key: 'nalanda', face_text: 'Nalanda Mahavihara', accessible_description: 'Ancient international university.' },
      { pair_key: 'nalanda', face_text: 'Xuanzang', accessible_description: 'Chinese pilgrim scholar who studied at Nalanda.' },
      { pair_key: 'kautilya', face_text: 'Chanakya (Kautilya)', accessible_description: 'Strategist and author of Arthashastra.' },
      { pair_key: 'kautilya', face_text: 'Arthashastra Text', accessible_description: 'Classic treatise on governance.' }
    ]
  },
  {
    slug: 'classical-arts',
    category_slug: 'culture',
    title: 'Classical Arts & Instruments',
    description: 'Match classical dance styles and traditional musical instruments.',
    difficulty: 'medium',
    cards: [
      { pair_key: 'bharatanatyam', face_text: 'Bharatanatyam', accessible_description: 'Classical dance of Tamil Nadu.' },
      { pair_key: 'bharatanatyam', face_text: 'Araimandi Posture', accessible_description: 'Half-seated bent knee dance posture.' },
      { pair_key: 'sitar', face_text: 'Sitar', accessible_description: 'Plucked string instrument of Hindustani music.' },
      { pair_key: 'sitar', face_text: 'Meend & Gamak', accessible_description: 'Gliding microtonal ornamentations.' },
      { pair_key: 'tabla', face_text: 'Tabla & Dagga', accessible_description: 'Pair of twin hand drums.' },
      { pair_key: 'tabla', face_text: 'Bol Rhythm Syllables', accessible_description: 'Spoken rhythmic phrases like Dha and Dhin.' },
      { pair_key: 'kathakali', face_text: 'Kathakali', accessible_description: 'Dance-drama form of Kerala.' },
      { pair_key: 'kathakali', face_text: 'Vesham Face Paint', accessible_description: 'Vibrant green and red facial makeup.' },
      { pair_key: 'veena', face_text: 'Saraswati Veena', accessible_description: 'Ancient South Indian fretted lute.' },
      { pair_key: 'veena', face_text: 'Carnatic Music', accessible_description: 'Classical musical system of South India.' },
      { pair_key: 'natyashastra', face_text: 'Natyashastra', accessible_description: 'Treatise attributed to Sage Bharata.' },
      { pair_key: 'natyashastra', face_text: 'Nine Rasas (Navarasa)', accessible_description: 'The nine aesthetic emotional essences.' }
    ]
  }
];

export const SEED_STORIES = [
  {
    slug: 'exile-of-ayodhya',
    category_slug: 'ramayana',
    title: 'The Exile of Ayodhya',
    description: 'Experience the turning point of the Ramayana as Prince Rama accepts fourteen years of exile to uphold his father\'s word.',
    tradition_note: 'This interactive retelling is adapted from Valmiki\'s Ramayana (Ayodhya Kanda). In epic tradition, Rama is celebrated as Maryada Purushottama (the ideal individual).',
    reading_minutes: 10,
    source_refs: [
      { title: 'Valmiki Ramayana, Ayodhya Kanda', type: 'literary' },
      { title: 'The Ramayana of Valmiki', author: 'R.P. Goldman', publication: 'Princeton University Press', type: 'academic' }
    ],
    chapters: [
      {
        chapter_number: 1,
        title: 'The Dawn of Coronation',
        body_markdown: `The city of **Ayodhya** is festive with golden garlands, aromatic incense, and fluttering banners. King Dasharatha has announced that tomorrow at sunrise, his eldest son, **Rama**, beloved by all citizens for his wisdom and compassion, will be anointed as Prince Regent (*Yuvaraja*).

Rama sits quietly in reflection with his devoted wife **Sita** and brother **Lakshmana**. However, deep within the inner palace quarters, Queen **Kaikeyi\'s** mind has been poisoned by her maid Manthara, warning her that her own son Bharata will be marginalized once Rama ascends.

Kaikeyi retires to the *Krodhagriha* (chamber of anger), removing her jewels and awaiting the King.`,
        choices: [
          { id: 'ch1_c1', text: 'Follow King Dasharatha as he enters Queen Kaikeyi\'s chamber.', nextChapterNumber: 2 },
          { id: 'ch1_c2', text: 'Observe Rama as he receives the summons from the royal court.', nextChapterNumber: 2 }
        ],
        reflection_prompt: 'How do personal fears and manipulative advice sometimes sway people from duty in leadership contexts?'
      },
      {
        chapter_number: 2,
        title: 'The Unforgiving Boons',
        body_markdown: `King Dasharatha enters Kaikeyi's chamber expecting celebration, but finds her on the floor in tears. Kaikeyi reminds him of the two boons he pledged her years ago during the battle against the Asuras when she saved his life.

"I demand my two boons now, O King," Kaikeyi declares firmly. "First, let my son **Bharata** be crowned Yuvaraja. Second, let **Rama** depart for fourteen years to live as an ascetic in the Dandakaranya forest."

Dasharatha is devastated, weeping and pleading with Kaikeyi to spare Rama. But when Rama is called to the palace and learns of his father's predicament, he remains unshakeable.

"A father\'s pledge is sacred," Rama says calmly. "I will gladly depart for the forest today."`,
        choices: [
          { id: 'ch2_c1', text: 'Witness Lakshmana\'s fiery protest and Rama\'s soothing words.', nextChapterNumber: 3 },
          { id: 'ch2_c2', text: 'Accompany Sita as she insists on joining Rama in exile.', nextChapterNumber: 3 }
        ],
        reflection_prompt: 'Why is upholding integrity and honor valued so deeply in classical epic literature?'
      },
      {
        chapter_number: 3,
        title: 'Departure Beyond the Sarayu',
        body_markdown: `Determined not to let Rama face the wilderness alone, **Sita** discards her royal silks for bark garments (*Valkala*). **Lakshmana**, vowing to guard them day and night, bows before his mother Sumitra and joins them.

As the royal chariot driven by Sumantra leaves the city gates, thousands of citizens of Ayodhya follow on foot, weeping and begging Rama to return. That night, Rama camps by the serene **Tamasa River**.

Knowing that the citizens will not leave as long as he stays nearby, Rama asks Sumantra to quietly drive the chariot south across the **Sarayu River** while the crowd sleeps.`,
        choices: [
          { id: 'ch3_c1', text: 'Travel across the Sarayu toward the hermitage of Sage Bharadwaja.', nextChapterNumber: 4 },
          { id: 'ch3_c2', text: 'Meet Guha, the chieftain of the Nishada kingdom at Sringaverapura.', nextChapterNumber: 4 }
        ],
        reflection_prompt: 'What does the citizens\' devotion reveal about the bond between ruler and people in ancient Indian ethics?'
      },
      {
        chapter_number: 4,
        title: 'Chitrakoot and the Sandals of Duty',
        body_markdown: `Rama, Sita, and Lakshmana build a simple thatched cottage (*Parnashala*) on the picturesque hill of **Chitrakoot**.

Meanwhile, **Bharata** returns to Ayodhya from his uncle's kingdom. Learning of Dasharatha's passing and Rama's exile, Bharata refuses the crown with indignation. He leads the royal court and army to Chitrakoot to bring Rama back.

At Chitrakoot, Bharata falls at Rama's feet. But Rama gently insists that Dasharatha's word must remain inviolate. Unable to persuade Rama to break his vow, Bharata places Rama's golden sandals (*Paduka*) upon his own head.

"I shall govern Ayodhya from Nandigram only as your regent," Bharata vows, "with these sacred sandals placed upon the throne until your return."`,
        choices: [],
        reflection_prompt: 'How does Bharata\'s refusal of power embody selfless devotion and moral rectitude?'
      }
    ]
  },
  {
    slug: 'dice-game-and-exile',
    category_slug: 'mahabharata',
    title: 'The Dice Game and Beyond',
    description: 'Explore the fateful game of dice in Hastinapura that tested the Pandavas and set the stage for the epic Kurukshetra conflict.',
    tradition_note: 'Adapted from the Mahabharata (Sabha Parva and Vana Parva). This narrative explores complex dilemmas of dharma, political rivalry, and human vulnerability.',
    reading_minutes: 12,
    source_refs: [
      { title: 'Mahabharata, Sabha Parva & Vana Parva', type: 'literary' },
      { title: 'The Mahabharata', author: 'J.A.B. van Buitenen', publication: 'University of Chicago Press', type: 'academic' }
    ],
    chapters: [
      {
        chapter_number: 1,
        title: 'The Hall of Illusions',
        body_markdown: `Emperor **Yudhishthira** has performed the grand *Rajasuya* sacrifice in **Indraprastha**, establishing his sovereignty and righteousness. The palace, crafted by the celestial architect Maya Danava, features optical illusions—floors polished like crystal lakes and pools that resemble solid stone.

**Duryodhana**, eldest of the one hundred Kaurava brothers, visits Indraprastha and experiences embarrassment, mistaking dry floor for water. Filled with envy and humiliation, Duryodhana returns to **Hastinapura** seeking his father King Dhritarashtra\'s permission to challenge Yudhishthira.

His uncle **Shakuni**, master of loaded dice, devises a cunning plan to strip Yudhishthira of his kingdom without firing an arrow.`,
        choices: [
          { id: 'mb1_c1', text: 'Listen to Vidura\'s stern warning to King Dhritarashtra.', nextChapterNumber: 2 },
          { id: 'mb1_c2', text: 'Follow Yudhishthira as he receives the royal invitation to Hastinapura.', nextChapterNumber: 2 }
        ],
        reflection_prompt: 'How does envy obscure rational judgment in political leadership?'
      },
      {
        chapter_number: 2,
        title: 'The Unchecked Wager',
        body_markdown: `Bound by Kshatriya etiquette that forbids refusing a formal invitation to a game of chance, Yudhishthira travels to the gambling hall (*Dyuta Sabha*) in Hastinapura.

In place of Duryodhana, the master manipulator **Shakuni** plays on his behalf. Stake by stake, Yudhishthira loses his gold, chariots, army, kingdom of Indraprastha, and even his brothers Bhima, Arjuna, Nakula, and Sahadeva.

Finally, in a state of delusion, Yudhishthira wagers himself, and then Empress **Draupadi**.

The assembly hall turns deathly silent.`,
        choices: [
          { id: 'mb2_c1', text: 'Witness Draupadi\'s courageous interrogation of the Kuru elders.', nextChapterNumber: 3 },
          { id: 'mb2_c2', text: 'Examine Bhima\'s fierce vow against Dushasana in the assembly.', nextChapterNumber: 3 }
        ],
        reflection_prompt: 'What moral questions did Draupadi raise regarding Yudhishthira\'s right to wager others after losing himself?'
      },
      {
        chapter_number: 3,
        title: 'Draupadi\'s Question',
        body_markdown: `Draupadi is summoned to the royal assembly by Dushasana. With unyielding dignity, she addresses King Dhritarashtra, Bhishma, Drona, and Vidura:

"Did King Yudhishthira lose himself first before wagering me? If he was no longer a free man, by what authority could he wager another?"

The elders bow their heads, unable to answer the intricate paradox of law and morality. As ominous signs appear—jackals howling outside—King Dhritarashtra steps in, granting Draupadi boons. Draupadi asks only for the freedom of her husbands and the return of their weapons.

However, Duryodhana demands a single final match to determine their fate.`,
        choices: [
          { id: 'mb3_c1', text: 'Observe the final dice roll determining twelve years of forest exile.', nextChapterNumber: 4 },
          { id: 'mb3_c2', text: 'Follow the Pandavas as they depart Hastinapura for Kamyaka forest.', nextChapterNumber: 4 }
        ],
        reflection_prompt: 'Why is Draupadi remembered as one of the most intellectually formidable voices in epic literature?'
      },
      {
        chapter_number: 4,
        title: 'Twelve Years in the Wilderness',
        body_markdown: `The terms of the final wager dictate twelve years of forest exile (*Vana Vasa*) followed by one year incognito (*Ajnata Vasa*). If discovered during the thirteenth year, another twelve years of exile must be served.

In the **Kamyaka** and **Dwaita** forests, the Pandavas endure hardship while engaging with great sages like Markandeya and Vyasa. **Arjuna** travels to the Himalayas to obtain divine weapons (*Pasupatastra*) from Lord Shiva. **Bhima** protects the group from forest dangers, while **Yudhishthira** deepens his knowledge of dharma through the *Yaksha Prashna* (questions of the Yaksha).

Though stripped of their kingdom, their spirit remains unbroken, preparing them for the ultimate trial that awaits.`,
        choices: [],
        reflection_prompt: 'How can adversity be transformed into an opportunity for spiritual and character growth?'
      }
    ]
  }
];
