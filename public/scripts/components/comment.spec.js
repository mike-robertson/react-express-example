import {expect} from 'chai';
import cheerio from 'cheerio';
import Comment from './comment';
import React from 'react';
import ReactDOMServer from 'react/lib/ReactDOMServer';

describe('Comment test', function() {
  it('should load with props', function() {
		var props = {
			author: 'author',
			children: 'Test'
		};

		var comment = React.createElement(Comment, props);

		var html = ReactDOMServer.renderToStaticMarkup(comment);

		let $ = cheerio.load(html);
		var commentHtml = $('.comment').html();

    console.log(commentHtml)

    expect(comment.props.author).to.equal('author');
  })
})
