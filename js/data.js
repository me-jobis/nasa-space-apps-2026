/**
 * NASA Space Apps Challenge - Team smAsh
 * Challenge: Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars
 * 
 * Dataset of retired/abandoned hardware on the Moon and Mars.
 */

const RELICS_DATA = [
  {
    id: "opportunity",
    name: "Opportunity Rover (MER-B)",
    callsign: "\"Oppy\" — The Marathon Explorer",
    imageUrl: "assets/images/opportunity.jpg",
    body: "Mars",
    category: "Rover",
    modelType: "rover",
    badge: {
      name: "Marathon Sol Badge",
      icon: "zap",
      description: "Discovered ancient water on Mars & traversed over 45 kilometers!"
    },
    coordinates: {
      lat: -2.34,
      lon: 354.67,
      formatted: "2.34° S, 5.33° W"
    },
    locationName: "Perseverance Valley, Endeavour Crater, Mars",
    launchDate: "July 7, 2003",
    landingDate: "January 25, 2004",
    lastContact: "June 10, 2018 (Sol 5111)",
    plannedDuration: "90 Sols (~3 months)",
    actualDuration: "5,111 Sols (14 Years, 138 Days)",
    distanceTraveled: "45.16 km (28.06 miles) — Solar System Off-Earth Record",
    nssdcaId: "2003-032A",
    statusText: "Dormant under Martian dust",
    statusColor: "#ef4444",
    whyAbandoned: "A historic, planet-encircling Martian dust storm blocked out the Sun for months in mid-2018. Without sunlight, its solar arrays could not recharge its batteries or run the vital survival heaters. Opportunity slipped into a deep, permanent sleep.",
    summary: "Originally designed for a modest 90-sol mission, Opportunity became humanity's most resilient interplanetary traveler. It found hematite spherules ('blueberries') proving that liquid water once flowed through Martian soil.",
    story: {
      title: "My Battery Is Low, and It's Getting Dark",
      quote: "I was born to survive 90 days. I gave humanity 15 years of wonder across 45 kilometers of Martian sand.",
      chapters: [
        {
          heading: "Chapter 1: The Hole-in-One",
          text: "I bounced across Mars encased in giant airbags, coming to rest inside Eagle Crater on January 25, 2004. Scientists at NASA JPL popped champagne and called it an interplanetary 'hole-in-one'. My wheels touched red soil, my solar wings unfolded, and I looked out at bedrock exposed by a meteorite impact. Right beneath my feet, I discovered tiny gray spheres nickname 'blueberries'—mineral spherules of hematite formed only in the presence of liquid water. Mars had once been wet and hospitable to life!"
        },
        {
          heading: "Chapter 2: The Endless Marathon",
          text: "My engineers had hoped I might drive 600 meters. Instead, Sol after Sol, year after year, I pushed forward. I climbed steep crater rims, survived treacherous sand traps that threatened to bury my wheels, and suffered through blistering cold winters. Dust devils occasionally swept over me, acting as gentle Martian carwashes that cleaned my solar panels and granted me second winds. By 2015, I crossed 42.195 kilometers—completing humanity's first Olympic marathon on another world."
        },
        {
          heading: "Chapter 3: The Dark Storm and Sol 5111",
          text: "In the summer of 2018, the Martian sky turned into an impenetrable bronze curtain. A colossal dust storm enveloped the entire globe, blocking 99% of the sunlight. With my power dropping dangerously, I sent my final telemetry back across millions of miles to Pasadena: my batteries were exhausted, and darkness had fallen. For eight months, NASA called to me every single day, playing Billie Holiday's 'I'll Be Seeing You'. I could no longer answer, but I rest proudly on the rim of Endeavour Crater—a monument to human curiosity."
        }
      ]
    },
    keyAchievements: [
      "Discovered hematite 'blueberries', providing unambiguous proof that Mars once harbored liquid water.",
      "Traveled 45.16 kilometers, holding the record for the longest distance driven on another celestial body.",
      "Operated 57 times longer than its planned 90-day design lifetime.",
      "Sent back more than 217,000 raw color and panoramic images of the Martian surface."
    ],
    kidFriendlyFact: "Opportunity had robotic 'cleaning events'! When swirling mini-tornadoes called dust devils whipped across its solar panels, they sucked away the dust and boosted its energy back up, acting like a cosmic cleaning crew!",
    subsystems: [
      { name: "Pancam & Navcam Mast", role: "High-resolution stereo vision eyes sitting 1.5m above ground, capturing 360-degree color panoramas." },
      { name: "Triple-Junction Solar Panels", role: "Photovoltaic wings providing up to 900 watt-hours of electrical power per sol in clear skies." },
      { name: "Rocker-Bogie 6-Wheel Suspension", role: "Titanium chassis enabling climbing over rocks twice wheel diameter without tilting over." },
      { name: "Instrument Deployment Arm", role: "Robotic arm wielding a microscopic imager, alpha particle X-ray spectrometer, and rock abrasion tool (RAT)." },
      { name: "High-Gain Parabolic Antenna", role: "Steerable microwave dish communicating directly with NASA's Deep Space Network dishes on Earth." }
    ],
    quiz: {
      question: "What tiny round mineral formations did Opportunity discover inside Eagle Crater that proved Mars once had liquid water?",
      options: [
        "Hematite 'Blueberries'",
        "Martian Gold Nuggets",
        "Basalt Ice Cubes",
        "Quartz Crystals"
      ],
      correctIndex: 0,
      explanation: "Opportunity discovered hematite-rich mineral spherules that scientists nicknamed 'blueberries'. These concretions precipitated out of acidic groundwater billions of years ago!"
    }
  },
  {
    id: "ingenuity",
    name: "Ingenuity Mars Helicopter",
    callsign: "\"Ginny\" — The Wright Brothers of Mars",
    imageUrl: "assets/images/ingenuity.jpg",
    body: "Mars",
    category: "Helicopter",
    modelType: "helicopter",
    badge: {
      name: "Red Planet Aviator",
      icon: "wind",
      description: "First powered, controlled flight through the thin atmosphere of another planet!"
    },
    coordinates: {
      lat: 18.444,
      lon: 77.451,
      formatted: "18.44° N, 77.45° E"
    },
    locationName: "Valinor Hills, Neretva Vallis, Jezero Crater, Mars",
    launchDate: "July 30, 2020",
    landingDate: "February 18, 2021 (tucked under Perseverance)",
    lastContact: "January 18, 2024 (Flight 72)",
    plannedDuration: "30 Sols (Up to 5 experimental test flights)",
    actualDuration: "Almost 3 Earth Years (72 Completed Flights)",
    distanceTraveled: "17.0 km (10.5 miles) flown; 128.8 minutes in Martian air",
    nssdcaId: "2020-052C",
    statusText: "Permanently grounded; active stationary weather beacon",
    statusColor: "#eab308",
    whyAbandoned: "During Flight 72 over featureless sand dunes, navigation cameras struggled with optical flow tracking during emergency descent. A rotor blade struck the terrain and snapped at its tip. While unable to fly, its solar panel, sensors, and avionics remain operational as a long-term weather monitor.",
    summary: "Ingenuity proved that powered, controlled aerodynamic flight is possible in Mars' ultra-thin atmosphere (less than 1% of Earth's air density). Carrying a swatch of muslin cloth from the Wright Brothers' 1903 Flyer under its solar panel, it rewrote the history of aviation.",
    story: {
      title: "Wings in a Whispering Sky",
      quote: "They said Mars was too thin for flight. I proved that human imagination has no ceiling.",
      chapters: [
        {
          heading: "Chapter 1: The Impossible Spin",
          text: "Earth's atmosphere is dense and forgiving; Mars' atmosphere is whisper-thin, with a surface air pressure equivalent to flying at 100,000 feet on Earth. To generate lift, my dual carbon-fiber counter-rotating blades had to spin at an astonishing 2,400 to 2,700 RPM—five times faster than an Earth helicopter! Dropped from the belly of Perseverance into the cold dirt of Jezero, I survived my first freezing -130°F night on my own internal battery."
        },
        {
          heading: "Chapter 2: The Wright Brothers Moment",
          text: "On April 19, 2021, I whirred my blades, felt the bite of the thin red air, and rose 10 feet straight up. I hovered, turned, and gently touched down. It was only 39.1 seconds, but it was humanity's 'Wright Brothers moment' on an alien world. In fact, NASA engineers had taped a stamp-sized piece of fabric from Orville and Wilbur Wright's 1903 airplane under my solar panel. Five test flights turned into ten, twenty, and eventually seventy-two!"
        },
        {
          heading: "Chapter 3: The Last Flight over Valinor Hills",
          text: "I became Percy's aerial scout, peering over ridge-tops, spotting hazardous boulders, and mapping safe pathways across ancient river deltas. On Flight 72, January 18, 2024, navigating over bland, undulating ripples of sand, my optical cameras lost track of surface landmarks. I made a hard touchdown, and shadow imagery showed one of my carbon blades had broken off. My flying days ended, but every morning when the sun rises over Jezero, I still power on, record Martian temperatures, and chirp greetings to the stars."
        }
      ]
    },
    keyAchievements: [
      "Achieved the first powered, controlled flight by an aircraft on another planet.",
      "Exceeded planned mission lifetime by 33-fold, flying 72 times instead of 5.",
      "Served as an operational aerial scout for the Perseverance rover, discovering ancient river channels.",
      "Carried a genuine piece of the 1903 Wright Flyer's wing fabric on its solar panel."
    ],
    kidFriendlyFact: "Ingenuity only weighed 1.8 kilograms (4 pounds) on Earth, and on Mars with lower gravity, it weighed just 1.5 pounds! It had to be ultra-lightweight so its high-speed blades could lift it into the sky.",
    subsystems: [
      { name: "Counter-Rotating Carbon Fiber Rotors", role: "Four 1.2-meter blades spinning in opposite directions at 2,500+ RPM to cancel out rotational torque." },
      { name: "Top-Mounted Solar Array", role: "High-efficiency solar cells charging six custom Sony lithium-ion batteries that powered flight and heating." },
      { name: "Downward-Facing Navigation Camera", role: "Black & white camera capturing 30 frames/sec to estimate velocity and position via optical feature tracking." },
      { name: "Smartphone-Grade Processor", role: "Qualcomm Snapdragon 801 CPU running Linux, computing flight stabilization loops at 500 Hz." },
      { name: "Flexible Carbon-Composite Landing Legs", role: "Four sprung landing struts designed to absorb impact touchdown shock without bouncing." }
    ],
    quiz: {
      question: "What historic piece of aviation history was hidden under Ingenuity's solar panel?",
      options: [
        "A piece of fabric from the Wright Brothers' 1903 Flyer",
        "A piece of Apollo 11's heat shield",
        "A feather from a peregrine falcon",
        "A gold coin minted in 1969"
      ],
      correctIndex: 0,
      explanation: "Ingenuity carried a small swatch of muslin fabric from the wing of the 1903 Wright Flyer, connecting the first powered flight on Earth to the first on Mars!"
    }
  },
  {
    id: "insight",
    name: "InSight Mars Lander",
    callsign: "\"InSight\" — The Planet's Heartbeat Listener",
    imageUrl: "assets/images/insight.jpg",
    body: "Mars",
    category: "Lander",
    modelType: "lander",
    badge: {
      name: "Marsquake Hunter",
      icon: "activity",
      description: "Mapped the interior crust, mantle, and molten metallic core of Mars!"
    },
    coordinates: {
      lat: 4.502,
      lon: 135.623,
      formatted: "4.50° N, 135.62° E"
    },
    locationName: "Elysium Planitia, Mars",
    launchDate: "May 5, 2018",
    landingDate: "November 26, 2018",
    lastContact: "December 15, 2022",
    plannedDuration: "1 Mars Year (~2 Earth Years / 709 Sols)",
    actualDuration: "1,445 Sols (Over 4 Earth Years)",
    distanceTraveled: "Stationary Geophysical Observatory (0 km)",
    nssdcaId: "2018-042A",
    statusText: "Dormant; completely enveloped in fine red dust",
    statusColor: "#ef4444",
    whyAbandoned: "InSight relied entirely on two large 7-foot circular solar arrays. Over four years, Elysium Planitia's calm winds allowed a thick layer of fine rust-red dust to deposit across every square centimeter. With solar generation dropping from 5,000 watt-hours to under 400 watt-hours per day, its power finally depleted.",
    summary: "Unlike rovers that examine surface rocks, InSight was designed to take Mars' pulse and internal temperature. Using an ultra-sensitive French seismometer (SEIS) and a heat probe nicknamed 'The Mole', it mapped the Martian crust, mantle, and discovered that Mars still has an active liquid core.",
    story: {
      title: "Listening to the Ancient Echoes of Mars",
      quote: "I never had wheels to roam across the dunes, but I had the ears to listen to the soul of an entire planet.",
      chapters: [
        {
          heading: "Chapter 1: The Quietest Place on Mars",
          text: "I touched down in the smooth, flat plains of Elysium Planitia—a place so featureless that some engineers jokingly called it 'the biggest parking lot in the solar system'. But that was exactly what I needed. Using my robotic arm, I gently set down SEIS, an ultra-sensitive seismometer protected under a vacuum dome and a wind-and-thermal shield. I could detect vibrations as small as the width of a single hydrogen atom!"
        },
        {
          heading: "Chapter 2: 1,300 Marsquakes",
          text: "People once thought Mars was a geologically dead rock. I proved them wrong. Day after day, I recorded deep rumbles. I heard tremors echoing from Cerberus Fossae—fractures in the crust where magma had once surged. In May 2022, I recorded a monster Magnitude 5.0 quake that vibrated the entire planet for more than ten hours. Through those shockwaves, my science team peeled back Mars' layers, discovering a surprisingly thin crust, a deep mantle, and a churning liquid molten iron core."
        },
        {
          heading: "Chapter 3: The Falling Dust and My Final Post",
          text: "While rovers have wheels to escape or encounter dust-clearing winds, I was anchored forever. With each passing season, red dust settled like a suffocating blanket on my circular solar wings. In late 2022, my power fell to critical levels. I powered down all instruments except SEIS. On December 15, 2022, I sent my final message: 'My power's really low, so this may be the last image I can send... Don't worry about me: my time here has been both productive and serene.' Then the static took over."
        }
      ]
    },
    keyAchievements: [
      "Detected and cataloged 1,319 marsquakes, proving Mars is seismically active.",
      "Provided the first direct seismic measurements of Mars' interior: its crust thickness, mantle composition, and molten metallic core.",
      "Recorded the acoustic sounds of Martian wind and the sonic booms of meteoroids crashing into the atmosphere.",
      "Detected giant meteoroid impacts that excavated pristine subsurface water ice boulders."
    ],
    kidFriendlyFact: "InSight's seismometer was so incredibly sensitive that it could detect a tree falling down on Earth if it were there—or feel a breeze whistling against its landing legs millions of miles away on Mars!",
    subsystems: [
      { name: "SEIS (Seismic Experiment for Interior Structure)", role: "Vacuum-sealed pendulum seismometer measuring vibrations smaller than the radius of an atom." },
      { name: "WTS (Wind & Thermal Shield)", role: "Aerodynamic dome dropped over SEIS to protect it from harsh Martian gusts and temperature swings." },
      { name: "HP3 Heat Flow Probe ('The Mole')", role: "Self-hammering thermal probe intended to burrow up to 5 meters underground to measure core heat leakage." },
      { name: "Dual UltraFlex Solar Arrays", role: "Two 2.2-meter accordion-fold solar disks that generated over 4,500 Wh/sol when pristine." },
      { name: "Instrument Deployment Arm (IDA)", role: "1.9-meter robotic arm equipped with a claw grapple to place instruments onto the dirt." }
    ],
    quiz: {
      question: "How many marsquakes did InSight detect during its mission on Mars?",
      options: [
        "Over 1,300 marsquakes",
        "Zero — Mars is completely dead",
        "Exactly 3 quakes",
        "Over 500,000 quakes"
      ],
      correctIndex: 0,
      explanation: "InSight detected 1,319 marsquakes, revealing that Mars is alive with subtle seismic tremors and active fault lines like Cerberus Fossae!"
    }
  },
  {
    id: "apollo11_descent",
    name: "Apollo 11 Lunar Module Descent Stage ('Eagle')",
    callsign: "\"Eagle\" — Humanity's Sanctuary at Tranquility Base",
    imageUrl: "assets/images/apollo11_descent.jpg",
    body: "Moon",
    category: "Descent Stage",
    modelType: "descent_stage",
    badge: {
      name: "Giant Leap Guardian",
      icon: "compass",
      description: "Humanity's first planetary landing stage and permanent lunar monument."
    },
    coordinates: {
      lat: 0.674,
      lon: 23.473,
      formatted: "0.674° N, 23.473° E"
    },
    locationName: "Statio Tranquillitatis (Sea of Tranquility), Moon",
    launchDate: "July 16, 1969",
    landingDate: "July 20, 1969 (20:17:40 UTC)",
    lastContact: "July 21, 1969 (Liftoff of Ascent Stage)",
    plannedDuration: "Permanent Lunar Monument",
    actualDuration: "57+ Years on the Moon (Intact and Unchanging)",
    distanceTraveled: "0 km (Firmly planted in lunar regolith)",
    nssdcaId: "1969-059C",
    statusText: "Permanent Historic Monument & Archaeological Site",
    statusColor: "#38bdf8",
    whyAbandoned: "The Apollo Lunar Module was built in two halves. The upper Ascent Stage housed Neil Armstrong and Buzz Aldrin and carried them back up to lunar orbit to rendezvous with Michael Collins in the Command Module. The lower Descent Stage served as the launch pad and had to remain behind forever.",
    summary: "The four-legged, gold-foil-wrapped platform that brought Neil Armstrong and Buzz Aldrin to the surface of the Moon. It still bears the historic commemorative plaque signed by the three astronauts and President Richard Nixon.",
    story: {
      title: "Here Men from Planet Earth First Set Foot",
      quote: "Houston, Tranquility Base here. The Eagle has landed.",
      chapters: [
        {
          heading: "Chapter 1: 30 Seconds of Fuel",
          text: "On July 20, 1969, my throttleable descent engine fired against the Moon's gravity. Boulder fields rushed up beneath us, and computer alarms 1202 and 1201 flickered on the dashboard. Neil Armstrong calmly took manual semi-control, skimming over a car-sized crater, searching for smooth ground while fuel gauges ticked toward empty. With less than 30 seconds of descent propellant remaining, my 67-inch probe whiskers touched lunar dust: 'Contact light!' Then: 'Houston, Tranquility Base here. The Eagle has landed.'"
        },
        {
          heading: "Chapter 2: The Plaque on My Leg",
          text: "Hours later, Neil climbed down my nine-rung ladder, stepped onto my saucer-like landing pad, and uttered words that will echo through human history: 'That's one small step for man, one giant leap for mankind.' Mounted firmly on my front landing strut, nestled between sheets of golden Kapton foil, rests a stainless-steel plaque: 'HERE MEN FROM THE PLANET EARTH FIRST SET FOOT UPON THE MOON, JULY 1969 A.D. WE CAME IN PEACE FOR ALL MANKIND.'"
        },
        {
          heading: "Chapter 3: The Silent Watch of Fifty-Seven Years",
          text: "When Neil and Buzz prepared to return home, explosive separation nuts sheared, and the Ascent Stage blasted upward, using my flat top as its launch pad. They returned safely to Earth, but I stayed behind. There is no wind to ruffle the dust around my footpads, no rain to wash away the bootprints etched in the regolith. For fifty-seven years, I have gazed at the brilliant blue marble of Earth hanging perpetually in the pitch-black sky, waiting for humanity to return."
        }
      ]
    },
    keyAchievements: [
      "Carried the first two human beings to a safe soft landing on another celestial body.",
      "Served as the unshakeable launch platform for humanity's first lunar ascent.",
      "Hosts the world's most famous extraterrestrial commemorative peace plaque.",
      "Anchored the deployment of the Apollo 11 Early Apollo Surface Experiments Package (EASEP) including the laser ranging retroreflector still used by scientists today."
    ],
    kidFriendlyFact: "Because the Moon has no wind, rain, or atmosphere to blow dust away, the bootprints left by Neil Armstrong and Buzz Aldrin right around the Eagle descent stage are still there today, exactly as they were in 1969!",
    subsystems: [
      { name: "Throttleable Descent Propulsion System (DPS)", role: "Rocket engine capable of throttling thrust from 10% to 100% to perform pinpoint lunar landings." },
      { name: "Four Quad Lunar Landing Gear", role: "Cantilever legs packed with crushable aluminum honeycomb cartridges to absorb the shock of touchdown." },
      { name: "Gold Kapton & Mylar Thermal Blankets", role: "Multi-layer aluminized and gold-coated film deflecting intense lunar daytime heat (+250°F)." },
      { name: "Commemorative Stainless Steel Plaque", role: "Engraved message of global peace mounted on the front ladder leg." },
      { name: "Modular Equipment Stowage Assembly (MESA)", role: "Fold-down bay that carried the TV camera that broadcast Armstrong's first step live to 650 million viewers." }
    ],
    quiz: {
      question: "What is written on the commemorative plaque mounted to the Apollo 11 descent stage ladder?",
      options: [
        "'We came in peace for all mankind'",
        "'Property of the United States'",
        "'First to arrive, never to leave'",
        "'To the Moon and back again'"
      ],
      correctIndex: 0,
      explanation: "The historic plaque reads: 'Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.'"
    }
  },
  {
    id: "spirit",
    name: "Spirit Rover (MER-A)",
    callsign: "\"Spirit\" — The Indomitable Pioneer",
    imageUrl: "assets/images/spirit.jpg",
    body: "Mars",
    category: "Rover",
    modelType: "rover",
    badge: {
      name: "Silent Ridge Pioneer",
      icon: "mountain",
      description: "Conquered the Columbia Hills and discovered explosive volcanic silica!"
    },
    coordinates: {
      lat: -14.568,
      lon: 175.478,
      formatted: "14.57° S, 175.48° E"
    },
    locationName: "Troy, Columbia Hills, Gusev Crater, Mars",
    launchDate: "June 10, 2003",
    landingDate: "January 4, 2004",
    lastContact: "March 22, 2010 (Sol 2210)",
    plannedDuration: "90 Sols (~3 months)",
    actualDuration: "2,210 Sols (Over 6 Earth Years)",
    distanceTraveled: "7.73 km (4.80 miles) through rugged highlands",
    nssdcaId: "2003-027A",
    statusText: "Dormant in the sand of 'Troy'",
    statusColor: "#ef4444",
    whyAbandoned: "In 2006, Spirit's right-front drive wheel jammed permanently. In 2009, while driving backward, it broke through a thin crust of surface dust and became mired in soft, powdery iron sulfate at a spot called 'Troy'. Unable to turn toward the sun to catch winter rays, it froze during the bitter Martian winter of 2010.",
    summary: "The twin sister of Opportunity, Spirit faced the harshest terrain of Gusev Crater. Even when its front wheel failed, it dragged the dead wheel backward—inadvertently trenching the soil and uncovering 90% pure silica, one of the biggest discoveries of past hydrothermal hot-spring activity on Mars.",
    story: {
      title: "Dragging a Broken Wheel to Greatness",
      quote: "When one of my wheels stopped turning, I didn't quit. I dragged it—and carved open the secrets of Martian volcanoes.",
      chapters: [
        {
          heading: "Chapter 1: The Rocky Road of Gusev",
          text: "Three weeks before my sister Opportunity reached Mars, I touched down in Gusev Crater. While she found ancient lakebeds right under her pads, Gusev was covered in dry, basaltic volcanic rocks. To find the story of water, my human drivers decided on an audacious goal: drive kilometers away to the summit of the Columbia Hills. Scientists didn't know if a 90-day rover could even make it to the base, let alone summit a 100-meter mountain!"
        },
        {
          heading: "Chapter 2: The Limping Hero",
          text: "In 2006, my right-front wheel seized up. Its motor drew too much current and died forever. Rather than giving up, my team on Earth reprogrammed me to drive in reverse, pulling my crippled wheel along like an anchor. That broken wheel turned out to be a blessing in disguise! As I dragged it across the ground, it sliced open the red soil like a plow, exposing bright white sand beneath: 90% pure opaline silica! It was undeniable proof of ancient boiling hydrothermal vents—hot springs where microbial life could have thrived."
        },
        {
          heading: "Chapter 3: The Sand Trap at Troy",
          text: "In April 2009, while maneuvering around a low plateau named Home Plate, my wheels broke through a deceptively crusty surface into a hidden pocket of fluffy sand. We tried every trick: crab-walking, spinning, rocking back and forth. But Martian winter was closing in, and I could not tilt my solar panels north to face the low sun. On March 22, 2010, after 2,210 Sols of defiant struggle, my final transmission faded into silence. I rest at Troy, proud of every scar."
        }
      ]
    },
    keyAchievements: [
      "First rover to scale a steep mountain on an extraterrestrial world (Husband Hill).",
      "Accidentally excavated pure silica deposits proving ancient volcanic hot springs or fumaroles on Mars.",
      "Survived more than 25 times its original design lifespan despite a paralyzed drive wheel.",
      "Captured the first color video of Martian dust devils swirling across the landscape."
    ],
    kidFriendlyFact: "Spirit's scientists named the hills in Gusev Crater the 'Columbia Hills' in honor of the seven astronauts who lost their lives in the Space Shuttle Columbia disaster.",
    subsystems: [
      { name: "Rocker-Bogie 6-Wheel Mobility", role: "Articulated drive system capable of 360-degree zero-radius turns on Martian sand." },
      { name: "Mini-TES (Thermal Emission Spectrometer)", role: "Infrared mineralogy scanner reading temperatures and rock compositions from a distance." },
      { name: "Mössbauer Spectrometer", role: "Nuclear physics sensor placed directly onto rocks to determine iron mineral composition." },
      { name: "Hazard Cameras (Hazcams)", role: "Wide-angle fisheye cameras protecting the underside and wheels from boulder collisions." },
      { name: "Radioisotope Heater Units (RHUs)", role: "Tiny pellets of decaying plutonium providing passive thermal warmth to vital electronics." }
    ],
    quiz: {
      question: "How did Spirit discover pure silica deposits that proved ancient hot springs existed on Mars?",
      options: [
        "By dragging its broken right-front wheel through the soil",
        "By blasting a rock with a laser",
        "By dropping a drill deep underground",
        "By taking an aerial photo with a drone"
      ],
      correctIndex: 0,
      explanation: "When Spirit's front wheel jammed, it dragged the locked wheel behind it like a plow. The dragging wheel tore open the topsoil, revealing dazzling white volcanic silica!"
    }
  },
  {
    id: "apollo15_lrv",
    name: "Apollo 15 Lunar Roving Vehicle (LRV-001)",
    callsign: "\"The Moon Buggy\" — Humanity's First Electric Car Off Earth",
    imageUrl: "assets/images/apollo15_lrv.jpg",
    body: "Moon",
    category: "Vehicle",
    modelType: "lrv",
    badge: {
      name: "Lunar Grand Prix Driver",
      icon: "truck",
      description: "First motorized vehicle driven by human astronauts across lunar valleys!"
    },
    coordinates: {
      lat: 26.132,
      lon: 3.633,
      formatted: "26.13° N, 3.63° E"
    },
    locationName: "VIP Site, Hadley-Apennine, Moon",
    launchDate: "July 26, 1971",
    landingDate: "July 30, 1971",
    lastContact: "August 2, 1971",
    plannedDuration: "3 Surface Excursions (EVA)",
    actualDuration: "55+ Years Resting at the VIP Site",
    distanceTraveled: "27.8 km (17.25 miles) across lunar valleys",
    nssdcaId: "1971-063C",
    statusText: "Parked on the Moon; camera filmed Falcon liftoff",
    statusColor: "#38bdf8",
    whyAbandoned: "The Lunar Rover was strictly designed for surface exploration during the Apollo 15 mission. Astronauts David Scott and James Irwin parked it at the 'VIP Site' 90 meters away from the Lunar Module Falcon so its remotely-controlled color TV camera could pan up and film the historic liftoff of the ascent stage into space.",
    summary: "Built by Boeing and General Motors, the Lunar Roving Vehicle was an engineering miracle. Folded like origami inside the Lunar Module's quadrant bay, it deployed on four wire-mesh tires and opened up the exploration of Moon craters, rilles, and mountain foothills.",
    story: {
      title: "The Ultimate Off-Road Drive at Hadley Rille",
      quote: "Man's first set of wheels on another world—parked with the front row seat to a rocket launch.",
      chapters: [
        {
          heading: "Chapter 1: The Origami Space Car",
          text: "I was packed tightly into a pie-shaped compartment on the side of Lunar Module Falcon. On Earth, I weighed 462 pounds; on the Moon, just 77 pounds! When Dave Scott pulled a set of deployment lanyards, my spring-loaded chassis popped out, hinged wheels locked into position, and seats flipped up like origami. I had four electric motors—one inside the hub of each wheel—powered by two 36-volt silver-zinc batteries."
        },
        {
          heading: "Chapter 2: The Lunar Grand Prix",
          text: "My wheels were not made of rubber—rubber would have frozen rock-hard in lunar night and melted in lunar day. Instead, they were woven from zinc-coated piano wire mesh with titanium chevron treads for grip. Astronauts Dave Scott and Jim Irwin steered me with a T-handle joystick instead of a steering wheel. We sped along at 8 to 10 km/h, kicking up majestic roostertails of fine lunar dust that arched gracefully through the vacuum of space. We drove all the way to the edge of the 1,000-foot-deep Hadley Rille canyon!"
        },
        {
          heading: "Chapter 3: The VIP Parking Spot",
          text: "At the end of our third EVA, Dave Scott drove me out 90 meters away from Falcon to an area named the 'VIP Site'. He pointed my high-gain antenna and ground-controlled color television camera right back at the lander. When the ascent stage ignited its engine to blast off, Edward Fendell in Houston remotely tilted my TV camera upward, broadcasting the first real-time live footage of astronauts launching from the Moon. Today, my wire wheels still rest in the Hadley dust, ready to roll if someone brings a fresh battery."
        }
      ]
    },
    keyAchievements: [
      "First manned vehicle driven on another celestial body, multiplying astronauts' exploration range tenfold.",
      "Traversed 27.8 kilometers of rugged lunar terrain along the towering Apennine mountain range.",
      "Carried 170 pounds of lunar samples back to the Lunar Module, including the famous 4-billion-year-old 'Genesis Rock'.",
      "Parked at the VIP site to broadcast the first live television transmission of a lunar ascent stage liftoff."
    ],
    kidFriendlyFact: "The Moon Buggy didn't have rubber tires! Because rubber would crack in the Moon's extreme temperatures, its tires were made out of woven steel piano wire with titanium treads for grip!",
    subsystems: [
      { name: "Four DC In-Wheel Motors", role: "0.25-horsepower electric drive motor housed in each of the four wheel hubs with an 80:1 harmonic gear ratio." },
      { name: "Woven Piano-Wire Tires", role: "Open-mesh zinc-coated steel wire tires preventing blowouts and shedding lunar soil buildup." },
      { name: "T-Handle Steering Controller", role: "Center console joystick that controlled forward/reverse drive, braking, and four-wheel crab steering." },
      { name: "Ground-Controlled Color TV Camera (GCTA)", role: "Remotely operated camera from Mission Control in Houston to track astronauts and the launch." },
      { name: "High-Gain Umbrella Dish Antenna", role: "Direct lunar-to-Earth S-band telemetry dish transmitting video and biometric vitals." }
    ],
    quiz: {
      question: "What were the tires of the Apollo 15 Lunar Roving Vehicle made of?",
      options: [
        "Woven piano wire mesh and titanium chevrons",
        "Inflatable heavy-duty vulcanized rubber",
        "Solid carved granite rock",
        "Hollow carbon fiber tubes"
      ],
      correctIndex: 0,
      explanation: "Rubber tires would pop or melt in the lunar vacuum and extreme temperature swings (-250°F to +250°F), so engineers hand-wove the tires out of zinc-coated piano wire mesh!"
    }
  },
  {
    id: "surveyor3",
    name: "Surveyor 3 Lunar Lander",
    callsign: "\"Surveyor 3\" — The Lander Visited by Astronauts",
    imageUrl: "assets/images/surveyor3.jpg",
    body: "Moon",
    category: "Lander",
    modelType: "lander",
    badge: {
      name: "Lunar Reunion Pioneer",
      icon: "users",
      description: "Only robotic spacecraft on another world later visited by human astronauts!"
    },
    coordinates: {
      lat: -3.015,
      lon: -23.418,
      formatted: "3.01° S, 23.42° W"
    },
    locationName: "Surveyor Crater, Oceanus Procellarum, Moon",
    launchDate: "April 17, 1967",
    landingDate: "April 20, 1967",
    lastContact: "May 4, 1967 (Visited by Apollo 12 in Nov 1969)",
    plannedDuration: "Until first lunar night",
    actualDuration: "Over 59 Years on the Moon (Parts brought home)",
    distanceTraveled: "0 km (Stationary inside a crater)",
    nssdcaId: "1967-035A",
    statusText: "Historic artifact; surveyed and sampled by Apollo 12",
    statusColor: "#38bdf8",
    whyAbandoned: "Surveyor 3 was an automated robotic lander sent before the Apollo missions to test if the lunar surface was firm enough for human astronauts to land without sinking into dust. It stayed where it touched down, but in a historic first, Apollo 12 landed 180 meters away and astronauts walked over to examine it!",
    summary: "Surveyor 3 holds a unique place in space history: it is the only robotic spacecraft on another celestial body that was later visited, photographed, and partially retrieved by human beings. Apollo 12 astronauts clipped off its camera and scoop arm to return them to Earth for forensic science.",
    story: {
      title: "The Lonely Lander That Welcomed Human Visitors",
      quote: "I waited two and a half years in the dark dust of Ocean of Storms—and then two humans walked up to shake my hand.",
      chapters: [
        {
          heading: "Chapter 1: Bouncing into the Ocean of Storms",
          text: "Before Neil Armstrong could take his giant leap, scientists worried that the Moon might be covered in a 30-foot ocean of quicksand-like dust that would swallow any lander whole! I was sent on April 17, 1967, to find out. During my landing, highly reflective lunar rocks confused my radar, and my vernier engines didn't shut down in time. I bounced three times before settling comfortably on the slope of a crater. My landing pads sank only an inch into the regolith—the Moon was solid!"
        },
        {
          heading: "Chapter 2: The First Shovel on the Moon",
          text: "I carried the first mechanized robotic scoop arm to the Moon. Controlled by radio signals from Pasadena, California, I dug four trenches up to six inches deep, scraped rocks, and slammed my scoop down to measure the strength of the lunar crust. I proved that the lunar soil could easily bear the weight of an Apollo Lunar Module and human astronauts. Having transmitted 6,315 television pictures, my batteries froze during the two-week lunar night, and I fell silent."
        },
        {
          heading: "Chapter 3: The Footsteps of Apollo 12",
          text: "Thirty-one months passed in utter silence. Then, on November 19, 1969, an incredible roar shook the ground. Apollo 12's Lunar Module Intrepid touched down just 180 meters away! Astronauts Pete Conrad and Alan Bean walked across the crater rim in their white spacesuits right up to me. They laughed, photographed my sunburned metal, and used bolt cutters to remove my television camera and sampling scoop. Those parts were flown back to Earth, allowing scientists to study how years of solar radiation and micrometeorites affect human machinery in deep space!"
        }
      ]
    },
    keyAchievements: [
      "Proved the lunar regolith was firm enough to support human landings, paving the way for Apollo 11.",
      "Conducted the first mechanical soil-mechanics trenching experiments on another celestial body.",
      "The only robotic spacecraft on another world ever visited and inspected in person by human astronauts.",
      "Returned components provided the first real-world data on how space weathering and radiation degrade hardware over years."
    ],
    kidFriendlyFact: "When scientists back on Earth examined the TV camera brought home by Apollo 12, they found dormant Streptococcus bacteria inside! It sparked a decades-long debate over whether Earth microbes could survive deep space dormancy.",
    subsystems: [
      { name: "Surface Sampler Mechanism", role: "Electric pantograph arm with a motorized scoop bucket to dig trenches and drop soil in front of the camera." },
      { name: "Slow-Scan TV Camera", role: "Vidicon tube camera equipped with color filters capable of 600-line resolution panoramic photography." },
      { name: "Three Vernier Rocket Engines", role: "Liquid-fueled engines throttling down during landing to brake the spacecraft to a gentle 3 m/s." },
      { name: "Three Aluminum Footpads", role: "Crushable honeycomb landing feet fitted with strain gauges to measure soil impact resistance." },
      { name: "Planar Array Solar Panel", role: "Adjustable solar wing rotated to track the sun across the 14-day lunar daylight cycle." }
    ],
    quiz: {
      question: "What historic event made Surveyor 3 unique among all robotic spacecraft on the Moon?",
      options: [
        "Apollo 12 astronauts landed nearby and walked over to examine it",
        "It discovered alien fossils",
        "It was the first machine to drive around the Moon",
        "It flew back to Earth entirely on its own"
      ],
      correctIndex: 0,
      explanation: "Apollo 12 made a precision pinpoint landing right near Surveyor 3. Astronauts Pete Conrad and Alan Bean walked over, inspected it, and brought parts of it back to Earth!"
    }
  },
  {
    id: "sojourner",
    name: "Sojourner Rover & Mars Pathfinder",
    callsign: "\"Sojourner\" — The Microwave-Sized Trailblazer",
    imageUrl: "assets/images/sojourner.jpg",
    body: "Mars",
    category: "Rover",
    modelType: "rover",
    badge: {
      name: "Pathfinder Pioneer",
      icon: "compass",
      description: "Humanity's first successful mobile rover to explore the surface of Mars!"
    },
    coordinates: {
      lat: 19.33,
      lon: 326.45,
      formatted: "19.33° N, 33.55° W"
    },
    locationName: "Carl Sagan Memorial Station, Ares Vallis, Mars",
    launchDate: "December 4, 1996",
    landingDate: "July 4, 1997",
    lastContact: "September 27, 1997",
    plannedDuration: "7 Sols for Sojourner, 30 Sols for Pathfinder",
    actualDuration: "83 Sols of Exploration",
    distanceTraveled: "100 meters (330 feet) — Tiny steps that opened a world",
    nssdcaId: "1996-068A",
    statusText: "Dormant; likely circling its silent lander base",
    statusColor: "#ef4444",
    whyAbandoned: "The Pathfinder lander base station suffered a battery failure during the chilly Martian night in late September 1997. Because Sojourner relied on the lander to relay its communications back to Earth, when Pathfinder went dark, Sojourner's programmed contingency was to circle the station in a standby holding pattern until its own battery and solar panel depleted.",
    summary: "Named after civil rights abolitionist Sojourner Truth, this tiny 23-pound rover was the first wheeled vehicle ever to roam Mars. It proved that low-cost, airbag-cushioned missions could deliver mobile robots to study other planets.",
    story: {
      title: "The Little Rover That Could",
      quote: "I was only the size of a microwave oven, but my 100 meters paved the highway for Spirit, Opportunity, and Curiosity.",
      chapters: [
        {
          heading: "Chapter 1: The Bouncing Pyramid",
          text: "On the 4th of July, 1997, Mars Pathfinder slammed into the Martian atmosphere without rockets to land gently. Instead, giant clusters of airbags inflated around its tetrahedral shell, and it bounced over 15 times, leaping four stories high before coming to rest in Ares Vallis—an ancient catastrophic flood channel. The petals unfolded, revealing me strapped to one of the doors: Sojourner, a 10.5-kilogram rover with six tiny cleats on my aluminum wheels."
        },
        {
          heading: "Chapter 2: Naming the Rocks of Ares Vallis",
          text: "I rolled down a deployment ramp on Sol 2, sending ripples of excitement across the newly born World Wide Web. Internet servers around the globe crashed as millions of people logged on to watch humanity's first rover drive on Mars. My scientists gave playful names to every rock I sniffed: 'Barnacle Bill', 'Yogi the Bear', and 'Scooby-Doo'. I pressed my Alpha Proton X-ray Spectrometer against Barnacle Bill and discovered it was rich in silica—very much like Earth's volcanic andesite rocks."
        },
        {
          heading: "Chapter 3: The Silent Companion",
          text: "My planned lifetime was a mere 7 days. I survived for 83 sols, outlasting all expectations. When Pathfinder's primary battery expired on Sol 83, the voice from Earth went quiet. In my onboard computer memory was a contingency code: if communications fail for several days, return toward the lander and circle it. Somewhere on the rocky plains of Ares Vallis, I sit beside the Carl Sagan Memorial Station, the humble ancestor of all Martian explorers."
        }
      ]
    },
    keyAchievements: [
      "First successful robotic rover ever deployed on Mars.",
      "Pioneered the Rocker-Bogie mobility architecture used on every NASA Mars rover since.",
      "Generated worldwide enthusiasm with early viral internet web broadcasts in 1997.",
      "Analyzed chemical composition of Martian rocks, proving catastrophic liquid floods had shaped Ares Vallis."
    ],
    kidFriendlyFact: "Sojourner was so small you could have picked it up and held it in your arms! It was only 65 cm (2 feet) long and weighed just 23 pounds on Earth, but only 9 pounds on Mars!",
    subsystems: [
      { name: "Rocker-Bogie 6-Wheel Drive", role: "Pioneering titanium suspension that distributes weight evenly across boulders without tipping." },
      { name: "APXS (Alpha Proton X-Ray Spectrometer)", role: "Sensor arm held directly against Martian rocks to measure elemental composition." },
      { name: "GaAs Solar Panel Array", role: "0.22-square-meter solar panel generating 16 watts of peak power." },
      { name: "Laser Stripe Proximity Sensors", role: "Five forward infrared laser beams detecting hazards and trenches in its driving path." },
      { name: "UHF Radio Link Antenna", role: "Short-range wireless whip antenna sending data to the Pathfinder lander relay station." }
    ],
    quiz: {
      question: "Who was the Sojourner Mars rover named after?",
      options: [
        "Sojourner Truth, the historic abolitionist and women's rights activist",
        "A character from a sci-fi novel",
        "The Latin word for 'lonely traveler'",
        "The first woman to fly an airplane"
      ],
      correctIndex: 0,
      explanation: "NASA named the rover after Sojourner Truth, the famous 19th-century African-American abolitionist and women's rights activist, following a worldwide essay contest won by 12-year-old student Valerie Ambroise!"
    }
  },
  {
    id: "phoenix",
    name: "Phoenix Mars Lander",
    callsign: "\"Phoenix\" — The Arctic Ice Digger",
    imageUrl: "assets/images/phoenix.jpg",
    body: "Mars",
    category: "Lander",
    modelType: "lander",
    badge: {
      name: "Polar Ice Toucher",
      icon: "droplet",
      description: "First mission to touch and taste water ice beneath the Martian arctic soil!"
    },
    coordinates: {
      lat: 68.22,
      lon: 234.25,
      formatted: "68.22° N, 125.75° W"
    },
    locationName: "Green Valley, Vastitas Borealis, Mars",
    launchDate: "August 4, 2007",
    landingDate: "May 25, 2008",
    lastContact: "November 2, 2008",
    plannedDuration: "90 Sols (3 months)",
    actualDuration: "161 Sols (Over 5 months)",
    distanceTraveled: "0 km (Stationary polar lander)",
    nssdcaId: "2007-034A",
    statusText: "Entombed in seasonal carbon dioxide dry-ice sheets",
    statusColor: "#ef4444",
    whyAbandoned: "Phoenix landed in the high arctic plains of Mars. As autumn turned to polar winter, the sun slipped below the horizon for months, cutting off solar power. Temperatures plunged below -150°C, and an estimated several meters of frozen carbon dioxide (dry ice) encased the entire lander, crushing its solar arrays.",
    summary: "Risen from the ashes of canceled hardware, Phoenix touched down in the frigid northern polar plains of Mars. With its backhoe-style robotic arm, it scraped through topsoil and uncovered dazzling bright patches of water ice that sublimated into gas before its cameras.",
    story: {
      title: "Touching Pure Ice Beneath the Red Dust",
      quote: "Under just two inches of rust, I found what humanity had sought for generations: pure water ice.",
      chapters: [
        {
          heading: "Chapter 1: The Frigid North",
          text: "I was named Phoenix because, like the mythical bird rising from its ashes, I was built using instruments and hardware from two canceled or lost missions (Mars Surveyor 2001 and Mars Polar Lander). In May 2008, I landed far north, near Mars' polar ice cap in the vast plains of Vastitas Borealis. Looking around, I saw a landscape shaped into strange geometric polygons caused by the contraction of subsurface ice—just like the permafrost tundra in Alaska."
        },
        {
          heading: "Chapter 2: The Disappearing Dice of Ice",
          text: "I extended my 7.7-foot robotic arm and dug into the soil trench nicknamed 'Dodo-Goldilocks'. Just two inches down, my metal scraper hit something hard and bright white. At first, scientists wondered: was it salt or was it ice? Over the next four days, my cameras watched those white dice-sized chunks shrink and vanish into thin air! It wasn't salt—it was pure water ice sublimating straight from solid into vapor in Mars' thin air. We had touched Martian water!"
        },
        {
          heading: "Chapter 3: The Frozen Polar Tomb",
          text: "I baked soil in my onboard miniature ovens (TEGA) and discovered perchlorate salts, hinting at a chemically active soil environment. But in the Martian arctic, winter is ruthless. By October 2008, the sun hung lower and lower on the horizon. Daily temperatures cratered. My batteries died on November 2. Orbital cameras flying overhead later confirmed that during the long polar night, colossal slabs of frozen carbon-dioxide dry ice encased my hull and crumpled my solar panels. I sleep entombed beneath the frost."
        }
      ]
    },
    keyAchievements: [
      "First spacecraft to directly touch and photograph subsurface water ice on Mars.",
      "Discovered perchlorate salts and calcium carbonate in the Martian soil.",
      "Detected snow falling from high-altitude Martian cirrus clouds using laser LiDAR.",
      "Confirmed that the northern polar permafrost could once have been a habitable zone."
    ],
    kidFriendlyFact: "Phoenix watched snow fall on Mars! Using a laser sensor called LiDAR, it spotted snowflakes drifting down from high Martian clouds, although the snow vaporized before reaching the ground in an effect called 'virga'.",
    subsystems: [
      { name: "Robotic Arm (RA) with Soil Scraper", role: "2.35-meter articulated backhoe arm with a motorized rasp to grind into rock-hard frozen ice." },
      { name: "TEGA (Thermal and Evolved-Gas Analyzer)", role: "Eight miniature single-use high-temperature ovens heating soil samples to 1,000°C to sniff gases." },
      { name: "MECA Wet Chemistry Laboratory", role: "Four micro-beakers mixing Martian soil with water from Earth to measure pH and nutrients." },
      { name: "LiDAR Atmospheric Laser", role: "Green laser pulses fired upward to detect ice dust and falling snow in the atmosphere." },
      { name: "Dual Circular Solar Wings", role: "Accordion-style circular solar collectors designed for low northern sun angles." }
    ],
    quiz: {
      question: "How did scientists know the bright white chunks Phoenix dug up were water ice and not salt?",
      options: [
        "The white chunks slowly shrank and sublimated (evaporated) over 4 days",
        "They tasted it with a robotic tongue",
        "It turned into blue water that flowed away",
        "It glowed green in the dark"
      ],
      correctIndex: 0,
      explanation: "Over 4 days, the white chunks slowly vanished without leaving a trace! In Mars' thin atmosphere, water ice cannot stay liquid—it sublimates directly from solid into gas when exposed to the sun."
    }
  },
  {
    id: "skycrane_perseverance",
    name: "Perseverance Sky Crane Descent Stage",
    callsign: "\"The Sky Crane\" — The Sacrificial Guardian Angel",
    imageUrl: "assets/images/skycrane_perseverance.jpg",
    body: "Mars",
    category: "Descent Stage",
    modelType: "descent_stage",
    badge: {
      name: "Sky Crane Hero",
      icon: "flame",
      description: "Heroic rocket platform that lowered Perseverance rover safely onto Mars!"
    },
    coordinates: {
      lat: 18.435,
      lon: 77.432,
      formatted: "18.44° N, 77.43° E"
    },
    locationName: "Jezero Crater, Mars (700m NW of Octavia E. Butler Landing)",
    launchDate: "July 30, 2020",
    landingDate: "February 18, 2021",
    lastContact: "February 18, 2021 (Impacted safely after flyaway)",
    plannedDuration: "A few minutes of descent glory",
    actualDuration: "Resting as an impact relic on Mars",
    distanceTraveled: "0 km (Impact crash site)",
    nssdcaId: "2020-052A-STAGE",
    statusText: "Discarded impact wreckage (Mission Accomplished)",
    statusColor: "#f97316",
    whyAbandoned: "The Sky Crane's entire mission was to lower the 1,025-kilogram Perseverance rover onto its wheels using nylon bridle cords while hovering with eight rocket thrusters. Once the rover sensed touchdown, pyrotechnic guillotine cutters severed the cables, and the Sky Crane throttled its engines to full power, rocketing away to crash safely 700 meters away.",
    summary: "One of the most audacious engineering maneuvers in history, the rocket-powered Descent Stage ('Sky Crane') hovered 20 meters above the Martian surface and gently lowered humanity's most advanced rover to the ground before flying away to sacrifice itself in the red dust.",
    story: {
      title: "The Seven Minutes of Terror and The Final Flyaway",
      quote: "My only purpose in the universe was to gently place Percy on the ground, cut the cords, and fly into eternity.",
      chapters: [
        {
          heading: "Chapter 1: The Seven Minutes of Terror",
          text: "On February 18, 2021, the Mars 2020 spacecraft slammed into the upper atmosphere at 12,000 miles per hour. A colossal supersonic parachute slowed us down, but Jezero Crater was riddled with jagged cliffs and boulder fields. At one mile above the ground, I separated from the backshell and fired my eight throttleable hydrazine rocket engines (MLEs), navigating autonomously with Terrain-Relative Navigation."
        },
        {
          heading: "Chapter 2: The Cords Lowering Percy",
          text: "At 20 meters altitude, my engines throttled into a steady hover, kicking up a dramatic hurricane of Martian dust. Inside my belly, three nylon bridle cords and an umbilical cable began to reel out. Down, down, down lowered the 1-ton Perseverance rover. Its titanium suspension unfolded. At exactly 20:55 UTC, Percy's wheels touched the solid bedrock of Mars. Tension sensors fired instantly: 'Touchdown confirmed!'"
        },
        {
          heading: "Chapter 3: The Flyaway Burn",
          text: "Within fractions of a second, miniature pyrotechnic blades slashed the cables. Relieved of a 2,200-pound load, my rocket engines flared to full throttle. I pitched forward at a steep 45-degree angle, rocketing away from the pristine new rover to ensure no exhaust or falling debris would harm it. Seven hundred meters away, I completed my heroic, sacrificial crash into the desert sand. Today, my scorched wreckage rests quietly in Jezero, a testament to bold engineering."
        }
      ]
    },
    keyAchievements: [
      "Safely lowered the heaviest, most sophisticated rover in human history onto an ancient river delta.",
      "Used autonomous Terrain-Relative Navigation (TRN) to divert away from deadly crater cliffs in real-time.",
      "Captured the first high-definition color video and real microphone audio of a planetary landing.",
      "Demonstrated flawless pyrotechnic cable cutting and autonomous flyaway avoidance maneuver."
    ],
    kidFriendlyFact: "The descent stage had a camera pointing down at the rover, and the rover had a camera pointing up at the sky crane! Millions of people on Earth watched the actual video of Perseverance being lowered on cords from space!",
    subsystems: [
      { name: "Eight Mars Lander Engines (MLEs)", role: "Hydrazine-fueled throttleable thrusters arranged in pairs of two, firing 800 lbs of thrust each." },
      { name: "Bridle Cord Spool & Winch", role: "Triple braided nylon ropes lowering the 1-ton rover 25 feet beneath the roaring thruster exhausts." },
      { name: "Pyrotechnic Cable Cutters", role: "Explosive titanium blades slicing the bridle and data cables in milliseconds upon touchdown." },
      { name: "Terrain-Relative Navigation (TRN) Computer", role: "Computer comparing real-time descent images against onboard hazard maps to pick a safe target." },
      { name: "Flyaway Avionics Guidance Program", role: "Pre-programmed trajectory banking the stage away to crash at a safe disposal perimeter." }
    ],
    quiz: {
      question: "Why did the Sky Crane fly away and crash after lowering Perseverance to the ground?",
      options: [
        "To protect the new rover from flying debris, dust, and rocket exhaust",
        "It ran out of computer memory",
        "It was trying to fly back to Earth",
        "It was looking for water"
      ],
      correctIndex: 0,
      explanation: "The Sky Crane was programmed to rocket away at full power to crash safely 700 meters away, ensuring its hot rocket exhaust and impact would not damage the rover!"
    }
  }
];

// Statistics summary for dashboard
const MISSION_STATS = {
  totalRelicsCataloged: RELICS_DATA.length,
  moonRelics: RELICS_DATA.filter(r => r.body === "Moon").length,
  marsRelics: RELICS_DATA.filter(r => r.body === "Mars").length,
  totalDistanceTraveledKm: 90.0,
  oldestRelicYears: 59, // Surveyor 3 (1967)
  longestMissionYears: 14.5 // Opportunity
};

// Celestial bodies configurations
const BODIES_CONFIG = {
  Mars: {
    name: "Mars (The Red Planet)",
    color: "#e25822",
    atmosphereColor: "#ff7b54",
    surfaceTexture: "assets/textures/mars_surface.jpg", // fallback procedural
    radius: 3389.5, // km
    gravity: "3.72 m/s² (38% of Earth)",
    atmosphere: "95% CO₂, 0.006 atm",
    description: "Cold desert world strewn with the tracks and monuments of robotic pioneers."
  },
  Moon: {
    name: "The Moon (Luna)",
    color: "#a3a3a3",
    atmosphereColor: "#ffffff",
    surfaceTexture: "assets/textures/moon_surface.jpg",
    radius: 1737.4, // km
    gravity: "1.62 m/s² (16.6% of Earth)",
    atmosphere: "Hard vacuum (Exosphere only)",
    description: "The silent silver world holding the undisturbed bootprints and landing stages of Apollo."
  }
};
