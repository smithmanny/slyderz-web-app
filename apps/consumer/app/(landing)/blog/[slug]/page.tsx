import Container from "app/components/Container";

import { ContentfulView } from "app/components/ContentfulView";
import contentfulClient from "app/lib/contentful";

import { readableDate } from "app/lib/utils";

export async function generateStaticParams() {
	const blogPosts = await contentfulClient.getAllPosts();

	return blogPosts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function BlogDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	const blogPost = await contentfulClient.getPost(params.slug);

	return (
		<Container>
			<h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-4xl pt-10 md:pt-20">
				{blogPost.title}
			</h1>
			<div className="py-4">
				<small>{readableDate(new Date(blogPost.createdAt))}</small>
			</div>
			<ContentfulView document={blogPost.document} />
		</Container>
	);
}
