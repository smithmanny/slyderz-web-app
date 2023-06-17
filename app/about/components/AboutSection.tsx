import Image from "next/image";
import PropTypes from "prop-types";
import { CldImage } from "next-cloudinary";

import Box from "app/core/components/shared/Box";
import Stack from "app/core/components/shared/Stack";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import { ReactElement } from "react";

interface AboutSectionProps {
  component?: ReactElement;
  description?: string;
  direction: string;
  image?: string;
  title: string;
  type: string;
  MainProps: object;
}

interface OurStoryBulletPointType {
  description: string;
  title: string;
}

const OurStoryBulletPoint = (props: OurStoryBulletPointType) => (
  <Box>
    <Typography variant="subtitle1" fontWeight="bold">
      {props.title}
    </Typography>
    <Box sx={{ ml: 4 }}>
      <Typography variant="subtitle2">{props.description}</Typography>
    </Box>
  </Box>
);

const AboutSection = (props: AboutSectionProps) => {
  const { description, direction, image, title, type, MainProps } = props;

  const mainSection = () => (
    <Grid item xs={12} md={6}>
      <Box>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          {title}
        </Typography>
        {props.component || (
          <Typography variant="subtitle2">{description}</Typography>
        )}
      </Box>
    </Grid>
  );
  const secondarySection = () => (
    <Grid item xs={12} md={6}>
      {type === "our-story" ? (
        <Stack spacing={4} sx={{ margin: "auto", mt: 2 }}>
          <OurStoryBulletPoint
            title="01. Enjoy gourmet meals in the comfort of your own home"
            description="Say goodbye to crowded restaurants and enjoy a personalized dining experience that's tailored to your preferences and needs."
          />
          <OurStoryBulletPoint
            title="02. Discover new chefs and cuisines"
            description="Slyderz offers a variety of local chefs with diverse culinary backgrounds and specialties."
          />
          <OurStoryBulletPoint
            title="03. Convenient and hassle-free booking"
            description="With our convenient booking and payment system, you can relax and enjoy your meal without any hassle. Whether you're planning a dinner party or a romantic evening, Slyderz takes care of everything so you can sit back and savor the moment."
          />
        </Stack>
      ) : (
        <Box
          sx={{
            position: "relative",
            height: 400,
            width: "100%",
            maxWidth: 600,
            backgroundColor: "#f3f7f5",
            borderRadius: "10pt",
            margin: direction === "row" ? "auto" : null,
          }}
        >
          {image && (
            <CldImage
              src={image}
              alt="About Us"
              fill
              gravity="auto"
              style={{
                objectFit: "cover",
              }}
              sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw"
            />
          )}
        </Box>
      )}
    </Grid>
  );

  return (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      sx={{
        mb: { xs: 4, md: 8 },
        flexDirection: {
          xs: "row-reverse",
          md: direction === "row" ? "row" : "row-reverse",
        },
      }}
      {...MainProps}
    >
      {/* {content} */}
      {mainSection()}
      {secondarySection()}
    </Grid>
  );
};

AboutSection.defaultProps = {
  description: "",
  direction: "row",
  title: "",
  type: "",
  MainProps: {},
};

AboutSection.propTypes = {
  description: PropTypes.string,
  direction: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  MainProps: PropTypes.object,
};

export default AboutSection;
