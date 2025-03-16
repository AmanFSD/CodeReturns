// src/pages/HomePage.tsx
import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CourseCard from "../components/CourseCard";

import image1 from "/src/assets/images/image1.jpg";
import image2 from "/src/assets/images/image2.jpg";
import image3 from "/src/assets/images/image3.jpg";

const HomePage: React.FC = () => {
  return (
    <>
      <Container maxWidth="md">
        <HeroSection />
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <CourseCard
              image={image1}
              title="PYTHON FOR BUILD GAMES, WEB APPS, DATA SCIENCE, MACHINE LEARNING"
            />
          </Grid>
          <Grid item xs={12}>
            <CourseCard
              image={image2}
              title="Accept Coding Challenges"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;