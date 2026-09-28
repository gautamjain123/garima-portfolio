import { BlogPost } from '../models/blog-post.model';

/**
 * Local blog data. Replace with a CMS later — see BlogService.
 * `content` is trusted HTML authored by the site owner.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'what-does-good-governance-really-mean',
    title: 'What does good governance really mean?',
    excerpt:
      'Beyond the eight textbook principles — a note on trust, the last-mile clerk, and why the quality of a state is felt at a ration-shop counter long before it is read in a report.',
    category: 'Governance',
    date: '2026-09-12',
    readTime: 6,
    image: 'images/blog/good-governance.jpg',
    imageAlt: 'North Block on Raisina Hill at dusk',
    featured: true,
    tags: ['GS Paper II', 'Public Administration'],
    content: `
<p>Every governance textbook I have read begins with a list: participation, rule of law, transparency, responsiveness, consensus, equity, effectiveness and accountability. It is a tidy list. I have written it in at least forty practice answers. And yet, the longer I prepare, the more I suspect the list describes the <em>outputs</em> of good governance rather than what it actually feels like.</p>
<h2>The principle list</h2>
<p>The eight principles are useful precisely because they are measurable. We can count RTI applications, track time-bound service delivery, audit expenditure. But measurement tempts us to confuse the dashboard with the destination.</p>
<p>Consider a ration card. The scheme may be perfectly designed, the budget fully released, the portal live. Good governance, on paper. But if a widow in a district headquarters must visit the office four times because a single field is misspelt, the state has not really arrived for her.</p>
<blockquote class="pull-quote"><p>The quality of a state is felt at a ration-shop counter long before it is read in a report.</p></blockquote>
<h2>The last-mile clerk</h2>
<p>If governance is a relay race, the last runner is almost never an officer. It is a patwari, an anganwadi worker, a clerk at the tehsil. Their discretion, patience and workload decide whether a policy becomes a service. Reform that ignores them — their training, their tools, their dignity — tends to stall exactly where it matters most.</p>
<h2>Trust as infrastructure</h2>
<p>Roads and railways are infrastructure. So, I am beginning to believe, is trust: the quiet confidence that a complaint will be heard, a file will move, a promise will be kept. It takes decades to build and one careless season to lose.</p>
<h2>What I’m still unsure of</h2>
<p>I do not yet know how to measure trust without flattening it into another indicator. Perhaps that is the point — some parts of governance must be judged by listening rather than counting. I will keep returning to this question.</p>
`,
  },
  {
    id: 2,
    slug: 'understanding-indias-administrative-structure',
    title: 'Understanding India’s Administrative Structure',
    excerpt: 'From the Cabinet Secretariat to the block office — a map of who decides what, and where decisions actually travel.',
    category: 'Governance',
    date: '2026-08-28',
    readTime: 8,
    image: 'images/blog/administrative-structure.jpg',
    imageAlt: 'A long government corridor lined with files',
    featured: false,
    tags: ['Polity', 'GS Paper II'],
    content: `
<p>When I first opened a polity textbook, the administrative structure of India looked like an org chart. Months later, it looks more like a river system — many tributaries, a few great channels, and a delta where everything meets the ground.</p>
<h2>The Union</h2>
<p>At the top sit the Cabinet and the Cabinet Secretariat, coordinating ministries that each hold a slice of the state’s work. Policy is framed here, but it only becomes real further downstream.</p>
<h2>The State and the District</h2>
<p>The district remains the most important unit of administration in India. The District Collector is simultaneously coordinator, magistrate, revenue officer and crisis manager — a role that is part institution, part improvisation.</p>
<blockquote class="pull-quote"><p>Policy is written in Delhi, but it is translated in the district.</p></blockquote>
<h2>The Block and the Panchayat</h2>
<p>After the 73rd and 74th Amendments, local bodies became constitutional institutions. Their strength varies enormously by state — and that variation is one of the most revealing things about Indian governance. [Continue writing…]</p>
`,
  },
  {
    id: 3,
    slug: 'why-nations-fail-and-institutions',
    title: 'What “Why Nations Fail” taught me about institutions',
    excerpt: 'Inclusive and extractive institutions, read through an Indian lens — and the questions the book leaves open.',
    category: 'Books',
    date: '2026-08-10',
    readTime: 5,
    image: 'images/blog/why-nations-fail.jpg',
    imageAlt: 'An open book on a wooden desk',
    featured: false,
    content: `
<p>Acemoglu and Robinson make a deceptively simple argument: nations prosper when their institutions are inclusive, and stagnate when they are extractive. Reading it as an aspirant, I kept mapping their examples onto Indian history.</p>
<blockquote class="pull-quote"><p>Institutions are not buildings. They are the rules people believe will be enforced.</p></blockquote>
<p>[Continue writing — what the book gets right, where it simplifies, and what it means for an administrator.]</p>
`,
  },
  {
    id: 4,
    slug: 'four-hundred-days-of-reading-the-newspaper',
    title: 'On consistency: 400 days of reading the newspaper',
    excerpt: 'What changed, what didn’t, and the simple notebook system that kept me going.',
    category: 'Personal Reflections',
    date: '2026-07-22',
    readTime: 4,
    image: 'images/blog/newspaper.jpg',
    imageAlt: 'A folded newspaper beside a cup of tea',
    featured: false,
    content: `
<p>I did not plan to count. One day I simply noticed that my notebook had crossed a hundred entries, and it felt worth continuing. Four hundred days later, here is what I have learned about consistency.</p>
<h2>Small, boring, daily</h2>
<p>The habit only survived because it was small. Thirty minutes, one notebook, three columns: what happened, why it matters, which paper it belongs to.</p>
<p>[Continue writing…]</p>
`,
  },
  {
    id: 5,
    slug: 'constituent-assembly-debates',
    title: 'The Constituent Assembly debates I keep returning to',
    excerpt: 'Three exchanges from 1946–49 that still read like arguments about the India of today.',
    category: 'History',
    date: '2026-07-05',
    readTime: 7,
    image: 'images/blog/constituent-assembly.jpg',
    imageAlt: 'Archival photograph of a parliamentary chamber',
    featured: false,
    content: `
<p>The Constituent Assembly debates are long, but they reward patience. Some exchanges feel startlingly contemporary. [Continue writing…]</p>
`,
  },
  {
    id: 6,
    slug: 'structuring-a-mains-answer',
    title: 'How I structure a 250-word Mains answer',
    excerpt: 'Introduction, body, way forward — and the small habits that turned my answers from lists into arguments.',
    category: 'UPSC',
    date: '2026-06-18',
    readTime: 5,
    image: 'images/blog/answer-writing.jpg',
    imageAlt: 'An answer sheet with handwritten notes',
    featured: false,
    content: `
<p>Answer writing is where knowledge meets judgement. Here is the structure I have settled on after many rounds of feedback. [Continue writing…]</p>
`,
  },
];
