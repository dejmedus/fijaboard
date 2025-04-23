PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
DROP TABLE IF EXISTS collection;
DROP TABLE IF EXISTS fijalist_collection;
DROP TABLE IF EXISTS fijalist_tag;
DROP TABLE IF EXISTS fijalist;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS user;
CREATE TABLE fijalist (
	id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	description VARCHAR(500), 
	cover_image VARCHAR(255), 
	content JSON NOT NULL, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id)
);
INSERT INTO fijalist VALUES(1,'Ernest Hemingway''s Favorite Haunts in Florida','Explore Key West through the footsteps of the famous author who lived, wrote, and drank here from 1931-1939...','hemingway_key_west.jpg','["Ernest Hemingway Home and Museum - Visit his Spanish Colonial house where he lived from 1931-1939...", "Sloppy Joe''s Bar - Hemingway''s favorite drinking spot in Key West...", "Captain Tony''s Saloon - The original location of Sloppy Joe''s where Hemingway first drank...", "Blue Heaven Restaurant - Originally a boxing ring where Hemingway refereed matches...", "Key West Lighthouse - Hemingway could see this lighthouse from his home...", "Dry Tortugas National Park - Hemingway frequently sailed here on his boat ''Pilar''...", "Bagatelle Restaurant - Originally the Bahama House, this mansion was built in 1840...", "Key West First Legal Rum Distillery - While not directly connected to Hemingway..."]','2025-04-23 18:24:12.875567','2025-04-23 18:24:12.875570');
INSERT INTO fijalist VALUES(2,'Best Coffee Shops in Portland','A curated selection of Portland''s finest coffee establishments...','portland_coffee.jpg','["Stumptown Coffee Roasters - The iconic Portland coffee brand known for...", "Heart Coffee Roasters - Scandinavian-inspired coffee shop offering...", "Coava Coffee Roasters - Industrial-chic cafe with single-origin..."]','2025-04-23 18:24:12.877639','2025-04-23 18:24:12.877641');
INSERT INTO fijalist VALUES(3,'Scenic Views with Bob Ross in the Pacific Northwest','Experience the joy of painting in real life by visiting these breathtaking Pacific Northwest locations that could have inspired Bob Ross''s iconic landscape paintings.','bob_ross_landscapes.jpg','["Mount Rainier National Park, Washington - This majestic mountain with its snow-capped peak evokes Bob Ross''s painting ''Mountain Retreat''. The view from Reflection Lakes provides a perfect mirror image of the mountain just like Ross often painted.", "Multnomah Falls, Oregon - This 620-foot-tall waterfall in the Columbia River Gorge bears striking resemblance to Ross''s ''Hidden Waterfall'' painting. The two-tiered falls surrounded by lush greenery create a perfect Bob Ross-esque scene.", "Lake Crescent, Olympic National Park - The crystal-clear waters and surrounding evergreen forests mirror the tranquil lake scenes in Ross''s ''Peaceful Waters'' painting. The morning mist that often settles on the lake creates the ethereal quality Ross loved.", "Cedar Creek Grist Mill, Washington - This historic wooden mill built in 1876 sits over a rushing creek, similar to Ross''s ''Old Mill'' paintings. The red wooden structure against green forest would have delighted Bob.", "Tumalo Falls Trail, Oregon - The burbling Tumalo Creek that runs alongside this trail resembles the ''Bubbling Stream'' painting. The 97-foot waterfall at the end provides a perfect Ross-style focal point.", "Mount Hood from Trillium Lake, Oregon - This stunning view with the mountain reflected in the still lake is reminiscent of Ross''s ''Reflections of Calm''. The composition with trees framing the mountain is classic Bob Ross."]','2025-04-23 18:24:12.878202','2025-04-23 18:24:12.878203');
INSERT INTO fijalist VALUES(4,'Animal Lover''s Adventure in San Diego','Discover the perfect itinerary for animal enthusiasts in San Diego, from ethical wildlife encounters to pet-friendly cafes and plant-based dining experiences.','san_diego_animals.jpg','["San Diego Zoo - One of the world''s most famous zoos with over 12,000 rare and endangered animals representing more than 650 species. Don''t miss the giant pandas, koalas, and the Elephant Odyssey habitat.", "Cat Caf\u00e9 Lounge San Diego - Spend time with adoptable rescue cats while enjoying coffee and pastries. All cats are available for adoption, and your visit helps support their care.", "La Jolla Cove - Watch sea lions and harbor seals in their natural habitat as they lounge on the rocks and swim in the protected cove. The area is also home to colorful garibaldi fish and pelicans.", "Kindred - Award-winning vegan restaurant in South Park offering creative plant-based dishes and cocktails in a stylish gothic-inspired space. Their Buffalo cauliflower ''wings'' and seitan skewers are local favorites.", "Safari Park - Sister property to the San Diego Zoo where animals roam in large enclosures that mimic their native habitats. The African Tram Safari and Cheetah Run are must-see experiences.", "Dog Beach - A leash-free beach in Ocean Beach where dogs can run, play and swim. Perfect for dog owners or just animal lovers who enjoy watching happy pups frolic in the surf.", "Plant Power Fast Food - A 100% plant-based fast food restaurant serving vegan versions of classic favorites like burgers, ''chicken'' sandwiches, and milkshakes, showing how animal-friendly dining can still be indulgent."]','2025-04-23 18:24:12.878553','2025-04-23 18:24:12.878554');
INSERT INTO fijalist VALUES(5,'Literary Landmarks in Dublin','Follow in the footsteps of Ireland''s literary giants through Dublin, a UNESCO City of Literature that has inspired countless writers and poets through the centuries.','dublin_literary.jpg','["Dublin Writers Museum - Housed in an 18th-century mansion, this museum celebrates the works of Swift, Wilde, Yeats, Joyce, and other Irish literary legends with manuscripts, letters, and personal items.", "Trinity College and the Book of Kells - Visit the alma mater of Samuel Beckett, Oscar Wilde, and Bram Stoker, and see the stunning Long Room Library that houses the famous illuminated manuscript.", "Davy Byrne''s Pub - The famous pub featured in James Joyce''s ''Ulysses'' where Leopold Bloom enjoyed a gorgonzola sandwich and glass of burgundy. Still operating today and a must-visit on Bloomsday (June 16).", "Oscar Wilde House - The childhood home of the famous playwright and wit, now part of the American College Dublin. The nearby statue of Wilde lounging on a rock in Merrion Square is also worth visiting.", "Sweny''s Pharmacy - A preserved Victorian-era pharmacy where Leopold Bloom bought lemon soap in ''Ulysses''. Now run by volunteers who host daily readings from Joyce''s works.", "The National Library of Ireland - Houses the world''s largest collection of W.B. Yeats manuscripts, along with extensive Joyce archives and an excellent exhibition on Irish literary history.", "The Abbey Theatre - Founded by W.B. Yeats and Lady Gregory in 1904, this is Ireland''s national theater and played a crucial role in promoting Irish literary talent."]','2025-04-23 18:24:12.878894','2025-04-23 18:24:12.878895');
INSERT INTO fijalist VALUES(6,'Hidden Architectural Gems in Chicago','Discover Chicago''s lesser-known architectural masterpieces beyond the famous skyscrapers, showcasing the city''s rich design heritage across different neighborhoods and eras.','chicago_architecture.jpg','["Bah\u00e1''\u00ed House of Worship - The only Bah\u00e1''\u00ed temple in North America, this stunning domed structure in Wilmette features intricate lace-like concrete patterns and beautiful gardens.", "Rookery Building Light Court - Step inside this 1888 masterpiece to see Frank Lloyd Wright''s luminous lobby renovation with white marble and gold leaf details hidden within a historic exterior.", "Reebie Storage Warehouse - An unlikely Egyptian Revival treasure covered in hieroglyphics, pharaohs, and palm fronds, making it perhaps the world''s most elaborate storage facility.", "Alfred Caldwell Lily Pool - A prairie-style landscape masterpiece tucked away in Lincoln Park, featuring natural stonework, native plantings, and a pavilion designed by Caldwell.", "Elks National Memorial - A neoclassical circular temple with breathtaking mosaics, bronze sculptures, and a 38-foot domed ceiling rarely visited by tourists.", "S.R. Crown Hall - Ludwig Mies van der Rohe''s minimalist masterpiece on the IIT campus embodies his ''less is more'' philosophy with its clear span glass and steel construction.", "Chicago Cultural Center - Free to enter and home to the world''s largest Tiffany glass dome, intricately designed mosaics, and marble staircases housed in what was once the city''s first public library."]','2025-04-23 18:24:12.879230','2025-04-23 18:24:12.879231');
INSERT INTO fijalist VALUES(7,'Street Art Safari in Melbourne','Explore Melbourne''s world-renowned urban art scene through its vibrant laneways, hidden alleys, and neighborhood walls that showcase everything from political statements to breathtaking murals.','melbourne_street_art.jpg','["Hosier Lane - The most famous street art location in Melbourne, this bluestone laneway features constantly changing murals, stencils, and paste-ups from international and local artists.", "AC/DC Lane - Named after the famous Australian rock band, this laneway in the heart of Melbourne features music-themed art and leads to Cherry Bar, a legendary rock venue.", "Blender Studios - An artist-run studio space that offers guided street art tours led by working artists who can provide insider knowledge about Melbourne''s urban art culture.", "Centre Place - A narrow laneway filled with cafes, small bars, and boutiques where street art covers every available surface, creating one of Melbourne''s most photographed locations.", "Brunswick Street, Fitzroy - This bohemian neighborhood is home to large-scale murals by renowned artists like Rone and Adnate, often depicting haunting, photorealistic portraits.", "Duckboard Place - Connected to AC/DC Lane, this area features works by international street artists and is home to a famous Banksy rat stencil (though it''s been damaged over time).", "Collingwood Arts Precinct - This former technical school has been transformed into a creative hub with building-sized murals and installations throughout the surrounding streets."]','2025-04-23 18:24:12.879557','2025-04-23 18:24:12.879557');
INSERT INTO fijalist VALUES(8,'Historical Pub Crawl in Boston','Drink in the history of America''s revolution while sampling craft beers and classic cocktails at Boston''s oldest and most storied taverns, where founding fathers once plotted independence.','boston_historic_pubs.jpg','["Green Dragon Tavern - Established in 1654 and known as the ''Headquarters of the Revolution'', this is where Paul Revere and John Hancock plotted the Boston Tea Party. The current location is a faithful recreation of the original.", "Bell in Hand Tavern - America''s oldest continuously operating tavern (established 1795), founded by Boston''s last town crier. Try their signature ale while soaking in the historic atmosphere.", "Warren Tavern - Built in 1780, this Charlestown pub was one of the first buildings constructed after the British burned the town. George Washington, Paul Revere, and Benjamin Franklin all drank here.", "Union Oyster House - America''s oldest continuously operating restaurant (since 1826) features a wooden bar that''s been serving drinks for nearly two centuries. The ''Kennedy Booth'' commemorates JFK''s regular visits.", "The Point - Located in the historic Bulfinch Triangle, this pub occupies a building from the 1840s that survived Boston''s Great Fire of 1872 and has original exposed brick walls and wooden beams.", "Doyle''s Cafe - A Jamaica Plain institution since 1882 that served as a political hub for Boston mayors and Kennedy family gatherings. Famous for being the first bar to pour Sam Adams beer.", "Amrheins - South Boston''s oldest tavern (established 1890) features the oldest hand-carved bar in America and the first draft beer system in Boston."]','2025-04-23 18:24:12.879873','2025-04-23 18:24:12.879874');
INSERT INTO fijalist VALUES(9,'Southeast Asian Foodie''s Paradise in Queens, NY','Embark on a culinary journey through the diverse flavors of Southeast Asia without leaving Queens, home to authentic restaurants representing Thailand, Vietnam, the Philippines, and more.','queens_sea_food.jpg','["SriPraPhai - This Woodside institution is widely considered one of NYC''s best Thai restaurants, known for not toning down spice levels and serving regional specialties like crispy watercress salad and jungle curry.", "Phayul - Experience Tibetan cuisine in Jackson Heights with standout dishes like beef momos (dumplings), thenthuk (hand-pulled noodle soup), and shabhaley (fried beef patties).", "Ihawan - This Filipino favorite in Woodside serves exceptional lechon (roast pork) and kare-kare (oxtail stew in peanut sauce) in a no-frills setting that locals adore.", "Pata Cafe - A hidden gem in Elmhurst offering authentic Northern Thai dishes like khao soi (curry noodle soup) and nam prik ong (chili dip) that are rare finds outside Thailand.", "JoJu - Modern Vietnamese in Elmhurst famous for their banh mi sandwiches with creative fillings like bulgogi beef and lemongrass pork, plus Vietnamese iced coffee and bubble tea.", "Lao Bei Fang - Hand-pulled noodles made before your eyes at this Elmhurst spot specializing in northwestern Chinese cuisine, with incredible knife-shaved noodles and affordable dumplings.", "Dosa Delight - South Indian vegetarian haven in Jackson Heights serving crispy dosas, uttapam, and thali platters that showcase the regional flavors of southern India."]','2025-04-23 18:24:12.880259','2025-04-23 18:24:12.880260');
INSERT INTO fijalist VALUES(10,'Film Location Tour in Vancouver','Explore ''Hollywood North'' through iconic filming locations that have doubled for everything from superhero cities to alien worlds in countless blockbusters and TV series.','vancouver_film.jpg','["Vancouver Public Library - The distinctive postmodern central branch has appeared in Battlestar Galactica, The Imaginarium of Doctor Parnassus, and as a high-tech headquarters in multiple sci-fi productions.", "Stanley Park - This sprawling urban park has been featured in Deadpool, Planet of the Apes, The X-Files, and countless other productions, with its seawall and forest areas providing versatile backdrops.", "Gastown Steam Clock - A popular filming spot on Vancouver''s cobblestone streets, appearing in Deadpool, Lucifer, and The Flash. The surrounding historic district frequently stands in for New York City.", "Marine Building - This stunning Art Deco building from 1930 has served as the Daily Planet in Smallville, appeared in Blade: Trinity, and featured in Fifty Shades of Grey as Christian Grey''s office building.", "University of British Columbia - The campus has portrayed everything from Xavier''s School for Gifted Youngsters in X-Men to the setting for The Age of Adaline, with its Museum of Anthropology being particularly photogenic.", "Cleveland Dam - This North Vancouver location created the dramatic waterfall fight scene in Rambo: First Blood and has appeared in MacGyver, The X-Files, and Supernatural.", "Britannia Mine Museum - This former copper mine has been transformed into everything from secret military facilities to villain lairs in productions like The X-Files, Siren, and Fantastic Four."]','2025-04-23 18:24:12.880585','2025-04-23 18:24:12.880585');
CREATE TABLE tag (
	id INTEGER NOT NULL, 
	name VARCHAR(50) NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (name)
);
INSERT INTO tag VALUES(1,'food');
INSERT INTO tag VALUES(2,'queens');
INSERT INTO tag VALUES(3,'asian-cuisine');
INSERT INTO tag VALUES(4,'restaurants');
INSERT INTO tag VALUES(5,'history');
INSERT INTO tag VALUES(6,'boston');
INSERT INTO tag VALUES(7,'food-drink');
INSERT INTO tag VALUES(8,'pubs');
INSERT INTO tag VALUES(9,'art');
INSERT INTO tag VALUES(10,'street-art');
INSERT INTO tag VALUES(11,'melbourne');
INSERT INTO tag VALUES(12,'urban-culture');
INSERT INTO tag VALUES(13,'architecture');
INSERT INTO tag VALUES(14,'chicago');
INSERT INTO tag VALUES(15,'design');
INSERT INTO tag VALUES(16,'literature');
INSERT INTO tag VALUES(17,'travel');
INSERT INTO tag VALUES(18,'ireland');
INSERT INTO tag VALUES(19,'nature');
INSERT INTO tag VALUES(20,'animals');
INSERT INTO tag VALUES(21,'san-diego');
INSERT INTO tag VALUES(22,'family-friendly');
INSERT INTO tag VALUES(23,'outdoor-activities');
INSERT INTO tag VALUES(24,'film-locations');
INSERT INTO tag VALUES(25,'vancouver');
INSERT INTO tag VALUES(26,'entertainment');
INSERT INTO tag VALUES(27,'florida');
INSERT INTO tag VALUES(28,'key-west');
INSERT INTO tag VALUES(29,'hemingway');
INSERT INTO tag VALUES(30,'pacific-northwest');
INSERT INTO tag VALUES(31,'painting');
INSERT INTO tag VALUES(32,'bob-ross');
INSERT INTO tag VALUES(33,'landscapes');
INSERT INTO tag VALUES(34,'dublin');
INSERT INTO tag VALUES(35,'urban-exploration');
INSERT INTO tag VALUES(36,'hidden-gems');
INSERT INTO tag VALUES(37,'adventure');
INSERT INTO tag VALUES(38,'coffee');
INSERT INTO tag VALUES(39,'portland');
INSERT INTO tag VALUES(40,'cafes');
INSERT INTO tag VALUES(41,'film');
CREATE TABLE user (
	id INTEGER NOT NULL, 
	username VARCHAR(80) NOT NULL, 
	email VARCHAR(200) NOT NULL, 
	password_hash VARCHAR(200) NOT NULL, 
	profile_picture VARCHAR(200), 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id), 
	UNIQUE (username), 
	UNIQUE (email)
);
INSERT INTO user VALUES(1,'tavi_kauwe','tavi.kauwe@example.com','$2b$12$KJJgJCBzPMVN4xVEJ4PC3OXDXNVGIxrYGcCcL1S6NKV4vX2DY/Fhu','tavi_profile.jpg','2025-04-23 18:24:12.857192','2025-04-23 18:24:12.857223');
INSERT INTO user VALUES(2,'myshkin_kauwe','myshkin.kauwe@example.com','$2b$12$KJJgJCBzPMVN4xVEJ4PC3OXDXNVGIxrYGcCcL1S6NKV4vX2DY/Fhu','myshkin_profile.jpg','2025-04-23 18:24:12.857192','2025-04-23 18:24:12.857223');
INSERT INTO user VALUES(3,'traveler42','adventure.seeker@example.com','$2b$12$KJJgJCBzPMVN4xVEJ4PC3OXDXNVGIxrYGcCcL1S6NKV4vX2DY/Fhu','traveler_profile.jpg','2025-04-23 18:24:12.857192','2025-04-23 18:24:12.857223');
INSERT INTO user VALUES(4,'urban_explorer','city.wanderer@example.com','$2b$12$KJJgJCBzPMVN4xVEJ4PC3OXDXNVGIxrYGcCcL1S6NKV4vX2DY/Fhu','explorer_profile.jpg','2025-04-23 18:24:12.857192','2025-04-23 18:24:12.857223');
INSERT INTO user VALUES(5,'foodie_finds','culinary.quests@example.com','$2b$12$KJJgJCBzPMVN4xVEJ4PC3OXDXNVGIxrYGcCcL1S6NKV4vX2DY/Fhu','foodie_profile.jpg','2025-04-23 18:24:12.857192','2025-04-23 18:24:12.857223');
CREATE TABLE collection (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	name VARCHAR(255) NOT NULL, 
	description VARCHAR(500), 
	is_private BOOLEAN, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES user (id)
);
INSERT INTO collection VALUES(1,1,'Tavi''s Foodie Collection','A collection of the best food experiences and culinary adventures from around the world',0,'2025-04-23 18:24:12.881674','2025-04-23 18:24:12.881676');
INSERT INTO collection VALUES(2,1,'Tavi''s Nature Collection','Beautiful outdoor experiences and natural wonders worth exploring',0,'2025-04-23 18:24:12.881676','2025-04-23 18:24:12.881677');
INSERT INTO collection VALUES(3,2,'Myshkin''s Literary Journeys','Following the footsteps of famous authors and their inspirations',0,'2025-04-23 18:24:12.881677','2025-04-23 18:24:12.881677');
INSERT INTO collection VALUES(4,2,'Myshkin''s Hidden Gems','Off-the-beaten-path locations and experiences that tourists often miss',1,'2025-04-23 18:24:12.881678','2025-04-23 18:24:12.881678');
INSERT INTO collection VALUES(5,3,'Adventure Bucket List','Thrilling experiences for the ultimate adventure seeker',0,'2025-04-23 18:24:12.881678','2025-04-23 18:24:12.881679');
INSERT INTO collection VALUES(6,4,'Urban Exploration','Discover the hidden sides of cities around the world',0,'2025-04-23 18:24:12.881679','2025-04-23 18:24:12.881679');
INSERT INTO collection VALUES(7,5,'Global Flavors','International culinary journeys and food experiences',0,'2025-04-23 18:24:12.881679','2025-04-23 18:24:12.881680');
CREATE TABLE fijalist_tag (
	id INTEGER NOT NULL, 
	fijalist_id INTEGER NOT NULL, 
	tag_id INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(fijalist_id) REFERENCES fijalist (id), 
	FOREIGN KEY(tag_id) REFERENCES tag (id)
);
INSERT INTO fijalist_tag VALUES(1,1,16);
INSERT INTO fijalist_tag VALUES(2,1,27);
INSERT INTO fijalist_tag VALUES(3,1,28);
INSERT INTO fijalist_tag VALUES(4,1,29);
INSERT INTO fijalist_tag VALUES(5,1,7);
INSERT INTO fijalist_tag VALUES(6,1,8);
INSERT INTO fijalist_tag VALUES(7,2,38);
INSERT INTO fijalist_tag VALUES(8,2,39);
INSERT INTO fijalist_tag VALUES(9,2,40);
INSERT INTO fijalist_tag VALUES(10,3,19);
INSERT INTO fijalist_tag VALUES(11,3,9);
INSERT INTO fijalist_tag VALUES(12,3,30);
INSERT INTO fijalist_tag VALUES(13,4,20);
INSERT INTO fijalist_tag VALUES(14,4,21);
INSERT INTO fijalist_tag VALUES(15,4,17);
INSERT INTO fijalist_tag VALUES(16,4,7);
INSERT INTO fijalist_tag VALUES(17,5,16);
INSERT INTO fijalist_tag VALUES(18,5,17);
INSERT INTO fijalist_tag VALUES(19,5,18);
INSERT INTO fijalist_tag VALUES(20,5,7);
INSERT INTO fijalist_tag VALUES(21,5,8);
INSERT INTO fijalist_tag VALUES(22,6,13);
INSERT INTO fijalist_tag VALUES(23,6,14);
INSERT INTO fijalist_tag VALUES(24,6,15);
INSERT INTO fijalist_tag VALUES(25,6,5);
INSERT INTO fijalist_tag VALUES(26,7,9);
INSERT INTO fijalist_tag VALUES(27,7,10);
INSERT INTO fijalist_tag VALUES(28,7,11);
INSERT INTO fijalist_tag VALUES(29,7,12);
INSERT INTO fijalist_tag VALUES(30,8,5);
INSERT INTO fijalist_tag VALUES(31,8,6);
INSERT INTO fijalist_tag VALUES(32,8,7);
INSERT INTO fijalist_tag VALUES(33,8,8);
INSERT INTO fijalist_tag VALUES(34,9,1);
INSERT INTO fijalist_tag VALUES(35,9,2);
INSERT INTO fijalist_tag VALUES(36,9,3);
INSERT INTO fijalist_tag VALUES(37,9,4);
INSERT INTO fijalist_tag VALUES(38,10,41);
INSERT INTO fijalist_tag VALUES(39,10,25);
INSERT INTO fijalist_tag VALUES(40,10,17);
INSERT INTO fijalist_tag VALUES(41,10,26);
CREATE TABLE fijalist_collection (
	id INTEGER NOT NULL, 
	fijalist_id INTEGER NOT NULL, 
	collection_id INTEGER NOT NULL, 
	added_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(fijalist_id) REFERENCES fijalist (id), 
	FOREIGN KEY(collection_id) REFERENCES collection (id)
);
COMMIT;
