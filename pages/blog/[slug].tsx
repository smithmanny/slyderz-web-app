import React from "react";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Layout from "app/layouts/Layout";
import Typography from "app/core/components/shared/Typography";
import ContentfulView from "app/contentful";
import contentfulClient, { BlogPost } from "app/helpers/contentful";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

type ContentfulBlogPost = Partial<BlogPost> & {
  description: any;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPosts = await contentfulClient.getAllPosts();
  const blogPaths = blogPosts.map((blogPost) => ({
    params: {
      slug: blogPost.slug,
    },
  }));

  return {
    paths: blogPaths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  blogPost: ContentfulBlogPost;
}> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error("Provide blog slug");
  }

  const blogPosts = await contentfulClient.getAllPosts();
  const blogPostId = blogPosts.find((bp) => bp.slug === params.slug)?.id;

  if (!blogPostId) {
    throw new Error("Blog doesn't exist");
  }

  const blogPost = await contentfulClient.getPost(blogPostId);

  return { props: { blogPost: blogPost.fields } };
};

function BlogPage({
  blogPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ConsumerContainer>
      <Typography sx={{ fontWeight: "bold", mb: 4 }}>
        {blogPost.title}
      </Typography>
      <ContentfulView document={blogPost.description} />
    </ConsumerContainer>
  );
}

BlogPage.getLayout = (page) => <Layout>{page}</Layout>;
export default BlogPage;
