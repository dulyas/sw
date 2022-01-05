<script>
import { beforeUpdate } from "svelte";
import { createEventDispatcher } from 'svelte';
import { Link } from "svelte-routing";

	export let planet;
    let residents = [];




    const peopleClickHandle = (arg) => {
        dispatch('message', {
			newSelectedPeoplePath: arg,
		});
    }



    const dispatch = createEventDispatcher();






    beforeUpdate(() => {
        residents = planet.residents;
    })

</script>

<div class="main">
{#if !planet.name} 
<span class="choose">Выберите персонажа</span>
{:else}
<span class="char">
		Имя: {planet.name}
		<br>
		Диаметр: {planet.diameter}
		<br>
		Климат: {planet.climate}
		<br>
		{#if residents.length}
			Жители: <br>
			{#each residents as resident, i}
				<div class="char">
					<Link to="char"
					on:click={() => peopleClickHandle(resident.url)}
					>{resident.name}</Link>
				</div>
			<!-- <button
			on:click={() => peopleClickHandle(resident.url)}>{resident.name}</button><br> -->
			{/each}
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
		color: $color;
		text-transform: uppercase;
		font-size: 2rem;
	}


</style>