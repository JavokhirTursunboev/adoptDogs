import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Carousels from "../assets/Carousel";

test("testing carousel in thumbnail", async () => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousels images={images} />);
  const hero = await carousel.findByTestId("hero");
  expect(hero.getAttribute("src")).toContain(images[0]);

  for (let i = 1; i < images.length; i++) {
    const image = images[i];
    const thumb = await carousel.findByTestId(`thumbnail${i}`);

    // Simulate clicking the thumbnail
    thumb.click();

    // Wait for the transition to complete
    await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the duration as needed

    // Assert that the hero image is updated
    expect(hero.getAttribute("src")).toContain(image);

    // Assert that the clicked thumbnail has the 'active' class
    expect(thumb.classList.contains("active")).toBeTruthy();
  }

  carousel.unmount();
});
