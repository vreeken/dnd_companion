<template>
	<div v-if="npc" class="npc-output">
		<div><span>Name:</span> <span>{{ npc.name }}</span></div>
		<div><span>Race:</span> <span>{{ npc.race }}</span></div>
		<div><span>Sex:</span> <span>{{ npc.sex }}</span></div>
		<div><span>Age:</span> <span>{{ npc.age }}</span></div>
		<div><span>Appearance:</span> <span>{{ npc.appearance }}</span></div>
		<div><span>Voice:</span> <span>{{ npc.voice }}</span></div>
		<div><span>Personality:</span> <span>{{ npc.personality }}</span></div>
		<div><span>Trait:</span> <span>{{ npc.trait }}</span></div>
		<div><span>Bond:</span> <span>{{ npc.bond }}</span></div>
		<div><span>Motivation:</span> <span>{{ npc.motivation }}</span></div>
		<div><span>Ideal:</span> <span>{{ npc.ideal }}</span></div>
		<div><span>Flaw:</span> <span>{{ npc.flaw }}</span></div>
		<div><span>Quirk:</span> <span>{{ npc.quirk }}</span></div>
		<div><span>Detail:</span> <span>{{ npc.detail }}</span></div>
		<div><span>Class:</span> <span>{{ npc.class }}</span></div>
		<div><span>Profession:</span> <span>{{ npc.profession }}</span></div>
		<div><span>Religion:</span> <span>{{ npc.worship_habit }}</span></div>
		<div><span>Relationship Status:</span> <span>{{ npc.relationship }}</span></div>
		<div><span>Life Event:</span> <span>{{ npc.life_event }}</span></div>
		<div><span>Speed:</span> <span>{{ npc.speed }}</span></div>
		<div><span>Fly Speed:</span> <span>{{ npc.speed_fly }}</span></div>
		<div><span>Swim Speed:</span> <span>{{ npc.speed_swim }}</span></div>
		<div><span>Str:</span> <span>{{ npc.asi[0] }}</span></div>
		<div><span>Dex:</span> <span>{{ npc.asi[1] }}</span></div>
		<div><span>Con:</span> <span>{{ npc.asi[2] }}</span></div>
		<div><span>Int:</span> <span>{{ npc.asi[3] }}</span></div>
		<div><span>Wis:</span> <span>{{ npc.asi[4] }}</span></div>
		<div><span>Cha:</span> <span>{{ npc.asi[5] }}</span></div>
		<div><span>Languages:</span> <span>{{ npc.languages }}</span></div>
		<div><span>Racial Extras:</span> <span>{{ npc.racials }}</span></div>
		<div><span>Plot Hook:</span> <span>{{ npc.hook }}</span></div>

		<div><span>Attacks/Abilities:</span> <span>{{ npc.attacks_abilities }}</span></div>
		<div><span>Skills:</span> <span>{{ npc.skills }}</span></div>
		<div><span>Misc:</span> <span>{{ npc.misc }}</span></div>
		<div><span>Summary:</span> <span>{{ npc.summary }}</span></div>
	</div>
</template>

<script>
export default {
	props: {
		npc: Object
	},
	data() {
		return {

		}
	},
}
</script>