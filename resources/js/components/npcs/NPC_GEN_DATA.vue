<script>
import appearances from '../json/npc/npc_appearances.json'
import blessings from '../json/npc/npc_blessings.json'
import bonds from '../json/npc/npc_bonds.json'
import city_poi from '../json/npc/npc_city_points_of_interest.json'
import curses from '../json/npc/npc_curses.json'
import destinations from '../json/npc/npc_destinations.json'
import details from '../json/npc/npc_details.json'
import entities from '../json/npc/npc_entities.json'
import flaws from '../json/npc/npc_flaws.json'
import gods from '../json/npc/npc_gods.json'
import hooks from '../json/npc/npc_hooks.json'
import ideals from '../json/npc/npc_ideals.json'
import items from '../json/npc/npc_items.json'
import life_events from '../json/npc/npc_life_events.json'
import motivations from '../json/npc/npc_motivations.json'
import obsessions from '../json/npc/npc_obsessions.json'
import personalities from '../json/npc/npc_personalities.json'
import professions from '../json/npc/npc_professions.json'
import quirks from '../json/npc/npc_quirks.json'
import races from '../json/npc/npc_races.json'
import relationships from '../json/npc/npc_relationships.json'
import relatives from '../json/npc/npc_relatives.json'
import titles from '../json/npc/npc_titles.json'
import traits from '../json/npc/npc_traits.json'
import voices from '../json/npc/npc_voices.json'

export default{
	data(){
		return{
			gen_appearances: appearances,
			gen_blessings: blessings,
			gen_bonds: bonds,
			gen_city_poi: city_poi,
			gen_curses: curses,
			gen_destinations: destinations,
			gen_details: details,
			gen_entities: entities,
			gen_flaws: flaws,
			gen_gods: gods,
			gen_hooks: hooks,
			gen_ideals: ideals,
			gen_items: items,
			gen_life_events: life_events,
			gen_motivations: motivations,
			gen_obsessions: obsessions,
			gen_personalities: personalities,
			gen_professions: professions,
			gen_quirks: quirks,
			gen_races: races,
			gen_relationships: relationships,
			gen_relatives: relatives,
			gen_titles: titles,
			gen_traits: traits,
			gen_voices: voices,

			CLASSES: ["Barbarian","Bard","Cleric","Druid","Fighter","Monk","Paladin","Ranger","Rogue","Sorcerer","Warlock","Wizard"],
			LANGUAGES: ["Abyssal","Aquan","Auran","Celestial","Draconic","Druidic","Dwarvish","Elvish","Giant","Gnomish","Goblin","Halfling","Infernal","Orc","Primordial","Sylvan","Undercommon","Thieves Cant"],
			SKILLS: ["Acrobatics","Animal Handling","Arcana","Athletics","Deception","History","Insight","Intimidation","Investigation","Medicine","Nature","Perception","Performance","Persuasion","Religion","Sleight of Hand","Stealth","Survival"],
			ALIGNMENTS: ["LG","NG", "CG","LN","TN","CN","LE","NE","CE"],
			RACES: [],
		}
	},
	mounted: function() {
		this.parseRACES();
	},
	methods: {
		parseRACES: function() {
			let k=0;
			for (let i=0; i<this.gen_races.races.length; i++) {
				this.RACES.push({name: this.gen_races.races[i].name, parent_race_index: i, subrace_index: null, index: k});
				k++;
				if (this.gen_races.races[i].subraces) {
					for (let j=0; j<this.gen_races.races[i].subraces.length; j++) {
						this.RACES.push({name: this.gen_races.races[i].subraces[j].name, parent_race_index: i, subrace_index: j, index: k});
						k++;
					}
				}
			}
		},
		getAppearance: function(i=-1) { return this.getValue(this.gen_appearances.appearances, i); },
		getBlessing: function(i=-1) { return this.getValue(this.gen_blessings.blessings, i); },
		getBond: function(i=-1) { return this.getValue(this.gen_bonds.bonds, i); },
		getCityPOI: function(i=-1) { return this.getValue(this.gen_city_poi["city-points-of-interest"], i); },
		getCurse: function(i=-1) { return this.getValue(this.gen_curses.curses, i); },
		getDestination: function(i=-1) { return this.getValue(this.gen_destinations.destinations, i); },
		getDetail: function(i=-1) { return this.getValue(this.gen_details.details, i); },
		getEntity: function(i=-1) { return this.getValue(this.gen_entities.entities, i); },
		getFlaw: function(i=-1) { return this.getValue(this.gen_flaws.flaws, i); },
		getGod: function(i=-1) { return this.getValue(this.gen_gods.gods, i); },
		getHook: function(i=-1) { return this.getValue(this.gen_hooks.hooks, i); },
		getIdeal: function(i=-1) { return this.getValue(this.gen_ideals.ideals, i); },
		getItem: function(i=-1) { return this.getValue(this.gen_items.items, i); },
		getLifeEvent: function(i=-1) { return this.getValue(this.gen_life_events["life-events"], i); },
		getMotivation: function(i=-1) { return this.getValue(this.gen_motivations.motivations, i); },
		getObsession: function(i=-1) { return this.getValue(this.gen_obsessions.obsessions, i); },
		getPersonality: function(i=-1) { return this.getValue(this.gen_personalities.personalities, i); },
		getProfession: function(i=-1) { return this.getValue(this.gen_professions.professions, i); },
		getQuirk: function(i=-1) { return this.getValue(this.gen_quirks.quirks, i); },

		getRaceIdRare: function(i=-1) { return this.getValue(this.gen_races["races-rare"], i); },
		getRaceIdUncommon: function(i=-1) { return this.getValue(this.gen_races["races-uncommon"], i); },
		getRaceIdCommon: function(i=-1) { return this.getValue(this.gen_races["races-common"], i); },
		getRace: function(i=-1) { return this.getValue(this.gen_races.races, i); },

		getRelationship: function(i=-1) { return this.getValue(this.gen_relationships.relationships, i); },
		getRelative: function(i=-1) { return this.getValue(this.gen_relatives.relatives, i); },
		getTitle: function(i=-1) { return this.getValue(this.gen_titles.titles, i); },
		getTrait: function(i=-1) { return this.getValue(this.gen_traits.traits, i); },
		getVoice: function(i=-1) { return this.getValue(this.gen_voices.voices, i); },

		generateRandomNPC: function() {
			let npc = {};
			npc.name="";
			this.getClass(npc);
			npc.hp = 10;
			npc.inventory = this.getItem();

			this.setupRace(npc);

			npc.racials=this.getRacialsFromRace(npc);
			npc.languages = this.getLanguagesFromRace(npc);

			npc.sex = this.getSex(npc);
			npc.name = this.getName(npc);

			npc.alignment_int = this.getRandomNumber(this.ALIGNMENTS.length);
			npc.alignment = this.ALIGNMENTS[npc.alignment_int];
			npc.asi = [8,8,8,8,8,8];
			this.getASIs(npc, 'roll');
			npc.level = 0;
			npc.skills = this.getSkills();

			npc.attacks_abilities = "";
			npc.misc = "";

			this.getAge(npc);

			npc.appearance = this.getAppearance();
			npc.bond = this.getBond();
			npc.detail = this.getDetail();
			npc.flaw = this.getFlaw();
			npc.hook = this.getHook();
			npc.ideal = this.getIdeal();
			npc.life_event = this.getLifeEvent();
			npc.motivation = this.getMotivation();
			npc.personality = this.getPersonalityFull();
			npc.profession = this.getProfession();
			npc.quirk = this.getQuirk();
			npc.relationship = this.getRelationship();
			npc.trait = this.getTrait();
			npc.voice = this.getVoice();
			npc.worship_habit = this.getWorshipHabit();

			npc.summary = this.getDefaultSummary(npc);


			return npc;
		},

		getClass: function(npc) {
			npc.class_int=this.getRandomNumber(this.CLASSES.length);
			npc.class = this.CLASSES[npc.class_int];
			npc.class_other=null;
		},
		getAge: function(npc) {
			npc.age_int = this.getRandomNumber(95)+5;
			npc.age = this.getAgeDescriptive(npc.age_int);
		},

		getAgeDescriptive: function(age) {
			let ageDescriptive;
			if (age<10) { ageDescriptive="Child"; }
			else if (age<18) { ageDescriptive="Youth"; }
			else if (age<25) { ageDescriptive="Young Adult"; }
			else if (age<50) { ageDescriptive="Prime Adult"; }
			else if (age<75) { ageDescriptive="Older Adult"; }
			else if (age<90) { ageDescriptive="Elderly"; }
			else if (age<99) { ageDescriptive="Very Old"; }
			else { ageDescriptive = "On their death bed"; }

			return ageDescriptive + " ("+age+" percent of their life)";
		},
		setupRace: function(npc, raceId=-1, rarity=-1) {
			//If we don't have a raceId supplied to us then get a random race
			if (!raceId) {
				if (rarity) {
					//rarity: 0=common, 1=uncommon, 2=rare, 3=any - equally weighted
					if (rarity === 0) {
						raceId = this.getRaceIdCommon();
					}
					else if (rarity === 1) {
						raceId = this.getRaceIdUncommon();
					}
					else if (rarity === 2) {
						raceId = this.getRaceIdRare();
					}
					else {
						raceId = this.getRandomNumber(this.gen_races.races.length);
					}
				}
				else {
					//Randomly choose a number between 0 and 99 to choose race based off of rarity
					const raceRand = this.getRandomNumber(100);
					if (raceRand < 5) {
						raceId = this.getRaceIdRare();
					}
					else if (raceRand < 30) {
						raceId = this.getRaceIdUncommon();
					}
					else {
						raceId = this.getRaceIdCommon();
					}
				}
			}


			const race = this.getRace(raceId);

			npc.race_raw = race;

			npc.race_other = null;
			npc.size = race.size;

			//We can check whether the sex can be male/female or N/A if the race has male/female names or not

			npc.speed = race.speed ? parseInt(race.speed) : 0;
			npc.speed_fly = race["speed-fly"] ? parseInt(race["speed-fly"]) : 0;
			npc.speed_swim = race["speed-swim"] ? parseInt(race["speed-swim"]) : 0;

			npc.asi_racial_mods = race.asi ? race.asi : [0,0,0,0,0,0];


			npc.race = race.name;
			npc.source = race.source;


			if (race.subraces) {
				//1 in 3 chance to select subrace instead of basic race
				if (this.getRandomNumber(3)===0) {
					const subrace = race.subraces[this.getRandomNumber(race.subraces.length)];
					npc.race = subrace.name;

					//Merge speeds if the subrace has any
					if (subrace.speed) { npc.speed += parseInt(subrace.speed); }
					if (subrace.speed_fly) { npc.speed_fly += parseInt(subrace.speed_fly); }
					if (subrace.speed_swim) { npc.speed_swim += parseInt(subrace.speed_swim); }

					//Merge ASI's if the subrace has any
					if (subrace.asi) {
						for (let i = 0; i < 6; i++) {
							npc.asi_racial_mods[i] += subrace.asi[i];
						}
					}

					//override the race's source if the subrace has one
					if (subrace.source) { npc.source = subrace.source; }
				}
			}

			npc.race_id = this.gen_races["races-all"].indexOf(npc.race);
		},
		getSpeedFromRace: function(npc) {
			let speed;

			if (npc.race_other === null) {
				speed = npc.race_raw.speed;
				if (npc.race !== npc.race_raw.name) {
					for (let i = 0; i < npc.race_raw.subraces.length; i++) {
						if (npc.race === npc.race_raw.subraces[i].name) {
							if (npc.race_raw.subraces[i].speed) {
								speed = npc.race_raw.subraces[i].speed;
							}
							break;
						}
					}
				}
			}

			return speed ? speed : 30;
		},
		getSpeedFlyFromRace: function(npc) {
			let speed;

			if (npc.race_other === null) {
				speed = npc.race_raw["speed-fly"];
				if (npc.race !== npc.race_raw.name) {
					for (let i = 0; i < npc.race_raw.subraces.length; i++) {
						if (npc.race === npc.race_raw.subraces[i].name) {
							if (npc.race_raw.subraces[i]["speed-fly"]) {
								speed = npc.race_raw.subraces[i]["speed-fly"];
							}
							break;
						}
					}
				}
			}

			return speed ? speed : 0;
		},
		getSpeedSwimFromRace: function(npc) {
			let speed;

			if (npc.race_other === null) {
				speed = npc.race_raw["speed-swim"];
				if (npc.race !== npc.race_raw.name) {
					for (let i = 0; i < npc.race_raw.subraces.length; i++) {
						if (npc.race === npc.race_raw.subraces[i].name) {
							if (npc.race_raw.subraces[i]["speed-swim"]) {
								speed = npc.race_raw.subraces[i]["speed-swim"];
							}
							break;
						}
					}
				}
			}

			return speed ? speed : 0;
		},
		getSex: function(npc) {
			const sexes = ['M', 'F', 'N/A'];
			if (npc.race_raw) {
				if (npc.race_raw.names.male) {
					return sexes[this.getRandomNumber(2)];
				}
				else {
					return sexes[2];
				}
			}
			else {
				return sexes[this.getRandomNumber(3)];
			}
		},
		getName: function(npc) {
			let name;
			if (npc.race_raw) {
				if (npc.race_raw.names.male) {
					let s;
					s = npc.sex ? npc.sex : this.getRandomNumber(2);
					if (s===0) {
						name = npc.race_raw.names.male ? npc.race_raw.names.male[this.getRandomNumber(npc.race_raw.names.male.length)] : "";
					}
					else {
						name = npc.race_raw.names.female ? npc.race_raw.names.female[this.getRandomNumber(npc.race_raw.names.female.length)] : "";
					}
					if (npc.race_raw.names.last) {
						name += " " + npc.race_raw.names.last[this.getRandomNumber(npc.race_raw.names.last.length)];
					}

					//We don't want to give their name a title if they already have a title-style name
					if (name.toLowerCase().indexOf(' the ')===-1) {
						name += this.getTitleChance(25);
					}
				}
				else if (npc.race_raw.names.simple) {
					name = npc.race_raw.names.simple ? npc.race_raw.names.simple[this.getRandomNumber(npc.race_raw.names.simple.length)] : "";

					//We don't want to give their name a title if they already have a title-style name
					if (name.toLowerCase().indexOf(' the ')===-1) {
						name += this.getTitleChance(25);
					}
				}
			}
			else {
				name = "Please Set NPC Race First";
			}

			return name;
		},
		getTitleChance: function(i) {
			//1 in i chance of having a title
			if (this.getRandomNumber(i) === 0) {
				return " " + this.getTitle();
			}
			return "";
		},
		getPersonalityFull: function() {
			const p1 = this.getPersonality();
			//prevent duplicate personalities
			let p2 = this.getPersonality();
			while(p2===p1) {
				p2 = this.getPersonality();
			}
			//prevent duplicate personalities
			let p3 = this.getPersonality();
			while(p3===p1 || p3===p2) {
				p3 = this.getPersonality();
			}

			return p1 + ", " + p2 + ", and " + p3;
		},
		getWorshipHabit: function() {
			const advs = ["secretly worships", "discretely worships", "proudly worships", "loudly worships", "claims to, but doesn't actually worship", "zealously worships"];
			return this.capitalize(this.getValue(advs) + " " + this.getGod());
		},
		getRacialsFromRace: function(npc) {
			let racials = [];
			if (npc.race_other === null) {
				racials = racials.concat(npc.race_raw.extras);
				if (npc.race !== npc.race_raw.name) {
					for (let i = 0; i < npc.race_raw.subraces.length; i++) {
						if (npc.race === npc.race_raw.subraces[i].name) {
							if (npc.race_raw.subraces[i].extras) {
								racials = racials.concat(npc.race_raw.subraces[i].extras);
							}
							break;
						}
					}
				}
			}
			return racials.join(", ");
		},
		getLanguagesFromRace: function(npc) {
			let languages = [];
			if (npc.race_other === null) {
				languages = languages.concat(npc.race_raw.languages);
				if (npc.race !== npc.race_raw.name) {
					for (let i = 0; i < npc.race_raw.subraces.length; i++) {
						if (npc.race === npc.race_raw.subraces[i].name) {
							if (npc.race_raw.subraces[i].languages) {
								languages = languages.concat(npc.race_raw.subraces[i].languages);
							}
							break;
						}
					}
				}
			}

			for (let i=0; i<languages.length; i++) {
				if (languages[i].indexOf('+')!== -1) {
					let l = this.getLanguage();
					let j=0; //prevent possible infinite loops
					while (languages.indexOf(l) !== -1 && j<100) {
						l = this.getLanguage();
						j++;
					}
					if (j<100) {
						languages[i] = l;
					}
				}
			}

			return languages.join(", ");
		},
		getLanguage: function() {
			return this.LANGUAGES[this.getRandomNumber(this.LANGUAGES.length)];
		},
		getSkills: function(count) {
			count = count ? count : 3;
			let skills = [];
			for (let i=0; i<count; i++) {
				let s = this.getSkill();
				let j=0;
				while(skills.indexOf(s) !== -1 && j<100) {
					s = this.getSkill();
					j++;
				}
				if (j<100) {
					skills.push(s);
				}
			}

			return skills.join(", ");
		},
		getSkill: function() {
			return this.SKILLS[this.getRandomNumber(this.SKILLS.length)];
		},



		getValue: function(json, i=-1) {
			let v;

			//If we received an index then retrieve that value, otherwise get a random value
			if (i>=0) {
				v = json[i];
			}
			else {
				v = json[this.getRandomNumber(json.length)];
			}

			//Selects all instances of "{{...}}" including brackets
			const regex_inclusive = /({{)([^{\]]*)(}})/g;
			//let regex_exclusive = /(?<={{)([^{\]]*)(?=}})/g; //No brackets selected

			const _this=this;

			//if we aren't left with a string then return the object
			if (typeof v !== 'string') { return v; }

			//OTHERWISE
			//Loop through and replace all instances of "{{attribute}}"
			//replacing it with the result of a call to this.getAttribute()
			return v.replace(regex_inclusive, function(selectionWithBrackets) {
				//get the value between the opening and closing brackets
				const noBrackets = selectionWithBrackets.substr(2, selectionWithBrackets.length-4);
				//function name = "get" + capitalized property, eg getCurse()
				const funcName = 'get'+_this.capitalize(noBrackets);
				//return the result of a call to get a random attribute, this may result in recursion
				return _this[funcName]();
			});
		},


		getASI: function(npc, i) {
			const rolls = [];

			//Roll 4 6-sided dice
			rolls.push(this.getRandomNumber(6)+1);
			rolls.push(this.getRandomNumber(6)+1);
			rolls.push(this.getRandomNumber(6)+1);
			rolls.push(this.getRandomNumber(6)+1);

			//Sort highest to lowest
			rolls.sort(function(a, b) { return b - a;});

			//Drop lowest roll
			rolls.pop();

			//Return sum of remaining rolls
			let racialMod=0;
			if (i!==undefined && npc && npc.asi_racial_mods) {
				    racialMod = npc.asi_racial_mods[i] ? npc.asi_racial_mods[i] : 0;
			}

			//Add together all rolls in array then add the corresponding racial mod, if any
			return rolls.reduce(function(a, b) { return a + b; }, 0) + racialMod;
		},
		getASIs: function(npc, method) {
			if (method==='roll') {
				for (let i=0; i<6; i++) {
					this.$set(npc.asi, i, this.getASI(npc, i));
				}
			}
			else {
				const standards = this.shuffle_array([15, 14, 13, 12, 10, 8]);
				for (let i=0; i<6; i++) {
					let racialMod=0;
					if (npc && npc.asi_racial_mods) {
						racialMod = npc.asi_racial_mods[i] ? npc.asi_racial_mods[i] : 0;
					}
					this.$set(npc.asi, i, standards[i]+racialMod);
				}
			}
		},

		getDefaultSummary: function(npc) {
			return npc.name + " - " + npc.personality;
		},

		shuffle_array: function(a) {
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			return a;
		},

		capitalize: function(s) {
			return s[0].toUpperCase() + s.substring(1);
		},
		getRandomNumber: function(max) {
			//get random number between 0 and max-1 inclusive
			return Math.floor(Math.random() * Math.floor(max));
		},

		parseNPCFromServerData: function(n) {
			const npc = {};
			npc.name=n.name;

			if (n.class_other===null) {
				npc.class_int = n.class;
				npc.class = this.CLASSES[n.class];
				npc.class_other = null;
			}
			else {
				npc.class=null;
				npc.class_other=n.class_other;
			}

			if (n.race_other===null) {
				npc.race_int = n.race;
				npc.race = this.gen_races["races-all"][n.race];
				npc.race_other = null;
				npc.race_raw = this.getRace(n.race_int);
			}
			else {
				npc.race=null;
				npc.race_other=n.race_other;
			}

			npc.age_int = n.age;
			npc.age = this.getAgeDescriptive(n.age);

			npc.hp = n.hp;
			npc.inventory = n.inventory;
			npc.speed = n.speed;
			npc.speed_fly = n.speed_fly;
			npc.speed_swim = n.speed_swim;
			npc.racials = n.racials;
			npc.languages = n.languages;
			npc.size = n.size;
			npc.sex=n.sex;
			npc.alignment_int = n.alignment;
			npc.alignment = n.alignment ? this.ALIGNMENTS[n.alignment] : null;
			npc.asi = [n.attr_str,n.attr_dex,n.attr_con,n.attr_int,n.attr_wis,n.attr_cha];
			npc.level = n.level;
			npc.skills = n.skills;
			npc.attacks_abilities = n.attacks_abilities;
			npc.misc = n.misc;
			npc.appearance = n.appearance;
			npc.bond = n.bond;
			npc.detail = n.detail;
			npc.flaw = n.flaw;
			npc.hook = n.hook;
			npc.ideal = n.ideal;
			npc.life_event = n.life_event;
			npc.motivation = n.motivation;
			npc.personality = n.personality;
			npc.profession = n.profession;
			npc.quirk = n.quirk;
			npc.relationship = n.relationship;
			npc.trait = n.trait;
			npc.voice = n.voice;
			npc.worship_habit = n.worship_habit;
			npc.summary = n.summary;
			return npc;
		},
	}
}
</script>
