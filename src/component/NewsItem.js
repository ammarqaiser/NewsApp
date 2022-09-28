import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
     let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div>
        <div className="card" >
  <img className="card-img-top" src={!imageUrl?"https://thumbs.dreamstime.com/b/newspaper-line-news-icon-press-article-paper-journal-212522658.jpg":imageUrl} alt=""/>
  <div className="card-body">
    <h5 className="card-title">{title}...<span href="#" class="badge badge-success">{source}</span></h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small class="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank"  rel="noreferrer" className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
