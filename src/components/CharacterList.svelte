<script>
    import { onMount } from 'svelte';
    import SWService from '../components/Service.js';
    import Loading from '../components/Loading.svelte';
    import { fade, fly } from 'svelte/transition';
    import ModalCharacter from './ModalCharacter.svelte';


    let swService = new SWService;
    let data = [];
    let peoples = [];
    let page = 1;
    let value = '';
    let showModal = false;
    let selectedPeople;
    let promise;

    $: peoples = [
        ...peoples,
        ...data
    ]

    const peopleClickHandle = (i) => {
        selectedPeople = peoples[i];
    }

    onMount(() => {
        setTimeout(async () => {
            load10Peoples();
            
        }, 2000);

    })
    
    async function searchPeople(value) {
        data = [];
        peoples = await swService.get10TransformedPeoples(`https://swapi.dev/api/people/?search=${value}`);
        if (!peoples.length) {
            peoples = [{
                name: 'Not',
                speciesName: 'found',
                color: 'background:red',
                error: true,
            }]
        }
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
     
    const debouncedSearch = debounce(searchPeople, 3000, false);
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

    function modal() {
        if (showModal) {
        showModal = false;
        document.body.style.overflow = '';
        } else {
            showModal = true;
            document.body.style.overflow = 'hidden';
        }
    }
    
    function handle_keydown(e) {
        if (e.key === 'Enter') {
            searchPeople(value);
        }
    }

    function init(el) {
        el.focus()
    }

    function handleCardKeydown(e) {
        if (e.key === 'Enter') {
            modal();
        } else {
            console.log('sls')
        }
    }

</script>


<svelte:window  on:scroll={debounce(infiniteScroll, 1000, false)}/>

    {#if showModal && peoples.length}
    <div in:fade out:fade>
        <ModalCharacter on:close={modal} people={selectedPeople}/>
    </div>
    {/if}
    
    <div class="container">
        <div class="cards__wrapper">
            <div class="search">
                <input on:keydown={handle_keydown} tabindex="1" bind:value={value} on:input={debouncedSearch(value)} type="text" placeholder='Search by name' use:init>
                <img src="./img/icons/search.svg" alt="" class="search-img" on:click={() => searchPeople(value)}>
            </div>
            {#if peoples.length}
                {#each peoples as people, i}
                    {#if !people.error}
                    <div tabindex={i+2} in:fly="{{ y: 100, duration: 2000 }}" class="cards__item"
                    on:click={() => {peopleClickHandle(i); modal()}}
                    on:keydown={() => {peopleClickHandle(i); handleCardKeydown(event)}}>
                        <div class="cards__item-avatar"
                        style={people.color}>{people.name[0]}</div>
                        <div class="cards__item-name">{people.name}</div>
                        <div class="cards__item-species">{people.speciesName}</div>
                    </div>
                    {:else}
                    <div in:fly="{{ y: 100, duration: 2000 }}" class="cards__item">
                        <div class="cards__item-avatar"
                        style={people.color}>{people.name[0]}</div>
                        <div class="cards__item-name">{people.name}</div>
                        <div class="cards__item-species">{people.speciesName}</div>
                    </div>
                    {/if}
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
        margin: 10% auto;
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
        .spinner {
            margin: 35% auto;
        }
        .cards__item {
            width: 272px;
            height: 200px;
        }
    }
</style>

