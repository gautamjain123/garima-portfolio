/**
 * ─────────────────────────────────────────────────────────────
 * SITE CONTENT — edit this file to personalise the website.
 * Everything in square brackets [like this] is a placeholder.
 * ─────────────────────────────────────────────────────────────
 */
import { Book, Hobby, Interest, JournalPhoto, JourneyStage, Place, Profile, Qualification, Stat } from '../models/content.model';

export const PROFILE: Profile = {
  name: 'Garima Jain',
  role: 'Traveller & Storyteller',
  location: 'New Delhi · India',
  intro:
    'I collect stories — through oral histories, conversations, photographs and reflections on people, places and cultures.',
  email: 'hello@garimajain.in', // [replace]
  siteUrl: 'https://garimajain.in', // [replace]
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/[handle]' },
    { label: 'Instagram', url: 'https://www.instagram.com/[handle]' },
    { label: 'X / Twitter', url: 'https://x.com/[handle]' },
  ],
};

export const ABOUT = {
  statement:
    'I’ve always been curious about the stories we tell, the ones we inherit and the ones that quietly slip away. This space is my little attempt to collect them — through oral histories, conversations, photographs and reflections on people, places, cultures and anything else that catches my curiosity.',
  paragraphs: [
    'There’s no particular theme tying everything together, except curiosity and a love for storytelling. Think of this as a growing collection of encounters, observations and questions — some answered, others left open.',
  ],
};

/** Counters under the manifest — from the Braj day (2 October 2026). Animated on scroll. */
export const STATS: Stat[] = [
  { value: 3, label: 'towns in one day in braj' },
  { value: 4, label: 'aartis before midnight' },
  { value: 24, label: 'photographs from that day' },
];

/** Photos from the Braj essay, in public/images/blog/braj/. */
const braj = (file: string): string => `images/blog/braj/${file}.jpg`;
const BRAJ_STORY = 'braj-a-day-that-refused-the-clock';

/**
 * The horizontal "places" strip — the stops of the Braj day, with your own photos.
 * Add a new place per trip; `story` links the card to its blog post.
 */
export const PLACES: Place[] = [
  { name: 'Gokul', region: 'Mathura, UP', when: 'oct 2026', note: 'Every house, a shrine. Every householder, a priest. In every home, a Meera.', image: braj('gokul-courtyard'), imageAlt: 'An old stone courtyard in Gokul with peeling plaster and a small shrine', story: BRAJ_STORY },
  { name: 'Raman Reti', region: 'Mathura, UP', when: 'oct 2026', note: 'An aarti that was less a ritual than a force. A hand at the back of the soul, saying rise.', image: braj('raman-reti-elephant'), imageAlt: 'A temple elephant with saffron markings and a silk cloth on its back', story: BRAJ_STORY },
  { name: 'Barsana', region: 'Mathura, UP', when: 'oct 2026', note: '1½ hours became 3½ — and we arrived at the exact minute of the aarti.', image: braj('barsana-temple'), imageAlt: 'Crowds at the gateway of the Shri Ladli Ji temple in Barsana', story: BRAJ_STORY },
  { name: 'Vrindavan', region: 'Mathura, UP', when: 'oct 2026', note: 'My clock was useless here, held up before Radha-Krishna’s.', image: braj('vrindavan-gateway'), imageAlt: 'A marble gateway in Vrindavan with a carved arch and crowds below', story: BRAJ_STORY },
  { name: 'Yamuna', region: 'Vrindavan, UP', when: 'oct 2026', note: 'Small flames adrift on black water. Beautiful, and part of the problem.', image: braj('yamuna-boats'), imageAlt: 'Painted boats at the edge of the Yamuna at night', story: BRAJ_STORY },
  { name: 'Nizamuddin Dargah', region: 'Delhi', when: 'sep 2026', note: 'Four hundred metres of rose petals and attar, and a crowd of shoppers that becomes a crowd of pilgrims.', image: 'images/blog/nizamuddin/inner-gate.jpg', imageAlt: 'The mirrored archway near the inner gates of Nizamuddin Dargah, chadars hanging beyond', story: 'nizamuddin-dargah-oral-history' },
];

/** The photo journal grid — single frames from the road, captioned in a line. */
export const JOURNAL: JournalPhoto[] = [
  { image: braj('gokul-shrine-door'), alt: 'Deities dressed in silk behind a plain wooden door', caption: 'behind one plain wooden door, the lord of the universe, waiting in silk', place: 'gokul', shape: 'tall' },
  { image: braj('barsana-crowd'), alt: 'Devotees raising phones and hands towards a distant sanctum', caption: 'phones lifted, hands lifted higher', place: 'barsana', shape: 'wide' },
  { image: braj('gokul-white-cow'), alt: 'A white cow with red thread at her muzzle beside stalls of painted images of God', caption: 'as if she too came to pray', place: 'gokul', shape: 'square' },
  { image: braj('gokul-saffron-knots'), alt: 'Saffron cloth knotted around a tree beside a temple spire', caption: 'hope, tied by hand, one wish at a time', place: 'gokul', shape: 'square' },
  { image: braj('vrindavan-circle-dance'), alt: 'Women holding hands and dancing in a circle on chequered marble', caption: 'barefoot on chequered marble, nobody a stranger', place: 'vrindavan', shape: 'tall' },
  { image: braj('barsana-darshan'), alt: 'A glimpse of the deity in blue silk above raised hands', caption: 'blue silk, red and gold borders, and a forest of raised hands', place: 'barsana', shape: 'wide' },
  { image: braj('vrindavan-gaushala'), alt: 'A woman resting her hand on a cow’s brow in the gaushala at night', caption: 'a hand on a cow’s warm brow, and nothing else needs saying', place: 'vrindavan', shape: 'square' },
  { image: braj('vrindavan-night-lanes'), alt: 'A woman seated on a ledge in a lane at night, a carved wall glowing behind her', caption: 'a carved wall glowing like a held breath', place: 'vrindavan', shape: 'tall' },
  { image: braj('yamuna-diyas'), alt: 'Small floating lamps adrift on the black water of the Yamuna', caption: 'small flames adrift on black water', place: 'yamuna', shape: 'wide' },
];

export const QUALIFICATIONS: Qualification[] = [
  {
    period: '2025 —',
    tag: 'In progress',
    title: 'UPSC Preparation',
    institution: 'Civil Services Examination',
    description: 'Full-time preparation for Prelims and Mains, with [Optional Subject] as the optional paper.',
    current: true,
  },
  {
    period: '20XX',
    tag: 'Certification',
    title: 'Certificate in Public Policy',
    institution: '[Institution / Online Programme]',
    description: 'Optional entry — a short course, fellowship or internship that shaped your interests.',
  },
  {
    period: '20XX – 20XX',
    tag: 'Undergraduate',
    title: 'B.A. (Hons.) Political Science',
    institution: '[University Name], New Delhi',
    description:
      'Coursework in Indian political thought, comparative governance and public administration. [Add grades, dissertation or highlights.]',
  },
  {
    period: '20XX',
    tag: 'School',
    title: 'Higher Secondary Education',
    institution: '[School Name], [City]',
    description: 'Humanities stream — History, Political Science, Economics and English.',
  },
];

export const JOURNEY: JourneyStage[] = [
  { numeral: 'I', title: 'Foundation', description: 'NCERTs, newspapers and the habit of reading every day.' },
  { numeral: 'II', title: 'Understanding', description: 'Connecting polity, history and economy into one picture.' },
  { numeral: 'III', title: 'Preparation', description: 'Answer writing, revision cycles, mock tests and honest feedback.', current: true },
  { numeral: 'IV', title: 'Reflection', description: 'Learning from each attempt; keeping the why in view.' },
  { numeral: 'V', title: 'Service', description: 'Turning understanding into work that reaches people.' },
];

/** "What catches my eye" — the dot-separated word run. (`icon` is unused by the current design.) */
export const INTERESTS: Interest[] = [
  { title: 'Oral Histories', description: 'The stories nobody wrote down — recorded before they quietly slip away.', icon: '' },
  { title: 'Old Streets', description: 'Lanes that were there before the maps, and still don’t quite fit on them.', icon: '' },
  { title: 'Kitchens', description: 'A recipe is a family history you can taste.', icon: '' },
  { title: 'Festivals', description: 'The days a whole town agrees to be someone else for a while.', icon: '' },
  { title: 'Handmade Things', description: 'Looms, kilns and workshops — and the hands that remember how.', icon: '' },
  { title: 'Languages', description: 'Words that don’t translate, and the people who carry them.', icon: '' },
  { title: 'Mountains', description: 'Places that make every plan feel pleasantly small.', icon: '' },
  { title: 'Markets', description: 'The fastest way to learn what a town eats, wears and argues about.', icon: '' },
  { title: 'Trains', description: 'Twenty strangers, one compartment, a dozen stories by morning.', icon: '' },
];

export const HOBBIES: Hobby[] = [
  { title: 'Reading', caption: 'A stack by the window', image: 'images/hobbies/reading.jpg', imageAlt: 'A stack of books beside a sunlit window', shape: 'feature', tone: 'teal' },
  { title: 'Travelling', caption: 'Hampi, Karnataka', image: 'images/hobbies/travel.jpg', imageAlt: 'Stone temples of Hampi at sunrise', shape: 'wide', tone: 'saffron' },
  { title: 'Photography', caption: 'Chandni Chowk', image: 'images/hobbies/photography.jpg', imageAlt: 'A crowded lane in Chandni Chowk', shape: 'tall', tone: 'pink' },
  { title: 'Writing', caption: 'Journal pages', image: 'images/hobbies/writing.jpg', imageAlt: 'Handwritten journal pages', shape: 'wide', tone: 'marigold' },
  { title: 'Music', caption: 'Evening ragas', image: 'images/hobbies/music.jpg', imageAlt: 'A record player', shape: 'square', tone: 'ink' },
  { title: 'Fitness', caption: 'Morning run, Lodhi Garden', image: 'images/hobbies/fitness.jpg', imageAlt: 'Trees in Lodhi Garden at dawn', shape: 'square', tone: 'mint' },
  { title: 'Art', caption: 'Madhubani study', image: 'images/hobbies/art.jpg', imageAlt: 'A Madhubani painting in progress', shape: 'square', tone: 'blush' },
  { title: 'Movies', caption: 'Saturday cinema', image: 'images/hobbies/movies.jpg', imageAlt: 'A cinema hall', shape: 'tall', tone: 'berry' },
];

export const BOOKS: Book[] = [
  { title: 'City of Djinns', author: 'William Dalrymple', thought: 'A city read through the people who still remember it.', tone: 'pink' },
  { title: 'The Great Railway Bazaar', author: 'Paul Theroux', thought: 'Proof that the journey is the story.', tone: 'teal' },
  { title: 'Nine Lives', author: 'William Dalrymple', thought: 'Nine strangers, nine faiths, one long listening.', tone: 'marigold' },
  { title: 'In Patagonia', author: 'Bruce Chatwin', thought: 'How to write a place you can’t quite hold.', tone: 'saffron' },
];

/** Spun on the orbit globe as "next on the map". */
export const CURRENTLY_EXPLORING: string[] = ['Spiti', 'Majuli', 'Ziro', 'Chettinad', 'Gokarna'];

/** From the opening of the Braj essay. The last two words are set in italic. */
export const PHILOSOPHY = {
  quote: 'Some roads lead to a place.',
  quoteEmphasis: 'This one led out of time.',
};

/** Manifest statements — each line: [bold part, ghosted part]. */
export const MANIFEST = {
  lines: [
    ['collector', ' of stories.'],
    ['many places', ', one notebook.'],
    ['no itinerary', '.'],
  ] as [string, string][],
  closing: ['just open roads', ' — and the people along them.'] as [string, string],
};
