import { rest } from "msw";
import { server } from "../mocks/server";
import Search from "./Search";
import { screen, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Weather from "../Weather/Weather";

test("test to see if there's search text box", async () => {
  render(<Search />);

  const ele = await screen.findByPlaceholderText("Search for a city here");

  expect(ele).toBeInTheDocument();
});

test("test to see if results appear", async () => {
  //london, ontario
  render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search for a city here"), {
    target: { value: "London" },
  });
  const ele = await screen.findByText(/ontario/i);

  expect(ele).toBeInTheDocument();
});

// test("test to see if weather appears after selecting city", async () => {
//   render(<Search />);

//   fireEvent.change(screen.getByRole("searchQuery"), {
//     target: { value: "London" },
//   });
//   const locationEle = await screen.findByText(/ontario/i);

//   fireEvent.click(locationEle);
//   const weatherEle = await screen.findByText(/fahrenheit/i);

//   expect(weatherEle).toBeInTheDocument();
// });
//
