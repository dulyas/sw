<script>
import { onMount } from "svelte";

    export let people;
	let planet = {};
	import { Link } from "svelte-routing";
	import SWService from './Service.js';
	const swService = new SWService;

	onMount(() => {
		swService.getSWApi(people.homeworld)
		.then(res => planet = res);
	});
</script>

<div class="main">
{#if !people}
	<p>CHOOSE UR HERO</p>
{:else}
	<span class="char">
		Имя: {people.name}
		<br>
		Рост: {people.height}
		<br>
		Год рождения: {people.birth_year}
		<br>
		Место рождения: 
		{#if planet.name} 
            <Link to="planet">{planet.name}</Link>
		{:else} 
			Загрузка...
		{/if}
	</span>
{/if}
</div>

<style type="text/scss">
	@import '../styles/vars';
	.main {
		padding: 1rem;
        margin: 1rem;
        border: 2px black solid;
        text-align: center;
	}

	.char {
		color: white;
		text-transform: uppercase;
		font-size: 2rem;
	}


</style>