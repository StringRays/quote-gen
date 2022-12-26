import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [quotes, setQuotes] = useState({
    quoteList: [{
      text: "",
      author: ""
    }],
    currentQuoteText: "",
    currentQuoteAuthor: ""
  });
  const [color, setColor] = useState("#01949A");

  const fetchQuotes = () => {
    fetch('https://type.fit/api/quotes')
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            //This gives us a list of many quotes to cycle through, some have the author property empty
            let newIndex: number = Math.floor(Math.random()*data.length);
            let newAuthor: string = data[newIndex].author ? data[newIndex].author : "Anonymous";
            setQuotes(() => { 
              return { 
                quoteList: data, 
                currentQuoteText: data[newIndex].text, 
                currentQuoteAuthor: newAuthor
              }
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
        newQuote.author = "Anonymous";
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
      color==="#01949A" ? setColor("#004369") : color==="#004369" ? setColor("#DB1F48") : setColor("#01949A");
    }

  //This runs twice in dev mode but shouldn't in production build
  useEffect(() => {
    fetchQuotes();
  }, [])

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <div className="quote-box">
        <h1 style={{ color: color }}>Random Quote Generator</h1>
        <div id="text">"{quotes.currentQuoteText}"</div>
        <div id="author">- {quotes.currentQuoteAuthor}</div>
        <div id="buttons">
          <button onClick={updateQuote}>New Quote!</button>
          <button onClick={changeColor}>Change Color!</button>
        </div>
      </div>
    </div>
  );
}

export default App;
