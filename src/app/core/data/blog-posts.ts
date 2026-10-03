import { BlogPost } from '../models/blog-post.model';

/**
 * Local blog data. Replace with a CMS later — see BlogService.
 * `content` is trusted HTML authored by the site owner.
 *
 * Article markup the prose styles understand (blog-detail.page.scss):
 *   <p class="lede">            opening paragraph, larger
 *   <p class="kicker">          small "chapter one" label above an <h2>
 *   <p class="deva">            Devanagari name under a chapter heading
 *   <div class="pair">          two photos side by side
 *   <figure class="tall">       a single portrait photo, kept within the screen height
 *   <blockquote class="pull-quote"> / <blockquote class="verse">
 */

/** One photo with its caption. `w`/`h` reserve space so the page doesn't jump as photos load. */
const photo = (file: string, alt: string, caption: string, cls = '', w = 900, h = 1200): string =>
  `<figure${cls ? ` class="${cls}"` : ''}><img src="images/blog/braj/${file}.jpg" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async" /><figcaption>${caption}</figcaption></figure>`;

const pair = (a: string, b: string): string => `<div class="pair">${a}${b}</div>`;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'braj-a-day-that-refused-the-clock',
    title: 'Braj: a day that refused the clock',
    excerpt:
      'Gokul, Barsana, Vrindavan and the Yamuna in a single day — three towns that keep a different clock, and the day I stopped wanting my own.',
    category: 'Photo Essays',
    date: '2026-10-02',
    readTime: 8,
    image: 'images/blog/braj/cover.jpg',
    imageAlt: 'Radha and Krishna in purple and peacock-blue silks on a gilded altar',
    featured: true,
    tags: ['Braj', 'Gokul', 'Barsana', 'Vrindavan', 'Yamuna'],
    content: `
<p class="lede">Some roads lead to a place. This one led out of time.</p>
<p>Four in the morning. Delhi still asleep. And I, already leaving it, carrying a want I had no name for.</p>
<p>By nightfall I would stand in three towns that keep a different clock, and I would stop wanting my own.</p>
<p>This is the book of that day.</p>

<p class="kicker">chapter one</p>
<h2>Gokul</h2>
<p class="deva">गोकुल</p>
<p>Step into the lanes of Gokul and the century quietly lets go of your hand.</p>
<p>This is Krishna’s childhood, kept. Frozen mid-breath, unhurried, untroubled by us.</p>
<p>Every house, a shrine.<br />Every householder, a priest.<br />In every home, a Meera.</p>
<p>Caste lines blur at the edges. Women are the keepers of the gods. It is a world within a world, and the door was open.</p>
<h3>Gokul begins. Every house, a shrine.</h3>
${pair(
  photo('gokul-signboard', 'A temple signboard in Gokul pointing to Chaurasi Khambha Mandir', 'The sign said a hundred metres. It did not say how far I would travel inside them. Chaurasi Khambha Mandir, the temple of eighty-four pillars.'),
  photo('gokul-shrine-door', 'Deities dressed in silk behind a plain wooden door', 'Behind one plain wooden door, the Lord of the Universe and his family, waiting in silk.'),
)}
<h3>There was a Meera in every household.</h3>
${pair(
  photo('gokul-radhe-radhe', 'A doorway shrine in a yellow-walled house, Radhe Radhe written in red', 'Radhe Radhe, in red on the tile. A woman sits beside her gods, and the whole house breathes around them.'),
  photo('gokul-courtyard', 'An old stone courtyard with peeling plaster and a small shrine', 'Plaster peels. Flowers climb the steps. Nothing here is restored, and nothing is lost.'),
)}
<h3>The old world, still in session.</h3>
${pair(
  photo('gokul-saffron-knots', 'Saffron cloth knotted around a tree beside a temple spire', 'Knot after knot of saffron cloth: hope, tied by hand, one wish at a time.'),
  photo('gokul-white-cow', 'A white cow with red thread at her muzzle beside stalls of painted images of God', 'A white cow among the stalls of a hundred painted faces of God, red thread at her muzzle, as if she too came to pray.'),
)}

<p class="kicker">interlude</p>
<h2>Raman Reti</h2>
<p class="deva">रमण रेती</p>
<p>And then the aarti pulled me out of the past and set me, hard, in the present.</p>
<p>It was less a ritual than a force. A hand at the back of the soul, saying <em>rise</em>. And I rose.</p>
<p>Durkheim called it the collective conscience: the fire that starts when strangers begin to feel as one. Dancing. Chanting. Clapping. The crowd pressed in, and it did not feel like noise.</p>
<p>The heat, the sweat, the shoulders against mine. I did not endure them. I embraced them.</p>
<blockquote class="pull-quote"><p>In Delhi I hate every one of these things. Here, I was happy to burn in them. What changed?</p></blockquote>
${photo('raman-reti-elephant', 'A temple elephant with saffron markings and a silk cloth on its back', 'Saffron on its brow, silk on its back, it stands as calm as a temple pillar while the whole world sways around it.', 'tall')}

<p class="kicker">chapter two</p>
<h2>Barsana</h2>
<p class="deva">बरसाना</p>
<p>The village of Radha. And Radha, it turns out, does not make arrival easy.</p>
<p>I wondered whether she made it easy for Krishna either. She is Radha Rani. If she were that easy to reach, then <em>baat hi kya thi</em>, what would be the point?</p>
<p class="stat">1½ hours became 3½</p>
<p>And we arrived at the exact minute of the aarti. Had we come on time, we would have missed the tide: the glorious chaos, the devotion, the electricity of Radhe Radhe, a whole sea of people dying for one glimpse of her.</p>
<h3>The long way up</h3>
${pair(
  photo('barsana-steps', 'Pilgrims climbing steps beside a wall knotted with red thread, the town far below', 'Down the hill the steps fall away, the town far below, red thread knotted all along the wall.'),
  photo('barsana-temple', 'Crowds at the gateway of the Shri Ladli Ji temple', 'Shri Ladli Ji Maharaj. A whole village climbing toward the same sliver of light.'),
)}
${photo('barsana-hall', 'A packed temple hall under a steel roof, every face turned one way', 'Under a steel roof, every face turned the same way.', 'wide', 1200, 900)}
${photo('barsana-crowd', 'Devotees raising phones and hands towards the distant sanctum', 'Phones lifted, hands lifted higher. From here, the sanctum is only a glow.', 'wide', 1200, 900)}
<blockquote class="pull-quote"><p>राधे राधे means “excuse me.”</p></blockquote>
<p>It is also hello, goodbye, blessing and thank you. But in the crush of the crowd it is simply how you ask someone to move. So the whole pushing, sweating sea of Barsana kept saying the name of God to one another, politely, all day.</p>
<blockquote class="verse"><p>Don’t worry if you can’t see her. She can see everyone.</p><cite>A devotee, in the crowd at Barsana</cite></blockquote>
<p>A simple line. And it changed everything.</p>
<p>I stopped straining. I stopped counting the cost of the road. I let go. If she saw me, then I had arrived. Somewhere inside that sentence was enough.</p>
${photo('barsana-darshan', 'A glimpse of the deity in blue silk with red and gold borders above raised hands', 'All I could see of her: blue silk, red and gold borders, and a forest of raised hands.', 'wide', 1200, 900)}
${photo('barsana-sadhus', 'Sadhus playing harmonium and drum behind a stall of prayer beads and toys', 'Sadhus play harmonium and drum behind a stall of prayer beads and toys. Kirtan and commerce, in the same breath.', 'tall')}

<p class="kicker">chapter three</p>
<h2>Vrindavan</h2>
<p class="deva">वृंदावन</p>
<p>The ISKCON temple. The gaushala. And again, the aarti.</p>
<p>By my plan, we would have been early, and I would have missed it. Braj had other plans.</p>
<p>I am certain it slowed me down on purpose, and set me down in its own time. My clock was useless here, held up before Radha-Krishna’s.</p>
<h3>Arriving</h3>
${pair(
  photo('vrindavan-gateway', 'A marble gateway with a carved arch, a bare tree at its centre and crowds below', 'A marble gateway framed by a carved arch, a bare tree at its heart, and a river of people below.'),
  photo('vrindavan-first-glimpse', 'The deities glimpsed through green leaves over a crowd', 'The first glimpse of them: through green leaves, over a sea of heads.'),
)}
<h3>Darshan, and the sound of it</h3>
<p>Radha and Krishna, arms raised, in peacock blues, against a purple that seems to shimmer with its own heat.</p>
${photo('vrindavan-kirtan', 'Musicians with cymbals and a drum leading kirtan in the temple', 'Cymbals, a drum, one voice thrown wide, and a room that answers back.', 'tall')}
<h3>Nobody was a stranger</h3>
${pair(
  photo('vrindavan-circle-dance', 'Women holding hands and dancing in a circle on chequered marble', 'Women joined hands and turned in a circle, barefoot on chequered marble.'),
  photo('vrindavan-mother-child', 'A mother holding her child close in the middle of the temple hall', 'In the middle of the hall, a mother held a child close, and nobody hurried them.', '', 661, 1200),
)}
<blockquote class="pull-quote"><p>Everywhere else, the shopkeeper wants to rob you. The guide wants your money.</p></blockquote>
<p>But in Vrindavan I did not want to be spared. I wanted to be robbed of something else: a small piece of the wisdom these people have carried by mouth, passed down through generations, never quite written down. I definitely paid for it.</p>
${photo('vrindavan-gaushala', 'A woman resting her hand on a cow’s brow in the gaushala at night', 'In the gaushala, after dark: a hand on a cow’s warm brow, and for a moment nothing else in the world needs saying.', 'tall')}
<h3>One more place where caste did not matter.</h3>
<p>The Brahmins were foreigners.</p>
<p>The same people who made the caste system rigid among us are now the ones challenging it.</p>
<p>What a time to witness. What a place to witness.</p>
<p>Radhe Radhe and Hare Krishna, they said to me. And I, half laughing, questioned the audacity.</p>
<p>But Bhakti surpasses all. It forgives all.</p>
<p>For the first time, I understood it, not as a proverb but in the body.</p>
<blockquote class="verse">
<p lang="hi">समय से पहले<br />कुछ नहीं होता</p><p>Nothing happens before its time.</p>
<p lang="hi">जो होता है,<br />सब लिखा है</p><p>Whatever happens is already written.</p>
</blockquote>
<p>I bowed to the fatalist in me. Then I went on toward the river.</p>

<p class="kicker">chapter four</p>
<h2>Yamuna</h2>
<p class="deva">यमुना</p>
<p>The last light of the night: the Yamuna aarti.</p>
<p>And my politics woke up. My social conscience stood at the edge of the water, grieving: how dirty she is, and how our festivals have made her so.</p>
<p>And then I found myself doing the very same thing, wholly and gladly, immersed.</p>
<h3>The river at night</h3>
${pair(
  photo('yamuna-boats', 'Painted boats at the river’s edge at night, a small child on a rope bed', 'The boats wait in their painted colours. On a rope bed at the water’s edge, a small child watches the night arrive.'),
  photo('yamuna-diyas', 'Small floating lamps adrift on the black water of the Yamuna', 'Small flames adrift on black water. Beautiful. And part of the problem.'),
)}
<blockquote class="pull-quote"><p>You will call it hypocrisy. Perhaps I would have, too.</p></blockquote>
<p>I won’t explain, not this time.</p>
<p>I would only urge you to visit Vrindavan once, and experience the hypocrisy of it all.</p>
${photo('vrindavan-night-lanes', 'A woman seated on a ledge in a lane at night, a carved wall glowing behind her', 'Night in the lanes: a quiet figure on a ledge, and a carved wall glowing behind her like a held breath.', 'tall')}

<p class="sign-off">Radhe Radhe.</p>
<p class="sign-off sign-off--small">Braj slowed me down. Braj kept me.</p>
${photo('radhe-radhe', 'Garima with a tilak and bindis on her face, smiling', 'Twenty-four photographs. One day. Gokul, Barsana, Vrindavan. 2 October 2026.', 'tall', 553, 1200)}
`,
  },
];
