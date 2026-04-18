import { Box, Divider, Typography } from "@mui/material";

export default function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(10px)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography
          sx={{
            color: "#00f0ff",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em",
          }}
        >
          {label}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />
      <Box sx={{ px: 3, pb: 3 }}>{children}</Box>
    </Box>
  );
}
