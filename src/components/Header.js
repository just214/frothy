import React from 'react';

const Header = props => {
  const Title = props.title;
  const styles = {
    wrapper: {
      textAlign: 'center',
      padding: '10px',
      borderRadius: props.rounded,
      color: props.titleColor,
      backgroundColor: props.titleBackgroundColor,
    },
  };
  return (
    <div style={styles.wrapper}>
      {typeof Title === 'string' ? <h3>{Title}</h3> : Title}
    </div>
  );
};

export default Header;
