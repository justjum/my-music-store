#! /usr/bin/env node
const dotenv = require('dotenv');

console.log(
    'This script populates some test items, categories, brands, tonewoods, orders, and subscriptions. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  // import object classes
  const Brand = require("./models/brand");
  const Category = require("./models/category");
  const ContactForm = require("./models/contact_form");
  const Item = require("./models/item");
  const Order = require("./models/order");
  const Subscription = require("./models/subscription");
  const Tonewood = require("./models/tonewood");

  // Create empty arrays for each of the objects
  const brands = [];
  const categories = [];
  const contact_forms = [];
  const items = [];
  const orders = [];
  const subscriptions = [];
  const tonewoods = []

  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);

  dotenv.config();
  const dev_db_url = process.env.MONGOLAB_URI;
  const mongoDB = process.env.MONGODB_URI || dev_db_url;
  
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createBrands();
    await createTonewoods();
    await createCategories();
    await createItems();
    await createContactForms();
    await createSubscriptions();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function brandCreate(index, name) {
    const brand = new Brand({ name: name });
    await brand.save();
    brands[index] = brand;
    console.log(`Added brand: ${name}`);
  }

  async function categoryCreate(index, name) {
    const category = new Category({ name: name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }

  async function tonewoodCreate(index, name) {
    const tonewood = new Tonewood({ name: name });
    await tonewood.save();
    tonewoods[index] = tonewood;
    console.log(`Added tonewood: ${name}`);
  }
  
  async function contactFormCreate(index, first_name, family_name, email, phone, enquiry_type, instrument, level, comment) {
    const contactForm = new ContactForm({ first_name: first_name, family_name: family_name, email: email, phone: phone, enquiry_type: enquiry_type, instrument: instrument, level: level, comment: comment });
    await contactForm.save();
    contact_forms[index] = contactForm;
    console.log(`Added contact form: ${first_name} ${family_name}`);
  }

  async function subscriptionCreate(index, first_name, family_name, email) {
    const subscription = new Subscription({ first_name: first_name, family_name: family_name, email: email});
    await subscription.save();
    subscriptions[index] = subscription;
    console.log(`Added subscription: ${first_name} ${family_name}`);
  }

  async function orderCreate(index, first_name, family_name, email, phone, street_address, city, items) {
    const order = new Order({ first_name: first_name, family_name: family_name, email: email, phone: phone, street_address: street_address, city: city, items: items });
    await order.save();
    orders[index] = order;
    console.log(`Added order: ${first_name} ${family_name}`);
  }
  
  async function itemCreate(index, brand, model, category, colour, description, neck, fretboard, body, price, image, image_alt, quantity, featured=false) {
    const itemdetail = {
      brand: brand,
      model: model,
      category: category,
      colour: colour,
      description: description,
      neck: neck,
      fretboard: fretboard, 
      body: body,
      price: price,
      image: image, 
      image_alt: image_alt,
      quantity: quantity,
      featured: featured,
    };
  
    const item = new Item(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${brand} ${model}`);
  }
  
  async function createBrands() {
    console.log("Adding brands");
    await Promise.all([
      brandCreate(0, "Maton"),
      brandCreate(1, "Gibson"),
      brandCreate(2, "Fender"),
      brandCreate(3, "Eastman"),
      brandCreate(4, "Yamaha")
    ]);
  }
  
  async function createTonewoods() {
    console.log("Adding tonewoods");
    await Promise.all([
      tonewoodCreate(0, "Rosewood"),
      tonewoodCreate(1, "Maple"),
      tonewoodCreate(2, "Alder"),
      tonewoodCreate(3, "Mahogany"),
      tonewoodCreate(4, "Walnut"),
    ]);
  }

  async function createCategories() {
    console.log("Adding Categories");
    await Promise.all([
      categoryCreate(0, "Acoustic"),
      categoryCreate(1, "Electric"),
      categoryCreate(2, "Bass"),
      categoryCreate(3, "Ukulele")
    ]);
  }

  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemCreate(
        0, 
        brands[0], 
        "EC-335", 
        categories[0], 
        "Woodgrain", 
        "A mighty fine acoustic.", 
        tonewoods[1], 
        tonewoods[0], 
        tonewoods[1], 
        1500, 
        'maton.png', 
        'Maton Acoustic', 
        3, 
        true),
      itemCreate(
        1, 
        brands[1], 
        "Vintage SG", 
        categories[1], 
        "Red", 
        "A classic. Worth more than your car.", 
        tonewoods[1], 
        tonewoods[0], 
        tonewoods[2], 
        15000, 
        'gibson.jpg', 
        'Gibson SG', 
        1, 
        true),
      itemCreate(
        2, 
        brands[2], 
        "Stratocaster", 
        categories[1], 
        "Blue", 
        "The everyman's axe.", 
        tonewoods[1], 
        tonewoods[1], 
        tonewoods[2], 
        2500, 
        'stratocaster.jpg', 
        'Fender Stratocaster', 
        4),
      itemCreate(
        3, 
        brands[2], 
        "FA-125CE", 
        categories[0], 
        "Woodgrain", 
        "The single-cutaway FA-125CE combines Fender tone and style with our FE-A2 electronics for a guitar that was made to take the stage. Quality laminate construction with a modern Fender 3+3 headstock and Viking bridge create a great-sounding instrument that’s easy to play. Beginners and developing players will appreciate the nato neck that gives the guitar a lively tone and smooth, easy playing feel.", 
        tonewoods[1], 
        tonewoods[0], 
        tonewoods[1], 
        1250, 
        'fender-acoustic.jpg', 
        'Fender Acoustic', 
        5, 
        true),
      itemCreate(4, 
        brands[2], 
        "Telecaster", 
        categories[1], 
        "Light Blue", 
        "Bold, innovative and rugged, the Player Telecaster is pure Fender, through and through. The feel, the style and, most importantly, the sound—they’re all there, waiting for you to make them whisper or wail for your music. Versatile enough to handle almost anything you can create and durable enough to survive any gig, this workhorse is a trusty sidekick for your musical vision.", 
        tonewoods[1], 
        tonewoods[0], 
        tonewoods[1], 
        2250, 
        'fender-telecaster.jpg', 
        'Fender Telecaster', 
        3, 
        true),
      itemCreate(
        5, 
        brands[3], 
        "Night Acoustic", 
        categories[0], 
        "Black", 
        "Want to look like Johnny Cash? Go with this badboy.", 
        tonewoods[1], 
        tonewoods[0], 
        tonewoods[1], 
        500, 
        'eastman-acoustic.jpg', 
        'Black Eastman Acoustic'),
      itemCreate(
        6, 
        brands[3], 
        "Tweety", 
        categories[1], 
        "Red Woodgrain", 
        "This thing is pretty.  Like, real pretty.", 
        tonewoods[1], 
        tonewoods[0], 
        tonewoods[1], 
        850, 
        'eastman.jpg', 
        'Red Eastman Hollow Body', 
        5, 
        true),
      itemCreate(
        7, 
        brands[2], 
        "Jazz Bass", 
        categories[2], 
        "Red", 
        "Right here, you'll be slappin' da bass. Oooh, yeah.", 
        tonewoods[2], 
        tonewoods[0],
        tonewoods[3], 
        1150, 
        'jazzbass.png', 
        'Fender Jazz Bass', 
        7),
      itemCreate(
        8, 
        brands[4], 
        "Classical", 
        categories[0], 
        "Woodgrain", 
        "For those with a nylon persuasion", 
        tonewoods[1], 
        tonewoods[3], 
        tonewoods[4], 
        300, 
        'yamaha-classical.jpg', 
        'Yamaha Classical Guitar', 
        34),
      itemCreate(
        9, 
        brands[4], 
        "Little Fly",
        categories[3], 
        "Woodgrain", 
        "Ukuleleeeeeeeeeeeeeeee", 
        tonewoods[1], 
        tonewoods[0], 
        tonewoods[4], 
        150, 
        'yamaha-ukulele.jpg', 
        'Yamaha Ukulele',
        52),
      itemCreate(
        10, 
        brands[4], 
        "TRBX-174", 
        categories[2], 
        "Black", 
        "Hmmm Yup. More Bass.", 
        tonewoods[1], 
        tonewoods[0], 
        tonewoods[1], 
        750, 
        'yamaha-bass.jpg', 
        'Yamaha Bass Guitar', 
        2),
    ])
  }
  
  async function createContactForms() {
    console.log("Adding Contact Forms");
    await Promise.all([
      contactFormCreate(0, "Greg", "Bower", "greg@bower.com", 1234567, "General Enquiry", categories[0], "Beginner", "Hello"),
      contactFormCreate(1, "Polly", "Tower", "polly@bower.com", 2222222, "General Enquiry", categories[1], "Intermediate", "Is it me"),
      contactFormCreate(2, "Mike", "Glower", "mike@bower.com", 3333333, "Tuition", categories[3], "Advanced", "You're"),
      contactFormCreate(3, "Sue", "Flower", "sue@bower.com", 4444444, "Tuition", categories[2], "Beginner", "Looking For?"),
    ]);
  }

  async function createSubscriptions() {
    console.log("Adding subscriptions");
    await Promise.all([
      subscriptionCreate(0, "Greg", "Bower", "greg@bower.com"),
      subscriptionCreate(1, "Polly", "Tower", "polly@bower.com"),
      subscriptionCreate(2, "Mike", "Glower", "mike@bower.com"),
    ])
  }

  async function createOrders() {
    console.log("Adding Dummy Orders");
    await Promise.all([
      orderCreate(0, "Greg", "Bower", "greg@bower.com", 1234567, "7 Milky Way", "The City", [items[2], items[4]]),
      orderCreate(1, "Polly", "Tower", "polly@bower.com", 2222222, "1 One Drive", "Another City", [items[8], items[0]]),
      orderCreate(2, "Mike", "Glower", "mike@bower.com", 3333333, "4/7 Cobblestone Lane", "An Older City", [items[1], items[2]]),
      orderCreate(3, "Sue", "Flower", "sue@bower.com", 4444444, "99 Ninety Nine Street", "Numberville", [items[5], items[7], items[2], items[4]]),
    ]);
  }