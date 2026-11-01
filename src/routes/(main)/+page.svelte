<script>
	import glas from "$lib/images/glas.webp";
	import movie from "$lib/videos/bs2022_aftermovie.mp4";
	import gsi from "$lib/images/sponsoren/gsi_Logo_RGB.png";
	import brennecke from "$lib/images/sponsoren/2022-brennecke-logo-schwarz-300_150.jpg";
	import braumischung from "$lib/images/sponsoren/bbm_de-logo18_braun_pfade.png";
	import beerolution from "$lib/images/sponsoren/beerolution_Logo_600-250x59.jpg";
	import hilbrandt from "$lib/images/sponsoren/biersommelier hilbrandt.png";
	import biertasting from "$lib/images/sponsoren/Biertasting Bonn.png";
	import braubebo from "$lib/images/sponsoren/BrauBeBo Logo.png";
	import braumarkt from "$lib/images/sponsoren/braumarkt.svg";
	import ccc from "$lib/images/sponsoren/CCC.png";
	import gbcu from "$lib/images/sponsoren/GBCU loho.png";
	import hopfenDerWelt from "$lib/images/sponsoren/HdW_Hipster_schwarz_seit2011.png";
	import holyCraft from "$lib/images/sponsoren/Holy craft beer shop.jpg";
	import ireks from "$lib/images/sponsoren/IREKS.png";
	import braupartner from "$lib/images/sponsoren/Logo_Braupartner_Farbe.png";
	import resch from "$lib/images/sponsoren/logo resch svg.svg";
	import pfalzmalz from "$lib/images/sponsoren/pfalzmalz.avif";
	import platoAleMania from "$lib/images/sponsoren/Plato_Ale Mania.png";
	import brauwerkstatt from "$lib/images/sponsoren/RZ_brauwerkstatt_logo.jpg";

	const sponsors = [
		{ name: "Gustav-Stresemann-Institut (GSI)", logo: gsi },
		{ name: "Brennecke", logo: brennecke },
		{ name: "Braumischung.de", logo: braumischung },
		{ name: "Beerolution", logo: beerolution },
		{ name: "Biersommelier Hilbrandt", logo: hilbrandt },
		{ name: "Biertasting Bonn", logo: biertasting },
		{ name: "BrauBeBo", logo: braubebo },
		{ name: "Braumarkt", logo: braumarkt },
		{ name: "CCC", logo: ccc },
		{ name: "GBCU", logo: gbcu },
		{ name: "Hopfen der Welt", logo: hopfenDerWelt },
		{ name: "Holy Craft Beer Shop", logo: holyCraft },
		{ name: "IREKS", logo: ireks },
		{ name: "Brau-Partner", logo: braupartner },
		{ name: "Resch", logo: resch },
		{ name: "Pfalzmalz", logo: pfalzmalz },
		{ name: "Plato / Ale-Mania", logo: platoAleMania },
		{ name: "Brauwerkstatt", logo: brauwerkstatt },
	];
</script>

<section class="relative overflow-hidden bg-amber-100 pt-16 sm:pt-24">
	<div
		class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 lg:flex lg:flex-row md:gap-16 mb-10"
	>
		<div class="w-full lg:w-1/2">
			<div
				class="flex flex-col items-center mx-auto max-w-lg md:px-16 pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-xl xl:pb-14"
			>
				<div
					class="border-y-8 border-amber-900 justify-content head-bounds"
				>
					<h1
						class="w-full text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-6xl xl:leading-tighter head-one"
					>
						7.&nbsp;BONNER
					</h1>
					<h2
						class="text-4xl font-semibold leading-tighter text-orange-500 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-5xl xl:leading-tighter head-two"
					>
						BRAUSCHAU
					</h2>
				</div>
				<h2
					class="text-3xl text-center mt-4 font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-4xl xl:leading-tighter"
				>
					21.11.2026 14:00
				</h2>
				<h2
					class="text-xl text-center mt-2 mb-8 font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-2xl xl:leading-tighter"
				>
					Gustav-Stresemann-Institut (GSI)
				</h2>
				<img src={glas} class="mt-16 w-1/2" alt="Home Hero Image" />
			</div>
		</div>
		<div class="md:w-1/2">
			<div class="relative w-full">
				<video
					src={movie}
					class="h-full w-full object-cover"
					alt="BS2022 Aftermovie"
					autoplay
					loop
					muted
					playsinline
				/>
				<div
					class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col p-8 items-center justify-center"
				>
					<div class="text-white text-2xl font-bold text-center">
						Kreative und handwerklich gebraute Biere und Austausch
						mit hunderten Bierenthusiasten sind genau Dein Ding?
					</div>
					<div class="text-white text-2xl font-bold mt-16">
						Dann bist Du hier richtig!
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section
	class="relative overflow-hidden bg-vanilla py-16 sm:py-24"
>
	<!-- Container -->
	<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="flex flex-col sm:items-center">
			<h1
				class="mt-5 text-4xl font-semibold leading-snug text-slate-900 sm:max-w-xl sm:text-center sm:text-5xl sm:leading-snug md:mx-auto xl:mx-0"
			>
				Bier-Interessierte treffen auf Bier-Enthusiasten
			</h1>
		</div>
		<div
			class="mt-12 flex flex-col md:mt-8 md:flex-row md:divide-x md:divide-gray-secondary-400/60"
		>
			<div class="md:w-1/2 md:py-8 md:pr-6 lg:pr-16">
				<p class="text-lg leading-relaxed text-slate-700">
					Zum 7. Mal haben über 30 Hobbybrauer aus ganz Deutschland
					die Möglichkeit, ihre selbstgebrauten Biere einem breiten
					Publikum zu präsentieren und mit anderen Bier-Enthusiasten
					auszutauschen.
				</p>
				<p class="text-lg leading-relaxed text-slate-700">
					Dabei liegt der Fokus auf handwerklich gebrauten Bieren, die
					mit Kreativität und Leidenschaft eine Abwechslung zu
					industriell gefertigten Bieren bieten.
				</p>
			</div>
			<div class="mt-8 sm:mt-0 md:w-1/2 md:py-8 md:pl-6 lg:pl-16">
				<p class="text-lg leading-relaxed text-slate-700">
					Egal ob neugieriger Einsteigerin, Connaisseur oder
					Biersommelière - dank des breiten Spektrums aus klassichen
					Bierstilen und spannenden neuen Kreationen ist hier für jede
					und jeden was dabei.
				</p>
				<p class="text-lg leading-relaxed text-slate-700 bt-4">
					Wir zelebrieren einen Tag lang Bierkultur und Handwerkskunst
					und freuen uns auf Deinen Besuch!
				</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-amber-100 py-16 sm:py-24" aria-labelledby="sponsors-heading">
	<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<h2
			id="sponsors-heading"
			class="text-center text-3xl font-semibold text-slate-900 sm:text-4xl"
		>
			Unsere Sponsoren
		</h2>
		<p class="mt-4 text-center text-lg text-slate-700">
			Vielen Dank für die Unterstützung der Bonner Brauschau!
		</p>
		<ul class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
			{#each sponsors as sponsor}
				<li class="flex h-40 items-center justify-center rounded-lg bg-white p-6 sm:h-44">
					<img
						src={sponsor.logo}
						alt={sponsor.name}
						class="h-full w-full object-contain"
						loading="lazy"
						decoding="async"
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="postcss">
	.head-bounds {
		width: 16rem;
	}
	.head-one {
		font-size: 3em;
	}
	.head-two {
		font-size: 2.5em;
	}
	@media (min-width: 375px) {
		.head-bounds {
			width: 20rem;
		}
		.head-one {
			font-size: 3.7em;
		}
		.head-two {
			font-size: 3.1em;
		}
	}
	@media (min-width: 425px) {
		.head-bounds {
			width: 24rem;
		}
		.head-one {
			font-size: 4.5em;
		}
		.head-two {
			font-size: 3.75em;
		}
	}
</style>
