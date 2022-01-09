<script>
    import { onMount } from 'svelte';
    import SWService from '../components/Service.js';
    import { createEventDispatcher } from 'svelte';
    import { links } from "svelte-routing";
    import Loading from '../components/Loading.svelte';
    import { fade, fly } from 'svelte/transition';
    import ModalCharacter from './ModalCharacter.svelte';


    let swService = new SWService;
    let data = [];
    let peoples = [];
    let page = 1;
    let value = '';
    let showModal = false;

    function generateRandomColor() {
        return 'background:#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();

    }

    $: peoples = [
        ...peoples,
        ...data
    ]



    const peopleClickHandle = (i) => {
        dispatch('message', {
			selected: peoples[i],
		});
    }




    const dispatch = createEventDispatcher();




    onMount(() => {
        setTimeout(async () => {
            load10Peoples();
            
        }, 2000);

    })

    // function nextPage() {
    //     if (page < 9) {
    //         page++
    //     } else {
    //         page = 1;
    //     }
    //         swService.getAllCharacters(`https://swapi.dev/api/people/?page=${page}`)
    //         .then(res => peoples = res);
    // }
    
    // function prevPage() {
    //     if (page > 1) {
    //         page--;
    //     } else {
    //         page = 9;
    //     }
    //         swService.getAllCharacters(`https://swapi.dev/api/people/?page=${page}`)
    //         .then(res => peoples = res);
    // }
    
    async function searchPeople(value) {
        data = [];
        console.log(value);
        peoples = await swService.get10TransformedPeoples(`https://swapi.dev/api/people/?search=${value}`);
    }

    async function load10Peoples() {
        data = await swService.get10TransformedPeoples(`https://swapi.dev/api/people/?page=${page}`);

    }

    function infiniteScroll() {
        // console.log(scrollY);
        // console.log(document.documentElement.scrollHeight);
        // console.log(document.documentElement.clientHeight);
        if (peoples.length < 10) {
            return;
        }
        if (document.documentElement.scrollHeight - scrollY - document.documentElement.clientHeight < 200 && page <= 8) {
            page++;
            load10Peoples();
        }
    }
     
    const debouncedSearch = debounce(searchPeople, 2000, false);
    
        function debounce(func, wait, immediate) {
        let timeout;

        return function executedFunction() {
            const context = this;
            const args = arguments;

            const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
            };

            const callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) func.apply(context, args);
        };
    };

    function log() {
        if (showModal) {
        console.log('s');
        }
    }

</script>


<svelte:window on:scroll={debounce(infiniteScroll, 1000, false)}/>

    {#if showModal && peoples.length}
    <ModalCharacter on:close={log} people={peoples[0]}/>
    {/if}
    
    <div class="container">
        <div use:links class="cards__wrapper">
            {#if peoples.length}
            <div class="search">
                <input bind:value={value} on:input={debouncedSearch(value)} type="text" placeholder='Search by name'>
                <img src="./img/icons/search.svg" alt="" class="search-img" on:click={() => searchPeople(value)}>
            </div>
                {#each peoples as people, i}
                        <div in:fly="{{ y: 100, duration: 2000 }}" class="cards__item"
                        on:click={() => {peopleClickHandle(i); showModal = true}}>
                            <div class="cards__item-avatar"
                            style={generateRandomColor()}>{people.name[0]}</div>
                            <div class="cards__item-name">{people.name}</div>
                            <div class="cards__item-species">{people.speciesName}</div>
                        </div>
                {/each}
            {:else}
                <div out:fade class="spinner">
                    <Loading/>
                </div>
            {/if}
        </div>
    </div>


<style type="text/scss">

    @import '../styles/mixins';

    .spinner {
        width: 100%;
        height: auto;
        margin-top: 7%;
    }



    .container {
        max-width: 1440px;
        margin: 0 auto;
        padding-top: 50px;
    }

    .cards__wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

    }

    .cards__item {
        background: #1A1A1A;
        border-radius: 8px;
        width: 592px;
        height: 320px;
        margin: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 1s all;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
        &:hover {
            box-shadow: 0px 10px 40px rgba(37, 136, 167, 0.38);
            background: #222222;
            cursor: pointer;
        }
        &-avatar {
            @include avatar;
        }
        &-name {
            @include name;
        }
        &-species {
            margin-top: 9px;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 15px;
            text-align: center;
            color: #808080;
        }
    }

    .search {
        position: relative;
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        input {
            background: rgba($color: #000000, $alpha: 0);
            border: none;
            border-bottom: 1px solid #808080;
            height: 2.5rem;
            padding: 0 1rem;
            width: 90%;
            color: white;
        }
        img {
            position: absolute;
            right: 5%;
            top: 20%;
            cursor: pointer;
        }
    }
    @media (max-width:618px) {
        .cards__item {
            width: 272px;
            height: 200px;
        }
    }
</style>

