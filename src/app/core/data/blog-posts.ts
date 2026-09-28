import { BlogPost } from '../models/blog-post.model';
import { unsplash } from './unsplash';

/**
 * Local blog data. Replace with a CMS later — see BlogService.
 * `content` is trusted HTML authored by the site owner.
 * These are sample stories — text in [square brackets] is a placeholder.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'the-boatman-who-remembers-every-flood',
    title: 'The boatman who remembers every flood',
    excerpt:
      'Ramesh has rowed the same stretch of the Ganga for forty-six years. He measures time not in years but in how high the water came.',
    category: 'People',
    date: '2026-09-12',
    readTime: 7,
    image: unsplash('photo-1584005609799-94866308b1c0', 1600),
    imageAlt: 'A boatman rowing a wooden boat on the Ganga',
    featured: true,
    tags: ['Varanasi', 'Oral History'],
    content: `
<p>I met Ramesh at five in the morning, when the ghats are still blue and the only sounds are bells and oars. I had asked for a boat ride. I got, instead, a history of the river told in floods.</p>
<h2>“The water came up to here”</h2>
<p>He points to a step, then to a temple wall, then to a mark on a doorway far above us. Each one has a year. 1978. 2013. 2019. He does not remember what else happened in those years — but he remembers exactly how the river looked the morning after.</p>
<blockquote class="pull-quote"><p>The river keeps its own calendar. I just row inside it.</p></blockquote>
<h2>What gets passed down</h2>
<p>His father rowed this stretch. So did his grandfather. His son drives an auto-rickshaw and does not want the boat. Ramesh says this without bitterness — only a small pause, the kind you hear on old recordings between one song and the next.</p>
<h2>Why I keep going back</h2>
<p>[Continue writing — the second visit, the photographs he asked for, and what he wanted remembered.]</p>
`,
  },
  {
    id: 2,
    slug: 'recording-my-grandmothers-recipes',
    title: 'Recording my grandmother’s recipes before they disappear',
    excerpt: 'No measurements, no written list — just “a little of this, until it smells right”. So I pressed record.',
    category: 'Food',
    date: '2026-08-28',
    readTime: 6,
    image: unsplash('photo-1601387434127-20979856e76e', 1600),
    imageAlt: 'A roti being turned on a hot tawa',
    featured: false,
    tags: ['Family', 'Oral History'],
    content: `
<p>My grandmother has never used a measuring cup. When I asked her how much salt goes into the kadhi, she looked at me as if I had asked how much air goes into a breath.</p>
<blockquote class="pull-quote"><p>A recipe is a family history you can taste.</p></blockquote>
<p>[Continue writing — the three recipes, the stories that came with each, and the one she refused to share.]</p>
`,
  },
  {
    id: 3,
    slug: 'forty-eight-hours-in-a-jaisalmer-haveli',
    title: 'Forty-eight hours in a Jaisalmer haveli',
    excerpt: 'Forty-two carved windows, one family, seven generations — and a staircase that everyone insists is haunted.',
    category: 'Places',
    date: '2026-08-10',
    readTime: 5,
    image: unsplash('photo-1674842654443-8b9b57c19d18', 1600),
    imageAlt: 'The carved sandstone facade of a haveli in Jaisalmer',
    featured: false,
    content: `
<p>The haveli sits so close to its neighbour that the two families can pass a cup of tea across the lane without leaving their windows.</p>
<p>[Continue writing…]</p>
`,
  },
  {
    id: 4,
    slug: 'what-the-tea-pluckers-sang',
    title: 'What the tea pluckers sang',
    excerpt: 'On a Darjeeling slope at dawn, a work song older than the garden itself.',
    category: 'Culture',
    date: '2026-07-22',
    readTime: 4,
    image: unsplash('photo-1602020277972-fd160de66021', 1600),
    imageAlt: 'Tea pluckers among the bushes of a tea garden',
    featured: false,
    content: `
<p>I heard the song before I saw anyone — a call and a reply drifting up between the rows of tea.</p>
<p>[Continue writing…]</p>
`,
  },
  {
    id: 5,
    slug: 'doors-of-old-delhi',
    title: 'A photo essay: the doors of old Delhi',
    excerpt: 'Blue for luck, brass for pride, and one door that has not opened since 1947.',
    category: 'Photo Essays',
    date: '2026-07-05',
    readTime: 3,
    image: unsplash('photo-1763390324918-496c025f73e2', 1600),
    imageAlt: 'A carved stone archway around an old wooden door',
    featured: false,
    content: `
<p>I started photographing doors because they were the only thing in Chandni Chowk that stood still long enough. [Continue writing…]</p>
`,
  },
  {
    id: 6,
    slug: 'why-i-travel-slowly',
    title: 'Why I travel slowly',
    excerpt: 'Sleeper class, second visits and the stories that only arrive on the third cup of chai.',
    category: 'Reflections',
    date: '2026-06-18',
    readTime: 5,
    image: unsplash('photo-1707848394382-55d51db733c3', 1600),
    imageAlt: 'A narrow-gauge train on a curving hillside track',
    featured: false,
    content: `
<p>The fastest way to see a place is to fly in and out. The fastest way to know one is to miss the bus back. [Continue writing…]</p>
`,
  },
];
