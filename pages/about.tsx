import { BlitzPage, Routes } from "@blitzjs/next";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Layout from "app/core/layouts/Layout"
import AboutSection from "app/about/components/AboutSection";

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"

const About: BlitzPage = () => {
  return (
    <ConsumerContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h1">We&apos;re changing the whole game.</Typography>
        </Grid>
        <Grid item xs={12} textAlign="center" sx={{ mb: 8 }}>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>&quot;Slyderz is an on-demand chef service that connects consumers with professional chefs to enjoy high-quality cuisine in the comfort of their homes. The platform offers a convenient booking and payment system, allowing customers to browse local chefs, view their menus and pricing, and book the perfect chef for their needs.&quot;</Typography>
          </Box>
        </Grid>
        <AboutSection
          title="Our Story"
          description="We&apos;re building a platform that connects consumers with professional chefs for unforgettable dining experiences in the comfort of their own homes."
        />
        <AboutSection
          title="Our Mission"
          description="We&apos;re building a platform that connects consumers with professional chefs for unforgettable dining experiences in the comfort of their own homes. Our mission is to make high-quality cuisine accessible to everyone, while also empowering chefs to showcase their skills and build their careers."
        />
        <AboutSection
          direction="row-reverse"
          title="Our Vision"
          description="The founders recognized the growing demand for personalized, gourmet dining experiences and saw an opportunity to connect consumers with talented chefs. By creating an on-demand chef service, we aimed to provide a unique and memorable dining experience that was both convenient and affordable. At the same time, we sought to give chefs a platform to showcase their talents and reach new customers. "
        />
        {/* <Grid item xs={12}>
          <Typography variant="h6">
            Welcome to Slyderz - Your Ultimate On-Demand Chef Service! We&apos;re a platform that connects consumers with professional chefs for unforgettable dining experiences in the comfort of their own homes. Our mission is to make high-quality cuisine accessible to everyone, while also empowering chefs to showcase their skills and build their careers.
            <p />
            For consumers, Slyderz offers a unique way to bring the gourmet experience home. Whether you&apos;re celebrating a special occasion or just want to enjoy a delicious meal with friends and family, our on-demand chef service makes it easy to create unforgettable dining experiences. With just a few clicks, you can browse local chefs, view their menus and pricing, and book the perfect chef for your needs. Plus, with our convenient booking and payment system, you can relax and enjoy your meal without any hassle.
            <p />
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Box>Explore private chefs and all the dishes they have to offer</Box>
              <Box>Choose a chef you like, the dishes and book it</Box>
              <Box>Enjoy a home cooked meal from your own private chef</Box>
            </Stack>
            <p />
            For chefs, Slyderz provides a platform to showcase their talents, connect with new clients, and grow their business. Our chefs have access to a dashboard where they can manage their availability, create and update their menus, and track their bookings. Plus, our platform makes it easy for chefs to receive payment and manage their finances, so they can focus on what they do best - cooking delicious food.
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Box>Your own chef profile and access to our customers</Box>
              <Box>Flexibility. No Contracts.</Box>
              <Box>Be in control of your prices and availability</Box>
            </Stack>
            <p />
            With Slyderz, everyone wins - consumers get to enjoy delicious meals in the comfort of their own homes, and chefs get to showcase their talents and build their careers. So why wait? Sign up today and discover the power of on-demand dining experiences with Slyderz!
          </Typography>
        </Grid> */}
      </Grid>
    </ConsumerContainer>
  )
}

export default About
About.getLayout = (page) => <Layout>{page}</Layout>
