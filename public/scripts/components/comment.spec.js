import jasmine from 'jasmine';
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
    console.log('inside')

    expect(comment.props.author).toEqual('author');
  })
})
