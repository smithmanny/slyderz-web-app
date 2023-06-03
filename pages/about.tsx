import Box from "@mui/material/Box";
import Layout from "app/core/layouts/Layout";
import AboutSection from "app/about/components/AboutSection";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";

const About = () => {
  return (
    <ConsumerContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h1">
            We&apos;re changing the whole game.
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center" sx={{ mb: 4 }}>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>
              &quot;Slyderz is an on-demand chef service that connects consumers
              with professional chefs to enjoy high-quality cuisine in the
              comfort of their homes. The platform offers a convenient booking
              and payment system, allowing customers to browse local chefs, view
              their menus and pricing, and book the perfect chef for their
              needs.&quot;
            </Typography>
          </Box>
        </Grid>
        <AboutSection
          title="Our Story"
          description="We're building a platform that connects consumers with professional chefs for unforgettable dining experiences in the comfort of their own homes."
          type="our-story"
        />
        <AboutSection
          title="Our Mission"
          description="We're building a platform that connects consumers with professional chefs for unforgettable dining experiences in the comfort of their own homes. Our mission is to make high-quality cuisine accessible to everyone, while also empowering chefs to showcase their skills and build their careers."
        />
        <AboutSection
          direction="row-reverse"
          title="Our Vision"
          description="The founders recognized the growing demand for personalized, gourmet dining experiences and saw an opportunity to connect consumers with talented chefs. By creating an on-demand chef service, we aimed to provide a unique and memorable dining experience that was both convenient and affordable. At the same time, we sought to give chefs a platform to showcase their talents and reach new customers. "
        />
      </Grid>
    </ConsumerContainer>
  );
};

About.getLayout = (page) => <Layout title="About | Slyderz">{page}</Layout>;
export default About;
