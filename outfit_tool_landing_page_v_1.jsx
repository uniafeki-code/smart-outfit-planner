import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shirt, CloudSun, Gem, Lock, RotateCcw, ChevronRight, Heart, Shield, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

const weatherOptions = ["Sunny", "Cloudy", "Rainy", "Windy", "Snowy", "Stormy", "Mixed Weather"];
const temperatureOptions = ["Freezing", "Cold", "Cool", "Mild", "Warm", "Hot", "Very Hot"];
const occasionOptions = [
  "Work",
  "Casual Day",
  "Coffee Meeting",
  "Date Night",
  "Dinner",
  "Travel Day",
  "Family Event",
  "Special Occasion",
  "Weekend Outing",
];
const moodOptions = ["Cozy", "Confident", "Feminine", "Powerful", "Relaxed", "Elegant", "Romantic", "Minimalist", "Playful"];
const comfortOptions = ["Maximum Comfort", "Comfortable but Stylish", "Balanced", "Style First", "Statement Look"];
const effortOptions = ["Quick & Easy", "Everyday Ready", "Well Put Together", "Full Styled Look"];
const environmentOptions = ["Office", "City", "Outdoor", "Home", "Travel", "Social Event"];

const formDefaults = {
  name: "",
  weather: "Sunny",
  temperature: "Mild",
  occasion: "Casual Day",
  mood: "Relaxed",
  comfort: "Balanced",
  effort: "Everyday Ready",
  environment: "City",
  surprise: false,
};

const tops = {
  cozy: [
    "soft crewneck knit sweater",
    "fine rib cardigan with a round neck",
    "relaxed waffle-knit long sleeve top",
    "light mock-neck knit top",
  ],
  confident: [
    "structured button-up shirt",
    "sharp V-neck knit top",
    "clean collared blouse",
    "sleek square-neck fitted top",
  ],
  feminine: [
    "soft wrap blouse with a gentle V-neck",
    "light puff-sleeve blouse",
    "scoop-neck knit top",
    "soft draped blouse",
  ],
  powerful: [
    "strong-shoulder blouse",
    "structured collared shirt",
    "polished high-neck top",
    "tailored square-neck blouse",
  ],
  relaxed: [
    "easy cotton crewneck tee",
    "soft long-sleeve jersey top",
    "light relaxed knit top",
    "classic Breton stripe tee",
  ],
  elegant: [
    "silk-look blouse",
    "refined mock-neck top",
    "soft satin shirt",
    "clean bateau-neck top",
  ],
  romantic: [
    "soft ruffle blouse",
    "delicate wrap top",
    "gentle sweetheart-neck blouse",
    "flowy romantic shirt",
  ],
  minimalist: [
    "clean crewneck top",
    "simple fine-gauge knit",
    "sleek sleeveless shell top",
    "minimal round-neck blouse",
  ],
  playful: [
    "color-pop knit top",
    "striped fitted tee",
    "contrast-trim cardigan top",
    "fun printed blouse",
  ],
};

const bottoms = {
  work: ["tailored ankle trousers", "straight-leg work pants", "polished midi skirt", "wide-leg trousers"],
  casual: ["straight jeans", "relaxed trousers", "soft midi skirt", "cropped casual pants"],
  coffee: ["wide-leg trousers", "classic jeans", "easy A-line skirt", "ankle-length pants"],
  date: ["slip midi skirt", "dark straight jeans", "tailored trousers", "sleek mini-to-midi skirt"],
  dinner: ["elegant trousers", "satin midi skirt", "dark denim", "polished wide-leg pants"],
  travel: ["soft travel pants", "stretch trousers", "relaxed jeans", "pull-on ankle pants"],
  family: ["comfortable jeans", "easy trousers", "simple midi skirt", "soft straight pants"],
  special: ["elegant midi skirt", "tailored wide-leg pants", "dressy trousers", "sleek column skirt"],
  weekend: ["relaxed denim", "soft wide-leg pants", "casual midi skirt", "easy pull-on trousers"],
};

const shoesByContext = {
  work: ["classic loafers", "low block heels", "pointed ballet flats", "ankle boots"],
  casual: ["white sneakers", "soft loafers", "comfort flats", "clean ankle boots"],
  coffee: ["ankle boots", "loafers", "minimal sneakers", "ballet flats"],
  date: ["elegant heels", "sleek ankle boots", "refined flats", "strappy heels"],
  dinner: ["heeled ankle boots", "elegant heels", "dressy flats", "pointed slingbacks"],
  travel: ["comfort sneakers", "slip-on shoes", "walking loafers", "soft ballet flats"],
  family: ["comfort flats", "sneakers", "ankle boots", "easy loafers"],
  special: ["statement heels", "elegant heeled sandals", "dress flats", "dressy ankle boots"],
  weekend: ["sneakers", "loafers", "casual boots", "flat sandals"],
};

const outerwearByWeather = {
  Sunny: ["no outerwear needed", "light cardigan", "soft blazer"],
  Cloudy: ["light cardigan", "soft trench coat", "easy blazer", "cropped jacket"],
  Rainy: ["classic trench coat", "water-resistant jacket", "rain-ready layer"],
  Windy: ["structured jacket", "light coat", "wind-ready trench", "zip-front jacket"],
  Snowy: ["warm wool coat", "puffer coat", "heavy winter coat"],
  Stormy: ["protective coat", "weatherproof jacket", "heavy layer"],
  "Mixed Weather": ["flexible light coat", "trench coat", "layered jacket", "throw-on cardigan"],
};

const temperatureAdjustments = {
  Freezing: ["add a thermal base layer and warm scarf", "choose tall boots and a heavier knit", "layer with a warm coat and winter-ready shoes"],
  Cold: ["add a soft scarf or warm knit layer", "closed-toe shoes work best today", "a cardigan or coat keeps the look balanced"],
  Cool: ["light layering helps the outfit feel complete", "closed-toe shoes or ankle boots fit best", "a cardigan keeps it practical"],
  Mild: ["you can keep the outfit balanced without heavy layers", "everyday shoes work well here", "a light layer is optional"],
  Warm: ["breathable fabrics keep the look comfortable", "skip heavy layers if possible", "lighter shoes make more sense here"],
  Hot: ["airy fabrics and easy silhouettes work best", "keep the outfit lightweight", "breathable shoes are the smartest choice"],
  "Very Hot": ["stick to the lightest fabrics possible", "minimal layering makes the most sense", "open and breathable shoe options work best"],
};

function choose(arr, indexA = 0, indexB = 0) {
  return arr[(indexA + indexB) % arr.length];
}

function moodKey(mood) {
  return mood.toLowerCase();
}

function occasionKey(occasion) {
  const map = {
    Work: "work",
    "Casual Day": "casual",
    "Coffee Meeting": "coffee",
    "Date Night": "date",
    Dinner: "dinner",
    "Travel Day": "travel",
    "Family Event": "family",
    "Special Occasion": "special",
    "Weekend Outing": "weekend",
  };
  return map[occasion];
}

function generateOutfit(form, generation = 0, surprise = false) {
  const mood = moodKey(form.mood);
  const occasion = occasionKey(form.occasion);
  const baseIndex =
    weatherOptions.indexOf(form.weather) +
    temperatureOptions.indexOf(form.temperature) +
    occasionOptions.indexOf(form.occasion) +
    moodOptions.indexOf(form.mood) +
    comfortOptions.indexOf(form.comfort) +
    effortOptions.indexOf(form.effort) +
    environmentOptions.indexOf(form.environment) +
    generation;

  let top = choose(tops[mood] || tops.relaxed, baseIndex, surprise ? 1 : 0);
  let bottom = choose(bottoms[occasion] || bottoms.casual, baseIndex, surprise ? 2 : 0);
  let shoes = choose(shoesByContext[occasion] || shoesByContext.casual, baseIndex, surprise ? 1 : 0);
  let outerwear = choose(outerwearByWeather[form.weather], baseIndex, surprise ? 1 : 0);
  let stylingAdjustment = choose(temperatureAdjustments[form.temperature], baseIndex, surprise ? 1 : 0);

  if (["Freezing", "Cold", "Cool"].includes(form.temperature)) {
    if (["flat sandals", "strappy heels"].includes(shoes)) {
      shoes = "ankle boots";
    }
  }

  if (["Hot", "Very Hot"].includes(form.temperature)) {
    if (["warm wool coat", "puffer coat", "heavy winter coat"].includes(outerwear)) {
      outerwear = "no outerwear needed";
    }
  }

  if (form.weather === "Rainy") {
    if (["flat sandals", "strappy heels", "elegant heeled sandals"].includes(shoes)) {
      shoes = "ankle boots";
    }
    outerwear = choose(["classic trench coat", "water-resistant jacket", "rain-ready layer"], baseIndex);
  }

  if (form.weather === "Snowy") {
    shoes = choose(["tall boots", "ankle boots", "winter-ready boots"], baseIndex);
    outerwear = choose(["warm wool coat", "puffer coat", "heavy winter coat"], baseIndex);
  }

  if (form.environment === "Home") {
    shoes = choose(["soft flats", "easy slip-ons", "comfort slides"], baseIndex);
    outerwear = "no outerwear needed";
  }

  if (form.environment === "Travel") {
    bottom = choose(["stretch trousers", "travel-friendly pants", "relaxed jeans", "pull-on ankle pants"], baseIndex);
    shoes = choose(["comfort sneakers", "walking loafers", "soft ballet flats"], baseIndex);
  }

  if (form.environment === "Office" && form.occasion === "Work") {
    shoes = choose(["classic loafers", "low block heels", "pointed ballet flats", "ankle boots"], baseIndex);
    if (top.includes("tee")) top = choose(["structured button-up shirt", "clean collared blouse", "sharp V-neck knit top"], baseIndex);
  }

  if (form.comfort === "Maximum Comfort") {
    shoes = choose(["comfort sneakers", "soft flats", "walking loafers"], baseIndex);
    bottom = choose(["soft travel pants", "relaxed trousers", "straight jeans"], baseIndex);
  }

  if (form.comfort === "Style First") {
    shoes = choose(["pointed ballet flats", "ankle boots", "elegant heels"], baseIndex);
  }

  if (form.comfort === "Statement Look") {
    top = choose(["statement blouse", "bold structured top", "attention-grabbing knit", "dramatic sleeve blouse"], baseIndex);
  }

  if (form.effort === "Quick & Easy") {
    outerwear = choose(["easy cardigan", "light jacket", "no outerwear needed"], baseIndex);
  }

  if (form.effort === "Full Styled Look") {
    outerwear = choose(["tailored blazer", "elegant coat", "styled layering piece"], baseIndex);
    shoes = choose(["ankle boots", "pointed slingbacks", "low block heels", "elegant heels"], baseIndex);
  }

  if (surprise) {
    const surpriseTopMap = {
      Cozy: "contrast-trim cardigan top",
      Confident: "sleek square-neck fitted top",
      Feminine: "soft wrap blouse with a gentle V-neck",
      Powerful: "strong-shoulder blouse",
      Relaxed: "classic Breton stripe tee",
      Elegant: "clean bateau-neck top",
      Romantic: "gentle sweetheart-neck blouse",
      Minimalist: "sleek sleeveless shell top",
      Playful: "color-pop knit top",
    };
    top = surpriseTopMap[form.mood] || top;
  }

  const why = `${form.weather}, ${form.temperature.toLowerCase()} conditions, your ${form.occasion.toLowerCase()} plans, and your ${form.mood.toLowerCase()} mood all point toward a look that feels practical, flattering, and realistic for everyday wear.`;
  const note = surprise
    ? "Your Surprise Me result keeps the outfit wearable, but adds a slightly fresher twist in shape, neckline, or styling detail."
    : "This look stays grounded in real-life pieces most women already own or can easily build around.";

  return { top, bottom, shoes, outerwear, stylingAdjustment, why, note };
}

function SelectCard({ label, value, options, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#7f6673]">{label}</label>
      <div className="grid grid-cols-1">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl border border-[#ecdfe6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#c7a2b5]"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function AdBox() {
  return (
    <Card className="rounded-3xl border-[#eadde4] shadow-sm">
      <CardContent className="min-h-[250px] p-6 flex flex-col justify-center">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#a08493]">Ad Space</p>
        <p className="mt-3 text-sm text-gray-600 leading-6">
          Reserved for Google AdSense placement.
        </p>
      </CardContent>
    </Card>
  );
}

export default function OutfitToolLandingPage() {
  const [form, setForm] = useState(formDefaults);
  const [result, setResult] = useState(() => generateOutfit(formDefaults, 0, false));
  const [generateCount, setGenerateCount] = useState(0);
  const [showPremiumInfo, setShowPremiumInfo] = useState(false);
  const [isSurpriseActive, setIsSurpriseActive] = useState(false);

  const remainingGenerations = Math.max(0, 3 - generateCount);

  const personalizedGreeting = useMemo(() => {
    if (!form.name.trim()) return "Today’s Outfit";
    return `${form.name.trim()}'s Outfit`;
  }, [form.name]);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleGenerate = (surprise = false, countRegeneration = false) => {
    setIsSurpriseActive(surprise);
    const nextCount = countRegeneration ? generateCount + 1 : generateCount;
    setResult(generateOutfit(form, nextCount, surprise));
    if (countRegeneration) setGenerateCount(nextCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8eef3] via-[#fbf7f9] to-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <header className="text-center max-w-5xl mx-auto relative overflow-hidden rounded-[36px] px-6 py-12 min-h-[280px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(190,150,170,0.16),transparent_58%),radial-gradient(circle_at_bottom_right,rgba(220,190,205,0.14),transparent_42%)] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80"
              alt="Elegant wardrobe lifestyle banner"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbf6f8]/95 via-[#f8eef3]/88 to-[#fbf7f9]/94" />
            <div className="absolute left-8 top-10 h-28 w-28 rounded-full bg-[#edd8e2]/60 blur-2xl" />
            <div className="absolute right-10 top-8 h-40 w-40 rounded-full bg-[#e8d1db]/55 blur-3xl" />
            <div className="absolute left-[8%] bottom-8 h-24 w-40 rounded-[28px] border border-white/50 bg-white/25 backdrop-blur-sm rotate-[-6deg]" />
            <div className="absolute right-[10%] bottom-10 h-28 w-44 rounded-[28px] border border-white/50 bg-white/30 backdrop-blur-sm rotate-[7deg]" />
            <div className="absolute left-1/2 top-1/2 h-44 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[40px] border border-white/35 bg-white/10 backdrop-blur-[2px]" />
          </div>
          <div className="relative z-10">
          <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[#a07c90]">Smart Outfit Planner</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-[#6d4d60] leading-tight">What Should I Wear Today?</h1>
          <p className="mt-5 text-lg md:text-xl text-gray-600 leading-8 max-w-3xl mx-auto">
            A smart free outfit tool that helps women choose what to wear based on weather,
            temperature, occasion, mood, comfort, effort, and environment — without overthinking.
          </p>
        </div>
        </header>

        <div className="mt-10 grid lg:grid-cols-[1.5fr_0.6fr] gap-8 items-start">
          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-[28px] border-[#eadde4] shadow-sm overflow-hidden">
              <CardHeader className="pb-4 bg-white">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl text-[#6d4d60]">Free Outfit Tool</CardTitle>
                    <p className="mt-2 text-gray-600 leading-7 max-w-2xl">
                      Full premium-feeling demo. No wardrobe setup required. Just answer a few things about today and get a smart outfit suggestion instantly.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f7eff3] px-4 py-2 text-sm font-medium text-[#8d687c] flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> No app needed
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 md:p-8 bg-[#fffdfd]">
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-[#7f6673]">Your Name (optional)</label>
                    <Input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Emma"
                      className="rounded-2xl border-[#ecdfe6] h-12"
                    />
                  </div>

                  <SelectCard label="Weather" value={form.weather} options={weatherOptions} onChange={(value) => updateField("weather", value)} />
                  <SelectCard label="Temperature" value={form.temperature} options={temperatureOptions} onChange={(value) => updateField("temperature", value)} />
                  <SelectCard label="Occasion" value={form.occasion} options={occasionOptions} onChange={(value) => updateField("occasion", value)} />
                  <SelectCard label="Mood" value={form.mood} options={moodOptions} onChange={(value) => updateField("mood", value)} />
                  <SelectCard label="Comfort Level" value={form.comfort} options={comfortOptions} onChange={(value) => updateField("comfort", value)} />
                  <SelectCard label="Effort Level" value={form.effort} options={effortOptions} onChange={(value) => updateField("effort", value)} />
                  <div className="md:col-span-2">
                    <SelectCard label="Environment" value={form.environment} options={environmentOptions} onChange={(value) => updateField("environment", value)} />
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button className="rounded-2xl h-12 px-6 bg-[#6d4d60] hover:bg-[#5f4153]" onClick={() => handleGenerate(false, false)}>
                    <Shirt className="w-4 h-4 mr-2" /> Get My Outfit
                  </Button>
                  <Button variant="outline" className={`rounded-2xl h-12 px-6 border-[#d9c0cc] text-[#6d4d60] ${isSurpriseActive ? 'bg-[#f7eff3] border-[#cfaebe]' : ''}`} onClick={() => handleGenerate(true, false)}>
                    <Sparkles className="w-4 h-4 mr-2" /> Surprise Me
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl h-12 px-6 border-[#e6d7de]"
                    disabled={remainingGenerations === 0}
                    onClick={() => handleGenerate(false, true)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Generate Again {remainingGenerations > 0 ? `(${remainingGenerations} left)` : ""}
                  </Button>
                </div>

                <div className="mt-8 grid xl:grid-cols-[1.1fr_0.9fr] gap-5">
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} key={`${result.top}-${result.bottom}-${result.shoes}-${result.outerwear}`}>
                    <Card className="rounded-3xl border-[#eadde4] bg-[#fcf7fa] shadow-none">
                      <CardContent className="p-6 md:p-7">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#a07c90]">Main Result</p>
                            <h3 className="mt-2 text-2xl font-bold text-[#6d4d60]">{personalizedGreeting}</h3>
                          </div>
                          <div className="rounded-2xl bg-white px-3 py-2 border border-[#eadde4] text-xs font-semibold text-[#8b667a]">Free Demo</div>
                        </div>

                        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-[15px]">
                          <div className="rounded-2xl bg-white border border-[#eee2e8] p-4"><span className="font-semibold text-[#7e5f70]">Top:</span><div className="mt-1">{result.top}</div></div>
                          <div className="rounded-2xl bg-white border border-[#eee2e8] p-4"><span className="font-semibold text-[#7e5f70]">Bottom:</span><div className="mt-1">{result.bottom}</div></div>
                          <div className="rounded-2xl bg-white border border-[#eee2e8] p-4"><span className="font-semibold text-[#7e5f70]">Shoes:</span><div className="mt-1">{result.shoes}</div></div>
                          <div className="rounded-2xl bg-white border border-[#eee2e8] p-4"><span className="font-semibold text-[#7e5f70]">Outerwear:</span><div className="mt-1">{result.outerwear}</div></div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-white border border-[#eee2e8] p-4">
                          <span className="font-semibold text-[#7e5f70]">Styling detail:</span>
                          <div className="mt-1">{result.stylingAdjustment}</div>
                        </div>

                        <div className="mt-6 rounded-2xl bg-white border border-[#eee2e8] p-5">
                          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#a07c90]">Why this works</p>
                          <p className="mt-3 text-gray-700 leading-7">{result.why}</p>
                          <p className="mt-4 italic text-[#6d4d60] leading-7">{result.note}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <div className="space-y-5">
                    <Card className="rounded-3xl border-[#eadde4] shadow-none">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-[#6d4d60] font-semibold text-lg">
                          <Lock className="w-5 h-5" /> Unlock My Full Wardrobe Assistant
                        </div>
                        <p className="mt-3 text-gray-600 leading-7">
                          Upgrade when you want deeper personalization, wardrobe-based suggestions, and alternative styling ideas.
                        </p>

                        <Dialog open={showPremiumInfo} onOpenChange={setShowPremiumInfo}>
                          <DialogTrigger asChild>
                            <Button className="mt-5 rounded-2xl h-12 px-5 bg-[#6d4d60] hover:bg-[#5f4153]">
                              See Premium Details <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-3xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl text-[#6d4d60]">Premium Includes</DialogTitle>
                              <DialogDescription className="mt-2 text-gray-600">
                                Clear upgrade info before you decide.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 text-sm text-gray-700 leading-7">
                              <div className="rounded-2xl border p-4">📊 Full Google Sheets system</div>
                              <div className="rounded-2xl border p-4">👗 Personal wardrobe organization</div>
                              <div className="rounded-2xl border p-4">✨ Alternative outfit suggestions</div>
                              <div className="rounded-2xl border p-4">🎯 Deep styling personalization</div>
                              <div className="rounded-2xl border p-4">📱 Works on phone, tablet, and desktop</div>
                              <div className="rounded-2xl border p-4">🔗 Instant access via PDF link</div>
                              <div className="rounded-2xl bg-[#faf3f6] border p-4 font-medium text-[#6d4d60]">📌 Google Sheets Only — No App Required</div>
                              
                            </div>
                            <a href="https://uniafekipublishing.etsy.com/listing/4486634808" target="_blank" rel="noopener noreferrer">
                              <Button className="mt-2 rounded-2xl h-12 bg-[#6d4d60] hover:bg-[#5f4153]">Go to Etsy Premium</Button>
                            </a>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-[#eadde4] shadow-none">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-[#6d4d60] flex items-center gap-2">✨ Why Women Love This Tool</h3>
                        <ul className="mt-4 space-y-3 text-gray-700">
                          <li className="flex gap-3"><Heart className="w-4 h-4 mt-1 text-[#b48a9d]" /> Save time every morning</li>
                          <li className="flex gap-3"><Heart className="w-4 h-4 mt-1 text-[#b48a9d]" /> Stop outfit decision fatigue</li>
                          <li className="flex gap-3"><Heart className="w-4 h-4 mt-1 text-[#b48a9d]" /> Feel more confident before leaving home</li>
                          <li className="flex gap-3"><Heart className="w-4 h-4 mt-1 text-[#b48a9d]" /> Dress for real life, not just inspiration boards</li>
                          <li className="flex gap-3"><Heart className="w-4 h-4 mt-1 text-[#b48a9d]" /> Get a smart result without wardrobe setup</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <aside className="space-y-6 lg:sticky lg:top-6 self-start">
            <AdBox />
            <AdBox />
          </aside>
        </div>

        <section className="mt-10 grid md:grid-cols-3 gap-5">
          <Card className="rounded-3xl border-[#eadde4] shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-[#6d4d60] font-semibold"><CloudSun className="w-5 h-5" /> Smart inputs</div>
              <p className="mt-3 text-gray-600 leading-7">The system balances weather, temperature, occasion, comfort, mood, effort, and environment — not random guesses.</p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-[#eadde4] shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-[#6d4d60] font-semibold"><Gem className="w-5 h-5" /> Premium Upgrade</div>
              <p className="mt-3 text-gray-600 leading-7">Free gives you a strong result instantly. Premium adds your wardrobe, alternative looks, deeper personalization, and the full assistant experience.</p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-[#eadde4] shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-[#6d4d60] font-semibold"><Shield className="w-5 h-5" /> Clear & Easy Access</div>
              <p className="mt-3 text-gray-600 leading-7">No app needed. Try the tool online, then upgrade only if you want the full Google Sheets system with wardrobe support and styling depth.</p>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-12 border-t border-[#efe1e8] pt-8 pb-4 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <p>Smart Outfit Planner — free daily outfit tool.</p>
            <div className="flex flex-wrap gap-4">
              <a href="/privacy-policy" className="hover:text-[#6d4d60]">Privacy Policy</a>
              <a href="/terms-of-use" className="hover:text-[#6d4d60]">Terms of Use</a>
              <a href="https://uniafekipublishing.etsy.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#6d4d60]">Contact via Etsy</a>
            </div>
          </div>
        <p className="mt-4 text-xs text-gray-400">© 2026 UniaFeki Publishing. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
