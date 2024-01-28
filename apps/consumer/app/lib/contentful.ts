export type BlogPost = {
	id: string;
	title: string;
	document: any;
	createdAt: string;
	slug: string;
};
import type { ContentfulClientApi } from "contentful";

class ContentfulSingleton {
	private contentful = require("contentful");
	private client: ContentfulClientApi<any> = this.contentful.createClient({
		space: process.env.CONTENTFUL_TOKEN,
		environment: "master", // defaults to 'master' if not set
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	private stringifySlug(slug: string) {
		return slug.replaceAll(" ", "-");
	}

	private prepareEntries(entries: any, array: Array<BlogPost>) {
		for (const entry of entries.items) {
			if (entry.fields.title) {
				array.push({
					id: entry.sys.id,
					createdAt: entry.sys.createdAt,
					title: entry.fields.title,
					document: entry.fields.description,
					slug: this.stringifySlug(entry.fields.slug),
				});
			}
		}
	}

	public async getPost(slug: string): Promise<BlogPost> {
		const blogPosts = await this.getAllPosts();
		const blogPost = blogPosts.find((post) => post.slug === slug);

		if (!blogPost) throw new Error("Blog does not exists");

		return blogPost;
	}

	public async getAllPosts(): Promise<BlogPost[]> {
		const blogPosts: Array<BlogPost> = [];
		const entries = await this.client.getEntries();
		this.prepareEntries(entries, blogPosts);

		return blogPosts;
	}
}

const contentfulClient = new ContentfulSingleton();

Object.freeze(contentfulClient);

export default contentfulClient;
