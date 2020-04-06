import * as React from 'react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { Link } from 'gatsby';

import { heights, dimensions, colors } from '../styles/variables';
import Container from './Container';

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.white};
  color: ${transparentize(0.5, colors.white)};
  position: relative;
  &:after {
    background-color: rgb(240, 240, 242);
    bottom: -1px;
    content: '';
    height: 1px;
    left: 0rem;
    position: absolute;
    right: 0rem;
    z-index: -1;
  }
`;

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const HomepageLink = styled(Link)`
  color: ${colors.black};
  font-size: 1.5rem;
  font-weight: 600;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const PageLink = styled(Link)`
  color: ${colors.navColor};
  font-size: 1rem;
  margin-left: 20px;
  height: ${heights.header}px;
  line-height: ${heights.header}px;
  border-bottom: 2px solid transparent;
  &:hover,
  &:focus {
    color: ${colors.lilac};
    text-decoration: none;
  }
  &.active {
    border-bottom-color: ${colors.brand};
    color: ${colors.brand};
  }
`;

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <StyledHeader>
    <HeaderInner>
      <HomepageLink to="/">{title}</HomepageLink>
      <PageLink activeClassName={'active'} to={'/table'}>
        表视图
      </PageLink>
      <PageLink activeClassName={'active'} to={'/col'}>
        列视图
      </PageLink>
    </HeaderInner>
  </StyledHeader>
);

export default Header;
