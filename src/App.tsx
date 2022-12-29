import { useState, useEffect } from 'react';
import './App.css';
interface quoteProps {
  quote: string;
  author: string
}

function Quote(props: quoteProps) {
  return (
    <div className="quote-wrapper">
        <div id="text">"{props.quote}"</div>
        <div id="author">- {props.author}</div>
    </div>
  )
}

function App() {
  const [quotes, setQuotes] = useState({
    quoteList: [{
      text: "",
      author: ""
    }],
    currentQuoteText: "",
    currentQuoteAuthor: ""
  });
  const [color, setColor] = useState("rgb(1, 148, 154)");
  const [amount, setAmount] = useState(1);
  

  const fetchQuotes = () => {
    fetch('https://type.fit/api/quotes')
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        //This gives us a list of many quotes to cycle through, some have the author property empty
        let newIndex: number = Math.floor(Math.random() * data.length);
        let newAuthor: string = data[newIndex].author ? data[newIndex].author : "Unknown";
        setQuotes(() => {
          return {
            quoteList: data,
            currentQuoteText: data[newIndex].text,
            currentQuoteAuthor: newAuthor
          };
        });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

    const updateQuote = () => {
      let newIndex: number = Math.floor(Math.random()*quotes.quoteList.length);
      let newQuote = quotes.quoteList[newIndex];
      if (newQuote.author === null){
        newQuote.author = "Unknown";
      }
      setQuotes(previousState => { 
        return { 
          ...previousState, 
          currentQuoteText: newQuote.text, 
          currentQuoteAuthor: newQuote.author 
        }
      });
    }

    const changeColor = () => {
      color==="rgb(1, 148, 154)" ? setColor("rgb(0, 67, 105)") : color==="rgb(0, 67, 105)" ? setColor("rgb(219, 31, 72)") : setColor("rgb(1, 148, 154)");
    }

    const changeAmount = () => {
      amount === 1 ? setAmount(10) : setAmount(1);
    }

  useEffect(() => {
    fetchQuotes();
  }, [])

  return (
    <div data-testid="App" className="App" style={{ backgroundColor: color }}>
      <div className="quote-box">
        <h1 data-testid="title" style={{ color: color }}>Random Quote Generator</h1>
        {amount===1 ? (
          <div id='wrapper'>
            <Quote quote={quotes.currentQuoteText} author={quotes.currentQuoteAuthor} />
            <div data-testid="buttons" id="buttons">
              <button 
                style={{ color: color, borderColor: color, boxShadow: "2px 2px 10px "+color+" inset, -2px -2px 10px "+color+" inset" }}
                onClick={updateQuote}>
                  New Quote{amount > 1 && "s"}!
                </button>
              <button
                style={{ color: color, borderColor: color, boxShadow: "2px 2px 10px "+color+" inset, -2px -2px 10px "+color+" inset" }}
                onClick={changeColor}>
                  Change Color!
              </button>
              <button
                style={{ color: color, borderColor: color, boxShadow: "2px 2px 10px "+color+" inset, -2px -2px 10px "+color+" inset" }}
                data-testid="amount"
                onClick={changeAmount}>
                  {amount===1 ? (
                    'More Quotes?'
                  ) : (
                    'Fewer?'
                  )}
              </button>
            </div>
          </div>
        ) : (
        <div id="wrapper">
          <div data-testid="buttons" id="buttons">
            <button 
              style={{ color: color, borderColor: color, boxShadow: "2px 2px 10px "+color+" inset, -2px -2px 10px "+color+" inset" }}
              onClick={updateQuote}>
                New Quote{amount > 1 && "s"}!
            </button>
            <button
              style={{ color: color, borderColor: color, boxShadow: "2px 2px 10px "+color+" inset, -2px -2px 10px "+color+" inset" }}
              onClick={changeColor}>
                Change Color!
            </button>
            <button
              style={{ color: color, borderColor: color, boxShadow: "2px 2px 10px "+color+" inset, -2px -2px 10px "+color+" inset" }}
              data-testid="amount"
              onClick={changeAmount}>
                {amount===1 ? (
                  'More Quotes?'
                ) : (
                  'Fewer?'
                )}
            </button>
          </div>
          {Array.from(Array(amount))
            .map((_,i) => quotes.quoteList[i+Math.floor(Math.random()*(quotes.quoteList.length-amount))])
            .map((quote) => quote.author ? quote : { text: quote.text, author: "Unknown" })
            .map((quote, index) => (
            <Quote key={index} quote={quote.text} author={quote.author} />
        ))}
        </div>
        )} 
      </div>
    </div>
  );
}

export default App;
