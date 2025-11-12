// Seed script for animals with photos
// Run with: node database/seed-animals.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const animals = [
  {
    name: "Red Tailed Hawk",
    genus: "Buteo",
    species: "jamaicensis",
    gname: "Red Tailed Hawk",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/11386/default.jpg?highlightTerms=red%20hawk",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Accipitriformes",
    family: "Accipitridae",
    cls: "Aves"
  },
  {
    name: "Coyote",
    genus: "Canis",
    species: "latrans",
    gname: "Coyote",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/11774/default.jpg?highlightTerms=coyote",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Carnivora",
    family: "Canidae",
    cls: "Mammalia"
  },
  {
    name: "Great Horned Owl",
    genus: "Bubo",
    species: "virginianus",
    gname: "Great Horned Owl",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/12828/default.jpg?highlightTerms=great%20owl",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Strigiformes",
    family: "Strigidae",
    cls: "Aves"
  },
  {
    name: "Eastern Screech Owl",
    genus: "Megascops",
    species: "asio",
    gname: "Eastern Screech Owl",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/7450/default.jpg?highlightTerms=Screech%20owl",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Strigiformes",
    family: "Strigidae",
    cls: "Aves"
  },
  {
    name: "Bald Eagle",
    genus: "Haliaeetus",
    species: "leucocephalus",
    gname: "Bald Eagle",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/28670/default.jpg?highlightTerms=bald%20eagle",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Accipitriformes",
    family: "Accipitridae",
    cls: "Aves"
  },
  {
    name: "Harp Seal",
    genus: "Pagophilus",
    species: "groenlandicus",
    gname: "Harp Seal",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Harp_seal_pointing_upwards.jpg/220px-Harp_seal_pointing_upwards.jpg",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Carnivora",
    family: "Phocidae",
    cls: "Mammalia"
  },
  {
    name: "Grey Seal",
    genus: "Halichoerus",
    species: "grypus",
    gname: "Grey Seal",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/10176/default.jpg?highlightTerms=gray%20seal",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Carnivora",
    family: "Phocidae",
    cls: "Mammalia"
  },
  {
    name: "Opossum",
    genus: "Didelphis",
    species: "virginiana",
    gname: "Opossum",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/15169/default.jpg?highlightTerms=opossum",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Didelphimorphia",
    family: "Didelphidae",
    cls: "Mammalia"
  },
  {
    name: "Eastern Gray Squirrel",
    genus: "Sciurus",
    species: "carolinensis",
    gname: "Eastern Gray Squirrel",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/10267/default.jpg?highlightTerms=eastern%20gray%20squirrel",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Rodentia",
    family: "Sciuridae",
    cls: "Mammalia"
  },
  {
    name: "Osprey",
    genus: "Pandion",
    species: "haliaetus",
    gname: "Osprey",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/11627/default.jpg?highlightTerms=osprey",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Accipitriformes",
    family: "Pandionidae",
    cls: "Aves"
  },
  {
    name: "Peregrine Falcon",
    genus: "Falco",
    species: "peregrinus",
    gname: "Peregrine Falcon",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/11211/default.jpg?highlightTerms=falcon",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Falconiformes",
    family: "Falconidae",
    cls: "Aves"
  },
  {
    name: "Piping Plover",
    genus: "Charadrius",
    species: "melodus",
    gname: "Piping Plover",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/7520/default.jpg?highlightTerms=piping%20plover",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Charadriiformes",
    family: "Charadriidae",
    cls: "Aves"
  },
  {
    name: "American Woodcock",
    genus: "Scolopax",
    species: "minor",
    gname: "American Woodcock",
    image: "https://d1ia71hq4oe7pn.cloudfront.net/photo/64829511-720px.jpg",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Charadriiformes",
    family: "Scolopacidae",
    cls: "Aves"
  },
  {
    name: "Eastern Red Bat",
    genus: "Lasiurus",
    species: "borealis",
    gname: "Eastern Red Bat",
    image: "http://www.conservewildlifenj.org/images/artmax_2404.jpg",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Chiroptera",
    family: "Vespertilionidae",
    cls: "Mammalia"
  },
  {
    name: "Big Brown Bat",
    genus: "Eptesicus",
    species: "fuscus",
    gname: "Big Brown Bat",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/18164/default.jpg?highlightTerms=big%20brown%20bat",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Chiroptera",
    family: "Vespertilionidae",
    cls: "Mammalia"
  },
  {
    name: "Raccoon",
    genus: "Procyon",
    species: "lotor",
    gname: "Raccoon",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/11639/default.jpg?highlightTerms=Racoon",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Carnivora",
    family: "Procyonidae",
    cls: "Mammalia"
  },
  {
    name: "Spotted Salamander",
    genus: "Ambystoma",
    species: "maculatum",
    gname: "Spotted Salamander",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotted_Salamander%2C_Cantley%2C_Quebec.jpg/1280px-Spotted_Salamander%2C_Cantley%2C_Quebec.jpg",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Caudata",
    family: "Ambystomatidae",
    cls: "Amphibia"
  },
  {
    name: "Spring Peeper",
    genus: "Pseudacris",
    species: "crucifer",
    gname: "Spring Peeper",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/17483/default.jpg?highlightTerms=spring%20peeper",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Anura",
    family: "Hylidae",
    cls: "Amphibia"
  },
  {
    name: "Humpback Whale",
    genus: "Megaptera",
    species: "novaeangliae",
    gname: "Humpback Whale",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/61/Humpback_Whale_underwater_shot.jpg",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Cetacea",
    family: "Balaenopteridae",
    cls: "Mammalia"
  },
  {
    name: "Canada Goose",
    genus: "Branta",
    species: "canadensis",
    gname: "Canada Goose",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/13106/default.jpg?highlightTerms=canada%20goose",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Anseriformes",
    family: "Anatidae",
    cls: "Aves"
  },
  {
    name: "Horseshoe Crab",
    genus: "Limulus",
    species: "polyphemus",
    gname: "Horseshoe Crab",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/10171/default.jpg?highlightTerms=horseshoe%20crab",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    order: "Xiphosura",
    family: "Limulidae",
    cls: "Merostomata"
  },
  {
    name: "Painted Turtle",
    genus: "Chrysemys",
    species: "picta",
    gname: "Painted Turtle",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/12972/default.jpg?highlightTerms=painted%20turtle",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Testudines",
    family: "Emydidae",
    cls: "Reptilia"
  },
  {
    name: "White-tailed Deer",
    genus: "Odocoileus",
    species: "virginianus",
    gname: "White-tailed Deer",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/23729/default.jpg?highlightTerms=white%20tailed%20deer",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Artiodactyla",
    family: "Cervidae",
    cls: "Mammalia"
  },
  {
    name: "Red Fox",
    genus: "Vulpes",
    species: "vulpes",
    gname: "Red Fox",
    image: "https://digitalmedia.fws.gov/digital/api/singleitem/image/natdiglib/6028/default.jpg?highlightTerms=red%20fox",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Carnivora",
    family: "Canidae",
    cls: "Mammalia"
  },
  {
    name: "Brown Rat",
    genus: "Rattus",
    species: "norvegicus",
    gname: "A Rat",
    image: "http://www.conserveireland.com/wp-content/uploads/2018/03/1-16.jpg",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Rodentia",
    family: "Muridae",
    cls: "Mammalia"
  },
  {
    name: "House Sparrow",
    genus: "Passer",
    species: "domesticus",
    gname: "Sparrow",
    image: "https://download.ams.birds.cornell.edu/api/v1/asset/63742431/1800",
    kingdom: "Animalia",
    phylum: "Chordata",
    order: "Passeriformes",
    family: "Passeridae",
    cls: "Aves"
  }
];

async function seedAnimals() {
  console.log('Starting to seed animals...');
  
  // Clear existing animals (optional - comment out if you want to keep existing data)
  // const { error: deleteError } = await supabase.from('animals').delete().neq('id', 0);
  // if (deleteError) {
  //   console.error('Error clearing animals:', deleteError);
  // } else {
  //   console.log('Cleared existing animals');
  // }

  let successCount = 0;
  let errorCount = 0;

  for (const animal of animals) {
    const { data, error } = await supabase
      .from('animals')
      .insert(animal)
      .select();

    if (error) {
      console.error(`Error inserting ${animal.gname}:`, error.message);
      errorCount++;
    } else {
      console.log(`✓ Inserted: ${animal.gname}`);
      successCount++;
    }
  }

  console.log('\n=== Seeding Complete ===');
  console.log(`Successfully inserted: ${successCount} animals`);
  console.log(`Errors: ${errorCount} animals`);
}

// Run the seed function
seedAnimals()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

