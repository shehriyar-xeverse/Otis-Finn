/**
 * Generates an elegant classic Barber Pole favicon dynamically on Canvas
 * and injects it into the document tab.
 */
export function initializeFaviconAndTitle(pageTitleSuffix: string) {
  // Update Document Title
  document.title = `Otis & Finn | ${pageTitleSuffix}`;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Clear
      ctx.clearRect(0, 0, 32, 32);

      // Draw pole background (white pillar)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(8, 2, 16, 28, 4);
      ctx.fill();

      // Draw stripes (diagonal red, white, blue)
      ctx.save();
      // Clip within the pole
      ctx.beginPath();
      ctx.roundRect(8, 2, 16, 28, 4);
      ctx.clip();

      // Slanted stripes
      const stripeWidth = 6;
      for (let y = -10; y < 40; y += 12) {
        // Red
        ctx.fillStyle = "#e11d48"; // Rose 600
        ctx.beginPath();
        ctx.moveTo(8, y);
        ctx.lineTo(24, y + 8);
        ctx.lineTo(24, y + 8 + stripeWidth);
        ctx.lineTo(8, y + stripeWidth);
        ctx.closePath();
        ctx.fill();

        // Blue
        ctx.fillStyle = "#2563eb"; // Blue 600
        ctx.beginPath();
        ctx.moveTo(8, y + 6);
        ctx.lineTo(24, y + 14);
        ctx.lineTo(24, y + 14 + stripeWidth);
        ctx.lineTo(8, y + 6 + stripeWidth);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();

      // Add brass caps on top and bottom
      ctx.fillStyle = "#d97706"; // Amber 600 (gold-brass look)
      ctx.beginPath();
      ctx.arc(16, 3, 5, 0, Math.PI, true);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(16, 29, 5, 0, Math.PI, false);
      ctx.fill();

      // Convert to Data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Set link
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = dataUrl;
    }
  } catch (err) {
    console.error("Failed to generate custom dynamic canvas favicon:", err);
  }
}
