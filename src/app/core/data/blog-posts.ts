import { BlogPost } from '../models/blog-post.model';

/**
 * Local blog data. Replace with a CMS later — see BlogService.
 * `content` is trusted HTML authored by the site owner.
 *
 * Article markup the prose styles understand (blog-detail.page.scss):
 *   <p class="lede">            opening paragraph, larger
 *   <p class="kicker">          small "chapter one" label above an <h2>
 *   <p class="deva">            subtitle under a chapter heading (a Devanagari name, or a short line)
 *   <div class="pair">          two photos side by side
 *   <figure class="tall">       a single portrait photo, kept within the screen height
 *   <blockquote class="pull-quote"> / <blockquote class="verse">
 *   <aside class="questions">   a "questions still open" list
 */

/**
 * Photo helper for one story's folder (public/images/blog/<dir>/). Each photo gets its caption,
 * and `w`/`h` reserve its space so the page doesn't jump as photos load.
 */
const photosIn =
  (dir: string) =>
  (file: string, alt: string, caption: string, cls = '', w = 900, h = 1200): string =>
    `<figure${cls ? ` class="${cls}"` : ''}><img src="images/blog/${dir}/${file}.jpg" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async" /><figcaption>${caption}</figcaption></figure>`;

const photo = photosIn('braj');
const nz = photosIn('nizamuddin');

const pair = (a: string, b: string): string => `<div class="pair">${a}${b}</div>`;

/** A line from the field notebook. */
const fieldnote = (text: string, source = 'fieldnote'): string =>
  `<blockquote class="verse"><p>“${text}”</p><cite>— ${source}</cite></blockquote>`;

const questions = (items: string[]): string =>
  `<aside class="questions"><p class="questions__title">questions still open</p><ul>${items.map((q) => `<li>${q}</li>`).join('')}</ul></aside>`;

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
<blockquote class="pull-quote"><p>In Delhi I avoid every one of these things. Here, I was happy to burn in them. What changed?</p></blockquote>
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
  {
    id: 2,
    slug: 'nizamuddin-dargah-oral-history',
    title: 'Nizamuddin Dargah: music, market and mannat at a living Sufi shrine',
    excerpt:
      'An oral history and photographic documentation — how music, faith, commerce and everyday human interaction keep Nizamuddin Dargah alive as a heritage across generations.',
    category: 'Culture',
    date: '2026-09-25',
    readTime: 12,
    image: 'images/blog/nizamuddin/cover.jpg',
    imageAlt: 'The gold dome of Nizamuddin Dargah lit at dusk above a crowd of pilgrims',
    featured: false,
    tags: ['Nizamuddin', 'Delhi', 'Sufi', 'Qawwali', 'Oral History'],
    content: `
<p class="lede">How do music, faith, commerce and everyday human interactions sustain Nizamuddin Dargah as a living cultural heritage across generations?</p>
<p>This volume gathers photographs, sensory fieldnotes and research questions collected during fieldwork at the shrine of Hazrat Nizamuddin Auliya in Delhi, undertaken to document the intergenerational Qawwali tradition, the bazaar economy that surrounds it, the daily rituals of devotion, and the diversity of people who gather here. It is offered as a working record — a first layer of documentation to be deepened by further interviews, return visits and longer listening.</p>
<p><em>Documentation approach: oral histories · street photography · environmental sound recording · short video interviews · participant observation.</em></p>
<h3>Preface</h3>
<p>The streets smelled of rose petals and attar for the full four hundred metres leading to the shrine. Chadar-sellers, attar-merchants, hookah and lamp stalls, vendors of Urdu poetry and of Rooh Afza to cut the Delhi humidity — the walk in is itself a threshold, a slow undressing of the outside world before the inner courtyard.</p>
${nz('dome-at-dusk', 'The lit gold dome of the shrine above a crowd in the courtyard at dusk', 'The gold dome at dusk, above the courtyard crowd.', 'tall', 1073, 1200)}

<p class="kicker">prologue</p>
<h2>Threshold</h2>
<p class="deva">The four hundred metres in</p>
<h3>Rose petals and silver mirror-work</h3>
<p>You smell Nizamuddin Basti before you see it. For the full four hundred metres from the main road to the shrine, the lane narrows and thickens with scent — crushed rose petals underfoot, attar being uncorked a dozen times a minute, the green sweetness of paan. Shopfronts lean into the walkway selling chadars in every colour of devotion, loose rose petals by the kilo, small glass vials of attar, silver rings, hookah pipes, brass lamps, slim volumes of Urdu poetry, and bottles of Rooh Afza sold cold to cut the Delhi humidity.</p>
<p>The lane performs a kind of sorting. Tourists photograph the shopfronts; regulars walk through them without a glance, chadars already folded over their arms, headed somewhere specific. By the time the passage narrows into the silver mirror-work of the final archways — inscribed with the saint’s titles, Sultan-ul-Mashaikh, and with the name of his most devoted disciple, Amir Khusrau — the crowd has stopped being a crowd of shoppers and become a crowd of pilgrims.</p>
<p>This threshold is where this documentation begins: not at the tomb itself, but in the commerce, noise and negotiation that precede it, because at Nizamuddin the two are never really separate.</p>
${fieldnote('The streets smelled like rose petals and attar throughout the 400m stretch to the Dargah.', 'fieldnote, day one')}
${pair(
  nz('khusrau-gate', 'A mirrored archway inscribed with the name of Hazrat Amir Khusrau, pilgrims passing through', 'The archway bearing the name of Amir Khusrau, the saint’s most devoted disciple.', '', 1074, 1200),
  nz('inner-gate', 'A mirrored archway near the inner gates, chadars in green, red and gold hanging beyond', 'The inner gate: the mirrored archway near the shrine’s inner gates, inscribed with the titles of Hazrat Khwaja Syed Nizamuddin. Chadars in green, red and gold hang just beyond, waiting to be carried in.'),
)}

<p class="kicker">i · music, memory, inheritance</p>
<h2>Qawwali</h2>
<p class="deva">What the voice carries forward</p>
<h3>A lineage sung, not written</h3>
<p>Qawwali was not born as background music for a shrine; it was assembled, quite deliberately, by one man in service of another. Amir Khusrau — poet, musician, and the most devoted disciple of Hazrat Nizamuddin Auliya — fused Persian Sufi poetry with Indian melodic form, is credited with bringing the tabla into the ensemble, and shaped the call-and-response structure that still defines the form seven hundred years later. The first assemblies of this kind were held in the courtyard of Hazrat Nizamuddin’s own khanqah, within walking distance of where the Thursday qawwali still happens today.</p>
<p>The men who sing it now, many from the Nizami family, describe themselves as inheritors rather than performers — the repertoire, the ragas, the manner of building a phrase until it breaks open into ecstasy (a state called <em>hal</em>) is understood to have passed from father to son for roughly seven hundred years, interrupted only by war. The sessions begin after the Maghrib prayer and can run for hours; on Thursdays, and especially during the Urs, they run longest.</p>
<p>This documentation did not yet capture a full interview with a hereditary qawwal or with the custodians who sit in the small rooms adjoining the shrine — men like those photographed here, in conversation just steps from where the music happens. That conversation remains the single most important one still to be had.</p>
${fieldnote('Every Thursday there is qawwali, and a lot of youth come, showing a renewed interest in faith despite the crowd, the push and pull, the heat. Youth were here.')}
${pair(
  nz('courtyard-crowd', 'Pilgrims seated across the shrine courtyard at dusk', 'The courtyard fills toward evening, within walking distance of where the first qawwali assemblies were held.', '', 1074, 1200),
  nz('hujra', 'Elders seated on a green carpet in a small room adjoining the shrine', 'Keepers of the room: the Hujra of Imam Sahab, Khwaja Syed Islam Nizami — a small green-carpeted room where custodians and elders sit in ongoing, informal conversation. It is in rooms like this, as much as on the qawwali stage, that the shrine’s institutional memory is kept.'),
)}
${questions([
  'What stories do hereditary Qawwals remember about their ancestors, and how has the repertoire changed across generations?',
  'What is the significance of Amir Khusrau’s poetry in contemporary Qawwali, and how much of it is still legible to a young audience?',
  'What does <em>sama</em> — spiritual listening — mean to the performers themselves, distinct from what it means to the audience?',
  'What unspoken conventions govern the space between Qawwals and devotees?',
])}

<p class="kicker">ii · livelihoods, cultural memory</p>
<h2>The bustling bazaar</h2>
<p class="deva">Where commerce and faith share a counter</p>
${nz('chadar-lane', 'A packed lane lined floor to ceiling with chadars and prayer cloths', 'Chadars in every colour of devotion, stacked to the roof of the lane.', 'tall', 1074, 1200)}
<h3>Flowers, cloth, and a kind of devotion</h3>
<p>Nothing sold in the lanes around Nizamuddin reads as purely commercial. The rose petals piled high on steel plates, the chadars folded in jewel-toned stacks, the small bottles of attar decanted by hand from larger flasks — each is a transaction, yes, but also a preparation, an offering-in-waiting. A shopkeeper weighing petals is also, in a sense, readying someone else’s prayer.</p>
<p>The goods themselves map a whole devotional economy: chadars to be laid over the grave, rose petals and loose flowers, attar in dozens of scents, silver rings, hookah pipes and brass lamps for the home, slim volumes of Urdu poetry, and bottles of Rooh Afza sold to visitors wilting in the heat. Many of these stalls, run by the same families for generations, sit closer to the shrine than any tourist shop would be permitted — proximity here is inherited, not leased.</p>
<p>Inside the shrine premises itself, a young attar-seller kept up an unhurried patter with visitors, dabbing scent onto offered wrists between sales — warm and unbothered by the crowd pressing in around his small table, in a way that felt less like salesmanship than hospitality.</p>
${fieldnote('A very sweet bhaijaan was selling attar inside the Dargah premises. Beautiful smells.')}
${pair(
  nz('rose-petals', 'A shopkeeper sorting rose petals beneath shelves of embroidered chadars', 'A shopkeeper sorts fresh rose petals beneath shelves of embroidered chadars and prayer cloths — the two most-purchased offerings at the shrine, sold side by side.'),
  nz('attar-seller', 'A young attar-seller behind a counter of cut-glass bottles', 'Inside the Dargah premises, a young attar-seller measures scent from cut-glass bottles — the “sweet bhaijaan” of the fieldnotes, working a counter lined with his day’s stock.'),
)}
${pair(
  nz('market-lane', 'A crowded market lane with chadar stalls and mounds of rose petals', 'The market lane thickens into a single, slow-moving current of shoppers and pilgrims — bead-sellers, chadar stalls and mounds of rose petals on either side, everyone headed, eventually, the same way.'),
  nz('offering-plate', 'A plate of rose petals, cotton wicks, incense and a fragrance packet held out', 'The offering plate: rose petals, cotton wicks, a stick of incense and a small packet of fragrance, assembled and handed over in a single practised motion.'),
)}
${questions([
  'How long have families of flower-sellers, chadar-vendors and attar-merchants been associated with the Dargah, and how has that market changed across generations?',
  'How do the market’s rhythms shift on Thursdays, during festivals, and during the annual Urs?',
  'What stories do shopkeepers remember about the neighbourhood and its changing character?',
])}

<p class="kicker">iii · adab, khidmat, devotion</p>
<h2>Everyday rituals</h2>
<p class="deva">The unwritten grammar of a shrine</p>
<h3>Threads, smoke, and the shape of a wish</h3>
<p>Under the green awning outside the main sanctum, rows of men prayed shoulder to shoulder, the coolers along the wall roaring against the heat. Inside, a woman turned the pages of a hand-held Qur’an section, her child’s finger following the line of Arabic across the paper — recitation here is as often taught in this small, physical way, page held between two sets of hands, as it is learned in any formal setting.</p>
${nz('friday-prayer', 'The covered courtyard filled with men at Friday prayer', 'Friday prayer fills the covered courtyard to its edges; men who arrive too late to find floor space stand at the back beneath the tent.', 'wide', 1200, 900)}
<p>At the marble jali screens that ring the inner sanctum, the shrine’s most visible ritual unfolds continuously: devotees tie a length of red-and-gold thread to the carved lattice as a mark that a prayer has been offered — a <em>mannat</em>, a wish laid before the saint, to be untied and returned in gratitude if it is granted. Bangles, folded chits of paper and small photographs are pressed into the stonework alongside the threads, a cumulative record of thousands of private hopes.</p>
<p>Nearby, an elderly attendant tended a small brazier of heated oil, smoke rising in a steady column; devotees leaned in, cupping the smoke in their hands to pass over their heads and shoulders — a gesture of seeking <em>barkat</em>, blessing, understood by everyone present without needing to be explained.</p>
${fieldnote('Women were tying threads and crying for their mannat to come true. An old Muslim uncle was heating oil, smoke was coming out, but people were gathered to take it and put it on their heads or bodies.')}
${pair(
  nz('mannat', 'A woman pressing her hands to the marble jali to tie a thread, an infant asleep beside her', 'The mannat: a woman presses her hands to the marble jali to tie a thread, a sleeping infant close beside her. The screen itself has become a kind of ledger — every knot a wish still waiting, or already answered.'),
  nz('lattice', 'Threads, bangles and folded notes crowding a lattice beneath a plaque', 'The lattice: threads, bangles and folded notes beneath a plaque naming the twelve Imams and the Ahl al-Bayt — devotion layered directly onto the architecture, without any single hand curating it.'),
)}
${pair(
  nz('quran-hands', 'A section of the Qur’an held open between two pairs of hands', 'A section of the Qur’an held between two sets of hands — recitation passed on here by proximity as much as by instruction.'),
  nz('green-awning', 'Rows of men praying under a green awning, coolers along the wall', 'Under the green awning outside the main sanctum, rows of men pray shoulder to shoulder.', '', 1073, 1200),
)}
${questions([
  'What does an ordinary day look like here, from morning preparation to evening gathering, and who is responsible for each part of it?',
  'What are the unwritten rules of <em>adab</em> (respect) and <em>khidmat</em> (service) that visitors are expected to simply absorb rather than be taught?',
  'Which rituals or customs have changed, disappeared, or survived intact across generations?',
])}

<p class="kicker">iv · presence, access, belonging</p>
<h2>Diversity of faiths</h2>
<p class="deva">Who gathers here, and where they stand</p>
<h3>A space held differently by different people</h3>
<p>The crowd at Nizamuddin is not one crowd but many, overlapping: Muslim families who have visited for generations, Hindu and Sikh visitors drawn by the saint’s reputation for granting wishes regardless of the petitioner’s faith, first-time tourists photographing the gold dome, and regulars who move through the courtyard without needing to look up. People were, on the whole, amicable with one another — but the sheer density of the crowd, especially near the inner gates, put everyone slightly on edge, a kind of good-natured impatience rather than any real hostility.</p>
<p>One pattern was hard to miss: men managed the physical space — directing the queue, controlling the flow at the inner sanctum, tending the oil-smoke — while women, in far greater numbers, filled the courtyards, corridors and jali screens around the edges: reciting, waiting, crying at the lattice. At many Sufi shrines, including this one, women gather in overwhelming numbers in every space except the innermost chamber holding the grave itself, which remains for men only. The devotion is unmistakably, visibly theirs; the final threshold is not — a gap this documentation should return to, and ask women directly about, rather than answer from the outside.</p>
<p>Children were everywhere in the outer spaces — mostly with their mothers, some old enough to be given small jobs, like packing sweet <em>tabarruk</em> into paper twists to be handed out, a small act of service learned early and without ceremony.</p>
${fieldnote('A lot of children were present, usually with their moms who were sitting in groups on the sidelines of the main Dargah while men were working and managing it. Isn’t Dargah all about women though? I was confused.')}
${pair(
  nz('women-jali', 'Women gathered at a corridor jali beneath a sign for the women’s space', 'Women gather at a corridor jali beneath a sign marking the space reserved for them — present in overwhelming numbers throughout the outer courtyards and corridors.'),
  nz('woman-reading', 'A woman reading aloud from a printed Qur’an section near golden pillars', 'A woman reads aloud from a printed Qur’an section near the golden pillars of the sanctum’s outer wall, a red thread-tied lattice just visible beside her.'),
)}
${pair(
  nz('the-steps', 'Young visitors resting on marble steps outside the tomb enclosure', 'The steps: young visitors rest outside the inner tomb enclosure, phones out, unhurried — the same generation that arrives in numbers for Thursday qawwali, treating the shrine as a place to belong to rather than only to observe.'),
  nz('knee-height', 'Two children looking up from among a crowd of adults', 'At knee height: two children look up mid-scene, half-lost in a crowd of adults — a reminder of how much of a shrine’s daily life happens at knee height, unrecorded, easy to miss.'),
)}
${questions([
  'How do women themselves describe their relationship to a space they fill so visibly but cannot fully enter?',
  'What brings people of different religions and regions to this shrine, and are there personal stories of healing or belonging they would be willing to share?',
])}

<p class="kicker">v · what the formal interview misses</p>
<h2>The stories between the stories</h2>
<p class="deva">In the narrow lanes</p>
<h3>What happens in the gaps</h3>
<p>Some of the most legible material from this visit did not happen inside the shrine at all, but in the lanes just outside it after dark: incense smoke curling up past a stall of hanging chadars, a woman lighting a small lamp on an upturned table while her daughter watched, the particular quality of noise that a market makes when it is simultaneously a place of business and a place of prayer. A formal interview, conducted sitting down with a recorder running, will likely never capture this texture as well as simply standing in the lane at dusk and watching it happen.</p>
${nz('lanes-at-dusk', 'Incense smoke rising past stalls of hanging chadars in a lane after dark', 'In the lanes after dark: incense smoke curling up past a stall of hanging chadars.', 'tall', 1074, 1200)}
<p>This is deliberately the shortest and least resolved section of this documentation, because it is meant to function as a list of what still needs doing rather than a finished account. Several groups of people who shape daily life at the Dargah were seen constantly and interviewed not at all: the flower-sellers and attar-merchants who open before dawn; the men who fold and re-hang chadars all day; the cleaners who keep the marble passable underfoot; the children packing tabarruk; the women who sit for hours at the jali. Their accounts, more than any other single addition, would deepen everything gathered here.</p>
${fieldnote('People were amicable but the extreme crowd made them a bit on edge.')}
${questions([
  'What happens in the narrow lanes between the market and the shrine — the interruptions, the spontaneous encounters, the small acts of generosity or negotiation — that a formal interview would miss?',
  'Whose stories remain unheard: street vendors, cleaners, children, women, long-time residents of the Basti?',
  'What do gestures and silences reveal that words do not?',
])}

<p class="kicker">afterword</p>
<h2>A working record</h2>
<p class="deva">Not a finished one</p>
<p>This is a first pass. It was built from a single visit’s worth of photographs and sensory fieldnotes, organised against the five research threads that opened this project: the Qawwali tradition and its hereditary keepers; the bazaar economy that surrounds and sustains the shrine; the everyday rituals of thread, smoke and recitation; the diversity of people who gather here and the different ways this space is held by them; and the unscripted life of the lanes in between. None of the five is complete. Each is intended as scaffolding for the oral history interviews, longer observation sessions and sound recordings that should follow.</p>
<p>A note on the images: none were staged. Faces of devotees mid-prayer or mid-ritual appear because that is what was in front of the camera in a public, crowded shrine; no one was asked to pose. Any future published or shared version of this documentation should return to those photographed, where possible, for consent and for their own account of what the camera caught.</p>
<blockquote class="pull-quote"><p>How do music, faith, commerce and everyday human interaction sustain Nizamuddin Dargah as a living heritage, across generations that keep arriving — even now?</p></blockquote>
<p>The central research question this project set out to answer remains open, as it probably should.</p>
<p><em>Method: oral histories · street photography · environmental sound recording · short video interviews · participant observation, conducted in the lanes and courtyards of Nizamuddin Basti, Delhi.</em></p>
`,
  },
];
