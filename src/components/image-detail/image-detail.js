/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const imageDetailStyles = css`
  display: flex;
  flex-direction: column;
`;

const imageStyles = css`
  border: solid 2px;
  border-bottom-color: #ffe;
  border-left-color: #eed;
  border-right-color: #eed;
  border-top-color: #ccb;
  max-height: 100%;
  max-width: 100%;
`;

const ImageDetail = () => (
  <div css={imageDetailStyles}>
    <h3>Detail of image</h3>
    <div css={frameStyles}>
      <img css={imageStyles} src="https://placekitten.com/g/200/300" />
    </div>
    <p>metadata for image</p>
  </div>
);

/**
 * Original frame style from here: https://codepen.io/chris22smith/pen/PbBwjp
 * Edited to fit use case better
 */
const frameStyles = css`
  background-color: #ddc;
  border: solid 5vmin #eee;
  border-bottom-color: #fff;
  border-left-color: #eee;
  border-radius: 2px;
  border-right-color: #eee;
  border-top-color: #ddd;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25) inset,
    0 5px 10px 5px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: inline-block;
  margin: 10vh 10vw;
  // height: 80vh;
  padding: 8vmin;
  position: relative;
  text-align: center;
  &:before {
    border-radius: 2px;
    bottom: -2vmin;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25) inset;
    content: '';
    left: -2vmin;
    position: absolute;
    right: -2vmin;
    top: -2vmin;
  }
  &:after {
    border-radius: 2px;
    bottom: -2.5vmin;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
    content: '';
    left: -2.5vmin;
    position: absolute;
    right: -2.5vmin;
    top: -2.5vmin;
  }
`;

export default ImageDetail;