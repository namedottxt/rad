// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}

    interface Feed {
      items: FeedItem[];
      title: string;
      description: string;
      link: string;
      feedUrl: string;
      language: string;
    }

    interface FeedItem {
      title: string;
      content: string;
      contentSnippet: string;
      link: string;
      pubDate: string;
      isoDate: string;
      author?: string;
      media?: string;
    }
  }
}

export {};
