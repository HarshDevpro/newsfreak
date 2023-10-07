import React, { Component } from 'react'



export class NewsItem extends Component {
  render() {
    let {title, Description,imageUrl,newsUrl,author, time, source} = this.props;
    return (
   
      <div className='my-3'>
        <div className="card" >
        <div  style=
    {{display: 'flex',
    
    justifyContent: 'flex-end',
    position: 'absolute',
   
    right:'0',}}
>
        <span className="badge rounded-pill bg-danger" >
          {source}  </span>
        </div>
        <img src={imageUrl?imageUrl:"https://nypost.com/wp-content/uploads/sites/2/2023/03/newspress-collage-26306639-1679905490704.jpg?quality=75&strip=all&1679891134&w=1024"} className="card-img-top" alt="..."/>
        <div className="card-body">
        
 
            <h5 className="card-title">{title}...</h5>
            
            <p className="card-text">{Description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author? "Unknown":author} On {new Date(time).toGMTString()}</small></p>

            <a href={newsUrl}  rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
        
      </div>
    )
  }
}

export default NewsItem

