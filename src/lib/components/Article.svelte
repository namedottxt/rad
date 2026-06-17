<script lang="ts">
	import { timeAgo } from '$lib';

	interface ArticleProps {
		item: App.FeedItem;
	}

	let { item }: ArticleProps = $props();
</script>

<article>
	{#if item.media}
		<img src={item.media} alt="Thumbnail" />
	{/if}

	<section class="info">
		<h3>
			<a href={item.link} target="_blank">
				{item.title}
			</a>
		</h3>

		<footer>
			{#if item.author}
				<span>{item.author}</span> -
			{/if}

			{#if item.pubDate}
				<span>{timeAgo(item.pubDate)}</span>
			{/if}
		</footer>
	</section>
</article>

<hr />

<style>
	article {
		align-items: center;
		display: flex;
		gap: 1em;
	}

	article img {
		aspect-ratio: 16 / 9;
		object-fit: cover;
		width: 300px;
	}

	article .info {
		display: grid;
		gap: 1em;
	}

	article .info h3 {
		margin-bottom: 8px;
		font-size: 1.8em;
	}

	article .info footer {
		font-size: 1.2em;
	}

	hr {
		display: none;
	}

	@media screen and (max-width: 768px) {
		article {
			flex-direction: column;
		}

		article img {
			width: 100%;
		}

		hr {
			display: inline-block;
		}
	}
</style>
