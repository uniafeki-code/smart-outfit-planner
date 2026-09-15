(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  let generation = 0;
  let currentOutfit = null;
  let currentForm = null;

  const options = {
    weather: ['Sunny','Cloudy','Rainy','Windy','Snowy','Stormy','Mixed Weather'],
    temperature: ['Freezing','Cold','Cool','Mild','Warm','Hot'],
    occasion: ['Work','Casual Day','Coffee Meeting','Date Night','Dinner','Travel Day','Family Event','Special Occasion','Weekend Outing'],
    mood: ['Cozy','Confident','Feminine','Powerful','Relaxed','Elegant','Romantic','Minimalist','Playful'],
    comfort: ['Maximum Comfort','Comfortable but Stylish','Balanced','Style First','Statement Look'],
    effort: ['Quick & Easy','Everyday Ready','Well Put Together','Full Styled Look'],
    environment: ['Office','City','Outdoor','Home','Travel','Social Event'],
    styleDirection: ['Balanced','More Feminine','More Minimal','More Polished','More Comfortable','More Statement']
  };

  const families = {
    polishedWork: {
      tops:['structured button-up blouse','clean collared shirt','refined mock-neck knit','soft satin blouse','tailored square-neck blouse','fine-gauge knit top'],
      bottoms:['tailored ankle trousers','straight-leg work trousers','polished midi skirt','wide-leg trousers','clean cigarette trousers'],
      shoes:['classic loafers','pointed ballet flats','low block heels','sleek ankle boots','polished slingbacks'],
      outer:['tailored blazer','soft trench','structured cropped jacket','clean longline blazer']
    },
    officeCasual: {
      tops:['soft knit top','clean crew-neck top','relaxed button-up blouse','fine-rib cardigan top','minimal bateau-neck top'],
      bottoms:['straight dark jeans','relaxed tailored trousers','ankle-length trousers','soft wide-leg trousers'],
      shoes:['loafers','clean leather sneakers','ballet flats','ankle boots'],
      outer:['relaxed blazer','light trench','soft cardigan','cropped jacket']
    },
    everydayCity: {
      tops:['soft draped blouse','clean crew-neck top','classic Breton stripe tee','easy V-neck knit','sleek sleeveless shell','soft cotton shirt'],
      bottoms:['straight-leg jeans','cropped casual trousers','soft midi skirt','relaxed city trousers','dark clean denim'],
      shoes:['clean sneakers','soft leather loafers','ballet flats','sleek ankle boots','minimal flats'],
      outer:['light trench','relaxed blazer','soft cardigan','cropped jacket','no outerwear needed']
    },
    relaxedHome: {
      tops:['soft cotton tee','light relaxed knit','fine-rib cardigan top','soft knit sweater'],
      bottoms:['soft straight pants','relaxed trousers','easy leggings','comfortable wide-leg pants'],
      shoes:['soft flats','easy slip-on shoes','clean comfort sneakers','soft house slippers'],
      outer:['soft cardigan','light knit layer','no outerwear needed']
    },
    coffeePolished: {
      tops:['soft wrap blouse','clean bateau-neck knit','soft satin blouse','feminine square-neck top','relaxed polished shirt'],
      bottoms:['wide-leg trousers','easy A-line skirt','ankle-length trousers','clean straight jeans','dark denim'],
      shoes:['loafers','ballet flats','ankle boots','minimal sneakers','pointed flats'],
      outer:['soft tailored blazer','cropped jacket','trench coat','light cardigan']
    },
    dateRomantic: {
      tops:['soft wrap blouse','sweetheart-neck blouse','soft satin blouse','feminine square-neck top','draped evening top'],
      bottoms:['slip midi skirt','sleek midi skirt','tailored trousers','dark straight jeans','soft wide-leg trousers'],
      shoes:['pointed slingbacks','polished flats','sleek ankle boots','low elegant heels','minimal heeled sandals'],
      outer:['tailored blazer','soft tailored coat','cropped jacket','no outerwear needed']
    },
    dinnerElegant: {
      tops:['silk-look blouse','soft satin blouse','refined mock-neck knit','soft draped blouse','clean asymmetric top'],
      bottoms:['satin midi skirt','elegant trousers','polished wide-leg trousers','dark denim','sleek midi skirt'],
      shoes:['pointed slingbacks','polished flats','heeled ankle boots','low elegant heels'],
      outer:['tailored coat','tailored blazer','soft longline jacket','cropped structured jacket']
    },
    travelSmart: {
      tops:['soft jersey tee','light relaxed knit','clean crew-neck top','fine-rib cardigan top','soft cotton shirt'],
      bottoms:['stretch trousers','travel-friendly pants','pull-on ankle trousers','relaxed jeans','soft wide-leg pants'],
      shoes:['comfort sneakers','comfortable loafers','soft ballet flats','easy slip-on shoes'],
      outer:['light cardigan','trench coat','light zip jacket','soft overshirt']
    },
    familySoft: {
      tops:['soft wrap blouse','light puff-sleeve blouse','fine-rib cardigan top','soft gathered blouse','relaxed polished knit'],
      bottoms:['comfortable jeans','simple midi skirt','soft straight pants','soft tailored trousers'],
      shoes:['comfort flats','soft ballet flats','easy loafers','clean everyday sneakers'],
      outer:['light cardigan','soft knit layer','relaxed blazer','cropped jacket']
    },
    specialDressy: {
      tops:['silk-look blouse','soft satin blouse','polished high-neck top','tailored square-neck blouse','statement draped top'],
      bottoms:['elegant midi skirt','tailored wide-leg trousers','dressy trousers','sleek column skirt'],
      shoes:['elegant heels','elegant flats','dressy ankle boots','pointed slingbacks'],
      outer:['tailored coat','tailored blazer','refined longline jacket','soft evening layer']
    },
    weekendRelaxed: {
      tops:['light relaxed knit','soft weekend sweater','casual stripe tee','clean cotton top','easy button-up shirt'],
      bottoms:['relaxed denim','soft wide-leg pants','easy pull-on trousers','relaxed A-line skirt','straight jeans'],
      shoes:['clean sneakers','casual ankle boots','flat sandals','easy slip-on flats','loafers'],
      outer:['throw-on cardigan','light casual jacket','cropped layer','no outerwear needed']
    },
    outdoorEasy: {
      tops:['soft cotton tee','light relaxed knit','classic stripe tee','soft jersey top','easy long-sleeve top'],
      bottoms:['relaxed denim','easy pull-on trousers','cropped casual pants','soft straight pants'],
      shoes:['supportive sneakers','weather-friendly ankle boots','comfortable loafers','practical flats'],
      outer:['light zip jacket','structured utility layer','light trench','soft cardigan']
    }
  };

  const palettes = {
    Cozy:['oatmeal, soft taupe and warm cream','camel, ivory and muted brown','soft gray, cream and dusty rose'],
    Confident:['navy, ivory and cognac','black, cream and warm camel','charcoal, white and deep burgundy'],
    Feminine:['soft blush, cream and taupe','dusty rose, ivory and warm beige','soft blue, cream and muted mauve'],
    Powerful:['black, ivory and camel','charcoal, white and oxblood','navy, cream and structured brown'],
    Relaxed:['denim blue, cream and soft gray','olive, ivory and tan','washed blue, white and camel'],
    Elegant:['black, ivory and champagne','navy, soft cream and taupe','deep brown, cream and muted gold'],
    Romantic:['rose, cream and soft brown','burgundy, blush and ivory','mauve, cream and warm taupe'],
    Minimalist:['black, ivory and stone','navy, white and gray','taupe, cream and charcoal'],
    Playful:['cobalt, cream and denim','soft coral, white and tan','green, ivory and medium denim']
  };

  const accessories = {
    Work:['structured tote + simple watch','small hoops + clean leather bag','minimal necklace + structured tote'],
    'Casual Day':['crossbody bag + small hoops','simple watch + compact shoulder bag','sunglasses + easy crossbody'],
    'Coffee Meeting':['small shoulder bag + simple earrings','structured crossbody + delicate necklace','clean tote + small hoops'],
    'Date Night':['small shoulder bag + delicate earrings','compact clutch + fine necklace','small bag + understated jewelry'],
    Dinner:['small structured bag + simple jewelry','compact shoulder bag + delicate earrings','sleek clutch + one refined accessory'],
    'Travel Day':['crossbody bag + roomy tote','compact belt bag + carry-on tote','simple watch + organized crossbody'],
    'Family Event':['easy shoulder bag + small earrings','crossbody bag + delicate necklace','simple tote + subtle jewelry'],
    'Special Occasion':['small clutch + refined earrings','structured mini bag + delicate jewelry','clean evening bag + one statement detail'],
    'Weekend Outing':['crossbody bag + sunglasses','easy tote + small hoops','compact shoulder bag + simple watch']
  };

  const stylingNotes = [
    'Repeat one color between your shoes, bag or outer layer so the outfit feels connected.',
    'If the proportions feel loose, add a small front tuck or define the waist slightly.',
    'Keep jewelry quiet when the top already has texture, drape or a strong neckline.',
    'Balance one soft piece with one structured piece so the outfit feels intentional.',
    'If the outfit feels too busy, remove one accessory before changing the clothes.'
  ];

  const alternatives = [
    'Swap the shoes for a flatter option if the day involves more walking than expected.',
    'Use a darker bottom if you want the same formula to feel more polished quickly.',
    'Choose the closest version you already own — the formula matters more than the exact item.',
    'Add or remove the outer layer depending on how much time you will actually spend outside.',
    'If the outfit feels too formal, soften it with a simpler shoe or more relaxed layer.'
  ];

  function fill(id, list, selected) {
    const el = $(id);
    if (!el) return;
    el.innerHTML = list.map(v => `<option value="${v}">${v}</option>`).join('');
    el.value = selected;
  }

  function init() {
    fill('weather', options.weather, 'Sunny');
    fill('temperature', options.temperature, 'Mild');
    fill('occasion', options.occasion, 'Casual Day');
    fill('mood', options.mood, 'Relaxed');
    fill('comfort', options.comfort, 'Balanced');
    fill('effort', options.effort, 'Everyday Ready');
    fill('environment', options.environment, 'City');
    fill('styleDirection', options.styleDirection, 'Balanced');
  }

  function formData() {
    return {
      weather:$('weather').value,
      temperature:$('temperature').value,
      occasion:$('occasion').value,
      mood:$('mood').value,
      comfort:$('comfort').value,
      effort:$('effort').value,
      environment:$('environment').value,
      styleDirection:$('styleDirection').value
    };
  }

  function pick(arr, salt = 0) {
    const idx = Math.abs((generation * 7) + salt) % arr.length;
    return arr[idx];
  }

  function familyKey(f) {
    if (f.occasion === 'Work' && f.comfort === 'Maximum Comfort') return 'officeCasual';
    if (f.occasion === 'Work') return 'polishedWork';
    if (f.occasion === 'Casual Day' && f.environment === 'Home') return 'relaxedHome';
    if ((f.occasion === 'Casual Day' || f.occasion === 'Weekend Outing') && f.environment === 'Outdoor') return 'outdoorEasy';
    if (f.occasion === 'Coffee Meeting') return 'coffeePolished';
    if (f.occasion === 'Date Night') return 'dateRomantic';
    if (f.occasion === 'Dinner') return 'dinnerElegant';
    if (f.occasion === 'Travel Day') return 'travelSmart';
    if (f.occasion === 'Family Event') return 'familySoft';
    if (f.occasion === 'Special Occasion') return 'specialDressy';
    if (f.occasion === 'Weekend Outing') return 'weekendRelaxed';
    return 'everydayCity';
  }

  function baseOutfit(f) {
    const fam = families[familyKey(f)];
    return {
      top:pick(fam.tops,1), bottom:pick(fam.bottoms,2), shoes:pick(fam.shoes,3), outer:pick(fam.outer,4),
      palette:pick(palettes[f.mood] || palettes.Relaxed,5),
      accessory:pick(accessories[f.occasion] || accessories['Casual Day'],6)
    };
  }

  function applyMoodAndDirection(o, f) {
    if (['Romantic','Feminine'].includes(f.mood) || f.styleDirection === 'More Feminine') {
      o.top = pick(['soft wrap blouse','soft satin blouse','feminine square-neck top','gentle gathered blouse'],11);
    }
    if (['Powerful','Confident'].includes(f.mood) || f.styleDirection === 'More Polished') {
      if (o.outer !== 'no outerwear needed') o.outer = pick(['tailored blazer','structured jacket','clean longline blazer','soft tailored blazer'],12);
    }
    if (f.mood === 'Minimalist' || f.styleDirection === 'More Minimal') {
      o.top = pick(['clean crew-neck top','refined mock-neck knit','simple bateau-neck top','minimal collared shirt'],13);
      o.accessory = pick(['small hoops + clean bag','simple watch + structured bag','minimal necklace + clean tote'],14);
    }
    if (f.styleDirection === 'More Statement' || f.comfort === 'Statement Look') {
      o.top = pick(['statement-sleeve blouse','clean asymmetric top','bold tailored top','draped statement blouse'],15);
      o.accessory = pick(['one sculptural earring + simple bag','statement bag + minimal jewelry','bold earrings + clean clutch'],16);
    }
    return o;
  }

  function applyComfortAndEffort(o, f) {
    if (f.comfort === 'Maximum Comfort' || f.styleDirection === 'More Comfortable') {
      o.shoes = pick(['comfort sneakers','comfortable loafers','soft ballet flats','easy slip-on shoes'],21);
      if (f.occasion === 'Work') o.bottom = pick(['wide-leg trousers','straight-leg work trousers','soft tailored trousers'],22);
      else if (!['Special Occasion','Date Night','Dinner'].includes(f.occasion)) o.bottom = pick(['soft straight pants','relaxed trousers','straight jeans','travel-friendly pants'],23);
    }
    if (['Style First','Statement Look'].includes(f.comfort)) {
      if (!['Travel Day','Casual Day'].includes(f.occasion)) o.shoes = pick(['pointed slingbacks','polished flats','sleek ankle boots','low elegant heels'],24);
    }
    if (f.effort === 'Quick & Easy') {
      o.accessory = pick(['simple crossbody + small hoops','clean tote + simple watch','one small accessory only'],25);
      if (!['Work','Dinner','Date Night','Special Occasion'].includes(f.occasion) && f.temperature !== 'Cold' && f.temperature !== 'Freezing') {
        o.outer = pick(['light cardigan','easy jacket','no outerwear needed'],26);
      }
    }
    if (f.effort === 'Full Styled Look' && o.outer !== 'no outerwear needed') {
      o.outer = pick(['tailored blazer','refined longline jacket','soft tailored coat','structured cropped jacket'],27);
      o.accessory = pick(['structured bag + refined earrings','clean bag + watch + small earrings','one statement accessory + simple bag'],28);
    }
    return o;
  }

  function applyEnvironment(o, f) {
    if (f.environment === 'Outdoor') {
      o.shoes = pick(['supportive sneakers','weather-friendly ankle boots','comfortable loafers','practical flats'],31);
    }
    if (f.environment === 'Travel') {
      o.shoes = pick(['comfort sneakers','comfortable loafers','easy slip-on shoes'],32);
      if (!['Dinner','Special Occasion','Date Night'].includes(f.occasion)) o.bottom = pick(['travel-friendly pants','relaxed trousers','soft straight pants'],33);
    }
    if (f.environment === 'Office' && f.occasion !== 'Travel Day') {
      if (o.shoes.includes('slipper') || o.shoes.includes('sandal')) o.shoes = 'classic loafers';
    }
    return o;
  }

  function applyWeatherAndTemp(o, f) {
    const wet = ['Rainy','Stormy'].includes(f.weather);
    if (wet) {
      o.shoes = pick(['sleek ankle boots','weather-friendly loafers','practical closed flats','water-resistant ankle boots'],41);
      o.outer = f.temperature === 'Hot' ? 'light water-resistant layer' : pick(['classic trench','light weatherproof jacket','structured rain layer'],42);
    }
    if (f.weather === 'Snowy') {
      o.shoes = pick(['winter-ready boots','warm lined ankle boots','tall weather-ready boots'],43);
      o.outer = pick(['warm wool-blend coat','clean puffer coat','warm winter coat'],44);
    }
    if (f.weather === 'Windy' && !['Freezing','Hot'].includes(f.temperature)) {
      o.outer = pick(['light trench','structured jacket','wind-resistant light coat'],45);
    }
    if (f.weather === 'Mixed Weather') {
      o.outer = pick(['light trench','removable cardigan layer','light structured jacket'],46);
      if (o.shoes.includes('sandal')) o.shoes = 'closed flats';
    }

    if (f.temperature === 'Hot') {
      o.top = pick(['breathable cotton blouse','sleek sleeveless shell','light draped top','soft linen-blend shirt'],47);
      if (!wet && f.weather !== 'Stormy') o.outer = 'no outerwear needed';
      if (o.shoes.includes('boot')) o.shoes = pick(['minimal flats','soft loafers','low sandals'],48);
    }
    if (f.temperature === 'Warm' && o.outer.includes('wool')) o.outer = 'light structured layer';
    if (f.temperature === 'Cold') {
      if (o.outer === 'no outerwear needed' || o.outer.includes('light cardigan')) o.outer = pick(['warm tailored coat','wool-blend coat','structured warm layer'],49);
      if (o.shoes.includes('sandal')) o.shoes = 'ankle boots';
    }
    if (f.temperature === 'Freezing') {
      o.outer = pick(['warm wool-blend coat','clean puffer coat','warm winter coat'],50);
      o.shoes = pick(['winter-ready boots','warm lined ankle boots','tall warm boots'],51);
    }
    return o;
  }

  function resolveConflicts(o, f) {
    const formal = ['Work','Dinner','Date Night','Special Occasion'].includes(f.occasion);
    if (formal && (o.shoes.includes('slipper') || o.shoes.includes('comfort sneaker')) && f.comfort !== 'Maximum Comfort') o.shoes = 'polished flats';
    if (f.occasion === 'Work' && (o.top.includes('tee') || o.bottom.includes('legging'))) {
      o.top = 'clean collared blouse';
      o.bottom = 'tailored ankle trousers';
    }
    if (['Rainy','Stormy'].includes(f.weather) && o.shoes.includes('sandal')) o.shoes = 'sleek ankle boots';
    if (f.weather === 'Snowy' && !o.shoes.includes('boot')) o.shoes = 'winter-ready boots';
    if (f.temperature === 'Hot' && !['Rainy','Stormy'].includes(f.weather) && (o.outer.includes('wool') || o.outer.includes('winter') || o.outer.includes('puffer'))) o.outer = 'no outerwear needed';
    if (f.temperature === 'Freezing' && o.outer === 'no outerwear needed') o.outer = 'warm wool-blend coat';
    if (f.environment === 'Outdoor' && formal && o.shoes.includes('heel')) o.shoes = 'polished weather-friendly flats';
    return o;
  }

  function buildWhy(o, f) {
    const reasons = [];
    if (['Rainy','Stormy'].includes(f.weather)) reasons.push(`closed ${o.shoes} and the ${o.outer} keep the formula practical for wet conditions`);
    else if (f.weather === 'Snowy') reasons.push(`the ${o.shoes} and ${o.outer} give the outfit the protection snow needs`);
    else if (f.temperature === 'Hot') reasons.push(`the lighter ${o.top} keeps the outfit breathable instead of fighting the heat`);
    else if (['Cold','Freezing'].includes(f.temperature)) reasons.push(`the ${o.outer} builds warmth into the outfit from the start`);
    else reasons.push('the weather and temperature are handled without adding more layers than the day needs');

    if (f.comfort === 'Maximum Comfort') reasons.push(`the ${o.shoes} keep movement easy`);
    else if (['Style First','Statement Look'].includes(f.comfort)) reasons.push('the silhouette keeps a stronger style focus without ignoring the setting');
    else reasons.push('comfort and polish stay balanced rather than competing');

    reasons.push(`the ${o.top} and ${o.bottom} fit a ${f.occasion.toLowerCase()} in a ${f.environment.toLowerCase()} setting`);
    return `Why this works: ${reasons.join('; ')}.`;
  }

  function titleFor(f) {
    const moodWord = {
      Cozy:'Soft', Confident:'Confident', Feminine:'Feminine', Powerful:'Strong', Relaxed:'Easy', Elegant:'Polished', Romantic:'Romantic', Minimalist:'Clean', Playful:'Fresh'
    }[f.mood] || 'Balanced';
    const occ = {
      Work:'Workday', 'Casual Day':'Everyday', 'Coffee Meeting':'Coffee Meeting', 'Date Night':'Date Night', Dinner:'Dinner', 'Travel Day':'Travel', 'Family Event':'Family', 'Special Occasion':'Occasion', 'Weekend Outing':'Weekend'
    }[f.occasion] || 'Everyday';
    return `${moodWord} ${occ} Outfit`;
  }

  function updateChips(f) {
    const chips = $('matchChips');
    if (!chips) return;
    const data = [
      `${f.weather} / ${f.temperature}`,
      f.occasion,
      f.comfort,
      f.styleDirection === 'Balanced' ? f.mood : f.styleDirection
    ];
    chips.innerHTML = data.map(v => `<span>${v}</span>`).join('');
  }

  function render(o, f, scroll = true) {
    currentOutfit = {...o};
    currentForm = {...f};
    $('title').textContent = titleFor(f);
    $('topResult').textContent = o.top;
    $('bottomResult').textContent = o.bottom;
    $('shoesResult').textContent = o.shoes;
    $('outerResult').textContent = o.outer;
    $('paletteResult').textContent = o.palette;
    $('accessoryResult').textContent = o.accessory;
    $('whyResult').textContent = buildWhy(o,f);
    $('stylingResult').textContent = pick(stylingNotes,61);
    $('alternativeResult').textContent = pick(alternatives,62);
    updateChips(f);
    if (scroll) $('resultCard').scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  function generate(scroll = true) {
    generation += 1;
    const f = formData();
    let o = baseOutfit(f);
    o = applyMoodAndDirection(o,f);
    o = applyComfortAndEffort(o,f);
    o = applyEnvironment(o,f);
    o = applyWeatherAndTemp(o,f);
    o = resolveConflicts(o,f);
    render(o,f,scroll);
  }

  function surprise() {
    Object.keys(options).forEach(id => {
      const el = $(id);
      const list = options[id];
      if (el) el.value = list[Math.floor(Math.random() * list.length)];
    });
    generate(true);
  }

  function refine(type) {
    if (!currentOutfit || !currentForm) return generate(true);
    generation += 1;
    const f = formData();
    let o = {...currentOutfit};
    if (type === 'softer') {
      o.top = pick(['soft wrap blouse','soft satin blouse','feminine square-neck top','gentle gathered blouse'],71);
      if (o.outer.includes('structured')) o.outer = 'soft tailored blazer';
      o.palette = pick(['soft blush, cream and taupe','dusty rose, ivory and warm beige','soft blue, cream and muted mauve'],72);
    }
    if (type === 'polished') {
      if (o.outer !== 'no outerwear needed') o.outer = pick(['tailored blazer','clean longline blazer','structured cropped jacket'],73);
      if (o.shoes.includes('sneaker') || o.shoes.includes('slip-on')) o.shoes = 'polished flats';
      o.accessory = 'structured bag + simple refined jewelry';
    }
    if (type === 'comfortable') {
      o.shoes = pick(['comfortable loafers','soft ballet flats','easy slip-on shoes','comfort sneakers'],74);
      if (!['Work','Dinner','Date Night','Special Occasion'].includes(f.occasion)) o.bottom = pick(['soft straight pants','relaxed trousers','straight jeans'],75);
    }
    o = applyWeatherAndTemp(o,f);
    o = resolveConflicts(o,f);
    render(o,f,true);
  }

  document.addEventListener('DOMContentLoaded', () => {
    init();
    generate(false);
    $('go')?.addEventListener('click',() => generate(true));
    $('again')?.addEventListener('click',() => generate(true));
    $('surprise')?.addEventListener('click',surprise);
    document.querySelectorAll('[data-refine]').forEach(btn => btn.addEventListener('click',() => refine(btn.dataset.refine)));
  });
})();
