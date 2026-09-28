/**
 * ─────────────────────────────────────────────────────────────
 * SITE CONTENT — edit this file to personalise the website.
 * Everything in square brackets [like this] is a placeholder.
 * ─────────────────────────────────────────────────────────────
 */
import { Book, Hobby, Interest, JourneyStage, Profile, Qualification, Stat } from '../models/content.model';

export const PROFILE: Profile = {
  name: 'Garima Jain',
  role: 'IAS Aspirant',
  location: 'New Delhi · India',
  intro:
    'I am an IAS aspirant passionate about understanding society, public policy, people — and the ideas that shape our world.',
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
  { value: 400, suffix: '+', label: 'days of newspaper notes' },
  { value: 36, label: 'books read this year' },
  { value: 120, suffix: '+', label: 'answers written & reviewed' },
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

export const INTERESTS: Interest[] = [
  { title: 'Public Policy', description: 'Understanding how ideas translate into decisions that affect everyday lives.', icon: 'M4 20h16M6 20V9m4 11V9m4 11V9m4 11V9M3 9l9-5 9 5' },
  { title: 'Indian History', description: 'Reading the past to make sense of the institutions we inherited.', icon: 'M12 3v18M5 7h14M7 7l-3 7h6zM17 7l-3 7h6z' },
  { title: 'Governance', description: 'The machinery between a law on paper and a service at the doorstep.', icon: 'M4 10h16v10H4zM2 10l10-6 10 6M9 14h6' },
  { title: 'International Relations', description: 'How India negotiates its place in a crowded, shifting world.', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18' },
  { title: 'Psychology', description: 'Why people decide the way they do — and what that means for policy.', icon: 'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0012 3z' },
  { title: 'Current Affairs', description: 'Following the news slowly: context first, headlines second.', icon: 'M4 5h13v14H6a2 2 0 01-2-2zM17 9h3v8a2 2 0 01-2 2M7 9h7M7 13h7' },
  { title: 'Society & Culture', description: 'Festivals, languages, kitchens — the everyday grammar of India.', icon: 'M8 11a3 3 0 100-6 3 3 0 000 6zM16 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5M14 15c3 0 8 1 8 5' },
  { title: 'Technology', description: 'Digital public infrastructure and the questions it raises about access.', icon: 'M4 5h16v11H4zM2 19h20M9 9l-2 2 2 2M15 9l2 2-2 2' },
  { title: 'Environment', description: 'Climate, water and cities — the policy problems of my generation.', icon: 'M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c3-5 6-8 10-10' },
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
  { title: 'Why Nations Fail', author: 'Daron Acemoglu & James A. Robinson', thought: 'Understanding institutions through the lens of history.', tone: 'pink' },
  { title: 'The Discovery of India', author: 'Jawaharlal Nehru', thought: 'A country read as a long conversation with itself.', tone: 'teal' },
  { title: 'Poor Economics', author: 'Abhijit Banerjee & Esther Duflo', thought: 'Policy is best judged at the scale of one household.', tone: 'marigold' },
  { title: 'India After Gandhi', author: 'Ramachandra Guha', thought: 'The improbable, unfinished story of a republic.', tone: 'saffron' },
];

export const CURRENTLY_EXPLORING: string[] = [
  'Public Administration',
  'Indian Polity',
  'International Relations',
  'Climate Policy',
  'Ethics & Integrity',
];

export const PHILOSOPHY = {
  quote: 'Preparation is not only about knowing the answers.',
  quoteEmphasis: 'It is about learning to ask better questions.',
};

/** Manifest statements — each line: [bold part, ghosted part]. */
export const MANIFEST = {
  lines: [
    ['aspirant,', ' not applicant.'],
    ['one goal', ', many questions.'],
    ['no shortcuts', '.'],
  ] as [string, string][],
  closing: ['just honest questions', ' — for a country worth understanding.'] as [string, string],
};
