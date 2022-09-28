import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultProps ={
    country : 'us',
    pageSize : 6,
    category : 'general'
  }

  static propsTypes ={
    country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string,
  }
    constructor(){
        super();
        this.state={
          articles : [],
          loading:false,
            page :1

        }
    }

    async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=7a7ecfd6ad8e4cf6abac161e89d651dc&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({articles : parseData.articles,totalResults:parseData.totalResults, loading:false})
    }
     handlePrevClick= async()=> {
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=7a7ecfd6ad8e4cf6abac161e89d651dc&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parseData = await data.json();
      
      
      this.setState({
        
        page : this.state.page-1,
        articles : parseData.articles,
        loading:false
      })
    }
     handleNextClick=async()=>{
      if(!this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=7a7ecfd6ad8e4cf6abac161e89d651dc&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parseData = await data.json();

      
      this.setState({
        
        page : this.state.page+1,
        articles : parseData.articles,
        loading:false
      })
    }
  }
  render() {
    return (
      
      <div>
        
        <div className="container my-5" >
          <h2 className="text-center">NewsMonkey - Top Headlines</h2>
          {this.state.loading && <Spinner/>}
            <div className='row'>
            {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} 
              imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>

            </div>
            })}
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1}className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Pervious</button>
            <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
             className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
            </div>
      
        </div>
        </div>
        
      
    
    )
  }
}

export default News
