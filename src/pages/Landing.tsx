// src/pages/Landing.tsx
import React from "react";
import { Link } from "react-router-dom";

// local images
import heroImage from "@/assets/hero-millets.jpg";
import aboutImage from "@/assets/about.jpg"; // <--- rename if your file is about.png etc.

import type { LucideIcon } from "lucide-react";
import {
  Wheat,
  Leaf,
  Users,
  Globe2,
  Scale,
  ShieldCheck,
  BarChart3,
  Truck,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type MissionItem = {
  title: string;
  icon: LucideIcon;
};

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const platformFeatures: Feature[] = [
  {
    title: "Online Trading",
    description:
      "Digital millet marketplace connecting farmers, FPOs and buyers directly.",
    icon: BarChart3,
  },
  {
    title: "Fair Pricing",
    description:
      "Live price intelligence so farmers never undersell their harvest.",
    icon: Scale,
  },
  {
    title: "Quality Certification",
    description:
      "Traceable, certified lots with confidence for consumers and exporters.",
    icon: ShieldCheck,
  },
  {
    title: "Logistics Support",
    description:
      "Integrated logistics and digital payments for smoother movement of grain.",
    icon: Truck,
  },
  {
    title: "Multilingual Access",
    description:
      "Interfaces and help in Indian languages for easier farmer onboarding.",
    icon: Users,
  },
  {
    title: "Millet Education",
    description:
      "Knowledge on cultivation, nutrition, recipes and value addition.",
    icon: Leaf,
  },
  {
    title: "Connect Communities",
    description:
      "Building networks across farmers, SHGs, processors and retailers.",
    icon: Globe2,
  },
  {
    title: "Government Schemes",
    description:
      "Awareness and discovery of relevant millet-support schemes.",
    icon: Wheat,
  },
];

const benefits: Benefit[] = [
  {
    title: "Nutri-cereals",
    description:
      "Naturally rich in protein, fibre and micronutrients like iron and calcium.",
    icon: Leaf,
  },
  {
    title: "Resilient & Sustainable",
    description:
      "Millets grow in dry, tough climates with far less water than many crops.",
    icon: Globe2,
  },
  {
    title: "Health & Inclusion",
    description:
      "Low glycaemic index, gluten-free options and diverse traditional varieties.",
    icon: ShieldCheck,
  },
];

const missions: MissionItem[] = [
  { title: "Empower Farmers", icon: Users },
  { title: "Remove Middlemen", icon: Scale },
  { title: "Ensure Fair Trade", icon: BarChart3 },
  { title: "Create Transparent Marketplace", icon: ShieldCheck },
  { title: "Strengthen Rural Economy", icon: Truck },
  { title: "Promote Sustainable Agriculture", icon: Leaf },
];

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen font-[Inter] bg-white text-neutral-900">
      {/* ------------------------ TOP NAV ------------------------ */}
      <header className="fixed top-0 inset-x-0 z-30 bg-black/60 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
          <div className="flex items-center gap-2 font-bold tracking-wide text-amber-400 text-lg">
             <Wheat className="h-5 w-5 text-amber-400" />
                ShreeAnna Connect
           </div>


          <nav className="flex items-center gap-4">
            <Link to="/login">
              <button className="rounded-full border border-amber-500 px-4 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-50/10 transition">
                Sign In
              </button>
            </Link>

            <Link to="/signup">
              <button className="rounded-full bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition">
                Sign Up
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ------------------------ HERO SECTION ------------------------ */}
      <section className="relative w-full overflow-hidden pt-14">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Millets Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 px-4 py-20 md:py-28">
          {/* --- Left Card : Glass Text --- */}
          <div className="max-w-xl rounded-3xl bg-black/30 backdrop-blur-md border border-white/20 shadow-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-200 mb-2">
              Celebrating India’s Millet Heritage
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow mb-4">
              Discover <br />
              ShreeAnna <br />
              Connect
            </h1>

            <p className="text-sm text-neutral-300 leading-relaxed font-semibold">
               भारत के अन्नदाता से, भारत के परिवार तक।
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/signup">
                <button className="rounded-full bg-amber-500 px-5 py-2 text-xs md:text-sm font-semibold text-white shadow-lg hover:bg-amber-600 transition">
                  Get Started
                </button>
              </Link>

              <Link to="/login">
                <button className="rounded-full border border-amber-200/80 px-5 py-2 text-xs md:text-sm font-semibold text-amber-100 hover:bg-white/10 transition">
                  I already have an account
                </button>
              </Link>
            </div>
          </div>

          {/* --- Right Small Info Badge --- */}
          <div className="md:flex-1 flex justify-center md:justify-end">
            <div className="rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl px-6 py-4 max-w-xs text-sm text-neutral-800">
              <h3 className="font-semibold text-amber-800 mb-2">
                Did You Know?
              </h3>
              <p className="leading-relaxed">
                India is one of the world’s largest millet producers, contributing
                significantly to global food security and sustainable agriculture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------ ABOUT SHREEANNA ------------------------ */}
      <section className="relative bg-gradient-to-b from-amber-50 to-yellow-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex justify-center">
            <div className="overflow-hidden rounded-3xl shadow-xl bg-amber-200 group max-w-md">
              <img
                src={aboutImage}
                alt="About ShreeAnna"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-amber-800 mb-4">
              About ShreeAnna Connect
            </h2>
            <p className="text-sm leading-relaxed text-neutral-800">
              ShreeAnna Connect is a multilingual digital platform designed to
              strengthen India&apos;s millet ecosystem by directly connecting
              farmers, FPOs, SHGs, processors, traders and consumers. The
              platform removes middlemen and enables direct market access
              through transparent transactions, quality certification, real-time
              pricing, online trading, digital payments and logistics support.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-800">
              By promoting millet-based nutrition, supporting rural livelihoods
              and creating a fair marketplace, ShreeAnna Connect aims to
              preserve India&apos;s traditional grains while building a
              sustainable and healthier future for all.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------ WHAT ARE SHREEANNA ------------------------ */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-3 text-center text-3xl font-extrabold text-amber-800">
            What are ShreeAnna? <span className="text-red-700">(श्रीअन्ना)</span>
          </h2>
          <p className="text-center text-xs md:text-sm max-w-3xl mx-auto text-neutral-700 mb-10">
            “ShreeAnna” celebrates India’s millets – nutrient-dense, climate-smart
            grains that support farmer incomes, resilient agriculture and
            healthier plates across the country.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {benefits.map((b) => (
              <article
                key={b.title}
                className="group rounded-3xl bg-amber-50/70 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-2xl bg-amber-500/90 text-white p-3 shadow-md group-hover:bg-amber-600 transition">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-amber-900 text-sm">
                    {b.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-800 leading-relaxed">
                  {b.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ PLATFORM FEATURES ------------------------ */}
      <section className="bg-gradient-to-b from-amber-50 to-yellow-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-amber-800">
            Platform Features
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {platformFeatures.map((feature) => (
              <article
                key={feature.title}
                className="group flex h-full flex-col rounded-3xl bg-white/90 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-2xl bg-amber-100 text-amber-700 p-3 group-hover:bg-amber-500 group-hover:text-white transition shadow-sm">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-amber-900 text-sm">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ OUR AIM ------------------------ */}
      <section className="bg-gradient-to-b from-orange-700 to-amber-600 py-16 md:py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-extrabold">
            Our Aim
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {missions.map((m) => (
              <article
                key={m.title}
                className="group flex flex-col rounded-3xl bg-white/95 text-neutral-900 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-2xl bg-amber-100 text-amber-700 p-3 group-hover:bg-amber-500 group-hover:text-white transition shadow-sm">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-amber-900 text-sm">
                    {m.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed flex-1">
                  ShreeAnna Connect works to make this goal real through
                  digital tools, fair markets and stronger farmer linkages.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ FOOTER ------------------------ */}
      <footer className="bg-neutral-900 py-8 text-xs text-neutral-300">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Contact Us
            </h3>
            <p>info@shreeanna.gov.in</p>
            <p>+91 11 2345 6789</p>
            <p> Ministry Of Agriculture, FoodTech & Rural Development, India

            </p>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <span className="h-7 w-7 rounded-full bg-neutral-800" />
              <span className="h-7 w-7 rounded-full bg-neutral-800" />
              <span className="h-7 w-7 rounded-full bg-neutral-800" />
              <span className="h-7 w-7 rounded-full bg-neutral-800" />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-neutral-800 text-center pt-4 text-[11px] text-neutral-500">
          © {new Date().getFullYear()} ShreeAnna Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
