import { LuxuryProduct } from '../types/booking';
import { getAssetPath } from '../lib/assets';

export const luxuryCatalog: LuxuryProduct[] = [
  // ==========================================
  // BLUE HORSE ADVENTURES & ECO-TOURISM (مغامرات بيئية وهايكنج)
  // ==========================================
  {
    id: 'bh-moon-mountain-hike',
    category: 'adventures',
    slug: 'moon-mountain-sunset-hike',
    title: {
      en: 'Moon Mountain Sunset Hike & Stargazing',
      ar: 'هايكنج جبل القمر ورصد النجوم',
    },
    tagline: {
      en: 'Golden hour summit climb, campfire Bedouin dinner & telescope stargazing',
      ar: 'صعود قمة جبل القمر وقت الغروب، عشاء بدوي ورصد فلكي للنجوم',
    },
    description: {
      en: 'Embark on an unforgettable desert expedition to Moon Mountain (جبل القمر) in Usfan. Trek across dramatic wind-carved granite formations, reach the peak for sunset, and relax by the crackling campfire with Saudi coffee, dinner, and telescope observation of the cosmos.',
      ar: 'رحلة استكشافية مميزة إلى جبل القمر في عسفان. تسلق التكوينات الصخرية الخلابة وقت الغروب، واستمتع بأمسية بدوية دافئة حول موقد النار مع القهوة السعودية، العشاء اللذيذ، ورصد النجوم عبر التلسكوب.',
    },
    locationName: {
      en: 'Moon Mountain (Jabal Al-Qamar), Usfan Desert, Jeddah',
      ar: 'جبل القمر، صحراء عسفان، جدة',
    },
    marinaOrArea: 'moon_mountain',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 180,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Every Friday & Saturday (04:30 PM - 10:30 PM)',
    rating: 4.96,
    reviewsCount: 182,
    badge: {
      en: 'Signature Adventure',
      ar: 'مغامرة بلو هورس المميزة',
    },
    adventureSpecs: {
      difficulty: 'moderate',
      durationHours: 6,
      elevationGainMeters: 280,
      suitableForFamilies: true,
      meetingPoint: {
        en: 'Usfan Base Camp Gathering Point, Jeddah',
        ar: 'نقطة تجمع مخيم عسفان، جدة',
      },
      meetingTime: '04:30 PM',
      includedGear: [
        { en: 'Professional Mountain Guide', ar: 'مرشد جبلي محترف' },
        { en: 'Campfire BBQ Dinner & Saudi Coffee', ar: 'عشاء شواء على الحطب وقهوة سعودية' },
        { en: 'Telescope Astronomy Session', ar: 'جلسة رصد فلكي بالتلسكوب' },
        { en: 'First Aid & Trail Water', ar: 'حقيبة إسعافات أولية ومياه للشرب' },
      ],
      requiredGear: [
        { en: 'Sturdy Hiking Shoes', ar: 'حذاء هايكنج مريح ومناسب للمشي' },
        { en: 'Light Windbreaker Jacket', ar: 'سترة خفيفة للمساء' },
        { en: 'Small Backpack & Headlamp', ar: 'حقيبة ظهر صغيرة وكشاف رأس' },
      ],
      waiverRequired: true,
    },
    itinerary: [
      { time: '04:30 PM', activity: { en: 'Meeting & Registration at Base Camp', ar: 'التجمع والتسجيل في مخيم القاعدة' } },
      { time: '05:15 PM', activity: { en: 'Guided Hike Ascent through Moon Formations', ar: 'انطلاق الهايكنج عبر التكوينات القمرية' } },
      { time: '06:30 PM', activity: { en: 'Summit Sunset View & Golden Hour Photos', ar: 'الوصول للقمة ومشاهدة الغروب والتصوير' } },
      { time: '07:45 PM', activity: { en: 'Descent to Campfire & Bedouin Dinner', ar: 'النزول إلى موقد النار وتناول العشاء البدوي' } },
      { time: '09:00 PM', activity: { en: 'Telescope Stargazing & Acoustic Melodies', ar: 'رصد النجوم بالتلسكوب وأجواء طربية هادئة' } },
    ],
    tiers: [
      {
        id: 'tier-moon-standard',
        name: { en: 'General Hiker Pass', ar: 'تذكرة الهايكنج العامة' },
        description: { en: 'Guided hike, trail refreshments, summit photos & campfire gathering.', ar: 'جولة الهايكنج مع المرشد، مرطبات المسار، وصور القمة وجلسة موقد النار.' },
        price: 180,
        capacityTotal: 60,
        capacityRemaining: 14,
        perks: [
          { en: 'Certified mountain guide', ar: 'مرشد جبلي معتمد' },
          { en: 'Trail snacks & hydration', ar: 'وجبات خفيفة ومياه للمسار' },
          { en: 'Campfire gathering & Saudi coffee', ar: 'جلسة موقد نار وقهوة سعودية' },
        ],
      },
      {
        id: 'tier-moon-vip',
        name: { en: 'Explorer VIP Pass', ar: 'تذكرة المستكشف VIP' },
        description: { en: 'Full hike, campfire BBQ feast, telescope observation & trekking poles.', ar: 'هايكنج شامل، عشاء شواء متكامل، رصد فلكي بالتلسكوب وعصي المشي.' },
        price: 320,
        capacityTotal: 30,
        capacityRemaining: 6,
        popular: true,
        perks: [
          { en: 'Campfire BBQ Dinner feast', ar: 'وجبة عشاء شواء متكاملة' },
          { en: 'Telescope astronomy session', ar: 'جلسة رصد فلكي مخصصة' },
          { en: 'Complimentary trekking poles', ar: 'عصي مشي مخصصة للهايكنج' },
          { en: 'High-res summit photo pack', ar: 'باقة صور احترافية عالية الدقة' },
        ],
      },
      {
        id: 'tier-moon-group',
        name: { en: 'Private Group Majlis (5 Guests)', ar: 'مجلس المجموعة الخاص (5 أشخاص)' },
        description: { en: 'Exclusive guide for your group, private majlis tent, and catered dinner.', ar: 'مرشد خاص لمجموعتكم، خيمة مجلس خاصة، وعشاء متكامل.' },
        price: 1200,
        capacityTotal: 5,
        capacityRemaining: 2,
        perks: [
          { en: 'Private dedicated guide', ar: 'مرشد خاص بالمجموعة' },
          { en: 'Private furnished Bedouin tent', ar: 'خيمة مجلس بدوي مؤثثة خاصة' },
          { en: 'Full dinner service for 5', ar: 'خدمة عشاء متكاملة لـ 5 ضيوف' },
        ],
      },
    ],
  },
  {
    id: 'bh-beach-horseback-riding',
    category: 'adventures',
    slug: 'beach-horseback-riding-sunset',
    title: {
      en: 'Red Sea Beach Horseback Riding & Sunset Gallop',
      ar: 'ركوب الخيل على شاطئ البحر الأحمر وقت الغروب',
    },
    tagline: {
      en: 'Ride purebred Arabian horses along the pristine coastal shoreline',
      ar: 'جولة خيل أصيلة على رمال الشاطئ بمحاذاة أمواج البحر',
    },
    description: {
      en: 'Experience the exhilarating freedom of riding Arabian horses on the beaches of Obhur. Suitable for both beginners and experienced riders, with certified equestrian trainers, safety gear, and golden-hour photo sessions.',
      ar: 'عِش متعة صهيل الخيل الأصيل على شواطئ أبحر وقت الغروب. تجربة تناسب المبتدئين والمحترفين بإشراف مدربين فروسية معتمدين مع جلسة تصوير احترافية على الشاطئ.',
    },
    locationName: {
      en: 'Obhur North Beachfront, Jeddah',
      ar: 'شاطئ أبحر الشمالية، جدة',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 250,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Daily Sunset Sessions (05:00 PM - 07:00 PM)',
    rating: 4.98,
    reviewsCount: 215,
    badge: {
      en: 'Top Rated Adventure',
      ar: 'الأعلى تقييماً',
    },
    adventureSpecs: {
      difficulty: 'easy',
      durationHours: 1.5,
      suitableForFamilies: true,
      meetingPoint: {
        en: 'Blue Horse Equestrian Beach Center, North Obhur',
        ar: 'مركز بلو هورس للفروسية الشاطئية، أبحر الشمالية',
      },
      meetingTime: '04:45 PM',
      includedGear: [
        { en: 'Certified Equestrian Trainer', ar: 'مدرب فروسية معتمد' },
        { en: 'Riding Helmet & Safety Vest', ar: 'خوذة ركوب وسترة سلامة' },
        { en: 'Arabian Horse & Grooming', ar: 'خيل عربي أصيل مجهز' },
      ],
      requiredGear: [
        { en: 'Comfortable Long Pants', ar: 'بنطال طويل مريح' },
        { en: 'Closed-Toe Boots or Sneakers', ar: 'حذاء مغلق مناسب للفروسية' },
      ],
      waiverRequired: true,
    },
    tiers: [
      {
        id: 'tier-horse-standard',
        name: { en: '60-Min Sunset Ride', ar: 'جولة الغروب (60 دقيقة)' },
        description: { en: 'Guided shoreline ride with trainer assistance and basic photo moments.', ar: 'جولة بمحاذاة الشاطئ مع مدرب والتقاط صور تذكارية.' },
        price: 250,
        capacityTotal: 15,
        capacityRemaining: 4,
        perks: [
          { en: '60-minute beach riding', ar: '60 دقيقة ركوب على الشاطئ' },
          { en: 'Safety helmet & brief', ar: 'خوذة وإرشادات السلامة' },
          { en: 'Sunset shoreline moments', ar: 'لحظات استثنائية وقت الغروب' },
        ],
      },
      {
        id: 'tier-horse-vip',
        name: { en: 'VIP Golden Gallop & Pro Photo', ar: 'باقة الفارس VIP مع تصوير احترافي' },
        description: { en: '90-min private ride, professional photographer, and seaside hospitality.', ar: 'جولة 90 دقيقة خاصة، مصور فوتوغرافي محترف، وضيافة شاطئية.' },
        price: 450,
        capacityTotal: 8,
        capacityRemaining: 2,
        popular: true,
        perks: [
          { en: '90-minute extended ride', ar: 'جولة ممتدة 90 دقيقة' },
          { en: '10 edited high-res photos', ar: '10 صور احترافية معدلة' },
          { en: 'Private Arabian lounge hospitality', ar: 'ضيافة عربية في جلسة خاصة' },
        ],
      },
    ],
  },
  {
    id: 'bh-desert-safari-quads',
    category: 'adventures',
    slug: 'dune-buggy-desert-safari',
    title: {
      en: 'Golden Dunes Buggy & Desert Safari Expedition',
      ar: 'سفاري الكثبان الرملية ومغامرة الدبابات',
    },
    tagline: {
      en: 'High-adrenaline desert dunes, quad safari & Bedouin dinner',
      ar: 'إثارة لا متناهية على رمال الصحراء الذهبية وعشاء بدوي أصيل',
    },
    description: {
      en: 'Tackle the rolling sand dunes of Dahaban behind the wheel of powerful buggies and quads. Follow expert lead vehicles, carve through sandy ridges, and celebrate the adventure with a desert feast under the stars.',
      ar: 'انطلق في مغامرة شيقة على الكثبان الرملية الذهبية في صحراء ذهبان بقيادة دبابات وباجي صحراوي قوي، واختتم جولتك بعشاء بدوي ومشروبات ساخنة تحت السماء الصافية.',
    },
    locationName: {
      en: 'Dahaban Golden Dunes Arena, North Jeddah',
      ar: 'صحراء ذهبان، شمال جدة',
    },
    marinaOrArea: 'dahaban',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 280,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Thursday to Sunday (03:30 PM - 09:30 PM)',
    rating: 4.91,
    reviewsCount: 130,
    badge: {
      en: 'High Adrenaline',
      ar: 'مغامرة وإثارة',
    },
    tiers: [
      {
        id: 'tier-buggy-single',
        name: { en: 'Single Quad Bike Rider', ar: 'دباب فردي (سائق واحد)' },
        description: { en: 'Full quad bike rental, safety goggles, and 90 minutes of guided dunes.', ar: 'استئجار دباب فردي، نظارات واقية، وجولة إرشادية 90 دقيقة.' },
        price: 280,
        capacityTotal: 25,
        capacityRemaining: 8,
        perks: [
          { en: '450cc Quad bike', ar: 'دباب رملي سعة 450cc' },
          { en: 'Helmet & goggles', ar: 'خوذة ونظارات رملية' },
          { en: 'Lead guide & sweep car', ar: 'مرشد قائد وسيارة دعم' },
        ],
      },
      {
        id: 'tier-buggy-double',
        name: { en: 'Two-Seater Desert Buggy', ar: 'باجي صحراوي لشخصين' },
        description: { en: 'Roll-cage dune buggy for 2 guests with desert BBQ feast included.', ar: 'باجي رملي مصفح لشخصين مع وجبة عشاء شواء بدوي.' },
        price: 480,
        capacityTotal: 12,
        capacityRemaining: 3,
        popular: true,
        perks: [
          { en: 'High-performance Buggy', ar: 'باجي صحراوي عالي الأداء' },
          { en: 'Full BBQ dinner for 2', ar: 'عشاء شواء لشخصين' },
          { en: 'Desert lounge access', ar: 'دخول جلسة الاستراحة الصحراوية' },
        ],
      },
    ],
  },
  // ==========================================
  // BLUE HORSE ENTERTAINMENT & NIGHTLIFE (حفلات وسهرات)
  // ==========================================
  {
    id: 'bh-white-night-party',
    category: 'nightlife',
    slug: 'white-night-beach-festival',
    title: {
      en: 'White Night Beach Festival — All-White Party',
      ar: 'مهرجان الوايت نايت الشاطئي — ليلة باللون الأبيض',
    },
    tagline: {
      en: 'Jeddah’s premier all-white nightlife party with Saudi & international guest DJs',
      ar: 'الحفل الشاطئي الأبرز في جدة بالزي الأبيض مع أشهر منسقي الموسيقى عالمياً ومحلياً',
    },
    description: {
      en: 'Blue Horse’s iconic signature event. An electrifying seaside festival dressed entirely in white, featuring world-class DJ sets, live percussion, beachside pyrotechnics, and an unmatched high-energy crowd.',
      ar: 'الحدث السنوي الأيقوني من بلو هورس. احتفالية شاطئية استثنائية بالزي الأبيض بالكامل، مع عروض دي جي حية، إيقاعات نارية، وإضاءات ليزر مبهرة على ساحل البحر الأحمر.',
    },
    locationName: {
      en: 'Private Coastline Beach Stage, North Obhur, Jeddah',
      ar: 'مسرح الشاطئ الخاص، أبحر الشمالية، جدة',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 350,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: '2026-11-28 • 08:00 PM - 02:30 AM',
    rating: 5.0,
    reviewsCount: 310,
    badge: {
      en: 'Signature Nightlife',
      ar: 'حفل بلو هورس الأيقوني',
    },
    tiers: [
      {
        id: 'tier-white-ga',
        name: { en: 'General Admission (White Code)', ar: 'الدخول العام (الزي الأبيض)' },
        description: { en: 'Full dance floor access, welcome mocktail, and beach fireworks view.', ar: 'دخول ساحة الاحتفال، مشروب ترحيبي، ومشاهدة عروض الألعاب النارية.' },
        price: 350,
        capacityTotal: 300,
        capacityRemaining: 48,
        perks: [
          { en: 'Main stage dance floor access', ar: 'دخول ساحة المسرح الرئيسية' },
          { en: 'Signature welcome drink', ar: 'مشروب ترحيبي خاص' },
          { en: 'Midnight fireworks display', ar: 'عروض الألعاب النارية لمنتصف الليل' },
        ],
      },
      {
        id: 'tier-white-vip',
        name: { en: 'VIP Raised Deck Lounge', ar: 'منصة كبار الشخصيات VIP' },
        description: { en: 'Elevated VIP lounge with private bar, culinary appetizers & valet parking.', ar: 'منصة مرتفعة مع مقاعد مريحة، مقبلات فاخرة ومواقف VIP.' },
        price: 650,
        capacityTotal: 80,
        capacityRemaining: 12,
        popular: true,
        perks: [
          { en: 'Elevated stage view', ar: 'إطلالة بانورامية مرتفعة على المسرح' },
          { en: 'Unlimited artisan canapés & mocktails', ar: 'مقبلات ومشروبات فاخرة غير محدودة' },
          { en: 'Valet parking service', ar: 'خدمة صف السيارات VIP' },
        ],
      },
      {
        id: 'tier-white-royal',
        name: { en: 'Royal Backstage Majlis (5 Pax)', ar: 'مجلس كبار الشخصيات خلف الكواليس (5 أشخاص)' },
        description: { en: 'Dedicated butler service, private sofa lounge, and meet-and-greet access.', ar: 'خدمة ضيافة خاصة، أريكة فاخرة، ولقاء منسقي الموسيقى.' },
        price: 2500,
        capacityTotal: 8,
        capacityRemaining: 2,
        perks: [
          { en: 'Private lounge for up to 5', ar: 'جلسة خاصة حتى 5 أشخاص' },
          { en: 'Dedicated butler & gourmet feast', ar: 'خدمة نادل خاص وعشاء فاخر' },
          { en: 'Artist backstage access', ar: 'دخول الكواليس ولقاء الفنانين' },
        ],
      },
    ],
  },
  {
    id: 'bh-electric-dunes-dj',
    category: 'nightlife',
    slug: 'electric-dunes-techno-melodic',
    title: {
      en: 'Electric Dunes: Desert Melodic House & Techno',
      ar: 'إلكتريك ديونز: موسيقى إلكترونية وميلوديك هاوس في الصحراء',
    },
    tagline: {
      en: 'Bass & celestial beats vibrating across the open desert under starry skies',
      ar: 'نبضات الموسيقى الإلكترونية وأنغام الهاوس تحت سماء الصحراء المرصعة بالنجوم',
    },
    description: {
      en: 'An immersive open-air desert music experience. Featuring world-class sound design, laser mapping across granite rock formations, and ambient fire pits under the celestial canopy.',
      ar: 'تجربة موسيقية مفتوحة في قلب الصحراء. تجمع بين هندسة الصوت المتقدمة، عروض الليزر على الجبال الصخرية، ومواقد النار الدافئة تحت سماء الليل.',
    },
    locationName: {
      en: 'Moon Valley Open Desert Arena, Jeddah',
      ar: 'ساحة وادي القمر المفتوحة، جدة',
    },
    marinaOrArea: 'moon_mountain',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 290,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: '2026-12-05 • 09:00 PM - 03:00 AM',
    rating: 4.95,
    reviewsCount: 174,
    badge: {
      en: 'Desert Rave',
      ar: 'حفل الصحراء',
    },
    tiers: [
      {
        id: 'tier-electric-ga',
        name: { en: 'Desert Beat Pass', ar: 'تذكرة دخول الحفل' },
        description: { en: 'Access to the desert arena, glow gear, and campfire chill lounge.', ar: 'دخول ساحة الحفل، أساور نيون مضيئة، وجلسة موقد النار.' },
        price: 290,
        capacityTotal: 250,
        capacityRemaining: 35,
        perks: [
          { en: 'Full arena access', ar: 'دخول كامل للساحة' },
          { en: 'Complimentary glow wristband', ar: 'سوار نيون مضيء' },
        ],
      },
      {
        id: 'tier-electric-vip',
        name: { en: 'Glow VIP Stage Lounge', ar: 'منصة VIP القريبة من المسرح' },
        description: { en: 'Front-stage terrace with luxury majlis and complimentary dining.', ar: 'شرفة أمامية مع جلسات مريحة ووجبات خفيفة ومشروبات.' },
        price: 550,
        capacityTotal: 50,
        capacityRemaining: 9,
        popular: true,
        perks: [
          { en: 'Close stage proximity', ar: 'موقع مميز أمام المسرح' },
          { en: 'Warm Bedouin dinner station', ar: 'بوفيه طعام ساخن' },
        ],
      },
    ],
  },
  {
    id: 'bh-neon-rhythm-concert',
    category: 'nightlife',
    slug: 'neon-rhythm-sunset-party',
    title: {
      en: 'Neon Rhythm Sunset Festival',
      ar: 'مهرجان نيون ريثم الموسيقي وقت الغروب',
    },
    tagline: {
      en: 'Electrifying beats and coastal glow as the sun sets over the Red Sea',
      ar: 'موسيقى حماسية وإضاءات نيون ساحرة مع مغيب الشمس على البحر',
    },
    description: {
      en: 'A vibrant open-air twilight concert on the Jeddah Corniche. Live electronic performances, neon art installations, and an energetic crowd celebrating coastal rhythms.',
      ar: 'حفل موسيقي شبابي مفعم بالحيوية على كورنيش جدة وقت الغروب. يجمع بين الموسيقى الإلكترونية الحية ومجسمات النيون التفاعلية وأجواء البحر الرائعة.',
    },
    locationName: {
      en: 'Waterfront Amphitheater, Jeddah Corniche',
      ar: 'المسرح الروماني المفتوح، كورنيش جدة',
    },
    marinaOrArea: 'corniche',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 220,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: '2026-12-18 • 05:30 PM - 11:30 PM',
    rating: 4.89,
    reviewsCount: 142,
    badge: {
      en: 'Corniche Sunset',
      ar: 'غروب الكورنيش',
    },
    tiers: [
      {
        id: 'tier-neon-standard',
        name: { en: 'Silver Seating', ar: 'المقاعد الفضية' },
        description: { en: 'Amphitheater stepped seating with direct view of the stage & sunset.', ar: 'مقاعد مدرجة مع إطلالة واضحة على المسرح وغروب الشمس.' },
        price: 220,
        capacityTotal: 180,
        capacityRemaining: 40,
        perks: [
          { en: 'Direct stage view', ar: 'إطلالة مباشرة على المسرح' },
        ],
      },
      {
        id: 'tier-neon-gold',
        name: { en: 'Golden Circle Floor', ar: 'الدائرة الذهبية أمام المسرح' },
        description: { en: 'Standing dance circle directly at the DJ booth with free welcome drink.', ar: 'منطقة تفاعلية أمام المسرح مباشرة مع مشروب مجاني.' },
        price: 420,
        capacityTotal: 70,
        capacityRemaining: 15,
        popular: true,
        perks: [
          { en: 'Front-row dance floor', ar: 'ساحة قريبة جداً من الفنانين' },
          { en: 'Welcome energy drink', ar: 'مشروب ترحيبي' },
        ],
      },
    ],
  },
  // ==========================================
  // BLUE HORSE CORPORATE & BESPOKE RETREATS (خدمات الشركات)
  // ==========================================
  {
    id: 'bh-corporate-desert-retreat',
    category: 'corporate',
    slug: 'corporate-desert-mountain-retreat',
    title: {
      en: 'Executive Desert & Mountain Team-Building Retreat',
      ar: 'خلوة الشركات وفرق العمل في صحراء وجبال جدة',
    },
    tagline: {
      en: 'Bespoke corporate offsites blending wilderness leadership with luxury hospitality',
      ar: 'خلوات عمل مخصصة للشركات تجمع بين قيادة المغامرة والضيافة الراقية',
    },
    description: {
      en: 'Elevate your organization with custom team-building retreats in Moon Mountain and Obhur. Includes outdoor strategic workshops, guided challenge hikes, bonfire dinners, sound systems, and full transport logistics.',
      ar: 'ارتقِ بروح الفريق مع خلوات مخصصة تجمع بين ورش العمل الاستراتيجية في أحضان الطبيعة، هايكنج التحدي، وعشاء الضيافة الفاخر حول موقد النار.',
    },
    locationName: {
      en: 'Private Moon Valley Retreat Camp, Jeddah',
      ar: 'مخيم وادي القمر المخصص للشركات، جدة',
    },
    marinaOrArea: 'moon_mountain',
    coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 8500,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Available by Reservation (Custom Dates)',
    rating: 5.0,
    reviewsCount: 48,
    badge: {
      en: 'Corporate Exclusive',
      ar: 'مخصص للشركات',
    },
    tiers: [
      {
        id: 'tier-corp-day',
        name: { en: 'One-Day Team Offsite (Up to 20)', ar: 'خلوة يوم واحد لفريق العمل (حتى 20 شخص)' },
        description: { en: 'Team-building hike, outdoor strategy session, campfire dinner & logistics.', ar: 'هايكنج جماعي، جلسة استراتيجية في الطبيعة، عشاء بدوي ونقل.' },
        price: 8500,
        capacityTotal: 10,
        capacityRemaining: 4,
        popular: true,
        perks: [
          { en: 'Full event team & guide', ar: 'فريق تنظيم وإرشاد متكامل' },
          { en: 'AV presentation equipment', ar: 'معدات صوت وشاشات للعروض' },
          { en: 'Catered 3-course dinner', ar: 'وجبة عشاء فاخرة لجميع المشاركين' },
          { en: 'Corporate branding on-site', ar: 'تنسيق هوية الشركة في الموقع' },
        ],
      },
      {
        id: 'tier-corp-exec',
        name: { en: 'Executive 2-Day Retreat (Up to 30)', ar: 'خلوة القيادات ليومين (حتى 30 شخص)' },
        description: { en: 'Full 2-day immersive retreat with horseback beach gallop and desert glamping.', ar: 'خلوة متكاملة ليومين تشمل ركوب الخيل وتخييم فاخر.' },
        price: 18000,
        capacityTotal: 4,
        capacityRemaining: 2,
        perks: [
          { en: '2 days full curation', ar: 'إشراف وتنظيم كامل ليومين' },
          { en: 'Equestrian & hiking combo', ar: 'باقة الفروسية والهايكنج المشتركة' },
          { en: 'Executive majlis glamping', ar: 'تخييم فاخر بكامل وسائل الراحة' },
        ],
      },
    ],
  },
  {
    id: 'bh-bespoke-private-festival',
    category: 'corporate',
    slug: 'bespoke-private-festival-production',
    title: {
      en: 'Bespoke Private Festival & Event Production',
      ar: 'تنظيم وتصميم الفعاليات والمهرجانات الخاصة للشركات',
    },
    tagline: {
      en: 'End-to-end event conceptualization, international DJ booking & production',
      ar: 'إنتاج متكامل للفعاليات، حجز الفنانين العالميين، والإضاءات المسرحية'
    },
    description: {
      en: 'Blue Horse’s turnkey event production service for corporate galas, product launches, and private brand festivals. We handle staging, state-of-the-art acoustics, permit licensing, talent booking, and security.',
      ar: 'خدمة الإنتاج المتكامل للفعاليات الكبرى وحفلات إطلاق المنتجات والمهرجانات الخاصة. نتولى بناء المسارح، أنظمة الصوت والإضاءة، التراخيص الحكومية، وإدارة الحشود.'
    },
    locationName: {
      en: 'Custom Private Venue / Beach / Desert, Jeddah',
      ar: 'مواقع خاصة مجهزة، جدة',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 25000,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Custom Scheduling',
    rating: 5.0,
    reviewsCount: 32,
    badge: {
      en: 'Full Production',
      ar: 'إنتاج متكامل',
    },
    tiers: [
      {
        id: 'tier-prod-starter',
        name: { en: 'Turnkey Production Package', ar: 'باقة الإنتاج المتكامل' },
        description: { en: 'Sound, stage, permits, lighting, and DJ coordination for corporate events.', ar: 'المسرح، الصوتيات، التراخيص، الإضاءة وتنسيق الفنانين.' },
        price: 25000,
        capacityTotal: 5,
        capacityRemaining: 2,
        perks: [
          { en: 'Full AV & sound production', ar: 'إنتاج صوتي ومرئي متكامل' },
          { en: 'Government licensing support', ar: 'دعم كامل في التراخيص والتصاريح' },
          { en: 'Talent & DJ management', ar: 'إدارة وحجز منسقي الموسيقى' },
        ],
      },
    ],
  },
  {
    id: 'evt-abdullah-almanea',
    category: 'events',
    slug: 'tarab-session-abdullah-al-manea',
    title: {
      en: 'Tarab Night with Abdullah Al-Manea',
      ar: 'جلسة طرب مع عبدالله المانع',
    },
    tagline: {
      en: 'Authentic Tarab & melodies by the sea',
      ar: 'طرب وألحان ساحلية أصيلة على شاطئ البحر',
    },
    description: {
      en: 'An unforgettable shoreline musical evening featuring artist Abdullah Al-Manea performing classic Tarab and acoustic melodies under the Jeddah night sky.',
      ar: 'أمسية طربية ساحرة مع الفنان عبدالله المانع، يقدم فيها أجمل الأغاني والمقامات الأصيلة بين نسيم البحر وأضواء جدة الهادئة.',
    },
    locationName: {
      en: 'Oia Beach Amphitheater, North Obhur',
      ar: 'مسرح أويا الشاطئي، أبحر الشمالية',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 350,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: '2026-11-20',
    rating: 5.0,
    reviewsCount: 94,
    badge: {
      en: 'Featured Tarab Night',
      ar: 'جلسة طرب حصرية',
    },
    tiers: [
      {
        id: 'tier-manea-gold',
        name: { en: 'Gold Seating', ar: 'المقاعد الذهبية' },
        description: { en: 'Seaside seat with complimentary Arabic coffee & hospitality.', ar: 'مقعد شاطئي مع قهوة سعودية وضيافة راقية.' },
        price: 350,
        capacityTotal: 150,
        capacityRemaining: 24,
        perks: [
          { en: 'Direct stage view', ar: 'إطلالة مباشرة على المسرح' },
          { en: 'Arabic coffee & sweets', ar: 'قهوة سعودية وحلويات شرقية' },
        ],
      },
      {
        id: 'tier-manea-vip',
        name: { en: 'VIP Front Row Lounge', ar: 'جلسة VIP الصف الأول' },
        description: { en: 'Front row majlis with luxury dinner & valet parking.', ar: 'مجلس الصف الأول مع عشاء فاخر ومواقف VIP.' },
        price: 850,
        capacityTotal: 40,
        capacityRemaining: 8,
        popular: true,
        perks: [
          { en: 'Front row private sofa', ar: 'أريكة مريحة في الصف الأول' },
          { en: 'Buffet & drinks', ar: 'بوفيه عشاء ومشروبات طازجة' },
          { en: 'Valet parking', ar: 'خدمة إيقاف السيارات' },
        ],
      },
    ],
  },
  {
    id: 'evt-beach-nights',
    category: 'events',
    slug: 'beach-nights-jeddah',
    title: {
      en: 'Beach Nights',
      ar: 'ليالي الشاطئ',
    },
    tagline: {
      en: 'Live music & tranquil coastal vibes',
      ar: 'موسيقى حية وأجواء استجمام ساحلية هادئة',
    },
    description: {
      en: 'Sunset acoustic performances, beachfront fire pits, and ambient music crafted for relaxation by the Red Sea waves.',
      ar: 'أمسيات استجمام على الشاطئ مع مواقد نار دافئة، موسيقى حية هادئة، وأجواء ليلية مريحة أمام أمواج البحر.',
    },
    locationName: {
      en: 'Jeddah Waterfront Beach Pier',
      ar: 'رصيف الواجهة البحرية، جدة',
    },
    marinaOrArea: 'corniche',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 280,
    currency: 'SAR',
    privacyType: 'family',
    dateOrSchedule: '2026-11-27',
    rating: 4.9,
    reviewsCount: 112,
    badge: {
      en: 'Relaxed Seaside Vibes',
      ar: 'أجواء استجمام هادئة',
    },
    tiers: [
      {
        id: 'tier-beach-access',
        name: { en: 'Beach Entry & Beanbag', ar: 'دخول شاطئي وجلسة رملية' },
        description: { en: 'Beach lounge seat with welcome drink.', ar: 'جلسة شاطئية مع مشروب ترحيبي.' },
        price: 280,
        capacityTotal: 200,
        capacityRemaining: 45,
        perks: [
          { en: 'Beach access & live music', ar: 'دخول الشاطئ والاستمتاع بالموسيقى' },
          { en: '1 Welcome mocktail', ar: 'مشروب استوائي ترحيبي' },
        ],
      },
      {
        id: 'tier-beach-cabana',
        name: { en: 'Private Pergola (4 Guests)', ar: 'كابانا خاصة (4 ضيوف)' },
        description: { en: 'Dedicated pergola with seafood platter & fire pit.', ar: 'كابانا خاصة مع موقد نار وطبق مقبلات بحرية.' },
        price: 1200,
        capacityTotal: 15,
        capacityRemaining: 3,
        popular: true,
        perks: [
          { en: 'Private pergola for 4', ar: 'كابانا خاصة تتسع لـ 4 أشخاص' },
          { en: 'Appetizers & warm drinks', ar: 'مقبلات ومشروبات ساخنة' },
        ],
      },
    ],
  },
  {
    id: 'evt-symphony-waves',
    category: 'events',
    slug: 'jeddah-symphony-under-the-stars',
    title: {
      en: 'Symphony Under the Stars',
      ar: 'سيمفونية تحت النجوم',
    },
    tagline: {
      en: 'Classical Arabic strings & Red Sea waves',
      ar: 'أوركسترا الآلات الشرقية وأمواج البحر',
    },
    description: {
      en: 'An enchanting open-air classical musical night held right on the private pier of Jeddah Yacht Club.',
      ar: 'ليلة موسيقية كلاسيكية ساحرة على الرصيف المائي لنادي اليخوت بجدة بين نسيم البحر والأضواء الهادئة.',
    },
    locationName: {
      en: 'Jeddah Yacht Club Pier, Corniche',
      ar: 'رصيف نادي اليخوت بجدة، الكورنيش',
    },
    marinaOrArea: 'jeddah_yacht_club',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 380,
    currency: 'SAR',
    privacyType: 'family',
    dateOrSchedule: '2026-12-05',
    rating: 4.95,
    reviewsCount: 89,
    badge: {
      en: 'Classical Gala',
      ar: 'أمسية كلاسيكية',
    },
    tiers: [
      {
        id: 'tier-sym-gold',
        name: { en: 'Gold Pier Seating', ar: 'المقاعد الذهبية' },
        description: { en: 'Pier seat with welcome drink.', ar: 'مقعد على الرصيف مع مشروب ترحيبي.' },
        price: 380,
        capacityTotal: 120,
        capacityRemaining: 18,
        perks: [
          { en: 'Direct pier acoustic view', ar: 'إطلالة صوتية وبصرية مباشرة' },
          { en: 'Complimentary mocktail', ar: 'مشروب فاخر مجاني' },
        ],
      },
    ],
  },

  // ==========================================
  // 2. SEA VOYAGES & CHARTERS (رحلات)
  // ==========================================
  {
    id: 'voy-bayada-catamaran',
    category: 'voyages',
    slug: 'bayada-island-luxury-catamaran-day-sail',
    title: {
      en: 'Bayada Reef Sail',
      ar: 'رحلة شعاب بياضة',
    },
    tagline: {
      en: 'Crystal turquoise waters & private snorkeling',
      ar: 'مياه وغوص في المالديف السعودية',
    },
    description: {
      en: 'Sail aboard a luxury 52ft sailing catamaran to the famous turquoise waters of Bayada Reef. Includes snorkeling gear and fresh lunch.',
      ar: 'إبحار ممتع على متن كتماران فاخر بطول 52 قدماً إلى مياه شعاب بياضة الساحرة، شامل معدات الغوص والماء.',
    },
    locationName: {
      en: 'Bayada Reef, Red Sea (Departs Al-Ahlam Marina)',
      ar: 'شعاب بياضة (الانطلاق من مرسى الأحلام)',
    },
    marinaOrArea: 'north_obhur',
    coverImage: getAssetPath('/images/bayadha.png'),
    galleryImages: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 580,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Daily Departures (08:30 AM & 02:00 PM)',
    rating: 4.92,
    reviewsCount: 164,
    badge: {
      en: 'Coast Guard Pre-Cleared',
      ar: 'يتطلب تصريح من حرس الحدود',
    },
    vesselSpecs: {
      vesselName: 'Lagoon 52 "Aura of the Sea"',
      lengthFt: 52,
      maxSpeedKnots: 14,
      guestCapacity: 20,
      crewCount: 3,
      captainName: 'Capt. Tariq Al-Ghamdi',
      amenities: [
        { en: 'Sound System & DJ Deck', ar: 'نظام صوتي وسماعات' },
        { en: 'Snorkeling Gear', ar: 'معدات غوص' },
        { en: 'Shaded Lounge', ar: 'جلسة مظللة' },
      ],
    },
    tiers: [
      {
        id: 'tier-cata-individual',
        name: { en: 'Day Sail Ticket (Per Guest)', ar: 'تذكرة إبحار نهارية (للشخص)' },
        description: { en: '6-hour shared cruise with lunch & snorkeling gear.', ar: 'رحلة إبحار 6 ساعات مع الغداء ومعدات الغوص.' },
        price: 580,
        capacityTotal: 20,
        capacityRemaining: 6,
        popular: true,
        perks: [
          { en: '6-hour sailing cruise', ar: '6 ساعات إبحار ممتعة' },
          { en: 'Snorkeling equipment', ar: 'معدات غوص كاملة' },
          { en: 'Seafood lunch buffet', ar: 'وجبة غداء بحرية طازجة' },
        ],
      },
    ],
  },
  {
    id: 'voy-sunset-obhur-charter',
    category: 'voyages',
    slug: 'obhur-sunset-private-yacht-cruise',
    title: {
      en: 'Sunset Motor Yacht Charter',
      ar: 'رحلة يخت الغروب الخاصة بأبحر',
    },
    tagline: {
      en: 'Private 3-hour sunset cruise & hospitality',
      ar: 'إبحار خاص لـ 3 ساعات وقت الغروب مع الضيافة',
    },
    description: {
      en: 'Private luxury motor yacht cruise along the serene Obhur creek during the golden sunset hour.',
      ar: 'رحلة يخت خاصة وراقية في خور أبحر للاستمتاع بمنظر الغروب الذهبي والضيافة المميزة.',
    },
    locationName: {
      en: 'Jeddah Yacht Club Marina, Obhur',
      ar: 'مارينا نادي اليخوت، أبحر',
    },  
    marinaOrArea: 'jeddah_yacht_club',
    coverImage: getAssetPath('/images/obhur-sunset-yacht-dj.jpg'),
    galleryImages: [
      getAssetPath('/images/azimut-yacht-main.jpg'),
    ],
    basePrice: 2400,
    currency: 'SAR',
    privacyType: 'family',
    dateOrSchedule: 'Daily 04:30 PM - 07:30 PM',
    rating: 4.96,
    reviewsCount: 88,
    badge: {
      en: 'Private Charter',
      ar: 'يخت خاص بالكامل',
    },
    vesselSpecs: {
      vesselName: 'Majesty 48 "Wavecrest"',
      lengthFt: 48,
      maxSpeedKnots: 22,
      guestCapacity: 12,
      crewCount: 2,
      captainName: 'Capt. Faisal Al-Zahrani',
      amenities: [
        { en: 'Air-Conditioned Saloon', ar: 'صالون مكيف بالكامل' },
        { en: 'Flybridge Sunbed Lounge', ar: 'جلسة علوية للاسترخاء' },
        { en: 'Bose Sound System', ar: 'نظام صوتي بوز' },
      ],
    },
    tiers: [
      {
        id: 'tier-sunset-full',
        name: { en: 'Private 3-Hour Charter', ar: 'استئجار اليخت كاملاً (3 ساعات)' },
        description: { en: 'Includes up to 10 guests with cold drinks & snacks.', ar: 'يشمل حتى 10 أشخاص مع المشروبات والوجبات الخفيفة.' },
        price: 2400,
        capacityTotal: 2,
        capacityRemaining: 1,
        popular: true,
        perks: [
          { en: 'Exclusive yacht for up to 10 guests', ar: 'يخت خاص بالكامل حتى 10 ضيوف' },
          { en: 'Professional captain & deckhand', ar: 'قبطان محترف وطاقم خدمة' },
        ],
      },
    ],
  },

  // ==========================================
  // 3. MEMBERSHIPS & PACKAGES (عضويات)
  // ==========================================
  {
    id: 'pkg-4-friends',
    category: 'real-estate',
    slug: '4-friends-package',
    title: {
      en: '4 Friends Package',
      ar: 'باقة 4 أصدقاء',
    },
    tagline: {
      en: 'Private beach cabana & dining credits for 4',
      ar: 'كابانا شاطئية خاصة ورصيد للمأكولات لـ 4 أشخاص',
    },
    description: {
      en: 'A private full-day beach retreat package for 4 friends, featuring a private beachfront cabana, 4 sunbeds, and a SAR 400 dining voucher.',
      ar: 'باقة استجمام يومية متكاملة لـ 4 أشخاص تشمل كابانا خاصة مطلة على البحر، 4 أسرة استرخاء، وقسيمة طعام ومشروبات بقيمة 400 ر.س.',
    },
    locationName: {
      en: 'Oia Beach & Cabana Club, North Obhur',
      ar: 'شاطئ ونادي أويا، أبحر الشمالية',
    },
    marinaOrArea: 'north_obhur',
    coverImage: getAssetPath('/images/oia-beach-cabana-gallery.jpg'),
    galleryImages: [
      getAssetPath('/images/oia-beach-sunbed-cover.jpg'),
    ],
    basePrice: 1200,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Valid for Any Selected Day',
    rating: 4.98,
    reviewsCount: 145,
    badge: {
      en: 'Popular Group Pass',
      ar: 'الباقة الأكثر طلباً',
    },
    realEstateSpecs: {
      sqft: 250,
      bedrooms: 1,
      bathrooms: 1,
      privateBeachMeters: 10,
      monthlyRate: 1200,
      annualRate: 14400,
      securityDeposit: 0,
      amenities: [
        { en: 'Private Beach Cabana & Sunbeds', ar: 'كابانا شاطئية خاصة وأسرة استرخاء' },
        { en: 'SAR 400 Dining & Beverage Credit', ar: 'رصيد للمأكولات والمشروبات بقيمة 400 ر.س' },
        { en: 'Complimentary Beach Towels & Service', ar: 'مناشف وخدمة ضيافة شاطئية مجانية' },
        { en: 'Valet Parking for 2 Cars', ar: 'مواقف خاصة لسيارتين' },
      ],
    },
    tiers: [
      {
        id: 'tier-pkg-4-standard',
        name: { en: '4 Friends All-Day Pass', ar: 'باقة اليوم الكامل لـ 4 أصدقاء' },
        description: { en: 'Includes private cabana, 4 day passes, and SAR 400 dining credit.', ar: 'يشمل كابانا خاصة، دخول لـ 4 أشخاص، ورصيد طعام 400 ر.س.' },
        price: 1200,
        capacityTotal: 10,
        capacityRemaining: 4,
        popular: true,
        perks: [
          { en: 'Full day access for 4 guests', ar: 'دخول كامل طوال اليوم لـ 4 ضيوف' },
          { en: 'Private beach cabana & sunbeds', ar: 'كابانا شاطئية خاصة وأسرة استجمام' },
          { en: 'SAR 400 food & beverage voucher', ar: 'قسيمة مطاعم ومشروبات بقيمة 400 ر.س' },
        ],
      },
    ],
  },
  {
    id: 'mem-vip-annual',
    category: 'real-estate',
    slug: 'vip-membership',
    title: {
      en: 'VIP Membership',
      ar: 'عضوية VIP',
    },
    tagline: {
      en: 'Year-round unlimited resort access & concierge',
      ar: 'دخول سنوي غير محدود وامتيازات حصرية 24/7',
    },
    description: {
      en: 'Exclusive annual membership offering unlimited year-round access to premier private beach clubs, yacht mooring privileges, and dedicated 24/7 concierge assistance.',
      ar: 'عضوية سنوية راقية تمنحك دخولاً غير محدود لأرقى النوادي الشاطئية في جدة، أولوية في مراسي اليخوت، وخدمة كونسيرج ومساعد شخصي على مدار الساعة.',
    },
    locationName: {
      en: 'Across All Red Sea Waterfront Properties, Jeddah',
      ar: 'في جميع مرافق ومنتجعات البحر الأحمر، جدة',
    },
    marinaOrArea: 'south_obhur',
    coverImage: getAssetPath('/images/azimut-yacht-interior.jpg'),
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 45000,
    currency: 'SAR',
    privacyType: 'vip_exclusive',
    dateOrSchedule: '365-Day Annual Membership',
    rating: 5.0,
    reviewsCount: 68,
    badge: {
      en: 'Annual VIP Pass',
      ar: 'عضوية سنوية حصرية',
    },
    realEstateSpecs: {
      sqft: 1200,
      bedrooms: 2,
      bathrooms: 2,
      privateBeachMeters: 40,
      monthlyRate: 4500,
      annualRate: 45000,
      securityDeposit: 0,
      amenities: [
        { en: 'Unlimited 4-Resort Beach Club Access', ar: 'دخول غير محدود لـ 4 منتجعات شاطئية' },
        { en: 'Priority Marina Yacht Berth Allocation', ar: 'أولوية حجز مراسي اليخوت' },
        { en: 'Dedicated 24/7 VIP Concierge & Guest Services', ar: 'خدمة كونسيرج ومساعد شخصي 24/7' },
        { en: 'Complimentary Seasonal Concert Tickets', ar: 'تذاكر مجانية لأبرز الحفلات السنوية' },
      ],
    },
    tiers: [
      {
        id: 'tier-mem-vip-full',
        name: { en: 'Annual VIP Membership', ar: 'العضوية السنوية VIP' },
        description: { en: 'Unlimited access for member + 2 guests, yacht berth allocation, and 24/7 concierge.', ar: 'دخول غير محدود للعضو مع ضيفين، أولوية حجز المراسي، وكونسيرج خاص.' },
        price: 45000,
        capacityTotal: 25,
        capacityRemaining: 3,
        popular: true,
        perks: [
          { en: 'Unlimited access to 4 beach resorts', ar: 'دخول غير محدود لـ 4 منتجعات شاطئية' },
          { en: 'Priority yacht mooring & event tickets', ar: 'أولوية حجز المراسي وتذاكر الحفلات' },
          { en: 'Dedicated 24/7 VIP concierge', ar: 'مساعد شخصي وكونسيرج على مدار الساعة' },
        ],
      },
    ],
  },
  {
    id: 'pkg-yoga-session',
    category: 'real-estate',
    slug: 'beach-yoga-session',
    title: {
      en: 'Beach Yoga Session',
      ar: 'جلسة يوغا الشاطئ',
    },
    tagline: {
      en: 'Mindful sunrise or sunset beach yoga on the sand',
      ar: 'جلسة يوغا وتأمل عند الشروق أو الغروب على الرمال',
    },
    description: {
      en: 'A tranquil 75-minute beachfront yoga and meditation class led by certified instructors. Includes yoga mat, cold towel, and refreshing organic detox drinks.',
      ar: 'جلسة يوغا وتأمل لمدة 75 دقيقة على شاطئ البحر الأحمر مع مدربين معتمدين، تشمل سجادة يوغا ومشروبات ديتوكس عضوية منعشة.',
    },
    locationName: {
      en: 'Oia Beach & Wellness Deck, North Obhur',
      ar: 'منصة الاستجمام بشاطئ أويا، أبحر الشمالية',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 150,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Daily Sunrise (06:30 AM) & Sunset (05:30 PM)',
    rating: 4.97,
    reviewsCount: 76,
    badge: {
      en: 'Mind & Body Pass',
      ar: 'استرخاء وتأمل',
    },
    realEstateSpecs: {
      sqft: 100,
      bedrooms: 0,
      bathrooms: 1,
      privateBeachMeters: 20,
      monthlyRate: 150,
      annualRate: 1800,
      securityDeposit: 0,
      amenities: [
        { en: '75-Min Certified Yoga Session', ar: 'جلسة يوغا 75 دقيقة مع مدرب معتمد' },
        { en: 'Premium Yoga Mat & Towel', ar: 'سجادة يوغا فاخرة ومناشف منعشة' },
        { en: 'Organic Cold-Pressed Detox Drink', ar: 'عصير ديتوكس عضوي طازج' },
        { en: 'Direct Beach & Shower Access', ar: 'دخول مباشر للشاطئ ومرافق الاستحمام' },
      ],
    },
    tiers: [
      {
        id: 'tier-yoga-single',
        name: { en: 'Single Yoga Session', ar: 'جلسة يوغا فردية' },
        description: { en: '75-min beachfront yoga class with mat & detox drink.', ar: 'جلسة يوغا شاطئية 75 دقيقة مع السجادة والمشروب.' },
        price: 150,
        capacityTotal: 25,
        capacityRemaining: 12,
        popular: true,
        perks: [
          { en: '75-min guided mindfulness & yoga', ar: '75 دقيقة يوغا وتأمل بإشراف مدرب' },
          { en: 'Yoga mat & beach towel provided', ar: 'توفير سجادة اليوغا والمنشفة' },
          { en: 'Complimentary fresh detox drink', ar: 'مشروب ديتوكس طازج مجاني' },
        ],
      },
    ],
  },
];
