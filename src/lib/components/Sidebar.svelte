<script lang="ts">
	import { onMount } from 'svelte';
	import fallback from '$lib/assets/favicon.svg';

	interface SidebarProps {
		feeds: App.Feed[];
		currentFeedIndex: number;
	}

	let { feeds, currentFeedIndex = $bindable() }: SidebarProps = $props();
	let collapsed = $state(true);

	onMount(() => {
		const shiftIndex = (shift: number) => {
			let newIndex = currentFeedIndex + shift;
			if (newIndex >= feeds.length) newIndex = 0;
			else if (newIndex < 0) newIndex = feeds.length - 1;
			currentFeedIndex = newIndex;
		};

		document.addEventListener('keydown', (e) => {
			// Tab switching
			if (e.ctrlKey) {
				if (e.key === 'ArrowLeft') shiftIndex(-1);
				if (e.key === 'ArrowRight') shiftIndex(1);
			}

			if (!Number.isNaN(parseInt(e.key)) && parseInt(e.key) <= feeds.length)
				currentFeedIndex = parseInt(e.key) - 1;

			// Other shortcuts
			if (e.key === 'b') collapsed = !collapsed;
		});
	});
</script>

<nav class={`${collapsed ? 'collapsed' : ''}`}>
	{@render toggle()}

	{#each feeds as feed, index}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class={`feed hover ${index === currentFeedIndex && collapsed ? 'scale' : ''}`}
			onclick={() => (currentFeedIndex = index)}
		>
			<img
				src={feed.link ? `https://www.google.com/s2/favicons?domain=${feed.link}&sz=64` : fallback}
				alt={feed.title}
			/>

			{#if !collapsed}
				<span>> {feed.title}</span>
			{/if}
		</div>
	{/each}
</nav>

{#snippet toggle()}
	<button
		class="toggle blank-btn"
		aria-label="Close sidebar"
		onclick={() => (collapsed = !collapsed)}
	>
		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3 4H21V20H3V4ZM9 6H19V18H9V6Z"
				fill="currentColor"
			/>
		</svg>
	</button>
{/snippet}

<style>
	nav {
		border-right: 2px solid var(--accent);
		flex-direction: column;
		display: flex;
		overflow-y: scroll;
		transition: 0.3s;
		min-width: 150px;
		width: 15dvw;
		height: 100dvh;
		padding: 1em;
		gap: 2em;
	}

	nav.collapsed {
		min-width: 59px;
		width: 59px;
	}

	.toggle {
		display: flex;
	}

	.feed {
		position: relative;
		align-items: center;
		display: flex;
		gap: 8px;
	}

	.feed span {
		text-overflow: ellipsis;
		text-align: center;
		overflow: hidden;
		width: 100%;
	}

	.feed img {
		height: 32px;
		width: 32px;
	}

	.feed::before {
		background-color: rebeccapurple;
		transition: transform 0.3s;
		transform-origin: left;
		transform: scaleX(0);
		position: absolute;
		content: '';
		width: 100%;
		height: 2px;
		bottom: -6px;
		left: -1px;
	}

	.feed:hover::before {
		transform: scaleX(1);
	}

	.feed:not(:hover)::before {
		transform-origin: right;
	}

	.scale {
		animation: scale 300ms ease-in-out reverse;
	}

	@keyframes scale {
		0% {
			scale: 1;
		}
		75% {
			scale: 1.32;
		}
		100% {
			scale: 1.2;
		}
	}
</style>
