<script lang="ts">
  import type { PageProps } from "./$types";

  import Article from "$lib/components/Article.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  let { data }: PageProps = $props();
  let currentFeedIndex = $state(0);
  let currentFeed = $derived(data.feeds[currentFeedIndex]);
</script>

<Sidebar feeds={data.feeds} bind:currentFeedIndex />

<main>
  <h1>
    <a href={currentFeed.link} target="_blank">
      {currentFeed.title}
    </a>
  </h1>

  <div id="articles-wrapper">
    {#each currentFeed.items as item}
      <Article {item} />
    {/each}
  </div>
</main>

<style>
  :global(body) {
    display: flex;
  }

  main {
    overflow-y: scroll;
    max-height: 100dvh;
    width: 100%;
  }

  h1 {
    backdrop-filter: blur(12px);
    text-align: center;
    position: sticky;
    padding: 12px;
    top: 0;
  }

  #articles-wrapper {
    padding: 0 1em 0 1em;
    display: grid;
    gap: 2em;
  }
</style>
