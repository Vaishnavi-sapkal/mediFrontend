
import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const healthTips = [
  {
    title: "Stay Hydrated 💧",
    description:
      "Water plays a crucial role in regulating body temperature, maintaining joint lubrication, and supporting nutrient transport. Staying hydrated also improves skin health and boosts energy levels. Always carry a water bottle and sip regularly throughout the day, especially during exercise or hot weather.",
  },
  {
    title: "Balanced Diet 🥗",
    description:
      "A balanced diet includes carbohydrates, proteins, fats, vitamins, and minerals in the right proportions. Eat colorful fruits and vegetables, whole grains, and lean proteins. Avoid skipping meals, and try to include fiber-rich foods for better digestion. A proper diet helps maintain a healthy weight and prevents lifestyle diseases.",
  },
  {
    title: "Regular Exercise 🏃‍♀️",
    description:
      "Physical activity strengthens your muscles, improves cardiovascular health, and enhances mood by releasing endorphins. Aim for at least 30 minutes of moderate exercise daily—like walking, cycling, or yoga. Regular workouts reduce stress, improve sleep, and help prevent chronic conditions such as diabetes and obesity.",
  },
  {
    title: "Adequate Sleep 😴",
    description:
      "Sleep is essential for the body to repair and rejuvenate. It supports brain function, emotional balance, and immune defense. Adults should get 7–8 hours of quality sleep each night. Maintain a regular sleep schedule, avoid screens before bedtime, and create a calm sleeping environment for better rest.",
  },
  {
    title: "Mental Health 🧘‍♀️",
    description:
      "Taking care of your mind is as important as caring for your body. Practice mindfulness, meditation, or journaling to relieve stress. Spend time with loved ones, pursue hobbies, and take breaks when needed. A positive mindset enhances focus, creativity, and emotional resilience in daily life.",
  },
  {
    title: "Avoid Junk Food 🍔",
    description:
      "Processed foods often contain unhealthy fats, excessive salt, and added sugars that can lead to heart disease, obesity, and diabetes. Try replacing chips and sugary snacks with fruits, nuts, or yogurt. Cooking at home gives you better control over ingredients and helps develop healthier eating habits.",
  },
  {
    title: "Limit Screen Time 📱",
    description:
      "Too much screen exposure can cause eye strain, poor posture, and sleep disturbances. Take short breaks every 30–40 minutes, use blue light filters, and avoid using devices before bedtime. Engage in offline activities like reading, walking, or spending time outdoors to relax your mind.",
  },
  {
    title: "Regular Health Checkups 🩺",
    description:
      "Routine checkups help detect health issues early, making treatment more effective. Schedule annual visits for blood pressure, sugar, cholesterol, and general wellness tests. Preventive care ensures long-term health and helps track your body’s changing needs as you age.",
  },
];

const HealthTips = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white", 
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 2, sm: 6 },
        px: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
         
          width: "100%",
          borderRadius: 2,
          backgroundColor: "white", 
         
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="600"
          mb={4}
          fontFamily="1.3rem"
          color="#6a0dad"
        >
          Health Tips
        </Typography>

        {healthTips.map((tip, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              borderRadius: 2,
              backgroundColor: "white", 
              "&:before": { display: "none" },
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid #eee",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#6a0dad" }} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#f5f0ff",
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="#6a0dad">
                {tip.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="#333">
                {tip.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Box>
  );
};

export default HealthTips;
