import React from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import About from './Components/About';

class App extends React.Component {
  categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

  state = {
    progress: 0
  };
  
  apiKey = process.env.REACT_APP_API_KEY;


  setProgress = (newProgress) => {
    this.setState({
      progress: newProgress
    });
  }

  render() {
    return (
      <>
        <Router>
          <Navbar categories={this.categories} />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />

          <Routes>

            <Route path='/' element={<About />} />
            {this.categories.map((item) => {
              return (
                <Route path={`/${item.toLowerCase()}`} element={<News apiKey={this.apiKey} category={item} country="us" pageSize={9} setProgress={this.setProgress} key={item} />} key={item} />);
            })}

          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
