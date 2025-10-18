import { useState } from "react";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
  { title: "AllPlantCare,  Smart Garden & Houseplant Calculators 🌿" },
  {
    name: "description",
    content:
      "Welcome to AllPlantCare,  home of simple, friendly tools for plant lovers! Try our Plant Spacing Calculator to plan your garden, or explore our Indoor Watering Calculator for healthy, thriving plants.",
  },
  { name: "robots", content: "index,follow" },
  { name: "theme-color", content: "#f8f5f2" },
];

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function toMeters(value: number, unit: string) {
  switch (unit) {
    case "ft":
      return value * 0.3048;
    case "cm":
      return value / 100;
    case "inch":
      return value * 0.0254;
    default:
      return value;
  }
}

export default function Index() {
  const [length, setLength] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [spacing, setSpacing] = useState<number | "">("");
  const [border, setBorder] = useState<number | "">(0);
  const [cost, setCost] = useState<number | "">("");
  const [areaUnit, setAreaUnit] = useState("m");
  const [spaceUnit, setSpaceUnit] = useState("cm");

  // Convert to meters
  const lengthM = length !== "" ? toMeters(Number(length), areaUnit) : 0;
  const widthM = width !== "" ? toMeters(Number(width), areaUnit) : 0;
  const spacingM = spacing !== "" ? toMeters(Number(spacing), spaceUnit) : 0;
  const borderM = border !== "" ? toMeters(Number(border), "cm") : 0;

  // Guard against invalid or extreme values
  const usableLength = Math.max(0, lengthM - 2 * borderM);
  const usableWidth = Math.max(0, widthM - 2 * borderM);

  // Area (outer and usable)
  const area =
    length !== "" && width !== "" ? (lengthM * widthM).toFixed(2) : "0";

  // Density (plants per m²)
  const density =
    spacingM && spacingM > 0 ? (1 / (spacingM * spacingM)).toFixed(2) : "0";

  // Total plants (accounting for borders)
  const total =
    spacingM > 0 && usableLength > 0 && usableWidth > 0
      ? Math.round((usableLength * usableWidth) / (spacingM * spacingM))
      : 0;

  // Total cost
  const totalCost =
    cost !== "" && total > 0 ? (Number(cost) * total).toFixed(2) : "0";

  // Grid display cap
  const cols = spacingM > 0 ? Math.floor(usableLength / spacingM) : 0;
  const rows = spacingM > 0 ? Math.floor(usableWidth / spacingM) : 0;
  const totalGrid = clamp(rows * cols, 0, 400);

  // Structured FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How often should I water my indoor plants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most houseplants prefer watering when the top 2–3 cm (1 inch) of soil feels dry to the touch. Water thoroughly until it drains from the pot, then empty any saucer underneath. Avoid overwatering, roots need oxygen as much as moisture. Tropical plants like ferns prefer slightly damp soil, while succulents and cacti should dry out completely before watering again.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best spacing for vegetable plants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spacing depends on the species and growth habit. Leafy greens such as lettuce and spinach thrive with 15–20 cm between plants. Root vegetables like carrots or beets need 25–30 cm, while larger crops such as tomatoes, peppers, and broccoli require 45–60 cm. Vining plants like pumpkins and melons need at least 1 meter of space. Proper spacing improves airflow, reduces disease, and boosts yield.",
        },
      },
      {
        "@type": "Question",
        name: "Do indoor plants need direct sunlight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most indoor plants thrive in bright, indirect sunlight. Direct sun can scorch leaves, especially for species like pothos, peace lilies, and snake plants. Place them near east or north-facing windows for filtered light. If your room is dim, consider LED grow lights designed for indoor greenery.",
        },
      },
      {
        "@type": "Question",
        name: "How can I prevent pests on my plants naturally?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prevent infestations by wiping leaves regularly with a damp cloth to remove dust and debris. Avoid overwatering, since damp soil attracts fungus gnats. Apply neem oil or insecticidal soap monthly as a preventative measure. Always isolate new plants for a few weeks before adding them to your collection.",
        },
      },
      {
        "@type": "Question",
        name: "What’s the best soil for indoor plants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use a lightweight, well-draining potting mix. Most houseplants prefer a blend of peat moss or coco coir, perlite, and compost. Succulents and cacti need sandy soil that drains quickly, while orchids prefer bark-based mixes that mimic their natural environment. Avoid garden soil indoors, it compacts easily and restricts airflow to roots.",
        },
      },
      {
        "@type": "Question",
        name: "Can I reuse potting soil from old plants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but refresh it before reuse. Remove old roots and debris, mix in fresh compost or perlite for structure, and bake or solarize the soil to eliminate pathogens. Discard soil from plants that had mold, rot, or pest infestations.",
        },
      },
      {
        "@type": "Question",
        name: "How do I choose the right pot size for my plant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Choose a pot that’s 2–5 cm wider than the plant’s current root ball. Pots that are too large retain water for too long, which can cause root rot. Ensure all pots have drainage holes. Terracotta pots are ideal for plants that prefer drier conditions, while glazed ceramic or plastic pots retain more moisture for tropical species.",
        },
      },
      {
        "@type": "Question",
        name: "How do seasons affect watering needs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "During spring and summer, plants actively grow and need more frequent watering. In autumn and winter, growth slows due to reduced light and lower temperatures, so reduce watering. Always check soil moisture before adding more water, overwatering in winter is a common mistake.",
        },
      },
      {
        "@type": "Question",
        name: "Should I fertilize plants year-round?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most houseplants benefit from fertilizer during their growing season (spring through late summer). Use a balanced liquid fertilizer every 4–6 weeks. Reduce or stop feeding in fall and winter when growth slows. Over-fertilizing can cause salt buildup and root burn.",
        },
      },
      {
        "@type": "Question",
        name: "What’s the benefit of using a plant spacing calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A plant spacing calculator helps you plan your garden layout efficiently by calculating how many plants fit in a given space while maintaining proper distance for healthy growth. It prevents overcrowding, improves airflow, reduces competition for nutrients, and helps estimate total plant cost before planting.",
        },
      },
      {
        "@type": "Question",
        name: "How do I improve humidity for indoor plants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many indoor plants, especially tropical ones, prefer 40–60% humidity. Increase humidity by grouping plants together, using pebble trays with water beneath pots, or running a humidifier nearby. Avoid misting at night, as it can promote fungal issues on leaves.",
        },
      },
      {
        "@type": "Question",
        name: "When should I repot my plant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repot every 12–18 months or when roots grow out of drainage holes. Use a pot that’s slightly larger than the current one and replace at least one-third of the old soil. Repotting in spring helps plants recover quickly and supports fresh growth.",
        },
      },
      {
        "@type": "Question",
        name: "Can I propagate my plants easily?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Many popular houseplants like pothos, philodendrons, and monsteras propagate easily through stem cuttings. Cut below a node, remove lower leaves, and place in water or moist soil until roots develop. Once roots are a few centimeters long, transplant into fresh potting mix.",
        },
      },
      {
        "@type": "Question",
        name: "Why are my plant’s leaves turning yellow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yellow leaves can indicate overwatering, nutrient deficiency, or lack of light. Ensure good drainage, adjust your watering schedule, and use balanced fertilizer during the growing season. Trim yellow leaves to encourage healthy new growth.",
        },
      },
      {
        "@type": "Question",
        name: "What’s the best natural way to clean plant leaves?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gently wipe leaves with a damp microfiber cloth or use a soft shower spray. For plants with fuzzy leaves, like African violets, use a soft brush instead of water. Keeping leaves dust-free helps improve light absorption and respiration.",
        },
      },
      {
        "@type": "Question",
        name: "How can I protect outdoor plants from heat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Water deeply early in the morning, apply mulch to retain soil moisture, and use shade cloth during extreme heat. Avoid watering midday when evaporation is highest. Choose drought-tolerant species for sun-exposed areas.",
        },
      },
      {
        "@type": "Question",
        name: "How can I protect my plants in winter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Move potted plants away from cold drafts and heating vents. Reduce watering, increase light exposure, and for outdoor plants, insulate soil with mulch or burlap. Most tropical plants should be brought indoors before frost.",
        },
      },
      {
        "@type": "Question",
        name: "Is rainwater better than tap water for plants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Rainwater is naturally soft, slightly acidic, and free from chlorine and minerals found in tap water. It’s ideal for sensitive plants like calatheas and ferns. Collect rainwater in clean containers for eco-friendly watering.",
        },
      },
      {
        "@type": "Question",
        name: "What’s the ideal temperature range for houseplants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most houseplants thrive between 18–27°C (65–80°F) during the day and slightly cooler at night. Avoid placing plants near drafts, radiators, or air conditioners, as sudden temperature changes can stress them.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f8f5f2] text-[#35463d]">
      <header className="bg-white border-b border-[#e2e8e2] shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <a href="/" className="text-2xl font-extrabold text-[#35594a]">
            🌷 AllPlantCare
          </a>
          <nav className="space-x-6 text-sm text-[#4f5f55]">
            <a
              href="/indoor-plants-watering-calculator"
              className="hover:text-pink-600"
            >
              Watering Calculator
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-14 px-6 bg-gradient-to-b from-[#fffaf9] to-[#f8f5f2]">
        <h1 className="text-4xl font-extrabold text-[#35594a] mb-3">
          Plan Your Garden the Smart Way 🌿
        </h1>
        <p className="text-lg text-[#4f5f55] max-w-2xl mx-auto">
          Use our free <strong>Plant Spacing Calculator</strong> to visualize
          how many plants fit in your garden bed. Adjust spacing, border, and
          area size to design a healthy, beautiful layout.
        </p>
      </section>

      {/* Calculator */}
      <section
        id="calc"
        className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-[#e2e8e2]  mb-20"
      >
        <h2 className="text-2xl font-bold text-center text-[#35594a] mb-6">
          🌸 Plant Spacing Calculator
        </h2>

        {/* Unit Toggles */}
        <div className="flex flex-wrap justify-center gap-5 mb-8">
          <Toggle
            label="Area Unit"
            value={areaUnit}
            options={["m", "ft"]}
            onChange={setAreaUnit}
          />
          <Toggle
            label="Spacing Unit"
            value={spaceUnit}
            options={["cm", "inch"]}
            onChange={setSpaceUnit}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Select
            label="Type of Planting"
            options={["Garden grid", "More coming soon..."]}
          />
          <Input
            label={`Area length (${areaUnit})`}
            placeholder="e.g., 5"
            value={length}
            onChange={setLength}
          />
          <Input
            label={`Area width (${areaUnit})`}
            placeholder="e.g., 4"
            value={width}
            onChange={setWidth}
          />
          <Input
            label="Border (cm)"
            placeholder="e.g., 20"
            value={border}
            onChange={setBorder}
          />
          <Input
            label={`Plant spacing (s) (${spaceUnit})`}
            placeholder="e.g., 30"
            value={spacing}
            onChange={setSpacing}
          />
          <Input
            label="Plant cost ($ each)"
            placeholder="e.g., 2.50"
            value={cost}
            onChange={setCost}
          />
        </div>

        {/* Results */}
        <div className="mt-8 rounded-xl bg-[#fff6f8] border border-pink-200 p-6 text-center">
          <p className="text-xl font-bold text-[#3f4c43]">
            Total Area: <span className="text-pink-700">{area}</span> m²
          </p>
          <p className="text-lg text-[#555] mt-1">
            Density: <strong className="text-pink-700">{density}</strong>{" "}
            plants/m²
          </p>
          <p className="text-lg text-[#555] mt-1">
            Total Plants:{" "}
            <strong className="text-pink-700">{total.toLocaleString()}</strong>
          </p>
          <p className="text-lg text-[#555] mt-1">
            Estimated Cost:{" "}
            <strong className="text-pink-700">${totalCost}</strong>
          </p>
        </div>

        {/* Visual Preview */}
        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold text-[#35594a] mb-3">
            Visual Plant Spacing Preview
          </h3>

          <div className="relative bg-[#fdf9f8] border border-[#ecd5c3] rounded-xl w-full max-w-2xl mx-auto aspect-[4/3] flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 420 320"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[95%] h-[95%]"
            >
              {/* soil layers */}
              <rect
                x="0"
                y="0"
                width="420"
                height="320"
                rx="12"
                fill="#f1e3d2"
              />
              <rect
                x="55"
                y="50"
                width="310"
                height="220"
                rx="8"
                fill="#d9c7a9"
              />

              {/* plants */}
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => (
                  <text
                    key={`${r}-${c}`}
                    x={105 + c * 100}
                    y={100 + r * 70}
                    fontSize="20"
                    textAnchor="middle"
                  >
                    🌱
                  </text>
                ))
              )}

              {/* arrows */}
              <line
                x1="60"
                y1="290"
                x2="360"
                y2="290"
                stroke="#6b5b45"
                strokeWidth="1.2"
              />
              <polygon points="60,290 68,286 68,294" fill="#6b5b45" />
              <polygon points="360,290 352,286 352,294" fill="#6b5b45" />
              <text
                x="210"
                y="305"
                fontSize="11"
                fill="#4b453a"
                textAnchor="middle"
              >
                length ≈ {length || 0} {areaUnit}
              </text>

              <line
                x1="35"
                y1="50"
                x2="35"
                y2="270"
                stroke="#6b5b45"
                strokeWidth="1.2"
              />
              <polygon points="35,50 31,58 39,58" fill="#6b5b45" />
              <polygon points="35,270 31,262 39,262" fill="#6b5b45" />
              <text
                x="25"
                y="160"
                fontSize="11"
                fill="#4b453a"
                textAnchor="middle"
                transform="rotate(-90,25,160)"
              >
                width ≈ {width || 0} {areaUnit}
              </text>

              <line
                x1="108"
                y1="245"
                x2="210"
                y2="245"
                stroke="#6b5b45"
                strokeWidth="1.2"
                className="-translate-x-1 translate-y-1"
              />
              <polygon
                points="105,245 116,241 116,249"
                fill="#6b5b45"
                className="-translate-x-1 translate-y-1"
              />
              <polygon
                points="212,245 202,241 202,249"
                fill="#6b5b45"
                className="-translate-x-1 translate-y-1"
              />
              <text
                x="156"
                y="263"
                fontSize="11"
                fill="#4b453a"
                textAnchor="middle"
              >
                s ≈ {spacing || 0} {spaceUnit}
              </text>

              <text x="60" y="282" fontSize="11" fill="#4b453a">
                border ≈ {border || 0} {spaceUnit}
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* 🌿 Comprehensive Plant Care Guide */}
      <section className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-[#e2e8e2] mb-20">
        <h2 className="text-4xl font-extrabold text-[#35594a] mb-6 text-center">
          🌱 The Ultimate Plant Care Guide for Every Home Gardener
        </h2>

        <p className="text-[#4f5f55] text-lg leading-relaxed mb-8 max-w-4xl mx-auto text-center">
          Whether you’re growing your first pothos or managing a full indoor
          jungle, plant care comes down to balance, the right mix of light,
          water, nutrients, and love. This all-in-one guide covers everything
          you need to know to keep your plants thriving year-round, both indoors
          and outdoors. Bookmark this page for quick answers and expert tips!
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          💧 1. Watering: The Foundation of Healthy Growth
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Watering is the single most important factor in plant health, and the
          one most people get wrong. The key is consistency, not quantity.
          Always check soil moisture before watering by sticking your finger 2–3
          cm into the soil. If it feels dry, water thoroughly until liquid
          drains from the bottom of the pot. Avoid leaving water in trays, as
          stagnant water suffocates roots and encourages fungal growth.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Succulents and cacti prefer dry conditions, often needing water only
          every 2–3 weeks. Tropical plants such as ferns, monstera, and
          calatheas like consistent moisture, but never soggy soil. For large
          gardens, deep morning watering helps plants absorb moisture before
          midday sun increases evaporation. Seasonal changes matter too, water
          more in spring and summer when plants grow rapidly, and less during
          fall and winter when they rest.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🌞 2. Light Requirements: Finding the Perfect Spot
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Light fuels photosynthesis, without it, plants can’t produce energy.
          Understanding your plant’s light preference is crucial. Bright,
          indirect light suits most houseplants, especially those from tropical
          regions where sunlight filters through tree canopies. East- or
          north-facing windows are ideal for moderate light, while south-facing
          windows are great for sun-loving plants like succulents, cacti, and
          citrus.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          If your plant’s leaves are stretching or fading, it likely needs more
          light. Burnt, crispy edges mean too much direct sun. Consider rotating
          your plants weekly so they grow evenly. During dark winters,
          supplement with full-spectrum LED grow lights placed 20–40 cm above
          your plants.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🌿 3. Soil and Potting Mix: Building the Right Foundation
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          The right soil mix is like a healthy diet for your plant. It provides
          nutrients, structure, and oxygen to the roots. A good all-purpose mix
          includes peat moss or coco coir (for moisture retention), perlite or
          pumice (for drainage), and compost or worm castings (for nutrients).
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Cacti and succulents thrive in sandy soil with extra grit to prevent
          rot. Orchids need bark-based mixes that mimic tree environments. For
          large outdoor planters, ensure drainage holes and use a lightweight
          mix so roots can breathe. Avoid using garden soil indoors, it compacts
          quickly and may contain pests.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🪴 4. Choosing the Right Pot & Repotting
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Your pot isn’t just decoration, it directly impacts root health.
          Always choose pots with drainage holes to prevent waterlogging.
          Terracotta pots breathe well, great for succulents and herbs. Ceramic
          and plastic retain more moisture, perfect for tropicals.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Repot plants every 12–18 months or when you see roots poking out of
          drainage holes. Select a pot 2–5 cm wider than the current one. Gently
          loosen old soil, prune damaged roots, and refresh with a nutrient-rich
          potting mix. Spring is the best season to repot, plants are naturally
          in growth mode.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🌸 5. Fertilizing and Feeding Plants
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Fertilizer acts as a vitamin boost for your plants. The three key
          nutrients are nitrogen (for leaves), phosphorus (for roots and
          blooms), and potassium (for overall strength). Look for balanced NPK
          fertilizers (10-10-10 or 20-20-20) for most houseplants.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Feed every 4–6 weeks during spring and summer using a diluted liquid
          fertilizer or slow-release pellets. Stop feeding during winter when
          growth slows. Organic options like worm castings, fish emulsion, or
          compost tea are gentle and enrich soil microbiology naturally.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🐞 6. Natural Pest Control and Prevention
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Common pests like spider mites, aphids, and fungus gnats can appear
          suddenly. Prevention is easier than cure. Keep leaves clean, avoid
          standing water, and quarantine new plants for two weeks before
          introducing them indoors.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Use neem oil, insecticidal soap, or diluted hydrogen peroxide sprays
          as safe organic treatments. Wiping leaves with mild soapy water helps
          remove tiny pests. Ensure good airflow around plants to discourage
          mold and mildew.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🌬 7. Humidity, Temperature, and Airflow
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Most houseplants thrive in 18–27°C (65–80°F) and humidity levels
          between 40–60%. Tropical plants like ferns, alocasias, and calatheas
          need higher humidity. You can increase it using a humidifier, pebble
          tray, or by clustering plants together. Avoid misting at night, it can
          cause fungal issues.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Keep plants away from heating vents, air conditioners, and cold
          drafts. Consistent temperatures reduce stress and leaf drop. Gentle
          airflow from a fan also prevents mold and strengthens stems.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          ✂️ 8. Pruning, Cleaning, and Maintenance
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Pruning keeps your plants attractive and healthy. Remove yellow or
          damaged leaves regularly to redirect energy to new growth. Trim just
          above leaf nodes for fuller branching. Wipe leaves monthly to remove
          dust that blocks light.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          For flowering species, deadhead spent blooms to encourage continuous
          flowering. Always use sterilized scissors to avoid spreading disease.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🧬 9. Propagation: Growing New Plants from Cuttings
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Propagation is an easy and rewarding way to expand your plant
          collection. Many plants like pothos, philodendrons, and monsteras root
          easily from cuttings. Snip below a node, remove lower leaves, and
          place the cutting in water or damp soil. Within 2–4 weeks, roots form.
          Once they reach 3–5 cm, move the new plant into potting mix and keep
          the soil lightly moist for the first few weeks.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🌾 10. Outdoor Plant Care: Weather, Spacing, and Mulching
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Outdoor gardening requires adjusting for seasons and weather
          conditions. Water deeply in the morning to help plants endure hot
          days. Mulch around roots to retain moisture and suppress weeds.
          Spacing plants properly (use our Plant Spacing Calculator!) ensures
          good airflow, reducing mildew and disease.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          During heatwaves, use shade cloths or temporary covers to prevent
          sunburn. In colder months, protect tender plants with mulch, burlap,
          or frost blankets. Rotate crops yearly to maintain soil health and
          reduce pest buildup.
        </p>

        <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
          🌍 11. Sustainable and Eco-Friendly Plant Care
        </h3>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Sustainable plant care means minimizing waste and using natural
          materials. Collect rainwater, compost food scraps, and reuse old pots.
          Avoid synthetic fertilizers when possible, organic alternatives
          nurture soil microbes and improve long-term fertility. Recycle potting
          mix by sterilizing and enriching it with fresh compost.
        </p>
        <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
          Growing plants isn’t just a hobby, it’s an act of restoration. Each
          plant you nurture improves air quality, reduces stress, and brings
          balance to your living space.
        </p>

        <p className="text-[#35594a] text-lg font-semibold text-center mt-10">
          🌿 With patience, observation, and consistency, anyone can develop a
          green thumb. Your plants will reward you with vibrant growth, cleaner
          air, and a calm, beautiful home.
        </p>
      </section>

      {/* 🌿 Comprehensive Plant Care FAQ Section */}
      <section className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-[#e2e8e2] mb-20">
        <h2 className="text-4xl font-extrabold text-[#35594a] mb-8 text-center">
          🌿 Complete Plant Care & Gardening FAQ
        </h2>

        <p className="text-center text-[#4f5f55] mb-12 text-lg max-w-3xl mx-auto leading-relaxed">
          Whether you’re nurturing indoor plants or building an outdoor garden,
          these frequently asked questions cover everything from watering and
          light to soil health, propagation, fertilizer, pest control, and more.
          Learn how to keep your plants green, strong, and thriving in every
          season.
        </p>

        {/* 🌺 Advanced Plant Care & Troubleshooting */}
        <section className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-[#e2e8e2] mb-20">
          <h2 className="text-3xl font-extrabold text-[#35594a] mb-8 text-center">
            🌺 Advanced Plant Care Tips & Troubleshooting
          </h2>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            ☀️ Understanding Light Levels: Bright, Medium, and Low
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            Not all light is equal. “Bright light” means direct sun for several
            hours, perfect for cacti, succulents, citrus, and herbs. “Medium
            light” refers to bright, indirect sunlight, ideal for monstera,
            peace lilies, and philodendrons. “Low light” areas, like rooms with
            north-facing windows or shaded corners, suit plants such as snake
            plants, pothos, and ZZ plants. If your plant leans toward a window
            or its new leaves are small and pale, it’s asking for more light.
            Rotate weekly for balanced growth and clean your windows, dusty
            glass can block up to 30% of natural sunlight.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🌾 Choosing Plants for Your Space
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            When selecting plants, consider both your environment and your
            lifestyle. Busy schedule? Opt for hardy, low-maintenance varieties
            like snake plants, ZZ plants, or pothos. Humid bathrooms suit ferns,
            peace lilies, and spider plants, while bright kitchens are perfect
            for herbs like basil and mint. For bedrooms, air-purifying options
            such as rubber plants, philodendrons, and lavender improve air
            quality and relaxation. Always match plant species to your home’s
            light exposure, humidity, and temperature, forcing mismatched plants
            to adapt often leads to stress and decline.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🪴 Drainage and Root Health
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            Proper drainage is vital for every plant. Without it, roots sit in
            stagnant water, leading to rot. Always use pots with drainage holes
            or add a layer of pebbles at the bottom. For large decorative pots
            without holes, use a smaller nursery pot inside, known as “double
            potting.” Check roots periodically: white roots are healthy, while
            brown, mushy roots indicate rot. Prune damaged roots, repot into
            fresh mix, and water sparingly until recovery. Root rot spreads
            quickly, so early action saves the plant.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🌿 Common Plant Problems & Solutions
          </h3>
          <ul className="list-disc list-inside text-[#3f3f3f] text-lg leading-relaxed mb-6 space-y-2">
            <li>
              <strong>Yellow leaves:</strong> Often from overwatering or poor
              drainage. Allow soil to dry fully before watering again.
            </li>
            <li>
              <strong>Brown leaf tips:</strong> Usually due to low humidity or
              fluoride in tap water. Switch to filtered water and increase
              humidity.
            </li>
            <li>
              <strong>Drooping leaves:</strong> Can mean underwatering, too much
              heat, or root stress. Check soil moisture and reposition the
              plant.
            </li>
            <li>
              <strong>White crust on soil:</strong> Indicates salt buildup from
              fertilizer. Flush with water monthly or repot with fresh soil.
            </li>
            <li>
              <strong>Slow growth:</strong> Caused by low light, nutrient
              deficiency, or being rootbound. Fertilize and repot if necessary.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🌻 Seasonal Care for Indoor Plants
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            Plants respond to seasonal changes in light, humidity, and
            temperature. In spring, resume regular watering and fertilizing to
            support new growth. Summer brings faster growth, water more often
            but ensure good drainage. Autumn is a transitional period; reduce
            watering gradually. Winter demands the least water, but more light,
            move plants closer to windows and clean leaves to maximize sunlight
            absorption. Avoid sudden changes in environment; plants adapt
            slowly.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🌾 Outdoor Gardening Essentials
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            Outdoor plants face different challenges than indoor ones. Soil
            health is key, enrich beds with compost before planting. Spacing
            matters more outdoors; use tools like our{" "}
            <strong>Plant Spacing Calculator</strong> to avoid overcrowding.
            Water deeply, not frequently, to encourage deep root growth.
            Mulching helps retain moisture and suppress weeds. In vegetable
            gardens, rotate crops each year to maintain nutrient balance and
            deter soil pests.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🌸 Flowering Plants and Bloom Care
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            To encourage flowering, ensure plants receive enough light, proper
            nutrients, and rest periods. Many blooms form only after cooler
            dormant months. Deadhead faded flowers to trigger continuous
            blooming. Avoid excessive nitrogen fertilizer (it promotes leaves,
            not flowers). For orchids, maintain steady humidity and indirect
            light, they bloom best when roots are slightly constrained in small
            pots.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🍃 Indoor Air Quality and Plant Benefits
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            Indoor plants aren’t just decorative, they actively improve air
            quality by absorbing toxins and producing oxygen. NASA’s Clean Air
            Study found that plants like peace lilies, snake plants, and pothos
            remove chemicals such as benzene, formaldehyde, and xylene.
            Additionally, plants raise indoor humidity naturally, reducing
            respiratory dryness and improving mood and concentration. For best
            results, maintain one medium-sized plant per 10 square feet of
            living space.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🧪 Testing Soil and Water Quality
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            Healthy soil should feel crumbly and smell earthy, not sour. Test
            soil pH annually, most plants prefer a neutral to slightly acidic
            range (pH 6–7). If your tap water is hard or high in chlorine,
            switch to filtered or rainwater. High mineral content can cause leaf
            tip burn over time. If unsure, let tap water sit overnight to allow
            chlorine to dissipate before using it for plants.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🧬 Propagation Beyond Basics
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            Beyond stem cuttings, many plants can be propagated by division,
            leaf cuttings, or air layering. For example, snake plants grow from
            leaf segments, while peace lilies can be divided into clumps. Air
            layering works well for woody plants like rubber trees, wrap a damp
            sphagnum moss ball around a stem node, cover with plastic, and wait
            for roots to form before cutting and replanting.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🕯 Creating the Perfect Plant Care Routine
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            A consistent routine keeps plants stress-free. Choose one day each
            week to check all your plants. Test soil moisture, inspect for
            pests, wipe leaves, and prune as needed. Rotate positions seasonally
            to adjust for changing sunlight. Group plants with similar needs
            together, this simplifies watering and prevents over- or under-care.
            Record progress in a journal or app to track growth, repot dates,
            and fertilizer use.
          </p>

          <h3 className="text-2xl font-bold text-[#35594a] mt-8 mb-4">
            🌍 Eco-Friendly Plant Parenting
          </h3>
          <p className="text-[#3f3f3f] text-lg leading-relaxed mb-6">
            Sustainable gardening benefits both your home and the planet.
            Recycle containers, compost food scraps, and use organic pest
            controls like neem or garlic sprays. Choose peat-free soils when
            possible to protect bog ecosystems. Collect rainwater and reuse
            greywater for outdoor watering. Support pollinators by growing
            native flowering plants that attract bees and butterflies.
          </p>

          <p className="text-[#35594a] text-lg font-semibold text-center mt-10">
            🌿 Every plant tells you what it needs, your job is simply to
            listen. Observe, adjust, and enjoy the calming rhythm of nature
            right inside your home.
          </p>
        </section>

        <div className="space-y-6">
          {[
            {
              q: "🌱 How often should I water my houseplants?",
              a: "Most indoor plants prefer consistent but moderate watering. As a general rule, water when the top 2–3 cm of soil feels dry. Succulents and cacti need water only every few weeks, while tropical plants like ferns and calatheas prefer evenly moist soil. Always check with your finger before watering to avoid root rot.",
            },
            {
              q: "💧 What’s the best time of day to water plants?",
              a: "Morning is ideal. Watering early allows roots to absorb moisture before the sun heats up or indoor humidity drops. Avoid watering at night since damp soil can encourage fungal growth or mold.",
            },
            {
              q: "🌞 How much sunlight do indoor plants need?",
              a: "Most indoor plants thrive in bright, indirect light for 6–8 hours a day. Place them near east or north-facing windows. Direct sun can scorch leaves, while too little light causes yellowing or leggy growth.",
            },
            {
              q: "🌿 How do I choose the right soil for my plants?",
              a: "Use well-draining soil mixes. For tropical plants, combine peat moss, coco coir, compost, and perlite. For succulents or cacti, mix sand or grit for faster drainage. Avoid garden soil for indoor plants,  it compacts easily and can suffocate roots.",
            },
            {
              q: "🪴 How do I know when to repot a plant?",
              a: "If roots are growing out of drainage holes or the plant dries out too quickly, it’s time to repot. Choose a new pot 2–5 cm wider than the old one and refresh the soil. Spring is the best time for repotting most houseplants.",
            },
            {
              q: "🌼 What’s the best fertilizer for houseplants?",
              a: "Balanced NPK fertilizers (10-10-10) work for most plants. Feed every 4–6 weeks in spring and summer. Use half-strength for sensitive plants. Organic fertilizers like worm castings or compost tea are great slow-release alternatives.",
            },
            {
              q: "🐞 How can I prevent pests naturally?",
              a: "Inspect leaves weekly. Wipe dust off with a damp cloth and use neem oil or insecticidal soap to prevent pests like spider mites or aphids. Increase airflow and avoid overwatering,  most pests thrive in stagnant, moist environments.",
            },
            {
              q: "🌸 Why are my leaves turning yellow?",
              a: "Yellow leaves can signal overwatering, lack of nutrients, or too little light. Check for soggy soil and adjust your watering schedule. If the plant is rootbound or has compacted soil, repot with fresh mix and trim damaged leaves.",
            },
            {
              q: "🌬 How can I improve humidity for indoor plants?",
              a: "Use a humidifier or group plants together to create a microclimate. Misting leaves lightly in the morning can help, but it’s not a substitute for humidity. Pebble trays with water below the pot also add moisture to the air.",
            },
            {
              q: "🌾 What are the signs of overwatering?",
              a: "Soft, yellowing leaves, fungus gnats, and a musty smell all point to overwatering. Let the soil dry out completely before watering again, and ensure your pot has drainage holes.",
            },
            {
              q: "🌤 Should I rotate my houseplants?",
              a: "Yes! Rotating plants every few weeks ensures even light exposure and balanced growth. Without rotation, they’ll lean toward the light source and grow unevenly.",
            },
            {
              q: "🪚 How should I prune my indoor plants?",
              a: "Prune dead or yellow leaves first. For bushier growth, cut just above a node (where leaves meet the stem). Always use clean, sharp scissors to avoid spreading disease.",
            },
            {
              q: "🌻 Can I use tap water for plants?",
              a: "Yes, but let it sit overnight to allow chlorine to evaporate. If your tap water is very hard, use filtered or rainwater. Plants sensitive to minerals, like calatheas, thrive best with distilled water.",
            },
            {
              q: "🧬 How do I propagate houseplants?",
              a: "Take a healthy stem cutting below a node, remove lower leaves, and place it in water or moist soil. Keep in indirect light until roots form, usually 2–4 weeks. Pothos, philodendrons, and snake plants are especially easy to propagate.",
            },
            {
              q: "🔥 How can I protect outdoor plants from heat?",
              a: "Water deeply early in the morning, mulch around roots to retain moisture, and add temporary shade cloths during extreme heat waves. Avoid fertilizing when temperatures exceed 32°C.",
            },
            {
              q: "❄️ How do I protect my plants in winter?",
              a: "Keep them away from cold drafts and radiators. Move near brighter windows and reduce watering. Outdoor perennials can be insulated with mulch or burlap to protect their roots from frost.",
            },
            {
              q: "💨 Why do my indoor plants get dusty?",
              a: "Dust blocks light and clogs leaf pores. Wipe leaves gently with a damp microfiber cloth every few weeks. For larger plants, use a soft shower spray to rinse dust away.",
            },
            {
              q: "🌍 Can I reuse old soil?",
              a: "Yes, but refresh it first. Remove old roots, bake at 90°C to sterilize, and mix with compost or new soil. Avoid reusing soil from diseased or moldy plants.",
            },
            {
              q: "🧮 Why should I use a plant spacing calculator?",
              a: "It helps you plan efficient layouts, prevent overcrowding, and predict how many plants fit your space. Correct spacing leads to better airflow, higher yields, and healthier growth,  especially for vegetables and ornamentals.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group border border-[#e2e8e2] rounded-xl p-6 bg-[#fffaf9] hover:bg-[#fff3f5] transition"
            >
              <summary className="cursor-pointer text-xl font-semibold text-[#35594a] flex justify-between items-center">
                {item.q}
                <span className="text-pink-500 group-open:rotate-180 transition-transform text-2xl leading-none">
                  ⌄
                </span>
              </summary>
              <p className="mt-4 text-[#3f3f3f] text-lg leading-relaxed max-w-4xl">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* 🌿 Disclaimer Section */}
      <section className="max-w-5xl mx-auto mt-16 mb-24 bg-[#fffaf9] border border-[#e2e8e2] rounded-2xl p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#35594a] mb-4 text-center">
          🌿 Important Disclaimer
        </h3>
        <p className="text-[#4f5f55] text-lg leading-relaxed mb-4">
          The information and calculators provided on{" "}
          <strong>AllPlantCare</strong> are intended for general educational and
          informational purposes only. While every effort has been made to
          ensure accuracy, plant care results can vary depending on local
          conditions such as soil type, humidity, sunlight exposure, water
          quality, and regional climate differences.
        </p>
        <p className="text-[#4f5f55] text-lg leading-relaxed mb-4">
          Always observe your individual plants and adjust care practices
          accordingly. The spacing and watering calculations shown are based on
          standard horticultural guidelines and may not apply universally to
          every species or environment. When in doubt, consult with a certified
          horticulturist, local garden center, or agricultural extension service
          for personalized advice.
        </p>
        <p className="text-[#4f5f55] text-lg leading-relaxed mb-4">
          AllPlantCare and its creators assume no responsibility or liability
          for any plant damage, loss, or adverse outcomes arising from the use
          of our tools or recommendations. Your garden’s success depends on your
          unique growing conditions, observation, and ongoing care.
        </p>
        <p className="text-[#35594a] text-center font-semibold mt-6">
          🌸 Gardening should be fun, mindful, and rewarding, experiment, learn,
          and grow at your own pace.
        </p>
      </section>

      <footer className="text-center text-xs text-[#7b857f] py-10 border-t border-[#e2e8e2]">
        © {new Date().getFullYear()} AllPlantCare, growing greener together 🌱
      </footer>
    </main>
  );
}

/* Components */
function Input({ label, placeholder, value, onChange }: any) {
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

function Select({ label, options }: any) {
  return (
    <label className="text-sm font-semibold text-[#2f3b34]">
      {label}
      <select className="w-full mt-1 p-2 border rounded-md bg-[#fffaf9] border-[#e2d5d5] text-[#35463d]">
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, value, options, onChange }: any) {
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
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
