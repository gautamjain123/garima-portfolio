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

/** Placeholder figures — replace with your own. Animated as counters. */
export const STATS: Stat[] = [
  { value: 18, label: 'states wandered' },
  { value: 60, suffix: '+', label: 'conversations recorded' },
  { value: 2400, suffix: '+', label: 'photographs kept' },
];

/**
 * The horizontal "places" strip. Images live in public/images/places/.
 * Placeholder illustrations for now — drop real photos over the same filenames.
 */
export const PLACES: Place[] = [
  { name: 'Ladakh', region: 'Jammu & Kashmir', when: 'jun 2025', note: 'Prayer flags, butter tea and a monastery that hums at dawn.', image: 'images/places/ladakh.jpg', imageAlt: 'Snow peaks and a hillside monastery under a deep blue sky' },
  { name: 'Varanasi', region: 'Uttar Pradesh', when: 'nov 2024', note: 'A boatman who remembers every flood since 1978.', image: 'images/places/varanasi.jpg', imageAlt: 'The ghats of Varanasi at dusk with a boat on the Ganga' },
  { name: 'Jaisalmer', region: 'Rajasthan', when: 'jan 2025', note: 'A golden fort, and a haveli with forty-two windows.', image: 'images/places/jaisalmer.jpg', imageAlt: 'Sand dunes, a camel and the fort of Jaisalmer' },
  { name: 'Alleppey', region: 'Kerala', when: 'aug 2024', note: 'Slow backwaters and a kitchen that smelled of coconut.', image: 'images/places/kerala.jpg', imageAlt: 'A houseboat on the Kerala backwaters between coconut palms' },
  { name: 'Hampi', region: 'Karnataka', when: 'dec 2023', note: 'Boulders balanced like a question nobody answered.', image: 'images/places/hampi.jpg', imageAlt: 'Balanced boulders and a temple tower in Hampi' },
  { name: 'Cherrapunji', region: 'Meghalaya', when: 'jul 2024', note: 'Rain, root bridges, and a grandmother’s folk songs.', image: 'images/places/meghalaya.jpg', imageAlt: 'Green hills, clouds and a waterfall in Meghalaya' },
  { name: 'Rann of Kutch', region: 'Gujarat', when: 'feb 2025', note: 'White salt to the horizon under a full moon.', image: 'images/places/kutch.jpg', imageAlt: 'The white salt desert of Kutch under a full moon' },
  { name: 'Darjeeling', region: 'West Bengal', when: 'apr 2024', note: 'Tea gardens, a toy train and Kanchenjunga at 5 a.m.', image: 'images/places/darjeeling.jpg', imageAlt: 'Tea gardens and the toy train below snow peaks at dawn' },
];

/** The photo journal grid. Images live in public/images/journal/. */
export const JOURNAL: JournalPhoto[] = [
  { image: 'images/journal/doorway.jpg', alt: 'A blue arched doorway in a terracotta wall with a marigold garland', caption: 'a door someone painted blue for luck', place: 'jodhpur', shape: 'tall' },
  { image: 'images/journal/spices.jpg', alt: 'Cones of coloured spices at a market stall', caption: 'the spice lane, 7 a.m.', place: 'old delhi', shape: 'wide' },
  { image: 'images/journal/chai.jpg', alt: 'Glasses of chai on a tin tray beside a kettle', caption: 'the chai that started every conversation', place: 'lansdowne', shape: 'square' },
  { image: 'images/journal/cassette.jpg', alt: 'A cassette tape labelled nani’s stories', caption: 'nani’s stories, side a', place: 'home', shape: 'square' },
  { image: 'images/journal/train.jpg', alt: 'Hills seen through the barred window of a train', caption: 'window seat, sleeper class', place: 'konkan railway', shape: 'tall' },
  { image: 'images/journal/flags.jpg', alt: 'Strings of prayer flags against a blue sky', caption: 'flags carrying prayers into the wind', place: 'leh', shape: 'wide' },
  { image: 'images/journal/kites.jpg', alt: 'Colourful kites in a pale sky', caption: 'uttarayan, from a rooftop', place: 'ahmedabad', shape: 'square' },
  { image: 'images/journal/lanterns.jpg', alt: 'Paper lanterns hanging in a row', caption: 'lanterns before diwali', place: 'jaipur', shape: 'tall' },
  { image: 'images/journal/nets.jpg', alt: 'Chinese fishing nets silhouetted at sunset', caption: 'the nets come up at sunset', place: 'kochi', shape: 'wide' },
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

export const PHILOSOPHY = {
  quote: 'Every place has a story it tells visitors.',
  quoteEmphasis: 'I go looking for the one it keeps for friends.',
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
