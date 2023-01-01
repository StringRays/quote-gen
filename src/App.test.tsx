import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(() => cleanup);

describe("Tests app", () => {
  it('Renders title and buttons successfully', () => {
    render(<App />);
    const titleElement: HTMLElement = screen.getByText(/Random Quote Generator/i);
    const newButton: HTMLElement = screen.getByText(/New Quote/i);
    const colorButton: HTMLElement = screen.getByText(/Change Color/i);

    expect(titleElement).toBeInTheDocument();
    expect(newButton).toBeInTheDocument();
    expect(colorButton).toBeInTheDocument();
  });
  it('When Change Color button is clicked, color changes', () => {
    render(<App />);
    const background = screen.getByTestId('App');
    const titleElement = screen.getByTestId('title');
    const allButtons = screen.getAllByRole('button');

    function checkAll(color: string) {
      expect(background.style.backgroundColor).toEqual(color);
      expect(titleElement.style.color).toEqual(color);
      for (const button of allButtons){
        expect(button.style.color).toEqual(color);
        expect(button.style.borderColor).toEqual(color);
        expect(button.style.boxShadow).toEqual('2px 2px 10px '+color+' inset, -2px -2px 10px '+color+' inset');
      }
    }

    checkAll('rgb(1, 148, 154)');
    fireEvent.click(screen.getByText(/Change Color/i));
    checkAll('rgb(0, 67, 105)');
    fireEvent.click(screen.getByText(/Change Color/i));
    checkAll('rgb(219, 31, 72)');
    fireEvent.click(screen.getByText(/Change Color/i));
    checkAll('rgb(1, 148, 154)');
  })
  it("Number of quotes present is initially one", () => {
    render(<App />);
    const quoteElements = screen.getAllByTestId('quote');
    const changeAmount = screen.getByText(/More Quotes?/i);

    expect(quoteElements.length).toEqual(1);
    expect(changeAmount).toBeInTheDocument();
  });
});