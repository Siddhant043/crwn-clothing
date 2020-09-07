import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/dirctory.selectors'
import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";

export const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
