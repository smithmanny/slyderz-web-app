import Image from "next/image";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";

const howItWorks = [
  {
    name: "Browse",
    description:
      "Discover a world of culinary creativity. Browse a diverse range of chefs, each with their own unique style and specialty.",
    image: "/browse.svg",
  },
  {
    name: "Book",
    description:
      "Select your favorite chef, choose your menu, and set the date. Booking a personal chef has never been this easy.",
    image: "/book.svg",
  },
  {
    name: "Dine",
    description:
      "Your chosen chef arrives at your home, ready to create a gourmet meal tailored to your taste. Sit back, relax, and savor the experience.",
    image: "/dine.svg",
  },
];

type HowItWorkCard = {
  card: {
    name: string;
    description: string;
    image: any;
  };
};
function HowItWorkCard({ card }: HowItWorkCard) {
  return (
    <div>
      {/* <card.image /> */}
      <Image alt="Empty cart" width={85} height={85} src={card.image} />
      <Typography sx={{ fontWeight: "bold" }}>{card.name}</Typography>
      <Typography>{card.description}</Typography>
    </div>
  );
}

function HowItWorks() {
  return (
    <Grid container spacing={2}>
      {howItWorks.map((hiw) => (
        <Grid item xs={12} md={4} key={hiw.name}>
          <HowItWorkCard card={hiw} />
        </Grid>
      ))}
    </Grid>
  );
}

export default HowItWorks;
