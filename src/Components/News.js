import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Sippner from "./Sippner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pagesize: 12,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pagesize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsFreak`;
  }

  async pagesetup() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey} &page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(70);
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
    
  }
  async componentDidMount() {
    this.pagesetup();
  }

  handlePreviClick = async () => {
    //   let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
    //   this.setState({
    //     loading: true
    //   })
    // let data = await fetch(url);
    // let parseddata = await data.json();
    //   this.setState({
    //     page : this.state.page - 1,
    //     articles: parseddata.articles,
    //     loading:false
    //   })

    this.setState({ page: this.state.page - 1 });
    this.pagesetup();
  };

  handleNextClick = async () => {
    //   if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pagesize))){
    //     let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page +1}&pagesize=${this.props.pagesize}`;
    //   this.setState({
    //     loading: true
    //   })
    // let data = await fetch(url);
    // let parseddata = await data.json();
    //   this.setState({
    //     page : this.state.page +1,
    //     articles: parseddata.articles,
    //     loading:false
    //   })
    //   }
    this.setState({ page: this.state.page + 1 });
    this.pagesetup();
  };

   

  fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults
     
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "25px" , marginTop: '90px'}}>
         NewsFreak - Top {this.capitalizeFirstLetter(this.props.category) } Headlines
        </h1>
        {this.state.loading && <Sippner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Sippner/>}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element) => {
                //!this.state.loading &&
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      Description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      time={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <=1} type="button" onClick={this.handlePreviClick} className="btn btn-dark">
          &larr; Previous
          </button>
          <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
