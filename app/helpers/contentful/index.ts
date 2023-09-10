export type BlogPost = {
  id: string
  title: string;
  document: any;
  createdAt: string,
  slug: string
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
    return slug.replaceAll(' ', '-')
  }

  private prepareEntries(entries: any, array: Array<BlogPost>) {
    entries.items.forEach((bp: any) => {
      if (bp.fields.title) {
        array.push({
          id: bp.sys.id,
          createdAt: bp.sys.createdAt,
          title: bp.fields.title,
          document: bp.fields.description,
          slug: this.stringifySlug(bp.fields.slug),
        });
      }
    });
  }

  public async getPost(entryId: string): Promise<any> {
    const blogPost = await this.client.getEntry(entryId);

    return blogPost
  }

  public async getAllPosts(): Promise<BlogPost[]> {
    const blogPosts: Array<BlogPost> = [];
    const entries = await this.client.getEntries();
    this.prepareEntries(entries, blogPosts)

    return blogPosts
  }
}

const contentfulClient = new ContentfulSingleton()

Object.freeze(contentfulClient)

export default contentfulClient