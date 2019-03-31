<template>
	<div class="npc-editing columns">
		<div class="column is-three-quarters">
			<div v-if="npc" class="npc-edit">
				<div class="field">
					<label class="label" for="name">Name</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="name" v-model="new_npc.name" class="input" type="text" :placeholder="npc.name">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.name=getName(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="race">Race</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<!--<input id="race" class="input" type="text" :placeholder="npc.race" v-model="new_npc.race">-->
							<input id="race" v-model="new_npc.race" class="input select-overlay" type="text" :placeholder="npc.race">

							<div class="select is-fullwidth is-overlaid">
								<select v-model="new_npc.race" class="is-expanded" @change="onRaceChange(new_npc.race)">
									<option v-for="r in RACES" :key="r.index" :value="r.name">
										{{ r.subrace_index!==null ? '&nbsp;&nbsp;&nbsp;&nbsp;'+r.name : r.name }}
									</option>
									<option value="">
										Other
									</option>
								</select>
							</div>
						</div>
						<div class="control">
							<button class="button is-success" @click="setupRace(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="sex">Sex</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="sex" v-model="new_npc.sex" class="input" type="text" :placeholder="npc.sex">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.sex=getSex(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="age">Age</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="age" v-model="new_npc.age" class="input" type="text" :placeholder="npc.age">
						</div>
						<div class="control">
							<button class="button is-success" @click="getAge(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="appearance">Appearance</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="appearance" v-model="new_npc.appearance" class="input" type="text" :placeholder="npc.appearance">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.appearance=getAppearance(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="voice">Voice</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="voice" v-model="new_npc.voice" class="input" type="text" :placeholder="npc.voice">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.voice=getVoice(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="personality">Personality</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="personality" v-model="new_npc.personality" class="input" type="text" :placeholder="npc.personality">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.personality=getPersonalityFull(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="trait">Trait</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="trait" v-model="new_npc.trait" class="input" type="text" :placeholder="npc.trait">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.trait=getTrait(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="bond">Bond</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="bond" v-model="new_npc.bond" class="input" type="text" :placeholder="npc.bond">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.bond=getBond(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="motivation">Motivation</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="motivation" v-model="new_npc.motivation" class="input" type="text" :placeholder="npc.motivation">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.motivation=getMotivation(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="ideal">Ideal</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="ideal" v-model="new_npc.ideal" class="input" type="text" :placeholder="npc.ideal">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.ideal=getIdeal(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="flaw">Flaw</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="flaw" v-model="new_npc.flaw" class="input" type="text" :placeholder="npc.flaw">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.flaw=getFlaw(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="quirk">Quirk</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="quirk" v-model="new_npc.quirk" class="input" type="text" :placeholder="npc.quirk">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.quirk=getQuirk(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="detail">Detail</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="detail" v-model="new_npc.detail" class="input" type="text" :placeholder="npc.detail">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.detail=getDetail(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="class">Class</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<!--
                            <input style="position: absolute; left: 0px; top: 0px; z-index: 8; width: calc(100% - 44px); border-radius: 4px 0 0 4px !important;" list="class" class="input" type="text" :placeholder="npc.class" v-model="new_npc.class" />
                            <datalist id="class">
                                <option v-for="c in CLASSES" :value="c" />
                            </datalist>
                            -->

							<input id="class" v-model="new_npc.class" class="input select-overlay" type="text" :placeholder="npc.class">

							<div class="select is-fullwidth is-overlaid">
								<select v-model="new_npc.class" class="is-expanded">
									<option v-for="c in CLASSES" :key="c.index">
										{{ c }}
									</option>
									<option value="">
										Other
									</option>
								</select>
							</div>
						</div>
						<div class="control">
							<button class="button is-success" @click="getClass(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="profession">Profession</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="profession" v-model="new_npc.profession" class="input" type="text" :placeholder="npc.profession">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.profession=getProfession(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="religion">Religion</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="religion" v-model="new_npc.worship_habit" class="input" type="text" :placeholder="npc.worship_habit">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.worship_habit=getWorshipHabit(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="relationship">Relationship Status</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="relationship" v-model="new_npc.relationship" class="input" type="text" :placeholder="npc.relationship">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.relationship=getRelationship(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="life_event">Life Event</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="life_event" v-model="new_npc.life_event" class="input" type="text" :placeholder="npc.life_event">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.life_event=getLifeEvent(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="speed">Speed</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="speed" v-model="new_npc.speed" class="input" type="text" :placeholder="npc.speed">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.speed=getSpeedFromRace(new_npc)">
								<i class="fas fa-undo" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="speed_fly">Fly Speed</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="speed_fly" v-model="new_npc.speed_fly" class="input" type="text" :placeholder="npc.speed_fly">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.speed_fly=getSpeedFlyFromRace(new_npc)">
								<i class="fas fa-undo" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="speed_swim">Swim Speed</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="speed_swim" v-model="new_npc.speed_swim" class="input" type="text" :placeholder="npc.speed_swim">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.speed_swim=getSpeedSwimFromRace(new_npc)">
								<i class="fas fa-undo" />
							</button>
						</div>
					</div>
				</div>

				<!--ASI-->
				<div class="field">
					<label class="label">Ability Scores</label>
					<div class="field">
						<div class="control">
							<button class="button is-success" @click="getASIs(new_npc, 'roll')">
								<i class="fas fa-dice" />&nbsp;4D6 Drop Lowest
							</button>
							<button class="button is-success" @click="getASIs(new_npc, 'array')">
								<i class="fas fa-random" />&nbsp;Standard Array
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="asi_str">Strength</label>
					<div class="field has-addons">
						<div class="control">
							<input id="asi_str" v-model="new_npc.asi[0]" class="input" type="text" :placeholder="npc.asi[0]">
						</div>
						<div class="control">
							<button class="button is-success" @click="$set(new_npc.asi, 0, getASI(new_npc, 0))">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label" for="asi_dex">Dexterity</label>
					<div class="field has-addons">
						<div class="control">
							<input id="asi_dex" v-model="new_npc.asi[1]" class="input" type="text" :placeholder="npc.asi[1]">
						</div>
						<div class="control">
							<button class="button is-success" @click="$set(new_npc.asi, 1, getASI(new_npc, 1))">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label" for="asi_con">Constitution</label>
					<div class="field has-addons">
						<div class="control">
							<input id="asi_con" v-model="new_npc.asi[2]" class="input" type="text" :placeholder="npc.asi[2]">
						</div>
						<div class="control">
							<button class="button is-success" @click="$set(new_npc.asi, 2, getASI(new_npc, 2))">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label" for="asi_int">Intelligence</label>
					<div class="field has-addons">
						<div class="control">
							<input id="asi_int" v-model="new_npc.asi[3]" class="input" type="text" :placeholder="npc.asi[3]">
						</div>
						<div class="control">
							<button class="button is-success" @click="$set(new_npc.asi, 3, getASI(new_npc, 3))">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label" for="asi_wis">Wisdom</label>
					<div class="field has-addons">
						<div class="control">
							<input id="asi_wis" v-model="new_npc.asi[4]" class="input" type="text" :placeholder="npc.asi[4]">
						</div>
						<div class="control">
							<button class="button is-success" @click="$set(new_npc.asi, 4, getASI(new_npc, 4))">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label" for="asi_cha">Charisma</label>
					<div class="field has-addons">
						<div class="control">
							<input id="asi_cha" v-model="new_npc.asi[5]" class="input" type="text" :placeholder="npc.asi[5]">
						</div>
						<div class="control">
							<button class="button is-success" @click="$set(new_npc.asi, 5, getASI(new_npc, 5))">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>





				<div class="field">
					<label class="label" for="languages">Languages</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="languages" v-model="new_npc.languages" class="input" type="text" :placeholder="npc.languages">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.languages=getLanguagesFromRace(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="racials">Racial Extras</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="racials" v-model="new_npc.racials" class="input" type="text" :placeholder="npc.racials">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.racials=getRacialsFromRace(new_npc)">
								<i class="fas fa-undo" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="hook">Plot Hook</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="hook" v-model="new_npc.hook" class="input" type="text" :placeholder="npc.hook">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.hook=getHook(new_npc)">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="attacks_abilities">Attacks/Abilities</label>
					<div class="field">
						<div class="control is-expanded">
							<input id="attacks_abilities" v-model="new_npc.attacks_abilities" class="input" type="text" :placeholder="npc.attacks_abilities">
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="skills">Skills</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="skills" v-model="new_npc.skills" class="input" type="text" :placeholder="npc.skills">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.skills=getSkills()">
								<i class="fas fa-dice" />
							</button>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="misc">Misc</label>
					<div class="field">
						<div class="control is-expanded">
							<input id="misc" v-model="new_npc.misc" class="input" type="text" :placeholder="npc.misc">
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="summary">Summary</label>
					<div class="field has-addons">
						<div class="control is-expanded">
							<input id="summary" v-model="new_npc.summary" class="input" type="text" :placeholder="npc.summary">
						</div>
						<div class="control">
							<button class="button is-success" @click="new_npc.summary=getDefaultSummary(new_npc)">
								<i class="fas fa-undo" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="column">
			<button class="button is-success is-fullwidth" @click="saveChanges()">
				<span class="icon"><i class="fas fa-check" /></span>Apply Changes
			</button>
			<button class="button is-info is-fullwidth" @click="randomize()">
				<span class="icon"><i class="fas fa-dice" /></span>Randomize All
			</button>
			<button class="button is-warning is-fullwidth" @click="revertChanges()">
				<span class="icon"><i class="fas fa-undo" /></span>Revert Changes
			</button>
			<button class="button is-light is-fullwidth" @click="stopEditing()">
				<span class="icon"><i class="fas fa-ban" /></span>Cancel Editing
			</button>
		</div>
	</div>
</template>

<script>
import NPC_GEN_DATA from './NPC_GEN_DATA.vue';

export default {
	extends: NPC_GEN_DATA,
	props: {
		npc: Object
	},
	data() {
		return {
			new_npc: window.clone(this.npc)
		}
	},
	methods: {
		saveChanges: function() {
			this.$emit('saveChanges', this.new_npc);
		},
		revertChanges: function() {
			this.new_npc = this.npc;
		},
		randomize: function() {
			this.new_npc = this.generateRandomNPC();
		},
		stopEditing: function() {
			this.$emit('stopEditing');
		},

		onRaceChange: function(r) {
			for (let i=0; i<this.RACES.length; i++) {
				if (this.RACES[i].name === r) {
					this.new_npc.race_raw = this.getRace(this.RACES[i].parent_race_index);
					break;
				}
			}
		},
	}
}
</script>