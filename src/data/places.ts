import fortImg from "@/assets/place-fort.jpg";
import palaceImg from "@/assets/place-palace.jpg";
import tansenImg from "@/assets/place-tansen.jpg";
import sasbahuImg from "@/assets/place-sasbahu.jpg";
import teliImg from "@/assets/place-teli.jpg";
import gopachalImg from "@/assets/place-gopachal.jpg";
import panoFort from "@/assets/pano-fort.jpg";
import panoPalace from "@/assets/pano-palace.jpg";
import panoTansen from "@/assets/pano-tansen.jpg";
import panoSasbahu from "@/assets/pano-sasbahu.jpg";
import panoTeli from "@/assets/pano-teli.jpg";
import heroFort from "@/assets/hero-fort.jpg";

export type Category = "Forts" | "Palaces" | "Temples" | "Memorials" | "Rock Art";

export type Hotspot = {
  id: string;
  /** horizontal position across the panorama, 0-100 */
  x: number;
  /** vertical position, 0-100 */
  y: number;
  title: string;
  text: string;
};

export type Place = {
  slug: string;
  name: string;
  category: Category;
  era: string;
  tagline: string;
  summary: string;
  story: string[];
  timings: string;
  entryFee: string;
  bestTime: string;
  duration: string;
  address: string;
  coords: { lat: number; lng: number };
  image: string;
  gallery: string[];
  panorama?: { image: string; label: string; hotspots: Hotspot[] };
  nearby: string[];
};

/**
 * Placeholder heritage content for the hackathon build — figures are indicative
 * and should be replaced with verified ASI / MP Tourism data and real photography.
 */
export const places: Place[] = [
  {
    slug: "gwalior-fort",
    name: "Gwalior Fort",
    category: "Forts",
    era: "6th century onwards",
    tagline: "The sandstone citadel that gave Gwalior its name",
    summary:
      "A hill fortress spread across a flat-topped sandstone plateau, holding palaces, temples and rock-cut sculpture within a single wall.",
    story: [
      "Rising almost 100 metres above the plains, Gwalior Fort has been fought over by the Tomars, the Mughals, the Marathas and the Scindias. Its ramparts stretch for kilometres along the ridge, and the climb up the eastern approach passes gateway after gateway.",
      "Man Singh Palace, built for the Tomar ruler Man Singh in the late 15th century, is the fort's most photographed face — bands of turquoise and yellow glazed tiles run across its facade in rows of ducks, elephants and tigers.",
      "Below the living quarters lie cool underground chambers where the court sheltered from the summer heat, and a plateau scattered with temples spanning six centuries of building.",
    ],
    timings: "8:00 AM – 6:00 PM, daily",
    entryFee: "₹75 (Indian) · ₹250 (foreign national)",
    bestTime: "October to March, early morning",
    duration: "3 – 4 hours",
    address: "Gwalior Fort Road, Gwalior, Madhya Pradesh 474008",
    coords: { lat: 26.2299, lng: 78.1699 },
    image: fortImg,
    gallery: [fortImg, heroFort, panoFort],
    panorama: {
      image: panoFort,
      label: "Man Singh Palace courtyard",
      hotspots: [
        {
          id: "tiles",
          x: 47,
          y: 40,
          title: "The tiled facade",
          text: "Rows of glazed turquoise and yellow tiles depict ducks, elephants, peacocks and banana trees — a Tomar-era decorative language rarely seen elsewhere in central India.",
        },
        {
          id: "court",
          x: 22,
          y: 55,
          title: "Open courtyard",
          text: "Courts like this one organised palace life: audiences and music in the shaded colonnades, ceremony in the open centre.",
        },
        {
          id: "chambers",
          x: 78,
          y: 52,
          title: "Lower chambers",
          text: "Stairs from the colonnade lead to underground rooms used as cool retreats in summer and, later, as prison cells.",
        },
      ],
    },
    nearby: ["sas-bahu-temple", "teli-ka-mandir", "gopachal-parvat"],
  },
  {
    slug: "jai-vilas-palace",
    name: "Jai Vilas Palace",
    category: "Palaces",
    era: "1874",
    tagline: "European grandeur in the Scindia court",
    summary:
      "The Scindia residence and museum, famous for its Durbar Hall, gilded interiors and a pair of enormous crystal chandeliers.",
    story: [
      "Commissioned by Jayajirao Scindia in 1874, Jai Vilas Palace borrows freely from Tuscan, Italian-Doric and Corinthian architecture — a deliberate statement of a princely state at the height of its wealth.",
      "The Durbar Hall is the centrepiece: gold leaf across the ceilings, mirrored walls, and two chandeliers said to be among the largest in the world, hung only after elephants were walked across the roof to test it.",
      "Part of the palace is now the Jiwaji Rao Scindia Museum, displaying royal carriages, weapons, textiles and the celebrated silver model train that once carried after-dinner drinks around the banquet table.",
    ],
    timings: "10:00 AM – 5:00 PM, closed Wednesdays",
    entryFee: "₹300 (Indian) · ₹800 (foreign national)",
    bestTime: "Late morning, on a weekday",
    duration: "2 hours",
    address: "Jayendraganj, Lashkar, Gwalior, Madhya Pradesh 474009",
    coords: { lat: 26.2118, lng: 78.1653 },
    image: palaceImg,
    gallery: [palaceImg, panoPalace],
    panorama: {
      image: panoPalace,
      label: "Durbar Hall",
      hotspots: [
        {
          id: "chandelier",
          x: 50,
          y: 26,
          title: "The great chandeliers",
          text: "Each chandelier carries hundreds of candle-lamps and weighs several tonnes. The roof was tested with elephants before they were installed.",
        },
        {
          id: "throne",
          x: 62,
          y: 52,
          title: "The throne dais",
          text: "State audiences were held here, with the ruler seated on a raised gilded dais beneath the painted ceiling.",
        },
        {
          id: "gilding",
          x: 15,
          y: 34,
          title: "Gold leaf ceiling",
          text: "Craftsmen applied gold leaf over plaster mouldings, with painted medallions between the ribs of the vault.",
        },
      ],
    },
    nearby: ["tansen-tomb", "gwalior-fort"],
  },
  {
    slug: "tansen-tomb",
    name: "Tomb of Tansen",
    category: "Memorials",
    era: "16th century",
    tagline: "Where Gwalior's musical lineage rests",
    summary:
      "The sandstone tomb of Tansen, the legendary musician of Akbar's court, set in a quiet walled garden beside the tomb of his teacher.",
    story: [
      "Tansen was born near Gwalior and trained in the city's musical tradition before joining the court of Emperor Akbar as one of its nine jewels. The dhrupad style he carried forward is still associated with the Gwalior gharana.",
      "His tomb is modest by Mughal standards — an arched sandstone chamber with a low dome — and stands within the larger complex of the tomb of the Sufi saint Muhammad Ghaus, his spiritual teacher.",
      "Every winter the Tansen Samaroh music festival brings classical musicians from across India to perform here through the night, keeping the site culturally alive rather than merely preserved.",
    ],
    timings: "Sunrise to sunset, daily",
    entryFee: "Free",
    bestTime: "December, during Tansen Samaroh",
    duration: "45 minutes",
    address: "Hazira, Behat Road, Gwalior, Madhya Pradesh 474001",
    coords: { lat: 26.2333, lng: 78.1861 },
    image: tansenImg,
    gallery: [tansenImg, panoTansen],
    panorama: {
      image: panoTansen,
      label: "Tomb garden",
      hotspots: [
        {
          id: "tomb",
          x: 46,
          y: 42,
          title: "The tomb chamber",
          text: "A square chamber with pointed arches on each face, crowned by a shallow dome — an early Mughal form built in local sandstone.",
        },
        {
          id: "tamarind",
          x: 63,
          y: 30,
          title: "The tamarind tree",
          text: "Singers have long chewed leaves from the tamarind beside the tomb, believing they lend something of Tansen's voice.",
        },
        {
          id: "ghaus",
          x: 33,
          y: 46,
          title: "Toward Muhammad Ghaus",
          text: "The larger tomb of the Sufi saint Muhammad Ghaus, Tansen's teacher, stands in the same walled enclosure.",
        },
      ],
    },
    nearby: ["jai-vilas-palace", "gwalior-fort"],
  },
  {
    slug: "sas-bahu-temple",
    name: "Sas Bahu Temple",
    category: "Temples",
    era: "1093 CE",
    tagline: "Twin temples of dense, patient carving",
    summary:
      "A pair of 11th-century Vishnu temples inside the fort, celebrated for tiered pillared halls and pierced stone screens.",
    story: [
      "The name is a local corruption of Sahastrabahu — the thousand-armed form of Vishnu — later retold as 'mother-in-law and daughter-in-law' for the larger and smaller shrine.",
      "Built under the Kachchhapaghata dynasty in 1093 CE, the larger temple rises through three storeys of carved brackets and lintels, with jali screens filtering the light inside.",
      "From the temple platform the ground drops away to the city below, which makes the site one of the best places on the fort to watch late-afternoon light move across the stone.",
    ],
    timings: "8:00 AM – 5:30 PM, daily",
    entryFee: "Included with Gwalior Fort ticket",
    bestTime: "Late afternoon for the carving shadows",
    duration: "45 minutes",
    address: "Gwalior Fort complex, Gwalior, Madhya Pradesh 474008",
    coords: { lat: 26.2255, lng: 78.1735 },
    image: sasbahuImg,
    gallery: [sasbahuImg, panoSasbahu],
    panorama: {
      image: panoSasbahu,
      label: "Temple platform",
      hotspots: [
        {
          id: "pillars",
          x: 40,
          y: 45,
          title: "Carved pillars",
          text: "Each pillar is worked from base to bracket with foliage, dancers and miniature architectural motifs, no two panels quite alike.",
        },
        {
          id: "jali",
          x: 70,
          y: 50,
          title: "Jali screens",
          text: "Pierced stone screens cut the harsh light into patterns and keep the interior halls cool through the day.",
        },
        {
          id: "view",
          x: 55,
          y: 60,
          title: "View over the city",
          text: "The platform edge looks north over Gwalior — the reason this corner of the fort is busiest near sunset.",
        },
      ],
    },
    nearby: ["gwalior-fort", "teli-ka-mandir"],
  },
  {
    slug: "teli-ka-mandir",
    name: "Teli Ka Mandir",
    category: "Temples",
    era: "8th – 9th century",
    tagline: "The tallest, strangest temple on the fort",
    summary:
      "A roughly 30-metre temple whose barrel-vaulted roof mixes north and south Indian building traditions.",
    story: [
      "Teli Ka Mandir is the oldest surviving structure of consequence on the fort plateau, and the tallest. Its wagon-vaulted roof follows a South Indian shala form, while the wall sculpture is firmly north Indian.",
      "The origin of the name is unsettled — readings range from a community of oil-millers who funded it, to a Telangana connection through the builders.",
      "The doorway is framed by bands of carving nearly two storeys high, and the interior is a plain, striking, almost cave-like chamber by contrast.",
    ],
    timings: "8:00 AM – 5:30 PM, daily",
    entryFee: "Included with Gwalior Fort ticket",
    bestTime: "Morning, before the plateau heats up",
    duration: "30 minutes",
    address: "Gwalior Fort complex, Gwalior, Madhya Pradesh 474008",
    coords: { lat: 26.2231, lng: 78.1704 },
    image: teliImg,
    gallery: [teliImg, panoTeli],
    panorama: {
      image: panoTeli,
      label: "Temple plateau",
      hotspots: [
        {
          id: "roof",
          x: 50,
          y: 20,
          title: "Barrel-vaulted roof",
          text: "The curved shala roof is a southern form, unusual this far north, and gives the temple its distinctive silhouette.",
        },
        {
          id: "doorway",
          x: 57,
          y: 48,
          title: "The great doorway",
          text: "Concentric bands of river goddesses, foliage and guardian figures frame an otherwise austere entrance.",
        },
        {
          id: "ramparts",
          x: 80,
          y: 55,
          title: "Fort ramparts",
          text: "The walls trace the edge of the plateau, with stepped paths connecting the temples, tanks and palaces along the ridge.",
        },
      ],
    },
    nearby: ["gwalior-fort", "sas-bahu-temple"],
  },
  {
    slug: "gopachal-parvat",
    name: "Gopachal Parvat",
    category: "Rock Art",
    era: "15th century",
    tagline: "Colossal Jain figures cut from the cliff",
    summary:
      "Rows of monumental Jain Tirthankara statues carved directly into the sandstone flank of the fort hill.",
    story: [
      "More than a hundred Jain images were cut into the rock faces of the Gwalior hill during the Tomar period, the largest of them well over 10 metres tall.",
      "The figures are not built and placed but excavated — carvers worked inward from the cliff, shaping niche, canopy and seated figure from a single mass of stone.",
      "Several images were damaged in the 16th century and later partly restored, so the group reads as a record of both devotion and conflict.",
    ],
    timings: "7:00 AM – 6:00 PM, daily",
    entryFee: "Free",
    bestTime: "Early morning light on the cliff",
    duration: "45 minutes",
    address: "Urvai Gate approach, Gwalior Fort, Madhya Pradesh 474008",
    coords: { lat: 26.2214, lng: 78.1642 },
    image: gopachalImg,
    gallery: [gopachalImg],
    nearby: ["gwalior-fort", "teli-ka-mandir"],
  },
];

export const categories: Category[] = [
  "Forts",
  "Palaces",
  "Temples",
  "Memorials",
  "Rock Art",
];

export const getPlace = (slug: string) => places.find((p) => p.slug === slug);

export const virtualPlaces = places.filter((p) => p.panorama);

export const mapsLink = (place: Place) =>
  `https://www.google.com/maps/search/?api=1&query=${place.coords.lat},${place.coords.lng}`;

export const mapsEmbed = (place: Place) =>
  `https://www.openstreetmap.org/export/embed.html?bbox=${place.coords.lng - 0.01}%2C${
    place.coords.lat - 0.008
  }%2C${place.coords.lng + 0.01}%2C${place.coords.lat + 0.008}&layer=mapnik&marker=${
    place.coords.lat
  }%2C${place.coords.lng}`;
