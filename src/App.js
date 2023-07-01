import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(16);

  const componentDidMount = () => {
    fetch(`http://localhost:5000/data/${page}`).then(res => res.json()).then((data) => {
      console.log(data)
      setData(data.nodes);
    })
  }

  const scrollEffect = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage(page + 1);
      window.scrollTo(0, 0)

    }
  }

  useEffect(() => { 
    componentDidMount();
    window.addEventListener('scroll', scrollEffect)
    return () => {
      window.removeEventListener('scroll', scrollEffect)
    }

  }, [page]);

  const getDate = (value) => {
    const updated_date = new Date(value * 1000);
    return updated_date.toUTCString();
  }

  console.log(data, page);
  return (
    <div className="App">
      <div className='container'>
        {data && data.map((article) => {
          return <div className='article'>
            <img src={article?.node.ImageStyle_thumbnail} style={{ 'width': '30%' }}></img>
            <div >
              <h2>{article?.node.title}</h2>
              <p>
                {getDate(article?.node.last_update)}
              </p>
            </div>
          </div>
        })

        }
        <p>{
          data.length > 0 ? 'loading more...'  : 'no more data'
        }</p>
      </div>
    </div>
  );
}

export default App;
