import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import Parser from 'rss-parser';

export const load: PageServerLoad = async () => {
	const feedsFilePath = path.resolve('feeds.txt');
	if (!existsSync(feedsFilePath)) return error(400, 'feeds.txt not found');

	const feedsFile = readFileSync(feedsFilePath, 'utf-8');
	if (!feedsFile) return error(400, 'feeds.txt empty');

	let endpoints = feedsFile.trim().split('\n');

	let feeds: App.Feed[] = [];
	const parser = new Parser({
		customFields: {
			// ["unreturnedField", "customName"]
			item: [
				// ["enclosure", "media"],
				['media:content', 'media'],
				['dc:creator', 'author']
			]
		}
	});

	for (const endpoint of endpoints) {
		try {
			const feed = await parser.parseURL(endpoint);
			feed.items.forEach((item) => {
				// Extract the media's URL if there's a media:content tag
				if (item.media) return (item.media = item.media['$']['url']);
			});

			feeds.push(feed as any as App.Feed);
		} catch (err) {
			console.error(err);
		}
	}

	return { feeds };
};
