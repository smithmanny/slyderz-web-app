import { CldImage } from "next-cloudinary";

import Box from "app/components/shared/Box";
import Grid from "app/components/shared/Grid";
import Typography from "app/components/shared/Typography";
import { ReactElement } from "react";

interface AboutSectionProps {
  component?: ReactElement;
  description?: string;
  direction?: string;
  image?: string;
  title: string;
  type?: string;
  MainProps?: object;
}

const AboutSection = (props: AboutSectionProps) => {
  const { description, direction, image, title, MainProps } = props;

  const mainSection = () => (
    <Grid item xs={12} md={6}>
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
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

export default AboutSection;
