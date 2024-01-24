import Container from "app/components/Container";

import contentfulClient from "app/lib/contentful";
import Blog from "./Blog";

export default async function AboutPage() {
  const blogPosts = await contentfulClient.getAllPosts();

  return (
    <Container className="bg-white">
      <div className="relative isolate px-2 sm:px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Blog
            </h1>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center pt-24">
            {blogPosts.map((post, i) => (
              <Blog
                key={`${post.id}-${i}`}
                title={post.title}
                slug={post.slug}
              />
            ))}
          </section>
        </div>
      </div>
    </Container>
  );
}
