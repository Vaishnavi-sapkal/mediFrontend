import React from "react";
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    question: "Why is donating medicine important?",
    answer:
      "Donating medicine helps people who cannot afford it. It is especially helpful in poor communities and during emergencies like floods or earthquakes.",
  },
  {
    question: "What are the benefits of donating medicine?",
    answer:
      "It gives people access to healthcare, reduces sickness, and lessens suffering. It also builds trust and kindness between people and organizations.",
  },
  {
    question: "Who can donate medicine?",
    answer:
      "Anyone can donate — individuals, hospitals, pharmacies, and companies. The important thing is the medicine must be safe and not expired.",
  },
  {
    question: "What types of medicine can be donated?",
    answer:
      "Most medicines can be donated, including doctor-prescribed and common over-the-counter ones, as long as they are in good condition and not expired.",
  },
  {
    question: "How can I donate medicine?",
    answer:
      "You can donate through NGOs, government programs, or directly to hospitals and clinics that accept donations.",
  },
  {
    question: "Are there risks in donating medicine?",
    answer:
      "Yes. Expired or fake medicines can harm people. That’s why donations must be checked carefully before use.",
  },
  {
    question: "How do we make sure donated medicine is safe?",
    answer:
      "By checking expiry dates, packaging, and verifying that the medicine meets safety standards before it is given to patients.",
  },
  {
    question: "How can I get involved?",
    answer:
      "You can donate medicines or volunteer with organizations that collect and share them. Always choose trusted groups with clear rules.",
  },
  {
    question: "Do I get anything in return?",
    answer:
      "You will not get money. But you will help save lives and your contribution will be recognized.",
  },
];

function FAQ() {
  return (
    <Paper
      sx={{
        p: 7,
        borderRadius: "10px",

        mx: "auto",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={600}
        marginBottom={5}
        fontSize="1.5rem"
        gutterBottom
      >
        Frequently Asked Questions
      </Typography>

      {faqData.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

export default FAQ;
