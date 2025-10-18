import { useMemo, useState, useEffect } from "react";
import type { Route } from "./+types/indoor-plants-watering-calculator";

export const meta: Route.MetaFunction = () => [
  {
    title: "Indoor Plants Watering Calculator | AllPlantCare 🌿",
  },
  {
    name: "description",
    content:
      "Not sure when to water your houseplants? Try AllPlantCare’s free Indoor Plants Watering Calculator! 🌱 Get instant, personalized watering schedules based on pot size, soil mix, and humidity — perfect for keeping your indoor plants thriving.",
  },
  { name: "robots", content: "index,follow" },
  { name: "theme-color", content: "#f8f5f2" },
  {
    property: "og:title",
    content: "Indoor Plants Watering Calculator | AllPlantCare 🌿",
  },
  {
    property: "og:description",
    content:
      "Find out exactly how often to water your houseplants with our friendly calculator. Adjust for pot size, light, soil, and humidity — and never overwater again!",
  },
  {
    property: "og:url",
    content: "https://allplantcare.com/indoor-plants-watering-calculator",
  },
  {
    property: "og:image",
    content: "https://allplantcare.com/images/og-plant-watering.jpg",
  },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  {
    name: "twitter:title",
    content: "Indoor Plants Watering Calculator | AllPlantCare 🌿",
  },
  {
    name: "twitter:description",
    content:
      "Water your plants the smart way! Get your personalized indoor watering plan instantly — based on soil, light, and pot details.",
  },
  {
    name: "twitter:image",
    content: "https://allplantcare.com/images/og-plant-watering.jpg",
  },
  {
    rel: "canonical",
    href: "https://allplantcare.com/indoor-plants-watering-calculator",
  },
];

/* ---------- constants ---------- */
const PLANTS = [
  { id: "succulent", label: "Succulent / Cactus", thirst: 0.6 },
  { id: "tropical", label: "Tropical Foliage (Monstera, Pothos)", thirst: 1.0 },
  { id: "fern", label: "Fern / Calathea", thirst: 1.3 },
  {
    id: "flowering",
    label: "Flowering Plant (Anthurium, African Violet)",
    thirst: 1.1,
  },
  { id: "herb", label: "Herb / Edible (Basil, Mint)", thirst: 1.2 },
];
const SOIL = [
  { id: "fast", label: "Fast-draining", hold: 0.25 },
  { id: "balanced", label: "Balanced", hold: 0.35 },
  { id: "moist", label: "Moist-retentive", hold: 0.45 },
];
const LIGHT = [
  { id: "low", label: "Low", light: 0.8 },
  { id: "med", label: "Medium", light: 1.0 },
  { id: "bright", label: "Bright / Direct Sun", light: 1.3 },
];
const MATERIAL = [
  { id: "terracotta", label: "Terracotta / Clay", evap: 1.2 },
  { id: "ceramic", label: "Glazed Ceramic", evap: 1.0 },
  { id: "plastic", label: "Plastic", evap: 0.9 },
  { id: "metal", label: "Metal", evap: 1.1 },
];

/* ---------- helpers ---------- */
function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}
function toC(v: number, u: string) {
  return u === "C" ? v : (v - 32) * (5 / 9);
}
function cm(v: number, u: string) {
  return u === "cm" ? v : v * 2.54;
}
function liters(cc: number) {
  return cc / 1000;
}
function nextDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + Math.round(days));
  return d.toLocaleDateString();
}
function calc({
  diameter,
  height,
  thirst,
  soilHold,
  lightF,
  humidity,
  temp,
  tempU,
  unitL,
  potEvap,
}: any) {
  const d = cm(diameter, unitL);
  const h = cm(height, unitL);
  const volume = Math.PI * (d / 2) ** 2 * h;
  const soilL = liters(volume) * 0.85;
  const hold = soilL * soilHold;
  const baseLoss = 0.02;
  const loss =
    baseLoss *
    thirst *
    lightF *
    potEvap *
    (1 + (22 - toC(temp, tempU)) * 0.05) *
    (1 + (50 - humidity) * 0.012);
  const days = clamp((hold * 0.7) / loss, 2, 28);
  const ml = clamp(hold * 700, 80, 3000);
  return { days, ml, soilL: soilL.toFixed(2), next: nextDate(days) };
}

/* ---------- page ---------- */
export default function IndoorPlantWateringCalculator() {
  const [plant, setPlant] = useState("tropical");
  const [soil, setSoil] = useState("balanced");
  const [light, setLight] = useState("med");
  const [material, setMaterial] = useState("ceramic");
  const [unitL, setUnitL] = useState("cm");
  const [unitT, setUnitT] = useState("C");
  const [diam, setDiam] = useState<number | "">("");
  const [h, setH] = useState<number | "">("");
  const [hum, setHum] = useState<number | "">("");
  const [temp, setTemp] = useState<number | "">("");

  const thirst = PLANTS.find((x) => x.id === plant)?.thirst ?? 1;
  const soilHold = SOIL.find((x) => x.id === soil)?.hold ?? 0.35;
  const lightF = LIGHT.find((x) => x.id === light)?.light ?? 1;
  const potEvap = MATERIAL.find((x) => x.id === material)?.evap ?? 1;

  const ready = diam !== "" && h !== "" && hum !== "" && temp !== "";
  const result = useMemo(() => {
    if (!ready) return { days: 0, ml: 0, soilL: "0.00", next: ", " };
    return calc({
      diameter: +diam,
      height: +h,
      thirst,
      soilHold,
      lightF,
      humidity: +hum,
      temp: +temp,
      tempU: unitT,
      unitL,
      potEvap,
    });
  }, [
    ready,
    diam,
    h,
    thirst,
    soilHold,
    lightF,
    hum,
    temp,
    unitT,
    unitL,
    potEvap,
  ]);

  /* --- SEO structured data injection --- */
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Indoor Plants Watering Calculator",
      description:
        "Personalized watering calculator for indoor plants. Learn how often and how much to water based on pot size, soil mix, light level, and room conditions.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://allplantcare.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Indoor Plants Watering Calculator",
            item: "https://allplantcare.com/indoor-plants-watering-calculator",
          },
        ],
      },
      mainEntity: {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How accurate is this Indoor Plants Watering Calculator?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This calculator provides an estimate based on plant type, soil mix, pot material, and environmental conditions. Always check soil moisture manually before watering.",
            },
          },
          {
            "@type": "Question",
            name: "Why does pot material affect how often I water my plants?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Terracotta and clay pots allow faster evaporation, while plastic or glazed ceramic pots retain moisture longer, requiring less frequent watering.",
            },
          },
          {
            "@type": "Question",
            name: "How do temperature and humidity change watering needs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Warm, dry environments accelerate evaporation, increasing watering frequency. Cooler, humid rooms retain moisture longer, reducing watering needs.",
            },
          },
          {
            "@type": "Question",
            name: "Should I water my indoor plants less in winter?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In cooler months with reduced sunlight, plants consume less water. Increase watering intervals by 20–40%.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use this calculator for outdoor or balcony plants?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, but account for weather factors like rainfall, direct sun, and wind, which accelerate water loss.",
            },
          },
          {
            "@type": "Question",
            name: "How do I know if my pot has proper drainage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Check that your pot has at least one drainage hole to prevent waterlogging and root rot.",
            },
          },
          {
            "@type": "Question",
            name: "What are signs that my plant is overwatered?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yellowing leaves, soggy soil, or mold growth often indicate overwatering. Let the soil dry before the next watering.",
            },
          },
          {
            "@type": "Question",
            name: "What are signs of underwatering?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Crispy leaves, drooping stems, and dry soil pulling from pot edges indicate underwatering. Water deeply until some drains from the bottom.",
            },
          },
        ],
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f5f2] text-[#35463d]">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* breadcrumb */}
        <div className="text-sm font-medium text-[#b6571e] bg-[#fff8f5] py-3 px-4 border-b mt-4 rounded-lg border-[#ecd5c3] mb-8">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          ›{" "}
          <span className="text-[#35463d]">
            Indoor Plants Watering Calculator
          </span>
        </div>

        {/* intro */}
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#35594a]">
            Indoor Plants Watering Calculator 🌿
          </h1>
          <p className="mt-3 text-lg text-[#4f5f55] max-w-3xl mx-auto">
            Find your plant’s ideal watering rhythm. Enter pot size, soil type,
            and room conditions to get a plan that keeps your greenery perfectly
            hydrated.
          </p>
        </section>

        {/* calculator */}
        <CalculatorSection
          unitL={unitL}
          unitT={unitT}
          setUnitL={setUnitL}
          setUnitT={setUnitT}
          plant={plant}
          setPlant={setPlant}
          soil={soil}
          setSoil={setSoil}
          light={light}
          setLight={setLight}
          material={material}
          setMaterial={setMaterial}
          diam={diam}
          setDiam={setDiam}
          h={h}
          setH={setH}
          hum={hum}
          setHum={setHum}
          temp={temp}
          setTemp={setTemp}
          ready={ready}
          result={result}
        />

        {/* why it matters */}
        <section className="bg-[#fff8f7] rounded-2xl p-8 mb-10">
          <h3 className="text-2xl font-semibold text-[#b6571e] mb-3">
            🌿 Why Proper Watering Matters
          </h3>
          <p className="text-[#4f5f55] leading-relaxed">
            Watering isn’t just about quenching thirst, it’s about balance.
            Overwatering drowns roots, while underwatering leaves them gasping.
            Proper watering lets roots breathe and plants thrive naturally.
          </p>
          <p className="mt-3 text-[#4f5f55]">
            With a routine that matches your plant’s lifestyle, you’ll enjoy
            fewer pests, brighter foliage, and consistent growth.
          </p>
        </section>

        {/* how it works */}
        <section className="p-8 mb-10 border-t border-[#e4e4e4] bg-white rounded-2xl shadow-sm">
          <h3 className="text-2xl font-semibold text-[#35594a] mb-3">
            🌸 How the Calculator Works
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 mt-4 text-[#4f5f55]">
            <div className="bg-[#fffaf9] rounded-xl p-4 border border-[#f2e2e2] shadow-sm">
              <h4 className="font-semibold text-[#b6571e] mb-1">
                1. Pot Volume
              </h4>
              <p>
                We start by estimating your pot’s volume to understand soil
                capacity and moisture storage potential.
              </p>
            </div>
            <div className="bg-[#fffaf9] rounded-xl p-4 border border-[#f2e2e2] shadow-sm">
              <h4 className="font-semibold text-[#b6571e] mb-1">
                2. Water Retention
              </h4>
              <p>
                Soil mix, light, and pot material adjust how much water
                evaporates over time.
              </p>
            </div>
            <div className="bg-[#fffaf9] rounded-xl p-4 border border-[#f2e2e2] shadow-sm">
              <h4 className="font-semibold text-[#b6571e] mb-1">
                3. Environment
              </h4>
              <p>
                Temperature and humidity fine-tune evaporation rate to predict
                realistic watering intervals.
              </p>
            </div>
          </div>
        </section>

        {/* knowledge sections */}
        <section className="bg-[#fffaf9] rounded-2xl p-8 mb-10">
          <h3 className="text-2xl font-semibold text-[#b6571e] mb-4 text-center">
            🌱 Understanding Watering Needs
          </h3>
          <p className="text-[#4f5f55] max-w-3xl mx-auto leading-relaxed text-center mb-6">
            Every plant has unique watering requirements depending on its
            species, environment, and container. Knowing what affects water
            retention helps you create a schedule that mimics nature, keeping
            your indoor garden thriving.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[#4f5f55]">
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">Plant Type</h4>
              <p>
                Succulents store water in leaves, needing less frequent
                watering. Tropical plants, like Monstera or Pothos, prefer
                consistently moist soil. Always identify your plant family
                first.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                Pot Size & Depth
              </h4>
              <p>
                Large, deep pots retain moisture longer, while small or shallow
                pots dry out quickly. The calculator accounts for both diameter
                and height to balance water volume.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">Soil Mix</h4>
              <p>
                Fast-draining cactus soil releases water quickly, while
                moisture-retentive soil holds it longer. Match soil type to
                plant species for optimal root health.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">Humidity</h4>
              <p>
                High humidity slows evaporation. In dry homes or heated rooms,
                soil dries faster, especially in winter.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                Light Exposure
              </h4>
              <p>
                Plants under direct sunlight lose water quickly through leaves
                and soil. Shade-tolerant plants use less water and thrive on
                gentler light cycles.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                Pot Material
              </h4>
              <p>
                Terracotta “breathes,” allowing water to evaporate through the
                pot. Glazed ceramic or plastic pots trap moisture and extend
                watering intervals.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fff8f7] rounded-2xl p-8 mb-10">
          <h3 className="text-2xl font-semibold text-[#b6571e] mb-4 text-center">
            💧 Best Watering Practices
          </h3>
          <p className="text-[#4f5f55] max-w-3xl mx-auto leading-relaxed text-center mb-6">
            The way you water your plant is just as important as how often.
            Follow these easy techniques to keep your houseplants hydrated and
            happy without overdoing it.
          </p>
          <ul className="list-disc list-inside max-w-3xl mx-auto space-y-2 text-[#4f5f55]">
            <li>
              <strong>Water thoroughly:</strong> Pour water until a little
              drains from the bottom, ensuring all roots get moisture.
            </li>
            <li>
              <strong>Use room-temperature water:</strong> Cold water can shock
              roots, while warm water encourages bacteria growth.
            </li>
            <li>
              <strong>Morning is best:</strong> Water early in the day so the
              plant absorbs moisture before evening temperature drops.
            </li>
            <li>
              <strong>Check the topsoil:</strong> If the top 2–3 cm (1 inch)
              feels dry, it’s time to water again.
            </li>
            <li>
              <strong>Rotate your plant:</strong> Even exposure helps soil dry
              evenly, avoiding fungus buildup on one side.
            </li>
            <li>
              <strong>Use humidity trays:</strong> For tropical plants, set pots
              on pebble trays with water to maintain gentle moisture.
            </li>
          </ul>
        </section>

        <section className="bg-[#fffaf5] rounded-2xl p-8 mb-10">
          <h3 className="text-2xl font-semibold text-[#b6571e] mb-4 text-center">
            🪴 Common Watering Mistakes & Fixes
          </h3>
          <p className="text-[#4f5f55] max-w-3xl mx-auto leading-relaxed text-center mb-6">
            Most plant issues come from either too much or too little water.
            Here’s how to identify, prevent, and fix common problems easily.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto text-[#4f5f55]">
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🚫 Overwatering
              </h4>
              <p>
                Symptoms include yellowing leaves, soggy soil, and root rot
                smell. Let the soil dry completely, check drainage holes, and
                reduce watering frequency.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                💨 Underwatering
              </h4>
              <p>
                Dry soil pulling from pot edges, crispy leaves, and drooping
                stems are signs. Water thoroughly until excess drains from the
                pot, and ensure soil rehydrates evenly.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                ⚡ Inconsistent Routine
              </h4>
              <p>
                Skipping or flooding your plants creates stress. Set reminders
                or use smart watering systems to maintain a consistent rhythm.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🌿 Poor Drainage
              </h4>
              <p>
                Always use pots with drainage holes and elevate them slightly to
                prevent water from pooling at the bottom.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fff8f5] rounded-2xl p-8 mb-10 border border-[#f1ddd2]">
          <h3 className="text-2xl font-semibold text-[#b6571e] mb-4 text-center">
            🌼 Expert Tips & Quick References
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[#4f5f55] max-w-5xl mx-auto">
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🕒 Best Watering Time
              </h4>
              <p>
                Morning watering prevents fungal growth and gives plants time to
                absorb moisture before cooler night hours.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🌤️ Seasonal Adjustment
              </h4>
              <p>
                In summer, increase watering frequency slightly. In winter,
                reduce it and ensure soil has time to dry between cycles.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🌾 Water Quality
              </h4>
              <p>
                Use filtered or rainwater when possible. Tap water with chlorine
                or fluoride may stress sensitive houseplants over time.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🪣 Watering Tools
              </h4>
              <p>
                Use a narrow-spout watering can for precision and a moisture
                meter or probe to check soil hydration levels accurately.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🌡️ Ideal Room Conditions
              </h4>
              <p>
                Maintain 18–25 °C and 40–60 % humidity for most indoor plants.
                Pair with gentle air circulation to avoid stagnant moisture.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🔄 Watering Consistency
              </h4>
              <p>
                Consistency is key. Use reminders, smart home apps, or routines
                tied to your calendar to avoid long dry spells.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf5] rounded-xl p-5 mb-8 border border-[#eadfd5] max-w-3xl mx-auto text-sm text-[#4f5f55]">
          <h3 className="font-semibold text-[#35594a] mb-2 text-center">
            🌼 Quick Summary
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Most indoor plants thrive with watering every 5–10 days depending
              on humidity, soil, and pot size.
            </li>
            <li>
              Terracotta pots dry faster; plastic or ceramic retain moisture
              longer.
            </li>
            <li>
              Ideal room humidity: 40–60%. Check soil moisture before watering.
            </li>
            <li>
              Morning watering supports healthy photosynthesis and prevents root
              rot.
            </li>
          </ul>
        </section>

        <section className="bg-[#fffefc] rounded-2xl p-8 mb-10 border border-[#efe3d9]">
          <h3 className="text-2xl font-semibold text-[#b6571e] mb-4 text-center">
            🌸 Recommended Tools for Healthy Plants
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[#4f5f55] max-w-5xl mx-auto">
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🪣 Moisture Meter
              </h4>
              <p>
                Instantly check if your soil needs watering, no more guessing or
                root damage from overwatering.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🌡️ Digital Hygrometer
              </h4>
              <p>
                Monitor room humidity and temperature to keep tropical plants
                thriving year-round.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ecd5c3] shadow-sm">
              <h4 className="font-semibold text-[#35594a] mb-1">
                🚿 Narrow-Spout Watering Can
              </h4>
              <p>
                Gives you control to water roots directly and avoid splashing
                leaves.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center text-sm text-[#777] mt-8">
          <p>
            Reviewed by <strong>AllPlantCare Team</strong>, passionate plant
            hobbyists and horticulture enthusiasts.
          </p>
          <p className="text-xs mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-[#fdfaf7] rounded-2xl p-8 mb-10">
          <h3 className="text-2xl font-semibold text-[#b6571e] mb-3 text-center">
            💧 Frequently Asked Questions
          </h3>
          <div className="text-[#4f5f55] space-y-6 max-w-3xl mx-auto leading-relaxed">
            <FAQ
              q="How accurate is this Indoor Plants Watering Calculator?"
              a="This calculator provides a realistic estimate based on your plant type, soil mix, pot material, and environment. While the algorithm uses tested formulas, always confirm by checking soil moisture 2–3 cm below the surface before watering."
            />
            <FAQ
              q="Why does pot material affect how often I water my plants?"
              a="Terracotta and clay pots breathe, allowing moisture to escape faster, ideal for succulents and cacti. Plastic or glazed ceramic pots retain more moisture, making them better for tropical or moisture-loving plants."
            />
            <FAQ
              q="How do temperature and humidity change watering needs?"
              a="Warm, dry air accelerates evaporation, while cool, humid air slows it. If your home is air-conditioned or heated, expect soil to dry out faster and water slightly more often."
            />
            <FAQ
              q="Should I water my indoor plants less in winter?"
              a="Yes. Plants grow slower in cooler months with less sunlight, meaning they consume less water. Increase watering intervals by 20–40% during winter."
            />
            <FAQ
              q="Can I use this calculator for outdoor or balcony plants?"
              a="Yes, but remember to factor in rainfall, wind, and direct sun exposure. Outdoor conditions dramatically increase water loss, especially in summer."
            />
            <FAQ
              q="How do I know if my pot has proper drainage?"
              a="Ensure at least one drainage hole at the bottom of your pot. Good drainage prevents root rot and helps excess water escape after watering."
            />
            <FAQ
              q="What are signs that my plant is overwatered?"
              a="Yellowing leaves, soggy soil, fungus gnats, and a musty smell indicate overwatering. Let the soil dry out before resuming normal watering."
            />
            <FAQ
              q="What are signs of underwatering?"
              a="Crispy leaf edges, drooping stems, and dry soil that pulls away from the pot’s sides suggest underwatering. Water thoroughly until it drains from the bottom."
            />
          </div>
        </section>

        {/* disclaimer */}
        <section className="text-sm text-[#6b7a70] border-t border-[#e4e4e4] pt-6">
          <h4 className="font-semibold text-[#35594a] mb-1">Disclaimer</h4>
          <p>
            This calculator provides guidance, not strict rules. Always observe
            your plant’s soil and environment, adjust watering frequency based
            on real conditions.
          </p>
        </section>
      </div>

      <footer className="text-center text-xs text-[#7b857f] py-10">
        © {new Date().getFullYear()} AllPlantCare, made with 💖 for plant
        lovers
      </footer>
    </main>
  );
}

/* ---------- subcomponents ---------- */
function Nav() {
  return (
    <header className="bg-white shadow-sm border-b border-[#e2e8e2]">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <a href="/" className="text-2xl font-extrabold text-[#35594a]">
          🌷 AllPlantCare
        </a>
        <nav className="space-x-6 text-sm text-[#4f5f55]">
          <a
            href="/indoor-plants-watering-calculator"
            className="text-pink-600 font-medium"
          >
            Watering Calculator
          </a>
        </nav>
      </div>
    </header>
  );
}

function CalculatorSection({
  unitL,
  unitT,
  setUnitL,
  setUnitT,
  plant,
  setPlant,
  soil,
  setSoil,
  light,
  setLight,
  material,
  setMaterial,
  diam,
  setDiam,
  h,
  setH,
  hum,
  setHum,
  temp,
  setTemp,
  ready,
  result,
}: any) {
  return (
    <section className="bg-white border border-[#e4e4e4] rounded-2xl shadow-sm p-8 mb-12">
      <h2 className="text-2xl font-semibold text-center text-[#35594a] mb-6">
        Watering Schedule Calculator
      </h2>
      <div className="flex flex-wrap justify-center gap-5 mb-8">
        <ToggleGroup
          label="Length"
          value={unitL}
          onChange={setUnitL}
          options={["cm", "inch"]}
        />
        <ToggleGroup
          label="Temperature"
          value={unitT}
          onChange={setUnitT}
          options={["C", "F"]}
          prefix="°"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Select
          label="Plant type"
          value={plant}
          onChange={setPlant}
          options={PLANTS}
        />
        <Select
          label="Soil mix"
          value={soil}
          onChange={setSoil}
          options={SOIL}
        />
        <Select
          label="Light level"
          value={light}
          onChange={setLight}
          options={LIGHT}
        />
        <Select
          label="Pot material"
          value={material}
          onChange={setMaterial}
          options={MATERIAL}
        />
        <Input
          label={`Pot diameter (${unitL})`}
          value={diam}
          onChange={setDiam}
          placeholder="e.g., 15"
        />
        <Input
          label={`Pot height (${unitL})`}
          value={h}
          onChange={setH}
          placeholder="e.g., 15"
        />
        <Input
          label="Humidity (%)"
          value={hum}
          onChange={setHum}
          placeholder="e.g., 50"
        />
        <Input
          label={`Temperature (°${unitT})`}
          value={temp}
          onChange={setTemp}
          placeholder="e.g., 22"
        />
      </div>

      <div className="mt-10 text-center bg-[#fff6f8] border border-pink-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-[#35594a] mb-3">
          Your Watering Plan
        </h3>
        {ready ? (
          <>
            <p className="text-2xl font-bold text-[#3f4c43]">
              Water every{" "}
              <span className="text-pink-700">{Math.round(result.days)}</span>{" "}
              days
            </p>
            <p className="text-lg text-[#555] mt-2">
              About{" "}
              <strong className="text-pink-700">{Math.round(result.ml)}</strong>{" "}
              ml each time
            </p>
            <p className="text-sm text-[#4f5f55] mt-2">
              Next watering:{" "}
              <span className="font-semibold text-[#35594a]">
                {result.next}
              </span>
            </p>
            <p className="text-xs text-[#6b7a70] mt-3">
              Soil volume: {result.soilL} L • gentle estimate 🌱
            </p>
          </>
        ) : (
          <p className="text-[#777]">Enter your details above to calculate.</p>
        )}
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }: any) {
  return (
    <label className="text-sm font-semibold text-[#2f3b34]">
      {label}
      <select
        className="w-full mt-1 p-2 border rounded-md bg-[#fffaf9] border-[#e2d5d5] text-[#35463d]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o: any) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Input({ label, value, onChange, placeholder }: any) {
  return (
    <label className="text-sm font-semibold text-[#2f3b34]">
      {label}
      <input
        type="number"
        placeholder={placeholder}
        className="w-full mt-1 p-2 border rounded-md bg-[#fffaf9] border-[#e2d5d5] text-[#35463d]"
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
    </label>
  );
}

function ToggleGroup({ label, value, onChange, options, prefix = "" }: any) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      <span>{label}:</span>
      <div className="inline-flex rounded-full border border-[#d7d7d7] overflow-hidden text-sm">
        {options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 ${value === opt ? "bg-pink-200 text-[#35594a]" : "bg-white text-[#555]"}`}
          >
            {prefix}
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-semibold text-[#35594a]">{q}</p>
      <p className="text-[#4f5f55] mt-1">{a}</p>
    </div>
  );
}
