import React from "react";
import Card from "./Card";
import PropTypes from 'prop-types';
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends React.Component {
  static propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 0,
      category: this.props.category,
      country: this.props.country,
      totResults: null,
      loading: true
    }
  }

  componentDidMount = async () => {
    let category = (this.state.category).toLowerCase();
    let country = this.state.country;
    let page = this.state.page;
    let apiKey = this.props.apiKey;
    
    let pageSize = this.props.pageSize;

    this.setState({
      loading: true
    });
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;


    this.props.setProgress(10);
    let resp = await fetch(apiUrl);
    this.props.setProgress(30);
    let respJson = await resp.json();
    this.props.setProgress(60);
    let newArticles = respJson.articles;
    this.props.setProgress(80);


    this.setState(
      {
        articles: (this.state.articles).concat(newArticles),
        page: page + 1,
        loading: false,
        totResults: respJson.totalResults
      }
    )
    this.props.setProgress(100);
    return respJson;
  }


  fetchMoreData = async () => {
    let category = (this.state.category).toLowerCase();
    let country = this.state.country;
    let page = this.state.page;
    let apiKey = this.props.apiKey;    
    let pageSize = this.props.pageSize;

    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;


    let resp = await fetch(apiUrl);
    let respJson = await resp.json();
    let newArticles = respJson.articles;

    this.setState(
      {
        articles: (this.state.articles).concat(newArticles),
        page: page + 1,
        loading: false
      }
    )
    return respJson;
  }

  render() {
    return (
      <>
        <div className="mb-8">
          <h1 className="text-center font-bold text-3xl mt-16 mb-5">Top Headlines - {this.state.category}</h1>
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={(this.state.articles.length < this.state.totResults)}
            loader={<Loading />}
          >
          {this.state.loading && <Loading/>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 justify-items-center">

              {this.state.articles.map((article) => {
                return (
                  <Card title={article.title} desc={article.description} imgUrl={article.urlToImage} newsUrl={article.url} time={article.publishedAt} key={Math.random()} />
                );
              }
              )}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;