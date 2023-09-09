import React from "react";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Layout from "app/layouts/Layout";
import Button from "app/core/components/shared/Button";
import Typography from "app/core/components/shared/Typography";
import Grid from "app/core/components/shared/Grid";
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
              <Button
                label={bpt.slug}
                variant="text"
                sx={{ fontWeight: "bold", mb: 4 }}
                href={`/blog/${bpt.slug}`}
                onClick={() => handleBlogPost(bpt.slug)}
              >
                {bpt.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </section>
    </ConsumerContainer>
  );
}

BlogPage.getLayout = (page) => <Layout>{page}</Layout>;
export default BlogPage;
