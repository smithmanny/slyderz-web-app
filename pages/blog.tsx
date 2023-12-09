import React from "react";
import Link from "next/link";
import ConsumerContainer from "app/components/shared/ConsumerContainer";
import Layout from "app/layouts/Layout";
import Button from "app/components/shared/Button";
import Typography from "app/components/shared/Typography";
import Grid from "app/components/shared/Grid";
import contentfulClient, { BlogPost } from "app/helpers/contentful";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<{
  blogPosts: Array<BlogPost>;
}> = async () => {
  const blogPosts = await contentfulClient.getAllPosts();

  return { props: { blogPosts } };
};

function BlogPage({
  blogPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const handleBlogPost = (slug: string) => {
    window.rudderanalytics.track("Blog post clicked", {
      slug,
    });
  };
  return (
    <ConsumerContainer maxWidth="md">
      <section style={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", pb: 4 }}>
          Blog
        </Typography>
        <Grid container>
          {blogPosts.map((bpt, i) => (
            <Grid item xs={12} key={`${bpt}-${i}`} component="article">
              <Link passHref href={`/blog/${bpt.slug}`}>
                <Button
                  label={bpt.slug}
                  variant="text"
                  sx={{ fontWeight: "bold", mb: 4 }}
                  onClick={() => handleBlogPost(bpt.slug)}
                >
                  {bpt.title}
                </Button>
              </Link>
            </Grid>
          ))}
        </Grid>
      </section>
    </ConsumerContainer>
  );
}

BlogPage.getLayout = (page) => <Layout>{page}</Layout>;
export default BlogPage;
