// Link.react.test.js
import React from 'react';
//import cookie from 'react-cookies'

import ConversationListItem from '.';
import renderer from 'react-test-renderer'


it('should render correctly', () => {
  //cookie.save("cookie_user", '013741480', { path: "/" });  
    const component = renderer.create(<ConversationListItem data={{
        name: "John Doe",
        unreadCount: 10,
        photo: null
    }}/>);
    expect(component).toMatchSnapshot();
});



