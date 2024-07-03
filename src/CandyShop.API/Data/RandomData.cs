namespace CandyShop.API.Data;

public record DataItem
{
    public string name { get; set; } = "";
    public string phone { get; set; } = "";
    public string email { get; set; } = "";
    public string address { get; set; } = "";
    public string postalZip {get; set; }  = "";
}
public static class RandomData
{
    public static List<DataItem> data {get;} = [
	new() {
        name = "Jorden Pitts",
		phone = "(183) 463-2876",
		email = "elit.erat@protonmail.net",
		address = "Ap #684-817 Iaculis St.",
		postalZip = "954766"
	},
	new() {
		name = "Quynn Palmer",
		phone = "(821) 554-5124",
		email = "amet.consectetuer@protonmail.couk",
		address = "741-5153 Sit Avenue",
		postalZip = "527580"
	},
	new() {
		name = "Hilel Saunders",
		phone = "(315) 297-4391",
		email = "nam.ac@hotmail.edu",
		address = "P.O. Box 682, 7808 Ipsum Ave",
		postalZip = "445128"
	},
	new() {
		name = "Patrick Chaney",
		phone = "(464) 578-5851",
		email = "faucibus@yahoo.ca",
		address = "Ap #521-664 Enim Ave",
		postalZip = "915626"
	},
	new() {
		name = "Brennan Mckee",
		phone = "(837) 213-0524",
		email = "dictum.sapien.aenean@hotmail.ca",
		address = "109-8230 Nulla. Rd.",
		postalZip = "8557-2736"
	},
	new() {
		name = "Salvador Hoover",
		phone = "(351) 731-6572",
		email = "et.magnis@protonmail.org",
		address = "Ap #169-4246 Auctor Rd.",
		postalZip = "136485"
	},
	new() {
		name = "Chava Evans",
		phone = "(218) 444-5476",
		email = "non.lobortis@google.net",
		address = "357-4795 Ac Av.",
		postalZip = "548366"
	},
	new() {
		name = "Louis Sykes",
		phone = "(626) 444-6873",
		email = "elit.aliquam.auctor@google.edu",
		address = "792-6730 Magnis Road",
		postalZip = "413761"
	},
	new() {
		name = "Jordan Daugherty",
		phone = "(474) 949-6456",
		email = "velit@hotmail.com",
		address = "7632 Duis Road",
		postalZip = "51-836"
	},
	new() {
		name = "Alexandra Franks",
		phone = "(546) 494-1752",
		email = "ipsum.nunc@protonmail.com",
		address = "Ap #277-5250 Vivamus St.",
		postalZip = "561134"
	},
	new() {
		name = "Bevis Bishop",
		phone = "(189) 879-6355",
		email = "euismod.mauris.eu@aol.net",
		address = "Ap #844-9895 Enim St.",
		postalZip = "78429"
	},
	new() {
		name = "Lisandra Phelps",
		phone = "(267) 587-6327",
		email = "fringilla@google.edu",
		address = "Ap #296-5717 Eget Street",
		postalZip = "137492"
	},
	new() {
		name = "Virginia Ortiz",
		phone = "(211) 489-0757",
		email = "auctor@google.com",
		address = "Ap #164-8196 Ridiculus Street",
		postalZip = "5228"
	},
	new() {
		name = "Kamal Mason",
		phone = "(630) 803-4761",
		email = "proin.dolor@google.net",
		address = "486-8812 Quis, Av.",
		postalZip = "77145"
	},
	new() {
		name = "Plato Castaneda",
		phone = "(126) 794-2326",
		email = "augue.scelerisque.mollis@icloud.com",
		address = "Ap #571-1713 Sed, Rd.",
		postalZip = "4835 YD"
	},
	new() {
		name = "Amir Kinney",
		phone = "(463) 446-7240",
		email = "nec.diam@yahoo.couk",
		address = "Ap #171-1344 Fermentum St.",
		postalZip = "6517"
	},
	new() {
		name = "Genevieve Rollins",
		phone = "(195) 772-0448",
		email = "a.dui.cras@icloud.edu",
		address = "7572 Risus. St.",
		postalZip = "2418"
	},
	new() {
		name = "Venus Lane",
		phone = "(288) 496-9329",
		email = "tellus@aol.edu",
		address = "287-2734 Et Street",
		postalZip = "8927"
	},
	new() {
		name = "Vivien Dominguez",
		phone = "(932) 349-4224",
		email = "molestie.pharetra.nibh@icloud.ca",
		address = "Ap #721-8460 Diam Street",
		postalZip = "16852"
	},
	new() {
		name = "Lana Kaufman",
		phone = "(542) 652-4384",
		email = "ipsum@yahoo.org",
		address = "Ap #687-4432 Et Rd.",
		postalZip = "4101"
	},
	new() {
		name = "Stacey Neal",
		phone = "(941) 536-2287",
		email = "nullam@icloud.org",
		address = "Ap #433-5305 Urna St.",
		postalZip = "85834"
	},
	new() {
		name = "Uriah Finley",
		phone = "(569) 333-3274",
		email = "vel@google.net",
		address = "121-9924 Dolor Av.",
		postalZip = "K6S 5M5"
	},
	new() {
		name = "Barbara Case",
		phone = "(267) 807-3313",
		email = "a@outlook.com",
		address = "582-1567 Sit Street",
		postalZip = "193535"
	},
	new() {
		name = "Mara Sampson",
		phone = "(241) 213-8648",
		email = "turpis.nec@yahoo.net",
		address = "465-770 Nullam St.",
		postalZip = "723287"
	},
	new() {
		name = "Fallon Guerrero",
		phone = "(501) 504-3605",
		email = "quisque.imperdiet.erat@google.net",
		address = "894-1747 Lectus Road",
		postalZip = "25167"
	},
	new() {
		name = "Quon Velez",
		phone = "(977) 641-8315",
		email = "lacinia.sed@hotmail.org",
		address = "Ap #166-9632 Est. Rd.",
		postalZip = "22-34"
	},
	new() {
		name = "Evangeline Hays",
		phone = "(257) 209-6172",
		email = "faucibus.orci@aol.org",
		address = "678-9502 Mi. Road",
		postalZip = "484946"
	},
	new() {
		name = "Dexter Holloway",
		phone = "(545) 798-1378",
		email = "hendrerit.a@outlook.com",
		address = "P.O. Box 597, 7299 Orci Ave",
		postalZip = "4344"
	},
	new() {
		name = "Ruby Kelly",
		phone = "(627) 129-8939",
		email = "libero@google.com",
		address = "Ap #956-8911 In Rd.",
		postalZip = "86758"
	},
	new() {
		name = "Valentine Hernandez",
		phone = "(605) 758-4528",
		email = "dui.fusce@hotmail.org",
		address = "7079 Ipsum. Rd.",
		postalZip = "30850"
	},
	new() {
		name = "Ori Pratt",
		phone = "(218) 494-9434",
		email = "adipiscing.fringilla@aol.ca",
		address = "267-7018 Vitae St.",
		postalZip = "11763"
	},
	new() {
		name = "Louis Holloway",
		phone = "(275) 834-7497",
		email = "ac.risus.morbi@icloud.org",
		address = "P.O. Box 144, 7176 Fusce Rd.",
		postalZip = "68846"
	},
	new() {
		name = "Raymond Phillips",
		phone = "(224) 972-6478",
		email = "ad.litora.torquent@aol.edu",
		address = "1972 Vitae, Ave",
		postalZip = "59-367"
	},
	new() {
		name = "Mannix Blackburn",
		phone = "(625) 647-1812",
		email = "lorem.vitae@icloud.net",
		address = "Ap #818-2060 Ante, Rd.",
		postalZip = "18-46"
	},
	new() {
		name = "Jana Roth",
		phone = "(565) 688-2895",
		email = "cursus.vestibulum@outlook.org",
		address = "699-9579 Ultrices Ave",
		postalZip = "1343"
	},
	new() {
		name = "Candace Collins",
		phone = "(208) 266-7447",
		email = "a.auctor@icloud.couk",
		address = "P.O. Box 192, 1661 Sit Avenue",
		postalZip = "00611-15652"
	},
	new() {
		name = "Stephen Bradshaw",
		phone = "(652) 985-6356",
		email = "vehicula.risus@protonmail.edu",
		address = "Ap #736-9434 Est Road",
		postalZip = "0820"
	},
	new() {
		name = "Armand Villarreal",
		phone = "(330) 633-1755",
		email = "duis.volutpat.nunc@protonmail.com",
		address = "P.O. Box 347, 850 Nonummy Avenue",
		postalZip = "90424-82194"
	},
	new() {
		name = "Lee Holmes",
		phone = "(285) 868-5408",
		email = "duis.cursus@protonmail.net",
		address = "P.O. Box 948, 9383 Cursus, St.",
		postalZip = "31663"
	},
	new() {
		name = "Seth Harmon",
		phone = "(664) 648-8273",
		email = "lacinia@aol.com",
		address = "Ap #129-2083 Elit, St.",
		postalZip = "55946"
	},
	new() {
		name = "Calvin Burks",
		phone = "(774) 722-9260",
		email = "sapien.imperdiet@protonmail.com",
		address = "Ap #825-1646 Sapien, Av.",
		postalZip = "5733"
	},
	new() {
		name = "Debra Tyler",
		phone = "(228) 644-2588",
		email = "vitae.odio@outlook.edu",
		address = "P.O. Box 969, 6163 Mauris, St.",
		postalZip = "2326"
	},
	new() {
		name = "Yuli Dejesus",
		phone = "(280) 638-4202",
		email = "mus.proin.vel@icloud.com",
		address = "3056 Risus Rd.",
		postalZip = "16-925"
	},
	new() {
		name = "Montana Hudson",
		phone = "(669) 760-0679",
		email = "tincidunt.nunc@google.com",
		address = "6899 In Av.",
		postalZip = "14656"
	},
	new() {
		name = "Briar Adkins",
		phone = "(386) 255-9608",
		email = "habitant.morbi@aol.org",
		address = "917-4032 Mauris Street",
		postalZip = "7193"
	},
	new() {
		name = "Geoffrey Tillman",
		phone = "(826) 357-6117",
		email = "etiam.vestibulum@aol.org",
		address = "746-9080 Proin Road",
		postalZip = "5727 MO"
	},
	new() {
		name = "Gregory Mcgowan",
		phone = "(115) 742-0423",
		email = "convallis.convallis.dolor@protonmail.ca",
		address = "Ap #943-3401 Et St.",
		postalZip = "28272"
	},
	new() {
		name = "Sebastian Pennington",
		phone = "(380) 742-7824",
		email = "vitae.diam.proin@hotmail.org",
		address = "P.O. Box 967, 9599 Sit Road",
		postalZip = "21761"
	},
	new() {
		name = "Emi Conner",
		phone = "(374) 527-6948",
		email = "proin.nisl@aol.net",
		address = "4363 Rutrum. Av.",
		postalZip = "6277"
	},
	new() {
		name = "Britanni Mclean",
		phone = "(866) 267-4897",
		email = "mauris.integer@outlook.ca",
		address = "297-7924 Vivamus Avenue",
		postalZip = "08420"
	},
	new() {
		name = "Laurel Norton",
		phone = "(719) 457-1156",
		email = "lorem.donec.elementum@hotmail.org",
		address = "Ap #595-8678 Neque. Road",
		postalZip = "54177"
	},
	new() {
		name = "Magee Padilla",
		phone = "(598) 106-4968",
		email = "etiam@hotmail.com",
		address = "3666 Ullamcorper, Rd.",
		postalZip = "346390"
	},
	new() {
		name = "Yetta Moon",
		phone = "(626) 891-7863",
		email = "arcu.vestibulum.ut@aol.com",
		address = "Ap #616-7340 Integer Ave",
		postalZip = "452303"
	},
	new() {
		name = "Leslie Ramsey",
		phone = "(448) 674-4556",
		email = "velit.eu.sem@aol.couk",
		address = "145-5541 Sit St.",
		postalZip = "74275"
	},
	new() {
		name = "Odysseus Everett",
		phone = "(744) 643-6865",
		email = "neque.non.quam@google.edu",
		address = "P.O. Box 758, 1224 Pharetra. St.",
		postalZip = "5674"
	},
	new() {
		name = "Kiona Franks",
		phone = "(284) 344-9686",
		email = "nam@hotmail.net",
		address = "P.O. Box 735, 8302 Nec Street",
		postalZip = "652882"
	},
	new() {
		name = "Xaviera Kramer",
		phone = "(114) 654-1250",
		email = "ut.nulla@hotmail.couk",
		address = "7538 Nibh St.",
		postalZip = "3377-8343"
	},
	new() {
		name = "Barry Owens",
		phone = "(923) 773-5103",
		email = "molestie.sodales.mauris@google.com",
		address = "Ap #197-1888 Eget Ave",
		postalZip = "787901"
	},
	new() {
		name = "Ciara Luna",
		phone = "(677) 721-6309",
		email = "scelerisque.scelerisque.dui@protonmail.couk",
		address = "P.O. Box 327, 4129 Turpis Ave",
		postalZip = "571544"
	},
	new() {
		name = "Marvin Stewart",
		phone = "(541) 722-1753",
		email = "quis.arcu@aol.org",
		address = "Ap #490-5958 Vitae Rd.",
		postalZip = "20116"
	},
	new() {
		name = "Hall Guy",
		phone = "(595) 243-8563",
		email = "luctus.lobortis@outlook.org",
		address = "838-7134 Nullam Rd.",
		postalZip = "7316"
	},
	new() {
		name = "Holly Norton",
		phone = "(500) 246-3366",
		email = "velit.justo@protonmail.org",
		address = "Ap #708-2720 Dapibus Av.",
		postalZip = "58547-752"
	},
	new() {
		name = "Quyn Chan",
		phone = "(488) 956-7673",
		email = "tempor@google.com",
		address = "P.O. Box 670, 5515 Tincidunt Avenue",
		postalZip = "21570"
	},
	new() {
		name = "Bruno Russo",
		phone = "(734) 604-5411",
		email = "sed.tortor@icloud.org",
		address = "P.O. Box 892, 503 Sem Avenue",
		postalZip = "885877"
	},
	new() {
		name = "Tucker Scott",
		phone = "(878) 461-4289",
		email = "odio.etiam.ligula@aol.net",
		address = "770-1724 Vulputate Av.",
		postalZip = "38750"
	},
	new() {
		name = "Kristen Le",
		phone = "(539) 596-6734",
		email = "vel.pede@google.com",
		address = "Ap #532-1125 Tempor Street",
		postalZip = "2391"
	},
	new() {
		name = "Maia David",
		phone = "(474) 873-0684",
		email = "nulla.eget@protonmail.com",
		address = "875-7193 Fames Street",
		postalZip = "213787"
	},
	new() {
		name = "Aidan Cochran",
		phone = "(653) 626-4554",
		email = "leo.vivamus@aol.edu",
		address = "3816 Eget, St.",
		postalZip = "5759"
	},
	new() {
		name = "Kevyn Morales",
		phone = "(444) 822-6414",
		email = "magna.et.ipsum@google.ca",
		address = "1862 Eu Av.",
		postalZip = "4653"
	},
	new() {
		name = "Aiko Dorsey",
		phone = "(764) 467-3474",
		email = "varius.nam@protonmail.edu",
		address = "Ap #739-8109 Aliquam Rd.",
		postalZip = "5067"
	},
	new() {
		name = "Stacey Sawyer",
		phone = "(977) 145-7647",
		email = "dictum.proin@outlook.edu",
		address = "Ap #619-2672 Tellus Rd.",
		postalZip = "17966"
	},
	new() {
		name = "Sydney Valencia",
		phone = "(821) 556-8492",
		email = "neque.et@hotmail.couk",
		address = "5285 Suspendisse Rd.",
		postalZip = "228214"
	},
	new() {
		name = "Xantha Joseph",
		phone = "(855) 928-7445",
		email = "sollicitudin@yahoo.edu",
		address = "3446 In, Road",
		postalZip = "22149"
	},
	new() {
		name = "Ronan May",
		phone = "(892) 775-6460",
		email = "et@icloud.edu",
		address = "P.O. Box 210, 9067 Risus. Av.",
		postalZip = "576080"
	},
	new() {
		name = "Macon Mccoy",
		phone = "(317) 225-1002",
		email = "pharetra.nibh@protonmail.couk",
		address = "738-9089 Mi. Av.",
		postalZip = "5526"
	},
	new() {
		name = "Tanya Chavez",
		phone = "(217) 576-3183",
		email = "pharetra@google.com",
		address = "8946 Luctus Avenue",
		postalZip = "3094"
	},
	new() {
		name = "Cruz Rice",
		phone = "(641) 884-0132",
		email = "ipsum.ac.mi@hotmail.couk",
		address = "Ap #417-7053 Et, Road",
		postalZip = "458858"
	},
	new() {
		name = "Claudia Carlson",
		phone = "(351) 292-9295",
		email = "tristique.pharetra@outlook.com",
		address = "8002 Turpis. Av.",
		postalZip = "3613"
	},
	new() {
		name = "Alvin Green",
		phone = "(273) 853-8353",
		email = "enim.commodo@outlook.org",
		address = "510-7870 Eu St.",
		postalZip = "6283-8381"
	},
	new() {
		name = "Vera Riley",
		phone = "(206) 137-8274",
		email = "mauris.eu@protonmail.net",
		address = "Ap #865-5191 Accumsan Av.",
		postalZip = "615258"
	},
	new() {
		name = "Yoko Wilder",
		phone = "(166) 537-2831",
		email = "montes.nascetur@yahoo.com",
		address = "Ap #502-1432 Lectus Street",
		postalZip = "976767"
	},
	new() {
		name = "Galena Solis",
		phone = "(197) 616-5391",
		email = "massa.quisque@yahoo.net",
		address = "Ap #800-1146 Urna, Av.",
		postalZip = "84667"
	},
	new() {
		name = "Samantha Lambert",
		phone = "(675) 451-1104",
		email = "pharetra@hotmail.ca",
		address = "272-6426 Aliquet Rd.",
		postalZip = "697540"
	},
	new() {
		name = "Basia Warner",
		phone = "(872) 974-2362",
		email = "tristique.senectus@yahoo.org",
		address = "Ap #762-3729 Sit Rd.",
		postalZip = "72037"
	},
	new() {
		name = "Karleigh Hughes",
		phone = "(194) 135-4856",
		email = "nisi.magna@protonmail.ca",
		address = "891-2625 Massa. Road",
		postalZip = "887882"
	},
	new() {
		name = "Wang Morales",
		phone = "(719) 278-6560",
		email = "vitae.aliquet.nec@icloud.edu",
		address = "P.O. Box 885, 3236 Ultricies Avenue",
		postalZip = "7415"
	},
	new() {
		name = "Cullen Lyons",
		phone = "(766) 268-2604",
		email = "eu.nibh.vulputate@yahoo.org",
		address = "P.O. Box 517, 7659 Auctor Rd.",
		postalZip = "8369"
	},
	new() {
		name = "Sacha Morton",
		phone = "(296) 662-0641",
		email = "mauris.magna.duis@google.org",
		address = "Ap #748-6359 Bibendum St.",
		postalZip = "242246"
	},
	new() {
		name = "Ralph Prince",
		phone = "(193) 817-6538",
		email = "enim@google.edu",
		address = "P.O. Box 825, 5854 Eleifend St.",
		postalZip = "350211"
	},
	new() {
		name = "Burke Cardenas",
		phone = "(781) 681-7452",
		email = "morbi.tristique@hotmail.com",
		address = "Ap #813-8744 Magna. Av.",
		postalZip = "2473"
	},
	new() {
		name = "Boris Stephenson",
		phone = "(613) 563-1611",
		email = "tincidunt.nunc.ac@icloud.net",
		address = "959-9982 Pede Avenue",
		postalZip = "85558"
	},
	new() {
		name = "Hamilton Burt",
		phone = "(285) 631-2935",
		email = "mollis.nec.cursus@google.couk",
		address = "Ap #366-4448 Semper. Ave",
		postalZip = "386616"
	},
	new() {
		name = "Kellie Matthews",
		phone = "(705) 329-7752",
		email = "praesent@aol.ca",
		address = "804-9823 Dolor, St.",
		postalZip = "878344"
	},
	new() {
		name = "Rina Francis",
		phone = "(608) 145-9416",
		email = "vel.convallis@icloud.org",
		address = "690-759 Congue, Avenue",
		postalZip = "3579"
	},
	new() {
		name = "Clayton Haley",
		phone = "(135) 574-7721",
		email = "sem.nulla@protonmail.edu",
		address = "Ap #560-869 Aliquet St.",
		postalZip = "40691"
	},
	new() {
		name = "Kareem Brewer",
		phone = "(711) 433-5615",
		email = "proin.nisl@protonmail.com",
		address = "219-2645 Mauris Rd.",
		postalZip = "8228"
	},
	new() {
		name = "Jocelyn Wong",
		phone = "(243) 645-1459",
		email = "ut@yahoo.ca",
		address = "458-9342 Amet Rd.",
		postalZip = "401700"
	},
	new() {
		name = "Glenna Blackburn",
		phone = "(443) 824-4366",
		email = "a.purus.duis@protonmail.net",
		address = "P.O. Box 981, 6273 A, St.",
		postalZip = "4246 WY"
	},
	new() {
		name = "Alden Kim",
		phone = "(825) 682-0305",
		email = "sed.consequat.auctor@protonmail.couk",
		address = "476-5574 Et, Avenue",
		postalZip = "4612"
	},
	new() {
		name = "Logan Rogers",
		phone = "(420) 450-3118",
		email = "at.iaculis@yahoo.edu",
		address = "235-966 Mollis Avenue",
		postalZip = "6525"
	}
];
}
