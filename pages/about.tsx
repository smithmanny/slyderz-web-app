import Box from "@mui/material/Box";
import Layout from "app/layouts/Layout";
import AboutSection from "app/components/AboutSection";
import ConsumerContainer from "app/components/shared/ConsumerContainer";
import Grid from "app/components/shared/Grid";
import Typography from "app/components/shared/Typography";

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
          type="our-story"
          component={
            <>
              <Typography variant="subtitle2" gutterBottom>
                In a world that&apos;s always in a rush, we realized something
                was missing - the joy of savoring home-cooked meals and
                experiencing the culinary magic firsthand. That&apos;s why we
                founded Slyderz, a platform connecting food enthusiasts with
                personal chefs, transforming dining experiences one home at a
                time.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Slyderz was born out of our love for food and the desire to
                bring gourmet cooking right to your kitchen. Founded in 2023 by
                a team of passionate foodies and tech enthusiasts, our mission
                is to redefine the way people dine at home.
              </Typography>
              <Typography variant="subtitle2">
                We saw an untapped potential in the food industry - talented
                chefs looking for opportunities to showcase their culinary
                skills beyond restaurants and people yearning for a unique,
                intimate dining experience. This inspired us to create a
                platform that not only bridges this gap but also allows
                individuals to enjoy restaurant-quality meals from the comfort
                of their own homes.
              </Typography>
            </>
          }
        />
        <AboutSection
          title="Our Mission"
          image="https://res.cloudinary.com/slyderz/image/upload/v1686800324/cswlgf55laikw8pu026c.jpg"
          description="We're building a platform that connects consumers with professional chefs for unforgettable dining experiences in the comfort of their own homes. Our mission is to make high-quality cuisine accessible to everyone, while also empowering chefs to showcase their skills and build their careers. With Slyderz, we wanted to bring back the joy of gathering
          around the table, of sharing a home meal cooked with passion and
          love. More than just a service, Slyderz is about building
          community, celebrating diversity through different cuisines, and
          making gourmet dining accessible to everyone."
        />
        <AboutSection
          direction="row-reverse"
          title="Our Vision"
          image="https://res.cloudinary.com/slyderz/image/upload/v1686929295/yjsbjmp0pcb4d5ejxnyl.jpg"
          description="The founders recognized the growing demand for personalized, gourmet dining experiences and saw an opportunity to connect consumers with talented chefs. By creating an on-demand chef service, we aimed to provide a unique and memorable dining experience that was both convenient and affordable. At the same time, we sought to give chefs a platform to showcase their talents and reach new customers. "
          component={
            <>
              <Typography variant="subtitle2" gutterBottom>
                At Slyderz, we envision a world where the luxury of personal
                chef services is not just for the few, but an accessible and
                shared experience for all.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                We believe in a future where everyone can explore diverse
                culinary landscapes from the comfort of their homes. Our vision
                is to make every meal a celebration, every table a gathering of
                cultures, and every chef an ambassador of their cuisine.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                We see Slyderz not merely as a booking platform, but as a
                culinary bridge connecting people and cultures through the
                universal language of food. We strive to create a global
                community where food enthusiasts and expert chefs come together
                to share, learn, and create extraordinary dining experiences.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Our commitment extends to the talented chefs on our platform as
                well. We aim to provide them with the opportunities to expand
                their horizons, reach new audiences, and achieve their dreams.
                Through Slyderz, we aspire to democratize the personal chef
                industry, allowing chefs of all backgrounds to showcase their
                culinary prowess.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                In short, our vision is to create a world where gourmet dining
                is a standard home experience, where every meal is a new
                discovery, and where anyone can enjoy the pleasure of a
                personally tailored, cooked-to-order meal at the touch of a
                button.
              </Typography>
              <Typography variant="subtitle2">
                This is our vision for Slyderz. Join us as we transform dining,
                one home at a time.&quot;
              </Typography>
            </>
          }
        />
      </Grid>
    </ConsumerContainer>
  );
};

About.getLayout = (page) => <Layout title="About | Slyderz">{page}</Layout>;
export default About;
