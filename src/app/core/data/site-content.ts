/**
 * ─────────────────────────────────────────────────────────────
 * SITE CONTENT — edit this file to personalise the website.
 * Everything in square brackets [like this] is a placeholder.
 * ─────────────────────────────────────────────────────────────
 */
import { unsplash } from './unsplash';
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
 * The horizontal "places" strip. Stock photos from Unsplash for now (see unsplash.ts).
 */
export const PLACES: Place[] = [
  { name: 'Ladakh', region: 'Jammu & Kashmir', when: 'jun 2025', note: 'Prayer flags, butter tea and a monastery that hums at dawn.', image: unsplash('photo-1636993053871-61eff06ccd36', 900), imageAlt: 'A white hillside monastery below snow peaks in Ladakh' },
  { name: 'Varanasi', region: 'Uttar Pradesh', when: 'nov 2024', note: 'A boatman who remembers every flood since 1978.', image: unsplash('photo-1608412525537-662195e817c5', 900), imageAlt: 'Old ghat buildings rising above the Ganga in Varanasi' },
  { name: 'Jaisalmer', region: 'Rajasthan', when: 'jan 2025', note: 'A golden fort, and a haveli with forty-two windows.', image: unsplash('photo-1713349881676-594b95a5742b', 900), imageAlt: 'The walls of Jaisalmer fort above the golden city' },
  { name: 'Alleppey', region: 'Kerala', when: 'aug 2024', note: 'Slow backwaters and a kitchen that smelled of coconut.', image: unsplash('photo-1661174607003-d9d36388c916', 900), imageAlt: 'A houseboat among coconut palms on the Kerala backwaters' },
  { name: 'Hampi', region: 'Karnataka', when: 'dec 2023', note: 'Boulders balanced like a question nobody answered.', image: unsplash('photo-1620766182966-c6eb5ed2b788', 900), imageAlt: 'The gopuram of Virupaksha temple rising over the ruins of Hampi' },
  { name: 'Cherrapunji', region: 'Meghalaya', when: 'jul 2024', note: 'Rain, root bridges, and a grandmother’s folk songs.', image: unsplash('photo-1637043765564-a071ff91a09f', 900), imageAlt: 'A tall waterfall dropping into a green gorge in Meghalaya' },
  { name: 'Rann of Kutch', region: 'Gujarat', when: 'feb 2025', note: 'White salt to the horizon under a full moon.', image: unsplash('photo-1706013729724-caada9be0f97', 900), imageAlt: 'The white salt flats of the Rann of Kutch under a pale sky' },
  { name: 'Darjeeling', region: 'West Bengal', when: 'apr 2024', note: 'Tea gardens, a toy train and Kanchenjunga at 5 a.m.', image: unsplash('photo-1677858741808-c843c4fcb81f', 900), imageAlt: 'A path through a Darjeeling tea garden with a lone tall tree' },
];

/** The photo journal grid. Stock photos from Unsplash for now (see unsplash.ts). */
export const JOURNAL: JournalPhoto[] = [
  { image: unsplash('photo-1601828856153-c1d09e7c42c3', 1400), alt: 'A pale blue door under a carved arch in a white wall', caption: 'a door someone painted blue for luck', place: 'jodhpur', shape: 'tall' },
  { image: unsplash('photo-1646344108679-4ddd700cd862', 1400), alt: 'A spice seller behind trays of spices at a market', caption: 'the spice lane, 7 a.m.', place: 'old delhi', shape: 'wide' },
  { image: unsplash('photo-1619581073186-5b4ae1b0caad', 1400), alt: 'Clay kulhad cups filled with chai', caption: 'the chai that started every conversation', place: 'lansdowne', shape: 'square' },
  { image: unsplash('photo-1494232410401-ad00d5433cfa', 1400), alt: 'A cassette tape on a white table', caption: 'nani’s stories, side a', place: 'home', shape: 'square' },
  { image: unsplash('photo-1685120280925-c8c3697c73ee', 1400), alt: 'Palm trees seen through a train window', caption: 'window seat, sleeper class', place: 'konkan railway', shape: 'tall' },
  { image: unsplash('photo-1709554565257-6eeea817ea82', 1400), alt: 'Prayer flags above a still mountain lake', caption: 'flags carrying prayers into the wind', place: 'leh', shape: 'wide' },
  { image: unsplash('photo-1579156959079-5ea399f88a99', 1400), alt: 'A single kite against a violet evening sky', caption: 'uttarayan, from a rooftop', place: 'ahmedabad', shape: 'square' },
  { image: unsplash('photo-1665554123673-37c156c866ae', 1400), alt: 'Colourful lanterns hanging at a market stall', caption: 'lanterns before diwali', place: 'jaipur', shape: 'tall' },
  { image: unsplash('photo-1583558257444-cfba032b49ea', 1400), alt: 'A Chinese fishing net silhouetted at sunset', caption: 'the nets come up at sunset', place: 'kochi', shape: 'wide' },
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
