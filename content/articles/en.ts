import { images } from '@/lib/images';
import type { Article } from '@/types';

/**
 * The KOJIKANE Journal — English.
 *
 * Slugs are shared with the Thai edition (content/articles/th.ts) so the
 * two versions pair up cleanly for hreflang. `category` also stays in
 * English in both files: it is a key, and the visible label comes from
 * `blog.categories.*` in the translation files.
 *
 * Inline links use [label](/path) with unprefixed paths — RichText adds
 * the locale prefix at render time.
 */
export const articlesEn: Article[] = [
  {
    slug: 'how-to-choose-glasses-for-your-face',
    title: 'How to Choose Glasses That Suit Your Face Shape',
    seoTitle: 'How to Choose Glasses That Suit Your Face Shape',
    metaDescription:
      'A practical guide to choosing glasses for round, oval, square, heart and long face shapes — plus the two measurements that matter more than shape.',
    excerpt:
      'Face shape is a useful starting point and a terrible rule. Here is how to use it — and the two measurements that matter more.',
    category: 'Style Guide',
    date: '2026-03-12',
    updated: '2026-07-02',
    readingMinutes: 7,
    image: images.journal['how-to-choose-glasses-for-your-face'],
    keywords: [
      'how to choose glasses for face shape',
      'glasses for round face',
      'eyeglass frames face shape',
      'choosing glasses Nonthaburi',
    ],
    relatedSlugs: ['how-to-choose-the-right-eyeglass-frame', 'everyday-glasses-trends'],
    body: [
      {
        type: 'paragraph',
        text: 'Almost everyone who walks into our shop asks the same question within the first two minutes: what suits my face? It is a good question, and the internet answers it badly. Face-shape charts are everywhere, they all disagree slightly, and none of them account for the fact that you have to wear the result every day.',
      },
      {
        type: 'paragraph',
        text: 'So here is how we actually use face shape at KOJIKANE — as a starting point that narrows a wall of frames down to a handful worth trying on, and nothing more than that.',
      },
      { type: 'heading', text: 'The one principle underneath every chart' },
      {
        type: 'paragraph',
        text: 'Frames work by contrast. A shape that differs from the outline of your face creates definition; a shape that repeats it tends to disappear. That is the whole idea. Round faces gain structure from angular frames. Square faces soften under curves. Everything else is detail.',
      },
      {
        type: 'paragraph',
        text: 'The second principle is balance: the frame should be roughly as wide as the widest part of your face, and the top line of the frame should sit near your brow line. Get those two right and a surprising range of shapes will work.',
      },
      { type: 'heading', text: 'Round face' },
      {
        type: 'paragraph',
        text: 'Soft jawline, similar width and length, fullest at the cheeks. Angular frames add the definition the face does not supply on its own.',
      },
      {
        type: 'list',
        items: [
          'Rectangular and square frames with a clean top line',
          'Slightly wider than tall, to draw the eye horizontally',
          'Frames with a defined brow bar or a heavier upper rim',
          'Avoid small round frames — they echo the face and shrink it',
        ],
      },
      { type: 'heading', text: 'Square face' },
      {
        type: 'paragraph',
        text: 'Strong jaw, broad forehead, angular corners. Curves soften; more angles compete.',
      },
      {
        type: 'list',
        items: [
          'Round, oval and panto shapes',
          'Thinner rims and lighter materials, so the jaw stays the strongest line',
          'Rimless and semi-rimless work particularly well',
          'Avoid heavy rectangular frames that repeat the jaw',
        ],
      },
      { type: 'heading', text: 'Oval face' },
      {
        type: 'paragraph',
        text: 'Balanced proportions, gently rounded. Almost everything works, which is less helpful than it sounds — with no shape ruled out, choose on style instead.',
      },
      {
        type: 'list',
        items: [
          'Frames that are as wide as the widest part of the face keep the balance intact',
          'A good opportunity for something with character: bold acetate, an unusual colour, a distinctive bridge',
          'Avoid frames so oversized that they cover the cheekbones',
        ],
      },
      { type: 'heading', text: 'Heart-shaped face' },
      {
        type: 'paragraph',
        text: 'Wider forehead narrowing to a delicate chin. The aim is to avoid adding weight at the top.',
      },
      {
        type: 'list',
        items: [
          'Frames wider at the bottom than the top, including rimless and semi-rimless',
          'Light metals and thin acetates',
          'Round or oval shapes to soften the forehead',
          'Avoid heavy top bars and decorated upper corners',
        ],
      },
      { type: 'heading', text: 'Long or rectangular face' },
      {
        type: 'paragraph',
        text: 'Longer than it is wide, with a straighter jaw. Width and depth shorten the face visually.',
      },
      {
        type: 'list',
        items: [
          'Deeper frames — more vertical lens height breaks up the length',
          'Bold or contrasting temples, which add width at the sides',
          'Oversized square and round shapes both work',
          'Avoid narrow, shallow frames that stretch the face further',
        ],
      },
      {
        type: 'callout',
        title: 'The measurement that beats every chart',
        text: 'Bridge fit. If the bridge is too wide the frame slides down your nose no matter how flattering the shape; too narrow and it pinches and leaves marks. This is the single most common reason people stop wearing glasses they liked in the mirror.',
      },
      { type: 'heading', text: 'Two things that matter more than shape' },
      { type: 'heading', level: 3, text: '1. Where the frame sits' },
      {
        type: 'paragraph',
        text: 'Your eyes should sit near the horizontal centre of the lens, slightly above it. The top rim should follow your brow rather than cut across it. The frame should not touch your cheeks when you smile. If a frame fails these, the shape is irrelevant.',
      },
      { type: 'heading', level: 3, text: '2. What you actually wear' },
      {
        type: 'paragraph',
        text: 'Glasses are on your face for every hour you are awake — more consistently than any other thing you own. A frame that fights your wardrobe and your working life will end up in a drawer. If you dress quietly, a statement frame may be exciting for a week and tiring by the second month. That is worth being honest with yourself about before you buy.',
      },
      { type: 'heading', text: 'Colour, briefly' },
      {
        type: 'paragraph',
        text: 'Warmer skin tones tend to sit well with honey, tortoiseshell, olive and gold. Cooler tones handle black, grey, clear and silver comfortably. But this is guidance, not law — the frames people love most often break it. Try the colour you are drawn to; you will know within seconds.',
      },
      { type: 'heading', text: 'Then come and try them on' },
      {
        type: 'paragraph',
        text: 'Everything above narrows the field. It cannot replace the moment you put a frame on, turn your head, and see whether it looks like you. That takes ten minutes in a shop with someone who will tell you the truth.',
      },
      {
        type: 'paragraph',
        text: 'If you are nearby, bring your prescription and come in. We will pull frames you would not have picked up yourself. You can read more about how we work in [our services](/services), browse [fashion eyewear](/eyewear/fashion) and [prescription eyewear](/eyewear/prescription), or [find the shop here](/contact).',
      },
    ],
  },

  {
    slug: 'fashion-glasses-vs-prescription-glasses',
    title: 'Fashion Glasses vs Prescription Glasses: What’s the Difference?',
    seoTitle: 'Fashion Glasses vs Prescription Glasses: What’s the Difference?',
    metaDescription:
      'Fashion glasses and prescription glasses differ in lenses, not frames. Here is what actually changes, and how to get both in one pair.',
    excerpt:
      'The difference is not the frame — it is what goes into it. And most frames can go either way.',
    category: 'Prescription',
    date: '2026-04-08',
    readingMinutes: 5,
    image: images.journal['fashion-glasses-vs-prescription-glasses'],
    keywords: [
      'fashion glasses vs prescription glasses',
      'non-prescription glasses',
      'plano lenses',
      'prescription eyewear Nonthaburi',
    ],
    relatedSlugs: ['how-to-choose-the-right-eyeglass-frame', 'how-to-choose-glasses-for-your-face'],
    body: [
      {
        type: 'paragraph',
        text: 'People often talk about fashion glasses and prescription glasses as if they were two different products. In practice they are usually the same frame with different lenses in it — and understanding that gives you a lot more freedom when choosing.',
      },
      { type: 'heading', text: 'What "fashion glasses" actually means' },
      {
        type: 'paragraph',
        text: 'Fashion glasses — sometimes called non-prescription or plano glasses — hold lenses with no corrective power. The lens is optically flat. It is there to complete the frame, to protect the eye from dust, and increasingly to carry a blue-light or light-tint coating.',
      },
      {
        type: 'paragraph',
        text: 'They are chosen for how they look. That is a legitimate reason to buy glasses, and it is why [our fashion eyewear selection](/eyewear/fashion) leans towards shapes with a point of view: sculptural acetate, coloured translucents, silhouettes that change the balance of a face.',
      },
      { type: 'heading', text: 'What changes with a prescription' },
      {
        type: 'paragraph',
        text: 'Once the lens has to correct your vision, three things start to matter that did not before.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Lens thickness. Stronger prescriptions produce thicker lenses. A higher-index material keeps them slimmer, and a smaller frame keeps them slimmer still.',
          'Optical centring. The optical centre of each lens has to line up with your pupil. That requires measurement, and it is why a prescription pair must be fitted rather than simply handed over.',
          'Frame depth and shape. Progressive lenses need vertical room for the reading zone. Very shallow frames cannot provide it, however good they look.',
        ],
      },
      {
        type: 'callout',
        title: 'The short version',
        text: 'Fashion glasses are chosen with your eyes. Prescription glasses are chosen with your eyes and measured for them.',
      },
      { type: 'heading', text: 'Can a fashion frame take prescription lenses?' },
      {
        type: 'paragraph',
        text: 'Very often, yes. Most well-made acetate and metal frames will accept prescription lenses without trouble. The frames that give difficulty are the extremes: very shallow shapes, strongly curved wrap styles, and rimless designs paired with high prescriptions, where the lens edge has to carry the mounting.',
      },
      {
        type: 'paragraph',
        text: 'If you already own a frame you love, bring it in. We will look at the shape, the material and your prescription and tell you honestly whether the result will be good. Sometimes the answer is no — a lens that ends up too thick for the rim, or a curve that distorts at the edges — and it is better to hear that before the work is done than after.',
      },
      { type: 'heading', text: 'Do you need two pairs?' },
      {
        type: 'paragraph',
        text: 'Not necessarily, but many people end up happier with two. A quieter frame for work and long screen days, and something with more character for everything else. The second pair also earns its place as a spare — glasses break at inconvenient moments.',
      },
      {
        type: 'paragraph',
        text: 'If you wear a prescription, there is no reason for it to be the unfashionable pair. Nearly every frame in [our prescription selection](/eyewear/prescription) was chosen because it looks good first and carries lenses well second.',
      },
      { type: 'heading', text: 'A note on blue-light and tinted lenses' },
      {
        type: 'paragraph',
        text: 'Blue-light filters and light tints can be added to plano lenses as easily as to prescription ones. Whether they help is a personal matter — some people find screens more comfortable with them, others notice nothing. We will fit them if you want them and we will not push them if you do not. What we will always recommend is an anti-reflective coating, because reduced glare is something you notice immediately, especially at night.',
      },
      { type: 'heading', text: 'Where to start' },
      {
        type: 'paragraph',
        text: 'Start with the frame. Find the shape that looks like you — [our guide to face shapes](/blog/how-to-choose-glasses-for-your-face) is a reasonable place to begin — and decide about lenses afterwards. In almost every case, the frame you fall for can be made to work.',
      },
      {
        type: 'paragraph',
        text: 'Bring your current prescription if you have one. If you are not sure what you need, come in and ask; [our lens consultation](/services) is free and takes about fifteen minutes.',
      },
    ],
  },

  {
    slug: 'how-to-choose-the-right-eyeglass-frame',
    title: 'How to Choose the Right Eyeglass Frame',
    seoTitle: 'How to Choose the Right Eyeglass Frame: Fit, Material & Size',
    metaDescription:
      'Frame width, bridge, temple length, material and weight — how to read the numbers inside your glasses and choose a frame that stays comfortable.',
    excerpt:
      'Fit is what separates glasses you wear from glasses you own. Here is what to look at, in order.',
    category: 'Frame Guide',
    date: '2026-05-20',
    readingMinutes: 6,
    image: images.journal['how-to-choose-the-right-eyeglass-frame'],
    keywords: [
      'how to choose eyeglass frames',
      'eyeglass frame size guide',
      'frame measurements explained',
      'acetate vs titanium frames',
    ],
    relatedSlugs: ['how-to-choose-glasses-for-your-face', 'how-to-take-care-of-your-eyeglasses'],
    body: [
      {
        type: 'paragraph',
        text: 'A frame can be the right shape and still be the wrong frame. Fit is what decides whether a pair of glasses becomes the one you reach for or the one that lives in a drawer — and fit is measurable.',
      },
      { type: 'heading', text: 'Read the numbers inside the temple' },
      {
        type: 'paragraph',
        text: 'Most frames carry three numbers printed on the inside of the temple arm, usually in the format 52▢18-145.',
      },
      {
        type: 'list',
        items: [
          'Lens width (52) — the width of one lens in millimetres.',
          'Bridge width (18) — the gap between the lenses, which is what sits on your nose.',
          'Temple length (145) — the length of the arm from hinge to tip.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If you already own glasses that fit well, these three numbers are the most useful thing you can bring to a shop. They will not tell you what looks good, but they will keep you from trying on frames that were never going to work.',
      },
      { type: 'heading', text: 'The order to judge fit in' },
      { type: 'heading', level: 3, text: 'Bridge first' },
      {
        type: 'paragraph',
        text: 'The bridge carries most of the weight. Too wide and the frame slides down, however tight the temples. Too narrow and it pinches and leaves red marks. A correct bridge holds the frame in place when you tip your head forward. Test that in the shop — look down at your feet and see what moves.',
      },
      { type: 'heading', level: 3, text: 'Then total width' },
      {
        type: 'paragraph',
        text: 'The frame should be about as wide as the widest part of your face, with the hinges sitting at or just inside the edge of your temples. If the arms have to bend outward to reach your ears, the frame is too narrow and will press on the sides of your head all day.',
      },
      { type: 'heading', level: 3, text: 'Then temple length' },
      {
        type: 'paragraph',
        text: 'The arm should run straight back and only begin to curve where it meets the top of your ear. Curving too early pushes the frame forward; too late and there is nothing holding it. This is one of the easiest things to adjust in store, which is exactly why glasses should be adjusted in store.',
      },
      { type: 'heading', level: 3, text: 'Then lens height' },
      {
        type: 'paragraph',
        text: 'Your eyes should sit slightly above the horizontal centre of the lens. If you wear or expect to wear progressive lenses, you need enough depth below the pupil for the reading zone — around 30mm of lens height is a sensible minimum, and shallower frames will not do the job.',
      },
      {
        type: 'callout',
        title: 'The five-second test',
        text: 'Put the frame on and shake your head gently, then look down. If it slides, it does not fit — no matter how good it looks while you stand still in front of the mirror.',
      },
      { type: 'heading', text: 'Material: what each one is good at' },
      {
        type: 'list',
        items: [
          'Acetate — plant-based plastic, warm to the touch, deep colours and tortoiseshell patterns. Holds bold shapes. Heavier, and can loosen in heat, but reshapes easily.',
          'Titanium — very light, strong and hypoallergenic. Ideal for stronger prescriptions where lens weight adds up, and for anyone who reacts to metal alloys.',
          'Beta titanium — flexible enough to spring back from a bend. Forgiving of daily handling.',
          'Stainless steel — slim, affordable, durable. Less flexible than titanium.',
          'Combination — a metal chassis with acetate details, which lets a frame be light without looking severe.',
        ],
      },
      { type: 'heading', text: 'Weight is comfort, and comfort takes hours to judge' },
      {
        type: 'paragraph',
        text: 'A frame that feels fine in the first minute may not feel fine in the eighth hour. Weight, weight distribution and where the pressure falls all matter more than the number on a scale. This is where lens choice comes back in: a high-index lens in a smaller frame can take a noticeable amount of weight off a strong prescription. We cover this in [fashion glasses vs prescription glasses](/blog/fashion-glasses-vs-prescription-glasses).',
      },
      { type: 'heading', text: 'Build a shortlist, not a decision' },
      {
        type: 'paragraph',
        text: 'Six frames is too many to choose between. Narrow to two, then walk away for five minutes and come back. Whichever one you look for first is usually the answer — people know more quickly than they think, and second-guessing tends to produce a safe choice rather than a good one.',
      },
      {
        type: 'paragraph',
        text: 'Bring a friend if you can. Bring your prescription if you have one. And expect to be told when something is not working — that is the useful part of buying glasses from people rather than a website.',
      },
      {
        type: 'paragraph',
        text: 'Our [frame fitting and adjustment](/services) is included with every pair bought at the shop, for as long as you own them. [Come and see us](/contact) on Samakkhi Road in Nonthaburi.',
      },
    ],
  },

  {
    slug: 'how-to-take-care-of-your-eyeglasses',
    title: 'How to Take Care of Your Eyeglasses',
    seoTitle: 'How to Take Care of Your Eyeglasses: Cleaning, Storage & Repair',
    metaDescription:
      'How to clean glasses without scratching the coating, what to keep away from them, and when to bring them in for adjustment.',
    excerpt:
      'Most scratched lenses are not accidents. They are cleaning habits. Here is what to do instead.',
    category: 'Eyewear Care',
    date: '2026-06-11',
    readingMinutes: 5,
    image: images.journal['how-to-take-care-of-your-eyeglasses'],
    keywords: [
      'how to clean glasses',
      'eyeglass care tips',
      'avoid scratched lenses',
      'glasses maintenance',
    ],
    relatedSlugs: ['how-to-choose-the-right-eyeglass-frame', 'everyday-glasses-trends'],
    body: [
      {
        type: 'paragraph',
        text: 'A good frame will outlast several prescriptions. Whether it does usually comes down to a handful of small habits — and the most damaging one is the way most people clean their lenses.',
      },
      { type: 'heading', text: 'Cleaning, properly' },
      {
        type: 'paragraph',
        text: 'Modern lenses carry coatings measured in microns: anti-reflective, hard coat, sometimes an oleophobic layer. Dry-wiping drags dust across that surface, and dust is harder than the coating. Those fine circular scratches people notice after a year are almost always self-inflicted.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Rinse the lenses under lukewarm running water first. This removes grit before anything touches the surface.',
          'Add one drop of plain washing-up liquid, or a purpose-made lens spray. Work it gently over both sides with your fingertips.',
          'Rinse thoroughly.',
          'Dry with a clean microfibre cloth, without pressing hard.',
        ],
      },
      {
        type: 'callout',
        title: 'Never use',
        text: 'Shirt hems, tissues, paper towels, glass cleaner, alcohol wipes, acetone or hot water. Paper products are wood fibre and will scratch. Ammonia-based cleaners strip coatings. Hot water can loosen the lens in the rim.',
      },
      { type: 'heading', text: 'Wash the cloth' },
      {
        type: 'paragraph',
        text: 'A microfibre cloth that has been in a bag for six months is a bag of grit. Wash it in warm water with a little detergent, rinse it well, and let it dry flat — no fabric softener, which clogs the fibres. Keep two, so one is always clean.',
      },
      { type: 'heading', text: 'Handling and storage' },
      {
        type: 'list',
        items: [
          'Take glasses off with both hands. One-handed removal twists the frame and is the main cause of misalignment.',
          'Put them down lenses up if there is no case to hand — never face down.',
          'Use a hard case in a bag. A soft pouch protects against dust, not pressure.',
          'Do not park them on your head. It stretches the temples and transfers hair oil onto the arms.',
          'Never leave them in a parked car. Heat softens acetate, and a warped frame is not always recoverable.',
        ],
      },
      { type: 'heading', text: 'Things that quietly damage frames' },
      {
        type: 'paragraph',
        text: 'Hairspray, perfume and sunscreen all attack acetate and lens coatings. Put your glasses on after you have finished getting ready, not before. Salt water and chlorine should be rinsed off the same day. Sweat is mildly corrosive to some metal alloys, which is one reason nose pads yellow.',
      },
      { type: 'heading', text: 'Bring them in — that is what the service is for' },
      {
        type: 'paragraph',
        text: 'Glasses move with wear. Temples splay, screws loosen, nose pads harden and discolour. None of this needs to be lived with, and none of it needs an appointment.',
      },
      {
        type: 'list',
        items: [
          'Frame sitting crooked or sliding down — a two-minute adjustment.',
          'Loose screw — tightened while you wait, before the lens falls out.',
          'Yellowed or hard nose pads — replaced; they are consumable parts.',
          'Cloudy film that will not clean off — usually a coating reaching the end of its life. We will tell you honestly whether it is worth replacing the lenses.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Adjustment, screws and pads are free for frames bought at KOJIKANE, for as long as you own them. Details are on [our services page](/services). If something has broken, bring the pieces — do not glue them. Adhesive on an acetate frame usually makes a proper repair impossible.',
      },
      { type: 'heading', text: 'A realistic replacement schedule' },
      {
        type: 'paragraph',
        text: 'Lenses tend to be the limiting factor: coatings wear, and prescriptions change. Two to three years of daily wear is typical before lenses are worth renewing. A well-made frame, looked after, will happily see out three sets of lenses — which is a good argument for buying one you genuinely like. Our thinking on that is in [how to choose the right eyeglass frame](/blog/how-to-choose-the-right-eyeglass-frame).',
      },
    ],
  },

  {
    slug: 'everyday-glasses-trends',
    title: 'Glasses Trends You Can Actually Wear Every Day',
    seoTitle: 'Glasses Trends You Can Actually Wear Every Day',
    metaDescription:
      'The eyewear shapes and colours worth adopting this year — and the ones that photograph well but wear badly.',
    excerpt:
      'Some trends survive contact with a working week. Most do not. These are the ones we keep recommending.',
    category: 'Trends',
    date: '2026-07-24',
    readingMinutes: 5,
    image: images.journal['everyday-glasses-trends'],
    keywords: [
      'eyewear trends',
      'glasses trends 2026',
      'everyday glasses style',
      'fashion eyewear Nonthaburi',
    ],
    relatedSlugs: ['how-to-choose-glasses-for-your-face', 'fashion-glasses-vs-prescription-glasses'],
    body: [
      {
        type: 'paragraph',
        text: 'Eyewear trends move slowly, which is a mercy — a frame is a two-year commitment at least. The useful question is not what is new, but what is new and still wearable on an ordinary Tuesday. These are the ones we find ourselves recommending again and again.',
      },
      { type: 'heading', text: '1. Translucent and tinted acetate' },
      {
        type: 'paragraph',
        text: 'Honey, smoke, olive, pale rose. Translucent acetate carries colour without the visual weight of solid black, so it reads as a considered choice rather than a statement. It also flatters a wider range of skin tones than solid colour does, because it lets some of your complexion through.',
      },
      {
        type: 'paragraph',
        text: 'Wearability: high. This is the trend we would recommend to someone buying their first frame with any real character.',
      },
      { type: 'heading', text: '2. Slim metal, back in a serious way' },
      {
        type: 'paragraph',
        text: 'After a decade of heavy acetate, thin titanium and stainless frames have returned — round, hexagonal and softly square. They are light, they suit almost every face because there is so little of them, and they sit comfortably under both formal and casual dress.',
      },
      {
        type: 'paragraph',
        text: 'Wearability: very high, with one caveat — thin metal shows misalignment more obviously than acetate. Have them adjusted when they start to sit crooked.',
      },
      { type: 'heading', text: '3. Squared-off shapes with soft corners' },
      {
        type: 'paragraph',
        text: 'The middle ground between a rectangle and a round frame: enough structure to define a soft face, enough curve not to harden an angular one. It is the shape we reach for when someone is unsure, and it dates slowly.',
      },
      { type: 'paragraph', text: 'Wearability: the safest interesting choice on this list.' },
      { type: 'heading', text: '4. Modest oversizing' },
      {
        type: 'paragraph',
        text: 'Larger lenses are still with us, but the extremes have receded. What remains is a frame slightly bigger than your face strictly requires — more presence, without the sunglasses-indoors effect.',
      },
      {
        type: 'paragraph',
        text: 'Wearability: good, if the frame width still matches your face. Oversized should mean deeper lenses, not wider arms. See [how to choose the right eyeglass frame](/blog/how-to-choose-the-right-eyeglass-frame) for what to check.',
      },
      { type: 'heading', text: '5. Two-tone and contrast temples' },
      {
        type: 'paragraph',
        text: 'A dark front with a lighter arm, or a metal chassis with acetate tips. The detail is invisible head-on and appears in profile, which is a quiet way to own an interesting frame without wearing a bold one.',
      },
      {
        type: 'paragraph',
        text: 'Wearability: high, and particularly good for anyone who wants something distinctive at work.',
      },
      {
        type: 'callout',
        title: 'Trends we would think twice about',
        text: 'Very small lenses sit awkwardly with progressive lenses and leave little room for peripheral vision. Strongly coloured tinted lenses indoors change how you read screens and how people read you. Ultra-thin wire rims look precise and bend easily. All can be worn well — just not by accident.',
      },
      { type: 'heading', text: 'How to buy into a trend without regretting it' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Check it against your face before your feed. A shape that suits you will still suit you in three years.',
          'Adopt one trend per frame, not three.',
          'If it is your only pair, choose the quieter version. If it is your second, go further.',
          'Wear it in the shop for five minutes, not five seconds.',
        ],
      },
      {
        type: 'paragraph',
        text: 'We keep a selection of the shapes above in store, in both plano and prescription form. Have a look at [fashion eyewear](/eyewear/fashion) and [prescription eyewear](/eyewear/prescription), then [come and try them](/contact) — a frame is very hard to judge from a photograph, including ours.',
      },
    ],
  },
];
